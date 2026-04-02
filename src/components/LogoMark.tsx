'use client';
import { motion } from 'framer-motion';

/**
 * Premium "R" logomark — sharp geometric letterform inside a cut-corner frame.
 *
 * R construction (100×100 viewBox):
 *   Stem   — x 22–34, y 18–82  (12px wide)
 *   Bowl   — closed D-shape: top of stem → right arc peak (x 68, y 35) → back
 *   Leg    — diagonal spur from bowl-base (34, 50) → bottom-right (71, 82)
 *
 * All sub-paths are explicit point-by-point so the shape is crisp.
 */
export default function LogoMark({ size = 36 }: { size?: number }) {
  // Unique IDs per instance to avoid SVG defs collisions in the DOM
  const uid = 'rs';

  /* ── R letterform: single compound path (even-odd fill) ──────────────────
     Sub-path 1: full outer silhouette (stem + bowl outer edge + leg outer edge)
     Sub-path 2: bowl inner cutout (makes the counter)
     Using fill-rule="evenodd" punches the counter out automatically.
  ─────────────────────────────────────────────────────────────────────────── */

  // Outer silhouette — traced clockwise
  // Stem left side up, across top, bowl outer arc down to leg, leg to bottom, back up stem.
  const outerSilhouette = [
    'M 22 82',          // bottom-left of stem
    'L 22 18',          // up stem left edge
    'L 46 18',          // top cap — rightward to where bowl starts
    // Bowl outer arc (top-right curve): cubic bezier
    // control points push it to a tight D-shape, peak x≈69
    'C 80 18, 80 52, 46 52', // outer bowl arc — top → bottom junction
    // now at bowl-base (46, 52) — ride the leg outward
    'L 71 82',          // leg bottom-right tip
    'L 57 82',          // narrow the leg — inner bottom
    'L 34 55',          // leg inner diagonal back up
    'L 34 82',          // down the stem right side to bottom
    'Z',
  ].join(' ');

  // Bowl counter (inner cutout) — counter-clockwise so evenodd punches it out
  // Sits inside the bowl: from (34,26) across to right curve back to (34,44)
  const bowlCounter = [
    'M 34 44',          // bottom of counter (inner bowl base)
    'L 34 26',          // up inner-left
    'L 44 26',          // rightward
    // inner arc — smaller D, counter-clockwise
    'C 62 26, 62 44, 44 44',
    'Z',
  ].join(' ');

  const rPath = `${outerSilhouette} ${bowlCounter}`;

  return (
    <motion.div
      style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}
      whileHover="hovered"
      initial="idle"
    >
      {/* Ambient glow behind the mark */}
      <motion.div
        variants={{
          idle: { opacity: 0, scale: 0.75 },
          hovered: { opacity: 1, scale: 1.2 },
        }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: -8,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,169,110,0.4) 0%, transparent 68%)',
          filter: 'blur(8px)',
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
          {/* Gold gradient — top-light to bottom-shadow */}
          <linearGradient id={`${uid}-g`} x1="22" y1="18" x2="71" y2="82" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#edd99a" />
            <stop offset="40%"  stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#8a6030" />
          </linearGradient>

          {/* Soft drop-shadow on the R */}
          <filter id={`${uid}-s`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#c9a96e" floodOpacity="0.5" />
          </filter>

          {/* Diagonal shine sweep (frame overlay) */}
          <linearGradient id={`${uid}-sh`} x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="42%"  stopColor="white" stopOpacity="0" />
            <stop offset="50%"  stopColor="white" stopOpacity="0.18" />
            <stop offset="58%"  stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Clip to frame shape */}
          <clipPath id={`${uid}-clip`}>
            <path d="M16 4 L84 4 L96 16 L96 84 L84 96 L16 96 L4 84 L4 16 Z" />
          </clipPath>
        </defs>

        {/* ── Background fill inside the frame ── */}
        <path
          d="M16 4 L84 4 L96 16 L96 84 L84 96 L16 96 L4 84 L4 16 Z"
          fill="rgba(201,169,110,0.05)"
        />

        {/* ── Cut-corner frame border ── */}
        <motion.path
          d="M16 4 L84 4 L96 16 L96 84 L84 96 L16 96 L4 84 L4 16 Z"
          fill="none"
          variants={{
            idle:    { stroke: 'rgba(201,169,110,0.22)', strokeWidth: 1.2 },
            hovered: { stroke: 'rgba(201,169,110,0.7)',  strokeWidth: 1.2 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* ── Corner accent marks (top-left & bottom-right) ── */}
        {/* top-left corner tick  */}
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
        {/* bottom-right corner tick */}
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

        {/* ── The R letterform ── */}
        <motion.path
          d={rPath}
          fillRule="evenodd"
          fill={`url(#${uid}-g)`}
          filter={`url(#${uid}-s)`}
          variants={{
            idle:    { opacity: 1 },
            hovered: { opacity: 1 },
          }}
        />

        {/* ── Shine sweep overlay (clipped to frame) ── */}
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
