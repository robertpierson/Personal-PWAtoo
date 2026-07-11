"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Fall-palette gradient field behind the hero — rust, gold, olive,
 * brick blobs over the field, grain on top. The lead blob eases
 * toward the pointer with an rAF lerp. Decorative only.
 */
export function FallGlow({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const el = glowRef.current;
    if (!wrap || !el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pos = { x: 68, y: 28 };
    const target = { x: 68, y: 28 };
    let raf = 0;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      el.style.setProperty("--gx", `${pos.x}%`);
      el.style.setProperty("--gy", `${pos.y}%`);
      raf =
        Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.05
          ? requestAnimationFrame(tick)
          : 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width) * 100;
      target.y = ((e.clientY - r.top) / r.height) * 100;
      if (reduced.matches || document.hidden) {
        // no chase animation (reduced motion) or rAF suspended (hidden
        // tab) — still reacts, just settles instantly
        pos.x = target.x;
        pos.y = target.y;
        el.style.setProperty("--gx", `${pos.x}%`);
        el.style.setProperty("--gy", `${pos.y}%`);
        return;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    wrap.addEventListener("pointermove", onMove);
    return () => {
      wrap.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <div ref={glowRef} aria-hidden className="fall-glow" />
      {children}
    </div>
  );
}
