import type { Exercise } from "@/data/exercises";

type Pt = [number, number];
type StandingPose = {
  head: Pt;
  neck: Pt;
  hip: Pt;
  elbowL: Pt;
  handL: Pt;
  elbowR: Pt;
  handR: Pt;
  kneeL: Pt;
  footL: Pt;
  kneeR: Pt;
  footR: Pt;
};

const BASE: StandingPose = {
  head: [100, 42],
  neck: [100, 58],
  hip: [100, 122],
  elbowL: [82, 80],
  handL: [80, 104],
  elbowR: [118, 80],
  handR: [120, 104],
  kneeL: [92, 164],
  footL: [88, 206],
  kneeR: [108, 164],
  footR: [112, 206],
};

/** Two-pose (start / movement) definitions for every standing movement family. */
const STANDING_POSES: Record<string, { start: StandingPose; end: StandingPose }> = {
  squat: {
    start: BASE,
    end: {
      head: [100, 74], neck: [100, 88], hip: [100, 150],
      elbowL: [66, 112], handL: [56, 122], elbowR: [134, 112], handR: [144, 122],
      kneeL: [78, 176], footL: [80, 206], kneeR: [122, 176], footR: [120, 206],
    },
  },
  push: {
    start: {
      ...BASE,
      elbowL: [74, 100], handL: [86, 112], elbowR: [126, 100], handR: [114, 112],
    },
    end: {
      ...BASE,
      elbowL: [66, 92], handL: [58, 96], elbowR: [134, 92], handR: [142, 96],
    },
  },
  pull: {
    start: {
      ...BASE,
      elbowL: [72, 96], handL: [62, 110], elbowR: [128, 96], handR: [138, 110],
    },
    end: {
      head: [98, 44], neck: [98, 60], hip: [102, 122],
      elbowL: [80, 92], handL: [90, 116], elbowR: [120, 92], handR: [110, 116],
      kneeL: BASE.kneeL, footL: BASE.footL, kneeR: BASE.kneeR, footR: BASE.footR,
    },
  },
  hinge: {
    start: BASE,
    end: {
      head: [82, 78], neck: [88, 92], hip: [110, 128],
      elbowL: [78, 130], handL: [78, 158], elbowR: [92, 130], handR: [92, 158],
      kneeL: [90, 168], footL: [88, 206], kneeR: [110, 168], footR: [112, 206],
    },
  },
  lunge: {
    start: BASE,
    end: {
      head: [92, 62], neck: [92, 76], hip: [96, 132],
      elbowL: [78, 108], handL: [70, 128], elbowR: [110, 108], handR: [118, 128],
      kneeL: [76, 172], footL: [66, 206], kneeR: [124, 190], footR: [150, 208],
    },
  },
  raise: {
    start: {
      ...BASE,
      elbowL: [86, 128], handL: [84, 148], elbowR: [114, 128], handR: [116, 148],
    },
    end: {
      ...BASE,
      elbowL: [66, 100], handL: [50, 100], elbowR: [134, 100], handR: [150, 100],
    },
  },
  box: {
    start: {
      ...BASE,
      elbowL: [78, 96], handL: [86, 82], elbowR: [122, 96], handR: [114, 82],
    },
    end: {
      ...BASE,
      elbowL: [78, 96], handL: [86, 82], elbowR: [138, 90], handR: [162, 88],
    },
  },
  kick: {
    start: {
      ...BASE,
      elbowL: [80, 94], handL: [88, 80], elbowR: [120, 94], handR: [112, 80],
    },
    end: {
      head: [96, 46], neck: [96, 62], hip: [100, 120],
      elbowL: [80, 96], handL: [88, 82], elbowR: [118, 100], handR: [110, 88],
      kneeL: [90, 160], footL: [86, 206], kneeR: [138, 130], footR: [168, 122],
    },
  },
  footwork: {
    start: BASE,
    end: {
      ...BASE,
      hip: [104, 122],
      kneeL: [76, 160], footL: [64, 202], kneeR: [126, 170], footR: [148, 210],
    },
  },
  mobility: {
    start: {
      ...BASE,
      elbowL: [88, 132], handL: [86, 152], elbowR: [112, 132], handR: [114, 152],
    },
    end: {
      ...BASE,
      elbowL: [84, 68], handL: [76, 48], elbowR: [116, 68], handR: [124, 48],
    },
  },
  walk: {
    start: {
      ...BASE,
      elbowL: [82, 96], handL: [92, 118], elbowR: [118, 96], handR: [108, 118],
      kneeL: [84, 162], footL: [78, 206], kneeR: [116, 168], footR: [126, 202],
    },
    end: {
      ...BASE,
      elbowL: [118, 96], handL: [108, 118], elbowR: [82, 96], handR: [92, 118],
      kneeL: [116, 168], footL: [126, 202], kneeR: [84, 162], footR: [78, 206],
    },
  },
};

function limb(a: Pt, b: Pt, c: Pt) {
  return `M ${a[0]} ${a[1]} Q ${b[0]} ${b[1]} ${c[0]} ${c[1]}`;
}

function StandingFigure({ pose, color, opacity = 1 }: { pose: StandingPose; color: string; opacity?: number }) {
  const shoulder = pose.neck;
  return (
    <g opacity={opacity} stroke={color} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={`M ${pose.neck[0]} ${pose.neck[1]} L ${pose.hip[0]} ${pose.hip[1]}`} strokeWidth={13} />
      <path d={limb(shoulder, pose.elbowL, pose.handL)} />
      <path d={limb(shoulder, pose.elbowR, pose.handR)} />
      <path d={limb(pose.hip, pose.kneeL, pose.footL)} strokeWidth={11} />
      <path d={limb(pose.hip, pose.kneeR, pose.footR)} strokeWidth={11} />
      <circle cx={pose.head[0]} cy={pose.head[1]} r={15} fill={color} stroke="none" />
    </g>
  );
}

/** Floor-based families (plank / core / ground) get a hand-authored horizontal pictogram instead. */
function FloorFigure({ family, color, ghost }: { family: string; color: string; ghost: string }) {
  if (family === "plank") {
    return (
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M56 150 L150 108" stroke={ghost} strokeWidth={9} opacity={0.5} />
        <path d="M56 150 L36 168" stroke={ghost} strokeWidth={9} opacity={0.5} />
        <path d="M150 108 L166 96" stroke={ghost} strokeWidth={9} opacity={0.5} />
        <circle cx={150} cy={96} r={13} fill={ghost} opacity={0.5} />
        <path d="M50 140 L146 118" stroke={color} strokeWidth={13} />
        <path d="M50 140 L34 168" stroke={color} strokeWidth={11} />
        <path d="M146 118 L160 96" stroke={color} strokeWidth={11} />
        <circle cx={160} cy={94} r={15} fill={color} />
      </g>
    );
  }
  if (family === "core") {
    return (
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 150 L150 150" stroke={ghost} strokeWidth={13} opacity={0.45} />
        <circle cx={168} cy={150} r={13} fill={ghost} opacity={0.45} />
        <path d="M60 150 L150 150" stroke={color} strokeWidth={13} />
        <path d="M150 150 Q 128 108 96 108" stroke={color} strokeWidth={10} />
        <path d="M60 150 Q 84 116 118 118" stroke={color} strokeWidth={10} />
        <circle cx={168} cy={150} r={15} fill={color} />
      </g>
    );
  }
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M56 168 L150 168" stroke={ghost} strokeWidth={13} opacity={0.45} />
      <circle cx={168} cy={168} r={13} fill={ghost} opacity={0.45} />
      <path d="M60 120 Q 96 70 150 78" stroke={color} strokeWidth={12} />
      <path d="M60 120 L48 150" stroke={color} strokeWidth={10} />
      <path d="M150 78 L172 66" stroke={color} strokeWidth={10} />
      <circle cx={172} cy={62} r={15} fill={color} />
      <path d="M60 120 Q 90 150 130 148" stroke={color} strokeWidth={10} opacity={0.9} />
    </g>
  );
}

/**
 * Clean, hand-tuned before/after movement pictogram. Replaces the previous
 * per-exercise generated SVG files with a single component driven by the
 * exercise's `visual` family, so every illustration shares one consistent
 * style and can be restyled from one place.
 */
export function PoseFigure({ exercise, color }: { exercise: Exercise; color: string }) {
  const ghost = `color-mix(in srgb, ${color} 34%, transparent)`;
  const isFloor = exercise.visual === "plank" || exercise.visual === "core" || exercise.visual === "ground";
  const pair = STANDING_POSES[exercise.visual] ?? STANDING_POSES.mobility;

  return (
    <svg viewBox="0 0 220 220" className="h-full w-full" role="img" aria-label={`${exercise.name} movement illustration`}>
      <ellipse cx="110" cy="212" rx="86" ry="7" fill={color} opacity="0.08" />
      {isFloor ? (
        <FloorFigure family={exercise.visual} color={color} ghost={ghost} />
      ) : (
        <>
          <StandingFigure pose={pair.start} color={ghost} />
          <path
            d="M118 96 C 140 78, 160 78, 178 92"
            fill="none"
            stroke={color}
            strokeWidth={3}
            strokeDasharray="1 8"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path d="M170 82 L182 92 L168 100" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" opacity="0.65" />
          <StandingFigure pose={pair.end} color={color} />
        </>
      )}
    </svg>
  );
}
