'use client';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

export default function MagneticCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Magnetic pull toward elements with data-magnetic
      const target = e.target as HTMLElement;
      const magnetic = target.closest('[data-magnetic]') as HTMLElement | null;

      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Pull ring toward center of the magnetic element
        ringX.set(centerX);
        ringY.set(centerY);
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    },
    [cursorX, cursorY, ringX, ringY, isVisible]
  );

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    // Don't show on touch devices
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setMounted(true);
    document.body.classList.add('custom-cursor-active');

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: 6,
          height: 6,
          backgroundColor: '#c9a96e',
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: isHovering ? 56 : 40,
          height: isHovering ? 56 : 40,
          borderColor: isHovering
            ? 'rgba(201, 169, 110, 0.6)'
            : 'rgba(201, 169, 110, 0.25)',
          boxShadow: isHovering
            ? '0 0 20px rgba(201, 169, 110, 0.15)'
            : '0 0 0px rgba(201, 169, 110, 0)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      {/* Glow trail */}
      <motion.div
        className="fixed top-0 left-0 rounded-full"
        style={{
          x: ringX,
          y: ringY,
          width: 80,
          height: 80,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)',
          opacity: isVisible ? 1 : 0,
        }}
      />
    </div>
  );
}
