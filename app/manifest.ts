import type { MetadataRoute } from "next";
import { brand } from "@/brand.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.name,
    description: `${brand.tagline} ${brand.promise}`,
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#22201f", // --ink-800, brand black
    theme_color: "#22201f",
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
