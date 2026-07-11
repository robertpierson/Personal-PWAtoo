"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Hero background: a static fall-palette gradient wash (CSS) with a
 * halftone dot-grid pattern on canvas over it. The pattern is always
 * visible; dots near the pointer repel and ease back, so the texture
 * bends around the cursor. Decorative only.
 */

const DOT_COLORS = [
  "rgba(193, 95, 61, 0.55)", // rust
  "rgba(193, 95, 61, 0.55)",
  "rgba(184, 146, 77, 0.55)", // gold
  "rgba(108, 122, 77, 0.5)", // olive
  "rgba(142, 74, 51, 0.5)", // brick
];

const SPACING = 26;
const REPEL_RADIUS = 130;
const REPEL_PUSH = 30;

type Dot = {
  x: number;
  y: number;
  r: number;
  color: string;
  dx: number;
  dy: number;
};

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
    let raf = 0;
    const pointer = { x: -9999, y: -9999 };

    // deterministic pseudo-random so the pattern is stable across resizes
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
          // stagger every other row; jitter + size variation = texture
          const ox = ((y / SPACING) | 0) % 2 ? SPACING / 2 : 0;
          dots.push({
            x: x + ox + (h - 0.5) * 6,
            y: y + (hash(y, x) - 0.5) * 6,
            r: 1.1 + h * 1.6,
            color: DOT_COLORS[(h * DOT_COLORS.length) | 0],
            dx: 0,
            dy: 0,
          });
        }
      }
    };

    const step = () => {
      let moving = false;
      for (const d of dots) {
        let tx = 0;
        let ty = 0;
        const ddx = d.x - pointer.x;
        const ddy = d.y - pointer.y;
        const dist = Math.hypot(ddx, ddy);
        if (dist < REPEL_RADIUS && dist > 0.01) {
          const f = (1 - dist / REPEL_RADIUS) * REPEL_PUSH;
          tx = (ddx / dist) * f;
          ty = (ddy / dist) * f;
        }
        d.dx += (tx - d.dx) * 0.14;
        d.dy += (ty - d.dy) * 0.14;
        if (Math.abs(d.dx) + Math.abs(d.dy) > 0.05) moving = true;
      }
      return moving;
    };

    const draw = () => {
      const rect = wrap.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x + d.dx, d.y + d.dy, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.fill();
      }
    };

    const loop = () => {
      const moving = step();
      draw();
      raf = moving ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (reduced.matches) return; // pattern stays put
      const r = wrap.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      if (document.hidden) {
        // rAF suspended in hidden tabs — settle in one pass
        step();
        draw();
        return;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      if (!raf && !document.hidden) raf = requestAnimationFrame(loop);
    };

    build();
    draw();

    const ro = new ResizeObserver(() => {
      build();
      draw();
    });
    ro.observe(wrap);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <div aria-hidden className="fall-glow" />
      <canvas ref={canvasRef} aria-hidden className="fall-dots" />
      {children}
    </div>
  );
}
