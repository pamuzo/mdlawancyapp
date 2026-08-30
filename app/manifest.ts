import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MD Lawancy",
    short_name: "MD Lawancy",
    description:
      "MD Lawancy - One shop for all your printing, graphic, branding, monogram services",
    start_url: "/",
    display: "standalone",
    background_color: "#00425a",
    theme_color: "#000000",
    orientation: "portrait",
    categories: ["business", "productivity"],

    icons: [
      {
        src: "/images/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
