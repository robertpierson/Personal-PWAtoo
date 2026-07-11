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
  themeColor: "#f4f0e7", // --ink-800, brand cream (light default)
};

// Applies the saved theme before first paint so dark mode never flashes
// light. Runs inline in <head>; localStorage key: "bandana-theme".
const themeBoot = `try{var t=localStorage.getItem("bandana-theme");if(t==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${tanker.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <GlassFilters />
        {children}
      </body>
    </html>
  );
}
