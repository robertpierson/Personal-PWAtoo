import "server-only";
import {
  demoApprovals,
  demoCalendar,
  demoContent,
  demoInsights,
  demoInvoices,
  demoOrg,
  demoUser,
  isDemoMode,
} from "@/lib/demo";
import { createClient } from "@/lib/supabase/server";
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
 * Server-side data access. Demo mode serves the sample org; wired mode
 * queries Supabase under RLS (each user sees only their org).
 */

export async function getWorkspace(): Promise<{
  org: Organization;
  profile: UserProfile;
}> {
  if (isDemoMode) return { org: demoOrg, profile: demoUser };
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id ?? "")
    .single();
  const { data: org } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", profile?.org_id ?? "")
    .single();
  return { org: org ?? demoOrg, profile: profile ?? demoUser };
}

export async function getCalendar(): Promise<CalendarItem[]> {
  if (isDemoMode) return demoCalendar();
  const supabase = await createClient();
  const { data } = await supabase
    .from("content_calendar")
    .select("*")
    .order("scheduled_at");
  return data ?? [];
}

export async function getOpenApprovals(): Promise<
  { approval: Approval; item: CalendarItem }[]
> {
  if (isDemoMode) {
    const items = demoCalendar();
    return demoApprovals().map((approval) => ({
      approval,
      item: items.find((i) => i.id === approval.calendar_id)!,
    }));
  }
  const supabase = await createClient();
  const { data: approvals } = await supabase
    .from("approvals_queue")
    .select("*")
    .is("decided_at", null)
    .order("requested_at");
  if (!approvals?.length) return [];
  const { data: items } = await supabase
    .from("content_calendar")
    .select("*")
    .in(
      "id",
      approvals.map((a) => a.calendar_id),
    );
  return approvals.flatMap((approval) => {
    const item = items?.find((i) => i.id === approval.calendar_id);
    return item ? [{ approval, item }] : [];
  });
}

export async function getContent(): Promise<ClientContent[]> {
  if (isDemoMode) return demoContent();
  const supabase = await createClient();
  const { data } = await supabase
    .from("client_content")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getInvoices(): Promise<Invoice[]> {
  if (isDemoMode) return demoInvoices;
  const supabase = await createClient();
  const { data } = await supabase
    .from("invoices")
    .select("*")
    .order("issued_at", { ascending: false });
  return data ?? [];
}

export async function getInsights(): Promise<InsightRow[]> {
  if (isDemoMode) return demoInsights();
  const supabase = await createClient();
  const { data } = await supabase
    .from("insights")
    .select("*")
    .order("metric_date");
  return data ?? [];
}
