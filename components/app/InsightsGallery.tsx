"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";
import { StatChart } from "@/components/app/StatChart";
import {
  METRICS,
  kpi,
  audienceSplit,
  topPosts,
  postingHeat,
  type Metric,
} from "@/lib/placeholder-insights";

const VIEWS = ["Overview", "Audience", "Content", "Growth"] as const;
type View = (typeof VIEWS)[number];

const fmt = (v: number) => v.toLocaleString("en-US");

export function InsightsGallery() {
  const [view, setView] = useState<View>("Overview");
  const [metricKey, setMetricKey] = useState(METRICS[0].key);
  const metric = METRICS.find((m) => m.key === metricKey)!;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <CareTag>Insights</CareTag>
          <h1 className="subhead mt-1.5">The numbers, in plain English.</h1>
        </div>
        <PlaceholderTag />
      </div>

      {/* View tabs — each is its own page of the story */}
      <div className="mt-5 flex flex-wrap gap-1.5 border-b border-white/8 pb-3" role="tablist" aria-label="Insight view">
        {VIEWS.map((v) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={view === v}
            onClick={() => setView(v)}
            className={`rounded-[var(--r-pill)] px-4 py-1.5 text-sm transition ${
              view === v
                ? "bg-brick text-on-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
                : "text-ash-300 hover:bg-white/5 hover:text-paper"
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {view === "Overview" && (
        <OverviewView metric={metric} metricKey={metricKey} onMetric={setMetricKey} />
      )}
      {view === "Audience" && <AudienceView />}
      {view === "Content" && <ContentView />}
      {view === "Growth" && <GrowthView />}
    </div>
  );
}

/* ----------------------------------------------------------------- */
/* Views                                                              */
/* ----------------------------------------------------------------- */

function OverviewView({
  metric,
  metricKey,
  onMetric,
}: {
  metric: Metric;
  metricKey: string;
  onMetric: (k: string) => void;
}) {
  return (
    <>
      {/* Dense KPI strip — every headline stat at a glance */}
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {METRICS.map((m) => {
          const k = kpi(m);
          const active = m.key === metricKey;
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => onMetric(m.key)}
              className={`rounded-[var(--r-md)] p-3.5 text-left transition ${
                active ? "shadow-[inset_0_0_0_1.5px_var(--rust-500)]" : "hover:bg-white/4"
              }`}
              style={{ background: active ? "color-mix(in srgb, var(--rust-500) 12%, transparent)" : "color-mix(in srgb, var(--white) 3%, transparent)" }}
            >
              <span className="care-tag">{k.label}</span>
              <p className="tnum mt-1 text-xl font-bold text-white">
                {fmt(k.value)}
                {k.unit}
              </p>
              <div className="mt-1.5">
                <MiniSpark points={m.points.map((p) => p.v)} color={m.color} />
              </div>
              <p className="tnum mt-1 text-[0.7rem]" style={{ color: k.delta >= 0 ? "var(--olive)" : "var(--rust-300)" }}>
                {k.delta >= 0 ? "▲" : "▼"} {Math.abs(k.delta).toLocaleString("en-US")}
                <span className="text-ash-300"> · {k.pct == null ? "new" : `${k.pct >= 0 ? "+" : ""}${k.pct}% season`}</span>
              </p>
            </button>
          );
        })}
      </div>

      {/* The interactive centerpiece */}
      <GlassPanel radius="lg" depth="mid" light className="mt-5" contentClassName="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ background: metric.color }} />
            <h2 className="text-base font-semibold text-white">{metric.label} — 26 weeks</h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {METRICS.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => onMetric(m.key)}
                aria-pressed={m.key === metricKey}
                className={`rounded-[var(--r-pill)] px-3 py-1 text-xs transition ${
                  m.key === metricKey ? "bg-white/10 text-white" : "text-ash-300 hover:text-paper"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <StatChart points={metric.points} marks={metric.marks} color={metric.color} format={fmt} />
        <p className="mt-1 border-t border-white/8 pt-3 text-sm leading-relaxed text-paper">
          {metric.blurb}
        </p>
      </GlassPanel>

      {/* What moved — annotations as a readable list */}
      <GlassPanel radius="lg" depth="far" className="mt-5" contentClassName="p-5 sm:p-6">
        <CareTag>What moved {metric.label.toLowerCase()}</CareTag>
        <ul className="mt-3 space-y-2.5">
          {metric.marks.map((mk) => (
            <li key={mk.i} className="flex gap-3 text-sm text-paper">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--gold)" }} />
              <span>
                <span className="tnum text-white">{fmt(metric.points[mk.i].v)}{metric.unit ?? ""}</span>{" "}
                — {mk.label}
              </span>
            </li>
          ))}
        </ul>
      </GlassPanel>
    </>
  );
}

function AudienceView() {
  const followers = METRICS.find((m) => m.key === "followers")!;
  return (
    <div className="mt-5 grid gap-4 lg:grid-cols-2">
      <Card title="Where they follow you" tag>
        <Donut data={audienceSplit} />
      </Card>
      <Card title="Follower growth" tag>
        <MiniLine points={followers.points.map((p) => p.v)} color={followers.color} />
        <p className="mt-3 text-sm text-paper">Up {kpi(followers).pct}% across the season — {fmt(kpi(followers).value)} total.</p>
      </Card>
      <Card title="Age of audience" tag>
        <MiniBars data={[
          { label: "13–17", value: 34 },
          { label: "18–24", value: 41 },
          { label: "25–34", value: 15 },
          { label: "35+", value: 10 },
        ]} suffix="%" />
      </Card>
      <Card title="Top locations" tag>
        <RankBars data={[
          { label: "Portland, OR", value: 38 },
          { label: "Seattle, WA", value: 22 },
          { label: "Bend, OR", value: 14 },
          { label: "Boise, ID", value: 11 },
          { label: "Other", value: 15 },
        ]} suffix="%" />
      </Card>
    </div>
  );
}

function ContentView() {
  const reach = METRICS.find((m) => m.key === "reach")!;
  const eng = METRICS.find((m) => m.key === "engagement")!;
  return (
    <div className="mt-5 flex flex-col gap-4">
      <Card title="Reach by post" tag full>
        <RankBars data={topPosts.map((p) => ({ label: p.label, value: p.value }))} />
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="When posts land best" tag>
          <Heatmap data={postingHeat} />
        </Card>
        <Card title="Engagement rate" tag>
          <MiniLine points={eng.points.map((p) => p.v)} color={eng.color} />
          <p className="mt-3 text-sm text-paper">Holding at {kpi(eng).value}% — short video is carrying it.</p>
        </Card>
      </div>
      <GlassPanel radius="lg" depth="mid" contentClassName="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <CareTag>Reach — inspect the spikes</CareTag>
          <PlaceholderTag />
        </div>
        <StatChart points={reach.points} marks={reach.marks} color={reach.color} format={fmt} />
      </GlassPanel>
    </div>
  );
}

function GrowthView() {
  const news = METRICS.find((m) => m.key === "newsletter")!;
  const events = METRICS.find((m) => m.key === "events")!;
  const site = METRICS.find((m) => m.key === "site")!;
  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Newsletter subscribers" tag>
          <MiniLine points={news.points.map((p) => p.v)} color={news.color} />
          <p className="mt-3 text-sm text-paper">{fmt(kpi(news).value)} subscribers, only ever climbing.</p>
        </Card>
        <Card title="Event sign-ups" tag>
          <MiniBars data={events.points.slice(-8).map((p, i) => ({ label: `W${i + 1}`, value: p.v }))} />
        </Card>
      </div>
      <Card title="Attention funnel" tag full>
        <Funnel steps={[
          { label: "Reach", value: 18240 },
          { label: "Profile visits", value: 4120 },
          { label: "Site visits", value: 1904 },
          { label: "Form starts", value: 214 },
          { label: "Sign-ups", value: 87 },
        ]} />
      </Card>
      <GlassPanel radius="lg" depth="mid" contentClassName="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <CareTag>Site traffic — zoom the launch</CareTag>
          <PlaceholderTag />
        </div>
        <StatChart points={site.points} marks={site.marks} color={site.color} format={fmt} />
      </GlassPanel>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/* Small charts                                                       */
/* ----------------------------------------------------------------- */

function PlaceholderTag() {
  return <span className="care-tag" style={{ color: "var(--gold)" }}>Placeholder</span>;
}

function Card({
  title,
  children,
  full,
}: {
  title: string;
  tag?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <GlassPanel radius="lg" depth="far" className={full ? "" : ""} contentClassName="p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <CareTag>{title}</CareTag>
        <PlaceholderTag />
      </div>
      <div className="mt-2">{children}</div>
    </GlassPanel>
  );
}

function MiniSpark({ points, color }: { points: number[]; color: string }) {
  const W = 100;
  const H = 22;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const pts = points
    .map((v, i) => `${(i * W) / (points.length - 1)},${H - ((v - min) / (max - min || 1)) * H}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none" role="img" aria-label="trend">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MiniLine({ points, color }: { points: number[]; color: string }) {
  const W = 320;
  const H = 120;
  const p = 6;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const x = (i: number) => p + (i * (W - p * 2)) / (points.length - 1);
  const y = (v: number) => H - p - ((v - min) / (max - min || 1)) * (H - p * 2);
  const line = points.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 w-full" role="img" aria-label="line">
      <defs>
        <linearGradient id={`ml-${color.replace(/\W/g, "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.3" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`${p},${H - p} ${line} ${W - p},${H - p}`} fill={`url(#ml-${color.replace(/\W/g, "")})`} />
      <polyline points={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Donut({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((a, b) => a + b.value, 0);
  const R = 70;
  const C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div className="mt-2 flex items-center gap-6">
      <svg viewBox="0 0 180 180" className="h-36 w-36 shrink-0" role="img" aria-label="audience split">
        <g transform="rotate(-90 90 90)">
          {data.map((d, i) => {
            const dash = (d.value / total) * C;
            const seg = (
              <circle key={i} cx="90" cy="90" r={R} fill="none" stroke={d.color} strokeWidth="24" strokeDasharray={`${dash} ${C - dash}`} strokeDashoffset={-offset} />
            );
            offset += dash;
            return seg;
          })}
        </g>
        <text x="90" y="86" textAnchor="middle" className="tnum" fontSize="22" fontWeight="700" fill="var(--white)">
          {total}%
        </text>
        <text x="90" y="104" textAnchor="middle" className="care-tag" fontSize="8" fill="var(--ash-300)">
          TRACKED
        </text>
      </svg>
      <ul className="flex-1 space-y-2 text-sm text-ash-300">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ background: d.color }} />
            <span className="flex-1">{d.label}</span>
            <span className="tnum text-white">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RankBars({ data, suffix = "" }: { data: { label: string; value: number }[]; suffix?: string }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="mt-2 flex flex-col gap-2.5">
      {data.map((d, i) => (
        <div key={d.label} className="flex items-center gap-3 text-sm">
          <span className="w-32 shrink-0 truncate text-ash-300">{d.label}</span>
          <div className="h-4 flex-1 overflow-hidden rounded-full bg-white/5">
            <div className="h-full rounded-full" style={{ width: `${(d.value / max) * 100}%`, background: i === 0 ? "var(--rust-400)" : "var(--rust-300)" }} />
          </div>
          <span className="tnum w-16 text-right text-white">{d.value.toLocaleString("en-US")}{suffix}</span>
        </div>
      ))}
    </div>
  );
}

function MiniBars({ data, suffix = "" }: { data: { label: string; value: number }[]; suffix?: string }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="mt-3 flex items-end gap-2" style={{ height: 120 }}>
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-1.5">
          <span className="tnum text-[0.7rem] text-white">{d.value}{suffix}</span>
          <div className="w-full rounded-t-[6px]" style={{ height: `${(d.value / max) * 84}px`, background: "var(--rust-400)", opacity: 0.9 }} />
          <span className="text-[0.7rem] text-ash-300">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function Heatmap({ data }: { data: number[][] }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="mt-3 flex gap-2">
      <div className="flex flex-col justify-around pr-1 text-[0.7rem] text-ash-300">
        {days.map((d, i) => <span key={i}>{d}</span>)}
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        {data.map((row, r) => (
          <div key={r} className="flex gap-1.5">
            {row.map((v, c) => (
              <div key={c} className="aspect-square flex-1 rounded-[4px]" style={{ background: `color-mix(in srgb, var(--rust-400) ${Math.round(v * 100)}%, transparent)` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Funnel({ steps }: { steps: { label: string; value: number }[] }) {
  const max = steps[0].value;
  return (
    <div className="mt-2 flex flex-col gap-2">
      {steps.map((s, i) => {
        const pct = (s.value / max) * 100;
        const conv = i === 0 ? 100 : Math.round((s.value / steps[i - 1].value) * 100);
        return (
          <div key={s.label} className="flex items-center gap-3">
            <span className="w-28 shrink-0 text-sm text-ash-300">{s.label}</span>
            <div className="relative h-8 flex-1 overflow-hidden rounded-[var(--r-sm)] bg-white/4">
              <div className="flex h-full items-center rounded-[var(--r-sm)] px-3" style={{ width: `${pct}%`, background: `linear-gradient(90deg, var(--rust-500), var(--rust-400))`, minWidth: 64 }}>
                <span className="tnum text-xs font-semibold text-on-dark">{s.value.toLocaleString("en-US")}</span>
              </div>
            </div>
            <span className="tnum w-12 text-right text-xs text-ash-300">{conv}%</span>
          </div>
        );
      })}
    </div>
  );
}
