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

export const mono = GeistMono;
