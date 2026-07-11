import { CareTag } from "@/components/CareTag";

export type TimelineStep = { title: string; body: string };

/**
 * The four marks that build the logo (B, folded bandana, knot,
 * growth chevron) serve as step markers instead of numbers.
 */
const GLYPHS = [
  // B
  <text
    key="b"
    x="12"
    y="17"
    textAnchor="middle"
    fontFamily="var(--font-mono)"
    fontSize="15"
    fontWeight="700"
    fill="currentColor"
  >
    B
  </text>,
  // folded bandana
  <path
    key="fold"
    d="M17 5 7 12 17 19"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinejoin="round"
  />,
  // knot / connection
  <path
    key="knot"
    d="M12 4.5 19.5 12 12 19.5 4.5 12Z"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinejoin="round"
  />,
  // growth / direction
  <path
    key="chevron"
    d="M5 16 12 8 19 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinejoin="round"
  />,
];

/** Vertical gold-stitch hairline; logo-story glyphs as thread nodes. */
export function StitchedTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="relative">
      <div
        className="stitch-line absolute bottom-8 left-[15px] top-8"
        aria-hidden
      />
      {steps.map((step, i) => (
        <li key={step.title} className="relative flex gap-6 pb-10 last:pb-0">
          <span
            aria-hidden
            className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink-800"
            style={{
              color: "var(--gold)",
              boxShadow:
                "inset 0 0 0 1.5px var(--gold), 0 0 0 4px var(--ink-900)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24">
              {GLYPHS[i % GLYPHS.length]}
            </svg>
          </span>
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
