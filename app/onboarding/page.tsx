"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { MatteSection } from "@/components/glass/MatteSection";
import { CareTag } from "@/components/CareTag";
import { Logo } from "@/components/Logo";
import { isDemoMode, demoOrg } from "@/lib/demo";
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

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [orgType, setOrgType] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demo mode has a ready-made workspace — skip straight to it.
  useEffect(() => {
    if (isDemoMode) router.replace("/dashboard");
  }, [router]);
  if (isDemoMode) return null;

  const finish = async () => {
    setPending(true);
    setError(null);
    const supabase = createClient();

    const { data: org, error: orgError } = await supabase
      .from("organizations")
      .insert({
        name: name.trim(),
        slug: `${slugify(name)}-${Math.random().toString(36).slice(2, 6)}`,
        org_type: orgType,
      })
      .select("id")
      .single();

    if (orgError || !org) {
      setError("Couldn't create your organization. Try again.");
      setPending(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error: userError } = await supabase
      .from("users")
      .update({ org_id: org.id, role: "owner", onboarded: true })
      .eq("id", user?.id ?? "");

    if (userError) {
      setError("Your organization was created, but linking it failed. Try again.");
      setPending(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <MatteSection as="main" className="min-h-dvh">
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col justify-center px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <Logo />
          <CareTag>Step {step} of 2</CareTag>
        </div>

        <GlassPanel radius="lg" light contentClassName="p-9">
          {step === 1 ? (
            <>
              <h1 className="subhead">Who&apos;s joining the crew?</h1>
              <p className="mt-3 text-sm leading-relaxed text-ash-300">
                Tell us about your organization so your workspace fits from
                day one — something like &ldquo;{demoOrg.name}&rdquo;.
              </p>

              <label
                htmlFor="org-name"
                className="care-tag mt-8 block"
              >
                Organization name
              </label>
              <input
                id="org-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                className="mt-2 w-full rounded-[var(--r-sm)] border border-white/12 bg-ink-800/70 px-4 py-3 text-paper outline-none transition focus:border-clay-400"
              />

              <p className="care-tag mt-6">What kind of organization?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ORG_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setOrgType(t)}
                    className={`rounded-[var(--r-pill)] px-4 py-1.5 text-sm transition ${
                      orgType === t
                        ? "bg-clay-600 text-on-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
                        : "bg-white/5 text-ash-300 hover:bg-white/10 hover:text-paper"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!name.trim()}
                className="btn btn-primary mt-8 w-full disabled:opacity-50"
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <h1 className="subhead">Ready to set up your space</h1>
              <dl className="mt-6 space-y-4">
                <div>
                  <dt className="care-tag">Organization</dt>
                  <dd className="mt-1 text-lg text-white">{name}</dd>
                </div>
                <div>
                  <dt className="care-tag">Type</dt>
                  <dd className="mt-1 text-lg text-white">
                    {orgType ?? "We'll figure it out together"}
                  </dd>
                </div>
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-ash-300">
                Your command center starts empty and calm. Once we hold our
                intro call, the calendar and approvals start filling in.
              </p>

              {error && (
                <p
                  className="mt-5 rounded-[var(--r-sm)] px-4 py-3 text-sm"
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
                <button
                  onClick={() => setStep(1)}
                  className="btn btn-ghost flex-1"
                  disabled={pending}
                >
                  Back
                </button>
                <button
                  onClick={finish}
                  disabled={pending}
                  className="btn btn-primary flex-1 disabled:opacity-60"
                >
                  {pending ? "Setting up…" : "Set up my space"}
                </button>
              </div>
            </>
          )}
        </GlassPanel>
      </div>
    </MatteSection>
  );
}
