# SkillForge

A structured, multi-level learning app built with **Angular 19 + Angular Material**.
Each skill is a full course taught the way you asked for: focus on **understanding
concepts**, **reading code correctly**, and **testing yourself** with quizzes — not
on copying large blocks of code.

The first skill, **Angular**, is fully written: 5 levels, 20 lessons, ~60 quiz
questions, taking you from zero to advanced.

---

## Run it

You need [Node.js](https://nodejs.org) 18.19+ (Node 20 or 22 recommended).

```bash
cd skill-forge
npm install        # installs Angular, Material, etc. (one time, a few minutes)
npm start          # runs the dev server and opens http://localhost:4200
```

Other commands:

```bash
npm run build      # production build into dist/skill-forge
```

> The project ships without `node_modules` (that folder is huge and machine-specific).
> `npm install` downloads everything from the pinned versions in `package.json`.

---

## How the app works

- **Skills hub** (home `/`) — cards for every skill, each showing your progress.
- **Course page** (`/skills/angular`) — the levels as expandable panels with their lessons.
- **Lesson page** — the concept explanation, annotated code to read, **interactive
  practice exercises**, key takeaways, a "I understand this" toggle, and prev/next
  navigation.
- **Practice exercises** (in every lesson) — two hands-on types that check your answer
  instantly with no setup: *fill-in-the-blank* (type the missing code) and *arrange the
  lines* (drag scrambled code into the correct order).
- **Quiz page** — multiple-choice / true-false questions with instant scoring and
  per-question explanations. Scoring 80%+ auto-marks the lesson complete.

Your progress (completed lessons + best quiz scores) is saved in the browser's
`localStorage`, so it survives reloads.

---

## The Angular course at a glance

| Level | Title | Lessons |
|------|-------|---------|
| 1 | Foundations | What Angular is & bootstrapping · TypeScript essentials · Project structure · Components & data binding |
| 2 | Building blocks | Control flow & directives · Pipes · Inputs & outputs · Services & DI |
| 3 | Data & reactivity | Signals · RxJS & Observables · HttpClient · Forms |
| 4 | Architecture & organization | Routing & lazy loading · Standalone vs NgModules · File organization · State management |
| 5 | Going pro | Change detection & performance · Testing · Library ecosystem · Build & deploy |

---

## Project structure

```
skill-forge/
  src/
    index.html              # host page
    main.ts                 # bootstraps the app
    styles.scss             # global styles + Material theme
    app/
      app.component.*        # shell (toolbar + router-outlet)
      app.config.ts          # providers (router, animations)
      app.routes.ts          # route table (all routes lazy-loaded)
      models/
        course.model.ts      # the data model (Skill, Course, Level, Lesson, Quiz...)
      data/
        skills.ts            # the catalog shown on the hub
        angular-course.ts    # the full Angular course content
      services/
        skills.service.ts    # read access + lesson navigation
        progress.service.ts  # progress tracking (localStorage + signals)
      shared/
        code-block.component.ts  # annotated, copy-able code viewer
        format-text.pipe.ts      # tiny safe `code`/**bold** renderer
      pages/
        skills-hub/          # home
        skill-detail/        # course overview
        lesson/              # a single lesson
        quiz/                # a single quiz
```

---

## Add your own skill or lessons

Everything is data-driven, so you don't touch components to add content.

**Add a new lesson** — open `src/app/data/angular-course.ts` and add a `Lesson`
object to a level's `lessons` array. Each lesson has `concept`, `codeSamples`,
`keyPoints`, and `quiz`. The model in `src/app/models/course.model.ts` documents
every field.

**Add a whole new skill** — in `src/app/data/skills.ts`, either flip an existing
placeholder's `available` to `true` and attach a `course`, or add a new `Skill`.
Create its course in a new file (copy the shape of `angular-course.ts`).

In a code sample, mark important lines with annotations:

```ts
{
  title: 'Example',
  filename: 'demo.ts',
  language: 'typescript',
  code: "const x = 1;\nconsole.log(x);",
  annotations: [{ line: 2, note: 'This prints the value of x.' }],
}
```

In concept/key-point text you can use a tiny syntax: `` `code` `` renders as inline
code and `**bold**` renders bold.

---

## Notes

- Built with standalone components and **signals** (the modern Angular style).
- Angular Material 19 theming uses the new `mat.theme()` API (see `styles.scss`).
- Versions in `package.json` are pinned to a verified, compatible Angular 19.2 set.
- The course data was type-checked against the model; run `npm start` to launch.
