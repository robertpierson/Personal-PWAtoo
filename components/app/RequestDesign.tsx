"use client";

import { useState } from "react";
import { GlassPanel } from "@/components/glass/GlassPanel";
import { createClient } from "@/lib/supabase/client";
import type { DesignRequest } from "@/lib/db/types";

const KINDS = ["design", "photo", "video", "document"] as const;

/**
 * The + button on Designs: file a build/design request from inside the
 * app. Requests spend build credits; we deliver back into this page.
 */
export function RequestDesign({
  orgId,
  userId,
  demo,
}: {
  orgId: string;
  userId: string;
  demo: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<DesignRequest[]>([]);
  const [form, setForm] = useState({
    title: "",
    kind: "design" as (typeof KINDS)[number],
    brief: "",
  });

  const submit = async () => {
    setPending(true);
    setError(null);
    const optimistic: DesignRequest = {
      id: `local-${Date.now()}`,
      org_id: orgId,
      requested_by: userId,
      title: form.title.trim(),
      kind: form.kind,
      brief: form.brief.trim(),
      status: "requested",
      created_at: new Date().toISOString(),
    };
    if (!demo) {
      const supabase = createClient();
      const { error: insertError } = await supabase
        .from("design_requests")
        .insert({
          org_id: orgId,
          requested_by: userId,
          title: optimistic.title,
          kind: optimistic.kind,
          brief: optimistic.brief,
        });
      if (insertError) {
        setError("Couldn't send that. Try once more?");
        setPending(false);
        return;
      }
    }
    setSubmitted((s) => [optimistic, ...s]);
    setForm({ title: "", kind: "design", brief: "" });
    setOpen(false);
    setPending(false);
  };

  const inputClass =
    "mt-2 w-full rounded-[var(--r-sm)] border border-white/12 bg-ink-800/70 px-4 py-3 text-sm text-paper outline-none transition focus:border-rust-400";

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="btn btn-primary px-4 py-2 text-sm"
      >
        <span aria-hidden className="text-base leading-none">
          +
        </span>
        Request a design
      </button>

      {open && (
        <GlassPanel
          radius="lg"
          depth="near"
          light
          className="mt-6"
          contentClassName="p-7"
        >
          <h2 className="text-base font-semibold text-white">
            What should we make?
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-ash-300">
            Requests spend build credits. We&apos;ll confirm scope and
            timeline before any credits are used.
          </p>

          <label htmlFor="rd-title" className="care-tag mt-5 block">
            Title
          </label>
          <input
            id="rd-title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Event poster for the spring showcase"
            className={inputClass}
          />

          <p className="care-tag mt-4">Type</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {KINDS.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setForm((f) => ({ ...f, kind: k }))}
                className={`rounded-[var(--r-pill)] px-4 py-1.5 text-sm capitalize transition ${
                  form.kind === k
                    ? "bg-rust-500 text-on-dark"
                    : "bg-white/5 text-ash-300 hover:text-white"
                }`}
              >
                {k}
              </button>
            ))}
          </div>

          <label htmlFor="rd-brief" className="care-tag mt-4 block">
            Tell us what you need
          </label>
          <textarea
            id="rd-brief"
            value={form.brief}
            onChange={(e) => setForm((f) => ({ ...f, brief: e.target.value }))}
            rows={4}
            placeholder="What it's for, what it must include, where it will live, and when you need it."
            className={inputClass}
          />

          {error && (
            <p className="mt-4 text-sm" style={{ color: "var(--rust-300)" }} role="alert">
              {error}
            </p>
          )}

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setOpen(false)}
              className="btn btn-ghost flex-1"
              disabled={pending}
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={pending || !form.title.trim() || !form.brief.trim()}
              className="btn btn-primary flex-1 disabled:opacity-50"
            >
              {pending ? "Sending…" : "Send request"}
            </button>
          </div>
        </GlassPanel>
      )}

      {submitted.map((r) => (
        <GlassPanel
          key={r.id}
          radius="md"
          depth="far"
          className="mt-4"
          contentClassName="flex items-center justify-between gap-4 px-6 py-4"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{r.title}</p>
            <p className="text-xs capitalize text-ash-300">{r.kind}</p>
          </div>
          <span className="status-chip status-action">Requested</span>
        </GlassPanel>
      ))}
    </>
  );
}
