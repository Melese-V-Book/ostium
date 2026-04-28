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
  const inquiryRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<number | null>(null);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const observeScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasScrolledToInquiry = useRef(false);

  // Original smart scroll after inquiry submission (to continuation content)
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

  const handleInquirySubmit = (text: string) => {
    setInquiryText(text);
    setInquirySubmitted(true);
    // Reveal continuation content after dissolution
    setTimeout(() => setIsRevealed(true), 600);
    // Start smart scroll 2 seconds after submission
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      startSmartScroll();
      scrollTimerRef.current = null;
    }, 2000);
  };

  // After entering corridor: start at top, wait 60 seconds, then scroll smoothly to inquiry box (only once)
  useEffect(() => {
    if (phase === 'corridor') {
      // Ensure page starts at the very top
      window.scrollTo(0, 0);

      // Clear any previous timers
      if (observeScrollTimerRef.current) clearTimeout(observeScrollTimerRef.current);
      hasScrolledToInquiry.current = false;

      // Wait 60 seconds, then scroll to inquiry box
      observeScrollTimerRef.current = setTimeout(() => {
        if (inquiryRef.current && !hasScrolledToInquiry.current) {
          inquiryRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          hasScrolledToInquiry.current = true;
        }
        observeScrollTimerRef.current = null;
      }, 60000); // 60 seconds
    }
    return () => {
      if (observeScrollTimerRef.current) clearTimeout(observeScrollTimerRef.current);
    };
  }, [phase]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      if (scrollAnimationRef.current) cancelAnimationFrame(scrollAnimationRef.current);
      if (observeScrollTimerRef.current) clearTimeout(observeScrollTimerRef.current);
    };
  }, []);

  if (phase === 'entry') return <EntryLayer onComplete={() => setPhase('impact')} />;
  if (phase === 'impact') return <FirstImpactSequence onComplete={() => setPhase('corridor')} />;

  return (
    <main className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 pointer-events-none">
        <PassiveBehaviorTrace mode="drift" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Engagement Layer (Top Banner, Safe Action, Briefs) */}
        <div className="max-w-3xl mx-auto text-center pt-12 pb-6 border-b border-gray-800">
          <p className="text-gray-300 text-sm tracking-wide leading-relaxed">
            An era of rising interdependence, shrinking margins,<br />
            and human accountability.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            #Ostium / CrossNodal: for engineers who need to understand reverberation before consequence.
          </p>
        </div>

        <div className="max-w-2xl mx-auto my-8 p-4 border border-gray-800 rounded-sm bg-black/50">
          <p className="text-gray-300 text-sm text-center font-light">Smallest safe first action:</p>
          <p className="text-center text-gray-400 text-base my-2 tracking-wide">
            Relevant / Route / Brief / No
          </p>
          <p className="text-gray-500 text-xs text-center">
            No endorsement, adoption, meeting, procurement, or institutional commitment is implied.
          </p>
        </div>

        <div className="max-w-2xl mx-auto my-6 text-center">
          <p className="text-gray-400 text-sm mb-2">Choose your path:</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
            <a href="/demonstration" className="hover:text-white transition">Technical demo →</a>
            <a href="/architecture" className="hover:text-white transition">Architecture brief →</a>
            <a href="#originality-brief" className="hover:text-white transition">One-page originality note →</a>
            <a href="#fifteen-second" className="hover:text-white transition">15-second summary →</a>
          </div>
        </div>

        <div className="max-w-2xl mx-auto my-8 p-4 border-l border-gray-800">
          <p className="text-gray-300 text-sm font-light">Compact Briefs</p>
          <p className="text-gray-500 text-xs my-2">
            For a first review, the full interface is not required. Available compact paths:
          </p>
          <ul className="text-gray-400 text-xs list-disc pl-5 space-y-1">
            <li>One-page orientation – <a href="#orientation" className="underline hover:text-white">view</a> (embedded below)</li>
            <li>Technical brief – see <a href="/architecture" className="underline hover:text-white">Architecture</a> section</li>
            <li>Originality note – <a href="#originality-brief" className="underline hover:text-white">below</a></li>
            <li>15-second summary – <a href="#fifteen-second" className="underline hover:text-white">below</a></li>
          </ul>
          <p className="text-gray-500 text-xs mt-2">
            These materials may be requested or forwarded without implying endorsement, adoption, validation, or institutional commitment.
          </p>
        </div>

        <div id="orientation" className="max-w-2xl mx-auto my-8 p-4 bg-gray-900/30 rounded-sm">
          <p className="text-gray-300 text-sm font-light">One‑page orientation</p>
          <p className="text-gray-400 text-xs mt-2">
            #Ostium / CrossNodal is a perceptual interface for systems engineers. It reveals how small boundary failures, transition states, and evidence quality can escalate into large consequences. It does not claim certification, adoption, or institutional authority. The aim is to allow serious technical readers to inspect, route, critique, or decline without implied commitment.
          </p>
        </div>

        <div id="originality-brief" className="max-w-2xl mx-auto my-8 p-4 bg-gray-900/30 rounded-sm">
          <p className="text-gray-300 text-sm font-light">One‑page originality note</p>
          <p className="text-gray-400 text-xs mt-2">
            What is novel: bounded interface discipline for system‑level reverberation, evidence‑aware demonstration, and human‑position recognition. What is not claimed: external validation, certification, operational control, or universal readiness.
          </p>
        </div>

        <div id="fifteen-second" className="max-w-2xl mx-auto my-8 p-4 bg-gray-900/30 rounded-sm">
          <p className="text-gray-300 text-sm font-light">15‑second summary</p>
          <p className="text-gray-400 text-xs mt-2">
            Systems are more interdependent and less transparent. #Ostium helps engineers see transition and consequence before failure. Reply with Relevant / Route / Brief / No – no commitment implied.
          </p>
        </div>

        {/* Trajectory Field */}
        <TrajectoryField mode="drift" />

        {/* Inquiry – with ref for scrolling after 60s */}
        <div ref={inquiryRef}>
          {!inquirySubmitted && <TrajectoryInquiry onSubmit={handleInquirySubmit} />}
        </div>

        {/* Continuation – dimmed until inquiry submission, then revealed */}
        <div className="transition-opacity duration-1000 ease-out" style={{ opacity: isRevealed ? 1 : 0.35 }}>
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