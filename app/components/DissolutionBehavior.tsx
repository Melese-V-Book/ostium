'use client';

import { useState } from 'react';

interface TrajectoryInquiryProps {
  onSubmit: (text: string) => void;
}

export default function TrajectoryInquiry({ onSubmit }: TrajectoryInquiryProps) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onSubmit(value.trim());
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-16">
      <p className="text-sm text-gray-400 text-center max-w-md">
        What system behavior are you unable to see before it becomes critical?
      </p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-transparent border-b border-gray-700 text-center text-sm w-64 outline-none focus:border-gray-400 transition"
      />
    </div>
  );
}