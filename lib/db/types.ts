/**
 * Domain aliases over the generated Supabase types.
 * database.types.ts is generated from the live schema — regenerate via
 * the Supabase connector (generate_typescript_types) after migrations.
 */
import type { Database } from "./database.types";

export type {
  Database,
  Json,
  Tables,
  TablesInsert,
  TablesUpdate,
  Enums,
} from "./database.types";

export type UserRole = Database["public"]["Enums"]["user_role"];
export type ContentKind = Database["public"]["Enums"]["content_kind"];
export type ContentStatus = Database["public"]["Enums"]["content_status"];
export type CalendarPlatform =
  Database["public"]["Enums"]["calendar_platform"];
export type CalendarStatus = Database["public"]["Enums"]["calendar_status"];
export type ApprovalDecision =
  Database["public"]["Enums"]["approval_decision"];
export type InvoiceStatus = Database["public"]["Enums"]["invoice_status"];

export type Organization =
  Database["public"]["Tables"]["organizations"]["Row"];
export type UserProfile = Database["public"]["Tables"]["users"]["Row"];
export type ClientContent =
  Database["public"]["Tables"]["client_content"]["Row"];
export type CalendarItem =
  Database["public"]["Tables"]["content_calendar"]["Row"];
export type Approval = Database["public"]["Tables"]["approvals_queue"]["Row"];
export type Invoice = Database["public"]["Tables"]["invoices"]["Row"];
export type InsightRow = Database["public"]["Tables"]["insights"]["Row"];
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];
