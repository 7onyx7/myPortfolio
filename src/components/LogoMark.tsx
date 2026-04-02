'use client';
import { motion } from 'framer-motion';

/**
 * Nested triangle logo — inspired by the triforce concept but unique.
 *
 * Geometry:
 *   - Outer triangle (large, pointing up): creates the frame
 *   - Inner triangle (smaller, pointing up): creates a triangular ring between them
 *   - Three small accent triangles at the main vertices (inverted or rotated)
 *
 * Simple, sharp, geometric, premium energy. No text, just pure symbol.
 * All triangles use the gold gradient. The frame is a stroked octagon (same as before).
 *
 * viewBox: 0 0 100 100
 */
export default function LogoMark({ size = 36 }: { size?: number }) {
  const uid = 'rs';

  // Main outer upward-pointing triangle (from bottom-left to bottom-right to apex)
  const outerTriangle = 'M 20 78 L 80 78 L 50 15 Z';

  // Inner triangle (smaller, same orientation, creates the nested frame)
  const innerTriangle = 'M 35 65 L 65 65 L 50 30 Z';

  // Three small accent triangles at key vertices
  // Small upward at top vertex of outer triangle
  const accentTop = 'M 45 18 L 55 18 L 50 8 Z';
  // Small downward at bottom-left
  const accentBL = 'M 23 78 L 30 68 L 16 78 Z';
  // Small downward at bottom-right
  const accentBR = 'M 77 78 L 84 68 L 70 78 Z';

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
          {/* Gold gradient — diagonal */}
          <linearGradient id={`${uid}-g`} x1="15" y1="10" x2="85" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#ede0a8" />
            <stop offset="38%"  stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#7a5422" />
          </linearGradient>

          {/* Drop shadow */}
          <filter id={`${uid}-s`} x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#c9a96e" floodOpacity="0.5" />
          </filter>

          {/* Shine sweep */}
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

        {/* ── Outer triangle (stroked, creates frame) ── */}
        <motion.path
          d={outerTriangle}
          fill="none"
          stroke={`url(#${uid}-g)`}
          strokeWidth="2.2"
          strokeLinejoin="round"
          filter={`url(#${uid}-s)`}
          variants={{
            idle:    { opacity: 0.7 },
            hovered: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* ── Inner triangle (stroked, creates nested frame) ── */}
        <motion.path
          d={innerTriangle}
          fill="none"
          stroke={`url(#${uid}-g)`}
          strokeWidth="2.2"
          strokeLinejoin="round"
          filter={`url(#${uid}-s)`}
          variants={{
            idle:    { opacity: 0.5 },
            hovered: { opacity: 0.8 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* ── Accent triangles (small filled shapes at key points) ── */}
        <motion.path
          d={accentTop}
          fill={`url(#${uid}-g)`}
          filter={`url(#${uid}-s)`}
          variants={{
            idle:    { opacity: 0 },
            hovered: { opacity: 1 },
          }}
          transition={{ duration: 0.25 }}
        />
        <motion.path
          d={accentBL}
          fill={`url(#${uid}-g)`}
          filter={`url(#${uid}-s)`}
          variants={{
            idle:    { opacity: 0 },
            hovered: { opacity: 1 },
          }}
          transition={{ duration: 0.25 }}
        />
        <motion.path
          d={accentBR}
          fill={`url(#${uid}-g)`}
          filter={`url(#${uid}-s)`}
          variants={{
            idle:    { opacity: 0 },
            hovered: { opacity: 1 },
          }}
          transition={{ duration: 0.25 }}
        />

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
