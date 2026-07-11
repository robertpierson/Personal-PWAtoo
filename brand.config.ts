/**
 * Bandana — brand configuration.
 * Single source of truth for name, voice lines, and accent identity.
 * Visual tokens live in app/globals.css; this file names them.
 */
export const brand = {
  name: "Bandana",
  tagline: "Run something real. Keep the receipts.",
  promise: "Nothing publishes without your review.",
  accent: "rust" as const,
  /** Token names (CSS custom properties) that define the accent ramp. */
  accentRamp: [
    "--brick",
    "--rust-500",
    "--rust-400",
    "--rust-300",
    "--rust-200",
  ],
  /** One color, one job: olive = growth delta, gold = résumé emphasis. */
  microAccents: ["--olive", "--gold"],
} as const;

export type Brand = typeof brand;
