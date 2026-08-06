'use client';
// ============================================================
//  ParticleLayer.tsx — Canvas particle system (dust/leaves/snow)
//  EL LIBERTADOR — Living Background System
// ============================================================

import React, { useEffect, useRef, useCallback } from 'react';
import { RegionConfig } from './backgroundConfig';

interface ParticleLayerProps {
  region: RegionConfig;
}

type ParticleType = 'dust' | 'leaves' | 'snow' | 'rain' | 'petals';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  opacity: number;
  rotation: number;
  rotSpeed: number;
  life: number;
  maxLife: number;
  type: ParticleType;
  color: string;
}

const PARTICLE_COLORS: Record<ParticleType, string[]> = {
  dust:   ['rgba(210,190,150,', 'rgba(190,170,130,', 'rgba(220,200,160,'],
  leaves: ['rgba(80,120,40,',   'rgba(120,80,30,',   'rgba(160,120,40,', 'rgba(60,100,20,'],
  snow:   ['rgba(255,255,255,', 'rgba(240,248,255,'],
  rain:   ['rgba(120,180,220,', 'rgba(100,160,200,'],
  petals: ['rgba(255,182,193,', 'rgba(255,160,180,', 'rgba(255,210,220,'],
};

const MAX_PARTICLES = 55;
const REDUCED_PARTICLES = 25; // for low-power devices

function spawnParticle(W: number, H: number, type: ParticleType, windStr: number): Particle {
  const colors = PARTICLE_COLORS[type];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const isRain = type === 'rain';
  return {
    x: Math.random() * W,
    y: isRain ? -10 : Math.random() * H * 0.6,
    vx: (Math.random() - 0.3) * windStr * 0.8,
    vy: isRain ? 3 + Math.random() * 2 : 0.2 + Math.random() * 0.5,
    size: isRain ? 1 + Math.random() * 2 : 2 + Math.random() * 4,
    opacity: 0.3 + Math.random() * 0.5,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.08,
    life: 0,
    maxLife: 200 + Math.random() * 400,
    type,
    color,
  };
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  const alpha = p.opacity * Math.min(1, Math.min(p.life / 30, (p.maxLife - p.life) / 30));
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = Math.max(0, alpha);

  switch (p.type) {
    case 'dust': {
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${alpha})`;
      ctx.fill();
      break;
    }
    case 'snow': {
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${alpha})`;
      ctx.fill();
      // Snowflake arms
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * p.size, Math.sin(angle) * p.size);
        ctx.strokeStyle = `${p.color}${alpha * 0.7})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      break;
    }
    case 'leaves': {
      // Simple leaf shape
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.4, p.size, 0, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${alpha})`;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.lineTo(0, p.size);
      ctx.strokeStyle = `${p.color}${alpha * 0.5})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      break;
    }
    case 'petals': {
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.35, p.size * 0.8, 0, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${alpha})`;
      ctx.fill();
      break;
    }
    case 'rain': {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(p.vx * 2, p.vy * 3);
      ctx.strokeStyle = `${p.color}${alpha})`;
      ctx.lineWidth = p.size * 0.3;
      ctx.stroke();
      break;
    }
  }

  ctx.restore();
}

export function ParticleLayer({ region }: ParticleLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  const maxP = typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4
    ? REDUCED_PARTICLES
    : MAX_PARTICLES;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width: W, height: H } = canvas;
    ctx.clearRect(0, 0, W, H);

    const particles = particlesRef.current;
    const type = region.particles;
    const wind = region.windStrength;

    // Spawn new particles if needed
    while (particles.length < maxP) {
      particles.push(spawnParticle(W, H, type, wind));
    }

    // Update & draw
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.life++;

      // Slight wind oscillation
      p.vx += (Math.random() - 0.5) * 0.02 * wind;

      if (p.life > p.maxLife || p.y > H + 20 || p.x < -20 || p.x > W + 20) {
        particles[i] = spawnParticle(W, H, type, wind);
        continue;
      }

      drawParticle(ctx, p);
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [region, maxP]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particlesRef.current = [];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.75 }}
    />
  );
}
