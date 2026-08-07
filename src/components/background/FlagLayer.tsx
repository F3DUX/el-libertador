'use client';
// ============================================================
//  FlagLayer.tsx — Argentine flag with cloth physics simulation
//  EL LIBERTADOR — Living Background System
// ============================================================

import React, { useEffect, useRef } from 'react';
import { RegionConfig } from './backgroundConfig';

interface FlagLayerProps {
  region: RegionConfig;
}

// ── Cloth simulation constants ────────────────────────────────
const COLS = 22;
const ROWS = 14;
const FLAG_W = 180; // canvas pixels
const FLAG_H = 110;
const CELL_W = FLAG_W / (COLS - 1);
const CELL_H = FLAG_H / (ROWS - 1);
const GRAVITY = 0.04;
const DAMPING = 0.98;
const ITERATIONS = 5;
const WIND_SPEED = 1.8;

interface Point {
  x: number; y: number;
  px: number; py: number; // previous position
  pinned: boolean;
}

interface Stick {
  p1: number; p2: number; len: number;
}

function initCloth(): { points: Point[]; sticks: Stick[] } {
  const points: Point[] = [];
  const sticks: Stick[] = [];

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      points.push({
        x: c * CELL_W,
        y: r * CELL_H,
        px: c * CELL_W,
        py: r * CELL_H,
        pinned: c === 0, // left edge is the mast
      });
    }
  }

  const idx = (r: number, c: number) => r * COLS + c;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // Horizontal
      if (c < COLS - 1) sticks.push({ p1: idx(r, c), p2: idx(r, c + 1), len: CELL_W });
      // Vertical
      if (r < ROWS - 1) sticks.push({ p1: idx(r, c), p2: idx(r + 1, c), len: CELL_H });
      // Diagonal (shear resistance)
      if (c < COLS - 1 && r < ROWS - 1) {
        sticks.push({ p1: idx(r, c), p2: idx(r + 1, c + 1), len: Math.hypot(CELL_W, CELL_H) });
      }
    }
  }

  return { points, sticks };
}

export function FlagLayer({ region }: FlagLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clothRef = useRef(initCloth());
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { points, sticks } = clothRef.current;
    const windStrength = region.windStrength;

    function simulate(dt: number) {
      timeRef.current += dt * 0.001;
      const t = timeRef.current;

      // Wind force — layered sinusoidal for organic feel
      const windX = Math.sin(t * WIND_SPEED) * 0.35 * windStrength
                  + Math.sin(t * WIND_SPEED * 1.7 + 0.5) * 0.15 * windStrength;
      const windY = Math.sin(t * WIND_SPEED * 0.8 + 1.0) * 0.08 * windStrength;

      // Verlet integration
      for (const p of points) {
        if (p.pinned) continue;
        const vx = (p.x - p.px) * DAMPING;
        const vy = (p.y - p.py) * DAMPING;
        p.px = p.x;
        p.py = p.y;
        p.x += vx + windX;
        p.y += vy + GRAVITY + windY;
      }

      // Constraint solving
      for (let iter = 0; iter < ITERATIONS; iter++) {
        for (const s of sticks) {
          const a = points[s.p1];
          const b = points[s.p2];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const diff = (s.len - dist) / dist * 0.5;
          const ox = dx * diff;
          const oy = dy * diff;
          if (!a.pinned) { a.x -= ox; a.y -= oy; }
          if (!b.pinned) { b.x += ox; b.y += oy; }
        }
      }
    }

    function drawFlag(context: CanvasRenderingContext2D) {
      if (!canvas) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw flag cloth quad-by-quad
      for (let r = 0; r < ROWS - 1; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const idx = (row: number, col: number) => row * COLS + col;
          const tl = points[idx(r, c)];
          const tr = points[idx(r, c + 1)];
          const bl = points[idx(r + 1, c)];
          const br = points[idx(r + 1, c + 1)];

          // Determine flag stripe color
          const fraction = r / (ROWS - 1);
          let color: string;
          if (fraction < 0.33) {
            color = '#74AADB'; // celeste
          } else if (fraction < 0.67) {
            color = '#FFFFFF'; // white
          } else {
            color = '#74AADB'; // celeste
          }

          // Lighting based on surface angle (normal dot light)
          const ex = tr.x - tl.x; const ey = tr.y - tl.y;
          const fx = bl.x - tl.x; const fy = bl.y - tl.y;
          const nz = ex * fy - ey * fx; // z component of normal
          const light = 0.6 + Math.max(0, nz / (FLAG_W * CELL_H * 0.4)) * 0.4;

          context.beginPath();
          context.moveTo(tl.x, tl.y);
          context.lineTo(tr.x, tr.y);
          context.lineTo(br.x, br.y);
          context.lineTo(bl.x, bl.y);
          context.closePath();

          // Apply lighting tint
          context.fillStyle = color;
          context.globalAlpha = Math.max(0.6, Math.min(1, light));
          context.fill();
        }
      }
      context.globalAlpha = 1;

      // Draw Sol de Mayo on center of white stripe
      const midRow = Math.floor(ROWS / 2);
      const midCol = Math.floor(COLS / 2);
      const cp = points[midRow * COLS + midCol];
      if (cp) {
        drawSolDeMayo(context, cp.x, cp.y, 10);
      }

      // Flagpole / mast
      const topPin = points[0];
      const botPin = points[(ROWS - 1) * COLS];
      context.beginPath();
      context.moveTo(topPin.x - 3, topPin.y - 5);
      context.lineTo(botPin.x - 3, botPin.y + 5);
      context.strokeStyle = '#8b6914';
      context.lineWidth = 4;
      context.lineCap = 'round';
      context.stroke();
    }

    function drawSolDeMayo(context: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
      context.save();
      context.globalAlpha = 0.85;

      // Face
      context.beginPath();
      context.arc(cx, cy, r, 0, Math.PI * 2);
      context.fillStyle = '#F5C518';
      context.fill();

      // Rays
      const rayCount = 16;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2;
        const isLong = i % 2 === 0;
        const r1 = r + 1.5;
        const r2 = r + (isLong ? 5 : 3.5);
        context.beginPath();
        context.moveTo(cx + r1 * Math.cos(angle), cy + r1 * Math.sin(angle));
        context.lineTo(cx + r2 * Math.cos(angle), cy + r2 * Math.sin(angle));
        context.strokeStyle = '#D4AF37';
        context.lineWidth = isLong ? 1.2 : 0.8;
        context.stroke();
      }

      // Simple face features
      context.fillStyle = '#8b6914';
      // Eyes
      context.beginPath(); context.arc(cx - 2.5, cy - 1.5, 0.8, 0, Math.PI * 2); context.fill();
      context.beginPath(); context.arc(cx + 2.5, cy - 1.5, 0.8, 0, Math.PI * 2); context.fill();
      // Smile
      context.beginPath();
      context.arc(cx, cy + 1, 3, 0.2, Math.PI - 0.2);
      context.strokeStyle = '#8b6914';
      context.lineWidth = 0.8;
      context.stroke();

      context.restore();
    }

    let lastTime = 0;
    function loop(time: number) {
      if (!ctx) return;
      const dt = Math.min(time - lastTime, 32); // cap at 32ms
      lastTime = time;
      simulate(dt);
      drawFlag(ctx);
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [region]);

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: '12%',
        right: '3%',
        width: `${FLAG_W + 10}px`,
        height: `${FLAG_H + 20}px`,
        filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.3))',
      }}
    >
      <canvas
        ref={canvasRef}
        width={FLAG_W + 10}
        height={FLAG_H + 20}
      />
    </div>
  );
}