import Link from "next/link";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { MatteSection } from "@/components/glass/MatteSection";
import { CareTag } from "@/components/CareTag";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { CASES } from "@/lib/cases";

export const metadata = {
  title: "Bandana — Work",
  description:
    "Good organizations, looking the part. Case studies from the crew.",
};

export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <MatteSection as="main" className="min-h-dvh">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-36 sm:pt-44">
          <CareTag>The work</CareTag>
          <h1 className="headline mt-4">
            Good organizations,
            <br />
            looking the <span className="text-denim-400">part</span>.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ash-300">
            Real orgs, real seasons, real numbers. Every one reviewed and
            approved by the people whose name is on it.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {CASES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 90}>
                <Link href={`/work/${c.slug}`} className="block h-full">
                  <GlassPanel
                    depth="mid"
                    radius="lg"
                    light
                    className="h-full transition-transform duration-200 hover:-translate-y-1"
                    contentClassName="flex h-full flex-col p-7"
                  >
                    <CareTag>{c.type}</CareTag>
                    <h2 className="mt-3 text-lg font-semibold text-white">
                      {c.org}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ash-300">
                      {c.summary}
                    </p>
                    <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-4">
                      <div>
                        <span className="tnum text-3xl font-bold text-denim-400">
                          {c.stat}
                        </span>
                        <span className="care-tag ml-2">{c.statLabel}</span>
                      </div>
                      <span className="text-sm text-chambray-300">
                        Read it →
                      </span>
                    </div>
                  </GlassPanel>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
        <SiteFooter />
      </MatteSection>
    </>
  );
}
