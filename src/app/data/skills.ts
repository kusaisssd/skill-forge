import { Skill } from '../models/course.model';
import { ANGULAR_COURSE } from './angular-course';
import { TYPESCRIPT_COURSE } from './typescript-course';
import { RXJS_COURSE } from './rxjs-course';
import { GIT_COURSE } from './git-course';
import { CSS_COURSE } from './css-course';
import { TESTING_COURSE } from './testing-course';

/**
 * The catalog of skills shown on the hub.
 *
 * The first skill (Angular) has a complete course. The others are placeholders
 * that demonstrate how the hub scales — add a `course` to any of them (same
 * shape as ANGULAR_COURSE) and flip `available` to true to light it up.
 */
export const SKILLS: Skill[] = [
  {
    id: 'angular',
    title: 'Angular',
    icon: 'web',
    color: 'linear-gradient(135deg, #dd0031, #c3002f)',
    summary:
      'Understand the concepts, read any Angular code with confidence, and learn how real projects are structured — from zero to advanced.',
    tags: ['Frontend', 'TypeScript', 'Components', 'Signals'],
    difficulty: 'Beginner → Advanced',
    available: true,
    course: ANGULAR_COURSE,
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    icon: 'data_object',
    color: 'linear-gradient(135deg, #3178c6, #235a97)',
    summary:
      'Master types, interfaces, generics, and the type system that powers modern web development.',
    tags: ['Language', 'Types', 'Tooling'],
    difficulty: 'Beginner → Advanced',
    available: true,
    course: TYPESCRIPT_COURSE,
  },
  {
    id: 'rxjs',
    title: 'RxJS',
    icon: 'waves',
    color: 'linear-gradient(135deg, #b7178c, #7b1fa2)',
    summary:
      'Think in streams: observables, operators, and reactive patterns for handling async data.',
    tags: ['Reactive', 'Async', 'Streams'],
    difficulty: 'Intermediate → Advanced',
    available: true,
    course: RXJS_COURSE,
  },
  {
    id: 'css-layout',
    title: 'CSS Layout',
    icon: 'grid_view',
    color: 'linear-gradient(135deg, #1572b6, #0d47a1)',
    summary:
      'Flexbox, grid, and responsive design — read and write layouts that work everywhere.',
    tags: ['Frontend', 'Design', 'Responsive'],
    difficulty: 'Beginner → Advanced',
    available: true,
    course: CSS_COURSE,
  },
  {
    id: 'git',
    title: 'Git & Version Control',
    icon: 'account_tree',
    color: 'linear-gradient(135deg, #f05133, #b34029)',
    summary:
      'Branches, merges, rebases, and a mental model for collaborating on code without fear.',
    tags: ['Tooling', 'Workflow', 'Collaboration'],
    difficulty: 'Beginner → Advanced',
    available: true,
    course: GIT_COURSE,
  },
  {
    id: 'testing',
    title: 'Testing Fundamentals',
    icon: 'science',
    color: 'linear-gradient(135deg, #2e7d32, #1b5e20)',
    summary:
      'Unit, integration, and end-to-end testing — what to test, how, and why it pays off.',
    tags: ['Quality', 'Automation', 'Confidence'],
    difficulty: 'Beginner → Advanced',
    available: true,
    course: TESTING_COURSE,
  },
];
