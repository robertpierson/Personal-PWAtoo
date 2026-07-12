import type {
  Approval,
  CalendarItem,
  ClientContent,
  DesignRequest,
  InsightRow,
  Invoice,
  Organization,
  UserProfile,
} from "@/lib/db/types";

/**
 * Demo mode — active whenever Supabase credentials are absent.
 * The app runs fully on this dataset; wiring real credentials
 * switches every query to live data with no UI changes.
 */
export const isDemoMode =
  process.env.NEXT_PUBLIC_FORCE_DEMO === "1" ||
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const DAY = 86_400_000;

/** Start of the current week (Monday, local time). */
function weekStart(): Date {
  const now = new Date();
  const monday = new Date(now);
  monday.setHours(9, 0, 0, 0);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  return monday;
}

const at = (base: Date, days: number, hour: number) => {
  const d = new Date(base.getTime() + days * DAY);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

export const demoOrg: Organization = {
  id: "demo-org",
  name: "Ridgeline Robotics Club",
  slug: "ridgeline-robotics-club",
  org_type: "Robotics / engineering team",
  logo_url: null,
  credits: 15,
  created_at: "2026-02-03T15:00:00.000Z",
};

export const demoUser: UserProfile = {
  id: "demo-user",
  org_id: demoOrg.id,
  role: "owner",
  email: "founder@ridgelinerobotics.org",
  full_name: "Dana Whitfield",
  avatar_url: null,
  onboarded: true,
  created_at: "2026-02-03T15:05:00.000Z",
};

export function demoCalendar(): CalendarItem[] {
  const wk = weekStart();
  const item = (
    id: string,
    days: number,
    hour: number,
    platform: CalendarItem["platform"],
    caption: string,
    status: CalendarItem["status"],
  ): CalendarItem => ({
    id,
    org_id: demoOrg.id,
    content_id: null,
    platform,
    caption,
    scheduled_at: at(wk, days, hour),
    status,
    created_at: at(wk, days - 7, 10),
  });

  return [
    item(
      "cal-1",
      0,
      9,
      "instagram",
      "Regional qualifier recap — 3rd of 42 teams, and the drivetrain held. Build-season write-up on the site. 🤖",
      "shipped",
    ),
    item(
      "cal-2",
      1,
      17,
      "facebook",
      "New-member interest form is live. Ten minutes, no experience needed — we teach CAD from zero.",
      "shipped",
    ),
    item(
      "cal-3",
      3,
      12,
      "instagram",
      "Meet the build leads: Marcus Lee, three seasons in, still hasn't lost a soldering-iron bet.",
      "awaiting_approval",
    ),
    item(
      "cal-4",
      4,
      9,
      "website",
      "Workshop closed June 14–15 for competition travel — build hours move to the schedule page.",
      "awaiting_approval",
    ),
    item(
      "cal-5",
      5,
      10,
      "instagram",
      "Demo day is coming. Working robots, big smiles, RSVP link in bio.",
      "awaiting_approval",
    ),
    item(
      "cal-6",
      5,
      18,
      "email",
      "June newsletter: qualifier results, demo day, and a thank-you to our sponsor Hilltop Hardware.",
      "approved",
    ),
    item(
      "cal-7",
      6,
      11,
      "facebook",
      "End-of-season survey — two minutes, one question that matters: tacos or pizza?",
      "drafting",
    ),
  ];
}

export function demoContent(): ClientContent[] {
  const wk = weekStart();
  const piece = (
    id: string,
    title: string,
    kind: ClientContent["kind"],
    status: ClientContent["status"],
    daysAgo: number,
  ): ClientContent => ({
    id,
    org_id: demoOrg.id,
    title,
    kind,
    storage_path: null,
    preview_url: null,
    status,
    created_at: at(wk, -daysAgo, 10),
    updated_at: at(wk, -Math.max(daysAgo - 2, 0), 15),
  });

  return [
    piece("cc-1", "Game day graphics — June set", "design", "delivered", 18),
    piece("cc-2", "Sponsor thank-you banner: Hilltop Hardware", "design", "delivered", 14),
    piece("cc-3", "Opening day photo album", "photo", "delivered", 12),
    piece("cc-4", "Meet-the-build-leads card series", "design", "approved", 6),
    piece("cc-5", "Photo day parent flyer", "document", "in_review", 3),
    piece("cc-6", "Season highlight reel — 30s cut", "video", "drafting", 1),
  ];
}

export function demoApprovals(): Approval[] {
  const open = demoCalendar().filter((c) => c.status === "awaiting_approval");
  return open.map((c, i) => ({
    id: `appr-${i + 1}`,
    org_id: demoOrg.id,
    calendar_id: c.id,
    requested_at: c.created_at,
    decided_at: null,
    decision: null,
    note: null,
    decided_by: null,
  }));
}

export const demoInvoices: Invoice[] = [
  {
    id: "inv-3",
    org_id: demoOrg.id,
    number: "2026-006",
    amount_cents: 5900,
    currency: "usd",
    status: "outstanding",
    issued_at: "2026-06-01T15:00:00.000Z",
    due_at: "2026-06-15T15:00:00.000Z",
    paid_at: null,
  },
  {
    id: "inv-2",
    org_id: demoOrg.id,
    number: "2026-005",
    amount_cents: 5900,
    currency: "usd",
    status: "paid",
    issued_at: "2026-05-01T15:00:00.000Z",
    due_at: "2026-05-15T15:00:00.000Z",
    paid_at: "2026-05-06T18:20:00.000Z",
  },
  {
    id: "inv-1",
    org_id: demoOrg.id,
    number: "2026-004",
    amount_cents: 5900,
    currency: "usd",
    status: "paid",
    issued_at: "2026-04-01T15:00:00.000Z",
    due_at: "2026-04-15T15:00:00.000Z",
    paid_at: "2026-04-03T12:10:00.000Z",
  },
];

export function demoInsights(): InsightRow[] {
  const wk = weekStart();
  const followers = [412, 438, 465, 471, 502, 549, 578, 611];
  const reach = [3200, 4100, 3900, 5200, 6800, 7400, 9100, 12480];
  const engagement = [180, 240, 210, 310, 420, 460, 570, 690];
  const views = [140, 160, 220, 240, 310, 330, 410, 520];
  return followers.map((f, i) => ({
    id: `ins-${i + 1}`,
    org_id: demoOrg.id,
    metric_date: at(wk, (i - 7) * 7, 0).slice(0, 10),
    followers: f,
    reach: reach[i],
    engagement: engagement[i],
    profile_views: views[i],
  }));
}

export function demoDesignRequests(): DesignRequest[] {
  const wk = weekStart();
  return [
    {
      id: "dr-1",
      org_id: demoOrg.id,
      requested_by: demoUser.id,
      title: "Demo-day poster, print + story size",
      kind: "design",
      brief:
        "Poster for the June demo day — needs date, RSVP link, and the new mark. One print version, one Instagram story crop.",
      status: "in_progress",
      created_at: at(wk, -3, 10),
    },
    {
      id: "dr-2",
      org_id: demoOrg.id,
      requested_by: demoUser.id,
      title: "Sponsor one-pager refresh",
      kind: "document",
      brief: "Update last season's sponsor sheet with the new numbers.",
      status: "delivered",
      created_at: at(wk, -12, 15),
    },
  ];
}
