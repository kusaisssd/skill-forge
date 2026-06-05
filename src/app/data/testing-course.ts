import { Course } from '../models/course.model';

/**
 * The Testing Fundamentals course — from zero to advanced.
 * Focus: think like a tester — what to test, how to structure tests,
 * and how to keep them fast, honest, and maintainable.
 */
export const TESTING_COURSE: Course = {
  outcome:
    'By the end you will think in tests: know what deserves testing and what does not, write clear unit tests with the right test doubles, test Angular components and services idiomatically, run integration and e2e suites that do not flake, and practice professional habits — TDD, honest coverage, and CI gates.',
  levels: [
    // ===================================================================
    // LEVEL 1 — THE TESTING MINDSET
    // ===================================================================
    {
      id: 'l1-mindset',
      order: 1,
      title: 'Level 1 — The testing mindset',
      goal: 'Understand why tests exist, the anatomy of a test, the testing pyramid, and what actually deserves testing.',
      lessons: [
        {
          id: 'why-testing',
          title: 'Why tests exist',
          minutes: 9,
          blurb: 'Safety net, documentation, design pressure — three jobs in one.',
          concept: [
            {
              heading: 'The three jobs of a test suite',
              body: 'Tests do three jobs at once. **Safety net**: change code anywhere and know within seconds if you broke something — this is what makes refactoring (and fast shipping) possible at all. **Living documentation**: a test named "rejects expired coupons" documents behavior in a way that cannot silently go stale — if the behavior changes, the test fails. **Design pressure**: code that is hard to test is usually badly designed (tangled dependencies, hidden state) — tests complain early.',
            },
            {
              heading: 'The economics',
              body: 'A bug caught while typing costs seconds; in code review, minutes; in production, hours plus user trust. Tests shift detection left. The flip side is honest too: tests cost writing and maintenance time — which is why **what** you test matters as much as testing at all (lesson 4). The goal is never 100% of everything; it is confidence per minute spent.',
            },
            {
              heading: 'Regression — the real enemy',
              body: 'Most production bugs are **regressions**: features that worked, broken by later changes. Manual testing catches them once; automated tests catch them **every time, forever**. Each bug you fix deserves a test reproducing it — the bug can never return unnoticed. This single habit transforms codebases more than any framework.',
            },
          ],
          codeSamples: [
            {
              title: 'A test as documentation',
              filename: 'coupon.spec.ts',
              language: 'typescript',
              code: "describe('applyCoupon', () => {\n  it('reduces the total by the coupon percentage', () => {\n    const result = applyCoupon({ total: 100 }, { percent: 20 });\n    expect(result.total).toBe(80);\n  });\n\n  it('rejects expired coupons', () => {\n    const expired = { percent: 20, expiresAt: yesterday() };\n    expect(() => applyCoupon({ total: 100 }, expired))\n      .toThrowError('Coupon expired');\n  });\n});",
              annotations: [
                { line: 2, note: 'The test name states a business rule in plain language.' },
                { line: 7, note: 'Edge cases become permanent, executable documentation.' },
                { line: 9, note: 'Even error behavior is specified — and protected forever.' },
              ],
              explanation:
                'Read only the it() lines: you just learned how coupons work without opening the implementation. That is tests-as-docs.',
            },
          ],
          keyPoints: [
            'Three jobs: safety net (refactor fearlessly), living docs, design pressure.',
            'Tests shift bug detection left — seconds instead of production hours.',
            'Most bugs are regressions; automated tests catch them forever.',
            'Every fixed bug deserves a test that reproduces it.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What makes automated tests better than manual testing for regressions?',
              options: [
                { id: 'a', text: 'They are smarter', correct: false },
                { id: 'b', text: 'They re-check everything on every change, forever, for free', correct: true },
                { id: 'c', text: 'They replace QA entirely', correct: false },
                { id: 'd', text: 'They run in production', correct: false },
              ],
              explanation:
                'Manual checks happen once; automated suites guard every behavior on every future change.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why are tests called "living documentation"?',
              options: [
                { id: 'a', text: 'They are written in Markdown', correct: false },
                { id: 'b', text: 'They describe behavior AND fail if it changes — they cannot silently go stale', correct: true },
                { id: 'c', text: 'They generate PDFs', correct: false },
                { id: 'd', text: 'They are long', correct: false },
              ],
              explanation:
                'Unlike comments and wikis, a test that no longer matches reality turns red — docs with an alarm.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'After fixing a production bug, the professional habit is:',
              options: [
                { id: 'a', text: 'Move on quickly', correct: false },
                { id: 'b', text: 'Add a test that reproduces the bug, so it can never return unnoticed', correct: true },
                { id: 'c', text: 'Delete related tests', correct: false },
                { id: 'd', text: 'Test manually next release', correct: false },
              ],
              explanation:
                'A regression test pins the fix permanently — the bug class is retired, not just the instance.',
            },
          ],
        },
        {
          id: 'test-anatomy',
          title: 'Anatomy of a test: AAA',
          minutes: 10,
          blurb: 'Arrange, Act, Assert — and names that tell the story.',
          concept: [
            {
              heading: 'The AAA shape',
              body: 'Every good test has three phases: **Arrange** (set up the world: objects, inputs, fakes), **Act** (do the ONE thing being tested), **Assert** (check the outcome). Keeping them visually distinct — blank lines between phases — makes any test readable in seconds. If you cannot identify the three phases, the test is doing too much.',
            },
            {
              heading: 'describe / it / expect',
              body: 'The vocabulary (identical across Jasmine, Jest, Vitest): `describe` groups related tests around a unit; `it` (or `test`) is one case whose name completes the sentence "it ...": `it(\'returns empty array for no matches\')`. `expect(actual).matcher(expected)` asserts. Setup shared by all cases goes in `beforeEach` — a fresh world per test.',
            },
            {
              heading: 'One behavior per test',
              body: 'A test should verify **one behavior** — not one assert necessarily, but one reason to fail. When a test checks login AND validation AND redirect, a failure tells you almost nothing. Small focused tests turn a red suite into a precise diagnosis: the name of the failing test IS the bug report.',
            },
          ],
          codeSamples: [
            {
              title: 'AAA in practice',
              filename: 'cart.service.spec.ts',
              language: 'typescript',
              code: "describe('CartService', () => {\n  let cart: CartService;\n\n  beforeEach(() => {\n    cart = new CartService();      // fresh world for EVERY test\n  });\n\n  it('totals the prices of added items', () => {\n    // Arrange\n    cart.add({ name: 'Book', price: 12 });\n    cart.add({ name: 'Pen', price: 3 });\n\n    // Act\n    const total = cart.total();\n\n    // Assert\n    expect(total).toBe(15);\n  });\n\n  it('starts empty', () => {\n    expect(cart.count()).toBe(0);\n  });\n});",
              annotations: [
                { line: 5, note: 'beforeEach: no test depends on another — isolation by construction.' },
                { line: 9, note: 'The three phases, visually separated. Readable at a glance.' },
                { line: 20, note: 'Tiny tests are fine — one behavior, one reason to fail.' },
              ],
              explanation:
                'Fresh instance per test + AAA shape + sentence-like names: the template for every unit test you will write.',
            },
          ],
          keyPoints: [
            'AAA: Arrange the world, Act once, Assert the outcome — keep phases visible.',
            '`describe` groups; `it` names one case ("it returns/rejects/updates...").',
            '`beforeEach` gives every test a fresh world — isolation by default.',
            'One behavior per test: the failing test’s name IS the bug report.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What are the three phases of a well-shaped test?',
              options: [
                { id: 'a', text: 'Write, run, debug', correct: false },
                { id: 'b', text: 'Arrange, Act, Assert', correct: true },
                { id: 'c', text: 'Setup, teardown, retry', correct: false },
                { id: 'd', text: 'Mock, stub, spy', correct: false },
              ],
              explanation:
                'Set up the world, perform the one action, verify the outcome — AAA.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why does beforeEach create a NEW service instance per test?',
              options: [
                { id: 'a', text: 'For speed', correct: false },
                { id: 'b', text: 'Isolation — no test can be affected by another’s leftover state', correct: true },
                { id: 'c', text: 'Memory limits', correct: false },
                { id: 'd', text: 'Syntax requirement', correct: false },
              ],
              explanation:
                'Shared state between tests creates order-dependent flakiness — fresh worlds prevent it by construction.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which is the best test name?',
              options: [
                { id: 'a', text: "it('works')", correct: false },
                { id: 'b', text: "it('returns 0 for an empty cart')", correct: true },
                { id: 'c', text: "it('test1')", correct: false },
                { id: 'd', text: "it('cart')", correct: false },
              ],
              explanation:
                'The name states the behavior — when it fails, you know exactly what broke without reading code.',
            },
          ],
        },
        {
          id: 'testing-pyramid',
          title: 'The testing pyramid',
          minutes: 10,
          blurb: 'Unit, integration, e2e — where to spend your budget.',
          concept: [
            {
              heading: 'Three layers, three trade-offs',
              body: '**Unit tests** check one piece in isolation: milliseconds fast, pinpoint failures, thousands are normal. **Integration tests** check pieces working together (component + service, service + HTTP layer): slower, broader confidence. **E2E tests** drive the real app in a real browser: highest realism, slowest, most fragile. The pyramid: many units, fewer integrations, few e2e.',
            },
            {
              heading: 'Why a pyramid and not a square',
              body: 'Speed and diagnosis. A thousand unit tests run in seconds and a failure names the exact function; twenty e2e tests take minutes and a failure says "something in checkout is wrong — somewhere". Slow suites stop being run; vague failures stop being trusted. The pyramid maximizes confidence per second of feedback.',
            },
            {
              heading: 'The modern nuance',
              body: 'Frontend testing has shifted slightly toward the middle: component tests (rendering a real component with fakes behind it) often deliver more confidence than micro-units, at nearly the same speed — "integration-leaning" testing popularized by Testing Library. The principle stands: cheap-and-precise in bulk, expensive-and-realistic sparingly, **e2e for the few journeys that must never break** (login, checkout, publish).',
            },
          ],
          codeSamples: [
            {
              title: 'The same feature at three altitudes',
              filename: 'three-altitudes.ts',
              language: 'typescript',
              code: "// UNIT: the pricing logic alone — milliseconds\nit('applies bulk discount over 10 items', () => {\n  expect(price(11, 10)).toBe(99);\n});\n\n// INTEGRATION: component + real pricing service, fake HTTP\nit('shows the discounted total in the cart', async () => {\n  // render CartComponent with PricingService, HTTP faked\n  expect(screen.getByText('Total: $99')).toBeTruthy();\n});\n\n// E2E: the journey that must never break — minutes\ntest('user can buy a discounted basket', async ({ page }) => {\n  await page.goto('/shop');\n  // add 11 items, checkout, pay with test card...\n  await expect(page.getByText('Order confirmed')).toBeVisible();\n});",
              annotations: [
                { line: 2, note: 'Unit: exact logic, instant feedback, precise failure.' },
                { line: 7, note: 'Integration: real wiring, fake edges — the confidence sweet spot.' },
                { line: 13, note: 'E2E: reserved for the journeys whose breakage is unacceptable.' },
              ],
              explanation:
                'One feature, three altitudes — each answers a different question at a different cost.',
            },
          ],
          keyPoints: [
            'Units: fast, precise, many. Integration: broader, fewer. E2E: realistic, few.',
            'Slow suites stop being run; vague failures stop being trusted — hence the pyramid.',
            'Modern frontend leans on component/integration tests for the middle.',
            'Reserve e2e for must-never-break journeys: login, checkout, publish.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why not write mostly e2e tests since they are the most realistic?',
              options: [
                { id: 'a', text: 'They are too easy', correct: false },
                { id: 'b', text: 'They are slow and their failures are vague — feedback degrades until nobody runs or trusts them', correct: true },
                { id: 'c', text: 'Browsers forbid it', correct: false },
                { id: 'd', text: 'Realism does not matter', correct: false },
              ],
              explanation:
                'Confidence per second favors many fast precise tests with a thin realistic top layer.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'A failure in which layer gives the most precise diagnosis?',
              options: [
                { id: 'a', text: 'E2E', correct: false },
                { id: 'b', text: 'Unit — it names the exact function and case', correct: true },
                { id: 'c', text: 'Manual testing', correct: false },
                { id: 'd', text: 'All equal', correct: false },
              ],
              explanation:
                'A red unit test points at one function with one input — minutes saved per failure.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which scenarios deserve the few e2e slots?',
              options: [
                { id: 'a', text: 'Every button on every page', correct: false },
                { id: 'b', text: 'The critical journeys that must never break: login, checkout, core flows', correct: true },
                { id: 'c', text: 'CSS colors', correct: false },
                { id: 'd', text: 'Helper functions', correct: false },
              ],
              explanation:
                'E2E is expensive; spend it where breakage is catastrophic, not on what cheaper layers already cover.',
            },
          ],
        },
        {
          id: 'what-to-test',
          title: 'What to test (and what not to)',
          minutes: 11,
          blurb: 'Behavior over implementation — the rule that keeps tests valuable.',
          concept: [
            {
              heading: 'Test behavior, not implementation',
              body: 'THE rule of maintainable tests: assert **what the code promises** (outputs, visible state, emitted events), never **how it does it** (private methods, internal call order, field names). Implementation-coupled tests break on every refactor even when behavior is intact — they punish improvement. Behavior tests survive refactors and fail only when something REAL broke.',
            },
            {
              heading: 'Where the value concentrates',
              body: 'High value: business logic with decisions (pricing, validation, permissions), edge cases (empty, zero, max, malformed), bug regressions, error paths. Low value: trivial getters, framework behavior (Angular renders bindings — Google tested that), third-party libraries, private helpers (test them THROUGH the public API). When a private helper feels test-worthy, it usually wants to be its own exported, directly-tested module.',
            },
            {
              heading: 'Coverage — useful servant, terrible master',
              body: '**Coverage** measures which lines executed during tests — useful for finding **untested zones**. But 100% coverage proves nothing about assertion quality: a test that calls everything and asserts nothing scores perfectly. Chasing a coverage number produces exactly such tests. Sane teams: ~80% on business logic, 0% guilt on boilerplate, and attention on what the numbers cannot see — assertion strength.',
            },
          ],
          codeSamples: [
            {
              title: 'Implementation-coupled vs behavior-focused',
              filename: 'compare.spec.ts',
              language: 'typescript',
              code: "// BRITTLE: tests HOW — breaks on any refactor\nit('calls validateEmail then checkDomain', () => {\n  const spy1 = spyOn(svc as any, 'validateEmail');\n  const spy2 = spyOn(svc as any, 'checkDomain');\n  svc.register('a@b.com');\n  expect(spy1).toHaveBeenCalledBefore(spy2);   // who cares?!\n});\n\n// VALUABLE: tests WHAT — survives any refactor\nit('rejects registration with an invalid email', () => {\n  const result = svc.register('not-an-email');\n  expect(result.ok).toBe(false);\n  expect(result.error).toBe('INVALID_EMAIL');\n});",
              annotations: [
                { line: 3, note: 'Spying on privates: the test now mirrors the implementation.' },
                { line: 6, note: 'Internal call order is not a promise to anyone.' },
                { line: 11, note: 'Public input → public outcome: the actual contract.' },
              ],
              explanation:
                'Rewrite the internals entirely and the second test still passes — until the CONTRACT breaks. That is the point.',
            },
          ],
          keyPoints: [
            'Assert the contract (outputs, state, events) — never internals or call order.',
            'High value: decisions, edge cases, error paths, bug regressions.',
            'Skip: trivial code, framework features, third-party libraries.',
            'Coverage finds untested zones; it cannot measure assertion quality. ~80% logic, no boilerplate guilt.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why do implementation-coupled tests hurt a codebase?',
              options: [
                { id: 'a', text: 'They run slower', correct: false },
                { id: 'b', text: 'They break on refactors even when behavior is fine — punishing improvement', correct: true },
                { id: 'c', text: 'They use more memory', correct: false },
                { id: 'd', text: 'They do not hurt', correct: false },
              ],
              explanation:
                'Tests welded to internals turn every cleanup into red builds — so cleanups stop happening.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'A suite reaches 100% coverage with zero meaningful assertions. What did coverage prove?',
              options: [
                { id: 'a', text: 'The code is correct', correct: false },
                { id: 'b', text: 'Only that lines executed — nothing about whether outcomes were verified', correct: true },
                { id: 'c', text: 'The tests are good', correct: false },
                { id: 'd', text: 'Nothing can be 100%', correct: false },
              ],
              explanation:
                'Coverage counts execution, not verification — a perfect score can hide an assertion-free suite.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'How should private helper functions be tested?',
              options: [
                { id: 'a', text: 'With (service as any) access', correct: false },
                { id: 'b', text: 'Through the public API that uses them — or extract them into their own module', correct: true },
                { id: 'c', text: 'Never', correct: false },
                { id: 'd', text: 'Only in e2e', correct: false },
              ],
              explanation:
                'Privates are implementation; exercise them via the contract, or promote them to a first-class tested unit.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 2 — UNIT TESTING CRAFT
    // ===================================================================
    {
      id: 'l2-unit',
      order: 2,
      title: 'Level 2 — Unit testing craft',
      goal: 'Master matchers, edge-case thinking, and the taxonomy of test doubles — stubs, spies, mocks and fakes.',
      lessons: [
        {
          id: 'pure-logic',
          title: 'Testing pure logic & edge cases',
          minutes: 10,
          blurb: 'The easiest tests to write — and the discipline of edges.',
          concept: [
            {
              heading: 'Pure functions: the testing paradise',
              body: 'A **pure function** (same input → same output, no side effects) is trivially testable: call it, assert the result — no setup, no fakes, no async. This is a design lever: the more logic you move into pure functions (and out of components/services), the more of your system enjoys paradise-grade testing. Calculations, transformations, validation rules — all extractable.',
            },
            {
              heading: 'The edge-case checklist',
              body: 'Bugs live at the edges. For every function ask: **empty** (empty array/string, null/undefined), **zero/negative** numbers, **one vs many**, **boundaries** (exactly at the limit, one above, one below), **duplicates**, **malformed input**. Five minutes with this checklist catches what a "happy path" test never will. The boundary trio — limit-1, limit, limit+1 — is the highest-yield habit in testing.',
            },
            {
              heading: 'Parameterized tests',
              body: 'Many inputs, same logic? Write the test once, feed it cases: `it.each` (Jest/Vitest) or a simple loop over `[input, expected]` pairs. Ten edge cases become ten table rows instead of ten copy-pasted blocks — and adding a regression case is appending one line.',
            },
          ],
          codeSamples: [
            {
              title: 'A table of edges',
              filename: 'discount.spec.ts',
              language: 'typescript',
              code: "const cases: Array<[number, number]> = [\n  [0, 0],        // empty cart\n  [1, 100],      // single item, no discount\n  [9, 900],      // just below the bulk threshold\n  [10, 900],     // exactly at threshold — 10% off\n  [11, 990],     // above threshold\n];\n\nfor (const [qty, expected] of cases) {\n  it('prices ' + qty + ' items as ' + expected, () => {\n    expect(totalPrice(qty, 100)).toBe(expected);\n  });\n}\n\nit('throws for negative quantities', () => {\n  expect(() => totalPrice(-1, 100)).toThrowError('Invalid quantity');\n});",
              annotations: [
                { line: 4, note: 'The boundary trio: 9, 10, 11 — below, at, above the threshold.' },
                { line: 9, note: 'One test body, many cases — regression = one new row.' },
                { line: 15, note: 'Invalid input behavior is part of the contract too.' },
              ],
              explanation:
                'The table reads as a specification of the discount rule — edges first, happy path almost incidental.',
            },
          ],
          keyPoints: [
            'Pure functions test with zero setup — extract logic into them deliberately.',
            'Edge checklist: empty, zero/negative, one-vs-many, boundaries, duplicates, malformed.',
            'Boundary trio (limit-1, limit, limit+1) — the highest-yield testing habit.',
            'Parameterize repeated cases into tables; regressions become one-line additions.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why are pure functions the easiest code to test?',
              options: [
                { id: 'a', text: 'They are shorter', correct: false },
                { id: 'b', text: 'Same input → same output, no side effects: call and assert, nothing to fake', correct: true },
                { id: 'c', text: 'They skip the compiler', correct: false },
                { id: 'd', text: 'They are not easier', correct: false },
              ],
              explanation:
                'No state, no time, no I/O — the test is literally input vs expected output.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'A discount activates at 10 items. The minimal boundary test set is:',
              options: [
                { id: 'a', text: '10 only', correct: false },
                { id: 'b', text: '9, 10, and 11 — below, at, and above the boundary', correct: true },
                { id: 'c', text: '1 and 1000', correct: false },
                { id: 'd', text: 'Any random numbers', correct: false },
              ],
              explanation:
                'Off-by-one bugs live exactly at boundaries — the trio catches >= vs > mistakes instantly.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What design improvement makes a codebase more testable overall?',
              options: [
                { id: 'a', text: 'More comments', correct: false },
                { id: 'b', text: 'Extracting decisions/calculations into pure functions, out of components', correct: true },
                { id: 'c', text: 'Longer files', correct: false },
                { id: 'd', text: 'Global variables', correct: false },
              ],
              explanation:
                'Logic in pure functions = trivially tested; components left thin = less needs heavy test machinery.',
            },
          ],
        },
        {
          id: 'matchers',
          title: 'Matchers & async assertions',
          minutes: 10,
          blurb: 'toBe vs toEqual, errors, promises — asserting precisely.',
          concept: [
            {
              heading: 'toBe vs toEqual — the classic trap',
              body: '`toBe` checks **identity** (===): perfect for primitives, almost always wrong for objects — two structurally identical objects are different references, so `expect({a:1}).toBe({a:1})` FAILS. `toEqual` compares **structure** deeply: the object/array matcher. Rule: primitives → toBe; objects/arrays → toEqual.',
            },
            {
              heading: 'The everyday matcher kit',
              body: '`toContain` (array/string membership), `toBeTruthy/toBeFalsy` (use sparingly — `toBe(true)` is stricter), `toBeNull`, `toBeUndefined`, `toBeGreaterThan`, `toMatch(/regex/)`, and the negator `.not.` before any matcher. For floating point: `toBeCloseTo(0.3)` — never `toBe(0.3)` (0.1+0.2 strikes again). Partial object checks: `toEqual(jasmine.objectContaining({ id: 1 }))`.',
            },
            {
              heading: 'Errors and async',
              body: 'Exceptions: wrap the call — `expect(() => fn(bad)).toThrowError(...)` (forgetting the wrapper arrow is THE classic mistake: the error throws before expect runs). Async: make the test `async` and `await expectAsync(promise).toBeResolvedTo(value)` (Jasmine) or `await expect(promise).resolves.toBe(value)` (Jest/Vitest). A test that finishes before its async assertion is a false green — always await.',
            },
          ],
          codeSamples: [
            {
              title: 'Precise assertions',
              filename: 'matchers.spec.ts',
              language: 'typescript',
              code: "it('demonstrates the kit', async () => {\n  // identity vs structure\n  expect(2 + 2).toBe(4);\n  expect(getUser()).toEqual({ id: 1, name: 'Ada' });   // NOT toBe!\n\n  // membership, ranges, regex\n  expect(tags()).toContain('css');\n  expect(score()).toBeGreaterThan(80);\n  expect(slug()).toMatch(/^[a-z-]+$/);\n\n  // floating point — never toBe\n  expect(0.1 + 0.2).toBeCloseTo(0.3);\n\n  // errors: note the wrapper arrow!\n  expect(() => parsePrice('abc')).toThrowError('Invalid price');\n\n  // async: always await the assertion\n  await expectAsync(fetchUser(1)).toBeResolvedTo(\n    jasmine.objectContaining({ id: 1 })\n  );\n});",
              annotations: [
                { line: 4, note: 'Structural comparison for objects — toBe would fail on references.' },
                { line: 12, note: '0.1 + 0.2 === 0.30000000000000004 — toBeCloseTo exists for this.' },
                { line: 15, note: 'Without () => the error throws BEFORE expect can catch it.' },
                { line: 18, note: 'Unawaited async assertions = tests that pass while broken.' },
              ],
              explanation:
                'Five matcher habits — toEqual for objects, closeTo for floats, wrapped throws, awaited async, objectContaining for partials — prevent five classic false results.',
            },
          ],
          keyPoints: [
            'Primitives → `toBe` (===); objects/arrays → `toEqual` (deep structure).',
            'Floats → `toBeCloseTo`; partial objects → `objectContaining`.',
            'Errors: `expect(() => fn()).toThrowError(...)` — the wrapper arrow is mandatory.',
            'Async assertions must be awaited — otherwise the test passes before checking.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: "Why does expect({ id: 1 }).toBe({ id: 1 }) fail?",
              options: [
                { id: 'a', text: 'Syntax error', correct: false },
                { id: 'b', text: 'toBe compares identity — two literals are different references; use toEqual', correct: true },
                { id: 'c', text: 'Objects cannot be asserted', correct: false },
                { id: 'd', text: 'It passes', correct: false },
              ],
              explanation:
                'toBe is ===; structurally identical objects are still distinct references. toEqual compares contents.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is wrong with expect(parsePrice("abc")).toThrowError(...)?',
              options: [
                { id: 'a', text: 'Nothing', correct: false },
                { id: 'b', text: 'The function runs (and throws) BEFORE expect — wrap it: expect(() => parsePrice("abc"))', correct: true },
                { id: 'c', text: 'toThrowError is deprecated', correct: false },
                { id: 'd', text: 'Strings cannot throw', correct: false },
              ],
              explanation:
                'expect needs a function to CALL and catch; passing the result means the throw escapes uncaught.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'A test asserts on a promise without await and always passes. Why is that dangerous?',
              options: [
                { id: 'a', text: 'It is fine', correct: false },
                { id: 'b', text: 'The test ends before the assertion runs — a false green hiding real failures', correct: true },
                { id: 'c', text: 'Promises are not testable', correct: false },
                { id: 'd', text: 'It runs twice', correct: false },
              ],
              explanation:
                'Unawaited async checks happen after the test completes — failures are silently swallowed.',
            },
          ],
        },
        {
          id: 'test-doubles',
          title: 'Test doubles: stub, spy, mock, fake',
          minutes: 12,
          blurb: 'The stand-in taxonomy — and which to reach for.',
          concept: [
            {
              heading: 'Why doubles exist',
              body: 'Real dependencies make tests slow (HTTP), nondeterministic (time, random), dangerous (payments!), or unavailable (a teammate’s unfinished service). A **test double** stands in for the real thing so you control the world. The art is replacing the **edges** (I/O, network, clock) while keeping the **logic under test real**.',
            },
            {
              heading: 'The taxonomy',
              body: '**Stub**: returns canned answers — controls the INPUT side ("when getUser is called, return Ada"). **Spy**: records calls — observes the OUTPUT side ("was sendEmail called once, with this address?"). **Mock**: a spy with built-in expectations. **Fake**: a working lightweight implementation (in-memory repository instead of a database) — best for complex dependencies used across many tests. In Jasmine, `jasmine.createSpyObj` covers stub+spy in one object.',
            },
            {
              heading: 'The overmocking disease',
              body: 'The classic failure mode: mocking EVERYTHING, including the logic you meant to test — the suite then verifies that mocks call mocks: green forever, catching nothing, breaking on every refactor. Rules of thumb: never mock the unit under test; prefer real collaborators when they are fast and pure; mock at the system boundary (HTTP, storage, clock), not between every class.',
            },
          ],
          codeSamples: [
            {
              title: 'Stub the input, spy the output',
              filename: 'orders.spec.ts',
              language: 'typescript',
              code: "it('emails a receipt after a successful order', async () => {\n  // Arrange: stub the data edge, spy the action edge\n  const api = jasmine.createSpyObj<PaymentApi>('api', ['charge']);\n  api.charge.and.resolveTo({ ok: true, id: 'tx_1' });\n\n  const mailer = jasmine.createSpyObj<Mailer>('mailer', ['send']);\n\n  const orders = new OrderService(api, mailer);   // real logic under test\n\n  // Act\n  await orders.checkout({ total: 50, email: 'a@b.com' });\n\n  // Assert: the OUTPUT side — what the unit did to the world\n  expect(api.charge).toHaveBeenCalledOnceWith(50);\n  expect(mailer.send).toHaveBeenCalledWith(\n    'a@b.com',\n    jasmine.stringContaining('tx_1')\n  );\n});",
              annotations: [
                { line: 4, note: 'Stub: canned answer controls the world the unit sees.' },
                { line: 8, note: 'The service itself is REAL — that is what we are testing.' },
                { line: 13, note: 'Spy assertions: exactly once, with the right argument.' },
              ],
              explanation:
                'Edges faked, core real, outcomes asserted — the balanced double recipe.',
            },
          ],
          keyPoints: [
            'Stub = canned answers (input side); spy = call recorder (output side); fake = mini real implementation.',
            'Fake the edges (HTTP, clock, storage); keep the unit under test REAL.',
            'Overmocking = mocks verifying mocks: always green, worthless, refactor-brittle.',
            '`jasmine.createSpyObj` + `and.returnValue/resolveTo` covers most needs.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: '"When getConfig() is called, return this test config" describes a:',
              options: [
                { id: 'a', text: 'Spy', correct: false },
                { id: 'b', text: 'Stub — canned answers controlling the input side', correct: true },
                { id: 'c', text: 'Fake database', correct: false },
                { id: 'd', text: 'E2E test', correct: false },
              ],
              explanation:
                'Stubs feed the unit controlled data; spies (the other side) record what the unit did.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: '"Verify sendEmail was called exactly once with this address" needs a:',
              options: [
                { id: 'a', text: 'Stub', correct: false },
                { id: 'b', text: 'Spy — it records calls and arguments for assertion', correct: true },
                { id: 'c', text: 'Real mail server', correct: false },
                { id: 'd', text: 'Coverage report', correct: false },
              ],
              explanation:
                'Observing outgoing interactions is exactly what spies exist for.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What is the symptom of an overmocked test suite?',
              options: [
                { id: 'a', text: 'Tests run too slowly', correct: false },
                { id: 'b', text: 'Always green yet catches nothing, and breaks on refactors — mocks verifying mocks', correct: true },
                { id: 'c', text: 'Too few files', correct: false },
                { id: 'd', text: 'High memory use', correct: false },
              ],
              explanation:
                'When everything including the logic is mocked, tests assert the wiring of fakes — zero real confidence.',
            },
          ],
        },
        {
          id: 'di-testing',
          title: 'DI — the door tests walk through',
          minutes: 10,
          blurb: 'Why dependency injection makes everything testable.',
          concept: [
            {
              heading: 'The untestable pattern',
              body: 'A class that does `this.api = new HttpApi()` inside its constructor has **welded** its dependency: no test can substitute a fake without monkey-patching globals. The fix you already know from Angular: dependencies arrive **from outside** — constructor parameters or `inject()`. Now a test passes fakes; production passes the real thing. DI is not framework ceremony — it is the seam where tests enter.',
            },
            {
              heading: 'Injecting time and randomness',
              body: 'The forgotten dependencies: `new Date()` and `Math.random()` inside logic make tests nondeterministic. Treat them as dependencies too — inject a clock (`now: () => Date`) or use the test framework’s fake timers (`jasmine.clock()`, `vi.useFakeTimers()`) to **control time**: set a date, fast-forward 30 seconds, assert the timeout fired. Deterministic tests or no peace.',
            },
            {
              heading: 'Designing for testability',
              body: 'Testability pressure produces better design — the same qualities make code reusable and comprehensible: explicit dependencies (no hidden globals), separation of decisions (pure logic) from effects (I/O at the edges), small focused units. If a test needs heroic setup, the code is telling you its design hurts — listen.',
            },
          ],
          codeSamples: [
            {
              title: 'From welded to injectable',
              filename: 'session.spec.ts',
              language: 'typescript',
              code: "// BEFORE: untestable — dependencies welded inside\nclass SessionBad {\n  private api = new HttpApi();             // cannot substitute\n  isExpired() { return Date.now() > this.exp; }   // uncontrollable\n}\n\n// AFTER: dependencies enter from outside\nclass Session {\n  constructor(\n    private api: AuthApi,                  // interface, not concrete\n    private now: () => number = Date.now  // injectable clock\n  ) {}\n  isExpired() { return this.now() > this.exp; }\n}\n\n// the test controls the whole world\nit('expires after the deadline', () => {\n  const session = new Session(fakeApi, () => DEADLINE + 1);\n  expect(session.isExpired()).toBe(true);\n});",
              annotations: [
                { line: 3, note: 'new inside = welded: tests cannot reach this seam.' },
                { line: 11, note: 'The clock as a parameter with a sane default — zero production cost.' },
                { line: 18, note: 'Time travel in tests: just pass a different function.' },
              ],
              explanation:
                'One refactor — dependencies as parameters — and the untestable becomes trivially testable. This is why Angular is built on DI.',
            },
          ],
          keyPoints: [
            '`new` inside a class welds dependencies; injection opens the seam for fakes.',
            'Time and randomness are dependencies too — inject clocks or use fake timers.',
            'Heroic test setup = design feedback: untangle the code, not the test.',
            'The same qualities that enable testing (explicit deps, pure cores) improve all design.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why does new HttpApi() inside a constructor hurt testability?',
              options: [
                { id: 'a', text: 'It is slow to construct', correct: false },
                { id: 'b', text: 'Tests cannot substitute a fake — the dependency is welded in', correct: true },
                { id: 'c', text: 'new is deprecated', correct: false },
                { id: 'd', text: 'It does not', correct: false },
              ],
              explanation:
                'The class controls its own dependencies, leaving no seam; injection inverts that control.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'How do you make code using Date.now() deterministic in tests?',
              options: [
                { id: 'a', text: 'Run tests at midnight', correct: false },
                { id: 'b', text: 'Inject a clock function (or use fake timers) so the test sets the time', correct: true },
                { id: 'c', text: 'Avoid testing it', correct: false },
                { id: 'd', text: 'Retry until it passes', correct: false },
              ],
              explanation:
                'Time as an injectable dependency (or framework fake timers) puts the test in control of "now".',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'A test needs 60 lines of setup before one assertion. The deepest lesson is:',
              options: [
                { id: 'a', text: 'Tests are just hard', correct: false },
                { id: 'b', text: 'The code’s design is tangled — testability pain is design feedback', correct: true },
                { id: 'c', text: 'Use more mocks', correct: false },
                { id: 'd', text: 'Skip the test', correct: false },
              ],
              explanation:
                'Heroic setup signals hidden coupling and mixed responsibilities — fix the design and the test shrinks.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 3 — TESTING ANGULAR
    // ===================================================================
    {
      id: 'l3-angular',
      order: 3,
      title: 'Level 3 — Testing Angular',
      goal: 'Test components with TestBed, simulate user interaction, fake HTTP, and use harnesses for Material.',
      lessons: [
        {
          id: 'testbed-basics',
          title: 'TestBed & component fixtures',
          minutes: 12,
          blurb: 'Render a real component in a test — the Angular way.',
          concept: [
            {
              heading: 'TestBed: a miniature Angular app',
              body: '`TestBed.configureTestingModule({ imports: [MyComponent], providers: [...] })` builds a tiny Angular environment per test, where you override real providers with fakes. `TestBed.createComponent(MyComponent)` returns a **fixture**: a handle holding both the component instance (`fixture.componentInstance`) and its rendered DOM (`fixture.nativeElement`).',
            },
            {
              heading: 'detectChanges — the manual heartbeat',
              body: 'In tests, change detection does NOT run automatically: set a property, and the DOM updates only after `fixture.detectChanges()`. This trips everyone once — "I changed the value, why is the HTML old?!". The first `detectChanges()` also triggers `ngOnInit`. With signal-based components and zoneless setups, `await fixture.whenStable()` becomes the rhythm — but the principle stands: the TEST controls when rendering happens.',
            },
            {
              heading: 'Asserting on the DOM',
              body: 'Query the rendered output: `fixture.nativeElement.querySelector(\'h2\')` for plain DOM, or `fixture.debugElement.query(By.css(\'.title\'))` for Angular’s wrapper. Assert **what the user sees**: text content, presence/absence of elements, disabled states — the behavior rule from Level 1 applied to templates: assert rendered output, not component internals.',
            },
          ],
          codeSamples: [
            {
              title: 'A component test, end to end',
              filename: 'greeting.component.spec.ts',
              language: 'typescript',
              code: "describe('GreetingComponent', () => {\n  let fixture: ComponentFixture<GreetingComponent>;\n\n  beforeEach(async () => {\n    await TestBed.configureTestingModule({\n      imports: [GreetingComponent],          // standalone: just import it\n    }).compileComponents();\n\n    fixture = TestBed.createComponent(GreetingComponent);\n  });\n\n  it('renders the user name after init', () => {\n    fixture.componentRef.setInput('name', 'Kosay');\n\n    fixture.detectChanges();                 // render!\n\n    const h2 = fixture.nativeElement.querySelector('h2');\n    expect(h2.textContent).toContain('Welcome, Kosay');\n  });\n});",
              annotations: [
                { line: 6, note: 'Standalone components import directly — no declarations array.' },
                { line: 13, note: 'setInput: the official way to set @Input/signal inputs in tests.' },
                { line: 15, note: 'No detectChanges, no render — the most common test confusion.' },
                { line: 18, note: 'Assert what the USER sees — rendered text, not internals.' },
              ],
              explanation:
                'Configure → create → setInput → detectChanges → assert DOM: the five-step rhythm of every component test.',
            },
          ],
          keyPoints: [
            'TestBed builds a mini app; the fixture holds instance + rendered DOM.',
            '`detectChanges()` renders manually — nothing updates without it (first call runs ngOnInit).',
            '`componentRef.setInput()` sets inputs (decorator or signal) properly.',
            'Assert rendered output (text, elements, states) — not component internals.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'You set a component property in a test but the DOM shows old content. Why?',
              options: [
                { id: 'a', text: 'A framework bug', correct: false },
                { id: 'b', text: 'Change detection is manual in tests — call fixture.detectChanges()', correct: true },
                { id: 'c', text: 'The DOM is read-only', correct: false },
                { id: 'd', text: 'Properties cannot change in tests', correct: false },
              ],
              explanation:
                'Tests control the rendering heartbeat explicitly — set state, then detectChanges, then assert.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does the fixture give you?',
              options: [
                { id: 'a', text: 'Only the component instance', correct: false },
                { id: 'b', text: 'The instance AND its rendered DOM, plus rendering control', correct: true },
                { id: 'c', text: 'The production build', correct: false },
                { id: 'd', text: 'A browser window', correct: false },
              ],
              explanation:
                'componentInstance, nativeElement/debugElement, detectChanges — the complete test handle.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'The proper way to set a signal input in a component test:',
              options: [
                { id: 'a', text: 'component.name = "x"', correct: false },
                { id: 'b', text: "fixture.componentRef.setInput('name', 'x')", correct: true },
                { id: 'c', text: 'Editing the template', correct: false },
                { id: 'd', text: 'localStorage', correct: false },
              ],
              explanation:
                'setInput works for both decorator and signal inputs and triggers the right change tracking.',
            },
          ],
        },
        {
          id: 'interaction-outputs',
          title: 'Clicks, inputs & outputs',
          minutes: 11,
          blurb: 'Simulate the user; catch what the component emits.',
          concept: [
            {
              heading: 'Simulating interaction',
              body: 'Find the element, fire the event, re-render, assert: `button.click(); fixture.detectChanges(); expect(...)`. For form fields: set `input.value`, then dispatch `new Event(\'input\')` so Angular notices (setting value alone bypasses the framework’s listeners — second classic confusion). This sequence IS a user action in miniature.',
            },
            {
              heading: 'Catching outputs',
              body: 'Outputs are observables-ish: subscribe in the test, act, assert what arrived: `component.saved.subscribe(v => received = v)` then click the save button and expect `received` to be the payload. This tests the component’s **contract**: given this interaction, it emits this event — exactly what parents rely on.',
            },
            {
              heading: 'The user-centric alternative',
              body: '**Angular Testing Library** wraps TestBed with a philosophy: query like a user (`getByRole(\'button\', { name: \'Save\' })`, `getByLabelText(\'Email\')`), interact via `userEvent`. Tests become resilient (renames of CSS classes do not break them) and accessibility-aware (if getByRole cannot find your button, neither can a screen reader). Worth adopting; the underlying mechanics are what you just learned.',
            },
          ],
          codeSamples: [
            {
              title: 'A full interaction test',
              filename: 'search-box.component.spec.ts',
              language: 'typescript',
              code: "it('emits the trimmed query when search is clicked', () => {\n  // Arrange: render + capture the output\n  let emitted: string | undefined;\n  component.search.subscribe((q: string) => (emitted = q));\n  fixture.detectChanges();\n\n  // Act: type like a user...\n  const input: HTMLInputElement =\n    fixture.nativeElement.querySelector('input');\n  input.value = '  angular  ';\n  input.dispatchEvent(new Event('input'));    // tell Angular!\n\n  // ...and click\n  fixture.nativeElement.querySelector('button').click();\n  fixture.detectChanges();\n\n  // Assert: the contract\n  expect(emitted).toBe('angular');\n});",
              annotations: [
                { line: 4, note: 'Subscribe BEFORE acting — outputs are caught live.' },
                { line: 11, note: 'Without dispatchEvent, Angular never sees the typed value.' },
                { line: 18, note: 'The contract: trimmed value emitted — implementation free to change.' },
              ],
              explanation:
                'Subscribe → type (value + event) → click → detectChanges → assert emission: the interaction testing rhythm.',
            },
          ],
          keyPoints: [
            'Interaction = find element → fire event → `detectChanges` → assert.',
            'Form fields need `dispatchEvent(new Event(\'input\'))` after setting `.value`.',
            'Outputs: subscribe in the test, act, assert the emitted payload.',
            'Testing Library queries by role/label — resilient AND accessibility-checking.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'You set input.value = "x" but the component’s form control stays empty. Why?',
              options: [
                { id: 'a', text: 'Forms are untestable', correct: false },
                { id: 'b', text: 'Angular listens to events — dispatch new Event("input") after setting value', correct: true },
                { id: 'c', text: 'Wrong TypeScript version', correct: false },
                { id: 'd', text: 'detectChanges deletes it', correct: false },
              ],
              explanation:
                'Setting .value bypasses listeners; the input event is what tells Angular a user typed.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'How do you verify a component emits its output correctly?',
              options: [
                { id: 'a', text: 'Check a private field', correct: false },
                { id: 'b', text: 'Subscribe to the output in the test, trigger the action, assert the received value', correct: true },
                { id: 'c', text: 'console.log', correct: false },
                { id: 'd', text: 'It cannot be tested', correct: false },
              ],
              explanation:
                'The output IS the contract — capture it like a parent component would and assert the payload.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why does Testing Library favor getByRole over CSS-class queries?',
              options: [
                { id: 'a', text: 'Speed', correct: false },
                { id: 'b', text: 'Resilience (classes change freely) + it verifies accessibility along the way', correct: true },
                { id: 'c', text: 'Classes are deprecated', correct: false },
                { id: 'd', text: 'No reason', correct: false },
              ],
              explanation:
                'Querying as users (and assistive tech) do decouples tests from styling AND audits semantics for free.',
            },
          ],
        },
        {
          id: 'http-testing',
          title: 'Services & HttpTestingController',
          minutes: 11,
          blurb: 'Test data services with full control of the network.',
          concept: [
            {
              heading: 'No real HTTP in unit tests',
              body: 'Real requests make tests slow, flaky, and dependent on servers. Angular ships a faking layer: `provideHttpClientTesting()` replaces the HTTP backend with a **controller** you script: the service runs its REAL logic, but requests land in your hands instead of the network.',
            },
            {
              heading: 'The expect-and-flush rhythm',
              body: 'The flow: call the service method (subscribing); `httpMock.expectOne(\'/api/users\')` intercepts the pending request (and fails the test if zero or two were made — free protection against duplicate calls!); inspect it (`req.request.method`, headers, body); then `req.flush(fakeData)` delivers the response — now assert what the service produced. Error paths: `req.flush(\'fail\', { status: 500, statusText: \'Server Error\' })`.',
            },
            {
              heading: 'verify() — the leak detector',
              body: '`afterEach(() => httpMock.verify())` fails the test if any request was made that no expectation handled — catching accidental extra calls (a service firing two requests where you expected one) and forgotten flushes. Combined with expectOne’s strictness, your HTTP layer’s exact traffic becomes part of the tested contract.',
            },
          ],
          codeSamples: [
            {
              title: 'A service test with scripted network',
              filename: 'user-api.service.spec.ts',
              language: 'typescript',
              code: "beforeEach(() => {\n  TestBed.configureTestingModule({\n    providers: [provideHttpClient(), provideHttpClientTesting()],\n  });\n  api = TestBed.inject(UserApiService);\n  httpMock = TestBed.inject(HttpTestingController);\n});\n\nafterEach(() => httpMock.verify());        // no unexpected traffic\n\nit('maps and returns active users', () => {\n  let result: User[] = [];\n  api.getActiveUsers().subscribe((u) => (result = u));\n\n  const req = httpMock.expectOne('/api/users?active=true');\n  expect(req.request.method).toBe('GET');\n\n  req.flush([{ id: 1, name: 'Ada', active: true }]);\n\n  expect(result.length).toBe(1);\n  expect(result[0].name).toBe('Ada');\n});",
              annotations: [
                { line: 3, note: 'The testing provider swaps the real backend for the controller.' },
                { line: 9, note: 'verify(): any unhandled request fails the test — leak detection.' },
                { line: 15, note: 'expectOne: intercepts AND asserts exactly one request to this URL.' },
                { line: 18, note: 'flush delivers your scripted response; the real mapping logic runs.' },
              ],
              explanation:
                'Subscribe → expectOne → inspect → flush → assert: the five beats of every HTTP service test.',
            },
          ],
          keyPoints: [
            '`provideHttpClientTesting()` swaps the backend for a scriptable controller.',
            'Rhythm: subscribe → `expectOne(url)` → inspect → `flush(data)` → assert.',
            'Error paths: flush with `{ status: 500 }` — test your catchError handling.',
            '`verify()` in afterEach catches unexpected or unflushed requests.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does req.flush(data) do?',
              options: [
                { id: 'a', text: 'Clears the request', correct: false },
                { id: 'b', text: 'Delivers your scripted response to the pending request, resolving the observable', correct: true },
                { id: 'c', text: 'Sends a real network call', correct: false },
                { id: 'd', text: 'Retries the request', correct: false },
              ],
              explanation:
                'You play the server: flush hands the response to the real service code, which then processes it.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'expectOne fails if TWO requests hit the same URL. Why is that a feature?',
              options: [
                { id: 'a', text: 'It is a bug', correct: false },
                { id: 'b', text: 'Duplicate requests are real defects (missing share, double subscription) — caught for free', correct: true },
                { id: 'c', text: 'Servers only accept one', correct: false },
                { id: 'd', text: 'Performance', correct: false },
              ],
              explanation:
                'Exactly-one semantics turn accidental double-fetch bugs (remember shareReplay?) into immediate test failures.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'How do you test the service’s 500-error handling?',
              options: [
                { id: 'a', text: 'Break the real server', correct: false },
                { id: 'b', text: "req.flush('boom', { status: 500, statusText: 'Server Error' })", correct: true },
                { id: 'c', text: 'You cannot', correct: false },
                { id: 'd', text: 'Throw inside subscribe', correct: false },
              ],
              explanation:
                'Flushing with an error status exercises the catchError path deterministically.',
            },
          ],
        },
        {
          id: 'harnesses-routing',
          title: 'Harnesses & router testing',
          minutes: 10,
          blurb: 'Stable APIs for Material components; testing navigation.',
          concept: [
            {
              heading: 'Component harnesses',
              body: 'Querying Material’s internal DOM (`.mat-mdc-button-touch-target`...) welds tests to private markup that changes between versions. **Harnesses** are official test APIs: `MatButtonHarness`, `MatSelectHarness` — `await select.open(); await select.clickOptions({ text: \'Angular\' })`. The harness knows the internals; your test speaks intent. Your SkillForge Material UI is exactly where these shine.',
            },
            {
              heading: 'Testing routed flows',
              body: '`provideRouter(routes)` + `RouterTestingHarness` render routed components and navigate in-test: `await harness.navigateByUrl(\'/skills/angular\')` then assert the rendered page. Unit-level routing concerns: components reading `ActivatedRoute` get a stubbed route (provide `{ paramMap: of(convertToParamMap({ id: \'1\' })) }`) — remember from the RxJS course: paramMap is a stream, your fake should be too.',
            },
            {
              heading: 'Guards and resolvers',
              body: 'Functional guards are just functions using `inject()` — test them with `TestBed.runInInjectionContext(() => canActivateAdmin(route, state))`, providing a fake auth service, and assert true/false/UrlTree. No component rendering needed: guards are pure decision logic and test like it.',
            },
          ],
          codeSamples: [
            {
              title: 'A harness-driven Material test',
              filename: 'filter.component.spec.ts',
              language: 'typescript',
              code: "it('filters the list via the Material select', async () => {\n  const loader = TestbedHarnessEnvironment.loader(fixture);\n\n  // speak INTENT, not internal DOM\n  const select = await loader.getHarness(MatSelectHarness);\n  await select.open();\n  await select.clickOptions({ text: 'Frontend' });\n\n  const chips = await loader.getAllHarnesses(MatChipHarness);\n  expect(chips.length).toBe(3);\n});\n\n// stubbing the route for a detail component\nproviders: [{\n  provide: ActivatedRoute,\n  useValue: { paramMap: of(convertToParamMap({ skillId: 'angular' })) },\n}]",
              annotations: [
                { line: 2, note: 'The loader finds harnesses inside the fixture.' },
                { line: 6, note: 'open/clickOptions: stable API across Material versions.' },
                { line: 16, note: 'paramMap as an observable — faithful to the real stream contract.' },
              ],
              explanation:
                'Harnesses keep Material tests readable and version-proof; route stubs keep detail pages unit-testable.',
            },
          ],
          keyPoints: [
            'Harnesses = official intent-level APIs for Material — never query its internal DOM.',
            '`RouterTestingHarness` navigates and renders routed components in tests.',
            'Stub `ActivatedRoute` with `paramMap: of(convertToParamMap(...))` — a stream, like the real one.',
            'Functional guards test as plain functions via `runInInjectionContext`.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why use MatSelectHarness instead of querying .mat-select-trigger?',
              options: [
                { id: 'a', text: 'It is shorter', correct: false },
                { id: 'b', text: 'Internal Material DOM changes between versions — harnesses are the stable contract', correct: true },
                { id: 'c', text: 'CSS queries are forbidden', correct: false },
                { id: 'd', text: 'Harnesses are faster', correct: false },
              ],
              explanation:
                'Harnesses encapsulate the private markup; your tests survive Material upgrades.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'How should ActivatedRoute be faked for a detail component?',
              options: [
                { id: 'a', text: 'A plain string id', correct: false },
                { id: 'b', text: 'An object with paramMap as an observable (of(convertToParamMap({...})))', correct: true },
                { id: 'c', text: 'It cannot be faked', correct: false },
                { id: 'd', text: 'window.location', correct: false },
              ],
              explanation:
                'The real paramMap is a stream — the fake mirrors the contract so switchMap pipelines work unchanged.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Testing a functional guard needs:',
              options: [
                { id: 'a', text: 'A full e2e environment', correct: false },
                { id: 'b', text: 'runInInjectionContext + fake providers — it is a function returning a decision', correct: true },
                { id: 'c', text: 'A real login', correct: false },
                { id: 'd', text: 'Guards are untestable', correct: false },
              ],
              explanation:
                'Guards are decision functions using inject(); give them a context and fakes, assert the verdict.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 4 — INTEGRATION & E2E
    // ===================================================================
    {
      id: 'l4-integration-e2e',
      order: 4,
      title: 'Level 4 — Integration & E2E',
      goal: 'Test pieces working together, drive the real app with Playwright, kill flakiness, and manage test data.',
      lessons: [
        {
          id: 'integration-tests',
          title: 'Integration tests done right',
          minutes: 10,
          blurb: 'Real collaborators, faked edges — the confidence sweet spot.',
          concept: [
            {
              heading: 'What integration means here',
              body: 'An integration test wires **real units together** — component + its real service + real pipes — faking only the system edges (HTTP via HttpTestingController, storage, clock). It answers what units cannot: do the pieces actually fit? Wrong assumptions between layers (a service returning null where the component expects []) live exactly here.',
            },
            {
              heading: 'When integration beats unit',
              body: 'Testing a dumb component + its thin service separately, with mocks mirroring each other, yields two brittle tests and zero wiring confidence. One integration test — real both, fake HTTP — covers the pair honestly and survives refactors of the boundary between them. Heuristic: mock-heavy unit tests that mostly restate the implementation → merge them up a level.',
            },
            {
              heading: 'Keeping them fast',
              body: 'Integration ≠ slow, if edges stay fake: no real network, no real timers (fake clocks), no real storage. An Angular component+service+HttpTesting test runs in tens of milliseconds. The suite stays in the watch loop — which is the entire point: confidence you actually run.',
            },
          ],
          codeSamples: [
            {
              title: 'Component + real service + fake HTTP',
              filename: 'skills-page.integration.spec.ts',
              language: 'typescript',
              code: "it('renders skills loaded from the API', async () => {\n  await TestBed.configureTestingModule({\n    imports: [SkillsPageComponent],          // real component\n    providers: [\n      SkillsApiService,                       // REAL service — the wiring under test\n      provideHttpClient(),\n      provideHttpClientTesting(),             // fake edge only\n    ],\n  }).compileComponents();\n\n  const fixture = TestBed.createComponent(SkillsPageComponent);\n  fixture.detectChanges();                    // ngOnInit -> service -> HTTP\n\n  httpMock.expectOne('/api/skills').flush([\n    { id: 'angular', title: 'Angular' },\n    { id: 'rxjs', title: 'RxJS' },\n  ]);\n  fixture.detectChanges();                    // render the arrived data\n\n  const cards = fixture.nativeElement.querySelectorAll('.skill-card');\n  expect(cards.length).toBe(2);\n  expect(cards[0].textContent).toContain('Angular');\n});",
              annotations: [
                { line: 5, note: 'The service is real — its cooperation with the component IS the test subject.' },
                { line: 12, note: 'First render triggers the real data flow.' },
                { line: 18, note: 'Second render paints the flushed data — then assert like a user.' },
              ],
              explanation:
                'Component, service, and their conversation — all real; only the network scripted. Maximum honesty per millisecond.',
            },
          ],
          keyPoints: [
            'Integration = real units wired together, only system edges faked.',
            'It catches what units cannot: wrong assumptions between layers.',
            'Mock-heavy twin unit tests → merge into one honest integration test.',
            'Fake edges keep integration tests fast enough for the watch loop.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What class of bug do integration tests catch that unit tests miss?',
              options: [
                { id: 'a', text: 'Syntax errors', correct: false },
                { id: 'b', text: 'Wrong assumptions between layers — pieces that pass alone but misfit together', correct: true },
                { id: 'c', text: 'CSS issues', correct: false },
                { id: 'd', text: 'Server crashes', correct: false },
              ],
              explanation:
                'Units verify pieces; integration verifies the conversation between them.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'In a good integration test, what gets faked?',
              options: [
                { id: 'a', text: 'Everything', correct: false },
                { id: 'b', text: 'Only the system edges: HTTP, storage, clock — collaborators stay real', correct: true },
                { id: 'c', text: 'Nothing', correct: false },
                { id: 'd', text: 'The component under test', correct: false },
              ],
              explanation:
                'Real wiring + scripted boundaries = honest and fast.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Two mock-heavy unit tests mirror each other across a boundary. Better approach?',
              options: [
                { id: 'a', text: 'Add more mocks', correct: false },
                { id: 'b', text: 'One integration test with both sides real and the edge faked', correct: true },
                { id: 'c', text: 'Delete all tests', correct: false },
                { id: 'd', text: 'Only e2e', correct: false },
              ],
              explanation:
                'Mirrored mocks restate implementation twice; a level up, the real conversation gets tested once, honestly.',
            },
          ],
        },
        {
          id: 'e2e-playwright',
          title: 'E2E with Playwright',
          minutes: 12,
          blurb: 'Drive the real app like a real user — journeys, not clicks.',
          concept: [
            {
              heading: 'What e2e really tests',
              body: 'E2E boots your **built app** in a **real browser** and walks a user journey: navigate, click, type, assert what is visible. It catches what nothing below can: broken builds, routing misconfigurations, env/config errors, CSP issues, the wiring of literally everything. **Playwright** (Microsoft) is the modern standard — fast, parallel, multi-browser; Cypress its popular peer.',
            },
            {
              heading: 'The Playwright vocabulary',
              body: '`page.goto(\'/\')`, semantic locators — `page.getByRole(\'button\', { name: \'Start course\' })`, `getByLabel`, `getByText` (same user-centric philosophy as Testing Library), actions `click/fill/press`, and **web-first assertions**: `await expect(locator).toBeVisible()` retries automatically until timeout — the auto-waiting that killed most historical e2e pain. Trace viewer records every step for time-travel debugging of failures.',
            },
            {
              heading: 'Journeys, not features',
              body: 'Write e2e as **user stories**: "visitor opens the site, picks the Angular course, completes a lesson, sees progress saved". One journey crosses dozens of features — that breadth is e2e’s economics. Keep them few (the must-never-break flows), independent (each sets up its own state), and run the full suite in CI on every PR (your Vercel previews are an ideal target).',
            },
          ],
          codeSamples: [
            {
              title: 'A SkillForge journey',
              filename: 'learn-flow.spec.ts',
              language: 'typescript',
              code: "import { test, expect } from '@playwright/test';\n\ntest('learner completes a lesson and sees progress', async ({ page }) => {\n  await page.goto('/');\n\n  // semantic locators — query like a user\n  await page.getByRole('link', { name: /Angular/ }).click();\n  await page.getByRole('link', { name: /What Angular is/ }).click();\n\n  // web-first assertion: retries until visible\n  await expect(page.getByRole('heading', { level: 1 })).toContainText(\n    'What Angular is'\n  );\n\n  await page.getByRole('button', { name: 'I understand this' }).click();\n\n  await page.goBack();\n  await expect(page.getByText('1/20 lessons')).toBeVisible();\n});",
              annotations: [
                { line: 7, note: 'getByRole: resilient to markup changes, accessibility-verifying.' },
                { line: 11, note: 'Auto-retrying assertion — no sleep(), no race conditions.' },
                { line: 17, note: 'The journey asserts the OUTCOME: progress persisted and displayed.' },
              ],
              explanation:
                'A real browser walks your deployed app exactly as you do after each release — automated forever.',
            },
          ],
          keyPoints: [
            'E2E = built app + real browser + user journeys; catches whole-system wiring.',
            'Playwright: semantic locators (`getByRole`) + auto-retrying assertions.',
            'Write journeys (login→act→outcome), not per-feature click lists.',
            'Few, independent, run in CI on every PR — against preview deployments.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does await expect(locator).toBeVisible() do that classic asserts cannot?',
              options: [
                { id: 'a', text: 'Runs faster', correct: false },
                { id: 'b', text: 'Retries automatically until the element appears (or timeout) — no manual waits', correct: true },
                { id: 'c', text: 'Checks CSS colors', correct: false },
                { id: 'd', text: 'Nothing special', correct: false },
              ],
              explanation:
                'Web-first assertions poll the live page — the auto-waiting that eliminated sleep()-based flakiness.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why structure e2e tests as journeys rather than feature checklists?',
              options: [
                { id: 'a', text: 'Easier to name', correct: false },
                { id: 'b', text: 'One journey covers many features at realistic breadth — that breadth is e2e’s unique value', correct: true },
                { id: 'c', text: 'Journeys run faster', correct: false },
                { id: 'd', text: 'Checklists are illegal', correct: false },
              ],
              explanation:
                'Cheaper layers already verify features in isolation; e2e earns its cost by walking the connected whole.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which bug class can ONLY e2e catch?',
              options: [
                { id: 'a', text: 'A wrong calculation', correct: false },
                { id: 'b', text: 'A production build/routing/config breakage — units and integration never load the real build', correct: true },
                { id: 'c', text: 'A typo in a comment', correct: false },
                { id: 'd', text: 'Slow SQL', correct: false },
              ],
              explanation:
                'Only e2e exercises the deployed artifact end to end — build, routing, env, and all.',
            },
          ],
        },
        {
          id: 'flaky-tests',
          title: 'Killing flaky tests',
          minutes: 11,
          blurb: 'The four causes of "sometimes red" — and their cures.',
          concept: [
            {
              heading: 'Why flakiness is poison',
              body: 'A flaky test (passes/fails randomly) is worse than no test: it trains the team to ignore red — and the day a REAL failure hides inside the noise, the safety net is already dead. Professional teams treat one flaky test as an incident: quarantine immediately, fix or delete within days.',
            },
            {
              heading: 'The four causes',
              body: '1) **Timing**: asserting before async work finishes — cured by awaited/web-first assertions, never `sleep(2000)` (too short = flaky, too long = slow, both = wrong). 2) **Order dependence**: test B passes only after test A left state behind — cured by fresh state per test (beforeEach) and verified by running in random order. 3) **Shared external state**: same DB/storage across parallel tests — cured by isolated data per test. 4) **Real time/randomness**: `Date.now()`, `Math.random()` — cured by fake clocks and seeded randomness (Level 2).',
            },
            {
              heading: 'The debugging protocol',
              body: 'Reproduce: run the single test in a loop (`--repeat-each=50`), and the suite in random order. Read the failure’s variance: timeout → timing; passes alone but fails in suite → order/shared state; fails at midnight → time. Playwright’s trace viewer replays failed runs step by step. And the rule of last resort: if it cannot be made deterministic, it does not deserve to exist.',
            },
          ],
          codeSamples: [
            {
              title: 'Flaky patterns and their cures',
              filename: 'flaky-cures.ts',
              language: 'typescript',
              code: "// CAUSE 1 — timing. NEVER:\nawait page.waitForTimeout(2000);            // hope as strategy\nexpect(await page.isVisible('.result'));\n// CURE: web-first / awaited assertions\nawait expect(page.getByTestId('result')).toBeVisible();\n\n// CAUSE 2 — order dependence. NEVER share module state:\nlet cart: CartService;                       // module-level = shared!\n// CURE: fresh world per test\nbeforeEach(() => { cart = new CartService(); });\n\n// CAUSE 4 — real time. NEVER:\nif (isWeekend(Date.now())) { /* test differs by day! */ }\n// CURE: control the clock\njasmine.clock().mockDate(new Date('2026-06-01T10:00:00'));",
              annotations: [
                { line: 2, note: 'Fixed sleeps are always wrong: a guess that ages badly.' },
                { line: 5, note: 'Retrying assertions wait exactly as long as needed, no more.' },
                { line: 10, note: 'beforeEach construction makes order-independence structural.' },
                { line: 15, note: 'Tests that depend on today’s date fail on schedule. Mock the date.' },
              ],
              explanation:
                'Every flake maps to one of four causes — and each cause has a mechanical, permanent cure.',
            },
          ],
          keyPoints: [
            'Flaky tests destroy trust in red — treat each as an incident: quarantine, fix or delete.',
            'Four causes: timing, order-dependence, shared state, real time/randomness.',
            'Cures: awaited/retrying assertions (never sleeps), fresh state per test, isolated data, fake clocks.',
            'Reproduce with `--repeat-each` and random order; trace viewers replay failures.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why is a flaky test worse than a missing test?',
              options: [
                { id: 'a', text: 'It uses CI minutes', correct: false },
                { id: 'b', text: 'It teaches the team to ignore red — killing the suite’s alarm value for real failures', correct: true },
                { id: 'c', text: 'It is not worse', correct: false },
                { id: 'd', text: 'It slows the build', correct: false },
              ],
              explanation:
                '"Probably just the flaky one" is how genuine regressions sail into production unnoticed.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why is waitForTimeout(2000) always the wrong fix?',
              options: [
                { id: 'a', text: 'Two seconds is too short', correct: false },
                { id: 'b', text: 'Any fixed guess is wrong twice: still flaky when slow, wasted time when fast — use retrying assertions', correct: true },
                { id: 'c', text: 'It is deprecated syntax', correct: false },
                { id: 'd', text: 'Timeouts crash browsers', correct: false },
              ],
              explanation:
                'Conditions, not clocks: wait FOR the thing, exactly as long as it takes.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'A test passes alone but fails in the full suite. Prime suspect:',
              options: [
                { id: 'a', text: 'The CPU', correct: false },
                { id: 'b', text: 'Order dependence / shared leftover state from earlier tests', correct: true },
                { id: 'c', text: 'Too many assertions', correct: false },
                { id: 'd', text: 'The test name', correct: false },
              ],
              explanation:
                'Alone-green suite-red is the signature of state leaking between tests — fresh worlds fix it.',
            },
          ],
        },
        {
          id: 'test-data',
          title: 'Test data: builders & fixtures',
          minutes: 10,
          blurb: 'Readable data setup that survives model changes.',
          concept: [
            {
              heading: 'The data problem',
              body: 'Tests drown in object literals: every test building a full User with twelve fields obscures WHICH field matters for THIS test — and a model change breaks fifty files. Test data deserves design like any code.',
            },
            {
              heading: 'Builders / factories',
              body: 'The standard cure: `makeUser(overrides?)` returns a **valid default** user, callers override only what their scenario needs: `makeUser({ role: \'admin\' })`. Now the override IS the documentation ("this test is about admins"), defaults live in ONE place, and a new model field touches one function. Compose them: `makeOrder({ customer: makeUser(...) })`.',
            },
            {
              heading: 'Determinism and realism',
              body: 'Random data in tests = flakiness (a random string occasionally collides or hits a length limit). Faker-style libraries are fine **with a fixed seed**. For e2e: each test creates its own entities (unique per run) and cleans up — never share "the test user" between parallel tests. Golden rule from Level 4’s flakiness lesson applied to data: identical runs, identical data.',
            },
          ],
          codeSamples: [
            {
              title: 'The builder pattern',
              filename: 'test-data.ts',
              language: 'typescript',
              code: "export function makeUser(overrides: Partial<User> = {}): User {\n  return {\n    id: 1,\n    name: 'Test User',\n    email: 'user@test.dev',\n    role: 'member',\n    active: true,\n    ...overrides,                  // only what THIS test cares about\n  };\n}\n\n// tests become self-documenting:\nit('blocks inactive users from posting', () => {\n  const user = makeUser({ active: false });   // <- the point, visible\n  expect(canPost(user)).toBe(false);\n});\n\nit('lets admins delete any post', () => {\n  const admin = makeUser({ role: 'admin' });\n  expect(canDelete(admin, somePost)).toBe(true);\n});",
              annotations: [
                { line: 8, note: 'Spread overrides: valid defaults + the scenario’s one delta.' },
                { line: 14, note: 'Reading the override tells you exactly what the test is about.' },
                { line: 1, note: 'Partial<User> — the utility type from your TypeScript course, working for tests.' },
              ],
              explanation:
                'One builder per model: fifty tests stay readable, and schema changes touch one file instead of fifty.',
            },
          ],
          keyPoints: [
            'Builders (`makeUser(overrides)`) give valid defaults + visible per-test deltas.',
            'The override documents the scenario; defaults centralize in one function.',
            'Random data needs fixed seeds; e2e data must be per-test and cleaned up.',
            '`Partial<T>` (from your TS course) is the natural builder signature.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'The main readability win of makeUser({ active: false })?',
              options: [
                { id: 'a', text: 'Fewer characters', correct: false },
                { id: 'b', text: 'The single override IS the test’s point — everything else is irrelevant defaults', correct: true },
                { id: 'c', text: 'It runs faster', correct: false },
                { id: 'd', text: 'It avoids types', correct: false },
              ],
              explanation:
                'Twelve-field literals hide the signal; one visible delta states exactly what matters here.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'A new required field is added to User. With builders, what breaks?',
              options: [
                { id: 'a', text: 'Every test file', correct: false },
                { id: 'b', text: 'Only the builder — add the default once, all tests keep passing', correct: true },
                { id: 'c', text: 'Nothing ever', correct: false },
                { id: 'd', text: 'The compiler', correct: false },
              ],
              explanation:
                'Centralized defaults absorb schema evolution — the maintenance argument for builders.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why must parallel e2e tests not share "the test user"?',
              options: [
                { id: 'a', text: 'Licensing', correct: false },
                { id: 'b', text: 'Concurrent tests mutate shared state and corrupt each other — flakiness by design', correct: true },
                { id: 'c', text: 'Users are expensive', correct: false },
                { id: 'd', text: 'They can share freely', correct: false },
              ],
              explanation:
                'Shared mutable entities across parallel runs are cause #3 of flakiness — per-test data isolates.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 5 — PROFESSIONAL PRACTICE
    // ===================================================================
    {
      id: 'l5-practice',
      order: 5,
      title: 'Level 5 — Professional practice',
      goal: 'Practice TDD where it shines, read coverage honestly, gate releases in CI, and grow a healthy testing culture.',
      lessons: [
        {
          id: 'tdd',
          title: 'Test-driven development',
          minutes: 11,
          blurb: 'Red, green, refactor — what TDD actually is (and is not).',
          concept: [
            {
              heading: 'The loop',
              body: '**Red**: write a small failing test for the next bit of behavior — it MUST fail first (proving it can detect the absence). **Green**: write the minimum code to pass — resist gold-plating. **Refactor**: clean up with the test as your net. Repeat in minutes-long cycles. The discipline forces small steps, instant feedback, and 100%-by-construction coverage of what you build.',
            },
            {
              heading: 'Where it shines, where it strains',
              body: 'TDD excels where behavior is **specifiable upfront**: pure logic, parsers, pricing rules, bug fixes (write the failing repro FIRST — the perfect TDD use case everyone agrees on). It strains in exploratory UI work where you discover the design by seeing it. Pragmatic verdict: TDD is a power tool for the logic layer, not a religion for every line.',
            },
            {
              heading: 'The deeper benefit: design first',
              body: 'Writing the test first forces you to design the **API before the implementation**: what is this function called, what does it take, what does it promise? Awkward tests reveal awkward APIs before they exist. Many practitioners value TDD more for this design pressure than for the tests themselves.',
            },
          ],
          codeSamples: [
            {
              title: 'One TDD cycle',
              filename: 'slugify.spec.ts',
              language: 'typescript',
              code: "// RED — specify the next behavior; watch it fail\nit('replaces spaces with dashes', () => {\n  expect(slugify('hello world')).toBe('hello-world');\n});\n// -> ReferenceError: slugify is not defined  ✗ (good! it CAN fail)\n\n// GREEN — minimum to pass\nexport function slugify(s: string): string {\n  return s.toLowerCase().replace(/\\s+/g, '-');\n}\n// ✓ passes\n\n// next RED — grow behavior one test at a time\nit('strips non-alphanumeric characters', () => {\n  expect(slugify('Hello, World!')).toBe('hello-world');\n});\n// ✗ -> extend the regex -> ✓ -> REFACTOR with the net in place",
              annotations: [
                { line: 5, note: 'Seeing red first proves the test detects absence — skip this and tests lie.' },
                { line: 9, note: 'Minimum code: the test defines "enough".' },
                { line: 14, note: 'Each new test pulls the implementation one step forward.' },
              ],
              explanation:
                'Behavior accumulates test by test; at every moment, everything written is verified.',
            },
          ],
          keyPoints: [
            'Red → green → refactor in minutes-long cycles; the test MUST fail first.',
            'Bug fixes are perfect TDD: failing repro first, then the fix.',
            'Shines on specifiable logic; strains on exploratory UI — a tool, not a religion.',
            'The hidden benefit: API design happens before implementation exists.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why must the test fail BEFORE writing the implementation?',
              options: [
                { id: 'a', text: 'Tradition', correct: false },
                { id: 'b', text: 'A test never seen red might be incapable of failing — red proves it detects absence', correct: true },
                { id: 'c', text: 'To waste time', correct: false },
                { id: 'd', text: 'CI requires it', correct: false },
              ],
              explanation:
                'A test that passes against nothing is asserting nothing — red-first validates the test itself.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'The universally agreed BEST moment for test-first:',
              options: [
                { id: 'a', text: 'Styling tweaks', correct: false },
                { id: 'b', text: 'Bug fixes — write the failing reproduction, then fix until green', correct: true },
                { id: 'c', text: 'Prototypes', correct: false },
                { id: 'd', text: 'Never', correct: false },
              ],
              explanation:
                'The repro test pins the bug, proves the fix, and guards against the regression forever.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What design benefit does writing the test first force?',
              options: [
                { id: 'a', text: 'Shorter functions', correct: false },
                { id: 'b', text: 'You design the API (name, inputs, promise) before any implementation exists', correct: true },
                { id: 'c', text: 'More comments', correct: false },
                { id: 'd', text: 'No benefit', correct: false },
              ],
              explanation:
                'The first consumer of your API is the test — awkwardness surfaces while change is still free.',
            },
          ],
        },
        {
          id: 'coverage-quality',
          title: 'Coverage honestly, quality truly',
          minutes: 10,
          blurb: 'What the numbers mean — and mutation testing, the real judge.',
          concept: [
            {
              heading: 'Reading a coverage report',
              body: '`ng test --code-coverage` produces a per-file report with four metrics: **statements**, **branches** (each if/else arm — the most honest of the four), **functions**, **lines**. Use it as a **map of untested zones**: a red branch on the error path of your payment service matters; a red line in a debug helper does not. Thresholds (~80% on logic) belong in CI as a floor, not as a target to game.',
            },
            {
              heading: 'Mutation testing — testing the tests',
              body: 'The deeper question: would your tests NOTICE a bug? **Mutation testing** (Stryker for JS/TS) answers it mechanically: it plants small bugs ("mutants") — flips `>=` to `>`, deletes a line, negates a condition — and reruns your suite per mutant. Tests fail → mutant **killed**; tests pass → mutant **survived**, exposing an assertion gap. The mutation score measures what coverage cannot: detection power.',
            },
            {
              heading: 'Weak tests and their repairs',
              body: 'Surviving mutants usually trace to: assertion-free tests (call it, assert nothing), too-loose matchers (`toBeTruthy` where `toBe(42)` belongs), untested branches (only the happy path), and boundary blindness (no limit-1/limit/limit+1). Run mutation testing occasionally on critical modules — payments, permissions — as an audit, not on every build (it is expensive).',
            },
          ],
          codeSamples: [
            {
              title: 'Coverage lies, mutants reveal',
              filename: 'audit.spec.ts',
              language: 'typescript',
              code: "// This test gives 100% line coverage of canAccess()...\nit('runs canAccess', () => {\n  const result = canAccess(makeUser({ role: 'admin' }), resource);\n  expect(result).toBeDefined();          // ...and asserts NOTHING real\n});\n\n// Stryker plants:  role === 'admin'  ->  role !== 'admin'\n// suite still green -> MUTANT SURVIVED -> the gap is exposed\n\n// the honest version kills it:\nit('grants admins access to any resource', () => {\n  expect(canAccess(makeUser({ role: 'admin' }), resource)).toBe(true);\n});\nit('denies members access to others’ resources', () => {\n  expect(canAccess(makeUser({ role: 'member' }), othersResource)).toBe(false);\n});",
              annotations: [
                { line: 4, note: 'toBeDefined passes for true AND false — coverage 100%, value 0.' },
                { line: 8, note: 'The surviving mutant is a found bug — in your TESTS.' },
                { line: 12, note: 'Exact assertions + both branches: now mutants die.' },
              ],
              explanation:
                'Coverage counted the lines; mutation testing judged the assertions. Both numbers, one honest picture.',
            },
          ],
          keyPoints: [
            'Coverage maps untested zones; branch coverage is the most honest metric.',
            'Thresholds are a CI floor (~80% on logic), never a target to game.',
            'Mutation testing plants bugs to test the tests — survivors expose assertion gaps.',
            'Audit critical modules with Stryker occasionally; fix loose matchers and missing branches.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'A surviving mutant means:',
              options: [
                { id: 'a', text: 'The code has a bug', correct: false },
                { id: 'b', text: 'A planted bug went unnoticed — your assertions have a gap there', correct: true },
                { id: 'c', text: 'The tool failed', correct: false },
                { id: 'd', text: 'Coverage is low', correct: false },
              ],
              explanation:
                'The suite stayed green with broken code — exactly the blindness mutation testing exists to reveal.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Which coverage metric is generally the most honest?',
              options: [
                { id: 'a', text: 'Line coverage', correct: false },
                { id: 'b', text: 'Branch coverage — every if/else arm must actually execute', correct: true },
                { id: 'c', text: 'File count', correct: false },
                { id: 'd', text: 'Function coverage', correct: false },
              ],
              explanation:
                'Lines execute easily; branches force both the happy and the error path to run.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why does expect(result).toBeDefined() often signal a weak test?',
              options: [
                { id: 'a', text: 'It is slow', correct: false },
                { id: 'b', text: 'It passes for almost any value — true, false, wrong objects alike', correct: true },
                { id: 'c', text: 'It is deprecated', correct: false },
                { id: 'd', text: 'It does not', correct: false },
              ],
              explanation:
                'Loose matchers detect almost nothing; assert the exact expected value or shape.',
            },
          ],
        },
        {
          id: 'ci-testing',
          title: 'Tests in CI — the quality gate',
          minutes: 10,
          blurb: 'Local speed, CI authority — wiring the pipeline.',
          concept: [
            {
              heading: 'The two-speed system',
              body: '**Local**: the watch loop runs affected unit/component tests on every save — feedback in seconds while you type. **CI**: on every push/PR, the full truth — `tsc --noEmit`, lint, ALL tests headless (`ng test --watch=false --browsers=ChromeHeadless`), build, e2e against the preview. Local speed keeps you flowing; CI authority keeps main green. Branch protection (your Git course!) makes the green checks **required** before merge.',
            },
            {
              heading: 'Keeping pipelines fast',
              body: 'Slow CI erodes everything (people batch changes, skip pushes). Levers: cache `node_modules` (`actions/setup-node` with `cache: npm`), parallelize (unit and e2e as separate jobs; Playwright shards across machines), run e2e against the **already-built preview** (Vercel built it anyway), and fail fast — type errors abort before the expensive stages. Target: unit suite in 1–3 minutes, e2e under 10.',
            },
            {
              heading: 'The full gate for SkillForge',
              body: 'Your repo’s natural endgame: GitHub Actions workflow running typecheck → lint → unit tests → build on every PR; Playwright journeys against the Vercel preview URL; branch protection requiring all green. Result: the deploy button is always safe — broken code physically cannot reach main. This is the payoff the entire course has been building toward.',
            },
          ],
          codeSamples: [
            {
              title: 'A complete test pipeline',
              filename: '.github/workflows/ci.yml',
              language: 'text',
              code: "name: ci\non: [push, pull_request]\njobs:\n  quality:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 22, cache: npm }\n      - run: npm ci\n      - run: npx tsc --noEmit           # fail fast: types first\n      - run: npx ng lint\n      - run: npx ng test --watch=false --browsers=ChromeHeadless --code-coverage\n      - run: npx ng build\n\n  e2e:\n    needs: quality                       # only after the basics pass\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npx playwright install --with-deps chromium\n      - run: npx playwright test         # against the preview URL\n",
              annotations: [
                { line: 9, note: 'npm cache: minutes saved on every single run.' },
                { line: 11, note: 'Cheapest checks first — a type error aborts in seconds.' },
                { line: 17, note: 'e2e gated behind quality: no point driving a broken build.' },
              ],
              explanation:
                'Push → seconds of types/lint → minutes of tests/build → journeys on the preview → merge button unlocks. Quality as plumbing.',
            },
          ],
          keyPoints: [
            'Two speeds: watch-loop locally (seconds), full suite in CI (authority).',
            'Order cheap-to-expensive: types → lint → unit → build → e2e; fail fast.',
            'Cache dependencies, parallelize jobs, shard e2e, reuse preview builds.',
            'Branch protection + required checks = broken code cannot reach main.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why run tsc --noEmit before the test stage in CI?',
              options: [
                { id: 'a', text: 'It generates docs', correct: false },
                { id: 'b', text: 'Fail fast: a type error aborts in seconds instead of after minutes of tests', correct: true },
                { id: 'c', text: 'Tests require it', correct: false },
                { id: 'd', text: 'Tradition', correct: false },
              ],
              explanation:
                'Pipeline economics: cheapest checks first so broken pushes feedback immediately.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What makes the CI run authoritative over local runs?',
              options: [
                { id: 'a', text: 'Faster machines', correct: false },
                { id: 'b', text: 'Clean environment + full suite + required status: merging is impossible without green', correct: true },
                { id: 'c', text: 'It is not', correct: false },
                { id: 'd', text: 'Better logs', correct: false },
              ],
              explanation:
                '"Works on my machine" ends where a clean-room full run gates the merge button.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'The e2e job runs only after the quality job passes because:',
              options: [
                { id: 'a', text: 'GitHub requires ordering', correct: false },
                { id: 'b', text: 'Driving a browser against a build that fails types/units wastes the most expensive resource', correct: true },
                { id: 'c', text: 'E2E cannot run first technically', correct: false },
                { id: 'd', text: 'Alphabetical order', correct: false },
              ],
              explanation:
                'Gate the costly stage behind the cheap ones — the pyramid’s economics applied to pipelines.',
            },
          ],
        },
        {
          id: 'testing-culture',
          title: 'A healthy testing culture',
          minutes: 10,
          blurb: 'Maintainable suites, tests in review — and your path from here.',
          concept: [
            {
              heading: 'Tests are code — review them like code',
              body: 'Test quality is decided in **code review**: Does the name state a behavior? Could this test ever fail meaningfully (or is it assertion-free)? Does it test the contract or the internals? Will it survive a refactor? Reviewers who push back on weak tests shape the suite more than any tooling. And tests deserve refactoring too: shared builders, helper extraction, deleting tests whose behavior no longer exists.',
            },
            {
              heading: 'The lived workflow',
              body: 'Day to day: watch mode runs as you code; every bug becomes a failing repro first; every PR carries its tests (reviewers expect them); red CI is everyone’s immediate priority (a broken main blocks the whole team); flaky tests are quarantined within hours. None of this is heroics — it is plumbing that makes ordinary days calm.',
            },
            {
              heading: 'Your path from here',
              body: 'You now hold the complete foundation: mindset (what deserves tests), craft (doubles, matchers, edges), Angular specifics (TestBed, HTTP, harnesses), system testing (integration, Playwright, anti-flake), and practice (TDD, mutation, CI). The natural next step is concrete: **add tests to SkillForge** — ProgressService is pure-logic paradise, the quiz scoring begs for edge cases, and one Playwright journey through a lesson would crown the pipeline. Everything you learned in all six courses converges exactly there.',
            },
          ],
          codeSamples: [
            {
              title: 'A test-review checklist (paste into your PR template)',
              filename: 'review-checklist.md',
              language: 'text',
              code: "## Test review checklist\n- [ ] Name states a BEHAVIOR (\"rejects expired tokens\", not \"test2\")\n- [ ] Asserts outcomes, not internals (no private spying, no call-order)\n- [ ] Would fail if the behavior broke (no assertion-free tests)\n- [ ] Edge cases: empty / zero / boundary trio where relevant\n- [ ] No sleeps; async properly awaited\n- [ ] Fresh state per test (no order dependence)\n- [ ] New bug fix? -> includes the failing-first repro test\n- [ ] Data via builders, deltas visible",
              annotations: [
                { line: 2, note: 'The name is the bug report of the future.' },
                { line: 4, note: 'The mutation-testing question, asked by a human.' },
                { line: 8, note: 'The regression habit, enforced at the door.' },
              ],
              explanation:
                'Eight lines in a PR template institutionalize everything this course taught — culture as a checklist.',
            },
          ],
          keyPoints: [
            'Review tests as seriously as code — names, contracts, failure-capability.',
            'Daily rhythm: watch mode, repro-first bug fixes, tests in every PR, red CI = top priority.',
            'Refactor and DELETE tests too — suites need gardening.',
            'Next step: test SkillForge itself — ProgressService, quiz scoring, one Playwright journey.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'The single most powerful lever for test quality in a team:',
              options: [
                { id: 'a', text: 'A coverage badge', correct: false },
                { id: 'b', text: 'Code review that holds tests to the same standard as code', correct: true },
                { id: 'c', text: 'More CI minutes', correct: false },
                { id: 'd', text: 'A testing framework switch', correct: false },
              ],
              explanation:
                'Tools measure; reviewers shape. Weak tests blocked at review never poison the suite.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why is deleting tests sometimes the right move?',
              options: [
                { id: 'a', text: 'It never is', correct: false },
                { id: 'b', text: 'Tests for removed behavior or duplicated coverage are maintenance debt with zero value', correct: true },
                { id: 'c', text: 'To raise coverage', correct: false },
                { id: 'd', text: 'To speed CI only', correct: false },
              ],
              explanation:
                'A suite is a garden: tests that guard nothing real cost attention forever — prune them.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why is a red main branch "everyone’s problem immediately"?',
              options: [
                { id: 'a', text: 'It looks bad', correct: false },
                { id: 'b', text: 'Every branch built on red inherits the breakage — the whole team’s safety net is down', correct: true },
                { id: 'c', text: 'It is not urgent', correct: false },
                { id: 'd', text: 'Only the author’s problem', correct: false },
              ],
              explanation:
                'A broken main poisons every PR rebased on it; restoring green outranks feature work.',
            },
          ],
        },
      ],
    },
  ],
};
