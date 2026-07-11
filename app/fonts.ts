import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";

/** Satoshi (Fontshare) — brand typeface for display and body. */
export const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

/** Tanker (Fontshare) — heavy utility display face, H1/H2 only. */
export const tanker = localFont({
  src: [{ path: "./fonts/Tanker-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-tanker",
  display: "swap",
});

export const mono = GeistMono;
