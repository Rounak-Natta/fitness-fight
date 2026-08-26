export type ExerciseCategory = "warmup" | "strength" | "core" | "mobility" | "boxing" | "kicking" | "movement" | "ground" | "recovery";
export type ExerciseType = "reps" | "timed" | "practice";

export type Exercise = {
  id: string;
  name: string;
  category: ExerciseCategory;
  type: ExerciseType;
  target: string;
  sets?: number;
  repsMin?: number;
  repsMax?: number;
  durationSec?: number;
  instructions: string;
  breathing: string;
  commonMistake: string;
  beginnerVariation: string;
  equipment: string;
  safetyNote?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCredit?: string;
  imageSource?: string;
  imageLicense?: string;
  visual: "squat" | "push" | "pull" | "hinge" | "plank" | "lunge" | "core" | "raise" | "box" | "kick" | "footwork" | "mobility" | "ground" | "walk";
};

const e = (
  id: string, name: string, category: ExerciseCategory, type: ExerciseType, target: string,
  visual: Exercise["visual"], instructions: string, equipment = "None",
  extra: Partial<Exercise> = {},
): Exercise => ({
  id, name, category, type, target, visual, instructions, equipment,
  breathing: extra.breathing ?? "Breathe steadily and avoid holding your breath.",
  commonMistake: extra.commonMistake ?? "Moving too quickly and losing control.",
  beginnerVariation: extra.beginnerVariation ?? "Use a smaller range of motion and slower pace.",
  safetyNote: extra.safetyNote,
  imageUrl: extra.imageUrl,
  imageAlt: extra.imageAlt,
  imageCredit: extra.imageCredit,
  imageSource: extra.imageSource,
  imageLicense: extra.imageLicense,
  sets: extra.sets,
  repsMin: extra.repsMin,
  repsMax: extra.repsMax,
  durationSec: extra.durationSec,
});

export const exercises: Record<string, Exercise> = Object.fromEntries([
  e("march-place", "March / jog in place", "warmup", "timed", "1 min", "walk", "Stay tall and move at an easy pace.", "None", { durationSec: 60 }),
  e("arm-circles", "Arm circles", "warmup", "timed", "30 sec", "mobility", "Make small circles, then gradually larger circles.", "None", { durationSec: 30 }),
  e("hip-circles", "Hip circles", "mobility", "timed", "30 sec", "mobility", "Keep your chest tall and circle the hips smoothly.", "None", { durationSec: 30 }),
  e("ankle-mobility", "Ankle mobility", "mobility", "timed", "60 sec", "mobility", "Drive the knee gently over the toes while keeping the heel down.", "None", { durationSec: 60 }),
  e("hamstring-mobility", "Hamstring mobility", "mobility", "timed", "60 sec", "mobility", "Hinge at the hips with a long spine and light stretch.", "None", { durationSec: 60 }),
  e("hip-flexor-stretch", "Hip flexor stretch", "mobility", "timed", "60 sec", "lunge", "Use a split stance and gently tuck the pelvis.", "None", { durationSec: 60 }),
  e("thoracic-rotation", "Thoracic rotation", "mobility", "timed", "60 sec", "mobility", "Rotate through the upper back without forcing the lower back.", "None", { durationSec: 60 }),
  e("bodyweight-squat", "Bodyweight squat", "strength", "reps", "2 × 15", "squat", "Sit the hips down and back, keep the knees tracking over the toes, then stand tall.", "None", { sets: 2, repsMin: 15, repsMax: 15, imageUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Squats_01.gif", imageAlt: "Animated bodyweight squat demonstration", imageCredit: "Zimmermanns", imageSource: "https://commons.wikimedia.org/wiki/File:Squats_01.gif", imageLicense: "CC BY 3.0" }),
  e("squat", "Squat", "strength", "reps", "3 × 8–12", "squat", "Brace lightly, descend under control, and drive through the whole foot.", "Bodyweight / dumbbell / barbell", { sets: 3, repsMin: 8, repsMax: 12 }),
  e("goblet-squat", "Goblet squat / leg press", "strength", "reps", "3 × 8–12", "squat", "Keep the load close and use a controlled depth you can own.", "Dumbbell / kettlebell / leg press", { sets: 3, repsMin: 8, repsMax: 12 }),
  e("easy-pushups", "Easy push-ups", "warmup", "reps", "5 reps", "push", "Use a comfortable incline or floor version and move smoothly.", "None / bench", { sets: 1, repsMin: 5, repsMax: 5 }),
  e("pushups", "Push-ups / bench press", "strength", "reps", "3 × 6–12", "push", "Keep your body in one line. Lower under control and push the floor away.", "None / bench", { sets: 3, repsMin: 6, repsMax: 12, beginnerVariation: "Incline push-up against a stable bench or table.", commonMistake: "Letting the hips sag or elbows flare excessively.", imageUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Push-up.jpg", imageAlt: "Push-up demonstration", imageCredit: "Uzltt123", imageSource: "https://commons.wikimedia.org/wiki/File:Push-up.jpg", imageLicense: "CC BY-SA 4.0" }),
  e("pushups-light", "Push-ups", "strength", "reps", "2 × 8–12", "push", "Keep the trunk braced and use a range you can control.", "None", { sets: 2, repsMin: 8, repsMax: 12 }),
  e("pushups-10", "Push-ups", "strength", "reps", "2 × 10", "push", "Move with a straight body line and controlled tempo.", "None", { sets: 2, repsMin: 10, repsMax: 10 }),
  e("incline-press", "Incline dumbbell press", "strength", "reps", "3 × 8–12", "push", "Keep shoulder blades supported and press without bouncing.", "Dumbbells + incline bench", { sets: 3, repsMin: 8, repsMax: 12 }),
  e("lat-pulldown", "Lat pulldown / assisted pull-up", "strength", "reps", "3 × 8–12", "pull", "Pull the elbows toward the ribs while keeping the chest relaxed and tall.", "Cable machine / assisted pull-up", { sets: 3, repsMin: 8, repsMax: 12 }),
  e("row", "Dumbbell / cable row", "strength", "reps", "2 × 10–12", "pull", "Keep the torso stable and pull the elbow toward the hip.", "Dumbbell / cable", { sets: 2, repsMin: 10, repsMax: 12 }),
  e("db-row", "Dumbbell row", "strength", "reps", "2 × 8–12", "pull", "Brace the torso, then row smoothly without twisting.", "Dumbbell", { sets: 2, repsMin: 8, repsMax: 12 }),
  e("rdl", "Romanian deadlift", "strength", "reps", "2 × 8–12", "hinge", "Push the hips back with a neutral spine and keep the load close to the legs.", "Dumbbells / barbell", { sets: 2, repsMin: 8, repsMax: 12, safetyNote: "Stop the descent before your back rounds.", imageUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Romanian-deadlift-1.png", imageAlt: "Romanian deadlift exercise demonstration", imageCredit: "Everkinetic", imageSource: "https://commons.wikimedia.org/wiki/File:Romanian-deadlift-1.png", imageLicense: "CC BY-SA 3.0" }),
  e("reverse-lunge", "Reverse lunges", "strength", "reps", "2 × 8 each leg", "lunge", "Step back softly, lower under control, and push through the front foot.", "None / dumbbells", { sets: 2, repsMin: 8, repsMax: 8 }),
  e("lunges", "Lunges", "strength", "reps", "2 × 8 each", "lunge", "Keep balance over the front foot and lower smoothly.", "None / dumbbells", { sets: 2, repsMin: 8, repsMax: 8 }),
  e("plank", "Plank", "core", "timed", "2 × 30–45 sec", "plank", "Squeeze glutes gently and keep ribs stacked over pelvis.", "None", { sets: 2, durationSec: 45 }),
  e("plank-long", "Plank", "core", "timed", "1–2 × 45 sec", "plank", "Hold a strong straight line without shrugging.", "None", { sets: 2, durationSec: 45 }),
  e("plank-30", "Plank", "core", "timed", "2 × 30 sec", "plank", "Brace gently and breathe behind the brace.", "None", { sets: 2, durationSec: 30 }),
  e("dead-bug", "Dead bug", "core", "reps", "2 × 10 each side", "core", "Keep the low back gently supported as opposite arm and leg extend.", "None", { sets: 2, repsMin: 10, repsMax: 10 }),
  e("hanging-knee-raise", "Hanging knee raise", "core", "reps", "2 × 8–12", "core", "Start from a quiet hang and raise the knees without swinging.", "Pull-up bar", { sets: 2, repsMin: 8, repsMax: 12, beginnerVariation: "Use a captain's chair or lying knee raise." }),
  e("lateral-raise", "Lateral raises", "strength", "reps", "2 × 12–15", "raise", "Lift the arms with soft elbows to a comfortable shoulder height.", "Dumbbells", { sets: 2, repsMin: 12, repsMax: 15 }),
  e("stance", "Stance", "boxing", "practice", "2 min", "box", "Set a comfortable staggered base with soft knees and balanced weight.", "None", { durationSec: 120, commonMistake: "Standing too narrow or locking the knees." }),
  e("guard", "Guard", "boxing", "practice", "2 min", "box", "Keep hands comfortably near the face, elbows relaxed, and shoulders down.", "None", { durationSec: 120 }),
  e("shadowboxing-light", "Light shadowboxing", "boxing", "timed", "2 min", "box", "Stay relaxed, return hands to guard, and keep the feet under you.", "None", { durationSec: 120 }),
  e("stance-guard", "Stance + guard", "boxing", "timed", "3 min", "box", "Use a comfortable staggered stance, hands up, chin neutral, shoulders relaxed.", "None", { durationSec: 180 }),
  e("jab", "Jab", "boxing", "practice", "2 min technique", "box", "Extend the lead hand straight and return it immediately to guard.", "None", { durationSec: 120, commonMistake: "Reaching so far that balance is lost." }),
  e("cross", "Cross", "boxing", "practice", "2 min technique", "box", "Rotate the rear hip gently as the rear hand travels straight out and returns to guard.", "None", { durationSec: 120, imageUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cross1.jpg", imageAlt: "Boxing cross demonstration", imageCredit: "Alain Delmas", imageSource: "https://commons.wikimedia.org/wiki/File:Cross1.jpg", imageLicense: "CC BY-SA 3.0" }),
  e("hook", "Hook", "boxing", "practice", "2 min technique", "box", "Turn through the hip and keep the arm compact, then return immediately to guard.", "None", { durationSec: 120 }),
  e("uppercut", "Uppercut", "boxing", "practice", "2 min technique", "box", "Use a small knee and hip drive to guide a compact upward punch through open space.", "None", { durationSec: 120, commonMistake: "Dropping the hand far below guard before the motion." }),
  e("slip", "Slip", "boxing", "practice", "2 min technique", "box", "Move the head a small distance by bending the knees and shifting the torso, then return to stance.", "None", { durationSec: 120 }),
  e("roll", "Roll", "boxing", "practice", "2 min technique", "box", "Trace a small U-shape with the knees and torso while keeping your eyes forward and your base stable.", "None", { durationSec: 120 }),
  e("jab-cross", "Jab → Cross", "boxing", "practice", "2 min technique", "box", "Return each hand to guard and let the rear hip rotate naturally on the cross.", "None", { durationSec: 120 }),
  e("jab-cross-hook", "Jab → Cross → Hook", "boxing", "practice", "2 min technique", "box", "Keep the hook compact and finish balanced in stance.", "None", { durationSec: 120 }),
  e("slip-combo", "Slip → Jab → Cross", "boxing", "practice", "2 min technique", "box", "Use a small head movement from the knees, then return to balanced punches.", "None", { durationSec: 120 }),
  e("forward-back", "Forward / backward movement", "movement", "timed", "3 min", "footwork", "Move the foot closest to the direction first and keep stance width consistent.", "None", { durationSec: 180 }),
  e("lateral-move", "Lateral movement", "movement", "timed", "3 min", "footwork", "Step smoothly without crossing the feet.", "None", { durationSec: 180 }),
  e("diagonal-move", "Diagonal movement", "movement", "timed", "2 min", "footwork", "Move in short diagonal steps and settle back into stance.", "None", { durationSec: 120 }),
  e("pivot", "Pivots", "movement", "timed", "2 min", "footwork", "Turn on the ball of the foot while keeping your base underneath you.", "None", { durationSec: 120 }),
  e("jab-moving", "Jab while moving", "boxing", "timed", "2 min", "box", "Coordinate the jab with small controlled steps and reset after each action.", "None", { durationSec: 120 }),
  e("front-kick-chamber", "Front-kick chamber", "kicking", "reps", "10 each leg", "kick", "Raise the knee while staying tall and balanced, then return the foot under control.", "None", { sets: 1, repsMin: 10, repsMax: 10 }),
  e("front-kick", "Controlled front kick", "kicking", "reps", "10 each leg", "kick", "Chamber, extend gently, retract, and return to stance without snapping into a target.", "None", { sets: 1, repsMin: 10, repsMax: 10, safetyNote: "Practice into open space with control; do not lock the knee." }),
  e("round-kick", "Controlled round kick", "kicking", "reps", "10 each leg", "kick", "Pivot the support foot, turn the hip, extend lightly, then recoil to stance.", "None", { sets: 1, repsMin: 10, repsMax: 10, safetyNote: "Keep the range comfortable and do not force hip rotation.", imageUrl: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Muay_Thai_High_kick.jpg", imageAlt: "Muay Thai kick demonstration", imageCredit: "DrJimiGlide", imageSource: "https://commons.wikimedia.org/wiki/File:Muay_Thai_High_kick.jpg", imageLicense: "CC BY-SA 2.0" }),
  e("knee-raises", "Knee raises", "kicking", "reps", "10 each leg", "kick", "Drive the knee upward under control and return to stance.", "None", { sets: 1, repsMin: 10, repsMax: 10 }),
  e("kick-recovery", "Kick recovery", "kicking", "practice", "2 min", "kick", "Chamber the leg, make a small controlled extension, recoil the leg, and place the foot back into stance.", "None", { durationSec: 120 }),
  e("technical-standup", "Technical stand-up", "ground", "practice", "2 min", "ground", "From a seated base, post a hand, lift the hips, thread the leg back, and rise into stance with control.", "None", { durationSec: 120 }),
  e("bridge", "Bridge", "ground", "reps", "2 × 10", "ground", "Drive through the feet and lift the hips without overextending the low back.", "None", { sets: 2, repsMin: 10, repsMax: 10 }),
  e("hip-escape", "Hip escape / shrimp", "ground", "practice", "2 min", "ground", "Turn slightly to one side, push through the foot, and move the hips away before resetting.", "None", { durationSec: 120 }),
  e("sprawl", "Sprawl movement", "ground", "practice", "2 min", "ground", "Step or hop the feet back into a long plank-like position, then recover carefully to stance.", "None", { durationSec: 120 }),
  e("walk-10", "Walking", "recovery", "timed", "10 min", "walk", "Walk at an easy conversational pace.", "None", { durationSec: 600 }),
  e("mobility-10", "Mobility flow", "recovery", "timed", "10 min", "mobility", "Move gently through shoulders, hips, ankles, hamstrings, and upper-back rotation.", "None", { durationSec: 600 }),
  e("martial-light-10", "Light martial-arts movement", "recovery", "timed", "10 min", "footwork", "Practice stance, guard, footwork, pivots, technical stand-up, and easy shadowboxing.", "None", { durationSec: 600 }),
].map((x) => [x.id, x]));

export const exerciseList = Object.values(exercises);
