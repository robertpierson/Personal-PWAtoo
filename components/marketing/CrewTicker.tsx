const AUDIENCES = [
  "Startups",
  "Nonprofits",
  "Community orgs",
  "Local businesses",
  "Student orgs",
  "Sports clubs",
  "Creators",
  "Event series",
  "Professional associations",
  "Robotics teams",
  "Side projects",
  "Anything you're actually building",
];

/** Audience list as slow-scrolling clay tag chips (paused for reduced motion). */
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
