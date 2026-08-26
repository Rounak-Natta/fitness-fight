import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lean Fighter",
    short_name: "Lean Fighter",
    description: "Your simple daily strength and martial-arts routine.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f3ef",
    theme_color: "#6f873d",
    orientation: "portrait",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
