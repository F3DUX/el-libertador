'use client';
// ============================================================
//  AmbientCharacters.tsx — Animated ambient SVG characters
//  (gaucho, condor, birds) via Framer Motion
//  EL LIBERTADOR — Living Background System
// ============================================================

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RegionConfig } from './backgroundConfig';

interface AmbientCharactersProps {
  region: RegionConfig;
}

// ── Gaucho on horseback ──────────────────────────────────────
function GauchoSilhouette({ y }: { y: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ bottom: y, left: '-120px' }}
      initial={{ x: -150, opacity: 0 }}
      animate={{ x: typeof window !== 'undefined' ? window.innerWidth + 150 : 1400, opacity: [0, 0.75, 0.75, 0] }}
      transition={{ duration: 55, ease: 'linear', opacity: { times: [0, 0.04, 0.96, 1], duration: 55 } }}
    >
      <svg width="110" height="72" viewBox="0 0 110 72" opacity="0.72">
        {/* Horse body */}
        <ellipse cx="50" cy="48" rx="30" ry="14" fill="#3d2a1a" />
        {/* Horse head+neck */}
        <ellipse cx="78" cy="38" rx="11" ry="8" fill="#3d2a1a" />
        <line x1="70" y1="36" x2="82" y2="28" stroke="#3d2a1a" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="83" cy="24" rx="7" ry="5" fill="#3d2a1a" />
        {/* Tail */}
        <path d="M 22 45 Q 8 50 12 60" stroke="#3d2a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Legs — animated gallop */}
        <motion.g
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '50px 60px' }}
        >
          <line x1="35" y1="60" x2="28" y2="72" stroke="#2a1a0a" strokeWidth="3" strokeLinecap="round" />
          <line x1="45" y1="60" x2="42" y2="72" stroke="#2a1a0a" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
        <motion.g
          animate={{ rotate: [8, -8, 8] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '60px 60px' }}
        >
          <line x1="58" y1="60" x2="55" y2="72" stroke="#2a1a0a" strokeWidth="3" strokeLinecap="round" />
          <line x1="68" y1="60" x2="72" y2="72" stroke="#2a1a0a" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        {/* Rider body */}
        <ellipse cx="52" cy="34" rx="8" ry="12" fill="#2c3e50" />
        {/* Rider head */}
        <circle cx="52" cy="20" r="6" fill="#d4a574" />
        {/* Gaucho hat */}
        <ellipse cx="52" cy="15" rx="10" ry="3" fill="#2c1810" />
        <ellipse cx="52" cy="12" rx="6" ry="5" fill="#2c1810" />
        {/* Poncho */}
        <path d="M 42 30 Q 38 42 40 50 Q 48 35 52 34 Q 56 35 64 50 Q 66 42 62 30 Z" fill="#c0392b" opacity="0.8" />
      </svg>
    </motion.div>
  );
}

// ── Condor soaring ────────────────────────────────────────────
function CondorSilhouette({ startY }: { startY: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: `${startY}%`, left: '-80px' }}
      initial={{ x: -100, opacity: 0 }}
      animate={{
        x: typeof window !== 'undefined' ? window.innerWidth + 100 : 1500,
        y: [0, -30, 20, -15, 0],
        opacity: [0, 0.8, 0.8, 0.8, 0],
      }}
      transition={{
        duration: 40,
        ease: 'linear',
        y: { duration: 40, times: [0, 0.2, 0.5, 0.8, 1], ease: 'easeInOut' },
        opacity: { times: [0, 0.05, 0.5, 0.95, 1], duration: 40 },
      }}
    >
      <svg width="80" height="40" viewBox="0 0 80 40" opacity="0.8">
        {/* Body */}
        <ellipse cx="40" cy="22" rx="14" ry="6" fill="#1a1a1a" />
        {/* Head */}
        <circle cx="52" cy="17" r="5" fill="#1a1a1a" />
        <ellipse cx="55" cy="15" rx="4" ry="3" fill="#e07c3a" />
        {/* Wing left — animated flap */}
        <motion.path
          d="M 28 22 Q 12 12 0 18 Q 14 22 28 26 Z"
          fill="#1a1a1a"
          animate={{ rotate: [-12, 5, -12] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '28px 22px' }}
        />
        {/* Wing right — animated flap (opposite) */}
        <motion.path
          d="M 52 22 Q 68 12 80 18 Q 66 22 52 26 Z"
          fill="#1a1a1a"
          animate={{ rotate: [12, -5, 12] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '52px 22px' }}
        />
        {/* White neck collar */}
        <ellipse cx="48" cy="20" rx="5" ry="4" fill="#f0f0f0" opacity="0.7" />
      </svg>
    </motion.div>
  );
}

// ── Bird flock ────────────────────────────────────────────────
function BirdFlock({ y, count }: { y: number; count: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: `${y}%`, left: '-60px' }}
      initial={{ x: -80, opacity: 0 }}
      animate={{
        x: typeof window !== 'undefined' ? window.innerWidth + 80 : 1400,
        y: [0, -20, 10, -5, 0],
        opacity: [0, 0.7, 0.7, 0.7, 0],
      }}
      transition={{
        duration: 25 + Math.random() * 15,
        ease: 'linear',
        y: { duration: 25, ease: 'easeInOut' },
        opacity: { times: [0, 0.08, 0.5, 0.92, 1] },
      }}
    >
      <svg width={count * 22 + 20} height="30" viewBox={`0 0 ${count * 22 + 20} 30`}>
        {Array.from({ length: count }, (_, i) => {
          const bx = i * 22;
          const by = (i % 2 === 0 ? 10 : 18) + (i % 3) * 3;
          return (
            <motion.g key={i} transform={`translate(${bx},${by})`}>
              <motion.path
                d={`M 0 0 Q -6 -5 -12 0`}
                stroke="#1a1a1a" strokeWidth="1.5" fill="none"
                animate={{ d: [`M 0 0 Q -6 -5 -12 0`, `M 0 0 Q -6 -1 -12 0`, `M 0 0 Q -6 -5 -12 0`] }}
                transition={{ duration: 0.7 + i * 0.1, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.path
                d={`M 0 0 Q 6 -5 12 0`}
                stroke="#1a1a1a" strokeWidth="1.5" fill="none"
                animate={{ d: [`M 0 0 Q 6 -5 12 0`, `M 0 0 Q 6 -1 12 0`, `M 0 0 Q 6 -5 12 0`] }}
                transition={{ duration: 0.7 + i * 0.1, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
              />
            </motion.g>
          );
        })}
      </svg>
    </motion.div>
  );
}

// ── Main orchestrator ─────────────────────────────────────────
export function AmbientCharacters({ region }: AmbientCharactersProps) {
  const [tick, setTick] = useState(0);

  // Re-trigger character animations every ~60 seconds
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence mode="wait">
        {region.showGaucho && (
          <GauchoSilhouette key={`gaucho-${tick}`} y="20%" />
        )}
        {region.showCondor && (
          <CondorSilhouette key={`condor-${tick}`} startY={8 + (tick % 3) * 6} />
        )}
        {region.showBirds && (
          <BirdFlock key={`birds-${tick}`} y={5 + (tick % 5) * 4} count={4 + (tick % 4)} />
        )}
      </AnimatePresence>
    </div>
  );
}
