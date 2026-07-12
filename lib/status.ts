import type {
  CalendarStatus,
  ContentStatus,
  DesignRequestStatus,
  InvoiceStatus,
} from "@/lib/db/types";

/**
 * One status system: clay = needs action / in progress,
 * white = done, faint = idle.
 */
type StatusStyle = { label: string; cls: string };

export const calendarStatus: Record<CalendarStatus, StatusStyle> = {
  drafting: { label: "Drafting", cls: "status-idle" },
  awaiting_approval: { label: "Awaiting approval", cls: "status-action" },
  in_review: { label: "In review", cls: "status-action" },
  approved: { label: "Approved", cls: "status-done" },
  scheduled: { label: "Scheduled", cls: "status-done" },
  shipped: { label: "Shipped", cls: "status-done" },
};

export const contentStatus: Record<ContentStatus, StatusStyle> = {
  drafting: { label: "Drafting", cls: "status-idle" },
  in_review: { label: "In review", cls: "status-action" },
  approved: { label: "Approved", cls: "status-done" },
  delivered: { label: "Delivered", cls: "status-done" },
};

export const designRequestStatus: Record<DesignRequestStatus, StatusStyle> = {
  requested: { label: "Requested", cls: "status-action" },
  in_progress: { label: "In progress", cls: "status-action" },
  delivered: { label: "Delivered", cls: "status-done" },
  declined: { label: "Declined", cls: "status-idle" },
};

export const invoiceStatus: Record<InvoiceStatus, StatusStyle> = {
  outstanding: { label: "Outstanding", cls: "status-action" },
  paid: { label: "Paid", cls: "status-done" },
  void: { label: "Void", cls: "status-idle" },
};

export const platformLabel: Record<string, string> = {
  instagram: "IG",
  facebook: "FB",
  website: "WEB",
  email: "EMAIL",
};

export function formatSlot(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}
