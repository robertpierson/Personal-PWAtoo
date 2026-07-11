import type { Metadata, Viewport } from "next";
import { satoshi, tanker, mono } from "./fonts";
import { GlassFilters } from "@/components/glass/GlassFilters";
import { brand } from "@/brand.config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.tagline}`,
  description: `We run the site, the socials, and the reporting for your club, org, or startup — so it grows, and you finish the semester with numbers you can defend in an interview. ${brand.promise}`,
};

export const viewport: Viewport = {
  themeColor: "#22201f", // --ink-800, brand ink
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${tanker.variable} ${mono.variable}`}
    >
      <body>
        <GlassFilters />
        {children}
      </body>
    </html>
  );
}
