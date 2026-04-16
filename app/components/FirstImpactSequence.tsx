'use client';

import { useState, useEffect, useRef } from 'react';

interface FirstImpactSequenceProps {
  onComplete: () => void;
}

export default function FirstImpactSequence({ onComplete }: FirstImpactSequenceProps) {
  const [stage, setStage] = useState<'silence' | 'stable' | 'deviation' | 'realisation' | 'observe'>('silence');
  const pathRef = useRef<SVGPathElement>(null);
  const animationRef = useRef<number>();

  // Stage timing
  useEffect(() => {
    if (stage === 'silence') {
      const t = setTimeout(() => setStage('stable'), 1000);
      return () => clearTimeout(t);
    }
    if (stage === 'stable') {
      const t = setTimeout(() => setStage('deviation'), 4000);
      return () => clearTimeout(t);
    }
    if (stage === 'deviation') {
      const t = setTimeout(() => setStage('realisation'), 2000);
      return () => clearTimeout(t);
    }
    if (stage === 'realisation') {
      const t = setTimeout(() => setStage('observe'), 3000);
      return () => clearTimeout(t);
    }
  }, [stage]);

  // Animate the path based on stage
  useEffect(() => {
    if (stage === 'silence') return;

    let startTime = performance.now();
    let frame: number;

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      let slope = 0;
      let phaseShift = 0;
      let amplitude = 15;

      if (stage === 'stable') {
        slope = 0;
        phaseShift = 0;
        amplitude = 15;
      } else if (stage === 'deviation') {
        // Gradual slope increase + rhythm irregularity
        const t = Math.min(1, Math.max(0, (elapsed - 2) / 2));
        slope = t * 0.08;
        phaseShift = Math.sin(elapsed * 1.2) * 0.3;
        amplitude = 15 + t * 6;
      } else {
        // realisation & observe – hold the deviation
        slope = 0.08;
        phaseShift = 0.2;
        amplitude = 20;
      }

      // Generate SVG path
      const points: string[] = [];
      for (let x = 0; x <= 800; x += 20) {
        const t = x / 800;
        const y = 100 + Math.sin(t * Math.PI * 4 + phaseShift) * amplitude + slope * (x - 400);
        points.push(`${x},${y}`);
      }
      const d = `M ${points.join(' L ')}`;
      if (pathRef.current) pathRef.current.setAttribute('d', d);

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [stage]);

  const handleObserve = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Centered container – shifted slightly lower */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 w-full max-w-2xl px-4">
        {/* SVG with dynamic path */}
        <svg viewBox="0 0 800 200" className="w-full">
          <path
            ref={pathRef}
            stroke="#e5e5e5"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        <div className="h-8" />

        {/* Realisation text */}
        {stage === 'realisation' && (
          <p className="text-center text-sm tracking-wide text-gray-300">
            It begins before you see it.
          </p>
        )}

        {/* Observe button */}
        {stage === 'observe' && (
          <button
            onClick={handleObserve}
            className="block mx-auto mt-6 text-xs uppercase tracking-widest bg-transparent border border-gray-600 px-6 py-2 rounded-none text-gray-300 hover:text-white hover:border-gray-400 transition"
          >
            Observe
          </button>
        )}
      </div>
    </div>
  );
}