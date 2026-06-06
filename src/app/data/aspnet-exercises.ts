import { Exercise } from '../models/course.model';

/** Interactive exercises for the ASP.NET Core course, keyed by lesson id. */
export const ASPNET_EXERCISES: Record<string, Exercise[]> = {
  // ---------- Level 1 ----------
  'what-is-dotnet': [
    {
      id: 'ex-minimal',
      type: 'fill-blank',
      prompt: 'Complete the smallest ASP.NET Core app: map a GET and start it.',
      language: 'text',
      codeTemplate:
        'var app = builder.Build();\napp.___("/", () => "Hello!");\napp.___();',
      blanks: [
        { accepted: ['MapGet'], hint: 'Respond to GET requests.' },
        { accepted: ['Run'], hint: 'Start the web server.' },
      ],
      explanation: 'MapGet defines an endpoint; Run starts listening — a full server in a few lines.',
    },
  ],
  'csharp-essentials': [
    {
      id: 'ex-linq',
      type: 'fill-blank',
      prompt: 'LINQ = your array methods. Filter active users, then take their names.',
      language: 'text',
      codeTemplate:
        'users.___(u => u.IsActive)\n     .___(u => u.Name);',
      blanks: [
        { accepted: ['Where'], hint: 'Like filter.' },
        { accepted: ['Select'], hint: 'Like map.' },
      ],
      explanation: 'Where = filter, Select = map — LINQ is typed array thinking.',
    },
  ],
  'project-anatomy': [
    {
      id: 'ex-package',
      type: 'fill-blank',
      prompt: 'Add a NuGet package from the CLI.',
      language: 'text',
      codeTemplate: 'dotnet ___ package Serilog',
      blanks: [{ accepted: ['add'], hint: 'Records it in the .csproj.' }],
      explanation: 'dotnet add package is .NET’s npm install — the reference lands in the .csproj.',
    },
  ],
  'program-startup': [
    {
      id: 'ex-pipeline',
      type: 'arrange',
      prompt: 'Arrange Program.cs in the correct order (registration then ordered middleware).',
      language: 'text',
      lines: [
        'builder.Services.AddControllers();',
        'var app = builder.Build();',
        'app.UseAuthentication();',
        'app.UseAuthorization();',
        'app.MapControllers();',
        'app.Run();',
      ],
      explanation:
        'Register services → Build → authentication before authorization → map endpoints → Run.',
    },
  ],

  // ---------- Level 2 ----------
  controllers: [
    {
      id: 'ex-notfound',
      type: 'fill-blank',
      prompt: 'Return the right status codes: 404 when missing, 200 when found.',
      language: 'text',
      codeTemplate:
        'var product = await _service.FindAsync(id);\nreturn product is null ? ___() : ___(product);',
      blanks: [
        { accepted: ['NotFound'], hint: '404.' },
        { accepted: ['Ok'], hint: '200.' },
      ],
      explanation: 'Correct status codes are half a good API — the frontend depends on them.',
    },
  ],
  'minimal-apis': [
    {
      id: 'ex-mapgroup',
      type: 'fill-blank',
      prompt: 'Factor the shared route prefix for a set of minimal-API endpoints.',
      language: 'text',
      codeTemplate: 'var products = app.___("/api/products");',
      blanks: [{ accepted: ['MapGroup'], hint: 'Groups endpoints under one prefix.' }],
      explanation: 'MapGroup shares a base path across related minimal-API endpoints.',
    },
  ],
  'model-binding-dtos': [
    {
      id: 'ex-dto',
      type: 'fill-blank',
      prompt: 'Why does the input DTO omit the Id? Complete the reason.',
      language: 'text',
      codeTemplate:
        'public record CreateProductDto(string Name, decimal Price);\n// no Id, no internal fields  ->  prevents ___-posting',
      blanks: [{ accepted: ['over'], hint: 'A client setting fields it should not.' }],
      explanation:
        'Input DTOs without privileged fields stop clients from over-posting (e.g. setting IsAdmin).',
    },
  ],
  'validation-errors': [
    {
      id: 'ex-validate',
      type: 'fill-blank',
      prompt: 'Add the annotation that makes Name mandatory.',
      language: 'text',
      codeTemplate: 'public record CreateProductDto(\n    [___, StringLength(100)] string Name\n);',
      blanks: [{ accepted: ['Required'], hint: 'Cannot be null/empty.' }],
      explanation:
        '[Required] is checked automatically by [ApiController], returning 400 before your action runs.',
    },
  ],

  // ---------- Level 3 ----------
  'dbcontext-entities': [
    {
      id: 'ex-dbset',
      type: 'fill-blank',
      prompt: 'Expose the Products table on the DbContext.',
      language: 'text',
      codeTemplate: 'public ___<Product> Products => Set<Product>();',
      blanks: [{ accepted: ['DbSet'], hint: 'One per table.' }],
      explanation: 'A DbSet<Product> represents the Products table you query and modify.',
    },
  ],
  migrations: [
    {
      id: 'ex-migrate',
      type: 'fill-blank',
      prompt: 'Generate a migration, then apply it to the database.',
      language: 'text',
      codeTemplate:
        'dotnet ef migrations ___ AddStock\ndotnet ef database ___',
      blanks: [
        { accepted: ['add'], hint: 'Generates the migration file.' },
        { accepted: ['update'], hint: 'Applies pending migrations.' },
      ],
      explanation: 'add generates; update applies — version control for your schema.',
    },
  ],
  'querying-crud': [
    {
      id: 'ex-notracking',
      type: 'fill-blank',
      prompt: 'Make this read-only query faster by skipping change tracking.',
      language: 'text',
      codeTemplate:
        '_db.Products\n   .___()\n   .Where(p => p.Price < 50)\n   .ToListAsync();',
      blanks: [{ accepted: ['AsNoTracking'], hint: 'No change tracking for read-only.' }],
      explanation: 'AsNoTracking drops tracking overhead — faster reads you will not modify.',
    },
  ],
  relationships: [
    {
      id: 'ex-include',
      type: 'fill-blank',
      prompt: 'Avoid the N+1 problem: load the related Category in one query.',
      language: 'text',
      codeTemplate: '_db.Products.___(p => p.Category).ToListAsync();',
      blanks: [{ accepted: ['Include'], hint: 'Eager-load the relation.' }],
      explanation: 'Include joins the relation in a single SQL query, eliminating N+1.',
    },
  ],

  // ---------- Level 4 ----------
  'layered-architecture': [
    {
      id: 'ex-clean',
      type: 'fill-blank',
      prompt: 'Complete the clean-architecture rule: which layer depends on nothing?',
      language: 'text',
      codeTemplate:
        'dependencies point INWARD;\nthe ___ layer (core business rules) depends on nothing',
      blanks: [{ accepted: ['Domain'], hint: 'The pure core.' }],
      explanation:
        'A framework-free Domain at the center is what makes the system swappable and testable.',
    },
  ],
  'di-patterns': [
    {
      id: 'ex-register',
      type: 'fill-blank',
      prompt: 'Register the repository with a per-request lifetime.',
      language: 'text',
      codeTemplate:
        'builder.Services.Add___<IProductRepository, ProductRepository>();',
      blanks: [{ accepted: ['Scoped'], hint: 'One per HTTP request.' }],
      explanation: 'AddScoped gives one instance per request — the right lifetime for data access.',
    },
  ],
  configuration: [
    {
      id: 'ex-options',
      type: 'fill-blank',
      prompt: 'Bind the "Jwt" config section to a typed class.',
      language: 'text',
      codeTemplate:
        'builder.Services.___<JwtOptions>(\n    builder.Configuration.GetSection("Jwt"));',
      blanks: [{ accepted: ['Configure'], hint: 'The Options pattern.' }],
      explanation:
        'Configure<T> binds a section to a typed class you inject via IOptions<T>.',
    },
  ],
  'logging-middleware': [
    {
      id: 'ex-middleware',
      type: 'fill-blank',
      prompt: 'Custom middleware passes the request onward by awaiting which delegate?',
      language: 'text',
      codeTemplate:
        'app.Use(async (context, next) =>\n{\n    await ___();   // pass to the next pipeline stage\n});',
      blanks: [{ accepted: ['next'], hint: 'The server-side interceptor’s "continue".' }],
      explanation:
        'await next() forwards control down the pipeline — the interceptor pattern, server-side.',
    },
  ],

  // ---------- Level 5 ----------
  auth: [
    {
      id: 'ex-authorize',
      type: 'fill-blank',
      prompt: 'Require the Admin role on a delete endpoint, but keep login open.',
      language: 'text',
      codeTemplate:
        '[Authorize(___ = "Admin")]\n[HttpDelete("{id}")] public IActionResult Delete(int id) { }\n\n[___]\n[HttpPost("login")] public IActionResult Login(LoginDto dto) { }',
      blanks: [
        { accepted: ['Roles'], hint: 'Role-based authorization.' },
        { accepted: ['AllowAnonymous'], hint: 'Login must be public.' },
      ],
      explanation:
        '[Authorize(Roles="Admin")] gates by role; [AllowAnonymous] opens login so tokens can be obtained.',
    },
  ],
  security: [
    {
      id: 'ex-cors',
      type: 'fill-blank',
      prompt: 'Allow ONLY your Angular app’s origin to call the API.',
      language: 'text',
      codeTemplate:
        'p.___("https://my-angular-app.com")\n .AllowAnyHeader().AllowAnyMethod();',
      blanks: [{ accepted: ['WithOrigins'], hint: 'The CORS allowlist.' }],
      explanation:
        'WithOrigins allowlists your frontend; the browser blocks any other origin.',
    },
  ],
  performance: [
    {
      id: 'ex-paginate',
      type: 'fill-blank',
      prompt: 'Paginate: take one page window from the query.',
      language: 'text',
      codeTemplate:
        'query.OrderBy(p => p.Id)\n     .___((page - 1) * size)\n     .___(size);',
      blanks: [
        { accepted: ['Skip'], hint: 'Jump over previous pages.' },
        { accepted: ['Take'], hint: 'Limit to the page size.' },
      ],
      explanation: 'Skip/Take is the page window; pair it with a total count for the client.',
    },
  ],
  'testing-deployment': [
    {
      id: 'ex-factory',
      type: 'fill-blank',
      prompt: 'Spin up the real app in memory for an integration test.',
      language: 'text',
      codeTemplate:
        'public class ProductsTests(___<Program> factory)\n{\n    // factory.CreateClient() hits real endpoints, no network\n}',
      blanks: [{ accepted: ['WebApplicationFactory'], hint: 'ASP.NET’s in-memory test host.' }],
      explanation:
        'WebApplicationFactory boots the genuine app (routing, DI, middleware) for honest, fast integration tests.',
    },
  ],
};
