/**
 * Core data model for SkillForge.
 *
 * A Skill is a learning track (e.g. "Angular").
 * A Skill contains a Course, which is split into Levels (beginner -> advanced).
 * Each Level contains Lessons. Each Lesson has:
 *   - concept blocks (the explanation you read),
 *   - code samples (annotated code you learn to READ),
 *   - key points (a quick recap),
 *   - a quiz (so you can test your answers).
 */

export type CodeLanguage =
  | 'typescript'
  | 'html'
  | 'scss'
  | 'css'
  | 'bash'
  | 'json'
  | 'text';

export interface Skill {
  id: string;
  title: string;
  /** Material icon name shown on the skill card. */
  icon: string;
  /** Accent color used on the card. */
  color: string;
  summary: string;
  tags: string[];
  /** Difficulty label shown to the user. */
  difficulty: string;
  /** Whether the full course content is authored yet. */
  available: boolean;
  course?: Course;
}

export interface Course {
  /** One-paragraph promise of what you will be able to do at the end. */
  outcome: string;
  levels: Level[];
}

export interface Level {
  id: string;
  order: number;
  title: string;
  goal: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  /** Estimated reading + practice time, in minutes. */
  minutes: number;
  /** Short one-liner shown in lists. */
  blurb: string;
  concept: ConceptBlock[];
  codeSamples: CodeSample[];
  keyPoints: string[];
  quiz: QuizQuestion[];
}

export interface ConceptBlock {
  heading?: string;
  /**
   * Body text. Supports a tiny inline syntax:
   *   `code`  -> rendered as inline code
   *   **bold** -> rendered bold
   * Paragraphs are separated by blank lines.
   */
  body: string;
}

export interface CodeSample {
  title: string;
  language: CodeLanguage;
  /** Optional filename header, e.g. "app.component.ts". */
  filename?: string;
  code: string;
  /** Optional plain-language explanation shown under the code. */
  explanation?: string;
  /** Per-line notes: line numbers are 1-based. */
  annotations?: CodeAnnotation[];
}

export interface CodeAnnotation {
  line: number;
  note: string;
}

export type QuizType = 'single' | 'multiple' | 'truefalse';

export interface QuizQuestion {
  id: string;
  type: QuizType;
  prompt: string;
  options: QuizOption[];
  /** Shown after the user submits, explaining the correct answer. */
  explanation: string;
}

export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

/**
 * Interactive coding exercises — practice, not just multiple choice.
 *
 *  'fill-blank' : a snippet with one or more blanks (written as ___ in the
 *                 template). The learner types the missing code.
 *  'arrange'    : scrambled lines the learner drags into the correct order
 *                 (a "Parsons problem").
 */
export type ExerciseType = 'fill-blank' | 'arrange';

export interface Blank {
  /** Accepted answers, compared case-insensitively after trimming. */
  accepted: string[];
  /** Optional hint shown on request. */
  hint?: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  language?: CodeLanguage;
  explanation: string;

  // --- fill-blank ---
  /** Code containing the marker `___` for each blank, in order. */
  codeTemplate?: string;
  /** One entry per blank, in the same order as the `___` markers. */
  blanks?: Blank[];

  // --- arrange ---
  /** Lines in their CORRECT order; they are shuffled for the learner. */
  lines?: string[];
}
