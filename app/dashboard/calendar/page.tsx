import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";
import { getCalendar } from "@/lib/data";
import { calendarStatus, platformLabel } from "@/lib/status";
import type { CalendarItem } from "@/lib/db/types";

// ponytail: read-only month grid; drag-reschedule (gated by approval
// state) comes when the write path is wired to real data.

const THREAD: Record<string, string> = {
  action: "var(--denim-500)",
  done: "rgba(255,255,255,0.55)",
  idle: "var(--smoke-400)",
};

function threadColor(item: CalendarItem) {
  const cls = calendarStatus[item.status].cls;
  if (cls === "status-action") return THREAD.action;
  if (cls === "status-done") return THREAD.done;
  return THREAD.idle;
}

export default async function CalendarPage() {
  const items = await getCalendar();
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

  const monthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(now);

  return (
    <div className="mx-auto max-w-5xl">
      <CareTag>Calendar</CareTag>
      <h1 className="subhead mt-2">{monthName}</h1>

      <GlassPanel radius="lg" depth="mid" className="mt-8" contentClassName="p-4 sm:p-6">
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
                className={`min-h-20 rounded-[var(--r-sm)] p-2 ${
                  day ? "bg-white/3" : ""
                } ${today ? "shadow-[inset_0_0_0_1.5px_var(--denim-500)]" : ""}`}
              >
                {day && (
                  <>
                    <span
                      className={`tnum text-xs ${
                        today ? "font-bold text-denim-400" : "text-ash-300"
                      }`}
                    >
                      {day}
                    </span>
                    <div className="mt-1.5 flex flex-col gap-1">
                      {dayItems.map((item) => (
                        <div
                          key={item.id}
                          title={`${calendarStatus[item.status].label}: ${item.caption}`}
                        >
                          <span
                            className="block h-1 rounded-full"
                            style={{ background: threadColor(item) }}
                          />
                          <span className="care-tag mt-0.5 block truncate !text-[0.55rem]">
                            {platformLabel[item.platform]}
                          </span>
                        </div>
                      ))}
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
            <span key={l.label} className="flex items-center gap-2 text-xs text-ash-300">
              <span
                className="h-1 w-6 rounded-full"
                style={{ background: l.color }}
              />
              {l.label}
            </span>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
}
