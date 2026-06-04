import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { SkillsService } from '../../services/skills.service';
import { ProgressService } from '../../services/progress.service';
import { CodeBlockComponent } from '../../shared/code-block.component';
import { ExerciseComponent } from '../../shared/exercise.component';
import { FormatTextPipe } from '../../shared/format-text.pipe';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    CodeBlockComponent,
    ExerciseComponent,
    FormatTextPipe,
  ],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss',
})
export class LessonComponent {
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

  readonly adjacent = computed(() => {
    const p = this.params();
    return this.skillsService.adjacentLessons(
      p.skillId,
      p.levelId,
      p.lessonId
    );
  });

  readonly exercises = computed(() => {
    const p = this.params();
    return this.skillsService.getExercises(p.skillId, p.lessonId);
  });

  readonly summaryAr = computed(() => {
    const p = this.params();
    return this.skillsService.getSummaryAr(p.skillId, p.lessonId);
  });

  private readonly key = computed(() => {
    const p = this.params();
    return this.progress.lessonKey(p.skillId, p.levelId, p.lessonId);
  });

  readonly completed = computed(() =>
    this.progress.isLessonComplete(this.key())
  );

  readonly quizResult = computed(() =>
    this.progress.getQuizResult(this.key())
  );

  toggleComplete(): void {
    this.progress.setLessonComplete(this.key(), !this.completed());
  }
}
