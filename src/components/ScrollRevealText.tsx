'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  staggerDelay?: number;
}

export default function ScrollRevealText({
  children,
  className = '',
  as: Tag = 'p',
  delay = 0,
  staggerDelay = 0.03,
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const words = children.split(' ');

  return (
    <Tag className={className} ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: delay + i * staggerDelay,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
