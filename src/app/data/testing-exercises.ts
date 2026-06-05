import { Exercise } from '../models/course.model';

/** Interactive exercises for the Testing course, keyed by lesson id. */
export const TESTING_EXERCISES: Record<string, Exercise[]> = {
  // ---------- Level 1 ----------
  'why-testing': [
    {
      id: 'ex-regression',
      type: 'fill-blank',
      prompt: 'Complete the professional habit after fixing any bug.',
      language: 'text',
      codeTemplate:
        'fix a production bug  ->  add a ___ test that reproduces it,\nso the bug can never return unnoticed',
      blanks: [{ accepted: ['regression'], hint: 'The class of bug that "comes back".' }],
      explanation:
        'A regression test pins the fix forever — the single most transformative testing habit.',
    },
  ],
  'test-anatomy': [
    {
      id: 'ex-aaa',
      type: 'arrange',
      prompt: 'Arrange the three phases of a well-shaped test.',
      language: 'text',
      lines: [
        'Arrange — set up the world (objects, inputs, fakes)',
        'Act — perform the ONE action under test',
        'Assert — verify the outcome',
      ],
      explanation: 'AAA: arrange, act, assert — visible phases make any test readable in seconds.',
    },
  ],
  'testing-pyramid': [
    {
      id: 'ex-pyramid',
      type: 'fill-blank',
      prompt: 'Complete the pyramid: many of which, few of which?',
      language: 'text',
      codeTemplate:
        'many ___ tests (fast, precise)\nfewer integration tests\nfew ___ tests (slow, realistic — critical journeys only)',
      blanks: [
        { accepted: ['unit'], hint: 'Milliseconds, pinpoint failures.' },
        { accepted: ['e2e', 'end-to-end'], hint: 'Real browser, real app.' },
      ],
      explanation:
        'Cheap-and-precise in bulk, expensive-and-realistic sparingly — confidence per second.',
    },
  ],
  'what-to-test': [
    {
      id: 'ex-behavior',
      type: 'fill-blank',
      prompt: 'Complete the golden rule of maintainable tests.',
      language: 'text',
      codeTemplate: 'test ___ (outputs, visible state, events) —\nnever ___ (privates, call order, internals)',
      blanks: [
        { accepted: ['behavior', 'the behavior', 'behaviour'], hint: 'What the code promises.' },
        { accepted: ['implementation', 'the implementation'], hint: 'How it currently does it.' },
      ],
      explanation:
        'Behavior tests survive refactors and fail only when something REAL broke.',
    },
  ],

  // ---------- Level 2 ----------
  'pure-logic': [
    {
      id: 'ex-boundary',
      type: 'fill-blank',
      prompt: 'A discount starts at 10 items. Write the boundary trio.',
      language: 'text',
      codeTemplate: 'test quantities: ___, 10, ___   (below, at, above the threshold)',
      blanks: [
        { accepted: ['9'], hint: 'One below.' },
        { accepted: ['11'], hint: 'One above.' },
      ],
      explanation:
        'limit-1, limit, limit+1 — the trio that catches every >= vs > off-by-one.',
    },
  ],
  matchers: [
    {
      id: 'ex-toequal',
      type: 'fill-blank',
      prompt: 'Choose the right matchers: object structure, then a float.',
      language: 'typescript',
      codeTemplate:
        "expect(getUser()).___({ id: 1, name: 'Ada' });\nexpect(0.1 + 0.2).___(0.3);",
      blanks: [
        { accepted: ['toEqual'], hint: 'Deep structure, not identity.' },
        { accepted: ['toBeCloseTo'], hint: '0.30000000000000004 strikes again.' },
      ],
      explanation:
        'toEqual compares structure (toBe would fail on references); toBeCloseTo handles floating point.',
    },
  ],
  'test-doubles': [
    {
      id: 'ex-doubles',
      type: 'fill-blank',
      prompt: 'Name the doubles: canned answers vs call recording.',
      language: 'text',
      codeTemplate:
        '"when getUser() is called, return Ada"        -> a ___\n"was sendEmail called once with this address?" -> a ___',
      blanks: [
        { accepted: ['stub'], hint: 'Controls the input side.' },
        { accepted: ['spy'], hint: 'Observes the output side.' },
      ],
      explanation:
        'Stub = scripted answers in; spy = recorded calls out. Fake the edges, keep the core real.',
    },
  ],
  'di-testing': [
    {
      id: 'ex-clock',
      type: 'fill-blank',
      prompt: 'Make time injectable so tests control "now".',
      language: 'typescript',
      codeTemplate:
        'constructor(\n  private api: AuthApi,\n  private now: () => number = Date.___\n) {}\n\n// in the test:\nnew Session(fakeApi, () => DEADLINE + 1);',
      blanks: [{ accepted: ['now'], hint: 'The function, passed by reference as default.' }],
      explanation:
        'Time as an injected dependency: production uses the real clock, tests time-travel freely.',
    },
  ],

  // ---------- Level 3 ----------
  'testbed-basics': [
    {
      id: 'ex-detect',
      type: 'fill-blank',
      prompt: 'Make the component actually render after setting its input.',
      language: 'typescript',
      codeTemplate:
        "fixture.componentRef.setInput('name', 'Kosay');\nfixture.___();\nexpect(fixture.nativeElement.textContent).toContain('Kosay');",
      blanks: [{ accepted: ['detectChanges'], hint: 'The manual rendering heartbeat.' }],
      explanation:
        'Change detection is manual in tests — no detectChanges, no render. The classic confusion.',
    },
  ],
  'interaction-outputs': [
    {
      id: 'ex-dispatch',
      type: 'fill-blank',
      prompt: 'Type into an input so Angular actually notices.',
      language: 'typescript',
      codeTemplate:
        "input.value = 'angular';\ninput.___(new Event('input'));",
      blanks: [{ accepted: ['dispatchEvent'], hint: 'Setting .value alone bypasses the listeners.' }],
      explanation:
        'Angular listens to events — dispatching the input event is what simulates real typing.',
    },
  ],
  'http-testing': [
    {
      id: 'ex-flush',
      type: 'fill-blank',
      prompt: 'Intercept the request, then deliver the scripted response.',
      language: 'typescript',
      codeTemplate:
        "const req = httpMock.___('/api/users');\nexpect(req.request.method).toBe('GET');\nreq.___([{ id: 1, name: 'Ada' }]);",
      blanks: [
        { accepted: ['expectOne'], hint: 'Exactly one request to this URL.' },
        { accepted: ['flush'], hint: 'You play the server.' },
      ],
      explanation:
        'expectOne intercepts (and guards against duplicates); flush hands the response to the real service code.',
    },
  ],
  'harnesses-routing': [
    {
      id: 'ex-harness',
      type: 'fill-blank',
      prompt: 'Drive a Material select through its official test API.',
      language: 'typescript',
      codeTemplate:
        'const select = await loader.getHarness(MatSelect___);\nawait select.open();\nawait select.clickOptions({ text: \'Frontend\' });',
      blanks: [{ accepted: ['Harness'], hint: 'The suffix of every official component test API.' }],
      explanation:
        'Harnesses speak intent and survive Material upgrades — never query its internal DOM.',
    },
  ],

  // ---------- Level 4 ----------
  'integration-tests': [
    {
      id: 'ex-integration',
      type: 'fill-blank',
      prompt: 'Complete the integration recipe.',
      language: 'text',
      codeTemplate:
        'integration test = ___ collaborators wired together\n                  + only the system ___ faked (HTTP, clock, storage)',
      blanks: [
        { accepted: ['real'], hint: 'The wiring is the test subject.' },
        { accepted: ['edges', 'boundaries', 'edge'], hint: 'Where the system meets the world.' },
      ],
      explanation:
        'Real units, fake boundaries: catches misfit between layers while staying fast.',
    },
  ],
  'e2e-playwright': [
    {
      id: 'ex-getbyrole',
      type: 'fill-blank',
      prompt: 'Query like a user: find the button by its accessible role and name.',
      language: 'typescript',
      codeTemplate:
        "await page.___('button', { name: 'Start course' }).click();\nawait expect(page.getByText('Lesson 1')).toBeVisible();",
      blanks: [{ accepted: ['getByRole'], hint: 'Semantic, resilient, accessibility-checking.' }],
      explanation:
        'getByRole queries as users (and screen readers) do — resilient to markup and class changes.',
    },
  ],
  'flaky-tests': [
    {
      id: 'ex-flaky',
      type: 'fill-blank',
      prompt: 'Diagnose: a test passes alone but fails in the full suite.',
      language: 'text',
      codeTemplate:
        'prime suspect: ___ dependence / leftover shared state\ncure: fresh state per test via ___',
      blanks: [
        { accepted: ['order'], hint: 'Test B needs what test A left behind.' },
        { accepted: ['beforeEach'], hint: 'The fresh-world hook.' },
      ],
      explanation:
        'Alone-green suite-red is the signature of state leaking between tests.',
    },
  ],
  'test-data': [
    {
      id: 'ex-builder',
      type: 'fill-blank',
      prompt: 'Complete the builder signature using the utility type you know.',
      language: 'typescript',
      codeTemplate:
        'export function makeUser(overrides: ___<User> = {}): User {\n  return { id: 1, name: \'Test\', role: \'member\', ...overrides };\n}',
      blanks: [{ accepted: ['Partial'], hint: 'All properties optional — from your TypeScript course.' }],
      explanation:
        'Partial<User> lets callers override only the delta their scenario cares about.',
    },
  ],

  // ---------- Level 5 ----------
  tdd: [
    {
      id: 'ex-tdd',
      type: 'arrange',
      prompt: 'Arrange the TDD cycle.',
      language: 'text',
      lines: [
        'RED — write a small failing test for the next behavior',
        'GREEN — write the minimum code that passes',
        'REFACTOR — clean up with the test as your safety net',
      ],
      explanation:
        'Red proves the test can detect absence; green earns the behavior; refactor keeps it clean.',
    },
  ],
  'coverage-quality': [
    {
      id: 'ex-mutation',
      type: 'fill-blank',
      prompt: 'Name the technique that tests your TESTS by planting bugs.',
      language: 'text',
      codeTemplate:
        '___ testing plants small bugs (flip >= to >, negate a condition);\nif the suite stays green, the "mutant" survived — an assertion gap',
      blanks: [{ accepted: ['mutation'], hint: 'Stryker is the JS/TS tool.' }],
      explanation:
        'Mutation testing measures detection power — what coverage numbers cannot see.',
    },
  ],
  'ci-testing': [
    {
      id: 'ex-pipeline',
      type: 'arrange',
      prompt: 'Arrange the CI stages cheap-to-expensive (fail fast).',
      language: 'text',
      lines: [
        'tsc --noEmit   (types — seconds)',
        'lint',
        'unit tests (headless)',
        'build',
        'e2e against the preview deployment',
      ],
      explanation:
        'Cheapest checks first: a type error aborts in seconds instead of after minutes of browser tests.',
    },
  ],
  'testing-culture': [
    {
      id: 'ex-culture',
      type: 'fill-blank',
      prompt: 'Complete the two culture rules.',
      language: 'text',
      codeTemplate:
        'a red main branch is ___ problem, immediately\na flaky test gets quarantined and fixed (or ___) within days',
      blanks: [
        { accepted: ["everyone's", 'everyones', 'the whole team’s', 'everyone'], hint: 'Not just the author’s.' },
        { accepted: ['deleted', 'removed'], hint: 'The honest fate of an unfixable flake.' },
      ],
      explanation:
        'A broken main poisons every branch; a tolerated flake kills trust in red. Both are team-level emergencies.',
    },
  ],
};
