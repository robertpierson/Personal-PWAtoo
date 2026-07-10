"use client";

import { useState } from "react";
import { CareTag } from "@/components/CareTag";

/** Dead link → real site. Drag the glass divider (native range input). */
export function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);

  return (
    <div
      className="relative overflow-hidden rounded-[var(--r-lg)] shadow-[0_24px_48px_-24px_var(--glass-shadow)]"
      style={{ "--ba": `${pos}%` } as React.CSSProperties}
    >
      {/* BEFORE — the hand-me-down site */}
      <div className="bg-ink-700 p-6 sm:p-10" aria-hidden>
        <div className="mx-auto max-w-lg">
          <div className="rounded-[var(--r-sm)] bg-graphite-600 p-5">
            <div className="h-3 w-2/5 rounded bg-smoke-400" />
            <div className="mt-4 h-2 w-full rounded bg-graphite-500" />
            <div className="mt-2 h-2 w-4/5 rounded bg-graphite-500" />
            <div className="mt-5 inline-flex items-center gap-2 rounded bg-ink-800 px-3 py-1.5">
              <span className="text-xs text-smoke-400">
                schedule_final_v3.pdf — link broken
              </span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="h-14 rounded bg-graphite-500" />
              <div className="h-14 rounded bg-ink-800" />
              <div className="h-14 rounded bg-graphite-600" />
            </div>
          </div>
          <p className="care-tag mt-4">Before — last updated 14 months ago</p>
        </div>
      </div>

      {/* AFTER — clipped overlay */}
      <div
        className="absolute inset-0 p-6 sm:p-10"
        style={{
          clipPath: "inset(0 0 0 var(--ba))",
          background:
            "linear-gradient(150deg, var(--indigo-raw), var(--ink-800) 70%)",
        }}
        aria-hidden
      >
        <div className="mx-auto max-w-lg">
          <div className="rounded-[var(--r-sm)] bg-ink-800/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
            <div className="flex items-center justify-between">
              <div className="h-3 w-2/5 rounded bg-white" />
              <div className="flex gap-1.5">
                <span className="h-1.5 w-6 rounded bg-denim-400" />
                <span className="h-1.5 w-6 rounded bg-white/25" />
                <span className="h-1.5 w-6 rounded bg-white/25" />
              </div>
            </div>
            <div className="mt-4 h-2 w-full rounded bg-white/20" />
            <div className="mt-2 h-2 w-4/5 rounded bg-white/20" />
            <div className="mt-5 inline-flex items-center gap-2 rounded-[var(--r-pill)] bg-denim-600 px-3 py-1.5">
              <span className="text-xs font-medium text-white">
                This week&apos;s games — live schedule
              </span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="h-14 rounded bg-denim-500" />
              <div className="h-14 rounded bg-denim-400/70" />
              <div className="h-14 rounded bg-chambray-300/60" />
            </div>
          </div>
          <p className="care-tag mt-4" style={{ color: "var(--chambray-300)" }}>
            After — one system, kept current
          </p>
        </div>
      </div>

      <div className="ba-handle" aria-hidden />
      <input
        type="range"
        min={2}
        max={98}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="ba-range"
        aria-label="Compare before and after"
      />
      <span className="sr-only">
        Before: an outdated site with broken links. After: a current,
        branded site with a live schedule.
      </span>
      <CareTag className="sr-only">Drag to compare</CareTag>
    </div>
  );
}
