'use client';

import { useState, useEffect, useRef } from 'react';
import EntryLayer from './components/EntryLayer';
import FirstImpactSequence from './components/FirstImpactSequence';
import TrajectoryField from './components/TrajectoryField';
import PassiveBehaviorTrace from './components/PassiveBehaviorTrace';
import TrajectoryInquiry from './components/TrajectoryInquiry';
import StructuralGrounding from './components/StructuralGrounding';
import BehavioralExtension from './components/BehavioralExtension';
import StructuralResonance from './components/StructuralResonance';
import EngagementPath from './components/EngagementPath';
import IdentityLayer from './components/IdentityLayer';
import SilentOperationalBridge from './components/SilentOperationalBridge';

export default function Home() {
  const [phase, setPhase] = useState<'entry' | 'impact' | 'corridor'>('entry');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryText, setInquiryText] = useState<string | null>(null);

  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollAnimationRef = useRef<number | null>(null);

  // Smart continuous scroll
  const startSmartScroll = () => {
    const startY = window.scrollY;
    const targetY = document.body.scrollHeight - window.innerHeight;
    if (targetY <= startY) return;

    const duration = 6000; // 6 seconds
    const startTime = performance.now();

    const animateScroll = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const newY = startY + (targetY - startY) * progress;
      window.scrollTo(0, newY);
      if (progress < 1) {
        scrollAnimationRef.current = requestAnimationFrame(animateScroll);
      } else {
        scrollAnimationRef.current = null;
      }
    };

    if (scrollAnimationRef.current) cancelAnimationFrame(scrollAnimationRef.current);
    scrollAnimationRef.current = requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    if (inquirySubmitted) {
      // Wait 2 seconds after dissolution, then start slow continuous scroll
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        startSmartScroll();
        scrollTimerRef.current = null;
      }, 2000);
    }
    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      if (scrollAnimationRef.current) cancelAnimationFrame(scrollAnimationRef.current);
    };
  }, [inquirySubmitted]);

  const handleInquirySubmit = (text: string) => {
    setInquiryText(text);
    setInquirySubmitted(true);
  };

  if (phase === 'entry') {
    return <EntryLayer onComplete={() => setPhase('impact')} />;
  }

  if (phase === 'impact') {
    return <FirstImpactSequence onComplete={() => setPhase('corridor')} />;
  }

  return (
    <main className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 pointer-events-none">
        <PassiveBehaviorTrace mode="drift" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <TrajectoryField mode="drift" />

        {!inquirySubmitted && <TrajectoryInquiry onSubmit={handleInquirySubmit} />}

        <StructuralGrounding />
        <BehavioralExtension />
        <StructuralResonance />
        <EngagementPath />
        <IdentityLayer />
        <SilentOperationalBridge inquiryText={inquiryText} />
      </div>
    </main>
  );
}