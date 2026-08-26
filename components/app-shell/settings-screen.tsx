"use client";

import { useState } from "react";
import { AlertTriangle, Check, ChevronRight, Info, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/app-shell/app-shell";
import { resetProgress, updateStoredData, type AppSettings } from "@/lib/storage";
import { useAppData } from "@/lib/use-app-data";

const appearanceOptions: AppSettings["appearance"][] = ["system", "light", "dark"];
const restOptions: AppSettings["restTimer"][] = [30, 45, 60, 90];

export function SettingsScreen() {
  const data = useAppData();
  const [confirmReset, setConfirmReset] = useState(false);
  const settings = data?.settings ?? { appearance: "system" as const, restTimer: 60 as const, haptics: true };

  return (
    <AppShell>
      <header className="mb-6">
        <p className="accent text-xs font-semibold uppercase tracking-[.16em]">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-.035em]">Keep it comfortable.</h1>
      </header>

      <SettingsGroup title="Appearance">
        <div className="grid grid-cols-3 gap-2">
          {appearanceOptions.map((option) => (
            <button key={option} onClick={() => updateStoredData((current) => ({ ...current, settings: { ...current.settings, appearance: option } }))} className={`min-h-12 rounded-xl border px-3 text-sm font-medium capitalize ${settings.appearance === option ? "border-transparent bg-[color:var(--accent)] text-white" : "border-line subtle"}`}>
              {option}
            </button>
          ))}
        </div>
      </SettingsGroup>

      <SettingsGroup title="Rest timer">
        <div className="grid grid-cols-4 gap-2">
          {restOptions.map((seconds) => (
            <button key={seconds} onClick={() => updateStoredData((current) => ({ ...current, settings: { ...current.settings, restTimer: seconds } }))} className={`min-h-12 rounded-xl border px-2 text-sm font-medium ${settings.restTimer === seconds ? "border-transparent bg-[color:var(--accent)] text-white" : "border-line subtle"}`}>
              {seconds}s
            </button>
          ))}
        </div>
      </SettingsGroup>

      <SettingsGroup title="Workout">
        <div className="flex min-h-14 items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Workout duration</p>
            <p className="muted mt-1 text-xs">Target: ~30 minutes</p>
          </div>
          <Check className="accent" size={18} />
        </div>
        <div className="mt-2 flex min-h-14 items-center justify-between gap-3 border-t border-line pt-2">
          <div>
            <p className="text-sm font-medium">Haptics</p>
            <p className="muted mt-1 text-xs">Browser vibration where supported</p>
          </div>
          <button onClick={() => updateStoredData((current) => ({ ...current, settings: { ...current.settings, haptics: !current.settings.haptics } }))} className={`relative h-8 w-14 rounded-full transition ${settings.haptics ? "bg-[color:var(--accent)]" : "subtle border border-line"}`} aria-pressed={settings.haptics} aria-label="Toggle haptics">
            <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${settings.haptics ? "left-7" : "left-1"}`} />
          </button>
        </div>
      </SettingsGroup>

      <SettingsGroup title="About">
        <div className="flex items-start gap-3">
          <Info className="accent mt-0.5 shrink-0" size={20} />
          <div>
            <p className="text-sm font-medium">Lean Fighter Routine</p>
            <p className="muted mt-1 text-xs">Version 1.0.0</p>
            <p className="muted mt-3 text-sm leading-6">This app provides general fitness and movement guidance, not medical advice. Start gradually, use controlled technique, and stop if you experience pain, dizziness, or unusual symptoms. For actual self-defense training, work with a qualified instructor.</p>
          </div>
        </div>
      </SettingsGroup>

      <section className="mt-7">
        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-[.14em] text-[color:var(--danger)]">Danger zone</p>
        <button className="surface flex min-h-14 w-full items-center gap-3 rounded-2xl px-4 text-left" onClick={() => setConfirmReset(true)}>
          <RotateCcw size={18} className="text-[color:var(--danger)]" />
          <span className="flex-1 text-sm font-medium text-[color:var(--danger)]">Reset progress</span>
          <ChevronRight size={17} className="muted" />
        </button>
      </section>

      {confirmReset && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label="Reset progress confirmation">
          <div className="w-full max-w-[480px] rounded-t-[28px] bg-[color:var(--panel)] p-5 sm:rounded-[28px]">
            <AlertTriangle className="text-[color:var(--danger)]" size={26} />
            <h2 className="mt-4 text-xl font-semibold">Reset all progress?</h2>
            <p className="muted mt-2 text-sm leading-6">Completed sessions, the current workout, and milestone values will be removed from this device. Your settings will stay.</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button className="surface min-h-12 rounded-xl text-sm font-semibold" onClick={() => setConfirmReset(false)}>Cancel</button>
              <button className="min-h-12 rounded-xl bg-[color:var(--danger)] text-sm font-semibold text-white" onClick={() => { resetProgress(); setConfirmReset(false); }}>Reset</button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function SettingsGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h2 className="muted mb-2 px-1 text-xs font-semibold uppercase tracking-[.14em]">{title}</h2>
      <div className="surface rounded-2xl p-4">{children}</div>
    </section>
  );
}
