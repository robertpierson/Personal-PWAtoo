"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Hero background: drifting plasma blobs (CSS) behind a pseudo-3D
 * dot-ocean on canvas — a perspective-projected particle plane rolling
 * with layered swell, colored by wave height in the fall palette and
 * fading with depth. The pointer drops gentle ripples into the swell:
 * new waves in the ocean, never a storm. Decorative only.
 */

// world-space field
const COLS = 110;
const ROWS = 54;
const WORLD_W = 2600;
const Z_NEAR = 40;
const Z_FAR = 1900;
const FOCAL = 380;
const CAM_Y = 520; // camera height above the plane

// swell
const SWELL = 26;

// pointer ripples — deliberately gentle
const RIPPLE_AMP = 10;
const RIPPLE_SPEED = 170; // world units/s
const RIPPLE_LENGTH = 190;
const RIPPLE_LIFE = 3;
const MAX_RIPPLES = 8;

// height-indexed palette: trough → crest (olive/brick low, rust mid,
// gold/cream crests) — the "gradient varying" across the wave
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
    let horizon = 0;
    let last = { x: -9999, y: -9999, t: 0 };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      horizon = height * 0.3;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // layered sines = rolling ocean swell
    const swell = (x: number, z: number, t: number) =>
      SWELL *
        0.55 *
        Math.sin(0.0035 * x + t * 0.55 + 0.8 * Math.sin(0.0016 * z + t * 0.3)) +
      SWELL * 0.3 * Math.sin(0.0021 * z - t * 0.8) +
      SWELL * 0.18 * Math.sin(0.006 * (x + z * 0.6) + t * 1.15);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      for (let j = 0; j < ROWS; j++) {
        const wz = Z_NEAR + ((Z_FAR - Z_NEAR) * j * j) / (ROWS * ROWS); // denser near
        const scale = FOCAL / (FOCAL + wz);
        const depth = 1 - (wz - Z_NEAR) / (Z_FAR - Z_NEAR);
        for (let i = 0; i <= COLS; i++) {
          const wx = (i / COLS - 0.5) * WORLD_W;
          let h = swell(wx, wz, t);
          for (const rp of ripples) {
            const age = t - rp.t0;
            const dist = Math.hypot(wx - rp.x, wz - rp.z);
            const front = dist - RIPPLE_SPEED * age;
            if (front > 0 || front < -RIPPLE_LENGTH * 2) continue;
            const decay =
              Math.exp(-dist / 700) * Math.max(0, 1 - age / RIPPLE_LIFE);
            h +=
              RIPPLE_AMP *
              decay *
              Math.sin(((Math.PI * 2) / RIPPLE_LENGTH) * front);
          }
          const sx = cx + wx * scale;
          if (sx < -8 || sx > width + 8) continue;
          const sy = horizon + (CAM_Y - h) * scale;
          // color by height: trough → crest across the palette
          const n = Math.min(
            PALETTE.length - 1,
            Math.max(0, ((h / SWELL + 1) / 2) * PALETTE.length) | 0,
          );
          const [cr, cg, cb] = PALETTE[n];
          const alpha = 0.16 + 0.5 * depth + 0.12 * (h / SWELL);
          ctx.beginPath();
          ctx.arc(sx, sy, 0.5 + 3.2 * scale, 0, Math.PI * 2);
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

    // screen → world on the plane (h≈0), for dropping ripples
    const onMove = (e: PointerEvent) => {
      if (reduced.matches) return;
      const r = wrap.getBoundingClientRect();
      const sx = e.clientX - r.left;
      const sy = e.clientY - r.top;
      const scale = (sy - horizon) / CAM_Y;
      if (scale <= 0.05) return; // above the horizon — no water there
      const wz = FOCAL / scale - FOCAL;
      if (wz < Z_NEAR || wz > Z_FAR) return;
      const wx = (sx - width / 2) / scale;
      const t = performance.now() / 1000;
      if (t - last.t > 0.12 && Math.hypot(sx - last.x, sy - last.y) > 40) {
        ripples.push({ x: wx, z: wz, t0: t });
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
