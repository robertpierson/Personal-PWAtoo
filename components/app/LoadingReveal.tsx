"use client";

/**
 * Data gate for placeholder surfaces. When there IS content, render it
 * immediately — no fake spinner. Only when there's genuinely nothing yet
 * (no data, nothing ordered) do we show the "Loading data…" state.
 */
export function LoadingReveal({
  children,
  height = 180,
  empty = false,
}: {
  children: React.ReactNode;
  height?: number;
  empty?: boolean;
}) {
  if (!empty) return <>{children}</>;

  return (
    <div
      className="relative grid animate-pulse place-items-center overflow-hidden rounded-[var(--r-md)]"
      style={{ height, background: "color-mix(in srgb, var(--white) 3%, transparent)" }}
    >
      <div className="absolute inset-0 flex flex-col justify-center gap-2 p-5 opacity-60">
        <div className="h-3 w-2/5 rounded bg-white/10" />
        <div className="h-2 w-1/4 rounded bg-white/8" />
      </div>
      <span className="relative care-tag" style={{ letterSpacing: "0.2em" }}>
        Loading data…
      </span>
    </div>
  );
}
