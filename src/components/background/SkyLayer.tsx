'use client';
// ============================================================
//  SkyLayer.tsx — Animated sky with day/night cycle + sun/moon
//  EL LIBERTADOR — Living Background System
// ============================================================

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { RegionConfig, getDayProgress, getDayPhase, lerpColor, DayPhase } from './backgroundConfig';

interface SkyLayerProps {
  region: RegionConfig;
}

interface SkyColors {
  top: string;
  mid: string;
  bottom: string;
  phase: DayPhase;
  progress: number;
}

function interpolateSkyPhase(region: RegionConfig, cycleProg: number): SkyColors {
  // Map 0–1 cycle to phases
  // 0.00–0.12 dawn, 0.12–0.55 day, 0.55–0.72 dusk, 0.72–1.00 night
  const { sky } = region;
  const phase = getDayPhase(cycleProg);

  const getPhaseColors = (p: DayPhase) => sky[p];

  const lerp3 = (a: [string, string, string], b: [string, string, string], t: number): [string, string, string] =>
    [lerpColor(a[0], b[0], t), lerpColor(a[1], b[1], t), lerpColor(a[2], b[2], t)];

  let colors: [string, string, string];

  if (cycleProg < 0.12) {
    // dawn fade-in from night
    const t = cycleProg / 0.12;
    colors = lerp3(sky.night, sky.dawn, t);
  } else if (cycleProg < 0.55) {
    // dawn → day
    const t = (cycleProg - 0.12) / 0.43;
    colors = lerp3(sky.dawn, sky.day, t);
  } else if (cycleProg < 0.72) {
    // day → dusk
    const t = (cycleProg - 0.55) / 0.17;
    colors = lerp3(sky.day, sky.dusk, t);
  } else {
    // dusk → night
    const t = (cycleProg - 0.72) / 0.28;
    colors = lerp3(sky.dusk, sky.night, t);
  }

  return { top: colors[0], mid: colors[1], bottom: colors[2], phase, progress: cycleProg };
}

/** Sun/moon position: 0 = left horizon, 0.5 = zenith, 1 = right horizon */
function getCelestialPos(cycleProg: number) {
  // Sun is up during day (0.12–0.72), moon during night
  const isSun = cycleProg >= 0.06 && cycleProg <= 0.78;
  const sunT = cycleProg < 0.78
    ? Math.max(0, (cycleProg - 0.06) / 0.72)
    : 0;
  return { isSun, t: isSun ? sunT : ((cycleProg - 0.72) / 0.28) };
}

export function SkyLayer({ region }: SkyLayerProps) {
  const [sky, setSky] = useState<SkyColors>(() =>
    interpolateSkyPhase(region, getDayProgress())
  );
  const animRef = useRef<number>(0);

  const tick = useCallback(() => {
    const prog = getDayProgress();
    setSky(interpolateSkyPhase(region, prog));
    animRef.current = requestAnimationFrame(tick);
  }, [region]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [tick]);

  const { isSun, t } = getCelestialPos(sky.progress);

  // Celestial body position (arc across sky)
  const angle = t * Math.PI; // 0 → π
  const cx = 10 + t * 80;   // 10% → 90% horizontal
  const cy = 85 - Math.sin(angle) * 65; // percentage of sky height

  const isNight = sky.phase === 'night';
  const starOpacity = sky.phase === 'night' ? 1 : sky.phase === 'dusk' ? 0.4 : 0;

  return (
    <div
      className="absolute inset-0 transition-none"
      style={{
        background: `linear-gradient(to bottom, ${sky.top} 0%, ${sky.mid} 50%, ${sky.bottom} 100%)`,
        transition: 'background 4s ease',
      }}
    >
      {/* Stars (night only) */}
      {starOpacity > 0 && (
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ opacity: starOpacity, transition: 'opacity 3s ease' }}
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 100 60"
        >
          {/* Static star field — pre-computed positions */}
          {STAR_POSITIONS.map((s, i) => (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="white"
              style={{
                animation: `star-twinkle ${s.d}s ease-in-out infinite`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </svg>
      )}

      {/* Sun or Moon */}
      <svg
        className="absolute"
        style={{
          left: `${cx}%`,
          top: `${cy}%`,
          transform: 'translate(-50%, -50%)',
          width: '64px',
          height: '64px',
          filter: isSun
            ? 'drop-shadow(0 0 12px rgba(255,220,80,0.9))'
            : 'drop-shadow(0 0 8px rgba(200,220,255,0.7))',
          transition: 'left 2s linear, top 2s linear',
          opacity: (sky.phase === 'day' || sky.phase === 'dawn' || sky.phase === 'dusk') && isSun ? 1 :
                   isNight && !isSun ? 0.9 : 0,
        }}
        viewBox="0 0 64 64"
      >
        {isSun ? (
          /* Sun — Sol de Mayo style */
          <g>
            <circle cx="32" cy="32" r="14" fill="#FFD700" />
            {/* Rays */}
            {Array.from({ length: 16 }, (_, i) => {
              const a = (i / 16) * 360;
              const isLong = i % 2 === 0;
              const r1 = 16, r2 = isLong ? 26 : 21;
              const rad = (a * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={32 + r1 * Math.cos(rad)}
                  y1={32 + r1 * Math.sin(rad)}
                  x2={32 + r2 * Math.cos(rad)}
                  y2={32 + r2 * Math.sin(rad)}
                  stroke="#FFD700"
                  strokeWidth={isLong ? 1.8 : 1.2}
                  strokeLinecap="round"
                  style={{ animation: 'sun-rotate 40s linear infinite', transformOrigin: '32px 32px' }}
                />
              );
            })}
          </g>
        ) : (
          /* Moon */
          <g>
            <circle cx="32" cy="32" r="13" fill="#e8e8e8" />
            <circle cx="38" cy="28" r="11" fill={sky.top} />
          </g>
        )}
      </svg>
    </div>
  );
}

// ── Pre-computed star positions ───────────────────────────────
const STAR_POSITIONS = Array.from({ length: 80 }, (_, i) => ({
  x: (i * 73 + 7) % 100,
  y: (i * 37 + 3) % 55,
  r: 0.15 + (i % 5) * 0.08,
  d: 2 + (i % 4),
  delay: (i * 0.3) % 4,
}));
