"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";
import { isDemoMode } from "@/lib/demo";

type Scores = {
  website: number;
  social: number;
  cadence: number;
  discoverability: number;
  overall: number;
  funderLine: string;
};

/** Deterministic, plausible sample reading seeded from the name. */
function generateScores(name: string): Scores {
  let h = 2166136261;
  for (const c of name.toLowerCase().trim()) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  const rand = () => {
    h = Math.imul(h ^ (h >>> 15), h | 1);
    h ^= h + Math.imul(h ^ (h >>> 7), h | 61);
    return ((h ^ (h >>> 14)) >>> 0) / 4294967296;
  };
  const between = (lo: number, hi: number) =>
    Math.round(lo + rand() * (hi - lo));

  const website = between(32, 88);
  const social = between(28, 86);
  const cadence = between(22, 84);
  const discoverability = between(30, 82);
  const overall = Math.round(
    website * 0.3 + social * 0.25 + cadence * 0.25 + discoverability * 0.2,
  );

  const funderLine =
    overall >= 70
      ? "Solid bones. A funder finds you, believes you, and sees signs of life. Consistency is what's left."
      : overall >= 50
        ? "A funder finds you — then finds a feed that went quiet in March. Credible, but not current."
        : "A funder searching your name meets a dead link and a logo from three rebrands ago. Fixable — quickly.";

  return { website, social, cadence, discoverability, overall, funderLine };
}

function Gauge({ label, value }: { label: string; value: number }) {
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const C = 2 * Math.PI * 30;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
          <circle
            cx="36"
            cy="36"
            r="30"
            fill="none"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="5"
          />
          <circle
            className="gauge-arc"
            cx="36"
            cy="36"
            r="30"
            fill="none"
            stroke="var(--clay-500)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={drawn ? C * (1 - value / 100) : C}
          />
        </svg>
        <span className="tnum absolute inset-0 grid place-items-center text-lg font-semibold text-white">
          {value}
        </span>
      </div>
      <span className="care-tag text-center">{label}</span>
    </div>
  );
}

/**
 * Presence Scorecard — the hero centerpiece. Type an org name, watch
 * the reading assemble. Demo mode generates a plausible sample; wired
 * mode will pull real signals.
 */
export function Scorecard() {
  const [name, setName] = useState("");
  const [phase, setPhase] = useState<"idle" | "assembling" | "ready">("idle");
  const [scores, setScores] = useState<Scores | null>(null);

  const run = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setScores(generateScores(name));
    setPhase("assembling");
    window.setTimeout(() => setPhase("ready"), 500);
  };

  return (
    <GlassPanel radius="lg" light contentClassName="p-7 sm:p-9">
      <div className="flex items-center justify-between gap-4">
        <CareTag>Presence scorecard</CareTag>
        {isDemoMode && <CareTag>Sample reading</CareTag>}
      </div>

      <form onSubmit={run} className="mt-5 flex gap-3">
        <label htmlFor="scorecard-name" className="sr-only">
          Your organization&apos;s name
        </label>
        <input
          id="scorecard-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your organization's name"
          className="w-full rounded-[var(--r-pill)] border border-white/12 bg-ink-800/70 px-5 py-3 text-paper outline-none transition placeholder:text-smoke-400 focus:border-clay-400"
        />
        <button type="submit" className="btn btn-primary shrink-0">
          Read it
        </button>
      </form>

      {phase === "idle" ? (
        <p className="mt-6 text-sm leading-relaxed text-ash-300">
          Website, socials, posting rhythm, discoverability — and what a
          funder actually sees when they search you. One honest reading,
          thirty seconds.
        </p>
      ) : (
        scores && (
          <div key={name} className="mt-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="care-tag">Overall</span>
                <p className="tnum mt-1 text-6xl font-bold leading-none text-white">
                  {scores.overall}
                  <span className="text-xl font-medium text-ash-300">
                    /100
                  </span>
                </p>
              </div>
              <Link href="/contact" className="btn btn-primary">
                Fix my score
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-4">
              <Gauge label="Website" value={scores.website} />
              <Gauge label="Social consistency" value={scores.social} />
              <Gauge label="Cadence" value={scores.cadence} />
              <Gauge label="Discoverability" value={scores.discoverability} />
            </div>

            <div
              className="mt-7 rounded-[var(--r-md)] p-5"
              style={{
                background: "rgba(193, 95, 61, 0.1)",
                boxShadow: "inset 0 0 0 1px rgba(213, 127, 92, 0.25)",
              }}
            >
              <CareTag>What a funder sees</CareTag>
              <p className="mt-2 text-sm leading-relaxed text-paper">
                {scores.funderLine}
              </p>
            </div>
          </div>
        )
      )}
    </GlassPanel>
  );
}
