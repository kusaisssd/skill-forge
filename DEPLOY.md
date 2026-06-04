# دليل النشر — GitHub ثم Vercel

اتبع الخطوات بالترتيب. كل الأوامر تُنفَّذ من داخل مجلد المشروع `skill-forge`.

---

## المتطلبات (مرة واحدة)

1. **Git** مثبّت على جهازك — تحقق بالأمر `git --version`.
   إن لم يكن مثبتاً حمّله من <https://git-scm.com/download/win>.
2. حساب على **GitHub** — <https://github.com/signup>.
3. حساب على **Vercel** — <https://vercel.com/signup> (سجّل الدخول بحساب GitHub نفسه، هذا يسهّل الربط).

---

## الخطوة 1 — تهيئة Git محلياً

افتح Terminal (أو PowerShell) داخل مجلد `skill-forge` ونفّذ:

```bash
git init
git add .
git commit -m "Initial commit: SkillForge learning app"
```

> ملف `.gitignore` موجود مسبقاً ويستثني `node_modules/` و`dist/` و`.angular/` —
> لذلك لن يُرفع شيء ثقيل أو غير ضروري.

---

## الخطوة 2 — إنشاء مستودع على GitHub ورفع الكود

1. افتح <https://github.com/new>.
2. اسم المستودع: `skill-forge` (أو أي اسم تريده).
3. اتركه **Public** أو اجعله **Private** — كلاهما يعمل مع Vercel.
4. **لا** تضف README أو .gitignore من GitHub (موجودان عندك أصلاً).
5. اضغط **Create repository**، ثم انسخ الأوامر التي يعرضها لك تحت
   "push an existing repository"، وهي بهذا الشكل:

```bash
git remote add origin https://github.com/USERNAME/skill-forge.git
git branch -M main
git push -u origin main
```

(استبدل `USERNAME` باسم حسابك. عند أول push سيطلب منك Git تسجيل الدخول إلى GitHub.)

---

## الخطوة 3 — النشر على Vercel

1. افتح <https://vercel.com/new>.
2. اضغط **Import** بجانب مستودع `skill-forge`
   (إن لم يظهر، اضغط "Adjust GitHub App Permissions" وامنح Vercel الوصول للمستودع).
3. سيكتشف Vercel أنه مشروع **Angular** تلقائياً، وسيقرأ ملف `vercel.json`
   الموجود في المشروع، والذي يضبط:
   - أمر البناء: `ng build`
   - مجلد الإخراج: `dist/skill-forge/browser`
   - قاعدة SPA fallback: أي مسار بدون امتداد ملف يُعاد إلى `index.html`
     (ضرورية كي تعمل روابط الدروس عند التحديث المباشر للصفحة).
4. لا تحتاج لأي Environment Variables.
5. اضغط **Deploy** وانتظر دقيقة أو اثنتين.
6. ستحصل على رابط مثل `https://skill-forge-xxxx.vercel.app` — هذا تطبيقك منشوراً.

---

## التحديثات لاحقاً

كل ما تحتاجه بعد أي تعديل:

```bash
git add .
git commit -m "وصف التعديل"
git push
```

Vercel يعيد البناء والنشر **تلقائياً** مع كل push إلى فرع `main`.

---

## مشاكل شائعة وحلولها

| المشكلة | الحل |
|---------|------|
| صفحة 404 عند تحديث رابط درس | تأكد أن `vercel.json` مرفوع مع المشروع (يحتوي قاعدة rewrites) |
| فشل البناء على Vercel | جرّب `npm run build` محلياً أولاً؛ إن نجح محلياً تحقق من سجل البناء في Vercel |
| Git يرفض الـ push | تأكد من تسجيل الدخول، أو استخدم GitHub Desktop كبديل مرئي |
| تغيّر اسم المشروع في angular.json | حدّث `outputDirectory` في vercel.json ليطابقه |
