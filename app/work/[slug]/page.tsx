import Link from "next/link";
import { notFound } from "next/navigation";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { MatteSection } from "@/components/glass/MatteSection";
import { CareTag } from "@/components/CareTag";
import { Reveal } from "@/components/Reveal";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { CASES } from "@/lib/cases";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = CASES.find((x) => x.slug === slug);
  return { title: c ? `Bandana — ${c.org}` : "Bandana — Work" };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = CASES.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <>
      <SiteNav />
      <MatteSection as="main" className="min-h-dvh">
        <article className="mx-auto max-w-3xl px-6 pb-24 pt-36 sm:pt-44">
          <Link
            href="/work"
            className="text-sm text-ash-300 hover:text-paper"
          >
            ← All work
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CareTag>{c.type}</CareTag>
            <span className="status-chip status-done">{c.tier} plan</span>
          </div>
          <h1 className="headline mt-4">{c.org}</h1>

          <Reveal className="mt-12">
            <GlassPanel radius="lg" depth="mid" contentClassName="p-8">
              <CareTag>Where they started</CareTag>
              <p className="mt-3 leading-relaxed text-paper">{c.challenge}</p>
            </GlassPanel>
          </Reveal>

          <Reveal className="mt-6">
            <GlassPanel radius="lg" depth="mid" contentClassName="p-8">
              <CareTag>What we did</CareTag>
              <ul className="mt-3 space-y-3">
                {c.approach.map((a) => (
                  <li key={a} className="flex gap-3 text-sm leading-relaxed text-paper">
                    <span aria-hidden className="mt-0.5" style={{ color: "var(--topstitch)" }}>
                      ✕
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </Reveal>

          <Reveal className="mt-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {c.results.map((r) => (
                <GlassPanel key={r.label} depth="near" radius="md" light contentClassName="p-6 text-center">
                  <p className="tnum text-4xl font-bold text-denim-400">
                    {r.stat}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ash-300">
                    {r.label}
                  </p>
                </GlassPanel>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-6">
            <GlassPanel radius="lg" depth="far" contentClassName="p-8">
              <blockquote className="text-lg leading-relaxed text-white">
                &ldquo;{c.quote.text}&rdquo;
              </blockquote>
              <p className="care-tag mt-4">
                {c.quote.name} — {c.quote.role}
              </p>
            </GlassPanel>
          </Reveal>

          <Reveal className="mt-12">
            <div className="text-center">
              <p className="text-ash-300">
                Your org could read like this next season.
              </p>
              <Link href="/contact" className="btn btn-primary mt-5">
                Book an intro call
              </Link>
            </div>
          </Reveal>
        </article>
        <SiteFooter />
      </MatteSection>
    </>
  );
}
