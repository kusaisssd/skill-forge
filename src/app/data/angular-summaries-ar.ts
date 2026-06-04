/**
 * Arabic summaries (ملخصات عربية) for the Angular course, keyed by lesson id.
 * Shown in an RTL card inside each lesson, alongside the English content.
 * Technical terms are kept in English on purpose — that is how you will
 * encounter them in real code and documentation.
 */
export const ANGULAR_SUMMARIES_AR: Record<string, string> = {
  // ---------- المستوى 1 ----------
  'what-is-angular':
    'Angular هو إطار عمل (framework) متكامل لبناء تطبيقات الويب، مكتوب بلغة TypeScript. التطبيق عبارة عن شجرة من المكوّنات (components)، وكل مكوّن يتألف من ثلاثة أجزاء: كلاس للمنطق، وقالب HTML للعرض، وتنسيقات CSS. يبدأ التطبيق من ملف main.ts الذي يستدعي bootstrapApplication لعرض المكوّن الجذري داخل وسم <app-root> في صفحة index.html. الإصدارات الحديثة (17+) تستخدم المكوّنات المستقلة (standalone) دون الحاجة إلى NgModule.',
  'typescript-essentials':
    'TypeScript هي JavaScript مضافاً إليها الأنواع (types)، فتكتشف الأخطاء قبل تشغيل الكود. أهم ما ستقابله: تحديد النوع بعد النقطتين مثل name: string، والـ interface لوصف شكل الكائن (تختفي تماماً عند الترجمة)، والـ generics بالأقواس الزاوية مثل Array<User>، والـ decorators مثل @Component التي تضيف بيانات وصفية للكلاس. كلمة private تخفي الخاصية عن خارج الكلاس، وreadonly تمنع إعادة التعيين.',
  'project-structure':
    'عند إنشاء مشروع بـ ng new تكون ملفات الإعداد في الجذر وكودك داخل src/app. أهم الملفات: package.json (الاعتماديات والأوامر)، وangular.json (إعدادات البناء)، وtsconfig.json (إعدادات TypeScript)، وmain.ts (نقطة البداية)، وindex.html (الصفحة المضيفة). الأمر npm start يشغّل خادم التطوير على المنفذ 4200، وnpm run build ينتج نسخة الإنتاج في مجلد dist.',
  'components-and-binding':
    'المكوّن يحمل حالة (خصائص) وسلوكاً (دوال)، والقالب يعرضها ويستدعيها. هناك أربعة أنواع من الربط (binding): الاستيفاء {{ قيمة }} لطباعة قيمة، وربط الخاصية [src]="url" لتمرير بيانات من الكلاس إلى العنصر، وربط الحدث (click)="save()" لتنفيذ دالة عند وقوع حدث، والربط الثنائي [(ngModel)] الذي يجمع الاتجاهين. القاعدة: الأقواس المربعة إدخال للعنصر، والأقواس العادية خرج منه، ولا تتعامل مع الـ DOM يدوياً أبداً.',

  // ---------- المستوى 2 ----------
  'control-flow-directives':
    'التوجيهات الهيكلية (structural directives) تضيف أو تحذف عناصر من الـ DOM، بينما توجيهات السمات مثل ngClass تعدّل عنصراً موجوداً. الإصدارات الحديثة تستخدم صيغة التحكم المدمجة: @if للشروط مع @else، و@for للتكرار مع track إجباري لتحديد هوية كل عنصر بكفاءة، و@empty عندما تكون القائمة فارغة، و@switch للتفرعات المتعددة. ستصادف الصيغة القديمة *ngIf و*ngFor في الشيفرات الأقدم.',
  pipes:
    'الـ pipe يحوّل القيمة للعرض فقط باستخدام الرمز | دون تغيير البيانات الأصلية. أشهرها: date للتواريخ، وcurrency وnumber وpercent للأرقام، وuppercase وtitlecase للنصوص، وjson لفحص الكائنات. تمرَّر المعاملات بعد نقطتين مثل date:\'short\' ويمكن سلسلة عدة pipes. أهمها async الذي يشترك في Observable ويعرض آخر قيمة ويلغي الاشتراك تلقائياً.',
  'component-communication':
    'البيانات تنزل من الأب إلى الابن عبر المدخلات (inputs)، والأحداث تصعد من الابن إلى الأب عبر المخرجات (outputs). الصيغة الحديثة: value = input<number>(0) وتُقرأ بالاستدعاء value()، وchanged = output<number>() ويُرسل الحدث بـ emit(). الأب يربط بـ [value]="x" ويستمع بـ (changed)="onChanged($event)". هذا التدفق أحادي الاتجاه يبقي التطبيق متوقَّع السلوك.',
  'services-and-di':
    'الـ service كلاس عادي يحمل منطقاً أو بيانات مشتركة، ليبقى المكوّن مركّزاً على العرض. حقن الاعتماديات (DI) يعني أنك لا تنشئ الاعتماديات بـ new بل تطلبها من Angular. التزيين @Injectable({ providedIn: \'root\' }) ينشئ نسخة واحدة مشتركة لكامل التطبيق (singleton). الطريقة الحديثة للحصول على الخدمة: private api = inject(ApiService)، والقديمة عبر الـ constructor.',

  // ---------- المستوى 3 ----------
  signals:
    'الـ signal غلاف حول قيمة يخطر كل من يقرؤها عند تغيّرها، وهو أساس التفاعلية الحديثة في Angular. تنشئه بـ signal(0) وتقرؤه بالاستدعاء count()، وتغيّره بـ set(قيمة) أو update(n => n + 1). الـ computed يشتق قيمة للقراءة فقط تُعاد حسابها تلقائياً، والـ effect ينفّذ أثراً جانبياً عند تغيّر الإشارات التي يقرؤها. الميزة: يعرف Angular بدقة أي أجزاء من الشاشة يجب تحديثها.',
  'rxjs-observables':
    'الـ Observable تيار من القيم يصل عبر الزمن — مثل مصفوفة موزعة زمنياً — وهو أساس HTTP والأحداث. لا يحدث شيء حتى تشترك بـ subscribe، والأفضل استخدام async pipe في القالب لأنه يشترك ويلغي الاشتراك تلقائياً. تُحوَّل التيارات بمعاملات داخل pipe() مثل map وfilter وdebounceTime وswitchMap الذي يلغي الطلب القديم عند وصول جديد. القاعدة: signals للحالة المتزامنة، وObservables للتدفقات غير المتزامنة، وtoSignal يجسر بينهما.',
  'http-client':
    'فعّل HTTP بإضافة provideHttpClient() في app.config.ts ثم احقن HttpClient حيث تحتاجه. الدالة http.get<User[]>(url) تعيد Observable منمّط النوع، ومثلها post وput وdelete، ولا يُرسل الطلب إلا عند الاشتراك. الممارسة الصحيحة: ضع نداءات HTTP داخل service يطلب منه المكوّن البيانات، وعالج الأخطاء بـ catchError.',
  forms:
    'لدى Angular نظامان للنماذج: النماذج القالبية (template-driven) بـ ngModel وتناسب البسيط، والنماذج التفاعلية (reactive) حيث يُبنى النموذج في الكلاس بـ FormGroup وFormControl وهي الأقوى والمفضلة. يربط القالب بـ [formGroup] وformControlName، وتضاف المدققات مثل Validators.required وValidators.email، وتُقرأ الحالة من form.valid وform.value. ميزتها أن النموذج في الكود فيسهل اختباره.',

  // ---------- المستوى 4 ----------
  routing:
    'التوجيه (routing) يربط مسار الـ URL بمكوّن: تعرّف مصفوفة routes وتسجّلها بـ provideRouter، ويُعرض المكوّن المطابق داخل <router-outlet>. المسارات تقبل معاملات مثل skills/:id تُقرأ عبر ActivatedRoute، والتنقل يتم بـ routerLink في القوالب أو خدمة Router برمجياً. التحميل الكسول loadComponent: () => import(...) يجعل الميزة تُحمَّل عند زيارتها فقط فيصغر حجم الحزمة الأولي، ومسار ** الشامل يجب أن يكون أخيراً.',
  'standalone-vs-modules':
    'قديماً كانت المكوّنات تُجمَّع داخل @NgModule بمصفوفات declarations وimports وexports. حديثاً (من الإصدار 17) المكوّن المستقل standalone: true يصرّح بما يحتاجه مباشرة في imports الخاصة به دون أي module. عليك قراءة الصيغتين لأن المشاريع القديمة ما زالت تستخدم NgModules والصيغتان تتعايشان في نفس المشروع.',
  'file-organization':
    'التطبيقات الصغيرة تُنظَّم حسب النوع (components/ وservices/)، أما الكبيرة فالأوضح تنظيمها حسب الميزة (feature): كل ميزة في مجلد يضم مكوّناتها وخدماتها ونماذجها. الهيكل الشائع: core/ للمفردات على مستوى التطبيق مثل auth، وshared/ للعناصر القابلة لإعادة الاستخدام، وfeatures/ للميزات القابلة للتحميل الكسول. التسمية تتبع نمط name.role.ts مثل user.service.ts وauth.guard.ts فيُعرف دور الملف من اسمه.',
  'state-management':
    'الحالة (state) هي البيانات التي يتذكرها تطبيقك: المستخدم الحالي، سلة المشتريات... الخيار الأول دائماً: service يملك الحالة بـ signals، يكشفها للقراءة فقط بـ asReadonly، ويغيّرها عبر دوال واضحة. عندما تتعقد الحالة المشتركة في التطبيقات الكبيرة، توجد مكتبات مثل NgRx بنمط Redux (actions وreducers وselectors) أو NgRx SignalStore الأخف. ابدأ بسيطاً ولا تضف بنية إلا عند الحاجة.',

  // ---------- المستوى 5 ----------
  'change-detection':
    'اكتشاف التغييرات (change detection) هو آلية مزامنة الـ DOM مع بياناتك بعد كل حدث أو عملية غير متزامنة. استراتيجية OnPush تجعل المكوّن يُفحص فقط عند تغيّر مدخلاته أو وقوع حدث داخله فيقل العمل كثيراً. الـ signals أدق: يعرف Angular أي قوالب قرأت أي إشارات فيحدّث المتأثر فقط، والاتجاه المستقبلي تطبيقات بلا Zone.js. عملياً: استخدم track في @for، وحمّل المسارات كسولاً، وقِس قبل أن تحسّن.',
  testing:
    'ثلاثة مستويات للاختبار: اختبارات الوحدة (unit) لكلاس واحد معزول، واختبارات المكوّن بـ TestBed الذي يبني بيئة اختبار ويعرض المكوّن، واختبارات e2e التي تقود التطبيق كاملاً في متصفح حقيقي بأدوات مثل Cypress أو Playwright. الأمر ng test يشغّلها، وJasmine توفر describe وit وexpect. حقن الاعتماديات يسمح بتمرير خدمات وهمية (mocks) فتصبح الاختبارات سريعة وحتمية.',
  'library-ecosystem':
    'الكثير مدمج في Angular نفسه: Router وHttpClient وForms وDI — تعلّمها قبل أي مكتبة خارجية. لواجهة المستخدم: Angular Material الرسمية مع CDK (لبنات غير منسّقة مثل drag-drop)، وبدائل مثل PrimeNG وNg-Zorro، وTailwind للتنسيق. للحالة: NgRx وSignalStore وElf، وللبيانات TanStack Query، وللرسوم البيانية ngx-charts أو Chart.js. الأمر ng add يثبّت المكتبة ويهيئها تلقائياً.',
  'build-and-deploy':
    'الأمر ng build يجمّع التطبيق إلى ملفات ثابتة (HTML/JS/CSS) في مجلد dist بعد التصغير وإزالة غير المستخدم (tree-shaking) وإضافة بصمات للأسماء. الإعدادات تختلف بين بيئة وأخرى عبر configurations، وأي سر يوضع في الواجهة الأمامية يصبح علنياً فلا تضع مفاتيح سرية أبداً. الاستضافة ممكنة على أي خدمة ملفات ثابتة (Vercel وNetlify وغيرهما) بشرط إعداد SPA fallback يعيد index.html للمسارات غير المعروفة كي يعمل التحديث على الروابط العميقة.',
};
