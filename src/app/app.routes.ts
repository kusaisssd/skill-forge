import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/skills-hub/skills-hub.component').then(
        (m) => m.SkillsHubComponent
      ),
    title: 'SkillForge — Skills',
  },
  {
    path: 'skills/:skillId',
    loadComponent: () =>
      import('./pages/skill-detail/skill-detail.component').then(
        (m) => m.SkillDetailComponent
      ),
    title: 'SkillForge — Course',
  },
  {
    path: 'skills/:skillId/levels/:levelId/lessons/:lessonId',
    loadComponent: () =>
      import('./pages/lesson/lesson.component').then((m) => m.LessonComponent),
    title: 'SkillForge — Lesson',
  },
  {
    path: 'skills/:skillId/levels/:levelId/lessons/:lessonId/quiz',
    loadComponent: () =>
      import('./pages/quiz/quiz.component').then((m) => m.QuizComponent),
    title: 'SkillForge — Quiz',
  },
  { path: '**', redirectTo: '' },
];
