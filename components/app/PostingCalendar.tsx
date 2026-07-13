"use client";

import { useState } from "react";
import { postingYear, type PostDay } from "@/lib/placeholder-insights";

// GitHub-style yearly posting calendar. Hover a day to see how many posts
// shipped, which ones, and a link to each on the live site. Placeholder
// data for now — same shape real posting history will fill in.

const LEVEL_BG = [
  "color-mix(in srgb, var(--white) 5%, transparent)",
  "color-mix(in srgb, var(--rust-400) 28%, transparent)",
  "color-mix(in srgb, var(--rust-400) 62%, transparent)",
  "var(--rust-400)",
];

const level = (count: number) => (count <= 0 ? 0 : count === 1 ? 2 : 3);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function PostingCalendar() {
  const days = postingYear();
  const weeks: PostDay[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const [hover, setHover] = useState<{ day: PostDay; left: number; top: number } | null>(null);
  const total = days.reduce((a, d) => a + d.count, 0);
  const activeDays = days.filter((d) => d.count > 0).length;

  // Month labels: mark the week where a new month first appears.
  const monthCols = weeks.map((w, i) => {
    const first = w[0];
    if (!first) return null;
    const m = new Date(first.t).getMonth();
    const prev = i > 0 ? new Date(weeks[i - 1][0].t).getMonth() : -1;
    return m !== prev ? MONTHS[m] : null;
  });

  return (
    <div className="relative">
      <div className="mb-2 flex items-center justify-between">
        <span className="tnum text-sm text-paper">
          {total} posts shipped this year
        </span>
        <span className="care-tag">{activeDays} active days</span>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="min-w-[640px]">
          {/* Month row */}
          <div className="ml-7 flex gap-[3px]">
            {monthCols.map((m, i) => (
              <div key={i} className="w-[13px] shrink-0 text-[0.6rem] text-ash-300">
                {m ?? ""}
              </div>
            ))}
          </div>

          <div className="mt-1 flex gap-[3px]">
            {/* Weekday labels */}
            <div className="mr-1 flex flex-col gap-[3px] text-[0.6rem] text-ash-300">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                <span key={i} className="flex h-[13px] items-center">{d}</span>
              ))}
            </div>

            {/* Week columns */}
            {weeks.map((w, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {w.map((d) => (
                  <button
                    key={d.t}
                    type="button"
                    aria-label={`${d.count} posts on ${new Date(d.t).toLocaleDateString("en-US")}`}
                    onMouseEnter={(e) => {
                      const cell = e.currentTarget.getBoundingClientRect();
                      const box = e.currentTarget.closest(".relative")!.getBoundingClientRect();
                      setHover({ day: d, left: cell.left - box.left + 16, top: cell.top - box.top });
                    }}
                    onMouseLeave={() => setHover(null)}
                    onFocus={(e) => {
                      const cell = e.currentTarget.getBoundingClientRect();
                      const box = e.currentTarget.closest(".relative")!.getBoundingClientRect();
                      setHover({ day: d, left: cell.left - box.left + 16, top: cell.top - box.top });
                    }}
                    onBlur={() => setHover(null)}
                    className="h-[13px] w-[13px] shrink-0 rounded-[3px] transition-transform hover:scale-125"
                    style={{ background: LEVEL_BG[level(d.count)], boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--white) 6%, transparent)" }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="ml-7 mt-2 flex items-center gap-1.5 text-[0.6rem] text-ash-300">
            <span>Less</span>
            {LEVEL_BG.map((bg, i) => (
              <span key={i} className="h-[11px] w-[11px] rounded-[3px]" style={{ background: bg }} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Hover tooltip */}
      {hover && (
        <div
          className="pointer-events-auto absolute z-30 w-60 rounded-[var(--r-sm)] p-3 text-sm"
          style={{
            left: Math.min(hover.left, 480),
            top: hover.top + 20,
            background: "var(--ink-700)",
            boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--white) 12%, transparent), 0 18px 36px -18px var(--glass-shadow)",
          }}
          onMouseEnter={() => setHover(hover)}
          onMouseLeave={() => setHover(null)}
        >
          <p className="tnum care-tag">
            {new Date(hover.day.t).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </p>
          {hover.day.count === 0 ? (
            <p className="mt-1.5 text-ash-300">No posts this day.</p>
          ) : (
            <>
              <p className="mt-1.5 font-semibold text-white">
                {hover.day.count} post{hover.day.count === 1 ? "" : "s"} shipped
              </p>
              <ul className="mt-2 space-y-1.5">
                {hover.day.posts.map((p, i) => (
                  <li key={i}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-1.5 text-rust-300 underline-offset-2 hover:text-rust-200 hover:underline"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--rust-400)" }} />
                      <span className="leading-snug">{p.title} ↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
