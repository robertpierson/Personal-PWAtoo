import type { ElementType, ReactNode } from "react";
import { PointerLight } from "./PointerLight";

type GlassPanelProps = {
  as?: ElementType;
  /** Corner radius token. */
  radius?: "sm" | "md" | "lg" | "pill";
  /** Stacking depth — controls blur strength and fill opacity. */
  depth?: "near" | "mid" | "far";
  /** Track the pointer with the specular highlight (client-side). */
  light?: boolean;
  /** Perimeter refraction layer. Disable on persistent chrome (nav)
      to cap concurrent backdrop-filter layers. */
  refract?: boolean;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
};

const radiusVar = {
  sm: "var(--r-sm)",
  md: "var(--r-md)",
  lg: "var(--r-lg)",
  pill: "var(--r-pill)",
} as const;

/**
 * Four-layer liquid glass surface:
 * translucency+saturation, perimeter refraction, specular rim,
 * and a specular highlight (static sheen or pointer-tracked).
 * Always place over a textured or gradient backdrop (MatteSection).
 */
export function GlassPanel({
  as: Tag = "div",
  radius = "md",
  depth = "near",
  light = false,
  refract = true,
  className,
  contentClassName,
  children,
}: GlassPanelProps) {
  return (
    <Tag
      className={`glass ${className ?? ""}`}
      data-depth={depth}
      style={{ "--glass-r": radiusVar[radius] } as React.CSSProperties}
    >
      <div className="glass-base" aria-hidden />
      {refract && <div className="glass-refract" aria-hidden />}
      <div className="glass-rim" aria-hidden />
      {light ? <PointerLight /> : <div className="glass-light" aria-hidden />}
      <div className={`glass-content ${contentClassName ?? ""}`}>{children}</div>
    </Tag>
  );
}
