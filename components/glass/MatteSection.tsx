import type { ElementType, ReactNode } from "react";

type MatteSectionProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/**
 * Matte denim field: layered near-blacks, indigo dye bleed,
 * twill grain at ≤5% opacity. The backdrop glass sits over.
 */
export function MatteSection({
  as: Tag = "section",
  className,
  children,
}: MatteSectionProps) {
  return <Tag className={`matte ${className ?? ""}`}>{children}</Tag>;
}
