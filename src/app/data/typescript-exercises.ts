import { Exercise } from '../models/course.model';

/** Interactive exercises for the TypeScript course, keyed by lesson id. */
export const TYPESCRIPT_EXERCISES: Record<string, Exercise[]> = {
  // ---------- Level 1 ----------
  'why-typescript': [
    {
      id: 'ex-annotate',
      type: 'fill-blank',
      prompt: 'Give the parameter its type so greet(42) becomes a compile error.',
      language: 'typescript',
      codeTemplate:
        "function greet(name: ___): string {\n  return 'Hello ' + name.toUpperCase();\n}",
      blanks: [{ accepted: ['string'], hint: 'toUpperCase() exists on this type.' }],
      explanation:
        'name: string makes the contract explicit — numbers are rejected at compile time.',
    },
  ],
  'basic-types': [
    {
      id: 'ex-array',
      type: 'fill-blank',
      prompt: 'Type the scores variable as an array of numbers.',
      language: 'typescript',
      codeTemplate: 'let scores: ___[] = [90, 85, 77];',
      blanks: [{ accepted: ['number'], hint: 'The element type goes before [].' }],
      explanation: 'number[] (equivalent to Array<number>) is an array of numbers.',
    },
  ],
  functions: [
    {
      id: 'ex-return',
      type: 'fill-blank',
      prompt: 'Complete the return type of this function.',
      language: 'typescript',
      codeTemplate: 'function len(s: string): ___ {\n  return s.length;\n}',
      blanks: [{ accepted: ['number'], hint: '.length is numeric.' }],
      explanation: 'The type after the parameter list is the return type — length is a number.',
    },
  ],
  'objects-interfaces': [
    {
      id: 'ex-optional',
      type: 'fill-blank',
      prompt: 'Add the single character that makes email optional.',
      language: 'typescript',
      codeTemplate: 'interface User {\n  id: number;\n  email___: string;\n}',
      blanks: [{ accepted: ['?'], hint: 'One character, before the colon.' }],
      explanation: 'email?: string means the property may be absent (string | undefined).',
    },
  ],

  // ---------- Level 2 ----------
  'unions-narrowing': [
    {
      id: 'ex-arrange-switch',
      type: 'arrange',
      prompt: 'Arrange a switch that narrows a discriminated union by kind.',
      language: 'typescript',
      lines: [
        'switch (shape.kind) {',
        "  case 'circle':",
        '    return Math.PI * shape.radius ** 2;',
        "  case 'rect':",
        '    return shape.width * shape.height;',
        '}',
      ],
      explanation:
        'Switching on the literal tag narrows each case: radius exists only in circle, width/height only in rect.',
    },
  ],
  'aliases-vs-interfaces': [
    {
      id: 'ex-alias',
      type: 'fill-blank',
      prompt: 'Name a union — which keyword can do it?',
      language: 'typescript',
      codeTemplate: '___ Id = string | number;',
      blanks: [{ accepted: ['type'], hint: 'Interfaces cannot express unions.' }],
      explanation: 'Only type aliases can name unions: type Id = string | number.',
    },
  ],
  'literals-enums-const': [
    {
      id: 'ex-asconst',
      type: 'fill-blank',
      prompt: 'Freeze this array into readonly literal types.',
      language: 'typescript',
      codeTemplate: "const ROLES = ['admin', 'editor'] as ___;",
      blanks: [{ accepted: ['const'], hint: 'The narrowing assertion.' }],
      explanation:
        "as const makes the elements readonly literals 'admin' | 'editor' instead of string.",
    },
  ],
  classes: [
    {
      id: 'ex-implements',
      type: 'fill-blank',
      prompt: 'Make the compiler verify this class fulfills the UserService contract.',
      language: 'typescript',
      codeTemplate: 'class ApiUserService ___ UserService {\n  // ...\n}',
      blanks: [{ accepted: ['implements'], hint: 'Contract, not inheritance.' }],
      explanation:
        'implements checks the class against the interface; extends would inherit from a class.',
    },
  ],

  // ---------- Level 3 ----------
  generics: [
    {
      id: 'ex-generic',
      type: 'fill-blank',
      prompt: 'Declare the type parameter for this generic function.',
      language: 'typescript',
      codeTemplate: 'function first<___>(arr: T[]): T | undefined {\n  return arr[0];\n}',
      blanks: [{ accepted: ['T'], hint: 'The conventional single-letter name used in the body.' }],
      explanation:
        '<T> declares the type parameter that arr: T[] and the return type refer to.',
    },
  ],
  'utility-types': [
    {
      id: 'ex-utilities',
      type: 'fill-blank',
      prompt: 'Derive a creation payload (no id) and an update patch (all optional).',
      language: 'typescript',
      codeTemplate:
        "type CreateUser = ___<User, 'id'>;\ntype UpdateUser = ___<User>;",
      blanks: [
        { accepted: ['Omit'], hint: 'Drops the listed keys.' },
        { accepted: ['Partial'], hint: 'Makes everything optional.' },
      ],
      explanation:
        "Omit<User, 'id'> removes id; Partial<User> makes every field optional — the classic create/update pair.",
    },
  ],
  'keyof-typeof': [
    {
      id: 'ex-keyof',
      type: 'fill-blank',
      prompt: 'Derive the union of keys from this object’s type.',
      language: 'typescript',
      codeTemplate:
        "const LABELS = { pending: 'P', done: 'D' } as const;\ntype Status = ___ typeof LABELS;",
      blanks: [{ accepted: ['keyof'], hint: 'Keys as a literal union.' }],
      explanation:
        "keyof typeof LABELS gives 'pending' | 'done' — types derived from data.",
    },
  ],
  'type-guards': [
    {
      id: 'ex-predicate',
      type: 'fill-blank',
      prompt: 'Complete the type predicate that makes this a custom guard.',
      language: 'typescript',
      codeTemplate:
        "function isUser(value: unknown): value ___ User {\n  return typeof value === 'object' && value !== null && 'id' in value;\n}",
      blanks: [{ accepted: ['is'], hint: 'value ... User — one tiny keyword.' }],
      explanation:
        'The "value is User" return type tells TS to narrow the argument when the guard returns true.',
    },
  ],

  // ---------- Level 4 ----------
  tsconfig: [
    {
      id: 'ex-strict',
      type: 'fill-blank',
      prompt: 'Enable the single most important compiler option.',
      language: 'json',
      codeTemplate: '{\n  "compilerOptions": {\n    "___": true\n  }\n}',
      blanks: [{ accepted: ['strict'], hint: 'It switches on a whole family of checks.' }],
      explanation:
        'strict: true enables strictNullChecks, noImplicitAny, and friends — always on in new projects.',
    },
  ],
  'modules-declarations': [
    {
      id: 'ex-importtype',
      type: 'fill-blank',
      prompt: 'Make this a type-only import (fully erased at compile time).',
      language: 'typescript',
      codeTemplate: "import ___ { User } from './models';",
      blanks: [{ accepted: ['type'], hint: 'No runtime dependency.' }],
      explanation:
        'import type guarantees the import disappears in the output — types only.',
    },
  ],
  'async-types': [
    {
      id: 'ex-promise',
      type: 'fill-blank',
      prompt: 'Complete the return type of this async function.',
      language: 'typescript',
      codeTemplate:
        'async function getUser(id: number): ___<User> {\n  return fetchUser(id);\n}',
      blanks: [{ accepted: ['Promise'], hint: 'async always wraps the result.' }],
      explanation: 'Async functions always return Promise<T> — here Promise<User>.',
    },
  ],
  'working-with-js': [
    {
      id: 'ex-zodinfer',
      type: 'fill-blank',
      prompt: 'Derive the static type from the Zod schema.',
      language: 'typescript',
      codeTemplate: 'type User = z.___<typeof UserSchema>;',
      blanks: [{ accepted: ['infer'], hint: 'One schema, validator + type.' }],
      explanation:
        'z.infer extracts the TypeScript type from the runtime schema — a single source of truth.',
    },
  ],

  // ---------- Level 5 ----------
  'conditional-types': [
    {
      id: 'ex-infer',
      type: 'fill-blank',
      prompt: 'Capture the array element type in this conditional type.',
      language: 'typescript',
      codeTemplate: 'type ElementOf<T> = T extends (___ E)[] ? E : never;',
      blanks: [{ accepted: ['infer'], hint: 'Type-level pattern matching.' }],
      explanation:
        'infer E names the matched element type — the same mechanism behind ReturnType and Awaited.',
    },
  ],
  'pro-patterns': [
    {
      id: 'ex-arrange-state',
      type: 'arrange',
      prompt: 'Arrange a discriminated union modeling loading / loaded / error states.',
      language: 'typescript',
      lines: [
        'type State =',
        "  | { kind: 'loading' }",
        "  | { kind: 'loaded'; data: string }",
        "  | { kind: 'error'; message: string };",
      ],
      explanation:
        'Each variant carries exactly its own data — "loaded without data" is unrepresentable.',
    },
  ],
  'ts-tooling': [
    {
      id: 'ex-noemit',
      type: 'fill-blank',
      prompt: 'Run the type checker without producing output files (the CI gate).',
      language: 'bash',
      codeTemplate: 'npx tsc --___',
      blanks: [{ accepted: ['noEmit'], hint: 'Check only, emit nothing.' }],
      explanation:
        'tsc --noEmit is the standard type gate — your bundler builds, tsc verifies.',
    },
  ],
  'ts-ecosystem': [
    {
      id: 'ex-props',
      type: 'fill-blank',
      prompt: 'React props use the exact construct you already know — which one?',
      language: 'typescript',
      codeTemplate: '___ Props {\n  title: string;\n  onClose: () => void;\n}',
      blanks: [{ accepted: ['interface'], hint: 'The same tool as Angular models.' }],
      explanation:
        'React props are plain interfaces — the type system is identical across frameworks.',
    },
  ],
};
