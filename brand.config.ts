/**
 * Bandana — brand configuration.
 * Single source of truth for name, voice lines, and accent identity.
 * Visual tokens live in app/globals.css; this file names them.
 */
export const brand = {
  name: "Bandana",
  tagline: "Marketing that makes an impact.",
  promise: "Nothing publishes without your review.",
  accent: "clay" as const,
  /** Token names (CSS custom properties) that define the accent ramp. */
  accentRamp: [
    "--rust-700",
    "--clay-600",
    "--clay-500",
    "--clay-400",
    "--sand-300",
    "--cream-200",
  ],
  microAccents: ["--selvedge", "--topstitch"],
} as const;

export type Brand = typeof brand;
