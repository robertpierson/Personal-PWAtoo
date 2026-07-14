"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";
import { Skeleton } from "@/components/app/LoadingReveal";

const VIEWS = ["Overview", "Audience", "Content", "Growth"] as const;
type View = (typeof VIEWS)[number];

// No sample data. Every surface is a titled "Loading data…" skeleton until
// real metrics are wired in — the layout of the dashboard it will become.
export function InsightsGallery() {
  const [view, setView] = useState<View>("Overview");

  return (
    <div className="mx-auto max-w-6xl">
      <div>
        <CareTag>Insights</CareTag>
        <h1 className="subhead mt-1.5">The numbers, in plain English.</h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ash-300">
          Your dashboard is ready — the numbers fill in as soon as posts start
          shipping.
        </p>
      </div>

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

      {view === "Overview" && <Overview />}
      {view === "Audience" && <Audience />}
      {view === "Content" && <Content />}
      {view === "Growth" && <Growth />}
    </div>
  );
}

function Overview() {
  const tiles = ["Followers", "Reach", "Engagement", "Site traffic", "Event sign-ups", "Newsletter"];
  return (
    <>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {tiles.map((t) => (
          <GlassPanel key={t} depth="far" radius="md" contentClassName="p-3.5">
            <CareTag>{t}</CareTag>
            <Skeleton variant="tile" height={64} label={false} />
          </GlassPanel>
        ))}
      </div>
      <Card title="Reach — 26 weeks" big>
        <Skeleton variant="chart" height={260} />
      </Card>
      <Card title="What moved the numbers">
        <Skeleton variant="rows" height={150} />
      </Card>
    </>
  );
}

function Audience() {
  return (
    <div className="mt-5 grid gap-4 lg:grid-cols-2">
      <Card title="Where they follow you"><Skeleton variant="donut" height={170} /></Card>
      <Card title="Follower growth"><Skeleton variant="chart" height={170} /></Card>
      <Card title="Age of audience"><Skeleton variant="bars" height={170} /></Card>
      <Card title="Top locations"><Skeleton variant="bars" height={170} /></Card>
    </div>
  );
}

function Content() {
  return (
    <div className="mt-5 flex flex-col gap-4">
      <Card title="Posting calendar — this year"><Skeleton variant="calendar" height={200} /></Card>
      <Card title="Posts shipped — 26 weeks" big><Skeleton variant="chart" height={280} /></Card>
      <Card title="Reach by post"><Skeleton variant="bars" height={170} /></Card>
    </div>
  );
}

function Growth() {
  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Newsletter subscribers"><Skeleton variant="chart" height={170} /></Card>
        <Card title="Event sign-ups"><Skeleton variant="bars" height={170} /></Card>
      </div>
      <Card title="Attention funnel"><Skeleton variant="bars" height={190} /></Card>
      <Card title="Site traffic — 26 weeks" big><Skeleton variant="chart" height={280} /></Card>
    </div>
  );
}

function Card({ title, children, big }: { title: string; big?: boolean; children: React.ReactNode }) {
  return (
    <GlassPanel radius="lg" depth={big ? "mid" : "far"} light={big} className="mt-4 first:mt-5" contentClassName="p-5 sm:p-6">
      <CareTag>{title}</CareTag>
      <div className="mt-2">{children}</div>
    </GlassPanel>
  );
}
