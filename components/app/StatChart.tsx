"use client";

import { useMemo, useRef, useState } from "react";

export type ChartPoint = { t: string; v: number };
export type ChartMark = { i: number; label: string };

type Props = {
  points: ChartPoint[];
  marks?: ChartMark[];
  color?: string;
  format?: (v: number) => string;
  height?: number;
};

const fmtDefault = (v: number) => v.toLocaleString("en-US");
const shortDate = (t: string) =>
  new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric" });

/**
 * Interactive area chart: scroll or use the +/- controls to zoom the
 * time window, drag to pan, hover for the exact value at any point, and
 * hover the gold markers to read what moved the number. Placeholder data
 * for now — same shape real metrics will arrive in.
 */
export function StatChart({
  points,
  marks = [],
  color = "var(--rust-400)",
  format = fmtDefault,
  height = 260,
}: Props) {
  const n = points.length;
  const MIN_SPAN = 4;
  const [win, setWin] = useState<{ lo: number; hi: number }>({ lo: 0, hi: n - 1 });
  const [hover, setHover] = useState<number | null>(null);
  const [activeMark, setActiveMark] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ x: number; lo: number; hi: number } | null>(null);

  const W = 720;
  const H = height;
  const padL = 44;
  const padR = 14;
  const padT = 16;
  const padB = 26;

  const lo = Math.max(0, Math.round(win.lo));
  const hi = Math.min(n - 1, Math.round(win.hi));
  const view = points.slice(lo, hi + 1);

  const { min, max } = useMemo(() => {
    const vs = view.map((p) => p.v);
    const mn = Math.min(...vs);
    const mx = Math.max(...vs);
    const pad = (mx - mn || mx || 1) * 0.12;
    return { min: mn - pad, max: mx + pad };
  }, [view]);

  const span = hi - lo || 1;
  const x = (i: number) => padL + ((i - lo) / span) * (W - padL - padR);
  const y = (v: number) => padT + (1 - (v - min) / (max - min || 1)) * (H - padT - padB);

  const linePts = view.map((p, k) => `${x(lo + k)},${y(p.v)}`).join(" ");
  const areaPts = `${x(lo)},${H - padB} ${linePts} ${x(hi)},${H - padB}`;

  const clampWin = (l: number, h: number) => {
    let nl = l;
    let nh = h;
    if (nh - nl < MIN_SPAN) nh = nl + MIN_SPAN;
    if (nl < 0) { nh -= nl; nl = 0; }
    if (nh > n - 1) { nl -= nh - (n - 1); nh = n - 1; }
    nl = Math.max(0, nl);
    return { lo: nl, hi: nh };
  };

  const zoomAt = (frac: number, factor: number) => {
    const cur = hi - lo;
    const next = Math.min(n - 1, Math.max(MIN_SPAN, cur * factor));
    const center = lo + frac * cur;
    setWin(clampWin(center - frac * next, center + (1 - frac) * next));
  };

  const onWheel = (e: React.WheelEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, ((e.clientX - rect.left) / rect.width - padL / W) / (1 - (padL + padR) / W)));
    zoomAt(frac, e.deltaY > 0 ? 1.2 : 1 / 1.2);
  };

  const pointerIndex = (clientX: number) => {
    const rect = svgRef.current!.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * W;
    const frac = (px - padL) / (W - padL - padR);
    return Math.min(hi, Math.max(lo, Math.round(lo + frac * span)));
  };

  const onMove = (e: React.PointerEvent) => {
    if (drag.current) {
      const rect = svgRef.current!.getBoundingClientRect();
      const dxFrac = ((e.clientX - drag.current.x) / rect.width) * (W / (W - padL - padR));
      const shift = -dxFrac * (drag.current.hi - drag.current.lo);
      setWin(clampWin(drag.current.lo + shift, drag.current.hi + shift));
      return;
    }
    setHover(pointerIndex(e.clientX));
  };

  const zoomed = lo > 0 || hi < n - 1;

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="care-tag">
          {shortDate(points[lo].t)} — {shortDate(points[hi].t)}
        </span>
        <div className="flex items-center gap-1.5">
          <ChartBtn label="Zoom out" onClick={() => zoomAt(0.5, 1.3)}>−</ChartBtn>
          <ChartBtn label="Zoom in" onClick={() => zoomAt(0.5, 1 / 1.3)}>+</ChartBtn>
          <ChartBtn label="Reset" onClick={() => setWin({ lo: 0, hi: n - 1 })} disabled={!zoomed}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 12a8 8 0 1 0 3-6.2M4 4v4h4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ChartBtn>
        </div>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-none select-none"
        style={{ cursor: drag.current ? "grabbing" : "crosshair" }}
        onWheel={onWheel}
        onPointerDown={(e) => {
          (e.target as Element).setPointerCapture?.(e.pointerId);
          drag.current = { x: e.clientX, lo, hi };
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerLeave={() => { setHover(null); drag.current = null; }}
        onPointerMove={onMove}
        role="img"
        aria-label="Interactive statistics chart"
      >
        <defs>
          <linearGradient id="sc-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.32" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y grid + labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((f) => {
          const gv = max - f * (max - min);
          const gy = padT + f * (H - padT - padB);
          return (
            <g key={f}>
              <line x1={padL} x2={W - padR} y1={gy} y2={gy} stroke="color-mix(in srgb, var(--white) 8%, transparent)" />
              <text x={padL - 8} y={gy + 3} textAnchor="end" className="tnum" fontSize="10" fill="var(--ash-300)">
                {format(Math.round(gv))}
              </text>
            </g>
          );
        })}

        <polygon points={areaPts} fill="url(#sc-fill)" />
        <polyline points={linePts} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

        {/* Shift markers */}
        {marks
          .filter((m) => m.i >= lo && m.i <= hi)
          .map((m) => (
            <g key={m.i} onPointerEnter={() => setActiveMark(m.i)} onPointerLeave={() => setActiveMark(null)} style={{ cursor: "help" }}>
              <line x1={x(m.i)} x2={x(m.i)} y1={padT} y2={H - padB} stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <circle cx={x(m.i)} cy={y(points[m.i].v)} r="4.5" fill="var(--ink-900)" stroke="var(--gold)" strokeWidth="2" />
            </g>
          ))}

        {/* Hover crosshair + point */}
        {hover != null && hover >= lo && hover <= hi && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={padT} y2={H - padB} stroke="color-mix(in srgb, var(--white) 22%, transparent)" strokeWidth="1" />
            <circle cx={x(hover)} cy={y(points[hover].v)} r="4" fill={color} stroke="var(--ink-900)" strokeWidth="2" />
          </g>
        )}
      </svg>

      {/* Read-outs */}
      <div className="mt-1 flex min-h-[2.5rem] items-start justify-between gap-4 text-sm">
        <div>
          {hover != null ? (
            <>
              <span className="tnum font-semibold text-white">{format(points[hover].v)}</span>
              <span className="care-tag ml-2">{shortDate(points[hover].t)}</span>
            </>
          ) : (
            <span className="text-xs text-ash-300">Hover to read a point · scroll or drag to zoom</span>
          )}
        </div>
        {activeMark != null && (
          <p className="max-w-[55%] text-right text-xs leading-snug" style={{ color: "var(--gold)" }}>
            {marks.find((m) => m.i === activeMark)?.label}
          </p>
        )}
      </div>
    </div>
  );
}

function ChartBtn({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid h-7 w-7 place-items-center rounded-[var(--r-sm)] text-sm text-ash-300 transition hover:text-white disabled:opacity-30"
      style={{
        background: "color-mix(in srgb, var(--white) 5%, transparent)",
        boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--white) 12%, transparent)",
      }}
    >
      {children}
    </button>
  );
}
