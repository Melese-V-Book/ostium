'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import TrajectoryField from '../components/TrajectoryField';

export default function RoadmapsPage() {
  const phases = [
    {
      phase: 'Current',
      description: 'Stabilised core: systems study, bounded synthesis, responsiveness governance.',
      trajectory: 'stable → synthesis → verification',
      mode: 'drift', // stable, slight improvement tendency
    },
    {
      phase: 'Near',
      description: 'Extended orchestration across federated multi‑OS ecosystems and autonomous validation.',
      trajectory: 'integration → federation → autonomous audit',
      mode: 'step', // discrete jumps
    },
    {
      phase: 'Horizon',
      description: 'Civilisation‑scale coordination: interplanetary logistics, energy grids, and AI‑mediated resilience.',
      trajectory: 'scale → coherence → continuity',
      mode: 'hybrid_drift_bifurcation', // branching possibilities
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link href="/" className="text-gray-500 text-sm hover:text-gray-300 transition">
          ← Return to Ostium
        </Link>
        <h1 className="text-2xl font-light tracking-wide mt-12 mb-8">Trajectory</h1>
        <p className="text-gray-400 text-sm mb-12">
          The ecosystem evolves through bounded stages. Each phase is a declared trajectory, not a
          promise of delivery. Resilience and capability are earned step by step.
        </p>
        <div className="space-y-16">
          {phases.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border-l-2 border-gray-700 pl-6"
            >
              <h2 className="text-md font-light tracking-wide text-gray-200">{item.phase}</h2>
              <div className="mt-2 mb-3">
                <TrajectoryField mode={item.mode as any} />
              </div>
              <p className="text-gray-400 text-sm mt-1">{item.description}</p>
              <p className="text-gray-500 text-xs mt-2 font-mono">{item.trajectory}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800 text-gray-600 text-xs text-center">
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