'use client';
// ============================================================
//  MountainLayer.tsx — Multi-depth SVG mountains with parallax
//  EL LIBERTADOR — Living Background System
// ============================================================

import React, { useMemo } from 'react';
import { RegionConfig } from './backgroundConfig';

interface MountainLayerProps {
  region: RegionConfig;
  /** Parallax offset X (-1 to 1) */
  parallaxX?: number;
  /** Parallax offset Y (-1 to 1) */
  parallaxY?: number;
}

/** Generate a mountain silhouette SVG path for a given height range */
function buildMountainPath(
  numPeaks: number,
  baseH: number,   // bottom of mountains as fraction of viewBox height (e.g. 0.9)
  topMin: number,  // min peak height fraction
  topMax: number,  // max peak height fraction
  vW: number,      // viewBox width
  vH: number,      // viewBox height
  seed: number,
): string {
  const points: [number, number][] = [];
  const step = vW / (numPeaks - 1);

  for (let i = 0; i < numPeaks; i++) {
    const x = i * step;
    // Deterministic pseudo-random using seed
    const r = Math.abs(Math.sin(i * 2.7 + seed * 13.7));
    const h = topMin + r * (topMax - topMin);
    points.push([x, vH * (1 - h)]);
  }

  // Build smooth path using quadratic beziers
  let d = `M 0 ${vH} `;
  d += `L ${points[0][0]} ${points[0][1]} `;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    d += `Q ${x0} ${y0} ${mx} ${my} `;
  }
  const last = points[points.length - 1];
  d += `L ${last[0]} ${last[1]} `;
  d += `L ${vW} ${vH} Z`;
  return d;
}

/** Build snow cap path at peak of a mountain */
function buildSnowCapPath(
  numPeaks: number,
  topMin: number,
  topMax: number,
  vW: number,
  vH: number,
  seed: number,
): string {
  const step = vW / (numPeaks - 1);
  let d = '';
  for (let i = 0; i < numPeaks; i++) {
    const x = i * step;
    const r = Math.abs(Math.sin(i * 2.7 + seed * 13.7));
    const h = topMin + r * (topMax - topMin);
    if (h > 0.42) {
      // Draw a small triangle cap
      const px = vW * (x / vW); // same x
      const py = vH * (1 - h);
      const capH = vH * 0.03;
      const capW = step * 0.25;
      d += `M ${px - capW} ${py + capH} L ${px} ${py - 2} L ${px + capW} ${py + capH} Z `;
    }
  }
  return d;
}

export function MountainLayer({ region, parallaxX = 0, parallaxY = 0 }: MountainLayerProps) {
  const VW = 1200;
  const VH = 400;

  const [farH, midH, nearH] = region.mountainHeights;
  const [farC, midC, nearC] = region.mountainColors;

  const paths = useMemo(() => {
    const seed = region.id.charCodeAt(0);
    return {
      far:  buildMountainPath(18, 1, farH * 0.55, farH, VW, VH, seed),
      mid:  buildMountainPath(14, 1, midH * 0.60, midH, VW, VH, seed + 1),
      near: buildMountainPath(10, 1, nearH * 0.65, nearH, VW, VH, seed + 2),
      snowFar:  region.snowCaps ? buildSnowCapPath(18, farH * 0.55, farH, VW, VH, seed) : '',
      snowMid:  region.snowCaps ? buildSnowCapPath(14, midH * 0.60, midH, VW, VH, seed + 1) : '',
      snowNear: region.snowCaps ? buildSnowCapPath(10, nearH * 0.65, nearH, VW, VH, seed + 2) : '',
    };
  }, [region, farH, midH, nearH]);

  // Parallax: far layers move less, near layers move more
  const px = parallaxX * 20;
  const py = parallaxY * 8;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      {/* FAR mountains */}
      <div
        className="absolute inset-0"
        style={{ transform: `translate(${px * 0.3}px, ${py * 0.2}px)`, opacity: 0.7 }}
      >
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="xMidYMax slice"
          className="absolute bottom-0 w-full"
          style={{ height: '70%' }}
        >
          <defs>
            <linearGradient id="far-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={farC} stopOpacity="0.6" />
              <stop offset="100%" stopColor={farC} stopOpacity="1" />
            </linearGradient>
          </defs>
          <path d={paths.far} fill="url(#far-grad)" />
          {region.snowCaps && <path d={paths.snowFar} fill="rgba(255,255,255,0.7)" />}
        </svg>
      </div>

      {/* MID mountains */}
      <div
        className="absolute inset-0"
        style={{ transform: `translate(${px * 0.6}px, ${py * 0.4}px)` }}
      >
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="xMidYMax slice"
          className="absolute bottom-0 w-full"
          style={{ height: '65%' }}
        >
          <defs>
            <linearGradient id="mid-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={midC} stopOpacity="0.75" />
              <stop offset="100%" stopColor={midC} stopOpacity="1" />
            </linearGradient>
          </defs>
          <path d={paths.mid} fill="url(#mid-grad)" />
          {region.snowCaps && <path d={paths.snowMid} fill="rgba(255,255,255,0.85)" />}
        </svg>
      </div>

      {/* NEAR mountains */}
      <div
        className="absolute inset-0"
        style={{ transform: `translate(${px}px, ${py * 0.7}px)` }}
      >
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="xMidYMax slice"
          className="absolute bottom-0 w-full"
          style={{ height: '60%' }}
        >
          <defs>
            <linearGradient id="near-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={nearC} stopOpacity="0.9" />
              <stop offset="100%" stopColor={nearC} stopOpacity="1" />
            </linearGradient>
          </defs>
          <path d={paths.near} fill="url(#near-grad)" />
          {region.snowCaps && <path d={paths.snowNear} fill="rgba(255,255,255,0.9)" />}
        </svg>
      </div>
    </div>
  );
}
