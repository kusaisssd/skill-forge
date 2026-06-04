import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { SkillsService } from '../../services/skills.service';
import { ProgressService } from '../../services/progress.service';
import { Skill } from '../../models/course.model';

interface SkillCardVm {
  skill: Skill;
  totalLessons: number;
  completedLessons: number;
  percent: number;
}

@Component({
  selector: 'app-skills-hub',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule,
  ],
  templateUrl: './skills-hub.component.html',
  styleUrl: './skills-hub.component.scss',
})
export class SkillsHubComponent {
  private readonly skillsService = inject(SkillsService);
  private readonly progress = inject(ProgressService);

  readonly cards = computed<SkillCardVm[]>(() =>
    this.skillsService.getSkills().map((skill) => {
      const refs = this.skillsService.flatLessons(skill.id);
      const keys = refs.map((r) =>
        this.progress.lessonKey(r.skillId, r.levelId, r.lessonId)
      );
      const total = refs.length;
      const completed = this.progress.countCompleted(keys);
      return {
        skill,
        totalLessons: total,
        completedLessons: completed,
        percent: total ? Math.round((completed / total) * 100) : 0,
      };
    })
  );
}
