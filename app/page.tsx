import Link from "next/link";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { MatteSection } from "@/components/glass/MatteSection";
import { CareTag } from "@/components/CareTag";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { CrewTicker } from "@/components/marketing/CrewTicker";
import { ProblemSlabs } from "@/components/marketing/ProblemSlabs";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { PricingTiers } from "@/components/TierCard";
import { CASES } from "@/lib/cases";

const SYSTEM_SLABS = [
  {
    title: "Design & brand",
    body: "Logo, site, templates — one look that holds together everywhere your name shows up.",
  },
  {
    title: "Content & calendar",
    body: "Posts written, designed, and scheduled weeks ahead. You approve; we ship.",
  },
  {
    title: "Insights & reporting",
    body: "A monthly report in plain English. What worked, what didn't, what's next.",
  },
];

// Case studies live in lib/cases.ts, shared with /work.
// The four-step process lives on /how-it-works.

const FAQ = [
  {
    q: "We already have a Facebook page.",
    a: "Perfect — that's an asset, not a problem. We take what exists, make it consistent with everything else, and keep it alive. The difference isn't the page; it's the cadence.",
  },
  {
    q: "What if we don't like a post?",
    a: "It never goes out. Every post sits in your approval queue first — approve it or request changes with a note. Nothing publishes without your review. That's the whole promise.",
  },
  {
    q: "Who owns our accounts and content?",
    a: "You do, always. We work inside accounts you control, and everything we make — designs, photos, copy — is yours to keep, even if you leave.",
  },
  {
    q: "We're volunteers. How much time does this actually take?",
    a: "About ten minutes a week: open the queue, read a few posts, tap approve. We handle everything on either side of that.",
  },
  {
    q: "How is $59 a month realistic for real work?",
    a: "Because you're buying a system, not an agency retainer. We build your templates and calendar once, then run them efficiently across the month. Small orgs don't need custom everything — they need consistent, good-looking, true.",
  },
];

export default function Home() {
  return (
    <>
      <SiteNav />
      <MatteSection as="main" className="overflow-x-clip">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-36 sm:pt-44">
          <div className="mx-auto max-w-3xl text-center">
            <CareTag>Done-for-you online presence</CareTag>
            <h1 className="headline mt-5">
              Look the part.
              <br />
              Stay the <span className="text-clay-500">part</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ash-300">
              One crew runs your website, socials, and reporting — and
              nothing publishes without your review.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-primary">
                Book an intro call
              </Link>
              <Link href="/how-it-works" className="btn btn-ghost">
                How it works
              </Link>
            </div>
          </div>
        </section>

        <div className="pb-24">
          <CrewTicker />
        </div>

        {/* PROBLEM — three vendors who never spoke */}
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <CareTag>The usual setup</CareTag>
              <h2 className="subhead mt-4">
                Three vendors. Zero conversations.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ash-300">
                The website says one thing, the feed says another, and the
                newsletter says nothing at all. Not because anyone failed —
                because nobody was holding all three.
              </p>
            </Reveal>
            <ProblemSlabs />
          </div>
        </section>

        {/* ONE SYSTEM — three slabs, clay spines */}
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <Reveal>
            <CareTag>The Bandana way</CareTag>
            <h2 className="subhead mt-4">One system, holding together.</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SYSTEM_SLABS.map((slab, i) => (
              <Reveal key={slab.title} delay={i * 90}>
                <GlassPanel
                  depth="mid"
                  radius="lg"
                  contentClassName="p-7 h-full"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {slab.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ash-300">
                    {slab.body}
                  </p>
                </GlassPanel>
              </Reveal>
            ))}
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section className="mx-auto max-w-4xl px-6 pb-28">
          <Reveal>
            <div className="text-center">
              <CareTag>Drag it</CareTag>
              <h2 className="subhead mt-4">From dead link to game day.</h2>
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <BeforeAfterSlider />
          </Reveal>
        </section>

        {/* WORK */}
        <section id="work" className="scroll-mt-28 px-6 pb-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <CareTag>The work</CareTag>
              <h2 className="subhead mt-4">
                Good organizations, looking the part.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {CASES.map((w, i) => (
                <Reveal key={w.slug} delay={i * 90}>
                  <Link href={`/work/${w.slug}`} className="block h-full">
                    <GlassPanel
                      depth="mid"
                      radius="lg"
                      light
                      className="h-full transition-transform duration-200 hover:-translate-y-1"
                      contentClassName="flex h-full flex-col p-7"
                    >
                      <CareTag>{w.type}</CareTag>
                      <h3 className="mt-3 text-lg font-semibold text-white">
                        {w.org}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-ash-300">
                        {w.summary}
                      </p>
                      <div className="mt-6 border-t border-white/10 pt-4">
                        <span className="tnum text-3xl font-bold text-clay-400">
                          {w.stat}
                        </span>
                        <span className="care-tag ml-2">{w.statLabel}</span>
                      </div>
                    </GlassPanel>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="scroll-mt-28 px-6 pb-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="text-center">
                <CareTag>Pricing</CareTag>
                <h2 className="subhead mt-4">
                  Priced like a utility bill,
                  <br />
                  not an agency.
                </h2>
              </div>
            </Reveal>
            <div className="mt-12">
              <PricingTiers />
            </div>
          </div>
        </section>

        {/* PROOF */}
        <section className="px-6 pb-28">
          <div className="mx-auto grid max-w-5xl gap-10 text-center sm:grid-cols-3">
            {[
              { stat: "10 min", label: "of your week, tops — the rest is ours" },
              { stat: "100%", label: "of posts reviewed by you before shipping" },
              { stat: "1 report", label: "a month, written in plain English" },
            ].map((p, i) => (
              <Reveal key={p.stat} delay={i * 90}>
                <p className="tnum font-[var(--font-display)] text-5xl font-bold text-white">
                  {p.stat}
                </p>
                <p className="mx-auto mt-3 max-w-[26ch] text-sm leading-relaxed text-ash-300">
                  {p.label}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 pb-28">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="text-center">
                <CareTag>Fair questions</CareTag>
                <h2 className="subhead mt-4">
                  What the board will ask.
                </h2>
              </div>
            </Reveal>
            <div className="mt-10 space-y-4">
              {FAQ.map((item, i) => (
                <Reveal key={item.q} delay={i * 60}>
                  <GlassPanel depth="far" radius="md" contentClassName="p-0">
                    <details className="faq-item group p-6">
                      <summary className="text-base font-medium text-white">
                        {item.q}
                      </summary>
                      <p className="mt-4 text-sm leading-relaxed text-ash-300">
                        {item.a}
                      </p>
                    </details>
                  </GlassPanel>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="px-6 pb-32">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <GlassPanel
                radius="lg"
                light
                contentClassName="p-10 text-center sm:p-16"
              >
                <CareTag>Open enrollment, year round</CareTag>
                <h2 className="headline mt-5">
                  Join the <span className="text-clay-400">crew</span>.
                </h2>
                <p className="mx-auto mt-5 max-w-md leading-relaxed text-ash-300">
                  One intro call. No deck, no pressure. Just an honest look
                  at your presence and what it would take to look the part.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link href="/contact" className="btn btn-primary">
                    Book an intro call
                  </Link>
                  <Link href="/login" className="btn btn-ghost">
                    Client login
                  </Link>
                </div>
              </GlassPanel>
            </Reveal>
          </div>
        </section>

        <SiteFooter />
      </MatteSection>
    </>
  );
}
