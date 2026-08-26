"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Dumbbell, Settings, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { href: "/", label: "Today", icon: Dumbbell },
  { href: "/plan", label: "Plan", icon: CalendarDays },
  { href: "/progress", label: "Progress", icon: TrendingUp },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="app-frame">
      <main className="min-h-dvh px-4 pb-28 pt-5 sm:px-5">{children}</main>
      <nav className="bottom-nav fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[480px] border-t border-line bg-[color:var(--panel)]/95 px-2 pt-2 backdrop-blur" aria-label="Primary navigation">
        <div className="grid grid-cols-4 gap-1">
          {tabs.map((tab) => {
            const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
            const Icon = tab.icon;
            return (
              <Link key={tab.href} href={tab.href} className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-2 text-[11px] font-medium transition ${active ? "subtle accent" : "muted"}`} aria-current={active ? "page" : undefined}>
                <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
