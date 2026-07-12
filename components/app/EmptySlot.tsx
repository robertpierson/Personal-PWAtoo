import type { ReactNode } from "react";

/** Dashed placeholder panel for surfaces with nothing in them yet. */
export function EmptySlot({
  title,
  children,
  className,
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--r-lg)] p-8 text-center ${className ?? ""}`}
      style={{
        border: "1.5px dashed color-mix(in srgb, var(--white) 18%, transparent)",
      }}
    >
      <p className="care-tag">{title}</p>
      {children && (
        <div className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ash-300">
          {children}
        </div>
      )}
    </div>
  );
}
