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
        {/* two crossing folds — X mark with knot diamond at center */}
        <path
          d="M6 6 L20 16 6 26 6 21 13 16 6 11 Z"
          fill="var(--paper)"
        />
        <path
          d="M26 6 L12 16 26 26 26 21 19 16 26 11 Z"
          fill="var(--paper)"
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
