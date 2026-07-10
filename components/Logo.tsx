/**
 * Bandana mark: a folded kerchief (rotated square) with a topstitch
 * running the inner fold and a selvedge tag at the right point.
 * All colors come from tokens via CSS variables.
 */
export function Logo({
  size = 28,
  wordmark = true,
  className,
}: {
  size?: number;
  wordmark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className ?? ""}`}
      aria-label="Bandana"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="bandana-mark" x1="6" y1="4" x2="26" y2="28">
            <stop offset="0" stopColor="var(--denim-400)" />
            <stop offset="0.55" stopColor="var(--denim-600)" />
            <stop offset="1" stopColor="var(--indigo-raw)" />
          </linearGradient>
        </defs>
        <path
          d="M16 2.6 29.4 16 16 29.4 2.6 16Z"
          fill="url(#bandana-mark)"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M16 7.2 24.8 16 16 24.8 7.2 16Z"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
          strokeLinejoin="round"
          strokeDasharray="2.2 2.6"
          fill="none"
        />
        <rect x="24" y="14.6" width="2.8" height="2.8" fill="var(--selvedge)" />
      </svg>
      {wordmark && (
        <span
          className="text-white"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 760,
            fontSize: `${size * 0.68}px`,
            letterSpacing: "-0.01em",
          }}
        >
          Bandana
        </span>
      )}
    </span>
  );
}
