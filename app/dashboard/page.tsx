import Link from "next/link";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";
import { ApprovalCard } from "@/components/app/ApprovalCard";
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
      {approvals.length > 0 && (
        <section className="mt-8" aria-label="Needs your approval">
          <div className="flex flex-col gap-4">
            {approvals.slice(0, 2).map(({ approval, item }) => (
              <ApprovalCard key={approval.id} approval={approval} item={item} />
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
        </section>
      )}

      {/* The rest recedes */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <GlassPanel depth="far" radius="lg" contentClassName="p-6">
          <CareTag>Scheduled this week</CareTag>
          <ul className="mt-4 space-y-3">
            {scheduled.length === 0 && (
              <li className="text-sm text-ash-300">
                Nothing locked in yet — your queue feeds this list.
              </li>
            )}
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
        </GlassPanel>

        <GlassPanel depth="far" radius="lg" contentClassName="p-6">
          <CareTag>Shipped</CareTag>
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
        </GlassPanel>

        <GlassPanel depth="far" radius="lg" contentClassName="p-6">
          <CareTag>Week numbers</CareTag>
          {latest && (
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="text-xs text-ash-300">Reach</dt>
                <dd className="tnum text-3xl font-bold text-white">
                  {latest.reach.toLocaleString("en-US")}
                </dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-xs text-ash-300">Followers</dt>
                <dd className="tnum text-lg font-semibold text-white">
                  {latest.followers}
                  {prev && (
                    <span className="ml-1.5 text-xs text-chambray-300">
                      +{latest.followers - prev.followers}
                    </span>
                  )}
                </dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-xs text-ash-300">Engagement</dt>
                <dd className="tnum text-lg font-semibold text-white">
                  {latest.engagement}
                </dd>
              </div>
            </dl>
          )}
          <Link
            href="/dashboard/insights"
            className="mt-5 block text-sm text-denim-400 hover:text-chambray-300"
          >
            Full numbers →
          </Link>
        </GlassPanel>
      </div>
    </div>
  );
}
