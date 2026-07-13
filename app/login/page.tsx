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

// Demo credentials — the app runs on sample data with no backend, so a
// fixed login stands in for real auth. Shown on the form in demo mode.
const DEMO_EMAIL = "founder@ridgelinerobotics.org";
const DEMO_PASSWORD = "bandana";

const inputClass =
  "mt-1.5 w-full rounded-[var(--r-sm)] border border-white/12 bg-ink-800/70 px-4 py-2.5 text-sm text-paper outline-none transition placeholder:text-smoke-400 focus:border-rust-400";

type Mode = "signin" | "signup";

function LoginCard() {
  const params = useSearchParams();
  const oauthError = params.get("error");

  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

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
    setInfo(null);

    if (!email.trim() || !password) {
      setError("Email and password are both required.");
      return;
    }
    if (mode === "signup" && password.length < 8) {
      setError("Use a password of at least 8 characters.");
      return;
    }

    setPending(true);

    // Demo mode: validate against the fixed demo login only.
    if (isDemoMode) {
      if (mode === "signup") {
        setInfo("Demo mode doesn't save accounts — sign in with the demo login below.");
        setMode("signin");
        setPending(false);
        return;
      }
      if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
        window.location.href = "/dashboard";
        return;
      }
      setError("That email and password don't match. Check the demo login below.");
      setPending(false);
      return;
    }

    const supabase = createClient();

    if (mode === "signin") {
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
      return;
    }

    // Sign up
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { full_name: name.trim() || null } },
    });
    if (signUpError) {
      setError(signUpError.message);
      setPending(false);
      return;
    }
    if (data.session && data.user) {
      // Email confirmation is off — session is live. Seed the profile row.
      await supabase.from("users").insert({
        id: data.user.id,
        email: email.trim(),
        full_name: name.trim() || null,
      });
      window.location.href = "/onboarding";
      return;
    }
    setInfo("Check your email to confirm your account, then sign in.");
    setMode("signin");
    setPending(false);
  };

  return (
    <GlassPanel radius="lg" light contentClassName="p-9">
      <Logo />
      <h1 className="subhead mt-8">
        {mode === "signin" ? "Client login" : "Create your login"}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ash-300">
        {mode === "signin"
          ? "Your command center: approvals, calendar, designs, and numbers — all in one place."
          : "Set up an email and password to reach your workspace."}
      </p>

      {oauthError && (
        <Banner tone="error">{ERROR_COPY[oauthError] ?? "Something went sideways. Try again."}</Banner>
      )}
      {error && <Banner tone="error">{error}</Banner>}
      {info && <Banner tone="ok">{info}</Banner>}

      <form onSubmit={submit} className="mt-6">
        {mode === "signup" && (
          <div className="mb-4">
            <label htmlFor="l-name" className="care-tag block">Name</label>
            <input
              id="l-name"
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
        )}
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
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
          />
        </div>

        <button type="submit" disabled={pending} className="btn btn-primary mt-6 w-full disabled:opacity-60">
          {pending
            ? "One moment…"
            : mode === "signin"
              ? "Sign in"
              : "Create account"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-ash-300">
        {mode === "signin" ? (
          <>
            New here?{" "}
            <button
              type="button"
              onClick={() => { setMode("signup"); setError(null); setInfo(null); }}
              className="text-rust-400 underline-offset-4 hover:text-rust-300 hover:underline"
            >
              Create a login
            </button>
          </>
        ) : (
          <>
            Already have one?{" "}
            <button
              type="button"
              onClick={() => { setMode("signin"); setError(null); setInfo(null); }}
              className="text-rust-400 underline-offset-4 hover:text-rust-300 hover:underline"
            >
              Sign in
            </button>
          </>
        )}
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
            Continue with Google
          </button>
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
      className="mt-5 rounded-[var(--r-sm)] px-4 py-3 text-sm"
      style={
        error
          ? {
              color: "var(--rust-200)",
              background: "rgba(142, 74, 51, 0.14)",
              boxShadow: "inset 0 0 0 1px rgba(142, 74, 51, 0.35)",
            }
          : {
              color: "var(--olive)",
              background: "color-mix(in srgb, var(--olive) 14%, transparent)",
              boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--olive) 35%, transparent)",
            }
      }
      role="alert"
    >
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
