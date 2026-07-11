import type { Metadata } from "next";
import Link from "next/link";
import { MatteSection } from "@/components/glass/MatteSection";
import { CareTag } from "@/components/CareTag";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { StitchedTimeline } from "@/components/StitchedTimeline";

export const metadata: Metadata = {
  title: "How it works — Bandana",
  description:
    "Four steps, no mystery: intro call, presence audit, build & calendar, run & report.",
};

const TIMELINE = [
  {
    title: "Intro call",
    body: "Twenty minutes. You talk, we listen. No deck, no pressure — just where your presence stands and where it hurts.",
  },
  {
    title: "Presence audit",
    body: "We read everything the internet says about you and hand you the same scorecard a funder or new family would build in their head.",
  },
  {
    title: "Build & calendar",
    body: "Site refreshed, brand tightened, and your first month of content drafted and loaded into your approval queue.",
  },
  {
    title: "Run & report",
    body: "We post, you approve, everyone sees the numbers. One report a month, written for humans.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <SiteNav />
      <MatteSection as="main" className="min-h-dvh overflow-x-clip">
        <section className="mx-auto max-w-6xl px-6 pb-28 pt-36 sm:pt-44">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <CareTag>How we work</CareTag>
              <h1 className="headline mt-4">
                Four steps.
                <br />
                No mystery.
              </h1>
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
        <SiteFooter />
      </MatteSection>
    </>
  );
}
