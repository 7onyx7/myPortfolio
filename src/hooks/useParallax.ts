'use client';
import { useTransform, useScroll } from 'framer-motion';
import { RefObject } from 'react';

export function useParallax(ref: RefObject<HTMLElement | null>, offset = 50) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Reduce the offset for a more subtle parallax effect
  const subtleOffset = offset * 0.4; // 40% of original
  const y = useTransform(scrollYProgress, [0, 1], [-subtleOffset, subtleOffset]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.98, 1, 1, 0.98]);

  return { y, opacity, scale, scrollYProgress };
}
