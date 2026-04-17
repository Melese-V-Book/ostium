'use client';

import { useEffect, useRef } from 'react';

export type FieldMode =
  | 'drift'
  | 'step'
  | 'silent_abrupt'
  | 'oscillatory'
  | 'cascade'
  | 'hybrid_drift_step'
  | 'hybrid_silent_oscillatory'
  | 'hybrid_step_cascade'
  | 'hybrid_drift_bifurcation';

interface TrajectoryFieldProps {
  mode?: FieldMode;
}

export default function TrajectoryField({ mode = 'drift' }: TrajectoryFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  let time = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      if (width === 0 || height === 0) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.strokeStyle = '#e5e5e5';
      ctx.lineWidth = 1.5;

      const points: { x: number; y: number }[] = [];
      for (let x = 0; x <= width; x += 20) {
        const t = x / width;
        let y = height / 2;

        if (mode === 'drift') {
          const slope = 0.06;
          y += slope * (x - width / 2) + Math.sin(t * Math.PI * 4 + time) * 15;
        } 
        else if (mode === 'step') {
          let offset = 0;
          if (t > 0.4 && t < 0.45) offset = 25;
          else if (t > 0.6 && t < 0.65) offset = 20;
          else if (t > 0.85) offset = 35;
          y += offset + Math.sin(t * Math.PI * 2) * 5;
        } 
        else if (mode === 'silent_abrupt') {
          let offset = 0;
          if (t > 0.7) offset = 50 * (t - 0.7) / 0.3;
          y += offset + Math.sin(t * Math.PI * 2) * 4;
        } 
        else if (mode === 'oscillatory') {
          const amp = t > 0.6 ? 25 : 10;
          const freq = t > 0.6 ? 4 : 2; // reduced frequency
          y += Math.sin(t * Math.PI * freq + time) * amp;
        } 
        else if (mode === 'cascade') {
          let offset = 0;
          if (t > 0.5) offset = (t - 0.5) * 60;
          if (t > 0.7) offset += 20;
          y += offset + Math.sin(t * Math.PI * 3) * 8;
        } 
        else if (mode === 'hybrid_drift_step') {
          let offset = 0;
          if (t > 0.3) offset += (t - 0.3) * 20;
          if (t > 0.5 && t < 0.55) offset += 25;
          y += offset + Math.sin(t * Math.PI * 2) * 10;
        } 
        else if (mode === 'hybrid_silent_oscillatory') {
          // smooth oscillation that emerges slowly
          const oscStrength = t > 0.5 ? (t - 0.5) * 2 : 0;
          y += Math.sin(t * Math.PI * 3 + time) * (8 * oscStrength);
          if (t > 0.7) y += 15 * (t - 0.7);
        } 
        else if (mode === 'hybrid_step_cascade') {
          let offset = 0;
          if (t > 0.4 && t < 0.45) offset = 15;
          if (t > 0.6) offset += (t - 0.6) * 40;
          y += offset + Math.sin(t * Math.PI * 2) * 6;
        } 
        else if (mode === 'hybrid_drift_bifurcation') {
          let offset = 0;
          if (t > 0.35) offset = (t - 0.35) * 45;
          if (t > 0.7) offset += Math.sin(t * Math.PI * 8) * 20;
          y += offset + Math.sin(t * Math.PI * 3) * 8;
        }

        points.push({ x, y });
      }

      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();

      time += 0.02;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mode]);

  return <canvas ref={canvasRef} className="w-full h-96" />;
}