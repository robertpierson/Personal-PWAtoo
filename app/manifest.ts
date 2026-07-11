import type { MetadataRoute } from "next";
import { brand } from "@/brand.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.name,
    description: `${brand.tagline} ${brand.promise}`,
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#f4f0e7", // --ink-800, brand cream (light default)
    theme_color: "#f4f0e7",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
