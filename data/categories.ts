import {
  Dumbbell,
  Flame,
  Footprints,
  Hand,
  Layers,
  Moon,
  Shield,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { ExerciseCategory } from "@/data/exercises";

export type CategoryMeta = {
  label: string;
  short: string;
  icon: LucideIcon;
  /** Muted, sober accent color used for chips, icons, and illustration tint. */
  color: string;
};

export const categoryMeta: Record<ExerciseCategory, CategoryMeta> = {
  warmup: { label: "Warm-up", short: "Warm-up", icon: Flame, color: "#b9863d" },
  strength: { label: "Strength", short: "Strength", icon: Dumbbell, color: "#6f873d" },
  core: { label: "Core", short: "Core", icon: Shield, color: "#3f8f83" },
  mobility: { label: "Mobility", short: "Mobility", icon: Wind, color: "#4d7ea8" },
  boxing: { label: "Boxing", short: "Boxing", icon: Hand, color: "#a2483f" },
  kicking: { label: "Kicking", short: "Kicking", icon: Footprints, color: "#b9662f" },
  movement: { label: "Footwork", short: "Footwork", icon: Footprints, color: "#7a6bb0" },
  ground: { label: "Ground movement", short: "Ground", icon: Layers, color: "#7c6b53" },
  recovery: { label: "Recovery", short: "Recovery", icon: Moon, color: "#5c6f8a" },
};

export function categoryColor(category: ExerciseCategory) {
  return categoryMeta[category]?.color ?? "#6f873d";
}
