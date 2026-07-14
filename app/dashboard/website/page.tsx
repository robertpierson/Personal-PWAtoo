"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";

// Placeholder website ops surface. Status blocks are static previews of
// what will read live once the site is hosted on Vercel with a Supabase
// backend and their status APIs are wired in.

type Health = "up" | "building" | "down";

const HEALTH: Record<Health, { label: string; color: string }> = {
  up: { label: "Operational", color: "var(--olive)" },
  building: { label: "Building", color: "var(--gold)" },
  down: { label: "Down", color: "var(--rust-500)" },
};

const DEPLOYS = [
  { when: "2h ago", commit: "Refresh demo-day landing hero", status: "up" as Health, dur: "38s" },
  { when: "Yesterday", commit: "Add sponsor logo strip", status: "up" as Health, dur: "41s" },
  { when: "3d ago", commit: "New-member form validation", status: "up" as Health, dur: "35s" },
  { when: "5d ago", commit: "Season schedule page", status: "up" as Health, dur: "52s" },
];

const INFRA: { name: string; detail: string; status: Health; provider: string }[] = [
  { name: "Hosting", detail: "Vercel · Edge network · iad1", status: "up", provider: "vercel" },
  { name: "Database", detail: "Supabase Postgres · 0.4 GB / 8 GB", status: "up", provider: "supabase" },
  { name: "Auth", detail: "Supabase Auth · Google SSO", status: "up", provider: "supabase" },
  { name: "Storage", detail: "Supabase Storage · 128 assets", status: "up", provider: "supabase" },
];

const REQUESTS = [
  { title: "Add a sponsors wall to the homepage", status: "In progress", tone: "action" as const, when: "Opened 2d ago" },
  { title: "Swap hero photo to qualifier shot", status: "Shipped", tone: "done" as const, when: "Closed yesterday" },
  { title: "New page: build-season blog", status: "Queued", tone: "idle" as const, when: "Opened 4d ago" },
];

const UPTIME = [100, 100, 99.98, 100, 100, 99.95, 100, 100, 100, 99.99, 100, 100];

export default function WebsitePage() {
  const [request, setRequest] = useState("");
  const [sent, setSent] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <CareTag>Website</CareTag>
          <h1 className="subhead mt-1.5">Your site, run for you.</h1>
        </div>
      </div>

      {/* Live status hero */}
      <GlassPanel radius="lg" depth="mid" light className="mt-5" contentClassName="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <StatusDot status="up" />
              <span className="tnum text-lg font-semibold text-white">ridgelinerobotics.org</span>
            </div>
            <p className="mt-1 text-sm text-ash-300">
              Live · hosted on Vercel · last deployed 2h ago
            </p>
          </div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="btn btn-ghost text-sm"
            title="Opens the live site (placeholder)"
          >
            Visit site ↗
          </a>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Uptime · 90d" value="99.98%" tone="var(--olive)" />
          <Stat label="Avg response" value="184ms" />
          <Stat label="Deploys · 30d" value="17" />
          <Stat label="Build minutes" value="9.4" />
        </div>

        <div className="mt-4 border-t border-white/8 pt-4">
          <div className="flex items-center justify-between">
            <CareTag>Uptime — 12 weeks</CareTag>
            <span className="tnum text-xs" style={{ color: "var(--olive)" }}>healthy</span>
          </div>
          <UptimeBars data={UPTIME} />
        </div>
      </GlassPanel>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* Infrastructure */}
        <GlassPanel radius="lg" depth="far" contentClassName="p-5 sm:p-6">
          <CareTag>Backend & hosting</CareTag>
          <p className="mt-1.5 text-sm text-ash-300">
            The stack we run for you — you see it live, we keep it up.
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {INFRA.map((s) => (
              <li
                key={s.name}
                className="flex items-center justify-between rounded-[var(--r-sm)] px-3.5 py-3"
                style={{ background: "color-mix(in srgb, var(--white) 3.5%, transparent)" }}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white">{s.name}</p>
                  <p className="truncate text-xs text-ash-300">{s.detail}</p>
                </div>
                <span className="flex items-center gap-2 text-xs" style={{ color: HEALTH[s.status].color }}>
                  <StatusDot status={s.status} />
                  {HEALTH[s.status].label}
                </span>
              </li>
            ))}
          </ul>
        </GlassPanel>

        {/* Deploy history */}
        <GlassPanel radius="lg" depth="far" contentClassName="p-5 sm:p-6">
          <CareTag>Recent deploys</CareTag>
          <p className="mt-1.5 text-sm text-ash-300">
            Every change we ship to your site, logged.
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {DEPLOYS.map((d, i) => (
              <li key={i} className="flex items-start gap-3">
                <StatusDot status={d.status} className="mt-1.5" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-paper">{d.commit}</p>
                  <p className="tnum text-xs text-ash-300">{d.when} · built in {d.dur}</p>
                </div>
              </li>
            ))}
          </ul>
        </GlassPanel>
      </div>

      {/* Requests */}
      <GlassPanel radius="lg" depth="mid" className="mt-5" contentClassName="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CareTag>Website requests</CareTag>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={showForm ? "Close request form" : "New request"}
              aria-expanded={showForm}
              onClick={() => setShowForm((v) => !v)}
              className="grid h-8 w-8 place-items-center rounded-full text-on-dark transition"
              style={{
                background: "linear-gradient(180deg, var(--rust-500), var(--brick))",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.28), 0 6px 16px -8px rgba(193,95,61,0.6)",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden style={{ transform: showForm ? "rotate(45deg)" : "none", transition: "transform 180ms ease" }}>
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </div>

        <ul className="mt-4 flex flex-col gap-2">
          {REQUESTS.map((r) => (
            <li
              key={r.title}
              className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--r-sm)] px-3.5 py-3"
              style={{ background: "color-mix(in srgb, var(--white) 3.5%, transparent)" }}
            >
              <div>
                <p className="text-sm text-white">{r.title}</p>
                <p className="tnum text-xs text-ash-300">{r.when}</p>
              </div>
              <span className={`status-chip status-${r.tone}`}>{r.status}</span>
            </li>
          ))}
        </ul>

        {showForm ? (
          <div className="mt-5 border-t border-white/8 pt-5">
            <label htmlFor="w-req" className="care-tag block">Request a change or a new page</label>
            <textarea
              id="w-req"
              rows={3}
              autoFocus
              value={request}
              onChange={(e) => { setRequest(e.target.value); setSent(false); }}
              placeholder="e.g. Add a donations page with our Stripe-free bank details, and a photo gallery from the last event."
              className="mt-2 w-full rounded-[var(--r-sm)] border border-white/12 bg-ink-800/70 px-4 py-3 text-sm text-paper outline-none transition placeholder:text-smoke-400 focus:border-rust-400"
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={!request.trim()}
                onClick={() => { setSent(true); setRequest(""); setShowForm(false); }}
                className="btn btn-primary text-sm disabled:opacity-50"
              >
                Submit request
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setRequest(""); }}
                className="btn btn-ghost text-sm"
              >
                Cancel
              </button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ash-300">
              Something big or technical — a domain move, a data migration, anything
              that could take the site down — <span className="text-paper">DM or call us directly</span> and
              we&apos;ll handle it by hand. Everyday changes go right here.
            </p>
          </div>
        ) : (
          <div className="mt-4">
            {sent && (
              <p className="text-sm" style={{ color: "var(--olive)" }}>
                Logged — we&apos;ll pick it up and confirm scope.
              </p>
            )}
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-[var(--r-sm)] border border-dashed border-white/18 py-3 text-sm text-ash-300 transition hover:border-rust-400 hover:text-paper"
            >
              <span className="text-base leading-none">+</span> Request a change or a new page
            </button>
          </div>
        )}
      </GlassPanel>
    </div>
  );
}

function StatusDot({ status, className = "" }: { status: Health; className?: string }) {
  return (
    <span
      className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${className}`}
      style={{ background: HEALTH[status].color, boxShadow: `0 0 0 3px color-mix(in srgb, ${HEALTH[status].color} 22%, transparent)` }}
      aria-label={HEALTH[status].label}
    />
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-[var(--r-md)] p-3.5" style={{ background: "color-mix(in srgb, var(--white) 3.5%, transparent)" }}>
      <p className="care-tag">{label}</p>
      <p className="tnum mt-1 text-xl font-bold" style={{ color: tone ?? "var(--white)" }}>{value}</p>
    </div>
  );
}

function UptimeBars({ data }: { data: number[] }) {
  return (
    <div className="mt-3 flex items-end gap-1.5" style={{ height: 44 }}>
      {data.map((v, i) => {
        const down = v < 99.9;
        return (
          <div
            key={i}
            className="flex-1 rounded-[3px]"
            title={`${v}%`}
            style={{
              height: `${Math.max(12, ((v - 99.8) / 0.2) * 100)}%`,
              minHeight: 12,
              background: down ? "var(--gold)" : "var(--olive)",
              opacity: down ? 1 : 0.75,
            }}
          />
        );
      })}
    </div>
  );
}
