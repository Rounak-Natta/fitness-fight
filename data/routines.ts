export type DayKey = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type Routine = {
  day: DayKey;
  shortDay: string;
  title: string;
  description: string;
  exerciseIds: string[];
};

export const routines: Record<DayKey, Routine> = {
  monday: {
    day: "monday", shortDay: "Mon", title: "Full Body + Boxing", description: "Build strength, move better, learn the basics.",
    exerciseIds: ["march-place", "arm-circles", "hip-circles", "bodyweight-squat", "easy-pushups", "shadowboxing-light", "squat", "pushups", "lat-pulldown", "rdl", "plank", "jab", "jab-cross", "jab-cross-hook"],
  },
  tuesday: {
    day: "tuesday", shortDay: "Tue", title: "Light Full Body + Footwork", description: "Stay fresh while sharpening balance and footwork.",
    exerciseIds: ["bodyweight-squat", "pushups-light", "reverse-lunge", "row", "dead-bug", "stance-guard", "forward-back", "lateral-move", "pivot", "jab-moving"],
  },
  wednesday: {
    day: "wednesday", shortDay: "Wed", title: "Full Body + Kicks", description: "Build controlled strength and basic kicking mechanics.",
    exerciseIds: ["goblet-squat", "incline-press", "lat-pulldown", "db-row", "hanging-knee-raise", "front-kick-chamber", "front-kick", "round-kick", "knee-raises"],
  },
  thursday: {
    day: "thursday", shortDay: "Thu", title: "Recovery + Movement", description: "Restore range of motion and practice relaxed movement.",
    exerciseIds: ["arm-circles", "hip-circles", "ankle-mobility", "hamstring-mobility", "hip-flexor-stretch", "thoracic-rotation", "forward-back", "lateral-move", "diagonal-move", "pivot", "shadowboxing-light"],
  },
  friday: {
    day: "friday", shortDay: "Fri", title: "Full Body + Boxing", description: "Repeat the big patterns and layer movement into boxing.",
    exerciseIds: ["squat", "pushups", "lat-pulldown", "rdl", "lateral-raise", "plank-long", "jab-moving", "jab-cross", "jab-cross-hook", "slip-combo", "shadowboxing-light"],
  },
  saturday: {
    day: "saturday", shortDay: "Sat", title: "Athletic + Martial Arts", description: "A light athletic circuit with technical martial-arts practice.",
    exerciseIds: ["bodyweight-squat", "pushups-10", "lunges", "row", "plank-30", "forward-back", "jab-cross-hook", "front-kick", "knee-raises", "technical-standup", "shadowboxing-light"],
  },
  sunday: {
    day: "sunday", shortDay: "Sun", title: "Recovery", description: "Recover, move gently, and keep the basics familiar.",
    exerciseIds: ["walk-10", "mobility-10", "martial-light-10"],
  },
};

export const weekProgression = [
  { week: 1, name: "Foundation", note: "Learn the movements and finish each session with control.", volume: 1 },
  { week: 2, name: "Clean technique", note: "Repeat the same patterns and make every rep cleaner.", volume: 1 },
  { week: 3, name: "Comfortable reps", note: "Increase reps where comfortable without grinding.", volume: 1.05 },
  { week: 4, name: "Small progression", note: "Add a small amount of reps or resistance when form is steady.", volume: 1.05 },
  { week: 5, name: "Stronger repeat", note: "Repeat with slightly stronger loads or cleaner reps.", volume: 1.1 },
  { week: 6, name: "Progress again", note: "Make another modest progression only where it feels controlled.", volume: 1.1 },
  { week: 7, name: "Strongest controlled week", note: "Use your strongest controlled version of each movement.", volume: 1.15 },
  { week: 8, name: "Consolidation", note: "Reduce volume slightly and finish the block feeling fresh.", volume: 0.85 },
] as const;

export const dayOrder: DayKey[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
