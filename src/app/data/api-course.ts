import { Course } from '../models/course.model';

/**
 * The API Communication course — how frontend and backend talk.
 * Focus: HTTP & REST deeply, designing endpoints, fetching from the frontend,
 * authentication/security, and advanced real-world patterns.
 */
export const API_COURSE: Course = {
  outcome:
    'By the end you will understand HTTP and REST deeply, design clean API endpoints, fetch and send data from a frontend the right way (loading/error/cancellation), secure the channel (CORS, tokens, HTTPS), and apply advanced patterns — pagination, caching, real-time, and API alternatives like GraphQL.',
  levels: [
    // ===================================================================
    // LEVEL 1 — HTTP & REST FUNDAMENTALS
    // ===================================================================
    {
      id: 'l1-http-rest',
      order: 1,
      title: 'Level 1 — HTTP & REST fundamentals',
      goal: 'Understand the request/response model, HTTP methods and status codes, and what REST really means.',
      lessons: [
        {
          id: 'how-http-works',
          title: 'How HTTP works',
          minutes: 10,
          blurb: 'Request, response, and the stateless conversation.',
          concept: [
            {
              heading: 'The conversation',
              body: 'The frontend and backend talk over **HTTP**: the client sends a **request**, the server returns a **response**. That is the whole model. A request has a **method** (GET, POST...), a **URL**, **headers** (metadata), and an optional **body** (data). A response has a **status code** (200, 404...), **headers**, and an optional **body** (usually JSON). When your Angular `HttpClient` calls an ASP.NET endpoint, this exchange is what happens on the wire.',
            },
            {
              heading: 'Stateless by design',
              body: 'HTTP is **stateless**: each request is independent — the server remembers nothing between them. This is why authentication travels on **every** request (a token in a header, from your two previous skills): the server cannot rely on "who you were last time". Statelessness is what lets backends scale to many servers — any server can handle any request.',
            },
            {
              heading: 'URLs and JSON',
              body: 'A URL identifies a **resource**: `https://api.shop.com/products/42?fields=name`. It has a scheme, host, path (`/products/42`), and query string (`?fields=name`). The body format for modern APIs is almost always **JSON** — a text format both JavaScript and C# serialize to and from natively. Headers like `Content-Type: application/json` declare the format.',
            },
          ],
          codeSamples: [
            {
              title: 'A request and its response',
              filename: 'http exchange',
              language: 'text',
              code: "// REQUEST — what the frontend sends\nGET /api/products/42 HTTP/1.1\nHost: api.shop.com\nAuthorization: Bearer eyJhbGc...        <- identity on every request\nAccept: application/json\n\n// RESPONSE — what the backend returns\nHTTP/1.1 200 OK\nContent-Type: application/json\n\n{ \"id\": 42, \"name\": \"Keyboard\", \"price\": 49.99 }",
              annotations: [
                { line: 2, note: 'Method + path: GET the product with id 42.' },
                { line: 4, note: 'The token travels on every request — HTTP is stateless.' },
                { line: 9, note: 'Status 200 OK + JSON body: the answer.' },
              ],
              explanation:
                'Every frontend↔backend interaction is this: a request with method/URL/headers/body, and a response with status/headers/body.',
            },
          ],
          keyPoints: [
            'HTTP = request → response; request has method, URL, headers, optional body.',
            'Responses carry a status code, headers, and (usually JSON) body.',
            'HTTP is **stateless** — auth rides every request; this enables scaling.',
            'URLs identify resources (path + query); JSON is the standard body format.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does "HTTP is stateless" mean?',
              options: [
                { id: 'a', text: 'It cannot send data', correct: false },
                { id: 'b', text: 'The server remembers nothing between requests — each is independent', correct: true },
                { id: 'c', text: 'It is always slow', correct: false },
                { id: 'd', text: 'It only works once', correct: false },
              ],
              explanation:
                'Each request stands alone, which is why identity (a token) must accompany every one of them.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Which parts make up an HTTP request?',
              options: [
                { id: 'a', text: 'Only a URL', correct: false },
                { id: 'b', text: 'Method, URL, headers, and an optional body', correct: true },
                { id: 'c', text: 'Just a status code', correct: false },
                { id: 'd', text: 'HTML only', correct: false },
              ],
              explanation:
                'A request is the verb (method), the address (URL), metadata (headers), and optional data (body).',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'In /api/products/42?fields=name, what is ?fields=name?',
              options: [
                { id: 'a', text: 'The path', correct: false },
                { id: 'b', text: 'The query string — extra parameters after the path', correct: true },
                { id: 'c', text: 'A header', correct: false },
                { id: 'd', text: 'The body', correct: false },
              ],
              explanation:
                'The query string (after ?) carries optional parameters like filters, sorting, and pagination.',
            },
          ],
        },
        {
          id: 'http-methods',
          title: 'HTTP methods & idempotency',
          minutes: 11,
          blurb: 'GET, POST, PUT, PATCH, DELETE — and why it matters.',
          concept: [
            {
              heading: 'The verbs and their meanings',
              body: 'Each method has a **meaning** the whole web agrees on. **GET** — read (never changes data). **POST** — create (or "do an action"). **PUT** — replace a resource entirely. **PATCH** — update part of a resource. **DELETE** — remove. Using the right verb makes your API predictable: a developer reads `DELETE /products/42` and knows exactly what it does without docs.',
            },
            {
              heading: 'Safe and idempotent',
              body: 'Two properties matter for reliability. **Safe** = read-only (GET) — never changes server state, so it can be cached and retried freely. **Idempotent** = calling it N times has the same effect as once: GET, PUT, DELETE are idempotent; **POST is not** (two POSTs create two records). This is why a flaky network can safely retry a GET or PUT, but retrying a POST might double-charge a card.',
            },
            {
              heading: 'Why this guides design',
              body: 'Idempotency shapes real decisions: a "create order" is POST (not idempotent → guard against double-submit, the `exhaustMap` lesson from RxJS), while "set quantity to 3" is PUT (idempotent → safe to retry). Never use GET to change data (crawlers and prefetchers will trigger it!). Matching verb to intent is half of good API design.',
            },
          ],
          codeSamples: [
            {
              title: 'The verbs on one resource',
              filename: 'rest verbs',
              language: 'text',
              code: "GET    /api/products          -> list products        (safe, idempotent)\nGET    /api/products/42       -> read one              (safe, idempotent)\nPOST   /api/products          -> create new            (NOT idempotent)\nPUT    /api/products/42       -> replace product 42    (idempotent)\nPATCH  /api/products/42       -> update some fields     (often idempotent)\nDELETE /api/products/42       -> remove product 42     (idempotent)\n\n// Retrying after a network blip:\n//   GET / PUT / DELETE -> safe to retry\n//   POST -> retrying may create a DUPLICATE",
              annotations: [
                { line: 3, note: 'POST creates — two calls = two records. Guard against double-submit.' },
                { line: 4, note: 'PUT replaces fully; calling it twice leaves the same result.' },
                { line: 9, note: 'Idempotency decides what is safe to auto-retry on flaky networks.' },
              ],
              explanation:
                'Verb = intent. Idempotency = retry safety. Together they make an API predictable and reliable.',
            },
          ],
          keyPoints: [
            'GET read, POST create, PUT replace, PATCH partial-update, DELETE remove.',
            'Safe = read-only (GET); idempotent = N calls equal 1 call (GET/PUT/DELETE).',
            'POST is **not** idempotent — retries can duplicate; guard against double-submit.',
            'Never change data with GET; match verb to intent for a predictable API.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Which method is NOT idempotent?',
              options: [
                { id: 'a', text: 'GET', correct: false },
                { id: 'b', text: 'PUT', correct: false },
                { id: 'c', text: 'POST', correct: true },
                { id: 'd', text: 'DELETE', correct: false },
              ],
              explanation:
                'Two POSTs create two resources; GET/PUT/DELETE repeated have the same effect as once.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why should you never use GET to modify data?',
              options: [
                { id: 'a', text: 'It is too slow', correct: false },
                { id: 'b', text: 'GET is "safe" (read-only); crawlers/prefetchers trigger GETs and would change data', correct: true },
                { id: 'c', text: 'GET cannot have a URL', correct: false },
                { id: 'd', text: 'It is encrypted', correct: false },
              ],
              explanation:
                'GET must be side-effect-free; bots and caches issue GETs freely, so changes via GET cause havoc.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why does idempotency matter for unreliable networks?',
              options: [
                { id: 'a', text: 'It speeds up requests', correct: false },
                { id: 'b', text: 'Idempotent requests (GET/PUT/DELETE) can be safely retried; retrying POST may duplicate', correct: true },
                { id: 'c', text: 'It encrypts the body', correct: false },
                { id: 'd', text: 'It is required by JSON', correct: false },
              ],
              explanation:
                'A retry after a timeout is safe for idempotent verbs but risky for POST (e.g., double payment).',
            },
          ],
        },
        {
          id: 'status-codes',
          title: 'Status codes',
          minutes: 10,
          blurb: 'The 2xx/4xx/5xx language every API speaks.',
          concept: [
            {
              heading: 'The five families',
              body: 'Status codes group by first digit. **2xx success**: 200 OK, 201 Created, 204 No Content. **3xx redirect**. **4xx client error** (YOUR request was wrong): 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable. **5xx server error** (the SERVER failed): 500 Internal Error, 503 Unavailable. The family tells the frontend immediately whose fault it is.',
            },
            {
              heading: '401 vs 403 — a classic confusion',
              body: '**401 Unauthorized** actually means *unauthenticated* — "I do not know who you are" (no/expired token → the frontend redirects to login). **403 Forbidden** means *authenticated but not allowed* — "I know you, but you cannot do this" (a regular user hitting an admin endpoint → show "access denied", do NOT redirect to login). Handling them differently is essential UX.',
            },
            {
              heading: 'Why correct codes matter',
              body: 'The frontend branches on the family: 2xx → use the data; 401 → re-login; 403 → access-denied message; 404 → "not found" view; 422/400 → show validation errors on the form; 5xx → "something went wrong, try again". An API that returns 200 with `{ "error": ... }` forces the client to parse every body — correct codes let `catchError` route failures cleanly.',
            },
          ],
          codeSamples: [
            {
              title: 'Frontend reacting to status families',
              filename: 'handle-status.ts',
              language: 'typescript',
              code: "this.api.getOrder(id).subscribe({\n  next: (order) => this.show(order),                 // 2xx\n  error: (err: HttpErrorResponse) => {\n    switch (err.status) {\n      case 401: this.router.navigate(['/login']); break;   // not authenticated\n      case 403: this.toast.error('Access denied'); break;  // not allowed\n      case 404: this.show404(); break;                     // missing\n      case 422: this.showValidation(err.error); break;     // bad input\n      default:  this.toast.error('Something went wrong');  // 5xx etc.\n    }\n  },\n});",
              annotations: [
                { line: 5, note: '401 = who are you? -> send to login.' },
                { line: 6, note: '403 = I know you, but no -> access denied, NOT login.' },
                { line: 8, note: '422/400 -> map field errors back onto the form.' },
                { line: 9, note: '5xx -> generic retry message; it is the server, not the user.' },
              ],
              explanation:
                'Correct status codes let the frontend route each failure to the right UX — the contract that makes error handling clean.',
            },
          ],
          keyPoints: [
            '2xx success, 4xx your-request-wrong, 5xx server-failed — the family signals fault.',
            '401 = not authenticated (→ login); 403 = authenticated but forbidden (→ access denied).',
            'Map 422/400 to form validation, 404 to not-found, 5xx to retry.',
            'Correct codes let `catchError` route failures without parsing every body.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'A logged-in regular user hits an admin-only endpoint. The correct status is:',
              options: [
                { id: 'a', text: '401 Unauthorized', correct: false },
                { id: 'b', text: '403 Forbidden — authenticated but not allowed', correct: true },
                { id: 'c', text: '404 Not Found', correct: false },
                { id: 'd', text: '200 OK', correct: false },
              ],
              explanation:
                '401 is about identity (unauthenticated); 403 is about permission — known user, action denied.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'A 5xx status tells the frontend:',
              options: [
                { id: 'a', text: 'The user’s input was invalid', correct: false },
                { id: 'b', text: 'The server failed — generally show a retry message, not a fix-your-input message', correct: true },
                { id: 'c', text: 'The request succeeded', correct: false },
                { id: 'd', text: 'The user must log in', correct: false },
              ],
              explanation:
                '5xx is the server’s fault; the user cannot fix it by changing input — offer retry.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why is returning 200 with { "error": "..." } considered bad API design?',
              options: [
                { id: 'a', text: 'It is slower', correct: false },
                { id: 'b', text: 'It hides failure behind success, forcing clients to parse every body instead of branching on status', correct: true },
                { id: 'c', text: 'JSON cannot hold errors', correct: false },
                { id: 'd', text: 'It is not bad', correct: false },
              ],
              explanation:
                'Status codes exist so clients route success vs failure cleanly; faking 200 defeats that contract.',
            },
          ],
        },
        {
          id: 'rest-design',
          title: 'What REST really is',
          minutes: 11,
          blurb: 'Resources, conventions, and pragmatic API design.',
          concept: [
            {
              heading: 'Resources, not actions',
              body: '**REST** models your API as **resources** (nouns) addressed by URLs, manipulated with HTTP verbs. The shift: not `/getProducts` and `/createProduct` (verbs in the URL), but `/products` acted on by `GET` and `POST` (verb in the method). Collections are plural nouns (`/products`); a single item adds an id (`/products/42`); nesting shows relationships (`/products/42/reviews`).',
            },
            {
              heading: 'Conventions that make APIs predictable',
              body: 'Good REST is consistent: plural resource names, ids in the path, **filtering/sorting/paging in the query string** (`?category=audio&sort=price&page=2`), and the right verb+status for each operation. Consistency means a developer who learns one endpoint can guess the rest — the API documents itself. This is the same "predictable conventions" value as Angular’s file naming.',
            },
            {
              heading: 'Pragmatism over purity',
              body: 'Strict REST (the academic "HATEOAS" with hypermedia links) is rare in practice; most "REST" APIs are pragmatic JSON-over-HTTP with sensible conventions — and that is fine. Some actions do not fit nouns cleanly (`POST /orders/42/cancel`) — pragmatic is better than contorting. And REST is one style among several (GraphQL, gRPC — Level 5); REST’s simplicity and HTTP-native fit make it the default for most web APIs.',
            },
          ],
          codeSamples: [
            {
              title: 'RESTful vs non-RESTful design',
              filename: 'rest design',
              language: 'text',
              code: "// NON-REST: verbs in URLs, inconsistent\nPOST /getProductById\nPOST /createNewProduct\nGET  /deleteProduct?id=42        // GET that deletes! dangerous\n\n// REST: resources + verbs + query for options\nGET    /api/products?category=audio&sort=price&page=2\nGET    /api/products/42\nPOST   /api/products\nPUT    /api/products/42\nDELETE /api/products/42\nGET    /api/products/42/reviews      // nested relationship\nPOST   /api/orders/42/cancel         // pragmatic action when needed",
              annotations: [
                { line: 4, note: 'A GET that deletes — the cardinal sin; crawlers will wipe your data.' },
                { line: 7, note: 'Filtering/sorting/paging all live in the query string.' },
                { line: 12, note: 'Nesting expresses "reviews OF product 42".' },
                { line: 13, note: 'Pragmatic action verb when a pure noun does not fit.' },
              ],
              explanation:
                'Resources + verbs + query options = a predictable, self-documenting API. Be consistent, and pragmatic where REST does not fit.',
            },
          ],
          keyPoints: [
            'REST models **resources** (nouns) acted on by HTTP **verbs** — not verbs in URLs.',
            'Plural collections, ids in path, filtering/sorting/paging in the query string.',
            'Consistency makes the API self-documenting — learn one, guess the rest.',
            'Be pragmatic: action endpoints when nouns do not fit; strict HATEOAS is rare.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Which is the RESTful way to fetch product 42?',
              options: [
                { id: 'a', text: 'POST /getProduct with { id: 42 }', correct: false },
                { id: 'b', text: 'GET /api/products/42', correct: true },
                { id: 'c', text: 'GET /api/getProductById?id=42', correct: false },
                { id: 'd', text: 'POST /products/fetch/42', correct: false },
              ],
              explanation:
                'A resource (products/42) acted on by the GET verb — no action verbs in the URL.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Where do filtering and pagination belong in a REST API?',
              options: [
                { id: 'a', text: 'In the request body of a GET', correct: false },
                { id: 'b', text: 'In the query string (?category=...&page=2)', correct: true },
                { id: 'c', text: 'In the URL path as segments', correct: false },
                { id: 'd', text: 'In custom headers only', correct: false },
              ],
              explanation:
                'Query-string parameters express options like filter/sort/page on a collection resource.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What is the main practical benefit of consistent REST conventions?',
              options: [
                { id: 'a', text: 'Faster servers', correct: false },
                { id: 'b', text: 'Predictability — learn one endpoint and you can guess the rest; the API self-documents', correct: true },
                { id: 'c', text: 'Smaller responses', correct: false },
                { id: 'd', text: 'No need for HTTPS', correct: false },
              ],
              explanation:
                'Consistency lowers the cost of using and maintaining the API — the same value as predictable naming everywhere.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 2 — DESIGNING THE API CONTRACT
    // ===================================================================
    {
      id: 'l2-designing',
      order: 2,
      title: 'Level 2 — Designing the API contract',
      goal: 'Shape request/response payloads, design consistent endpoints, version and document the API, and standardize errors.',
      lessons: [
        {
          id: 'json-payloads',
          title: 'Request & response payloads',
          minutes: 11,
          blurb: 'JSON, serialization, and shaping data both ways.',
          concept: [
            {
              heading: 'JSON, the lingua franca',
              body: 'Modern APIs exchange **JSON**. The frontend serializes objects to JSON in the request body; the backend deserializes them (ASP.NET model binding), processes, and serializes a response. Both sides agree on the **shape** — the contract. A field named `price` as a number on the server must be read as a number on the client; mismatches are the most common integration bug.',
            },
            {
              heading: 'Casing and conventions',
              body: 'C# uses `PascalCase` (`ProductName`); JavaScript uses `camelCase` (`productName`). By default, ASP.NET serializes to **camelCase** so the JSON feels native to the frontend — the C# `ProductName` becomes JSON `productName`, and your Angular interface uses `productName`. Dates travel as **ISO 8601 strings** (`2026-06-01T10:00:00Z`); the frontend parses them. Agreeing these conventions up front prevents a class of bugs.',
            },
            {
              heading: 'Shape responses for the client',
              body: 'Design payloads around what the **client needs**, not your database rows. Send a `total` already computed rather than making the client sum line items; flatten or nest deliberately; omit fields the UI never uses. A list endpoint returns a lightweight summary (`{ id, name, price }`); a detail endpoint returns the full object. This is the DTO thinking from your ASP.NET course, viewed from the consumer side.',
            },
          ],
          codeSamples: [
            {
              title: 'The contract on both sides',
              filename: 'contract.ts',
              language: 'typescript',
              code: "// SERVER (C#) returns camelCase JSON:\n// { \"id\": 42, \"name\": \"Keyboard\", \"price\": 49.99,\n//   \"createdAt\": \"2026-06-01T10:00:00Z\" }\n\n// FRONTEND (TypeScript) mirrors that exact shape:\nexport interface Product {\n  id: number;\n  name: string;\n  price: number;\n  createdAt: string;        // ISO string; parse with new Date(...) if needed\n}\n\n// the interface IS the contract — keep it in sync with the API\nthis.http.get<Product>('/api/products/42');",
              annotations: [
                { line: 2, note: 'ASP.NET serializes C# PascalCase to JSON camelCase by default.' },
                { line: 10, note: 'Dates are ISO 8601 strings on the wire; parse to Date in the UI.' },
                { line: 13, note: 'The TypeScript interface mirrors the server DTO — the shared contract.' },
              ],
              explanation:
                'The interface on the client and the DTO on the server are two views of one contract. Keep them aligned (or generate one from the other).',
            },
          ],
          keyPoints: [
            'JSON is the exchange format; both sides agree on the **shape** (the contract).',
            'C# PascalCase ⇄ JSON camelCase (ASP.NET default); dates are ISO 8601 strings.',
            'Shape responses for the client’s needs, not raw DB rows (summary vs detail).',
            'The client interface mirrors the server DTO — keep them in sync.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'A C# property ProductName is serialized by ASP.NET (default) as which JSON key?',
              options: [
                { id: 'a', text: 'ProductName', correct: false },
                { id: 'b', text: 'productName (camelCase)', correct: true },
                { id: 'c', text: 'product_name', correct: false },
                { id: 'd', text: 'PRODUCTNAME', correct: false },
              ],
              explanation:
                'ASP.NET defaults to camelCase JSON so payloads feel native to JavaScript clients.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'How do dates typically travel in JSON APIs?',
              options: [
                { id: 'a', text: 'As Unix timestamps only', correct: false },
                { id: 'b', text: 'As ISO 8601 strings (2026-06-01T10:00:00Z), parsed on the client', correct: true },
                { id: 'c', text: 'As C# DateTime objects', correct: false },
                { id: 'd', text: 'They cannot be sent', correct: false },
              ],
              explanation:
                'JSON has no date type, so dates are ISO strings; the frontend parses them when needed.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why shape a response with a precomputed total instead of raw line items?',
              options: [
                { id: 'a', text: 'To hide data', correct: false },
                { id: 'b', text: 'Design payloads for what the client needs — less client logic, fewer mismatches', correct: true },
                { id: 'c', text: 'It is required by JSON', correct: false },
                { id: 'd', text: 'For encryption', correct: false },
              ],
              explanation:
                'Serving ready-to-use data reduces client computation and the chance of client/server logic drifting.',
            },
          ],
        },
        {
          id: 'designing-endpoints',
          title: 'Designing good endpoints',
          minutes: 11,
          blurb: 'Naming, granularity, and consistency that lasts.',
          concept: [
            {
              heading: 'Granularity',
              body: 'How much should one endpoint do? **Too fine** (one call per field) means the frontend makes dozens of round trips; **too coarse** (one giant endpoint returning everything) wastes bandwidth and couples the UI to a fixed shape. Aim for endpoints that map to **what a screen needs**: a product-detail screen calls `/products/42` (and maybe `/products/42/reviews`), not ten micro-calls.',
            },
            {
              heading: 'Consistency is the contract',
              body: 'Pick conventions and hold them everywhere: plural resources, the same error shape, the same pagination parameters (`?page=&pageSize=`), the same date format, the same casing. Inconsistency is a tax paid on every endpoint — `/products` returning `items` but `/orders` returning `data` forces special-casing forever. A consistent API is a kind API.',
            },
            {
              heading: 'Design for evolution',
              body: 'APIs are long-lived contracts; clients depend on them. Make **additive** changes safe (new optional fields do not break old clients) and avoid breaking ones (removing/renaming fields, changing types). When a breaking change is unavoidable, that is what versioning is for (next lesson). Design endpoints assuming someone will depend on them for years — because they will.',
            },
          ],
          codeSamples: [
            {
              title: 'Right-sized, consistent endpoints',
              filename: 'endpoint design',
              language: 'text',
              code: "// maps to what a SCREEN needs — not too fine, not too coarse\nGET /api/products/42                 -> the product detail\nGET /api/products/42/reviews?page=1  -> its reviews, paged\n\n// CONSISTENT across the whole API:\n//   plural resources         /products  /orders  /users\n//   same paging params       ?page=&pageSize=\n//   same list envelope       { items: [...], total, page, pageSize }\n//   same error shape         { status, title, errors }\n//   same casing & dates      camelCase, ISO 8601\n\n// ADDITIVE evolution is safe:\n//   adding \"discountPercent\" (optional) won't break old clients\n//   removing/renaming \"price\" WOULD break them -> needs a version",
              annotations: [
                { line: 2, note: 'Endpoint granularity follows screen needs — few, meaningful calls.' },
                { line: 8, note: 'One list envelope shape everywhere — no per-endpoint special-casing.' },
                { line: 13, note: 'Adding optional fields is safe; removing/renaming is a breaking change.' },
              ],
              explanation:
                'Right-sized, consistent, additively-evolvable endpoints make an API pleasant today and maintainable for years.',
            },
          ],
          keyPoints: [
            'Size endpoints to what a screen needs — avoid both micro-calls and giant blobs.',
            'Hold conventions everywhere: resources, paging params, error shape, casing, dates.',
            'Additive changes (new optional fields) are safe; removing/renaming/retyping breaks clients.',
            'Design APIs as long-lived contracts — someone will depend on them for years.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What is the problem with an endpoint per single field?',
              options: [
                { id: 'a', text: 'It is too secure', correct: false },
                { id: 'b', text: 'The frontend makes dozens of round trips — too fine-grained', correct: true },
                { id: 'c', text: 'It returns too much data', correct: false },
                { id: 'd', text: 'Nothing', correct: false },
              ],
              explanation:
                'Over-fine endpoints force chatty clients; aim for calls that match what a screen needs.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Which change is safe (non-breaking) for existing clients?',
              options: [
                { id: 'a', text: 'Renaming price to cost', correct: false },
                { id: 'b', text: 'Adding a new OPTIONAL field like discountPercent', correct: true },
                { id: 'c', text: 'Changing id from number to string', correct: false },
                { id: 'd', text: 'Removing the name field', correct: false },
              ],
              explanation:
                'Additive optional fields are ignored by old clients; renames/removals/type changes break them.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why does API consistency matter so much?',
              options: [
                { id: 'a', text: 'It looks nicer', correct: false },
                { id: 'b', text: 'Inconsistency forces clients to special-case every endpoint — a permanent tax', correct: true },
                { id: 'c', text: 'It is required by HTTP', correct: false },
                { id: 'd', text: 'It makes responses smaller', correct: false },
              ],
              explanation:
                'Uniform shapes/params let one client code path serve many endpoints; inconsistency multiplies effort.',
            },
          ],
        },
        {
          id: 'versioning-docs',
          title: 'Versioning & documentation',
          minutes: 10,
          blurb: 'Evolve safely; let others discover your API.',
          concept: [
            {
              heading: 'Why version',
              body: 'Once clients depend on your API, a breaking change (removing a field, changing a type) would break them on deploy. **Versioning** lets the old and new contracts coexist while clients migrate. Common schemes: in the URL (`/api/v1/products`, `/api/v2/products` — most visible and common), in a header, or in the query string. v1 keeps working while v2 ships the breaking change.',
            },
            {
              heading: 'When to version (and when not)',
              body: 'Do NOT version for additive changes — just add the optional field. DO version for breaking changes you cannot avoid. Keep versions few (v1, v2 — not v37); each version is a maintenance burden. Many APIs never go past v1 by being disciplined about additive evolution. Version is the escape hatch, not the routine.',
            },
            {
              heading: 'Documentation: OpenAPI/Swagger',
              body: 'An API nobody can discover is unusable. **OpenAPI** (Swagger) is the standard machine-readable description — generated by ASP.NET, rendered as interactive **Swagger UI** to explore and try endpoints in the browser. Crucially, this spec drives tooling: it can **generate a fully typed Angular client** so the frontend never hand-writes interfaces or URLs — a direct, end-to-end link between your two backend skills and your frontend.',
            },
          ],
          codeSamples: [
            {
              title: 'Versioning + generated client',
              filename: 'versioning',
              language: 'text',
              code: "// URL versioning — old and new coexist\nGET /api/v1/products/42   -> returns { id, name, price }\nGET /api/v2/products/42   -> returns { id, name, pricing: {...} }  (breaking)\n\n// v1 clients keep working; v2 clients get the new shape.\n// Do NOT version for additive change:\n//   GET /api/v1/products/42 can simply ADD \"discountPercent\".\n\n// OpenAPI -> generated, typed Angular client:\n//   npx openapi-generator-cli generate -i swagger.json -g typescript-angular\n//   => services + typed interfaces, always in sync with the API",
              annotations: [
                { line: 2, note: 'v1 and v2 coexist so clients migrate on their own schedule.' },
                { line: 6, note: 'Additive changes need no version — just add the optional field.' },
                { line: 9, note: 'The OpenAPI spec generates a typed client — no hand-written URLs/interfaces.' },
              ],
              explanation:
                'Version only for breaking changes; document with OpenAPI; generate the typed client so the contract stays enforced end to end.',
            },
          ],
          keyPoints: [
            'Versioning lets old and new contracts coexist; URL versioning (`/v1`, `/v2`) is most common.',
            'Version only for **breaking** changes; additive changes just add optional fields.',
            'Keep versions few — each is a maintenance burden.',
            'Document with OpenAPI/Swagger; generate a typed Angular client from the spec.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'When should you create a new API version?',
              options: [
                { id: 'a', text: 'For every change', correct: false },
                { id: 'b', text: 'Only for breaking changes you cannot avoid (removing/renaming/retyping fields)', correct: true },
                { id: 'c', text: 'Never', correct: false },
                { id: 'd', text: 'When adding optional fields', correct: false },
              ],
              explanation:
                'Additive changes are backward-compatible; versioning is reserved for unavoidable breaking changes.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does the OpenAPI/Swagger spec enable beyond documentation?',
              options: [
                { id: 'a', text: 'Faster servers', correct: false },
                { id: 'b', text: 'Generating a typed frontend client (services + interfaces) in sync with the API', correct: true },
                { id: 'c', text: 'Encrypting the API', correct: false },
                { id: 'd', text: 'Replacing the database', correct: false },
              ],
              explanation:
                'A machine-readable spec powers code generation, eliminating hand-written URLs/interfaces and drift.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why keep the number of API versions small?',
              options: [
                { id: 'a', text: 'HTTP limits it', correct: false },
                { id: 'b', text: 'Each version is an ongoing maintenance burden to keep working', correct: true },
                { id: 'c', text: 'Versions cost money per number', correct: false },
                { id: 'd', text: 'No reason', correct: false },
              ],
              explanation:
                'Every live version must keep working and be tested; disciplined additive evolution avoids version sprawl.',
            },
          ],
        },
        {
          id: 'error-contracts',
          title: 'Error contracts',
          minutes: 10,
          blurb: 'One predictable error shape the frontend can trust.',
          concept: [
            {
              heading: 'Errors are part of the API',
              body: 'The happy path is half the contract; **how failures look** is the other half. An API that returns 50 different error shapes forces the frontend to special-case each. Standardize **one** error body — status, a human title, optional detail, and field-level errors for validation. ASP.NET’s **Problem Details** (RFC 7807) is the built-in standard; use it everywhere.',
            },
            {
              heading: 'Validation errors map to fields',
              body: 'For 400/422, return errors **keyed by field**: `{ "errors": { "email": ["Invalid email"], "age": ["Must be 18+"] } }`. The frontend drops each message under the matching form control — the server’s validation flows straight into the UI (the tie-in between your ASP.NET validation lesson and Angular reactive forms). Agree field names so they line up.',
            },
            {
              heading: 'What NOT to leak',
              body: 'Errors must help the client without aiding an attacker: never expose stack traces, SQL, internal paths, or which part of a login failed ("user not found" vs "wrong password" leaks valid usernames — say "invalid credentials"). Detailed diagnostics go to **server logs**; the client gets a clean, safe message. Helpful to users, opaque to attackers.',
            },
          ],
          codeSamples: [
            {
              title: 'A standard error contract end to end',
              filename: 'error-contract.ts',
              language: 'typescript',
              code: "// SERVER returns ONE consistent shape (Problem Details):\n// 422 {\n//   \"status\": 422,\n//   \"title\": \"Validation failed\",\n//   \"errors\": {\n//     \"email\": [\"Invalid email\"],\n//     \"password\": [\"Must be at least 8 characters\"]\n//   }\n// }\n\n// FRONTEND handles every failure the same way:\nprivate handle(err: HttpErrorResponse) {\n  if (err.status === 422 && err.error?.errors) {\n    for (const [field, messages] of Object.entries(err.error.errors)) {\n      this.form.get(field)?.setErrors({ server: messages[0] });\n    }\n  } else {\n    this.toast.error(err.error?.title ?? 'Something went wrong');\n  }\n}",
              annotations: [
                { line: 5, note: 'Field-keyed errors map straight onto form controls.' },
                { line: 14, note: 'One loop applies all server validation to the right fields.' },
                { line: 18, note: 'A safe generic fallback — never a stack trace.' },
              ],
              explanation:
                'One error shape (Problem Details) + field-keyed validation = the frontend handles all failures uniformly and safely.',
            },
          ],
          keyPoints: [
            'Standardize ONE error shape (Problem Details) — status, title, detail, field errors.',
            'Validation errors keyed by field map directly onto form controls.',
            'Never leak stack traces, SQL, or which credential was wrong — log details server-side.',
            'A consistent error contract lets the frontend handle all failures uniformly.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why standardize on one error response shape?',
              options: [
                { id: 'a', text: 'It is smaller', correct: false },
                { id: 'b', text: 'So the frontend handles all failures with one code path instead of special-casing each', correct: true },
                { id: 'c', text: 'It is required by HTTP', correct: false },
                { id: 'd', text: 'For encryption', correct: false },
              ],
              explanation:
                'A single predictable shape (Problem Details) makes client error handling uniform and maintainable.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'A login fails. Which message is safest?',
              options: [
                { id: 'a', text: '"User not found"', correct: false },
                { id: 'b', text: '"Invalid credentials" — does not reveal whether the username exists', correct: true },
                { id: 'c', text: '"Wrong password for admin@site.com"', correct: false },
                { id: 'd', text: 'The full stack trace', correct: false },
              ],
              explanation:
                'Distinguishing "no such user" from "wrong password" leaks valid usernames to attackers.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'How should validation errors be structured for a form?',
              options: [
                { id: 'a', text: 'One big string', correct: false },
                { id: 'b', text: 'Keyed by field name, so each message maps to its form control', correct: true },
                { id: 'c', text: 'As HTTP headers', correct: false },
                { id: 'd', text: 'In the URL', correct: false },
              ],
              explanation:
                'Field-keyed errors let the client place each message under the right input automatically.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 3 — CONSUMING APIS FROM THE FRONTEND
    // ===================================================================
    {
      id: 'l3-consuming',
      order: 3,
      title: 'Level 3 — Consuming APIs from the frontend',
      goal: 'Fetch and send data the right way: typed calls, loading/error state, the canonical search pipeline, and caching.',
      lessons: [
        {
          id: 'fetching-data',
          title: 'Fetching data: HttpClient & fetch',
          minutes: 11,
          blurb: 'Typed GET/POST, and where API calls belong.',
          concept: [
            {
              heading: 'Two ways to call',
              body: 'In the browser the low-level API is **fetch** (`await fetch(url).then(r => r.json())`) — promise-based, built in. In Angular you use **HttpClient** (`http.get<T>(url)`) which returns an **Observable**, integrates with RxJS operators, interceptors, and the async pipe, and adds type safety. For Angular apps, HttpClient is the idiomatic choice (your Angular and RxJS skills converge here).',
            },
            {
              heading: 'Typed calls',
              body: '`http.get<Product[]>(\'/api/products\')` types the response with the **interface that mirrors the API contract** (Level 2). The type is a compile-time promise, not a runtime guarantee — the server could still send something else (validate at the boundary if it matters, per your TypeScript course). Generate the interface from OpenAPI to keep it honest.',
            },
            {
              heading: 'Calls belong in services',
              body: 'Never call the API from components directly. Wrap each resource in a **data service** (`ProductApiService` with `getAll()`, `getById()`, `create()`); components inject it and ask for data. This centralizes URLs, headers, and error handling; keeps components focused on the view; and makes the API layer testable and swappable — the exact separation you learned in Angular, applied to the network edge.',
            },
          ],
          codeSamples: [
            {
              title: 'A typed data service',
              filename: 'product-api.service.ts',
              language: 'typescript',
              code: "export interface Product { id: number; name: string; price: number; }\nexport interface CreateProduct { name: string; price: number; }  // no id\n\n@Injectable({ providedIn: 'root' })\nexport class ProductApiService {\n  private http = inject(HttpClient);\n  private base = '/api/products';\n\n  getAll(): Observable<Product[]> {\n    return this.http.get<Product[]>(this.base);\n  }\n  getById(id: number): Observable<Product> {\n    return this.http.get<Product>(`${this.base}/${id}`);\n  }\n  create(dto: CreateProduct): Observable<Product> {\n    return this.http.post<Product>(this.base, dto);   // body serialized to JSON\n  }\n}",
              annotations: [
                { line: 2, note: 'CreateProduct has no id — mirrors the server input DTO (Omit thinking).' },
                { line: 10, note: 'get<T> types the response to the contract interface.' },
                { line: 16, note: 'post sends the body as JSON; the server binds it to its DTO.' },
              ],
              explanation:
                'Resource → service → typed methods. Components never see a URL; the API layer stays centralized and testable.',
            },
          ],
          keyPoints: [
            'Browser: `fetch` (promise); Angular: `HttpClient` (Observable + RxJS + interceptors + types).',
            'Type calls with interfaces mirroring the API contract; types are compile-time, not runtime guarantees.',
            'Wrap every resource in a **data service**; components inject and ask — never call the API directly.',
            'Input types omit server-set fields (`CreateProduct` has no id) — the same Omit pattern.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why prefer HttpClient over raw fetch in an Angular app?',
              options: [
                { id: 'a', text: 'fetch is deprecated', correct: false },
                { id: 'b', text: 'HttpClient returns Observables and integrates with RxJS, interceptors, async pipe, and types', correct: true },
                { id: 'c', text: 'fetch cannot send JSON', correct: false },
                { id: 'd', text: 'No difference', correct: false },
              ],
              explanation:
                'HttpClient fits Angular’s reactive model — operators, interceptors, cancellation, and typing out of the box.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Where should API calls live?',
              options: [
                { id: 'a', text: 'Directly in components', correct: false },
                { id: 'b', text: 'In data services that components inject', correct: true },
                { id: 'c', text: 'In the template', correct: false },
                { id: 'd', text: 'In the router', correct: false },
              ],
              explanation:
                'A data service centralizes URLs/headers/errors and keeps components view-focused and testable.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'http.get<Product>(url) guarantees the server sends a Product. True or false?',
              options: [
                { id: 'a', text: 'True — the type enforces it', correct: false },
                { id: 'b', text: 'False — the type is compile-time only; the server could send anything (validate if it matters)', correct: true },
                { id: 'c', text: 'True, with HTTPS', correct: false },
                { id: 'd', text: 'Only for GET', correct: false },
              ],
              explanation:
                'TypeScript types are erased at runtime; the generic is a promise to the compiler, not a runtime check.',
            },
          ],
        },
        {
          id: 'loading-error-state',
          title: 'Loading, error & empty states',
          minutes: 11,
          blurb: 'The four states every fetch actually has.',
          concept: [
            {
              heading: 'A fetch is not one state',
              body: 'Every data fetch passes through up to four UI states: **loading** (request in flight — show a spinner/skeleton), **success with data**, **success but empty** (a valid response with zero items — show "no results", not a blank screen), and **error** (show a message + retry). Beginners render only the success state; robust apps render all four. Forgetting "empty" and "error" is the most common UX gap.',
            },
            {
              heading: 'Handling failure',
              body: 'Wrap calls so one failure does not break the screen: `catchError` returns a fallback and sets an error flag; `finalize` always clears the loading flag (success OR error). This is the production pipeline from your RxJS course, applied to API calls. Decide per case: retry transient errors, show validation on 422, redirect on 401 (next level).',
            },
            {
              heading: 'Signals make state clean',
              body: 'Model the states explicitly. The modern Angular approach: `toSignal` (or the new `httpResource`/`resource`) exposes `value`, `isLoading`, and `error` as signals the template reads directly — no manual flags. The template branches with `@if`/`@else` over those states. Whatever the mechanism, the discipline is the same: render all four states, never just success.',
            },
          ],
          codeSamples: [
            {
              title: 'All four states, handled',
              filename: 'products.component.ts',
              language: 'typescript',
              code: "loading = signal(true);\nerror = signal<string | null>(null);\nproducts = signal<Product[]>([]);\n\nngOnInit() {\n  this.api.getAll().pipe(\n    finalize(() => this.loading.set(false)),     // always clear loading\n    catchError(() => { this.error.set('Could not load'); return of([]); })\n  ).subscribe(list => this.products.set(list));\n}\n\n// template:\n// @if (loading()) { <app-spinner/> }\n// @else if (error()) { <app-error [msg]=\"error()\" (retry)=\"reload()\"/> }\n// @else if (products().length === 0) { <p>No products yet</p> }\n// @else { <app-list [items]=\"products()\"/> }",
              annotations: [
                { line: 7, note: 'finalize clears loading on success AND error — no stuck spinners.' },
                { line: 8, note: 'catchError keeps the screen alive and records the error.' },
                { line: 14, note: 'The empty state — a valid response with zero items, not a blank page.' },
              ],
              explanation:
                'Loading → error → empty → data: four branches. Rendering all four is what separates a robust UI from a demo.',
            },
          ],
          keyPoints: [
            'Every fetch has four states: loading, success-with-data, success-but-empty, error.',
            '`catchError` keeps the screen alive; `finalize` always clears the loading flag.',
            'Model state with signals (or `httpResource`): `value`, `isLoading`, `error`.',
            'Render all four states — forgetting empty/error is the most common UX gap.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'A list endpoint returns 200 with an empty array. What should the UI show?',
              options: [
                { id: 'a', text: 'An error message', correct: false },
                { id: 'b', text: 'An explicit empty state ("No results"), not a blank screen', correct: true },
                { id: 'c', text: 'A spinner forever', correct: false },
                { id: 'd', text: 'Nothing', correct: false },
              ],
              explanation:
                'Empty is a valid success; show a clear "nothing here" state distinct from loading and error.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why put clearing the loading flag in finalize?',
              options: [
                { id: 'a', text: 'It runs faster', correct: false },
                { id: 'b', text: 'finalize runs on success AND error — the spinner never gets stuck', correct: true },
                { id: 'c', text: 'It retries the request', correct: false },
                { id: 'd', text: 'It is required', correct: false },
              ],
              explanation:
                'Clearing loading only on success would leave a permanent spinner whenever the request fails.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What is the most common state developers forget to render?',
              options: [
                { id: 'a', text: 'The success state', correct: false },
                { id: 'b', text: 'The empty and error states', correct: true },
                { id: 'c', text: 'The URL', correct: false },
                { id: 'd', text: 'The loading state', correct: false },
              ],
              explanation:
                'Demos render success; production must also handle "no data" and "it failed" gracefully.',
            },
          ],
        },
        {
          id: 'search-pipeline',
          title: 'The search-as-you-type pipeline',
          minutes: 11,
          blurb: 'Debounce, cancel stale requests — the canonical pattern.',
          concept: [
            {
              heading: 'The naive version is broken',
              body: 'Calling the API on every keystroke is wasteful (a request per letter) and buggy: responses can arrive **out of order**, so a slow response for "ang" can overwrite the results for "angular" — the **race condition** that plagues search boxes. The fix is a small RxJS pipeline.',
            },
            {
              heading: 'The canonical pipeline',
              body: 'From your RxJS course, applied to a real API: `debounceTime(300)` (wait for a typing pause), `distinctUntilChanged()` (ignore non-changes), `switchMap(term => api.search(term))` — and `switchMap` is the hero: it **cancels the previous request** when a new term arrives, so stale responses can never land. Add `catchError` **inside** switchMap so one failed search does not kill the box. This exact pattern is in most production apps.',
            },
            {
              heading: 'Beyond search',
              body: 'The same shape powers dependent dropdowns (country → cities), live filters, and any "react to input by calling the API" feature. The decision table from RxJS holds: **switchMap** for reads where only the latest matters; **concatMap** for ordered writes; **exhaustMap** for submit buttons (ignore re-clicks while in flight). Picking the right one is picking correctness.',
            },
          ],
          codeSamples: [
            {
              title: 'Search-as-you-type, done right',
              filename: 'search.component.ts',
              language: 'typescript',
              code: "results = toSignal(\n  this.searchControl.valueChanges.pipe(\n    debounceTime(300),                         // wait for a pause\n    distinctUntilChanged(),                    // skip non-changes\n    filter((t): t is string => !!t && t.length >= 2),\n    switchMap(term =>                          // CANCELS stale requests\n      this.api.search(term).pipe(\n        catchError(() => of([]))               // inside: one failure won't kill it\n      )\n    )\n  ),\n  { initialValue: [] }\n);",
              annotations: [
                { line: 3, note: 'Wait until typing stops — one request per pause, not per keystroke.' },
                { line: 6, note: 'switchMap cancels the in-flight request when a new term arrives.' },
                { line: 8, note: 'catchError INSIDE switchMap: a failed search keeps the box alive.' },
              ],
              explanation:
                'debounce + distinct + switchMap(catchError) = the race-condition-free search every real app ships. It is your RxJS course meeting a real API.',
            },
          ],
          keyPoints: [
            'Calling the API per keystroke is wasteful and race-prone (stale responses overwrite fresh).',
            'Canonical pipeline: `debounceTime` + `distinctUntilChanged` + `switchMap(search)`.',
            '`switchMap` cancels stale requests — the cure for the search race condition.',
            'Put `catchError` **inside** switchMap; choose switch/concat/exhaust by intent.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Which operator prevents a slow response for an old query from overwriting a newer one?',
              options: [
                { id: 'a', text: 'mergeMap', correct: false },
                { id: 'b', text: 'switchMap — it cancels the previous request when a new term arrives', correct: true },
                { id: 'c', text: 'concatMap', correct: false },
                { id: 'd', text: 'debounceTime', correct: false },
              ],
              explanation:
                'switchMap unsubscribes the in-flight call on each new value, so stale responses never land.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does debounceTime(300) achieve in the search pipeline?',
              options: [
                { id: 'a', text: 'It cancels requests', correct: false },
                { id: 'b', text: 'It waits for a typing pause, so the API is called once per pause, not per keystroke', correct: true },
                { id: 'c', text: 'It caches results', correct: false },
                { id: 'd', text: 'It validates input', correct: false },
              ],
              explanation:
                'Debounce collapses a burst of keystrokes into a single call after the user stops typing.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Where should catchError go in the search pipeline?',
              options: [
                { id: 'a', text: 'Outside, wrapping the whole stream', correct: false },
                { id: 'b', text: 'Inside switchMap, around the api.search call — so one failure does not kill the box', correct: true },
                { id: 'c', text: 'Nowhere', correct: false },
                { id: 'd', text: 'In the template', correct: false },
              ],
              explanation:
                'Catching inside the inner observable sacrifices one search; catching outside would terminate the whole pipeline.',
            },
          ],
        },
        {
          id: 'caching-optimistic',
          title: 'Caching & optimistic updates',
          minutes: 10,
          blurb: 'Fewer requests, snappier UI — safely.',
          concept: [
            {
              heading: 'Client-side caching',
              body: 'Re-fetching unchanged data wastes time and bandwidth. **`shareReplay(1)`** turns a request into a cached stream — the first subscriber triggers the call, everyone else reuses the result (your RxJS lesson). For richer needs (per-key cache, expiry, invalidation), **TanStack Query (Angular)** is the standard: it caches by key, dedupes in-flight requests, refetches stale data, and updates the cache on mutations — far more than `shareReplay`.',
            },
            {
              heading: 'HTTP caching too',
              body: 'The server participates: `Cache-Control` and `ETag` headers let the browser and proxies cache responses. With an ETag, the client sends `If-None-Match`; if unchanged, the server returns **304 Not Modified** with no body — saving bandwidth. Client cache and HTTP cache are complementary layers; use both for read-heavy data.',
            },
            {
              heading: 'Optimistic updates',
              body: 'For snappy UX, update the UI **immediately** (assume success), fire the request in the background, and **roll back** if it fails. Liking a post, toggling a todo, reordering a list — the user sees instant feedback instead of a spinner. The discipline: keep the previous state to restore on error, and reconcile with the server’s response. Optimism with a safety net.',
            },
          ],
          codeSamples: [
            {
              title: 'Cache a read, optimistically update a write',
              filename: 'patterns.ts',
              language: 'typescript',
              code: "// CACHE: one request shared by all subscribers, replayed to latecomers\nreadonly categories$ = this.http.get<Category[]>('/api/categories').pipe(\n  shareReplay({ bufferSize: 1, refCount: false })\n);\n\n// OPTIMISTIC: update now, roll back on failure\ntoggleLike(post: Post) {\n  const previous = post.liked;\n  post.liked = !post.liked;                    // 1) update UI instantly\n  this.api.setLike(post.id, post.liked).pipe(\n    catchError(err => { post.liked = previous;  // 3) roll back on error\n      this.toast.error('Could not save'); return throwError(() => err); })\n  ).subscribe();                               // 2) request runs in background\n}",
              annotations: [
                { line: 3, note: 'shareReplay caches the categories — one request serves everyone.' },
                { line: 9, note: 'Optimistic: the heart fills instantly, before the server confirms.' },
                { line: 10, note: 'On failure, restore the previous state — the safety net.' },
              ],
              explanation:
                'shareReplay (or TanStack Query) cuts requests; optimistic updates cut perceived latency — both with safety built in.',
            },
          ],
          keyPoints: [
            '`shareReplay(1)` caches a request stream; TanStack Query adds keys, expiry, and invalidation.',
            'HTTP caching (`Cache-Control`, `ETag` → 304) is a complementary server-side layer.',
            'Optimistic updates: change the UI immediately, request in background, roll back on failure.',
            'Always keep the previous state to restore — optimism with a safety net.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does shareReplay(1) do to an HTTP call?',
              options: [
                { id: 'a', text: 'Sends it twice', correct: false },
                { id: 'b', text: 'Caches the result — one request, replayed to all current and late subscribers', correct: true },
                { id: 'c', text: 'Encrypts it', correct: false },
                { id: 'd', text: 'Cancels it', correct: false },
              ],
              explanation:
                'It multicasts a single execution and replays the latest value, avoiding duplicate requests.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is an optimistic update?',
              options: [
                { id: 'a', text: 'Retrying until success', correct: false },
                { id: 'b', text: 'Updating the UI immediately assuming success, then rolling back if the request fails', correct: true },
                { id: 'c', text: 'Caching forever', correct: false },
                { id: 'd', text: 'Validating input', correct: false },
              ],
              explanation:
                'The UI reflects the change instantly for snappiness; a failure restores the previous state.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does an ETag + 304 Not Modified save?',
              options: [
                { id: 'a', text: 'CPU only', correct: false },
                { id: 'b', text: 'Bandwidth — if unchanged, the server replies 304 with no body', correct: true },
                { id: 'c', text: 'Nothing', correct: false },
                { id: 'd', text: 'Database storage', correct: false },
              ],
              explanation:
                'The client revalidates with If-None-Match; an unchanged resource returns 304 without resending the body.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 4 — SECURITY ACROSS THE WIRE
    // ===================================================================
    {
      id: 'l4-security',
      order: 4,
      title: 'Level 4 — Security across the wire',
      goal: 'Understand CORS, the token auth flow, interceptors for auth and 401s, and the security must-dos.',
      lessons: [
        {
          id: 'cors',
          title: 'CORS — the cross-origin gatekeeper',
          minutes: 12,
          blurb: 'Why your API call is blocked, and how to fix it right.',
          concept: [
            {
              heading: 'Same-origin and why CORS exists',
              body: 'Browsers enforce the **same-origin policy**: by default, JavaScript on `https://app.com` cannot read responses from a different **origin** like `https://api.com` (origin = scheme + host + port). This protects users — a malicious site cannot silently read your bank’s API using your session. **CORS** (Cross-Origin Resource Sharing) is how a server **opts in** to allowing specific other origins.',
            },
            {
              heading: 'How CORS actually works',
              body: 'The **server** sends headers granting permission — `Access-Control-Allow-Origin: https://app.com`. For "non-simple" requests (custom headers, PUT/DELETE, JSON content-type), the browser first sends a **preflight** `OPTIONS` request asking "may I?"; the server answers with allowed origins/methods/headers, and only then does the real request go. CORS is enforced **by the browser**, configured **on the server** — your ASP.NET `AddCors`/`UseCors` from the previous skill.',
            },
            {
              heading: 'The classic confusion',
              body: 'A CORS error is **not** a frontend bug you fix in Angular — it is the **server** not allowing your origin. The fix is on the API (allowlist the frontend origin), never disabling browser security. And `Access-Control-Allow-Origin: *` (allow everyone) is fine for public read-only APIs but wrong with credentials — be specific. Most "CORS hell" dissolves once you realize: the browser blocks, the server permits.',
            },
          ],
          codeSamples: [
            {
              title: 'The preflight conversation',
              filename: 'cors exchange',
              language: 'text',
              code: "// Browser preflight (automatic) before a PUT with JSON:\nOPTIONS /api/products/42\nOrigin: https://app.com\nAccess-Control-Request-Method: PUT\n\n// Server grants permission (configured via AddCors in ASP.NET):\nHTTP/1.1 204 No Content\nAccess-Control-Allow-Origin: https://app.com\nAccess-Control-Allow-Methods: GET, POST, PUT, DELETE\nAccess-Control-Allow-Headers: Authorization, Content-Type\n\n// ...only THEN does the real PUT go through.\n// If the server omits these headers -> the browser BLOCKS the response.",
              annotations: [
                { line: 2, note: 'Preflight: the browser asks permission before the real request.' },
                { line: 8, note: 'The server allowlists this origin — configured on the API, not the client.' },
                { line: 13, note: 'No CORS headers from the server = browser blocks it. Fix the server.' },
              ],
              explanation:
                'CORS is a server permission slip the browser enforces. A CORS error means the API must allowlist your origin — not a frontend fix.',
            },
          ],
          keyPoints: [
            'Same-origin policy blocks cross-origin reads by default — protecting users.',
            'CORS = the **server** opting in via `Access-Control-Allow-*` headers.',
            'Non-simple requests trigger a **preflight** `OPTIONS` before the real call.',
            'A CORS error is a server config issue (allowlist your origin) — never disable browser security.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'You get a CORS error calling your API from Angular. Where is the fix?',
              options: [
                { id: 'a', text: 'In the Angular HttpClient config', correct: false },
                { id: 'b', text: 'On the server — it must allowlist your frontend origin via CORS headers', correct: true },
                { id: 'c', text: 'Disable browser security', correct: false },
                { id: 'd', text: 'In the database', correct: false },
              ],
              explanation:
                'CORS is configured on the API; the browser only enforces what the server permits.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is a CORS preflight?',
              options: [
                { id: 'a', text: 'A faster request', correct: false },
                { id: 'b', text: 'An automatic OPTIONS request asking the server’s permission before a non-simple request', correct: true },
                { id: 'c', text: 'A login step', correct: false },
                { id: 'd', text: 'A caching mechanism', correct: false },
              ],
              explanation:
                'For non-simple requests the browser checks allowed origins/methods/headers via OPTIONS first.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does the same-origin policy protect against?',
              options: [
                { id: 'a', text: 'Slow networks', correct: false },
                { id: 'b', text: 'A malicious site reading another origin’s responses using your session', correct: true },
                { id: 'c', text: 'Large payloads', correct: false },
                { id: 'd', text: 'Invalid JSON', correct: false },
              ],
              explanation:
                'It stops scripts on one site from reading cross-origin responses, preventing session-riding data theft.',
            },
          ],
        },
        {
          id: 'auth-flow',
          title: 'The token authentication flow',
          minutes: 12,
          blurb: 'Login, store, attach, refresh — the full frontend side.',
          concept: [
            {
              heading: 'The flow end to end',
              body: 'Pairing with the JWT you issued in ASP.NET: 1) the user submits credentials to `POST /auth/login`; 2) the server validates and returns a **token** (often an access token + a refresh token); 3) the frontend **stores** it; 4) it **attaches** the token to every subsequent request (`Authorization: Bearer ...`); 5) when it expires, it **refreshes**. Your two backend skills issue and validate; this is the consuming half.',
            },
            {
              heading: 'Where to store the token (the security crux)',
              body: 'The hardest decision. **localStorage** is easy but readable by any injected script — vulnerable to **XSS**. An **HttpOnly cookie** is invisible to JavaScript (XSS-safe) but rides automatically and needs **CSRF** protection (`SameSite`). The common modern compromise: refresh token in an HttpOnly+Secure+SameSite cookie, access token in **memory** (a variable — lost on refresh, re-obtained via the refresh token). There is no perfect option; understand the trade-off you are choosing.',
            },
            {
              heading: 'Refresh and logout',
              body: 'Access tokens are short-lived (minutes) to limit damage if stolen; when one expires (a 401), the app silently exchanges the **refresh token** for a new access token and retries — invisible to the user. **Logout** clears the stored tokens (and ideally tells the server to invalidate the refresh token). Designing this flow well is the difference between secure-and-smooth and either insecure or constantly-logging-out.',
            },
          ],
          codeSamples: [
            {
              title: 'A minimal auth service',
              filename: 'auth.service.ts',
              language: 'typescript',
              code: "@Injectable({ providedIn: 'root' })\nexport class AuthService {\n  private http = inject(HttpClient);\n  private accessToken: string | null = null;        // in memory\n\n  login(credentials: LoginDto): Observable<void> {\n    return this.http.post<{ accessToken: string }>('/auth/login', credentials,\n      { withCredentials: true })                     // refresh cookie set by server\n      .pipe(map(res => { this.accessToken = res.accessToken; }));\n  }\n\n  get token() { return this.accessToken; }\n\n  refresh(): Observable<string> {\n    return this.http.post<{ accessToken: string }>('/auth/refresh', {},\n      { withCredentials: true })                     // sends the HttpOnly cookie\n      .pipe(map(res => (this.accessToken = res.accessToken)));\n  }\n\n  logout() { this.accessToken = null; /* + call /auth/logout */ }\n}",
              annotations: [
                { line: 4, note: 'Access token in memory — not readable by injected scripts (XSS-safer).' },
                { line: 8, note: 'withCredentials lets the server set an HttpOnly refresh cookie.' },
                { line: 15, note: 'Refresh exchanges the cookie for a fresh access token, silently.' },
              ],
              explanation:
                'Login stores, refresh renews, logout clears. Token storage is a deliberate security trade-off, not an afterthought.',
            },
          ],
          keyPoints: [
            'Flow: login → receive token → store → attach on every request → refresh on expiry.',
            'Storage trade-off: localStorage (XSS-prone) vs HttpOnly cookie (CSRF, needs SameSite).',
            'Common compromise: refresh token in HttpOnly cookie, access token in memory.',
            'Short-lived access tokens + silent refresh; logout clears tokens.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why is storing a token in localStorage a security concern?',
              options: [
                { id: 'a', text: 'It is too slow', correct: false },
                { id: 'b', text: 'Any injected script (XSS) can read it', correct: true },
                { id: 'c', text: 'It expires instantly', correct: false },
                { id: 'd', text: 'It cannot hold strings', correct: false },
              ],
              explanation:
                'localStorage is fully readable by JavaScript, so an XSS vulnerability exposes the token.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is the advantage of an HttpOnly cookie for the refresh token?',
              options: [
                { id: 'a', text: 'It is faster', correct: false },
                { id: 'b', text: 'JavaScript cannot read it — immune to XSS theft (but needs CSRF protection)', correct: true },
                { id: 'c', text: 'It never expires', correct: false },
                { id: 'd', text: 'It avoids HTTPS', correct: false },
              ],
              explanation:
                'HttpOnly hides the cookie from scripts; you then defend against CSRF with SameSite/anti-forgery.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why are access tokens deliberately short-lived?',
              options: [
                { id: 'a', text: 'To annoy users', correct: false },
                { id: 'b', text: 'To limit the damage window if one is stolen; a refresh token renews them silently', correct: true },
                { id: 'c', text: 'To save storage', correct: false },
                { id: 'd', text: 'HTTP requires it', correct: false },
              ],
              explanation:
                'A short lifetime caps how long a leaked token is useful; silent refresh keeps UX smooth.',
            },
          ],
        },
        {
          id: 'interceptors',
          title: 'Interceptors: auth & error handling',
          minutes: 11,
          blurb: 'Attach the token and handle 401s — in one place.',
          concept: [
            {
              heading: 'The cross-cutting problem',
              body: 'Every protected request needs the token; every response might be a 401. Doing this in each service is repetitive and error-prone. An **HTTP interceptor** (Angular) runs on **every** request/response — the client-side twin of ASP.NET middleware. One interceptor attaches `Authorization` to all outgoing requests; another catches errors centrally. Write it once, it applies everywhere.',
            },
            {
              heading: 'The auth interceptor',
              body: 'A functional interceptor clones the request (requests are immutable), adds the `Authorization: Bearer` header from the auth service, and forwards it. Now no service ever sets the header manually — change the scheme once and all calls update. This is the canonical use of interceptors and pairs exactly with your ASP.NET `[Authorize]` endpoints.',
            },
            {
              heading: 'Handling 401 with refresh',
              body: 'The advanced pattern: an interceptor catches a **401**, calls the auth service to **refresh** the token, then **retries** the original request with the new token — invisible to the user. Care is needed to avoid loops (do not refresh on the refresh endpoint) and to queue concurrent 401s during a single refresh. This is one of the trickiest real RxJS pipelines — and a rite of passage for frontend developers.',
            },
          ],
          codeSamples: [
            {
              title: 'Auth interceptor + 401 refresh-and-retry',
              filename: 'auth.interceptor.ts',
              language: 'typescript',
              code: "export const authInterceptor: HttpInterceptorFn = (req, next) => {\n  const auth = inject(AuthService);\n  const token = auth.token;\n\n  // 1) attach the token to every request (requests are immutable -> clone)\n  const authed = token\n    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })\n    : req;\n\n  // 2) on 401, refresh once and retry the original request\n  return next(authed).pipe(\n    catchError((err: HttpErrorResponse) => {\n      if (err.status === 401 && !req.url.includes('/auth/refresh')) {\n        return auth.refresh().pipe(\n          switchMap(fresh => next(\n            req.clone({ setHeaders: { Authorization: `Bearer ${fresh}` } })\n          ))\n        );\n      }\n      return throwError(() => err);\n    })\n  );\n};\n\n// register once: provideHttpClient(withInterceptors([authInterceptor]))",
              annotations: [
                { line: 7, note: 'Clone to add the header — HttpRequest is immutable.' },
                { line: 13, note: 'Guard against looping on the refresh endpoint itself.' },
                { line: 14, note: 'Refresh, then retry the original request with the new token — invisibly.' },
              ],
              explanation:
                'One interceptor attaches the token everywhere and transparently recovers from expiry. Written once, it governs every request.',
            },
          ],
          keyPoints: [
            'Interceptors run on every request/response — the client twin of server middleware.',
            'Auth interceptor clones the request and attaches `Authorization: Bearer` once, for all calls.',
            '401 pattern: catch → refresh token → retry original request, transparently.',
            'Guard against refresh loops and queue concurrent 401s during a refresh.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why attach the auth token via an interceptor instead of in each service?',
              options: [
                { id: 'a', text: 'It is faster', correct: false },
                { id: 'b', text: 'One interceptor applies to every request — no repetition, change the scheme in one place', correct: true },
                { id: 'c', text: 'Services cannot set headers', correct: false },
                { id: 'd', text: 'It encrypts the token', correct: false },
              ],
              explanation:
                'Cross-cutting concerns belong in one interceptor; every outgoing request gets the header automatically.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why must you clone the HttpRequest to add a header?',
              options: [
                { id: 'a', text: 'For performance', correct: false },
                { id: 'b', text: 'HttpRequest is immutable — you create a modified copy', correct: true },
                { id: 'c', text: 'It is optional', correct: false },
                { id: 'd', text: 'To cache it', correct: false },
              ],
              explanation:
                'Requests are immutable; req.clone({ setHeaders }) produces a new request with the header added.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'In the 401 refresh-and-retry interceptor, what must you guard against?',
              options: [
                { id: 'a', text: 'Using HTTPS', correct: false },
                { id: 'b', text: 'Infinite loops — do not try to refresh when the refresh call itself returns 401', correct: true },
                { id: 'c', text: 'Caching', correct: false },
                { id: 'd', text: 'Logging', correct: false },
              ],
              explanation:
                'Refreshing on a failed refresh would loop forever; exclude the refresh endpoint and handle concurrent 401s.',
            },
          ],
        },
        {
          id: 'security-musts',
          title: 'API security must-dos',
          minutes: 10,
          blurb: 'HTTPS, validation, secrets, and the OWASP mindset.',
          concept: [
            {
              heading: 'HTTPS, always',
              body: 'Without **HTTPS**, everything — tokens, passwords, data — travels in plaintext, readable by anyone on the network. HTTPS encrypts the channel; it is non-negotiable for any real API (free via Let’s Encrypt; automatic on Vercel/most hosts). The frontend must call `https://` endpoints, and the server should redirect HTTP→HTTPS and send HSTS.',
            },
            {
              heading: 'The shared responsibility',
              body: 'Security spans both sides. **Server** (your ASP.NET skill): validate all input, authorize every endpoint, parameterized queries, hash passwords, rate limit. **Frontend**: never trust the client as a security boundary (validation there is UX, not security — the server re-validates), store tokens carefully, avoid putting secrets in frontend code (anything shipped to the browser is public — API keys for third-party services must be proxied through your backend).',
            },
            {
              heading: 'The OWASP mindset',
              body: 'Think like an attacker. **XSS** — injected scripts (Angular escapes by default; never bypass with raw innerHTML on untrusted data). **CSRF** — forged requests riding cookies (SameSite, anti-forgery tokens). **Injection** — handled by parameterized queries server-side. **Broken access control** — the #1 risk; check authorization on the server for every action, never trust the UI hiding a button. The OWASP Top 10 is the canonical checklist — security is layers, never one switch.',
            },
          ],
          codeSamples: [
            {
              title: 'Frontend security do/don’t',
              filename: 'security.ts',
              language: 'typescript',
              code: "// DON'T: secret in frontend code -> shipped to every browser, fully public\nconst stripeSecret = 'sk_live_...';        // NEVER. Proxy through your backend.\n\n// DON'T: bypass Angular's escaping with untrusted data -> XSS\n// [innerHTML]=\"untrustedUserHtml\"          // dangerous\n\n// DO: let Angular escape (default), call HTTPS, validate on the SERVER\nthis.http.post('https://api.myapp.com/orders', dto);  // encrypted channel\n\n// DO: remember client validation is UX only — the server re-validates\nif (this.form.valid) { /* nice UX, but the API still checks */ }\n\n// DO: hide admin buttons in UI, but the SERVER must enforce authorization\n// (hiding a button is not security — an attacker calls the API directly)",
              annotations: [
                { line: 2, note: 'Anything in frontend code is public — secrets belong on the backend.' },
                { line: 8, note: 'HTTPS encrypts tokens and data in transit — non-negotiable.' },
                { line: 14, note: 'Broken access control is the #1 risk: the server enforces, not the UI.' },
              ],
              explanation:
                'Frontend handles UX and careful token storage; the server is the real security boundary. Both, in layers — the OWASP mindset.',
            },
          ],
          keyPoints: [
            'HTTPS always — without it, tokens and data travel in plaintext.',
            'The client is never a security boundary: client validation is UX; the **server** re-validates and authorizes.',
            'No secrets in frontend code (it ships to the browser) — proxy third-party keys through your backend.',
            'OWASP mindset: XSS (Angular escapes), CSRF (SameSite), broken access control (#1 — enforce server-side).',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why can’t you store a third-party API secret key in your Angular code?',
              options: [
                { id: 'a', text: 'It is too long', correct: false },
                { id: 'b', text: 'Frontend code ships to every browser — anyone can read it; proxy it through your backend', correct: true },
                { id: 'c', text: 'Angular forbids strings', correct: false },
                { id: 'd', text: 'It slows the app', correct: false },
              ],
              explanation:
                'Everything in the bundle is public; secrets must live on the server and be used via a backend proxy.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Hiding an admin button in the UI is sufficient security. True or false?',
              options: [
                { id: 'a', text: 'True', correct: false },
                { id: 'b', text: 'False — an attacker calls the API directly; the server must enforce authorization', correct: true },
                { id: 'c', text: 'True with HTTPS', correct: false },
                { id: 'd', text: 'True if the button is disabled', correct: false },
              ],
              explanation:
                'Broken access control (the #1 OWASP risk): UI hiding is cosmetic; the endpoint itself must check permissions.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Client-side form validation is primarily for:',
              options: [
                { id: 'a', text: 'Security — it is the real gate', correct: false },
                { id: 'b', text: 'UX — fast feedback; the server still re-validates as the security boundary', correct: true },
                { id: 'c', text: 'Encryption', correct: false },
                { id: 'd', text: 'Caching', correct: false },
              ],
              explanation:
                'The client can be bypassed; client validation improves UX while the server enforces the real rules.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 5 — ADVANCED PATTERNS & ALTERNATIVES
    // ===================================================================
    {
      id: 'l5-advanced',
      order: 5,
      title: 'Level 5 — Advanced patterns & alternatives',
      goal: 'Handle large data, real-time updates, and files — and know when REST gives way to GraphQL, gRPC, or BFF.',
      lessons: [
        {
          id: 'pagination-scale',
          title: 'Pagination, filtering & large data',
          minutes: 11,
          blurb: 'Never return everything — page, filter, and sort at scale.',
          concept: [
            {
              heading: 'Why pagination is mandatory',
              body: 'An endpoint that returns all rows works with 10 records and collapses with a million — crushing the server, the network, and the client. **Pagination** returns a bounded **page** at a time. The contract: the client sends `?page=2&pageSize=20`; the server returns the page **plus metadata** (total count, page, pageSize) so the UI can render "showing 21–40 of 1,043" and page controls.',
            },
            {
              heading: 'Offset vs cursor pagination',
              body: '**Offset** pagination (`?page=2&pageSize=20` → SQL `Skip/Take`) is simple and supports jumping to any page — but it gets slow on deep pages and can skip/duplicate items if data changes mid-paging. **Cursor** (keyset) pagination (`?after=<lastId>`) is stable and fast for infinite scroll / feeds, but only goes forward/back, not to arbitrary pages. Choose by UX: page numbers → offset; infinite scroll → cursor.',
            },
            {
              heading: 'Filtering and sorting',
              body: 'Pair pagination with query-string **filtering** (`?category=audio&minPrice=10`) and **sorting** (`?sort=price&order=desc`) — all parsed on the server into a database query (your EF Core skill). The frontend turns user controls (search box, filter chips, sort dropdown) into these parameters, ideally through the debounced pipeline from Level 3. Together they make huge datasets browsable.',
            },
          ],
          codeSamples: [
            {
              title: 'A paged, filtered request and response',
              filename: 'pagination',
              language: 'text',
              code: "// REQUEST: page + filter + sort, all in the query string\nGET /api/products?category=audio&minPrice=10&sort=price&order=desc&page=2&pageSize=20\n\n// RESPONSE: the page PLUS metadata for the UI\n{\n  \"items\": [ /* 20 products */ ],\n  \"page\": 2,\n  \"pageSize\": 20,\n  \"total\": 1043          // -> \"showing 21-40 of 1043\"\n}\n\n// Offset (above): Skip/Take, jump to any page, slow when deep.\n// Cursor:  GET /api/products?after=PROD_8842&pageSize=20\n//          stable + fast for infinite scroll, forward/back only.",
              annotations: [
                { line: 2, note: 'Filter, sort, and page all expressed as query parameters.' },
                { line: 9, note: 'total lets the UI show counts and build page controls.' },
                { line: 13, note: 'Cursor pagination: stable for feeds, but no arbitrary page jumps.' },
              ],
              explanation:
                'Page + metadata + filter + sort in the query string make any dataset browsable. Pick offset for page numbers, cursor for feeds.',
            },
          ],
          keyPoints: [
            'Always paginate lists; return the page **plus metadata** (total, page, pageSize).',
            'Offset (`Skip/Take`): jump to any page, slow when deep; Cursor: stable/fast feeds, forward-only.',
            'Filtering and sorting live in the query string, parsed into a DB query server-side.',
            'The frontend turns controls into params — ideally via the debounced pipeline.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Besides the items, what must a paginated response include?',
              options: [
                { id: 'a', text: 'Nothing else', correct: false },
                { id: 'b', text: 'Metadata like total count, page, and pageSize so the UI can render controls', correct: true },
                { id: 'c', text: 'The full dataset', correct: false },
                { id: 'd', text: 'A token', correct: false },
              ],
              explanation:
                'Total/page/pageSize let the client show "X–Y of N" and build navigation.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'For an infinite-scroll feed where data changes often, which pagination is more stable?',
              options: [
                { id: 'a', text: 'Offset (page numbers)', correct: false },
                { id: 'b', text: 'Cursor (keyset) pagination', correct: true },
                { id: 'c', text: 'No pagination', correct: false },
                { id: 'd', text: 'Random', correct: false },
              ],
              explanation:
                'Cursor pagination avoids the skip/duplicate problems offset suffers when data shifts mid-paging.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Where do filter and sort parameters belong in a REST API?',
              options: [
                { id: 'a', text: 'In the request body', correct: false },
                { id: 'b', text: 'In the query string (?category=...&sort=...)', correct: true },
                { id: 'c', text: 'In the URL path', correct: false },
                { id: 'd', text: 'In headers', correct: false },
              ],
              explanation:
                'Filtering, sorting, and paging are options on a collection — expressed as query parameters.',
            },
          ],
        },
        {
          id: 'realtime',
          title: 'Real-time: WebSockets, SignalR & SSE',
          minutes: 11,
          blurb: 'When request/response is not enough — push data live.',
          concept: [
            {
              heading: 'The limit of request/response',
              body: 'HTTP request/response is **client-initiated**: the server cannot speak until asked. For live data — chat, notifications, live scores, collaborative editing, dashboards — that does not work. **Polling** (asking repeatedly) is wasteful and laggy. Real-time needs a **persistent connection** the server can push through.',
            },
            {
              heading: 'The three options',
              body: '**WebSockets** — a full-duplex (two-way) persistent connection; the foundation of most real-time. **SignalR** (ASP.NET’s library) wraps WebSockets with automatic reconnection, fallbacks, and simple "hub" methods — the idiomatic .NET choice, with an Angular client. **Server-Sent Events (SSE)** — a simpler one-way (server→client) stream over plain HTTP, perfect for notifications/feeds where the client only listens. Pick by direction: two-way → WebSockets/SignalR; server-push-only → SSE.',
            },
            {
              heading: 'Modeling it on the frontend',
              body: 'A live connection is a **stream of values over time** — exactly an RxJS Observable (your RxJS course’s core idea, finally literal). You wrap the SignalR/WebSocket connection in an Observable, and the template consumes it with the async pipe; new messages flow in and the UI updates reactively. Real-time is where "everything is a stream" stops being a metaphor.',
            },
          ],
          codeSamples: [
            {
              title: 'A SignalR stream as an Observable',
              filename: 'notifications.service.ts',
              language: 'typescript',
              code: "// wrap a live SignalR connection as an Observable<Notification>\nmessages$ = new Observable<Notification>(subscriber => {\n  const conn = new signalR.HubConnectionBuilder()\n    .withUrl('/hubs/notifications')\n    .withAutomaticReconnect()\n    .build();\n\n  conn.on('notify', (msg: Notification) => subscriber.next(msg));\n  conn.start();\n\n  return () => conn.stop();          // teardown on unsubscribe\n});\n\n// template: {{ messages$ | async }} -> updates live as the server pushes\n\n// Direction guide:\n//   two-way (chat)        -> WebSockets / SignalR\n//   server-push only (feed) -> Server-Sent Events (SSE)",
              annotations: [
                { line: 8, note: 'Each server push becomes a value in the Observable stream.' },
                { line: 11, note: 'Teardown stops the connection when the component unsubscribes — no leak.' },
                { line: 14, note: 'The async pipe renders live updates reactively.' },
              ],
              explanation:
                'A real-time connection IS an Observable — server pushes become stream values. This is your RxJS course made literal.',
            },
          ],
          keyPoints: [
            'Request/response is client-initiated; real-time needs a persistent server-push connection.',
            'WebSockets = two-way; **SignalR** wraps them for .NET (reconnect, fallbacks, hubs); **SSE** = simple server→client.',
            'Choose by direction: two-way → WebSockets/SignalR; push-only → SSE.',
            'Model a live connection as an RxJS Observable — server pushes become stream values.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why can’t plain request/response deliver live chat?',
              options: [
                { id: 'a', text: 'It is too fast', correct: false },
                { id: 'b', text: 'The server cannot initiate — it only responds when asked; live data needs server push', correct: true },
                { id: 'c', text: 'JSON is too small', correct: false },
                { id: 'd', text: 'It cannot use HTTPS', correct: false },
              ],
              explanation:
                'HTTP is client-initiated; real-time requires a persistent connection the server can push through.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'For one-way server→client notifications, the simplest fit is:',
              options: [
                { id: 'a', text: 'WebSockets', correct: false },
                { id: 'b', text: 'Server-Sent Events (SSE) — a one-way stream over plain HTTP', correct: true },
                { id: 'c', text: 'Polling', correct: false },
                { id: 'd', text: 'gRPC', correct: false },
              ],
              explanation:
                'SSE is a lightweight one-way push; full-duplex WebSockets are overkill when the client only listens.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'How is a real-time connection naturally modeled on the Angular frontend?',
              options: [
                { id: 'a', text: 'As a single Promise', correct: false },
                { id: 'b', text: 'As an RxJS Observable — server pushes become stream values', correct: true },
                { id: 'c', text: 'As a static array', correct: false },
                { id: 'd', text: 'As a signal only', correct: false },
              ],
              explanation:
                'A stream of values over time is exactly an Observable; the async pipe renders pushes live.',
            },
          ],
        },
        {
          id: 'files',
          title: 'File uploads & downloads',
          minutes: 10,
          blurb: 'Binary data, progress, and the right approach.',
          concept: [
            {
              heading: 'Uploads',
              body: 'Files are binary, not JSON. The classic approach sends **multipart/form-data** (a `FormData` object with the file); the server receives it as `IFormFile`. For large files or scale, the modern pattern is **direct-to-storage**: the backend issues a **pre-signed URL** (to S3/Azure Blob) and the browser uploads straight to storage, bypassing your API server — far more scalable. The API only records metadata.',
            },
            {
              heading: 'Progress and validation',
              body: 'Users need feedback on big uploads — HttpClient’s `reportProgress` + `observe: \'events\'` emits upload progress you bind to a progress bar. Validate on both sides: the frontend checks type/size for instant UX; the **server re-validates** (a malicious client can lie about content type) and scans if needed — the "client is not a security boundary" rule again.',
            },
            {
              heading: 'Downloads',
              body: 'For downloads, request the response as a **blob** (`responseType: \'blob\'`), then trigger a save in the browser. For large or protected files, prefer a **pre-signed download URL** or a streaming endpoint with the right `Content-Disposition` header so the browser handles it natively. Never load a huge file fully into memory if you can stream it.',
            },
          ],
          codeSamples: [
            {
              title: 'Upload with progress; download as blob',
              filename: 'files.ts',
              language: 'typescript',
              code: "// UPLOAD with progress\nupload(file: File) {\n  const form = new FormData();\n  form.append('file', file);                 // multipart/form-data\n  return this.http.post('/api/files', form, {\n    reportProgress: true, observe: 'events'\n  }).pipe(\n    map(e => e.type === HttpEventType.UploadProgress && e.total\n      ? Math.round(100 * e.loaded / e.total)  // -> bind to a progress bar\n      : null)\n  );\n}\n\n// DOWNLOAD as a blob\ndownload(id: number) {\n  return this.http.get(`/api/files/${id}`, { responseType: 'blob' });\n}\n\n// At scale: pre-signed URL -> browser uploads/downloads direct to storage,\n// bypassing the API server. The API only stores metadata.",
              annotations: [
                { line: 4, note: 'FormData sends the binary file as multipart/form-data.' },
                { line: 6, note: 'reportProgress + observe events stream upload progress.' },
                { line: 16, note: 'responseType blob receives binary for a browser download.' },
              ],
              explanation:
                'Multipart for simple cases, blobs for downloads, and pre-signed URLs to scale by skipping your server entirely.',
            },
          ],
          keyPoints: [
            'Files are binary: upload via `FormData` (multipart); receive as `IFormFile` server-side.',
            'At scale, use **pre-signed URLs** — the browser uploads/downloads directly to storage.',
            'Show progress with `reportProgress`/events; validate type/size on the client (UX) AND server (security).',
            'Download via `responseType: \'blob\'`; stream large files, never buffer them whole.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'How are files typically sent in a simple upload?',
              options: [
                { id: 'a', text: 'As a JSON string', correct: false },
                { id: 'b', text: 'As multipart/form-data via a FormData object', correct: true },
                { id: 'c', text: 'In the URL', correct: false },
                { id: 'd', text: 'As a query parameter', correct: false },
              ],
              explanation:
                'Binary files go as multipart/form-data; the server binds them to IFormFile.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is the advantage of a pre-signed upload URL?',
              options: [
                { id: 'a', text: 'It is encrypted twice', correct: false },
                { id: 'b', text: 'The browser uploads directly to storage, bypassing your API server — far more scalable', correct: true },
                { id: 'c', text: 'It compresses the file', correct: false },
                { id: 'd', text: 'It skips validation', correct: false },
              ],
              explanation:
                'Direct-to-storage offloads large transfers from your API, which only records metadata.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Client-side file-type validation is enough on its own. True or false?',
              options: [
                { id: 'a', text: 'True', correct: false },
                { id: 'b', text: 'False — a malicious client can lie; the server must re-validate', correct: true },
                { id: 'c', text: 'True for images', correct: false },
                { id: 'd', text: 'True with HTTPS', correct: false },
              ],
              explanation:
                'Client checks are UX; the server is the security boundary and must re-validate (and scan if needed).',
            },
          ],
        },
        {
          id: 'api-alternatives',
          title: 'Beyond REST: GraphQL, gRPC & BFF',
          minutes: 11,
          blurb: 'The alternatives — and when each beats REST.',
          concept: [
            {
              heading: 'GraphQL — the client picks the shape',
              body: 'With REST, the server decides each endpoint’s shape — leading to **over-fetching** (getting fields you do not need) or **under-fetching** (needing several calls for one screen). **GraphQL** flips it: one endpoint, and the **client specifies exactly which fields** it wants in a query, getting precisely that in one round trip. Great for complex, varied UIs and mobile (bandwidth). Costs: more server complexity, harder caching. Tools: Apollo on both ends.',
            },
            {
              heading: 'gRPC — fast service-to-service',
              body: '**gRPC** uses Protocol Buffers (a compact binary format) over HTTP/2 with a strict contract and code generation — very fast and strongly typed. Its sweet spot is **service-to-service** (microservices) and internal APIs, not browsers directly (needs a proxy). Where REST is human-readable JSON, gRPC trades readability for raw speed and contract strictness.',
            },
            {
              heading: 'BFF and the big picture',
              body: 'A **Backend-for-Frontend (BFF)** is an API layer tailored to one frontend — it aggregates several backend/microservice calls into the exact shapes a screen needs, handling auth and orchestration so the client stays simple. The meta-lesson: **REST is the default** for web APIs (simple, HTTP-native, cacheable); reach for GraphQL (flexible client-driven data), gRPC (fast internal), or a BFF (tailored aggregation) when the problem demands it. Match the style to the need — the theme of every course.',
            },
          ],
          codeSamples: [
            {
              title: 'REST vs GraphQL for one screen',
              filename: 'comparison',
              language: 'text',
              code: "// REST: maybe several calls, fixed shapes (possible over/under-fetching)\nGET /api/users/42                 -> the whole user object\nGET /api/users/42/orders          -> all order fields\nGET /api/users/42/orders/recent   -> ...another call\n\n// GraphQL: ONE request, the client picks exactly the fields\nPOST /graphql\n{\n  user(id: 42) {\n    name\n    orders(last: 3) { id total }   // exactly these fields, one round trip\n  }\n}\n\n// Decision guide:\n//   default web API        -> REST\n//   flexible, client-driven data, varied UIs -> GraphQL\n//   fast internal service-to-service         -> gRPC\n//   tailored aggregation for one frontend    -> BFF",
              annotations: [
                { line: 2, note: 'REST: server-defined shapes; may over-fetch or need several calls.' },
                { line: 11, note: 'GraphQL: the client requests precisely the fields it needs, in one call.' },
                { line: 16, note: 'Match the style to the problem — REST remains the sensible default.' },
              ],
              explanation:
                'GraphQL gives clients shape control, gRPC gives internal speed, a BFF gives tailored aggregation — but REST is the default that fits most web APIs.',
            },
          ],
          keyPoints: [
            'GraphQL: one endpoint, client picks exact fields — solves over/under-fetching; costlier server & caching.',
            'gRPC: compact binary over HTTP/2, strict + fast — best for service-to-service, not browsers directly.',
            'BFF: an API tailored to one frontend, aggregating calls into screen-ready shapes.',
            'REST is the default for web APIs; reach for alternatives when the problem demands — match style to need.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What core problem does GraphQL address versus REST?',
              options: [
                { id: 'a', text: 'It is more secure', correct: false },
                { id: 'b', text: 'Over- and under-fetching — the client requests exactly the fields it needs in one call', correct: true },
                { id: 'c', text: 'It is always faster', correct: false },
                { id: 'd', text: 'It removes the need for a server', correct: false },
              ],
              explanation:
                'GraphQL lets the client shape the response, avoiding wasted fields and multiple round trips.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Where does gRPC shine?',
              options: [
                { id: 'a', text: 'Directly in browsers', correct: false },
                { id: 'b', text: 'Fast, strongly-typed service-to-service / internal APIs', correct: true },
                { id: 'c', text: 'Public REST replacements for the web', correct: false },
                { id: 'd', text: 'Static sites', correct: false },
              ],
              explanation:
                'Its compact binary + HTTP/2 + strict contracts suit internal microservice communication, not browsers directly.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What is a Backend-for-Frontend (BFF)?',
              options: [
                { id: 'a', text: 'A database', correct: false },
                { id: 'b', text: 'An API layer tailored to one frontend, aggregating calls into screen-ready shapes', correct: true },
                { id: 'c', text: 'A CSS framework', correct: false },
                { id: 'd', text: 'A testing tool', correct: false },
              ],
              explanation:
                'A BFF orchestrates and shapes backend data for a specific client, keeping the frontend simple.',
            },
          ],
        },
      ],
    },
  ],
};
