'use client';
import { useEffect, useRef } from 'react';

/**
 * Fluid liquid-mesh mouse aurora.
 *
 * Three large blurred radial blobs lerp toward the cursor at different speeds,
 * creating a cascading aurora tail. Each blob also breathes with a slow
 * Math.sin() scale pulse at a unique phase — so the background stays alive
 * even when the cursor is still.
 *
 * Implementation:
 * - Zero React re-renders during motion: rAF loop writes directly to
 *   blob element style.transform via DOM refs.
 * - mix-blend-mode: screen → warm gold light adds onto the dark background.
 * - Touch devices: rAF still runs but targets are fixed at viewport center
 *   (static, no wasted tracking overhead).
 */

const BLOBS = [
  {
    size: 620,
    color: 'rgba(201,169,110,0.22)',
    blur: 100,
    lerp: 0.065,
    ox: 0,
    oy: 0,
    phase: 0,
    breathSpeed: 0.7,
  },
  {
    size: 460,
    color: 'rgba(220,145,45,0.15)',
    blur: 80,
    lerp: 0.038,
    ox: 100,
    oy: 20,
    phase: 2.1,
    breathSpeed: 0.95,
  },
  {
    size: 740,
    color: 'rgba(245,205,145,0.09)',
    blur: 145,
    lerp: 0.022,
    ox: -60,
    oy: 80,
    phase: 4.2,
    breathSpeed: 0.58,
  },
] as const;

export default function MouseAurora() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;

    // Build blob elements imperatively — no React state, no re-renders
    const blobs = BLOBS.map((cfg) => {
      const el = document.createElement('div');
      el.style.cssText = [
        'position:fixed',
        `width:${cfg.size}px`,
        `height:${cfg.size}px`,
        'border-radius:50%',
        `background:radial-gradient(circle,${cfg.color} 0%,transparent 70%)`,
        `filter:blur(${cfg.blur}px)`,
        'mix-blend-mode:screen',
        'pointer-events:none',
        'will-change:transform',
        'top:0',
        'left:0',
      ].join(';');
      container.appendChild(el);

      return {
        el,
        x: cx + cfg.ox,
        y: cy + cfg.oy,
      };
    });

    let mouseX = cx;
    let mouseY = cy;
    let mouseActive = false;
    let rafId = 0;
    const startTime = Date.now();

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    };

    const onLeave = () => {
      mouseActive = false;
    };

    const tick = () => {
      const t = (Date.now() - startTime) * 0.001; // seconds
      const tx = mouseActive ? mouseX : cx;
      const ty = mouseActive ? mouseY : cy;

      blobs.forEach((blob, i) => {
        const cfg = BLOBS[i];

        // Lerp toward target (frame-rate dependent — intentional for this visual)
        blob.x += (tx + cfg.ox - blob.x) * cfg.lerp;
        blob.y += (ty + cfg.oy - blob.y) * cfg.lerp;

        // Slow scale breathing — each blob at its own phase
        const scale = 1 + 0.045 * Math.sin(t * cfg.breathSpeed + cfg.phase);

        // Center the div on (blob.x, blob.y)
        const tx2 = blob.x - cfg.size / 2;
        const ty2 = blob.y - cfg.size / 2;

        blob.el.style.transform = `translate(${tx2}px,${ty2}px) scale(${scale})`;
      });

      rafId = requestAnimationFrame(tick);
    };

    if (!isTouchDevice) {
      window.addEventListener('mousemove', onMove, { passive: true });
      document.addEventListener('mouseleave', onLeave);
    }

    // Keep resting position centered if window resizes
    const onResize = () => {
      cx = window.innerWidth / 2;
      cy = window.innerHeight / 2;
    };
    window.addEventListener('resize', onResize, { passive: true });

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
      blobs.forEach((b) => b.el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    />
  );
}
