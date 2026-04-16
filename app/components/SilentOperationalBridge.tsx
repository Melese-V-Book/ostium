'use client';

import { useEffect } from 'react';

export default function SilentOperationalBridge({ inquiryText }: { inquiryText: string | null }) {
  useEffect(() => {
    if (inquiryText) {
      fetch('/api/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inquiryText }),
      }).catch((err) => console.error('Capture failed', err));
    }
  }, [inquiryText]);

  return null;
}