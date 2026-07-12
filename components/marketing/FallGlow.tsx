"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Hero background: drifting plasma blobs (CSS) behind a full-frame
 * dot-ocean on canvas. The dot plane covers the whole hero with a mild
 * tilt — compressed, faint rows at the top reading as distance, bold
 * rows at the bottom — rolling on layered swell, colored by wave
 * height in the fall palette. Pointer movement drops gentle ripples:
 * new waves in the ocean, never a storm. Decorative only.
 */

// field
const SPACING_X = 19; // px between columns
const ROWS = 48;
const DEPTH_POW = 1.45; // row compression toward the top
const DEPTH_UNITS = 1700; // world depth for ripple distances

// swell
const SWELL = 30;

// pointer ripples — deliberately gentle
const RIPPLE_AMP = 11;
const RIPPLE_SPEED = 210; // world units/s
const RIPPLE_LENGTH = 200;
const RIPPLE_LIFE = 3;
const MAX_RIPPLES = 8;

// height-indexed palette: trough → crest (olive/brick low, rust body,
// gold-lit crests) — the gradient varying across the wave
const PALETTE = [
  [108, 122, 77], // olive
  [142, 74, 51], // brick
  [193, 95, 61], // rust
  [193, 95, 61],
  [184, 146, 77], // gold
  [214, 178, 112], // lit crest
];

type Ripple = { x: number; z: number; t0: number };

export function FallGlow({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ripples: Ripple[] = [];
    let raf = 0;
    let width = 0;
    let height = 0;
    let last = { x: -9999, y: -9999, t: 0 };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // layered sines = rolling ocean swell
    const swell = (x: number, z: number, t: number) =>
      SWELL *
        0.55 *
        Math.sin(0.006 * x + t * 0.55 + 0.9 * Math.sin(0.0021 * z + t * 0.3)) +
      SWELL * 0.3 * Math.sin(0.0028 * z - t * 0.75) +
      SWELL * 0.18 * Math.sin(0.011 * (x + z * 0.5) + t * 1.1);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const cols = Math.ceil(width / SPACING_X);
      for (let j = 0; j <= ROWS; j++) {
        const d = j / ROWS; // 0 = far/top, 1 = near/bottom
        const baseY = height * Math.pow(d, DEPTH_POW);
        const wz = (1 - d) * DEPTH_UNITS;
        const ampScale = 0.3 + 0.7 * d; // far waves look smaller
        for (let i = 0; i <= cols; i++) {
          const wx = i * SPACING_X + (j % 2 ? SPACING_X / 2 : 0);
          let h = swell(wx, wz, t);
          for (const rp of ripples) {
            const age = t - rp.t0;
            const dist = Math.hypot(wx - rp.x, wz - rp.z);
            const front = dist - RIPPLE_SPEED * age;
            if (front > 0 || front < -RIPPLE_LENGTH * 2) continue;
            const decay =
              Math.exp(-dist / 650) * Math.max(0, 1 - age / RIPPLE_LIFE);
            h +=
              RIPPLE_AMP *
              decay *
              Math.sin(((Math.PI * 2) / RIPPLE_LENGTH) * front);
          }
          const sy = baseY - h * ampScale;
          const sx = wx + 3 * ampScale * Math.cos(0.004 * wz + t * 0.5);
          const n = Math.min(
            PALETTE.length - 1,
            Math.max(0, ((h / SWELL + 1) / 2) * PALETTE.length) | 0,
          );
          const [cr, cg, cb] = PALETTE[n];
          const alpha = 0.14 + 0.46 * d + 0.1 * (h / SWELL);
          ctx.beginPath();
          ctx.arc(sx, sy, 0.7 + 2.4 * d, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }
    };

    const loop = (now: number) => {
      const t = now / 1000;
      ripples = ripples.filter((rp) => t - rp.t0 < RIPPLE_LIFE);
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    // screen → field coordinates for dropping ripples (exact inverse
    // of the row placement above)
    const onMove = (e: PointerEvent) => {
      if (reduced.matches) return;
      const r = wrap.getBoundingClientRect();
      const sx = e.clientX - r.left;
      const sy = e.clientY - r.top;
      const d = Math.pow(Math.max(0.001, sy / height), 1 / DEPTH_POW);
      const wz = (1 - Math.min(1, d)) * DEPTH_UNITS;
      const t = performance.now() / 1000;
      if (t - last.t > 0.12 && Math.hypot(sx - last.x, sy - last.y) > 40) {
        ripples.push({ x: sx, z: wz, t0: t });
        if (ripples.length > MAX_RIPPLES) ripples.shift();
        last = { x: sx, y: sy, t };
      }
    };

    resize();
    draw(0);
    if (!reduced.matches) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => {
      resize();
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
