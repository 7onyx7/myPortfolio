'use client';
import { motion } from 'framer-motion';

/**
 * Premium animated "R" logomark.
 * - Geometric serif R drawn as SVG paths
 * - Gold gradient fill that shifts on hover
 * - Subtle glow aura, shine sweep, and corner-cut frame on hover
 * - Self-contained, no external assets
 */
export default function LogoMark({ size = 36 }: { size?: number }) {
  const id = 'logo-grad';
  const glowId = 'logo-glow';
  const shineId = 'logo-shine';

  return (
    <motion.div
      style={{ width: size, height: size, position: 'relative' }}
      whileHover="hovered"
      initial="idle"
    >
      {/* Glow ring behind the mark */}
      <motion.div
        variants={{
          idle: { opacity: 0, scale: 0.8 },
          hovered: { opacity: 1, scale: 1.15 },
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: -6,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(201,169,110,0.35) 0%, transparent 70%)',
          filter: 'blur(6px)',
          pointerEvents: 'none',
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          {/* Base gold gradient */}
          <linearGradient id={id} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e2c891" />
            <stop offset="50%" stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#a07840" />
          </linearGradient>

          {/* Drop shadow / glow filter */}
          <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Diagonal shine sweep mask */}
          <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="45%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.55" />
            <stop offset="55%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Outer frame: clipped octagon / cut-corner square ── */}
        <motion.path
          d="M18 6 L82 6 L94 18 L94 82 L82 94 L18 94 L6 82 L6 18 Z"
          variants={{
            idle: { stroke: 'rgba(201,169,110,0.25)', strokeWidth: 1.5 },
            hovered: { stroke: 'rgba(201,169,110,0.75)', strokeWidth: 1.5 },
          }}
          transition={{ duration: 0.35 }}
          fill="none"
        />

        {/* ── Inner accent dot, top-right ── */}
        <motion.circle
          cx="82"
          cy="18"
          r="3"
          variants={{
            idle: { fill: 'rgba(201,169,110,0.3)', r: 3 },
            hovered: { fill: '#e2c891', r: 3.5 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/*
          ── The "R" letterform ──
          Geometric construction:
            - Vertical stem: x=28, y=20→80, width=10
            - Bowl top: x=28, y=20 → arc right to x=72,y=42 → back to x=28,y=50
            - Leg: from bowl junction (x=38,y=50) diagonal to x=72,y=80
        */}
        <motion.path
          d={[
            // Stem
            'M 28 20 L 38 20',          // stem top cap
            'L 38 46',                   // stem down to bowl base
            // Bowl (right side arc approximated with cubic bezier)
            'C 38 46, 72 46, 70 33',    // bowl outer curve
            'C 70 20, 38 20, 38 20',    // bowl inner curve back
            'Z',                         // close stem/bowl shape

            // Leg (separate subpath)
            'M 38 50',
            'L 50 50',
            'L 72 80',
            'L 60 80',
            'L 40 54',
            'L 38 54',
            'Z',

            // Stem body (left side filled rect, behind bowl)
            'M 28 20',
            'L 38 20',
            'L 38 80',
            'L 28 80',
            'Z',
          ].join(' ')}
          fill={`url(#${id})`}
          filter={`url(#${glowId})`}
          variants={{
            idle: { opacity: 0.92 },
            hovered: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* ── Shine overlay ── */}
        <motion.path
          d="M18 6 L82 6 L94 18 L94 82 L82 94 L18 94 L6 82 L6 18 Z"
          fill={`url(#${shineId})`}
          variants={{
            idle: { opacity: 0 },
            hovered: { opacity: 1 },
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  );
}
