import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';

import { SkillsService } from '../../services/skills.service';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-skill-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatListModule,
  ],
  templateUrl: './skill-detail.component.html',
  styleUrl: './skill-detail.component.scss',
})
export class SkillDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly skillsService = inject(SkillsService);
  private readonly progress = inject(ProgressService);

  private readonly skillId = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('skillId') ?? '')),
    { initialValue: '' }
  );

  readonly skill = computed(() => this.skillsService.getSkill(this.skillId()));

  readonly overallPercent = computed(() => {
    const id = this.skillId();
    const refs = this.skillsService.flatLessons(id);
    if (refs.length === 0) {
      return 0;
    }
    const keys = refs.map((r) =>
      this.progress.lessonKey(r.skillId, r.levelId, r.lessonId)
    );
    return Math.round((this.progress.countCompleted(keys) / refs.length) * 100);
  });

  /** Completed / total lessons within a single level. */
  levelProgress(levelId: string): { done: number; total: number } {
    const skill = this.skill();
    const level = skill?.course?.levels.find((l) => l.id === levelId);
    if (!skill || !level) {
      return { done: 0, total: 0 };
    }
    const keys = level.lessons.map((lesson) =>
      this.progress.lessonKey(skill.id, level.id, lesson.id)
    );
    return { done: this.progress.countCompleted(keys), total: keys.length };
  }

  isLessonComplete(levelId: string, lessonId: string): boolean {
    const id = this.skillId();
    return this.progress.isLessonComplete(
      this.progress.lessonKey(id, levelId, lessonId)
    );
  }
}
