'use client';
import { motion } from 'framer-motion';

const orbs = [
  {
    size: 400,
    x: '15%',
    y: '10%',
    duration: 25,
    delay: 0,
    color: 'rgba(var(--ambient-r), var(--ambient-g), var(--ambient-b), var(--ambient-opacity))',
  },
  {
    size: 300,
    x: '75%',
    y: '30%',
    duration: 30,
    delay: 5,
    color: 'rgba(var(--ambient-r), var(--ambient-g), var(--ambient-b), calc(var(--ambient-opacity) * 0.7))',
  },
  {
    size: 350,
    x: '50%',
    y: '70%',
    duration: 28,
    delay: 10,
    color: 'rgba(var(--ambient-r), var(--ambient-g), var(--ambient-b), calc(var(--ambient-opacity) * 0.5))',
  },
  {
    size: 250,
    x: '85%',
    y: '80%',
    duration: 22,
    delay: 8,
    color: 'rgba(var(--ambient-r), var(--ambient-g), var(--ambient-b), calc(var(--ambient-opacity) * 0.4))',
  },
];

export default function GradientOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: `blur(${orb.size * 0.3}px)`,
            mixBlendMode: 'screen',
            willChange: 'transform',
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
