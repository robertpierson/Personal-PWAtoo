"use client";

import Link from "next/link";
import { useState } from "react";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";

const TIERS = [
  {
    name: "Starter",
    monthly: 19,
    yearly: 190,
    credits: 5,
    line: "Exists, and looks like it.",
    features: [
      "One-page site, hosted and maintained",
      "One post a week, written and designed",
      "Monthly summary email",
      "5 build credits a month",
    ],
    featured: false,
  },
  {
    name: "Growth",
    monthly: 59,
    yearly: 590,
    credits: 15,
    line: "The whole presence, run for you.",
    features: [
      "Full site — built, hosted, kept current",
      "Three posts a week across your channels",
      "Approvals app — you review before it ships",
      "The monthly report — your numbers, your receipts",
      "15 build credits a month",
    ],
    featured: true,
  },
  {
    name: "Studio",
    monthly: 179,
    yearly: 1790,
    credits: 40,
    line: "A full marketing team, on call.",
    features: [
      "Everything in Growth",
      "Email newsletter, written and sent",
      "Campaign & event support (launches, fundraisers)",
      "Quarterly strategy call",
      "40 build credits a month",
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

            <Link
              href={`/contact?plan=${tier.name}`}
              className={`btn mt-8 w-full ${
                tier.featured ? "btn-primary" : "btn-ghost"
              }`}
            >
              Book a call to start {tier.name}
            </Link>
          </GlassPanel>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-ash-300">
        Month to month, cancel with one email. Your accounts and your numbers
        are yours to keep. No card, no checkout page — start with a call, then
        pay by direct bank transfer. Details arrive with each invoice.
      </p>
      <p className="mt-2 text-center text-sm text-ash-300">
        Paying from an organization budget? We&apos;ll send a one-page
        justification for whoever signs off.
      </p>
    </div>
  );
}
