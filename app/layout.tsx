import type { Metadata, Viewport } from "next";
import { cabinet, generalSans, mono } from "./fonts";
import { GlassFilters } from "@/components/glass/GlassFilters";
import { brand } from "@/brand.config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.tagline}`,
  description: `Done-for-you online presence for local organizations: nonprofits, PTAs, youth leagues, community groups, and local businesses. ${brand.promise}`,
};

export const viewport: Viewport = {
  themeColor: "#0c0d10", // --ink-900
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cabinet.variable} ${generalSans.variable} ${mono.variable}`}
    >
      <body>
        <GlassFilters />
        {children}
      </body>
    </html>
  );
}
