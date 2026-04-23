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
  const [isRevealed, setIsRevealed] = useState(false);

  const groundingRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollAnimationRef = useRef<number | null>(null);

  // Smart continuous scroll (only after reveal)
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

  // Handle inquiry submission
  const handleInquirySubmit = (text: string) => {
    setInquiryText(text);
    setInquirySubmitted(true);
  };

  // Reveal continuation after submission (with delay, then scroll)
  useEffect(() => {
    if (inquirySubmitted) {
      // Wait for dissolution animation (approx 600ms) then reveal
      const revealTimer = setTimeout(() => {
        setIsRevealed(true);
      }, 600);

      // Start smart scroll 2 seconds after submission
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        startSmartScroll();
        scrollTimerRef.current = null;
      }, 2000);

      return () => {
        clearTimeout(revealTimer);
        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
        if (scrollAnimationRef.current) cancelAnimationFrame(scrollAnimationRef.current);
      };
    }
  }, [inquirySubmitted]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      if (scrollAnimationRef.current) cancelAnimationFrame(scrollAnimationRef.current);
    };
  }, []);

  if (phase === 'entry') {
    return <EntryLayer onComplete={() => setPhase('impact')} />;
  }

  if (phase === 'impact') {
    return <FirstImpactSequence onComplete={() => setPhase('corridor')} />;
  }

  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Passive trace – always full opacity */}
      <div className="absolute inset-0 pointer-events-none">
        <PassiveBehaviorTrace mode="drift" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Main trajectory – always full visibility */}
        <TrajectoryField mode="drift" />

        {/* Inquiry – only if not submitted */}
        {!inquirySubmitted && <TrajectoryInquiry onSubmit={handleInquirySubmit} />}

        {/* Continuation content – opacity transitions on reveal */}
        <div
          className="transition-opacity duration-1000 ease-out"
          style={{ opacity: isRevealed ? 1 : 0.35 }}
        >
          <div ref={groundingRef}>
            <StructuralGrounding />
          </div>
          <BehavioralExtension />
          <StructuralResonance />
          <EngagementPath />
          <IdentityLayer />
        </div>

        <SilentOperationalBridge inquiryText={inquiryText} />
      </div>
    </main>
  );
}