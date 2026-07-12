import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";
import { EmptySlot } from "@/components/app/EmptySlot";
import { RequestDesign } from "@/components/app/RequestDesign";
import { getContent, getDesignRequests, getWorkspace } from "@/lib/data";
import { isDemoMode } from "@/lib/demo";
import { contentStatus, designRequestStatus } from "@/lib/status";

const KIND_TINT: Record<string, string> = {
  design: "linear-gradient(140deg, var(--brick), var(--brick))",
  photo: "linear-gradient(140deg, var(--brick), var(--graphite-600))",
  video: "linear-gradient(140deg, var(--graphite-600), var(--brick))",
  document: "linear-gradient(140deg, var(--ink-700), var(--brick))",
};

export default async function DesignsPage() {
  const [content, requests, { org, profile }] = await Promise.all([
    getContent(),
    getDesignRequests(),
    getWorkspace(),
  ]);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <CareTag>Designs &amp; deliverables</CareTag>
          <h1 className="subhead mt-2">Everything we&apos;ve made you.</h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ash-300">
            Yours to keep, download, and reuse — even the source files.
            Need something new? Request it and we&apos;ll build it.
          </p>
        </div>
      </div>

      <section className="mt-8" aria-label="Design requests">
        <RequestDesign orgId={org.id} userId={profile.id} demo={isDemoMode} />
        {requests.length > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            {requests.map((r) => (
              <GlassPanel
                key={r.id}
                radius="md"
                depth="far"
                contentClassName="flex items-center justify-between gap-4 px-6 py-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {r.title}
                  </p>
                  <p className="text-xs capitalize text-ash-300">{r.kind}</p>
                </div>
                <span
                  className={`status-chip ${designRequestStatus[r.status].cls}`}
                >
                  {designRequestStatus[r.status].label}
                </span>
              </GlassPanel>
            ))}
          </div>
        )}
      </section>

      {content.length === 0 && (
        <EmptySlot title="Deliverables" className="mt-8">
          Finished work lands here — designs, photos, video, documents —
          with source files attached.
        </EmptySlot>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.map((piece) => {
          const status = contentStatus[piece.status];
          const ready = piece.status === "delivered";
          return (
            <GlassPanel
              key={piece.id}
              depth="mid"
              radius="lg"
              contentClassName="flex h-full flex-col p-5"
            >
              <div
                className="flex aspect-video items-end rounded-[var(--r-sm)] p-3"
                style={{ background: KIND_TINT[piece.kind] }}
                aria-hidden
              >
                <span className="care-tag" style={{ color: "var(--rust-200)" }}>
                  {piece.kind}
                </span>
              </div>
              <h2 className="mt-4 flex-1 text-sm font-medium leading-snug text-white">
                {piece.title}
              </h2>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className={`status-chip ${status.cls}`}>
                  {status.label}
                </span>
                {ready ? (
                  <button className="btn btn-ghost px-4 py-1.5 text-xs">
                    Download
                  </button>
                ) : (
                  <span className="text-xs text-ash-300">In production</span>
                )}
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </div>
  );
}
