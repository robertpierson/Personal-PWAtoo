"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";

/**
 * Guided tour of everything we run — pick a surface, see exactly what
 * we do there and what you get back. One quiet interactive, no
 * scroll-jacking.
 */
const SERVICES = [
  {
    label: "Website",
    headline: "Built, hosted, and kept alive.",
    body: "We design your site, build it, host it, and run the backend — updates, content, forms, the lot. You never touch a server or chase a renewal.",
    receipt: "Site traffic and conversions land in your monthly report.",
  },
  {
    label: "Socials",
    headline: "Written, designed, scheduled, shipped.",
    body: "A real content calendar across your channels, produced weeks ahead. Every post passes through your approval queue first — nothing publishes without your review.",
    receipt: "Reach, followers, and engagement — tracked week by week.",
  },
  {
    label: "Content & design",
    headline: "One look, everywhere your name shows up.",
    body: "Logo, templates, flyers, decks, photography direction. Request anything from inside the app with build credits; we deliver back with source files. Yours to keep.",
    receipt: "Every deliverable logged in your Designs library.",
  },
  {
    label: "Events",
    headline: "Promoted, filled, followed up.",
    body: "Launches, fundraisers, showcases, meetings — we run the promotion, the sign-up flow, the reminders, and the recap so the room is actually full.",
    receipt: "Sign-ups and attendance, counted — not guessed.",
  },
  {
    label: "Reporting",
    headline: "The receipt. The product.",
    body: "One report a month in plain English: what ran, what grew, what it means, and the line the numbers support — for a résumé, a board, a sponsor, or a grant.",
    receipt: "This is the thing everything else feeds.",
  },
] as const;

export function ServicesExplorer() {
  const [active, setActive] = useState(0);
  const service = SERVICES[active];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Services">
        {SERVICES.map((s, i) => (
          <button
            key={s.label}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`rounded-[var(--r-pill)] px-5 py-2 text-sm transition ${
              active === i
                ? "bg-rust-500 text-on-dark"
                : "bg-white/5 text-ash-300 hover:text-white"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <GlassPanel
        key={service.label}
        radius="lg"
        depth="mid"
        light
        className="mt-6"
        contentClassName="p-8 sm:p-10"
      >
        <CareTag>
          {active + 1} of {SERVICES.length} — {service.label}
        </CareTag>
        <h3 className="subhead mt-3">{service.headline}</h3>
        <p className="mt-4 max-w-2xl leading-relaxed text-ash-300">
          {service.body}
        </p>
        <p
          className="mt-5 border-t border-white/10 pt-4 font-mono text-xs uppercase tracking-[0.14em]"
          style={{ color: "var(--gold)" }}
        >
          ✦ {service.receipt}
        </p>
      </GlassPanel>
    </div>
  );
}
