import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ThemeSync } from "@/components/app-shell/theme-sync";

export const metadata: Metadata = {
  applicationName: "Lean Fighter",
  title: { default: "Lean Fighter", template: "%s · Lean Fighter" },
  description: "Your simple daily strength and martial-arts routine.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Lean Fighter", statusBarStyle: "default" },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
    { media: "(prefers-color-scheme: dark)", color: "#151713" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
