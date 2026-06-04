import {
  Component,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { Exercise } from '../models/course.model';
import { ProgressService } from '../services/progress.service';

/**
 * An interactive coding exercise.
 *
 *  fill-blank : the learner types the missing code into ___ slots.
 *  arrange    : the learner drags scrambled lines into the correct order.
 *
 * Solving an exercise marks it done in ProgressService.
 */
@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, DragDropModule],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.scss',
})
export class ExerciseComponent implements OnInit {
  private readonly progress = inject(ProgressService);

  readonly exercise = input.required<Exercise>();
  readonly skillId = input.required<string>();
  readonly levelId = input.required<string>();
  readonly lessonId = input.required<string>();

  /** Typed answers for fill-blank, one per blank. */
  readonly answers = signal<string[]>([]);
  /** Current order of lines for the arrange exercise. */
  readonly order = signal<string[]>([]);

  readonly checked = signal(false);
  readonly solved = signal(false);
  readonly revealed = signal(false);

  /** Text segments around each ___ in a fill-blank template. */
  readonly segments = computed(() =>
    (this.exercise().codeTemplate ?? '').split('___')
  );

  ngOnInit(): void {
    this.reset();
    this.solved.set(this.progress.isExerciseDone(this.key()));
  }

  private key(): string {
    return this.progress.exerciseKey(
      this.skillId(),
      this.levelId(),
      this.lessonId(),
      this.exercise().id
    );
  }

  // --- fill-blank --------------------------------------------------------

  setAnswer(index: number, value: string): void {
    if (this.solved()) {
      return;
    }
    this.answers.update((a) => {
      const next = [...a];
      next[index] = value;
      return next;
    });
    this.checked.set(false);
  }

  blankCorrect(index: number): boolean {
    const given = (this.answers()[index] ?? '').trim().toLowerCase();
    const accepted = (this.exercise().blanks?.[index]?.accepted ?? []).map(
      (a) => a.trim().toLowerCase()
    );
    return given.length > 0 && accepted.includes(given);
  }

  // --- arrange -----------------------------------------------------------

  drop(event: CdkDragDrop<string[]>): void {
    if (this.solved()) {
      return;
    }
    const next = [...this.order()];
    moveItemInArray(next, event.previousIndex, event.currentIndex);
    this.order.set(next);
    this.checked.set(false);
  }

  lineCorrect(index: number): boolean {
    return this.order()[index] === (this.exercise().lines ?? [])[index];
  }

  // --- shared ------------------------------------------------------------

  isSolved(): boolean {
    const ex = this.exercise();
    if (ex.type === 'fill-blank') {
      return (ex.blanks ?? []).every((_, i) => this.blankCorrect(i));
    }
    return (ex.lines ?? []).every((line, i) => this.order()[i] === line);
  }

  check(): void {
    this.checked.set(true);
    if (this.isSolved()) {
      this.solved.set(true);
      this.progress.setExerciseDone(this.key(), true);
    }
  }

  reveal(): void {
    this.revealed.set(true);
  }

  reset(): void {
    const ex = this.exercise();
    if (ex.type === 'fill-blank') {
      this.answers.set(new Array((ex.blanks ?? []).length).fill(''));
    } else {
      this.order.set(this.shuffle(ex.lines ?? []));
    }
    this.checked.set(false);
    this.revealed.set(false);
  }

  /** The correct answer text, shown when the learner reveals it. */
  revealedAnswer(): string {
    const ex = this.exercise();
    if (ex.type === 'fill-blank') {
      return (ex.blanks ?? [])
        .map((b, i) => `${i + 1}. ${b.accepted[0]}`)
        .join('\n');
    }
    return (ex.lines ?? []).join('\n');
  }

  private shuffle(source: string[]): string[] {
    const arr = [...source];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Guard against the (rare) already-sorted shuffle for short lists.
    if (arr.length > 1 && arr.join('') === source.join('')) {
      [arr[0], arr[1]] = [arr[1], arr[0]];
    }
    return arr;
  }
}
