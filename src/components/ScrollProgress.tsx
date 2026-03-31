'use client';
import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, var(--accent), var(--accent-light))',
        boxShadow: '0 0 8px rgba(201, 169, 110, 0.4)',
      }}
    />
  );
}
