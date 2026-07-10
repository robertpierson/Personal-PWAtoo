import Link from "next/link";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { MatteSection } from "@/components/glass/MatteSection";
import { CareTag } from "@/components/CareTag";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { PricingTiers } from "@/components/TierCard";

export const metadata = {
  title: "Bandana — Pricing",
  description:
    "Priced like a utility bill, not an agency. $19, $59, or $179 a month; cancel anytime.",
};

const INCLUDED = [
  {
    title: "Every plan includes",
    items: [
      "Nothing publishes without your review",
      "You own your accounts and every file we make",
      "Month to month — cancel with one email",
      "A human who knows your org by name",
    ],
  },
  {
    title: "Never included",
    items: [
      "Setup fees",
      "Surprise invoices",
      "Contracts that outlive your board term",
      "Jargon in your monthly report",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteNav />
      <MatteSection as="main" className="min-h-dvh">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-36 sm:pt-44">
          <div className="text-center">
            <CareTag>Pricing</CareTag>
            <h1 className="headline mt-4">
              Priced like a utility bill,
              <br />
              not an <span className="text-denim-400">agency</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ash-300">
              Pick the plan that matches your season. Upgrade, downgrade, or
              walk away whenever — your stuff stays yours.
            </p>
          </div>

          <div className="mt-14">
            <PricingTiers />
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {INCLUDED.map((col, i) => (
              <Reveal key={col.title} delay={i * 90}>
                <GlassPanel depth="far" radius="lg" contentClassName="p-7">
                  <CareTag>{col.title}</CareTag>
                  <ul className="mt-4 space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-paper">
                        <span aria-hidden style={{ color: i === 0 ? "var(--denim-400)" : "var(--selvedge)" }}>
                          {i === 0 ? "—" : "✕"}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassPanel>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <div className="text-center">
              <p className="text-ash-300">
                Not sure which fits? That&apos;s literally what the intro
                call is for.
              </p>
              <Link href="/contact" className="btn btn-primary mt-5">
                Book an intro call
              </Link>
            </div>
          </Reveal>
        </div>
        <SiteFooter />
      </MatteSection>
    </>
  );
}
