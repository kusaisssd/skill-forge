import { Course } from '../models/course.model';

/**
 * The TypeScript course — from zero to advanced.
 * Focus: understand the type system deeply and read any TS code fluently.
 */
export const TYPESCRIPT_COURSE: Course = {
  outcome:
    'By the end you will understand the type system deeply — primitives to generics, narrowing, utility types and conditional types — read any TypeScript code fluently, configure tsconfig with confidence, and know how TS fits into real projects and tooling.',
  levels: [
    // ===================================================================
    // LEVEL 1 — LANGUAGE FOUNDATIONS
    // ===================================================================
    {
      id: 'l1-foundations',
      order: 1,
      title: 'Level 1 — Language foundations',
      goal: 'Understand what TypeScript is, the basic types, typed functions, and object shapes.',
      lessons: [
        {
          id: 'why-typescript',
          title: 'What TypeScript is & how it works',
          minutes: 9,
          blurb: 'A typed layer over JavaScript that disappears at runtime.',
          concept: [
            {
              heading: 'JavaScript + types',
              body: 'TypeScript is a **superset of JavaScript**: every valid JS file is already valid TS. It adds a **static type system** — descriptions of what shape your data has — that is checked while you write and compile, then completely **erased**. The browser never runs TypeScript; it runs the JavaScript produced from it.',
            },
            {
              heading: 'The compiler (tsc)',
              body: 'The TypeScript compiler `tsc` does two independent jobs: **type-checking** (finding errors) and **emitting** JavaScript. Tools like Vite, esbuild or Angular CLI often split these: they strip types fast for running, and run `tsc --noEmit` separately just for checking.\n\nThe key mental model: **types are documentation that a machine verifies**. They cannot change runtime behavior.',
            },
            {
              heading: 'Why teams adopt it',
              body: 'Three wins: errors caught **before running** (typos, wrong arguments, missing null checks), **editor superpowers** (autocomplete, safe renames, jump-to-definition all come from types), and **self-documenting APIs** — a function signature tells you exactly what it needs and returns.',
            },
          ],
          codeSamples: [
            {
              title: 'Same code, with and without types',
              filename: 'greet.ts',
              language: 'typescript',
              code: "// JavaScript: nothing stops you calling greet(42)\nfunction greetJs(name) {\n  return 'Hello ' + name.toUpperCase();\n}\n\n// TypeScript: the contract is explicit and enforced\nfunction greet(name: string): string {\n  return 'Hello ' + name.toUpperCase();\n}\n\ngreet('Ada');     // OK\n// greet(42);     // Error: number is not assignable to string",
              annotations: [
                { line: 7, note: 'name: string — the parameter type. : string after ) is the return type.' },
                { line: 12, note: 'The error appears in your editor immediately, not when a user hits the bug.' },
              ],
              explanation:
                'After compilation both functions produce identical JavaScript — the types exist only at development time.',
            },
          ],
          keyPoints: [
            'TypeScript = JavaScript + a static type system; types are **erased** at runtime.',
            '`tsc` type-checks and emits JS; many tools run checking separately (`tsc --noEmit`).',
            'Types cannot change runtime behavior — they are machine-verified documentation.',
            'The payoff: earlier errors, powerful editor tooling, self-documenting code.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What happens to type annotations when TypeScript compiles?',
              options: [
                { id: 'a', text: 'They become runtime checks', correct: false },
                { id: 'b', text: 'They are completely erased from the output JavaScript', correct: true },
                { id: 'c', text: 'They are converted to comments', correct: false },
                { id: 'd', text: 'They slow down the running app', correct: false },
              ],
              explanation:
                'Types exist only at compile time. The emitted JavaScript contains no trace of them.',
            },
            {
              id: 'q2',
              type: 'truefalse',
              prompt: 'Every valid JavaScript file is also valid TypeScript.',
              options: [
                { id: 'a', text: 'True', correct: true },
                { id: 'b', text: 'False', correct: false },
              ],
              explanation:
                'TS is a superset of JS — you can rename .js to .ts and add types gradually.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does `tsc --noEmit` do?',
              options: [
                { id: 'a', text: 'Compiles without type-checking', correct: false },
                { id: 'b', text: 'Type-checks the project without producing JavaScript files', correct: true },
                { id: 'c', text: 'Deletes the output folder', correct: false },
                { id: 'd', text: 'Runs the code in Node', correct: false },
              ],
              explanation:
                'noEmit runs only the checker — the standard way to verify types in CI while a faster tool does the bundling.',
            },
          ],
        },
        {
          id: 'basic-types',
          title: 'Basic types & inference',
          minutes: 11,
          blurb: 'Primitives, arrays, tuples — and when not to annotate at all.',
          concept: [
            {
              heading: 'The primitives',
              body: 'The core types mirror JavaScript values: `string`, `number` (one type for ints and floats), `boolean`, `null`, `undefined`, plus `bigint` and `symbol`. Arrays are written `string[]` (or `Array<string>` — identical). A **tuple** is a fixed-length array with a type per position: `[number, string]`.',
            },
            {
              heading: 'Inference — let TS do the work',
              body: 'TypeScript **infers** types from values: `let count = 0` is already `number`, no annotation needed. Idiomatic TS annotates **function boundaries** (parameters and returns) and lets inference handle local variables. Over-annotating adds noise without safety.',
            },
            {
              heading: 'The special types',
              body: '`any` turns checking **off** for that value — avoid it; it spreads silently. `unknown` is the safe alternative: it accepts anything but forces you to **check before using**. `void` means a function returns nothing. `never` means "this can never happen" — a function that always throws, or an exhausted union branch.',
            },
          ],
          codeSamples: [
            {
              title: 'Reading typed declarations',
              filename: 'basics.ts',
              language: 'typescript',
              code: "let title = 'TS Course';        // inferred: string\nlet scores: number[] = [90, 85];\nlet pair: [number, string] = [1, 'one'];\n\nlet risky: any = JSON.parse('{}');\nrisky.not.checked.at.all;        // compiles! any disables safety\n\nlet safe: unknown = JSON.parse('{}');\n// safe.foo;                     // Error: must narrow first\nif (typeof safe === 'string') {\n  safe.toUpperCase();            // OK: narrowed to string\n}",
              annotations: [
                { line: 1, note: 'No annotation needed — inference reads the initial value.' },
                { line: 3, note: 'A tuple: exactly two elements, number then string.' },
                { line: 6, note: 'any lets anything through — this line hides a guaranteed crash.' },
                { line: 9, note: 'typeof check narrows unknown to string inside the block.' },
              ],
              explanation:
                'The any vs unknown contrast is the most important habit in this lesson: unknown forces the check that any skips.',
            },
          ],
          keyPoints: [
            'Primitives: `string`, `number`, `boolean`; arrays `T[]`; tuples `[A, B]` fix length and positions.',
            'Annotate function boundaries; let **inference** type local variables.',
            '`any` disables checking and spreads — prefer `unknown`, which forces narrowing.',
            '`void` = returns nothing; `never` = can never occur.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: "What is the inferred type of: let x = 'hello'",
              options: [
                { id: 'a', text: 'any', correct: false },
                { id: 'b', text: 'string', correct: true },
                { id: 'c', text: 'unknown', correct: false },
                { id: 'd', text: 'It has no type until annotated', correct: false },
              ],
              explanation:
                'Inference reads the initializer — x is string without any annotation.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is the key difference between any and unknown?',
              options: [
                { id: 'a', text: 'They are identical', correct: false },
                { id: 'b', text: 'unknown forces you to narrow/check before use; any disables checking', correct: true },
                { id: 'c', text: 'any is newer', correct: false },
                { id: 'd', text: 'unknown only works with strings', correct: false },
              ],
              explanation:
                'Both accept any value, but unknown is safe: the compiler blocks usage until you prove the type.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which type describes [10, "ten"] with exactly that structure?',
              options: [
                { id: 'a', text: '(number | string)[]', correct: false },
                { id: 'b', text: '[number, string]', correct: true },
                { id: 'c', text: 'Array<any>', correct: false },
                { id: 'd', text: '{ 0: number }', correct: false },
              ],
              explanation:
                'A tuple type fixes both the length and the type at each position — stricter than a mixed array.',
            },
          ],
        },
        {
          id: 'functions',
          title: 'Typing functions',
          minutes: 10,
          blurb: 'Parameters, returns, optional/default values, and function types.',
          concept: [
            {
              heading: 'The signature is the contract',
              body: 'A function type has two halves: parameter types and a return type: `function add(a: number, b: number): number`. Return types are usually inferred, but annotating **public** functions documents intent and catches mistakes inside the body.',
            },
            {
              heading: 'Optional, default, rest',
              body: '`name?: string` makes a parameter optional (its type becomes `string | undefined`). `limit = 10` gives a default and infers `number`. `...items: string[]` collects the rest of the arguments. Order rule: required first, then optional/defaults.',
            },
            {
              heading: 'Functions as values',
              body: 'Since functions are values, they have types too: `(x: number) => string` describes "a function from number to string". You will read this shape constantly in callbacks: `arr.map((n) => n * 2)` — TS infers `n` from the array. Async functions return `Promise<T>`.',
            },
          ],
          codeSamples: [
            {
              title: 'Reading function signatures',
              filename: 'functions.ts',
              language: 'typescript',
              code: "function format(value: number, unit?: string, digits = 2): string {\n  const num = value.toFixed(digits);\n  return unit ? num + ' ' + unit : num;\n}\n\ntype Mapper = (input: string) => number;\n\nconst toLength: Mapper = (s) => s.length;\n\nasync function fetchTitle(url: string): Promise<string> {\n  const res = await fetch(url);\n  return res.text();\n}",
              annotations: [
                { line: 1, note: 'unit? is optional; digits has a default (and is inferred number).' },
                { line: 6, note: 'A named function type: takes string, returns number.' },
                { line: 8, note: 's needs no annotation — the Mapper type supplies it.' },
                { line: 10, note: 'async functions always return Promise<T>.' },
              ],
              explanation:
                'Notice how the type alias Mapper lets the implementation stay clean — context provides the parameter types.',
            },
          ],
          keyPoints: [
            'Annotate parameters always; return types on public functions.',
            '`x?: T` means optional (`T | undefined`); `x = default` infers and defaults.',
            'Function types read as `(args) => result`; callbacks usually get inferred.',
            'Async functions return `Promise<T>`.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What is the type of parameter u in: function f(u?: string)',
              options: [
                { id: 'a', text: 'string', correct: false },
                { id: 'b', text: 'string | undefined', correct: true },
                { id: 'c', text: 'string | null', correct: false },
                { id: 'd', text: 'any', correct: false },
              ],
              explanation:
                'Optional parameters may be omitted, so their type includes undefined.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does the type (id: number) => boolean describe?',
              options: [
                { id: 'a', text: 'An object with id', correct: false },
                { id: 'b', text: 'A function taking a number and returning a boolean', correct: true },
                { id: 'c', text: 'A boolean array', correct: false },
                { id: 'd', text: 'A class', correct: false },
              ],
              explanation:
                'Arrow syntax in type position describes a function signature.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'An async function that resolves with a User has which return type?',
              options: [
                { id: 'a', text: 'User', correct: false },
                { id: 'b', text: 'Promise<User>', correct: true },
                { id: 'c', text: 'await User', correct: false },
                { id: 'd', text: 'Async<User>', correct: false },
              ],
              explanation:
                'async wraps the result in a Promise — the signature must say Promise<User>.',
            },
          ],
        },
        {
          id: 'objects-interfaces',
          title: 'Object types & interfaces',
          minutes: 11,
          blurb: 'Describing the shape of data — the heart of TypeScript.',
          concept: [
            {
              heading: 'Shapes, not classes',
              body: 'TypeScript types are **structural**: a value matches a type if it has the right shape, regardless of how it was created. `interface User { id: number; name: string }` matches any object with those properties — no `new`, no inheritance required. This is called **duck typing**.',
            },
            {
              heading: 'Property modifiers',
              body: '`email?: string` — optional property. `readonly id: number` — cannot be reassigned after creation. Index signatures describe open-ended keys: `{ [key: string]: number }` means "any string key maps to a number".',
            },
            {
              heading: 'Nesting and composition',
              body: 'Shapes nest naturally: a property can be another interface, an array of one (`items: OrderItem[]`), or a union. Most real-world TS code is exactly this — interfaces composed of interfaces, mirroring your API responses and domain models.',
            },
          ],
          codeSamples: [
            {
              title: 'A realistic domain model',
              filename: 'order.model.ts',
              language: 'typescript',
              code: "interface OrderItem {\n  productId: number;\n  quantity: number;\n}\n\ninterface Order {\n  readonly id: string;\n  customer: { name: string; email?: string };\n  items: OrderItem[];\n  status: 'pending' | 'shipped' | 'delivered';\n}\n\nfunction totalItems(order: Order): number {\n  return order.items.reduce((sum, i) => sum + i.quantity, 0);\n}",
              annotations: [
                { line: 7, note: 'readonly: id can be read but never reassigned.' },
                { line: 8, note: 'An inline nested shape; email? is optional.' },
                { line: 10, note: 'A union of string literals — status can only be one of these three.' },
                { line: 13, note: 'Any object with the right shape is accepted — structural typing.' },
              ],
              explanation:
                'This file is pure type information plus one function — exactly what model files look like in real projects.',
            },
          ],
          keyPoints: [
            'Typing is **structural** (duck typing): shape matters, origin does not.',
            '`?` marks optional properties; `readonly` prevents reassignment.',
            'Index signatures `{ [key: string]: T }` describe open-ended objects.',
            'Real models are interfaces composed of interfaces, arrays, and literal unions.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does "structural typing" mean?',
              options: [
                { id: 'a', text: 'Types must be declared with class', correct: false },
                { id: 'b', text: 'A value matches a type if its shape matches, regardless of origin', correct: true },
                { id: 'c', text: 'Types are checked at runtime', correct: false },
                { id: 'd', text: 'Only structs are allowed', correct: false },
              ],
              explanation:
                'TS compares shapes, not names or constructors — any object with the right properties fits.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does readonly do on an interface property?',
              options: [
                { id: 'a', text: 'Hides it from JSON', correct: false },
                { id: 'b', text: 'Prevents reassigning it after creation', correct: true },
                { id: 'c', text: 'Makes it optional', correct: false },
                { id: 'd', text: 'Encrypts it', correct: false },
              ],
              explanation:
                'readonly is a compile-time guarantee that the property will not be written to again.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: "What values can status: 'pending' | 'shipped' hold?",
              options: [
                { id: 'a', text: 'Any string', correct: false },
                { id: 'b', text: "Only the exact strings 'pending' or 'shipped'", correct: true },
                { id: 'c', text: 'Booleans', correct: false },
                { id: 'd', text: 'null only', correct: false },
              ],
              explanation:
                'A union of string literals restricts the value to exactly those options — safer than plain string.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 2 — THE TYPE SYSTEM
    // ===================================================================
    {
      id: 'l2-type-system',
      order: 2,
      title: 'Level 2 — The type system',
      goal: 'Master unions, narrowing, aliases vs interfaces, literal types, and classes.',
      lessons: [
        {
          id: 'unions-narrowing',
          title: 'Unions & narrowing',
          minutes: 12,
          blurb: 'Model "either/or" data and let TS follow your checks.',
          concept: [
            {
              heading: 'Union types',
              body: 'A **union** `A | B` means "either A or B": `string | null`, `number | undefined`, `\'asc\' | \'desc\'`. Unions are how TS models the real world — values that can be one of several things. Until you check which one, TS only lets you use what is common to **all** members.',
            },
            {
              heading: 'Narrowing',
              body: '**Narrowing** is TS following your runtime checks and shrinking the type inside each branch: `typeof x === \'string\'` narrows to string; `Array.isArray(x)` to an array; `instanceof Date` to Date; `\'name\' in obj` by property; and a simple `if (x)` removes null/undefined. After the check, the editor knows exactly what you have.',
            },
            {
              heading: 'Discriminated unions — the killer pattern',
              body: 'Give each variant a common **literal tag** (like `kind` or `status`), and a `switch` on the tag narrows perfectly in each case. With `never` in the default branch, adding a new variant later produces a compile error at every switch you forgot to update — the compiler maintains your code.',
            },
          ],
          codeSamples: [
            {
              title: 'A discriminated union',
              filename: 'shapes.ts',
              language: 'typescript',
              code: "type Shape =\n  | { kind: 'circle'; radius: number }\n  | { kind: 'rect'; width: number; height: number };\n\nfunction area(shape: Shape): number {\n  switch (shape.kind) {\n    case 'circle':\n      return Math.PI * shape.radius ** 2;\n    case 'rect':\n      return shape.width * shape.height;\n    default: {\n      const impossible: never = shape;\n      return impossible;\n    }\n  }\n}",
              annotations: [
                { line: 2, note: "kind: 'circle' is the discriminant — a literal tag unique per variant." },
                { line: 7, note: 'Inside this case, shape is narrowed: radius exists, width does not.' },
                { line: 12, note: 'The never trick: if a new variant is added, this line errors until handled.' },
              ],
              explanation:
                'This pattern appears everywhere: API responses (success | error), app states (loading | loaded | failed), events.',
            },
          ],
          keyPoints: [
            '`A | B` models either/or; only common members are usable before narrowing.',
            'Narrow with `typeof`, `instanceof`, `in`, `Array.isArray`, and truthiness checks.',
            'Discriminated unions: a literal `kind` tag + `switch` = perfect narrowing.',
            'A `never` default branch makes the compiler flag unhandled new variants.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Before narrowing, what can you do with a value of type string | number?',
              options: [
                { id: 'a', text: 'Anything strings support', correct: false },
                { id: 'b', text: 'Only what BOTH types support (like .toString())', correct: true },
                { id: 'c', text: 'Nothing at all', correct: false },
                { id: 'd', text: 'Anything numbers support', correct: false },
              ],
              explanation:
                'Until TS knows which member it is, only the intersection of capabilities is allowed.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What makes a union "discriminated"?',
              options: [
                { id: 'a', text: 'It has more than two members', correct: false },
                { id: 'b', text: 'Each variant shares a common literal property (a tag) with a unique value', correct: true },
                { id: 'c', text: 'It uses classes', correct: false },
                { id: 'd', text: 'It is declared with enum', correct: false },
              ],
              explanation:
                "A shared literal tag like kind: 'circle' lets a switch narrow each branch exactly.",
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why assign the switch default value to never?',
              options: [
                { id: 'a', text: 'Performance', correct: false },
                { id: 'b', text: 'It forces a compile error when a new union variant is not handled', correct: true },
                { id: 'c', text: 'It silences errors', correct: false },
                { id: 'd', text: 'It is required syntax', correct: false },
              ],
              explanation:
                'If all variants are handled, the default is unreachable (never). A new variant breaks that — on purpose.',
            },
          ],
        },
        {
          id: 'aliases-vs-interfaces',
          title: 'Type aliases vs interfaces',
          minutes: 9,
          blurb: 'Two ways to name a type — and when each shines.',
          concept: [
            {
              heading: 'Two tools, large overlap',
              body: 'Both name a shape: `interface User { id: number }` and `type User = { id: number }` are interchangeable for plain objects. The practical differences are at the edges.',
            },
            {
              heading: 'What only type can do',
              body: 'A `type` alias can name **anything**: unions (`type Id = string | number`), tuples, function types, conditional and mapped types. Interfaces can only describe object/function shapes. That makes `type` the more general tool.',
            },
            {
              heading: 'What only interface can do',
              body: 'Interfaces support **extends** (clean inheritance chains, slightly better error messages and performance in huge codebases) and **declaration merging** — declaring the same interface twice merges them, which is how libraries let you augment their types. Common convention: `interface` for public object shapes, `type` for unions and compositions.',
            },
          ],
          codeSamples: [
            {
              title: 'Side by side',
              filename: 'naming-types.ts',
              language: 'typescript',
              code: "interface Animal {\n  name: string;\n}\ninterface Dog extends Animal {\n  bark(): void;\n}\n\ntype Id = string | number;            // only type can do unions\ntype Handler = (e: Event) => void;    // function type\ntype WithTimestamps<T> = T & {        // intersection composition\n  createdAt: Date;\n  updatedAt: Date;\n};\n\ntype DogRecord = WithTimestamps<Dog>;",
              annotations: [
                { line: 4, note: 'extends gives a clean inheritance chain.' },
                { line: 8, note: 'Unions are type-alias territory — interfaces cannot express this.' },
                { line: 10, note: 'The & intersection combines shapes; generic aliases compose types.' },
              ],
              explanation:
                'Reading tip: extends = interface style inheritance; & = type style composition. Both produce a combined shape.',
            },
          ],
          keyPoints: [
            'For plain object shapes, `interface` and `type` are interchangeable.',
            '`type` is more general: unions, tuples, function types, conditional types.',
            '`interface` supports extends chains and declaration merging (library augmentation).',
            'Convention: interface for public shapes, type for unions/compositions.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Which can express string | number?',
              options: [
                { id: 'a', text: 'Only interface', correct: false },
                { id: 'b', text: 'Only a type alias', correct: true },
                { id: 'c', text: 'Both', correct: false },
                { id: 'd', text: 'Neither', correct: false },
              ],
              explanation: 'Unions can only be named with type aliases.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is declaration merging?',
              options: [
                { id: 'a', text: 'Combining two files into one', correct: false },
                { id: 'b', text: 'Two declarations of the same interface merging into one type', correct: true },
                { id: 'c', text: 'Merging git branches', correct: false },
                { id: 'd', text: 'A runtime feature', correct: false },
              ],
              explanation:
                'Interfaces with the same name merge — the mechanism behind augmenting library types.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does A & B produce?',
              options: [
                { id: 'a', text: 'Either A or B', correct: false },
                { id: 'b', text: 'A type with ALL members of both A and B', correct: true },
                { id: 'c', text: 'Only shared members', correct: false },
                { id: 'd', text: 'A boolean', correct: false },
              ],
              explanation:
                'Intersection combines shapes — the result must satisfy both. (Compare: A | B is either/or.)',
            },
          ],
        },
        {
          id: 'literals-enums-const',
          title: 'Literal types, enums & as const',
          minutes: 10,
          blurb: 'Exact-value types and the three ways to model fixed sets.',
          concept: [
            {
              heading: 'Literal types',
              body: "A literal type is one exact value: type Dir = 'up' | 'down' allows only those two strings. This powers safe configuration everywhere: HTTP methods, sort orders, status fields. The editor autocompletes the options and typos become compile errors.",
            },
            {
              heading: 'enum and its caveats',
              body: 'enum Color { Red, Green } creates a real runtime object (unlike most TS features) with numeric values by default. String enums (Red = \'RED\') are safer to debug. Many teams now prefer literal unions or `as const` objects over enums — lighter output, simpler semantics — but you must read enums fluently in existing code.',
            },
            {
              heading: 'as const',
              body: 'Appending `as const` freezes a value into its **narrowest** literal type: `const ROLES = [\'admin\', \'editor\'] as const` makes the elements readonly literals instead of plain string. Combined with `typeof` (next level) it derives union types straight from data — single source of truth.',
            },
          ],
          codeSamples: [
            {
              title: 'Three ways to model a fixed set',
              filename: 'fixed-sets.ts',
              language: 'typescript',
              code: "// 1) Literal union — lightest, most common in modern code\ntype Method = 'GET' | 'POST' | 'PUT' | 'DELETE';\n\n// 2) enum — generates a runtime object\nenum Status {\n  Active = 'ACTIVE',\n  Banned = 'BANNED',\n}\n\n// 3) as const object — data + types from one source\nconst LEVELS = {\n  low: 1,\n  high: 3,\n} as const;\n\nlet m: Method = 'GET';\nlet s: Status = Status.Active;\nlet l: typeof LEVELS.low = 1;   // type is literally 1",
              annotations: [
                { line: 2, note: 'Zero runtime cost — pure type information.' },
                { line: 5, note: 'enum survives compilation as a real object you can iterate.' },
                { line: 14, note: 'as const: every property becomes a readonly literal type.' },
              ],
              explanation:
                'Modern codebases lean on options 1 and 3; enums remain common in older code and some teams’ conventions.',
            },
          ],
          keyPoints: [
            "Literal types allow exact values only: type Dir = 'up' | 'down'.",
            'enums create runtime objects; string enums debug better than numeric ones.',
            '`as const` narrows a value to readonly literals — derive types from data.',
            'Modern preference: literal unions / as const over enums, but read all three.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Which TS feature produces real JavaScript output at runtime?',
              options: [
                { id: 'a', text: 'interface', correct: false },
                { id: 'b', text: 'type alias', correct: false },
                { id: 'c', text: 'enum', correct: true },
                { id: 'd', text: 'union types', correct: false },
              ],
              explanation:
                'enum is the notable exception to type erasure — it compiles to an actual object.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: "What does as const do to ['a', 'b']?",
              options: [
                { id: 'a', text: 'Makes it a mutable string[]', correct: false },
                { id: 'b', text: "Makes it readonly with literal types 'a' and 'b'", correct: true },
                { id: 'c', text: 'Converts it to an enum', correct: false },
                { id: 'd', text: 'Freezes it at runtime', correct: false },
              ],
              explanation:
                'as const narrows to the most specific readonly type — literals, not general strings. (Runtime freezing needs Object.freeze.)',
            },
            {
              id: 'q3',
              type: 'truefalse',
              prompt: "A variable of type 'GET' | 'POST' can hold any string value.",
              options: [
                { id: 'a', text: 'True', correct: false },
                { id: 'b', text: 'False', correct: true },
              ],
              explanation:
                'Literal unions accept only the listed exact values — that is their entire point.',
            },
          ],
        },
        {
          id: 'classes',
          title: 'Classes in TypeScript',
          minutes: 11,
          blurb: 'Access modifiers, implements, abstract — OOP with types.',
          concept: [
            {
              heading: 'JS classes + type features',
              body: 'TS classes are JavaScript classes plus: **access modifiers** (`public` default, `private` class-only, `protected` class + subclasses), `readonly`, and **parameter properties** — declaring `constructor(private repo: Repo)` creates and assigns the field in one stroke (you saw this in Angular).',
            },
            {
              heading: 'implements and abstract',
              body: '`class ApiUserService implements UserService` makes the compiler verify the class fulfills the interface — the interface stays a pure contract. An `abstract` class is half contract, half implementation: it cannot be instantiated, and subclasses must implement its abstract members.',
            },
            {
              heading: 'When classes vs plain objects',
              body: 'Idiomatic TS uses **interfaces + plain objects + functions** for data, and classes where identity and behavior matter: services, framework constructs (Angular components), or stateful objects with methods. private fields are checked at compile time only; JavaScript `#field` is private at runtime too.',
            },
          ],
          codeSamples: [
            {
              title: 'A class implementing a contract',
              filename: 'user-service.ts',
              language: 'typescript',
              code: "interface UserService {\n  findById(id: number): Promise<User | undefined>;\n}\n\nclass ApiUserService implements UserService {\n  constructor(private http: HttpClient) {}\n\n  async findById(id: number): Promise<User | undefined> {\n    return this.http.get<User>('/users/' + id);\n  }\n}\n\nabstract class BaseRepo<T> {\n  abstract findAll(): Promise<T[]>;\n  async count(): Promise<number> {\n    return (await this.findAll()).length;\n  }\n}",
              annotations: [
                { line: 5, note: 'implements: compiler verifies every interface member exists.' },
                { line: 6, note: 'Parameter property: declares + assigns this.http in one line.' },
                { line: 13, note: 'abstract class: shared logic (count) + required contract (findAll).' },
              ],
              explanation:
                'Notice the layering: interface = pure contract, abstract class = partial implementation, class = concrete.',
            },
          ],
          keyPoints: [
            'Modifiers: `public` (default), `private`, `protected`, `readonly`.',
            'Parameter properties (`constructor(private x: T)`) declare + assign fields.',
            '`implements` checks a class against an interface contract.',
            '`abstract` classes mix required members with shared implementation.',
            'Prefer plain objects + interfaces for data; classes for behavior and identity.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does constructor(private logger: Logger) {} do?',
              options: [
                { id: 'a', text: 'Only declares a parameter', correct: false },
                { id: 'b', text: 'Declares a private field AND assigns the argument to it', correct: true },
                { id: 'c', text: 'Creates a global variable', correct: false },
                { id: 'd', text: 'It is a syntax error', correct: false },
              ],
              explanation:
                'Parameter properties are shorthand for declaring the field and writing this.logger = logger.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Who can access a protected member?',
              options: [
                { id: 'a', text: 'Anyone', correct: false },
                { id: 'b', text: 'The class itself and its subclasses', correct: true },
                { id: 'c', text: 'Only the constructor', correct: false },
                { id: 'd', text: 'Other files only', correct: false },
              ],
              explanation:
                'protected sits between private (class only) and public (everyone).',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Can you create an instance of an abstract class with new?',
              options: [
                { id: 'a', text: 'Yes, always', correct: false },
                { id: 'b', text: 'No — only its concrete subclasses can be instantiated', correct: true },
                { id: 'c', text: 'Only in strict mode', correct: false },
                { id: 'd', text: 'Only with generics', correct: false },
              ],
              explanation:
                'abstract classes are templates: they exist to be extended, not instantiated.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 3 — GENERICS & TYPE TOOLS
    // ===================================================================
    {
      id: 'l3-generics-tools',
      order: 3,
      title: 'Level 3 — Generics & type tools',
      goal: 'Read and write generics, use the built-in utility types, and derive types from data with keyof/typeof.',
      lessons: [
        {
          id: 'generics',
          title: 'Generics — types as parameters',
          minutes: 13,
          blurb: 'Write once, stay type-safe for any inner type.',
          concept: [
            {
              heading: 'The problem generics solve',
              body: 'A function that returns the first array element works for any element type. Without generics you would choose between writing it per type or losing safety with `any`. A **generic** makes the type itself a parameter: `function first<T>(arr: T[]): T | undefined`. Call it with numbers and T = number; with users and T = User — inferred automatically from the argument.',
            },
            {
              heading: 'Reading angle brackets',
              body: 'When you see `<T>` after a name, read it as "this is parameterized by a type T". `Array<string>`, `Promise<User>`, `Observable<number>`, `Map<string, User[]>` — you have been reading generics all along. Multiple parameters and descriptive names are common: `Record<K, V>`.',
            },
            {
              heading: 'Constraints and defaults',
              body: '`<T extends { id: number }>` constrains T: only types having an id qualify, and inside the function you may use `.id`. Defaults work too: `<T = string>`. The most famous constrained pattern: `<T, K extends keyof T>` — "K must be a key of T" — which types functions like `pluck(user, \'name\')` exactly.',
            },
          ],
          codeSamples: [
            {
              title: 'Generic function with a constraint',
              filename: 'generics.ts',
              language: 'typescript',
              code: "function first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\n\nconst n = first([10, 20, 30]);        // n: number | undefined\nconst s = first(['a', 'b']);          // s: string | undefined\n\nfunction byId<T extends { id: number }>(items: T[], id: number): T | undefined {\n  return items.find((item) => item.id === id);\n}\n\ninterface ApiResponse<TData> {\n  data: TData;\n  status: number;\n}\n\ntype UserResponse = ApiResponse<{ name: string }>;",
              annotations: [
                { line: 1, note: '<T> declares the type parameter; arr: T[] and the return use it.' },
                { line: 5, note: 'T is inferred from the argument — no need to write first<number>(...).' },
                { line: 8, note: 'extends constrains T: anything with a numeric id. item.id is now safe.' },
                { line: 12, note: 'Generic interfaces: the wrapper shape is fixed, the payload type varies.' },
              ],
              explanation:
                'Generic wrappers like ApiResponse<T> are the most common real-world use — one envelope shape, many payloads.',
            },
          ],
          keyPoints: [
            'Generics make types parameters: `first<T>(arr: T[]): T | undefined`.',
            'T is usually **inferred** from arguments — explicit `<number>` is rarely needed.',
            '`extends` constrains what T can be and unlocks its members inside.',
            'Generic interfaces (`ApiResponse<T>`) wrap varying payloads in one shape.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: "What is T in: const x = first(['a', 'b'])?",
              options: [
                { id: 'a', text: 'any', correct: false },
                { id: 'b', text: 'string — inferred from the argument', correct: true },
                { id: 'c', text: 'unknown', correct: false },
                { id: 'd', text: 'You must specify it manually', correct: false },
              ],
              explanation:
                'TS infers T from the string array — inference is the normal way generics are used.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does <T extends { length: number }> allow inside the function?',
              options: [
                { id: 'a', text: 'Nothing extra', correct: false },
                { id: 'b', text: 'Safely reading .length on values of type T', correct: true },
                { id: 'c', text: 'Calling T as a function', correct: false },
                { id: 'd', text: 'Mutating T', correct: false },
              ],
              explanation:
                'The constraint guarantees every T has length, so the compiler permits accessing it.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'In Promise<User[]>, what does the generic parameter say?',
              options: [
                { id: 'a', text: 'The promise may fail', correct: false },
                { id: 'b', text: 'The promise resolves with an array of User', correct: true },
                { id: 'c', text: 'The promise runs twice', correct: false },
                { id: 'd', text: 'Nothing — it is decoration', correct: false },
              ],
              explanation:
                'The parameter is the resolution type: await gives you User[].',
            },
          ],
        },
        {
          id: 'utility-types',
          title: 'Utility types',
          minutes: 11,
          blurb: 'Partial, Pick, Omit, Record & friends — types from types.',
          concept: [
            {
              heading: 'Transforming existing types',
              body: 'TypeScript ships built-in generics that derive new types from old ones, so one source interface serves many use-cases. The big six: `Partial<T>` (all optional), `Required<T>` (all required), `Readonly<T>`, `Pick<T, K>` (keep listed keys), `Omit<T, K>` (drop listed keys), `Record<K, V>` (object with keys K, values V).',
            },
            {
              heading: 'Why this matters',
              body: 'Real apps need variations of the same model: a **create** payload has no id yet (`Omit<User, \'id\'>`), an **update** sends some fields (`Partial<User>`), a lookup table maps ids to users (`Record<number, User>`). Deriving them keeps a single source of truth — change User once and every variant follows.',
            },
            {
              heading: 'Function-related utilities',
              body: '`ReturnType<typeof fn>` extracts what a function returns; `Parameters<typeof fn>` its argument tuple; `Awaited<T>` unwraps promises; `NonNullable<T>` strips null/undefined. You will meet these when typing code that wraps other code.',
            },
          ],
          codeSamples: [
            {
              title: 'One model, many derived types',
              filename: 'user-variants.ts',
              language: 'typescript',
              code: "interface User {\n  id: number;\n  name: string;\n  email: string;\n  role: 'admin' | 'member';\n}\n\ntype CreateUser = Omit<User, 'id'>;          // no id before insert\ntype UpdateUser = Partial<Omit<User, 'id'>>; // any subset, never id\ntype UserPreview = Pick<User, 'id' | 'name'>;\ntype UsersById = Record<number, User>;\n\nfunction update(id: number, patch: UpdateUser): void {\n  // patch.email? maybe present — all fields optional\n}",
              annotations: [
                { line: 8, note: 'Omit drops keys: a creation payload without id.' },
                { line: 9, note: 'Utilities compose: Partial of Omit — optional everything except no id at all.' },
                { line: 11, note: 'Record builds dictionary shapes: numeric keys to User values.' },
              ],
              explanation:
                'Composing utilities (Partial<Omit<...>>) is everyday TS — read them inside-out like function calls.',
            },
          ],
          keyPoints: [
            'Utility types derive variants from one source: `Partial`, `Pick`, `Omit`, `Record`...',
            'Typical mappings: create = `Omit<T, \'id\'>`, update = `Partial<T>`, dictionary = `Record<K, V>`.',
            'They compose: `Partial<Omit<User, \'id\'>>` — read inside-out.',
            '`ReturnType`, `Parameters`, `Awaited` extract types from functions and promises.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does Partial<User> produce?',
              options: [
                { id: 'a', text: 'User with all properties optional', correct: true },
                { id: 'b', text: 'Half of the properties', correct: false },
                { id: 'c', text: 'User without methods', correct: false },
                { id: 'd', text: 'A runtime validator', correct: false },
              ],
              explanation:
                'Partial marks every property optional — the standard type for update patches.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: "Which type is 'User without the password field'?",
              options: [
                { id: 'a', text: "Pick<User, 'password'>", correct: false },
                { id: 'b', text: "Omit<User, 'password'>", correct: true },
                { id: 'c', text: 'Partial<User>', correct: false },
                { id: 'd', text: "Record<User, 'password'>", correct: false },
              ],
              explanation:
                'Omit removes the listed keys; Pick would keep only them.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does Record<string, boolean> describe?',
              options: [
                { id: 'a', text: 'A single boolean', correct: false },
                { id: 'b', text: 'An object whose string keys all map to booleans', correct: true },
                { id: 'c', text: 'An array of booleans', correct: false },
                { id: 'd', text: 'A tuple', correct: false },
              ],
              explanation:
                'Record<K, V> is the dictionary type: feature flags, lookup maps, etc.',
            },
          ],
        },
        {
          id: 'keyof-typeof',
          title: 'keyof, typeof & indexed access',
          minutes: 11,
          blurb: 'Derive types from values and keys — single source of truth.',
          concept: [
            {
              heading: 'typeof — value to type',
              body: 'In type position, `typeof someValue` captures the type of an existing value: `const config = {...}; type Config = typeof config`. Combined with `as const`, your runtime data becomes your type definition — no duplication to drift out of sync.',
            },
            {
              heading: 'keyof — keys as a union',
              body: '`keyof User` is a union of the property names: `\'id\' | \'name\' | \'email\'`. This types "give me a property name of X" parameters precisely. The signature `get<T, K extends keyof T>(obj: T, key: K): T[K]` is the canonical example — the return type changes with the key you pass.',
            },
            {
              heading: 'Indexed access and mapped types',
              body: '`User[\'email\']` reads the type of one property (string). `Config[keyof Config]` gets all value types. A **mapped type** iterates keys to build a new shape: `{ [K in keyof T]: boolean }` — the mechanism Partial and Readonly are built on. You read these more often than you write them.',
            },
          ],
          codeSamples: [
            {
              title: 'Types derived from data',
              filename: 'derive.ts',
              language: 'typescript',
              code: "const STATUS_LABELS = {\n  pending: 'In review',\n  approved: 'Accepted',\n  rejected: 'Declined',\n} as const;\n\ntype Status = keyof typeof STATUS_LABELS;\n// 'pending' | 'approved' | 'rejected'\n\ntype Label = (typeof STATUS_LABELS)[Status];\n// 'In review' | 'Accepted' | 'Declined'\n\nfunction getProp<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst user = { id: 1, name: 'Ada' };\nconst name = getProp(user, 'name');   // string\n// getProp(user, 'wrong');            // Error: not a key of user",
              annotations: [
                { line: 7, note: 'keyof typeof: from the value, get its keys as a literal union.' },
                { line: 10, note: 'Indexed access: look up the value types by key union.' },
                { line: 13, note: 'The canonical generic: K must be a key of T; returns exactly T[K].' },
              ],
              explanation:
                'This trio (typeof, keyof, indexed access) means data declared once can drive types everywhere.',
            },
          ],
          keyPoints: [
            '`typeof value` (in type position) captures a value’s type.',
            '`keyof T` is a union of T’s property names.',
            "Indexed access `T['prop']` reads one property’s type.",
            '`keyof typeof data` (with as const) derives literal unions from real data.',
            'Mapped types `{ [K in keyof T]: ... }` power Partial, Readonly, and friends.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What is keyof { id: number; name: string }?',
              options: [
                { id: 'a', text: 'number | string', correct: false },
                { id: 'b', text: "'id' | 'name'", correct: true },
                { id: 'c', text: 'string[]', correct: false },
                { id: 'd', text: 'object', correct: false },
              ],
              explanation:
                'keyof yields the property NAMES as a literal union, not the value types.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: "What does User['email'] give you?",
              options: [
                { id: 'a', text: 'The runtime value of email', correct: false },
                { id: 'b', text: 'The TYPE of the email property', correct: true },
                { id: 'c', text: 'A getter function', correct: false },
                { id: 'd', text: 'An error', correct: false },
              ],
              explanation:
                'Indexed access types read a property type from another type.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why pair as const with keyof typeof?',
              options: [
                { id: 'a', text: 'For performance', correct: false },
                { id: 'b', text: 'as const keeps literal types so the derived union is exact', correct: true },
                { id: 'c', text: 'It is mandatory syntax', correct: false },
                { id: 'd', text: 'To enable enums', correct: false },
              ],
              explanation:
                'Without as const the values widen (to string), and derived types lose precision.',
            },
          ],
        },
        {
          id: 'type-guards',
          title: 'Type guards, assertions & satisfies',
          minutes: 11,
          blurb: 'Teach the compiler what you know — safely.',
          concept: [
            {
              heading: 'Custom type guards',
              body: 'A function returning `value is User` is a **type predicate**: if it returns true, TS narrows the argument to User at the call site. This packages a runtime check (does it have the right fields?) with a compile-time consequence — the bridge for validating API responses and other unknown data.',
            },
            {
              heading: 'as — the escape hatch',
              body: '`value as User` is a **type assertion**: no runtime check, just you overruling the compiler. Legitimate when you truly know more (DOM lookups, JSON you control); dangerous as a habit — every `as` is a place the compiler can no longer protect. `x!` similarly asserts "not null". Prefer narrowing; assert only at well-understood boundaries.',
            },
            {
              heading: 'satisfies — check without changing',
              body: '`const config = {...} satisfies Config` verifies the value matches Config while **keeping its narrower inferred type** — unlike `: Config` annotation which widens it. Best of both: validation plus precise inference. Added in TS 4.9 and now everywhere in modern code.',
            },
          ],
          codeSamples: [
            {
              title: 'Guarding unknown data',
              filename: 'guards.ts',
              language: 'typescript',
              code: "interface User {\n  id: number;\n  name: string;\n}\n\nfunction isUser(value: unknown): value is User {\n  return (\n    typeof value === 'object' &&\n    value !== null &&\n    'id' in value &&\n    'name' in value\n  );\n}\n\nconst raw: unknown = JSON.parse('{\"id\":1,\"name\":\"Ada\"}');\n\nif (isUser(raw)) {\n  console.log(raw.name);   // raw is User here\n}\n\nconst el = document.getElementById('app') as HTMLDivElement;\nconst port = { name: 'dev', value: 4200 } satisfies { name: string; value: number };",
              annotations: [
                { line: 6, note: 'The return type "value is User" makes this a type guard.' },
                { line: 16, note: 'Inside the if, TS treats raw as User — runtime check + compile-time narrowing.' },
                { line: 20, note: 'as: an assertion with no runtime verification — use sparingly.' },
                { line: 21, note: 'satisfies validates the shape but keeps the precise inferred type.' },
              ],
              explanation:
                'Pattern to remember: unknown in, guard in the middle, typed value out — the safe way to ingest external data.',
            },
          ],
          keyPoints: [
            'Type predicates (`value is User`) combine runtime checks with narrowing.',
            '`as` asserts without checking — an escape hatch for boundaries, not a habit.',
            '`x!` asserts non-null; same caution applies.',
            '`satisfies` validates against a type while keeping the narrower inferred type.',
            'For serious validation of external data, libraries like Zod generate guards for you.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What makes a function a custom type guard?',
              options: [
                { id: 'a', text: 'It throws on bad input', correct: false },
                { id: 'b', text: 'Its return type is a predicate like "value is User"', correct: true },
                { id: 'c', text: 'It is named isSomething', correct: false },
                { id: 'd', text: 'It uses as inside', correct: false },
              ],
              explanation:
                'The "arg is Type" return annotation tells TS to narrow when the function returns true.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Does "value as User" verify anything at runtime?',
              options: [
                { id: 'a', text: 'Yes, it validates the fields', correct: false },
                { id: 'b', text: 'No — it only silences the compiler', correct: true },
                { id: 'c', text: 'Only in strict mode', correct: false },
                { id: 'd', text: 'It throws if wrong', correct: false },
              ],
              explanation:
                'Assertions are erased like all types. If the value is wrong, you crash later instead.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'How does satisfies differ from a type annotation (: Config)?',
              options: [
                { id: 'a', text: 'No difference', correct: false },
                { id: 'b', text: 'satisfies checks compatibility but keeps the value’s narrower inferred type', correct: true },
                { id: 'c', text: 'satisfies works at runtime', correct: false },
                { id: 'd', text: 'satisfies is for classes only', correct: false },
              ],
              explanation:
                'Annotation widens the variable to Config; satisfies validates while preserving precise literals.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 4 — TYPESCRIPT IN PRACTICE
    // ===================================================================
    {
      id: 'l4-in-practice',
      order: 4,
      title: 'Level 4 — TypeScript in practice',
      goal: 'Configure tsconfig, master modules and declaration files, type async code, and work alongside JavaScript.',
      lessons: [
        {
          id: 'tsconfig',
          title: 'tsconfig.json — the control panel',
          minutes: 11,
          blurb: 'The options that actually matter, especially strict.',
          concept: [
            {
              heading: 'What tsconfig controls',
              body: 'tsconfig.json tells the compiler **what to compile** (`include`/`exclude`/`files`) and **how** (`compilerOptions`). The how splits into: output settings (`target` — which JS version to emit; `module` — which module syntax), resolution settings (`moduleResolution`, `paths`), and the checking settings — the part worth knowing deeply.',
            },
            {
              heading: 'The strict family',
              body: '`strict: true` switches on a bundle of checks. The stars: `strictNullChecks` — null/undefined are real types you must handle (eliminating the classic crash); `noImplicitAny` — every value must have a known type; `strictFunctionTypes` and friends. New projects: always strict. Migrations: enable flags gradually.',
            },
            {
              heading: 'Useful extras',
              body: '`noUncheckedIndexedAccess` makes `arr[i]` return `T | undefined` (honest about out-of-bounds). `paths` maps import aliases like `@app/*`. `skipLibCheck` skips checking node_modules types (faster builds). `extends` lets configs inherit — monorepos share one base config.',
            },
          ],
          codeSamples: [
            {
              title: 'A modern strict config, annotated',
              filename: 'tsconfig.json',
              language: 'json',
              code: "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"module\": \"ESNext\",\n    \"moduleResolution\": \"bundler\",\n    \"strict\": true,\n    \"noUncheckedIndexedAccess\": true,\n    \"skipLibCheck\": true,\n    \"paths\": {\n      \"@app/*\": [\"./src/app/*\"]\n    }\n  },\n  \"include\": [\"src\"]\n}",
              annotations: [
                { line: 3, note: 'Emit modern JS — bundlers/browsers today handle ES2022.' },
                { line: 5, note: 'bundler resolution: the mode for Vite/esbuild-era projects.' },
                { line: 6, note: 'The single most important line in the file.' },
                { line: 7, note: 'arr[i] becomes T | undefined — honest indexing.' },
              ],
              explanation:
                'You rarely write this from scratch — frameworks generate it — but you must be able to read and adjust it.',
            },
          ],
          keyPoints: [
            'tsconfig = what to compile (`include`) + how (`compilerOptions`).',
            '`strict: true` always, in every new project — `strictNullChecks` is the crown jewel.',
            '`target` = emitted JS version; `module`/`moduleResolution` = import handling.',
            '`paths` for import aliases; `extends` to share configs.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does strictNullChecks enforce?',
              options: [
                { id: 'a', text: 'Variables can never be null', correct: false },
                { id: 'b', text: 'null/undefined must be in a type explicitly and handled before use', correct: true },
                { id: 'c', text: 'All strings are trimmed', correct: false },
                { id: 'd', text: 'Faster compilation', correct: false },
              ],
              explanation:
                'It makes null/undefined first-class types — you must check before using possibly-empty values.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does target: "ES2022" control?',
              options: [
                { id: 'a', text: 'Which TypeScript version you write', correct: false },
                { id: 'b', text: 'Which JavaScript version the compiler emits', correct: true },
                { id: 'c', text: 'The Node version installed', correct: false },
                { id: 'd', text: 'Browser support detection', correct: false },
              ],
              explanation:
                'target sets the output JS flavor — older targets get newer syntax transpiled away.',
            },
            {
              id: 'q3',
              type: 'truefalse',
              prompt: 'With noUncheckedIndexedAccess, users[5] has type User | undefined.',
              options: [
                { id: 'a', text: 'True', correct: true },
                { id: 'b', text: 'False', correct: false },
              ],
              explanation:
                'The flag admits that any index might be out of bounds — forcing a check.',
            },
          ],
        },
        {
          id: 'modules-declarations',
          title: 'Modules & declaration files',
          minutes: 11,
          blurb: 'import/export, ESM vs CJS, and what .d.ts files are.',
          concept: [
            {
              heading: 'ES modules',
              body: 'Every file with an import/export is a **module** with its own scope. Named exports (`export const x`, imported with braces `{ x }`) are preferred — they survive renames better and tree-shake cleanly. A `default` export is imported without braces. `import type { User }` marks type-only imports the compiler can fully erase.',
            },
            {
              heading: 'ESM vs CommonJS',
              body: 'You will meet two module systems: modern **ESM** (`import`/`export`) and legacy Node **CommonJS** (`require`/`module.exports`). TS compiles your imports to either, per the `module` setting. The friction zone is Node interop — `esModuleInterop: true` smooths most of it. New code: ESM, always.',
            },
            {
              heading: 'Declaration files (.d.ts)',
              body: 'A `.d.ts` file contains **only types** — the shape of code that lives elsewhere. Libraries ship them (that is how your editor knows lodash’s API); plain-JS libraries get community types via `npm i -D @types/lodash` (the DefinitelyTyped project). `declare` tells TS "this exists at runtime, trust me": `declare const VERSION: string`.',
            },
          ],
          codeSamples: [
            {
              title: 'Module syntax tour',
              filename: 'modules.ts',
              language: 'typescript',
              code: "// math.ts\nexport const PI = 3.14159;\nexport function area(r: number): number {\n  return PI * r * r;\n}\nexport default class Calculator {}\n\n// main.ts\nimport Calculator, { PI, area } from './math';\nimport type { User } from './models';\nimport * as math from './math';\n\n// globals.d.ts\ndeclare const APP_VERSION: string;",
              annotations: [
                { line: 9, note: 'Default import (no braces) + named imports (braces) together.' },
                { line: 10, note: 'import type: erased entirely at compile time — zero runtime cost.' },
                { line: 11, note: 'Namespace import: everything under one name.' },
                { line: 14, note: 'declare: a build-injected global gets a type without an implementation.' },
              ],
              explanation:
                'If an import has braces it is named; without braces it is the default; import type means types only.',
            },
          ],
          keyPoints: [
            'Named exports + braces; default export without braces; prefer named.',
            '`import type` erases fully — use it for type-only imports.',
            'ESM (`import`) is modern; CommonJS (`require`) is legacy Node — interop via `esModuleInterop`.',
            '`.d.ts` files carry types only; `@types/*` packages type plain-JS libraries.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does a .d.ts file contain?',
              options: [
                { id: 'a', text: 'Compiled JavaScript', correct: false },
                { id: 'b', text: 'Only type declarations — no runtime code', correct: true },
                { id: 'c', text: 'Test data', correct: false },
                { id: 'd', text: 'Build configuration', correct: false },
              ],
              explanation:
                'Declaration files describe shapes of code that exists elsewhere — types without implementation.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'A JS library has no types. What is the usual fix?',
              options: [
                { id: 'a', text: 'Rewrite the library', correct: false },
                { id: 'b', text: 'npm install -D @types/library-name', correct: true },
                { id: 'c', text: 'Use any everywhere', correct: false },
                { id: 'd', text: 'It cannot be used', correct: false },
              ],
              explanation:
                'DefinitelyTyped publishes community-maintained types as @types/* packages.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What is special about import type { User }?',
              options: [
                { id: 'a', text: 'It loads faster at runtime', correct: false },
                { id: 'b', text: 'It is guaranteed to be fully erased — type-only', correct: true },
                { id: 'c', text: 'It imports private members', correct: false },
                { id: 'd', text: 'It only works with classes', correct: false },
              ],
              explanation:
                'import type signals no runtime dependency — important for build tools and avoiding cycles.',
            },
          ],
        },
        {
          id: 'async-types',
          title: 'Typing asynchronous code',
          minutes: 10,
          blurb: 'Promise<T>, await, and the unknown in catch.',
          concept: [
            {
              heading: 'Promise<T> everywhere',
              body: 'Async values are typed by what they resolve with: `Promise<User[]>`. `await` unwraps exactly one layer: awaiting `Promise<User>` gives `User`. An `async` function **always** returns a Promise — even `async function f(): Promise<void>`.',
            },
            {
              heading: 'Combinators',
              body: '`Promise.all` is well-typed: awaiting `[fetchUser(), fetchPosts()]` yields a typed tuple `[User, Post[]]`. `Promise.allSettled` returns result objects you narrow by `status`. The `Awaited<T>` utility unwraps promise types recursively when you need it in type-land.',
            },
            {
              heading: 'Errors are unknown',
              body: 'In a `catch (err)` block, `err` has type **unknown** (anything can be thrown in JS — not just Errors). Correct handling narrows first: `if (err instanceof Error)` then use `err.message`. This single habit separates robust TS error handling from `(err as any).message` crashes.',
            },
          ],
          codeSamples: [
            {
              title: 'Typed async flow',
              filename: 'async.ts',
              language: 'typescript',
              code: "async function fetchUser(id: number): Promise<User> {\n  const res = await fetch('/api/users/' + id);\n  if (!res.ok) {\n    throw new Error('HTTP ' + res.status);\n  }\n  return res.json() as Promise<User>;\n}\n\nasync function loadDashboard(): Promise<void> {\n  try {\n    const [user, posts] = await Promise.all([\n      fetchUser(1),\n      fetchPosts(1),\n    ]);\n    console.log(user.name, posts.length);\n  } catch (err) {\n    if (err instanceof Error) {\n      console.error(err.message);\n    }\n  }\n}",
              annotations: [
                { line: 1, note: 'The signature promises a User — callers await and get exactly that.' },
                { line: 11, note: 'Promise.all preserves types: a [User, Post[]] tuple, destructured.' },
                { line: 16, note: 'err is unknown — narrow with instanceof before touching .message.' },
              ],
              explanation:
                'The instanceof check in catch is the canonical pattern — memorize it.',
            },
          ],
          keyPoints: [
            'Type async results as `Promise<T>`; `await` unwraps one layer.',
            '`Promise.all` returns a correctly-typed tuple of all results.',
            '`catch (err)` gives **unknown** — narrow with `instanceof Error` first.',
            '`Awaited<T>` unwraps promise types at the type level.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What is the type of x in: const x = await fetchUser(1) — where fetchUser returns Promise<User>?',
              options: [
                { id: 'a', text: 'Promise<User>', correct: false },
                { id: 'b', text: 'User', correct: true },
                { id: 'c', text: 'unknown', correct: false },
                { id: 'd', text: 'Awaited', correct: false },
              ],
              explanation: 'await unwraps the promise — you hold the resolved value.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What type does err have in catch (err) { } by default (modern TS)?',
              options: [
                { id: 'a', text: 'Error', correct: false },
                { id: 'b', text: 'unknown', correct: true },
                { id: 'c', text: 'any', correct: false },
                { id: 'd', text: 'string', correct: false },
              ],
              explanation:
                'JS can throw anything, so TS types caught values as unknown — narrow before use.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'await Promise.all([a, b]) where a: Promise<number>, b: Promise<string> gives:',
              options: [
                { id: 'a', text: '(number | string)[]', correct: false },
                { id: 'b', text: '[number, string]', correct: true },
                { id: 'c', text: 'unknown[]', correct: false },
                { id: 'd', text: 'void', correct: false },
              ],
              explanation:
                'Promise.all is typed to preserve each position — you get a precise tuple.',
            },
          ],
        },
        {
          id: 'working-with-js',
          title: 'Living with JavaScript',
          minutes: 10,
          blurb: 'Migration, JSDoc types, and validating external data.',
          concept: [
            {
              heading: 'Gradual migration',
              body: 'TS is designed for **incremental adoption**: `allowJs: true` lets .ts and .js coexist; rename files one by one; loosen the worst rules temporarily and tighten over time. The migration order that works: enable strict, fix errors file-by-file starting from the most imported modules.',
            },
            {
              heading: 'JSDoc — types without .ts',
              body: 'Plain JS files can get real type checking via comments: `/** @param {string} name */` plus `// @ts-check` at the top. The same checker runs — many libraries are written in JS with JSDoc and still ship perfect types. Useful when you cannot change the build pipeline.',
            },
            {
              heading: 'The boundary problem',
              body: 'Types are erased, so **external data is never guaranteed**: an API can return anything regardless of your interface. At boundaries (HTTP, localStorage, user files), validate at runtime — hand-written guards for small cases, or a schema library like **Zod**: define the schema once, get both the runtime validator and the inferred static type (`z.infer<typeof schema>`).',
            },
          ],
          codeSamples: [
            {
              title: 'Schema validation at the boundary',
              filename: 'boundary.ts',
              language: 'typescript',
              code: "import { z } from 'zod';\n\nconst UserSchema = z.object({\n  id: z.number(),\n  name: z.string(),\n  email: z.string().email(),\n});\n\ntype User = z.infer<typeof UserSchema>;\n\nasync function fetchUser(id: number): Promise<User> {\n  const res = await fetch('/api/users/' + id);\n  const json: unknown = await res.json();\n  return UserSchema.parse(json); // throws if shape is wrong\n}",
              annotations: [
                { line: 3, note: 'The schema is a runtime object — it survives compilation.' },
                { line: 9, note: 'z.infer derives the static type from the schema — one source of truth.' },
                { line: 14, note: 'parse validates for real; after it, the data genuinely matches User.' },
              ],
              explanation:
                'Interfaces promise; schemas verify. At external boundaries you want verification.',
            },
          ],
          keyPoints: [
            'Migrate gradually: `allowJs`, rename file-by-file, tighten flags over time.',
            'JSDoc + `@ts-check` gives JS files real type checking without converting them.',
            'Types are erased — external data needs **runtime validation** at boundaries.',
            'Zod-style schemas give validator + inferred type from one definition.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why can an API response violate your interface even though the code compiles?',
              options: [
                { id: 'a', text: 'The compiler has bugs', correct: false },
                { id: 'b', text: 'Types are erased — nothing checks the actual data at runtime', correct: true },
                { id: 'c', text: 'Interfaces only work locally', correct: false },
                { id: 'd', text: 'It cannot happen', correct: false },
              ],
              explanation:
                'An interface is a compile-time promise. The server can still send anything — hence boundary validation.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does z.infer<typeof schema> give you?',
              options: [
                { id: 'a', text: 'A runtime validator', correct: false },
                { id: 'b', text: 'The static TypeScript type derived from the schema', correct: true },
                { id: 'c', text: 'A JSON string', correct: false },
                { id: 'd', text: 'A database model', correct: false },
              ],
              explanation:
                'The schema is the single source: parse() validates at runtime, z.infer extracts the static type.',
            },
            {
              id: 'q3',
              type: 'truefalse',
              prompt: 'A plain .js file can be type-checked using JSDoc comments and @ts-check.',
              options: [
                { id: 'a', text: 'True', correct: true },
                { id: 'b', text: 'False', correct: false },
              ],
              explanation:
                'The TS checker reads JSDoc annotations — full checking without changing the file extension.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 5 — ADVANCED & PRO
    // ===================================================================
    {
      id: 'l5-advanced',
      order: 5,
      title: 'Level 5 — Advanced & pro',
      goal: 'Read conditional and template literal types, know pro patterns, and run TS properly in real toolchains.',
      lessons: [
        {
          id: 'conditional-types',
          title: 'Conditional & template literal types',
          minutes: 12,
          blurb: 'The type-level if/else behind library magic.',
          concept: [
            {
              heading: 'Type-level if/else',
              body: 'A **conditional type** branches on assignability: `T extends U ? X : Y`. Example: `type IsString<T> = T extends string ? true : false`. Applied to a union, it **distributes** — runs per member — which is how `Exclude<T, U>` filters union members.',
            },
            {
              heading: 'infer — pattern matching',
              body: '`infer` captures a part of a matched type: `type ElementOf<T> = T extends (infer E)[] ? E : never` extracts an array’s element type. This is exactly how built-ins like `ReturnType<T>` and `Awaited<T>` are implemented. You will read infer in library types far more often than you write it.',
            },
            {
              heading: 'Template literal types',
              body: 'String literal types can be composed: `type EventName = `on${Capitalize<\'click\' | \'focus\'>}`` gives `\'onClick\' | \'onFocus\'`. Libraries use this to type things like route params from path strings. Goal for this lesson: **recognize and read** these constructs — writing them is rarely needed in app code.',
            },
          ],
          codeSamples: [
            {
              title: 'Reading advanced type code',
              filename: 'advanced-types.ts',
              language: 'typescript',
              code: "type IsArray<T> = T extends unknown[] ? true : false;\ntype A = IsArray<number[]>;   // true\ntype B = IsArray<string>;     // false\n\n// infer: extract pieces from a matched shape\ntype ElementOf<T> = T extends (infer E)[] ? E : never;\ntype N = ElementOf<number[]>;          // number\n\ntype MyReturnType<T> = T extends (...args: never[]) => infer R ? R : never;\ntype R1 = MyReturnType<() => string>;  // string\n\n// distribution over unions\ntype NoNull<T> = T extends null | undefined ? never : T;\ntype Clean = NoNull<string | null | number>; // string | number",
              annotations: [
                { line: 1, note: 'Read as: if T is assignable to unknown[], then true, else false.' },
                { line: 6, note: 'infer E names the element type if T matches the array pattern.' },
                { line: 9, note: 'This is essentially how the built-in ReturnType works.' },
                { line: 13, note: 'Applied to a union, the conditional runs per member — null filters out.' },
              ],
              explanation:
                'When library types look like magic, they are made of exactly these three ingredients: extends-conditions, infer, and distribution.',
            },
          ],
          keyPoints: [
            'Conditional types: `T extends U ? X : Y` — if/else at the type level.',
            '`infer` captures matched parts — the engine behind `ReturnType`, `Awaited`.',
            'Conditionals distribute over unions — how `Exclude`/`NonNullable` filter.',
            'Template literal types compose string literals (`on${Name}`).',
            'Priority: read these fluently; writing them is for library authors.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does T extends string ? A : B mean?',
              options: [
                { id: 'a', text: 'T inherits from string', correct: false },
                { id: 'b', text: 'If T is assignable to string, the type is A, otherwise B', correct: true },
                { id: 'c', text: 'T must equal exactly "string"', correct: false },
                { id: 'd', text: 'A runtime check', correct: false },
              ],
              explanation:
                'In type position, extends + ? : is a compile-time conditional on assignability.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does infer do in a conditional type?',
              options: [
                { id: 'a', text: 'Guesses types at runtime', correct: false },
                { id: 'b', text: 'Captures part of the matched type into a name you can use', correct: true },
                { id: 'c', text: 'Disables checking', correct: false },
                { id: 'd', text: 'Imports a type', correct: false },
              ],
              explanation:
                'infer is type-level destructuring: name a piece of the pattern, use it in the branch.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'NoNull<string | null> (where NoNull filters null) evaluates to:',
              options: [
                { id: 'a', text: 'never', correct: false },
                { id: 'b', text: 'string', correct: true },
                { id: 'c', text: 'string | null', correct: false },
                { id: 'd', text: 'null', correct: false },
              ],
              explanation:
                'Distribution runs the conditional per union member: null maps to never (dropped), string stays.',
            },
          ],
        },
        {
          id: 'pro-patterns',
          title: 'Professional type patterns',
          minutes: 11,
          blurb: 'Overloads, branded types, exhaustiveness, builder APIs.',
          concept: [
            {
              heading: 'Function overloads',
              body: 'When one function genuinely returns different types per input shape, **overload signatures** describe each case: two declaration lines + one implementation. You will read these in DOM and library typings constantly (`document.createElement(\'a\')` returns `HTMLAnchorElement` — that is overloads at work). In your own code, unions or generics are usually cleaner.',
            },
            {
              heading: 'Branded types',
              body: 'Structural typing means `UserId` and `OrderId` as plain numbers are interchangeable — a real bug source. A **brand** adds a phantom marker: `type UserId = number & { readonly __brand: \'UserId\' }`. Now passing an OrderId where a UserId belongs fails to compile, with zero runtime cost.',
            },
            {
              heading: 'Exhaustiveness as a design tool',
              body: 'Combine discriminated unions + never-checks and the compiler becomes your refactoring engine: model app states as `{ kind: \'loading\' } | { kind: \'loaded\'; data: T } | { kind: \'error\'; msg: string }`, switch everywhere, and adding a variant later lights up every location that must change. **Make illegal states unrepresentable** — the type system’s deepest gift.',
            },
          ],
          codeSamples: [
            {
              title: 'Overloads and brands',
              filename: 'patterns.ts',
              language: 'typescript',
              code: "// Overloads: per-input return types\nfunction parse(input: string): object;\nfunction parse(input: string, raw: true): string;\nfunction parse(input: string, raw?: boolean): object | string {\n  return raw ? input : JSON.parse(input);\n}\n\n// Branded ids: same runtime number, incompatible types\ntype UserId = number & { readonly __brand: 'UserId' };\ntype OrderId = number & { readonly __brand: 'OrderId' };\n\nfunction getUser(id: UserId): void {}\n\nconst uid = 7 as UserId;\nconst oid = 9 as OrderId;\ngetUser(uid);      // OK\n// getUser(oid);   // Error: OrderId is not UserId",
              annotations: [
                { line: 2, note: 'Overload signature 1: callers without raw get object.' },
                { line: 3, note: 'Overload signature 2: raw: true callers get string.' },
                { line: 9, note: 'The __brand property never exists at runtime — purely a type marker.' },
                { line: 17, note: 'The bug class "swapped the ids" is now a compile error.' },
              ],
              explanation:
                'Both patterns cost nothing at runtime — they encode intent the compiler can enforce.',
            },
          ],
          keyPoints: [
            'Overloads give per-input return types; read them top-down, implementation last.',
            'Branded types make same-shaped values (ids!) incompatible on purpose.',
            'Model states as discriminated unions; never-checks turn refactors into checklists.',
            'Design goal: make illegal states unrepresentable.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why brand UserId and OrderId instead of using number for both?',
              options: [
                { id: 'a', text: 'Performance', correct: false },
                { id: 'b', text: 'So passing one where the other belongs becomes a compile error', correct: true },
                { id: 'c', text: 'Smaller bundles', correct: false },
                { id: 'd', text: 'Runtime validation', correct: false },
              ],
              explanation:
                'Brands defeat structural interchangeability for same-shaped values — catching swapped-argument bugs.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'In an overloaded function, what do callers see?',
              options: [
                { id: 'a', text: 'Only the implementation signature', correct: false },
                { id: 'b', text: 'The overload signatures — the implementation signature is hidden', correct: true },
                { id: 'c', text: 'All signatures merged into any', correct: false },
                { id: 'd', text: 'A random one', correct: false },
              ],
              explanation:
                'Callers match against the declared overloads; the broader implementation signature is internal.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does "make illegal states unrepresentable" mean?',
              options: [
                { id: 'a', text: 'Add more runtime validation', correct: false },
                { id: 'b', text: 'Design types so invalid combinations cannot even be expressed', correct: true },
                { id: 'c', text: 'Hide errors from users', correct: false },
                { id: 'd', text: 'Use any for flexibility', correct: false },
              ],
              explanation:
                'E.g. a union of {loading} | {loaded, data} makes "loaded but no data" impossible to construct.',
            },
          ],
        },
        {
          id: 'ts-tooling',
          title: 'TS in the toolchain',
          minutes: 10,
          blurb: 'Linting, CI checks, build tools, and editor power.',
          concept: [
            {
              heading: 'Who compiles, who checks',
              body: 'Modern setups split roles: a fast tool (esbuild/Vite/swc) **strips types and bundles** without checking, while `tsc --noEmit` runs as the **checker** — in your editor continuously, and in CI as a gate. Both matter: fast feedback while coding, hard guarantee before merging.',
            },
            {
              heading: 'typescript-eslint',
              body: 'ESLint with the TS plugin adds rules the compiler does not enforce: `no-floating-promises` (forgot to await), `no-explicit-any`, consistent type imports. **Type-aware rules** use the type checker inside lint — slower but catches real bugs. Prettier handles formatting; keep lint for correctness.',
            },
            {
              heading: 'Editor mastery',
              body: 'The TS language server powers everything: hover for inferred types, F2 rename across the project, "Go to Definition" into library .d.ts files, and quick-fixes. Reading skill tip: when code confuses you, **hover** — the inferred type usually explains what is happening better than the code itself.',
            },
          ],
          codeSamples: [
            {
              title: 'A CI gate for types and lint',
              filename: '.github/workflows/check.yml',
              language: 'text',
              code: "name: checks\non: [push, pull_request]\njobs:\n  verify:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 22 }\n      - run: npm ci\n      - run: npx tsc --noEmit      # type gate\n      - run: npx eslint src        # lint gate\n      - run: npm test              # behavior gate",
              annotations: [
                { line: 11, note: 'The type check as a hard gate — nothing unchecked reaches main.' },
                { line: 12, note: 'Lint catches what types cannot (unawaited promises, dead code).' },
              ],
              explanation:
                'Three independent gates: types, lint, tests. Together they make pushes boring — in the best way.',
            },
          ],
          keyPoints: [
            'Fast tools bundle without checking; `tsc --noEmit` is the checker (editor + CI).',
            'typescript-eslint adds type-aware rules like `no-floating-promises`.',
            'Hover in the editor reveals inferred types — your best code-reading tool.',
            'CI gates: types, lint, tests — every push verified.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why do Vite/esbuild builds succeed even with type errors?',
              options: [
                { id: 'a', text: 'They fix the errors', correct: false },
                { id: 'b', text: 'They strip types without checking — checking is tsc’s separate job', correct: true },
                { id: 'c', text: 'Type errors are warnings', correct: false },
                { id: 'd', text: 'They cannot — builds always fail', correct: false },
              ],
              explanation:
                'Transpilers remove types syntactically for speed; run tsc --noEmit to actually verify.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What bug does no-floating-promises catch?',
              options: [
                { id: 'a', text: 'Promises that resolve too fast', correct: false },
                { id: 'b', text: 'Calling an async function without await/handling — errors vanish silently', correct: true },
                { id: 'c', text: 'Using promises at all', correct: false },
                { id: 'd', text: 'Slow network calls', correct: false },
              ],
              explanation:
                'A forgotten await means rejections disappear — a classic production bug the linter flags.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Fastest way to understand a confusing expression’s type?',
              options: [
                { id: 'a', text: 'console.log it', correct: false },
                { id: 'b', text: 'Hover over it — the editor shows the inferred type', correct: true },
                { id: 'c', text: 'Read the whole file', correct: false },
                { id: 'd', text: 'Add as any', correct: false },
              ],
              explanation:
                'The language server already computed the answer — hovering reads the compiler’s mind.',
            },
          ],
        },
        {
          id: 'ts-ecosystem',
          title: 'The TypeScript ecosystem',
          minutes: 9,
          blurb: 'Where TS runs, framework flavors, and what is next.',
          concept: [
            {
              heading: 'One language, many homes',
              body: 'TS is the default in **Angular** (you know this flavor), standard in **React** (typed props/hooks, .tsx) and **Vue**, server-side in **Node** (via tsx/ts-node or compiled) and natively executed by **Deno** and **Bun**. Same type system everywhere — only the framework idioms change.',
            },
            {
              heading: 'Type-safe across the stack',
              body: 'The ecosystem pushes types end-to-end: **Zod** validates boundaries, **Prisma/Drizzle** generate types from your database schema, **tRPC** shares types between server and client so an API change breaks the client at compile time. The theme: one source of truth, types flowing outward from it.',
            },
            {
              heading: 'Where the language is heading',
              body: 'Recent versions focused on `satisfies`, decorators (now aligned with the JS standard), and steadily better inference. Two horizons to know: a proposal to let browsers ignore type annotations natively, and the TS compiler being **ported to Go** (announced 2025) for roughly 10× faster checking. Skills from this course transfer unchanged.',
            },
          ],
          codeSamples: [
            {
              title: 'The same types, three contexts',
              filename: 'everywhere.ts',
              language: 'typescript',
              code: "// React component (flavor difference only)\ninterface Props {\n  title: string;\n  onClose: () => void;\n}\n\n// Node API handler\nasync function handler(req: Request): Promise<Response> {\n  return Response.json({ ok: true });\n}\n\n// tRPC-style end-to-end: the client knows this shape\n// without any manual sync — types flow from the server\nconst user = await api.users.byId.query({ id: 1 });\n//    ^ typed User, inferred across the network boundary",
              annotations: [
                { line: 2, note: 'React props are just interfaces — the same skill you already have.' },
                { line: 8, note: 'Server code: identical type system, web-standard Request/Response.' },
                { line: 14, note: 'End-to-end inference: server changes surface as client compile errors.' },
              ],
              explanation:
                'Everything in this course — shapes, generics, narrowing — is exactly what these ecosystems are built from.',
            },
          ],
          keyPoints: [
            'Same type system across Angular, React, Vue, Node; Deno/Bun run TS natively.',
            'End-to-end safety: Zod (boundaries), Prisma (DB to types), tRPC (server to client).',
            'Watch: native type-annotation support in JS, and the 10× faster Go-based compiler.',
            'Your skills transfer — frameworks differ only in idioms, not in the type system.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'multiple',
              prompt: 'Which runtimes can execute TypeScript directly, without a separate compile step? (Select all.)',
              options: [
                { id: 'a', text: 'Deno', correct: true },
                { id: 'b', text: 'Bun', correct: true },
                { id: 'c', text: 'Classic browsers', correct: false },
                { id: 'd', text: 'Node with tsx/ts-node tooling', correct: true },
              ],
              explanation:
                'Deno and Bun run TS natively; Node does via tooling like tsx. Browsers still need plain JS.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does tRPC-style end-to-end typing achieve?',
              options: [
                { id: 'a', text: 'Faster network requests', correct: false },
                { id: 'b', text: 'Server API changes appear as compile errors in the client', correct: true },
                { id: 'c', text: 'Automatic UI generation', correct: false },
                { id: 'd', text: 'Database backups', correct: false },
              ],
              explanation:
                'Shared inferred types mean client and server cannot silently drift apart.',
            },
            {
              id: 'q3',
              type: 'truefalse',
              prompt: 'Moving from Angular to React requires learning a different TypeScript type system.',
              options: [
                { id: 'a', text: 'True', correct: false },
                { id: 'b', text: 'False', correct: true },
              ],
              explanation:
                'The language is identical everywhere — only framework idioms (props vs inputs) differ.',
            },
          ],
        },
      ],
    },
  ],
};
