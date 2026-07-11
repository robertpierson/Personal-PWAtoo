"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { calendarStatus, platformLabel } from "@/lib/status";
import { createClient } from "@/lib/supabase/client";
import type { CalendarItem } from "@/lib/db/types";

const THREAD: Record<string, string> = {
  action: "var(--clay-500)",
  done: "rgba(255,255,255,0.55)",
  idle: "var(--smoke-400)",
};

function threadColor(item: CalendarItem) {
  const cls = calendarStatus[item.status].cls;
  if (cls === "status-action") return THREAD.action;
  if (cls === "status-done") return THREAD.done;
  return THREAD.idle;
}

/** Approval state gates the drag: pending and shipped posts stay put. */
const MOVABLE: CalendarItem["status"][] = ["drafting", "approved", "scheduled"];

export function CalendarGrid({
  initialItems,
  demo,
}: {
  initialItems: CalendarItem[];
  demo: boolean;
}) {
  const [items, setItems] = useState(initialItems);
  const [dragId, setDragId] = useState<string | null>(null);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leading = (first.getDay() + 6) % 7; // Monday-first
  const cells = [
    ...Array.from({ length: leading }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const byDay = new Map<number, CalendarItem[]>();
  for (const item of items) {
    const d = new Date(item.scheduled_at);
    if (d.getFullYear() === year && d.getMonth() === month) {
      byDay.set(d.getDate(), [...(byDay.get(d.getDate()) ?? []), item]);
    }
  }

  const drop = async (day: number) => {
    if (!dragId) return;
    const item = items.find((i) => i.id === dragId);
    setDragId(null);
    if (!item) return;
    const when = new Date(item.scheduled_at);
    when.setFullYear(year, month, day);
    const iso = when.toISOString();
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, scheduled_at: iso } : i)),
    );
    if (!demo) {
      const supabase = createClient();
      await supabase
        .from("content_calendar")
        .update({ scheduled_at: iso })
        .eq("id", item.id);
    }
  };

  return (
    <GlassPanel radius="lg" depth="mid" contentClassName="p-4 sm:p-6">
      <div className="grid grid-cols-7 gap-1.5">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="care-tag pb-2 text-center">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          const today = day === now.getDate();
          const dayItems = day ? (byDay.get(day) ?? []) : [];
          return (
            <div
              key={i}
              onDragOver={day ? (e) => e.preventDefault() : undefined}
              onDrop={day ? () => drop(day) : undefined}
              className={`min-h-20 rounded-[var(--r-sm)] p-2 transition-colors ${
                day ? "bg-white/3" : ""
              } ${day && dragId ? "hover:bg-clay-600/20" : ""} ${
                today ? "shadow-[inset_0_0_0_1.5px_var(--clay-500)]" : ""
              }`}
            >
              {day && (
                <>
                  <span
                    className={`tnum text-xs ${
                      today ? "font-bold text-clay-400" : "text-ash-300"
                    }`}
                  >
                    {day}
                  </span>
                  <div className="mt-1.5 flex flex-col gap-1">
                    {dayItems.map((item) => {
                      const movable = MOVABLE.includes(item.status);
                      return (
                        <div
                          key={item.id}
                          draggable={movable}
                          onDragStart={() => setDragId(item.id)}
                          onDragEnd={() => setDragId(null)}
                          title={`${calendarStatus[item.status].label}: ${item.caption}${
                            movable
                              ? " — drag to reschedule"
                              : " — locked until reviewed"
                          }`}
                          className={
                            movable
                              ? "cursor-grab active:cursor-grabbing"
                              : "cursor-not-allowed opacity-90"
                          }
                        >
                          <span
                            className="block h-1 rounded-full"
                            style={{ background: threadColor(item) }}
                          />
                          <span className="care-tag mt-0.5 block truncate text-[0.55rem]!">
                            {platformLabel[item.platform]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-5 border-t border-white/10 pt-4">
        {[
          { color: THREAD.action, label: "Needs action / in progress" },
          { color: THREAD.done, label: "Approved / scheduled / shipped" },
          { color: THREAD.idle, label: "Drafting" },
        ].map((l) => (
          <span
            key={l.label}
            className="flex items-center gap-2 text-xs text-ash-300"
          >
            <span
              className="h-1 w-6 rounded-full"
              style={{ background: l.color }}
            />
            {l.label}
          </span>
        ))}
        <span className="text-xs text-ash-300">
          Drag a post to reschedule — posts awaiting your review stay locked.
        </span>
      </div>
    </GlassPanel>
  );
}
