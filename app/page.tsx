import { GlassPanel } from "@/components/glass/GlassPanel";
import { MatteSection } from "@/components/glass/MatteSection";
import { CareTag } from "@/components/CareTag";
import { Logo } from "@/components/Logo";
import { brand } from "@/brand.config";

/**
 * Phase 1 — system proof. This page exercises every primitive in
 * isolation (tokens, type, four-layer glass, matte weave, statuses,
 * buttons, care tags) and is replaced by the marketing hero in Phase 4.
 */
export default function Home() {
  return (
    <MatteSection as="main" className="min-h-dvh">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="flex items-center justify-between">
          <Logo />
          <CareTag>{brand.promise}</CareTag>
        </header>

        <div className="mt-24 max-w-3xl">
          <CareTag>Done-for-you online presence</CareTag>
          <h1 className="headline mt-5">
            Look the part.
            <br />
            Join the <span className="text-denim-400">crew</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash-300">
            Websites, socials, and reporting for local organizations — built
            and run by one crew, and reviewed by you before anything ships.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn btn-primary">
              Book an intro call
            </a>
            <a href="#login" className="btn btn-ghost">
              Client login
            </a>
          </div>
        </div>

        <div className="mt-28 grid gap-6 md:grid-cols-3">
          <GlassPanel depth="near" radius="lg" light contentClassName="p-7">
            <div className="flex items-center justify-between">
              <CareTag>Growth</CareTag>
              <span className="care-tag" style={{ color: "var(--selvedge)" }}>
                Most picked
              </span>
            </div>
            <p className="tnum mt-5 font-[var(--font-display)] text-5xl font-bold text-white">
              $59
              <span className="text-base font-medium text-ash-300"> /mo</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ash-300">
              Site kept current, three posts a week, and a monthly report your
              whole board can read.
            </p>
            <a href="#pricing" className="btn btn-primary mt-6 w-full">
              Pick Growth
            </a>
          </GlassPanel>

          <GlassPanel depth="mid" radius="lg" contentClassName="p-7">
            <CareTag>One status system</CareTag>
            <div className="mt-6 flex flex-col items-start gap-3">
              <span className="status-chip status-action">
                Awaiting approval
              </span>
              <span className="status-chip status-action">In review</span>
              <span className="status-chip status-done">Approved</span>
              <span className="status-chip status-done">Scheduled</span>
              <span className="status-chip status-idle">Drafting</span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-ash-300">
              Denim means it needs you. White means it&apos;s done. Faint means
              it&apos;s still on the bench.
            </p>
          </GlassPanel>

          <GlassPanel depth="far" radius="lg" contentClassName="p-7">
            <CareTag>This week</CareTag>
            <dl className="mt-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <dt className="text-sm text-ash-300">Reach</dt>
                <dd className="tnum text-2xl font-semibold text-white">
                  12,480
                </dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-sm text-ash-300">New followers</dt>
                <dd className="tnum text-2xl font-semibold text-white">+38</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-sm text-ash-300">Posts shipped</dt>
                <dd className="tnum text-2xl font-semibold text-white">3</dd>
              </div>
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-ash-300">
              Plain numbers, plain English. No dashboard homework.
            </p>
          </GlassPanel>
        </div>

        <footer className="mt-28 border-t border-white/10 pt-8 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <CareTag>100% organic strategy — wash cold, review often</CareTag>
            <CareTag>Bandana © 2026</CareTag>
          </div>
        </footer>
      </div>
    </MatteSection>
  );
}
