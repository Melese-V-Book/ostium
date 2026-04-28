'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import TrajectoryField from '../components/TrajectoryField';

export default function DemonstrationPage() {
  const demos = [
    {
      title: 'Reverberation Before Consequence',
      condition: 'A local decision or signal begins to affect downstream system behavior.',
      transition: 'Boundary shift, propagation, escalation, or evidence degradation.',
      vital_relevance: 'What human or operational consequence becomes visible?',
      aletheia_boundary: 'What evidence exists, and what does it not prove?',
      human_judgment: 'Where the reader or reviewer must still decide.',
    },
    {
      title: 'Drift into Step',
      condition: 'Continuous degradation interrupted by discrete regime shift.',
      transition: 'Hidden state change followed by observable jump.',
      vital_relevance: 'Who bears the cost if the regime shift is missed?',
      aletheia_boundary: 'The simulation shows pattern, not real‑world measurement.',
      human_judgment: 'Whether the drift is truly detectable before the step.',
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/" className="text-gray-500 text-sm hover:text-gray-300 transition">
          ← Return to Ostium
        </Link>
        <h1 className="text-2xl font-light tracking-wide mt-12 mb-8">Demonstration: From Structure to Bounded Evidence</h1>
        <p className="text-gray-400 text-sm mb-12 max-w-2xl">
          Demonstrations in #Ostium / CrossNodal are not presented as proof, certification, or external validation.
          They are bounded visibility exercises. #Vital‑Axis keeps them connected to human consequence.
          #Aletheia‑Desk/Bench keeps them bounded by evidence discipline and limitation‑awareness.
        </p>

        <div className="space-y-24">
          {demos.map((demo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border-l-2 border-gray-700 pl-6"
            >
              <TrajectoryField mode={idx === 0 ? 'hybrid_drift_bifurcation' : 'hybrid_drift_step'} />
              <div className="mt-4 space-y-3">
                <h2 className="text-md font-light tracking-wide text-gray-200">{demo.title}</h2>
                <p className="text-gray-400 text-xs"><span className="font-mono">Condition:</span> {demo.condition}</p>
                <p className="text-gray-400 text-xs"><span className="font-mono">Transition visible:</span> {demo.transition}</p>
                <p className="text-gray-400 text-xs"><span className="font-mono">#Vital‑Axis relevance:</span> {demo.vital_relevance}</p>
                <p className="text-gray-400 text-xs"><span className="font-mono">#Aletheia evidence boundary:</span> {demo.aletheia_boundary}</p>
                <p className="text-gray-400 text-xs"><span className="font-mono">Human judgment retained:</span> {demo.human_judgment}</p>
                <p className="text-gray-500 text-2xs mt-2">Safe first action: Relevant / Route / Brief / No</p>
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