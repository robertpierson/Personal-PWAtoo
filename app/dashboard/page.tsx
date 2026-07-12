import Link from "next/link";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";
import { ApprovalCard } from "@/components/app/ApprovalCard";
import { EmptySlot } from "@/components/app/EmptySlot";
import { getCalendar, getInsights, getOpenApprovals } from "@/lib/data";
import { calendarStatus, formatSlot, platformLabel } from "@/lib/status";

/** This week — the command center. What needs you comes first. */
export default async function ThisWeekPage() {
  const [approvals, calendar, insights] = await Promise.all([
    getOpenApprovals(),
    getCalendar(),
    getInsights(),
  ]);

  const now = Date.now();
  const weekAhead = now + 7 * 86_400_000;
  const scheduled = calendar.filter((c) => {
    const t = new Date(c.scheduled_at).getTime();
    return (
      t >= now &&
      t <= weekAhead &&
      ["approved", "scheduled"].includes(c.status)
    );
  });
  const shipped = calendar.filter((c) => c.status === "shipped");
  const latest = insights.at(-1);
  const prev = insights.at(-2);

  return (
    <div className="mx-auto max-w-4xl">
      <CareTag>This week</CareTag>
      <h1 className="subhead mt-2">
        {approvals.length > 0
          ? `${approvals.length} post${approvals.length === 1 ? "" : "s"} waiting on you.`
          : "Nothing waiting on you. Enjoy it."}
      </h1>

      {/* Approvals — front and center */}
      <section className="mt-8" aria-label="Needs your approval">
        {approvals.length > 0 ? (
          <>
            <div className="flex flex-col gap-4">
              {approvals.slice(0, 2).map(({ approval, item }) => (
                <ApprovalCard
                  key={approval.id}
                  approval={approval}
                  item={item}
                />
              ))}
            </div>
            {approvals.length > 2 && (
              <Link
                href="/dashboard/approvals"
                className="btn btn-ghost mt-4 w-full"
              >
                Review all {approvals.length} in the queue
              </Link>
            )}
          </>
        ) : (
          <EmptySlot title="Approvals">
            Drafts land here before anything ships. When one arrives,
            approving it takes seconds.
          </EmptySlot>
        )}
      </section>

      {/* Numbers snapshot — the full story lives in Insights */}
      <section className="mt-8" aria-label="Numbers snapshot">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Followers", value: latest?.followers, delta: prev && latest ? latest.followers - prev.followers : null },
            { label: "Reach", value: latest?.reach, delta: prev && latest ? latest.reach - prev.reach : null },
            { label: "Engagement", value: latest?.engagement, delta: prev && latest ? latest.engagement - prev.engagement : null },
            { label: "Profile views", value: latest?.profile_views, delta: prev && latest ? latest.profile_views - prev.profile_views : null },
          ].map((m) => (
            <GlassPanel key={m.label} depth="far" radius="md" contentClassName="p-4">
              <p className="care-tag">{m.label}</p>
              <p className="tnum mt-1.5 text-2xl font-bold text-white">
                {m.value != null ? m.value.toLocaleString("en-US") : "—"}
              </p>
              <p
                className="tnum mt-0.5 text-xs"
                style={{ color: m.delta != null && m.delta >= 0 ? "var(--olive)" : "var(--ash-300)" }}
              >
                {m.delta != null
                  ? `${m.delta >= 0 ? "+" : ""}${m.delta.toLocaleString("en-US")} this week`
                  : "no data yet"}
              </p>
            </GlassPanel>
          ))}
        </div>
        <Link
          href="/dashboard/insights"
          className="mt-3 inline-block text-sm text-rust-400 hover:text-rust-300"
        >
          Full numbers in Insights →
        </Link>
      </section>

      {/* The rest recedes */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <GlassPanel depth="far" radius="lg" contentClassName="p-6">
          <CareTag>Scheduled this week</CareTag>
          {scheduled.length === 0 ? (
            <p className="mt-4 text-sm text-ash-300">
              Nothing locked in yet — approved posts land here with their
              slot.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {scheduled.map((c) => (
                <li key={c.id} className="text-sm">
                  <span className="care-tag">{platformLabel[c.platform]}</span>
                  <p className="mt-0.5 line-clamp-2 text-paper">{c.caption}</p>
                  <p className="tnum mt-0.5 text-xs text-ash-300">
                    {formatSlot(c.scheduled_at)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </GlassPanel>

        <GlassPanel depth="far" radius="lg" contentClassName="p-6">
          <CareTag>Shipped</CareTag>
          {shipped.length === 0 ? (
            <p className="mt-4 text-sm text-ash-300">
              Published work shows up here once posts start going out.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {shipped.map((c) => (
                <li key={c.id} className="text-sm">
                  <span
                    className={`status-chip ${calendarStatus[c.status].cls}`}
                  >
                    {calendarStatus[c.status].label}
                  </span>
                  <p className="mt-1.5 line-clamp-2 text-paper">{c.caption}</p>
                </li>
              ))}
            </ul>
          )}
        </GlassPanel>
      </div>
    </div>
  );
}
