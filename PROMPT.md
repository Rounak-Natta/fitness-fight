**# Full App Generation Prompt — Lean Fighter Routine**

Build a production-ready, mobile-first Progressive Web App (PWA) called **\*\*Lean Fighter Routine\*\***.

The app is a simple personal daily workout + martial-arts practice tracker for a 28-year-old beginner who wants to:

\- gain strength and healthy body mass

\- build a lean, aesthetic physique over time

\- develop basic athletic conditioning

\- practice beginner-friendly martial-arts movement, boxing, kicking, footwork and defensive techniques

\- follow a structured 8-week progression

\- complete a simple 30-minute daily routine

\- track completed workouts without complicated fitness-app features

The application will be deployed to **\*\*Vercel or Netlify\*\***.

**## 1. Core product principles**

Keep the application:

\- extremely simple

\- clean

\- sober

\- modern

\- calm

\- uncluttered

\- fast

\- mobile-first

\- easy to use with one hand

\- focused on completing today's routine

Do NOT build a desktop-first dashboard.

Do NOT create a complicated social network.

Do NOT add calories/macros tracking in v1.

Do NOT add a huge exercise database UI.

Do NOT add unnecessary charts.

Do NOT add login/auth unless needed by the implementation platform.

Do NOT add payment/subscription functionality.

The primary experience should feel like:

**\*\*Open app → immediately see today's workout → Start → follow exercises → finish → mark day complete.\*\***

**## 2. Technology**

Use:

\- Next.js latest stable App Router

\- TypeScript

\- React

\- Tailwind CSS

\- shadcn/ui only where useful, not excessively

\- Lucide React icons

\- PWA support using a maintained Next.js-compatible PWA approach

\- localStorage or IndexedDB for persistence

\- no backend required for v1

\- no database required for v1

\- no authentication required for v1

Make the application deployable directly to Vercel and Netlify.

Use clean modular architecture.

Suggested structure:

app/

  page.tsx

  today/

  week/

  workout/

  progress/

  settings/

components/

  app-shell/

  today/

  workout/

  exercise/

  progress/

  ui/

data/

  exercises.ts

  routines.ts

  martial-arts.ts

lib/

  storage.ts

  workout-engine.ts

  dates.ts

  progress.ts

public/

  icons/

  exercises/

**## 3. Mobile-only design**

Design for approximately:

\- 320px width

\- 360px

\- 390px

\- 412px

\- 430px

The UI should look excellent on phones.

Desktop is NOT a priority.

On large screens, simply keep the mobile application centered in a narrow phone-like content area rather than creating a separate desktop dashboard.

Recommended max content width:

**\*\*430–480px\*\***

Use:

\- large tap targets

\- sticky bottom navigation

\- generous spacing

\- readable typography

\- thumb-friendly controls

\- bottom sheets/modals where useful

\- no tiny text

\- no dense tables

Minimum tap target:

approximately 44px.

**## 4. Visual direction**

Style:

\- clean

\- sober

\- masculine but not aggressive

\- athletic

\- minimal

\- premium

\- neutral background

\- mostly monochrome UI

\- one restrained accent color

Avoid:

\- neon gym aesthetics

\- excessive gradients

\- excessive shadows

\- giant rounded cards everywhere

\- clutter

\- too many badges

\- gamification overload

\- bright red/green everywhere

\- cartoonish fitness visuals

Suggested visual language:

Background:

warm/off-white or very dark charcoal depending on theme.

Cards:

subtle contrast against background.

Accent:

muted lime/green OR muted blue.

Typography:

modern sans-serif with strong hierarchy.

Use subtle motion only.

**## 5. App navigation**

Bottom navigation with 4 tabs:

1\. **\*\*Today\*\***

2\. **\*\*Plan\*\***

3\. **\*\*Progress\*\***

4\. **\*\*Settings\*\***

Today is the default.

Use icons + labels.

Keep bottom nav fixed and safe-area aware for iPhone.

**## 6. Home / Today screen**

This is the most important screen.

At the top:

"Wednesday, Aug 26"

Then:

"Week 1 · Day 1"

Large heading:

**\*\*Full Body + Boxing\*\***

Small description:

"Build strength, move better, learn the basics."

Show a compact progress indicator:

**\*\*0 / 8 exercises\*\***

Then the day's routine as a clean vertical list.

Each exercise row should show:

\- exercise image/animation thumbnail

\- exercise name

\- target sets/reps OR duration

\- category

\- completion state

\- chevron

Example:

[exercise animation]

Squat

3 × 8–12

Strength

[exercise animation]

Push-ups

3 × 6–12

Strength

[exercise animation]

Lat Pulldown

3 × 8–12

Strength

[exercise animation]

Romanian Deadlift

2 × 8–12

Strength

[exercise animation]

Plank

2 × 30–45 sec

Core

Then:

[ Start Workout ]

The button should be large and sticky near the bottom when appropriate.

If today's routine is complete:

**\*\*Today's session complete ✓\*\***

Show:

\- completion time

\- exercises completed

\- short encouraging message

Do not over-gamify.

**## 7. Daily routine data**

Implement the complete first 8-week program.

The core program:

**### Monday — Full Body + Boxing**

Warm-up:

\- march/jog in place — 1 min

\- arm circles — 30 sec

\- hip circles — 30 sec

\- bodyweight squats — 10

\- easy push-ups — 5

\- light shadowboxing — 2 min

Strength:

\- Squat — 3 × 8–12

\- Push-ups / bench press — 3 × 6–12

\- Lat pulldown / assisted pull-up — 3 × 8–12

\- Romanian deadlift — 2 × 8–12

\- Plank — 2 × 30–45 sec

Martial arts:

\- Jab

\- Jab → Cross

\- Jab → Cross → Hook

\- light shadowboxing

**### Tuesday — Light Full Body + Footwork**

Strength:

\- Bodyweight squat — 2 × 15

\- Push-ups — 2 × 8–12

\- Reverse lunges — 2 × 8 each leg

\- Dumbbell/cable row — 2 × 10–12

\- Dead bug — 2 × 10 each side

Martial arts:

\- stance + guard — 3 min

\- forward/backward movement — 3 min

\- lateral movement — 3 min

\- pivots — 2 min

\- jab while moving — 2 min

**### Wednesday — Full Body + Kicks**

Strength:

\- Goblet squat / leg press — 3 × 8–12

\- Incline dumbbell press — 3 × 8–12

\- Lat pulldown / pull-up — 3 × 8–12

\- Dumbbell row — 2 × 8–12

\- Hanging knee raise — 2 × 8–12

Martial arts:

\- front-kick chamber — 10 each leg

\- controlled front kick — 10 each leg

\- controlled round kick — 10 each leg

\- knee raises — 10 each leg

**### Thursday — Recovery + Martial Arts Movement**

Mobility:

\- shoulder circles

\- hip circles

\- ankle mobility

\- hamstring mobility

\- hip flexor stretch

\- thoracic rotation

Movement:

\- forward/backward footwork

\- lateral movement

\- diagonal movement

\- pivots

Light shadowboxing.

No hard strength training.

**### Friday — Full Body + Boxing**

Strength:

\- squat / leg press — 3 × 8–12

\- bench press / push-ups — 3 × 8–12

\- lat pulldown — 3 × 8–12

\- Romanian deadlift — 2 × 8–12

\- lateral raises — 2 × 12–15

\- plank — 1–2 × 45 sec

Boxing:

\- jab + movement

\- jab → cross + movement

\- jab → cross → hook + movement

\- slip → jab → cross

\- free shadowboxing

**### Saturday — Athletic + Martial Arts**

Strength:

\- bodyweight squat — 2 × 15

\- push-ups — 2 × 10

\- lunges — 2 × 8 each

\- dumbbell row — 2 × 10

\- plank — 2 × 30 sec

Martial arts:

\- footwork

\- boxing combinations

\- front kicks

\- knees

\- shadowboxing

\- technical movement

**### Sunday — Recovery**

\- 10 min walking

\- 10 min mobility

\- 10 min light martial-arts movement

\- stance

\- guard

\- footwork

\- pivot

\- technical stand-up

\- light shadowboxing

**## 8. 8-week progression**

Create a simple week progression system.

Week 1:

Foundation.

Week 2:

Repeat movements and aim for cleaner technique.

Week 3:

Increase reps where comfortable.

Week 4:

Small progression in reps or resistance.

Week 5:

Repeat with slightly stronger loads/reps.

Week 6:

Progress again.

Week 7:

Strongest controlled week.

Week 8:

Consolidation/deload week with slightly reduced volume.

Do not automatically force heavier weights.

The app should show:

**\*\*Week 1 of 8\*\***

and allow navigation to completed previous weeks.

Future weeks can be locked or visible but marked "Upcoming".

**## 9. Workout session screen**

When user taps Start Workout:

Open a dedicated full-screen workout player.

Show:

Top:

\- Week 1 · Day 1

\- Exercise 2 of 8

Large animated exercise visual.

Exercise name:

**\*\*Push-ups\*\***

Target:

**\*\*3 × 6–12\*\***

Instruction:

"Keep your body straight. Lower under control. Push the floor away."

Controls:

[ − ] reps [ + ]

or if timed:

large countdown timer.

Buttons:

**\*\*Complete set\*\***

**\*\*Skip\*\***

**\*\*Previous\*\***

**\*\*Next\*\***

The next exercise should preload.

When all sets are complete:

**\*\*Exercise complete ✓\*\***

Then automatically move to next exercise after a short optional transition.

**## 10. Timer**

Build a reusable timer component.

Modes:

\- countdown

\- stopwatch

\- rest timer

For rest:

Default:

**\*\*60 seconds\*\***

Allow:

30 sec

45 sec

60 sec

90 sec

Large center countdown:

**\*\*00:42\*\***

Buttons:

Pause

Resume

Skip

Use subtle circular progress animation.

Add haptic feedback where supported through the browser API.

Do not depend on vibration for functionality.

**## 11. Exercise visual system**

Every exercise needs a visual.

Do NOT use random stock photos.

Prefer:

1\. locally stored royalty-free exercise illustrations/animations

2\. simple custom SVG illustrations

3\. lightweight animated SVG/WebP/GIF if licensing permits

Each exercise card should have:

\- clear starting position

\- movement direction

\- ending position

\- subtle looping "before → movement → after" animation

For example:

Squat:

standing → descending → bottom → standing

Push-up:

top plank → lowering → bottom → pushing up

Biceps curl:

arm down → curl → top → arm down

Front kick:

stance → chamber → extension → return

Jab:

guard → extension → return to guard

Use a reusable \`\<ExerciseVisual />\` component so visuals can be swapped without changing workout logic.

If actual animation assets are unavailable, generate clean vector/SVG movement diagrams instead of using broken external URLs.

Add \`alt\` text.

Do not autoplay audio.

**## 12. Exercise detail screen**

When an exercise is tapped, show:

\- animation

\- name

\- category

\- target

\- simple instructions

\- breathing cue

\- common mistake

\- beginner modification

\- equipment

\- safety note where applicable

Example:

**### Push-ups**

Target:

3 × 6–12

How:

"Keep your body in one line. Lower your chest toward the floor and push back up."

Beginner:

"Incline push-up against a stable bench/table."

Common mistake:

"Letting the hips sag."

**## 13. Martial arts section**

Create a dedicated but simple martial-arts exercise library.

Categories:

**### Boxing**

\- stance

\- guard

\- jab

\- cross

\- hook

\- uppercut

\- slip

\- roll

\- pivot

\- forward/backward movement

\- lateral movement

\- shadowboxing

**### Kicking**

\- knee raise

\- front kick / teep

\- round kick

\- controlled knee

\- kick recovery

**### Ground movement**

\- technical stand-up

\- bridge

\- hip escape/shrimp

\- sprawl movement

Each technique must emphasize:

\- control

\- balance

\- technique

\- safe practice

\- returning to stance

Do NOT provide instructions framed around seriously injuring a person.

The app should clearly state:

"Solo practice develops movement and coordination. For real self-defense skills, train with a qualified martial-arts instructor and partner."

**## 14. Progress screen**

Keep it extremely simple.

Show:

**\*\*Current streak\*\***

3 days

**\*\*Current week\*\***

Week 1

**\*\*Completed\*\***

4 / 7 days

**\*\*Total sessions\*\***

4

Then an 8-week calendar/grid.

Example:

Week 1

M ✓

T ✓

W ✓

T ○

F ○

S ○

S ○

Week 2

Upcoming

Also show:

**### Strength milestones**

Optional manual tracking:

\- Push-ups

\- Squat

\- Pull-up/lat pulldown

\- RDL

\- Dumbbell press

Allow the user to enter a simple "best" value.

No complicated analytics.

**## 15. Plan screen**

Show all 8 weeks as collapsible sections.

Each week:

Week 1

Foundation

Mon — Full Body + Boxing

Tue — Light + Footwork

Wed — Full Body + Kicks

Thu — Recovery + Movement

Fri — Full Body + Boxing

Sat — Athletic + Martial Arts

Sun — Recovery

Tap any day to preview the routine.

Keep the UI very clean.

**## 16. Completion behavior**

When a session is completed:

Persist:

\- date

\- week

\- day

\- exercises completed

\- duration

\- timestamp

Store locally.

The app must work offline after first load.

If the user closes the browser halfway through a workout, restore the active session when they return.

Allow:

**\*\*Resume workout\*\***

If user intentionally exits:

Ask:

"Save progress and exit?"

Options:

\- Continue

\- Save & exit

\- Discard

**## 17. Data persistence**

Use a clean storage abstraction.

Example:

saveWorkoutSession()

getWorkoutSession()

completeExercise()

getProgress()

resetProgress()

Keep storage logic outside React components.

Use localStorage for simplicity unless IndexedDB is clearly beneficial.

Version the stored data:

\`lean-fighter-routine\:v1\`

Implement safe migration handling.

**## 18. PWA**

The application must be installable.

Include:

\- manifest

\- app icons

\- theme color

\- standalone display

\- service worker

\- offline caching

\- installable on Android/iOS where supported

App name:

**\*\*Lean Fighter\*\***

Short name:

**\*\*Lean Fighter\*\***

Description:

"Your simple daily strength and martial-arts routine."

Provide:

\- 192×192 icon

\- 512×512 icon

\- maskable icon

Use an understated icon such as:

a minimal fighter/athletic silhouette or abstract LF monogram.

**## 19. Offline-first behavior**

After the app has loaded once:

\- workout data available offline

\- progress available offline

\- timers work offline

\- exercise visuals available offline

\- navigation works offline

Do not make workout completion dependent on an API call.

**## 20. Settings**

Keep settings minimal.

Options:

**### Appearance**

\- System

\- Light

\- Dark

**### Rest timer**

\- 30 sec

\- 45 sec

\- 60 sec

\- 90 sec

**### Workout duration**

Show:

"Target: \~30 minutes"

**### Haptics**

On/off

**### Reset progress**

Danger zone.

Require confirmation.

Also include:

"About"

"Version"

**## 21. Safety UX**

Because the app includes exercise and martial-arts practice, include a small disclaimer in Settings/About:

"This app provides general fitness and movement guidance, not medical advice. Start gradually, use controlled technique, and stop if you experience pain, dizziness, or unusual symptoms. For actual self-defense training, work with a qualified instructor."

Do not make the disclaimer intrusive during normal workouts.

**## 22. Accessibility**

Implement:

\- semantic buttons

\- keyboard accessibility where relevant

\- visible focus states

\- sufficient contrast

\- reduced-motion support

\- screen-reader labels

\- alt text

\- \`aria-live\` for timer state

\- no color-only completion indicators

Respect:

\`prefers-reduced-motion\`

When reduced motion is enabled, disable decorative exercise animations and use a static frame.

**## 23. Animations**

Use Framer Motion only if it adds real value; otherwise CSS animations are preferred.

Animations should include:

\- page transitions

\- progress ring

\- exercise visual movement

\- checkmark completion

\- timer transitions

\- subtle button feedback

Never make animations distracting.

No excessive bouncing.

**## 24. Exercise visual implementation**

Create a reusable data-driven system.

Example conceptual data:

{

  id: "push-up",

  name: "Push-ups",

  category: "strength",

  type: "reps",

  target: "3 × 6–12",

  animation: "push-up",

  instructions: "...",

  beginnerVariation: "Incline push-up",

  commonMistake: "...",

  equipment: "None"

}

The \`\<ExerciseVisual exerciseId="push-up" />\` component renders the appropriate local animation.

Create at least visually distinct animations for:

\- squat

\- push-up

\- lat pulldown

\- Romanian deadlift

\- shoulder press

\- row

\- lunge

\- plank

\- hanging knee raise

\- lateral raise

\- jab

\- cross

\- hook

\- slip

\- pivot

\- front kick

\- round kick

\- knee

\- technical stand-up

\- hip escape

\- sprawl

If producing all individual animations would make the code too large, build a generic animated vector figure system with pose keyframes.

**## 25. Workout completion screen**

After the final exercise:

Large checkmark.

"Workout complete"

Show:

**\*\*30:14\*\***

**\*\*8 exercises\*\***

**\*\*Week 1 · Day 1\*\***

Then a short message:

"Good work. Recover, eat well, and come back tomorrow."

Button:

**\*\*Done\*\***

No confetti explosion.

Keep it sober.

**## 26. Empty and error states**

If progress is empty:

"Your first session starts today."

If a workout fails to load:

"Something went wrong loading today's routine."

Button:

"Retry"

Never leave blank screens.

**## 27. Performance**

Optimize for mobile.

Requirements:

\- fast initial load

\- lazy-load nonessential screens

\- avoid huge image assets

\- use WebP/SVG where appropriate

\- no giant animation libraries

\- no unnecessary dependencies

\- avoid layout shifts

\- use Next.js image optimization when applicable

\- keep JS bundle reasonable

**## 28. Code quality**

Use:

\- strict TypeScript

\- reusable components

\- no giant page components

\- no duplicated workout definitions

\- centralized routine data

\- centralized exercise data

\- typed storage functions

\- clear naming

\- small components

\- no \`any\` unless absolutely unavoidable

The project must run with:

npm install

npm run dev

and production:

npm run build

npm start

Include:

npm run lint

npm run typecheck

If a test setup is included, provide:

npm run test

**## 29. README**

Create a detailed README containing:

\- project overview

\- tech stack

\- setup

\- development

\- build

\- deployment to Vercel

\- deployment to Netlify

\- PWA testing

\- storage architecture

\- adding exercises

\- adding routines

\- replacing exercise animations

\- reset local data

\- known limitations

**## 30. Seed/demo behavior**

On first launch:

Do NOT mark anything completed.

Set:

Current week:

Week 1

Current day:

Use the user's local date to determine the day.

If the user opens the app on a Sunday, show Sunday recovery routine.

Allow a "Preview another day" function from Plan.

**## 31. Important product behavior**

The user should never have to wonder:

"What do I do today?"

The Today screen must answer that immediately.

The core flow:

Open app

↓

See today's routine

↓

Start workout

↓

See exercise animation

↓

Do exercise

↓

Start/finish timer

↓

Complete set

↓

Next exercise

↓

Finish

↓

Progress saved

Keep this flow extremely fast.

**## 32. Do not overbuild**

Explicitly avoid:

\- user accounts

\- social feeds

\- friends

\- leaderboards

\- chat

\- subscriptions

\- ads

\- calorie database

\- food scanner

\- complicated body measurements

\- advanced AI coach

\- wearable integration

\- external workout API

\- cloud database

\- complicated charts

These may be future features but are NOT part of v1.

**## 33. Final acceptance criteria**

The generated application is considered complete only if:

1\. It runs with \`npm install && npm run dev\`.

2\. It builds successfully.

3\. It is a real PWA.

4\. It works well at 320–430px mobile widths.

5\. Today opens directly to the current routine.

6\. All 7 days have routines.

7\. The program covers 8 weeks.

8\. Workout sessions can be started.

9\. Exercise completion is tracked.

10\. Timers work.

11\. Progress persists after refresh.

12\. Progress works offline.

13\. Exercise visuals are local and reliable.

14\. Exercise visuals show movement from starting position through movement to ending position.

15\. Martial-arts techniques are included.

16\. The UI is clean and not cluttered.

17\. There are no broken image URLs.

18\. There are no placeholder "lorem ipsum" sections.

19\. There is no desktop-specific dashboard.

20\. The app is usable entirely with one hand on a phone.

21\. The code is modular and easy to extend.

22\. README explains deployment to both Vercel and Netlify.

**## 34. Final design instruction**

Before considering the app complete, inspect every mobile screen.

Ask:

"Can the user understand what to do within 3 seconds?"

If not, simplify the screen.

The application should feel like a **\*\*quiet, focused personal training companion\*\***, not a complicated commercial fitness platform.

Build the complete application, not a mockup.

Do not stop at static UI.

All buttons, timers, navigation, completion tracking, persistence, PWA installation, progress tracking, week navigation, and workout flow must actually work.