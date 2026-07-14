"use client";

/**
 * Loading-data placeholders. There is no sample data anywhere — until real
 * metrics arrive, every data surface shows a rich "Loading data…" skeleton
 * that looks like the chart/list it will become, not an empty box.
 */

type Variant = "chart" | "bars" | "donut" | "rows" | "tile" | "calendar";

export function Skeleton({
  variant = "chart",
  height = 200,
  label = true,
}: {
  variant?: Variant;
  height?: number;
  label?: boolean;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-[var(--r-md)]" style={{ minHeight: height }}>
      <div style={{ height }}>{SHAPES[variant](height)}</div>
      {label && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <span
            className="care-tag rounded-[var(--r-pill)] px-3 py-1.5"
            style={{
              letterSpacing: "0.2em",
              background: "color-mix(in srgb, var(--ink-900) 78%, transparent)",
              boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--white) 12%, transparent)",
            }}
          >
            Loading data…
          </span>
        </div>
      )}
    </div>
  );
}

const bar = "skeleton";

const SHAPES: Record<Variant, (h: number) => React.ReactNode> = {
  chart: (h) => {
    const heights = [42, 58, 50, 70, 62, 80, 68, 88, 76, 94, 60, 84];
    return (
      <div className="flex h-full flex-col justify-end gap-3 p-4">
        <div className="flex flex-1 items-end gap-2">
          {heights.map((pct, i) => (
            <div key={i} className={`${bar} flex-1`} style={{ height: `${pct}%` }} />
          ))}
        </div>
        <div className={`${bar} h-2 w-1/3`} />
      </div>
    );
  },
  bars: () => (
    <div className="flex h-full flex-col justify-center gap-3 p-4">
      {[80, 62, 48, 36, 24].map((w, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`${bar} h-3 w-20`} />
          <div className={`${bar} h-4 flex-1`} style={{ maxWidth: `${w}%` }} />
        </div>
      ))}
    </div>
  ),
  donut: () => (
    <div className="flex h-full items-center gap-6 p-4">
      <div
        className="skeleton shrink-0 rounded-full"
        style={{ width: 120, height: 120, WebkitMaskImage: "radial-gradient(circle, transparent 48%, #000 49%)", maskImage: "radial-gradient(circle, transparent 48%, #000 49%)" }}
      />
      <div className="flex-1 space-y-2.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`${bar} h-3 w-3 rounded-sm`} />
            <div className={`${bar} h-3 flex-1`} />
          </div>
        ))}
      </div>
    </div>
  ),
  rows: () => (
    <div className="flex h-full flex-col justify-center gap-3 p-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`${bar} h-9 w-9 rounded-full`} />
          <div className="flex-1 space-y-1.5">
            <div className={`${bar} h-3 w-2/3`} />
            <div className={`${bar} h-2 w-1/3`} />
          </div>
        </div>
      ))}
    </div>
  ),
  tile: () => (
    <div className="flex h-full flex-col justify-center gap-2.5 p-4">
      <div className={`${bar} h-6 w-1/2`} />
      <div className={`${bar} h-2.5 w-8/12`} style={{ maxWidth: "70%" }} />
    </div>
  ),
  calendar: () => (
    <div className="flex h-full flex-col justify-center gap-[5px] p-4">
      {Array.from({ length: 7 }).map((_, r) => (
        <div key={r} className="flex gap-[5px]">
          {Array.from({ length: 26 }).map((_, c) => (
            <div key={c} className={`${bar} h-3 w-3 shrink-0 rounded-[3px]`} />
          ))}
        </div>
      ))}
    </div>
  ),
};
