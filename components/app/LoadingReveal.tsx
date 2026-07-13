"use client";

import { useEffect, useState } from "react";

/**
 * Placeholder data loader: shows a "Loading data…" skeleton on mount,
 * then reveals its children (the sample charts) — or an empty state when
 * there's genuinely nothing to show yet.
 */
export function LoadingReveal({
  children,
  height = 180,
  delay = 900,
  empty = false,
}: {
  children: React.ReactNode;
  height?: number;
  delay?: number;
  empty?: boolean;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!ready) {
    return (
      <div className="relative grid animate-pulse place-items-center overflow-hidden rounded-[var(--r-md)]" style={{ height, background: "color-mix(in srgb, var(--white) 3%, transparent)" }}>
        <div className="absolute inset-0 flex flex-col justify-center gap-2 p-5 opacity-60">
          <div className="h-3 w-2/5 rounded bg-white/10" />
          <div className="h-2 w-1/4 rounded bg-white/8" />
        </div>
        <span className="relative care-tag" style={{ letterSpacing: "0.2em" }}>Loading data…</span>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="grid place-items-center rounded-[var(--r-md)] text-center" style={{ height, border: "1.5px dashed color-mix(in srgb, var(--white) 16%, transparent)" }}>
        <div>
          <p className="care-tag">No data yet</p>
          <p className="mt-1.5 text-sm text-ash-300">Fills in once posts start shipping.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
