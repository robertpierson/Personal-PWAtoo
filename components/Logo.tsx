/**
 * Bandana mark, per the brand board: letter B + folded bandana +
 * knot/connection + growth/direction, resolved as two interlocking
 * folded halves meeting at the center. Colors come from tokens.
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
        {/* left fold — points in */}
        <path
          d="M5 7.5 15.2 15.1 5 15.1 Z M5 16.9 15.2 16.9 5 24.5 Z"
          fill="var(--paper)"
        />
        {/* right fold — mirrored, clay accent tips */}
        <path
          d="M27 7.5 16.8 15.1 27 15.1 Z M27 16.9 16.8 16.9 27 24.5 Z"
          fill="var(--clay-500)"
        />
      </svg>
      {wordmark && (
        <span
          className="text-white"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 640,
            fontSize: `${size * 0.56}px`,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Bandana
        </span>
      )}
    </span>
  );
}
