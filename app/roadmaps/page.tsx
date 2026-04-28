'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RoadmapsPage() {
  const phases = [
    {
      phase: 'Phase 1 — First‑contact readiness',
      description: 'Era‑condition banner, Safe First Action Layer, compact briefs, reader path selector.  (Implemented)',
      vital_aletheia: '#Vital‑Axis ensures human consequence visible; #Aletheia ensures anti‑inflation posture.',
    },
    {
      phase: 'Phase 2 — Bounded demonstration readiness',
      description: 'Technical‑first path, demonstration card template with evidence boundary and human consequence fields.',
      vital_aletheia: 'Demonstrations become inspection objects, not marketing examples.',
    },
    {
      phase: 'Phase 3 — Evidence maturity and benchmark discipline',
      description: 'Stronger #Aletheia‑Bench alignment, limitation tracking, maturity classification.',
      vital_aletheia: 'Comparability without false standard claims.',
    },
    {
      phase: 'Phase 4 — Human‑position and domain‑specific maturity',
      description: 'Role‑specific reader routes, responsibility mapping, domain‑specific consequence framing.',
      vital_aletheia: 'Interface adapts to real human positions, not generic profiles.',
    },
    {
      phase: 'Phase 5 — Cross‑domain ecosystem continuity',
      description: '#Globo‑Dinámico synchronization, registry alignment, bounded expansion discipline.',
      vital_aletheia: 'Preservation of non‑authority, human judgment primacy.',
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link href="/" className="text-gray-500 text-sm hover:text-gray-300 transition">
          ← Return to Ostium
        </Link>
        <h1 className="text-2xl font-light tracking-wide mt-12 mb-6">Roadmaps: From Interface Readiness to Evidence‑Mature Growth</h1>
        <p className="text-gray-400 text-sm mb-12">
          The roadmap for #Ostium / CrossNodal is not only a feature roadmap. It is a maturity roadmap.
          #Vital‑Axis guides human‑position relevance. #Aletheia‑Desk/Bench guides evidence maturity and limitation‑awareness.
        </p>

        <div className="space-y-12">
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
              <p className="text-gray-400 text-sm mt-1">{item.description}</p>
              <p className="text-gray-500 text-xs mt-2 font-mono">{item.vital_aletheia}</p>
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