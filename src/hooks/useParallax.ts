'use client';
import { useTransform, useScroll } from 'framer-motion';
import { RefObject } from 'react';

export function useParallax(ref: RefObject<HTMLElement | null>, offset = 0) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return { y, opacity, scale, scrollYProgress };
}
