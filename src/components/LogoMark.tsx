'use client';
import { motion } from 'framer-motion';

/**
 * RS interlocking monogram — side-by-side letterforms sharing overlap zone.
 *
 * ViewBox: 0 0 120 100  (1.2 : 1 aspect ratio)
 * SVG element: width = size * 1.2, height = size
 *
 * R (x: 10–62, y: 10–90):
 *   Stem   — x 10–24, y 10–90
 *   Bowl   — D-shape: from (36,10) arcing to peak x≈62 and back to (36,52)
 *   Leg    — diagonal from (36,52) → (62,90) outer, (48,90)→(24,55) inner
 *   Counter— evenodd hole: (24,20)→(34,20)→arc→(34,45)→(24,45)
 *
 * S (x: 46–80, y: 13–87) — thick stroked path:
 *   Upper bowl: (80,13) curls left to inflection (62,50)
 *   Lower bowl: (62,50) curls right to terminal (46,87)
 *
 * Interlock: R's bowl right-edge (x≈55) meets S's upper-left spine (x≈48–56)
 * at y≈20–45. R drawn on top — bowl silhouette clips over S's stroke.
 * Second overlap: R's leg (x≈46–60) clips over S's lower terminal (x≈39–53)
 * at y≈75–90. Two interlock points give the monogram visual depth.
 */
export default function LogoMark({ size = 36 }: { size?: number }) {
  const uid = 'rs';
  const w = size * 1.2;
  const h = size;

  // ── R letterform (filled, evenodd) ───────────────────────────────────────
  // Outer silhouette — clockwise
  const rOuter = [
    'M 10 90',           // bottom-left of stem
    'L 10 10',           // up left edge
    'L 36 10',           // right along top to bowl attachment
    'C 62 10, 62 52, 36 52', // bowl outer arc (D-shape, peaks at x≈62)
    'L 62 90',           // leg outer diagonal
    'L 48 90',           // across leg bottom (inner tip)
    'L 24 55',           // inner diagonal back up toward stem
    'L 24 90',           // down right edge of stem to bottom
    'Z',
  ].join(' ');

  // Bowl counter — same winding (evenodd handles the cutout regardless of direction)
  const rCounter = [
    'M 24 45',           // bottom-left of counter
    'L 24 20',           // up inner-left edge
    'L 34 20',           // right along counter top
    'C 50 20, 50 45, 34 45', // inner arc (smaller D)
    'Z',
  ].join(' ');

  const rPath = `${rOuter} ${rCounter}`;

  // ── S letterform (stroked centerline) ────────────────────────────────────
  // Upper bowl: (80,13) → C(44,9, 36,48, 62,50) — curls leftward to inflection
  // Lower bowl: (62,50) → C(92,52, 86,91, 46,87) — swings right, ends lower-left
  // strokeLinecap="round" softens the terminals for a premium feel
  const sPath = 'M 80 13 C 44 9, 36 48, 62 50 C 92 52, 86 91, 46 87';

  return (
    <motion.div
      style={{ width: w, height: h, position: 'relative', flexShrink: 0 }}
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
          background: 'radial-gradient(ellipse, rgba(201,169,110,0.45) 0%, transparent 68%)',
          filter: 'blur(12px)',
          pointerEvents: 'none',
        }}
      />

      <svg
        width={w}
        height={h}
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          {/* Diagonal gold gradient spanning full RS mark (top-left bright → bottom-right deep) */}
          <linearGradient id={`${uid}-g`} x1="10" y1="10" x2="110" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#ede0a8" />
            <stop offset="38%"  stopColor="#c9a96e" />
            <stop offset="100%" stopColor="#7a5422" />
          </linearGradient>

          {/* Softer second gradient for the S stroke to read distinctly */}
          <linearGradient id={`${uid}-gs`} x1="46" y1="13" x2="80" y2="87" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#d4b87a" />
            <stop offset="100%" stopColor="#8a5e2a" />
          </linearGradient>

          {/* Drop shadow shared by both letterforms */}
          <filter id={`${uid}-s`} x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#c9a96e" floodOpacity="0.55" />
          </filter>

          {/* Diagonal shine sweep overlay */}
          <linearGradient id={`${uid}-sh`} x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="40%"  stopColor="white" stopOpacity="0" />
            <stop offset="50%"  stopColor="white" stopOpacity="0.2" />
            <stop offset="60%"  stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Clip to frame shape */}
          <clipPath id={`${uid}-clip`}>
            <path d="M18 3 L102 3 L117 18 L117 82 L102 97 L18 97 L3 82 L3 18 Z" />
          </clipPath>
        </defs>

        {/* ── Cut-corner frame — subtle background fill ── */}
        <path
          d="M18 3 L102 3 L117 18 L117 82 L102 97 L18 97 L3 82 L3 18 Z"
          fill="rgba(201,169,110,0.04)"
        />

        {/* ── Cut-corner frame border ── */}
        <motion.path
          d="M18 3 L102 3 L117 18 L117 82 L102 97 L18 97 L3 82 L3 18 Z"
          fill="none"
          variants={{
            idle:    { stroke: 'rgba(201,169,110,0.2)',  strokeWidth: 1.1 },
            hovered: { stroke: 'rgba(201,169,110,0.75)', strokeWidth: 1.1 },
          }}
          transition={{ duration: 0.3 }}
        />

        {/* ── Corner accent ticks (top-left & bottom-right) ── */}
        <motion.polyline
          points="3,28 3,18 13,3"
          fill="none"
          variants={{
            idle:    { stroke: 'rgba(201,169,110,0)', strokeWidth: 1.5 },
            hovered: { stroke: '#e2c891',              strokeWidth: 1.5 },
          }}
          transition={{ duration: 0.25 }}
          strokeLinecap="round"
        />
        <motion.polyline
          points="117,72 117,82 107,97"
          fill="none"
          variants={{
            idle:    { stroke: 'rgba(201,169,110,0)', strokeWidth: 1.5 },
            hovered: { stroke: '#e2c891',              strokeWidth: 1.5 },
          }}
          transition={{ duration: 0.25 }}
          strokeLinecap="round"
        />

        {/* ── S letterform (drawn first — R overlaps it in the interlock zones) ── */}
        <motion.path
          d={sPath}
          fill="none"
          stroke={`url(#${uid}-gs)`}
          strokeWidth="14"
          strokeLinecap="round"
          filter={`url(#${uid}-s)`}
          variants={{
            idle:    { opacity: 0.95 },
            hovered: { opacity: 1 },
          }}
          transition={{ duration: 0.2 }}
        />

        {/* ── R letterform (drawn on top — creates interlock illusion) ── */}
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

        {/* ── Diagonal shine sweep (clipped to frame, appears on hover) ── */}
        <motion.rect
          x="3" y="3" width="114" height="94"
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
