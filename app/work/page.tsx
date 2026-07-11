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
            Every number on this site came from work we actually ran.
            We&apos;re early, so this list is short — and it stays honest.
            Client work appears here named, anonymized, or not at all.
          </p>

          <Reveal className="mt-12">
            <GlassPanel depth="mid" radius="lg" contentClassName="p-8">
              {/* [FILL: real work + real numbers. Label each card:
                  named / anonymized ("a robotics club in Texas") /
                  "Concept — not a client engagement"] */}
              <CareTag>Concept — not a client engagement</CareTag>
              <p className="mt-4 leading-relaxed text-paper">
                This slot is reserved for the first real engagement. Until a
                client agrees to be shown — by name or anonymized — nothing
                sits here pretending to be one. A fake case study dies at the
                first Google search, and so would we.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ash-300">
                Want to be the first card? The intro call is twenty minutes.
              </p>
              <Link href="/contact" className="btn btn-primary mt-6">
                Book an intro call
              </Link>
            </GlassPanel>
          </Reveal>
        </div>
        <SiteFooter />
      </MatteSection>
    </>
  );
}
