import { Injectable } from '@angular/core';
import { Exercise, Lesson, Level, Skill } from '../models/course.model';
import { SKILLS } from '../data/skills';
import { ANGULAR_EXERCISES } from '../data/angular-exercises';
import { ANGULAR_SUMMARIES_AR } from '../data/angular-summaries-ar';

export interface LessonLocation {
  skill: Skill;
  level: Level;
  lesson: Lesson;
}

export interface FlatLessonRef {
  skillId: string;
  levelId: string;
  lessonId: string;
  lessonTitle: string;
}

/**
 * Read-only access to the catalog of skills and their courses,
 * plus helpers for navigating between lessons.
 */
@Injectable({ providedIn: 'root' })
export class SkillsService {
  private readonly skills: Skill[] = SKILLS;

  getSkills(): Skill[] {
    return this.skills;
  }

  getSkill(skillId: string): Skill | undefined {
    return this.skills.find((s) => s.id === skillId);
  }

  /** Interactive exercises for a lesson (empty if none authored). */
  getExercises(skillId: string, lessonId: string): Exercise[] {
    if (skillId === 'angular') {
      return ANGULAR_EXERCISES[lessonId] ?? [];
    }
    return [];
  }

  /** Arabic summary (ملخص عربي) for a lesson, if authored. */
  getSummaryAr(skillId: string, lessonId: string): string | undefined {
    if (skillId === 'angular') {
      return ANGULAR_SUMMARIES_AR[lessonId];
    }
    return undefined;
  }

  getLevel(skillId: string, levelId: string): Level | undefined {
    return this.getSkill(skillId)?.course?.levels.find(
      (l) => l.id === levelId
    );
  }

  getLessonLocation(
    skillId: string,
    levelId: string,
    lessonId: string
  ): LessonLocation | undefined {
    const skill = this.getSkill(skillId);
    const level = skill?.course?.levels.find((l) => l.id === levelId);
    const lesson = level?.lessons.find((l) => l.id === lessonId);
    if (!skill || !level || !lesson) {
      return undefined;
    }
    return { skill, level, lesson };
  }

  /** All lessons of a skill, flattened in level/lesson order. */
  flatLessons(skillId: string): FlatLessonRef[] {
    const skill = this.getSkill(skillId);
    if (!skill?.course) {
      return [];
    }
    const refs: FlatLessonRef[] = [];
    for (const level of skill.course.levels) {
      for (const lesson of level.lessons) {
        refs.push({
          skillId: skill.id,
          levelId: level.id,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
        });
      }
    }
    return refs;
  }

  /** Previous / next lesson references for in-lesson navigation. */
  adjacentLessons(
    skillId: string,
    levelId: string,
    lessonId: string
  ): { prev?: FlatLessonRef; next?: FlatLessonRef } {
    const flat = this.flatLessons(skillId);
    const idx = flat.findIndex(
      (r) => r.levelId === levelId && r.lessonId === lessonId
    );
    if (idx === -1) {
      return {};
    }
    return {
      prev: idx > 0 ? flat[idx - 1] : undefined,
      next: idx < flat.length - 1 ? flat[idx + 1] : undefined,
    };
  }
}
