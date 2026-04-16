'use client';

import { motion } from 'framer-motion';
import TrajectoryField from './TrajectoryField';

export default function BehavioralExtension() {
  return (
    <div className="py-24 space-y-32">
      <div>
        <TrajectoryField mode="drift" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 text-sm mt-4"
        >
          Drift before instability.
        </motion.p>
      </div>
      <div>
        <TrajectoryField mode="step" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 text-sm mt-4"
        >
          Transition before threshold.
        </motion.p>
      </div>
      <div>
        <TrajectoryField mode="hybrid_drift_bifurcation" />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 text-sm mt-4"
        >
          Separation before consequence.
        </motion.p>
      </div>
    </div>
  );
}