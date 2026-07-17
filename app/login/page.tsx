"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { MatteSection } from "@/components/glass/MatteSection";
import { Logo } from "@/components/Logo";
import { isDemoMode } from "@/lib/demo";
import { createClient } from "@/lib/supabase/client";
import { OWNER_EMAIL } from "@/lib/owner";
import { brand } from "@/brand.config";

const ERROR_COPY: Record<string, string> = {
  missing_code: "Google didn't finish signing you in. Give it another go.",
  exchange_failed: "That sign-in link expired. Try again from here.",
  no_session: "We couldn't start your session. Try again.",
};

// Demo credentials — the app runs on sample data with no backend, so a
// fixed login stands in for real auth. Shown on the form in demo mode.
const DEMO_EMAIL = "founder@ridgelinerobotics.org";
const DEMO_PASSWORD = "bandana";

const inputClass =
  "mt-1.5 w-full rounded-[var(--r-sm)] border border-white/12 bg-ink-800/70 px-4 py-2.5 text-sm text-paper outline-none transition placeholder:text-smoke-400 focus:border-rust-400";

function LoginCard() {
  const params = useSearchParams();
  const oauthError = params.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const googleSignIn = async () => {
    setPending(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Email and password are both required.");
      return;
    }

    setPending(true);

    // Demo mode: validate against the fixed demo login only.
    if (isDemoMode) {
      if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        window.location.href = "/dashboard";
        return;
      }
      setError("That email and password don't match. Check the demo login below.");
      setPending(false);
      return;
    }

    // Owner-only app: the form never even attempts other accounts.
    // Server side (middleware + callback + DB trigger) enforces the same rule.
    if (email.trim().toLowerCase() !== OWNER_EMAIL) {
      setError("Wrong email or password.");
      setPending(false);
      return;
    }

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (signInError) {
      setError("Wrong email or password.");
      setPending(false);
      return;
    }
    window.location.href = "/dashboard";
  };

  return (
    <GlassPanel radius="lg" light contentClassName="p-9">
      <Logo />
      <h1 className="subhead mt-8">Owner login</h1>
      <p className="mt-3 text-sm leading-relaxed text-ash-300">
        Your command center: approvals, calendar, designs, and numbers — all in
        one place.
      </p>

      {oauthError && (
        <Banner tone="error">{ERROR_COPY[oauthError] ?? "Something went sideways. Try again."}</Banner>
      )}
      {error && <Banner tone="error">{error}</Banner>}

      <form onSubmit={submit} className="mt-6">
        <div>
          <label htmlFor="l-email" className="care-tag block">Email</label>
          <input
            id="l-email"
            type="email"
            required
            className={inputClass}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="l-pass" className="care-tag block">Password</label>
          <input
            id="l-pass"
            type="password"
            required
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" disabled={pending} className="btn btn-primary mt-6 w-full disabled:opacity-60">
          {pending ? "One moment…" : "Sign in"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-ash-300">
        Private workspace — owner access only.{" "}
        <Link
          href="/pricing"
          className="text-rust-400 underline-offset-4 hover:text-rust-300 hover:underline"
        >
          Want in? See pricing
        </Link>
      </p>

      {isDemoMode ? (
        <div className="mt-6 border-t border-white/8 pt-5">
          <p className="care-tag">Demo login</p>
          <p className="mt-2 text-xs leading-relaxed text-ash-300">
            Supabase isn&apos;t connected — sign in with{" "}
            <span className="text-paper">{DEMO_EMAIL}</span> /{" "}
            <span className="text-paper">{DEMO_PASSWORD}</span>.
          </p>
        </div>
      ) : (
        <>
          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="care-tag">or</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <button
            onClick={googleSignIn}
            disabled={pending}
            className="btn btn-ghost w-full disabled:opacity-60"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M21.35 11.1H12v3.9h5.4a4.6 4.6 0 0 1-2 3l3.2 2.5c1.9-1.75 3-4.3 3-7.35 0-.7-.08-1.4-.25-2.05Z" />
              <path d="M12 22a9.96 9.96 0 0 0 6.6-2.4l-3.2-2.5a6 6 0 0 1-9-3.15L3.1 16.5A10 10 0 0 0 12 22Z" />
              <path d="M6.4 13.95a6.03 6.03 0 0 1 0-3.9L3.1 7.5a10 10 0 0 0 0 9l3.3-2.55Z" />
              <path d="M12 6c1.47 0 2.8.5 3.84 1.5l2.86-2.86A9.96 9.96 0 0 0 12 2a10 10 0 0 0-8.9 5.5l3.3 2.55A6 6 0 0 1 12 6Z" />
            </svg>
            Sign in as owner with Google
          </button>
          <p className="mt-3 text-center text-xs leading-relaxed text-ash-300">
            Any other Google account is sent to pricing.
          </p>
        </>
      )}

      <p className="mt-6 text-xs leading-relaxed text-ash-300">{brand.promise}</p>
    </GlassPanel>
  );
}

function Banner({ tone, children }: { tone: "error" | "ok"; children: React.ReactNode }) {
  const error = tone === "error";
  return (
    <p
      className="mt-5 flex items-center gap-2 rounded-[var(--r-sm)] px-4 py-3 text-sm font-medium"
      style={
        error
          ? {
              color: "var(--white)",
              background: "color-mix(in srgb, var(--rust-500) 26%, transparent)",
              boxShadow: "inset 0 0 0 1.5px var(--rust-500)",
            }
          : {
              color: "var(--white)",
              background: "color-mix(in srgb, var(--olive) 24%, transparent)",
              boxShadow: "inset 0 0 0 1.5px var(--olive)",
            }
      }
      role="alert"
    >
      <span aria-hidden style={{ color: error ? "var(--rust-500)" : "var(--olive)" }}>
        {error ? "⚠" : "✓"}
      </span>
      {children}
    </p>
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
