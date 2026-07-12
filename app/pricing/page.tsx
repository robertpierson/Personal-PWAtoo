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
    "Serious work, unserious price. $19, $59, or $179 a month with build credits included; cancel with one email.",
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
      "Contracts that outlive your commitment",
      "Invented numbers — a fake stat dies at the first follow-up question",
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
              Serious work.
              <br />
              Unserious <span className="text-rust-500">price</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ash-300">
              A full crew — site, socials, content, events, reporting — for
              less than one freelancer hour a month. Upgrade, downgrade, or
              walk away whenever; your accounts and numbers stay yours.
            </p>
          </div>

          <div className="mt-14">
            <PricingTiers />
          </div>

          {/* Why each tier is worth it + the credit system */}
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {[
              {
                tag: "Why Starter",
                body: "You stop being invisible. A real site that stays current and one designed post a week — the minimum viable presence, kept alive without you thinking about it.",
              },
              {
                tag: "Why Growth",
                body: "The whole operation runs without you: full site, three posts a week, the approvals queue, and the monthly report that turns your work into numbers you can hand anyone.",
              },
              {
                tag: "Why Studio",
                body: "For orgs with real momentum: everything in Growth plus newsletters, campaign and event support, and a quarterly strategy call. A marketing department, minus the payroll.",
              },
            ].map((w, i) => (
              <Reveal key={w.tag} delay={i * 90}>
                <GlassPanel depth="far" radius="lg" contentClassName="p-7 h-full">
                  <CareTag>{w.tag}</CareTag>
                  <p className="mt-4 text-sm leading-relaxed text-paper">
                    {w.body}
                  </p>
                </GlassPanel>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <GlassPanel radius="lg" depth="mid" light contentClassName="p-8 sm:p-10">
              <CareTag>Build credits — included in every plan</CareTag>
              <p className="mt-4 max-w-2xl leading-relaxed text-paper">
                Credits are how you request design and build work from
                inside your dashboard — no quotes, no email chains. A social
                graphic runs 1 credit, a print-ready poster 2, a new site
                section 5, a full campaign kit 10. Starter includes{" "}
                <strong style={{ color: "var(--gold)" }}>5 a month</strong>,
                Growth{" "}
                <strong style={{ color: "var(--gold)" }}>15</strong>, Studio{" "}
                <strong style={{ color: "var(--gold)" }}>40</strong>. They
                refresh monthly, and we confirm scope before spending any.
              </p>
            </GlassPanel>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {INCLUDED.map((col, i) => (
              <Reveal key={col.title} delay={i * 90}>
                <GlassPanel depth="far" radius="lg" contentClassName="p-7">
                  <CareTag>{col.title}</CareTag>
                  <ul className="mt-4 space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-paper">
                        <span aria-hidden style={{ color: i === 0 ? "var(--rust-400)" : "var(--olive)" }}>
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
