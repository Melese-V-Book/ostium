'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ArchitecturePage() {
  const capabilities = [
    'Bounded systems study and dynamic analysis',
    'Bounded closed‑loop controller synthesis',
    'Responsiveness‑state architectural discipline',
    'Validation‑aware multi‑stack engineering structuring',
    'Separation‑preserving high‑complexity orchestration',
    'Composition, coordination, and harmonisation across domains',
    'Transformation and process‑bridging architectural value',
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link href="/" className="text-gray-500 text-sm hover:text-gray-300 transition">
          ← Return to Ostium
        </Link>
        <h1 className="text-2xl font-light tracking-wide mt-12 mb-6">Architecture</h1>
        <p className="text-gray-300 text-sm leading-relaxed mb-8">
          #Globo‑Dinámico is a multi‑domain systems study, design, synthesis, and orchestration
          architecture. It enables disciplined reasoning about high‑complexity systems without
          overclaiming autonomy or deployment readiness.
        </p>
        <p className="text-gray-400 text-sm mb-6">Its demonstrated capabilities include:</p>
        <ul className="space-y-3 mb-12">
          {capabilities.map((cap, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="text-gray-300 text-sm list-disc ml-5"
            >
              {cap}
            </motion.li>
          ))}
        </ul>
        <p className="text-gray-500 text-xs border-t border-gray-800 pt-6 mt-6">
          These capabilities are extracted from working architectural artefacts. No claim of
          industrial‑scale manufacturing, autonomous deployment, or universal execution authority
          is made.
        </p>
        <div className="mt-12 text-center text-gray-600 text-xs space-y-1">
          <div>Cross‑Nodal</div>
          <div>#Globo‑Din&#225;mico</div>
          <div>TEYOTECH</div>
        </div>
      </div>
    </main>
  );
}