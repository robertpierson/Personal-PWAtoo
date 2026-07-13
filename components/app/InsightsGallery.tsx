"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";

// Placeholder insights — every chart below runs on generated sample data
// until real metrics are wired in. Switching modes reseeds the samples so
// the gallery shows the range of chart types the page will use.

const MODES = ["Overview", "Audience", "Engagement", "Traffic", "Events"];

const SERIES = ["var(--rust-400)", "var(--gold)", "var(--olive)", "var(--brick)"];

// Deterministic pseudo-random so a mode always draws the same placeholder.
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function sample(seed: number, n: number, base = 40, spread = 60) {
  const r = rng(seed);
  return Array.from({ length: n }, () => Math.round(base + r() * spread));
}

function PlaceholderTag() {
  return (
    <span className="care-tag" style={{ color: "var(--gold)" }}>
      Placeholder
    </span>
  );
}

function LineChart({ values }: { values: number[] }) {
  const W = 560;
  const H = 180;
  const pad = 8;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const x = (i: number) => pad + (i * (W - pad * 2)) / (values.length - 1);
  const y = (v: number) => H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2);
  const line = values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const area = `${pad},${H - pad} ${line} ${W - pad},${H - pad}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label="Placeholder line chart">
      <defs>
        <linearGradient id="ig-line-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--rust-500)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--rust-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={pad} x2={W - pad} y1={H * f} y2={H * f} stroke="color-mix(in srgb, var(--white) 8%, transparent)" />
      ))}
      <polygon points={area} fill="url(#ig-line-fill)" />
      <polyline points={line} fill="none" stroke="var(--rust-400)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {values.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="3" fill="var(--ink-900)" stroke="var(--rust-300)" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

function BarChart({ values }: { values: number[] }) {
  const W = 560;
  const H = 180;
  const pad = 8;
  const max = Math.max(...values);
  const bw = (W - pad * 2) / values.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label="Placeholder bar chart">
      {values.map((v, i) => {
        const h = ((v / max) * (H - pad * 2)) || 0;
        return (
          <rect
            key={i}
            x={pad + i * bw + bw * 0.15}
            y={H - pad - h}
            width={bw * 0.7}
            height={h}
            rx="3"
            fill={SERIES[i % SERIES.length]}
            opacity="0.9"
          />
        );
      })}
    </svg>
  );
}

function StackedBars({ seed }: { seed: number }) {
  const W = 560;
  const H = 180;
  const pad = 8;
  const cols = 8;
  const r = rng(seed + 7);
  const bw = (W - pad * 2) / cols;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full" role="img" aria-label="Placeholder stacked bars">
      {Array.from({ length: cols }).map((_, i) => {
        const parts = [r(), r(), r()];
        const total = parts.reduce((a, b) => a + b, 0);
        let yCur = H - pad;
        return (
          <g key={i}>
            {parts.map((p, j) => {
              const h = (p / total) * (H - pad * 2);
              yCur -= h;
              return (
                <rect
                  key={j}
                  x={pad + i * bw + bw * 0.15}
                  y={yCur}
                  width={bw * 0.7}
                  height={h}
                  fill={SERIES[j % SERIES.length]}
                  opacity="0.9"
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

function Donut({ seed }: { seed: number }) {
  const parts = sample(seed + 3, 4, 10, 30);
  const total = parts.reduce((a, b) => a + b, 0);
  const R = 70;
  const C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div className="mt-4 flex items-center gap-6">
      <svg viewBox="0 0 180 180" className="h-40 w-40 shrink-0" role="img" aria-label="Placeholder donut chart">
        <g transform="rotate(-90 90 90)">
          {parts.map((p, i) => {
            const frac = p / total;
            const dash = frac * C;
            const seg = (
              <circle
                key={i}
                cx="90"
                cy="90"
                r={R}
                fill="none"
                stroke={SERIES[i % SERIES.length]}
                strokeWidth="26"
                strokeDasharray={`${dash} ${C - dash}`}
                strokeDashoffset={-offset}
              />
            );
            offset += dash;
            return seg;
          })}
        </g>
      </svg>
      <ul className="space-y-2 text-sm text-ash-300">
        {parts.map((p, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ background: SERIES[i % SERIES.length] }} />
            Segment {i + 1}
            <span className="tnum text-white">{Math.round((p / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RankBars({ seed }: { seed: number }) {
  const rows = ["Instagram", "Website", "Newsletter", "Events", "TikTok"];
  const values = sample(seed + 5, rows.length, 30, 70);
  const max = Math.max(...values);
  return (
    <div className="mt-4 flex flex-col gap-3">
      {rows.map((label, i) => (
        <div key={label} className="flex items-center gap-3 text-sm">
          <span className="w-24 shrink-0 text-ash-300">{label}</span>
          <div className="h-4 flex-1 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full"
              style={{ width: `${(values[i] / max) * 100}%`, background: SERIES[i % SERIES.length] }}
            />
          </div>
          <span className="tnum w-10 text-right text-white">{values[i]}</span>
        </div>
      ))}
    </div>
  );
}

function Heatmap({ seed }: { seed: number }) {
  const r = rng(seed + 9);
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div className="mt-4 flex gap-1.5">
      {Array.from({ length: 7 }).map((_, col) => (
        <div key={col} className="flex flex-1 flex-col gap-1.5">
          {Array.from({ length: 6 }).map((_, row) => (
            <div
              key={row}
              className="aspect-square rounded-sm"
              style={{ background: `color-mix(in srgb, var(--rust-400) ${Math.round(r() * 100)}%, transparent)` }}
            />
          ))}
          <span className="mt-1 text-center text-xs text-ash-300">{days[col]}</span>
        </div>
      ))}
    </div>
  );
}

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const W = 120;
  const H = 36;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const pts = values
    .map((v, i) => `${(i * W) / (values.length - 1)},${H - ((v - min) / (max - min || 1)) * H}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" role="img" aria-label="Placeholder sparkline">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InsightsGallery() {
  const [mode, setMode] = useState(MODES[0]);
  const seed = MODES.indexOf(mode) * 101 + 13;

  const kpis = [
    { label: "Followers", value: sample(seed, 8, 800, 400) },
    { label: "Reach", value: sample(seed + 1, 8, 5000, 8000) },
    { label: "Engagement", value: sample(seed + 2, 8, 200, 300) },
    { label: "Site traffic", value: sample(seed + 3, 8, 400, 900) },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <CareTag>Insights</CareTag>
          <h1 className="subhead mt-2">The numbers, in plain English.</h1>
        </div>
        <PlaceholderTag />
      </div>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ash-300">
        Sample charts, laid out the way this page will report once real metrics
        are wired in. Switch modes to preview each view.
      </p>

      {/* Mode selector */}
      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Insight mode">
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-[var(--r-pill)] px-4 py-1.5 text-sm transition ${
              mode === m
                ? "bg-brick text-on-dark"
                : "bg-white/5 text-ash-300 hover:bg-white/10 hover:text-paper"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* KPI tiles with sparklines */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k, i) => (
          <GlassPanel key={k.label} depth="far" radius="md" contentClassName="p-5">
            <p className="care-tag">{k.label}</p>
            <p className="tnum mt-2 text-2xl font-bold text-white">
              {k.value.at(-1)!.toLocaleString("en-US")}
            </p>
            <Sparkline values={k.value} color={SERIES[i % SERIES.length]} />
          </GlassPanel>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassPanel radius="lg" depth="mid" light contentClassName="p-6">
          <div className="flex items-center justify-between">
            <CareTag>Reach — weekly</CareTag>
            <PlaceholderTag />
          </div>
          <LineChart values={sample(seed + 1, 12, 40, 60)} />
        </GlassPanel>

        <GlassPanel radius="lg" depth="mid" contentClassName="p-6">
          <div className="flex items-center justify-between">
            <CareTag>Posts by week</CareTag>
            <PlaceholderTag />
          </div>
          <BarChart values={sample(seed + 4, 10, 10, 50)} />
        </GlassPanel>

        <GlassPanel radius="lg" depth="mid" contentClassName="p-6">
          <div className="flex items-center justify-between">
            <CareTag>Audience split</CareTag>
            <PlaceholderTag />
          </div>
          <Donut seed={seed} />
        </GlassPanel>

        <GlassPanel radius="lg" depth="mid" contentClassName="p-6">
          <div className="flex items-center justify-between">
            <CareTag>Channel mix</CareTag>
            <PlaceholderTag />
          </div>
          <StackedBars seed={seed} />
        </GlassPanel>

        <GlassPanel radius="lg" depth="mid" contentClassName="p-6">
          <div className="flex items-center justify-between">
            <CareTag>Top sources</CareTag>
            <PlaceholderTag />
          </div>
          <RankBars seed={seed} />
        </GlassPanel>

        <GlassPanel radius="lg" depth="mid" contentClassName="p-6">
          <div className="flex items-center justify-between">
            <CareTag>Activity heatmap</CareTag>
            <PlaceholderTag />
          </div>
          <Heatmap seed={seed} />
        </GlassPanel>
      </div>
    </div>
  );
}
