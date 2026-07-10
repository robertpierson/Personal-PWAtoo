const AUDIENCES = [
  "Nonprofits",
  "PTAs",
  "Youth leagues",
  "Community groups",
  "Local businesses",
  "Startups",
  "Student communities",
  "Booster clubs",
  "Neighborhood associations",
  "Food pantries",
  "Rec centers",
  "Church groups",
];

/** Audience list as slow-scrolling denim tag chips (paused for reduced motion). */
export function CrewTicker() {
  return (
    <div
      className="overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
      aria-label={`Who we work with: ${AUDIENCES.join(", ")}`}
    >
      <div className="ticker-track" aria-hidden>
        {[...AUDIENCES, ...AUDIENCES].map((a, i) => (
          <span key={i} className="ticker-chip">
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}
