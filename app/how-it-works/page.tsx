import type { Metadata } from "next";
import Link from "next/link";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { MatteSection } from "@/components/glass/MatteSection";
import { CareTag } from "@/components/CareTag";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { StitchedTimeline } from "@/components/StitchedTimeline";
import { ServicesExplorer } from "@/components/marketing/ServicesExplorer";
import { AwardsShowcase } from "@/components/marketing/AwardsShowcase";

export const metadata: Metadata = {
  title: "How it works — Bandana",
  description:
    "Everything we run — website, socials, content, events, reporting — how the build-credit system works, and the four steps from intro call to monthly report.",
};

const TIMELINE = [
  {
    title: "Intro call",
    body: "Twenty minutes. You talk, we listen. No deck, no pressure — just where your presence stands and where it hurts.",
  },
  {
    title: "Presence audit",
    body: "We read everything the internet says about your org and hand you the same read a stranger, sponsor, or recruiter would build in their head.",
  },
  {
    title: "Build & calendar",
    body: "Site built or refreshed, brand tightened, and your first month of content drafted and loaded into your approval queue.",
  },
  {
    title: "Run & report",
    body: "We post, you approve, the org grows. One report a month — the numbers, in plain English, and the claims they support.",
  },
];

const CREDIT_EXAMPLES = [
  { cost: "1 credit", thing: "Social graphic or story asset" },
  { cost: "2 credits", thing: "Event flyer or poster, print-ready" },
  { cost: "5 credits", thing: "New page or section on your site" },
  { cost: "10 credits", thing: "Full campaign kit — event, launch, drive" },
];

export default function HowItWorksPage() {
  return (
    <>
      <SiteNav />
      <MatteSection as="main" className="min-h-dvh overflow-x-clip">
        {/* Everything we run */}
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-36 sm:pt-44">
          <Reveal>
            <CareTag>What we actually do</CareTag>
            <h1 className="headline mt-4">
              One crew.
              <br />
              The whole <span className="text-rust-500">operation</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash-300">
              Website, socials, content, events, reporting — everything your
              organization shows the world, built and run by one crew. Pick
              a surface below and see exactly what happens there.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <ServicesExplorer />
          </Reveal>
        </section>

        {/* Four steps */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <CareTag>How we work</CareTag>
              <h2 className="subhead mt-4">
                Four steps.
                <br />
                No mystery.
              </h2>
              <p className="mt-5 max-w-sm leading-relaxed text-ash-300">
                A stitched-down process we run the same way every time — so
                you always know what happens next.
              </p>
              <div className="mt-8">
                <Link href="/contact" className="btn btn-primary">
                  Start with the intro call
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <StitchedTimeline steps={TIMELINE} />
            </Reveal>
          </div>
        </section>

        {/* Build credits */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-14 lg:grid-cols-2">
            <Reveal>
              <CareTag>Build credits</CareTag>
              <h2 className="subhead mt-4">
                Your plan comes with build power.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ash-300">
                Every plan grants monthly build credits — a simple way to
                request design and build work from inside your dashboard
                without a quote, an invoice, or an email chain. Starter
                includes 5 a month, Growth 15, Studio 40. They refresh
                monthly, and we confirm scope before any credit is spent.
              </p>
              <p className="mt-4 max-w-md leading-relaxed text-ash-300">
                Need something bigger than your balance? We&apos;ll say so
                up front and price it plainly.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <GlassPanel radius="lg" depth="mid" contentClassName="p-7">
                <CareTag>What credits buy</CareTag>
                <ul className="mt-5 space-y-4">
                  {CREDIT_EXAMPLES.map((e) => (
                    <li
                      key={e.thing}
                      className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-sm text-paper">{e.thing}</span>
                      <span
                        className="tnum shrink-0 font-mono text-xs uppercase tracking-[0.12em]"
                        style={{ color: "var(--gold)" }}
                      >
                        ✦ {e.cost}
                      </span>
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </Reveal>
          </div>
        </section>

        {/* Awards */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <Reveal>
            <CareTag>The Bandana Awards</CareTag>
            <h2 className="subhead mt-4">Ship all year. Take home the proof.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-ash-300">
              Bronze, silver, and gold — awarded to client orgs whose numbers
              earned it. A physical award, and one more receipt.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <AwardsShowcase />
          </Reveal>
        </section>

        {/* CTA */}
        <section className="px-6 pb-32">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <h2 className="subhead">Twenty minutes. No deck.</h2>
              <p className="mx-auto mt-4 max-w-md leading-relaxed text-ash-300">
                We look at what you&apos;re running and tell you honestly
                whether we can make it grow.
              </p>
              <Link href="/contact" className="btn btn-primary mt-7">
                Book an intro call
              </Link>
            </Reveal>
          </div>
        </section>

        <SiteFooter />
      </MatteSection>
    </>
  );
}
