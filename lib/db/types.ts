/**
 * Typed database model, hand-written to mirror supabase/migrations.
 * Regenerate with `supabase gen types typescript` once the Supabase
 * connector/CLI is wired; keep the shape identical.
 */

export type UserRole = "owner" | "member";
export type ContentKind = "design" | "photo" | "video" | "document";
export type ContentStatus = "drafting" | "in_review" | "approved" | "delivered";
export type CalendarPlatform = "instagram" | "facebook" | "website" | "email";
export type CalendarStatus =
  | "drafting"
  | "awaiting_approval"
  | "in_review"
  | "approved"
  | "scheduled"
  | "shipped";
export type ApprovalDecision = "approved" | "changes_requested";
export type InvoiceStatus = "outstanding" | "paid" | "void";

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          org_type: string | null;
          logo_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          org_type?: string | null;
          logo_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          org_type?: string | null;
          logo_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          id: string;
          org_id: string | null;
          role: UserRole;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          onboarded: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          org_id?: string | null;
          role?: UserRole;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          onboarded?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string | null;
          role?: UserRole;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          onboarded?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      client_content: {
        Row: {
          id: string;
          org_id: string;
          title: string;
          kind: ContentKind;
          storage_path: string | null;
          preview_url: string | null;
          status: ContentStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          title: string;
          kind?: ContentKind;
          storage_path?: string | null;
          preview_url?: string | null;
          status?: ContentStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          title?: string;
          kind?: ContentKind;
          storage_path?: string | null;
          preview_url?: string | null;
          status?: ContentStatus;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      content_calendar: {
        Row: {
          id: string;
          org_id: string;
          content_id: string | null;
          platform: CalendarPlatform;
          caption: string;
          scheduled_at: string;
          status: CalendarStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          content_id?: string | null;
          platform: CalendarPlatform;
          caption?: string;
          scheduled_at: string;
          status?: CalendarStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          org_id?: string;
          content_id?: string | null;
          platform?: CalendarPlatform;
          caption?: string;
          scheduled_at?: string;
          status?: CalendarStatus;
          created_at?: string;
        };
        Relationships: [];
      };
      approvals_queue: {
        Row: {
          id: string;
          org_id: string;
          calendar_id: string;
          requested_at: string;
          decided_at: string | null;
          decision: ApprovalDecision | null;
          note: string | null;
          decided_by: string | null;
        };
        Insert: {
          id?: string;
          org_id: string;
          calendar_id: string;
          requested_at?: string;
          decided_at?: string | null;
          decision?: ApprovalDecision | null;
          note?: string | null;
          decided_by?: string | null;
        };
        Update: {
          id?: string;
          org_id?: string;
          calendar_id?: string;
          requested_at?: string;
          decided_at?: string | null;
          decision?: ApprovalDecision | null;
          note?: string | null;
          decided_by?: string | null;
        };
        Relationships: [];
      };
      invoices: {
        Row: {
          id: string;
          org_id: string;
          number: string;
          amount_cents: number;
          currency: string;
          status: InvoiceStatus;
          issued_at: string;
          due_at: string | null;
          paid_at: string | null;
        };
        Insert: {
          id?: string;
          org_id: string;
          number: string;
          amount_cents: number;
          currency?: string;
          status?: InvoiceStatus;
          issued_at?: string;
          due_at?: string | null;
          paid_at?: string | null;
        };
        Update: {
          id?: string;
          org_id?: string;
          number?: string;
          amount_cents?: number;
          currency?: string;
          status?: InvoiceStatus;
          issued_at?: string;
          due_at?: string | null;
          paid_at?: string | null;
        };
        Relationships: [];
      };
      insights: {
        Row: {
          id: string;
          org_id: string;
          metric_date: string;
          followers: number;
          reach: number;
          engagement: number;
          profile_views: number;
        };
        Insert: {
          id?: string;
          org_id: string;
          metric_date: string;
          followers?: number;
          reach?: number;
          engagement?: number;
          profile_views?: number;
        };
        Update: {
          id?: string;
          org_id?: string;
          metric_date?: string;
          followers?: number;
          reach?: number;
          engagement?: number;
          profile_views?: number;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      current_org_id: {
        Args: Record<string, never>;
        Returns: string | null;
      };
      is_org_owner: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      user_role: UserRole;
      content_kind: ContentKind;
      content_status: ContentStatus;
      calendar_platform: CalendarPlatform;
      calendar_status: CalendarStatus;
      approval_decision: ApprovalDecision;
      invoice_status: InvoiceStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}

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
