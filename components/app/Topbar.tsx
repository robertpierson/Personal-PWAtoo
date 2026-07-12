"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * App top bar: build-credit balance + notification bell.
 * Credits are granted monthly by plan and spent on design/build
 * requests; the bell is wired for future events.
 */
export function Topbar({ credits }: { credits: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="mb-6 flex items-center justify-end gap-3">
      <Link
        href="/dashboard/invoices"
        className="tnum flex items-center gap-2 rounded-[var(--r-pill)] px-4 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper transition hover:text-white"
        style={{
          background: "color-mix(in srgb, var(--gold) 14%, transparent)",
          boxShadow:
            "inset 0 0 0 1px color-mix(in srgb, var(--gold) 45%, transparent)",
        }}
        title="Build credits — spent on design and build requests"
      >
        <span aria-hidden style={{ color: "var(--gold)" }}>
          ✦
        </span>
        {credits} credits
      </Link>

      <div ref={ref} className="relative">
        <button
          aria-label="Notifications"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-full text-ash-300 transition hover:text-white"
          style={{
            background: "color-mix(in srgb, var(--white) 5%, transparent)",
            boxShadow:
              "inset 0 0 0 1px color-mix(in srgb, var(--white) 12%, transparent)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M10 19a2 2 0 0 0 4 0"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {open && (
          <div
            className="absolute right-0 top-11 z-20 w-64 rounded-[var(--r-md)] p-5 text-sm text-ash-300"
            style={{
              background: "var(--ink-700)",
              boxShadow:
                "inset 0 0 0 1px color-mix(in srgb, var(--white) 10%, transparent), 0 18px 36px -18px var(--glass-shadow)",
            }}
          >
            <p className="care-tag">Notifications</p>
            <p className="mt-3">You&apos;re all caught up.</p>
          </div>
        )}
      </div>
    </div>
  );
}
