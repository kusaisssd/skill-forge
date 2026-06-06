import { Exercise } from '../models/course.model';

/** Interactive exercises for the API Communication course, keyed by lesson id. */
export const API_EXERCISES: Record<string, Exercise[]> = {
  // ---------- Level 1 ----------
  'how-http-works': [
    {
      id: 'ex-stateless',
      type: 'fill-blank',
      prompt: 'Because HTTP is stateless, what must travel on every request?',
      language: 'text',
      codeTemplate:
        'HTTP is ___ — the server remembers nothing,\nso the auth ___ is sent on every request',
      blanks: [
        { accepted: ['stateless'], hint: 'No memory between requests.' },
        { accepted: ['token'], hint: 'Carries identity each time.' },
      ],
      explanation:
        'Statelessness is why identity (a token) accompanies every request — and why backends scale.',
    },
  ],
  'http-methods': [
    {
      id: 'ex-verbs',
      type: 'fill-blank',
      prompt: 'Pick the verb: create a product, then remove one.',
      language: 'text',
      codeTemplate:
        '___ /api/products       -> create new\n___ /api/products/42    -> remove product 42',
      blanks: [
        { accepted: ['POST'], hint: 'Create (not idempotent).' },
        { accepted: ['DELETE'], hint: 'Remove (idempotent).' },
      ],
      explanation: 'POST creates (guard against duplicates); DELETE removes (safe to retry).',
    },
  ],
  'status-codes': [
    {
      id: 'ex-401-403',
      type: 'fill-blank',
      prompt: 'Distinguish the two: which status for "no token" vs "not allowed"?',
      language: 'text',
      codeTemplate:
        'no / expired token  -> ___   (not authenticated -> login)\nknown user, no rights -> ___ (not allowed -> access denied)',
      blanks: [
        { accepted: ['401'], hint: 'Unauthenticated.' },
        { accepted: ['403'], hint: 'Forbidden.' },
      ],
      explanation:
        '401 = who are you (→ login); 403 = I know you but no (→ access denied).',
    },
  ],
  'rest-design': [
    {
      id: 'ex-rest',
      type: 'fill-blank',
      prompt: 'Rewrite the non-REST call the RESTful way (verb + resource).',
      language: 'text',
      codeTemplate:
        '// non-REST: POST /getProductById { id: 42 }\n// REST:\n___ /api/products/42',
      blanks: [{ accepted: ['GET'], hint: 'Read a resource by id.' }],
      explanation: 'A resource (products/42) acted on by GET — no action verbs in the URL.',
    },
  ],

  // ---------- Level 2 ----------
  'json-payloads': [
    {
      id: 'ex-casing',
      type: 'fill-blank',
      prompt: 'C# ProductName serializes (ASP.NET default) to which JSON casing?',
      language: 'text',
      codeTemplate: 'C# ProductName  ->  JSON "___"',
      blanks: [{ accepted: ['productName'], hint: 'JavaScript-native casing.' }],
      explanation: 'ASP.NET serializes to camelCase by default so JSON feels native to the frontend.',
    },
  ],
  'designing-endpoints': [
    {
      id: 'ex-additive',
      type: 'fill-blank',
      prompt: 'Which kind of change is safe (non-breaking) for existing clients?',
      language: 'text',
      codeTemplate:
        'adding a new ___ field  -> safe\nremoving or renaming a field -> breaking (needs a version)',
      blanks: [{ accepted: ['optional'], hint: 'Old clients ignore it.' }],
      explanation: 'Additive optional fields are backward-compatible; removals/renames break clients.',
    },
  ],
  'versioning-docs': [
    {
      id: 'ex-version',
      type: 'fill-blank',
      prompt: 'You must remove a field. Old and new contracts coexist via URL ___.',
      language: 'text',
      codeTemplate: '/api/v1/products/42  (old)\n/api/v2/products/42  (new)  -> URL ___',
      blanks: [{ accepted: ['versioning', 'version'], hint: 'v1 vs v2 in the path.' }],
      explanation: 'Versioning lets clients migrate on their own schedule; version only for breaking changes.',
    },
  ],
  'error-contracts': [
    {
      id: 'ex-error-shape',
      type: 'fill-blank',
      prompt: 'Validation errors should be keyed by ___ so each maps to its form control.',
      language: 'text',
      codeTemplate:
        '{ "errors": {\n    "___": ["Invalid email"]   // maps to the email input\n} }',
      blanks: [{ accepted: ['email'], hint: 'The form field name.' }],
      explanation:
        'Field-keyed errors let the frontend drop each message under the matching control.',
    },
  ],

  // ---------- Level 3 ----------
  'fetching-data': [
    {
      id: 'ex-typed',
      type: 'fill-blank',
      prompt: 'Type the response to the contract interface, in a data service.',
      language: 'typescript',
      codeTemplate: "getAll(): Observable<Product[]> {\n  return this.http.___<Product[]>(this.base);\n}",
      blanks: [{ accepted: ['get'], hint: 'Read data.' }],
      explanation: 'http.get<T> types the response to the interface mirroring the API contract.',
    },
  ],
  'loading-error-state': [
    {
      id: 'ex-finalize',
      type: 'fill-blank',
      prompt: 'Always clear the loading flag, on success AND error.',
      language: 'typescript',
      codeTemplate:
        'this.api.getAll().pipe(\n  ___(() => this.loading.set(false)),\n  catchError(() => of([]))\n)',
      blanks: [{ accepted: ['finalize'], hint: 'Runs on any termination.' }],
      explanation: 'finalize clears loading on success and error alike — no stuck spinners.',
    },
  ],
  'search-pipeline': [
    {
      id: 'ex-search',
      type: 'arrange',
      prompt: 'Arrange the canonical search-as-you-type pipeline.',
      language: 'typescript',
      lines: [
        'this.searchControl.valueChanges.pipe(',
        '  debounceTime(300),',
        '  distinctUntilChanged(),',
        '  switchMap(term => this.api.search(term))',
        ')',
      ],
      explanation:
        'Wait for a pause, skip non-changes, then switchMap to cancel stale requests.',
    },
  ],
  'caching-optimistic': [
    {
      id: 'ex-sharereplay',
      type: 'fill-blank',
      prompt: 'Cache a read so one request serves all subscribers.',
      language: 'typescript',
      codeTemplate:
        "categories$ = this.http.get<Category[]>('/api/categories').pipe(\n  ___({ bufferSize: 1, refCount: false })\n);",
      blanks: [{ accepted: ['shareReplay'], hint: 'Multicast + replay the latest.' }],
      explanation: 'shareReplay caches the stream — the first call is shared by everyone.',
    },
  ],

  // ---------- Level 4 ----------
  cors: [
    {
      id: 'ex-cors',
      type: 'fill-blank',
      prompt: 'A CORS error means the fix belongs on which side?',
      language: 'text',
      codeTemplate:
        'a CORS error is a ___ config issue\n(it must allowlist your frontend origin) — not a frontend fix',
      blanks: [{ accepted: ['server', 'backend'], hint: 'It opts in via headers.' }],
      explanation:
        'The browser enforces CORS; the server permits it. Fix = allowlist the origin on the API.',
    },
  ],
  'auth-flow': [
    {
      id: 'ex-storage',
      type: 'fill-blank',
      prompt: 'The XSS-safe place for a refresh token is a cookie with which flag?',
      language: 'text',
      codeTemplate: 'refresh token  ->  ___ + Secure + SameSite cookie',
      blanks: [{ accepted: ['HttpOnly'], hint: 'JavaScript cannot read it.' }],
      explanation:
        'HttpOnly hides the cookie from scripts (XSS-safe); SameSite defends against CSRF.',
    },
  ],
  interceptors: [
    {
      id: 'ex-interceptor',
      type: 'fill-blank',
      prompt: 'Requests are immutable — how do you add the Authorization header?',
      language: 'typescript',
      codeTemplate:
        "const authed = req.___({\n  setHeaders: { Authorization: `Bearer ${token}` }\n});",
      blanks: [{ accepted: ['clone'], hint: 'Make a modified copy.' }],
      explanation: 'req.clone({ setHeaders }) produces a new request with the token attached.',
    },
  ],
  'security-musts': [
    {
      id: 'ex-https',
      type: 'fill-blank',
      prompt: 'What encrypts tokens and data in transit (non-negotiable)?',
      language: 'text',
      codeTemplate: 'always call ___ endpoints — without it, everything travels in plaintext',
      blanks: [{ accepted: ['HTTPS', 'https'], hint: 'The encrypted channel.' }],
      explanation:
        'HTTPS encrypts the channel; without it, tokens and data are readable on the network.',
    },
  ],

  // ---------- Level 5 ----------
  'pagination-scale': [
    {
      id: 'ex-paging',
      type: 'fill-blank',
      prompt: 'A paginated response returns the page PLUS which metadata field for counts?',
      language: 'text',
      codeTemplate:
        '{ "items": [...], "page": 2, "pageSize": 20, "___": 1043 }',
      blanks: [{ accepted: ['total'], hint: 'Lets the UI show "21–40 of N".' }],
      explanation: 'total (+ page/pageSize) lets the client render counts and page controls.',
    },
  ],
  realtime: [
    {
      id: 'ex-signalr',
      type: 'fill-blank',
      prompt: 'A live connection is modeled on the frontend as which RxJS type?',
      language: 'text',
      codeTemplate:
        'a real-time connection = a stream of values over time\n=> an RxJS ___',
      blanks: [{ accepted: ['Observable'], hint: 'Server pushes become stream values.' }],
      explanation:
        'A live connection is literally an Observable — the async pipe renders pushes live.',
    },
  ],
  files: [
    {
      id: 'ex-upload',
      type: 'fill-blank',
      prompt: 'Files are sent (simple case) as which body type, via FormData?',
      language: 'text',
      codeTemplate: 'const form = new FormData();\nform.append("file", file);  // sent as ___/form-data',
      blanks: [{ accepted: ['multipart'], hint: 'Not JSON — binary.' }],
      explanation: 'multipart/form-data carries the binary file; the server binds it to IFormFile.',
    },
  ],
  'api-alternatives': [
    {
      id: 'ex-graphql',
      type: 'fill-blank',
      prompt: 'Which alternative lets the CLIENT pick exactly the fields it needs in one call?',
      language: 'text',
      codeTemplate:
        'over/under-fetching with REST  ->  use ___\n(one endpoint, client specifies the exact fields)',
      blanks: [{ accepted: ['GraphQL'], hint: 'Apollo on both ends.' }],
      explanation:
        'GraphQL flips control to the client for the response shape — but REST stays the default.',
    },
  ],
};
