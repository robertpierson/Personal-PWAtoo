import Link from "next/link";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { MatteSection } from "@/components/glass/MatteSection";
import { CareTag } from "@/components/CareTag";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { CrewTicker } from "@/components/marketing/CrewTicker";
import { ProblemSlabs } from "@/components/marketing/ProblemSlabs";
import { Receipt } from "@/components/marketing/Receipt";
import { PricingTiers } from "@/components/TierCard";

const SYSTEM_SLABS = [
  {
    title: "Design & brand",
    body: "One look everywhere your org shows up — site, socials, flyers, the works.",
  },
  {
    title: "Content & calendar",
    body: "Written, designed, scheduled. You approve, we ship — nothing publishes without your review.",
  },
  {
    title: "The report",
    body: "Real numbers, plain English, and the line you can put on a résumé.",
  },
];

const OBJECTIONS = [
  {
    q: "“Isn’t this just buying a résumé line?”",
    a: "No — and it wouldn’t work if it were. We don’t invent anything. The org is yours, the work is real, the numbers come from things that actually happened. We execute at a level that’s hard to hit with eighteen credit hours. Ask us to fake a number and we’ll say no, because it falls apart the first time someone asks a follow-up — and someone will.",
  },
  {
    q: "“What do I put on my résumé?”",
    a: "Whatever the numbers support and nothing more.",
  },
  {
    q: "“I’m starting from zero.”",
    a: "Easiest case. Faster than fixing someone else’s mess.",
  },
  {
    q: "“What if I don’t like a post?”",
    a: "It never goes out. Approval queue first.",
  },
  {
    q: "“Who owns it?”",
    a: "You do. Always. Even if you leave.",
  },
  {
    q: "“I graduate in five months.”",
    a: "That’s a semester of shipped work and five reports.",
  },
  {
    q: "“How is $59 realistic?”",
    a: "You’re buying a system, not a retainer. Templates and calendar built once, run across the month.",
  },
];

export default function Home() {
  return (
    <>
      <SiteNav />
      <MatteSection as="main" className="overflow-x-clip">
        {/* HERO — asymmetric, left-set */}
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-36 sm:pt-44">
          <div className="max-w-3xl">
            <CareTag>For students who run things</CareTag>
            <h1 className="headline mt-5">
              Run something real.
              <br />
              Keep the <span className="text-rust-500">receipts</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash-300">
              We run the site, the socials, and the reporting for your club,
              org, or startup — so it actually grows, and so you finish the
              semester with numbers you can put on a résumé and defend in an
              interview.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-primary">
                Book an intro call
              </Link>
              <Link href="/how-it-works" className="btn btn-ghost">
                See what you get
              </Link>
            </div>
          </div>

        </section>

        <div className="pb-24">
          <CrewTicker />
        </div>

        {/* THE RECEIPT — the one loud thing */}
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <CareTag>The product</CareTag>
              <h2 className="subhead mt-4">
                A résumé line you can actually defend.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ash-300">
                Anyone can write &ldquo;Founder, Campus Org.&rdquo; Almost
                nobody can answer the follow-up question. The monthly report
                is the product: what ran, what grew, and how it reads on
                paper.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <Receipt />
            </Reveal>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <CareTag>The usual setup</CareTag>
              <h2 className="subhead mt-4">
                You did the work. Nobody can tell.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ash-300">
                The org is real. The hours are real. But what exists online
                wouldn&apos;t convince a recruiter — or your own members —
                that anything happened.
              </p>
            </Reveal>
            <ProblemSlabs />
          </div>
        </section>

        {/* THE SYSTEM */}
        <section className="mx-auto max-w-6xl px-6 pb-28">
          <Reveal>
            <CareTag>The Bandana way</CareTag>
            <h2 className="subhead mt-4">One crew. Your name on it.</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SYSTEM_SLABS.map((slab, i) => (
              <Reveal key={slab.title} delay={i * 90}>
                <GlassPanel depth="mid" radius="lg" contentClassName="p-7 h-full">
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

        {/* THE WORK — honest, no invented clients */}
        <section id="work" className="scroll-mt-28 px-6 pb-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <CareTag>The work</CareTag>
              <h2 className="subhead mt-4">Real orgs. Real numbers.</h2>
              <p className="mt-5 max-w-md leading-relaxed text-ash-300">
                Every number on this site came from work we actually ran.
                We&apos;re early — so right now that list is short, and we
                won&apos;t pad it.
              </p>
            </Reveal>
            <Reveal delay={100} className="mt-10">
              <GlassPanel depth="far" radius="lg" contentClassName="p-8">
                {/* [FILL: real work + real numbers — named, anonymized
                    ("a robotics club in Texas"), or omit entirely] */}
                <CareTag>Concept — not a client engagement</CareTag>
                <p className="mt-4 max-w-2xl leading-relaxed text-paper">
                  This is where client work goes, labeled honestly: a name if
                  they agree, &ldquo;a robotics club in Texas&rdquo; if they
                  don&apos;t. Until then, this card stays a placeholder —
                  because a fake case study dies at the first Google search.
                </p>
              </GlassPanel>
            </Reveal>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="scroll-mt-28 px-6 pb-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="text-center">
                <CareTag>Pricing</CareTag>
                <h2 className="subhead mt-4">
                  Costs less than your textbooks.
                </h2>
              </div>
            </Reveal>
            <div className="mt-12">
              <PricingTiers />
            </div>
          </div>
        </section>

        {/* OBJECTIONS */}
        <section className="px-6 pb-28">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="text-center">
                <CareTag>Straight answers</CareTag>
                <h2 className="subhead mt-4">
                  What you&apos;re actually wondering.
                </h2>
              </div>
            </Reveal>
            <div className="mt-10 space-y-4">
              {OBJECTIONS.map((item, i) => (
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

        {/* CLOSING CTA */}
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
                  Join the <span className="text-rust-500">crew</span>.
                </h2>
                <p className="mx-auto mt-5 max-w-md leading-relaxed text-ash-300">
                  One call, twenty minutes. No deck. We look at what
                  you&apos;re running and tell you honestly whether we can
                  make it grow.
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
