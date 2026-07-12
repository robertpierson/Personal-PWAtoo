import { GlassPanel } from "@/components/glass/GlassPanel";

/**
 * The Bandana Awards — bronze, silver, gold recognition for client
 * orgs that shipped. Photo frames are placeholders until we have real
 * winners to show. [FILL: winner photos at public/awards/*.jpg]
 */
const TIERS = [
  {
    name: "Bronze",
    color: "var(--brick)",
    line: "A full quarter of consistent, shipped work.",
  },
  {
    name: "Silver",
    color: "var(--ash-300)",
    line: "Sustained growth across two consecutive reports.",
  },
  {
    name: "Gold",
    color: "var(--gold)",
    line: "The year's standout — real numbers, real growth, all receipts.",
  },
];

export function AwardsShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {TIERS.map((tier) => (
        <GlassPanel
          key={tier.name}
          depth="mid"
          radius="lg"
          contentClassName="flex h-full flex-col p-7"
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="grid h-10 w-10 place-items-center rounded-full"
              style={{
                color: tier.color,
                boxShadow: `inset 0 0 0 2px ${tier.color}`,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 3h10v5a5 5 0 0 1-10 0V3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 15h4v4h3v2H7v-2h3v-4Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
          </div>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-ash-300">
            {tier.line}
          </p>
          <div
            className="mt-5 grid aspect-video place-items-center rounded-[var(--r-sm)] text-center text-xs text-ash-300"
            style={{
              border:
                "1.5px dashed color-mix(in srgb, var(--white) 18%, transparent)",
            }}
          >
            Photo — a winner holding the {tier.name.toLowerCase()} award
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}
