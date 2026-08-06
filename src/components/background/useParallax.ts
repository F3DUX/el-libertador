'use client';
// ============================================================
//  useParallax.ts — Mouse + Gyroscope parallax hook
//  EL LIBERTADOR — Living Background System
// ============================================================

import { useEffect, useRef, useState } from 'react';

interface ParallaxOffset {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

export function useParallax(strength = 1): ParallaxOffset {
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });
  const currentRef = useRef<ParallaxOffset>({ x: 0, y: 0 });
  const targetRef = useRef<ParallaxOffset>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Smooth lerp towards target
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      const nx = lerp(cur.x, tgt.x, 0.05);
      const ny = lerp(cur.y, tgt.y, 0.05);

      if (Math.abs(nx - cur.x) > 0.0001 || Math.abs(ny - cur.y) > 0.0001) {
        currentRef.current = { x: nx, y: ny };
        setOffset({ x: nx * strength, y: ny * strength });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // ── Desktop: mouse move ──────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      targetRef.current = { x: cx, y: cy };
    };

    // ── Mobile: device orientation (gyroscope) ───────────────
    const onOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // -90 to 90 (left-right tilt)
      const beta  = e.beta  ?? 0; // -180 to 180 (front-back tilt)
      targetRef.current = {
        x: Math.max(-1, Math.min(1, gamma / 45)),
        y: Math.max(-1, Math.min(1, (beta - 45) / 45)),
      };
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('deviceorientation', onOrientation, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('deviceorientation', onOrientation);
    };
  }, [strength]);

  return offset;
}
