"use client";

import { useEffect } from "react";
import { useAppData } from "@/lib/use-app-data";

export function ThemeSync() {
  const data = useAppData();

  useEffect(() => {
    if (!data) return;
    const root = document.documentElement;
    const apply = () => {
      const dark = data.settings.appearance === "dark" ||
        (data.settings.appearance === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      root.classList.toggle("dark", dark);
    };
    apply();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [data]);

  return null;
}
