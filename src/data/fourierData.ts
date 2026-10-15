import { SolvedProblem, QuizQuestion, FormulaItem } from "../types";

export const FOURIER_PROBLEMS: SolvedProblem[] = [
  {
    id: "four-prob-1",
    chapterId: "fourier",
    subTopic: "fourier-series",
    subTopicLabel: "سری فوریه مثلثاتی",
    title: "محاسبه سری فوریه تابع پله‌ای فرد و تساوی گرگوری-لایبنیتس",
    difficulty: "easy",
    source: "کتاب ریاضیات مهندسی دکتر عبدالله شیدفر - فصل اول (مسائل برگزیده)",
    sourceCategory: "textbook",
    statement: "سری فوریه تابع متناوب با دوره تناوب $T = 2\\pi$ را بیابید که در یک دوره به‌صورت زیر تعریف شده است:\n$$f(x) = \\begin{cases} -1 & -\\pi < x < 0 \\\\ +1 & 0 < x < \\pi \\end{cases}$$\nسپس با استفاده از همگرایی سری در نقطه $x = \\frac{\\pi}{2}$، مجموع سری عددی $1 - \\frac{1}{3} + \\frac{1}{5} - \\frac{1}{7} + \\dots$ را به دست آورید.",
    hint: "توجه کنید که تابع داده‌شده یک تابع فرد در بازه $[-\\pi, \\pi]$ است. بنابراین ضرایب کسینوسی $a_0$ و $a_n$ بدون محاسبه برابر صفرند.",
    examTrap: "اشتباه رایج در مخرج ضرایب فوریه و تقسیم بر دوره تناوب $T$ به جای نیم‌پریود $L=\\pi$ است. همچنین در محاسبه $\\cos(n\\pi)$ باید دقت شود که $(-1)^n$ است و برای $n$ زوج و فرد رفتار متفاوتی دارد.",
    steps: [
      {
        title: "بررسی تقارن تابع و تعیین ضرایب صفر",
        text: "چون $f(-x) = -f(x)$، تابع فرد است. در نتیجه انتگرال حاصل‌ضرب تابع فرد در توابع زوج برابر صفر می‌شود:",
        math: ["a_0 = 0", "a_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\cos(nx) dx = 0"]
      },
      {
        title: "محاسبه ضریب سینوسی bn",
        text: "با بهره‌گیری از خاصیت تقارن توابع فرد در انتگرال‌گیری:",
        math: [
          "b_n = \\frac{2}{\\pi} \\int_0^{\\pi} (1) \\sin(nx) dx = \\frac{2}{\\pi} \\left[ -\\frac{\\cos(nx)}{n} \\right]_0^\\pi",
          "b_n = \\frac{2}{n\\pi} (1 - \\cos(n\\pi)) = \\frac{2}{n\\pi} (1 - (-1)^n)"
        ],
        note: "اگر n زوج باشد (n=2k)، آنگاه bn=0. اگر n فرد باشد (n=2k+1)، آنگاه bn = 4 / ((2k+1)π)."
      },
      {
        title: "تشکیل سری فوریه نهایی",
        text: "با جایگذاری ضرایب فرد در رابطه کلی سری فوریه:",
        math: [
          "f(x) \\sim \\sum_{k=0}^{\\infty} \\frac{4}{(2k+1)\\pi} \\sin((2k+1)x) = \\frac{4}{\\pi} \\left( \\sin(x) + \\frac{\\sin(3x)}{3} + \\frac{\\sin(5x)}{5} + \\dots \\right)"
        ]
      },
      {
        title: "محاسبه مجموع سری لایبنیتس در x = π/2",
        text: "در نقطه $x = \\pi/2$ تابع پیوسته است و مقدار آن $f(\\pi/2) = 1$ می‌باشد. چون $\\sin((2k+1)\\frac{\\pi}{2}) = (-1)^k$:",
        math: [
          "1 = \\frac{4}{\\pi} \\sum_{k=0}^{\\infty} \\frac{(-1)^k}{2k+1} \\implies \\sum_{k=0}^{\\infty} \\frac{(-1)^k}{2k+1} = 1 - \\frac{1}{3} + \\frac{1}{5} - \\dots = \\frac{\\pi}{4}"
        ]
      }
    ],
    finalAnswer: [
      "f(x) = \\frac{4}{\\pi} \\sum_{k=0}^{\\infty} \\frac{\\sin((2k+1)x)}{2k+1}",
      "\\sum_{k=0}^{\\infty} \\frac{(-1)^k}{2k+1} = \\frac{\\pi}{4}"
    ],
    keyTakeaway: "تقارن فرد یا زوج تابع در بازه‌های متقارن نیمی از محاسبات انتگرال را حذف می‌کند. از همگرایی نقطه به نقطه دیریکله در نقاط پیوستگی می‌توان برای محاسبه مجموع سری‌های نامتناهی بهره برد."
  },
  {
    id: "four-prob-2",
    chapterId: "fourier",
    subTopic: "half-range",
    subTopicLabel: "بسط‌های نیم‌دامنه (فرد و زوج)",
    title: "بسط نیم‌دامنه کسینوسی تابع خطی f(x) = x در بازه [0, π]",
    difficulty: "easy",
    source: "میان‌ترم ریاضی مهندسی دانشگاه تهران - دانشکده فنی (پاییز ۱۳۹۹)",
    sourceCategory: "university_exam",
    statement: "بسط نیم‌دامنه کسینوسی (Half-range Cosine Expansion) تابع $f(x) = x$ را در بازه $0 < x < \\pi$ به دست آورید.",
    hint: "در بسط نیم‌دامنه کسینوسی، تابع را به‌صورت زوج در بازه $[-\\pi, 0]$ گسترش می‌دهیم، بنابراین فقط ضرایب $a_0$ و $a_n$ محاسبه می‌شوند و تمام $b_n = 0$ هستند.",
    examTrap: "فراموش کردن ضریب ۲ در فرمول نیم‌دامنه $a_n = \\frac{2}{L}\\int_0^L f(x)\\cos(\\frac{n\\pi x}{L})dx$ و همچنین اشتباه در علامت انتگرال جزء به جزء.",
    steps: [
      {
        title: "محاسبه ضریب میانگین a0",
        text: "طول بازه $L = \\pi$ است. ضریب ثابت میانگین به‌صورت زیر محاسبه می‌شود:",
        math: [
          "a_0 = \\frac{2}{\\pi} \\int_0^\\pi x dx = \\frac{2}{\\pi} \\left[ \\frac{x^2}{2} \\right]_0^\\pi = \\frac{2}{\\pi} \\cdot \\frac{\\pi^2}{2} = \\pi"
        ],
        note: "جمله ثابت سری فوریه برابر a0 / 2 = π / 2 خواهد بود."
      },
      {
        title: "محاسبه ضریب an با روش جزء به جزء",
        text: "با استفاده از انتگرال جزءبه‌جزء با فرض $u=x$ و $dv=\\cos(nx)dx$:",
        math: [
          "a_n = \\frac{2}{\\pi} \\int_0^\\pi x \\cos(nx) dx = \\frac{2}{\\pi} \\left( \\left[ x \\frac{\\sin(nx)}{n} \\right]_0^\\pi - \\int_0^\\pi \\frac{\\sin(nx)}{n} dx \\right)",
          "a_n = \\frac{2}{\\pi} \\left( 0 - \\left[ -\\frac{\\cos(nx)}{n^2} \\right]_0^\\pi \\right) = \\frac{2}{\\pi n^2} (\\cos(n\\pi) - 1) = \\frac{2}{\\pi n^2} ((-1)^n - 1)"
        ],
        note: "اگر n زوج باشد: an = 0. اگر n فرد باشد (n = 2k+1): an = -4 / (π (2k+1)²)."
      },
      {
        title: "نوشتن بسط نیم‌دامنه کسینوسی",
        text: "با قرار دادن ضرایب در ساختار بسط کسینوسی:",
        math: [
          "f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty a_n \\cos(nx) = \\frac{\\pi}{2} - \\frac{4}{\\pi} \\sum_{k=0}^\\infty \\frac{\\cos((2k+1)x)}{(2k+1)^2}"
        ]
      }
    ],
    finalAnswer: [
      "f(x) = \\frac{\\pi}{2} - \\frac{4}{\\pi} \\sum_{k=0}^{\\infty} \\frac{\\cos((2k+1)x)}{(2k+1)^2}"
    ],
    keyTakeaway: "بسط کسینوسی به تابع متقارن زوج منتهی می‌شود که در نقاط انتهایی $x=0$ و $x=\\pi$ پیوسته است؛ بنابراین سرعت همگرایی آن از مرتبه $1/n^2$ است."
  },
  {
    id: "four-prob-3",
    chapterId: "fourier",
    subTopic: "fourier-series",
    subTopicLabel: "سری فوریه مثلثاتی",
    title: "محاسبه مقدار همگرایی دیریکله در نقاط ناپیوستگی تابع پله‌ای",
    difficulty: "easy",
    source: "کتاب ریاضی مهندسی پارسه / دکتر معتقدی - آزمون‌های خودسنجی",
    sourceCategory: "textbook",
    statement: "فرض کنید تابع متناوب با دوره تناوب $T=4$ به‌صورت زیر تعریف شده باشد:\n$$f(x) = \\begin{cases} 0 & -2 < x < 0 \\\\ 3x & 0 < x < 2 \\end{cases}$$\nسری فوریه این تابع در نقاط $x = 0$، $x = 1$ و $x = 2$ به چه مقادیری همگرا می‌شود؟",
    hint: "طبق قضیه دیریکله (Dirichlet Theorem)، سری فوریه در نقطه پیوستگی به $f(x)$ و در نقطه ناپیوستگی جهشی به میانگین حد چپ و راست یعنی $\\frac{f(x^+) + f(x^-)}{2}$ همگرا می‌شود. برای مرزها باید خاصیت تناوبی لحاظ شود.",
    examTrap: "برای نقطه انتهایی $x = 2$، حد راست در خود ضابطه وجود ندارد؛ باید از تناوب استفاده کرد: $f(2^+) = f(-2^+)$.",
    steps: [
      {
        title: "بررسی همگرایی در نقطه x = 0 (نقطه ناپیوستگی داخلی)",
        text: "حد چپ و راست تابع در صفر را محاسبه می‌کنیم:",
        math: [
          "f(0^-) = \\lim_{x \\to 0^-} (0) = 0",
          "f(0^+) = \\lim_{x \\to 0^+} (3x) = 0",
          "S(0) = \\frac{f(0^+) + f(0^-)}{2} = \\frac{0 + 0}{2} = 0"
        ],
        note: "در x=0 حد چپ و راست برابر است؛ بنابراین در این نقطه پیوستگی داریم و مقدار همگرایی 0 است."
      },
      {
        title: "بررسی همگرایی در نقطه x = 1 (نقطه درون بازه پیوسته)",
        text: "نقطه $x=1$ در بازه $(0, 2)$ قرار دارد که تابع در آن تحلیلی و پیوسته است:",
        math: [
          "S(1) = f(1) = 3(1) = 3"
        ]
      },
      {
        title: "بررسی همگرایی در نقطه مرزی x = 2 (ناپیوستگی دوره‌ای)",
        text: "چون دوره تناوب $T=4$ و بازه اصلی $(-2, 2)$ است، حد چپ در ۲ و حد راست با شیفت دوره‌ای به سمت $-2$ تعیین می‌شود:",
        math: [
          "f(2^-) = \\lim_{x \\to 2^-} (3x) = 6",
          "f(2^+) = f(-2^+) = \\lim_{x \\to -2^+} (0) = 0",
          "S(2) = \\frac{f(2^-) + f(-2^+)}{2} = \\frac{6 + 0}{2} = 3"
        ]
      }
    ],
    finalAnswer: [
      "S(0) = 0",
      "S(1) = 3",
      "S(2) = 3"
    ],
    keyTakeaway: "قضیه دیریکله بدون نیاز به محاسبه حتی یک انتگرال، مقدار دقیق همگرایی سری فوریه را در تمامی نقاط مشخص می‌کند."
  },
  {
    id: "four-prob-4",
    chapterId: "fourier",
    subTopic: "half-range",
    subTopicLabel: "بسط‌های نیم‌دامنه (فرد و زوج)",
    title: "بسط نیم‌دامنه سینوسی تابع ثابت f(x) = 1 در بازه [0, L]",
    difficulty: "easy",
    source: "پایان‌ترم ریاضی مهندسی دانشگاه علم و صنعت ایران - دانشکده برق (دی ۱۴۰۰)",
    sourceCategory: "university_exam",
    statement: "بسط نیم‌دامنه سینوسی (Fourier Sine Series) تابع ثابت $f(x) = 1$ را در بازه $0 < x < L$ به دست آورید.",
    hint: "چون بسط سینوسی خواسته شده، تابع به‌صورت فرد تعمیم می‌یابد؛ بنابراین $a_n = 0$ و تنها ضرایب $b_n$ با فرمول نیم‌دامنه محاسبه می‌شوند.",
    examTrap: "اشتباه رایج قرار دادن دوره تناوب به جای نیم‌پریود و اشتباه در علامت انتگرال $\\int \\sin(kx) dx = -\\frac{\\cos(kx)}{k}$.",
    steps: [
      {
        title: "فرمول ضرایب بسط سینوسی نیم‌دامنه",
        text: "برای بسط سینوسی در بازه $[0, L]$، ضریب $b_n$ به‌صورت زیر است:",
        math: [
          "b_n = \\frac{2}{L} \\int_0^L f(x) \\sin\\left(\\frac{n\\pi x}{L}\\right) dx = \\frac{2}{L} \\int_0^L (1) \\sin\\left(\\frac{n\\pi x}{L}\\right) dx"
        ]
      },
      {
        title: "محاسبه انتگرال و ساده‌سازی جمله کسینوسی",
        text: "با انتگرال‌گیری مستقیم از تابع سینوس:",
        math: [
          "b_n = \\frac{2}{L} \\left[ -\\frac{L}{n\\pi} \\cos\\left(\\frac{n\\pi x}{L}\\right) \\right]_0^L = -\\frac{2}{n\\pi} (\\cos(n\\pi) - \\cos(0))",
          "b_n = -\\frac{2}{n\\pi} ((-1)^n - 1) = \\frac{2}{n\\pi} (1 - (-1)^n)"
        ],
        note: "برای n زوج: bn = 0. برای n فرد (n = 2k+1): bn = 4 / ((2k+1)π)."
      },
      {
        title: "نوشتن فرم نهایی سری",
        text: "سری تنها شامل مدهای فرد خواهد بود:",
        math: [
          "f(x) = \\sum_{k=0}^{\\infty} \\frac{4}{(2k+1)\\pi} \\sin\\left(\\frac{(2k+1)\\pi x}{L}\\right)"
        ]
      }
    ],
    finalAnswer: [
      "f(x) = \\frac{4}{\\pi} \\sum_{k=0}^{\\infty} \\frac{1}{2k+1} \\sin\\left(\\frac{(2k+1)\\pi x}{L}\\right)"
    ],
    keyTakeaway: "این بسط پایه و اساس حل معادله هدایت حرارت در میله با دمای اولیه یکنواخت و انتهای صفر درجه است."
  },
  {
    id: "four-prob-5",
    chapterId: "fourier",
    subTopic: "fourier-series",
    subTopicLabel: "سری فوریه مثلثاتی",
    title: "سری فوریه تابع زوج x² در [-π, π] و محاسبه مجموع سری معکوس مربعات",
    difficulty: "medium",
    source: "پایان‌ترم ریاضی مهندسی دانشگاه صنعتی شریف - دانشکده مکانیک (پاییز ۱۴۰۰)",
    sourceCategory: "university_exam",
    statement: "الف) سری فوریه تابع $f(x) = x^2$ را در بازه $-\\pi \\le x \\le \\pi$ با دوره تناوب $T=2\\pi$ به دست آورید.\nب) با بهره‌گیری از مقدار تابع در نقطه مرزی $x = \\pi$، نشان دهید:\n$$\\sum_{n=1}^\\infty \\frac{1}{n^2} = 1 + \\frac{1}{4} + \\frac{1}{9} + \\dots = \\frac{\\pi^2}{6}$$",
    hint: "چون $f(x) = x^2$ تابعی زوج است، $b_n = 0$. برای محاسبه $a_n$ باید دو بار جزءبه‌جزء بگیرید یا از جدول مشتق-انتگرال (روش تکراری) استفاده کنید.",
    examTrap: "اشتباه در علائم مثبت و منفی در جزءبه‌جزء دو مرحله‌ای و فراموش کردن جمله اول $a_0/2$.",
    steps: [
      {
        title: "محاسبه ضریب ثابت a0",
        text: "به دلیل تقارن زوج:",
        math: [
          "a_0 = \\frac{2}{\\pi} \\int_0^\\pi x^2 dx = \\frac{2}{\\pi} \\left[ \\frac{x^3}{3} \\right]_0^\\pi = \\frac{2}{\\pi} \\frac{\\pi^3}{3} = \\frac{2\\pi^2}{3}",
          "\\frac{a_0}{2} = \\frac{\\pi^2}{3}"
        ]
      },
      {
        title: "محاسبه ضریب an با دو بار انتگرال جزء به جزء",
        text: "انتگرال $a_n$ به‌صورت زیر است:",
        math: [
          "a_n = \\frac{2}{\\pi} \\int_0^\\pi x^2 \\cos(nx) dx",
          "\\int x^2 \\cos(nx) dx = x^2 \\frac{\\sin(nx)}{n} - 2x \\left(-\\frac{\\cos(nx)}{n^2}\\right) + 2 \\left(-\\frac{\\sin(nx)}{n^3}\\right)",
          "a_n = \\frac{2}{\\pi} \\left[ \\frac{2x \\cos(nx)}{n^2} \\right]_0^\\pi = \\frac{2}{\\pi} \\left( \\frac{2\\pi \\cos(n\\pi)}{n^2} - 0 \\right) = \\frac{4(-1)^n}{n^2}"
        ]
      },
      {
        title: "تشکیل سری فوریه کامل",
        text: "چون تابع زوج است، $b_n = 0$، بنابراین سری به‌صورت زیر نوشته می‌شود:",
        math: [
          "x^2 = \\frac{\\pi^2}{3} + \\sum_{n=1}^\\infty \\frac{4(-1)^n}{n^2} \\cos(nx) = \\frac{\\pi^2}{3} + 4 \\left( -\\cos(x) + \\frac{\\cos(2x)}{4} - \\frac{\\cos(3x)}{9} + \\dots \\right)"
        ]
      },
      {
        title: "محاسبه مجموع سری بازل (Basel problem) در x = π",
        text: "در نقطه $x = \\pi$ تابع پیوسته است و $f(\\pi) = \\pi^2$. چون $\\cos(n\\pi) = (-1)^n$:",
        math: [
          "\\pi^2 = \\frac{\\pi^2}{3} + 4 \\sum_{n=1}^\\infty \\frac{(-1)^n (-1)^n}{n^2} = \\frac{\\pi^2}{3} + 4 \\sum_{n=1}^\\infty \\frac{1}{n^2}",
          "\\pi^2 - \\frac{\\pi^2}{3} = \\frac{2\\pi^2}{3} = 4 \\sum_{n=1}^\\infty \\frac{1}{n^2} \\implies \\sum_{n=1}^\\infty \\frac{1}{n^2} = \\frac{\\pi^2}{6}"
        ]
      }
    ],
    finalAnswer: [
      "f(x) = \\frac{\\pi^2}{3} + 4 \\sum_{n=1}^{\\infty} \\frac{(-1)^n}{n^2} \\cos(nx)",
      "\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}"
    ],
    keyTakeaway: "سری فوریه ابزاری بنیادین برای حل مسئله تاریخی بازل (Basel problem) است که اویلر با آن به شهرت رسید."
  },
  {
    id: "four-prob-6",
    chapterId: "fourier",
    subTopic: "parseval",
    subTopicLabel: "تساوی پارسوال و مجموع سری‌ها",
    title: "محاسبه مجموع توان چهارم معکوس اعداد طبیعی با تساوی پارسوال",
    difficulty: "medium",
    source: "کنکور کارشناسی ارشد مهندسی مکانیک ۱۳۹۹",
    sourceCategory: "konkur_arshad",
    statement: "با استفاده از تساوی پارسوال برای سری فوریه تابع $f(x) = x^2$ در بازه $[-\\pi, \\pi]$، مجموع سری عددی زیر را محاسبه کنید:\n$$S = \\sum_{n=1}^\\infty \\frac{1}{n^4} = 1 + \\frac{1}{16} + \\frac{1}{81} + \\dots$$",
    hint: "تساوی پارسوال برای بازه $[-\\pi, \\pi]$ رابطه انرژی را برقرار می‌کند: $\\frac{1}{\\pi} \\int_{-\\pi}^\\pi [f(x)]^2 dx = \\frac{a_0^2}{2} + \\sum_{n=1}^\\infty (a_n^2 + b_n^2)$.",
    examTrap: "دقت کنید در رابطه پارسوال ضریب $a_0$ در سمت راست به فرم $\\frac{a_0^2}{2}$ ظاهر می‌شود (اگر تعریف استاندارد $a_0 = \\frac{1}{\\pi}\\int f dx$ باشد). اشتباه در توان ۲ یا ضرایب کسری پاسخ نهایی را مخدوش می‌کند.",
    steps: [
      {
        title: "بازخوانی ضرایب فوریه تابع x²",
        text: "از حل مسئله قبل داریم:",
        math: [
          "a_0 = \\frac{2\\pi^2}{3}",
          "a_n = \\frac{4(-1)^n}{n^2}",
          "b_n = 0"
        ]
      },
      {
        title: "محاسبه انتگرال انرژی سمت چپ تساوی پارسوال",
        text: "انتگرال مجذور تابع روی دوره تناوب:",
        math: [
          "\\frac{1}{\\pi} \\int_{-\\pi}^\\pi (x^2)^2 dx = \\frac{2}{\\pi} \\int_0^\\pi x^4 dx = \\frac{2}{\\pi} \\left[ \\frac{x^5}{5} \\right]_0^\\pi = \\frac{2\\pi^4}{5}"
        ]
      },
      {
        title: "تشکیل سمت راست رابطه پارسوال",
        text: "مجموع مربعات ضرایب فوریه:",
        math: [
          "\\frac{a_0^2}{2} + \\sum_{n=1}^\\infty a_n^2 = \\frac{1}{2} \\left(\\frac{2\\pi^2}{3}\\right)^2 + \\sum_{n=1}^\\infty \\left(\\frac{4(-1)^n}{n^2}\\right)^2",
          "= \\frac{4\\pi^4}{18} + 16 \\sum_{n=1}^\\infty \\frac{1}{n^4} = \\frac{2\\pi^4}{9} + 16 \\sum_{n=1}^\\infty \\frac{1}{n^4}"
        ]
      },
      {
        title: "برابرسازی دو سمت و حل برای مجموع سری",
        text: "با مساوی قرار دادن دو طرف تساوی پارسوال:",
        math: [
          "\\frac{2\\pi^4}{5} = \\frac{2\\pi^4}{9} + 16 \\sum_{n=1}^\\infty \\frac{1}{n^4}",
          "16 \\sum_{n=1}^\\infty \\frac{1}{n^4} = 2\\pi^4 \\left( \\frac{1}{5} - \\frac{1}{9} \\right) = 2\\pi^4 \\left( \\frac{4}{45} \\right) = \\frac{8\\pi^4}{45}",
          "\\sum_{n=1}^\\infty \\frac{1}{n^4} = \\frac{8\\pi^4}{45 \\times 16} = \\frac{\\pi^4}{90}"
        ]
      }
    ],
    finalAnswer: [
      "\\sum_{n=1}^{\\infty} \\frac{1}{n^4} = \\frac{\\pi^4}{90}"
    ],
    keyTakeaway: "تساوی پارسوال بیانگر بقای انرژی سیگنال بین حوزه زمان و حوزه فرکانس است و قدرتمندترین روش برای محاسبه مجموع توان‌های زوج سری‌های عددی محسوب می‌شود."
  },
  {
    id: "four-prob-7",
    chapterId: "fourier",
    subTopic: "complex-fourier",
    subTopicLabel: "فرم مختلط سری فوریه",
    title: "محاسبه ضرایب فرم مختلط سری فوریه برای تابع نمایی e^{ax}",
    difficulty: "medium",
    source: "کتاب ریاضیات مهندسی دکتر عبدالله شیدفر - تمرینات منتخب فصل اول",
    sourceCategory: "textbook",
    statement: "فرم مختلط سری فوریه تابع $f(x) = e^{ax}$ ($a \\ne 0$) را در بازه $-\\pi < x < \\pi$ با دوره تناوب $T=2\\pi$ بیابید.",
    hint: "فرمول ضرایب مختلط به‌صورت $c_n = \\frac{1}{2\\pi} \\int_{-\\pi}^\\pi f(x) e^{-inx} dx$ است. دو پایه نمایی را ترکیب کرده و انتگرال بگیرید: $e^{(a-in)x}$.",
    examTrap: "دقت در علامت منفی در توان فرمول ضریب: $e^{-inx}$. همچنین هنگام جاگذاری در مرزها استفاده از رابطه اویلر $e^{\\pm in\\pi} = (-1)^n$ الزامی است.",
    steps: [
      {
        title: "تعریف انتگرال ضریب مختلط cn",
        text: "با جاگذاری تابع در فرمول استاندارد ضریب مختلط:",
        math: [
          "c_n = \\frac{1}{2\\pi} \\int_{-\\pi}^\\pi e^{ax} e^{-inx} dx = \\frac{1}{2\\pi} \\int_{-\\pi}^\\pi e^{(a - in)x} dx"
        ]
      },
      {
        title: "محاسبه مستقیم انتگرال",
        text: "انتگرال تابع نمایی پایه e:",
        math: [
          "c_n = \\frac{1}{2\\pi (a - in)} \\left[ e^{(a - in)x} \\right]_{-\\pi}^\\pi = \\frac{1}{2\\pi (a - in)} \\left( e^{a\\pi} e^{-in\\pi} - e^{-a\\pi} e^{in\\pi} \\right)"
        ]
      },
      {
        title: "ساده‌سازی با روابط اویلر و ضرب در مزدوج",
        text: "می‌دانیم $e^{in\\pi} = e^{-in\\pi} = (-1)^n$ و $e^{a\\pi} - e^{-a\\pi} = 2\\sinh(a\\pi)$:",
        math: [
          "c_n = \\frac{(-1)^n}{2\\pi (a - in)} (e^{a\\pi} - e^{-a\\pi}) = \\frac{(-1)^n \\sinh(a\\pi)}{\\pi (a - in)}",
          "c_n = \\frac{(-1)^n \\sinh(a\\pi)}{\\pi} \\frac{a + in}{a^2 + n^2}"
        ]
      },
      {
        title: "نوشتن فرم مختلط سری فوریه",
        text: "بسط مختلط تابع به صورت جمع از $-\\infty$ تا $+\\infty$:",
        math: [
          "f(x) = \\frac{\\sinh(a\\pi)}{\\pi} \\sum_{n=-\\infty}^{\\infty} \\frac{(-1)^n (a + in)}{a^2 + n^2} e^{inx}"
        ]
      }
    ],
    finalAnswer: [
      "c_n = \\frac{(-1)^n \\sinh(a\\pi)}{\\pi} \\cdot \\frac{a + in}{a^2 + n^2}",
      "f(x) = \\frac{\\sinh(a\\pi)}{\\pi} \\sum_{n=-\\infty}^{\\infty} \\frac{(-1)^n (a + in)}{a^2 + n^2} e^{inx}"
    ],
    keyTakeaway: "فرم مختلط بسیار فشرده‌تر و در تحلیل سیستم‌های LTI مهندسی برق کاربردی‌تر از فرم مثلثاتی است."
  },
  {
    id: "four-prob-8",
    chapterId: "fourier",
    subTopic: "fourier-integral-transform",
    subTopicLabel: "انتگرال و تبدیل فوریه",
    title: "تبدیل فوریه کسینوسی تابع نمایی نزولی و محاسبه انتگرال لاپلاس",
    difficulty: "medium",
    source: "پایان‌ترم ریاضی مهندسی دانشگاه صنعتی امیرکبیر - پلی‌تکنیک تهران (بهمن ۱۳۹۸)",
    sourceCategory: "university_exam",
    statement: "الف) تبدیل فوریه کسینوسی تابع $f(x) = e^{-ax}$ ($a > 0, x > 0$) را به دست آورید.\nب) با استفاده از فرمول عکس تبدیل فوریه، مقدار انتگرال ناسره زیر را محاسبه کنید:\n$$I = \\int_0^\\infty \\frac{\\cos(\\omega x)}{\\omega^2 + a^2} d\\omega$$",
    hint: "تبدیل کسینوسی به‌صورت $F_c(\\omega) = \\sqrt{\\frac{2}{\\pi}} \\int_0^\\infty f(x) \\cos(\\omega x) dx$ است. فرمول معکوس آن نیز دقیقاً با همین ضریب نوشته می‌شود.",
    examTrap: "فراموش کردن علامت ضریب $a^2$ در مخرج یا در نظر نگرفتن فرض مثبت بودن $a > 0$ که برای همگرایی انتگرال حیاتی است.",
    steps: [
      {
        title: "محاسبه انتگرال تبدیل فوریه کسینوسی",
        text: "با استفاده از انتگرال استاندارد فرمول اویلر برای توابع نمایی و مثلثاتی:",
        math: [
          "\\int_0^\\infty e^{-ax} \\cos(\\omega x) dx = \\frac{a}{a^2 + \\omega^2}",
          "F_c(\\omega) = \\sqrt{\\frac{2}{\\pi}} \\int_0^\\infty e^{-ax} \\cos(\\omega x) dx = \\sqrt{\\frac{2}{\\pi}} \\frac{a}{a^2 + \\omega^2}"
        ]
      },
      {
        title: "اعمال فرمول عکس تبدیل فوریه کسینوسی",
        text: "چون $f(x)$ برای تمام $x > 0$ پیوسته است:",
        math: [
          "f(x) = \\sqrt{\\frac{2}{\\pi}} \\int_0^\\infty F_c(\\omega) \\cos(\\omega x) d\\omega",
          "e^{-ax} = \\sqrt{\\frac{2}{\\pi}} \\int_0^\\infty \\left( \\sqrt{\\frac{2}{\\pi}} \\frac{a}{\\omega^2 + a^2} \\right) \\cos(\\omega x) d\\omega",
          "e^{-ax} = \\frac{2a}{\\pi} \\int_0^\\infty \\frac{\\cos(\\omega x)}{\\omega^2 + a^2} d\\omega"
        ]
      },
      {
        title: "استخراج مقدار انتگرال I",
        text: "با طرفین وسطین ساده:",
        math: [
          "\\int_0^\\infty \\frac{\\cos(\\omega x)}{\\omega^2 + a^2} d\\omega = \\frac{\\pi}{2a} e^{-ax} \\quad (x > 0)"
        ]
      }
    ],
    finalAnswer: [
      "F_c(\\omega) = \\sqrt{\\frac{2}{\\pi}} \\frac{a}{\\omega^2 + a^2}",
      "\\int_0^\\infty \\frac{\\cos(\\omega x)}{\\omega^2 + a^2} d\\omega = \\frac{\\pi}{2a} e^{-ax}"
    ],
    keyTakeaway: "قضیه عکس تبدیل فوریه یکی از زیباترین روش‌ها برای محاسبه انتگرال‌های نامعین حقیقی بدون نیاز به آنالیز مانده‌ها است."
  },
  {
    id: "four-prob-9",
    chapterId: "fourier",
    subTopic: "fourier-integral-transform",
    subTopicLabel: "انتگرال و تبدیل فوریه",
    title: "تبدیل فوریه پالس مستطیلی و محاسبه انتگرال معروف دیریکله",
    difficulty: "medium",
    source: "کتاب ریاضی مهندسی دکتر مسعود آقاسی - جلد اول",
    sourceCategory: "textbook",
    statement: "پالس مستطیلی متقارن زیر مفروض است:\n$$f(x) = \\begin{cases} 1 & |x| < a \\\\ 0 & |x| > a \\end{cases}$$\nالف) تبدیل فوریه استاندارد $F(\\omega) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^\\infty f(x) e^{-i\\omega x} dx$ را به دست آورید.\nب) با اعمال قضیه وارون فوریه در نقطه $x = 0$، مقدار انتگرال دیریکله $\\int_0^\\infty \\frac{\\sin(\\omega a)}{\\omega} d\\omega$ را اثبات کنید.",
    hint: "به دلیل زوج بودن تابع پالس مستطیلی، بخش موهومی تبدیل فوریه ($e^{-i\\omega x} = \\cos(\\omega x) - i\\sin(\\omega x)$) حذف شده و تنها انتگرال کسینوسی باقی می‌ماند.",
    examTrap: "دقت در ضریب نرمال‌سازی تبدیل فوریه (برخی کتاب‌ها $\\frac{1}{2\\pi}$ و برخی $\\frac{1}{\\sqrt{2\\pi}}$ استفاده می‌کنند). در اینجا قرارداد متقارن $\\frac{1}{\\sqrt{2\\pi}}$ استفاده شده است.",
    steps: [
      {
        title: "محاسبه مستقیم تبدیل فوریه",
        text: "تابع خارج از بازه $[-a, a]$ صفر است:",
        math: [
          "F(\\omega) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-a}^a (1) e^{-i\\omega x} dx = \\frac{1}{\\sqrt{2\\pi}} \\left[ \\frac{e^{-i\\omega x}}{-i\\omega} \\right]_{-a}^a",
          "F(\\omega) = \\frac{1}{\\sqrt{2\\pi}} \\frac{e^{-i\\omega a} - e^{i\\omega a}}{-i\\omega} = \\frac{1}{\\sqrt{2\\pi}} \\frac{2\\sin(\\omega a)}{\\omega} = \\sqrt{\\frac{2}{\\pi}} \\frac{\\sin(\\omega a)}{\\omega}"
        ]
      },
      {
        title: "اعمال عکس تبدیل فوریه در نقطه x = 0",
        text: "نقطه $x=0$ در داخل بازه پیوستگی قرار دارد و $f(0) = 1$:",
        math: [
          "f(x) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^\\infty F(\\omega) e^{i\\omega x} d\\omega",
          "1 = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^\\infty \\left( \\sqrt{\\frac{2}{\\pi}} \\frac{\\sin(\\omega a)}{\\omega} \\right) e^{i\\omega(0)} d\\omega",
          "1 = \\frac{1}{\\pi} \\int_{-\\infty}^\\infty \\frac{\\sin(\\omega a)}{\\omega} d\\omega"
        ]
      },
      {
        title: "استفاده از خاصیت زوج بودن تابع زیر انتگرال",
        text: "چون $\\frac{\\sin(\\omega a)}{\\omega}$ تابعی زوج نسبت به $\\omega$ است:",
        math: [
          "\\int_{-\\infty}^\\infty \\frac{\\sin(\\omega a)}{\\omega} d\\omega = 2 \\int_0^\\infty \\frac{\\sin(\\omega a)}{\\omega} d\\omega",
          "1 = \\frac{2}{\\pi} \\int_0^\\infty \\frac{\\sin(\\omega a)}{\\omega} d\\omega \\implies \\int_0^\\infty \\frac{\\sin(\\omega a)}{\\omega} d\\omega = \\frac{\\pi}{2}"
        ]
      }
    ],
    finalAnswer: [
      "F(\\omega) = \\sqrt{\\frac{2}{\\pi}} \\frac{\\sin(\\omega a)}{\\omega}",
      "\\int_0^\\infty \\frac{\\sin(\\omega a)}{\\omega} d\\omega = \\frac{\\pi}{2} \\quad (a > 0)"
    ],
    keyTakeaway: "طیف فرکانسی پالس مستطیلی تابع نمونه‌برداری sinc است و انتگرال دیریکله مستقل از مقدار پهنای پالس $a > 0$ همواره برابر $\\frac{\\pi}{2}$ است."
  },
  {
    id: "four-prob-10",
    chapterId: "fourier",
    subTopic: "fourier-series",
    subTopicLabel: "سری فوریه مثلثاتی",
    title: "سری فوریه تابع یکسوساز تمام‌موج در مهندسی برق",
    difficulty: "medium",
    source: "کنکور کارشناسی ارشد مهندسی برق ۱۴۰۱",
    sourceCategory: "konkur_arshad",
    statement: "سیگنال خروجی یک یکسوساز تمام‌موج ایده‌آل به‌صورت $f(t) = |\\sin(\\omega_0 t)|$ است. با توجه به اینکه دوره تناوب اصلی این تابع $T = \\frac{\\pi}{\\omega_0}$ است، سری فوریه آن را محاسبه کنید.",
    hint: "دوره تناوب تابع نصف دوره تناوب سینوس معمولی است یعنی $T = \\frac{\\pi}{\\omega_0}$، در نتیجه نیم‌پریود $L = \\frac{T}{2} = \\frac{\\pi}{2\\omega_0}$. تابع زوج است بنابراین فقط ضرایب کسینوسی دارد.",
    examTrap: "اشتباه فاحش در نظر گرفتن دوره تناوب برابر $\\frac{2\\pi}{\\omega_0}$ است. قدرمطلق تابع سینوس نیم‌پریودهای منفی را مثبت می‌کند و بسامد اصلی دو برابر می‌شود.",
    steps: [
      {
        title: "تعیین دوره تناوب و ضریب ثابت a0",
        text: "با متغیر $x = \\omega_0 t$، تابع در بازه $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$ زوج است و دوره تناوب آن $\\pi$ است:",
        math: [
          "a_0 = \\frac{2}{\\pi} \\int_0^\\pi \\sin(x) dx = \\frac{2}{\\pi} [-\\cos(x)]_0^\\pi = \\frac{2}{\\pi} (1 - (-1)) = \\frac{4}{\\pi}",
          "\\frac{a_0}{2} = \\frac{2}{\\pi}"
        ]
      },
      {
        title: "محاسبه ضریب an با اتحاد تبدیل ضرب به جمع مثلثاتی",
        text: "فرکانس‌های زاویه‌ای مضارب زوج $2n$ هستند چون دوره تناوب $\\pi$ است:",
        math: [
          "a_n = \\frac{2}{\\pi} \\int_0^\\pi \\sin(x) \\cos(2nx) dx",
          "\\sin(x) \\cos(2nx) = \\frac{1}{2} [\\sin((2n+1)x) - \\sin((2n-1)x)]",
          "a_n = \\frac{1}{\\pi} \\left[ -\\frac{\\cos((2n+1)x)}{2n+1} + \\frac{\\cos((2n-1)x)}{2n-1} \\right]_0^\\pi"
        ]
      },
      {
        title: "جاگذاری حدود انتگرال و محاسبه ضریب an",
        text: "چون $2n+1$ و $2n-1$ هر دو فرد هستند، $\\cos((2n\\pm 1)\\pi) = -1$:",
        math: [
          "a_n = \\frac{1}{\\pi} \\left( \\left(\\frac{1}{2n+1} - \\frac{1}{2n-1}\\right) - \\left(-\\frac{1}{2n+1} + \\frac{1}{2n-1}\\right) \\right)",
          "a_n = \\frac{2}{\\pi} \\left( \\frac{1}{2n+1} - \\frac{1}{2n-1} \\right) = \\frac{2}{\\pi} \\left( \\frac{(2n-1) - (2n+1)}{4n^2 - 1} \\right) = -\\frac{4}{\\pi(4n^2 - 1)}"
        ]
      },
      {
        title: "تشکیل سری فوریه نهایی سیگنال",
        text: "با بازگرداندن متغیر زمانی $t$:",
        math: [
          "|\\sin(\\omega_0 t)| = \\frac{2}{\\pi} - \\frac{4}{\\pi} \\sum_{n=1}^\\infty \\frac{\\cos(2n\\omega_0 t)}{4n^2 - 1}"
        ]
      }
    ],
    finalAnswer: [
      "|\\sin(\\omega_0 t)| = \\frac{2}{\\pi} - \\frac{4}{\\pi} \\sum_{n=1}^{\\infty} \\frac{\\cos(2n\\omega_0 t)}{4n^2 - 1}"
    ],
    keyTakeaway: "یکسوکننده تمام‌موج حاوی مؤلفه DC برابر $\\frac{2}{\\pi} V_m$ و هارمونیک‌های مرتبه زوج فرکانس شبکه است."
  },
  {
    id: "four-prob-11",
    chapterId: "fourier",
    subTopic: "parseval",
    subTopicLabel: "تساوی پارسوال و مجموع سری‌ها",
    title: "محاسبه انتگرال ناسره توان دوم سینوس با قضیه پلانشرل (پارسوال تبدیل فوریه)",
    difficulty: "hard",
    source: "کنکور کارشناسی ارشد مهندسی برق ۱۴۰۰",
    sourceCategory: "konkur_arshad",
    statement: "با استفاده از قضیه پلانشرل (تساوی پارسوال برای تبدیل فوریه) برای پالس مستطیلی $f(x) = \\begin{cases} 1 & |x| < a \\\\ 0 & |x| > a \\end{cases}$، مقدار انتگرال ناسره زیر را محاسبه کنید:\n$$J = \\int_{-\\infty}^\\infty \\frac{\\sin^2(a\\omega)}{\\omega^2} d\\omega$$",
    hint: "تساوی پلانشرل بیان می‌کند که انرژی در حوزه زمان برابر انرژی در حوزه فرکانس است: $\\int_{-\\infty}^\\infty |f(x)|^2 dx = \\int_{-\\infty}^\\infty |F(\\omega)|^2 d\\omega$.",
    examTrap: "دقت در تعریف تبدیل فوریه انتخابی؛ در تعریف متقارن $\\frac{1}{\\sqrt{2\\pi}}$ ضریب اضافی ظاهر نمی‌شود، اما اگر از فرمول بدون جذر استفاده شود، ضریب $2\\pi$ باید موازنه گردد.",
    steps: [
      {
        title: "بازخوانی تبدیل فوریه پالس مستطیلی",
        text: "از تبدیل فوریه استاندارد پالس با پهنای $2a$ داریم:",
        math: [
          "F(\\omega) = \\sqrt{\\frac{2}{\\pi}} \\frac{\\sin(a\\omega)}{\\omega}"
        ]
      },
      {
        title: "محاسبه انتگرال انرژی در حوزه مکان/زمان",
        text: "مربع اندازه تابع $f(x)$ را در کل بازه انتگرال می‌گیریم:",
        math: [
          "\\int_{-\\infty}^\\infty |f(x)|^2 dx = \\int_{-a}^a (1)^2 dx = [x]_{-a}^a = 2a"
        ]
      },
      {
        title: "محاسبه انتگرال انرژی در حوزه فرکانس طبق قضیه پلانشرل",
        text: "مربع اندازه تبدیل فوریه:",
        math: [
          "|F(\\omega)|^2 = \\left(\\sqrt{\\frac{2}{\\pi}} \\frac{\\sin(a\\omega)}{\\omega}\\right)^2 = \\frac{2}{\\pi} \\frac{\\sin^2(a\\omega)}{\\omega^2}",
          "\\int_{-\\infty}^\\infty |F(\\omega)|^2 d\\omega = \\frac{2}{\\pi} \\int_{-\\infty}^\\infty \\frac{\\sin^2(a\\omega)}{\\omega^2} d\\omega"
        ]
      },
      {
        title: "تطبیق دو سمت و استخراج انتگرال J",
        text: "با اعمال تساوی پلانشرل $\\int |f|^2 dx = \\int |F|^2 d\\omega$:",
        math: [
          "2a = \\frac{2}{\\pi} \\int_{-\\infty}^\\infty \\frac{\\sin^2(a\\omega)}{\\omega^2} d\\omega",
          "J = \\int_{-\\infty}^\\infty \\frac{\\sin^2(a\\omega)}{\\omega^2} d\\omega = \\pi a"
        ]
      }
    ],
    finalAnswer: [
      "\\int_{-\\infty}^{\\infty} \\frac{\\sin^2(a\\omega)}{\\omega^2} d\\omega = \\pi a",
      "\\int_0^{\\infty} \\frac{\\sin^2(a\\omega)}{\\omega^2} d\\omega = \\frac{\\pi a}{2}"
    ],
    keyTakeaway: "قضیه پلانشرل یکی از تکنیک‌های کلیدی کنکور ارشد برق برای انتگرال‌هایی با فرم $\\frac{\\sin^2(x)}{x^2}$ است که محاسبه آن با روش‌های کلاسیک انتگرال‌گیری بسیار طولانی است."
  },
  {
    id: "four-prob-12",
    chapterId: "fourier",
    subTopic: "parseval",
    subTopicLabel: "تساوی پارسوال و مجموع سری‌ها",
    title: "بسط فوریه موج مثلثی و محاسبه سری توان چهارم معکوس اعداد فرد",
    difficulty: "hard",
    source: "آزمون جامع کارشناسی دانشگاه صنعتی اصفهان - دانشکده علوم ریاضی",
    sourceCategory: "university_exam",
    statement: "موج مثلثی $f(x) = |x|$ را در بازه $[-L, L]$ با دوره تناوب $2L$ در نظر بگیرید.\nالف) سری فوریه آن را بیابید.\nب) با استفاده از تساوی پارسوال، مجموع سری زیر را محاسبه کنید:\n$$S = \\sum_{k=0}^\\infty \\frac{1}{(2k+1)^4} = 1 + \\frac{1}{3^4} + \\frac{1}{5^4} + \\dots = \\frac{\\pi^4}{96}$$",
    hint: "تابع زوج است، بنابراین $b_n = 0$. پس از محاسبه $a_0$ و $a_n$، رابطه پارسوال $\\frac{1}{L}\\int_{-L}^L f^2 dx = \\frac{a_0^2}{2} + \\sum a_n^2$ را اعمال کنید.",
    examTrap: "دقت در ضرایب فقط برای $n$ فرد ناصفر هستند و ضرایب زوج صفر می‌شوند. جایگذاری $n = 2k+1$ در مجموع پارسوال ضروری است.",
    steps: [
      {
        title: "محاسبه ضرایب فوریه تابع |x|",
        text: "به دلیل تقارن زوج تابع:",
        math: [
          "a_0 = \\frac{2}{L} \\int_0^L x dx = L",
          "a_n = \\frac{2}{L} \\int_0^L x \\cos\\left(\\frac{n\\pi x}{L}\\right) dx = \\frac{2L}{(n\\pi)^2} ((-1)^n - 1)",
          "a_{2k} = 0, \\quad a_{2k+1} = -\\frac{4L}{(2k+1)^2 \\pi^2}"
        ]
      },
      {
        title: "محاسبه انرژی میانگین در تساوی پارسوال",
        text: "انتگرال توان دوم تابع:",
        math: [
          "\\frac{1}{L} \\int_{-L}^L x^2 dx = \\frac{2}{L} \\left[ \\frac{x^3}{3} \\right]_0^L = \\frac{2L^2}{3}"
        ]
      },
      {
        title: "تشکیل رابطه پارسوال با ضرایب",
        text: "سمت راست تساوی پارسوال:",
        math: [
          "\\frac{a_0^2}{2} + \\sum_{k=0}^\\infty a_{2k+1}^2 = \\frac{L^2}{2} + \\sum_{k=0}^\\infty \\left(-\\frac{4L}{(2k+1)^2 \\pi^2}\\right)^2 = \\frac{L^2}{2} + \\frac{16L^2}{\\pi^4} \\sum_{k=0}^\\infty \\frac{1}{(2k+1)^4}"
        ]
      },
      {
        title: "برابرسازی و استخراج مجموع سری",
        text: "با ساده‌سازی عبارت:",
        math: [
          "\\frac{2L^2}{3} - \\frac{L^2}{2} = \\frac{L^2}{6} = \\frac{16L^2}{\\pi^4} \\sum_{k=0}^\\infty \\frac{1}{(2k+1)^4}",
          "\\sum_{k=0}^\\infty \\frac{1}{(2k+1)^4} = \\frac{\\pi^4}{16 \\times 6} = \\frac{\\pi^4}{96}"
        ]
      }
    ],
    finalAnswer: [
      "\\sum_{k=0}^{\\infty} \\frac{1}{(2k+1)^4} = \\frac{\\pi^4}{96}"
    ],
    keyTakeaway: "ترکیب بسط فوریه با تساوی پارسوال راه‌حلی بسیار سریع و دقیق برای سری‌های معکوس توان‌های ۴، ۶ و بالاتر اعداد فرد فراهم می‌کند."
  },
  {
    id: "four-prob-13",
    chapterId: "fourier",
    subTopic: "fourier-integral-transform",
    subTopicLabel: "انتگرال و تبدیل فوریه",
    title: "تبدیل فوریه تابع توزیع نرمال (گاوسی) با تشکیل معادله دیفرانسیل",
    difficulty: "hard",
    source: "کتاب ریاضی مهندسی پیشرفته ارwin کریزیگ - ترجمه فارسی (فصل ۱۱)",
    sourceCategory: "textbook",
    statement: "تبدیل فوریه تابع گاوسی $f(x) = e^{-a x^2}$ ($a > 0$) را با استفاده از مشتق‌گیری در حوزه تبدیل و تشکیل یک معادله دیفرانسیل مرتبه اول بیابید.\n(فرض کنید $\\int_{-\\infty}^\\infty e^{-ax^2} dx = \\sqrt{\\frac{\\pi}{a}}$).",
    hint: "از تبدیل مشتق استفاده کنید: $\\mathcal{F}\\{f'(x)\\} = i\\omega F(\\omega)$. از طرفی $f'(x) = -2ax f(x)$، و تبدیل $\\mathcal{F}\\{x f(x)\\} = i \\frac{dF}{d\\omega}$ است.",
    examTrap: "دقت در علامت منفی در مشتق‌گیری و ضریب توان ۲ در نمایی نهایی: تبدیل گاوسی مجدداً یک تابع گاوسی برحسب $\\omega$ با ضریب معکوس $\\frac{\\omega^2}{4a}$ است.",
    steps: [
      {
        title: "ارتباط مشتق تابع با تبدیل فوریه",
        text: "مشتق تابع گاوسی نسبت به $x$ برابر است با:",
        math: [
          "f'(x) = -2ax e^{-ax^2} = -2ax f(x)"
        ]
      },
      {
        title: "اعمال تبدیل فوریه بر دو طرف رابطه مشتق",
        text: "با استفاده از خواص خطی بودن و تبدیل حاصل‌ضرب در $x$:",
        math: [
          "\\mathcal{F}\\{f'(x)\\} = i\\omega F(\\omega)",
          "\\mathcal{F}\\{-2ax f(x)\\} = -2a \\mathcal{F}\\{x f(x)\\} = -2a \\left(i \\frac{dF}{d\\omega}\\right) = -2ia \\frac{dF}{d\\omega}"
        ]
      },
      {
        title: "تشکیل و حل معادله دیفرانسیل تفکیک‌پذیر",
        text: "دو طرف را برابر قرار می‌دهیم:",
        math: [
          "i\\omega F(\\omega) = -2ia \\frac{dF}{d\\omega} \\implies \\frac{dF}{F} = -\\frac{\\omega}{2a} d\\omega",
          "\\ln|F(\\omega)| = -\\frac{\\omega^2}{4a} + C \\implies F(\\omega) = F(0) e^{-\\frac{\\omega^2}{4a}}"
        ]
      },
      {
        title: "تعیین مقدار اولیه F(0)",
        text: "با جایگذاری $\\omega = 0$ در فرمول تبدیل فوریه متقارن:",
        math: [
          "F(0) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^\\infty e^{-ax^2} dx = \\frac{1}{\\sqrt{2\\pi}} \\sqrt{\\frac{\\pi}{a}} = \\frac{1}{\\sqrt{2a}}",
          "F(\\omega) = \\frac{1}{\\sqrt{2a}} e^{-\\frac{\\omega^2}{4a}}"
        ]
      }
    ],
    finalAnswer: [
      "\\mathcal{F}\\{e^{-ax^2}\\} = \\frac{1}{\\sqrt{2a}} e^{-\\frac{\\omega^2}{4a}}"
    ],
    keyTakeaway: "تابع گاوسی تنها تابعی است که تحت تبدیل فوریه ساختار خود را حفظ می‌کند (خودتبدیل یا eigenfunction) که اساس اصل عدم قطعیت هایزنبرگ در فیزیک کوانتوم و تئوری سیگنال است."
  },
  {
    id: "four-prob-14",
    chapterId: "fourier",
    subTopic: "fourier-integral-transform",
    subTopicLabel: "انتگرال و تبدیل فوریه",
    title: "محاسبه انتگرال ناسره ضرب سینوسی با معکوس تبدیل فوریه سینوسی",
    difficulty: "hard",
    source: "پایان‌ترم ریاضی مهندسی دانشگاه فردوسی مشهد - دی ۱۴۰۱",
    sourceCategory: "university_exam",
    statement: "با استفاده از تبدیل فوریه سینوسی، مقدار انتگرال ناسره زیر را برای $m > 0$ و $a > 0$ به دست آورید:\n$$K = \\int_0^\\infty \\frac{x \\sin(mx)}{x^2 + a^2} dx$$",
    hint: "تبدیل فوریه سینوسی تابع نمایی $f(x) = e^{-ax}$ را محاسبه کنید که برابر $F_s(\\omega) = \\sqrt{\\frac{2}{\\pi}} \\frac{\\omega}{\\omega^2 + a^2}$ است، سپس فرمول معکوس را اعمال کنید.",
    examTrap: "اشتباه در جابجایی متغیرهای $x$ و $\\omega$ در فرمول انتگرال معکوس؛ متغیر $\\omega$ در حوزه تبدیل و $x$ در حوزه اصلی است.",
    steps: [
      {
        title: "محاسبه تبدیل فوریه سینوسی تابع نمایی",
        text: "برای $f(t) = e^{-at}$ با $a > 0$:",
        math: [
          "F_s(\\omega) = \\sqrt{\\frac{2}{\\pi}} \\int_0^\\infty e^{-at} \\sin(\\omega t) dt = \\sqrt{\\frac{2}{\\pi}} \\frac{\\omega}{\\omega^2 + a^2}"
        ]
      },
      {
        title: "نوشتن فرمول عکس تبدیل فوریه سینوسی",
        text: "طبق قضیه وارون تبدیل فوریه سینوسی:",
        math: [
          "f(t) = \\sqrt{\\frac{2}{\\pi}} \\int_0^\\infty F_s(\\omega) \\sin(\\omega t) d\\omega",
          "e^{-at} = \\sqrt{\\frac{2}{\\pi}} \\int_0^\\infty \\left(\\sqrt{\\frac{2}{\\pi}} \\frac{\\omega}{\\omega^2 + a^2}\\right) \\sin(\\omega t) d\\omega = \\frac{2}{\\pi} \\int_0^\\infty \\frac{\\omega \\sin(\\omega t)}{\\omega^2 + a^2} d\\omega"
        ]
      },
      {
        title: "تغییر نماد متغیرها و تطبیق با مسئله",
        text: "اگر متغیر انتگرال‌گیری را $x$ و پارامتر را $t = m$ قرار دهیم:",
        math: [
          "e^{-am} = \\frac{2}{\\pi} \\int_0^\\infty \\frac{x \\sin(mx)}{x^2 + a^2} dx",
          "\\int_0^\\infty \\frac{x \\sin(mx)}{x^2 + a^2} dx = \\frac{\\pi}{2} e^{-am}"
        ]
      }
    ],
    finalAnswer: [
      "\\int_0^{\\infty} \\frac{x \\sin(mx)}{x^2 + a^2} dx = \\frac{\\pi}{2} e^{-am} \\quad (m > 0, a > 0)"
    ],
    keyTakeaway: "این انتگرال با روش مانده‌ها نیز قابل حل است، اما تبدیل فوریه سینوسی محاسبات را بسیار مستقیم و تمیز می‌کند."
  }
];

export const FOURIER_QUIZ: QuizQuestion[] = [
  {
    id: "fq-1",
    chapterId: "fourier",
    subTopic: "fourier-series",
    question: "سری فوریه تابع $f(x) = x^3$ در بازه $[-\\pi, \\pi]$ با دوره تناوب $2\\pi$ دارای کدام مشخصه است؟",
    options: [
      { id: 0, text: "تنها شامل جملات کسینوسی و عدد ثابت است ($b_n = 0$)" },
      { id: 1, text: "تنها شامل جملات سینوسی است ($a_0 = 0$ و $a_n = 0$)" },
      { id: 2, text: "شامل هر دو دسته جملات سینوسی و کسینوسی است" },
      { id: 3, text: "هیچ ضریبی ناصفر نیست چون تابع چندجمله‌ای است" }
    ],
    correctOption: 1,
    source: "کتاب ریاضیات مهندسی دکتر شیدفر - آزمون فصل ۱",
    difficulty: "easy",
    explanation: {
      summary: "تابع $f(x) = x^3$ یک تابع فرد است چون $(-x)^3 = -x^3$.",
      steps: [
        {
          title: "تقارن تابع",
          text: "در بازه متقارن $[-\\pi, \\pi]$، انتگرال هر تابع فرد با تابع زوج کسینوس صفر است. بنابراین $a_0 = 0$ و $a_n = 0$ و فقط ضرایب $b_n$ باقی می‌مانند."
        }
      ],
      trap: "برخی دانشجویان گمان می‌کنند توان‌های فرد در سری فوریه جملات کسینوسی هم تولید می‌کنند در حالی که تقارن کلی تابع تعیین‌کننده است."
    }
  },
  {
    id: "fq-2",
    chapterId: "fourier",
    subTopic: "fourier-series",
    question: "اگر سری فوریه تابع $f(x)$ با دوره تناوب $2L$ به‌صورت $f(x) \\sim \\frac{a_0}{2} + \\sum_{n=1}^\\infty (a_n \\cos(\\frac{n\\pi x}{L}) + b_n \\sin(\\frac{n\\pi x}{L}))$ باشد، مقدار ضریب $a_0$ چه مفهومی دارد؟",
    options: [
      { id: 0, text: "مقدار تابع در نقطه مبدأ $x=0$" },
      { id: 1, text: "مقدار ماکزیمم تابع در یک دوره" },
      { id: 2, text: "دو برابر مقدار میانگین تابع در یک دوره تناوب" },
      { id: 3, text: "مساحت زیر منحنی مشتق اول تابع" }
    ],
    correctOption: 2,
    source: "میان‌ترم ریاضی مهندسی دانشگاه تهران - آبان ۱۴۰۰",
    difficulty: "easy",
    explanation: {
      summary: "فرمول ضریب میانگین $a_0 = \\frac{1}{L} \\int_{-L}^L f(x) dx$ است در حالی که میانگین واقعی تابع در دوره تناوب $2L$ برابر $\\frac{1}{2L} \\int_{-L}^L f(x) dx = \\frac{a_0}{2}$ است.",
      steps: [
        {
          title: "محاسبه میانگین",
          text: "میانگین هندسی و فیزیکی تابع $\\bar{f} = \\frac{1}{2L}\\int_{-L}^L f(x)dx = \\frac{a_0}{2}$ است؛ بنابراین $a_0$ دو برابر میانگین تابع است."
        }
      ],
      trap: "اشتباه رایج بین $a_0$ و $\\frac{a_0}{2}$ به عنوان مقدار میانگین سیگنال."
    }
  },
  {
    id: "fq-3",
    chapterId: "fourier",
    subTopic: "fourier-series",
    question: "سری فوریه تابع $f(x) = \\begin{cases} 2 & 0 < x < 1 \\\\ 6 & 1 < x < 2 \\end{cases}$ با دوره تناوب $T=2$ در نقطه $x = 1$ به چه مقداری همگرا می‌شود؟",
    options: [
      { id: 0, text: "مقدار ۲" },
      { id: 1, text: "مقدار ۶" },
      { id: 2, text: "مقدار ۴" },
      { id: 3, text: "مقدار صفر" }
    ],
    correctOption: 2,
    source: "کنکور کارشناسی ارشد مهندسی برق ۱۳۹۸",
    difficulty: "easy",
    explanation: {
      summary: "طبق قضیه دیریکله، در نقطه ناپیوستگی جهشی، سری فوریه به میانگین حد چپ و راست همگرا می‌شود.",
      steps: [
        {
          title: "قضیه دیریکله",
          text: "حد چپ: $f(1^-) = 2$، حد راست: $f(1^+) = 6$. مقدار همگرایی: $S(1) = \\frac{2 + 6}{2} = 4$."
        }
      ],
      trap: "فرض کردن اینکه سری به یکی از مقادیر ۲ یا ۶ همگرا می‌شود."
    }
  },
  {
    id: "fq-4",
    chapterId: "fourier",
    subTopic: "half-range",
    question: "در بسط نیم‌دامنه سینوسی تابع $f(x) = 2$ در بازه $0 < x < \\pi$، ضریب $b_3$ برابر کدام گزینه است؟",
    options: [
      { id: 0, math: "\\frac{8}{3\\pi}" },
      { id: 1, math: "\\frac{4}{3\\pi}" },
      { id: 2, math: "0" },
      { id: 3, math: "-\\frac{8}{3\\pi}" }
    ],
    correctOption: 0,
    source: "کتاب ریاضی مهندسی پارسه / دکتر معتقدی",
    difficulty: "medium",
    explanation: {
      summary: "فرمول $b_n = \\frac{2}{\\pi} \\int_0^\\pi 2 \\sin(nx) dx = \\frac{4}{n\\pi} (1 - (-1)^n)$ است.",
      steps: [
        {
          title: "محاسبه برای n = 3",
          text: "چون $n=3$ فرد است: $1 - (-1)^3 = 2$، پس $b_3 = \\frac{4}{3\\pi} \\times 2 = \\frac{8}{3\\pi}$."
        }
      ]
    }
  },
  {
    id: "fq-5",
    chapterId: "fourier",
    subTopic: "parseval",
    question: "اگر سری فوریه تابع $f(x)$ در بازه $[-\\pi, \\pi]$ به‌صورت $f(x) = \\sum_{n=1}^\\infty \\frac{1}{n} \\sin(nx)$ باشد، حاصل انتگرال $\\int_{-\\pi}^\\pi [f(x)]^2 dx$ چقدر است؟ (با فرض $\\sum_{n=1}^\\infty \\frac{1}{n^2} = \\frac{\\pi^2}{6}$)",
    options: [
      { id: 0, math: "\\frac{\\pi^3}{3}" },
      { id: 1, math: "\\frac{\\pi^3}{6}" },
      { id: 2, math: "\\frac{\\pi^2}{6}" },
      { id: 3, math: "\\frac{\\pi}{6}" }
    ],
    correctOption: 1,
    source: "پایان‌ترم ریاضی مهندسی دانشگاه صنعتی شریف - بهمن ۱۳۹۹",
    difficulty: "medium",
    explanation: {
      summary: "طبق تساوی پارسوال: $\\frac{1}{\\pi} \\int_{-\\pi}^\\pi [f(x)]^2 dx = \\sum_{n=1}^\\infty b_n^2$.",
      steps: [
        {
          title: "اعمال تساوی پارسوال",
          text: "چون $a_n = 0$ و $b_n = \\frac{1}{n}$، داریم: $\\frac{1}{\\pi} \\int_{-\\pi}^\\pi [f(x)]^2 dx = \\sum_{n=1}^\\infty \\frac{1}{n^2} = \\frac{\\pi^2}{6}$."
        },
        {
          title: "محاسبه انتگرال",
          text: "با ضرب طرفین در $\\pi$: $\\int_{-\\pi}^\\pi [f(x)]^2 dx = \\pi \\times \\frac{\\pi^2}{6} = \\frac{\\pi^3}{6}$."
        }
      ],
      trap: "فراموش کردن ضرب $\\pi$ در سمت راست تساوی پارسوال."
    }
  },
  {
    id: "fq-6",
    chapterId: "fourier",
    subTopic: "complex-fourier",
    question: "در فرم مختلط سری فوریه $f(x) = \\sum_{n=-\\infty}^\\infty c_n e^{inx}$، چه رابطه‌ای بین ضرایب مختلط $c_n$ و ضرایب حقیقی $a_n, b_n$ برای یک تابع حقیقی برقرار است؟",
    options: [
      { id: 0, math: "c_n = \\frac{a_n - i b_n}{2}, \\quad c_{-n} = c_n^*" },
      { id: 1, math: "c_n = a_n + i b_n, \\quad c_{-n} = -c_n" },
      { id: 2, math: "c_n = \\frac{a_n + i b_n}{2}, \\quad c_{-n} = c_n" },
      { id: 3, math: "c_n = \\sqrt{a_n^2 + b_n^2}" }
    ],
    correctOption: 0,
    source: "کنکور کارشناسی ارشد مهندسی مکانیک ۱۳۹۷",
    difficulty: "medium",
    explanation: {
      summary: "از فرمول اویلر برای بسط $\\cos$ و $\\sin$ به پایه‌های نمایی مختلط، $c_n = \\frac{a_n - i b_n}{2}$ به دست می‌آید.",
      steps: [
        {
          title: "تحلیل فرمول اویلر",
          text: "$a_n \\cos(nx) + b_n \\sin(nx) = a_n \\frac{e^{inx} + e^{-inx}}{2} + b_n \\frac{e^{inx} - e^{-inx}}{2i} = \\left(\\frac{a_n - ib_n}{2}\\right)e^{inx} + \\left(\\frac{a_n + ib_n}{2}\\right)e^{-inx}$."
        }
      ],
      trap: "اشتباه در علامت منفی $i b_n$ در صورت کسر."
    }
  },
  {
    id: "fq-7",
    chapterId: "fourier",
    subTopic: "fourier-integral-transform",
    question: "اگر تبدیل فوریه تابع $f(x)$ برابر $F(\\omega)$ باشد، تبدیل فوریه تابع مقیاس‌شده $f(at)$ با $a \\ne 0$ کدام است؟",
    options: [
      { id: 0, math: "\\frac{1}{|a|} F\\left(\\frac{\\omega}{a}\\right)" },
      { id: 1, math: "a F(a\\omega)" },
      { id: 2, math: "F\\left(\\frac{\\omega}{a}\\right)" },
      { id: 3, math: "\\frac{1}{a^2} F(a\\omega)" }
    ],
    correctOption: 0,
    source: "کتاب ریاضیات مهندسی دکتر شیدفر - فصل ۲",
    difficulty: "medium",
    explanation: {
      summary: "طبق خاصیت مقیاس در تبدیل فوریه (Scaling Property): $\\mathcal{F}\\{f(at)\\} = \\frac{1}{|a|} F(\\frac{\\omega}{a})$.",
      steps: [
        {
          title: "تغییر متغیر در انتگرال تبدیل",
          text: "با تغییر متغیر $u = at$، اگر $a > 0$ حدود حفظ می‌شوند و اگر $a < 0$ حدود معکوس شده و یک علامت منفی تولید می‌شود که با ضریب قدرمطلق $|a|$ در مخرج جبران می‌گردد."
        }
      ],
      trap: "فراموش کردن قدرمطلق در مخرج برای مقادیر منفی $a$."
    }
  },
  {
    id: "fq-8",
    chapterId: "fourier",
    subTopic: "fourier-integral-transform",
    question: "مقدار انتگرال ناسره $\\int_0^\\infty \\frac{\\sin(2x)}{x} dx$ کدام است؟",
    options: [
      { id: 0, math: "\\pi" },
      { id: 1, math: "\\frac{\\pi}{2}" },
      { id: 2, math: "\\frac{\\pi}{4}" },
      { id: 3, math: "2\\pi" }
    ],
    correctOption: 1,
    source: "پایان‌ترم ریاضی مهندسی دانشگاه صنعتی امیرکبیر - بهمن ۱۴۰۰",
    difficulty: "medium",
    explanation: {
      summary: "انتگرال دیریکله برای هر ضریب مثبت $\\alpha > 0$ مقداری ثابت و برابر $\\frac{\\pi}{2}$ دارد.",
      steps: [
        {
          title: "تغییر متغیر انتگرال دیریکله",
          text: "با فرض $u = 2x$ داریم $dx = \\frac{du}{2}$، پس $\\int_0^\\infty \\frac{\\sin(2x)}{x} dx = \\int_0^\\infty \\frac{\\sin(u)}{\\frac{u}{2}} \\frac{du}{2} = \\int_0^\\infty \\frac{\\sin(u)}{u} du = \\frac{\\pi}{2}$."
        }
      ],
      trap: "ضرب اشتباه عدد ۲ در جواب و انتخاب گزینه $\\pi$."
    }
  },
  {
    id: "fq-9",
    chapterId: "fourier",
    subTopic: "fourier-series",
    question: "پدیده گیبس (Gibbs Phenomenon) در تقریب سری فوریه بیانگر چیست؟",
    options: [
      { id: 0, text: "واگرایی کامل سری فوریه در توابع چندجمله‌ای" },
      { id: 1, text: "جهش و اورشوت پایدار حدود ۹٪ در نزدیکی نقاط ناپیوستگی جهشی حتی با میل دادن تعداد جملات به بی‌نهایت" },
      { id: 2, text: "برابری حتمی مشتق سری فوریه با سری مشتقات توابع" },
      { id: 3, text: "کاهش خطای تقریب به صفر مطلق در تمام نقاط ناپیوسته" }
    ],
    correctOption: 1,
    source: "کتاب ریاضی مهندسی پیشرفته کریزیگ / مدرسان شریف",
    difficulty: "hard",
    explanation: {
      summary: "در نقاط ناپیوستگی جهشی، تقریب با تعداد متناهی جملات فوریه دارای جهشی معادل حدود ۸.۹۵٪ ارتفاع پرش است که با افزایش جملات از بین نمی‌رود بلکه به نقطه ناپیوستگی فشرده می‌شود.",
      steps: [
        {
          title: "ماهیت پدیده گیبس",
          text: "این اورشوت به علت رفتار هسته دیریکله رخ می‌دهد و با افزایش $N$ عرض جهش باریک‌تر می‌شود اما ارتفاع آن ثابت می‌ماند."
        }
      ]
    }
  },
  {
    id: "fq-10",
    chapterId: "fourier",
    subTopic: "fourier-integral-transform",
    question: "تبدیل فوریه کانولوشن دو تابع $f(x) * g(x) = \\int_{-\\infty}^\\infty f(t) g(x-t) dt$ در تعریف استاندارد $F(\\omega) = \\int_{-\\infty}^\\infty f(x) e^{-i\\omega x} dx$ برابر با کدام است؟",
    options: [
      { id: 0, math: "F(\\omega) + G(\\omega)" },
      { id: 1, math: "F(\\omega) \\cdot G(\\omega)" },
      { id: 2, math: "\\frac{F(\\omega)}{G(\\omega)}" },
      { id: 3, math: "F'(\\omega) G(\\omega)" }
    ],
    correctOption: 1,
    source: "کنکور کارشناسی ارشد مهندسی برق ۱۴۰۲",
    difficulty: "hard",
    explanation: {
      summary: "قضیه کانولوشن بیان می‌کند که عمل پیچش (کانولوشن) در حوزه زمان، معادل ضرب مستقیم در حوزه فرکانس است.",
      steps: [
        {
          title: "اثبات اجمالی",
          text: "با جاگذاری تعریف کانولوشن و تعویض ترتیب انتگرال‌ها و تغییر متغیر $u = x - t$، دو انتگرال مستقل به دست می‌آید که حاصل‌ضرب $F(\\omega) G(\\omega)$ است."
        }
      ],
      trap: "اشتباه گرفتن کانولوشن با ضرب معمولی در حوزه زمان."
    }
  }
];

export const FOURIER_FORMULAS: FormulaItem[] = [
  {
    id: "f-1",
    title: "سری فوریه در بازه متقارن [-L, L]",
    category: "سری فوریه",
    latex: "f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty \\left( a_n \\cos\\left(\\frac{n\\pi x}{L}\\right) + b_n \\sin\\left(\\frac{n\\pi x}{L}\\right) \\right)",
    description: "فرمول عمومی بسط تابع متناوب با دوره تناوب T=2L به مؤلفه‌های هارمونیک کسینوسی و سینوسی.",
    conditions: "تابع f باید شرایط دیریکله (پیوسته تکه‌ای و دارای مشتق تکه‌ای) را دارا باشد."
  },
  {
    id: "f-2",
    title: "ضرایب فوریه در بازه [-L, L]",
    category: "سری فوریه",
    latex: "a_n = \\frac{1}{L} \\int_{-L}^L f(x) \\cos\\left(\\frac{n\\pi x}{L}\\right) dx, \\quad b_n = \\frac{1}{L} \\int_{-L}^L f(x) \\sin\\left(\\frac{n\\pi x}{L}\\right) dx",
    description: "محاسبه ضرایب فوریه با استفاده از تعامد توابع سینوس و کسینوس در بازه متقارن.",
    conditions: "برای تابع زوج: bn=0. برای تابع فرد: a0=0 و an=0."
  },
  {
    id: "f-3",
    title: "تساوی پارسوال برای سری فوریه",
    category: "قضایای انرژی",
    latex: "\\frac{1}{L} \\int_{-L}^L [f(x)]^2 dx = \\frac{a_0^2}{2} + \\sum_{n=1}^\\infty (a_n^2 + b_n^2)",
    description: "بیان بقای توان و انرژی سیگنال بین حوزه زمان و فرکانس و کاربردی در محاسبه مجموع سری‌های عددی.",
    tag: "کلیدی امتحانی"
  },
  {
    id: "f-4",
    title: "فرم مختلط سری فوریه",
    category: "سری فوریه مختلط",
    latex: "f(x) = \\sum_{n=-\\infty}^\\infty c_n e^{i \\frac{n\\pi x}{L}}, \\quad c_n = \\frac{1}{2L} \\int_{-L}^L f(x) e^{-i \\frac{n\\pi x}{L}} dx",
    description: "نمایش نمایی فشرده سری فوریه با طیف دوطرفه فرکانسی.",
    conditions: "c_n = (a_n - i b_n) / 2 و c_(-n) = c_n^* برای توابع حقیقی."
  },
  {
    id: "f-5",
    title: "تبدیل فوریه و معکوس آن (قرارداد متقارن)",
    category: "تبدیل فوریه",
    latex: "F(\\omega) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^\\infty f(x) e^{-i\\omega x} dx, \\quad f(x) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^\\infty F(\\omega) e^{i\\omega x} d\\omega",
    description: "انتقال سیگنال‌های غیرمتناوب از حوزه زمان به حوزه فرکانس پیوسته.",
    conditions: "تابع f باید در کل محور حقیقی مطلقا انتگرال‌پذیر باشد (f in L1)."
  },
  {
    id: "f-6",
    title: "تبدیل فوریه مشتق",
    category: "ویژگی‌های تبدیل",
    latex: "\\mathcal{F}\\{f^{(n)}(x)\\} = (i\\omega)^n F(\\omega)",
    description: "تبدیل عمل دیفرانسیل‌گیری به ضرب جبری در iω؛ پایه حل معادلات دیفرانسیل با تبدیل فوریه."
  },
  {
    id: "f-7",
    title: "قضیه کانولوشن فوریه",
    category: "ویژگی‌های تبدیل",
    latex: "\\mathcal{F}\\{(f * g)(x)\\} = \\sqrt{2\\pi} \\, F(\\omega) \\cdot G(\\omega)",
    description: "تبدیل انتگرال پیچش در زمان به حاصل‌ضرب مستقیم جبری در حوزه فرکانس."
  }
];
