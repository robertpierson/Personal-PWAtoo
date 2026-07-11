"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";
import { formatSlot, platformLabel } from "@/lib/status";
import { isDemoMode } from "@/lib/demo";
import { createClient } from "@/lib/supabase/client";
import type { Approval, CalendarItem } from "@/lib/db/types";

const PLATFORM_TINT: Record<string, string> = {
  instagram: "linear-gradient(140deg, var(--brick), var(--brick))",
  facebook: "linear-gradient(140deg, var(--brick), var(--brick))",
  website: "linear-gradient(140deg, var(--graphite-600), var(--brick))",
  email: "linear-gradient(140deg, var(--ink-700), var(--brick))",
};

type Decision = "approved" | "changes_requested" | null;

/**
 * One planned post: creative preview, caption, slot, and inline
 * Approve / Request changes. This card is the promise, operationalized.
 */
export function ApprovalCard({
  approval,
  item,
}: {
  approval: Approval;
  item: CalendarItem;
}) {
  const [decision, setDecision] = useState<Decision>(null);
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState("");
  const [pending, setPending] = useState(false);

  const decide = async (d: Exclude<Decision, null>) => {
    setPending(true);
    if (!isDemoMode) {
      const supabase = createClient();
      await supabase
        .from("approvals_queue")
        .update({
          decision: d,
          decided_at: new Date().toISOString(),
          note: note || null,
        })
        .eq("id", approval.id);
      await supabase
        .from("content_calendar")
        .update({ status: d === "approved" ? "approved" : "in_review" })
        .eq("id", item.id);
    }
    setDecision(d);
    setPending(false);
    setNoteOpen(false);
  };

  return (
    <GlassPanel radius="lg" depth="near" light contentClassName="p-6">
      <div className="flex flex-col gap-5 sm:flex-row">
        {/* Creative preview */}
        <div
          className="flex aspect-square w-full shrink-0 flex-col justify-between rounded-[var(--r-md)] p-4 sm:w-40"
          style={{ background: PLATFORM_TINT[item.platform] }}
          aria-hidden
        >
          <span className="care-tag" style={{ color: "var(--rust-200)" }}>
            {platformLabel[item.platform]}
          </span>
          <p className="line-clamp-4 text-sm font-medium leading-snug text-white">
            {item.caption.split(" ").slice(0, 10).join(" ")}…
          </p>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CareTag>{formatSlot(item.scheduled_at)}</CareTag>
            {decision === "approved" && (
              <span className="status-chip status-done">Approved</span>
            )}
            {decision === "changes_requested" && (
              <span className="status-chip status-action">In review</span>
            )}
            {!decision && (
              <span className="status-chip status-action">
                Awaiting approval
              </span>
            )}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-paper">
            {item.caption}
          </p>

          {!decision && (
            <div className="mt-5">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => decide("approved")}
                  disabled={pending}
                  className="btn btn-primary px-5 py-2 text-sm disabled:opacity-60"
                >
                  Approve
                </button>
                <button
                  onClick={() => setNoteOpen((v) => !v)}
                  disabled={pending}
                  className="btn btn-ghost px-5 py-2 text-sm"
                >
                  Request changes
                </button>
              </div>

              {noteOpen && (
                <div className="mt-4">
                  <label htmlFor={`note-${approval.id}`} className="care-tag">
                    What should change?
                  </label>
                  <textarea
                    id={`note-${approval.id}`}
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mt-2 w-full rounded-[var(--r-sm)] border border-white/12 bg-ink-800/70 px-4 py-3 text-sm text-paper outline-none transition focus:border-rust-400"
                  />
                  <button
                    onClick={() => decide("changes_requested")}
                    disabled={pending || !note.trim()}
                    className="btn btn-primary mt-3 px-5 py-2 text-sm disabled:opacity-50"
                  >
                    Send note
                  </button>
                </div>
              )}
            </div>
          )}

          {decision === "changes_requested" && (
            <p className="mt-4 text-sm text-ash-300">
              Noted — we&apos;ll rework it and it&apos;ll be back in your
              queue shortly.
            </p>
          )}
        </div>
      </div>
    </GlassPanel>
  );
}
