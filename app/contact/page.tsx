"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { MatteSection } from "@/components/glass/MatteSection";
import { CareTag } from "@/components/CareTag";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { isDemoMode } from "@/lib/demo";
import { createClient } from "@/lib/supabase/client";

const ORG_TYPES = [
  "Nonprofit",
  "PTA",
  "Youth league",
  "Community group",
  "Local business",
  "Startup",
  "Student community",
];

const PAIN_POINTS = [
  "Our website is out of date",
  "Nobody posts consistently",
  "We don't look credible to funders",
  "It all lives in one volunteer's head",
  "We're starting from zero",
];

const inputClass =
  "mt-2 w-full rounded-[var(--r-sm)] border border-white/12 bg-ink-800/70 px-4 py-3 text-paper outline-none transition placeholder:text-smoke-400 focus:border-clay-400";

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    org: "",
    orgType: "",
    website: "",
    pains: [] as string[],
    email: "",
    note: "",
  });

  const submit = async () => {
    setPending(true);
    setError(null);
    // Demo mode has no live backend — just show the thank-you screen.
    if (!isDemoMode) {
      const supabase = createClient();
      const { error: insertError } = await supabase.from("leads").insert({
        name: form.name.trim(),
        org: form.org.trim(),
        org_type: form.orgType || null,
        website: form.website.trim() || null,
        pains: form.pains,
        email: form.email.trim(),
        note: form.note.trim() || null,
      });
      if (insertError) {
        setError("Couldn't send that just now. Try once more?");
        setPending(false);
        return;
      }
    }
    setSent(true);
    setPending(false);
  };

  const set = (patch: Partial<typeof form>) =>
    setForm((f) => ({ ...f, ...patch }));

  const togglePain = (p: string) =>
    set({
      pains: form.pains.includes(p)
        ? form.pains.filter((x) => x !== p)
        : [...form.pains, p],
    });

  const canNext =
    step === 1
      ? form.name.trim() && form.org.trim()
      : step === 2
        ? true
        : /.+@.+\..+/.test(form.email);

  return (
    <>
      <SiteNav />
      <MatteSection as="main" className="min-h-dvh">
        <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center px-6 pb-24 pt-36">
          <div className="mb-6 flex items-center justify-between">
            <CareTag>Let&apos;s talk about your presence</CareTag>
            {!sent && <CareTag>Step {step} of 3</CareTag>}
          </div>

          {/* Step progress — stitched */}
          {!sent && (
            <div className="mb-6 flex gap-2" aria-hidden>
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className="h-1 flex-1 rounded-full transition-colors"
                  style={{
                    background:
                      s <= step ? "var(--clay-500)" : "rgba(255,255,255,0.1)",
                  }}
                />
              ))}
            </div>
          )}

          <GlassPanel radius="lg" light contentClassName="p-8 sm:p-10">
            {sent ? (
              <div className="text-center">
                <h1 className="subhead">Got it, {form.name.split(" ")[0]}.</h1>
                <p className="mt-4 leading-relaxed text-ash-300">
                  We&apos;ll read what you sent about {form.org} and come back
                  within two business days with honest first impressions —
                  no deck, no pressure.
                </p>
                {isDemoMode && (
                  <p className="care-tag mt-8">
                    Demo mode — this form isn&apos;t wired to a backend yet
                  </p>
                )}
              </div>
            ) : step === 1 ? (
              <>
                <h1 className="subhead">Who are we talking to?</h1>
                <label htmlFor="c-name" className="care-tag mt-8 block">
                  Your name
                </label>
                <input
                  id="c-name"
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => set({ name: e.target.value })}
                />
                <label htmlFor="c-org" className="care-tag mt-6 block">
                  Organization
                </label>
                <input
                  id="c-org"
                  className={inputClass}
                  value={form.org}
                  onChange={(e) => set({ org: e.target.value })}
                />
                <p className="care-tag mt-6">Type</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ORG_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set({ orgType: t })}
                      className={`rounded-[var(--r-pill)] px-4 py-1.5 text-sm transition ${
                        form.orgType === t
                          ? "bg-clay-600 text-white"
                          : "bg-white/5 text-ash-300 hover:bg-white/10 hover:text-paper"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </>
            ) : step === 2 ? (
              <>
                <h1 className="subhead">Where does it hurt?</h1>
                <label htmlFor="c-web" className="care-tag mt-8 block">
                  Current website (if there is one)
                </label>
                <input
                  id="c-web"
                  className={inputClass}
                  placeholder="https://"
                  value={form.website}
                  onChange={(e) => set({ website: e.target.value })}
                />
                <p className="care-tag mt-6">Pick anything that sounds familiar</p>
                <div className="mt-3 flex flex-col gap-2">
                  {PAIN_POINTS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePain(p)}
                      className={`rounded-[var(--r-sm)] px-4 py-3 text-left text-sm transition ${
                        form.pains.includes(p)
                          ? "bg-clay-600/40 text-white shadow-[inset_0_0_0_1px_var(--clay-500)]"
                          : "bg-white/4 text-ash-300 hover:bg-white/8 hover:text-paper"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h1 className="subhead">Where do we reply?</h1>
                <label htmlFor="c-email" className="care-tag mt-8 block">
                  Email
                </label>
                <input
                  id="c-email"
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => set({ email: e.target.value })}
                />
                <label htmlFor="c-note" className="care-tag mt-6 block">
                  Anything else worth knowing?
                </label>
                <textarea
                  id="c-note"
                  rows={4}
                  className={inputClass}
                  value={form.note}
                  onChange={(e) => set({ note: e.target.value })}
                />
              </>
            )}

            {!sent && (
              <>
                {error && (
                  <p
                    className="mt-6 rounded-[var(--r-sm)] px-4 py-3 text-sm"
                    style={{
                      color: "var(--cream-200)",
                      background: "rgba(142, 74, 51, 0.14)",
                      boxShadow: "inset 0 0 0 1px rgba(142, 74, 51, 0.35)",
                    }}
                    role="alert"
                  >
                    {error}
                  </p>
                )}
                <div className="mt-8 flex gap-3">
                  {step > 1 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      disabled={pending}
                      className="btn btn-ghost flex-1"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={() =>
                      step === 3 ? submit() : setStep(step + 1)
                    }
                    disabled={!canNext || pending}
                    className="btn btn-primary flex-1 disabled:opacity-50"
                  >
                    {step === 3
                      ? pending
                        ? "Sending…"
                        : "Send it"
                      : "Continue"}
                  </button>
                </div>
              </>
            )}
          </GlassPanel>
        </div>
        <SiteFooter />
      </MatteSection>
    </>
  );
}
