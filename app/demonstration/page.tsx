'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import TrajectoryField from '../components/TrajectoryField';

export default function DemonstrationPage() {
  const examples = [
    {
      title: 'Continuous Drift',
      description: 'Gradual deviation from nominal behaviour. Instability emerges slowly, then accelerates.',
      mode: 'drift',
    },
    {
      title: 'Discrete Step',
      description: 'Sudden state changes. The system jumps between plateaus before entering consequence.',
      mode: 'step',
    },
    {
      title: 'Silent → Abrupt',
      description: 'Long stability, then sudden divergence. Hidden condition surfaces without warning.',
      mode: 'silent_abrupt',
    },
    {
      title: 'Oscillatory Instability',
      description: 'Rhythm changes before amplitude grows. Feedback loops become unstable.',
      mode: 'oscillatory',
    },
    {
      title: 'Cascading Propagation',
      description: 'Local disturbance spreads. Failure amplifies across connected subsystems.',
      mode: 'cascade',
    },
    {
      title: 'Hybrid: Drift + Step',
      description: 'Continuous degradation interrupted by discrete regime shifts.',
      mode: 'hybrid_drift_step',
    },
    {
      title: 'Hybrid: Drift + Bifurcation',
      description: 'Gradual drift leads to a branching of possible futures.',
      mode: 'hybrid_drift_bifurcation',
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/" className="text-gray-500 text-sm hover:text-gray-300 transition">
          ← Return to Ostium
        </Link>
        <h1 className="text-2xl font-light tracking-wide mt-12 mb-8">Behavioural Demonstrations</h1>
        <p className="text-gray-400 text-sm mb-12 max-w-2xl">
          The following trajectories illustrate generic system behaviours. Each belongs to a different
          archetype – continuous, discrete, silent, oscillatory, cascading, or hybrid.
          No domain labels are needed. A systems engineer will recognise their own system in one or more of these patterns.
        </p>
        <div className="space-y-24">
          {examples.map((ex, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <TrajectoryField mode={ex.mode as any} />
              <div className="mt-4 text-center">
                <h2 className="text-md font-light tracking-wide text-gray-200">{ex.title}</h2>
                <p className="text-gray-500 text-xs mt-1">{ex.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-24 pt-8 border-t border-gray-800 text-gray-600 text-xs text-center">
          <div className="space-y-1">
            <div>Cross‑Nodal</div>
            <div>#Globo‑Din&#225;mico</div>
            <div>TEYOTECH</div>
          </div>
        </div>
      </div>
    </main>
  );
}