'use client';

import { motion } from 'framer-motion';

export default function EngagementPath() {
  return (
    <div className="py-24 text-center space-y-4">
      <p className="text-gray-400 text-sm">
        If continuation is necessary, a direct channel exists.
      </p>
      <a
        href="mailto:contact@cross-nodal.com"
        className="text-gray-500 text-xs hover:text-gray-300 transition"
      >
        contact@cross-nodal.com
      </a>
    </div>
  );
}