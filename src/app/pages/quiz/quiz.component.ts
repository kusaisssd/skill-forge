import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SkillsService } from '../../services/skills.service';
import { ProgressService } from '../../services/progress.service';
import { QuizQuestion } from '../../models/course.model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly skillsService = inject(SkillsService);
  private readonly progress = inject(ProgressService);

  private readonly params = toSignal(
    this.route.paramMap.pipe(
      map((p) => ({
        skillId: p.get('skillId') ?? '',
        levelId: p.get('levelId') ?? '',
        lessonId: p.get('lessonId') ?? '',
      }))
    ),
    { initialValue: { skillId: '', levelId: '', lessonId: '' } }
  );

  readonly location = computed(() => {
    const p = this.params();
    return this.skillsService.getLessonLocation(
      p.skillId,
      p.levelId,
      p.lessonId
    );
  });

  /** Map of questionId -> selected optionIds. */
  readonly selections = signal<Record<string, string[]>>({});
  readonly submitted = signal(false);

  readonly questions = computed(() => this.location()?.lesson.quiz ?? []);

  readonly score = computed(() => {
    const qs = this.questions();
    const sel = this.selections();
    let correct = 0;
    for (const q of qs) {
      if (this.isQuestionCorrect(q, sel[q.id] ?? [])) {
        correct++;
      }
    }
    return { correct, total: qs.length };
  });

  isSelected(questionId: string, optionId: string): boolean {
    return (this.selections()[questionId] ?? []).includes(optionId);
  }

  /** Single-choice / true-false: replace selection. */
  selectSingle(questionId: string, optionId: string): void {
    if (this.submitted()) {
      return;
    }
    this.selections.update((s) => ({ ...s, [questionId]: [optionId] }));
  }

  /** Multiple-choice: toggle the option. */
  toggleMultiple(questionId: string, optionId: string): void {
    if (this.submitted()) {
      return;
    }
    this.selections.update((s) => {
      const current = new Set(s[questionId] ?? []);
      if (current.has(optionId)) {
        current.delete(optionId);
      } else {
        current.add(optionId);
      }
      return { ...s, [questionId]: [...current] };
    });
  }

  isQuestionCorrect(q: QuizQuestion, selected: string[]): boolean {
    const correctIds = q.options.filter((o) => o.correct).map((o) => o.id);
    if (selected.length !== correctIds.length) {
      return false;
    }
    return correctIds.every((id) => selected.includes(id));
  }

  /** Every question must have at least one selection before submitting. */
  readonly canSubmit = computed(() => {
    const sel = this.selections();
    return this.questions().every((q) => (sel[q.id] ?? []).length > 0);
  });

  submit(): void {
    if (!this.canSubmit() || this.submitted()) {
      return;
    }
    this.submitted.set(true);
    const p = this.params();
    const key = this.progress.lessonKey(p.skillId, p.levelId, p.lessonId);
    const { correct, total } = this.score();
    this.progress.recordQuizResult(key, correct, total);
    // Passing the quiz also marks the lesson understood.
    if (total > 0 && correct / total >= 0.8) {
      this.progress.setLessonComplete(key, true);
    }
  }

  retry(): void {
    this.selections.set({});
    this.submitted.set(false);
  }

  /** Class applied to an option after submission, to color correct/wrong. */
  optionState(
    q: QuizQuestion,
    optionId: string
  ): 'correct' | 'missed' | 'wrong' | '' {
    if (!this.submitted()) {
      return '';
    }
    const option = q.options.find((o) => o.id === optionId);
    const chosen = this.isSelected(q.id, optionId);
    if (option?.correct && chosen) {
      return 'correct';
    }
    if (option?.correct && !chosen) {
      return 'missed';
    }
    if (!option?.correct && chosen) {
      return 'wrong';
    }
    return '';
  }
}
