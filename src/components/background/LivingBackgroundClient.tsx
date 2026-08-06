'use client';
// ============================================================
//  LivingBackgroundClient.tsx — SSR-safe dynamic import wrapper
//  EL LIBERTADOR — Living Background System
// ============================================================

import dynamic from 'next/dynamic';

const LivingBackgroundDynamic = dynamic(
  () => import('./LivingBackground').then(m => ({ default: m.LivingBackground })),
  {
    ssr: false,
    loading: () => (
      // Static fallback — matches the Buenos Aires dawn palette
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: 'linear-gradient(to bottom, #75aadb 0%, #c8e6f5 50%, #7fb069 100%)',
        }}
      />
    ),
  }
);

interface LivingBackgroundClientProps {
  location?: string;
  mapCoords?: { lat: number; lng: number } | null;
}

export function LivingBackgroundClient(props: LivingBackgroundClientProps) {
  return <LivingBackgroundDynamic {...props} />;
}
