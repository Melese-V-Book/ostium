'use client';

import Link from 'next/link';

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link href="/" className="text-gray-500 text-sm hover:text-gray-300 transition">
          ← Return to Ostium
        </Link>

        <h1 className="text-2xl font-light tracking-wide mt-12 mb-8">Architecture: Evidence, Vitality, and Interface Continuity</h1>

        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <p>
            #Ostium / CrossNodal does not present architecture as structure alone. It carries two additional ecosystem values:
          </p>
          <div className="border-l-2 border-gray-700 pl-4">
            <p className="font-light text-gray-200">#Vital‑Axis</p>
            <p className="text-gray-400 text-xs mt-1">
              Keeps the human and operational consequence of the system visible. Prevents sterile architecture‑only presentation. Links system structure to lived operational burden. Anchors responsibility beyond technical elegance.
            </p>
          </div>
          <div className="border-l-2 border-gray-700 pl-4">
            <p className="font-light text-gray-200">#Aletheia‑Desk / #Aletheia‑Bench</p>
            <p className="text-gray-400 text-xs mt-1">
              Keeps evidence‑integrity, limitation awareness, benchmark discipline, and anti‑inflation posture explicit. Separates demonstration from proof, recognition from validation, and preserves bounded maturity.
            </p>
          </div>
          <p>
            Together, they allow the interface to show not only what the architecture contains, but how it preserves consequence‑awareness, evidence discipline, bounded maturity, and human accountability.
          </p>
        </div>

        {/* Simple value diagram */}
        <div className="my-12 p-4 border border-gray-800 rounded-sm text-center text-xs text-gray-500">
          <p>#Globo‑Dinámico</p>
          <p className="text-gray-600">↓</p>
          <p>#Vital‑Axis   #Aletheia‑Desk/Bench</p>
          <p className="text-gray-600">↓</p>
          <p>#Ostium‑II / CrossNodal</p>
          <p className="text-gray-600">↓</p>
          <p>Architecture | Demonstration | Roadmaps</p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-gray-600 text-xs text-center">
          <div className="space-y-1">
            <div>Cross‑Nodal</div>
            <div>#Globo‑Din&#225;mico</div>
            <div>TEYOTECH</div>
          </div>
        </div>
      </div>
    </main>
  );
}