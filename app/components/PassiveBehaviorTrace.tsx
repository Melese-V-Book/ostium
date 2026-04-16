'use client';

import { useEffect, useRef } from 'react';

interface PassiveBehaviorTraceProps {
  mode?: string; // optional, will default to 'drift'
}

export default function PassiveBehaviorTrace({ mode = 'drift' }: PassiveBehaviorTraceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 0.8;

      const points: { x: number; y: number }[] = [];
      let x = width * 0.05;
      let y = height * 0.7;
      const step = width / 80;

      for (let i = 0; i <= 80; i++) {
        points.push({ x, y });
        x += step;

        // Safe mode handling – use optional chaining and default to 'drift'
        const safeMode = mode || 'drift';
        if (safeMode.includes('drift')) {
          y += (Math.random() - 0.5) * 3;
        } else if (safeMode.includes('step') || safeMode.includes('abrupt')) {
          if (i % 20 === 0) y += (Math.random() - 0.5) * 20;
          else y += (Math.random() - 0.5) * 1.5;
        } else {
          y += (Math.random() - 0.5) * 4;
        }
        y = Math.min(height - 10, Math.max(10, y));
      }

      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();

      time += 0.01;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed bottom-4 right-4 w-48 h-20 opacity-30 pointer-events-none"
    />
  );
}