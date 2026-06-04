/**
 * الأقسام العربية لكورس Angular — مفتاحها هو معرّف الدرس (lesson id).
 *
 * كل درس له:
 *   - summary : ملخص مركّز للدرس.
 *   - details : فقرات "معرفة أوسع" تتعمق في الموضوع الحالي وتذكر
 *               الخيارات والمفاهيم المرتبطة المتاحة في النظام البيئي.
 *
 * المصطلحات التقنية تبقى بالإنجليزية عمداً — هكذا ستقابلها في الكود والوثائق.
 */

export interface ArabicDetail {
  heading: string;
  body: string;
}

export interface ArabicSection {
  summary: string;
  details: ArabicDetail[];
}

export const ANGULAR_SUMMARIES_AR: Record<string, ArabicSection> = {
  // ============================ المستوى 1 ============================
  'what-is-angular': {
    summary:
      'Angular هو إطار عمل (framework) متكامل لبناء تطبيقات الويب، مكتوب بلغة TypeScript. التطبيق عبارة عن شجرة من المكوّنات (components)، وكل مكوّن يتألف من ثلاثة أجزاء: كلاس للمنطق، وقالب HTML للعرض، وتنسيقات CSS. يبدأ التطبيق من ملف main.ts الذي يستدعي bootstrapApplication لعرض المكوّن الجذري داخل وسم <app-root> في صفحة index.html. الإصدارات الحديثة (17+) تستخدم المكوّنات المستقلة (standalone) دون الحاجة إلى NgModule.',
    details: [
      {
        heading: 'إصدارات Angular ودورة التحديث',
        body: 'يصدر إصدار رئيسي جديد كل ستة أشهر تقريباً، وكل إصدار مدعوم نحو 18 شهراً. أهم القفزات الحديثة: الإصدار 14 (standalone تجريبياً)، و16 (signals)، و17 (control flow الجديد @if/@for وstandalone افتراضياً)، و19 (linkedSignal وresource). الترقية بين الإصدارات تتم بأمر واحد: ng update، ودليل الترقية الرسمي على update.angular.dev يعطيك الخطوات بدقة حسب إصدارك.',
      },
      {
        heading: 'Angular مقابل React وVue',
        body: 'React مكتبة للعرض فقط وتترك لك اختيار الراوتر وإدارة الحالة وبقية الأدوات، وVue وسط بينهما. Angular "كامل الرأي": راوتر وفورمز وHTTP وDI واختبارات بقرارات موحّدة من فريق واحد (Google). لهذا يُفضَّل غالباً في المشاريع الكبيرة والفرق المتعددة لأن كل مشروع Angular يشبه الآخر، فينتقل المطوّر بين المشاريع بسهولة.',
      },
      {
        heading: 'SPA وSSR وHydration',
        body: 'افتراضياً يبني Angular تطبيق صفحة واحدة (SPA) يعمل كله في المتصفح. عند الحاجة لتحسين السرعة الأولى أو الـ SEO يمكن إضافة العرض من الخادم (SSR) عبر حزمة @angular/ssr، ومعها خاصية hydration التي تعيد استخدام الـ HTML القادم من الخادم بدل إعادة بنائه، وخيار prerendering لتوليد صفحات ثابتة وقت البناء.',
      },
    ],
  },
  'typescript-essentials': {
    summary:
      'TypeScript هي JavaScript مضافاً إليها الأنواع (types)، فتكتشف الأخطاء قبل تشغيل الكود. أهم ما ستقابله: تحديد النوع بعد النقطتين مثل name: string، والـ interface لوصف شكل الكائن (تختفي عند الترجمة)، والـ generics بالأقواس الزاوية مثل Array<User>، والـ decorators مثل @Component. كلمة private تخفي الخاصية عن خارج الكلاس، وreadonly تمنع إعادة التعيين.',
    details: [
      {
        heading: 'أنواع متقدمة ستقابلها كثيراً',
        body: 'الـ union types مثل string | null تعني "أحد هذين"، والـ literal types مثل type Size = \'sm\' | \'lg\' تحصر القيم المسموحة. الـ type alias بديل للـ interface ويزيد عليه القدرة على وصف الاتحادات. ستقابل أيضاً unknown (آمن ويجبرك على الفحص) مقابل any (يعطّل الفحص — تجنّبه)، وnever للحالات المستحيلة، وutility types جاهزة مثل Partial<T> وPick<T> وRecord<K,V>.',
      },
      {
        heading: 'تضييق الأنواع (narrowing) والتعامل مع null',
        body: 'TypeScript يضيّق النوع تلقائياً داخل الشروط: typeof للأساسيات وinstanceof للكلاسات وin للخصائص. وللتعامل مع القيم الفارغة: optional chaining بـ ?. يوقف السلسلة عند null بأمان، وnullish coalescing بـ ?? يعطي قيمة افتراضية فقط عند null/undefined، وعلامة ! تؤكد للمترجم أن القيمة ليست فارغة (استخدمها بحذر).',
      },
      {
        heading: 'إعدادات الصرامة في tsconfig',
        body: 'خيار strict يفعّل حزمة فحوصات أهمها strictNullChecks (يجبرك على معالجة null) وnoImplicitAny (يمنع الأنواع الضمنية). مشاريع Angular الجديدة تأتي بها مفعّلة، وأبقها كذلك — الألم البسيط وقت الكتابة يوفر ساعات تصحيح لاحقاً. يضيف Angular فوقها strictTemplates لفحص أنواع القوالب نفسها.',
      },
    ],
  },
  'project-structure': {
    summary:
      'عند إنشاء مشروع بـ ng new تكون ملفات الإعداد في الجذر وكودك داخل src/app. أهم الملفات: package.json (الاعتماديات والأوامر)، وangular.json (إعدادات البناء)، وtsconfig.json (إعدادات TypeScript)، وmain.ts (نقطة البداية)، وindex.html (الصفحة المضيفة). الأمر npm start يشغّل خادم التطوير على المنفذ 4200، وnpm run build ينتج نسخة الإنتاج في dist.',
    details: [
      {
        heading: 'ملفات أخرى ستراها في المشاريع',
        body: 'tsconfig.app.json وtsconfig.spec.json يخصصان إعدادات الترجمة للتطبيق وللاختبارات، وpublic/ (أو assets/ في الإصدارات الأقدم) للملفات الثابتة كالصور، و.editorconfig لتوحيد التنسيق بين المحررين، ومجلد .angular/ كاش للبناء يُستثنى من Git، وpackage-lock.json يثبّت إصدارات الاعتماديات بدقة — ارفعه مع المشروع دائماً.',
      },
      {
        heading: 'أوامر CLI التي ستستخدمها يومياً',
        body: 'ng generate component اسم (تختصر ng g c) تولّد مكوّناً كاملاً، ومثلها ng g s للخدمات وng g p للـ pipes وng g g للحراس. ng add يثبّت مكتبة ويهيئها، وng update يرقّي الإصدارات، وng test يشغّل الاختبارات، وng build --configuration development لبناء غير مضغوط للفحص. كل أمر يقبل --dry-run ليعرض ما سيحدث دون تنفيذ.',
      },
      {
        heading: 'الإعدادات بين البيئات',
        body: 'ملفات environments (تولّدها ng g environments في الإصدارات الحديثة) تحمل قيماً مختلفة للتطوير والإنتاج مثل عنوان الـ API، ويستبدلها البناء عبر fileReplacements في angular.json. تذكّر دائماً: أي قيمة في الواجهة الأمامية تصبح علنية في المتصفح، فلا تضع فيها أسراراً حقيقية أبداً.',
      },
    ],
  },
  'components-and-binding': {
    summary:
      'المكوّن يحمل حالة (خصائص) وسلوكاً (دوال)، والقالب يعرضها ويستدعيها. أنواع الربط: الاستيفاء {{ قيمة }}، وربط الخاصية [src]="url" من الكلاس إلى العنصر، وربط الحدث (click)="save()" من العنصر إلى الكلاس، والربط الثنائي [(ngModel)]. القاعدة: الأقواس المربعة إدخال للعنصر، والعادية خرج منه، ولا تتعامل مع الـ DOM يدوياً أبداً.',
    details: [
      {
        heading: 'صيغ ربط إضافية مفيدة',
        body: 'يمكن ربط كلاس واحد بـ [class.active]="isActive" وستايل واحد بـ [style.width.px]="w"، وسمات الـ HTML غير القياسية بـ [attr.aria-label]="label". المتغير المرجعي #inputRef داخل القالب يمسك عنصراً لتستخدمه في نفس القالب مثل (click)="search(inputRef.value)". وتذكر أن الاستيفاء {{ }} يحوّل أي قيمة إلى نص — للكائنات استخدم json pipe للفحص.',
      },
      {
        heading: 'دورة حياة المكوّن (lifecycle)',
        body: 'أشهر الخطافات: ngOnInit يُنفَّذ مرة بعد ضبط المدخلات (مكان الجلب الأولي للبيانات)، وngOnDestroy عند إزالة المكوّن (مكان التنظيف وإلغاء الاشتراكات)، وngOnChanges عند تغيّر المدخلات القديمة الطراز، وngAfterViewInit بعد جهوزية عناصر العرض. مع signals تقل حاجتك إليها، وبديل حديث للتنظيف هو DestroyRef مع inject.',
      },
      {
        heading: 'تمرير محتوى والوصول إلى العناصر',
        body: 'الـ content projection عبر <ng-content> يسمح للأب بوضع محتوى داخل قالب الابن — هكذا تعمل مكوّنات مثل mat-card. وViewChild (أو viewChild() الإشاري الحديث) يمنح الكلاس مرجعاً لعنصر أو مكوّن داخل قالبه. وng-template يعرّف قطعة قالب لا تُعرض إلا عند الطلب — أساس الـ structural directives.',
      },
    ],
  },

  // ============================ المستوى 2 ============================
  'control-flow-directives': {
    summary:
      'التوجيهات الهيكلية تضيف أو تحذف عناصر من الـ DOM، وتوجيهات السمات مثل ngClass تعدّل عنصراً موجوداً. الصيغة الحديثة: @if مع @else، و@for مع track إجباري و@empty للقائمة الفارغة، و@switch للتفرعات. ستصادف الصيغة القديمة *ngIf و*ngFor في الشيفرات الأقدم.',
    details: [
      {
        heading: '@defer — التحميل المؤجل لأجزاء القالب',
        body: 'كتلة @defer (الإصدار 17+) تؤجل تحميل جزء من القالب ومكوّناته إلى ما بعد العرض الأولي، بشروط مثل on viewport (عند ظهوره على الشاشة) أو on interaction أو when شرط منطقي، مع @placeholder و@loading و@error لحالات الانتظار. ممتازة للأقسام الثقيلة أسفل الصفحة مثل الرسوم البيانية والتعليقات.',
      },
      {
        heading: 'كتابة توجيه سمات مخصص',
        body: 'بـ @Directive تنشئ سلوكاً قابلاً لإعادة الاستخدام على أي عنصر: مثلاً selector: \'[appHighlight]\' مع HostListener للأحداث وHostBinding أو خاصية host لتغيير الكلاسات. التوجيهات المخصصة هي الحل الصحيح عندما تريد سلوكاً متكرراً (تلوين، صلاحيات، تتبع نقرات) دون إنشاء مكوّن كامل.',
      },
      {
        heading: 'لماذا الصيغة الجديدة أفضل من *ngIf/*ngFor',
        body: 'الصيغة المدمجة لا تحتاج استيراد CommonModule أو NgIf/NgFor في imports، وأسرع في التنفيذ، وأوضح في القراءة، وtrack فيها إجباري فيمنع مشكلة الأداء الشائعة عند نسيان trackBy القديمة. الأمر ng generate @angular/core:control-flow يحوّل مشروعاً قديماً إلى الصيغة الجديدة تلقائياً.',
      },
    ],
  },
  pipes: {
    summary:
      'الـ pipe يحوّل القيمة للعرض فقط باستخدام | دون تغيير البيانات الأصلية. أشهرها: date وcurrency وnumber وuppercase وjson، وasync الذي يشترك في Observable ويعرض آخر قيمة ويلغي الاشتراك تلقائياً. تمرَّر المعاملات بعد نقطتين ويمكن سلسلة عدة pipes.',
    details: [
      {
        heading: 'كتابة pipe مخصص',
        body: 'تزيّن كلاساً بـ @Pipe({ name: \'truncate\', standalone: true }) وتطبّق واجهة PipeTransform بدالة transform(value, ...args). مثال شائع: قصّ النص الطويل مع "..."، أو تحويل الثواني إلى مدة مقروءة. تستورده في imports المكوّن وتستعمله كأي pipe مدمج: {{ title | truncate:50 }}.',
      },
      {
        heading: 'pure مقابل impure — أين يكمن الأداء',
        body: 'الـ pipe افتراضياً pure: يُعاد حسابه فقط عندما يتغيّر مرجع القيمة، لا عند كل دورة فحص — وهذا سر كفاءته. لو غيّرت محتوى مصفوفة دون تغيير مرجعها فلن يلاحظ الـ pure pipe؛ الحل الصحيح إنشاء مرجع جديد [...arr] وليس جعل الـ pipe impure (الذي يُنفَّذ باستمرار ويكلّف كثيراً).',
      },
      {
        heading: 'pipes إضافية والتدويل',
        body: 'ستقابل أيضاً slice لاقتطاع المصفوفات والنصوص، وkeyvalue للمرور على كائن في @for، وpercent وdecimal بصيغ مثل 1.0-2 (أرقام صحيحة-عشرية). الـ pipes الرقمية والتاريخية تعتمد على الـ locale؛ سجّل لغة بـ registerLocaleData واضبط LOCALE_ID لعرض التواريخ والأرقام بالعربية مثلاً.',
      },
    ],
  },
  'component-communication': {
    summary:
      'البيانات تنزل من الأب إلى الابن عبر inputs، والأحداث تصعد عبر outputs. الصيغة الحديثة: value = input<number>(0) وتُقرأ بالاستدعاء value()، وchanged = output<number>() ويُرسل بـ emit(). الأب يربط بـ [value]="x" ويستمع بـ (changed)="onChanged($event)".',
    details: [
      {
        heading: 'model() — الربط الثنائي الإشاري',
        body: 'الدالة model() (الإصدار 17.2+) تنشئ إشارة تعمل كمدخل ومخرج معاً: count = model(0) في الابن تتيح للأب الكتابة [(count)]="value" بالربط الثنائي، وأي تعديل من الطرفين ينعكس على الآخر. هذا يغنيك عن النمط القديم: @Input قيمة + @Output باسم valueChange.',
      },
      {
        heading: 'تواصل الأشقاء والمكوّنات البعيدة',
        body: 'عندما لا تكون العلاقة أباً-وابناً، الحل المعياري خدمة مشتركة تحمل الحالة بـ signals يقرؤها الجميع — وهذا جوهر درس إدارة الحالة. بدائل بحسب الحاجة: معاملات المسار وquery params لمشاركة الحالة عبر الـ URL، أو viewChild() لوصول الأب المباشر إلى دوال الابن عند الضرورة.',
      },
      {
        heading: 'الصيغة القديمة التي ستقرؤها في المشاريع',
        body: '@Input() value = 0; مع @Output() changed = new EventEmitter<number>(); والإرسال بـ this.changed.emit(x). قد تجد كذلك @Input مع setter لاعتراض القيمة عند وصولها، وngOnChanges لمراقبة عدة مدخلات. الصيغتان تتعايشان، لكن signal inputs أفضل أداءً وأبسط مع OnPush.',
      },
    ],
  },
  'services-and-di': {
    summary:
      'الـ service كلاس عادي يحمل منطقاً أو بيانات مشتركة، ليبقى المكوّن مركّزاً على العرض. الـ DI يعني أنك لا تنشئ الاعتماديات بـ new بل تطلبها من Angular. @Injectable({ providedIn: \'root\' }) ينشئ نسخة واحدة مشتركة، وinject(ApiService) هي الطريقة الحديثة للحصول عليها.',
    details: [
      {
        heading: 'مستويات التزويد المختلفة',
        body: 'providedIn: \'root\' يعطي نسخة واحدة للتطبيق كله، لكن يمكنك التزويد على مستوى أضيق: providers في مكوّن يعطي كل نسخة من المكوّن نسخة خاصة من الخدمة (مفيد لحالة محلية لكل بطاقة مثلاً)، وproviders في مسار route يعطي نسخة لكل شجرة المسار. الحقن يبحث صعوداً في شجرة الـ injectors حتى يجد المزوّد الأقرب.',
      },
      {
        heading: 'InjectionToken — حقن غير الكلاسات',
        body: 'لحقن قيم ليست كلاسات (إعدادات، ثوابت، دوال) تنشئ InjectionToken: مثل API_URL ثم { provide: API_URL, useValue: \'...\' } في الـ providers وتقرؤه بـ inject(API_URL). ومعه عائلة الخيارات: useClass لاستبدال تنفيذ بآخر، وuseFactory لبناء القيمة برمجياً — وهي نفسها آلية استبدال الخدمات الحقيقية بوهمية في الاختبارات.',
      },
      {
        heading: 'inject() خارج المكوّنات',
        body: 'الدالة inject() تعمل في أي سياق حقن: داخل دوال الحراس functional guards، والـ interceptors، والـ resolvers، وداخل دوال مساعدة تُستدعى من الـ constructor. هذا ما جعل الأنماط الحديثة (حارس مسار كدالة سهمية مثلاً) ممكنة دون كلاسات، وهو سبب تفضيل inject() على حقن الـ constructor في الكود الجديد.',
      },
    ],
  },

  // ============================ المستوى 3 ============================
  signals: {
    summary:
      'الـ signal غلاف حول قيمة يخطر كل من يقرؤها عند تغيّرها. تنشئه بـ signal(0) وتقرؤه بالاستدعاء count()، وتغيّره بـ set أو update(n => n + 1). الـ computed يشتق قيمة للقراءة فقط تُعاد حسابها تلقائياً، والـ effect ينفّذ أثراً جانبياً عند تغيّر الإشارات التي يقرؤها.',
    details: [
      {
        heading: 'linkedSignal وresource — الجيل الأحدث (v19)',
        body: 'linkedSignal ينشئ إشارة قابلة للكتابة تُعاد تهيئتها تلقائياً عند تغيّر مصدر تعتمد عليه — مثالي لاختيار محلي يُصفَّر عند تغيّر القائمة. وresource (وrxResource) واجهة لجلب البيانات غير المتزامن بإشارات: تعطيها request وloader وتحصل على value وisLoading وerror كإشارات جاهزة — اتجاه Angular المستقبلي لاستبدال أنماط الجلب اليدوية.',
      },
      {
        heading: 'دقائق effect: التنظيف وuntracked',
        body: 'دالة effect تستقبل onCleanup لتسجيل تنظيف يُنفَّذ قبل كل إعادة تشغيل وعند التدمير (مؤقتات مثلاً). وuntracked(() => sig()) يقرأ إشارة دون جعلها تبعية للتتبع. القاعدة المهمة: لا تستخدم effect لمزامنة حالة بحالة (استخدم computed أو linkedSignal) — خصصه للآثار الخارجية فقط: تخزين، تسجيل، تكاملات DOM.',
      },
      {
        heading: 'خيارات متقدمة وأخطاء شائعة',
        body: 'يمكن تمرير دالة مقارنة مخصصة { equal } لمنع إشعارات لا داعي لها عند تساوي القيم منطقياً. مع الكائنات والمصفوفات أنشئ مرجعاً جديداً عند التعديل (spread) لأن المقارنة الافتراضية بالمرجع. وasReadonly() يكشف الإشارة للخارج دون سماح بالكتابة — النمط المعياري في الخدمات.',
      },
    ],
  },
  'rxjs-observables': {
    summary:
      'الـ Observable تيار من القيم يصل عبر الزمن، وهو أساس HTTP والأحداث. لا يحدث شيء حتى تشترك، والأفضل استخدام async pipe لأنه يلغي الاشتراك تلقائياً. تُحوَّل التيارات داخل pipe() بمعاملات مثل map وfilter وdebounceTime وswitchMap. القاعدة: signals للحالة المتزامنة، وObservables للتدفقات غير المتزامنة.',
    details: [
      {
        heading: 'عائلة الـ Subjects',
        body: 'الـ Subject تيار تدفع إليه القيم يدوياً بـ next() ويستمع له عدة مشتركين. BehaviorSubject يحتفظ بقيمة حالية ويعطيها فوراً لأي مشترك جديد (كان النمط الأساسي لإدارة الحالة قبل signals)، وReplaySubject يعيد آخر N قيمة. ما زالت تستخدم كثيراً كجسور للأحداث بين أجزاء التطبيق.',
      },
      {
        heading: 'إدارة الاشتراكات ومنع التسريبات',
        body: 'كل subscribe يدوي يحتاج إلغاء عند تدمير المكوّن وإلا تسرّبت الذاكرة. الحل الحديث: takeUntilDestroyed() من rxjs-interop يلغي تلقائياً عند التدمير، أو DestroyRef مع onDestroy. والأفضل أصلاً تقليل subscribe اليدوي: async pipe في القوالب وtoSignal في الكلاسات يديران الاشتراك عنك بالكامل.',
      },
      {
        heading: 'معاملات تجميع وأخطاء يجب معرفتها',
        body: 'combineLatest يجمع آخر قيمة من عدة تيارات (فلاتر بحث متعددة)، وforkJoin ينتظر اكتمال الجميع ويعطي النتائج دفعة واحدة (عدة طلبات HTTP متوازية)، وmerge يدمج التدفقات كما تصل. وللأخطاء: catchError يعيد تياراً بديلاً، وretry يعيد المحاولة، وfinalize ينفّذ عند الانتهاء بأي شكل (إخفاء مؤشر التحميل).',
      },
    ],
  },
  'http-client': {
    summary:
      'فعّل HTTP بـ provideHttpClient() في app.config.ts ثم احقن HttpClient. الدالة http.get<User[]>(url) تعيد Observable منمّط النوع، ولا يُرسل الطلب إلا عند الاشتراك. الممارسة الصحيحة: ضع نداءات HTTP داخل service، وعالج الأخطاء بـ catchError.',
    details: [
      {
        heading: 'interceptors — نقطة المرور المركزية',
        body: 'الـ interceptor دالة تمر بها كل الطلبات والاستجابات: تضيف ترويسة Authorization بالتوكن، وتسجّل الأخطاء، وتعيد التوجيه عند 401 — في مكان واحد بدل تكراره في كل خدمة. تسجَّل عبر provideHttpClient(withInterceptors([authInterceptor]))، والدالة تستقبل req وnext وتستطيع استنساخ الطلب وتعديله لأن الطلبات immutable.',
      },
      {
        heading: 'خيارات الطلب التي ستحتاجها',
        body: 'تمرير params كائناً يبني الـ query string بأمان، وheaders للترويسات، وobserve: \'response\' يعطيك الاستجابة كاملة بالحالة والترويسات بدل الجسم فقط، وresponseType: \'blob\' للملفات، وreportProgress لتتبع تقدم الرفع. كلها معاملات اختيارية في نفس دوال get/post.',
      },
      {
        heading: 'الجلب بالإشارات — الاتجاه الحديث',
        body: 'toSignal(obs$, { initialValue: [] }) يحوّل طلب HTTP إلى إشارة جاهزة للقوالب دون subscribe ولا async pipe. وفي الإصدارات الأحدث ظهرت httpResource التجريبية: تعطيها دالة ترجع الـ URL (المبني من إشارات) فتعيد الجلب تلقائياً كلما تغيّرت، مع isLoading وerror جاهزتين. ولمشاريع أكبر، مكتبة TanStack Query توفر كاشاً وإعادة محاولة جاهزة.',
      },
    ],
  },
  forms: {
    summary:
      'نظامان للنماذج: القالبية بـ ngModel وتناسب البسيط، والتفاعلية (reactive) حيث يُبنى النموذج في الكلاس بـ FormGroup وFormControl وهي المفضلة. الربط بـ [formGroup] وformControlName، والمدققات مثل Validators.required، والحالة من form.valid وform.value.',
    details: [
      {
        heading: 'النماذج المنمّطة (typed forms)',
        body: 'منذ الإصدار 14 النماذج التفاعلية منمّطة بالكامل: fb.group({ email: [\'\'] }) يجعل form.value.email من نوع string | undefined تلقائياً، ويمنعك المترجم من قراءة حقل غير موجود. fb.nonNullable.group يجعل القيم لا تقبل null عند reset. هذا يكشف أخطاء النماذج وقت الترجمة بدل وقت التشغيل.',
      },
      {
        heading: 'مدققات مخصصة وغير متزامنة',
        body: 'المدقق المخصص دالة ValidatorFn تستقبل الـ control وتعيد null عند الصحة أو كائن خطأ مثل { weakPassword: true }، وتمررها مع المدققات الجاهزة. والمدقق غير المتزامن AsyncValidatorFn يعيد Observable — مثاله الكلاسيكي: التحقق من توفر اسم المستخدم عبر الخادم، وتظهر حالته في control.pending.',
      },
      {
        heading: 'FormArray والنماذج الديناميكية',
        body: 'FormArray قائمة controls تنمو وتتقلص وقت التشغيل — أساس "أضف هاتفاً آخر" بأزرار push وremoveAt. وvalueChanges على أي control أو group هو Observable يتيح حفظاً تلقائياً أو حقولاً تعتمد على بعضها (مع debounceTime). وللاطلاع: مكتبات مثل Formly تولّد نماذج كاملة من JSON.',
      },
    ],
  },

  // ============================ المستوى 4 ============================
  routing: {
    summary:
      'التوجيه يربط مسار الـ URL بمكوّن: تعرّف routes وتسجّلها بـ provideRouter، ويُعرض المطابق داخل <router-outlet>. المسارات تقبل معاملات مثل skills/:id تُقرأ عبر ActivatedRoute، وloadComponent يحمّل الميزة كسولاً عند زيارتها، ومسار ** الشامل يجب أن يكون أخيراً.',
    details: [
      {
        heading: 'حراسة المسارات وجلب بياناتها مسبقاً',
        body: 'الحراس الحديثون دوال: canActivate تمنع الدخول (تحقق تسجيل الدخول وتعيد التوجيه)، وcanDeactivate تمنع الخروج (تغييرات غير محفوظة)، وcanMatch تقرر أصلاً هل يُطابق المسار. وresolve يجلب البيانات قبل عرض المكوّن فلا تظهر صفحة فارغة تنتظر. كلها دوال تستخدم inject() بداخلها.',
      },
      {
        heading: 'withComponentInputBinding — معاملات أنظف',
        body: 'بإضافة withComponentInputBinding() إلى provideRouter يربط الراوتر معاملات المسار وquery params مباشرة بمدخلات المكوّن: id = input<string>() يستقبل :id تلقائياً دون ActivatedRoute إطلاقاً — كود أقل وأسهل اختباراً، وهو النمط المفضل في المشاريع الجديدة.',
      },
      {
        heading: 'مسارات متداخلة وتحميل ميزات كاملة',
        body: 'خاصية children تنشئ تسلسلاً هرمياً يُعرض في router-outlet داخلي (تخطيط مشترك بعنوان وقائمة جانبية مثلاً)، وloadChildren: () => import(\'./admin/admin.routes\') يحمّل ملف مسارات كاملاً لميزة بأكملها كسولاً. أضف إليها withPreloading(PreloadAllModules) لتحميل البقية بهدوء في الخلفية بعد الإقلاع.',
      },
    ],
  },
  'standalone-vs-modules': {
    summary:
      'قديماً كانت المكوّنات تُجمَّع داخل @NgModule بمصفوفات declarations وimports وexports. حديثاً المكوّن المستقل standalone: true يصرّح بما يحتاجه مباشرة دون أي module. عليك قراءة الصيغتين لأن المشاريع القديمة ما زالت تستخدم NgModules والصيغتان تتعايشان.',
    details: [
      {
        heading: 'الهجرة الآلية من modules إلى standalone',
        body: 'الأمر ng generate @angular/core:standalone يحوّل مشروعاً قديماً على ثلاث مراحل: تحويل المكوّنات، ثم إزالة الـ modules الفارغة، ثم تحويل الإقلاع إلى bootstrapApplication. ولاحظ أنه منذ الإصدار 19 أصبح standalone: true هو الافتراضي حتى دون كتابته — والعكس يتطلب standalone: false صراحة.',
      },
      {
        heading: 'متى ستظل ترى NgModules',
        body: 'في الشيفرات القديمة الكبيرة غير المهاجرة، وفي مكتبات لم تتحدث بعد. سترى أيضاً نمط SCAM التاريخي (module لكل مكوّن) الذي كان جسراً نحو standalone. الجيد أن التعايش سلس: مكوّن standalone يستورد module قديماً في imports، وmodule قديم يستورد مكوّناً standalone.',
      },
      {
        heading: 'مقارنة الإقلاع القديم والجديد',
        body: 'القديم: platformBrowserDynamic().bootstrapModule(AppModule) مع AppModule يحمل bootstrap: [AppComponent] وكل الإعدادات في imports. الجديد: bootstrapApplication(AppComponent, { providers: [...] }) وكل ميزة تقدَّم عبر دوال provide* مثل provideRouter وprovideHttpClient — ستميّز عمر أي مشروع من أول نظرة على main.ts.',
      },
    ],
  },
  'file-organization': {
    summary:
      'التطبيقات الصغيرة تُنظَّم حسب النوع، والكبيرة حسب الميزة (feature): كل ميزة في مجلد يضم مكوّناتها وخدماتها ونماذجها. الهيكل الشائع: core/ وshared/ وfeatures/. التسمية بنمط name.role.ts مثل user.service.ts فيُعرف دور الملف من اسمه.',
    details: [
      {
        heading: 'barrel files — التجميع وحدوده',
        body: 'ملف index.ts داخل مجلد يعيد تصدير محتوياته فيصبح الاستيراد from \'./shared\' بدل مسارات طويلة. أنيق، لكن انتبه: الـ barrels الكبيرة قد تنشئ دوائر استيراد وتربك tree-shaking فتكبر الحزمة. القاعدة العملية: barrel صغير لكل ميزة مقبول، وbarrel ضخم يلم التطبيق كله فكرة سيئة.',
      },
      {
        heading: 'Nx وworkspaces للفرق الكبيرة',
        body: 'عندما يكبر المشروع لعدة تطبيقات وفرق، أداة Nx تنظّم monorepo بمجلدي apps/ وlibs/ حيث تُقسم كل ميزة إلى مكتبات بأدوار واضحة (feature/ui/data-access/util)، مع كاش بناء ذكي يبني المتأثر فقط، وقواعد حدود تمنع استيراداً عشوائياً بين الفرق. وAngular CLI نفسه يدعم عدة مشاريع في workspace واحد عبر ng generate application.',
      },
      {
        heading: 'فرض الحدود آلياً',
        body: 'الاتفاق على الهيكل لا يكفي — تفرضه الأدوات: ESLint بقاعدة no-restricted-imports (أو قواعد @nx/enforce-module-boundaries) يمنع مثلاً استيراد ميزة من ميزة أخرى مباشرة أو وصول shared إلى features. أضف إليها قاعدة بسيطة: العمق ثلاثة مجلدات كحد أقصى، وما زاد فهو إشارة لتقسيم الميزة.',
      },
    ],
  },
  'state-management': {
    summary:
      'الحالة هي البيانات التي يتذكرها تطبيقك. الخيار الأول: service يملك الحالة بـ signals، يكشفها للقراءة فقط، ويغيّرها عبر دوال واضحة. عند التعقيد الكبير توجد NgRx بنمط Redux أو NgRx SignalStore الأخف. ابدأ بسيطاً ولا تضف بنية إلا عند الحاجة.',
    details: [
      {
        heading: 'NgRx SignalStore عن قرب',
        body: 'هو الجيل الإشاري من NgRx: signalStore(withState({...}), withComputed(...), withMethods(...)) يبني متجراً كاملاً بدوال مباشرة بدل actions/reducers/selectors التقليدية، مع إضافات جاهزة مثل withEntities لإدارة القوائم وrxMethod لربط تدفقات RxJS. يعطيك بنية NgRx المنظمة بربع الشيفرة تقريباً، وهو الخيار الأنسب اليوم عند الحاجة لمكتبة.',
      },
      {
        heading: 'متى تنتقل فعلاً من service إلى مكتبة',
        body: 'مؤشرات الانتقال: نفس الحالة تُعدَّل من أماكن متعددة ويصعب تتبع من غيّر ماذا، أو تحتاج سجل تغييرات وأدوات تصحيح زمنية (Redux DevTools تريك كل حدث)، أو فريق كبير يحتاج نمطاً مفروضاً موحداً. أما "التطبيق كبر" وحدها فليست مبرراً — خدمات signals منظمة تتحمل تطبيقات كبيرة جداً.',
      },
      {
        heading: 'حالة الخادم ليست حالة الواجهة',
        body: 'فرّق بين client state (تبويب مفتوح، فلتر محدد — ملك تطبيقك) وserver state (بيانات الـ API — نسخة قد تتقادم). الثانية لها همومها: كاش وإعادة جلب وإبطال — وهنا تتألق TanStack Query وhttpResource بدل تكديسها في متجر عام. كثير من التطبيقات تحتاج فقط: server state بأداة جلب ذكية + client state بسيط بالـ signals.',
      },
    ],
  },

  // ============================ المستوى 5 ============================
  'change-detection': {
    summary:
      'اكتشاف التغييرات هو مزامنة الـ DOM مع بياناتك بعد كل حدث. استراتيجية OnPush تجعل المكوّن يُفحص فقط عند تغيّر مدخلاته أو وقوع حدث داخله. الـ signals أدق: يحدَّث المتأثر فقط. عملياً: استخدم track في @for، وحمّل كسولاً، وقِس قبل أن تحسّن.',
    details: [
      {
        heading: 'zoneless — مستقبل Angular الفعلي',
        body: 'تقليدياً تحتاط Zone.js بترقيع كل الـ APIs غير المتزامنة لتعرف متى تفحص. مع الإشارات لم تعد ضرورية: provideZonelessChangeDetection() (استقرت في v20 بعد تجريبها في 18) يزيل zone.js كلياً فيصغر الحجم ويبسّط التتبع، بشرط أن تكون التفاعلية كلها signals/AsyncPipe وليست تعديلات خفية يلتقطها الـ zone.',
      },
      {
        heading: 'كيف تقيس قبل أن تحسّن',
        body: 'إضافة Angular DevTools للمتصفح فيها Profiler يسجّل دورات الفحص ويريك أبطأ المكوّنات وسبب كل دورة. أضف إليها تبويب Performance في أدوات المتصفح للصورة الكاملة. القاعدة الذهبية: لا تحسّن استناداً إلى حدس — كثير من "التحسينات" المسبقة تعقّد الكود لمشكلة غير موجودة.',
      },
      {
        heading: 'خطأ كلاسيكي ستقابله',
        body: 'الخطأ ExpressionChangedAfterItHasBeenCheckedError يظهر في وضع التطوير عندما تتغير قيمة بعد فحصها في نفس الدورة — عادة بسبب تعديل حالة داخل ngAfterViewInit أو أثر جانبي في getter يستدعيه القالب. الحلول الصحيحة: انقل التعديل لمكان أصح أو اجعل القيمة computed، ولا تعتبر setTimeout حلاً بل مسكّناً يخفي تصميماً معطوباً.',
      },
    ],
  },
  testing: {
    summary:
      'ثلاثة مستويات: اختبارات الوحدة لكلاس معزول، واختبارات المكوّن بـ TestBed، واختبارات e2e تقود التطبيق في متصفح حقيقي. الأمر ng test يشغّلها، وJasmine توفر describe وit وexpect، وحقن الاعتماديات يسمح بتمرير mocks فتصبح الاختبارات سريعة وحتمية.',
    details: [
      {
        heading: 'مشهد الأدوات يتغير',
        body: 'Karma (المشغّل التاريخي) أصبح مهجوراً رسمياً، والبدائل: Jest الأوسع انتشاراً في عالم JS، وVitest السريع الذي أصبح المشغّل التجريبي الرسمي في Angular 20 عبر ng test، وWeb Test Runner للتشغيل في متصفح حقيقي. وفي الـ e2e: Cypress وPlaywright هما المعياران بعد تقاعد Protractor.',
      },
      {
        heading: 'مكتبات ترفع جودة اختباراتك',
        body: 'Angular Testing Library تشجعك على الاختبار كما يستخدم المستخدم التطبيق (ابحث عن زر بنصه لا بكلاسه الداخلي) فتصمد الاختبارات أمام إعادة الهيكلة. وSpectator تختصر صيغة TestBed المطوّلة. وcomponent harnesses الرسمية لـ Material تتعامل مع مكوّناتها بواجهة ثابتة مهما تغيّر الـ DOM الداخلي بين الإصدارات.',
      },
      {
        heading: 'التغطية والتشغيل المستمر',
        body: 'ng test --code-coverage يولّد تقريراً في coverage/ يبيّن الأسطر غير المختبرة، وتستطيع فرض حد أدنى في الإعدادات. اربط الاختبارات بـ GitHub Actions لتعمل مع كل push قبل النشر — ملف workflow بسيط: npm ci ثم npm test ثم npm run build، فلا يصل إلى Vercel إلا ما نجح.',
      },
    ],
  },
  'library-ecosystem': {
    summary:
      'الكثير مدمج في Angular: Router وHttpClient وForms وDI — تعلّمها قبل أي مكتبة. لواجهة المستخدم: Angular Material مع CDK، وبدائل مثل PrimeNG وNg-Zorro وTailwind. للحالة: NgRx وSignalStore، وللرسوم ngx-charts أو Chart.js. الأمر ng add يثبّت ويهيئ تلقائياً.',
    details: [
      {
        heading: 'كيف تقيّم مكتبة قبل اعتمادها',
        body: 'تحقق من: توافقها مع إصدار Angular عندك (peerDependencies في صفحتها على npm)، وتاريخ آخر إصدار ونشاط المستودع، وعدد التنزيلات الأسبوعية كمؤشر مجتمع، وحجمها على bundlephobia.com، وجودة التوثيق. مكتبة مهجورة تعني ألماً مع كل ترقية Angular قادمة — أحياناً كتابة 50 سطراً بنفسك أوفر من تبعية ميتة.',
      },
      {
        heading: 'عدة التطوير اليومية',
        body: 'ESLint مع angular-eslint لفرض قواعد الجودة (تضاف بـ ng add @angular-eslint/schematics)، وPrettier للتنسيق الموحد، وAngular DevTools في المتصفح لفحص شجرة المكوّنات والإشارات والأداء، وAngular Language Service في VS Code لإكمال وأخطاء داخل القوالب نفسها، وStorybook لتطوير مكوّنات الواجهة وعرضها معزولة.',
      },
      {
        heading: 'مكتبات شائعة حسب الحاجة',
        body: 'التدويل: @angular/localize الرسمية أو Transloco لتبديل اللغة وقت التشغيل (مناسبة للعربية). الجداول الكبيرة: AG Grid. الرسوم: ngx-charts المبنية لـ Angular أو ECharts. الأيقونات: Material Icons أو Lucide. السحب والإفلات: CDK DragDrop المدمجة (التي تستخدمها تمارين هذا التطبيق). الأنيميشن: @angular/animations المدمجة ثم GSAP للمتقدم.',
      },
    ],
  },
  'build-and-deploy': {
    summary:
      'الأمر ng build يجمّع التطبيق إلى ملفات ثابتة في dist بعد التصغير وtree-shaking وإضافة بصمات للأسماء. الإعدادات تختلف بين البيئات عبر configurations، ولا تضع أسراراً في الواجهة أبداً. الاستضافة على أي خدمة ملفات ثابتة بشرط SPA fallback يعيد index.html للمسارات غير المعروفة.',
    details: [
      {
        heading: 'CI/CD — النشر المستمر الصحيح',
        body: 'ما فعلته مع Vercel هو CD فعلاً: كل push يبني وينشر تلقائياً. أكمله بـ CI عبر GitHub Actions: ملف .github/workflows/ci.yml يشغّل npm ci والاختبارات والبناء مع كل push وpull request، فيُكتشف الكسر قبل وصوله للإنتاج. وVercel يعطيك تلقائياً preview deployment برابط مستقل لكل فرع — جرّب تغييراً كبيراً بأمان قبل دمجه في main.',
      },
      {
        heading: 'مراقبة حجم الحزمة وتقليصه',
        body: 'budgets في angular.json تحذّرك أو تفشل البناء عند تجاوز حد للحجم — اضبطها بصرامة من البداية. وnpx source-map-explorer dist/**/*.js يرسم خريطة تريك أي مكتبة تأكل الحجم (مفاجآت مثل moment أو lodash كاملاً شائعة). أكبر الانتصارات عادة: تحميل المسارات كسولاً، واستيراد الدوال المنفردة بدل المكتبة كلها، و@defer للمكوّنات الثقيلة.',
      },
      {
        heading: 'خطوات النضج التالية لتطبيقك المنشور',
        body: 'أضف SSR/prerendering بـ ng add @angular/ssr إن احتجت SEO أو سرعة أولى أعلى (يعمل على Vercel مباشرة). وحوّله إلى PWA بـ ng add @angular/pwa ليعمل دون اتصال ويُثبَّت كتطبيق. واربط نطاقاً خاصاً من إعدادات Vercel بدل النطاق الفرعي. ولمراقبة الأخطاء في الإنتاج: خدمة مثل Sentry تلتقط الأعطال من أجهزة المستخدمين الحقيقيين.',
      },
    ],
  },
};
