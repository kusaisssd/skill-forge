import { Course } from '../models/course.model';

/**
 * The RxJS course — from zero to advanced.
 * Focus: think in streams, read operator chains fluently, and know
 * exactly which operator to reach for in real Angular apps.
 */
export const RXJS_COURSE: Course = {
  outcome:
    'By the end you will think in streams: understand observables deeply, read any pipe of operators fluently, choose the right flattening/combination operator instantly, manage subjects and shared state safely, and know how RxJS fits next to signals and promises in modern apps.',
  levels: [
    // ===================================================================
    // LEVEL 1 — THINKING IN STREAMS
    // ===================================================================
    {
      id: 'l1-streams',
      order: 1,
      title: 'Level 1 — Thinking in streams',
      goal: 'Understand what reactive programming is, the anatomy of an observable, how to create them, and how subscriptions live and die.',
      lessons: [
        {
          id: 'thinking-in-streams',
          title: 'Thinking in streams',
          minutes: 10,
          blurb: 'Why "values over time" changes how you model problems.',
          concept: [
            {
              heading: 'Everything is a stream',
              body: 'A **stream** is a sequence of values arriving **over time**: every click of a button, every keystroke in a search box, every HTTP response, every timer tick. Reactive programming means modeling your program as streams being transformed and combined, instead of variables being checked and mutated.\n\nAn array is values in space; an observable is values in **time**. Almost everything you know about arrays (map, filter, reduce) transfers — that is the secret that makes RxJS learnable.',
            },
            {
              heading: 'Push, not pull',
              body: 'With a function or promise **you** ask for the value (pull). With an observable, the producer **pushes** values to you whenever it has them — zero, one, or infinitely many. This is why observables can model things promises cannot: a promise resolves once; a stream of clicks never "resolves", it keeps emitting.',
            },
            {
              heading: 'Where RxJS sits today',
              body: 'RxJS is the JavaScript implementation of ReactiveX, and it is everywhere in Angular: `HttpClient`, router events, form `valueChanges`. The modern guideline: **signals** for state the UI reads, **RxJS** for event streams and async orchestration — they interoperate via `toSignal`/`toObservable`. Learning RxJS is learning the async half of modern Angular.',
            },
          ],
          codeSamples: [
            {
              title: 'The same logic: array vs stream',
              filename: 'streams.ts',
              language: 'typescript',
              code: "// Values in SPACE: an array\nconst doubled = [1, 2, 3]\n  .filter((n) => n % 2 === 1)\n  .map((n) => n * 2);\n\n// Values in TIME: a stream of clicks\nimport { fromEvent, filter, map } from 'rxjs';\n\nconst clicks$ = fromEvent<MouseEvent>(document, 'click');\n\nconst rightSide$ = clicks$.pipe(\n  filter((e) => e.clientX > window.innerWidth / 2),\n  map((e) => e.clientX)\n);\n\nrightSide$.subscribe((x) => console.log('clicked right at', x));",
              annotations: [
                { line: 3, note: 'You already know this — filter and map on values in space.' },
                { line: 11, note: 'The SAME filter and map, applied to values arriving over time.' },
                { line: 15, note: 'Nothing flows until subscribe — streams are lazy.' },
              ],
              explanation:
                'The $ suffix (clicks$) is a naming convention meaning "this is an observable". You will see it in most codebases.',
            },
          ],
          keyPoints: [
            'A stream = values over **time**; an array = values in space. Same operations, new dimension.',
            'Observables **push** values; functions and promises make you pull.',
            'A promise emits once; an observable emits 0..∞ values and can keep going forever.',
            'Modern split: signals for UI state, RxJS for events and async orchestration.',
            'The `$` suffix is the naming convention for observable variables.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What is the key difference between an observable and a promise?',
              options: [
                { id: 'a', text: 'Observables are faster', correct: false },
                { id: 'b', text: 'A promise resolves once; an observable can emit many values over time', correct: true },
                { id: 'c', text: 'Promises are deprecated', correct: false },
                { id: 'd', text: 'Observables only work in Angular', correct: false },
              ],
              explanation:
                'Promises are single-value; observables model ongoing streams like clicks, keystrokes, or websocket messages.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does "push-based" mean?',
              options: [
                { id: 'a', text: 'You request each value manually', correct: false },
                { id: 'b', text: 'The producer sends values to consumers whenever it has them', correct: true },
                { id: 'c', text: 'Values are stored in a queue', correct: false },
                { id: 'd', text: 'It uses HTTP push', correct: false },
              ],
              explanation:
                'With push, the consumer reacts to arriving values instead of polling for them.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does the $ suffix in users$ conventionally mean?',
              options: [
                { id: 'a', text: 'The variable is expensive', correct: false },
                { id: 'b', text: 'The variable holds an observable', correct: true },
                { id: 'c', text: 'The variable is global', correct: false },
                { id: 'd', text: 'It is required syntax', correct: false },
              ],
              explanation:
                'It is a community naming convention (sometimes called "Finnish notation"), not syntax.',
            },
          ],
        },
        {
          id: 'observable-anatomy',
          title: 'Anatomy of an observable',
          minutes: 11,
          blurb: 'next, error, complete — and why laziness matters.',
          concept: [
            {
              heading: 'Three channels',
              body: 'An observable communicates through three channels: **next** (a value — can happen many times), **error** (something failed — at most once, stream ends), and **complete** (no more values — at most once, stream ends). A subscriber can handle each: `obs$.subscribe({ next, error, complete })`.\n\nAfter error or complete, the stream is **done** — nothing more will ever arrive.',
            },
            {
              heading: 'Lazy and unicast',
              body: 'Creating an observable does **nothing**. It is a recipe; `subscribe()` is cooking. Each subscribe runs the recipe **from scratch** for that subscriber (this is called **cold** / unicast): two subscribers to an HTTP observable trigger two HTTP requests. This surprises everyone once — and Level 4 shows how to share one execution.',
            },
            {
              heading: 'The contract in practice',
              body: 'An HTTP request: one `next` with the response, then `complete`. An interval: endless `next`s, never completes. A failed request: one `error`. Reading code, always ask: **how many values, and does it end?** That question explains most operator choices.',
            },
          ],
          codeSamples: [
            {
              title: 'Observing all three channels',
              filename: 'anatomy.ts',
              language: 'typescript',
              code: "import { Observable } from 'rxjs';\n\nconst data$ = new Observable<number>((subscriber) => {\n  subscriber.next(1);\n  subscriber.next(2);\n  subscriber.complete();\n  subscriber.next(99); // ignored — stream already completed\n});\n\ndata$.subscribe({\n  next: (v) => console.log('value', v),\n  error: (e) => console.error('failed', e),\n  complete: () => console.log('done'),\n});\n// logs: value 1, value 2, done  (99 never arrives)",
              annotations: [
                { line: 3, note: 'The constructor receives the producer logic — runs per subscriber.' },
                { line: 7, note: 'After complete(), the contract forbids further emissions.' },
                { line: 10, note: 'An observer object with handlers for each channel.' },
              ],
              explanation:
                'You rarely write new Observable yourself — creation functions (next lesson) do it — but reading this teaches the contract.',
            },
          ],
          keyPoints: [
            'Three channels: `next` (0..∞), `error` (0..1), `complete` (0..1).',
            'error or complete **ends** the stream permanently.',
            'Observables are **lazy**: nothing runs until subscribe.',
            'Cold/unicast: each subscriber triggers a fresh execution (two subscribes = two HTTP calls).',
            'Always ask of any stream: how many values, and does it end?',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'After an observable errors, what else can it emit?',
              options: [
                { id: 'a', text: 'More next values', correct: false },
                { id: 'b', text: 'Nothing — error terminates the stream', correct: true },
                { id: 'c', text: 'Only complete', correct: false },
                { id: 'd', text: 'One retry value', correct: false },
              ],
              explanation:
                'error and complete are terminal: the observable contract guarantees silence afterward.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Two components subscribe to the same cold HTTP observable. How many requests fire?',
              options: [
                { id: 'a', text: 'One, shared automatically', correct: false },
                { id: 'b', text: 'Two — each subscription runs the producer again', correct: true },
                { id: 'c', text: 'Zero', correct: false },
                { id: 'd', text: 'Depends on the browser', correct: false },
              ],
              explanation:
                'Cold observables are unicast: every subscribe re-executes. Sharing requires operators like shareReplay (Level 4).',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'When does the code inside new Observable((subscriber) => {...}) run?',
              options: [
                { id: 'a', text: 'Immediately when defined', correct: false },
                { id: 'b', text: 'On each subscribe call', correct: true },
                { id: 'c', text: 'On the next tick', correct: false },
                { id: 'd', text: 'Only once ever', correct: false },
              ],
              explanation:
                'Observables are lazy recipes — the producer function executes per subscription.',
            },
          ],
        },
        {
          id: 'creating-observables',
          title: 'Creating observables',
          minutes: 10,
          blurb: 'of, from, interval, timer, fromEvent — the creation toolkit.',
          concept: [
            {
              heading: 'The creation functions',
              body: '`of(1, 2, 3)` emits the arguments then completes. `from([...])` converts arrays, promises, or iterables into streams — `from(fetch(url))` bridges promise-land. `interval(1000)` counts 0, 1, 2... every second, forever. `timer(2000)` fires once after a delay (or repeatedly with a second argument). `fromEvent(el, \'click\')` turns DOM events into a stream.',
            },
            {
              heading: 'EMPTY, NEVER, throwError',
              body: 'Three tiny but useful constants/factories: `EMPTY` completes immediately (great as a "do nothing" branch in error handling), `NEVER` never emits and never completes, and `throwError(() => new Error(...))` errors immediately — handy in tests and catchError fallbacks.',
            },
            {
              heading: 'In Angular you mostly receive streams',
              body: 'You will create observables less often than you think: Angular hands them to you — `http.get()`, `route.paramMap`, `form.valueChanges`. Your real skill is **transforming** them (Level 2 onward). Creation functions matter most in tests and when wrapping browser APIs.',
            },
          ],
          codeSamples: [
            {
              title: 'The creation toolkit in action',
              filename: 'creation.ts',
              language: 'typescript',
              code: "import { of, from, interval, timer, fromEvent } from 'rxjs';\n\nof('a', 'b', 'c');            // a, b, c, complete\nfrom([10, 20]);               // 10, 20, complete\nfrom(fetch('/api/user'));     // promise -> observable (one value)\n\ninterval(1000);               // 0, 1, 2, ... every second, forever\ntimer(3000);                  // (3s pause) 0, complete\ntimer(0, 5000);               // 0 now, then 1, 2, ... every 5s\n\nconst keys$ = fromEvent<KeyboardEvent>(document, 'keydown');\nkeys$.subscribe((e) => console.log(e.key));",
              annotations: [
                { line: 5, note: 'from() is the bridge: promises, arrays, iterables become streams.' },
                { line: 7, note: 'interval never completes — remember to unsubscribe (next lesson).' },
                { line: 9, note: 'timer(start, period) is the configurable interval.' },
                { line: 11, note: 'Any EventTarget works: elements, document, window, WebSocket.' },
              ],
              explanation:
                'Quick mnemonic: of = these values; from = this thing; interval/timer = clock; fromEvent = those events.',
            },
          ],
          keyPoints: [
            '`of(...values)` emits arguments; `from(thing)` converts arrays/promises/iterables.',
            '`interval(ms)` ticks forever; `timer(delay, period?)` is its configurable cousin.',
            '`fromEvent(target, name)` streams DOM (and other) events.',
            '`EMPTY` completes at once; `throwError` errors at once — useful in fallbacks and tests.',
            'In Angular you mostly transform streams the framework gives you.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does of([1, 2, 3]) emit?',
              options: [
                { id: 'a', text: 'Three values: 1, 2, 3', correct: false },
                { id: 'b', text: 'One value: the whole array', correct: true },
                { id: 'c', text: 'Nothing', correct: false },
                { id: 'd', text: 'An error', correct: false },
              ],
              explanation:
                'of emits its arguments as-is — one array. To emit elements separately use from([1,2,3]).',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'How do you convert a promise into an observable?',
              options: [
                { id: 'a', text: 'of(promise)', correct: false },
                { id: 'b', text: 'from(promise)', correct: true },
                { id: 'c', text: 'interval(promise)', correct: false },
                { id: 'd', text: 'You cannot', correct: false },
              ],
              explanation:
                'from() understands promises: it emits the resolved value then completes (of would emit the promise object itself).',
            },
            {
              id: 'q3',
              type: 'truefalse',
              prompt: 'interval(1000) completes after the first emission.',
              options: [
                { id: 'a', text: 'True', correct: false },
                { id: 'b', text: 'False', correct: true },
              ],
              explanation:
                'interval never completes — it ticks forever until unsubscribed. timer(1000) is the one-shot version.',
            },
          ],
        },
        {
          id: 'subscriptions-lifecycle',
          title: 'Subscriptions & avoiding leaks',
          minutes: 11,
          blurb: 'unsubscribe, async pipe, takeUntilDestroyed — staying leak-free.',
          concept: [
            {
              heading: 'What subscribe returns',
              body: '`subscribe()` returns a **Subscription** with one job: `unsubscribe()` stops the producer and releases resources. Forgetting this on an infinite stream (interval, fromEvent, valueChanges) is **the** classic RxJS bug: the component is destroyed, the stream keeps running, memory leaks and ghost logic accumulate.',
            },
            {
              heading: 'The leak-free toolbox (best first)',
              body: '1) **async pipe** in templates — subscribes and unsubscribes automatically; zero manual code. 2) **toSignal()** — converts to a signal, cleanup handled. 3) **takeUntilDestroyed()** — completes the stream when the component dies. 4) Manual Subscription + `ngOnDestroy` — the legacy pattern you will read in older code.\n\nFinite streams (HTTP: one value then complete) technically self-clean, but consistent habits beat case-by-case reasoning.',
            },
            {
              heading: 'Reading old vs new code',
              body: 'Old codebases: `private sub = new Subscription()` collecting child subs, all killed in ngOnDestroy, or the `destroy$ = new Subject()` + `takeUntil(this.destroy$)` idiom. New codebases: almost everything flows into templates via async pipe or signals, and `takeUntilDestroyed()` covers the rest. Recognize all of them.',
            },
          ],
          codeSamples: [
            {
              title: 'Modern leak-free Angular component',
              filename: 'ticker.component.ts',
              language: 'typescript',
              code: "import { Component, inject } from '@angular/core';\nimport { AsyncPipe } from '@angular/common';\nimport { takeUntilDestroyed } from '@angular/core/rxjs-interop';\nimport { interval, map } from 'rxjs';\n\n@Component({\n  selector: 'app-ticker',\n  standalone: true,\n  imports: [AsyncPipe],\n  template: `<p>Seconds: {{ seconds$ | async }}</p>`,\n})\nexport class TickerComponent {\n  // Option 1: async pipe manages the subscription\n  seconds$ = interval(1000);\n\n  constructor() {\n    // Option 2: side-effect stream tied to component lifetime\n    interval(5000)\n      .pipe(takeUntilDestroyed())\n      .subscribe(() => console.log('autosave...'));\n  }\n}",
              annotations: [
                { line: 10, note: 'async pipe: subscribe on render, unsubscribe on destroy — automatic.' },
                { line: 19, note: 'takeUntilDestroyed completes the stream when the component is destroyed.' },
                { line: 20, note: 'Manual subscribe is fine when the result never reaches the template.' },
              ],
              explanation:
                'Rule of thumb: template data via async pipe (or toSignal); side effects via takeUntilDestroyed.',
            },
          ],
          keyPoints: [
            '`subscribe()` returns a Subscription; `unsubscribe()` stops the producer.',
            'Infinite streams + forgotten unsubscribe = the classic memory leak.',
            'Preference order: async pipe / toSignal → takeUntilDestroyed → manual ngOnDestroy.',
            'Legacy idioms to recognize: Subscription collections and destroy$ + takeUntil.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Which streams MUST you make sure get cleaned up?',
              options: [
                { id: 'a', text: 'Only HTTP requests', correct: false },
                { id: 'b', text: 'Infinite ones like interval, fromEvent, valueChanges', correct: true },
                { id: 'c', text: 'None — RxJS cleans everything', correct: false },
                { id: 'd', text: 'Only ones with errors', correct: false },
              ],
              explanation:
                'Streams that never complete keep running after the component dies unless something stops them.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why is the async pipe the preferred way to consume streams in templates?',
              options: [
                { id: 'a', text: 'It is faster than subscribe', correct: false },
                { id: 'b', text: 'It subscribes AND unsubscribes automatically with the component', correct: true },
                { id: 'c', text: 'It caches values forever', correct: false },
                { id: 'd', text: 'It retries on errors', correct: false },
              ],
              explanation:
                'The pipe ties the subscription to the view lifecycle — leak-free by construction.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does takeUntilDestroyed() do?',
              options: [
                { id: 'a', text: 'Destroys the component', correct: false },
                { id: 'b', text: 'Completes the stream automatically when the component is destroyed', correct: true },
                { id: 'c', text: 'Catches errors', correct: false },
                { id: 'd', text: 'Delays values until destruction', correct: false },
              ],
              explanation:
                'It binds stream lifetime to component lifetime — the modern replacement for the destroy$ pattern.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 2 — EVERYDAY OPERATORS
    // ===================================================================
    {
      id: 'l2-operators',
      order: 2,
      title: 'Level 2 — Everyday operators',
      goal: 'Read and write pipes fluently: transforming, filtering, timing, and accumulating values.',
      lessons: [
        {
          id: 'pipe-map-tap',
          title: 'pipe, map & tap',
          minutes: 10,
          blurb: 'The pipeline mechanics and your two most-used operators.',
          concept: [
            {
              heading: 'How pipe works',
              body: 'An **operator** is a function that takes a stream and returns a new transformed stream — the original is never modified. `.pipe(op1, op2, op3)` chains them top-to-bottom like an assembly line. Reading a pipe = reading a recipe: each line describes one transformation of whatever flows through.',
            },
            {
              heading: 'map — transform each value',
              body: 'Exactly like array map, per arriving value: `map((user) => user.name)` turns a stream of users into a stream of names. Most pipes start with shaping data via map. It never changes **when** things emit, only **what**.',
            },
            {
              heading: 'tap — look, don’t touch',
              body: '`tap((v) => console.log(v))` runs a side effect and passes the value through unchanged. It is your **debugging window** into a pipe — drop a tap between operators to see what flows at that point. Also used for legitimate side effects (analytics, loading flags). If a tap changes data, it is a bug waiting to happen.',
            },
          ],
          codeSamples: [
            {
              title: 'A typical shaped pipe',
              filename: 'pipe-basics.ts',
              language: 'typescript',
              code: "import { map, tap } from 'rxjs';\n\nconst vm$ = this.http.get<ApiUser[]>('/api/users').pipe(\n  tap((raw) => console.log('from server:', raw.length)),\n  map((users) => users.filter((u) => u.active)),\n  map((users) =>\n    users.map((u) => ({ id: u.id, label: u.firstName + ' ' + u.lastName }))\n  ),\n  tap((vm) => console.log('to template:', vm.length))\n);",
              annotations: [
                { line: 4, note: 'tap: observe what arrived without altering it.' },
                { line: 5, note: 'map with Array.filter inside — transforming the VALUE (an array).' },
                { line: 7, note: 'Reshaping API models into exactly what the template needs.' },
              ],
              explanation:
                'Note the distinction: Array.filter inside map transforms one emitted array; the RxJS filter operator (next lesson) drops whole emissions.',
            },
          ],
          keyPoints: [
            'Operators return **new** streams; pipes read top-to-bottom like recipes.',
            '`map` transforms each value — the workhorse of data shaping.',
            '`tap` is a transparent side-effect window — your main debugging tool.',
            'Array.filter inside map ≠ RxJS filter operator: value-level vs emission-level.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does an operator do to the source observable?',
              options: [
                { id: 'a', text: 'Mutates it in place', correct: false },
                { id: 'b', text: 'Returns a new observable; the source is untouched', correct: true },
                { id: 'c', text: 'Subscribes to it immediately', correct: false },
                { id: 'd', text: 'Caches it', correct: false },
              ],
              explanation:
                'Operators are pure transformations — pipes build new streams without modifying sources.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'You want to log values mid-pipe without affecting them. Which operator?',
              options: [
                { id: 'a', text: 'map', correct: false },
                { id: 'b', text: 'tap', correct: true },
                { id: 'c', text: 'filter', correct: false },
                { id: 'd', text: 'scan', correct: false },
              ],
              explanation:
                'tap runs side effects and forwards values unchanged — the standard debugging probe.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'A stream emits a User. After map((u) => u.name), what flows downstream?',
              options: [
                { id: 'a', text: 'The User object', correct: false },
                { id: 'b', text: 'The name string', correct: true },
                { id: 'c', text: 'Both', correct: false },
                { id: 'd', text: 'A new subscription', correct: false },
              ],
              explanation:
                'map replaces each emission with the function result — downstream sees only names.',
            },
          ],
        },
        {
          id: 'filtering-operators',
          title: 'Filtering the stream',
          minutes: 10,
          blurb: 'filter, take, first, distinctUntilChanged — controlling what passes.',
          concept: [
            {
              heading: 'Dropping emissions',
              body: '`filter((v) => cond)` lets only matching values pass — entire emissions disappear, timing of survivors unchanged. `distinctUntilChanged()` drops a value identical to the **previous** one — essential after form valueChanges, which fire on every keystroke even when the result is the same.',
            },
            {
              heading: 'Taking a slice',
              body: '`take(n)` passes n values then **completes** the stream — turning infinite streams finite (take(1) is everywhere: "give me the current value and stop"). `first(predicate?)` = take(1) with an optional condition. `takeWhile(cond)` keeps going while true, then completes. `skip(n)` discards the first n.',
            },
            {
              heading: 'Completion as a tool',
              body: 'Notice: take/first/takeWhile do not just filter — they **end** the stream. Ending means automatic cleanup of everything upstream. Much of elegant RxJS is engineering completion: streams that finish themselves need no unsubscribe management at all.',
            },
          ],
          codeSamples: [
            {
              title: 'A realistic search-box pipeline (part 1)',
              filename: 'filtering.ts',
              language: 'typescript',
              code: "import { filter, distinctUntilChanged, take } from 'rxjs';\n\nconst term$ = this.searchControl.valueChanges.pipe(\n  filter((text): text is string => text !== null),\n  filter((text) => text.length >= 2),\n  distinctUntilChanged()\n);\n\n// One-shot read: current user, then auto-complete\nthis.auth.user$.pipe(take(1)).subscribe((user) => {\n  console.log('snapshot:', user.name);\n});",
              annotations: [
                { line: 4, note: 'A type-guard predicate: filters nulls AND narrows the type.' },
                { line: 5, note: 'Ignore queries shorter than 2 characters.' },
                { line: 6, note: 'Same text as before (e.g. typed then deleted a char)? Skip it.' },
                { line: 10, note: 'take(1): grab one value, complete, clean up — no leak possible.' },
              ],
              explanation:
                'This trio (filter, distinctUntilChanged, then debounceTime from the next lesson) is THE canonical search pipeline.',
            },
          ],
          keyPoints: [
            '`filter` drops non-matching emissions; `distinctUntilChanged` drops consecutive repeats.',
            '`take(n)` / `first()` emit then **complete** — infinite made finite.',
            'Self-completing streams need no unsubscribe management.',
            'Filter predicates can be type guards, narrowing the stream type.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does take(1) do beyond passing one value?',
              options: [
                { id: 'a', text: 'Nothing else', correct: false },
                { id: 'b', text: 'It completes the stream, releasing upstream resources', correct: true },
                { id: 'c', text: 'It caches the value', correct: false },
                { id: 'd', text: 'It retries on error', correct: false },
              ],
              explanation:
                'take(1) emits then completes — the stream ends cleanly with automatic teardown.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'valueChanges emits "abc", "abc", "abcd". After distinctUntilChanged(), downstream sees:',
              options: [
                { id: 'a', text: 'abc, abc, abcd', correct: false },
                { id: 'b', text: 'abc, abcd', correct: true },
                { id: 'c', text: 'abcd only', correct: false },
                { id: 'd', text: 'Nothing', correct: false },
              ],
              explanation:
                'The consecutive duplicate "abc" is dropped; the changed value passes.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which operator drops values while a condition holds and then completes?',
              options: [
                { id: 'a', text: 'takeWhile — wait, it KEEPS while true then completes', correct: false },
                { id: 'b', text: 'takeWhile keeps values while true, completing on the first false', correct: true },
                { id: 'c', text: 'filter', correct: false },
                { id: 'd', text: 'skip', correct: false },
              ],
              explanation:
                'takeWhile passes values as long as the predicate is true and completes when it turns false; filter never completes.',
            },
          ],
        },
        {
          id: 'timing-operators',
          title: 'Timing: debounce, throttle & delay',
          minutes: 10,
          blurb: 'Taming bursts of events — the UI performance operators.',
          concept: [
            {
              heading: 'debounceTime — wait for silence',
              body: '`debounceTime(300)` emits a value only after 300ms pass **without a newer one**. Perfect when only the final state of a burst matters: search-as-you-type (wait until typing pauses), window resize, autosave after editing stops.',
            },
            {
              heading: 'throttleTime — at most every X',
              body: '`throttleTime(200)` emits, then ignores everything for 200ms, then is ready again. Use when you want **regular samples during** continuous activity: scroll position updates, mousemove tracking, rapid button mashing. Mnemonic: debounce = after the storm; throttle = during the storm, on a schedule.',
            },
            {
              heading: 'delay and auditTime',
              body: '`delay(1000)` shifts every emission later — useful in tests and UX touches. `auditTime(300)` is throttle’s cousin that emits the **latest** value at the end of each window instead of the first. For search boxes the full canonical chain is: `debounceTime(300)` + `distinctUntilChanged()`.',
            },
          ],
          codeSamples: [
            {
              title: 'The canonical search pipeline (complete)',
              filename: 'search.ts',
              language: 'typescript',
              code: "import { debounceTime, distinctUntilChanged, filter } from 'rxjs';\n\nconst query$ = this.searchControl.valueChanges.pipe(\n  debounceTime(300),\n  distinctUntilChanged(),\n  filter((t): t is string => !!t && t.length >= 2)\n);\n\n// Scroll progress, sampled at most 5x per second\nimport { fromEvent, throttleTime, map } from 'rxjs';\n\nconst progress$ = fromEvent(window, 'scroll').pipe(\n  throttleTime(200),\n  map(() => window.scrollY)\n);",
              annotations: [
                { line: 4, note: 'Wait until the user stops typing for 300ms.' },
                { line: 5, note: 'Typed then reverted? No duplicate query.' },
                { line: 13, note: 'Scroll fires hundreds of times/sec — sample it politely.' },
              ],
              explanation:
                'These two pipelines appear in virtually every real app — recognize them instantly.',
            },
          ],
          keyPoints: [
            '`debounceTime`: emit after a pause — final state of a burst (search, autosave).',
            '`throttleTime`: at most one per window — regular samples during activity (scroll).',
            '`auditTime`: like throttle but emits the window’s **latest** value.',
            'Canonical search chain: debounceTime + distinctUntilChanged + filter.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Search-as-you-type should query when the user pauses. Which operator?',
              options: [
                { id: 'a', text: 'throttleTime', correct: false },
                { id: 'b', text: 'debounceTime', correct: true },
                { id: 'c', text: 'delay', correct: false },
                { id: 'd', text: 'take', correct: false },
              ],
              explanation:
                'debounceTime waits for a quiet period — only the final text of the burst goes through.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'For smooth scroll-position updates DURING scrolling, which fits best?',
              options: [
                { id: 'a', text: 'debounceTime — it would wait until scrolling stops', correct: false },
                { id: 'b', text: 'throttleTime — regular samples while activity continues', correct: true },
                { id: 'c', text: 'first', correct: false },
                { id: 'd', text: 'skip', correct: false },
              ],
              explanation:
                'Throttle emits during the storm at a controlled rate; debounce would stay silent until the end.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'A user types "a", "ab", "abc" quickly, then stops. After debounceTime(300):',
              options: [
                { id: 'a', text: 'All three emit', correct: false },
                { id: 'b', text: 'Only "abc" emits, 300ms after the last keystroke', correct: true },
                { id: 'c', text: 'Only "a" emits', correct: false },
                { id: 'd', text: 'Nothing emits', correct: false },
              ],
              explanation:
                'Each keystroke resets the timer; only the value standing when silence lasts 300ms survives.',
            },
          ],
        },
        {
          id: 'accumulating',
          title: 'Accumulating: scan & friends',
          minutes: 10,
          blurb: 'Build state from events — reduce that emits as it goes.',
          concept: [
            {
              heading: 'scan — running reduce',
              body: '`scan((acc, value) => next, seed)` is Array.reduce for streams, but it **emits every intermediate accumulation**: a stream of +1 click events scanned with addition becomes a live counter. This is the conceptual heart of state management — state is a scan over a stream of actions/events.',
            },
            {
              heading: 'reduce, startWith, pairwise',
              body: '`reduce(...)` only emits the final accumulation when the source **completes** (useless on infinite streams). `startWith(value)` pushes an initial value first — templates render immediately instead of waiting for the first real emission. `pairwise()` emits [previous, current] pairs — perfect for "what changed?" comparisons.',
            },
            {
              heading: 'Reading state-from-events code',
              body: 'When you see `actions$.pipe(scan(reducer, initialState))`, you are looking at a tiny Redux: every NgRx-style store is conceptually exactly this. Understanding scan demystifies an entire category of libraries.',
            },
          ],
          codeSamples: [
            {
              title: 'A live counter and a change detector',
              filename: 'accumulate.ts',
              language: 'typescript',
              code: "import { fromEvent, map, scan, startWith, pairwise } from 'rxjs';\n\n// Live counter: clicks -> running total\nconst count$ = fromEvent(addBtn, 'click').pipe(\n  map(() => 1),\n  scan((total, n) => total + n, 0),\n  startWith(0)\n);\n\n// Direction of change: previous vs current price\nconst trend$ = price$.pipe(\n  pairwise(),\n  map(([prev, curr]) => (curr > prev ? 'up' : 'down'))\n);",
              annotations: [
                { line: 6, note: 'scan emits 1, 2, 3... — every intermediate total, live.' },
                { line: 7, note: 'startWith(0): the template shows 0 before any click.' },
                { line: 12, note: 'pairwise turns a stream into [previous, current] tuples.' },
              ],
              explanation:
                'count$ IS application state derived from events — the seed of every reactive store you will ever read.',
            },
          ],
          keyPoints: [
            '`scan` = reduce that emits each step — events become living state.',
            '`reduce` waits for completion — only for finite streams.',
            '`startWith` gives templates an immediate initial value.',
            '`pairwise` emits [previous, current] — change detection in one operator.',
            'NgRx-style stores are conceptually `actions$.pipe(scan(reducer, init))`.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'How does scan differ from reduce?',
              options: [
                { id: 'a', text: 'scan is faster', correct: false },
                { id: 'b', text: 'scan emits every intermediate result; reduce only the final one on completion', correct: true },
                { id: 'c', text: 'reduce works on arrays only', correct: false },
                { id: 'd', text: 'No difference', correct: false },
              ],
              explanation:
                'On infinite streams reduce never emits — scan is the streaming accumulator.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why add startWith(0) to a counter stream bound to a template?',
              options: [
                { id: 'a', text: 'To reset the counter', correct: false },
                { id: 'b', text: 'So the template shows 0 immediately instead of blank until the first click', correct: true },
                { id: 'c', text: 'To complete the stream', correct: false },
                { id: 'd', text: 'For type safety only', correct: false },
              ],
              explanation:
                'Streams emit nothing until something happens; startWith provides the render-now initial value.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which operator gives you [previousValue, currentValue] tuples?',
              options: [
                { id: 'a', text: 'scan', correct: false },
                { id: 'b', text: 'pairwise', correct: true },
                { id: 'c', text: 'startWith', correct: false },
                { id: 'd', text: 'map', correct: false },
              ],
              explanation:
                'pairwise buffers one value and emits sliding pairs — ideal for trend/diff logic.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 3 — HIGHER-ORDER STREAMS
    // ===================================================================
    {
      id: 'l3-higher-order',
      order: 3,
      title: 'Level 3 — Higher-order streams',
      goal: 'Master the flattening operators (switchMap & friends), combination operators, and error handling.',
      lessons: [
        {
          id: 'flattening-intro',
          title: 'The flattening problem & mergeMap',
          minutes: 12,
          blurb: 'When map gives you a stream of streams — and the way out.',
          concept: [
            {
              heading: 'The problem: Observable<Observable<T>>',
              body: 'A search term arrives, and for each term you call `http.get(...)` — which returns an observable. `map((term) => http.get(term))` produces a **stream of streams**: each emission is itself an unsubscribed observable. You need values, not recipes. **Flattening** operators map AND subscribe to the inner observable, emitting its values into the main stream.',
            },
            {
              heading: 'mergeMap — run everything',
              body: '`mergeMap((term) => http.get(term))` subscribes to **every** inner observable as it arrives and merges all their outputs concurrently. Nothing is cancelled, nothing waits. Good when each inner job is independent and order does not matter: sending analytics events, parallel uploads, deleting multiple items.',
            },
            {
              heading: 'Why nested subscribe is the anti-pattern',
              body: 'The beginner instinct — `outer$.subscribe(v => inner$.subscribe(...))` — loses everything: no cancellation, no error propagation, manual cleanup of inner subs, impossible composition. Every nested subscribe in a codebase is a flattening operator waiting to be written. This is the single most important refactor in RxJS code review.',
            },
          ],
          codeSamples: [
            {
              title: 'From nested subscribe to mergeMap',
              filename: 'flatten.ts',
              language: 'typescript',
              code: "import { mergeMap } from 'rxjs';\n\n// ANTI-PATTERN: nested subscribe — no cancellation, leak-prone\nids$.subscribe((id) => {\n  this.api.delete(id).subscribe(() => console.log('deleted', id));\n});\n\n// CORRECT: one flat pipeline\nids$.pipe(\n  mergeMap((id) => this.api.delete(id))\n).subscribe((result) => console.log('deleted', result.id));",
              annotations: [
                { line: 4, note: 'Inner subscriptions pile up unmanaged — the classic code smell.' },
                { line: 10, note: 'mergeMap subscribes to each delete and merges results into one stream.' },
              ],
              explanation:
                'One subscription at the end of one pipe — errors, completion, and cleanup all flow through a single chain.',
            },
          ],
          keyPoints: [
            'map over an async call creates Observable<Observable<T>> — flattening solves it.',
            'Flattening operators = map + subscribe-to-inner + merge values out.',
            '`mergeMap` runs all inner streams concurrently — independent parallel work.',
            'Nested `subscribe` is the #1 anti-pattern; always refactor to a flattening operator.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does map((id) => http.get(id)) emit?',
              options: [
                { id: 'a', text: 'The HTTP responses', correct: false },
                { id: 'b', text: 'Unsubscribed observables — a stream of streams', correct: true },
                { id: 'c', text: 'Nothing', correct: false },
                { id: 'd', text: 'Errors', correct: false },
              ],
              explanation:
                'map only transforms — each emission is the inner observable itself, never executed.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What do all flattening operators have in common?',
              options: [
                { id: 'a', text: 'They cancel previous requests', correct: false },
                { id: 'b', text: 'They subscribe to inner observables and emit their values into the outer stream', correct: true },
                { id: 'c', text: 'They retry on errors', correct: false },
                { id: 'd', text: 'They only work with HTTP', correct: false },
              ],
              explanation:
                'The differences (switch/merge/concat/exhaust) are only about HOW concurrent inner streams are handled.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why is nested subscribe considered an anti-pattern?',
              options: [
                { id: 'a', text: 'It is slower', correct: false },
                { id: 'b', text: 'It breaks cancellation, error flow, and cleanup into unmanaged pieces', correct: true },
                { id: 'c', text: 'It is deprecated syntax', correct: false },
                { id: 'd', text: 'It only works once', correct: false },
              ],
              explanation:
                'Inner subscriptions live outside the pipeline — nothing composes, nothing cleans up automatically.',
            },
          ],
        },
        {
          id: 'switchmap-family',
          title: 'switchMap vs mergeMap vs concatMap vs exhaustMap',
          minutes: 13,
          blurb: 'The four strategies — and the one-line rule for each.',
          concept: [
            {
              heading: 'The four strategies',
              body: 'A new outer value arrives while the previous inner stream is still running. What happens?\n\n**switchMap**: cancel the old, switch to the new. **mergeMap**: run both concurrently. **concatMap**: queue — finish the old, then start the new, order preserved. **exhaustMap**: ignore the new while the old is running.',
            },
            {
              heading: 'The decision table',
              body: 'Search / autocomplete / route param changes → **switchMap** (only the latest matters; stale responses must die). Independent parallel jobs (notifications, logging) → **mergeMap**. Writes that must happen in order (queued saves, sequential animations) → **concatMap**. Submit buttons / login (ignore frantic re-clicks until done) → **exhaustMap**.',
            },
            {
              heading: 'The bug each prevents',
              body: 'switchMap kills the **race condition** where a slow old search response overwrites a fast new one. concatMap prevents **out-of-order writes** corrupting data. exhaustMap prevents **double submits** charging a card twice. Choosing wrong rarely errors — it just creates subtle production bugs. This table is the most valuable thing in this course.',
            },
          ],
          codeSamples: [
            {
              title: 'All four in their natural habitat',
              filename: 'strategies.ts',
              language: 'typescript',
              code: "import { switchMap, mergeMap, concatMap, exhaustMap } from 'rxjs';\n\n// SEARCH: latest wins, stale requests cancelled\nresults$ = query$.pipe(\n  switchMap((q) => this.api.search(q))\n);\n\n// PARALLEL: independent deletions, order irrelevant\ndeleted$ = deleteClicks$.pipe(\n  mergeMap((id) => this.api.delete(id))\n);\n\n// QUEUE: autosaves must apply in order\nsaved$ = changes$.pipe(\n  concatMap((doc) => this.api.save(doc))\n);\n\n// SUBMIT: ignore re-clicks while the login runs\nlogin$ = submit$.pipe(\n  exhaustMap(() => this.auth.login(credentials))\n);",
              annotations: [
                { line: 5, note: 'New query? The in-flight request is unsubscribed (cancelled).' },
                { line: 10, note: 'Three clicks = three concurrent deletes.' },
                { line: 14, note: 'Save #2 waits until save #1 completes — order guaranteed.' },
                { line: 19, note: 'Clicks during the running login are simply swallowed.' },
              ],
              explanation:
                'Memorize by scenario, not by definition: search→switch, parallel→merge, queue→concat, submit→exhaust.',
            },
          ],
          keyPoints: [
            '`switchMap`: cancel old, take new — searches, route params.',
            '`mergeMap`: all concurrent — independent parallel jobs.',
            '`concatMap`: strict queue — ordered writes.',
            '`exhaustMap`: ignore new while busy — submit buttons, login.',
            'Wrong choice = silent production bugs (races, double submits), not errors.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'A slow response from an OLD search query overwrites the results of the new one. Which operator fixes this?',
              options: [
                { id: 'a', text: 'mergeMap', correct: false },
                { id: 'b', text: 'switchMap — it cancels the stale request', correct: true },
                { id: 'c', text: 'concatMap', correct: false },
                { id: 'd', text: 'tap', correct: false },
              ],
              explanation:
                'switchMap unsubscribes the previous inner stream the moment a new query arrives — stale responses can never land.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'A user hammers the "Pay now" button. Which operator prevents double charges?',
              options: [
                { id: 'a', text: 'switchMap — careful, it would CANCEL the running payment!', correct: false },
                { id: 'b', text: 'exhaustMap — extra clicks are ignored until the payment finishes', correct: true },
                { id: 'c', text: 'mergeMap', correct: false },
                { id: 'd', text: 'debounceTime alone is enough', correct: false },
              ],
              explanation:
                'exhaustMap ignores new triggers while busy. switchMap here would be a disaster: cancel a charge mid-flight and start another.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Document edits must be saved in the exact order they happened. Which operator?',
              options: [
                { id: 'a', text: 'mergeMap', correct: false },
                { id: 'b', text: 'concatMap — each save waits for the previous one', correct: true },
                { id: 'c', text: 'exhaustMap', correct: false },
                { id: 'd', text: 'switchMap', correct: false },
              ],
              explanation:
                'concatMap queues inner observables — sequential, ordered, nothing lost.',
            },
          ],
        },
        {
          id: 'combination-operators',
          title: 'Combining streams',
          minutes: 11,
          blurb: 'combineLatest, forkJoin, merge, withLatestFrom — multi-stream logic.',
          concept: [
            {
              heading: 'combineLatest — reactive formulas',
              body: '`combineLatest([a$, b$])` emits the **latest values of all** sources whenever **any** of them emits (after each has emitted once). It is the spreadsheet-formula operator: filtered lists (items$ + filter$ + sort$), forms whose validity depends on several inputs, dashboards. Note the analogy to `computed()` in signals — same concept, push-based.',
            },
            {
              heading: 'forkJoin — the Promise.all',
              body: '`forkJoin([a$, b$])` waits for all sources to **complete**, then emits their final values once, together. Perfect for "load everything, then render": several HTTP calls on page init. Never feed it infinite streams — it would wait forever.',
            },
            {
              heading: 'merge, withLatestFrom, zip',
              body: '`merge(a$, b$)` interleaves emissions as they happen — several event sources, one handler. `event$.pipe(withLatestFrom(state$))` fires on the **event** and attaches a snapshot of the other stream — "on save click, grab current form state". `zip` pairs emissions index-by-index (1st with 1st...) — rare, occasionally exactly right.',
            },
          ],
          codeSamples: [
            {
              title: 'Three combination patterns',
              filename: 'combine.ts',
              language: 'typescript',
              code: "import { combineLatest, forkJoin, withLatestFrom, map } from 'rxjs';\n\n// Reactive filtered list: recomputes when EITHER changes\nvisible$ = combineLatest([items$, filter$]).pipe(\n  map(([items, f]) => items.filter((i) => i.category === f))\n);\n\n// Page init: wait for ALL, emit once\nforkJoin({\n  user: this.api.getUser(id),\n  orders: this.api.getOrders(id),\n}).subscribe(({ user, orders }) => this.render(user, orders));\n\n// On click, snapshot the latest form state\nsave$ = saveClick$.pipe(\n  withLatestFrom(formValue$),\n  map(([, form]) => form)\n);",
              annotations: [
                { line: 4, note: 'Any source emits -> recompute with the latest of each.' },
                { line: 9, note: 'forkJoin with an object: named results, cleaner than tuples.' },
                { line: 16, note: 'Click triggers; formValue$ is only sampled, never triggers.' },
              ],
              explanation:
                'The trigger question decides: any source (combineLatest), all complete (forkJoin), one specific source (withLatestFrom).',
            },
          ],
          keyPoints: [
            '`combineLatest`: latest of all, on every change — reactive formulas.',
            '`forkJoin`: all complete → final values once — parallel page loads (finite only!).',
            '`withLatestFrom`: one stream triggers, others are sampled.',
            '`merge`: interleave multiple event sources into one.',
            'Ask "what triggers the output?" to pick the right one.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Load a user AND their orders in parallel, render once when both arrive. Which operator?',
              options: [
                { id: 'a', text: 'combineLatest', correct: false },
                { id: 'b', text: 'forkJoin', correct: true },
                { id: 'c', text: 'merge', correct: false },
                { id: 'd', text: 'zip', correct: false },
              ],
              explanation:
                'forkJoin is RxJS Promise.all: waits for completion of all, emits the final set once.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why must forkJoin never receive an interval or valueChanges?',
              options: [
                { id: 'a', text: 'Type errors', correct: false },
                { id: 'b', text: 'It waits for completion — infinite streams make it wait forever', correct: true },
                { id: 'c', text: 'Performance cost', correct: false },
                { id: 'd', text: 'It actually works fine', correct: false },
              ],
              explanation:
                'forkJoin emits only after ALL sources complete. A never-completing source means it never emits.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: '"When the user clicks save, take the current form value" — which pattern?',
              options: [
                { id: 'a', text: 'combineLatest([click$, form$])', correct: false },
                { id: 'b', text: 'click$.pipe(withLatestFrom(form$))', correct: true },
                { id: 'c', text: 'forkJoin', correct: false },
                { id: 'd', text: 'zip(click$, form$)', correct: false },
              ],
              explanation:
                'Only the click should trigger; combineLatest would also fire on every keystroke of the form.',
            },
          ],
        },
        {
          id: 'error-handling',
          title: 'Error handling & retries',
          minutes: 11,
          blurb: 'catchError, retry, finalize — failing gracefully.',
          concept: [
            {
              heading: 'Errors kill streams',
              body: 'An unhandled error **terminates the pipeline** — fatal for long-lived streams: one failed request inside a search switchMap and the search box goes dead forever. `catchError((err) => fallback$)` intercepts the error and substitutes a stream: `of([])` for an empty result, `EMPTY` for silence, or `throwError` to rethrow enriched.',
            },
            {
              heading: 'WHERE you catch matters',
              body: 'The golden pattern: catch **inside** the flattening operator — `switchMap((q) => api.search(q).pipe(catchError(() => of([]))))`. The inner request may die; the outer stream survives for the next query. Catching outside would end the whole pipeline at the first failure.',
            },
            {
              heading: 'retry and finalize',
              body: '`retry(2)` resubscribes on error up to 2 times. Modern config: `retry({ count: 3, delay: 1000 })` waits between attempts — and exponential backoff is a delay function away. `finalize(() => ...)` runs on **any** termination (complete, error, or unsubscribe) — the natural home of "hide the loading spinner".',
            },
          ],
          codeSamples: [
            {
              title: 'A production-grade request pipeline',
              filename: 'errors.ts',
              language: 'typescript',
              code: "import { switchMap, catchError, retry, finalize, of } from 'rxjs';\n\nresults$ = query$.pipe(\n  tap(() => this.loading.set(true)),\n  switchMap((q) =>\n    this.api.search(q).pipe(\n      retry({ count: 2, delay: 500 }),\n      catchError((err) => {\n        this.toast.error('Search failed');\n        return of([]);\n      }),\n      finalize(() => this.loading.set(false))\n    )\n  )\n);",
              annotations: [
                { line: 7, note: 'Two retries with a 500ms pause before giving up.' },
                { line: 8, note: 'catchError INSIDE switchMap: this query fails, the pipeline lives.' },
                { line: 10, note: 'A fallback stream: empty results instead of a dead search box.' },
                { line: 12, note: 'finalize runs however the inner stream ends — spinner always cleared.' },
              ],
              explanation:
                'This shape — retry, inner catchError returning a fallback, finalize for cleanup — is the production standard.',
            },
          ],
          keyPoints: [
            'Unhandled errors **terminate** pipelines — deadly for long-lived UI streams.',
            '`catchError` substitutes a fallback stream (`of([])`, `EMPTY`, or rethrow).',
            'Catch **inside** the flattening operator to keep the outer stream alive.',
            '`retry({ count, delay })` resubscribes; `finalize` runs on any termination.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'One failed HTTP call kills the whole search box forever. What went wrong?',
              options: [
                { id: 'a', text: 'Missing debounceTime', correct: false },
                { id: 'b', text: 'catchError was outside the switchMap (or missing) — the outer pipeline died', correct: true },
                { id: 'c', text: 'Too many retries', correct: false },
                { id: 'd', text: 'The API is down', correct: false },
              ],
              explanation:
                'Errors propagate up and terminate. Catching inside the inner stream sacrifices one request, not the pipeline.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Where should "hide the loading spinner" live so it ALWAYS runs?',
              options: [
                { id: 'a', text: 'In the next handler', correct: false },
                { id: 'b', text: 'In finalize — it runs on complete, error, and unsubscribe alike', correct: true },
                { id: 'c', text: 'In catchError', correct: false },
                { id: 'd', text: 'In map', correct: false },
              ],
              explanation:
                'next misses errors, catchError misses success — finalize covers every way a stream can end.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does catchError((err) => of([])) do?',
              options: [
                { id: 'a', text: 'Ignores the error and continues the same stream', correct: false },
                { id: 'b', text: 'Replaces the dead stream with one emitting an empty array, then completing', correct: true },
                { id: 'c', text: 'Retries the request', correct: false },
                { id: 'd', text: 'Logs the error only', correct: false },
              ],
              explanation:
                'The original stream is already terminated; catchError swaps in a fallback so consumers receive [] instead of an error.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 4 — SUBJECTS & SHARED STATE
    // ===================================================================
    {
      id: 'l4-subjects-state',
      order: 4,
      title: 'Level 4 — Subjects & shared state',
      goal: 'Understand subjects, hot vs cold, sharing executions, and the state patterns built on them.',
      lessons: [
        {
          id: 'subjects',
          title: 'Subjects — the bridge',
          minutes: 11,
          blurb: 'Observable + observer in one: pushing values by hand.',
          concept: [
            {
              heading: 'What a Subject is',
              body: 'A **Subject** is both an observable (you can subscribe) and an observer (you can call `next()` on it). It is the bridge between imperative code ("this just happened!") and the reactive world. Unlike plain observables, subjects are **multicast**: all subscribers share the same emissions.',
            },
            {
              heading: 'The family',
              body: '**Subject**: no memory — subscribers get only what is emitted after they arrive. **BehaviorSubject(initial)**: holds a **current value**, new subscribers get it immediately, plus `.value` for synchronous reads — the classic state container. **ReplaySubject(n)**: replays the last n values to newcomers. **AsyncSubject**: emits only the final value on complete (rare).',
            },
            {
              heading: 'Discipline: expose read-only',
              body: 'The standard pattern hides the subject and exposes `subject.asObservable()` — outsiders can listen but never push. Exactly the same philosophy as private signal + readonly exposure you saw in Angular state services. A public subject is an invitation for chaos.',
            },
          ],
          codeSamples: [
            {
              title: 'The classic notification bus',
              filename: 'toast.service.ts',
              language: 'typescript',
              code: "import { Injectable } from '@angular/core';\nimport { Subject, BehaviorSubject } from 'rxjs';\n\n@Injectable({ providedIn: 'root' })\nexport class ToastService {\n  private messages = new Subject<string>();\n  readonly messages$ = this.messages.asObservable();\n\n  private user = new BehaviorSubject<User | null>(null);\n  readonly user$ = this.user.asObservable();\n\n  show(text: string): void {\n    this.messages.next(text);\n  }\n\n  setUser(u: User): void {\n    this.user.next(u);\n  }\n\n  get currentUser(): User | null {\n    return this.user.value; // synchronous snapshot\n  }\n}",
              annotations: [
                { line: 6, note: 'Private: only the service can push.' },
                { line: 7, note: 'asObservable(): consumers can subscribe but never next().' },
                { line: 9, note: 'BehaviorSubject: late subscribers immediately get the current user.' },
                { line: 21, note: '.value — the synchronous escape hatch only BehaviorSubject offers.' },
              ],
              explanation:
                'Subject for events (no memory needed), BehaviorSubject for state (current value matters) — that line decides which to use.',
            },
          ],
          keyPoints: [
            'Subject = observable + observer; multicast to all subscribers.',
            'BehaviorSubject holds a current value (+ `.value`) — the state container.',
            'ReplaySubject(n) replays history; plain Subject has no memory.',
            'Hide the subject; expose `asObservable()` — read-only for consumers.',
            'Events → Subject; state → BehaviorSubject.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'A component subscribes AFTER a value was emitted. Which subject still delivers it the latest value?',
              options: [
                { id: 'a', text: 'Subject', correct: false },
                { id: 'b', text: 'BehaviorSubject', correct: true },
                { id: 'c', text: 'AsyncSubject', correct: false },
                { id: 'd', text: 'None', correct: false },
              ],
              explanation:
                'BehaviorSubject stores the current value and hands it to every new subscriber immediately.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why expose asObservable() instead of the subject itself?',
              options: [
                { id: 'a', text: 'Better performance', correct: false },
                { id: 'b', text: 'So consumers can listen but cannot push values into the stream', correct: true },
                { id: 'c', text: 'It adds type safety to next()', correct: false },
                { id: 'd', text: 'It is required by Angular', correct: false },
              ],
              explanation:
                'Encapsulation: all mutations flow through the service methods, keeping changes traceable.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What makes a Subject different from a typical cold observable?',
              options: [
                { id: 'a', text: 'Subjects are typed', correct: false },
                { id: 'b', text: 'Subjects are multicast — all subscribers share one set of emissions', correct: true },
                { id: 'c', text: 'Subjects cannot error', correct: false },
                { id: 'd', text: 'Subjects auto-complete', correct: false },
              ],
              explanation:
                'Cold observables restart per subscriber; a subject pushes each value once, to everyone listening.',
            },
          ],
        },
        {
          id: 'hot-cold-sharing',
          title: 'Hot vs cold & shareReplay',
          minutes: 11,
          blurb: 'Why two subscribers fire two HTTP calls — and the cure.',
          concept: [
            {
              heading: 'Cold vs hot',
              body: '**Cold**: the producer is created per subscription — everyone gets a private execution from the start (HTTP calls, of, interval). **Hot**: the producer exists independently and emissions are shared — subscribers join mid-flow (DOM events, subjects, websockets). The cold surprise: a template with three `async` pipes on the same HTTP observable fires **three requests**.',
            },
            {
              heading: 'share and shareReplay',
              body: '`share()` multicasts one execution to all current subscribers. `shareReplay(1)` additionally replays the last value to late arrivals — the standard for **caching HTTP**: first subscriber triggers the request, everyone else (including future subscribers) reuses the response.',
            },
            {
              heading: 'The refCount caveat',
              body: 'Prefer `shareReplay({ bufferSize: 1, refCount: true })`: when the last subscriber leaves, the upstream connection is dropped instead of living forever. Without refCount, a shared interval or websocket keeps running with zero listeners — a leak wearing a caching costume. (In Angular, also consider toSignal or @defer-level caching alternatives.)',
            },
          ],
          codeSamples: [
            {
              title: 'Caching a request properly',
              filename: 'config.service.ts',
              language: 'typescript',
              code: "import { shareReplay } from 'rxjs';\n\n@Injectable({ providedIn: 'root' })\nexport class ConfigService {\n  // ONE request, shared by every consumer, cached for late ones\n  readonly config$ = this.http.get<AppConfig>('/api/config').pipe(\n    shareReplay({ bufferSize: 1, refCount: false })\n  );\n\n  constructor(private http: HttpClient) {}\n}\n\n// Anywhere, any time, any number of consumers:\n// this.configService.config$ | async  -> no duplicate requests",
              annotations: [
                { line: 7, note: 'bufferSize 1: replay the latest config to newcomers.' },
                { line: 7, note: 'refCount false here: config should stay cached for app lifetime.' },
              ],
              explanation:
                'For app-lifetime caches refCount: false is intended; for connections tied to active use, refCount: true prevents zombie producers.',
            },
          ],
          keyPoints: [
            'Cold = private execution per subscriber; hot = shared, join mid-flow.',
            'Multiple async pipes on a cold HTTP stream = multiple requests.',
            '`shareReplay(1)` = multicast + cache the latest for late subscribers.',
            'Use `refCount: true` unless you deliberately want an app-lifetime cache.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Three async pipes bind to the same raw http.get observable. How many requests?',
              options: [
                { id: 'a', text: 'One', correct: false },
                { id: 'b', text: 'Three — cold observables execute per subscription', correct: true },
                { id: 'c', text: 'Zero', correct: false },
                { id: 'd', text: 'Two', correct: false },
              ],
              explanation:
                'Each async pipe subscribes independently; without sharing, each subscription is a fresh request.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Which operator turns that into one shared, cached request?',
              options: [
                { id: 'a', text: 'map', correct: false },
                { id: 'b', text: 'shareReplay(1)', correct: true },
                { id: 'c', text: 'take(1)', correct: false },
                { id: 'd', text: 'debounceTime', correct: false },
              ],
              explanation:
                'shareReplay multicasts the single execution and replays the latest value to anyone arriving later.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What risk does shareReplay WITHOUT refCount carry for a websocket stream?',
              options: [
                { id: 'a', text: 'Slower messages', correct: false },
                { id: 'b', text: 'The connection stays alive even after all subscribers leave', correct: true },
                { id: 'c', text: 'Type errors', correct: false },
                { id: 'd', text: 'Duplicate messages', correct: false },
              ],
              explanation:
                'Without refCount the upstream subscription is never released — a hidden resource leak.',
            },
          ],
        },
        {
          id: 'state-patterns',
          title: 'State patterns with RxJS',
          minutes: 11,
          blurb: 'From BehaviorSubject services to scan-based mini-stores.',
          concept: [
            {
              heading: 'The BehaviorSubject store',
              body: 'The pre-signals standard you will read in countless codebases: private `BehaviorSubject<State>`, public `state$`, selector streams via `map` + `distinctUntilChanged`, and mutation methods calling `next({...this.subject.value, change})`. It is the exact ancestor of the signal store — same shape, push-based.',
            },
            {
              heading: 'The actions + scan store',
              body: 'More disciplined: a `Subject<Action>` for events, folded by `scan(reducer, initialState)` into state. Every change flows through one reducer — auditable, testable, time-travel-friendly. NgRx is this pattern industrialized (with effects for the async parts you learned as switchMap pipelines).',
            },
            {
              heading: 'Choosing in the signals era',
              body: 'New Angular state: **signals first**. RxJS state patterns remain essential to **read** (legacy code is full of them) and to use when state is inherently stream-shaped: websocket-fed data, event sourcing, complex async orchestration. The interop functions (`toSignal`) let new code consume old stores cleanly.',
            },
          ],
          codeSamples: [
            {
              title: 'A BehaviorSubject store (the legacy standard)',
              filename: 'cart.store.ts',
              language: 'typescript',
              code: "import { BehaviorSubject, map, distinctUntilChanged } from 'rxjs';\n\ninterface CartState {\n  items: string[];\n  discount: number;\n}\n\n@Injectable({ providedIn: 'root' })\nexport class CartStore {\n  private state = new BehaviorSubject<CartState>({ items: [], discount: 0 });\n\n  readonly items$ = this.state.pipe(\n    map((s) => s.items),\n    distinctUntilChanged()\n  );\n  readonly count$ = this.items$.pipe(map((items) => items.length));\n\n  addItem(item: string): void {\n    const current = this.state.value;\n    this.state.next({ ...current, items: [...current.items, item] });\n  }\n}",
              annotations: [
                { line: 10, note: 'One BehaviorSubject holds the whole state object.' },
                { line: 12, note: 'Selectors: map a slice + distinctUntilChanged to skip no-op emissions.' },
                { line: 20, note: 'Immutable update: spread the old state, change one part, next() it.' },
              ],
              explanation:
                'Read this fluently and every pre-signals Angular service will open up to you — it is the same five lines everywhere.',
            },
          ],
          keyPoints: [
            'BehaviorSubject store: private subject, public selectors, immutable `next` updates.',
            'Selector = `map(slice)` + `distinctUntilChanged` — the observable `computed`.',
            'actions$ + `scan(reducer)` = auditable mini-Redux; NgRx industrializes it.',
            'New code: signals for state; RxJS where data is stream-shaped; `toSignal` bridges.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'In the BehaviorSubject store pattern, why distinctUntilChanged on selectors?',
              options: [
                { id: 'a', text: 'To catch errors', correct: false },
                { id: 'b', text: 'State updates that did not change this slice should not re-emit to its consumers', correct: true },
                { id: 'c', text: 'To complete the stream', correct: false },
                { id: 'd', text: 'It is decorative', correct: false },
              ],
              explanation:
                'Any next() re-emits the whole state; distinctUntilChanged keeps unrelated updates from triggering re-renders.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why update with this.state.next({ ...current, items: [...] }) instead of mutating current.items?',
              options: [
                { id: 'a', text: 'Mutation is a syntax error', correct: false },
                { id: 'b', text: 'New references make changes detectable (distinctUntilChanged, OnPush) and predictable', correct: true },
                { id: 'c', text: 'It is faster', correct: false },
                { id: 'd', text: 'BehaviorSubject forbids objects', correct: false },
              ],
              explanation:
                'Reference equality is how downstream operators and change detection know something changed.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which RxJS pattern is NgRx conceptually built on?',
              options: [
                { id: 'a', text: 'interval + map', correct: false },
                { id: 'b', text: 'actions Subject folded by scan(reducer) into state', correct: true },
                { id: 'c', text: 'forkJoin everywhere', correct: false },
                { id: 'd', text: 'Nested subscribes', correct: false },
              ],
              explanation:
                'Dispatch = next on an action stream; the store = scan over it; selectors = mapped slices.',
            },
          ],
        },
        {
          id: 'rxjs-in-angular',
          title: 'RxJS across Angular',
          minutes: 11,
          blurb: 'Where streams hide in the framework — and the signal bridges.',
          concept: [
            {
              heading: 'The framework speaks RxJS',
              body: 'Angular hands you observables everywhere: `http.get` (one value, completes), `route.paramMap` / `queryParams` (emit per navigation — a major bug source when treated as one-shot), `form.valueChanges` and `statusChanges` (infinite), `router.events` (the navigation lifecycle as a stream you filter).',
            },
            {
              heading: 'The interop bridges',
              body: '`toSignal(obs$, { initialValue })` — consume any stream as a signal in templates: subscription, cleanup, change detection all handled. `toObservable(signal)` — feed a signal into an operator pipeline (debounce a signal-based search box!). The pattern of modern code: **RxJS for the pipeline, signal at the end for the view**.',
            },
            {
              heading: 'A complete real example',
              body: 'Route param → switchMap to HTTP → toSignal for the template: three concepts from this course composing into the single most common page pattern in Angular apps. Read it below until it feels obvious — it is the graduation exercise of practical RxJS.',
            },
          ],
          codeSamples: [
            {
              title: 'The canonical detail page',
              filename: 'product-page.component.ts',
              language: 'typescript',
              code: "import { Component, inject } from '@angular/core';\nimport { ActivatedRoute } from '@angular/router';\nimport { toSignal } from '@angular/core/rxjs-interop';\nimport { map, switchMap, catchError, of } from 'rxjs';\n\n@Component({\n  selector: 'app-product-page',\n  standalone: true,\n  template: `\n    @if (product(); as p) {\n      <h1>{{ p.name }}</h1>\n    } @else {\n      <p>Loading…</p>\n    }\n  `,\n})\nexport class ProductPageComponent {\n  private route = inject(ActivatedRoute);\n  private api = inject(ProductApi);\n\n  readonly product = toSignal(\n    this.route.paramMap.pipe(\n      map((params) => params.get('id')!),\n      switchMap((id) =>\n        this.api.getProduct(id).pipe(catchError(() => of(null)))\n      )\n    ),\n    { initialValue: null }\n  );\n}",
              annotations: [
                { line: 22, note: 'paramMap emits on EVERY navigation to this route — a stream, not a value.' },
                { line: 24, note: 'switchMap: navigating fast? The stale product request is cancelled.' },
                { line: 25, note: 'Inner catchError: one bad id does not kill future navigations.' },
                { line: 21, note: 'toSignal: the pipeline ends as a signal the template reads naturally.' },
              ],
              explanation:
                'Route stream → cancel-correct fetch → resilient error path → signal for the view. This is modern Angular in one screen.',
            },
          ],
          keyPoints: [
            'paramMap/valueChanges/router.events are **streams** — never treat them as one-shot values.',
            '`toSignal` ends pipelines as view-ready signals; `toObservable` feeds signals into pipelines.',
            'The canonical page: paramMap → switchMap(fetch) → catchError inside → toSignal.',
            'Modern split: RxJS pipelines in the middle, signals at the edges.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why is reading the route param once in ngOnInit a bug on a detail page?',
              options: [
                { id: 'a', text: 'ngOnInit runs too late', correct: false },
                { id: 'b', text: 'Navigating from product 1 to product 2 reuses the component — only the param STREAM emits again', correct: true },
                { id: 'c', text: 'Params are encrypted', correct: false },
                { id: 'd', text: 'It is not a bug', correct: false },
              ],
              explanation:
                'The router reuses component instances for same-route navigation; subscribing to paramMap is the correct pattern.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does toSignal(obs$, { initialValue: null }) handle for you?',
              options: [
                { id: 'a', text: 'Only type conversion', correct: false },
                { id: 'b', text: 'Subscription, cleanup, change detection, and the value before first emission', correct: true },
                { id: 'c', text: 'Error retries', correct: false },
                { id: 'd', text: 'HTTP caching', correct: false },
              ],
              explanation:
                'toSignal subscribes, exposes values as a signal, cleans up with the context, and uses initialValue until the stream emits.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'In the canonical detail page, why switchMap rather than mergeMap?',
              options: [
                { id: 'a', text: 'mergeMap is deprecated', correct: false },
                { id: 'b', text: 'Rapid navigation must cancel stale product fetches — latest navigation wins', correct: true },
                { id: 'c', text: 'switchMap is faster', correct: false },
                { id: 'd', text: 'No reason', correct: false },
              ],
              explanation:
                'Same logic as search: only the latest param matters, and in-flight responses for old params must never land.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 5 — GOING PRO
    // ===================================================================
    {
      id: 'l5-pro',
      order: 5,
      title: 'Level 5 — Going pro',
      goal: 'Read marble diagrams, build custom operators, dodge the classic pitfalls, and place RxJS correctly in the modern stack.',
      lessons: [
        {
          id: 'marble-diagrams',
          title: 'Marble diagrams & testing',
          minutes: 11,
          blurb: 'The visual language of streams — in docs and in tests.',
          concept: [
            {
              heading: 'Reading marbles',
              body: 'Every operator doc uses **marble diagrams**: a left-to-right timeline where circles are emissions, `|` is completion, and `X` is an error. Text notation compresses this: `--a--b--|` means two values then complete; each `-` is a tick of time. Once fluent, an unfamiliar operator takes seconds to grasp from its diagram — this is the skill that makes the whole RxJS API self-documenting.',
            },
            {
              heading: 'Marble testing',
              body: 'The same notation **tests** time-based code without real waiting: `TestScheduler` runs virtual time, so a test of debounceTime(300) finishes in microseconds. You describe input as `\'--a-b---c|\'`, expected output as another marble string, and the scheduler verifies emissions AND their exact timing.',
            },
            {
              heading: 'When marble tests earn their keep',
              body: 'Unit-test plain logic normally; reach for marble tests when **timing is the logic**: debounce windows, retry backoff, switchMap cancellation races. For most app code, testing the service around the stream (with a mocked API) is enough — marble tests shine for reusable operators and tricky pipelines.',
            },
          ],
          codeSamples: [
            {
              title: 'A marble test of debounceTime',
              filename: 'search.spec.ts',
              language: 'typescript',
              code: "import { TestScheduler } from 'rxjs/testing';\nimport { debounceTime } from 'rxjs';\n\nit('debounces rapid input', () => {\n  const scheduler = new TestScheduler((actual, expected) => {\n    expect(actual).toEqual(expected);\n  });\n\n  scheduler.run(({ cold, expectObservable }) => {\n    const input = cold('-a-b-c-------|');\n    const result = input.pipe(debounceTime(4, scheduler));\n    //                  values a,b arrive too fast and are discarded\n    expectObservable(result).toBe('---------c---|');\n  });\n});",
              annotations: [
                { line: 10, note: 'The input timeline: a, b, c in quick succession, then silence.' },
                { line: 13, note: 'Expected: only c survives, exactly 4 ticks after it arrived.' },
                { line: 9, note: 'Virtual time: this "waits" without waiting — tests run instantly.' },
              ],
              explanation:
                'Read the two marble strings against each other — the test IS the documentation of the behavior.',
            },
          ],
          keyPoints: [
            'Marble syntax: `-` time, letters emissions, `|` complete, `X` error.',
            'Fluent marble reading makes every operator doc instantly understandable.',
            'TestScheduler runs **virtual time** — timing tests without real delays.',
            'Use marble tests where timing IS the logic; normal tests elsewhere.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: "What does the marble string '--a--b--|' describe?",
              options: [
                { id: 'a', text: 'Two errors', correct: false },
                { id: 'b', text: 'Emissions a then b, then the stream completes', correct: true },
                { id: 'c', text: 'An infinite stream', correct: false },
                { id: 'd', text: 'A subscription', correct: false },
              ],
              explanation:
                'Letters are values on a timeline; the pipe character is completion.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why are marble tests fast despite testing debounce/delay logic?',
              options: [
                { id: 'a', text: 'They skip the operators', correct: false },
                { id: 'b', text: 'TestScheduler simulates virtual time instead of really waiting', correct: true },
                { id: 'c', text: 'They run in parallel', correct: false },
                { id: 'd', text: 'They are not fast', correct: false },
              ],
              explanation:
                'Virtual time advances instantly in the scheduler — a 30-second backoff tests in microseconds.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which scenario most deserves a marble test?',
              options: [
                { id: 'a', text: 'A pure formatting function', correct: false },
                { id: 'b', text: 'A custom retry-with-backoff operator where exact timing is the behavior', correct: true },
                { id: 'c', text: 'A template binding', correct: false },
                { id: 'd', text: 'A CSS class toggle', correct: false },
              ],
              explanation:
                'When the contract is "what emits WHEN", marble tests express and verify it directly.',
            },
          ],
        },
        {
          id: 'custom-operators',
          title: 'Building custom operators',
          minutes: 10,
          blurb: 'Operators are just functions — package your patterns.',
          concept: [
            {
              heading: 'The shape of an operator',
              body: 'An operator is simply a function `(source: Observable<A>) => Observable<B>`. Since pipe accepts any such function, composing existing operators inside one is all it takes: wrap your team’s recurring pipeline (filter nulls, debounce, log) into one named, tested, reusable operator.',
            },
            {
              heading: 'Composition over construction',
              body: '99% of custom operators should be **compositions** of existing ones — return `source.pipe(...)`. Writing a raw `new Observable` with manual subscriber management is rarely needed and easy to get wrong (teardown, error forwarding). If you must, study the source of simple operators like map first.',
            },
            {
              heading: 'Why bother',
              body: 'Named operators turn pipelines into prose: `source$.pipe(validText(), withLoading(this.loading), apiErrorToast(this.toast))` reads like the requirements document. They centralize fixes (change the debounce once, every search updates) and they are unit-testable in isolation with marble tests.',
            },
          ],
          codeSamples: [
            {
              title: 'A reusable operator from existing pieces',
              filename: 'operators.ts',
              language: 'typescript',
              code: "import { Observable, pipe } from 'rxjs';\nimport { debounceTime, distinctUntilChanged, filter } from 'rxjs';\n\n/** The canonical search-input cleanup, packaged once. */\nexport function searchTerm(minLength = 2, ms = 300) {\n  return pipe(\n    debounceTime<string | null>(ms),\n    filter((t): t is string => t !== null && t.length >= minLength),\n    distinctUntilChanged()\n  );\n}\n\n// usage — the pipeline now reads like a sentence:\nresults$ = this.control.valueChanges.pipe(\n  searchTerm(),\n  switchMap((q) => this.api.search(q))\n);",
              annotations: [
                { line: 5, note: 'Configurable parameters make the operator reusable across features.' },
                { line: 6, note: 'pipe() composes operators into ONE operator — no source needed yet.' },
                { line: 15, note: 'Every search box in the app now shares one tested implementation.' },
              ],
              explanation:
                'The standalone pipe() function is the composition tool: it fuses operators into a new operator.',
            },
          ],
          keyPoints: [
            'An operator = `(source: Observable<A>) => Observable<B>` — just a function.',
            'Compose with standalone `pipe(...)`; avoid raw `new Observable` plumbing.',
            'Parameterize (durations, thresholds) for reuse across features.',
            'Named operators make pipelines read like requirements and centralize fixes.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What is the type signature of an RxJS operator?',
              options: [
                { id: 'a', text: '(value: A) => B', correct: false },
                { id: 'b', text: '(source: Observable<A>) => Observable<B>', correct: true },
                { id: 'c', text: '(sub: Subscription) => void', correct: false },
                { id: 'd', text: 'class extends Observable', correct: false },
              ],
              explanation:
                'Operators transform observables into observables — which is why any such function works in .pipe().',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does the standalone pipe(...) function (not the method) do?',
              options: [
                { id: 'a', text: 'Subscribes immediately', correct: false },
                { id: 'b', text: 'Composes several operators into one reusable operator', correct: true },
                { id: 'c', text: 'Creates a Subject', correct: false },
                { id: 'd', text: 'Runs the stream twice', correct: false },
              ],
              explanation:
                'pipe() fuses operators without a source — the building block of custom operators.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'When is writing new Observable(...) by hand justified?',
              options: [
                { id: 'a', text: 'For every custom operator', correct: false },
                { id: 'b', text: 'Rarely — only when wrapping an API no creation function covers', correct: true },
                { id: 'c', text: 'Never', correct: false },
                { id: 'd', text: 'For performance', correct: false },
              ],
              explanation:
                'Composition covers nearly everything; manual construction risks subtle teardown and error bugs.',
            },
          ],
        },
        {
          id: 'pitfalls',
          title: 'The classic pitfalls',
          minutes: 11,
          blurb: 'The five mistakes every RxJS codebase contains — spot them fast.',
          concept: [
            {
              heading: 'The big five',
              body: '1) **Nested subscribes** — always a flattening operator in disguise. 2) **Forgotten unsubscribe** on infinite streams — leaks. 3) **Wrong flattening operator** — switchMap cancelling a payment, mergeMap racing search results. 4) **Missing inner catchError** — one failure kills a permanent UI stream. 5) **Cold duplication** — multiple async pipes refiring HTTP because shareReplay is missing.',
            },
            {
              heading: 'Subtler traps',
              body: 'Logic in `tap` that mutates shared state (hidden coupling); `combineLatest` gates that never fire because one source has not emitted (fix: `startWith`); side effects in streams with **zero** subscribers (observables are lazy — no subscribe, nothing runs); and `shareReplay` without refCount keeping zombie connections alive.',
            },
            {
              heading: 'A reviewer’s checklist',
              body: 'Reading any pipeline, verify in order: Does each stream **complete or get terminated** somehow? Is the **flattening strategy** justified by the use case? Are errors caught **inside** the right scope? Is anything **shared** that gets multiple subscribers? Five questions, ninety percent of bugs.',
            },
          ],
          codeSamples: [
            {
              title: 'Spot the four bugs',
              filename: 'review-me.ts',
              language: 'typescript',
              code: "// A code-review exercise: this compiles, and has 4 real bugs\nngOnInit() {\n  // (1) infinite stream, no teardown -> leak\n  this.form.valueChanges.subscribe((v) => {\n    // (2) nested subscribe -> no cancellation, no error flow\n    this.api.validate(v).subscribe((ok) => {\n      this.valid = ok;\n    });\n  });\n\n  // (3) no catchError -> first failure kills ticks forever\n  // (4) switchMap on a SAVE -> a new tick cancels an in-flight save!\n  this.autosave$ = interval(30_000).pipe(\n    switchMap(() => this.api.save(this.form.value))\n  );\n}",
              annotations: [
                { line: 4, note: 'Bug 1: valueChanges never completes — needs takeUntilDestroyed or async pipe.' },
                { line: 6, note: 'Bug 2: the anti-pattern — should be a debounced switchMap pipeline.' },
                { line: 13, note: 'Bug 3: one failed save errors the interval chain permanently.' },
                { line: 14, note: 'Bug 4: saves must not be cancelled — concatMap (or exhaustMap) belongs here.' },
              ],
              explanation:
                'The fixed version: valueChanges → debounceTime → takeUntilDestroyed → concatMap(save with inner catchError).',
            },
          ],
          keyPoints: [
            'The big five: nested subscribes, leaks, wrong flattener, missing inner catchError, unshared cold streams.',
            '`combineLatest` silence → check `startWith`; lazy streams need subscribers to run at all.',
            'switchMap on writes and exhaustMap on reads are both wrong — match strategy to intent.',
            'Review checklist: termination, flattening choice, error scope, sharing.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Autosave uses switchMap(() => api.save(...)). What is the danger?',
              options: [
                { id: 'a', text: 'Saves are too slow', correct: false },
                { id: 'b', text: 'A new trigger CANCELS an in-flight save — data loss; use concatMap/exhaustMap', correct: true },
                { id: 'c', text: 'Memory leaks', correct: false },
                { id: 'd', text: 'None, switchMap is always right', correct: false },
              ],
              explanation:
                'switchMap cancels the previous inner stream — fine for reads, dangerous for writes.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'combineLatest([a$, b$]) never emits. Most likely cause?',
              options: [
                { id: 'a', text: 'A bug in RxJS', correct: false },
                { id: 'b', text: 'One source has not emitted yet — it needs every input to emit once (fix: startWith)', correct: true },
                { id: 'c', text: 'Too many subscribers', correct: false },
                { id: 'd', text: 'Missing semicolon', correct: false },
              ],
              explanation:
                'combineLatest waits for an initial value from every source before its first emission.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'A service builds an analytics stream but nothing ever subscribes. What happens?',
              options: [
                { id: 'a', text: 'It runs anyway', correct: false },
                { id: 'b', text: 'Nothing — observables are lazy; no subscriber, no execution', correct: true },
                { id: 'c', text: 'It throws', correct: false },
                { id: 'd', text: 'It runs once', correct: false },
              ],
              explanation:
                'Laziness cuts both ways: pipelines without subscribers are silent dead code.',
            },
          ],
        },
        {
          id: 'rxjs-ecosystem',
          title: 'RxJS in the modern stack',
          minutes: 10,
          blurb: 'Streams vs signals vs promises — and where RxJS is heading.',
          concept: [
            {
              heading: 'The decision triangle',
              body: 'A practical rule: **promise/async-await** for one-shot async with no cancellation needs; **signal/computed** for state the UI reads; **RxJS** when you have **events over time** needing operators — debouncing, cancellation, racing, combination, retries. Most confusion dissolves once you ask: is this a value, a state, or a stream?',
            },
            {
              heading: 'RxJS beyond Angular',
              body: 'RxJS is framework-agnostic: it powers Node services (event processing), NestJS (interceptors return observables), VS Code extensions, and games. The ReactiveX concept family extends across languages (RxJava, Rx.NET, RxSwift) — your operator knowledge transfers to entire ecosystems.',
            },
            {
              heading: 'The road ahead',
              body: 'Angular keeps RxJS central for events while signals own state; interop is first-class and stable. The web platform itself is absorbing the idea: the **Observable API proposal** (WICG) brings `element.when(\'click\')` natively to browsers — evidence the model won. Your investment here is in a way of thinking, not a library version.',
            },
          ],
          codeSamples: [
            {
              title: 'Choosing the right tool, side by side',
              filename: 'choices.ts',
              language: 'typescript',
              code: "// ONE-SHOT, no cancellation needed -> promise is simplest\nconst config = await fetch('/api/config').then((r) => r.json());\n\n// STATE the UI reads -> signal\nconst cartCount = signal(0);\nconst total = computed(() => cartCount() * price());\n\n// EVENTS over time with operators -> RxJS\nconst results = toSignal(\n  searchInput$.pipe(\n    debounceTime(300),\n    distinctUntilChanged(),\n    switchMap((q) => api.search(q).pipe(catchError(() => of([]))))\n  ),\n  { initialValue: [] }\n);",
              annotations: [
                { line: 2, note: 'No debounce, no cancel, one value: await and move on.' },
                { line: 5, note: 'Synchronous state with derivations: signals territory.' },
                { line: 10, note: 'Debounce + dedupe + cancellation: this NEEDS operators.' },
                { line: 9, note: 'And the pipeline still ends as a signal for the view — the modern blend.' },
              ],
              explanation:
                'Value → promise. State → signal. Stream → RxJS, often finished with toSignal. That one mapping is the takeaway of the course.',
            },
          ],
          keyPoints: [
            'Value → promise; state → signal; events-over-time needing operators → RxJS.',
            'RxJS runs beyond Angular: Node, NestJS, and Rx siblings in other languages.',
            'The browser Observable proposal shows the model becoming a web standard.',
            'You learned a way of thinking — it outlives any specific API.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Fetching app config once at startup, no cancellation needed. Best tool?',
              options: [
                { id: 'a', text: 'A BehaviorSubject', correct: false },
                { id: 'b', text: 'A promise with async/await — simplest fit for one-shot async', correct: true },
                { id: 'c', text: 'interval + switchMap', correct: false },
                { id: 'd', text: 'A marble test', correct: false },
              ],
              explanation:
                'No stream semantics needed — reaching for RxJS here adds ceremony without benefit.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Which requirement clearly demands RxJS over a promise?',
              options: [
                { id: 'a', text: 'Reading one config value', correct: false },
                { id: 'b', text: 'Debouncing input and cancelling stale requests as new ones arrive', correct: true },
                { id: 'c', text: 'Storing a boolean flag', correct: false },
                { id: 'd', text: 'Computing a derived total', correct: false },
              ],
              explanation:
                'Debounce + cancellation are stream operations — promises cannot cancel, signals do not debounce.',
            },
            {
              id: 'q3',
              type: 'truefalse',
              prompt: 'Learning RxJS operators only pays off inside Angular projects.',
              options: [
                { id: 'a', text: 'True', correct: false },
                { id: 'b', text: 'False', correct: true },
              ],
              explanation:
                'The Rx model spans Node, NestJS, other languages (RxJava, RxSwift) — and is heading into the browser platform itself.',
            },
          ],
        },
      ],
    },
  ],
};
