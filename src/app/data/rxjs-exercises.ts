import { Exercise } from '../models/course.model';

/** Interactive exercises for the RxJS course, keyed by lesson id. */
export const RXJS_EXERCISES: Record<string, Exercise[]> = {
  // ---------- Level 1 ----------
  'thinking-in-streams': [
    {
      id: 'ex-naming',
      type: 'fill-blank',
      prompt: 'Nothing flows until you call the method that starts a stream. Which one?',
      language: 'typescript',
      codeTemplate: "clicks$.___((e) => console.log('clicked!'));",
      blanks: [{ accepted: ['subscribe'], hint: 'Streams are lazy until this call.' }],
      explanation:
        'subscribe() starts the producer — observables are lazy recipes until then.',
    },
  ],
  'observable-anatomy': [
    {
      id: 'ex-channels',
      type: 'fill-blank',
      prompt: 'Complete the producer: emit a value, then end the stream normally.',
      language: 'typescript',
      codeTemplate:
        'const data$ = new Observable<number>((subscriber) => {\n  subscriber.___(42);\n  subscriber.___();\n});',
      blanks: [
        { accepted: ['next'], hint: 'The value channel.' },
        { accepted: ['complete'], hint: 'The normal-termination channel.' },
      ],
      explanation:
        'next(42) emits the value; complete() ends the stream — nothing can be emitted after it.',
    },
  ],
  'creating-observables': [
    {
      id: 'ex-from',
      type: 'fill-blank',
      prompt: 'Convert a promise into an observable.',
      language: 'typescript',
      codeTemplate: "const user$ = ___(fetch('/api/user'));",
      blanks: [{ accepted: ['from'], hint: 'The universal converter (not of!).' }],
      explanation:
        'from() understands promises, arrays, and iterables; of(promise) would emit the promise object itself.',
    },
  ],
  'subscriptions-lifecycle': [
    {
      id: 'ex-takeuntil',
      type: 'fill-blank',
      prompt: 'Tie this side-effect stream to the component lifetime (modern Angular).',
      language: 'typescript',
      codeTemplate:
        'interval(5000)\n  .pipe(___())\n  .subscribe(() => this.autosave());',
      blanks: [
        { accepted: ['takeUntilDestroyed'], hint: 'Completes when the component is destroyed.' },
      ],
      explanation:
        'takeUntilDestroyed() completes the stream on component destruction — the modern leak-prevention idiom.',
    },
  ],

  // ---------- Level 2 ----------
  'pipe-map-tap': [
    {
      id: 'ex-tap',
      type: 'fill-blank',
      prompt: 'Log values mid-pipe without changing them.',
      language: 'typescript',
      codeTemplate:
        "users$.pipe(\n  ___((u) => console.log('arrived:', u)),\n  map((u) => u.name)\n);",
      blanks: [{ accepted: ['tap'], hint: 'The transparent side-effect window.' }],
      explanation:
        'tap runs side effects and forwards values untouched — the standard debugging probe.',
    },
  ],
  'filtering-operators': [
    {
      id: 'ex-take1',
      type: 'fill-blank',
      prompt: 'Read ONE value then auto-complete (no unsubscribe needed).',
      language: 'typescript',
      codeTemplate:
        'this.auth.user$.pipe(___(1)).subscribe((u) => console.log(u.name));',
      blanks: [{ accepted: ['take'], hint: 'n values, then complete.' }],
      explanation:
        'take(1) emits one value and completes — the stream cleans itself up.',
    },
  ],
  'timing-operators': [
    {
      id: 'ex-search-chain',
      type: 'arrange',
      prompt: 'Arrange the canonical search-box pipeline.',
      language: 'typescript',
      lines: [
        'const query$ = this.searchControl.valueChanges.pipe(',
        '  debounceTime(300),',
        '  distinctUntilChanged(),',
        '  filter((t) => t.length >= 2)',
        ');',
      ],
      explanation:
        'Wait for a typing pause, drop unchanged text, ignore too-short queries — the canonical order.',
    },
  ],
  accumulating: [
    {
      id: 'ex-scan',
      type: 'fill-blank',
      prompt: 'Turn click events into a live running counter.',
      language: 'typescript',
      codeTemplate:
        'const count$ = clicks$.pipe(\n  map(() => 1),\n  ___((total, n) => total + n, 0)\n);',
      blanks: [{ accepted: ['scan'], hint: 'reduce that emits every step.' }],
      explanation:
        'scan emits each intermediate total — events folded into living state.',
    },
  ],

  // ---------- Level 3 ----------
  'flattening-intro': [
    {
      id: 'ex-mergemap',
      type: 'fill-blank',
      prompt: 'Flatten: run a delete request for every id, all in parallel.',
      language: 'typescript',
      codeTemplate:
        'ids$.pipe(\n  ___((id) => this.api.delete(id))\n).subscribe();',
      blanks: [{ accepted: ['mergeMap'], hint: 'All inner streams run concurrently.' }],
      explanation:
        'mergeMap subscribes to every inner observable as it arrives — independent parallel work.',
    },
  ],
  'switchmap-family': [
    {
      id: 'ex-strategy',
      type: 'fill-blank',
      prompt: 'Pick the right operator: search (cancel stale) and submit (ignore re-clicks).',
      language: 'typescript',
      codeTemplate:
        'results$ = query$.pipe(\n  ___((q) => this.api.search(q))\n);\n\nlogin$ = submit$.pipe(\n  ___(() => this.auth.login(creds))\n);',
      blanks: [
        { accepted: ['switchMap'], hint: 'Latest wins; stale requests die.' },
        { accepted: ['exhaustMap'], hint: 'Busy? Ignore new triggers.' },
      ],
      explanation:
        'search→switchMap (cancel old), submit→exhaustMap (swallow re-clicks) — the two ends of the decision table.',
    },
  ],
  'combination-operators': [
    {
      id: 'ex-forkjoin',
      type: 'fill-blank',
      prompt: 'Load user and orders in parallel; emit once when BOTH complete.',
      language: 'typescript',
      codeTemplate:
        '___({\n  user: this.api.getUser(id),\n  orders: this.api.getOrders(id),\n}).subscribe(({ user, orders }) => this.render(user, orders));',
      blanks: [{ accepted: ['forkJoin'], hint: 'The RxJS Promise.all.' }],
      explanation:
        'forkJoin waits for all sources to complete and emits their final values together, once.',
    },
  ],
  'error-handling': [
    {
      id: 'ex-catch',
      type: 'fill-blank',
      prompt: 'Keep the search alive when one request fails: fallback to an empty list.',
      language: 'typescript',
      codeTemplate:
        'switchMap((q) =>\n  this.api.search(q).pipe(\n    ___(() => of([]))\n  )\n)',
      blanks: [{ accepted: ['catchError'], hint: 'Substitute a fallback stream.' }],
      explanation:
        'catchError INSIDE the flattening operator sacrifices one request — the outer pipeline survives.',
    },
  ],

  // ---------- Level 4 ----------
  subjects: [
    {
      id: 'ex-behavior',
      type: 'fill-blank',
      prompt: 'State container: current value for late subscribers + synchronous reads.',
      language: 'typescript',
      codeTemplate:
        'private user = new ___<User | null>(null);\nreadonly user$ = this.user.asObservable();',
      blanks: [{ accepted: ['BehaviorSubject'], hint: 'The subject that remembers its current value.' }],
      explanation:
        'BehaviorSubject holds a current value, replays it to newcomers, and offers .value for sync reads.',
    },
  ],
  'hot-cold-sharing': [
    {
      id: 'ex-sharereplay',
      type: 'fill-blank',
      prompt: 'Make this HTTP call fire ONCE and serve all (including late) subscribers.',
      language: 'typescript',
      codeTemplate:
        "readonly config$ = this.http.get<AppConfig>('/api/config').pipe(\n  ___({ bufferSize: 1, refCount: false })\n);",
      blanks: [{ accepted: ['shareReplay'], hint: 'Multicast + cache the latest.' }],
      explanation:
        'shareReplay shares the single execution and replays the cached value to anyone subscribing later.',
    },
  ],
  'state-patterns': [
    {
      id: 'ex-arrange-store',
      type: 'arrange',
      prompt: 'Arrange the BehaviorSubject store update (immutable pattern).',
      language: 'typescript',
      lines: [
        'addItem(item: string): void {',
        '  const current = this.state.value;',
        '  this.state.next({',
        '    ...current,',
        '    items: [...current.items, item],',
        '  });',
        '}',
      ],
      explanation:
        'Read the current state synchronously, build a NEW object with the change, push it with next().',
    },
  ],
  'rxjs-in-angular': [
    {
      id: 'ex-tosignal',
      type: 'fill-blank',
      prompt: 'End the pipeline as a signal the template can read.',
      language: 'typescript',
      codeTemplate:
        'readonly product = ___(\n  this.route.paramMap.pipe(\n    switchMap((p) => this.api.getProduct(p.get(\'id\')!))\n  ),\n  { initialValue: null }\n);',
      blanks: [{ accepted: ['toSignal'], hint: 'The rxjs-interop bridge to templates.' }],
      explanation:
        'toSignal subscribes, manages cleanup, and exposes the stream as a view-ready signal.',
    },
  ],

  // ---------- Level 5 ----------
  'marble-diagrams': [
    {
      id: 'ex-marble',
      type: 'fill-blank',
      prompt: "In marble syntax, write the symbol meaning 'the stream completes'.",
      language: 'text',
      codeTemplate: '--a--b--___',
      blanks: [{ accepted: ['|'], hint: 'A single vertical character.' }],
      explanation:
        'The pipe | marks completion; X would mark an error, letters are emissions.',
    },
  ],
  'custom-operators': [
    {
      id: 'ex-pipefn',
      type: 'fill-blank',
      prompt: 'Compose existing operators into ONE reusable operator.',
      language: 'typescript',
      codeTemplate:
        'export function searchTerm(ms = 300) {\n  return ___(\n    debounceTime<string>(ms),\n    distinctUntilChanged()\n  );\n}',
      blanks: [{ accepted: ['pipe'], hint: 'The standalone composition function.' }],
      explanation:
        'The standalone pipe() fuses operators into a new operator — no source observable needed.',
    },
  ],
  pitfalls: [
    {
      id: 'ex-fix-save',
      type: 'fill-blank',
      prompt: 'Fix the autosave bug: saves must queue in order, never be cancelled.',
      language: 'typescript',
      codeTemplate:
        'autosave$ = changes$.pipe(\n  debounceTime(1000),\n  ___((doc) => this.api.save(doc))\n);',
      blanks: [{ accepted: ['concatMap'], hint: 'Strict queue — finish one, then the next.' }],
      explanation:
        'concatMap queues saves in order; switchMap here would cancel in-flight writes and lose data.',
    },
  ],
  'rxjs-ecosystem': [
    {
      id: 'ex-choice',
      type: 'fill-blank',
      prompt: 'Complete the decision rule of the modern stack.',
      language: 'text',
      codeTemplate:
        'one-shot value  -> promise\nUI state        -> ___\nevents over time -> RxJS',
      blanks: [{ accepted: ['signal', 'signals'], hint: 'The Angular reactivity primitive.' }],
      explanation:
        'Value → promise; state → signal; streams needing operators → RxJS (often ending in toSignal).',
    },
  ],
};
