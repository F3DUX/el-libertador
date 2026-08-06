'use client';
// ============================================================
//  CloudLayer.tsx — Animated clouds on Canvas 2D
//  EL LIBERTADOR — Living Background System
// ============================================================

import React, { useEffect, useRef, useCallback } from 'react';
import { RegionConfig } from './backgroundConfig';

interface CloudLayerProps {
  region: RegionConfig;
  /** Parallax offset X (-1 to 1) */
  parallaxX?: number;
}

interface Cloud {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
  opacity: number;
  puffs: { dx: number; dy: number; r: number }[];
}

function createCloud(canvasW: number, canvasH: number, startX?: number): Cloud {
  const w = 80 + Math.random() * 120;
  const h = 25 + Math.random() * 25;
  const x = startX !== undefined ? startX : Math.random() * canvasW;
  const y = canvasH * (0.05 + Math.random() * 0.28);
  const puffs = Array.from({ length: 5 + Math.floor(Math.random() * 4) }, () => ({
    dx: (Math.random() - 0.1) * w * 0.8,
    dy: (Math.random() - 0.5) * h * 0.6,
    r: h * (0.4 + Math.random() * 0.5),
  }));
  return {
    x, y, w, h,
    speed: 0.12 + Math.random() * 0.18,
    opacity: 0.55 + Math.random() * 0.35,
    puffs,
  };
}

function drawCloud(ctx: CanvasRenderingContext2D, cloud: Cloud, isDark: boolean) {
  const baseColor = isDark ? 'rgba(60,80,120,' : 'rgba(255,255,255,';
  ctx.save();
  ctx.globalAlpha = cloud.opacity;
  for (const p of cloud.puffs) {
    ctx.beginPath();
    ctx.arc(cloud.x + cloud.w / 2 + p.dx, cloud.y + p.dy, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `${baseColor}1)`;
    ctx.fill();
  }
  ctx.restore();
}

export function CloudLayer({ region, parallaxX = 0 }: CloudLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cloudsRef = useRef<Cloud[]>([]);
  const rafRef = useRef<number>(0);
  const isDarkRef = useRef(false);

  const initClouds = useCallback((w: number, h: number) => {
    const count = Math.max(3, Math.min(7, Math.floor(w / 200)));
    cloudsRef.current = Array.from({ length: count }, () => createCloud(w, h));
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width: W, height: H } = canvas;
    ctx.clearRect(0, 0, W, H);

    // Mist overlay for jungly regions
    if (region.mistOpacity > 0) {
      const grad = ctx.createLinearGradient(0, H * 0.55, 0, H);
      grad.addColorStop(0, `rgba(255,255,255,0)`);
      grad.addColorStop(1, `rgba(255,255,255,${region.mistOpacity})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }

    const parallaxShift = parallaxX * 15;

    for (const cloud of cloudsRef.current) {
      // Translate cloud with parallax
      const originalX = cloud.x;
      cloud.x += parallaxShift * 0.008;
      drawCloud(ctx, cloud, isDarkRef.current);
      cloud.x = originalX;

      // Advance cloud
      cloud.x += cloud.speed;
      if (cloud.x - cloud.w > W) {
        // Reset to left
        Object.assign(cloud, createCloud(W, H, -cloud.w - 20));
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [region, parallaxX]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initClouds(canvas.width, canvas.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [draw, initClouds]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  );
}
