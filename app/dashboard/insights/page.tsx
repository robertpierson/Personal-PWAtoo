import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";
import { getInsights } from "@/lib/data";

/** Clay-inked line chart, no chart-lib palette anywhere near it. */
function ReachChart({ values }: { values: number[] }) {
  const W = 560;
  const H = 180;
  const pad = 8;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const x = (i: number) => pad + (i * (W - pad * 2)) / (values.length - 1);
  const y = (v: number) =>
    H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2);
  const line = values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const area = `${pad},${H - pad} ${line} ${W - pad},${H - pad}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="mt-4 w-full"
      role="img"
      aria-label={`Reach over the last ${values.length} weeks, from ${values[0].toLocaleString("en-US")} to ${values.at(-1)?.toLocaleString("en-US")}`}
    >
      <defs>
        <linearGradient id="reach-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--rust-500)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--rust-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={pad}
          x2={W - pad}
          y1={H * f}
          y2={H * f}
          stroke="color-mix(in srgb, var(--white) 8%, transparent)"
        />
      ))}
      <polygon points={area} fill="url(#reach-fill)" />
      <polyline
        points={line}
        fill="none"
        stroke="var(--rust-400)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {values.map((v, i) => (
        <circle
          key={i}
          cx={x(i)}
          cy={y(v)}
          r="3"
          fill="var(--ink-900)"
          stroke="var(--rust-300)"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

export default async function InsightsPage() {
  const insights = await getInsights();

  if (insights.length === 0) {
    // Placeholder dashboard — every metric this page will report,
    // waiting for the first month of shipped work.
    const PLANNED = [
      "Followers",
      "Reach",
      "Engagement",
      "Profile views",
      "Site traffic",
      "Event sign-ups",
      "Newsletter subscribers",
      "Sponsor replies",
    ];
    return (
      <div className="mx-auto max-w-4xl">
        <CareTag>Insights</CareTag>
        <h1 className="subhead mt-2">The numbers, in plain English.</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ash-300">
          Once your first posts ship, every tile below starts filling in —
          with a monthly plain-English read on what the numbers mean.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PLANNED.map((label) => (
            <GlassPanel key={label} depth="far" radius="md" contentClassName="p-5">
              <p className="care-tag">{label}</p>
              <p className="tnum mt-2 text-3xl font-bold text-ash-300">—</p>
              <p className="mt-1 text-xs text-ash-300">tracking starts soon</p>
            </GlassPanel>
          ))}
        </div>

        <GlassPanel radius="lg" depth="mid" className="mt-6" contentClassName="p-6">
          <CareTag>Reach — weekly</CareTag>
          <div
            className="mt-4 grid h-40 place-items-center rounded-[var(--r-sm)] text-sm text-ash-300"
            style={{
              border:
                "1.5px dashed color-mix(in srgb, var(--white) 18%, transparent)",
            }}
          >
            Your reach chart draws itself here after the first week.
          </div>
        </GlassPanel>
      </div>
    );
  }

  const latest = insights.at(-1)!;
  const first = insights[0];
  const prev = insights.at(-2);

  const reachGrowth = Math.round(
    ((latest.reach - first.reach) / (first.reach || 1)) * 100,
  );

  const tiles = [
    { label: "Followers", value: latest.followers, delta: prev ? latest.followers - prev.followers : 0 },
    { label: "Reach", value: latest.reach, delta: prev ? latest.reach - prev.reach : 0 },
    { label: "Engagement", value: latest.engagement, delta: prev ? latest.engagement - prev.engagement : 0 },
    { label: "Profile views", value: latest.profile_views, delta: prev ? latest.profile_views - prev.profile_views : 0 },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <CareTag>Insights</CareTag>
      <h1 className="subhead mt-2">The numbers, in plain English.</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map((t) => (
          <GlassPanel key={t.label} depth="far" radius="md" contentClassName="p-5">
            <p className="care-tag">{t.label}</p>
            <p className="tnum mt-2 text-3xl font-bold text-white">
              {t.value.toLocaleString("en-US")}
            </p>
            <p className="tnum mt-1 text-xs text-rust-300">
              {t.delta >= 0 ? "+" : ""}
              {t.delta.toLocaleString("en-US")} this week
            </p>
          </GlassPanel>
        ))}
      </div>

      <GlassPanel radius="lg" depth="mid" light className="mt-6" contentClassName="p-6">
        <CareTag>Reach — last {insights.length} weeks</CareTag>
        <ReachChart values={insights.map((i) => i.reach)} />
      </GlassPanel>

      <GlassPanel radius="lg" depth="far" className="mt-6" contentClassName="p-6">
        <CareTag>What this means</CareTag>
        <ul className="mt-3 space-y-3 text-sm leading-relaxed text-paper">
          <li>
            Reach is up {reachGrowth}% since we started the season calendar —
            that&apos;s {latest.reach.toLocaleString("en-US")} people seeing
            your name this week alone.
          </li>
          <li>
            Follower growth is steady, not spiky. Steady is what recruiters and
            sponsors trust.
          </li>
          <li>
            Profile views keep climbing — people who see a post are checking
            who you are. The site being current is why that works.
          </li>
        </ul>
      </GlassPanel>
    </div>
  );
}
