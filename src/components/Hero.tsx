'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useHaptics } from '@/hooks/useHaptics';

const phrases = [
  'I build websites.',
  'I build AI agents.',
  'I build the future.',
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const haptics = useHaptics();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
          if (displayText.length + 1 === currentPhrase.length) {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(currentPhrase.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="flex flex-col items-center text-center px-6"
        style={{ y: nameY, opacity }}
      >
        {/* Name */}
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight"
          style={{ color: 'var(--fg)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        > 
          Romeo Shamoun
        </motion.h1>

        {/* Typing effect */}
        <motion.div
          className="mt-6 h-10 sm:h-12 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-light" style={{ color: 'var(--accent)' }}>
            {displayText}
          </span>
          <motion.span
            className="inline-block w-[2px] h-6 sm:h-8 ml-1"
            style={{ backgroundColor: 'var(--accent)' }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mt-6 text-sm sm:text-base tracking-widest uppercase"
          style={{ color: 'var(--fg-muted)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Founder & Software Developer — Available Worldwide
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#work"
          data-magnetic
          className="mt-12 px-8 py-3 rounded-full border text-sm font-medium tracking-wider uppercase transition-all duration-300"
          style={{
            borderColor: 'rgba(201, 169, 110, 0.3)',
            color: 'var(--accent)',
          }}
          onClick={() => haptics.medium()}
          whileHover={{
            borderColor: 'rgba(201, 169, 110, 0.8)',
            boxShadow: '0 0 30px rgba(201, 169, 110, 0.15)',
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          See my work
        </motion.a>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="w-[1px] h-12"
            style={{ backgroundColor: 'rgba(201, 169, 110, 0.3)' }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style-origin="top"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
