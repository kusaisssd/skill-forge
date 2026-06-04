import { Course } from '../models/course.model';

/**
 * The Angular course — from zero to advanced.
 *
 * The goal of this course is NOT to make you memorize code. It is to make you:
 *   1. understand the core concepts,
 *   2. read any Angular code and know what it does,
 *   3. know how files/folders are organized and which libraries exist,
 *   4. be able to write what you need with confidence.
 *
 * Every lesson has: a concept explanation, annotated code to READ, key
 * takeaways, and a short quiz so you can test your understanding.
 */
export const ANGULAR_COURSE: Course = {
  outcome:
    'By the end you will understand how Angular apps are structured, read components/services/templates fluently, know the modern toolset (signals, standalone, RxJS, forms, routing), and know how to organize a real project and which libraries to reach for.',
  levels: [
    // ===================================================================
    // LEVEL 1 — FOUNDATIONS
    // ===================================================================
    {
      id: 'l1-foundations',
      order: 1,
      title: 'Level 1 — Foundations',
      goal: 'Understand what Angular is, the TypeScript you need, how a project is laid out, and how components display data.',
      lessons: [
        {
          id: 'what-is-angular',
          title: 'What Angular is & how an app boots',
          minutes: 9,
          blurb: 'The big picture: a component-based TypeScript framework.',
          concept: [
            {
              heading: 'What Angular actually is',
              body: 'Angular is a **framework** for building web applications, written in **TypeScript** (JavaScript with types). Unlike a small library that does one job, Angular is "batteries included": it ships with a router, an HTTP client, forms, dependency injection, and a build system. You learn one consistent way to do things instead of gluing many libraries together.\n\nAn Angular app is a **tree of components**. A component is a reusable piece of the screen — a navbar, a card, a form — made of three parts: a TypeScript class (logic), an HTML template (what you see), and styles (CSS/SCSS).',
            },
            {
              heading: 'How an app starts (bootstrapping)',
              body: 'The browser loads `index.html`, which contains a single custom tag like `<app-root></app-root>`. That tag is empty until Angular fills it in.\n\nThe file `main.ts` is the entry point. It calls `bootstrapApplication()` with the **root component** (`AppComponent`) and a configuration object. Angular then renders `AppComponent` into `<app-root>`, and from there the whole component tree grows.',
            },
            {
              body: "Modern Angular (v17+) uses **standalone components** by default — components declare their own dependencies, so you no longer need the old `NgModule` boilerplate. That's the style this course teaches.",
            },
          ],
          codeSamples: [
            {
              title: 'The entry point',
              filename: 'src/main.ts',
              language: 'typescript',
              code: "import { bootstrapApplication } from '@angular/platform-browser';\nimport { appConfig } from './app/app.config';\nimport { AppComponent } from './app/app.component';\n\nbootstrapApplication(AppComponent, appConfig)\n  .catch((err) => console.error(err));",
              annotations: [
                {
                  line: 1,
                  note: 'bootstrapApplication is the modern, NgModule-free way to start an app.',
                },
                {
                  line: 5,
                  note: 'AppComponent is the root; appConfig provides app-wide services (router, http, etc.).',
                },
                {
                  line: 6,
                  note: 'If startup fails, the error is logged. bootstrapApplication returns a Promise.',
                },
              ],
              explanation:
                'Read this top to bottom: import the bootstrap function, import the root component and its config, then start the app. This file rarely changes.',
            },
            {
              title: 'The host page',
              filename: 'src/index.html',
              language: 'html',
              code: '<!doctype html>\n<html lang="en">\n  <head>\n    <title>My App</title>\n    <base href="/" />\n  </head>\n  <body>\n    <app-root></app-root>\n  </body>\n</html>',
              annotations: [
                {
                  line: 8,
                  note: 'Angular replaces this empty tag with the rendered AppComponent.',
                },
              ],
            },
          ],
          keyPoints: [
            'Angular is a full framework written in TypeScript; an app is a tree of components.',
            'A component = class (logic) + template (HTML) + styles.',
            '`main.ts` boots the app by calling `bootstrapApplication(AppComponent, appConfig)`.',
            'Modern Angular uses **standalone** components — no `NgModule` needed.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What is the entry file that starts an Angular application?',
              options: [
                { id: 'a', text: 'index.html', correct: false },
                { id: 'b', text: 'main.ts', correct: true },
                { id: 'c', text: 'app.component.ts', correct: false },
                { id: 'd', text: 'package.json', correct: false },
              ],
              explanation:
                'main.ts is the entry point; it calls bootstrapApplication() to render the root component into index.html.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Which three parts make up a component?',
              options: [
                { id: 'a', text: 'Class, template, and styles', correct: true },
                { id: 'b', text: 'Model, view, and controller files only', correct: false },
                { id: 'c', text: 'HTML, JSON, and CSS', correct: false },
                { id: 'd', text: 'Service, pipe, and directive', correct: false },
              ],
              explanation:
                'A component is a TypeScript class for logic, an HTML template for the view, and styles for appearance.',
            },
            {
              id: 'q3',
              type: 'truefalse',
              prompt: 'Modern Angular requires every component to be declared in an NgModule.',
              options: [
                { id: 'a', text: 'True', correct: false },
                { id: 'b', text: 'False', correct: true },
              ],
              explanation:
                'Since v17, standalone components are the default and NgModules are optional.',
            },
          ],
        },
        {
          id: 'typescript-essentials',
          title: 'TypeScript you need for Angular',
          minutes: 11,
          blurb: 'Types, interfaces, classes, generics, decorators — just enough.',
          concept: [
            {
              heading: 'Why TypeScript',
              body: 'Angular is written in TypeScript, and so are your apps. TypeScript adds **types** on top of JavaScript so the editor can catch mistakes before you run the code. You annotate values with `: type`.',
            },
            {
              heading: 'The pieces you will see constantly',
              body: '**Type annotations**: `let count: number = 0;` or `name: string`.\n\n**Interfaces** describe the shape of an object. They are pure types — they disappear at runtime: `interface User { id: number; name: string; }`.\n\n**Classes** hold data and behavior. Angular components and services are classes.\n\n**Generics** let a type be reused with different inner types, written with angle brackets: `Array<User>`, `Observable<string>`.\n\n**Decorators** are the `@Something(...)` lines above classes/properties. Angular uses them heavily: `@Component`, `@Injectable`, `@Input`.',
            },
            {
              heading: 'Access modifiers & shorthand',
              body: 'In a class, `private` hides a member from outside, `readonly` prevents reassignment, and `public` is the default. A common Angular shortcut is declaring dependencies right in the constructor — though the newer `inject()` function is now preferred (you will see both).',
            },
          ],
          codeSamples: [
            {
              title: 'Interface + class with types',
              filename: 'example.ts',
              language: 'typescript',
              code: "interface User {\n  id: number;\n  name: string;\n  isAdmin?: boolean; // optional\n}\n\nclass UserStore {\n  private users: User[] = [];\n\n  add(user: User): void {\n    this.users.push(user);\n  }\n\n  findById(id: number): User | undefined {\n    return this.users.find((u) => u.id === id);\n  }\n}",
              annotations: [
                { line: 4, note: 'The ? makes isAdmin optional — it may be undefined.' },
                { line: 8, note: 'private: only this class can touch `users`. User[] means an array of User.' },
                { line: 10, note: ': void means this method returns nothing.' },
                { line: 14, note: 'Return type User | undefined: it might not find a match.' },
              ],
              explanation:
                'Notice you can predict what every line does from its types alone — that is the whole point of TypeScript.',
            },
            {
              title: 'A decorator in action',
              filename: 'logo.component.ts',
              language: 'typescript',
              code: "import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-logo',\n  standalone: true,\n  template: '<h1>My App</h1>',\n})\nexport class LogoComponent {}",
              annotations: [
                { line: 3, note: '@Component is a decorator: metadata attached to the class below it.' },
                { line: 4, note: 'selector is the custom HTML tag for this component: <app-logo>.' },
              ],
            },
          ],
          keyPoints: [
            'TypeScript = JavaScript + types; annotate with `: type`.',
            '`interface` describes an object shape and vanishes at runtime.',
            'Generics like `Array<User>` reuse a type with a specific inner type.',
            'Decorators (`@Component`, `@Injectable`) attach metadata Angular reads.',
            '`private` / `readonly` control access; `inject()` is the modern way to get dependencies.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does an `interface` compile to in the final JavaScript?',
              options: [
                { id: 'a', text: 'A class with a constructor', correct: false },
                { id: 'b', text: 'Nothing — interfaces are erased at compile time', correct: true },
                { id: 'c', text: 'A JSON object', correct: false },
                { id: 'd', text: 'A function', correct: false },
              ],
              explanation:
                'Interfaces are purely compile-time type information; they produce no runtime code.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'In `findById(id: number): User | undefined`, what does the part after the colon mean?',
              options: [
                { id: 'a', text: 'The parameter type', correct: false },
                { id: 'b', text: 'The return type — it returns a User or undefined', correct: true },
                { id: 'c', text: 'A default value', correct: false },
                { id: 'd', text: 'A generic constraint', correct: false },
              ],
              explanation:
                'The type after the parameter list is the return type. Here the method may return a User or undefined.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What is `@Component({...})` called?',
              options: [
                { id: 'a', text: 'A decorator', correct: true },
                { id: 'b', text: 'A generic', correct: false },
                { id: 'c', text: 'An interface', correct: false },
                { id: 'd', text: 'A pipe', correct: false },
              ],
              explanation:
                'The @ syntax is a decorator — it attaches metadata to the class beneath it.',
            },
          ],
        },
        {
          id: 'project-structure',
          title: 'Project structure & the key files',
          minutes: 10,
          blurb: 'What every file in a fresh Angular project is for.',
          concept: [
            {
              heading: 'Anatomy of a project',
              body: 'When you run `ng new my-app`, the CLI creates a folder with config at the root and your code under `src/`. You do not need to understand every file at once — but you should recognize the important ones.',
            },
            {
              heading: 'The files that matter',
              body: '`package.json` — lists dependencies and npm scripts (`npm start`, `npm run build`).\n\n`angular.json` — the CLI configuration: build options, file paths, styles, budgets.\n\n`tsconfig.json` — TypeScript compiler settings (strictness, target).\n\n`src/main.ts` — boots the app.\n\n`src/index.html` — the host page.\n\n`src/styles.scss` — global styles.\n\n`src/app/` — your actual application code lives here.',
            },
            {
              heading: 'Inside src/app',
              body: 'A standalone app typically has `app.component.ts` (root component), `app.config.ts` (providers), and `app.routes.ts` (routes). As the app grows you add folders like `pages/`, `components/`, `services/`, and `models/` — file organization is covered in depth in Level 4.',
            },
          ],
          codeSamples: [
            {
              title: 'A typical folder tree',
              filename: 'project layout',
              language: 'text',
              code: 'my-app/\n  angular.json        <- CLI build config\n  package.json        <- dependencies & scripts\n  tsconfig.json       <- TypeScript config\n  src/\n    index.html        <- host page (<app-root>)\n    main.ts           <- bootstraps the app\n    styles.scss       <- global styles\n    app/\n      app.component.ts <- root component\n      app.config.ts    <- app-wide providers\n      app.routes.ts    <- route table\n      pages/           <- routed feature screens\n      components/      <- reusable UI pieces\n      services/        <- shared logic / data access\n      models/          <- interfaces & types',
              annotations: [
                { line: 2, note: 'Root-level files are configuration; you rarely edit them by hand.' },
                { line: 9, note: 'Everything you build lives under src/app.' },
              ],
            },
            {
              title: 'npm scripts you actually run',
              filename: 'package.json (scripts)',
              language: 'json',
              code: '{\n  "scripts": {\n    "start": "ng serve",\n    "build": "ng build",\n    "watch": "ng build --watch --configuration development"\n  }\n}',
              annotations: [
                { line: 3, note: 'npm start -> dev server with live reload at http://localhost:4200.' },
                { line: 4, note: 'npm run build -> optimized production bundle in dist/.' },
              ],
            },
          ],
          keyPoints: [
            '`package.json` holds dependencies and scripts; `angular.json` configures the CLI build.',
            'Your code lives in `src/app/`; root-level files are configuration.',
            '`npm start` runs the dev server; `npm run build` makes a production bundle.',
            'Common folders: `pages/`, `components/`, `services/`, `models/`.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Which file configures the Angular CLI build (output paths, styles, budgets)?',
              options: [
                { id: 'a', text: 'package.json', correct: false },
                { id: 'b', text: 'angular.json', correct: true },
                { id: 'c', text: 'tsconfig.json', correct: false },
                { id: 'd', text: 'main.ts', correct: false },
              ],
              explanation:
                'angular.json is the CLI workspace configuration controlling how the app is built and served.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Where does the code you write for your app primarily live?',
              options: [
                { id: 'a', text: 'In the root folder', correct: false },
                { id: 'b', text: 'In node_modules/', correct: false },
                { id: 'c', text: 'In src/app/', correct: true },
                { id: 'd', text: 'In dist/', correct: false },
              ],
              explanation:
                'Application code lives under src/app/. dist/ is build output and node_modules/ is dependencies.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does `npm start` (ng serve) do?',
              options: [
                { id: 'a', text: 'Creates a production bundle in dist/', correct: false },
                { id: 'b', text: 'Runs a dev server with live reload', correct: true },
                { id: 'c', text: 'Installs dependencies', correct: false },
                { id: 'd', text: 'Runs unit tests', correct: false },
              ],
              explanation:
                'ng serve starts a local development server (default http://localhost:4200) that reloads on changes.',
            },
          ],
        },
        {
          id: 'components-and-binding',
          title: 'Components, templates & data binding',
          minutes: 13,
          blurb: 'Show data, react to events, and bind values both ways.',
          concept: [
            {
              heading: 'A component up close',
              body: 'A component class holds **state** (properties) and **behavior** (methods). Its template displays that state and calls those methods. Angular keeps the screen in sync with the class automatically.',
            },
            {
              heading: 'The four kinds of binding',
              body: '**Interpolation** `{{ value }}` — print a class property into the HTML.\n\n**Property binding** `[src]="imageUrl"` — set a DOM/element property from a class value. Square brackets mean "data flows from class to template".\n\n**Event binding** `(click)="save()"` — run a method when an event fires. Parentheses mean "data flows from template to class".\n\n**Two-way binding** `[(ngModel)]="name"` — combines both; the famous "banana in a box" `[()]` keeps an input and a property in sync.',
            },
            {
              body: 'A simple memory aid: **[] is input into the element, () is output from the element, and [()] is both.**',
            },
          ],
          codeSamples: [
            {
              title: 'A counter component',
              filename: 'counter.component.ts',
              language: 'typescript',
              code: "import { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-counter',\n  standalone: true,\n  template: `\n    <p>Count: {{ count }}</p>\n    <button (click)=\"increment()\">+1</button>\n    <img [src]=\"iconUrl\" alt=\"icon\" />\n  `,\n})\nexport class CounterComponent {\n  count = 0;\n  iconUrl = '/assets/plus.png';\n\n  increment(): void {\n    this.count++;\n  }\n}",
              annotations: [
                { line: 7, note: 'Interpolation: {{ count }} prints the property value.' },
                { line: 8, note: 'Event binding: (click) runs increment() on click.' },
                { line: 9, note: 'Property binding: [src] sets the img src from iconUrl.' },
                { line: 13, note: 'Component state: a plain class property.' },
                { line: 16, note: 'Behavior: a method the template can call.' },
              ],
              explanation:
                'When increment() changes count, Angular re-renders {{ count }} automatically. You never touch the DOM directly.',
            },
          ],
          keyPoints: [
            'A component holds state (properties) and behavior (methods); the template shows them.',
            '`{{ }}` interpolates, `[prop]` binds class -> element, `(event)` binds element -> class.',
            'Two-way binding `[(ngModel)]` keeps an input and a property in sync.',
            'You change properties; Angular updates the DOM — never manipulate the DOM by hand.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Which binding runs a method when a button is clicked?',
              options: [
                { id: 'a', text: '[click]="save()"', correct: false },
                { id: 'b', text: '(click)="save()"', correct: true },
                { id: 'c', text: '{{ click }}', correct: false },
                { id: 'd', text: '[(click)]="save()"', correct: false },
              ],
              explanation:
                'Parentheses denote event binding. (click)="save()" calls save() when the click event fires.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does `[src]="iconUrl"` do?',
              options: [
                { id: 'a', text: 'Prints the text "iconUrl"', correct: false },
                { id: 'b', text: 'Sets the element\'s src property from the class property iconUrl', correct: true },
                { id: 'c', text: 'Listens for a src event', correct: false },
                { id: 'd', text: 'Creates a two-way binding', correct: false },
              ],
              explanation:
                'Square brackets are property binding: the value flows from the class property into the element property.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which syntax is two-way binding?',
              options: [
                { id: 'a', text: '[value]', correct: false },
                { id: 'b', text: '(value)', correct: false },
                { id: 'c', text: '[(ngModel)]', correct: true },
                { id: 'd', text: '{{ value }}', correct: false },
              ],
              explanation:
                'The "banana in a box" [()] combines property and event binding. [(ngModel)] is the classic example.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 2 — BUILDING BLOCKS
    // ===================================================================
    {
      id: 'l2-building-blocks',
      order: 2,
      title: 'Level 2 — Building blocks',
      goal: 'Render lists and conditions, transform values with pipes, pass data between components, and share logic with services.',
      lessons: [
        {
          id: 'control-flow-directives',
          title: 'Control flow & directives',
          minutes: 12,
          blurb: 'Conditionals, loops, and directives that change the DOM.',
          concept: [
            {
              heading: 'Two kinds of directives',
              body: '**Structural directives** add or remove elements from the DOM (loops, conditionals). **Attribute directives** change the appearance or behavior of an existing element (like `ngClass` or `ngStyle`).',
            },
            {
              heading: 'Built-in control flow (v17+)',
              body: 'Modern Angular has clean, built-in control-flow blocks written with `@`:\n\n`@if (cond) { ... } @else { ... }` for conditionals.\n\n`@for (item of items; track item.id) { ... }` for loops. The `track` part is **required** — it tells Angular how to identify each item so it can update the list efficiently.\n\n`@switch (value) { @case (...) { } @default { } }` for multiple branches.\n\nThese replaced the older `*ngIf` and `*ngFor` directives you may still see in tutorials.',
            },
            {
              heading: 'Attribute directives',
              body: '`[ngClass]` toggles CSS classes, `[ngStyle]` sets inline styles. They do not add/remove elements — they decorate existing ones.',
            },
          ],
          codeSamples: [
            {
              title: 'Looping and conditionals',
              filename: 'todo-list.component.html',
              language: 'html',
              code: "@if (todos.length > 0) {\n  <ul>\n    @for (todo of todos; track todo.id) {\n      <li [ngClass]=\"{ done: todo.completed }\">\n        {{ todo.title }}\n      </li>\n    } @empty {\n      <li>No items yet</li>\n    }\n  </ul>\n} @else {\n  <p>Your list is empty.</p>\n}",
              annotations: [
                { line: 1, note: '@if shows the block only when the condition is true.' },
                { line: 3, note: '@for loops; track todo.id lets Angular identify items efficiently (required).' },
                { line: 4, note: '[ngClass] adds the "done" class when todo.completed is true.' },
                { line: 7, note: '@empty renders when the collection is empty.' },
                { line: 11, note: '@else is the fallback for the @if above.' },
              ],
              explanation:
                'Read it like plain logic: if there are todos, loop and render each; otherwise show a message.',
            },
          ],
          keyPoints: [
            'Structural directives add/remove DOM; attribute directives modify existing elements.',
            'Use `@if`, `@for`, `@switch` (v17+) — older code uses `*ngIf` / `*ngFor`.',
            'The `track` expression in `@for` is required and improves performance.',
            '`[ngClass]` and `[ngStyle]` apply classes/styles conditionally.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'In `@for (item of items; track item.id)`, why is `track` needed?',
              options: [
                { id: 'a', text: 'It sorts the list', correct: false },
                { id: 'b', text: 'It tells Angular how to identify each item to update the list efficiently', correct: true },
                { id: 'c', text: 'It filters out duplicates', correct: false },
                { id: 'd', text: 'It is optional and only for styling', correct: false },
              ],
              explanation:
                'track gives each item a stable identity so Angular can reuse DOM nodes instead of rebuilding the whole list.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Which is a structural directive (adds/removes elements)?',
              options: [
                { id: 'a', text: '[ngClass]', correct: false },
                { id: 'b', text: '[ngStyle]', correct: false },
                { id: 'c', text: '@for / *ngFor', correct: true },
                { id: 'd', text: '[src]', correct: false },
              ],
              explanation:
                'Loops and conditionals are structural — they add or remove DOM nodes. ngClass/ngStyle only decorate.',
            },
            {
              id: 'q3',
              type: 'truefalse',
              prompt: 'The `@empty` block runs when a `@for` collection has no items.',
              options: [
                { id: 'a', text: 'True', correct: true },
                { id: 'b', text: 'False', correct: false },
              ],
              explanation:
                '@empty is an optional companion to @for that renders when the collection is empty.',
            },
          ],
        },
        {
          id: 'pipes',
          title: 'Pipes — transforming values in templates',
          minutes: 8,
          blurb: 'Format dates, currency, text, and async data right in the HTML.',
          concept: [
            {
              heading: 'What a pipe is',
              body: 'A **pipe** transforms a value for display, using the `|` symbol in a template. It does not change the underlying data — only how it is shown. Example: `{{ price | currency }}` shows `1500` as `$1,500.00`.',
            },
            {
              heading: 'Useful built-in pipes',
              body: '`date` — format dates: `{{ today | date:\'mediumDate\' }}`.\n\n`currency`, `number`, `percent` — format numbers.\n\n`uppercase` / `lowercase` / `titlecase` — text.\n\n`json` — debug an object by dumping it.\n\n`async` — subscribe to an Observable or Promise and print its latest value (you will use this constantly with HTTP and signals interop).',
            },
            {
              heading: 'Parameters and chaining',
              body: 'Pipes take parameters after a colon and can be chained: `{{ name | uppercase }}` or `{{ amount | currency:\'EUR\':\'symbol\':\'1.2-2\' }}`. You can also write your own custom pipe with the `@Pipe` decorator.',
            },
          ],
          codeSamples: [
            {
              title: 'Built-in pipes in a template',
              filename: 'profile.component.html',
              language: 'html',
              code: "<p>Joined: {{ user.joinedAt | date:'longDate' }}</p>\n<p>Balance: {{ user.balance | currency:'USD' }}</p>\n<p>Name: {{ user.name | titlecase }}</p>\n\n<!-- async unwraps an Observable automatically -->\n<p>Server time: {{ time$ | async }}</p>",
              annotations: [
                { line: 1, note: "date pipe with a format argument after the colon." },
                { line: 2, note: 'currency pipe formats the number as money.' },
                { line: 6, note: 'async subscribes to time$ and prints its latest emitted value; it also unsubscribes for you.' },
              ],
            },
          ],
          keyPoints: [
            'Pipes transform a value for display using `|`; the data itself is unchanged.',
            'Common pipes: `date`, `currency`, `number`, `uppercase`, `json`, `async`.',
            'Pass parameters after a colon and chain pipes together.',
            'The `async` pipe subscribes to Observables/Promises and cleans up automatically.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does the `async` pipe do?',
              options: [
                { id: 'a', text: 'Makes a function run asynchronously', correct: false },
                { id: 'b', text: 'Subscribes to an Observable/Promise and prints its latest value, unsubscribing automatically', correct: true },
                { id: 'c', text: 'Delays rendering by one second', correct: false },
                { id: 'd', text: 'Converts a value to JSON', correct: false },
              ],
              explanation:
                'The async pipe handles subscription and unsubscription for you and renders the most recent value.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Does a pipe change the original data?',
              options: [
                { id: 'a', text: 'No — it only changes how the value is displayed', correct: true },
                { id: 'b', text: 'Yes — it permanently transforms the property', correct: false },
                { id: 'c', text: 'Only for numbers', correct: false },
                { id: 'd', text: 'Only inside services', correct: false },
              ],
              explanation:
                'Pipes are display-only transformations; the underlying property keeps its original value.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'How do you pass a parameter to a pipe?',
              options: [
                { id: 'a', text: 'With a comma: | date, "short"', correct: false },
                { id: 'b', text: "With a colon: | date:'short'", correct: true },
                { id: 'c', text: 'With parentheses: | date("short")', correct: false },
                { id: 'd', text: 'You cannot pass parameters', correct: false },
              ],
              explanation:
                "Pipe parameters follow a colon, e.g. {{ today | date:'short' }}.",
            },
          ],
        },
        {
          id: 'component-communication',
          title: 'Component communication: inputs & outputs',
          minutes: 12,
          blurb: 'Pass data down with inputs and send events up with outputs.',
          concept: [
            {
              heading: 'Parent to child: inputs',
              body: 'A child component declares an **input** to receive data from its parent. The parent sets it with property binding. Classic syntax uses the `@Input()` decorator; modern Angular uses the `input()` signal function, which is reactive.',
            },
            {
              heading: 'Child to parent: outputs',
              body: 'A child sends events up using an **output**. Classic syntax: `@Output() saved = new EventEmitter<Item>()` and call `this.saved.emit(item)`. Modern syntax: `saved = output<Item>()`. The parent listens with event binding `(saved)="onSaved($event)"`.',
            },
            {
              heading: 'The mental model',
              body: 'Data flows **down** through inputs and events flow **up** through outputs. This one-directional flow keeps apps predictable: a child never reaches into its parent; it just announces "something happened" and lets the parent decide what to do.',
            },
          ],
          codeSamples: [
            {
              title: 'A child with an input and an output',
              filename: 'rating.component.ts',
              language: 'typescript',
              code: "import { Component, input, output } from '@angular/core';\n\n@Component({\n  selector: 'app-rating',\n  standalone: true,\n  template: `\n    <span>Score: {{ value() }}</span>\n    <button (click)=\"bump()\">+</button>\n  `,\n})\nexport class RatingComponent {\n  value = input<number>(0);        // parent -> child\n  changed = output<number>();      // child -> parent\n\n  bump(): void {\n    this.changed.emit(this.value() + 1);\n  }\n}",
              annotations: [
                { line: 12, note: 'input<number>(0): a reactive input with default 0. Read it by CALLING it: value().' },
                { line: 13, note: 'output<number>(): an event the parent can listen to.' },
                { line: 16, note: 'emit() sends a value up to whoever is listening.' },
              ],
              explanation:
                'Note value() is called like a function — signal inputs are read by calling them.',
            },
            {
              title: 'The parent wiring it up',
              filename: 'parent.component.html',
              language: 'html',
              code: "<app-rating\n  [value]=\"score\"\n  (changed)=\"onChanged($event)\"\n></app-rating>",
              annotations: [
                { line: 2, note: '[value] passes data DOWN into the child input.' },
                { line: 3, note: '(changed) listens for the child output; $event is the emitted value.' },
              ],
            },
          ],
          keyPoints: [
            'Inputs pass data **down** (parent to child); outputs send events **up** (child to parent).',
            'Classic: `@Input()` / `@Output() + EventEmitter`. Modern: `input()` / `output()`.',
            'Signal inputs are read by calling them: `value()`.',
            'In the parent, `[input]` binds data and `(output)` listens; `$event` is the payload.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Which direction does an @Input() carry data?',
              options: [
                { id: 'a', text: 'Child to parent', correct: false },
                { id: 'b', text: 'Parent to child', correct: true },
                { id: 'c', text: 'Sibling to sibling', correct: false },
                { id: 'd', text: 'Service to component', correct: false },
              ],
              explanation:
                'Inputs flow down: the parent passes data into the child via property binding.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'How does a child notify its parent that something happened?',
              options: [
                { id: 'a', text: 'By calling a method on the parent directly', correct: false },
                { id: 'b', text: 'By emitting an output event the parent listens to', correct: true },
                { id: 'c', text: 'By editing the parent property', correct: false },
                { id: 'd', text: 'By using localStorage', correct: false },
              ],
              explanation:
                'The child emits via an output; the parent listens with (event)="handler($event)" and decides what to do.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'With a signal input `value = input<number>(0)`, how do you read it in the template?',
              options: [
                { id: 'a', text: '{{ value }}', correct: false },
                { id: 'b', text: '{{ value() }}', correct: true },
                { id: 'c', text: '{{ this.value }}', correct: false },
                { id: 'd', text: '{{ value.get() }}', correct: false },
              ],
              explanation:
                'Signals (including signal inputs) are read by calling them as functions: value().',
            },
          ],
        },
        {
          id: 'services-and-di',
          title: 'Services & dependency injection',
          minutes: 12,
          blurb: 'Share logic and data, and let Angular wire it up for you.',
          concept: [
            {
              heading: 'What a service is',
              body: 'A **service** is a plain class that holds logic or data you want to reuse — fetching from an API, managing state, logging. Components should stay focused on the view and delegate real work to services.',
            },
            {
              heading: 'Dependency injection (DI)',
              body: "**Dependency injection** means you don't create your dependencies with `new` — you ask Angular for them and it provides a shared instance. Mark a service with `@Injectable({ providedIn: 'root' })` and Angular makes a single app-wide (singleton) instance available everywhere.",
            },
            {
              heading: 'Getting a service into a component',
              body: 'The modern way is the `inject()` function: `private api = inject(ApiService);`. The older way is constructor injection: `constructor(private api: ApiService) {}`. Both ask Angular for the instance; you just use it.',
            },
          ],
          codeSamples: [
            {
              title: 'A service and a component that uses it',
              filename: 'counter.service.ts',
              language: 'typescript',
              code: "import { Injectable, signal } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class CounterService {\n  private _count = signal(0);\n  readonly count = this._count.asReadonly();\n\n  increment(): void {\n    this._count.update((n) => n + 1);\n  }\n}",
              annotations: [
                { line: 3, note: "providedIn: 'root' makes one shared instance for the whole app." },
                { line: 5, note: 'Internal writable state; exposed read-only on the next line.' },
              ],
            },
            {
              title: 'Injecting it',
              filename: 'counter.component.ts',
              language: 'typescript',
              code: "import { Component, inject } from '@angular/core';\nimport { CounterService } from './counter.service';\n\n@Component({\n  selector: 'app-counter',\n  standalone: true,\n  template: `<button (click)=\"svc.increment()\">{{ svc.count() }}</button>`,\n})\nexport class CounterComponent {\n  protected svc = inject(CounterService);\n}",
              annotations: [
                { line: 10, note: 'inject() asks Angular for the shared CounterService instance.' },
                { line: 7, note: 'The template calls svc.count() (a signal) and svc.increment().' },
              ],
              explanation:
                'Because the service is providedIn root, every component that injects it shares the same count.',
            },
          ],
          keyPoints: [
            'Services are reusable classes for logic/data; keep components focused on the view.',
            "`@Injectable({ providedIn: 'root' })` creates a single app-wide instance.",
            'DI means Angular gives you dependencies — you never `new` them yourself.',
            'Get a service with `inject(Service)` (modern) or constructor injection (classic).',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: "What does `providedIn: 'root'` do?",
              options: [
                { id: 'a', text: 'Creates a new instance for every component', correct: false },
                { id: 'b', text: 'Registers a single shared (singleton) instance for the whole app', correct: true },
                { id: 'c', text: 'Makes the service run on a server', correct: false },
                { id: 'd', text: 'Prevents the service from being injected', correct: false },
              ],
              explanation:
                "providedIn: 'root' provides one app-wide singleton, available to anything that injects it.",
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'In dependency injection, who creates the service instance?',
              options: [
                { id: 'a', text: 'You, with the `new` keyword', correct: false },
                { id: 'b', text: 'Angular, which provides it when you ask', correct: true },
                { id: 'c', text: 'The browser', correct: false },
                { id: 'd', text: 'The template', correct: false },
              ],
              explanation:
                'Angular’s injector constructs and supplies dependencies; you request them via inject() or the constructor.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which is the modern way to obtain a service inside a class?',
              options: [
                { id: 'a', text: 'const s = new Service()', correct: false },
                { id: 'b', text: 'private s = inject(Service)', correct: true },
                { id: 'c', text: 'import Service from "service"', correct: false },
                { id: 'd', text: 'Service.getInstance()', correct: false },
              ],
              explanation:
                'The inject() function is the modern, flexible way to get a dependency; constructor injection also works.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 3 — DATA & REACTIVITY
    // ===================================================================
    {
      id: 'l3-data-reactivity',
      order: 3,
      title: 'Level 3 — Data & reactivity',
      goal: 'Manage changing data with signals, understand RxJS observables, fetch from APIs with HttpClient, and build forms.',
      lessons: [
        {
          id: 'signals',
          title: 'Signals — Angular’s reactivity model',
          minutes: 12,
          blurb: 'Reactive values that update the UI automatically.',
          concept: [
            {
              heading: 'What a signal is',
              body: 'A **signal** is a wrapper around a value that notifies anyone who reads it when it changes. Signals are the modern foundation of reactivity in Angular (v16+). You read a signal by **calling it**: `count()`.',
            },
            {
              heading: 'Creating and updating',
              body: '`const count = signal(0);` creates a writable signal.\n\nRead: `count()`.\n\nSet a new value: `count.set(5)`.\n\nUpdate based on the old value: `count.update(n => n + 1)`.',
            },
            {
              heading: 'computed and effect',
              body: '`computed(() => ...)` derives a value from other signals and recalculates automatically when they change: `const doubled = computed(() => count() * 2);`. It is read-only.\n\n`effect(() => ...)` runs a side effect whenever the signals it reads change — useful for logging or syncing to storage.\n\nWhy signals matter: Angular knows exactly which signals a template uses, so it can update just those parts of the screen — faster and simpler than the old model.',
            },
          ],
          codeSamples: [
            {
              title: 'Signals, computed, and effect',
              filename: 'cart.component.ts',
              language: 'typescript',
              code: "import { Component, signal, computed, effect } from '@angular/core';\n\n@Component({\n  selector: 'app-cart',\n  standalone: true,\n  template: `\n    <p>Items: {{ qty() }} — Total: {{ total() }}</p>\n    <button (click)=\"add()\">Add</button>\n  `,\n})\nexport class CartComponent {\n  qty = signal(1);\n  price = signal(10);\n  total = computed(() => this.qty() * this.price());\n\n  constructor() {\n    effect(() => console.log('qty changed to', this.qty()));\n  }\n\n  add(): void {\n    this.qty.update((n) => n + 1);\n  }\n}",
              annotations: [
                { line: 12, note: 'A writable signal, initial value 1. Read with qty().' },
                { line: 14, note: 'computed re-runs automatically when qty or price changes.' },
                { line: 17, note: 'effect runs every time qty() changes — good for side effects.' },
                { line: 21, note: 'update() computes the next value from the current one.' },
              ],
              explanation:
                'When add() runs, qty changes, total recomputes, the template re-renders, and the effect logs — all automatically.',
            },
          ],
          keyPoints: [
            'A signal wraps a value and tracks who reads it; read it by calling: `count()`.',
            '`set()` replaces the value; `update()` derives the next value from the current one.',
            '`computed()` derives a read-only value that auto-recalculates.',
            '`effect()` runs side effects when its signals change.',
            'Signals let Angular update only the parts of the UI that actually changed.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'How do you read the current value of a signal named `count`?',
              options: [
                { id: 'a', text: 'count', correct: false },
                { id: 'b', text: 'count()', correct: true },
                { id: 'c', text: 'count.value', correct: false },
                { id: 'd', text: 'count.get', correct: false },
              ],
              explanation: 'Signals are read by calling them as functions: count().',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is `computed()` for?',
              options: [
                { id: 'a', text: 'Creating a writable value', correct: false },
                { id: 'b', text: 'Deriving a read-only value that recalculates when its inputs change', correct: true },
                { id: 'c', text: 'Making an HTTP request', correct: false },
                { id: 'd', text: 'Subscribing to the DOM', correct: false },
              ],
              explanation:
                'computed produces a derived, read-only signal that updates automatically when the signals it reads change.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which method updates a signal using its previous value?',
              options: [
                { id: 'a', text: 'set()', correct: false },
                { id: 'b', text: 'update()', correct: true },
                { id: 'c', text: 'emit()', correct: false },
                { id: 'd', text: 'next()', correct: false },
              ],
              explanation:
                'update() takes a function of the current value, e.g. count.update(n => n + 1). set() replaces it outright.',
            },
          ],
        },
        {
          id: 'rxjs-observables',
          title: 'RxJS & Observables',
          minutes: 14,
          blurb: 'Streams of values over time — the basis of HTTP and events.',
          concept: [
            {
              heading: 'What an Observable is',
              body: 'An **Observable** is a stream of values that arrive over time — like an array spread across time. HTTP responses, user events, and timers are all modeled as observables. RxJS is the library Angular uses for them.',
            },
            {
              heading: 'Subscribing',
              body: "Nothing happens until you **subscribe**. `obs.subscribe(value => ...)` starts listening. In templates, the `async` pipe subscribes for you and unsubscribes automatically — prefer it to avoid memory leaks.",
            },
            {
              heading: 'Operators',
              body: 'You transform streams with **operators** inside `.pipe(...)`. Common ones: `map` (transform each value), `filter` (keep some), `switchMap` (swap to a new inner stream — great for search-as-you-type), `debounceTime` (wait for a pause), `catchError` (handle failures).',
            },
            {
              heading: 'Signals vs Observables',
              body: 'Signals are best for **synchronous state** that the UI reads. Observables are best for **asynchronous streams** (HTTP, events). They interoperate: `toSignal(obs$)` turns a stream into a signal. Use each where it fits.',
            },
          ],
          codeSamples: [
            {
              title: 'A typical pipe of operators',
              filename: 'search.component.ts',
              language: 'typescript',
              code: "import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';\n\nthis.results$ = this.searchTerm$.pipe(\n  debounceTime(300),\n  distinctUntilChanged(),\n  switchMap((term) => this.api.search(term))\n);",
              annotations: [
                { line: 4, note: 'Wait 300ms after typing stops before reacting.' },
                { line: 5, note: 'Ignore the value if it is the same as last time.' },
                { line: 6, note: 'switchMap cancels the previous request and switches to the newest search.' },
              ],
              explanation:
                'Read pipes top-down as a recipe: debounce, dedupe, then swap to a fresh API call. results$ can be rendered with | async.',
            },
          ],
          keyPoints: [
            'An Observable is a stream of values over time; RxJS provides them.',
            'Nothing runs until you subscribe; the `async` pipe subscribes and cleans up for you.',
            'Operators inside `.pipe()` transform streams: `map`, `filter`, `switchMap`, `debounceTime`.',
            'Signals = synchronous state; Observables = async streams. `toSignal()` bridges them.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'When does an Observable start producing values?',
              options: [
                { id: 'a', text: 'As soon as it is created', correct: false },
                { id: 'b', text: 'Only when something subscribes to it', correct: true },
                { id: 'c', text: 'After 1 second', correct: false },
                { id: 'd', text: 'Never, on its own', correct: false },
              ],
              explanation:
                'Observables are lazy: they do nothing until subscribed (directly, or via the async pipe).',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Which operator is ideal for search-as-you-type, cancelling stale requests?',
              options: [
                { id: 'a', text: 'map', correct: false },
                { id: 'b', text: 'filter', correct: false },
                { id: 'c', text: 'switchMap', correct: true },
                { id: 'd', text: 'reduce', correct: false },
              ],
              explanation:
                'switchMap unsubscribes from the previous inner observable when a new value arrives, cancelling outdated requests.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What is the recommended way to render an Observable in a template?',
              options: [
                { id: 'a', text: 'Call .subscribe() in the template', correct: false },
                { id: 'b', text: 'Use the async pipe', correct: true },
                { id: 'c', text: 'Convert it to a string', correct: false },
                { id: 'd', text: 'Store it in localStorage', correct: false },
              ],
              explanation:
                'The async pipe subscribes, shows the latest value, and unsubscribes automatically, preventing leaks.',
            },
          ],
        },
        {
          id: 'http-client',
          title: 'HttpClient — talking to APIs',
          minutes: 11,
          blurb: 'Fetch and send data over HTTP the Angular way.',
          concept: [
            {
              heading: 'Enabling HttpClient',
              body: 'Add `provideHttpClient()` to your app providers (in `app.config.ts`). Then inject `HttpClient` wherever you need it.',
            },
            {
              heading: 'Making requests',
              body: '`http.get<Type>(url)` returns an **Observable** of the response, typed with a generic so you get type-safe data. There are matching `post`, `put`, `patch`, and `delete` methods. Because it is an Observable, you subscribe or use the `async` pipe; nothing is sent until then.',
            },
            {
              heading: 'Good practice',
              body: 'Wrap HTTP calls in a **service** rather than calling `HttpClient` from components. Components ask the service for data; the service knows the URLs and shapes. Handle errors with the `catchError` operator.',
            },
          ],
          codeSamples: [
            {
              title: 'A data service',
              filename: 'user-api.service.ts',
              language: 'typescript',
              code: "import { Injectable, inject } from '@angular/core';\nimport { HttpClient } from '@angular/common/http';\nimport { Observable } from 'rxjs';\n\ninterface User { id: number; name: string; }\n\n@Injectable({ providedIn: 'root' })\nexport class UserApiService {\n  private http = inject(HttpClient);\n  private base = '/api/users';\n\n  getAll(): Observable<User[]> {\n    return this.http.get<User[]>(this.base);\n  }\n\n  create(name: string): Observable<User> {\n    return this.http.post<User>(this.base, { name });\n  }\n}",
              annotations: [
                { line: 9, note: 'Inject HttpClient (requires provideHttpClient() in app config).' },
                { line: 12, note: 'get<User[]> returns an Observable typed as an array of User.' },
                { line: 16, note: 'post sends a body ({ name }) and returns the created User.' },
              ],
              explanation:
                'The component would call userApi.getAll() and render it with the async pipe — it never sees a URL.',
            },
          ],
          keyPoints: [
            'Register HTTP with `provideHttpClient()` in `app.config.ts`, then inject `HttpClient`.',
            '`http.get<T>(url)` returns a typed **Observable**; also `post`/`put`/`patch`/`delete`.',
            'Requests are lazy — they fire only when subscribed (or via `async`).',
            'Put HTTP calls in services; handle failures with `catchError`.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does `http.get<User[]>("/api/users")` return?',
              options: [
                { id: 'a', text: 'An array of users immediately', correct: false },
                { id: 'b', text: 'A Promise of users', correct: false },
                { id: 'c', text: 'An Observable that emits the users when subscribed', correct: true },
                { id: 'd', text: 'A signal of users', correct: false },
              ],
              explanation:
                'HttpClient methods return Observables; the request only runs when subscribed (or via the async pipe).',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Where should HTTP calls usually live?',
              options: [
                { id: 'a', text: 'Directly in components', correct: false },
                { id: 'b', text: 'In a service that components inject', correct: true },
                { id: 'c', text: 'In the template', correct: false },
                { id: 'd', text: 'In app.routes.ts', correct: false },
              ],
              explanation:
                'Encapsulate HTTP in services so components stay focused on the view and URLs live in one place.',
            },
            {
              id: 'q3',
              type: 'truefalse',
              prompt: 'You must register HttpClient with provideHttpClient() before injecting it.',
              options: [
                { id: 'a', text: 'True', correct: true },
                { id: 'b', text: 'False', correct: false },
              ],
              explanation:
                'In standalone apps, provideHttpClient() in the app config makes HttpClient injectable.',
            },
          ],
        },
        {
          id: 'forms',
          title: 'Forms: template-driven vs reactive',
          minutes: 13,
          blurb: 'Capture and validate user input two different ways.',
          concept: [
            {
              heading: 'Two approaches',
              body: 'Angular offers two form systems. **Template-driven forms** put the logic in the template with `ngModel` — quick for simple forms. **Reactive forms** define the form model in the TypeScript class with `FormGroup`/`FormControl` — more powerful, testable, and preferred for anything non-trivial.',
            },
            {
              heading: 'Reactive forms',
              body: 'You build a `FormGroup` of `FormControl`s (often via the `FormBuilder`). Each control holds a value and validation state. The template binds to it with `[formGroup]` and `formControlName`. You read values with `form.value` and check validity with `form.valid`.',
            },
            {
              heading: 'Validation',
              body: 'Attach validators like `Validators.required` or `Validators.email`. The control exposes flags such as `touched`, `dirty`, and `errors`, which you use to show messages only at the right time.',
            },
          ],
          codeSamples: [
            {
              title: 'A reactive form',
              filename: 'signup.component.ts',
              language: 'typescript',
              code: "import { Component, inject } from '@angular/core';\nimport { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';\n\n@Component({\n  selector: 'app-signup',\n  standalone: true,\n  imports: [ReactiveFormsModule],\n  template: `\n    <form [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n      <input formControlName=\"email\" placeholder=\"Email\" />\n      <button [disabled]=\"form.invalid\">Sign up</button>\n    </form>\n  `,\n})\nexport class SignupComponent {\n  private fb = inject(FormBuilder);\n  form = this.fb.group({\n    email: ['', [Validators.required, Validators.email]],\n  });\n\n  submit(): void {\n    if (this.form.valid) console.log(this.form.value);\n  }\n}",
              annotations: [
                { line: 7, note: 'Reactive forms need ReactiveFormsModule imported.' },
                { line: 9, note: '[formGroup] binds the template form to the class model; (ngSubmit) handles submit.' },
                { line: 10, note: 'formControlName links this input to the "email" control.' },
                { line: 17, note: 'fb.group builds the model: initial value + validators.' },
                { line: 11, note: 'Button is disabled while the form is invalid.' },
              ],
              explanation:
                'The form model lives in the class, so you can test it and read form.value without touching the DOM.',
            },
          ],
          keyPoints: [
            'Template-driven forms (`ngModel`) are quick; reactive forms (`FormGroup`) are more powerful.',
            'Reactive forms define the model in TypeScript and bind with `[formGroup]` + `formControlName`.',
            'Add validators like `Validators.required`; read state via `form.valid` / `control.errors`.',
            'Prefer reactive forms for anything beyond the simplest input.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Where is the form model defined in a reactive form?',
              options: [
                { id: 'a', text: 'In the template with ngModel', correct: false },
                { id: 'b', text: 'In the TypeScript class with FormGroup/FormControl', correct: true },
                { id: 'c', text: 'In angular.json', correct: false },
                { id: 'd', text: 'In a CSS file', correct: false },
              ],
              explanation:
                'Reactive forms build the model in the class (FormGroup of FormControls), giving you full programmatic control.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Which directive links an input to a control in a reactive form?',
              options: [
                { id: 'a', text: 'ngModel', correct: false },
                { id: 'b', text: 'formControlName', correct: true },
                { id: 'c', text: 'ngForm', correct: false },
                { id: 'd', text: 'value', correct: false },
              ],
              explanation:
                'formControlName ties an input to a named control inside the [formGroup].',
            },
            {
              id: 'q3',
              type: 'multiple',
              prompt: 'Which are advantages of reactive forms? (Select all that apply.)',
              options: [
                { id: 'a', text: 'Easier to unit test', correct: true },
                { id: 'b', text: 'Form model lives in code, not the template', correct: true },
                { id: 'c', text: 'They require no validation', correct: false },
                { id: 'd', text: 'Better for complex, dynamic forms', correct: true },
              ],
              explanation:
                'Reactive forms are testable, keep the model in code, and scale to complex scenarios. They still support validation.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 4 — ARCHITECTURE & ORGANIZATION
    // ===================================================================
    {
      id: 'l4-architecture',
      order: 4,
      title: 'Level 4 — Architecture & organization',
      goal: 'Wire up routing and lazy loading, understand standalone vs modules, organize files at scale, and choose a state approach.',
      lessons: [
        {
          id: 'routing',
          title: 'Routing & lazy loading',
          minutes: 13,
          blurb: 'Map URLs to components and load features on demand.',
          concept: [
            {
              heading: 'The route table',
              body: 'Routing maps a **URL path** to a **component**. You define an array of routes (usually in `app.routes.ts`) and register it with `provideRouter(routes)`. A `<router-outlet>` in your template is where the matched component renders.',
            },
            {
              heading: 'Params and navigation',
              body: 'Paths can contain parameters: `skills/:id`. You read them via `ActivatedRoute`. You navigate either declaratively in templates with `routerLink="/path"` (or `[routerLink]="[...]"`), or programmatically with the `Router` service.',
            },
            {
              heading: 'Lazy loading',
              body: 'For performance, load a route’s code only when the user visits it, using `loadComponent: () => import(...)`. The feature ships in a separate chunk, so the initial bundle stays small. **Route guards** (functions returning true/false) can protect routes, e.g. requiring login.',
            },
          ],
          codeSamples: [
            {
              title: 'A route table with a lazy route and a param',
              filename: 'app.routes.ts',
              language: 'typescript',
              code: "import { Routes } from '@angular/router';\n\nexport const routes: Routes = [\n  { path: '', component: HomeComponent },\n  {\n    path: 'skills/:id',\n    loadComponent: () =>\n      import('./pages/skill/skill.component').then((m) => m.SkillComponent),\n  },\n  { path: '**', redirectTo: '' },\n];",
              annotations: [
                { line: 4, note: 'Empty path is the home route.' },
                { line: 6, note: ':id is a route parameter, read later via ActivatedRoute.' },
                { line: 7, note: 'loadComponent lazy-loads this component as a separate chunk.' },
                { line: 10, note: 'Wildcard ** catches unknown URLs — here it redirects home.' },
              ],
              explanation:
                'Routes are matched top to bottom; the wildcard must come last.',
            },
            {
              title: 'Navigating in a template',
              filename: 'nav.component.html',
              language: 'html',
              code: "<a routerLink=\"/\">Home</a>\n<a [routerLink]=\"['/skills', skill.id]\">Open skill</a>\n<router-outlet></router-outlet>",
              annotations: [
                { line: 2, note: 'Array form builds the URL with a dynamic segment.' },
                { line: 3, note: 'The matched component renders here.' },
              ],
            },
          ],
          keyPoints: [
            'Routes map URL paths to components; register with `provideRouter` and render via `<router-outlet>`.',
            'Read URL params with `ActivatedRoute`; navigate with `routerLink` or the `Router` service.',
            '`loadComponent: () => import(...)` lazy-loads features to keep the initial bundle small.',
            'Guards protect routes; the wildcard `**` route must be last.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What is the purpose of `<router-outlet>`?',
              options: [
                { id: 'a', text: 'It defines the routes', correct: false },
                { id: 'b', text: 'It is the placeholder where the matched route component renders', correct: true },
                { id: 'c', text: 'It links to another page', correct: false },
                { id: 'd', text: 'It guards a route', correct: false },
              ],
              explanation:
                'The router renders the component for the current URL inside <router-outlet>.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does `loadComponent: () => import(...)` achieve?',
              options: [
                { id: 'a', text: 'Loads the component eagerly at startup', correct: false },
                { id: 'b', text: 'Lazy-loads the component in its own chunk when the route is visited', correct: true },
                { id: 'c', text: 'Imports a CSS file', correct: false },
                { id: 'd', text: 'Creates a route guard', correct: false },
              ],
              explanation:
                'Dynamic import() defers loading until needed, shrinking the initial bundle.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Where must the wildcard `**` route be placed?',
              options: [
                { id: 'a', text: 'First', correct: false },
                { id: 'b', text: 'Last', correct: true },
                { id: 'c', text: 'It does not matter', correct: false },
                { id: 'd', text: 'In a separate file', correct: false },
              ],
              explanation:
                'Routes match top-down; the catch-all ** must be last or it would swallow every URL.',
            },
          ],
        },
        {
          id: 'standalone-vs-modules',
          title: 'Standalone components vs NgModules',
          minutes: 9,
          blurb: 'Why the boilerplate went away — and what old code looks like.',
          concept: [
            {
              heading: 'The old world: NgModules',
              body: 'For years, Angular grouped components, directives, and pipes inside `@NgModule` classes with `declarations` and `imports` arrays. It worked but added boilerplate, and beginners often struggled with "why isn’t my component available?" errors.',
            },
            {
              heading: 'The new world: standalone',
              body: 'A **standalone** component sets `standalone: true` and lists what it needs directly in its own `imports` array. No module required. This is the default from v17 onward and is simpler to reason about: each component declares its own dependencies.',
            },
            {
              heading: 'What you will encounter',
              body: 'New projects are standalone. Older codebases still use NgModules, and the two interoperate, so you must be able to read both. When you see `@NgModule({ declarations: [...], imports: [...] })`, recognize it as the older grouping mechanism.',
            },
          ],
          codeSamples: [
            {
              title: 'Standalone component (modern)',
              filename: 'card.component.ts',
              language: 'typescript',
              code: "import { Component } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { MatCardModule } from '@angular/material/card';\n\n@Component({\n  selector: 'app-card',\n  standalone: true,\n  imports: [CommonModule, MatCardModule],\n  template: `<mat-card>Hello</mat-card>`,\n})\nexport class CardComponent {}",
              annotations: [
                { line: 7, note: 'standalone: true — no NgModule needed.' },
                { line: 8, note: 'The component declares exactly what its template uses.' },
              ],
            },
            {
              title: 'NgModule (older style you may read)',
              filename: 'feature.module.ts',
              language: 'typescript',
              code: "import { NgModule } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { CardComponent } from './card.component';\n\n@NgModule({\n  declarations: [CardComponent],\n  imports: [CommonModule],\n  exports: [CardComponent],\n})\nexport class FeatureModule {}",
              annotations: [
                { line: 6, note: 'declarations: components/directives/pipes that belong to this module.' },
                { line: 7, note: 'imports: other modules this one depends on.' },
                { line: 8, note: 'exports: what other modules can use.' },
              ],
              explanation:
                'You do not need to write these for new code, but you must recognize them in existing projects.',
            },
          ],
          keyPoints: [
            'Standalone components (`standalone: true`) declare their own `imports` — the modern default.',
            'NgModules grouped declarations/imports/exports — older boilerplate you should still be able to read.',
            'Both styles interoperate, so mixed codebases are common.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does a standalone component list in its own `imports` array?',
              options: [
                { id: 'a', text: 'Every component in the app', correct: false },
                { id: 'b', text: 'Exactly the modules/components/pipes its template uses', correct: true },
                { id: 'c', text: 'Nothing — imports are not allowed', correct: false },
                { id: 'd', text: 'Only services', correct: false },
              ],
              explanation:
                'A standalone component imports just what its template needs, replacing NgModule declarations.',
            },
            {
              id: 'q2',
              type: 'truefalse',
              prompt: 'New Angular projects (v17+) default to standalone components.',
              options: [
                { id: 'a', text: 'True', correct: true },
                { id: 'b', text: 'False', correct: false },
              ],
              explanation:
                'Standalone is the default since v17, though NgModule-based code still exists and interoperates.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'In an `@NgModule`, what does `declarations` contain?',
              options: [
                { id: 'a', text: 'Services to provide', correct: false },
                { id: 'b', text: 'Components, directives, and pipes that belong to the module', correct: true },
                { id: 'c', text: 'Routes', correct: false },
                { id: 'd', text: 'CSS files', correct: false },
              ],
              explanation:
                'declarations lists the components/directives/pipes owned by that module.',
            },
          ],
        },
        {
          id: 'file-organization',
          title: 'Organizing files & folders at scale',
          minutes: 10,
          blurb: 'A structure that stays sane as the app grows.',
          concept: [
            {
              heading: 'Organize by feature, not by type',
              body: 'Small apps can group by type (`components/`, `services/`). Larger apps are clearer when grouped **by feature**: each feature folder holds its own components, services, and models. This keeps related code together and makes lazy loading natural.',
            },
            {
              heading: 'A common layout',
              body: 'A `core/` folder for app-wide singletons (auth, interceptors), a `shared/` folder for reusable UI and pipes, and a `features/` folder where each feature lives in its own directory with its own routes.',
            },
            {
              heading: 'Naming conventions',
              body: 'Angular files follow a consistent pattern: `name.role.ts`, e.g. `user.service.ts`, `login.component.ts`, `auth.guard.ts`, `currency.pipe.ts`. The role in the filename tells you instantly what the file is. Keep one main concept per file.',
            },
          ],
          codeSamples: [
            {
              title: 'Feature-based structure',
              filename: 'src/app layout',
              language: 'text',
              code: "src/app/\n  core/                 <- app-wide singletons\n    auth.service.ts\n    auth.guard.ts\n  shared/               <- reusable UI, pipes, directives\n    button/button.component.ts\n    truncate.pipe.ts\n  features/\n    dashboard/\n      dashboard.component.ts\n      dashboard.routes.ts\n    orders/\n      orders.component.ts\n      order-detail.component.ts\n      order.service.ts\n      order.model.ts\n  app.component.ts\n  app.config.ts\n  app.routes.ts",
              annotations: [
                { line: 2, note: 'core: things that exist once for the whole app.' },
                { line: 5, note: 'shared: building blocks reused across features.' },
                { line: 8, note: 'features: each feature is self-contained and can be lazy-loaded.' },
              ],
            },
          ],
          keyPoints: [
            'Group by **feature** as the app grows; group by type only for very small apps.',
            'Common top-level folders: `core/` (singletons), `shared/` (reusable), `features/`.',
            'Follow `name.role.ts` naming: `user.service.ts`, `login.component.ts`, `auth.guard.ts`.',
            'Keep features self-contained so they can be lazy-loaded.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'For a large app, what is the recommended way to organize folders?',
              options: [
                { id: 'a', text: 'One giant folder with all files', correct: false },
                { id: 'b', text: 'By feature, each in its own directory', correct: true },
                { id: 'c', text: 'Alphabetically by filename', correct: false },
                { id: 'd', text: 'By file size', correct: false },
              ],
              explanation:
                'Feature-based organization keeps related code together and supports lazy loading; type-based grouping suits only tiny apps.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does the filename `auth.guard.ts` tell you?',
              options: [
                { id: 'a', text: 'It is a component', correct: false },
                { id: 'b', text: 'It is a route guard related to auth', correct: true },
                { id: 'c', text: 'It is a stylesheet', correct: false },
                { id: 'd', text: 'It is a test file', correct: false },
              ],
              explanation:
                'The `name.role.ts` convention encodes the role — here, a guard for authentication.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What typically belongs in a `core/` folder?',
              options: [
                { id: 'a', text: 'App-wide singletons like auth services and interceptors', correct: true },
                { id: 'b', text: 'Throwaway experiments', correct: false },
                { id: 'c', text: 'Third-party node_modules', correct: false },
                { id: 'd', text: 'Compiled output', correct: false },
              ],
              explanation:
                'core/ holds services and utilities that exist once for the whole application.',
            },
          ],
        },
        {
          id: 'state-management',
          title: 'State management approaches',
          minutes: 11,
          blurb: 'From simple service+signals to NgRx — pick the right size.',
          concept: [
            {
              heading: 'What "state" means',
              body: '**State** is the data your app remembers: the logged-in user, items in a cart, a list fetched from the server. The question is where it lives and how components share it.',
            },
            {
              heading: 'Start simple',
              body: 'For most apps, a **service holding signals** is enough: the service owns the state with signals, exposes read-only versions, and provides methods to change it. Components inject the service and react to its signals. This is simple, testable, and needs no library.',
            },
            {
              heading: 'When to scale up',
              body: 'Large apps with complex, shared state may use a dedicated library. **NgRx** brings a Redux-style store (actions, reducers, selectors) for predictable state and great tooling. **NgRx SignalStore** and **Elf** are lighter signal-based options. Reach for these only when service+signals starts to hurt — extra structure has a cost.',
            },
          ],
          codeSamples: [
            {
              title: 'Service + signals (the default you should reach for first)',
              filename: 'cart.store.ts',
              language: 'typescript',
              code: "import { Injectable, signal, computed } from '@angular/core';\n\n@Injectable({ providedIn: 'root' })\nexport class CartStore {\n  private items = signal<string[]>([]);\n\n  readonly all = this.items.asReadonly();\n  readonly count = computed(() => this.items().length);\n\n  add(item: string): void {\n    this.items.update((list) => [...list, item]);\n  }\n  clear(): void {\n    this.items.set([]);\n  }\n}",
              annotations: [
                { line: 5, note: 'Private writable state — only the store can change it.' },
                { line: 7, note: 'Expose a read-only signal so components can read but not mutate.' },
                { line: 8, note: 'Derived count updates automatically.' },
                { line: 11, note: 'Mutations go through clear methods, never directly.' },
              ],
              explanation:
                'Any component can inject CartStore and read all() / count(); only the store mutates the data.',
            },
          ],
          keyPoints: [
            'State is the data your app remembers and shares across components.',
            'Default approach: a **service holding signals** with read-only exposure and mutation methods.',
            'Scale to **NgRx** (Redux-style) or SignalStore/Elf only when shared state gets complex.',
            'More structure has a cost — start simple and grow into it.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What is the recommended first choice for managing shared state?',
              options: [
                { id: 'a', text: 'Always install NgRx immediately', correct: false },
                { id: 'b', text: 'A service that holds signals', correct: true },
                { id: 'c', text: 'Global variables', correct: false },
                { id: 'd', text: 'localStorage only', correct: false },
              ],
              explanation:
                'A signal-based service is simple, testable, and sufficient for most apps; add libraries only when needed.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'NgRx is based on which architectural pattern?',
              options: [
                { id: 'a', text: 'MVC', correct: false },
                { id: 'b', text: 'Redux (actions, reducers, selectors)', correct: true },
                { id: 'c', text: 'Singleton only', correct: false },
                { id: 'd', text: 'Publish/subscribe over WebSockets', correct: false },
              ],
              explanation:
                'NgRx brings a Redux-style store with actions, reducers, and selectors for predictable state.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why expose state as a read-only signal from a store?',
              options: [
                { id: 'a', text: 'It is faster to type', correct: false },
                { id: 'b', text: 'So components can read it but only the store can change it', correct: true },
                { id: 'c', text: 'Read-only signals cannot be displayed', correct: false },
                { id: 'd', text: 'It disables change detection', correct: false },
              ],
              explanation:
                'Read-only exposure enforces that all mutations go through the store’s methods, keeping changes predictable.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 5 — GOING PRO
    // ===================================================================
    {
      id: 'l5-going-pro',
      order: 5,
      title: 'Level 5 — Going pro',
      goal: 'Understand performance and change detection, testing, the library ecosystem, and how to build and deploy.',
      lessons: [
        {
          id: 'change-detection',
          title: 'Change detection & performance',
          minutes: 12,
          blurb: 'How Angular decides what to re-render — and how to keep it fast.',
          concept: [
            {
              heading: 'What change detection is',
              body: 'After something happens (a click, an HTTP response, a timer), Angular checks whether any data changed and updates the DOM to match. This process is **change detection**. Historically it ran broadly, helped by Zone.js, which patches async APIs to know when to check.',
            },
            {
              heading: 'OnPush and signals',
              body: 'You can make a component use the `OnPush` change-detection strategy so it only re-checks when its inputs change or an event fires — far fewer checks. **Signals** take this further: Angular tracks exactly which signals a template reads and updates only those views. The future direction is **zoneless** apps driven entirely by signals.',
            },
            {
              heading: 'Practical performance tips',
              body: 'Use `track` in `@for` (required anyway) so lists update efficiently. Lazy-load routes to shrink the initial bundle. Prefer signals/OnPush to limit work. Use `trackBy`-style identity and avoid heavy work inside templates. Measure with the browser devtools and Angular DevTools before optimizing.',
            },
          ],
          codeSamples: [
            {
              title: 'OnPush change detection',
              filename: 'item.component.ts',
              language: 'typescript',
              code: "import { Component, ChangeDetectionStrategy, input } from '@angular/core';\n\n@Component({\n  selector: 'app-item',\n  standalone: true,\n  changeDetection: ChangeDetectionStrategy.OnPush,\n  template: `<span>{{ label() }}</span>`,\n})\nexport class ItemComponent {\n  label = input.required<string>();\n}",
              annotations: [
                { line: 6, note: 'OnPush: re-check only when inputs change or an event fires here.' },
                { line: 10, note: 'Signal inputs pair perfectly with OnPush for minimal re-rendering.' },
              ],
              explanation:
                'OnPush + signals means Angular does far less work, which matters in large component trees.',
            },
          ],
          keyPoints: [
            'Change detection syncs the DOM with your data after events/async work.',
            '`OnPush` limits checks to input changes and local events.',
            'Signals let Angular update only the views that read changed signals; zoneless is the future.',
            'Performance basics: `track` in `@for`, lazy loading, OnPush/signals, and measure before optimizing.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does change detection do?',
              options: [
                { id: 'a', text: 'Compiles TypeScript to JavaScript', correct: false },
                { id: 'b', text: 'Updates the DOM to reflect changes in your data', correct: true },
                { id: 'c', text: 'Downloads dependencies', correct: false },
                { id: 'd', text: 'Encrypts network requests', correct: false },
              ],
              explanation:
                'Change detection checks for data changes and updates the rendered DOM accordingly.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is the benefit of the `OnPush` strategy?',
              options: [
                { id: 'a', text: 'It re-renders the component constantly', correct: false },
                { id: 'b', text: 'It limits re-checks to input changes and local events, improving performance', correct: true },
                { id: 'c', text: 'It disables the template', correct: false },
                { id: 'd', text: 'It makes HTTP faster', correct: false },
              ],
              explanation:
                'OnPush reduces how often a component is checked, which speeds up large apps.',
            },
            {
              id: 'q3',
              type: 'truefalse',
              prompt: 'Signals allow Angular to update only the views that depend on a changed value.',
              options: [
                { id: 'a', text: 'True', correct: true },
                { id: 'b', text: 'False', correct: false },
              ],
              explanation:
                'Because Angular tracks signal reads precisely, it can update just the affected views — enabling zoneless apps.',
            },
          ],
        },
        {
          id: 'testing',
          title: 'Testing your Angular code',
          minutes: 11,
          blurb: 'Unit tests, component tests, and end-to-end tests.',
          concept: [
            {
              heading: 'The kinds of tests',
              body: '**Unit tests** check a single class (often a service) in isolation. **Component tests** render a component and assert on its template and behavior using the `TestBed`. **End-to-end (e2e)** tests drive the whole app in a real browser (with tools like Cypress or Playwright).',
            },
            {
              heading: 'Tools',
              body: 'Angular projects traditionally use **Karma + Jasmine**, though many teams switch to **Jest** or the newer Vitest-based runners. The CLI command is `ng test`. Jasmine gives you `describe`, `it`, and `expect`; `TestBed` configures a testing module and creates component fixtures.',
            },
            {
              heading: 'Why DI helps testing',
              body: 'Because components ask for dependencies via DI, tests can inject **fakes/mocks** instead of real services — no network, fast and deterministic. This is a major reason the service+DI pattern is worth following.',
            },
          ],
          codeSamples: [
            {
              title: 'A simple service unit test',
              filename: 'counter.service.spec.ts',
              language: 'typescript',
              code: "import { CounterService } from './counter.service';\n\ndescribe('CounterService', () => {\n  it('increments the count', () => {\n    const service = new CounterService();\n    service.increment();\n    expect(service.count()).toBe(1);\n  });\n});",
              annotations: [
                { line: 3, note: 'describe groups related tests.' },
                { line: 4, note: 'it is a single test case with a readable description.' },
                { line: 7, note: 'expect(...).toBe(...) is the assertion.' },
              ],
              explanation:
                'A plain service can be tested without Angular at all — just construct it and assert. Components use TestBed.',
            },
          ],
          keyPoints: [
            'Unit tests check one class; component tests use `TestBed`; e2e tests drive a real browser.',
            'Run tests with `ng test`; Jasmine provides `describe`/`it`/`expect`.',
            'DI lets you inject mocks, making tests fast and deterministic.',
            'Test behavior (inputs/outputs, public API), not private implementation details.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Which utility configures a testing module and creates component fixtures?',
              options: [
                { id: 'a', text: 'HttpClient', correct: false },
                { id: 'b', text: 'TestBed', correct: true },
                { id: 'c', text: 'Router', correct: false },
                { id: 'd', text: 'FormBuilder', correct: false },
              ],
              explanation:
                'TestBed sets up an Angular testing environment and builds component fixtures to test against.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why does dependency injection make testing easier?',
              options: [
                { id: 'a', text: 'It removes the need for tests', correct: false },
                { id: 'b', text: 'You can inject mock/fake dependencies instead of real ones', correct: true },
                { id: 'c', text: 'It compiles tests faster', correct: false },
                { id: 'd', text: 'It hides errors', correct: false },
              ],
              explanation:
                'DI lets tests substitute fakes for real services, avoiding network calls and making tests deterministic.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does an end-to-end (e2e) test do?',
              options: [
                { id: 'a', text: 'Tests one function in isolation', correct: false },
                { id: 'b', text: 'Drives the whole running app in a real browser', correct: true },
                { id: 'c', text: 'Checks TypeScript types', correct: false },
                { id: 'd', text: 'Measures bundle size', correct: false },
              ],
              explanation:
                'E2e tests (e.g. Cypress/Playwright) exercise the full app through the browser like a real user.',
            },
          ],
        },
        {
          id: 'library-ecosystem',
          title: 'The library ecosystem',
          minutes: 9,
          blurb: 'The tools and libraries you will actually reach for.',
          concept: [
            {
              heading: 'Built into Angular',
              body: 'Much of what other ecosystems need libraries for is built in: the **Router**, **HttpClient**, **Forms**, and **dependency injection**. Learn these first — you rarely need a third-party replacement.',
            },
            {
              heading: 'UI component libraries',
              body: '**Angular Material** (official, Material Design) and the **CDK** (Component Dev Kit, unstyled building blocks like overlays and drag-drop) are the most common. Alternatives include **PrimeNG**, **Nebular**, and **Ng-Zorro** (Ant Design). Tailwind CSS is popular for utility styling alongside any of them.',
            },
            {
              heading: 'State, data, and utilities',
              body: 'State: **NgRx** (and SignalStore), **NgRx SignalStore**, **Elf**. Server data/caching: **TanStack Query (Angular)**. Charts: **ngx-charts**, or wrap **Chart.js** / **D3**. Forms helpers, i18n with `@angular/localize`, and **RxJS** (already a dependency) for streams. The CLI’s `ng add <package>` installs and configures many of these for you.',
            },
          ],
          codeSamples: [
            {
              title: 'Adding Angular Material with the CLI',
              filename: 'terminal',
              language: 'bash',
              code: "# Installs the package and sets up theme, typography, and animations\nng add @angular/material\n\n# Other examples\nng add @ngrx/store\nng add @angular/pwa",
              annotations: [
                { line: 2, note: 'ng add does more than npm install — it runs a setup schematic.' },
                { line: 5, note: 'Many libraries ship an ng add schematic for one-command setup.' },
              ],
            },
          ],
          keyPoints: [
            'Router, HttpClient, Forms, and DI are built in — learn them before adding libraries.',
            'UI: **Angular Material** + **CDK** (official); also PrimeNG, Ng-Zorro; Tailwind for utilities.',
            'State: NgRx / SignalStore / Elf. Data: TanStack Query. Charts: ngx-charts, Chart.js, D3.',
            'Use `ng add <package>` to install and auto-configure many libraries.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What is the Angular CDK?',
              options: [
                { id: 'a', text: 'A state management library', correct: false },
                { id: 'b', text: 'Unstyled building blocks (overlays, drag-drop, etc.) for building UI', correct: true },
                { id: 'c', text: 'A testing framework', correct: false },
                { id: 'd', text: 'The Angular compiler', correct: false },
              ],
              explanation:
                'The Component Dev Kit provides low-level, unstyled behaviors you can build custom components on; Material is built on it.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does `ng add @angular/material` do beyond installing the package?',
              options: [
                { id: 'a', text: 'Nothing extra', correct: false },
                { id: 'b', text: 'Runs a schematic that sets up theme, typography, and animations', correct: true },
                { id: 'c', text: 'Deletes existing styles', correct: false },
                { id: 'd', text: 'Deploys the app', correct: false },
              ],
              explanation:
                'ng add runs a setup schematic, configuring the library (theme, animations) rather than just copying files.',
            },
            {
              id: 'q3',
              type: 'multiple',
              prompt: 'Which of these are built into Angular (no extra library needed)? (Select all.)',
              options: [
                { id: 'a', text: 'Router', correct: true },
                { id: 'b', text: 'HttpClient', correct: true },
                { id: 'c', text: 'Forms', correct: true },
                { id: 'd', text: 'NgRx store', correct: false },
              ],
              explanation:
                'Router, HttpClient, and Forms ship with Angular. NgRx is a separate, optional library.',
            },
          ],
        },
        {
          id: 'build-and-deploy',
          title: 'Build, environments & deployment',
          minutes: 10,
          blurb: 'Turn your code into files you can host anywhere.',
          concept: [
            {
              heading: 'What "build" produces',
              body: '`ng build` compiles and bundles your app into static files (HTML, JS, CSS) in the `dist/` folder. The production build minifies code, removes unused parts (tree-shaking), and adds content hashes to filenames for cache-busting.',
            },
            {
              heading: 'Environments & configuration',
              body: 'Apps usually need different settings per environment (API URL for dev vs prod). You manage these with build **configurations** in `angular.json` and environment files, or by injecting config. Never hardcode secrets in the front-end — anything shipped to the browser is public.',
            },
            {
              heading: 'Hosting',
              body: 'Because the output is static files, you can host an Angular app on almost anything: Netlify, Vercel, Firebase Hosting, GitHub Pages, S3 + CloudFront, or your own server. One important detail: for client-side routing to work on refresh, the host must serve `index.html` for unknown paths (a "SPA fallback"). For SEO or speed you can add **server-side rendering (SSR)** with Angular Universal / `@angular/ssr`.',
            },
          ],
          codeSamples: [
            {
              title: 'Building for production',
              filename: 'terminal',
              language: 'bash',
              code: "# Optimized production build -> dist/\nng build\n\n# Serve the built files locally to test\nnpx http-server dist/skill-forge/browser",
              annotations: [
                { line: 2, note: 'Default configuration is production: minified, hashed, tree-shaken.' },
                { line: 5, note: 'The browser/ subfolder holds the static files to deploy.' },
              ],
              explanation:
                'Deployment is just copying the contents of the build output to a static host (with a SPA fallback rule).',
            },
          ],
          keyPoints: [
            '`ng build` outputs optimized static files to `dist/` (minified, tree-shaken, hashed).',
            'Use environment files / build configurations for per-environment settings; never ship secrets to the browser.',
            'Host static output anywhere; configure a SPA fallback so deep links work on refresh.',
            'Add SSR (`@angular/ssr`) when you need SEO or faster first paint.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does `ng build` produce?',
              options: [
                { id: 'a', text: 'A running dev server', correct: false },
                { id: 'b', text: 'Optimized static files in the dist/ folder', correct: true },
                { id: 'c', text: 'A database', correct: false },
                { id: 'd', text: 'Test reports', correct: false },
              ],
              explanation:
                'ng build compiles and bundles the app into static files (in dist/) ready to deploy.',
            },
            {
              id: 'q2',
              type: 'truefalse',
              prompt: 'It is safe to store API secret keys in front-end environment files.',
              options: [
                { id: 'a', text: 'True', correct: false },
                { id: 'b', text: 'False', correct: true },
              ],
              explanation:
                'Anything shipped to the browser is visible to users. Secrets must stay on the server.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why does a hosted SPA need an "index.html fallback" for unknown paths?',
              options: [
                { id: 'a', text: 'To speed up images', correct: false },
                { id: 'b', text: 'So client-side routes still load when a user refreshes a deep link', correct: true },
                { id: 'c', text: 'To enable HTTPS', correct: false },
                { id: 'd', text: 'To compress JavaScript', correct: false },
              ],
              explanation:
                'The server must return index.html for routes it does not recognize so the Angular router can handle them.',
            },
          ],
        },
      ],
    },
  ],
};
