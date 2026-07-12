import type { Metadata } from "next";
import Link from "next/link";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { MatteSection } from "@/components/glass/MatteSection";
import { CareTag } from "@/components/CareTag";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export const metadata: Metadata = {
  title: "Work — Bandana",
  description:
    "Real orgs, real numbers. Every number on this site came from work we actually ran.",
};

export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <MatteSection as="main" className="min-h-dvh">
        <div className="mx-auto max-w-4xl px-6 pb-24 pt-36 sm:pt-44">
          <CareTag>The work</CareTag>
          <h1 className="headline mt-4">
            Real orgs.
            <br />
            Real <span className="text-rust-500">numbers</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash-300">
            Three organizations we&apos;re running right now. Every number
            comes from work that actually shipped — each write-up publishes
            once the client signs off on sharing it, named or anonymized.
          </p>

          {/* [FILL: per card — org name (or honest anonymization),
              one-line summary, one real stat + label] */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n, i) => (
              <Reveal key={n} delay={i * 90}>
                <GlassPanel
                  depth="mid"
                  radius="lg"
                  contentClassName="flex h-full flex-col p-7"
                >
                  <CareTag>Current engagement</CareTag>
                  <h2 className="mt-3 text-lg font-semibold text-white">
                    Client {n} — write-up in progress
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ash-300">
                    Site, socials, and reporting in motion. Numbers publish
                    with the first signed-off report.
                  </p>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <span className="tnum text-3xl font-bold text-ash-300">
                      —
                    </span>
                    <span className="care-tag ml-2">first report pending</span>
                  </div>
                </GlassPanel>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <p className="text-sm leading-relaxed text-ash-300">
              Want the fourth slot? The intro call is twenty minutes.{" "}
              <Link
                href="/contact"
                className="text-rust-400 hover:text-rust-300"
              >
                Book it →
              </Link>
            </p>
          </Reveal>
        </div>
        <SiteFooter />
      </MatteSection>
    </>
  );
}
