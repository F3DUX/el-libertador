'use client';
// ============================================================
//  LivingBackground.tsx — Master orchestrator
//  Composites all background layers into a full-screen canvas
//  EL LIBERTADOR — Living Background System
// ============================================================

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { detectRegion } from './backgroundConfig';
import { useParallax } from './useParallax';
import { SkyLayer } from './SkyLayer';
import { CloudLayer } from './CloudLayer';
import { MountainLayer } from './MountainLayer';
import { LandscapeLayer } from './LandscapeLayer';
import { FlagLayer } from './FlagLayer';
import { ParticleLayer } from './ParticleLayer';
import { AmbientCharacters } from './AmbientCharacters';

interface LivingBackgroundProps {
  /** Current game location string (e.g. "Buenos Aires", "Mendoza, Cuyo") */
  location?: string;
  /** Current event map coordinates */
  mapCoords?: { lat: number; lng: number } | null;
}

export function LivingBackground({ location = '', mapCoords = null }: LivingBackgroundProps) {
  const region = useMemo(
    () => detectRegion(mapCoords, location),
    [location, mapCoords]
  );

  const { x: px, y: py } = useParallax(1);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* ── LAYER 1: Sky (fills everything) ─────────────────── */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={region.id + '-sky'}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5 }}
          >
            <SkyLayer region={region} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── LAYER 2: Clouds ──────────────────────────────────── */}
      <div className="absolute inset-0">
        <CloudLayer region={region} parallaxX={px} />
      </div>

      {/* ── LAYER 3: Mountains / Cordillera (parallax) ──────── */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={region.id + '-mountains'}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.0 }}
          >
            <MountainLayer region={region} parallaxX={px} parallaxY={py} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── LAYER 4: Foreground landscape (region-specific) ──── */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={region.id + '-landscape'}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, delay: 0.3 }}
          >
            <LandscapeLayer region={region} parallaxX={px} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── LAYER 5: Ambient characters (gaucho/condor/birds) ── */}
      <div className="absolute inset-0">
        <AmbientCharacters region={region} />
      </div>

      {/* ── LAYER 6: Particles (dust/snow/leaves/petals) ─────── */}
      <div className="absolute inset-0">
        <ParticleLayer region={region} />
      </div>

      {/* ── LAYER 7: Argentine flag (top-right) ──────────────── */}
      <FlagLayer region={region} />

      {/* ── Global dark vignette overlay for UI readability ──── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.35) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Bottom-fade so game cards sit on a dark base ──────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(10,20,40,0.65))',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
