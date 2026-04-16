'use client';

import { useEffect } from 'react';

export default function EntryLayer({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);
  return <div className="fixed inset-0 bg-black" />;
}