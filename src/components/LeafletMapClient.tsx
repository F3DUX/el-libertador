'use client';

/**
 * LeafletMapClient — SSR-safe dynamic wrapper for LeafletMap.
 *
 * React Leaflet requires browser APIs (window, document). Next.js tries
 * to server-render components by default, which crashes with Leaflet.
 * This wrapper uses next/dynamic with { ssr: false } to guarantee Leaflet
 * is only instantiated on the client.
 */

import dynamic from 'next/dynamic';
import React from 'react';
import { MapCoordinates } from '@/types/game';

interface LeafletMapClientProps {
  location: string;
  coords: MapCoordinates;
  visitedWaypoints: MapCoordinates[];
}

// Dynamically import the actual Leaflet map with SSR disabled
const LeafletMap = dynamic(
  () => import('./LeafletMap').then((mod) => ({ default: mod.LeafletMap })),
  {
    ssr: false,
    loading: () => (
      <div
        className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center"
        style={{
          height: 'clamp(260px, 38vw, 480px)',
          background: 'linear-gradient(160deg, #0d1e38 0%, #1B365D 100%)',
          border: '2px solid rgba(212,175,55,0.4)',
          boxShadow: '0 8px 32px rgba(27,54,93,0.35)',
        }}
      >
        {/* Loading animation */}
        <div className="flex flex-col items-center gap-4 select-none">
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              border: '3px solid rgba(212,175,55,0.2)',
              borderTop: '3px solid #D4AF37',
              animation: 'spin 1s linear infinite',
            }}
          />
          <div
            style={{
              fontFamily: "'Cinzel', serif",
              color: '#D4AF37',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              fontWeight: 600,
            }}
          >
            Cargando cartografía histórica…
          </div>
          <div
            style={{
              color: '#75AADB',
              fontSize: '0.6rem',
              fontFamily: "'Merriweather', serif",
              opacity: 0.7,
            }}
          >
            Mapa del Río de la Plata, siglo XIX
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    ),
  }
);

export const LeafletMapClient: React.FC<LeafletMapClientProps> = ({
  location,
  coords,
  visitedWaypoints,
}) => {
  return (
    <LeafletMap
      location={location}
      coords={coords}
      visitedWaypoints={visitedWaypoints}
    />
  );
};
