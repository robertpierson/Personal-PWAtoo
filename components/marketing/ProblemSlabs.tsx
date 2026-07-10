"use client";

import { useEffect, useRef } from "react";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";

const VENDORS = [
  {
    tag: "The website",
    line: "Built in 2019 by a company that stopped answering email.",
    offset: { "--slab-x": "-36px", "--slab-y": "6px", "--slab-r": "-4deg" },
  },
  {
    tag: "The socials",
    line: "A volunteer with Canva and forty-five spare minutes a month.",
    offset: { "--slab-x": "24px", "--slab-y": "-8px", "--slab-r": "3deg" },
  },
  {
    tag: "The newsletter",
    line: "Nobody, since March. The list is still growing, though.",
    offset: { "--slab-x": "-12px", "--slab-y": "14px", "--slab-r": "-2deg" },
  },
];

/** Three vendors that never spoke — misaligned slabs snap into one on scroll. */
export function ProblemSlabs() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-aligned", "");
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {VENDORS.map((v) => (
        <div
          key={v.tag}
          className="slab"
          style={v.offset as React.CSSProperties}
        >
          <GlassPanel depth="mid" radius="md" contentClassName="px-6 py-5">
            <CareTag>{v.tag}</CareTag>
            <p className="mt-2 text-paper">{v.line}</p>
          </GlassPanel>
        </div>
      ))}
    </div>
  );
}
