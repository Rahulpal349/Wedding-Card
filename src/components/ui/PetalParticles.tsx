'use client';

import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
}

export default function PetalParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isPaused = false;
    let isDocumentVisible = true;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Palette of Bengali marigold petals: bright haldi, deep terracotta, warm orange
    const colors = ['#F2B705', '#B5532E', '#E8872A', '#D97706'];

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Optimized particle count: 24 for mobile (ultra-fluid 60fps), 50 for desktop
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 24 : 50;

    const width = () => (canvas.parentElement?.clientWidth || window.innerWidth);
    const height = () => (canvas.parentElement?.clientHeight || window.innerHeight);

    const createPetal = (initialY?: number): Petal => {
      const size = Math.random() * 6 + 5;
      return {
        x: Math.random() * width(),
        y: initialY !== undefined ? initialY : Math.random() * height(),
        size,
        speedX: Math.sin(Math.random() * Math.PI) * 1.0 - 0.5,
        speedY: Math.random() * 0.7 + 0.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.4 + 0.3,
      };
    };

    const petals: Petal[] = Array.from({ length: particleCount }, () =>
      createPetal()
    );

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      // Draw curved marigold petal shape
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.quadraticCurveTo(p.size * 0.5, 0, 0, p.size);
      ctx.quadraticCurveTo(-p.size * 0.5, 0, 0, -p.size);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      if (!isDocumentVisible || isPaused || prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const w = width();
      const h = height();
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.4;
        p.rotation += p.rotationSpeed;

        if (p.y > h + p.size) {
          petals[i] = createPetal(-p.size);
        }
        if (p.x < -p.size) p.x = w + p.size;
        if (p.x > w + p.size) p.x = -p.size;

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }

    // Battery saver: pause when tab/webview is hidden (e.g. switching apps in WhatsApp/Instagram)
    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Global pause/resume
    const handlePause = () => {
      isPaused = true;
    };
    const handleResume = () => {
      isPaused = false;
    };

    window.addEventListener('animations-paused', handlePause);
    window.addEventListener('animations-resumed', handleResume);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('animations-paused', handlePause);
      window.removeEventListener('animations-resumed', handleResume);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
