'use client';
import { motion } from 'framer-motion';

/**
 * RS interlocking monogram — luxury stroke-based letterforms.
 *
 * Both R and S are rendered as stroked centerline paths with identical
 * strokeWidth (8), round caps, and gold gradient. This gives them equal
 * visual weight — like a Gucci/YSL-style monogram.
 *
 * Interlock technique:
 *   1. S is drawn first (layer behind)
 *   2. A dark "knockout" border (bg-colored stroke, wider) is drawn for R
 *   3. R's gold strokes are drawn on top
 *   The knockout creates a thin dark gap around R wherever it overlaps S —
 *   making R clearly pass OVER S. Invisible against the dark background.
 *
 * viewBox: 0 0 100 100 (square, compact at any size)
 */
export default function LogoMark({ size = 36 }: { size?: number }) {
  const uid = 'rs';

  // R: stem + top bar + bowl as one continuous stroke
  const rMain = 'M 22 82 L 22 18 L 40 18 C 60 18, 60 48, 26 48';
  // R: diagonal leg (separate path)
  const rLeg  = 'M 30 48 L 56 82';
  // S: flowing S-curve — upper bowl curls left, lower bowl curves right
  const sPath = 'M 74 22 C 48 10, 40 38, 58 50 C 76 62, 70 90, 46 78';

  const sw = 8;            // letter stroke width
  const kw = sw + 4;       // knockout border width (2px dark gap per side)

  return (
    <motion.div
      style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}
      whileHover="hovered"
      initial="idle"
    >
      {/* Ambient glow behind the mark */}
      <motion.div
        variants={{
          idle:    { opacity: 0, scale: 0.75 },
          hovered: { opacity: 1, scale: 1.15 },
        }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: -10,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.45) 0%, transparent 68%)',
          filter: 'blur(12px)',
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
          {/* Gold gradient — diagonal top-left → bottom-right */}
          <linearGradient id={`${uid}-g`} x1="18" y1="14" x2="78" y2="86" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#ede0a8" />
            <stop offset="38%"  stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#7a5422" />
          </linearGradient>

          {/* Drop shadow for letter groups */}
          <filter id={`${uid}-s`} x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#c9a96e" floodOpacity="0.5" />
          </filter>

          {/* Diagonal shine sweep */}
          <linearGradient id={`${uid}-sh`} x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="40%"  stopColor="white" stopOpacity="0" />
            <stop offset="50%"  stopColor="white" stopOpacity="0.18" />
            <stop offset="60%"  stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Clip to frame shape */}
          <clipPath id={`${uid}-clip`}>
            <path d="M16 4 L84 4 L96 16 L96 84 L84 96 L16 96 L4 84 L4 16 Z" />
          </clipPath>
        </defs>

        {/* ── Frame background ── */}
        <path
          d="M16 4 L84 4 L96 16 L96 84 L84 96 L16 96 L4 84 L4 16 Z"
          fill="rgba(201,169,110,0.04)"
        />

        {/* ── Frame border ── */}
        <motion.path
          d="M16 4 L84 4 L96 16 L96 84 L84 96 L16 96 L4 84 L4 16 Z"
          fill="none"
          variants={{
            idle:    { stroke: 'rgba(201,169,110,0.2)',  strokeWidth: 1.1 },
            hovered: { stroke: 'rgba(201,169,110,0.7)',  strokeWidth: 1.1 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* ── Corner accent ticks ── */}
        <motion.polyline
          points="4,24 4,16 12,4"
          fill="none"
          variants={{
            idle:    { stroke: 'rgba(201,169,110,0)', strokeWidth: 1.5 },
            hovered: { stroke: '#e2c891',              strokeWidth: 1.5 },
          }}
          transition={{ duration: 0.25 }}
          strokeLinecap="round"
        />
        <motion.polyline
          points="96,76 96,84 88,96"
          fill="none"
          variants={{
            idle:    { stroke: 'rgba(201,169,110,0)', strokeWidth: 1.5 },
            hovered: { stroke: '#e2c891',              strokeWidth: 1.5 },
          }}
          transition={{ duration: 0.25 }}
          strokeLinecap="round"
        />

        {/* ── Layer 1: S (behind R) ── */}
        <motion.path
          d={sPath}
          fill="none"
          stroke={`url(#${uid}-g)`}
          strokeWidth={sw}
          strokeLinecap="round"
          filter={`url(#${uid}-s)`}
          variants={{
            idle:    { opacity: 0.75 },
            hovered: { opacity: 0.95 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* ── Layer 2: R knockout border (dark outline for separation) ── */}
        <path d={rMain} fill="none" stroke="#050505" strokeWidth={kw} strokeLinecap="round" strokeLinejoin="round" />
        <path d={rLeg}  fill="none" stroke="#050505" strokeWidth={kw} strokeLinecap="round" />

        {/* ── Layer 3: R gold strokes (on top) ── */}
        <g filter={`url(#${uid}-s)`}>
          <path
            d={rMain}
            fill="none"
            stroke={`url(#${uid}-g)`}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={rLeg}
            fill="none"
            stroke={`url(#${uid}-g)`}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        </g>

        {/* ── Shine sweep overlay ── */}
        <motion.rect
          x="4" y="4" width="92" height="92"
          fill={`url(#${uid}-sh)`}
          clipPath={`url(#${uid}-clip)`}
          variants={{
            idle:    { opacity: 0 },
            hovered: { opacity: 1 },
          }}
          transition={{ duration: 0.4 }}
        />
      </svg>
    </motion.div>
  );
}
