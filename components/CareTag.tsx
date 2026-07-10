import type { ReactNode } from "react";

/**
 * Denim care-label eyebrow: mono, uppercase, tracked.
 * Renders a leading em-dash stitch, e.g. `— 100% ORGANIC STRATEGY`.
 */
export function CareTag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`care-tag ${className ?? ""}`}>
      <span aria-hidden>—&nbsp;</span>
      {children}
    </span>
  );
}
