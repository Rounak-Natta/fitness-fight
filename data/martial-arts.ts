export type MartialTechnique = { id: string; name: string };

export const martialArtsLibrary: Record<string, MartialTechnique[]> = {
  Boxing: [
    { id: "stance", name: "Stance" },
    { id: "guard", name: "Guard" },
    { id: "jab", name: "Jab" },
    { id: "cross", name: "Cross" },
    { id: "hook", name: "Hook" },
    { id: "uppercut", name: "Uppercut" },
    { id: "slip", name: "Slip" },
    { id: "roll", name: "Roll" },
    { id: "pivot", name: "Pivot" },
    { id: "forward-back", name: "Forward / backward movement" },
    { id: "lateral-move", name: "Lateral movement" },
    { id: "shadowboxing-light", name: "Shadowboxing" },
  ],
  Kicking: [
    { id: "knee-raises", name: "Knee raise" },
    { id: "front-kick", name: "Front kick / teep" },
    { id: "round-kick", name: "Round kick" },
    { id: "knee-raises", name: "Controlled knee" },
    { id: "kick-recovery", name: "Kick recovery" },
  ],
  "Ground movement": [
    { id: "technical-standup", name: "Technical stand-up" },
    { id: "bridge", name: "Bridge" },
    { id: "hip-escape", name: "Hip escape / shrimp" },
    { id: "sprawl", name: "Sprawl movement" },
  ],
};

export const martialArtsSafety = "Solo practice develops movement and coordination. For real self-defense skills, train with a qualified martial-arts instructor and partner.";
