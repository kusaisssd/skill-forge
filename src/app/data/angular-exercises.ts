import { Exercise } from '../models/course.model';

/**
 * Interactive exercises for the Angular course, keyed by lesson id.
 *
 * Two kinds:
 *   - 'fill-blank': `codeTemplate` contains `___` for each blank (in order),
 *     and `blanks[i].accepted` lists answers (checked case-insensitively).
 *   - 'arrange': `lines` are the CORRECT order; the app shuffles them and the
 *     learner drags them back into place.
 */
export const ANGULAR_EXERCISES: Record<string, Exercise[]> = {
  // ---------- Level 1 ----------
  'what-is-angular': [
    {
      id: 'ex-boot',
      type: 'fill-blank',
      prompt: 'Complete the function that starts (bootstraps) an Angular app.',
      language: 'typescript',
      codeTemplate:
        "import { bootstrapApplication } from '@angular/platform-browser';\n\n___(AppComponent, appConfig);",
      blanks: [{ accepted: ['bootstrapApplication'], hint: 'It "boots" the app.' }],
      explanation:
        'bootstrapApplication renders the root component (AppComponent) into <app-root> using the given config.',
    },
  ],
  'typescript-essentials': [
    {
      id: 'ex-type',
      type: 'fill-blank',
      prompt: 'Give the id property the correct TypeScript type.',
      language: 'typescript',
      codeTemplate: 'interface User {\n  id: ___;\n  name: string;\n}',
      blanks: [{ accepted: ['number'], hint: 'A numeric type.' }],
      explanation: 'An id holding a numeric value is typed as number.',
    },
  ],
  'project-structure': [
    {
      id: 'ex-serve',
      type: 'fill-blank',
      prompt: 'Which npm script starts the dev server with live reload?',
      language: 'bash',
      codeTemplate: '# Run the development server\nnpm ___',
      blanks: [{ accepted: ['start'], hint: 'It maps to "ng serve".' }],
      explanation: 'npm start runs ng serve, which serves the app at http://localhost:4200.',
    },
  ],
  'components-and-binding': [
    {
      id: 'ex-event',
      type: 'fill-blank',
      prompt: 'Complete the event binding so the button runs increment() on click.',
      language: 'html',
      codeTemplate: '<button (___)="increment()">+1</button>',
      blanks: [{ accepted: ['click'], hint: 'The DOM event name.' }],
      explanation: 'Event binding uses parentheses: (click)="increment()" runs the method on click.',
    },
  ],

  // ---------- Level 2 ----------
  'control-flow-directives': [
    {
      id: 'ex-arrange-for',
      type: 'arrange',
      prompt:
        'Arrange the lines to render a list only when there are todos.',
      language: 'html',
      lines: [
        '@if (todos.length > 0) {',
        '  @for (todo of todos; track todo.id) {',
        '    <li>{{ todo.title }}</li>',
        '  }',
        '}',
      ],
      explanation:
        'The @if wraps the @for; the @for loops the items; braces close the for, then the if.',
    },
  ],
  pipes: [
    {
      id: 'ex-async',
      type: 'fill-blank',
      prompt: 'Which pipe unwraps an Observable directly in the template?',
      language: 'html',
      codeTemplate: '<p>Server time: {{ time$ | ___ }}</p>',
      blanks: [{ accepted: ['async'], hint: 'It also unsubscribes for you.' }],
      explanation:
        'The async pipe subscribes to the Observable, prints its latest value, and cleans up automatically.',
    },
  ],
  'component-communication': [
    {
      id: 'ex-inout',
      type: 'fill-blank',
      prompt: 'Declare a signal input (data in) and a signal output (events out).',
      language: 'typescript',
      codeTemplate:
        'value = ___<number>(0);    // parent -> child\nchanged = ___<number>();   // child -> parent',
      blanks: [
        { accepted: ['input'], hint: 'Receives data from the parent.' },
        { accepted: ['output'], hint: 'Emits events to the parent.' },
      ],
      explanation:
        'input() declares a reactive input; output() declares an event the parent can listen to.',
    },
  ],
  'services-and-di': [
    {
      id: 'ex-di',
      type: 'fill-blank',
      prompt: 'Make the service an app-wide singleton and inject it into a component.',
      language: 'typescript',
      codeTemplate:
        "@Injectable({ providedIn: '___' })\nexport class Api {}\n\n// inside a component\nprivate api = ___(Api);",
      blanks: [
        { accepted: ['root'], hint: 'One shared instance for the whole app.' },
        { accepted: ['inject'], hint: 'The modern DI function.' },
      ],
      explanation:
        "providedIn: 'root' creates a singleton; inject(Api) asks Angular for that instance.",
    },
  ],

  // ---------- Level 3 ----------
  signals: [
    {
      id: 'ex-signal',
      type: 'fill-blank',
      prompt: 'Read a signal’s value, then update it based on the old value.',
      language: 'typescript',
      codeTemplate:
        'const count = signal(0);\nconsole.log(count___);     // read the value\ncount.___((n) => n + 1);   // update from previous',
      blanks: [
        { accepted: ['()'], hint: 'Signals are read by calling them.' },
        { accepted: ['update'], hint: 'Derives the next value from the current one.' },
      ],
      explanation:
        'You read a signal by calling it: count(). update() computes the next value from the current one.',
    },
  ],
  'rxjs-observables': [
    {
      id: 'ex-arrange-pipe',
      type: 'arrange',
      prompt: 'Arrange a search pipeline: debounce, de-duplicate, then switch to a new request.',
      language: 'typescript',
      lines: [
        'this.results$ = this.term$.pipe(',
        '  debounceTime(300),',
        '  distinctUntilChanged(),',
        '  switchMap((term) => this.api.search(term))',
        ');',
      ],
      explanation:
        'Operators run top to bottom: wait for a pause, ignore repeats, then switch to the newest API call.',
    },
  ],
  'http-client': [
    {
      id: 'ex-http',
      type: 'fill-blank',
      prompt: 'Complete the HTTP method that reads a typed list of users.',
      language: 'typescript',
      codeTemplate:
        "getAll(): Observable<User[]> {\n  return this.http.___<User[]>('/api/users');\n}",
      blanks: [{ accepted: ['get'], hint: 'The HTTP verb for reading data.' }],
      explanation: 'http.get<User[]>(url) returns an Observable of the typed response.',
    },
  ],
  forms: [
    {
      id: 'ex-form',
      type: 'fill-blank',
      prompt: 'Bind a reactive form group and link an input to the "email" control.',
      language: 'html',
      codeTemplate:
        '<form [___]="form">\n  <input ___="email" />\n</form>',
      blanks: [
        { accepted: ['formGroup'], hint: 'Binds the template form to the class model.' },
        { accepted: ['formControlName'], hint: 'Links an input to a named control.' },
      ],
      explanation:
        '[formGroup] binds the model; formControlName="email" connects the input to that control.',
    },
  ],

  // ---------- Level 4 ----------
  routing: [
    {
      id: 'ex-lazy',
      type: 'fill-blank',
      prompt: 'Complete the route property that lazy-loads a standalone component.',
      language: 'typescript',
      codeTemplate:
        "{\n  path: 'skills/:id',\n  ___: () => import('./skill.component').then((m) => m.SkillComponent),\n}",
      blanks: [{ accepted: ['loadComponent'], hint: 'Loads a single standalone component on demand.' }],
      explanation:
        'loadComponent with a dynamic import() lazy-loads the component in its own chunk.',
    },
  ],
  'standalone-vs-modules': [
    {
      id: 'ex-standalone',
      type: 'fill-blank',
      prompt: 'Make this component standalone (no NgModule needed).',
      language: 'typescript',
      codeTemplate:
        "@Component({\n  selector: 'app-card',\n  ___: true,\n  imports: [MatCardModule],\n  template: '<mat-card>Hi</mat-card>',\n})",
      blanks: [{ accepted: ['standalone'], hint: 'The flag that removes the NgModule requirement.' }],
      explanation:
        'standalone: true lets the component declare its own imports without an NgModule.',
    },
  ],
  'file-organization': [
    {
      id: 'ex-naming',
      type: 'fill-blank',
      prompt: 'Following Angular conventions, name the file for a users service.',
      language: 'text',
      codeTemplate: '// A class that fetches users belongs in:\nuser.___.ts',
      blanks: [{ accepted: ['service'], hint: 'The role goes in the middle: name.ROLE.ts' }],
      explanation:
        'The name.role.ts convention gives user.service.ts — the role tells you what the file is.',
    },
  ],
  'state-management': [
    {
      id: 'ex-arrange-store',
      type: 'arrange',
      prompt: 'Arrange a simple signal-based store with a derived count and an add method.',
      language: 'typescript',
      lines: [
        "@Injectable({ providedIn: 'root' })",
        'export class CartStore {',
        '  private items = signal<string[]>([]);',
        '  readonly count = computed(() => this.items().length);',
        '  add(item: string) { this.items.update((l) => [...l, item]); }',
        '}',
      ],
      explanation:
        'Decorator, class, private state, derived count, mutation method, closing brace — in that order.',
    },
  ],

  // ---------- Level 5 ----------
  'change-detection': [
    {
      id: 'ex-onpush',
      type: 'fill-blank',
      prompt: 'Set the change-detection strategy that re-checks only on input/event changes.',
      language: 'typescript',
      codeTemplate: 'changeDetection: ChangeDetectionStrategy.___,',
      blanks: [{ accepted: ['OnPush'], hint: 'It "pushes" updates only when inputs change.' }],
      explanation:
        'OnPush limits change detection to input changes and local events, improving performance.',
    },
  ],
  testing: [
    {
      id: 'ex-expect',
      type: 'fill-blank',
      prompt: 'Complete the assertion in this unit test.',
      language: 'typescript',
      codeTemplate:
        "it('increments', () => {\n  service.increment();\n  ___(service.count()).toBe(1);\n});",
      blanks: [{ accepted: ['expect'], hint: 'The Jasmine assertion function.' }],
      explanation: 'expect(value).toBe(expected) is the standard Jasmine assertion.',
    },
  ],
  'library-ecosystem': [
    {
      id: 'ex-ngadd',
      type: 'fill-blank',
      prompt: 'Which CLI command installs AND configures a library via its schematic?',
      language: 'bash',
      codeTemplate: 'ng ___ @angular/material',
      blanks: [{ accepted: ['add'], hint: 'More than npm install — it runs setup.' }],
      explanation:
        'ng add installs the package and runs its setup schematic (theme, animations, etc.).',
    },
  ],
  'build-and-deploy': [
    {
      id: 'ex-build',
      type: 'fill-blank',
      prompt: 'Which command produces optimized static files in dist/?',
      language: 'bash',
      codeTemplate: '# Production build\nng ___',
      blanks: [{ accepted: ['build'], hint: 'It compiles and bundles for production.' }],
      explanation: 'ng build outputs minified, tree-shaken static files into dist/ ready to deploy.',
    },
  ],
};
