import type { ChartMark, ChartPoint } from "@/components/app/StatChart";

// Placeholder analytics — one hand-shaped weekly series per metric, each
// with its own arc and its own annotated shift points. Not copy-paste:
// every metric moves differently and for a different reason.

const WEEKS = 26;

function weeklyDates(): string[] {
  const out: string[] = [];
  const end = new Date();
  end.setHours(0, 0, 0, 0);
  end.setDate(end.getDate() - ((end.getDay() + 6) % 7)); // this Monday
  for (let i = WEEKS - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(end.getDate() - i * 7);
    out.push(d.toISOString());
  }
  return out;
}

const DATES = weeklyDates();

const toPoints = (vals: number[]): ChartPoint[] =>
  vals.map((v, i) => ({ t: DATES[i], v }));

export type Metric = {
  key: string;
  label: string;
  unit?: string;
  color: string;
  points: ChartPoint[];
  marks: ChartMark[];
  blurb: string;
};

// Each series is authored, not randomized — realistic shape per metric.
const followers = [
  318, 331, 340, 352, 349, 366, 389, 402, 398, 421, 456, 503, 541, 552,
  577, 631, 662, 668, 701, 754, 806, 869, 902, 948, 1004, 1032,
];
const reach = [
  2100, 2450, 2380, 2900, 2760, 3200, 4800, 4200, 3900, 4600, 5400, 9200,
  7100, 6800, 7400, 8900, 8200, 7600, 9800, 12400, 11200, 10800, 13600,
  15200, 17100, 18240,
];
const engagement = [
  4.1, 4.3, 3.9, 4.6, 4.4, 4.8, 6.9, 5.2, 4.7, 5.1, 5.6, 8.2, 6.1, 5.8,
  6.0, 6.7, 6.3, 5.9, 6.8, 7.9, 7.1, 6.9, 7.6, 8.1, 8.4, 8.9,
];
const siteTraffic = [
  210, 240, 260, 255, 280, 320, 470, 410, 390, 520, 610, 980, 720, 690,
  760, 910, 880, 840, 1020, 1380, 1240, 1180, 1460, 1620, 1810, 1904,
];
const eventSignups = [
  0, 0, 3, 6, 8, 11, 14, 12, 10, 18, 26, 41, 30, 27, 35, 52, 44, 38, 61,
  73, 64, 58, 70, 79, 84, 87,
];
const newsletter = [
  40, 44, 51, 57, 62, 70, 79, 88, 96, 110, 128, 141, 150, 162, 178, 190,
  204, 219, 236, 258, 274, 291, 312, 336, 358, 381,
];

export const METRICS: Metric[] = [
  {
    key: "followers",
    label: "Followers",
    color: "var(--rust-400)",
    points: toPoints(followers),
    marks: [
      { i: 9, label: "Season content calendar went live — steady weekly cadence begins." },
      { i: 18, label: "Meet-the-team series; three carousel posts in one week." },
      { i: 24, label: "Regional qualifier recap — best single-week gain of the season." },
    ],
    blurb: "Steady, not spiky. Steady is what recruiters and sponsors trust.",
  },
  {
    key: "reach",
    label: "Reach",
    color: "var(--gold)",
    points: toPoints(reach),
    marks: [
      { i: 6, label: "First reel — 4.8k accounts, 3× the prior week." },
      { i: 11, label: "Qualifier recap reel picked up beyond followers." },
      { i: 19, label: "Sponsor cross-post from Hilltop Hardware." },
    ],
    blurb: "Reach spikes on video and shared posts — the calendar keeps the floor rising.",
  },
  {
    key: "engagement",
    label: "Engagement",
    unit: "%",
    color: "var(--olive)",
    points: toPoints(engagement),
    marks: [
      { i: 6, label: "Reel format lifted engagement rate past 6%." },
      { i: 11, label: "Recap post — highest rate of the season." },
    ],
    blurb: "Engagement rate holds above 6% since switching to short video.",
  },
  {
    key: "site",
    label: "Site traffic",
    color: "var(--rust-300)",
    points: toPoints(siteTraffic),
    marks: [
      { i: 9, label: "New site launched — link in bio started converting." },
      { i: 18, label: "Demo-day landing page drove a traffic step-up." },
    ],
    blurb: "Traffic tracks the socials — a current site is why clicks convert.",
  },
  {
    key: "events",
    label: "Event sign-ups",
    color: "var(--brick)",
    points: toPoints(eventSignups),
    marks: [
      { i: 10, label: "Open workshop RSVP form launched." },
      { i: 18, label: "Demo-day push across every channel." },
    ],
    blurb: "Sign-ups arrive in bursts around each event push.",
  },
  {
    key: "newsletter",
    label: "Newsletter",
    color: "var(--gold)",
    points: toPoints(newsletter),
    marks: [{ i: 12, label: "Footer signup + first monthly issue shipped." }],
    blurb: "The one line that only ever goes up — compounding, slow, reliable.",
  },
];

// KPI tiles derive their headline number, weekly delta, and total change
// straight from the authored series above.
export function kpi(m: Metric) {
  const v = m.points.map((p) => p.v);
  const last = v[v.length - 1];
  const prev = v[v.length - 2];
  // Baseline: first non-zero week, so series that start at 0 (events)
  // don't report a nonsense percentage.
  const base = v.find((x) => x > 0) ?? 0;
  return {
    label: m.label,
    unit: m.unit ?? "",
    value: last,
    delta: last - prev,
    pct: base ? Math.round(((last - base) / base) * 100) : null,
  };
}

// Placeholder distributions for the supporting charts.
export const audienceSplit = [
  { label: "Instagram", value: 47, color: "var(--rust-400)" },
  { label: "Facebook", value: 21, color: "var(--gold)" },
  { label: "Site", value: 18, color: "var(--olive)" },
  { label: "Newsletter", value: 14, color: "var(--brick)" },
];

export const topPosts = [
  { label: "Qualifier recap reel", value: 12400 },
  { label: "Meet the build leads", value: 7600 },
  { label: "Demo-day invite", value: 6100 },
  { label: "Sponsor thank-you", value: 4300 },
  { label: "New-member form", value: 3200 },
];

// Weekly posts-shipped series — feeds the interactive chart on Content.
export const postsMetric: Metric = {
  key: "posts",
  label: "Posts shipped",
  color: "var(--rust-400)",
  points: toPoints([
    2, 3, 2, 4, 3, 3, 5, 4, 3, 4, 5, 6, 4, 4, 5, 7, 5, 4, 6, 8, 6, 5, 7, 7, 6, 5,
  ]),
  marks: [
    { i: 9, label: "Season calendar kicked in — three posts a week became the floor." },
    { i: 19, label: "Demo-day push — heaviest posting week of the season." },
  ],
  blurb: "Cadence, not bursts. A predictable week is what keeps reach climbing.",
};

// GitHub-style contribution calendar — one authored year of posting days,
// each day carrying its count and the actual posts that shipped (with a
// link to each on the live site).
export type PostRef = { title: string; url: string };
export type PostDay = { t: string; count: number; posts: PostRef[] };

const POST_POOL: { title: string; slug: string }[] = [
  { title: "Qualifier recap reel", slug: "qualifier-recap" },
  { title: "Meet the build leads", slug: "meet-the-build-leads" },
  { title: "Demo-day invite", slug: "demo-day" },
  { title: "Sponsor thank-you: Hilltop Hardware", slug: "sponsor-hilltop" },
  { title: "New-member interest form", slug: "join-us" },
  { title: "Drivetrain build log", slug: "drivetrain-log" },
  { title: "Workshop hours update", slug: "workshop-hours" },
  { title: "CAD-from-zero workshop", slug: "cad-workshop" },
  { title: "Match highlight — 3rd of 42", slug: "match-highlight" },
  { title: "End-of-season survey", slug: "season-survey" },
];

const SITE = "https://ridgelinerobotics.org/posts";

function rngFor(seed: number) {
  let s = (seed * 2654435761) >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

// 53 weeks × 7 days ending on the most recent Saturday, so the grid
// aligns to whole weeks like GitHub's.
export function postingYear(): PostDay[] {
  const end = new Date();
  end.setHours(0, 0, 0, 0);
  end.setDate(end.getDate() + (6 - end.getDay())); // upcoming/this Saturday
  const DAYS = 53 * 7;
  const out: PostDay[] = [];
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(end.getDate() - i);
    const idx = DAYS - 1 - i;
    const r = rngFor(idx + 1);
    const dow = d.getDay();
    const future = d.getTime() > Date.now();
    // Weekends quieter; no posts in the future.
    let count = 0;
    if (!future) {
      const roll = r();
      count = roll > 0.82 ? 2 : roll > 0.5 ? 1 : 0;
      if ((dow === 0 || dow === 6) && r() > 0.5) count = Math.max(0, count - 1);
    }
    const posts: PostRef[] = [];
    for (let k = 0; k < count; k++) {
      const p = POST_POOL[Math.floor(r() * POST_POOL.length)];
      posts.push({ title: p.title, url: `${SITE}/${p.slug}` });
    }
    out.push({ t: d.toISOString(), count, posts });
  }
  return out;
}
