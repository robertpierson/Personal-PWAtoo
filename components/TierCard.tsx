"use client";

import Link from "next/link";
import { useState } from "react";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";

// Stripe Payment Links; set in .env.local. Empty = CTA falls back to
// /contact. [FILL: create the three Payment Links in the Stripe
// dashboard and paste the URLs]
const STRIPE_LINKS: Record<string, string | undefined> = {
  Starter: process.env.NEXT_PUBLIC_STRIPE_LINK_STARTER,
  Chapter: process.env.NEXT_PUBLIC_STRIPE_LINK_CHAPTER,
  Founder: process.env.NEXT_PUBLIC_STRIPE_LINK_FOUNDER,
};

const TIERS = [
  {
    name: "Starter",
    monthly: 19,
    yearly: 190,
    line: "Exists, and looks like it.",
    features: [
      "One-page site, hosted and maintained",
      "One post a week, written and designed",
      "Monthly summary email",
    ],
    featured: false,
  },
  {
    name: "Chapter",
    monthly: 59,
    yearly: 590,
    line: "The whole thing, run for you.",
    features: [
      "Full site, kept current",
      "Three posts a week across your channels",
      "Approvals app — you review before it ships",
      "The monthly report — your numbers, your receipts",
    ],
    featured: true,
  },
  {
    name: "Founder",
    monthly: 179,
    yearly: 1790,
    line: "A marketing team, for the price of a tutor.",
    features: [
      "Everything in Chapter",
      "Email newsletter, written and sent",
      "Campaign design (events, fundraisers, launches)",
      "Quarterly strategy call",
    ],
    featured: false,
  },
];

/** Three glass tiers with an honest monthly/annual toggle. */
export function PricingTiers() {
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-center gap-3">
        <span
          className={`text-sm ${annual ? "text-ash-300" : "text-white"}`}
        >
          Monthly
        </span>
        <button
          role="switch"
          aria-checked={annual}
          aria-label="Bill yearly (two months free)"
          onClick={() => setAnnual((v) => !v)}
          className="relative h-7 w-13 rounded-[var(--r-pill)] bg-graphite-600 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] transition"
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-rust-400 transition-all ${
              annual ? "left-7" : "left-1"
            }`}
          />
        </button>
        <span
          className={`text-sm ${annual ? "text-white" : "text-ash-300"}`}
        >
          Yearly
          <span className="ml-1.5 text-xs text-rust-300">
            2 months free
          </span>
        </span>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {TIERS.map((tier) => (
          <GlassPanel
            key={tier.name}
            radius="lg"
            depth={tier.featured ? "near" : "mid"}
            light={tier.featured}
            className={tier.featured ? "lg:-translate-y-3" : ""}
            contentClassName="flex h-full flex-col p-8"
          >
            <div className="flex items-center justify-between">
              <CareTag>{tier.name}</CareTag>
              {tier.featured && (
                <span
                  className="care-tag"
                  style={{ color: "var(--olive)" }}
                >
                  Most picked
                </span>
              )}
            </div>

            <p className="tnum mt-5 text-5xl font-bold text-white">
              ${annual ? (tier.yearly / 12).toFixed(2) : tier.monthly}
              <span className="text-base font-medium text-ash-300"> /mo</span>
            </p>
            {annual && (
              <p className="tnum mt-1.5 text-xs text-ash-300">
                billed ${tier.yearly} yearly
              </p>
            )}
            <p className="mt-3 text-sm text-paper">{tier.line}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-ash-300">
                  <span aria-hidden style={{ color: "var(--rust-400)" }}>
                    —
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {STRIPE_LINKS[tier.name] ? (
              <a
                href={STRIPE_LINKS[tier.name]}
                className={`btn mt-8 w-full ${
                  tier.featured ? "btn-primary" : "btn-ghost"
                }`}
              >
                Pick {tier.name} — pay with Stripe
              </a>
            ) : (
              <Link
                href="/contact"
                className={`btn mt-8 w-full ${
                  tier.featured ? "btn-primary" : "btn-ghost"
                }`}
              >
                Pick {tier.name}
              </Link>
            )}
          </GlassPanel>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-ash-300">
        Month to month, cancel with one email. Your accounts and your numbers
        are yours to keep. Checkout runs through Stripe — we never see your
        card.
      </p>
      <p className="mt-2 text-center text-sm text-ash-300">
        Paying from a club budget? We&apos;ll send you a one-page
        justification to hand to your student-activities office.
      </p>
    </div>
  );
}
