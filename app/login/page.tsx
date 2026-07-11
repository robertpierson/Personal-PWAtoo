"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { MatteSection } from "@/components/glass/MatteSection";
import { Logo } from "@/components/Logo";
import { isDemoMode } from "@/lib/demo";
import { createClient } from "@/lib/supabase/client";
import { brand } from "@/brand.config";

const ERROR_COPY: Record<string, string> = {
  missing_code: "Google didn't finish signing you in. Give it another go.",
  exchange_failed: "That sign-in link expired. Try again from here.",
  no_session: "We couldn't start your session. Try again.",
};

function LoginCard() {
  const params = useSearchParams();
  const error = params.get("error");
  const [pending, setPending] = useState(false);

  const signIn = async () => {
    setPending(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  };

  return (
    <GlassPanel radius="lg" light contentClassName="p-9">
      <Logo />
      <h1 className="subhead mt-8">Client login</h1>
      <p className="mt-3 text-sm leading-relaxed text-ash-300">
        Your command center: approvals, calendar, designs, and numbers —
        all in one place.
      </p>

      {error && (
        <p
          className="mt-5 rounded-[var(--r-sm)] px-4 py-3 text-sm"
          style={{
            color: "var(--rust-200)",
            background: "rgba(142, 74, 51, 0.14)",
            boxShadow: "inset 0 0 0 1px rgba(142, 74, 51, 0.35)",
          }}
          role="alert"
        >
          {ERROR_COPY[error] ?? "Something went sideways. Try again."}
        </p>
      )}

      {isDemoMode ? (
        <>
          <Link href="/dashboard" className="btn btn-primary mt-7 w-full">
            Enter the demo workspace
          </Link>
          <p className="care-tag mt-4">Demo mode — Supabase not connected</p>
        </>
      ) : (
        <button
          onClick={signIn}
          disabled={pending}
          className="btn btn-primary mt-7 w-full disabled:opacity-60"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M21.35 11.1H12v3.9h5.4a4.6 4.6 0 0 1-2 3l3.2 2.5c1.9-1.75 3-4.3 3-7.35 0-.7-.08-1.4-.25-2.05Z" />
            <path d="M12 22a9.96 9.96 0 0 0 6.6-2.4l-3.2-2.5a6 6 0 0 1-9-3.15L3.1 16.5A10 10 0 0 0 12 22Z" />
            <path d="M6.4 13.95a6.03 6.03 0 0 1 0-3.9L3.1 7.5a10 10 0 0 0 0 9l3.3-2.55Z" />
            <path d="M12 6c1.47 0 2.8.5 3.84 1.5l2.86-2.86A9.96 9.96 0 0 0 12 2a10 10 0 0 0-8.9 5.5l3.3 2.55A6 6 0 0 1 12 6Z" />
          </svg>
          {pending ? "Opening Google…" : "Continue with Google"}
        </button>
      )}

      <p className="mt-6 text-xs leading-relaxed text-ash-300">
        {brand.promise}
      </p>
    </GlassPanel>
  );
}

export default function LoginPage() {
  return (
    <MatteSection as="main" className="min-h-dvh">
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-6 py-16">
        <Suspense fallback={null}>
          <LoginCard />
        </Suspense>
        <p className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-ash-300 underline-offset-4 hover:text-paper hover:underline"
          >
            Back to bandana.studio
          </Link>
        </p>
      </div>
    </MatteSection>
  );
}
