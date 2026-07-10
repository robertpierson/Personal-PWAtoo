/**
 * Bandana — brand configuration.
 * Single source of truth for name, voice lines, and accent identity.
 * Visual tokens live in app/globals.css; this file names them.
 */
export const brand = {
  name: "Bandana",
  tagline: "Your whole online presence. One crew.",
  promise: "Nothing publishes without your review.",
  accent: "denim" as const,
  /** Token names (CSS custom properties) that define the accent ramp. */
  accentRamp: [
    "--indigo-raw",
    "--denim-600",
    "--denim-500",
    "--denim-400",
    "--chambray-300",
    "--wash-200",
  ],
  microAccents: ["--selvedge", "--topstitch"],
} as const;

export type Brand = typeof brand;
