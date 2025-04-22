"use client";
import React, { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  dAlpha: number;
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = document.documentElement.scrollHeight;

    // Generate stars
    const numStars = 1000;
    const stars: Star[] = [];
    for (let i = 0; i < numStars; i++) {
      const radius = Math.random() * 1.5 + 0.5;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        alpha: Math.random(),
        dAlpha: (Math.random() * 0.02) * (Math.random() < 0.5 ? 1 : -1)
      });
    }

    // Handle resize
    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    let animationId: number;
    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      stars.forEach(star => {
        // twinkle
        star.alpha += star.dAlpha;
        if (star.alpha <= 0 || star.alpha >= 1) star.dAlpha *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha.toFixed(2)})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}