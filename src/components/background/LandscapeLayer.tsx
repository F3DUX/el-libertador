'use client';
// ============================================================
//  LandscapeLayer.tsx — Region-specific SVG foreground scenery
//  with animated vegetation (wind sway via CSS)
//  EL LIBERTADOR — Living Background System
// ============================================================

import React from 'react';
import { RegionConfig } from './backgroundConfig';

interface LandscapeLayerProps {
  region: RegionConfig;
  parallaxX?: number;
}

// ── PAMPA — Buenos Aires, wide horizons ──────────────────────
function PampaLandscape() {
  return (
    <svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
      {/* Ground plane */}
      <rect x="0" y="140" width="1200" height="60" fill="#7fb069" />
      <rect x="0" y="150" width="1200" height="50" fill="#6a9455" />

      {/* Rolling hills */}
      <ellipse cx="200" cy="150" rx="280" ry="30" fill="#8fbc8f" opacity="0.6" />
      <ellipse cx="800" cy="148" rx="350" ry="28" fill="#8fbc8f" opacity="0.5" />

      {/* Grass tufts */}
      {[50, 150, 300, 450, 600, 750, 850, 950, 1050, 1150].map((x, i) => (
        <g key={i} style={{ transformOrigin: `${x}px 148px`, animation: `bg-sway ${2.5 + (i % 3) * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}>
          <line x1={x} y1="148" x2={x - 4} y2="132" stroke="#5a8040" strokeWidth="2" />
          <line x1={x} y1="148" x2={x} y2="128" stroke="#6a9455" strokeWidth="2" />
          <line x1={x} y1="148" x2={x + 4} y2="134" stroke="#5a8040" strokeWidth="2" />
        </g>
      ))}

      {/* Ombú tree (quintessential pampa tree) */}
      <g transform="translate(380, 70)">
        <rect x="-6" y="65" width="12" height="30" fill="#5c3a1e" rx="3" />
        <ellipse cx="0" cy="55" rx="45" ry="35" fill="#3d7a3d" style={{ animation: 'bg-sway 3s ease-in-out infinite', transformOrigin: '0px 90px' }} />
        <ellipse cx="-15" cy="65" rx="30" ry="22" fill="#4a8a4a" style={{ animation: 'bg-sway 3.4s ease-in-out infinite', transformOrigin: '0px 90px' }} />
      </g>

      {/* Eucalyptus / poplar trees in distance */}
      {[650, 700, 750].map((x, i) => (
        <g key={i} transform={`translate(${x}, 80)`} style={{ animation: `bg-sway ${2.8 + i * 0.2}s ease-in-out infinite`, transformOrigin: `${x}px 155px`, animationDelay: `${i * 0.3}s` }}>
          <rect x="-3" y="40" width="6" height="55" fill="#4a3728" rx="2" />
          <ellipse cx="0" cy="30" rx="12" ry="28" fill="#3d6b3d" />
        </g>
      ))}

      {/* Distant town silhouette */}
      <rect x="900" y="127" width="18" height="18" fill="#6d7b8d" opacity="0.5" />
      <polygon points="900,127 909,118 918,127" fill="#5a6875" opacity="0.5" />
      <rect x="930" y="132" width="14" height="13" fill="#6d7b8d" opacity="0.4" />
    </svg>
  );
}

// ── SELVA — Misiones ─────────────────────────────────────────
function SelvaLandscape() {
  return (
    <svg viewBox="0 0 1200 220" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
      <rect x="0" y="170" width="1200" height="50" fill="#1b4332" />

      {/* Dense jungle canopy */}
      {[0, 80, 160, 260, 380, 500, 620, 740, 860, 980, 1100].map((x, i) => (
        <g key={i}>
          <ellipse
            cx={x + 50}
            cy={140 - (i % 3) * 15}
            rx={55 + (i % 4) * 10}
            ry={45 + (i % 3) * 8}
            fill={i % 2 === 0 ? '#1b4332' : '#2d6a4f'}
            style={{ animation: `bg-sway ${2 + (i % 4) * 0.5}s ease-in-out infinite`, transformOrigin: `${x + 50}px 190px`, animationDelay: `${i * 0.15}s` }}
          />
          <ellipse
            cx={x + 50}
            cy={155 - (i % 2) * 10}
            rx={40 + (i % 3) * 8}
            ry={30 + (i % 2) * 5}
            fill={i % 2 === 0 ? '#40916c' : '#52b788'}
            opacity="0.7"
            style={{ animation: `bg-sway ${2.5 + (i % 3) * 0.4}s ease-in-out infinite`, transformOrigin: `${x + 50}px 190px`, animationDelay: `${i * 0.2 + 0.3}s` }}
          />
        </g>
      ))}

      {/* Jesuit mission ruins hint */}
      <g opacity="0.35">
        <rect x="550" y="140" width="40" height="35" fill="#8b7355" />
        <polygon points="550,140 570,118 590,140" fill="#7a6345" />
        <rect x="562" y="152" width="16" height="23" fill="#5c4a35" />
      </g>
    </svg>
  );
}

// ── ANDES VALLEY — Mendoza/Cuyo ──────────────────────────────
function AndesValleyLandscape() {
  return (
    <svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
      <rect x="0" y="155" width="1200" height="45" fill="#8fbc8f" />
      <rect x="0" y="165" width="1200" height="35" fill="#6a9455" />

      {/* Vineyard rows */}
      {[150, 300, 450, 600, 750, 900].map((x, i) => (
        <g key={i}>
          <rect x={x} y="155" width="80" height="8" fill="#5a8040" opacity="0.6" rx="2" />
          <rect x={x + 10} y="148" width="60" height="10" fill="#4a6f30" opacity="0.5" rx="2" />
        </g>
      ))}

      {/* Poplar windbreaks */}
      {[120, 480, 840].map((x, i) => (
        <g key={i}>
          {[0, 18, 36].map((dx, j) => (
            <g key={j} style={{ animation: `bg-sway ${2 + j * 0.3}s ease-in-out infinite`, transformOrigin: `${x + dx + 5}px 170px` }}>
              <rect x={x + dx} y="100" width="10" height="60" fill="#5c7a3e" rx="3" />
              <ellipse cx={x + dx + 5} cy="95" rx="9" ry="22" fill="#4a6b30" />
            </g>
          ))}
        </g>
      ))}

      {/* Acequia (irrigation canal) */}
      <rect x="0" y="162" width="1200" height="4" fill="#74b9ff" opacity="0.3" />

      {/* Adobe building */}
      <rect x="900" y="135" width="55" height="25" fill="#c4a882" />
      <rect x="900" y="125" width="55" height="12" fill="#b09060" />
      <rect x="918" y="148" width="10" height="12" fill="#6d4c41" />
    </svg>
  );
}

// ── ANDEAN CROSS — Andes crossing ────────────────────────────
function AndeanCrossLandscape() {
  return (
    <svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
      <rect x="0" y="160" width="1200" height="40" fill="#c8d6c8" />
      {/* Snow ground */}
      <rect x="0" y="155" width="1200" height="15" fill="rgba(255,255,255,0.6)" />

      {/* Mule train silhouette */}
      <g opacity="0.7" style={{ animation: 'march-across 45s linear infinite' }}>
        {[0, 25, 50, 75, 100].map((dx, i) => (
          <g key={i} transform={`translate(${200 + dx}, 152)`}>
            {/* Mule body */}
            <ellipse cx="0" cy="0" rx="12" ry="7" fill="#4a3728" />
            <circle cx="12" cy="-3" r="4" fill="#4a3728" />
            {/* Legs */}
            <line x1="-6" y1="6" x2="-8" y2="16" stroke="#3d2a1a" strokeWidth="2" />
            <line x1="2" y1="6" x2="0" y2="16" stroke="#3d2a1a" strokeWidth="2" />
            <line x1="6" y1="6" x2="8" y2="16" stroke="#3d2a1a" strokeWidth="2" />
            {/* Load */}
            <rect x="-8" y="-10" width="14" height="8" fill="#8b7355" rx="2" />
          </g>
        ))}
        {/* Soldier leading */}
        <g transform="translate(135, 145)">
          <ellipse cx="0" cy="8" rx="5" ry="9" fill="#2c3e50" />
          <circle cx="0" cy="-2" r="4" fill="#d4a574" />
        </g>
      </g>

      {/* Rocky outcrops */}
      {[100, 380, 700, 950].map((x, i) => (
        <polygon key={i} points={`${x},160 ${x + 20},138 ${x + 40},155 ${x + 35},160`} fill="#8d8d8d" />
      ))}
    </svg>
  );
}

// ── COASTAL — Chile ──────────────────────────────────────────
function CoastalLandscape() {
  return (
    <svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
      {/* Sea */}
      <rect x="0" y="140" width="1200" height="60" fill="#1a6b8a" />
      {/* Waves */}
      {[0, 1, 2, 3].map(i => (
        <path key={i}
          d={`M ${i * 300} 148 Q ${i * 300 + 75} 143 ${i * 300 + 150} 148 Q ${i * 300 + 225} 153 ${i * 300 + 300} 148`}
          stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"
          style={{ animation: `wave-drift 4s ease-in-out infinite`, animationDelay: `${i * 0.8}s` }}
        />
      ))}
      {/* Land */}
      <rect x="0" y="150" width="500" height="50" fill="#52796f" />
      <path d="M 0 150 Q 150 130 300 145 Q 400 152 500 150 L 500 200 L 0 200 Z" fill="#3d6b5a" />

      {/* Pine trees on coast */}
      {[80, 140, 200, 260, 320].map((x, i) => (
        <g key={i} style={{ animation: `bg-sway ${2.5 + i * 0.2}s ease-in-out infinite`, transformOrigin: `${x}px 165px` }}>
          <rect x={x - 3} y="130" width="6" height="30" fill="#4a3728" />
          <polygon points={`${x},100 ${x - 18},130 ${x + 18},130`} fill="#2d5016" />
          <polygon points={`${x},88 ${x - 14},115 ${x + 14},115`} fill="#3a6b1e" />
        </g>
      ))}

      {/* Sailing ship in distance */}
      <g transform="translate(750, 130)" opacity="0.65" style={{ animation: 'ship-drift 20s ease-in-out infinite' }}>
        <rect x="-15" y="5" width="30" height="10" fill="#8b7355" rx="2" />
        <line x1="0" y1="-25" x2="0" y2="8" stroke="#5c3a1e" strokeWidth="2" />
        <polygon points="-14,-5 0,-25 0,5" fill="rgba(255,255,255,0.85)" />
        <polygon points="2,-20 14,-5 2,3" fill="rgba(255,255,255,0.75)" />
      </g>
    </svg>
  );
}

// ── ALTIPLANO — Perú ─────────────────────────────────────────
function AltiplanoLandscape() {
  return (
    <svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
      <rect x="0" y="158" width="1200" height="42" fill="#c4a55a" />
      <rect x="0" y="162" width="1200" height="38" fill="#b8914a" />

      {/* Ichu grass tufts */}
      {[50, 130, 250, 400, 550, 700, 850, 1000, 1150].map((x, i) => (
        <g key={i} style={{ animation: `bg-sway-gentle ${3 + (i % 3) * 0.6}s ease-in-out infinite`, animationDelay: `${i * 0.25}s`, transformOrigin: `${x}px 165px` }}>
          <ellipse cx={x} cy="160" rx="15" ry="8" fill="#c9a227" opacity="0.7" />
          <ellipse cx={x} cy="155" rx="8" ry="12" fill="#dbb42c" opacity="0.6" />
        </g>
      ))}

      {/* Incan wall fragments */}
      <g opacity="0.5">
        {[350, 355, 360, 365, 370].map((x, i) => (
          <rect key={i} x={x * 1.5} y={150 + (i % 2) * 3} width="12" height="14" fill="#7a6345" rx="1" />
        ))}
      </g>

      {/* Llamas */}
      <g transform="translate(800, 148)" opacity="0.8">
        {/* Llama body */}
        <ellipse cx="0" cy="0" rx="18" ry="9" fill="#c9b99a" />
        <ellipse cx="15" cy="-6" rx="7" ry="4" fill="#c9b99a" />
        <ellipse cx="20" cy="-12" rx="4" ry="5" fill="#c9b99a" />
        <line x1="-8" y1="8" x2="-8" y2="22" stroke="#a0907a" strokeWidth="2.5" />
        <line x1="8" y1="8" x2="9" y2="22" stroke="#a0907a" strokeWidth="2.5" />
      </g>
    </svg>
  );
}

// ── EUROPEAN — France/Belgium ─────────────────────────────────
function EuropeanLandscape() {
  return (
    <svg viewBox="0 0 1200 200" preserveAspectRatio="xMidYMax slice" className="w-full h-full">
      <rect x="0" y="155" width="1200" height="45" fill="#5a8040" />
      <rect x="0" y="162" width="1200" height="38" fill="#4a7030" />

      {/* Rolling green hills */}
      <ellipse cx="300" cy="160" rx="400" ry="40" fill="#6a9455" opacity="0.5" />
      <ellipse cx="900" cy="158" rx="450" ry="38" fill="#6a9455" opacity="0.4" />

      {/* Deciduous trees */}
      {[100, 200, 350, 700, 850, 1000].map((x, i) => (
        <g key={i} style={{ animation: `bg-sway ${2.5 + (i % 4) * 0.4}s ease-in-out infinite`, transformOrigin: `${x}px 170px`, animationDelay: `${i * 0.2}s` }}>
          <rect x={x - 5} y="120" width="10" height="40" fill="#5c3a1e" rx="4" />
          <ellipse cx={x} cy="108" rx="28" ry="24" fill="#3d6b1a" />
          <ellipse cx={x - 10} cy="120" rx="18" ry="16" fill="#4a7f20" opacity="0.8" />
        </g>
      ))}

      {/* Church tower */}
      <g transform="translate(580, 95)" opacity="0.65">
        <rect x="-12" y="30" width="24" height="50" fill="#8b9aa8" />
        <polygon points="-12,30 0,5 12,30" fill="#6d7e8c" />
        <rect x="-2" y="15" width="4" height="15" fill="#4a5a68" />
        {/* Clock face */}
        <circle cx="0" cy="45" r="8" fill="#c8d0d8" opacity="0.6" />
      </g>

      {/* Cobblestone path hint */}
      <path d="M 450 170 Q 600 165 750 170" stroke="#8b8070" strokeWidth="8" fill="none" opacity="0.4" />
    </svg>
  );
}

// ── ANDEAN CROSS extra ────────────────────────────────────────
// (already defined above, included in main export)

// ── Main component ────────────────────────────────────────────
export function LandscapeLayer({ region, parallaxX = 0 }: LandscapeLayerProps) {
  const px = parallaxX * 35;

  const LandscapeComponent = {
    pampa: PampaLandscape,
    selva: SelvaLandscape,
    andes_valley: AndesValleyLandscape,
    andean_cross: AndeanCrossLandscape,
    coastal: CoastalLandscape,
    altiplano: AltiplanoLandscape,
    european: EuropeanLandscape,
  }[region.landscape];

  return (
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden"
      style={{
        height: '45%',
        transform: `translateX(${px}px)`,
        transition: 'transform 0.1s linear',
      }}
    >
      <LandscapeComponent />
    </div>
  );
}
