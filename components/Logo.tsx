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
        viewBox="0 0 240 240"
        fill="none"
        aria-hidden
      >
        {/* brand X mark: crossing folds, Z-kinked lower arms,
            knot diamond in the negative space */}
        <g
          stroke="currentColor"
          strokeWidth="22"
          strokeLinejoin="round"
          strokeLinecap="butt"
        >
          <path d="M30 32 112 90" />
          <path d="M210 32 128 90" />
          <path d="M102 112 48 128 110 162 28 212" />
          <path d="M138 112 192 128 130 162 212 212" />
        </g>
      </svg>
      {wordmark && (
        <span
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
