"use client";

import { useState } from "react";

/**
 * The Receipt — sample monthly report as a printed receipt, with a
 * second state showing how the same numbers read on a résumé and a
 * LinkedIn headline. Labeled SAMPLE so it is never mistaken for a
 * client claim. Olive = positive delta, gold = résumé-line emphasis.
 */

const LINE_ITEMS: { label: string; value: string; delta?: string }[] = [
  { label: "Posts shipped", value: "14" },
  { label: "Reach", value: "18,240", delta: "+46%" },
  { label: "Followers", value: "1,032", delta: "+312" },
  { label: "Event sign-ups", value: "87" },
  { label: "Sponsor outreach", value: "12 sent / 3 replies" },
  { label: "Site traffic", value: "1,904 visits" },
];

const MODES = ["What we ran", "How it reads"] as const;

export function Receipt() {
  const [mode, setMode] = useState<0 | 1>(0);

  return (
    <div className="mx-auto w-full max-w-md">
      {/* toggle */}
      <div
        role="tablist"
        aria-label="Receipt view"
        className="mx-auto mb-6 flex w-fit rounded-[var(--r-pill)] border border-smoke-400/60 p-1"
      >
        {MODES.map((m, i) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === i}
            onClick={() => setMode(i as 0 | 1)}
            className={`rounded-[var(--r-pill)] px-4 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition ${
              mode === i
                ? "bg-rust-500 text-on-dark"
                : "text-ash-300 hover:text-white"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* the receipt itself; key remount re-runs the print animation */}
      <div key={mode} className="receipt px-7 pb-9 pt-7 text-sm">
        <div className="receipt-line" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-center text-xs uppercase tracking-[0.22em]">
            Bandana · Monthly Report
          </p>
          <p className="mt-1 text-center text-[0.6875rem] uppercase tracking-[0.18em] opacity-60">
            — Sample report · not a client claim —
          </p>
        </div>

        <hr className="receipt-rule my-5" />

        {mode === 0 ? (
          <ul className="space-y-3">
            {LINE_ITEMS.map((item, i) => (
              <li
                key={item.label}
                className="receipt-line flex items-baseline justify-between gap-3"
                style={{ "--i": i + 1 } as React.CSSProperties}
              >
                <span className="uppercase tracking-[0.08em] text-[0.75rem]">
                  {item.label}
                </span>
                <span className="tnum whitespace-nowrap font-semibold">
                  {item.value}
                  {item.delta && (
                    <span className="ml-2" style={{ color: "var(--olive)" }}>
                      {item.delta}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-y-5">
            <div
              className="receipt-line"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              <p className="text-[0.6875rem] uppercase tracking-[0.18em] opacity-60">
                Résumé bullet
              </p>
              <p className="mt-2 leading-relaxed">
                Grew org reach{" "}
                <strong style={{ color: "var(--gold)" }}>46%</strong> in one
                month (
                <strong style={{ color: "var(--gold)" }}>18.2K reach</strong>,{" "}
                <strong style={{ color: "var(--gold)" }}>
                  +312 followers
                </strong>
                ) while running a 14-post/month content operation across
                three channels.
              </p>
            </div>
            <hr className="receipt-rule" />
            <div
              className="receipt-line"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              <p className="text-[0.6875rem] uppercase tracking-[0.18em] opacity-60">
                LinkedIn headline
              </p>
              <p className="mt-2 leading-relaxed">
                Founder, [Your Org] — grew monthly reach to{" "}
                <strong style={{ color: "var(--gold)" }}>18K/month</strong>
              </p>
            </div>
          </div>
        )}

        <hr className="receipt-rule my-5" />

        <p
          className="receipt-line text-center text-[0.6875rem] uppercase tracking-[0.18em] opacity-60"
          style={{ "--i": 8 } as React.CSSProperties}
        >
          Every number from work that actually ran
        </p>
      </div>
    </div>
  );
}
