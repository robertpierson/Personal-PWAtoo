import type {
  Approval,
  CalendarItem,
  ClientContent,
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
  name: "Cedar Park Little League",
  slug: "cedar-park-little-league",
  org_type: "Youth league",
  logo_url: null,
  created_at: "2026-02-03T15:00:00.000Z",
};

export const demoUser: UserProfile = {
  id: "demo-user",
  org_id: demoOrg.id,
  role: "owner",
  email: "board@cedarparklittleleague.org",
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
      "Opening day recap — 214 kids, 18 teams, zero rainouts. Thanks to every volunteer who showed up at 6am. ⚾",
      "shipped",
    ),
    item(
      "cal-2",
      1,
      17,
      "facebook",
      "Snack stand volunteer slots for Saturday are live. Two-hour shifts, free coffee, best seat in the park.",
      "shipped",
    ),
    item(
      "cal-3",
      3,
      12,
      "instagram",
      "Meet the coaches: Marcus Lee, 11 seasons with the Cubs, still hasn't lost a pizza bet.",
      "awaiting_approval",
    ),
    item(
      "cal-4",
      4,
      9,
      "website",
      "Field 2 maintenance closure June 14–15 — makeup games posted to the schedule page.",
      "awaiting_approval",
    ),
    item(
      "cal-5",
      5,
      10,
      "instagram",
      "Photo day is coming. Clean jerseys, big smiles, order forms go home Thursday.",
      "awaiting_approval",
    ),
    item(
      "cal-6",
      5,
      18,
      "email",
      "June newsletter: standings, photo day, and a thank-you to our sponsors at Hilltop Hardware.",
      "approved",
    ),
    item(
      "cal-7",
      6,
      11,
      "facebook",
      "End-of-season party planning survey — two minutes, one question that matters: tacos or pizza?",
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
    piece("cc-4", "Meet-the-coaches card series", "design", "approved", 6),
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
