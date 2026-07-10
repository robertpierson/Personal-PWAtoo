import { CareTag } from "@/components/CareTag";

export type TimelineStep = { title: string; body: string };

/** Vertical topstitch hairline with thread nodes. */
export function StitchedTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="relative">
      <div
        className="stitch-line absolute bottom-4 left-[5px] top-4"
        aria-hidden
      />
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex gap-6 pb-10 last:pb-0">
          <div className="stitch-node relative mt-1.5 shrink-0" aria-hidden />
          <div>
            <CareTag>Step {i + 1}</CareTag>
            <h3 className="mt-1 text-xl font-semibold text-white">
              {step.title}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ash-300">
              {step.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
