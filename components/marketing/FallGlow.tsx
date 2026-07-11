"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Hero background: drifting plasma blobs in the fall palette (CSS
 * keyframes) under a halftone dot grid on canvas. The dots ride a slow
 * traveling wave, and pointer movement drops ripples that spread
 * through the field like water. Decorative only.
 */

const DOT_COLORS = [
  "rgba(193, 95, 61, 0.5)", // rust
  "rgba(193, 95, 61, 0.5)",
  "rgba(184, 146, 77, 0.5)", // gold
  "rgba(108, 122, 77, 0.45)", // olive
  "rgba(142, 74, 51, 0.45)", // brick
];

const SPACING = 26;

// ambient wave
const WAVE_AMP = 4.5;
const WAVE_SPEED = 1.4;

// cursor ripples
const RIPPLE_SPEED = 260; // px/s outward
const RIPPLE_LENGTH = 90; // wavelength px
const RIPPLE_AMP = 14;
const RIPPLE_LIFE = 2.4; // seconds
const MAX_RIPPLES = 14;

type Dot = { x: number; y: number; r: number; color: string };
type Ripple = { x: number; y: number; t0: number };

export function FallGlow({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dots: Dot[] = [];
    let ripples: Ripple[] = [];
    let raf = 0;
    let last = { x: -9999, y: -9999, t: 0 };

    const hash = (a: number, b: number) => {
      const n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = SPACING / 2; y < rect.height; y += SPACING) {
        for (let x = SPACING / 2; x < rect.width; x += SPACING) {
          const h = hash(x, y);
          const ox = ((y / SPACING) | 0) % 2 ? SPACING / 2 : 0;
          dots.push({
            x: x + ox + (h - 0.5) * 6,
            y: y + (hash(y, x) - 0.5) * 6,
            r: 1.1 + h * 1.6,
            color: DOT_COLORS[(h * DOT_COLORS.length) | 0],
          });
        }
      }
    };

    const draw = (t: number) => {
      const rect = wrap.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const tw = t * WAVE_SPEED;
      for (const d of dots) {
        // ambient traveling wave, diagonal across the field
        let dx = 2 * Math.cos(0.016 * d.y + tw * 0.9);
        let dy = WAVE_AMP * Math.sin(0.02 * d.x + 0.024 * d.y + tw);
        // cursor ripples — radial sin wave expanding from each drop
        for (const rp of ripples) {
          const age = t - rp.t0;
          const rx = d.x - rp.x;
          const ry = d.y - rp.y;
          const dist = Math.hypot(rx, ry) || 1;
          const phase = (dist - RIPPLE_SPEED * age) / RIPPLE_LENGTH;
          if (phase > 0 || phase < -2.5) continue; // only near the front
          const decay =
            Math.exp(-dist / 420) * Math.max(0, 1 - age / RIPPLE_LIFE);
          const amp = RIPPLE_AMP * decay * Math.sin(phase * Math.PI * 2);
          dx += (rx / dist) * amp;
          dy += (ry / dist) * amp;
        }
        ctx.beginPath();
        ctx.arc(d.x + dx, d.y + dy, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      const t = now / 1000;
      ripples = ripples.filter((rp) => t - rp.t0 < RIPPLE_LIFE);
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (reduced.matches) return;
      const r = wrap.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const t = performance.now() / 1000;
      // drop a ripple when the cursor has moved far or enough time passed
      if (t - last.t > 0.09 && Math.hypot(x - last.x, y - last.y) > 32) {
        ripples.push({ x, y, t0: t });
        if (ripples.length > MAX_RIPPLES) ripples.shift();
        last = { x, y, t };
      }
    };

    build();
    draw(0);
    if (!reduced.matches) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      build();
      draw(performance.now() / 1000);
    });
    ro.observe(wrap);
    wrap.addEventListener("pointermove", onMove);
    return () => {
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <div aria-hidden className="fall-glow">
        <span className="plasma plasma-a" />
        <span className="plasma plasma-b" />
        <span className="plasma plasma-c" />
        <span className="plasma plasma-d" />
      </div>
      <canvas ref={canvasRef} aria-hidden className="fall-dots" />
      {children}
    </div>
  );
}
