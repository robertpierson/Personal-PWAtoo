import { GlassPanel } from "@/components/glass/GlassPanel";
import { CareTag } from "@/components/CareTag";
import { getContent } from "@/lib/data";
import { contentStatus } from "@/lib/status";

const KIND_TINT: Record<string, string> = {
  design: "linear-gradient(140deg, var(--clay-600), var(--rust-700))",
  photo: "linear-gradient(140deg, var(--rust-700), var(--graphite-600))",
  video: "linear-gradient(140deg, var(--graphite-600), var(--clay-600))",
  document: "linear-gradient(140deg, var(--ink-700), var(--rust-700))",
};

export default async function DesignsPage() {
  const content = await getContent();

  return (
    <div className="mx-auto max-w-5xl">
      <CareTag>Designs &amp; deliverables</CareTag>
      <h1 className="subhead mt-2">Everything we&apos;ve made you.</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ash-300">
        Yours to keep, download, and reuse — even the source files.
      </p>

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
                <span className="care-tag" style={{ color: "var(--cream-200)" }}>
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
