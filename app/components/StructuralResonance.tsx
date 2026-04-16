'use client';

import { motion } from 'framer-motion';

export default function StructuralResonance() {
  const lines = [
    'Observation precedes recognition.',
    'Recognition precedes interpretation.',
    'Where stability narrows before collapse.',
    'Where change precedes consequence.',
  ];

  return (
    <div className="max-w-2xl mx-auto py-24 space-y-6 text-center">
      {lines.map((line, idx) => (
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="text-gray-300 text-sm tracking-wide"
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}