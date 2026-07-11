"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Functional light/dark switch. Sets data-theme on <html> and persists
 * to localStorage ("bandana-theme"); the layout boot script re-applies
 * it before paint on the next load. Light is the default.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  // Read the applied theme after mount (boot script may have set dark).
  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === "dark" ? "dark" : "light",
    );
  }, []);

  const apply = (t: Theme) => {
    setTheme(t);
    if (t === "dark") {
      document.documentElement.dataset.theme = "dark";
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem("bandana-theme", t);
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex w-fit rounded-[var(--r-pill)] border border-white/15 p-1"
    >
      {(["light", "dark"] as const).map((t) => (
        <button
          key={t}
          role="radio"
          aria-checked={theme === t}
          onClick={() => apply(t)}
          className={`rounded-[var(--r-pill)] px-4 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition ${
            theme === t
              ? "bg-rust-500 text-on-dark"
              : "text-ash-300 hover:text-white"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
