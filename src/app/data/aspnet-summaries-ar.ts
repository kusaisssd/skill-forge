import { ArabicSection } from './angular-summaries-ar';

/**
 * الأقسام العربية لكورس ASP.NET Core — مفتاحها معرّف الدرس.
 * ملخص + فقرات "معرفة أوسع" لكل درس. المصطلحات التقنية بالإنجليزية عمداً.
 */
export const ASPNET_SUMMARIES_AR: Record<string, ArabicSection> = {
  // ============================ المستوى 1 ============================
  'what-is-dotnet': {
    summary:
      '.NET منصة تطوير مجانية مفتوحة المصدر متعددة المنصات من Microsoft: تكتب بـ C# فيُترجم إلى IL ويشغّله الـ CLR على Windows وLinux وmacOS. والـ .NET الحديثة الموحّدة (5، 6، 8...) استبدلت .NET Framework القديمة الخاصة بـ Windows. وASP.NET Core هو إطار الويب الذي يعمل فوق .NET — لبناء web APIs ومواقع، وهو النظير الخلفي (backend) لـ Angular: Angular يعرض الواجهة في المتصفح، وASP.NET Core يكشف البيانات والمنطق كـ API يستدعيه Angular (الجسر الذي يغطيه كورسك التالي). يُختار للأداء العالي والأدوات القوية ونظام NuGet.',
    details: [
      {
        heading: 'رحلة .NET من Windows إلى العالمية',
        body: '.NET Framework الأصلي (2002) كان حكراً على Windows؛ ثم جاء .NET Core (2016) المفتوح متعدد المنصات؛ وفي 2020 توحّدا تحت اسم ".NET" بلا لاحقة (فقفز الترقيم من Core 3 إلى .NET 5 متخطياً 4 لتفادي الالتباس). الإصدارات الزوجية (8، 10) هي LTS (دعم طويل) والفردية قصيرة — اختر LTS للإنتاج. هذا التاريخ يفسر لماذا تجد مقالات قديمة بنكهة Windows لا تنطبق على مشاريعك الحديثة.',
      },
      {
        heading: 'لماذا C# سريعة فعلاً',
        body: 'C# لغة مُجمَّعة (compiled) لا مفسَّرة: تتحول إلى IL ثم يُترجمها JIT إلى كود آلة محلي وقت التشغيل (مع AOT الاختياري للترجمة المسبقة الكاملة). مع جامع نفايات متقدم وتحسينات مستمرة، تضع ASP.NET Core في صدارة معايير الأداء (TechEmpower) متفوقةً على معظم أطر Node وPython — سبب رئيسي لاختيار المؤسسات لها في الأحمال العالية.',
      },
      {
        heading: 'منظومة الاستضافة والأدوات',
        body: 'تشغّل ASP.NET Core على Kestrel (خادم الويب الداخلي السريع)، خلف عاكس مثل Nginx أو في حاوية. والأدوات نقطة قوة: Visual Studio الكامل، وRider من JetBrains، وVS Code مع امتداد C# Dev Kit مجاناً. وdotnet CLI يدير كل شيء (new، build، run، test، publish). إن جئت من عالم Node ستجد التجربة أثقل قليلاً لكن أغنى في التحليل والتنقيح.',
      },
    ],
  },
  'csharp-essentials': {
    summary:
      'C# لغة مُنمّطة ثابتاً وكائنية، كثير منها مألوف من TypeScript (التي اقتبست منها). الأنواع: int وstring وbool وdecimal (للنقود!) وDateTime وList<T>. الكود في classes داخل namespaces يُترجَم إلى assemblies (ملفات dll). والـ properties حقول ذكية { get; set; }، والـ records أنواع بيانات مختصرة غير قابلة للتعديل (مثالية للـ DTOs)، وstring? قابل للـ null كصرامة TypeScript. وasync/await مطابق لروح JavaScript: async Task<User> هو Promise<User>. وLINQ يستعلم بـ Where/Select — نفس filter/map من كورساتك.',
    details: [
      {
        heading: 'جسور من TypeScript إلى C#',
        body: 'كثير ينتقل بسلاسة: الأنواع المتحدة عبر nullable وpattern matching، والـ generics <T> متطابقة المفهوم، وasync/await نفسه، وLINQ هو filter/map/reduce. الفروق الرئيسية: C# أكثر صرامة OOP (كل شيء في class)، وتمتلك value types (struct) مقابل reference types، وoverloading للدوال، وproperties مقابل الحقول المكشوفة. من أتقن TypeScript يقرأ C# في أيام — الأفكار واحدة والصياغة جديدة.',
      },
      {
        heading: 'records وpattern matching الحديثان',
        body: 'الـ records (C# 9+) ثورة للـ DTOs: مساواة بالقيمة، وغير قابلة للتعديل، وتعبير with للنسخ المعدّل (record جديد بحقل مختلف — مثل spread في JS). وpattern matching غنية: switch expressions، وproperty patterns (order is { Total: > 100 })، وis { } p لفحص عدم الـ null والربط معاً. هذه الميزات تجعل C# الحديثة معبّرة ووظيفية الطابع أكثر مما يتوقع القادمون من إصداراتها القديمة.',
      },
      {
        heading: 'إدارة الذاكرة والأنواع',
        body: 'C# مُدارة الذاكرة بجامع نفايات (لا new/delete يدوي كـ C++)، لكنها تميّز: reference types (class) في الـ heap تُمرَّر بالمرجع، وvalue types (struct، int، DateTime) في الـ stack تُنسخ. وdecimal للنقود (دقيق) بعكس double (عائم تقريبي — لا تحسب أموالاً به أبداً!). فهم هذا التمييز يفسر سلوكيات تمرير المعاملات وأداء الأنواع الكبيرة.',
      },
    ],
  },
  'project-anatomy': {
    summary:
      'الملفات المفتاحية: ‏‎*.csproj‎‏ ملف المشروع (XML) بإطار الهدف ومراجع NuGet — هو package.json للـ .NET، وProgram.cs نقطة الدخول والإعداد، وappsettings.json الإعدادات، و‎*.sln‎ حلٌّ يجمع مشاريع، وbin/obj مخرجات البناء (مستثناة من git). والحل (.sln) يضم مشاريع (.csproj) يُترجَم كل منها إلى assembly. والـ CLI يدير الكل: dotnet new/build/run/add package. وNuGet نظام الحزم (نظير npm): dotnet add package يضيف اعتمادية تُسجَّل في الـ csproj.',
    details: [
      {
        heading: 'تطور الـ csproj نحو البساطة',
        body: 'csproj القديم كان ضخماً يعدّد كل ملف صراحة؛ الـ SDK-style الحديث (Sdk="Microsoft.NET.Sdk.Web") يستنتج الملفات تلقائياً فيبقى صغيراً معبّراً. خصائص شائعة: TargetFramework (net8.0)، وNullable (تفعيل صرامة الـ null)، وImplicitUsings (استيرادات شائعة تلقائية فتختفي using من أعلى الملفات). قراءة csproj حديث تكشف عمر المشروع وإعداداته في نظرة.',
      },
      {
        heading: 'حزم NuGet التي ستقابلها دائماً',
        body: 'النظام البيئي غني: EF Core (البيانات)، وSerilog (تسجيل)، وAutoMapper (تحويل entity↔DTO)، وFluentValidation (تحقق معقّد)، وSwashbuckle/NSwag (توثيق Swagger)، وMediatR (نمط CQRS)، وPolly (إعادة المحاولة والمرونة)، وxUnit (اختبار). وdotnet add package يسجّلها، وdotnet list package يعرضها، و--vulnerable يكشف الثغرات المعروفة (أمان مهم).',
      },
      {
        heading: 'الحل متعدد المشاريع في الواقع',
        body: 'مشروع API صغير = .csproj واحد؛ والتطبيقات الجادة تنقسم (Api، Application، Domain، Infrastructure — مستوى 4) داخل .sln واحد، وكل مشروع assembly مستقل يمكن إعادة استخدامه واختباره منفصلاً. ومراجع المشاريع (ProjectReference) تربطها مع فرض اتجاه الاعتماد. dotnet sln add يدير عضوية المشاريع — أو تتولاها الـ IDE بصرياً.',
      },
    ],
  },
  'program-startup': {
    summary:
      'Program.cs نصفان: قبل builder.Build() تسجّل الخدمات في حاوية الـ DI (AddControllers، AddDbContext، خدماتك)، وبعد Build() تضبط خط أنابيب الـ middleware (UseAuthentication، MapControllers). سجّل الموجود ثم رتّب تدفق الطلبات. والـ middleware سلسلة مرتبة كل حلقة تفحص أو تعدّل أو توقف أو تمرّر (كـ interceptors في Angular لكن خادمياً) — والترتيب عقد: UseAuthentication قبل UseAuthorization. والـ DI مدمج بأعمار: Singleton (واحد للتطبيق) وScoped (واحد لكل طلب — الافتراضي للخدمات وDbContext) وTransient (جديد كل مرة). قراءة Program.cs من أعلى لأسفل هي رحلة كل طلب.',
    details: [
      {
        heading: 'من Startup.cs القديم إلى الموحّد',
        body: 'قبل .NET 6 كان الإعداد في ملفين: Program.cs (نقطة دخول) وStartup.cs بدالتي ConfigureServices (التسجيل) وConfigure (الأنابيب). الـ minimal hosting الحديث دمجهما في Program.cs واحد بـ top-level statements (بلا class أو Main صريح). ستقرأ النمط القديم في مشاريع قائمة كثيرة — النصفان نفساهما (تسجيل ثم أنابيب)، فقط بصياغة مختلفة.',
      },
      {
        heading: 'فهم تدفق الـ middleware عميقاً',
        body: 'كل middleware يستقبل context وnext: الكود قبل await next() يجري عند الدخول، وبعده عند الخروج (نمط البصلة — كل طبقة تُلَف ذهاباً وإياباً). يستطيع إيقاف السلسلة (لا ينادي next) لرد مبكر (401 مثلاً). وأخطاء الترتيب علل صامتة: UseCors بعد المسارات لا يعمل، وUseAuthentication بعد UseAuthorization يكسر الحماية. ارسم الأنبوب ذهنياً كما رسمت أنبوب RxJS.',
      },
      {
        heading: 'دقائق أعمار الـ DI',
        body: 'الأعمار مسألة صحة لا شكل: Scoped للخدمات وDbContext (حالة لكل طلب)، وSingleton للأدوات عديمة الحالة الآمنة خيطياً (كاش، إعدادات)، وTransient للمساعدات الخفيفة. العلة الكلاسيكية: حقن Scoped (كـ DbContext) في Singleton — يُحتجز كائن الطلب للأبد (captive dependency). وASP.NET في التطوير يكشف هذه المخالفات عند الإقلاع. اختر العمر بطبيعة الكائن لا عشوائياً.',
      },
    ],
  },

  // ============================ المستوى 2 ============================
  controllers: {
    summary:
      'الـ controller كلاس يجمع نقاط نهاية مترابطة (كل عمليات ‎/api/products‎)، وكل دالة عامة action تعالج مساراً+فعلاً. ‎[ApiController]‎ يفعّل ملاءمات web-API (تحقق تلقائي، استنتاج معاملات)، و‎[Route("api/[controller]")]‎ يضبط المسار الأساس. والسمات تربط الأفعال: ‎[HttpGet]‎ و‎[HttpPost]‎ و‎[HttpPut("{id}")]‎ و‎[HttpDelete]‎. اجعل الـ actions رفيعة (المنطق في services كقاعدة Angular). وأعد ActionResult<T> بمساعِدات ترسل الرمز الصحيح: Ok (200) وCreated (201) وNotFound (404) وBadRequest (400) — الرمز الصحيح نصف الـ API الجيد.',
    details: [
      {
        heading: 'ControllerBase مقابل Controller',
        body: 'لـ APIs ترث من ControllerBase (نقاط نهاية بيانات، بلا دعم views)، ولمواقع MVC من Controller (تضيف View()). و[ApiController] يضيف ملاءمات مهمة: تحقق نموذج تلقائي بـ 400، واستنتاج مصدر المعاملات (body للأنواع المركّبة، route/query للبسيطة)، وProblemDetails للأخطاء. والوراثة تمنح Ok/NotFound/User (المستخدم الحالي من التوكن) وModelState.',
      },
      {
        heading: 'CreatedAtAction وعقد REST الكامل',
        body: 'الإنشاء الصحيح يعيد 201 مع ترويسة Location تشير للمورد الجديد: CreatedAtAction(nameof(GetOne), new { id }, dto) — فيعرف العميل أين يجد ما أنشأ. وعقد REST: GET آمن ومتكرر (idempotent)، وPUT يستبدل كاملاً (idempotent)، وPATCH يعدّل جزئياً، وPOST ينشئ (غير idempotent)، وDELETE يحذف. هذه الدلالات (كورسك التالي يعمّقها) تجعل الـ API متوقَّعاً للمستهلكين.',
      },
      {
        heading: 'أين ينتهي الـ controller ويبدأ الـ service',
        body: 'الـ controller المثالي: يربط المدخل، يستدعي service، يترجم النتيجة لرمز HTTP — لا منطق أعمال ولا وصول بيانات مباشر. لماذا؟ ليُختبَر المنطق دون HTTP (كورس الاختبار)، ولإعادة استخدامه (وظيفة خلفية، minimal API)، وللوضوح. والقاعدة العملية: إن رأيت LINQ على DbContext أو if معقّد في action، فالمنطق يستحق الهجرة إلى service.',
      },
    ],
  },
  'minimal-apis': {
    summary:
      'منذ .NET 6 تعرّف نقاط النهاية مباشرة في Program.cs بلا كلاسات controllers: app.MapGet("/products/{id}", (int id) => ...) — أقل طقوس، شائع للخدمات الصغيرة. controllers مقابل minimal APIs خيار أسلوب؛ كلاهما على نفس التوجيه والـ DI. والتوجيه: قالب مسار /api/products/{id} يطابق مساراً ويلتقط معاملات المسار، وMapGroup يستخرج البادئة المشتركة، والمطابقة بالتخصيص (الحرفي يغلب المعامل). وOpenAPI/Swagger يصف الـ API آلياً: مستكشف تفاعلي في المتصفح، ويولّد عميل Angular منمّطاً — رابط مباشر لكورسك التالي.',
    details: [
      {
        heading: 'متى minimal ومتى controllers',
        body: 'minimal APIs تتألق في: الخدمات الصغيرة (microservices)، والـ APIs البسيطة، والنماذج السريعة، وأقصى أداء (مسار أخف قليلاً). وcontrollers تتفوق في: التطبيقات الكبيرة المنظمة، وحين تحتاج filters وموروثات وتجميعاً اصطلاحياً. والفرق يضيق مع نضج minimal APIs (مجموعات، filters، تحقق). القرار للفريق — والمهم قراءة النمطين بطلاقة لأنك ستقابلهما معاً.',
      },
      {
        heading: 'OpenAPI كعقد بين الواجهتين',
        body: 'وصف OpenAPI (JSON/YAML) يعدّد كل نقطة وأنواع مدخلاتها ومخرجاتها — مصدر حقيقة واحد. تولّده ASP.NET (Swashbuckle أو دعم OpenAPI المدمج في .NET 9)، وSwagger UI يرندره مستكشفاً حياً. والأقوى: NSwag أو openapi-generator يحوّلانه إلى عميل Angular كامل بأنواع TypeScript — فتغيّر الـ API يكسر ترجمة العميل (سلامة من طرف لطرف، كما في كورس TypeScript).',
      },
      {
        heading: 'دقائق التوجيه المتقدمة',
        body: 'القوالب تقبل قيوداً: {id:int} (نوع)، و{id:int:min(1)}، و{slug:regex(...)}، و{*path} (يلتقط الباقي). والمطابقة بالأولوية: الحرفي ثم المقيّد ثم المعامل ثم catch-all. وأسماء المسارات (Name) للروابط، وترتيب التسجيل لا يهم (المطابقة بالتخصيص لا الترتيب). فهم القيود يمنع تضارب المسارات في الـ APIs الكبيرة.',
      },
    ],
  },
  'model-binding-dtos': {
    summary:
      'الـ model binding يملأ معاملاتك من الطلب تلقائياً: قيم المسار ({id})، وquery string (?page=2)، وجسم JSON (يُفكّ لكائن). و[FromBody]/[FromQuery]/[FromRoute] تحدد المصدر صراحة عند الحاجة. والـ DTO شكل يتبادله الـ API منفصل عن entities قاعدة البيانات: لا تكشف entities أبداً — يسرّب أعمدة داخلية ويخاطر بـ over-posting (عميل يضبط IsAdmin!) ويربط الـ API بالـ schema. حوّل entity↔DTO، وغالباً CreateXDto (دخل بلا id) وXDto (خرج) — تفكير Omit/Partial من TypeScript. والفصل يدع القاعدة والـ API يتطوران مستقلين ويخفي الحساس.',
    details: [
      {
        heading: 'أتمتة التحويل entity↔DTO',
        body: 'التحويل اليدوي ممل ومعرّض للخطأ في النماذج الكبيرة — AutoMapper يولّده بالاصطلاح (CreateMap<Product, ProductDto>())، وMapster بديل أسرع. والمدرسة المقابلة: تحويل صريح بـ Select في استعلام EF (مشروح في الأداء) — يولّد SQL يجلب الأعمدة المطلوبة فقط، أكفأ من تحميل الـ entity كاملاً ثم تحويله. لكل نهج موضعه؛ الصريح أدق أداءً والآلي أقل كوداً.',
      },
      {
        heading: 'أنواع DTOs حسب الاتجاه',
        body: 'النضج يفرّق الأشكال: CreateXDto (دخل، بلا id ولا حقول خادمية)، وUpdateXDto (قد يكون كل الحقول اختيارية)، وXDto (خرج، إسقاط آمن)، وXSummaryDto (قائمة مختصرة) مقابل XDetailDto (تفاصيل كاملة). هذا يطابق Pick/Omit/Partial من كورس TypeScript حرفياً — DTO الإنشاء هو Omit<Entity, id> والتحديث Partial. شكل لكل حاجة يمنع تسريب الحقول وتضخم الردود.',
      },
      {
        heading: 'حماية over-posting بعمق',
        body: 'الخطر: لو ربط الـ action الـ entity مباشرة، جسمٌ مصنوع بـ "IsAdmin": true يضبطها رغم أنها ليست في النموذج المقصود. الدفاع المعماري: DTO دخل لا يحوي الحقول الحساسة أصلاً (لا يمكن ربط ما لا وجود له)، والحقول الخادمية (UserId من التوكن، CreatedAt) تُضبط في الكود لا من العميل. هذا تطبيق مباشر لمبدأ "لا تثق بمدخل العميل" — البنية تمنع الثغرة لا الفحص اليدوي.',
      },
    ],
  },
  'validation-errors': {
    summary:
      'لا تثق بمدخل العميل أبداً. الـ data annotations تعلن القواعد على DTOs — [Required]، [StringLength(100)]، [Range(1,999)]، [EmailAddress] — و[ApiController] يفحصها تلقائياً فيعيد 400 بالأخطاء قبل أن يجري الـ action. وللقواعد المعقّدة FluentValidation يعبّر عنها بالكود. والتحقق مسؤولية خادمية حتى لو تحققت الواجهة (يمكن تجاوزها). والأخطاء بصيغة Problem Details (RFC 7807): JSON بـ status وtitle وerrors حقلية — شكل ثابت يجعل الواجهة تعالج الفشل موحّداً (catchError يقرأ نفس البنية). والاستثناءات غير المتوقعة: معالِج عام يلتقط ويسجّل ويعيد 500 نظيفاً بلا تسريب.',
    details: [
      {
        heading: 'data annotations مقابل FluentValidation',
        body: 'الـ annotations سريعة تصريحية على الـ DTO نفسه (مقروءة، لكنها تخلط القواعد بالشكل وتعجز عن المنطق المتقاطع). FluentValidation يفصل القواعد في كلاس مستقل بصياغة سلسة: RuleFor(x => x.Email).EmailAddress().MustAsync(BeUnique) — قواعد شرطية ومتقاطعة وغير متزامنة (تحقق التفرّد من القاعدة) واختبار أسهل. الفرق يطابق template-driven مقابل reactive forms في Angular: البسيط تصريحي، والمعقّد في الكود.',
      },
      {
        heading: 'معالجة الأخطاء العالمية الحديثة',
        body: 'منذ .NET 8 الواجهة IExceptionHandler هي المعيار: كلاس يلتقط الاستثناءات، يسجّلها بالتفصيل خادمياً، ويعيد ProblemDetails نظيفاً — مسجَّل بـ AddExceptionHandler. القاعدة الذهبية: الفشل المتوقع (مورد غير موجود) → رمز صريح من الكود (404)؛ الفشل غير المتوقع → يُلتقط ويُسجَّل ويُعقَّم (500 بلا stack trace — هدية للمهاجم). وProblemDetails يوحّد الشكلين.',
      },
      {
        heading: 'تطابق أخطاء الخادم مع نماذج الواجهة',
        body: 'الجمال في التكامل: أخطاء التحقق الحقلية (errors: { "Email": [...] }) تُسقَط مباشرة على حقول reactive form في Angular — رسالة الخادم تظهر تحت الحقل الصحيح. هذا يتطلب اتفاق أسماء الحقول بين DTO والنموذج. وحالات الأعمال (كوبون منتهٍ) تُرجَع برمز مناسب (409/422) ورسالة، فتعالجها catchError بمنطق مختلف عن 500. تناغم الطرفين يصنع تجربة خطأ محترمة.',
      },
    ],
  },

  // ============================ المستوى 3 ============================
  'dbcontext-entities': {
    summary:
      'الـ ORM يدعك تعمل بالكائنات بدل SQL الخام — يترجم بين كلاساتك والجداول، وEF Core معيار .NET. الـ entity كلاس C# يُربَط بجدول وخصائصه أعمدة (Id بالاصطلاح مفتاح أساسي)، والـ DbContext بوابتك للقاعدة: كلاس بخصائص DbSet<T> (واحدة لكل جدول) — DbSet<Product> Products يمثّل جدول Products. تحقن الـ DbContext (Scoped) وتستعلم عبره. والـ change tracking يتعقّب ما يحمّله: غيّر خاصية، نادِ SaveChangesAsync()، فيستنتج EF الـ UPDATE؛ Add → INSERT، Remove → DELETE. وSaveChanges واحد يلفّ كل التغييرات في transaction.',
    details: [
      {
        heading: 'بدائل EF Core في النظام',
        body: 'EF Core هو الـ ORM الكامل (تتبع، migrations، علاقات)؛ والبدائل لها مواضع: Dapper (micro-ORM فائق السرعة، تكتب SQL وهو يربط النتائج — للاستعلامات الحرجة أداءً)، وSQL خام عبر ADO.NET للحالات الخاصة. كثير من المشاريع تمزج: EF للكتابة والـ CRUD، وDapper للتقارير الثقيلة. EF نفسه يتيح FromSql لـ SQL خام منمّط عند الحاجة.',
      },
      {
        heading: 'فهم change tracking ومخاطره',
        body: 'الـ DbContext يحتفظ بلقطة من كل entity محمّل ويقارنها عند SaveChanges لتوليد أقل SQL. القوة: تعديل بديهي بلا UPDATE يدوي. المخاطر: تحميل آلاف الكيانات للتتبع يستهلك ذاكرة (AsNoTracking للقراءة)، وDbContext طويل العمر يراكم تتبعاً (لذا Scoped لكل طلب)، وحالات التزامن (شخصان يعدّلان نفس الصف — تحلها concurrency tokens). افهم متى يتتبع لتتجنب مفاجآت الأداء.',
      },
      {
        heading: 'الوحدة-عمل والـ transaction الضمنية',
        body: 'DbContext هو فعلياً نمط Unit of Work: يجمّع تغييرات متعددة (أضف طلباً، حدّث مخزوناً، اكتب سجلاً) ويلتزمها معاً في SaveChanges واحد ضمن transaction — تنجح كلها أو تتراجع كلها. هذا يضمن تماسك البيانات: لا طلب بلا خصم مخزون. وللعمليات المعقّدة عبر عدة SaveChanges تفتح transaction صريحة (BeginTransaction). الذرية على مستوى البيانات نظير الـ commit الذري في Git.',
      },
    ],
  },
  migrations: {
    summary:
      'في code-first كياناتك مصدر الحقيقة، والـ migrations تطوّر القاعدة لتطابقها: dotnet ef migrations add AddProducts يقارن نموذجك بآخر migration ويولّد ملف C# يصف التغيير، وdotnet ef database update يطبّق المعلّقة — تحكّم إصدارات لـ schema، diffs وتاريخ كـ Git لجداولك. والـ migration كود قابل للمراجعة بـ Up() (تطبيق) وDown() (تراجع) وجدول تتبع (__EFMigrationsHistory). تُرفَع مع الكود، فيشغّل الزملاء update لتتطابق قواعدهم. والانضباط: تغيير واحد لكل migration، ولا تعدّل migration مطبَّقاً شاركه غيرك — أضف جديداً (قاعدة Git: لا تعد كتابة التاريخ المشترك).',
    details: [
      {
        heading: 'code-first مقابل database-first',
        body: 'code-first (الكيانات أولاً، migrations تبني القاعدة) هو السائد في المشاريع الجديدة — يضع بنية البيانات تحت تحكم الإصدارات مع الكود. database-first (القاعدة أولاً، توليد الكيانات منها بـ Scaffold-DbContext) مناسب لقواعد قائمة أو يديرها فريق DBA منفصل. كثير يبدأ code-first ويلجأ لـ scaffolding عند الدمج مع نظام قديم. الاختيار يعكس "من يملك schema؟".',
      },
      {
        heading: 'migrations في الإنتاج بأمان',
        body: 'التطبيق التلقائي عند الإقلاع (Database.Migrate()) مريح للتطوير وخطر في الإنتاج (نسخ متعددة تتسابق، لا تراجع). الأنضج: dotnet ef migrations script يولّد SQL يراجعه DBA ويُطبَّق كخطوة نشر صريحة، أو bundle قابل للتنفيذ. ودائماً: نسخة احتياطية قبل، وفحص Down للتراجع، وتفادي التغييرات الكاسرة بمرحلتين (أضف عموداً، رحّل البيانات، احذف القديم) لنشر بلا توقف.',
      },
      {
        heading: 'مزالق migrations الشائعة',
        body: 'احذر: تعديل migration مطبَّق ومدفوع (قاعدة Git المخالَفة — أضف جديداً)، وتعارض اثنين أنشآ migrations متوازية (يلزم دمج يدوي للترتيب)، وفقدان بيانات في تغيير نوع (EF قد يولّد drop+create — راجع دائماً)، وseed data المتشابك مع الـ schema. القاعدة: راجع كل migration مولّد قبل التطبيق — التوليد الآلي ذكي لكنه يحتاج عيناً بشرية أحياناً.',
      },
    ],
  },
  'querying-crud': {
    summary:
      'استعلم بـ LINQ فيترجمها EF إلى SQL: ‏Where(p => p.Price < 50).OrderBy(...).ToListAsync()‎. والاستعلامات كسولة حتى التعداد (ToListAsync، FirstOrDefaultAsync، AnyAsync) — حينها يجري SQL. أسقِط لـ DTOs في الاستعلام (Select(p => new ProductDto(...))) فتعيد القاعدة الأعمدة المطلوبة فقط. والكتابة: Add ثم SaveChanges → INSERT، حمّل وعدّل وSaveChanges (التتبع يتولى) → UPDATE، Remove → DELETE — SaveChanges نقطة الالتزام. ومصيدتان: N+1 (حلقة تلمس علاقة كسولاً = استعلام لكل صف؛ الحل Include أو الإسقاط)، وعبء التتبع (AsNoTracking للقراءة). راقب SQL في السجلات.',
    details: [
      {
        heading: 'IQueryable مقابل IEnumerable — فرق حاسم',
        body: 'دقيقة أداء جوهرية: ما دام الاستعلام IQueryable يُترجَم كله إلى SQL ويُنفَّذ في القاعدة. لحظة استدعاء ToList أو AsEnumerable ينتقل للذاكرة، وأي Where بعده يُنفَّذ في C# على كل الصفوف المحمّلة! الخطأ الكارثي: ToList() مبكراً ثم فلترة — يجلب الجدول كله. القاعدة: أبقِ السلسلة IQueryable حتى آخر لحظة، وعدّ مرة واحدة في النهاية.',
      },
      {
        heading: 'أنماط القراءة المتقدمة',
        body: 'العدة: Include متعدد ومتداخل (ThenInclude للعلاقات العميقة)، وsplit queries (AsSplitQuery لتفادي انفجار JOIN الديكارتي)، وfiltered Include (تحميل علاقة مفلترة)، وراو SQL منمّط (FromSql) للحالات المعقّدة. وتفادي تحميل ما لا تحتاج: الإسقاط لـ DTO يتفوق على Include + تحويل لأنه يجلب أعمدة محدّدة. مراقبة SQL المولّد (سجلات أو ميزة ToQueryString) عادة لا غنى عنها.',
      },
      {
        heading: 'الكتابات المتقدمة والأداء',
        body: 'للكتابات الجماعية: ExecuteUpdate/ExecuteDelete (EF 7+) تنفّذ UPDATE/DELETE مباشرة في القاعدة بلا تحميل الكيانات للذاكرة — قفزة أداء للعمليات الكبيرة. وللإدراج الضخم BulkExtensions. وconcurrency tokens ([Timestamp] أو RowVersion) تكشف التعديل المتزامن فترمي DbUpdateConcurrencyException بدل دهس صامت. SaveChanges يبقى نقطة الالتزام الذرية للتغييرات المتتبَّعة.',
      },
    ],
  },
  relationships: {
    summary:
      'العلاقات الثلاث: one-to-many (Category له Products): الطرف "many" يحمل foreign key (CategoryId) + navigation property. many-to-many (Products↔Tags): EF Core يدير جدول الوصل تلقائياً. one-to-one (User↔Profile): مفتاح مشترك أو أجنبي. ويستنتج EF أغلب العلاقات من navigation properties بالاصطلاح. وحين لا يكفي الاصطلاح، اضبط صراحة في OnModelCreating (الـ Fluent API): حقول إلزامية، أطوال، فهارس، سلوك حذف، مفاتيح مركّبة. والفهارس خاصة: عمود تفلتر أو تربط عليه كثيراً يحتاج فهرساً وإلا زحفت الاستعلامات. وتصميم الـ schema مهارة: طبّع لتفادي التكرار، وقرّر سلوك الحذف، واختر decimal للنقود.',
    details: [
      {
        heading: 'سلوك الحذف — قرار خطير',
        body: 'حذف Category لها Products: ماذا يحدث للأبناء؟ Cascade يحذفهم معها (خطر: حذف سلسلة غير مقصود)، وRestrict يمنع الحذف ما داموا موجودين (أأمن غالباً)، وSetNull يصفّر مفتاحهم. EF يختار افتراضاً حسب إلزامية العلاقة — اضبطه صراحة بـ OnDelete في الـ Fluent API. القرار الخاطئ يفقد بيانات بصمت أو يعطّل حذوفاً مشروعة. فكّر في الأبناء قبل كل علاقة.',
      },
      {
        heading: 'النمذجة بين التطبيع والأداء',
        body: 'التطبيع (Normalization) يلغي التكرار (بيانات الفئة مرة واحدة، يشير إليها المنتجات) فيمنع تضارب التحديث — المبدأ الافتراضي الصحيح. لكن القراءات الثقيلة قد تبرر إزالة تطبيع محسوبة (تخزين إجمالي محسوب بدل حسابه كل مرة) — مقايضة واعية مع آلية تحديث. وقرارات النوع: decimal للنقود (لا double العائم!)، وأطوال نصية محدّدة، وenums كـ int أو string. الـ schema النظيف يبسّط كل استعلام بعده.',
      },
      {
        heading: 'أنماط نمذجة متقدمة',
        body: 'ستقابل: owned entities (كائن قيمة مضمّن في جدول الأب — Address داخل User بلا جدول مستقل)، وtable-per-hierarchy للوراثة (نوع واحد، عمود مميِّز)، وglobal query filters (شرط تلقائي على كل استعلام — soft delete: IsDeleted == false، أو multi-tenancy). وshadow properties (أعمدة بلا خاصية في الكلاس — CreatedAt مُدار). هذه الأدوات تطابق النموذج للمجال بدقة دون تلويث كياناتك.',
      },
    ],
  },

  // ============================ المستوى 4 ============================
  'layered-architecture': {
    summary:
      'مشروع واحد يكفي حتى يكبر، ثم يصبح خلط controllers والمنطق وSQL غير قابل للصيانة. العمارة الطبقية تفصل: Api (controllers، HTTP)، وApplication (منطق الأعمال، حالات الاستخدام)، وDomain (الكيانات، القواعد الجوهرية)، وInfrastructure (EF، الخدمات الخارجية) — نفس فكرة "نظّم بالمسؤولية" من Angular على مستوى المشاريع. وقلب clean architecture: الاعتمادات تشير للداخل؛ Api→Application→Domain، وInfrastructure→للداخل. والـ Domain لا يعتمد على شيء (لا EF ولا ASP.NET) فتبدّل القاعدة أو الإطار دون مساس المنطق. الداخل يعرّف interfaces والخارج ينفّذها — عكس الاعتماد معمارياً. والبراغماتية: طابق البنية للتعقيد، لا تبالغ في طبقات تطبيق بسيط.',
    details: [
      {
        heading: 'تشريح حالة الاستخدام في Application',
        body: 'طبقة Application تنسّق use cases: PlaceOrderHandler يتحقق، يحجز مخزوناً، يخصم، يحفظ — منطق العمل الذي لا ينتمي لـ HTTP ولا للقاعدة. تعرّف interfaces لما تحتاجه (IOrderRepository، IPaymentGateway) وتترك التنفيذ لـ Infrastructure. وأنماط شائعة هنا: CQRS (فصل أوامر الكتابة عن استعلامات القراءة)، وMediatR (إرسال أوامر لمعالِجاتها). هذه الطبقة هي "ماذا يفعل التطبيق" مجرّدة عن "كيف يصل ويخزّن".',
      },
      {
        heading: 'لماذا الاعتماد المعكوس يحرر',
        body: 'حين يعرّف Application واجهة IEmailSender وينفّذها Infrastructure، ينقلب الاعتماد: المنطق العالي المستوى لا يعرف SendGrid، بل العكس. النتائج العملية: تبدّل مزوّد البريد دون لمس المنطق، وتختبر بفيك بريد (كورس الاختبار)، وتؤجّل قرارات البنية التحتية. هذا تطبيق مبدأ Dependency Inversion (الـ D في SOLID) معمارياً — نفس فكرة DI في الكلاس، مرفوعة لمستوى المشاريع.',
      },
      {
        heading: 'البدائل: vertical slices وmodular monolith',
        body: 'clean architecture ليست الوحيدة: Vertical Slice Architecture تنظّم بالميزة لا الطبقة (كل ميزة مجلد مكتفٍ — يقلّل القفز بين المشاريع، شائع مع minimal APIs وMediatR)، وModular Monolith يقسّم لوحدات بحدود واضحة دون تشتت microservices. والقاعدة الحاكمة: التعقيد المعماري ضريبة — ادفعها حيث المجال يستحق، وابقَ بسيطاً حيث لا. تطبيق CRUD صغير: مشروعان يكفيان.',
      },
    ],
  },
  'di-patterns': {
    summary:
      'سجّل IUserService→UserService وIProductRepository→ProductRepository؛ المستهلك يعتمد على الـ interface لا الكلاس — الدرز (من كورس الاختبار) حيث تبدّل فيكاً في الاختبار وحقيقياً في الإنتاج. نفس DI الذي تعرفه من Angular، مدمجاً ومستخدماً في كل مكان. والـ repository يجرّد الوصول لبيانات aggregate (IProductRepository بـ GetById وAdd) فيخفي EF، والـ service يحمل منطق الأعمال (PlaceOrderAsync: تحقّق، احجز، اخصم، احفظ). controllers تنادي services، وservices تستخدم repositories. (ملاحظة: DbContext نفسه repository+unit-of-work، فكثيرون يتخطون repository منفصلاً للبسيط). والأعمار: Scoped للخدمات وDbContext، Singleton للأدوات عديمة الحالة، Transient للخفيف — ولا تحقن Scoped في Singleton.',
    details: [
      {
        heading: 'جدل: هل تحتاج repository فوق EF؟',
        body: 'نقاش حيّ: DbContext أصلاً repository (DbSet) ووحدة عمل (SaveChanges)، فطبقة repository فوقه تكرار لكثيرين — خاصة مع الإسقاط لـ DTO الذي يحتاج مرونة LINQ الكاملة (interface repository ضيق يخنقها). الحجة المقابلة: repository يعزل المنطق عن EF (تبديل ORM، اختبار أسهل). الوسط العملي: لا repository عام للبسيط، وrepository محدّد لـ aggregates معقّدة. القرار يعتمد على حجم المشروع واحتمال تبديل البنية.',
      },
      {
        heading: 'الدرز الذي يصل كل الكورسات',
        body: 'لاحظ التماسك: DI في Angular (inject)، وDI في ASP.NET (constructor)، والبدائل في الاختبار (fakes عبر الـ interface) — كلها نفس المبدأ. الـ interface هو نقطة الفصل التي تجعل الكود قابلاً للتبديل والاختبار في الطبقتين. حين تكتب IProductRepository وتحقنه، أنت تطبّق ما تعلمته في خمسة كورسات: عقد يخفي تنفيذاً، فتتبدّل التفاصيل دون اهتزاز المعتمدين.',
      },
      {
        heading: 'دقائق التسجيل والأعمار المتقدمة',
        body: 'صيغ التسجيل: AddScoped/Singleton/Transient، وTryAdd (لا يسجّل إن وُجد)، وتسجيل factory (Func لبناء معقّد)، وتسجيل متعدد لنفس الواجهة (يُحقن IEnumerable<T>). وأنماط: decorator (لف خدمة بأخرى — كاش حول repository)، وkeyed services (.NET 8: عدة تنفيذات بمفاتيح). والمصيدة الكبرى تبقى captive dependency: ASP.NET في التطوير يفحص نطاقات الأعمار عند الإقلاع ويرمي إن حقنت Scoped في Singleton — فعّل ValidateScopes.',
      },
    ],
  },
  configuration: {
    summary:
      'ASP.NET يدمج الإعدادات من مصادر مرتّبة: appsettings.json ثم appsettings.{Environment}.json ثم متغيرات البيئة ثم سطر الأوامر — اللاحق يغلب السابق. فـ appsettings.json افتراضات وطبقة البيئة تتجاوز لكل نشر. وIConfiguration يقرأ القيم، ونمط Options يربط قسماً بكلاس منمّط تحقنه. والبيئات: متغير ASPNETCORE_ENVIRONMENT (Development/Staging/Production) يختار ملف التجاوز ويبدّل السلوك (أخطاء مفصّلة في التطوير، معقّمة في الإنتاج؛ Swagger في dev فقط) — فكرة environment files في Angular نفسها. والأسرار: لا تُرفَع أبداً (قاعدة Git: السر المسرَّب أبدي) — User Secrets محلياً، ومتغيرات بيئة أو vault في الإنتاج.',
    details: [
      {
        heading: 'مصادر الإعداد الكاملة وترتيبها',
        body: 'السلسلة الافتراضية بالترتيب: appsettings.json، فـ appsettings.{env}.json، فـ User Secrets (في التطوير)، فمتغيرات البيئة، فسطر الأوامر — الأخير يفوز. وتضيف مصادر مخصّصة: Azure Key Vault، وملفات INI، وقواعد بيانات. ومتغيرات البيئة بصيغة هرمية بشرطتين سفليتين (Jwt__Issuer = قسم Jwt خاصية Issuer) — مهم للحاويات حيث الإعداد عبر env vars. تشخيص: GetDebugView يطبع كل القيم ومصدرها.',
      },
      {
        heading: 'إدارة الأسرار باحتراف',
        body: 'محلياً: dotnet user-secrets set "Jwt:SigningKey" "..." يخزّنها خارج مجلد المشروع (لا تُرفَع أبداً). إنتاجاً: متغيرات بيئة للبسيط، وKey Vault/AWS Secrets Manager/Doppler للجاد (تدوير، تدقيق وصول، تشفير). والذهبي: appsettings.json لا يحوي إلا غير الحساس، وappsettings.Production.json نفسه قد يُرفَع (بلا أسرار). وإن تسرّب سر يوماً: دوّره فوراً (قاعدة Git — التاريخ يتذكره للأبد).',
      },
      {
        heading: 'IOptions بأنماطه الثلاثة',
        body: 'الـ Options pattern ثلاث صيغ: IOptions<T> (قيمة مرة واحدة عند الإقلاع — الشائع)، وIOptionsSnapshot<T> (تُعاد قراءتها لكل طلب — لإعدادات تتغير)، وIOptionsMonitor<T> (تتبّع حي مع إشعار التغيّر — للـ singletons والإعدادات الديناميكية). وValidateDataAnnotations يتحقق من صحة الإعداد عند الإقلاع فيفشل مبكراً بدل خطأ غامض لاحقاً. typing الإعدادات يجلب أمان TypeScript لطبقة الإعداد.',
      },
    ],
  },
  'logging-middleware': {
    summary:
      'تسجيل مدمج عبر ILogger<T> (محقون): LogInformation("Order {OrderId} placed", id). والتسجيل المنظَّم (structured) يبقي OrderId حقلاً قابلاً للاستعلام لا نصاً — فتبحث لاحقاً عن "كل سجلات الطلب 42". وSerilog الإثراء الشائع (ملفات، Seq، سحابة). والمستويات (Trace→Critical) تفصل الإشارة عن الضجيج لكل بيئة. والـ middleware المخصّص يجري على كل طلب (توقيت، correlation id، ترويسات): يستقبل context وdelegate next (ينادي أو لا) — هو نفسه مفهوم interceptor من Angular وRxJS، خادمياً. والمراقبة أبعد من السجلات: health checks، وmetrics، وtracing موزّع — يوحّدها OpenTelemetry. خادم لا تراقبه لا تشغّله.',
    details: [
      {
        heading: 'لماذا التسجيل المنظَّم يغيّر اللعبة',
        body: 'النص الحر ("Order 42 placed for $99") مقروء للبشر، عصيٌّ على الآلات. المنظَّم يحفظ {OrderId}=42 و{Total}=99 كحقول مفهرسة، فأنظمة مثل Seq وElasticsearch/Kibana وApplication Insights تتيح: تصفية بـ OrderId، وتجميع، وتنبيهات على أنماط. الفرق كالفرق بين grep في نص وSQL على جدول. تبنّ التسجيل المنظَّم من اليوم الأول — ترقيته لاحقاً مؤلم.',
      },
      {
        heading: 'correlation وتتبّع الطلب عبر الخدمات',
        body: 'في معمارية موزّعة، طلب واحد يعبر عدة خدمات — كيف تتبعه؟ correlation ID (معرّف يُولَّد ويُمرَّر في ترويسة عبر كل قفزة) يربط سجلات الطلب الواحد عبر الأنظمة. وOpenTelemetry يعمّمها: traces (شجرة العملية عبر الخدمات بأزمنتها)، وspans (كل خطوة)، يصدّرها لـ Jaeger/Zipkin/Grafana. middleware يولّد الـ ID مبكراً ويضعه في scope التسجيل فيظهر في كل سجل تلقائياً.',
      },
      {
        heading: 'middleware: ترتيب وأنماط',
        body: 'كتابة middleware: app.Use (مضمّن)، أو كلاس بـ InvokeAsync (منظّم، قابل للاختبار)، أو IMiddleware (محقون). والترتيب عقد (كرّرناه): الاستثناءات أولاً (تلتقط ما تحتها)، فالأمان، فالتوجيه، فنقاط النهاية. وميزات جاهزة كـ middleware: UseExceptionHandler، UseStaticFiles، UseRateLimiter، UseResponseCompression. فهمك للأنبوب الخادمي يكمل فهمك لأنبوب RxJS وinterceptors Angular — نفس النمط في ثلاثة سياقات.',
      },
    ],
  },

  // ============================ المستوى 5 ============================
  auth: {
    summary:
      'سؤالان مختلفان: المصادقة (authentication) = من أنت (إثبات الهوية)، والتفويض (authorization) = ماذا يحقّ لك (فحص الصلاحيات) — خطوتان متمايزتان، وترتيب الـ middleware يجسّدهما: UseAuthentication ثم UseAuthorization. ولـ API يستهلكه Angular المعيار JWT: المستخدم يسجّل دخولاً، فيصدر الخادم توكناً موقَّعاً يحمل claims (معرّف، أدوار)، ويرسله العميل كل طلب في ترويسة Authorization: Bearer. الخادم يتحقق من التوقيع (بمفتاح سري) — بلا جلسة خادمية، فيبقى الـ API stateless ويتوسّع أفقياً. والتوكن موقَّع لا مشفَّر: لا تضع سراً في حمولته (أي أحد يقرؤها). وحماية النقاط: [Authorize] يتطلب توكناً، [Authorize(Roles="Admin")] دوراً، policies قواعد أغنى، [AllowAnonymous] يفتح (كالدخول).',
    details: [
      {
        heading: 'دورة حياة JWT الكاملة',
        body: 'التدفق: دخول بكلمة مرور → الخادم يتحقق ويصدر access token قصير العمر (دقائق) + refresh token طويل العمر → العميل يحفظهما ويرسل الـ access في كل طلب → عند انتهائه يبادله بـ refresh للحصول على جديد دون إعادة دخول. التوكن ثلاثة أجزاء (header.payload.signature) بـ base64: الأولان مقروءان (لا أسرار!)، والثالث توقيع يمنع التزوير. مدة قصيرة + refresh توازن الأمان والراحة.',
      },
      {
        heading: 'JWT مقابل جلسات الكوكيز',
        body: 'بديل JWT: cookie-based sessions (جلسة في الخادم، معرّف في كوكي) — أبسط للمواقع التقليدية وأسهل إبطالاً، لكنها stateful (تحتاج تخزين جلسات مشترك عند التوسّع). JWT stateless (يتوسّع بلا مشاركة) لكن إبطاله أصعب (موقّع حتى انتهائه — تحتاج قائمة سوداء أو مدة قصيرة). لـ SPA + API منفصل، JWT (أو cookies مع SameSite) شائع. القرار يوازن التوسّع مقابل سهولة الإبطال.',
      },
      {
        heading: 'أين يخزّن العميل التوكن؟ (أمان حرج)',
        body: 'نقاش أمني مهم لكورسك التالي: localStorage سهل لكنه عرضة لـ XSS (سكربت خبيث يقرؤه). الكوكي بـ HttpOnly محصّن من XSS لكنه عرضة لـ CSRF (يُخفَّف بـ SameSite). لا حل مثالي — الإجماع المتزايد: refresh token في كوكي HttpOnly+Secure+SameSite، وaccess token في الذاكرة (متغير، يضيع بالتحديث ويُجدَّد بالـ refresh). تطبيق مباشر لـ "لا تضع سراً يصله سكربت" — وكورس API يعمّقه.',
      },
    ],
  },
  security: {
    summary:
      'القاعدة الأساس: كل مدخل عدائي حتى يُتحقَّق منه. ASP.NET وEF يعطيان دفاعات قوية — استعلامات مُعامَلة (EF) تمنع SQL injection، وربط النموذج + التحقق يحرس الأشكال. مهمتك: تحقّق خادمياً، فوّض كل نقطة محمية، ولا تبنِ SQL بدمج نصوص. وOWASP Top 10 قائمة ما يجرّبه المهاجمون. وكلمات المرور: لا نص صريح أبداً — جزّئها بخوارزمية بطيئة (PBKDF2/bcrypt). وفرض HTTPS (UseHttpsRedirection، HSTS) فالتوكنات مشفّرة نقلاً، وترويسات أمان، وأخطاء معقّمة إنتاجاً (stack trace هدية للمهاجم). وCORS يضبط أي أصول المتصفح تستدعي (أصل Angular مسموح، غيره محظور — يعمّقه كورسك التالي)، وrate limiting يحدّ الطلبات لكبح القوة الغاشمة. وحدّث الاعتماديات: --vulnerable يكشف الثغرات.',
    details: [
      {
        heading: 'OWASP Top 10 — خريطة التهديدات',
        body: 'القائمة المعيارية لأكثر الثغرات: Broken Access Control (الأولى — تفويض ناقص، أخطر الكل)، وInjection (SQL وغيره)، وCryptographic Failures (تشفير ضعيف، أسرار مكشوفة)، وSecurity Misconfiguration، وVulnerable Components (حزم قديمة)، وAuthentication Failures. كل بند له دفاع في ASP.NET. ادرسها — معرفة ما يجرّبه المهاجمون نصف الدفاع، وقابلة للتطبيق في كل API تبنيه.',
      },
      {
        heading: 'ASP.NET Identity — لا تبنِ المصادقة يدوياً',
        body: 'بناء نظام مستخدمين آمن صعب (تجزئة، إعادة تعيين، تأكيد بريد، قفل بعد محاولات، 2FA) — ASP.NET Core Identity يوفّره جاهزاً مختبَراً. وللمؤسسات: IdentityServer/Duende أو OpenIddict لـ OAuth2/OpenID Connect الكامل، أو خدمات مُدارة (Auth0، Azure AD B2C، Keycloak). القاعدة الذهبية الأمنية: لا تخترع التشفير أو المصادقة بنفسك — استخدم المجرَّب. أخطاء الأمن المنزلية الصنع كارثية.',
      },
      {
        heading: 'دفاع متعدد الطبقات بلا مفتاح سحري',
        body: 'الأمان ليس ميزة بل طبقات: HTTPS (نقل)، CORS (أصول)، rate limiting (إساءة)، تحقق المدخل (حقن)، تفويض (وصول)، تجزئة كلمات المرور (تسريب قاعدة)، ترويسات أمان (CSP، X-Frame-Options)، أسرار في vault، حزم محدّثة، تسجيل وتدقيق. لا سطر واحد "يؤمّن" التطبيق. وأضف: فحص ثغرات آلي في CI (dotnet list --vulnerable، Dependabot)، وpenetration testing للحرج. الأمان عملية مستمرة لا خانة تُعلَّم.',
      },
    ],
  },
  performance: {
    summary:
      'عمل الخادم I/O-bound (قاعدة، شبكة)، فـ async/await في كل مكان يدع خادماً يخدم طلبات متزامنة أكثر بنفس الخيوط — يُحرَّر الخيط أثناء الانتظار بدل حجزه. async من طرف لطرف، ولا تحجب على async (.Result/.Wait() تسبب deadlocks وهدر خيوط) — أكبر رافعة إنتاجية. والكاش طبقات: IMemoryCache لخادم واحد، Redis للموزّع، response/output caching للردود الكاملة، وترويسات HTTP (ETag) لكاش العملاء والوسطاء. خزّن الغالي والمستقر، وخطّط للإبطال (الأصعب). والترقيم (pagination): لا قوائم بلا حد — Skip/Take + عدّ كلّي، مع عادات المستوى 3 (إسقاط، AsNoTracking، Include ضد N+1). وقِس قبل أن تحسّن.',
    details: [
      {
        heading: 'لماذا async أكبر رافعة فعلاً',
        body: 'خادم ويب نموذجي ينتظر I/O (قاعدة، API خارجي) معظم وقته. الخيط المتزامن يحجز خلال الانتظار فينفد عدد محدود (مئات) → طوابير → بطء. async يحرّر الخيط للحظة الانتظار ليخدم طلباً آخر، فيخدم آلافاً بنفس العدد. والحجب على async (.Result) أسوأ من المتزامن البحت: يحجز خيطاً وقد يقفل thread pool في deadlock. القاعدة المطلقة: async من الـ controller حتى استدعاء القاعدة، بلا حجب.',
      },
      {
        heading: 'استراتيجيات الكاش وإبطالها',
        body: 'الكاش يحوّل الأداء لكن إبطاله مشكلة كلاسيكية. الأنماط: انتهاء زمني مطلق/منزلق (بسيط، قد يخدم قديماً)، وإبطال صريح عند الكتابة (دقيق، يحتاج تتبع المفاتيح)، وcache-aside (تحقّق الكاش، عند الغياب احسب وخزّن). وHybridCache (.NET 9) يوحّد الذاكرة والموزّع مع حماية cache stampede. ولكاش HTTP: ETag + If-None-Match يعيد 304 (لم يتغيّر) فيوفّر النقل. خزّن المستقر الغالي، وقِس نسبة الإصابة (hit ratio).',
      },
      {
        heading: 'قِس قبل أن تحسّن — العدّة',
        body: 'القاعدة عبر كل الكورسات: لا تحسّن بالحدس. الأدوات: تسجيل بطء الاستعلامات (EF logging، أو ToQueryString لرؤية SQL)، وملفّات التعريف (dotnet-trace، Visual Studio Profiler، Application Insights)، واختبار الحمل (k6، Bombardier، JMeter) لمعرفة السقف الفعلي. وBenchmarkDotNet للكود الحرج الدقيق. غالب "البطء" يعود لاستعلام واحد سيئ (N+1، فهرس مفقود) لا لمعمارية — قِس لتجده بدل تخمين.',
      },
    ],
  },
  'testing-deployment': {
    summary:
      'هرم كورس الاختبار ينطبق: وحدات (xUnit/NUnit) للخدمات والمنطق بفيكات، وتكامل بـ WebApplicationFactory يقلع التطبيق في الذاكرة ويضرب نقاطاً حقيقية (غالباً قاعدة اختبار أو in-memory)، وقليل e2e. وWebApplicationFactory ميزة ASP.NET القاتلة: توجيه وDI وmiddleware حقيقية بلا شبكة. والحاويات: صورة Docker تغلّف التطبيق بزمن تشغيله فيعمل متطابقاً في كل مكان (جهازك، CI، الإنتاج)، وDockerfile متعدد المراحل يبني ثم يشحن صورة تشغيل صغيرة، تنسّقها Kubernetes أو تُشغَّل على مُضيف مُدار. وCI/CD: كل push يبني ويختبر ويحوّل لحاوية وينشر، وmigrations كخطوة نشر متعمَّدة — النهاية كواجهة SkillForge: الأخضر يبوّب النشر، والمكسور لا يُشحَن.',
    details: [
      {
        heading: 'WebApplicationFactory بعمق',
        body: 'الجوهرة: يستضيف Program كاملاً في العملية (توجيه، DI، middleware، filters حقيقية) ويعطي HttpClient يضرب نقاطاً حقيقية بلا منفذ شبكة — أصدق من اختبار وحدة controller، أسرع من e2e. تستبدل خدمات للاختبار (قاعدة in-memory أو Testcontainers لقاعدة حقيقية في حاوية)، وتختبر التدفق كاملاً: تحقّق، تفويض، ربط، استجابة. هذا نظير TestBed في Angular — التطبيق الحقيقي مصغّراً.',
      },
      {
        heading: 'Dockerfile متعدد المراحل ولماذا',
        body: 'النمط المعياري: مرحلة build بصورة SDK الثقيلة (تترجم وتنشر)، ثم مرحلة نهائية بصورة runtime النحيفة (aspnet) تنسخ المخرج فقط — فالصورة الشاحنة صغيرة (لا أدوات بناء، أسرع سحباً، سطح هجوم أقل). وطبقات Docker مُخبّأة: ضع restore الاعتماديات قبل نسخ الكود فلا يُعاد إلا عند تغيّر الحزم. وتحسينات: chiseled/distroless images، وAOT للإقلاع الفوري. الحاوية تنهي "يعمل عندي".',
      },
      {
        heading: 'الأنبوب الكامل والتشغيل الإنتاجي',
        body: 'CI/CD كامل: push → dotnet build → dotnet test (الهرم) → بناء الصورة ودفعها لـ registry → نشر (Kubernetes/App Service). وmigrations خطوة صريحة (script يراجَع، لا تلقائي عند الإقلاع). والتشغيل: health checks (/health للموازِن)، وobservability (سجلات/metrics/traces مركزية)، وأسرار من vault، وnل تدريجي (blue-green/canary) للتراجع الآمن. نفس فلسفة نشرك لـ SkillForge على Vercel، مرفوعةً لعالم الخادم — والأخضر يبقى شرط الشحن.',
      },
    ],
  },
};
