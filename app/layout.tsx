import type { Metadata, Viewport } from "next";
import { satoshi, mono } from "./fonts";
import { GlassFilters } from "@/components/glass/GlassFilters";
import { brand } from "@/brand.config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.tagline}`,
  description: `Done-for-you online presence for local organizations: nonprofits, PTAs, youth leagues, community groups, and local businesses. ${brand.promise}`,
};

export const viewport: Viewport = {
  themeColor: "#22201f", // --ink-800, brand black
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${mono.variable}`}
    >
      <body>
        <GlassFilters />
        {children}
      </body>
    </html>
  );
}
