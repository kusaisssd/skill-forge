import { Course } from '../models/course.model';

/**
 * The ASP.NET Core course — from zero to advanced.
 * Focus: understand how a real .NET backend project is structured and built,
 * read C# and ASP.NET code confidently, and know each part's job.
 */
export const ASPNET_COURSE: Course = {
  outcome:
    'By the end you will understand the .NET platform and C# essentials, read and structure a real ASP.NET Core project, build web APIs with controllers/minimal APIs, work with data through EF Core, apply clean architecture and dependency injection, and know how a backend is configured, secured, and deployed.',
  levels: [
    // ===================================================================
    // LEVEL 1 — .NET & C# FOUNDATIONS
    // ===================================================================
    {
      id: 'l1-foundations',
      order: 1,
      title: 'Level 1 — .NET & C# foundations',
      goal: 'Understand what .NET and ASP.NET Core are, the C# you need, the project anatomy, and how an app starts.',
      lessons: [
        {
          id: 'what-is-dotnet',
          title: 'What .NET & ASP.NET Core are',
          minutes: 10,
          blurb: 'The platform, the runtime, and where ASP.NET fits.',
          concept: [
            {
              heading: 'The platform',
              body: '**.NET** is a free, cross-platform, open-source development platform from Microsoft. You write code in **C#** (the dominant language; F# and VB also exist), the compiler turns it into **IL** (intermediate language), and the **CLR runtime** runs it — on Windows, Linux, or macOS. The modern unified line (".NET 5, 6, 7, 8, 9...") replaced the old Windows-only ".NET Framework"; new projects use modern .NET.',
            },
            {
              heading: 'Where ASP.NET Core fits',
              body: '**ASP.NET Core** is the web framework that runs on .NET — for building web APIs, server-rendered sites, and real-time apps. It is the **backend** counterpart to Angular: Angular runs in the browser and renders UI; ASP.NET Core runs on a server and exposes data and logic, usually as a **web API** that an Angular app calls (exactly the bridge your next skill covers).',
            },
            {
              heading: 'Why teams choose it',
              body: 'High performance (among the fastest web frameworks), strong typing and tooling (the C#/Visual Studio/Rider experience), one framework for APIs + real-time + background jobs, and a huge ecosystem (NuGet packages, like npm for .NET). It is a common enterprise choice — and pairs naturally with an Angular frontend.',
            },
          ],
          codeSamples: [
            {
              title: 'The smallest ASP.NET Core app',
              filename: 'Program.cs',
              language: 'text',
              code: "var builder = WebApplication.CreateBuilder(args);\nvar app = builder.Build();\n\napp.MapGet(\"/\", () => \"Hello from ASP.NET Core!\");\n\napp.Run();",
              annotations: [
                { line: 1, note: 'builder: collects configuration and services before the app starts.' },
                { line: 4, note: 'MapGet: respond to GET / with text — a minimal API endpoint.' },
                { line: 6, note: 'Run: start the web server and listen for requests.' },
              ],
              explanation:
                'Six lines = a running web server. Modern .NET stripped away the historical boilerplate.',
            },
          ],
          keyPoints: [
            '.NET = cross-platform platform; C# = the main language; CLR = the runtime.',
            'Modern .NET (5+) is unified and cross-platform — not the old Windows-only Framework.',
            'ASP.NET Core = the web framework on .NET; the backend to Angular’s frontend.',
            'Chosen for performance, tooling, one-framework breadth, and the NuGet ecosystem.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What is the relationship between .NET and ASP.NET Core?',
              options: [
                { id: 'a', text: 'They are the same thing', correct: false },
                { id: 'b', text: '.NET is the platform/runtime; ASP.NET Core is the web framework that runs on it', correct: true },
                { id: 'c', text: 'ASP.NET Core replaced .NET', correct: false },
                { id: 'd', text: '.NET runs in the browser', correct: false },
              ],
              explanation:
                '.NET provides the runtime and base libraries; ASP.NET Core builds web apps and APIs on top.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'In a typical Angular + ASP.NET Core stack, ASP.NET Core is the:',
              options: [
                { id: 'a', text: 'Frontend rendering in the browser', correct: false },
                { id: 'b', text: 'Backend server exposing a web API that Angular calls', correct: true },
                { id: 'c', text: 'CSS framework', correct: false },
                { id: 'd', text: 'Database', correct: false },
              ],
              explanation:
                'Angular renders UI in the browser; ASP.NET Core serves data/logic over HTTP from the server.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which is the language you primarily write ASP.NET Core in?',
              options: [
                { id: 'a', text: 'JavaScript', correct: false },
                { id: 'b', text: 'C#', correct: true },
                { id: 'c', text: 'Python', correct: false },
                { id: 'd', text: 'SQL', correct: false },
              ],
              explanation:
                'C# is the dominant .NET language; it compiles to IL and runs on the CLR.',
            },
          ],
        },
        {
          id: 'csharp-essentials',
          title: 'C# you need for the backend',
          minutes: 12,
          blurb: 'Types, classes, async/await, LINQ — reading C# fluently.',
          concept: [
            {
              heading: 'A typed, OOP language',
              body: 'C# is **statically typed** and object-oriented — much of it will feel familiar from TypeScript (which borrowed heavily from C#). Types: `int`, `string`, `bool`, `decimal` (money!), `DateTime`, and collections like `List<T>`. Code lives in **classes**, grouped into **namespaces**, compiled into **assemblies** (.dll files).',
            },
            {
              heading: 'Records, properties, nullability',
              body: '**Properties** are smart fields: `public string Name { get; set; }`. **Records** are concise immutable data types — `public record User(int Id, string Name);` — ideal for DTOs (data transfer objects). **Nullable reference types**: `string?` may be null, `string` should not — the compiler warns you, exactly like TypeScript’s strict null checks.',
            },
            {
              heading: 'async/await and LINQ',
              body: '**async/await** is identical in spirit to JavaScript: `async Task<User> GetUserAsync()` returns a `Task<T>` (C#’s Promise), awaited with `await`. Backend code is async everywhere (database, network). **LINQ** queries collections with familiar operators: `users.Where(u => u.Active).Select(u => u.Name)` — the same `filter`/`map` thinking from your TypeScript and RxJS courses.',
            },
          ],
          codeSamples: [
            {
              title: 'Reading idiomatic C#',
              filename: 'UserService.cs',
              language: 'text',
              code: "public record UserDto(int Id, string Name);   // immutable data\n\npublic class UserService\n{\n    private readonly List<User> _users = new();\n\n    public async Task<List<UserDto>> GetActiveAsync()\n    {\n        await Task.Delay(10);                     // simulate I/O\n        return _users\n            .Where(u => u.IsActive)               // LINQ: filter\n            .Select(u => new UserDto(u.Id, u.Name)) // LINQ: map\n            .ToList();\n    }\n}",
              annotations: [
                { line: 1, note: 'record: a one-line immutable type — perfect for API data shapes.' },
                { line: 7, note: 'async Task<T> = C#’s Promise<T>; await works just like JS.' },
                { line: 11, note: 'Where/Select = filter/map — LINQ is your array methods, typed.' },
              ],
              explanation:
                'If you read TypeScript fluently, C# is mostly new syntax over familiar ideas: types, async, and filter/map.',
            },
          ],
          keyPoints: [
            'C# is statically typed and OOP — close cousin to TypeScript.',
            'Properties (`{ get; set; }`), `record`s for immutable DTOs, `string?` for nullable.',
            '`async Task<T>` is C#’s `Promise<T>`; `await` behaves like JavaScript.',
            'LINQ (`Where`/`Select`/`OrderBy`) = typed `filter`/`map`/`sort`.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What is async Task<User> the C# equivalent of in JavaScript?',
              options: [
                { id: 'a', text: 'A synchronous function', correct: false },
                { id: 'b', text: 'async function returning Promise<User>', correct: true },
                { id: 'c', text: 'An Observable', correct: false },
                { id: 'd', text: 'A class', correct: false },
              ],
              explanation:
                'Task<T> is C#’s promise; async/await reads just like the JavaScript you know.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'users.Where(u => u.Active).Select(u => u.Name) corresponds to which JS?',
              options: [
                { id: 'a', text: 'users.filter(u => u.active).map(u => u.name)', correct: true },
                { id: 'b', text: 'users.forEach(...)', correct: false },
                { id: 'c', text: 'users.reduce(...)', correct: false },
                { id: 'd', text: 'users.push(...)', correct: false },
              ],
              explanation:
                'LINQ’s Where/Select are filter/map — same thinking, statically typed.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why is record User(int Id, string Name) ideal for a DTO?',
              options: [
                { id: 'a', text: 'It is mutable and global', correct: false },
                { id: 'b', text: 'It is a concise, immutable data shape — perfect for transferring data', correct: true },
                { id: 'c', text: 'It runs faster than classes always', correct: false },
                { id: 'd', text: 'It cannot have properties', correct: false },
              ],
              explanation:
                'Records give value-based, immutable data types in one line — the natural fit for API payloads.',
            },
          ],
        },
        {
          id: 'project-anatomy',
          title: 'Anatomy of an ASP.NET Core project',
          minutes: 11,
          blurb: 'csproj, Program.cs, appsettings — what every file does.',
          concept: [
            {
              heading: 'The key files',
              body: '`*.csproj` — the project file (XML): target framework, NuGet package references, build settings — the `package.json` of .NET. `Program.cs` — the entry point and app configuration (services + middleware). `appsettings.json` — configuration (connection strings, options). `*.sln` — a solution grouping multiple projects. `bin/` and `obj/` — build output (gitignored).',
            },
            {
              heading: 'Solutions and projects',
              body: 'A **solution** (`.sln`) contains one or more **projects** (`.csproj`). A small API is one project; a layered app splits into several (Api, Application, Domain, Infrastructure — Level 5). Each project compiles to an assembly. The CLI drives it all: `dotnet new`, `dotnet build`, `dotnet run`, `dotnet add package`.',
            },
            {
              heading: 'NuGet — the package ecosystem',
              body: '**NuGet** is .NET’s package manager (npm’s counterpart): `dotnet add package Serilog` adds a dependency, recorded in the `.csproj`. Restore happens automatically on build. Common packages you will meet: EF Core (data), Serilog (logging), AutoMapper, FluentValidation, Swashbuckle (Swagger docs).',
            },
          ],
          codeSamples: [
            {
              title: 'A minimal project file',
              filename: 'MyApi.csproj',
              language: 'text',
              code: "<Project Sdk=\"Microsoft.NET.Sdk.Web\">\n\n  <PropertyGroup>\n    <TargetFramework>net8.0</TargetFramework>\n    <Nullable>enable</Nullable>\n    <ImplicitUsings>enable</ImplicitUsings>\n  </PropertyGroup>\n\n  <ItemGroup>\n    <PackageReference Include=\"Microsoft.EntityFrameworkCore\" Version=\"8.0.0\" />\n  </ItemGroup>\n\n</Project>",
              annotations: [
                { line: 1, note: 'Sdk=...Web tells the tooling this is a web project.' },
                { line: 4, note: 'TargetFramework: which .NET version to build against.' },
                { line: 10, note: 'PackageReference = a NuGet dependency, like a line in package.json.' },
              ],
              explanation:
                'The csproj is small and declarative — the modern SDK infers most files automatically.',
            },
          ],
          keyPoints: [
            '`*.csproj` = the project/dependency file (.NET’s package.json); `Program.cs` = entry + config.',
            '`appsettings.json` = configuration; `*.sln` groups projects; `bin/obj` = build output.',
            'CLI: `dotnet new/build/run/add package` drives everything.',
            'NuGet is the package ecosystem; references live in the `.csproj`.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Which file is the closest .NET equivalent of package.json?',
              options: [
                { id: 'a', text: 'Program.cs', correct: false },
                { id: 'b', text: 'The .csproj file', correct: true },
                { id: 'c', text: 'appsettings.json', correct: false },
                { id: 'd', text: 'the .sln file', correct: false },
              ],
              explanation:
                'The .csproj declares the target framework and NuGet package references — dependencies and build config.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does appsettings.json hold?',
              options: [
                { id: 'a', text: 'C# source code', correct: false },
                { id: 'b', text: 'Configuration: connection strings, options, settings', correct: true },
                { id: 'c', text: 'Compiled output', correct: false },
                { id: 'd', text: 'NuGet packages', correct: false },
              ],
              explanation:
                'appsettings.json is the configuration file, read at runtime (with environment-specific overrides).',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What is NuGet?',
              options: [
                { id: 'a', text: 'A testing framework', correct: false },
                { id: 'b', text: '.NET’s package manager — the npm of the ecosystem', correct: true },
                { id: 'c', text: 'A database', correct: false },
                { id: 'd', text: 'The C# compiler', correct: false },
              ],
              explanation:
                'NuGet distributes reusable libraries; `dotnet add package` records them in the .csproj.',
            },
          ],
        },
        {
          id: 'program-startup',
          title: 'Program.cs: services & middleware',
          minutes: 12,
          blurb: 'The two halves of startup — the container and the pipeline.',
          concept: [
            {
              heading: 'Two halves of Program.cs',
              body: 'Modern startup has two phases. **Before `builder.Build()`** you register **services** into the DI container (`builder.Services.AddControllers()`, `AddDbContext`, your own services). **After Build()** you configure the **middleware pipeline** (`app.UseAuthentication()`, `app.MapControllers()`). Register what exists; then arrange how requests flow.',
            },
            {
              heading: 'The middleware pipeline',
              body: 'A request passes through an ordered chain of **middleware** — each can inspect, modify, short-circuit, or pass it on (very much like Angular HTTP interceptors, but server-side). **Order matters**: `UseAuthentication` must precede `UseAuthorization`; `UseRouting` before endpoints. Reading `Program.cs` top-to-bottom is reading the exact journey of every request.',
            },
            {
              heading: 'Dependency injection is built in',
              body: 'ASP.NET Core has DI **in the box** (the same concept as Angular’s): you register services with a **lifetime** — `Singleton` (one for the app), `Scoped` (one per request — the common default for services and DbContext), `Transient` (a new one each time). Controllers and other services receive dependencies through their constructors automatically.',
            },
          ],
          codeSamples: [
            {
              title: 'A realistic Program.cs',
              filename: 'Program.cs',
              language: 'text',
              code: "var builder = WebApplication.CreateBuilder(args);\n\n// --- 1) register services into the DI container ---\nbuilder.Services.AddControllers();\nbuilder.Services.AddDbContext<AppDbContext>(o =>\n    o.UseNpgsql(builder.Configuration.GetConnectionString(\"Default\")));\nbuilder.Services.AddScoped<IUserService, UserService>();\n\nvar app = builder.Build();\n\n// --- 2) configure the middleware pipeline (ORDER MATTERS) ---\napp.UseHttpsRedirection();\napp.UseAuthentication();\napp.UseAuthorization();\napp.MapControllers();\n\napp.Run();",
              annotations: [
                { line: 4, note: 'Phase 1: everything the app can inject is registered here.' },
                { line: 7, note: 'AddScoped: one IUserService per HTTP request.' },
                { line: 13, note: 'Phase 2: authentication BEFORE authorization — order is the contract.' },
                { line: 15, note: 'MapControllers: route matched requests to controller actions.' },
              ],
              explanation:
                'Two halves: register services (the what), then order middleware (the how). This file is the spine of every ASP.NET app.',
            },
          ],
          keyPoints: [
            'Two phases: register services (before Build), configure middleware (after).',
            'Middleware is an ordered request pipeline — order is a contract (auth before authz).',
            'DI is built in; lifetimes: `Singleton`, `Scoped` (per request), `Transient`.',
            '`Program.cs` read top-to-bottom IS the journey of every request.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What do you do BEFORE builder.Build() in Program.cs?',
              options: [
                { id: 'a', text: 'Configure middleware', correct: false },
                { id: 'b', text: 'Register services into the DI container', correct: true },
                { id: 'c', text: 'Run the app', correct: false },
                { id: 'd', text: 'Define the database schema', correct: false },
              ],
              explanation:
                'The builder phase registers everything injectable; after Build() you arrange the middleware pipeline.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why must app.UseAuthentication() come before app.UseAuthorization()?',
              options: [
                { id: 'a', text: 'Alphabetical order', correct: false },
                { id: 'b', text: 'You must identify WHO the user is before deciding WHAT they may do', correct: true },
                { id: 'c', text: 'It does not matter', correct: false },
                { id: 'd', text: 'Performance', correct: false },
              ],
              explanation:
                'Authentication establishes identity; authorization checks permissions — the pipeline order encodes that dependency.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Which DI lifetime gives one instance per HTTP request?',
              options: [
                { id: 'a', text: 'Singleton', correct: false },
                { id: 'b', text: 'Scoped', correct: true },
                { id: 'c', text: 'Transient', correct: false },
                { id: 'd', text: 'Static', correct: false },
              ],
              explanation:
                'Scoped instances live for one request — the standard for services and the EF Core DbContext.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 2 — BUILDING WEB APIs
    // ===================================================================
    {
      id: 'l2-web-apis',
      order: 2,
      title: 'Level 2 — Building web APIs',
      goal: 'Build endpoints with controllers and minimal APIs, route requests, bind and validate input, and return proper responses.',
      lessons: [
        {
          id: 'controllers',
          title: 'Controllers & actions',
          minutes: 12,
          blurb: 'The classic way to organize API endpoints.',
          concept: [
            {
              heading: 'What a controller is',
              body: 'A **controller** is a class grouping related endpoints (all `/api/products` operations, say). Each public method is an **action** handling one route+verb. `[ApiController]` opts into web-API conveniences (automatic model validation, parameter inference); `[Route("api/[controller]")]` sets the base path (`[controller]` becomes the class name minus "Controller").',
            },
            {
              heading: 'Verbs map to actions',
              body: 'Attributes bind HTTP verbs to methods: `[HttpGet]` (read), `[HttpGet("{id}")]` (read one), `[HttpPost]` (create), `[HttpPut("{id}")]` (replace), `[HttpDelete("{id}")]`. The method’s job: receive input, call a service, return a result. Controllers should stay **thin** — business logic belongs in services (the rule from your Angular course, server-side).',
            },
            {
              heading: 'Returning results',
              body: 'Return `ActionResult<T>` and use helpers that set the right **status code**: `Ok(data)` (200), `Created(...)` (201), `NotFound()` (404), `BadRequest(...)` (400), `NoContent()` (204). Returning the correct status is half of a good API — the frontend relies on it (your API course goes deep here).',
            },
          ],
          codeSamples: [
            {
              title: 'A REST controller',
              filename: 'ProductsController.cs',
              language: 'text',
              code: "[ApiController]\n[Route(\"api/[controller]\")]              // -> /api/products\npublic class ProductsController : ControllerBase\n{\n    private readonly IProductService _service;\n    public ProductsController(IProductService service) => _service = service;\n\n    [HttpGet]\n    public async Task<ActionResult<List<ProductDto>>> GetAll()\n        => Ok(await _service.GetAllAsync());\n\n    [HttpGet(\"{id}\")]\n    public async Task<ActionResult<ProductDto>> GetOne(int id)\n    {\n        var product = await _service.FindAsync(id);\n        return product is null ? NotFound() : Ok(product);\n    }\n\n    [HttpPost]\n    public async Task<ActionResult<ProductDto>> Create(CreateProductDto dto)\n    {\n        var created = await _service.CreateAsync(dto);\n        return CreatedAtAction(nameof(GetOne), new { id = created.Id }, created);\n    }\n}",
              annotations: [
                { line: 6, note: 'Constructor injection — the service arrives via DI, like Angular.' },
                { line: 12, note: '{id} in the route binds to the id parameter automatically.' },
                { line: 16, note: 'Right status per case: 404 when missing, 200 when found.' },
                { line: 23, note: 'Create returns 201 + a Location header pointing to the new resource.' },
              ],
              explanation:
                'Thin actions: bind input, call the service, return a status-coded result. The service holds the real logic.',
            },
          ],
          keyPoints: [
            'A controller groups endpoints; each action handles one verb+route.',
            '`[ApiController]` + `[Route("api/[controller]")]` wire conventions and base path.',
            '`[HttpGet/Post/Put/Delete]` map verbs; keep actions thin, logic in services.',
            'Return `ActionResult<T>` with `Ok/Created/NotFound/BadRequest` for correct status codes.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does [HttpGet("{id}")] do?',
              options: [
                { id: 'a', text: 'Handles POST requests', correct: false },
                { id: 'b', text: 'Handles GET to a route with an id segment, bound to the method’s id parameter', correct: true },
                { id: 'c', text: 'Deletes a record', correct: false },
                { id: 'd', text: 'Defines a database table', correct: false },
              ],
              explanation:
                'The attribute binds GET + the {id} route token to the action and its id parameter.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Where should business logic live, not in the controller?',
              options: [
                { id: 'a', text: 'In the database', correct: false },
                { id: 'b', text: 'In a service the controller injects — keep actions thin', correct: true },
                { id: 'c', text: 'In Program.cs', correct: false },
                { id: 'd', text: 'In appsettings.json', correct: false },
              ],
              explanation:
                'Thin controllers delegate to services — the same separation you applied in Angular.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'A GET for a missing item should return which helper?',
              options: [
                { id: 'a', text: 'Ok(null)', correct: false },
                { id: 'b', text: 'NotFound() (404)', correct: true },
                { id: 'c', text: 'BadRequest()', correct: false },
                { id: 'd', text: 'Created()', correct: false },
              ],
              explanation:
                '404 communicates "resource does not exist" — the frontend handles it differently from a 200 with empty data.',
            },
          ],
        },
        {
          id: 'minimal-apis',
          title: 'Minimal APIs & routing',
          minutes: 11,
          blurb: 'The lightweight endpoint style — and how routes match.',
          concept: [
            {
              heading: 'Minimal APIs',
              body: 'Since .NET 6, you can define endpoints directly in `Program.cs` (or grouped files) without controller classes: `app.MapGet("/products/{id}", (int id) => ...)`. Less ceremony — popular for small services and microservices. Controllers vs minimal APIs is a style choice; both run on the same routing and DI. You must read both.',
            },
            {
              heading: 'How routing works',
              body: 'A **route template** like `/api/products/{id}` matches a path and captures **route parameters** (`{id}`). Query strings (`?active=true`) and the request body bind too (next lesson). `MapGroup("/api/products")` factors a shared prefix. The router picks the best match by specificity — literal segments beat parameters.',
            },
            {
              heading: 'OpenAPI / Swagger',
              body: 'APIs describe themselves via **OpenAPI** (formerly Swagger): a machine-readable spec of every endpoint, its inputs, and outputs. ASP.NET generates it; **Swagger UI** renders an interactive explorer to try endpoints in the browser. This spec is also what lets tools **generate a typed Angular client** — a direct link to your next skill.',
            },
          ],
          codeSamples: [
            {
              title: 'The same resource as minimal APIs',
              filename: 'Program.cs (endpoints)',
              language: 'text',
              code: "var products = app.MapGroup(\"/api/products\");\n\nproducts.MapGet(\"/\", (IProductService s) => s.GetAllAsync());\n\nproducts.MapGet(\"/{id}\", async (int id, IProductService s) =>\n    await s.FindAsync(id) is { } p ? Results.Ok(p) : Results.NotFound());\n\nproducts.MapPost(\"/\", async (CreateProductDto dto, IProductService s) =>\n{\n    var created = await s.CreateAsync(dto);\n    return Results.Created($\"/api/products/{created.Id}\", created);\n});",
              annotations: [
                { line: 1, note: 'MapGroup factors the shared /api/products prefix.' },
                { line: 3, note: 'Dependencies (IProductService) are injected into the handler lambda.' },
                { line: 6, note: 'Results.Ok / NotFound set status codes, like the controller helpers.' },
              ],
              explanation:
                'Same routing, DI, and status codes as controllers — just terser. Choose per project; read both fluently.',
            },
          ],
          keyPoints: [
            'Minimal APIs define endpoints inline (no controller class) — same routing/DI underneath.',
            'Route templates capture params (`{id}`); `MapGroup` shares a prefix.',
            'Routing matches by specificity; literals beat parameters.',
            'OpenAPI/Swagger documents the API and can generate a typed Angular client.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'How do minimal APIs differ from controllers?',
              options: [
                { id: 'a', text: 'They use a different runtime', correct: false },
                { id: 'b', text: 'They define endpoints inline without controller classes — same routing/DI', correct: true },
                { id: 'c', text: 'They cannot use dependency injection', correct: false },
                { id: 'd', text: 'They are slower', correct: false },
              ],
              explanation:
                'It is a style choice; minimal APIs trim ceremony but share the same underlying machinery.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'In /api/products/{id}, what is {id}?',
              options: [
                { id: 'a', text: 'A query string', correct: false },
                { id: 'b', text: 'A route parameter captured from the path', correct: true },
                { id: 'c', text: 'A header', correct: false },
                { id: 'd', text: 'A database column', correct: false },
              ],
              explanation:
                'Curly-brace segments are route parameters bound to handler arguments.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does OpenAPI/Swagger provide?',
              options: [
                { id: 'a', text: 'A database engine', correct: false },
                { id: 'b', text: 'A machine-readable description of the API — explorable in Swagger UI and usable to generate clients', correct: true },
                { id: 'c', text: 'A CSS framework', correct: false },
                { id: 'd', text: 'Authentication', correct: false },
              ],
              explanation:
                'The OpenAPI spec documents endpoints and powers tooling, including typed frontend client generation.',
            },
          ],
        },
        {
          id: 'model-binding-dtos',
          title: 'Model binding & DTOs',
          minutes: 11,
          blurb: 'How input arrives — and why you never expose entities.',
          concept: [
            {
              heading: 'Model binding',
              body: '**Model binding** fills your method parameters from the request automatically: route values (`{id}`), query string (`?page=2`), and the JSON **body** (deserialized into an object). `[FromBody]`, `[FromQuery]`, `[FromRoute]` make the source explicit when needed. You declare what you expect; the framework parses and converts it.',
            },
            {
              heading: 'DTOs — the public shape',
              body: 'A **DTO** (Data Transfer Object) is the shape your API exchanges — separate from your database **entities**. Never expose entities directly: it leaks internal columns, risks **over-posting** (a client setting `IsAdmin`!), and couples your API to your schema. Map entity ⇄ DTO (by hand or with AutoMapper). Often: `CreateXDto` (input, no id), `XDto` (output) — exactly the `Omit`/`Partial` thinking from TypeScript.',
            },
            {
              heading: 'Why the separation pays off',
              body: 'DTOs let the database and the API evolve independently, hide sensitive fields, and shape responses for clients. They are the **contract boundary** — the same role interfaces played in your TypeScript course, here guarding the line between your data and the outside world.',
            },
          ],
          codeSamples: [
            {
              title: 'Binding sources and DTO mapping',
              filename: 'OrdersController.cs',
              language: 'text',
              code: "// route + query + body all bound in one signature\n[HttpGet(\"{customerId}/orders\")]\npublic async Task<ActionResult<List<OrderDto>>> List(\n    int customerId,                         // from route\n    [FromQuery] int page = 1)               // from query string\n{\n    var orders = await _service.GetPageAsync(customerId, page);\n    return Ok(orders);\n}\n\n// input DTO has NO id and NO internal fields -> no over-posting\npublic record CreateOrderDto(int ProductId, int Quantity);\n\n// output DTO exposes only what clients should see\npublic record OrderDto(int Id, string ProductName, decimal Total, string Status);",
              annotations: [
                { line: 4, note: 'customerId comes from the path; page from ?page= — bound automatically.' },
                { line: 12, note: 'No Id, no CustomerId-from-token, no IsPaid — the client cannot set them.' },
                { line: 15, note: 'Output DTO: a deliberate, safe projection of the entity.' },
              ],
              explanation:
                'Input DTOs prevent clients from setting fields they should not; output DTOs hide what they should not see.',
            },
          ],
          keyPoints: [
            'Model binding fills parameters from route, query, and JSON body automatically.',
            'DTOs are the API’s public shapes — never expose database entities directly.',
            'Separate input (`CreateXDto`, no id) from output (`XDto`) — like `Omit`/`Partial`.',
            'DTOs prevent over-posting, hide sensitive fields, and decouple API from schema.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why not return your EF Core entity directly from an endpoint?',
              options: [
                { id: 'a', text: 'It is slower', correct: false },
                { id: 'b', text: 'It leaks internal fields, enables over-posting, and couples the API to the DB schema', correct: true },
                { id: 'c', text: 'Entities cannot be serialized', correct: false },
                { id: 'd', text: 'There is no reason', correct: false },
              ],
              explanation:
                'DTOs are the safe contract; exposing entities risks security and tight coupling.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is "over-posting"?',
              options: [
                { id: 'a', text: 'Sending too many requests', correct: false },
                { id: 'b', text: 'A client setting fields it should not (like IsAdmin) by including them in the body', correct: true },
                { id: 'c', text: 'A large response', correct: false },
                { id: 'd', text: 'Posting twice', correct: false },
              ],
              explanation:
                'If the bound type includes privileged fields, a crafted body could set them — input DTOs omit such fields.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: '[FromQuery] int page = 1 binds page from where?',
              options: [
                { id: 'a', text: 'The request body', correct: false },
                { id: 'b', text: 'The query string (?page=...)', correct: true },
                { id: 'c', text: 'A cookie', correct: false },
                { id: 'd', text: 'The database', correct: false },
              ],
              explanation:
                'FromQuery binds from the URL query string, with a default of 1 when omitted.',
            },
          ],
        },
        {
          id: 'validation-errors',
          title: 'Validation & error handling',
          minutes: 11,
          blurb: 'Reject bad input cleanly; return errors the frontend understands.',
          concept: [
            {
              heading: 'Validating input',
              body: 'Never trust client input. **Data annotations** declare rules on DTOs — `[Required]`, `[StringLength(100)]`, `[Range(1, 999)]`, `[EmailAddress]` — and `[ApiController]` checks them automatically, returning **400 Bad Request** with the errors before your action runs. For complex rules, **FluentValidation** expresses them in code. Validation is a server responsibility even if the frontend also validates (the frontend can be bypassed).',
            },
            {
              heading: 'Problem Details — standard errors',
              body: 'ASP.NET returns errors in the **Problem Details** format (RFC 7807): a JSON object with `status`, `title`, `detail`, and field-level `errors`. A consistent error shape lets the frontend handle failures uniformly — your Angular `catchError` reads the same structure every time, instead of guessing per endpoint.',
            },
            {
              heading: 'Global exception handling',
              body: 'Unexpected exceptions should not leak stack traces to clients. A global handler (exception-handling middleware or `IExceptionHandler`) catches them, logs the detail server-side, and returns a clean 500 Problem Details. The principle: **expected failures → explicit status codes; unexpected failures → caught, logged, sanitized.**',
            },
          ],
          codeSamples: [
            {
              title: 'Annotated DTO + automatic 400',
              filename: 'validation.cs',
              language: 'text',
              code: "public record CreateProductDto(\n    [Required, StringLength(100)] string Name,\n    [Range(0.01, 100000)] decimal Price,\n    [Range(0, 100000)] int Stock\n);\n\n// With [ApiController], invalid input never reaches the action.\n// The framework auto-returns 400 with Problem Details:\n// {\n//   \"status\": 400,\n//   \"errors\": {\n//     \"Name\":  [\"The Name field is required.\"],\n//     \"Price\": [\"The field Price must be between 0.01 and 100000.\"]\n//   }\n// }",
              annotations: [
                { line: 2, note: 'Declarative rules live on the DTO — readable and enforced automatically.' },
                { line: 7, note: '[ApiController] validates before your code runs — no manual checks.' },
                { line: 11, note: 'Field-level errors: the frontend maps them straight to form fields.' },
              ],
              explanation:
                'Rules on the DTO + automatic 400 in a standard shape = the frontend always knows exactly what was wrong.',
            },
          ],
          keyPoints: [
            'Validate on the server always — data annotations or FluentValidation; the frontend can be bypassed.',
            '`[ApiController]` auto-returns **400** with field errors before the action runs.',
            'Errors use **Problem Details** (RFC 7807) — one shape the frontend handles uniformly.',
            'Global handler: catch unexpected exceptions, log server-side, return sanitized 500.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'The frontend already validates the form. Why validate again on the server?',
              options: [
                { id: 'a', text: 'For redundancy only', correct: false },
                { id: 'b', text: 'Client validation can be bypassed — the server is the real gate', correct: true },
                { id: 'c', text: 'It is faster', correct: false },
                { id: 'd', text: 'You should not', correct: false },
              ],
              explanation:
                'Anyone can call the API directly; server validation is the trustworthy boundary.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What does [ApiController] do with an invalid DTO?',
              options: [
                { id: 'a', text: 'Runs the action anyway', correct: false },
                { id: 'b', text: 'Automatically returns 400 with field-level errors before the action', correct: true },
                { id: 'c', text: 'Throws a 500', correct: false },
                { id: 'd', text: 'Ignores the rules', correct: false },
              ],
              explanation:
                'Automatic model-state validation short-circuits invalid requests with a 400 + Problem Details.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why is the Problem Details format valuable to the frontend?',
              options: [
                { id: 'a', text: 'It is smaller', correct: false },
                { id: 'b', text: 'A consistent error shape lets the client handle all failures uniformly', correct: true },
                { id: 'c', text: 'It encrypts errors', correct: false },
                { id: 'd', text: 'It is required by HTTP', correct: false },
              ],
              explanation:
                'One predictable structure means your Angular catchError logic reads errors the same way everywhere.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 3 — DATA WITH EF CORE
    // ===================================================================
    {
      id: 'l3-ef-core',
      order: 3,
      title: 'Level 3 — Data with EF Core',
      goal: 'Model data with entities and DbContext, evolve the schema with migrations, query with LINQ, and map relationships.',
      lessons: [
        {
          id: 'dbcontext-entities',
          title: 'DbContext & entities',
          minutes: 12,
          blurb: 'Map C# classes to database tables — the ORM idea.',
          concept: [
            {
              heading: 'What an ORM is',
              body: 'An **ORM** (Object-Relational Mapper) lets you work with the database using **C# objects** instead of raw SQL — it translates between your classes and tables. **EF Core** (Entity Framework Core) is the standard .NET ORM. You write LINQ; EF generates SQL, runs it, and materializes rows back into objects.',
            },
            {
              heading: 'Entities and DbContext',
              body: 'An **entity** is a plain C# class mapped to a table; its properties become columns (`Id` by convention is the primary key). The **DbContext** is your gateway to the database: a class with `DbSet<T>` properties (one per table) — `DbSet<Product> Products` represents the Products table. You inject the DbContext (Scoped) and query through it.',
            },
            {
              heading: 'Change tracking',
              body: 'The DbContext **tracks** the entities it loads: change a property, call `SaveChangesAsync()`, and EF figures out the UPDATE automatically. `Add` then save → INSERT; `Remove` → DELETE. One `SaveChanges` wraps all pending changes in a **transaction** — they all succeed or all roll back. You describe intent in objects; EF writes the SQL.',
            },
          ],
          codeSamples: [
            {
              title: 'An entity and the DbContext',
              filename: 'Data.cs',
              language: 'text',
              code: "public class Product            // entity -> Products table\n{\n    public int Id { get; set; }              // primary key by convention\n    public string Name { get; set; } = \"\";\n    public decimal Price { get; set; }\n    public int CategoryId { get; set; }      // foreign key\n    public Category? Category { get; set; }   // navigation property\n}\n\npublic class AppDbContext : DbContext\n{\n    public AppDbContext(DbContextOptions<AppDbContext> options)\n        : base(options) { }\n\n    public DbSet<Product> Products => Set<Product>();\n    public DbSet<Category> Categories => Set<Category>();\n}",
              annotations: [
                { line: 3, note: 'Id by convention becomes the primary key column.' },
                { line: 7, note: 'Navigation property: EF can load the related Category.' },
                { line: 15, note: 'DbSet<Product> = the Products table you query and modify.' },
              ],
              explanation:
                'Classes are tables, properties are columns, DbSets are tables you query. The DbContext is the door.',
            },
          ],
          keyPoints: [
            'An ORM maps objects ⇄ tables so you work in C#, not raw SQL; EF Core is the .NET standard.',
            'Entities = classes mapped to tables; `Id` is the primary key by convention.',
            'The DbContext exposes `DbSet<T>` per table and is injected (Scoped).',
            'Change tracking + one `SaveChangesAsync()` = an automatic, transactional write.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does an ORM like EF Core do?',
              options: [
                { id: 'a', text: 'Styles the UI', correct: false },
                { id: 'b', text: 'Maps C# objects to database tables, translating LINQ into SQL', correct: true },
                { id: 'c', text: 'Hosts the website', correct: false },
                { id: 'd', text: 'Manages authentication', correct: false },
              ],
              explanation:
                'EF Core lets you query and persist using objects; it generates and runs the SQL for you.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is a DbSet<Product>?',
              options: [
                { id: 'a', text: 'A single product', correct: false },
                { id: 'b', text: 'A representation of the Products table you query and modify', correct: true },
                { id: 'c', text: 'A controller', correct: false },
                { id: 'd', text: 'A migration', correct: false },
              ],
              explanation:
                'Each DbSet on the DbContext maps to a table; you run LINQ against it.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'You change a tracked entity’s property and call SaveChangesAsync(). What happens?',
              options: [
                { id: 'a', text: 'Nothing', correct: false },
                { id: 'b', text: 'EF detects the change and runs an UPDATE within a transaction', correct: true },
                { id: 'c', text: 'It deletes the row', correct: false },
                { id: 'd', text: 'It throws an error', correct: false },
              ],
              explanation:
                'Change tracking generates the minimal SQL; SaveChanges commits all pending changes atomically.',
            },
          ],
        },
        {
          id: 'migrations',
          title: 'Migrations — evolving the schema',
          minutes: 11,
          blurb: 'Version control for your database structure.',
          concept: [
            {
              heading: 'Code-first migrations',
              body: 'In **code-first**, your entities are the source of truth; **migrations** evolve the database to match. `dotnet ef migrations add AddProducts` compares your model to the last migration and generates a C# file describing the change (create table, add column...). `dotnet ef database update` applies pending migrations to the database. It is **version control for your schema** — diffs and history, like Git for your tables.',
            },
            {
              heading: 'The migration is reviewable code',
              body: 'A migration has `Up()` (apply the change) and `Down()` (revert it), plus a tracking table (`__EFMigrationsHistory`) so the database knows which migrations ran. Migrations are committed with your code — teammates run `database update` and their database matches yours. Review the generated migration before applying; auto-generation occasionally needs a human touch.',
            },
            {
              heading: 'Discipline that prevents pain',
              body: 'Each schema change = one migration, committed alongside the code that needs it (the atomic-commit habit from your Git course). Never edit an applied migration that others have run — add a new one (the same "never rewrite shared history" rule). For production, apply migrations as a deliberate, reversible deployment step, with backups.',
            },
          ],
          codeSamples: [
            {
              title: 'The migration workflow',
              filename: 'terminal + migration',
              language: 'text',
              code: "# 1) change your entities (add a property), then:\ndotnet ef migrations add AddProductStock\n\n# 2) review the generated C#:\npublic partial class AddProductStock : Migration\n{\n    protected override void Up(MigrationBuilder b) =>\n        b.AddColumn<int>(\"Stock\", \"Products\", defaultValue: 0);\n\n    protected override void Down(MigrationBuilder b) =>\n        b.DropColumn(\"Stock\", \"Products\");\n}\n\n# 3) apply it to the database:\ndotnet ef database update",
              annotations: [
                { line: 2, note: 'Generates a migration by diffing your model vs the last one.' },
                { line: 7, note: 'Up applies the change; Down reverts it — reviewable, reversible.' },
                { line: 15, note: 'Applies pending migrations; teammates run the same to sync.' },
              ],
              explanation:
                'Edit entities → add migration → review → update database. Schema changes become versioned, shared, reversible code.',
            },
          ],
          keyPoints: [
            'Code-first: entities are truth; migrations evolve the DB to match.',
            '`migrations add` generates reviewable `Up()`/`Down()`; `database update` applies them.',
            'Migrations are committed with code — version control for the schema (Git for tables).',
            'One change per migration; never edit an applied/shared migration — add a new one.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does dotnet ef migrations add do?',
              options: [
                { id: 'a', text: 'Applies changes to the database immediately', correct: false },
                { id: 'b', text: 'Generates a migration file describing the model change (not yet applied)', correct: true },
                { id: 'c', text: 'Deletes the database', correct: false },
                { id: 'd', text: 'Runs the app', correct: false },
              ],
              explanation:
                'add generates the migration; database update is the separate step that applies it.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why are migrations described as "version control for your schema"?',
              options: [
                { id: 'a', text: 'They use Git internally', correct: false },
                { id: 'b', text: 'They give the database structure a versioned, reviewable, shareable history', correct: true },
                { id: 'c', text: 'They back up data', correct: false },
                { id: 'd', text: 'They encrypt tables', correct: false },
              ],
              explanation:
                'Each migration is committed code; teammates apply the same sequence to reach an identical schema.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'A migration was already applied and pushed. You need another change. You should:',
              options: [
                { id: 'a', text: 'Edit the existing migration', correct: false },
                { id: 'b', text: 'Add a NEW migration — never rewrite shared, applied history', correct: true },
                { id: 'c', text: 'Delete the database', correct: false },
                { id: 'd', text: 'Skip migrations', correct: false },
              ],
              explanation:
                'Same rule as Git’s golden rule: shared history is append-only — add a new migration.',
            },
          ],
        },
        {
          id: 'querying-crud',
          title: 'Querying & CRUD with LINQ',
          minutes: 12,
          blurb: 'Read and write data — and the traps that hurt performance.',
          concept: [
            {
              heading: 'Reading with LINQ',
              body: 'Query DbSets with LINQ; EF translates to SQL: `_db.Products.Where(p => p.Price < 50).OrderBy(p => p.Name).ToListAsync()`. Queries are **lazy** until you enumerate (`ToListAsync`, `FirstOrDefaultAsync`, `AnyAsync`) — only then does SQL run. **Project to DTOs in the query** (`.Select(p => new ProductDto(...))`) so the database returns only needed columns.',
            },
            {
              heading: 'Writing: the CRUD cycle',
              body: 'Create: `_db.Products.Add(product); await _db.SaveChangesAsync();`. Update: load it, change properties, SaveChanges (tracking does the rest). Delete: `_db.Products.Remove(product); SaveChanges`. SaveChanges is the commit point — nothing persists until you call it.',
            },
            {
              heading: 'The performance traps',
              body: 'Two classics: the **N+1 problem** — looping entities and lazily touching a relation fires one query per row; fix with `.Include(p => p.Category)` (eager load) or projecting in the query. And **tracking overhead** — use `.AsNoTracking()` for read-only queries (faster, no change-tracking). Watch generated SQL in logs; an ORM hides SQL but never excuses ignoring it.',
            },
          ],
          codeSamples: [
            {
              title: 'Efficient read + a write',
              filename: 'ProductService.cs',
              language: 'text',
              code: "// READ: no tracking, project to DTO, only needed columns leave the DB\npublic Task<List<ProductDto>> SearchAsync(string term) =>\n    _db.Products\n        .AsNoTracking()\n        .Where(p => p.Name.Contains(term))\n        .Select(p => new ProductDto(p.Id, p.Name, p.Price))\n        .ToListAsync();\n\n// avoid N+1: load the relation in ONE query\npublic Task<List<Product>> WithCategoryAsync() =>\n    _db.Products.Include(p => p.Category).ToListAsync();\n\n// WRITE\npublic async Task<Product> CreateAsync(Product p)\n{\n    _db.Products.Add(p);\n    await _db.SaveChangesAsync();   // the commit point\n    return p;\n}",
              annotations: [
                { line: 4, note: 'AsNoTracking: read-only, faster, no change tracking.' },
                { line: 6, note: 'Project to DTO IN the query — the DB returns 3 columns, not the whole row.' },
                { line: 11, note: 'Include avoids N+1 by joining the relation in one SQL query.' },
                { line: 17, note: 'Nothing is saved until SaveChangesAsync runs.' },
              ],
              explanation:
                'AsNoTracking + projection + Include are the three habits that keep EF queries fast and lean.',
            },
          ],
          keyPoints: [
            'LINQ → SQL; queries run only on enumeration (`ToListAsync`, `FirstOrDefaultAsync`).',
            'Project to DTOs in the query so only needed columns leave the database.',
            'CRUD writes commit at `SaveChangesAsync()`; tracking handles updates.',
            'Avoid N+1 with `.Include()`/projection; use `.AsNoTracking()` for read-only.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'When does EF actually run the SQL for a LINQ query?',
              options: [
                { id: 'a', text: 'When the query is written', correct: false },
                { id: 'b', text: 'When you enumerate it (ToListAsync, FirstOrDefaultAsync, etc.)', correct: true },
                { id: 'c', text: 'At app startup', correct: false },
                { id: 'd', text: 'Never', correct: false },
              ],
              explanation:
                'Queries are lazy/composed until materialized — only then is SQL generated and executed.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is the N+1 problem?',
              options: [
                { id: 'a', text: 'Too many columns', correct: false },
                { id: 'b', text: 'Looping entities and lazily loading a relation fires one extra query per row', correct: true },
                { id: 'c', text: 'A migration error', correct: false },
                { id: 'd', text: 'A validation rule', correct: false },
              ],
              explanation:
                'One query for the list + N queries for each row’s relation; `.Include()` or projection collapses it to one.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why add AsNoTracking() to a read-only query?',
              options: [
                { id: 'a', text: 'To enable writes', correct: false },
                { id: 'b', text: 'It skips change-tracking overhead — faster reads when you will not modify the results', correct: true },
                { id: 'c', text: 'To add caching', correct: false },
                { id: 'd', text: 'To validate input', correct: false },
              ],
              explanation:
                'No tracking means EF does not snapshot entities for change detection — leaner for pure reads.',
            },
          ],
        },
        {
          id: 'relationships',
          title: 'Relationships & data modeling',
          minutes: 11,
          blurb: 'One-to-many, many-to-many — modeling the real world.',
          concept: [
            {
              heading: 'The three relationships',
              body: '**One-to-many** (a Category has many Products): the "many" side holds a **foreign key** (`CategoryId`) plus a navigation property. **Many-to-many** (Products ↔ Tags): EF Core can manage the hidden join table automatically. **One-to-one** (User ↔ Profile): a shared or foreign key. EF infers most relationships from your navigation properties by convention.',
            },
            {
              heading: 'Conventions and configuration',
              body: 'EF discovers keys, foreign keys, and relationships by naming conventions; when conventions are not enough, configure explicitly in `OnModelCreating` (the **Fluent API**) — required fields, max lengths, indexes, delete behavior, composite keys. Indexes especially: a column you filter or join on frequently wants an index, or queries crawl.',
            },
            {
              heading: 'Modeling decisions matter',
              body: 'Schema design is a real skill: normalize to avoid duplicated data, but denormalize where read performance demands it; choose **delete behavior** (cascade vs restrict) deliberately; pick correct types (`decimal` for money, not `double`). A clean model makes queries simple and the API natural; a tangled one fights you forever — design it with care up front.',
            },
          ],
          codeSamples: [
            {
              title: 'Relationships in entities + Fluent config',
              filename: 'modeling.cs',
              language: 'text',
              code: "public class Category\n{\n    public int Id { get; set; }\n    public string Name { get; set; } = \"\";\n    public List<Product> Products { get; set; } = new();   // one-to-many\n}\n\npublic class Product\n{\n    public int Id { get; set; }\n    public int CategoryId { get; set; }                    // FK\n    public Category Category { get; set; } = null!;        // navigation\n    public List<Tag> Tags { get; set; } = new();           // many-to-many\n}\n\n// Fluent API for what conventions cannot infer\nprotected override void OnModelCreating(ModelBuilder b)\n{\n    b.Entity<Product>().Property(p => p.Name).HasMaxLength(100).IsRequired();\n    b.Entity<Product>().HasIndex(p => p.CategoryId);       // faster joins\n}",
              annotations: [
                { line: 5, note: 'A list navigation = the "many" side of one-to-many.' },
                { line: 11, note: 'CategoryId is the foreign key; EF wires the relationship by convention.' },
                { line: 13, note: 'A list on both sides = many-to-many (EF manages the join table).' },
                { line: 20, note: 'Index on a frequently-joined column — a real performance decision.' },
              ],
              explanation:
                'Navigation properties declare relationships; the Fluent API tunes constraints and indexes conventions cannot guess.',
            },
          ],
          keyPoints: [
            'One-to-many: FK + navigation on the "many" side; many-to-many: EF manages the join table.',
            'EF infers relationships from navigation properties by convention.',
            'Use the Fluent API (`OnModelCreating`) for required fields, lengths, indexes, delete behavior.',
            'Model deliberately: normalize, index hot columns, use `decimal` for money.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'In a one-to-many (Category → Products), where does the foreign key live?',
              options: [
                { id: 'a', text: 'On the Category', correct: false },
                { id: 'b', text: 'On the "many" side — Product holds CategoryId', correct: true },
                { id: 'c', text: 'In a separate table always', correct: false },
                { id: 'd', text: 'Nowhere', correct: false },
              ],
              explanation:
                'The many side references the one: each Product stores its CategoryId.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'When do you reach for the Fluent API in OnModelCreating?',
              options: [
                { id: 'a', text: 'Always, for everything', correct: false },
                { id: 'b', text: 'When conventions are not enough — max lengths, indexes, delete behavior, composite keys', correct: true },
                { id: 'c', text: 'Only for migrations', correct: false },
                { id: 'd', text: 'Never', correct: false },
              ],
              explanation:
                'Conventions cover the common cases; the Fluent API configures what they cannot infer.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why add an index on a frequently-filtered or joined column?',
              options: [
                { id: 'a', text: 'To save disk space', correct: false },
                { id: 'b', text: 'Without it, those queries scan the whole table and slow down', correct: true },
                { id: 'c', text: 'It encrypts the column', correct: false },
                { id: 'd', text: 'It is required by EF', correct: false },
              ],
              explanation:
                'Indexes let the database find rows quickly; hot filter/join columns need them or performance degrades.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 4 — ARCHITECTURE & CROSS-CUTTING CONCERNS
    // ===================================================================
    {
      id: 'l4-architecture',
      order: 4,
      title: 'Level 4 — Architecture & cross-cutting',
      goal: 'Structure projects in layers, master DI and the repository/service patterns, manage configuration, and add logging.',
      lessons: [
        {
          id: 'layered-architecture',
          title: 'Layered & clean architecture',
          minutes: 12,
          blurb: 'How a serious backend splits into projects.',
          concept: [
            {
              heading: 'Why layers',
              body: 'A one-project API works until it grows; then mixing controllers, business rules, and SQL becomes unmaintainable. **Layered architecture** separates concerns into projects: **Api** (controllers, HTTP), **Application** (business logic, use cases), **Domain** (entities, core rules), **Infrastructure** (EF Core, external services). Each layer has one job — the same "organize by responsibility" idea from your Angular file-organization lesson, at project scale.',
            },
            {
              heading: 'The dependency rule',
              body: 'The heart of **clean architecture**: dependencies point **inward**. Api → Application → Domain; Infrastructure → also points inward. The **Domain** (your core business rules) depends on **nothing** — not on EF, not on ASP.NET. So you can swap the database or the web framework without touching business logic. Inner layers define **interfaces**; outer layers implement them — dependency inversion at the architectural level.',
            },
            {
              heading: 'Pragmatism over dogma',
              body: 'Clean architecture shines in large, long-lived, complex-domain systems. A small CRUD API may need just two layers (Api + a services/data folder) — over-layering a simple app is its own kind of mess. Match the structure to the complexity: enough separation to stay sane, not so much that simple changes touch five projects.',
            },
          ],
          codeSamples: [
            {
              title: 'The layers and their dependency direction',
              filename: 'solution structure',
              language: 'text',
              code: "MyApp.sln\n  MyApp.Api/             <- controllers, Program.cs, HTTP concerns\n      depends on -> Application\n  MyApp.Application/     <- use cases, service interfaces, DTOs\n      depends on -> Domain\n  MyApp.Domain/          <- entities, core business rules\n      depends on -> NOTHING\n  MyApp.Infrastructure/  <- EF Core, email, file storage\n      depends on -> Application + Domain\n\n// Dependencies point INWARD. Domain is pure.\n// Application defines IProductRepository;\n// Infrastructure implements it with EF Core.",
              annotations: [
                { line: 6, note: 'Domain depends on nothing — pure business rules, framework-free.' },
                { line: 8, note: 'Infrastructure (DB, email) sits OUTSIDE and points inward.' },
                { line: 13, note: 'Inner defines the interface; outer implements it — dependency inversion.' },
              ],
              explanation:
                'Read the arrows: everything depends inward toward a pure Domain. That is what makes the core swappable and testable.',
            },
          ],
          keyPoints: [
            'Layers (Api/Application/Domain/Infrastructure) separate concerns at project scale.',
            'Clean architecture: dependencies point **inward**; Domain depends on nothing.',
            'Inner layers define interfaces; outer layers implement them (dependency inversion).',
            'Match structure to complexity — small APIs need fewer layers; do not over-engineer.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'In clean architecture, what does the Domain layer depend on?',
              options: [
                { id: 'a', text: 'EF Core and ASP.NET', correct: false },
                { id: 'b', text: 'Nothing — it holds pure business rules, framework-free', correct: true },
                { id: 'c', text: 'The database directly', correct: false },
                { id: 'd', text: 'The Api layer', correct: false },
              ],
              explanation:
                'A dependency-free Domain can be tested and reused regardless of database or web framework.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Which layer typically implements an IProductRepository interface defined in Application?',
              options: [
                { id: 'a', text: 'Domain', correct: false },
                { id: 'b', text: 'Infrastructure — it provides the EF Core implementation', correct: true },
                { id: 'c', text: 'Api', correct: false },
                { id: 'd', text: 'None', correct: false },
              ],
              explanation:
                'Inner layers declare interfaces; the outer Infrastructure layer supplies concrete implementations.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'When is heavy layering the WRONG choice?',
              options: [
                { id: 'a', text: 'Always use four layers', correct: false },
                { id: 'b', text: 'For a small, simple CRUD API — over-layering adds friction without benefit', correct: true },
                { id: 'c', text: 'For complex domains', correct: false },
                { id: 'd', text: 'Layering is never wrong', correct: false },
              ],
              explanation:
                'Structure should match complexity; a tiny app drowns under five projects for a one-line change.',
            },
          ],
        },
        {
          id: 'di-patterns',
          title: 'DI, repositories & services',
          minutes: 11,
          blurb: 'The patterns that keep logic testable and swappable.',
          concept: [
            {
              heading: 'Program to interfaces',
              body: 'Register `IUserService → UserService` and `IProductRepository → ProductRepository`; consumers depend on the **interface**, not the concrete class. This is the seam (from your Testing course) where you swap a fake in tests and a real one in production. The same DI you know from Angular — built into ASP.NET Core, used everywhere.',
            },
            {
              heading: 'Service vs repository',
              body: 'A **repository** abstracts data access for one aggregate (`IProductRepository` with `GetById`, `Add`, ...): it hides EF Core behind an interface so business code does not depend on the ORM. A **service** holds business logic/use cases (`PlaceOrderAsync`: validate, reserve stock, charge, save). Controllers call services; services use repositories. (Note: EF Core’s DbContext is already a repository+unit-of-work — many teams skip a separate repository layer for simple apps.)',
            },
            {
              heading: 'Lifetimes, correctly',
              body: 'Match lifetime to nature: **Scoped** for services and DbContext (one per request — the default); **Singleton** for stateless, thread-safe utilities (config, caches); **Transient** for lightweight, stateless helpers. The classic bug: injecting a **Scoped** service (like DbContext) into a **Singleton** — the request-scoped object gets captured forever. Lifetimes are a real correctness concern, not a formality.',
            },
          ],
          codeSamples: [
            {
              title: 'Interfaces, registration, injection',
              filename: 'patterns.cs',
              language: 'text',
              code: "// 1) define the contract (in Application)\npublic interface IProductRepository\n{\n    Task<Product?> GetByIdAsync(int id);\n    Task AddAsync(Product p);\n}\n\n// 2) implement it (in Infrastructure, using EF Core)\npublic class ProductRepository(AppDbContext db) : IProductRepository\n{\n    public Task<Product?> GetByIdAsync(int id) => db.Products.FindAsync(id).AsTask();\n    public async Task AddAsync(Product p) { db.Products.Add(p); await db.SaveChangesAsync(); }\n}\n\n// 3) register (in Program.cs)\nbuilder.Services.AddScoped<IProductRepository, ProductRepository>();\nbuilder.Services.AddScoped<IProductService, ProductService>();\n\n// 4) inject the INTERFACE wherever needed — swappable, testable\npublic class ProductService(IProductRepository repo) { /* ... */ }",
              annotations: [
                { line: 9, note: 'Primary-constructor syntax: the DbContext is injected.' },
                { line: 16, note: 'Scoped: one per request — the right lifetime for data access.' },
                { line: 20, note: 'Depends on the interface — a fake repo slots in for tests.' },
              ],
              explanation:
                'Define interface → implement → register → inject the interface. The exact DI pattern from Angular, server-side.',
            },
          ],
          keyPoints: [
            'Depend on interfaces; register `IThing → Thing` — the seam for fakes in tests.',
            'Repository hides data access; service holds business logic; controllers call services.',
            'Lifetimes: Scoped for services/DbContext, Singleton for stateless utilities, Transient for light helpers.',
            'Never inject a Scoped service into a Singleton — it gets captured forever.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why depend on IProductRepository instead of ProductRepository directly?',
              options: [
                { id: 'a', text: 'It is faster', correct: false },
                { id: 'b', text: 'The interface is the seam: swap a fake in tests, the real one in production', correct: true },
                { id: 'c', text: 'Interfaces compile smaller', correct: false },
                { id: 'd', text: 'No reason', correct: false },
              ],
              explanation:
                'Same lesson as Angular/Testing: programming to interfaces makes code swappable and testable.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'What is the difference between a service and a repository?',
              options: [
                { id: 'a', text: 'They are identical', correct: false },
                { id: 'b', text: 'Repository abstracts data access; service holds business logic/use cases', correct: true },
                { id: 'c', text: 'Service talks to the DB; repository handles HTTP', correct: false },
                { id: 'd', text: 'Repository renders views', correct: false },
              ],
              explanation:
                'Controllers call services for use cases; services use repositories for data — clear responsibility split.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What goes wrong injecting a Scoped DbContext into a Singleton service?',
              options: [
                { id: 'a', text: 'Nothing', correct: false },
                { id: 'b', text: 'The request-scoped DbContext is captured for the app’s lifetime — a real bug', correct: true },
                { id: 'c', text: 'It runs faster', correct: false },
                { id: 'd', text: 'It improves caching', correct: false },
              ],
              explanation:
                'A Singleton outlives requests; capturing a Scoped instance breaks its per-request semantics (a captive dependency).',
            },
          ],
        },
        {
          id: 'configuration',
          title: 'Configuration & environments',
          minutes: 10,
          blurb: 'Settings, secrets, and per-environment behavior.',
          concept: [
            {
              heading: 'Layered configuration',
              body: 'ASP.NET merges configuration from many sources in order: `appsettings.json`, then `appsettings.{Environment}.json` (Development/Production), then **environment variables**, then command-line args — later sources override earlier. So `appsettings.json` holds defaults and the environment layer overrides per deployment. `IConfiguration` reads values; the **Options pattern** binds a config section to a typed class you inject.',
            },
            {
              heading: 'Environments',
              body: 'The `ASPNETCORE_ENVIRONMENT` variable (Development/Staging/Production) selects the override file and toggles behavior — detailed errors in Development, sanitized in Production; Swagger UI in dev only. Reading it correctly is why the same build behaves appropriately in each place (the same idea as Angular’s environment files).',
            },
            {
              heading: 'Secrets — never in source control',
              body: 'Connection strings with passwords, API keys, JWT signing keys — these must **never** be committed (your Git course: a leaked secret lives in history forever). Locally use **User Secrets** (`dotnet user-secrets`); in production use environment variables or a secret manager (Azure Key Vault, AWS Secrets Manager). `appsettings.json` holds non-secret defaults only.',
            },
          ],
          codeSamples: [
            {
              title: 'The Options pattern + environment override',
              filename: 'config.cs',
              language: 'text',
              code: "// appsettings.json (defaults, non-secret)\n// \"Jwt\": { \"Issuer\": \"my-api\", \"ExpiryMinutes\": 60 }\n\npublic class JwtOptions\n{\n    public string Issuer { get; set; } = \"\";\n    public int ExpiryMinutes { get; set; }\n    public string SigningKey { get; set; } = \"\";   // from a SECRET source\n}\n\n// bind the section to a typed class\nbuilder.Services.Configure<JwtOptions>(\n    builder.Configuration.GetSection(\"Jwt\"));\n\n// inject it strongly-typed anywhere\npublic class TokenService(IOptions<JwtOptions> options)\n{\n    private readonly JwtOptions _jwt = options.Value;\n}",
              annotations: [
                { line: 8, note: 'SigningKey comes from User Secrets / env vars — never appsettings in git.' },
                { line: 12, note: 'Configure binds the "Jwt" section to the typed class.' },
                { line: 16, note: 'IOptions<JwtOptions> injects the settings, strongly typed.' },
              ],
              explanation:
                'Typed options + layered sources: defaults in JSON, overrides per environment, secrets outside source control.',
            },
          ],
          keyPoints: [
            'Config layers in order; later sources (env vars) override `appsettings.json` defaults.',
            'Options pattern binds a config section to a typed class you inject.',
            '`ASPNETCORE_ENVIRONMENT` selects overrides and toggles dev/prod behavior.',
            'Secrets never in source control — User Secrets locally, env vars / vaults in production.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'appsettings.json says ExpiryMinutes=60; an environment variable sets it to 30. Which wins?',
              options: [
                { id: 'a', text: '60 — the JSON file', correct: false },
                { id: 'b', text: '30 — later sources (env vars) override earlier ones', correct: true },
                { id: 'c', text: 'Neither', correct: false },
                { id: 'd', text: 'It errors', correct: false },
              ],
              explanation:
                'Configuration merges in order; environment variables sit after the JSON files and override them.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Where should a database password live?',
              options: [
                { id: 'a', text: 'In appsettings.json, committed to git', correct: false },
                { id: 'b', text: 'In User Secrets locally and env vars / a secret vault in production', correct: true },
                { id: 'c', text: 'In the controller', correct: false },
                { id: 'd', text: 'In the migration', correct: false },
              ],
              explanation:
                'Secrets must stay out of source control — git history is forever (your Git course’s rule).',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does the Options pattern give you?',
              options: [
                { id: 'a', text: 'Faster startup', correct: false },
                { id: 'b', text: 'A strongly-typed config section you can inject (IOptions<T>)', correct: true },
                { id: 'c', text: 'Automatic encryption', correct: false },
                { id: 'd', text: 'A database connection', correct: false },
              ],
              explanation:
                'It binds a section to a class, giving type-safe, injectable settings instead of stringly-typed lookups.',
            },
          ],
        },
        {
          id: 'logging-middleware',
          title: 'Logging & custom middleware',
          minutes: 10,
          blurb: 'See what your server does; intercept every request.',
          concept: [
            {
              heading: 'Structured logging',
              body: 'ASP.NET has built-in logging via `ILogger<T>` (injected): `_logger.LogInformation("Order {OrderId} placed", id)`. **Structured logging** keeps `OrderId` as a queryable field, not just text — so you can later search "all logs for order 42". **Serilog** is the popular enrichment, sending logs to files, Seq, or cloud sinks. **Log levels** (Trace→Debug→Information→Warning→Error→Critical) let you filter noise from signal per environment.',
            },
            {
              heading: 'Custom middleware',
              body: 'You can write your own middleware to run on every request — logging timing, adding a correlation ID, custom headers. Each middleware receives the context and a `next` delegate to call (or not). This is exactly the **interceptor** concept from your Angular and RxJS courses, on the server: a pipeline stage that can observe and modify every request and response.',
            },
            {
              heading: 'Observability beyond logs',
              body: 'Production needs more than logs: **health checks** (`/health` endpoints load balancers probe), **metrics** (request rates, latencies), and **distributed tracing** (following one request across services) — the modern stack standardizes on **OpenTelemetry**. The principle: a server you cannot observe is a server you cannot operate. Build visibility in from the start.',
            },
          ],
          codeSamples: [
            {
              title: 'Logging + a timing middleware',
              filename: 'observability.cs',
              language: 'text',
              code: "// structured logging — OrderId stays a queryable field\npublic async Task<OrderDto> PlaceAsync(CreateOrderDto dto)\n{\n    var order = await _repo.CreateAsync(dto);\n    _logger.LogInformation(\"Order {OrderId} placed for {Total:C}\",\n        order.Id, order.Total);\n    return order;\n}\n\n// custom middleware — runs on EVERY request (like an interceptor)\napp.Use(async (context, next) =>\n{\n    var sw = Stopwatch.StartNew();\n    await next();                              // pass to the next stage\n    logger.LogInformation(\"{Method} {Path} -> {Status} in {Ms}ms\",\n        context.Request.Method, context.Request.Path,\n        context.Response.StatusCode, sw.ElapsedMilliseconds);\n});",
              annotations: [
                { line: 5, note: '{OrderId} is structured — searchable later, not just printed text.' },
                { line: 11, note: 'Middleware gets context + next — the server-side interceptor.' },
                { line: 14, note: 'await next() passes control onward; code after it runs on the way back.' },
              ],
              explanation:
                'Structured logs make incidents searchable; custom middleware observes every request — the interceptor pattern, server-side.',
            },
          ],
          keyPoints: [
            'Inject `ILogger<T>`; use **structured** logging so fields stay queryable.',
            'Log levels filter noise; Serilog routes logs to files/cloud sinks.',
            'Custom middleware runs per request with `context` + `next` — the server-side interceptor.',
            'Production observability: health checks, metrics, tracing (OpenTelemetry).',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why prefer structured logging (LogInformation("Order {Id}", id)) over string concatenation?',
              options: [
                { id: 'a', text: 'It is shorter', correct: false },
                { id: 'b', text: 'Fields like {Id} stay queryable — you can later search logs by order id', correct: true },
                { id: 'c', text: 'It runs faster always', correct: false },
                { id: 'd', text: 'It encrypts the log', correct: false },
              ],
              explanation:
                'Structured logs preserve named values as data, enabling powerful searching and filtering.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Custom middleware in ASP.NET is most analogous to which Angular concept?',
              options: [
                { id: 'a', text: 'A component', correct: false },
                { id: 'b', text: 'An HTTP interceptor — it observes/modifies every request via context + next', correct: true },
                { id: 'c', text: 'A pipe', correct: false },
                { id: 'd', text: 'A directive', correct: false },
              ],
              explanation:
                'Both are pipeline stages with a next delegate, running on every request — server-side vs client-side.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What is a health check endpoint for?',
              options: [
                { id: 'a', text: 'User login', correct: false },
                { id: 'b', text: 'So load balancers / orchestrators can probe whether the service is alive and ready', correct: true },
                { id: 'c', text: 'Database migrations', correct: false },
                { id: 'd', text: 'Logging', correct: false },
              ],
              explanation:
                'A /health endpoint reports readiness so infrastructure can route traffic only to healthy instances.',
            },
          ],
        },
      ],
    },
    // ===================================================================
    // LEVEL 5 — SECURITY, PERFORMANCE & DEPLOYMENT
    // ===================================================================
    {
      id: 'l5-production',
      order: 5,
      title: 'Level 5 — Security, performance & deployment',
      goal: 'Secure the API with authentication and authorization, follow security best practices, make it fast, test it, and ship it.',
      lessons: [
        {
          id: 'auth',
          title: 'Authentication & authorization',
          minutes: 12,
          blurb: 'Who are you, and what may you do — with JWT.',
          concept: [
            {
              heading: 'Two different questions',
              body: '**Authentication** = WHO you are (proving identity). **Authorization** = WHAT you may do (checking permissions). They are distinct steps, and the middleware order encodes it: `UseAuthentication()` then `UseAuthorization()`. Confusing the two is the most common security-design mistake.',
            },
            {
              heading: 'Token-based auth (JWT)',
              body: 'For an API consumed by an Angular SPA, the standard is **JWT** (JSON Web Token): the user logs in, the server issues a **signed** token containing **claims** (user id, roles), and the client sends it on every request in the `Authorization: Bearer <token>` header. The server **validates the signature** (with a secret key) — no server-side session needed, so the API stays **stateless** and scales horizontally. A token is signed, not encrypted: never put secrets in its payload (anyone can read it).',
            },
            {
              heading: 'Protecting endpoints',
              body: '`[Authorize]` requires a valid token; `[Authorize(Roles = "Admin")]` requires a role; **policies** express richer rules (`RequireClaim`, custom requirements). `[AllowAnonymous]` opens specific endpoints (like login). The frontend pairs with this: it attaches the token via an interceptor and handles 401s — exactly the flow in your next API skill.',
            },
          ],
          codeSamples: [
            {
              title: 'Issue, validate, protect',
              filename: 'auth.cs',
              language: 'text',
              code: "// register JWT validation (Program.cs)\nbuilder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)\n    .AddJwtBearer(o => o.TokenValidationParameters = new()\n    {\n        ValidIssuer = jwt.Issuer,\n        IssuerSigningKey = new SymmetricSecurityKey(keyBytes),\n        ValidateIssuerSigningKey = true,\n    });\n\n// protect endpoints\n[Authorize]                              // any valid token\n[HttpGet(\"me\")] public IActionResult Me() => Ok(GetCurrentUser());\n\n[Authorize(Roles = \"Admin\")]             // must have the Admin role\n[HttpDelete(\"{id}\")] public IActionResult Delete(int id) { /* ... */ }\n\n[AllowAnonymous]                         // open: login is public\n[HttpPost(\"login\")] public IActionResult Login(LoginDto dto) { /* issue token */ }",
              annotations: [
                { line: 6, note: 'The signing key validates that the token came from this server, untampered.' },
                { line: 11, note: '[Authorize]: rejects requests without a valid token (401).' },
                { line: 14, note: 'Role-based: a valid token is not enough — needs the Admin claim.' },
                { line: 17, note: 'Login must be open, or no one could ever get a token.' },
              ],
              explanation:
                'Server signs tokens at login, validates them per request, and gates endpoints by [Authorize]/roles/policies. Stateless and scalable.',
            },
          ],
          keyPoints: [
            'Authentication = who you are; authorization = what you may do — distinct steps.',
            'JWT: signed token with claims, sent as `Bearer`; server validates the signature — stateless.',
            'A JWT is signed, not encrypted — readable by anyone; never put secrets in it.',
            '`[Authorize]`, `[Authorize(Roles=...)]`, policies, and `[AllowAnonymous]` gate endpoints.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What is the difference between authentication and authorization?',
              options: [
                { id: 'a', text: 'They are the same', correct: false },
                { id: 'b', text: 'Authentication proves WHO you are; authorization decides WHAT you may do', correct: true },
                { id: 'c', text: 'Authorization comes first', correct: false },
                { id: 'd', text: 'Authentication is only for admins', correct: false },
              ],
              explanation:
                'Identity first (authentication), permissions second (authorization) — the pipeline order reflects it.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why can a JWT-based API stay stateless?',
              options: [
                { id: 'a', text: 'It stores sessions in the database', correct: false },
                { id: 'b', text: 'The signed token carries the identity/claims; the server just validates the signature each request', correct: true },
                { id: 'c', text: 'It does not track users at all', correct: false },
                { id: 'd', text: 'Tokens are encrypted', correct: false },
              ],
              explanation:
                'No server session is needed — the self-contained, signed token is verified per request, enabling horizontal scaling.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'Why must you never store a secret in a JWT payload?',
              options: [
                { id: 'a', text: 'It makes the token too large', correct: false },
                { id: 'b', text: 'A JWT is signed, not encrypted — anyone can decode and read the payload', correct: true },
                { id: 'c', text: 'It breaks the signature', correct: false },
                { id: 'd', text: 'Payloads cannot hold strings', correct: false },
              ],
              explanation:
                'The signature prevents tampering, not reading — the claims are plainly decodable (base64).',
            },
          ],
        },
        {
          id: 'security',
          title: 'Security best practices',
          minutes: 11,
          blurb: 'The defenses every API needs — and the OWASP mindset.',
          concept: [
            {
              heading: 'Trust nothing from the client',
              body: 'The foundational rule: **all input is hostile until validated**. ASP.NET and EF Core give strong defaults — parameterized queries (EF) prevent **SQL injection**, model binding + validation guard shapes. Your job: validate on the server (Level 2), authorize every protected endpoint, and never build SQL by string concatenation. The **OWASP Top 10** is the canonical checklist of what attackers try.',
            },
            {
              heading: 'Passwords, transport, headers',
              body: 'Never store passwords as plain text — **hash** them with a slow algorithm (ASP.NET Identity uses PBKDF2/bcrypt-style hashing). Enforce **HTTPS** everywhere (`UseHttpsRedirection`, HSTS) so tokens and data are encrypted in transit. Add security **headers** and keep error responses **sanitized** in production — a stack trace is a gift to an attacker.',
            },
            {
              heading: 'CORS and rate limiting',
              body: '**CORS** controls which browser origins may call your API — your Angular app’s origin must be allowed, others blocked (the cross-origin rules your next skill covers in depth). **Rate limiting** (built into modern ASP.NET) caps requests per client to blunt brute-force and abuse. And keep dependencies patched: `dotnet list package --vulnerable` surfaces known CVEs — an outdated package is an open door.',
            },
          ],
          codeSamples: [
            {
              title: 'Layered defenses in Program.cs',
              filename: 'security.cs',
              language: 'text',
              code: "// HTTPS + HSTS\napp.UseHttpsRedirection();\napp.UseHsts();\n\n// CORS: allow ONLY your Angular app's origin\nbuilder.Services.AddCors(o => o.AddPolicy(\"spa\", p => p\n    .WithOrigins(\"https://my-angular-app.com\")\n    .AllowAnyHeader()\n    .AllowAnyMethod()));\napp.UseCors(\"spa\");\n\n// rate limiting — cap abusive clients\nbuilder.Services.AddRateLimiter(/* fixed window, e.g. 100/min */);\napp.UseRateLimiter();\n\n// EF Core: parameterized by default — SQL injection-safe\nvar safe = await db.Users.Where(u => u.Email == input).ToListAsync();",
              annotations: [
                { line: 7, note: 'Allowlist your frontend origin; the browser blocks others.' },
                { line: 13, note: 'Rate limiting blunts brute-force and abuse.' },
                { line: 17, note: 'EF parameterizes the value — never string-concatenate SQL.' },
              ],
              explanation:
                'Security is layers: HTTPS, CORS allowlist, rate limits, validated input, hashed passwords, patched packages — no single switch.',
            },
          ],
          keyPoints: [
            'Treat all client input as hostile; validate server-side; never concatenate SQL (EF parameterizes).',
            'Hash passwords (PBKDF2/bcrypt); enforce HTTPS + HSTS; sanitize production errors.',
            'CORS allowlists your frontend origin; rate limiting blunts abuse.',
            'Patch dependencies (`dotnet list package --vulnerable`); learn the OWASP Top 10.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'How does EF Core protect against SQL injection by default?',
              options: [
                { id: 'a', text: 'It encrypts the database', correct: false },
                { id: 'b', text: 'It uses parameterized queries — user values are never concatenated into SQL', correct: true },
                { id: 'c', text: 'It blocks all input', correct: false },
                { id: 'd', text: 'It does not', correct: false },
              ],
              explanation:
                'LINQ-to-SQL parameterizes values, so input cannot break out and become executable SQL.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'How should passwords be stored?',
              options: [
                { id: 'a', text: 'Plain text for easy lookup', correct: false },
                { id: 'b', text: 'Hashed with a slow algorithm (PBKDF2/bcrypt) — never reversible plain text', correct: true },
                { id: 'c', text: 'Base64 encoded', correct: false },
                { id: 'd', text: 'In a JWT', correct: false },
              ],
              explanation:
                'Slow one-way hashing means even a database breach does not expose usable passwords.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What does CORS control?',
              options: [
                { id: 'a', text: 'Database access', correct: false },
                { id: 'b', text: 'Which browser origins are allowed to call your API', correct: true },
                { id: 'c', text: 'Password hashing', correct: false },
                { id: 'd', text: 'Logging levels', correct: false },
              ],
              explanation:
                'CORS is the browser-enforced allowlist of origins; your Angular app’s origin must be permitted.',
            },
          ],
        },
        {
          id: 'performance',
          title: 'Performance & scalability',
          minutes: 10,
          blurb: 'Async, caching, and pagination — fast under load.',
          concept: [
            {
              heading: 'Async all the way',
              body: 'Backend work is I/O-bound (database, network), so **async/await everywhere** lets a server handle far more concurrent requests with the same threads — a thread is freed during the await instead of blocking. Use `async`/`await` end to end; never block on async (`.Result`/`.Wait()` cause deadlocks and waste threads). This is the single biggest throughput lever in ASP.NET.',
            },
            {
              heading: 'Caching layers',
              body: 'Avoid recomputing or re-fetching unchanged data. **In-memory cache** (`IMemoryCache`) for single-server hot data; **distributed cache** (Redis) for multi-server; **response caching** and **output caching** for whole responses; HTTP cache headers (ETag, Cache-Control) let clients and proxies cache. Cache the expensive and stable; always plan **invalidation** — the hardest part.',
            },
            {
              heading: 'Pagination and right-sized queries',
              body: 'Never return unbounded lists — **paginate** (`Skip`/`Take` + a total count) so a table with a million rows does not crush the server and the client. Combined with Level 3’s habits (project to DTOs, `AsNoTracking`, `Include` to avoid N+1), these keep queries small. Measure with logs/profilers and load tests before optimizing — guessing wastes effort (the rule from every course).',
            },
          ],
          codeSamples: [
            {
              title: 'Async, cached, paginated',
              filename: 'performance.cs',
              language: 'text',
              code: "// caching an expensive, stable lookup\npublic async Task<List<CategoryDto>> GetCategoriesAsync() =>\n    await _cache.GetOrCreateAsync(\"categories\", async entry =>\n    {\n        entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);\n        return await _db.Categories.AsNoTracking()\n            .Select(c => new CategoryDto(c.Id, c.Name)).ToListAsync();\n    });\n\n// pagination: never return everything\npublic async Task<PagedResult<ProductDto>> GetPageAsync(int page, int size)\n{\n    var query = _db.Products.AsNoTracking();\n    var total = await query.CountAsync();\n    var items = await query.OrderBy(p => p.Id)\n        .Skip((page - 1) * size).Take(size)\n        .Select(p => new ProductDto(p.Id, p.Name, p.Price)).ToListAsync();\n    return new PagedResult<ProductDto>(items, total, page, size);\n}",
              annotations: [
                { line: 3, note: 'GetOrCreate: compute once, serve from cache for 10 minutes.' },
                { line: 16, note: 'Skip/Take = the page window; CountAsync gives the total for the client.' },
                { line: 18, note: 'Return items + total so the frontend can render pagination controls.' },
              ],
              explanation:
                'Async for throughput, cache the stable-and-expensive, paginate everything — the three core performance habits.',
            },
          ],
          keyPoints: [
            'Async end-to-end frees threads during I/O — the biggest throughput lever; never block on async.',
            'Cache expensive, stable data (memory/Redis/response); plan invalidation.',
            'Paginate every list (`Skip`/`Take` + total); combine with projection/`AsNoTracking`.',
            'Measure (logs, profilers, load tests) before optimizing.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'Why is async/await the biggest throughput lever for a web API?',
              options: [
                { id: 'a', text: 'It makes code shorter', correct: false },
                { id: 'b', text: 'During I/O waits the thread is freed to serve other requests instead of blocking', correct: true },
                { id: 'c', text: 'It compiles faster', correct: false },
                { id: 'd', text: 'It encrypts requests', correct: false },
              ],
              explanation:
                'I/O-bound work releases threads on await, so the same pool serves far more concurrent requests.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why must list endpoints be paginated?',
              options: [
                { id: 'a', text: 'For security', correct: false },
                { id: 'b', text: 'Unbounded results can crush server memory and the client; pages keep responses bounded', correct: true },
                { id: 'c', text: 'It is required by HTTP', correct: false },
                { id: 'd', text: 'To enable caching only', correct: false },
              ],
              explanation:
                'A million-row response is catastrophic; Skip/Take returns a bounded window with a total count.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'What is the hardest part of caching?',
              options: [
                { id: 'a', text: 'Reading the cache', correct: false },
                { id: 'b', text: 'Invalidation — knowing when cached data is stale and must be refreshed', correct: true },
                { id: 'c', text: 'Choosing a key', correct: false },
                { id: 'd', text: 'Nothing', correct: false },
              ],
              explanation:
                'Serving stale data is a classic bug; deciding when to evict/refresh is the famously hard part.',
            },
          ],
        },
        {
          id: 'testing-deployment',
          title: 'Testing & deployment',
          minutes: 11,
          blurb: 'Prove it works, then ship it — containers and CI/CD.',
          concept: [
            {
              heading: 'Testing the backend',
              body: 'The pyramid from your Testing course applies here: **unit tests** (xUnit/NUnit) for services and business logic with fakes; **integration tests** with `WebApplicationFactory` that spins up the app in memory and hits real endpoints (often against an in-memory or test database); and a few **end-to-end** checks. `WebApplicationFactory` is ASP.NET’s killer feature here — real routing, DI, and middleware, no network.',
            },
            {
              heading: 'Containers',
              body: 'A **Docker** image packages your app with its exact runtime so it runs identically everywhere — your machine, CI, production. A multi-stage `Dockerfile` builds then ships a small runtime image. Containers are the standard deployment unit, orchestrated by **Kubernetes** or run on managed hosts (Azure App Service/Container Apps, AWS). "Works on my machine" ends where containers begin.',
            },
            {
              heading: 'CI/CD and operations',
              body: 'The pipeline from your Git/Testing courses: every push runs `dotnet build` → `dotnet test` → build the container → deploy. Apply EF migrations as a deliberate deploy step. In production: health checks for the orchestrator, centralized logging/metrics (observability from Level 4), and secrets from a vault. The endgame is the same as your SkillForge frontend — green checks gate the deploy, and broken code cannot ship.',
            },
          ],
          codeSamples: [
            {
              title: 'Integration test + a Dockerfile',
              filename: 'ship.cs + Dockerfile',
              language: 'text',
              code: "// integration test: the REAL app in memory, no network\npublic class ProductsTests(WebApplicationFactory<Program> factory)\n{\n    [Fact]\n    public async Task GetAll_returns_200()\n    {\n        var client = factory.CreateClient();\n        var res = await client.GetAsync(\"/api/products\");\n        res.StatusCode.Should().Be(HttpStatusCode.OK);\n    }\n}\n\n# multi-stage Dockerfile: build, then a small runtime image\n# FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build\n#   ... dotnet publish -c Release -o /app ...\n# FROM mcr.microsoft.com/dotnet/aspnet:8.0\n#   COPY --from=build /app .\n#   ENTRYPOINT [\"dotnet\", \"MyApi.dll\"]",
              annotations: [
                { line: 2, note: 'WebApplicationFactory boots the real app: routing, DI, middleware — in memory.' },
                { line: 8, note: 'A real HTTP call to a real endpoint, but no network or server process.' },
                { line: 14, note: 'Multi-stage: heavy SDK builds, slim runtime ships — small, fast images.' },
              ],
              explanation:
                'WebApplicationFactory tests the whole app honestly; Docker ships it identically everywhere — the same CI-gated flow you used for SkillForge.',
            },
          ],
          keyPoints: [
            'Unit-test services with fakes; integration-test endpoints with `WebApplicationFactory` (real app, in memory).',
            'Docker packages the app + runtime for identical execution everywhere.',
            'CI/CD: build → test → containerize → deploy; apply migrations as a deliberate step.',
            'Production: health checks, observability, vault-stored secrets, green-gated deploys.',
          ],
          quiz: [
            {
              id: 'q1',
              type: 'single',
              prompt: 'What does WebApplicationFactory<Program> enable?',
              options: [
                { id: 'a', text: 'Building the UI', correct: false },
                { id: 'b', text: 'Spinning up the real app in memory to test actual endpoints (routing, DI, middleware) without a network', correct: true },
                { id: 'c', text: 'Database migrations', correct: false },
                { id: 'd', text: 'Logging', correct: false },
              ],
              explanation:
                'It hosts the genuine app in-process so integration tests exercise the real pipeline fast and reliably.',
            },
            {
              id: 'q2',
              type: 'single',
              prompt: 'Why deploy with Docker containers?',
              options: [
                { id: 'a', text: 'They make code shorter', correct: false },
                { id: 'b', text: 'They package the app + exact runtime so it runs identically on any machine', correct: true },
                { id: 'c', text: 'They replace the database', correct: false },
                { id: 'd', text: 'They are required by C#', correct: false },
              ],
              explanation:
                'A container freezes the environment, ending "works on my machine" and making dev/CI/prod consistent.',
            },
            {
              id: 'q3',
              type: 'single',
              prompt: 'When should EF Core migrations be applied in a deployment?',
              options: [
                { id: 'a', text: 'Randomly', correct: false },
                { id: 'b', text: 'As a deliberate, reversible step in the pipeline, with backups', correct: true },
                { id: 'c', text: 'Never in production', correct: false },
                { id: 'd', text: 'On every request', correct: false },
              ],
              explanation:
                'Schema changes are sensitive; apply them intentionally as a controlled deploy step, not implicitly.',
            },
          ],
        },
      ],
    },
  ],
};
