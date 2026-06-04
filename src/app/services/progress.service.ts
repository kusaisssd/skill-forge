import { Injectable, signal } from '@angular/core';

/**
 * Tracks the learner's progress in localStorage so it survives reloads.
 * - lesson completion (marked "I understand this")
 * - best quiz score per lesson
 *
 * State is exposed via a signal so components re-render when it changes.
 */

interface QuizResult {
  correct: number;
  total: number;
}

interface ProgressState {
  /** key = lessonKey -> true when the user marked the lesson complete. */
  completed: Record<string, boolean>;
  /** key = lessonKey -> best quiz result. */
  quizzes: Record<string, QuizResult>;
  /** key = exerciseKey -> true when the exercise was solved correctly. */
  exercises: Record<string, boolean>;
}

const STORAGE_KEY = 'skillforge.progress.v1';

function emptyState(): ProgressState {
  return { completed: {}, quizzes: {}, exercises: {} };
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly state = signal<ProgressState>(this.load());

  /** Stable key for a single lesson. */
  lessonKey(skillId: string, levelId: string, lessonId: string): string {
    return `${skillId}/${levelId}/${lessonId}`;
  }

  isLessonComplete(key: string): boolean {
    return !!this.state().completed[key];
  }

  setLessonComplete(key: string, complete: boolean): void {
    this.state.update((s) => {
      const completed = { ...s.completed };
      if (complete) {
        completed[key] = true;
      } else {
        delete completed[key];
      }
      return { ...s, completed };
    });
    this.save();
  }

  getQuizResult(key: string): QuizResult | undefined {
    return this.state().quizzes[key];
  }

  /** Stable key for a single exercise within a lesson. */
  exerciseKey(
    skillId: string,
    levelId: string,
    lessonId: string,
    exerciseId: string
  ): string {
    return `${skillId}/${levelId}/${lessonId}/${exerciseId}`;
  }

  isExerciseDone(key: string): boolean {
    return !!this.state().exercises[key];
  }

  setExerciseDone(key: string, done: boolean): void {
    this.state.update((s) => {
      const exercises = { ...s.exercises };
      if (done) {
        exercises[key] = true;
      } else {
        delete exercises[key];
      }
      return { ...s, exercises };
    });
    this.save();
  }

  /** Records a quiz result, keeping only the learner's best score. */
  recordQuizResult(key: string, correct: number, total: number): void {
    this.state.update((s) => {
      const prev = s.quizzes[key];
      const isBetter =
        !prev || correct / total > prev.correct / prev.total;
      if (!isBetter) {
        return s;
      }
      return { ...s, quizzes: { ...s.quizzes, [key]: { correct, total } } };
    });
    this.save();
  }

  /** How many of the given lessons are complete. */
  countCompleted(keys: string[]): number {
    const s = this.state();
    return keys.filter((k) => s.completed[k]).length;
  }

  resetAll(): void {
    this.state.set(emptyState());
    this.save();
  }

  // --- persistence -------------------------------------------------------

  private load(): ProgressState {
    if (typeof localStorage === 'undefined') {
      return emptyState();
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return emptyState();
      }
      const parsed = JSON.parse(raw) as Partial<ProgressState>;
      return {
        completed: parsed.completed ?? {},
        quizzes: parsed.quizzes ?? {},
        exercises: parsed.exercises ?? {},
      };
    } catch {
      return emptyState();
    }
  }

  private save(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state()));
    } catch {
      // Storage may be unavailable (private mode); fail silently.
    }
  }
}
