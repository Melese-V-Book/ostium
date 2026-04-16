'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrajectoryInquiryProps {
  onSubmit: (text: string) => void;
}

export default function TrajectoryInquiry({ onSubmit }: TrajectoryInquiryProps) {
  const [value, setValue] = useState('');
  const [isDissolving, setIsDissolving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!value.trim()) return;
    setIsDissolving(true);
    onSubmit(value.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Auto-focus on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <AnimatePresence>
      {!isDissolving && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center space-y-4 py-16"
        >
          <p className="text-sm text-gray-400 text-center max-w-md">
            What system behavior are you unable to see before it becomes critical?
          </p>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-b border-gray-700 text-center text-sm w-64 outline-none focus:border-gray-400 transition"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}