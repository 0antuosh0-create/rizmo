import { SolvedProblem, QuizQuestion, FormulaItem } from "../types";

export const PDE_PROBLEMS: SolvedProblem[] = [
  {
    id: "pde-prob-1",
    chapterId: "pde",
    subTopic: "pde-classification",
    subTopicLabel: "دسته‌بندی و فرم کانونیکال",
    title: "تعیین نوع معادله دیفرانسیل جزئی مرتبه دوم در نواحی مختلف صفحه",
    difficulty: "easy",
    source: "کتاب ریاضیات مهندسی دکتر عبدالله شیدفر - فصل سوم (دسته‌بندی معادلات)",
    sourceCategory: "textbook",
    statement: "نوع معادله دیفرانسیل جزئی مرتبه دوم زیر را در نقاط مختلف صفحه $xy$ مشخص کنید:\n$$u_{xx} + 2x u_{xy} + u_{yy} = 0$$",
    hint: "معادله خطی مرتبه دوم با فرم عمومی $A u_{xx} + B u_{xy} + C u_{yy} + \\dots = 0$ دارای مبین $\\Delta = B^2 - 4AC$ است. علامت $\\Delta$ نوع معادله را تعیین می‌کند.",
    examTrap: "اشتباه در ضریب $B$؛ در فرمول استاندارد $B$ ضریب جمله مشتق آمیخته $u_{xy}$ است (نه نصف آن). در اینجا $B = 2x$.",
    steps: [
      {
        title: "استخراج ضرایب اصلی معادله",
        text: "با مقایسه معادله با فرم استاندارد $A u_{xx} + B u_{xy} + C u_{yy} + D = 0$:",
        math: [
          "A = 1, \\quad B = 2x, \\quad C = 1"
        ]
      },
      {
        title: "تشکیل دیسکریمینان (مبین) معادله",
        text: "مبین $\\Delta$ به‌صورت زیر محاسبه می‌شود:",
        math: [
          "\\Delta = B^2 - 4AC = (2x)^2 - 4(1)(1) = 4x^2 - 4 = 4(x^2 - 1)"
        ]
      },
      {
        title: "تحلیل علامت مبین در نواحی مختلف",
        text: "نوع معادله بر اساس علامت $\\Delta$ به سه حالت تقسیم می‌شود:",
        math: [
          "\\Delta > 0 \\iff x^2 > 1 \\iff |x| > 1 \\implies \\text{هذلولوی (Hyperbolic)}",
          "\\Delta = 0 \\iff x^2 = 1 \\iff x = \\pm 1 \\implies \\text{سهموی (Parabolic)}",
          "\\Delta < 0 \\iff x^2 < 1 \\iff -1 < x < 1 \\implies \\text{بیضوی (Elliptic)}"
        ]
      }
    ],
    finalAnswer: [
      "|x| > 1: \\text{ هذلولوی (Hyperbolic)}",
      "x = \\pm 1: \\text{ سهموی (Parabolic)}",
      "|x| < 1: \\text{ بیضوی (Elliptic)}"
    ],
    keyTakeaway: "نوع معادله دیفرانسیل جزئی می‌تواند وابسته به موقعیت مکانی تغییر کند؛ خطوط $x = \\pm 1$ مرزهای تغییر فاز معادله از هذلولوی به بیضوی هستند."
  },
  {
    id: "pde-prob-2",
    chapterId: "pde",
    subTopic: "heat-equation",
    subTopicLabel: "معادله حرارت میله متناهی/نامتناهی",
    title: "انتقال حرارت در میله متناهی با شرایط مرزی دیریکله صفر",
    difficulty: "easy",
    source: "میان‌ترم ریاضی مهندسی دانشگاه صنعتی شریف - دانشکده مهندسی مکانیک (پاییز ۱۳۹۸)",
    sourceCategory: "university_exam",
    statement: "معادله انتقال حرارت $u_t = 4 u_{xx}$ را در میله‌ای به طول $L = \\pi$ با شرایط مرزی دو انتهای صفر درجه و دمای اولیه زیر حل کنید:\n$$\\begin{cases} u(0,t) = u(\\pi,t) = 0 \\\\ u(x,0) = 4\\sin(2x) - 7\\sin(5x) \\end{cases}$$",
    hint: "جواب عمومی معادله با شرایط مرزی دیریکله صفر به‌صورت $u(x,t) = \\sum_{n=1}^\\infty c_n \\sin(\\frac{n\\pi x}{L}) e^{-\\lambda_n^2 t}$ است. در اینجا نیاز به انتگرال‌گیری نیست و با تطبیق مستقیم ضرایب به دست می‌آید.",
    examTrap: "اشتباه در ضریب ضریب نفوذ حرارتی $c^2$ در توان نمایی؛ در اینجا $c^2 = 4$ است، بنابراین ضریب نمایی برابر $-(c \\frac{n\\pi}{L})^2 t = -(2n)^2 t = -4n^2 t$ خواهد بود.",
    steps: [
      {
        title: "تعیین ساختار جواب عمومی با جداسازی متغیرها",
        text: "برای طول $L = \\pi$ و ضریب نفوذ $c = 2$ ($c^2 = 4$):",
        math: [
          "\\lambda_n = \\frac{n\\pi}{L} = n",
          "u(x,t) = \\sum_{n=1}^\\infty c_n \\sin(nx) e^{-4n^2 t}"
        ]
      },
      {
        title: "اعمال شرط دمای اولیه t = 0",
        text: "با جاگذاری $t = 0$ در رابطه کلی:",
        math: [
          "u(x,0) = \\sum_{n=1}^\\infty c_n \\sin(nx) = 4\\sin(2x) - 7\\sin(5x)"
        ]
      },
      {
        title: "استخراج ضرایب با تطبیق مستقیم",
        text: "به دلیل تعامد پایه‌های سینوسی، ضرایب نظیر مستقیماً مساوی قرار می‌گیرند:",
        math: [
          "n = 2: \\quad c_2 = 4",
          "n = 5: \\quad c_5 = -7",
          "n \\ne 2, 5: \\quad c_n = 0"
        ]
      },
      {
        title: "نوشتن جواب کامل زمانی-مکانی",
        text: "با جایگذاری ضرایب و نمای زمانی متناظر:",
        math: [
          "u(x,t) = 4\\sin(2x) e^{-4(2^2)t} - 7\\sin(5x) e^{-4(5^2)t}",
          "u(x,t) = 4\\sin(2x) e^{-16t} - 7\\sin(5x) e^{-100t}"
        ]
      }
    ],
    finalAnswer: [
      "u(x,t) = 4\\sin(2x) e^{-16t} - 7\\sin(5x) e^{-100t}"
    ],
    keyTakeaway: "مدهای با فرکانس بالاتر ($n=5$) با آهنگ نمایی بسیار سریع‌تری ($e^{-100t}$) نسبت به مدهای پایین ($e^{-16t}$) میرا می‌شوند؛ این اصل بنیادی پدیده پخش حرارت است."
  },
  {
    id: "pde-prob-3",
    chapterId: "pde",
    subTopic: "wave-equation",
    subTopicLabel: "معادله موج ۱ بعدی و دالامبر",
    title: "ارتعاشات تار مرتعش متناهی با انتهای ثابت و سرعت اولیه صفر",
    difficulty: "easy",
    source: "کتاب ریاضی مهندسی پارسه / دکتر معتقدی - مبحث تار مرتعش",
    sourceCategory: "textbook",
    statement: "معادله موج $u_{tt} = 9 u_{xx}$ را در بازه $0 < x < \\pi$ با دو انتهای ثابت $u(0,t) = u(\\pi,t) = 0$، سرعت اولیه صفر $u_t(x,0) = 0$ و جابجایی اولیه زیر حل کنید:\n$$u(x,0) = 3\\sin(x) - \\sin(3x)$$",
    hint: "چون سرعت اولیه صفر است ($g(x)=0$)، جملات سینوس زمانی در جواب عمومی حذف شده و فقط جملات کسینوس زمانی باقی می‌مانند: $\\cos(3nt)$.",
    examTrap: "دقت در سرعت انتشار موج $c = \\sqrt{9} = 3$ است. فرکانس نوسانات زمانی $\\omega_n = \\frac{n\\pi c}{L} = 3n$ است.",
    steps: [
      {
        title: "ساختار جواب عمومی معادله موج",
        text: "با شرایط مرزی دیریکله صفر، جواب عمومی ارتعاشات تار به‌صورت زیر است:",
        math: [
          "u(x,t) = \\sum_{n=1}^\\infty \\left( A_n \\cos\\left(\\frac{n\\pi c}{L} t\\right) + B_n \\sin\\left(\\frac{n\\pi c}{L} t\\right) \\right) \\sin\\left(\\frac{n\\pi x}{L}\\right)"
        ]
      },
      {
        title: "اعمال شرایط اولیه و حذف جملات سینوس زمانی",
        text: "با $L = \\pi$ و $c = 3$، فرکانس‌های زاویه‌ای $\\omega_n = 3n$ می‌شوند. چون $u_t(x,0) = 0$، کلیه ضرایب $B_n = 0$ خواهند بود:",
        math: [
          "u(x,t) = \\sum_{n=1}^\\infty A_n \\cos(3nt) \\sin(nx)"
        ]
      },
      {
        title: "تطبیق با جابجایی اولیه در لحظه t = 0",
        text: "در $t = 0$ داریم $\\cos(0) = 1$:",
        math: [
          "u(x,0) = \\sum_{n=1}^\\infty A_n \\sin(nx) = 3\\sin(x) - \\sin(3x)",
          "n = 1: \\quad A_1 = 3",
          "n = 3: \\quad A_3 = -1",
          "n \\ne 1, 3: \\quad A_n = 0"
        ]
      },
      {
        title: "تشکیل جواب نهایی",
        text: "با جایگذاری مستقیم:",
        math: [
          "u(x,t) = 3\\sin(x)\\cos(3t) - \\sin(3x)\\cos(9t)"
        ]
      }
    ],
    finalAnswer: [
      "u(x,t) = 3\\sin(x)\\cos(3t) - \\sin(3x)\\cos(9t)"
    ],
    keyTakeaway: "حرکت ارتعاشی تار مجموعه‌ای از مدهای نوسانی ایستا (Standing Waves) است که با فرکانس‌های طبیعی $3$ و $9$ رادیان بر ثانیه به طور نامحدود نوسان می‌کنند."
  },
  {
    id: "pde-prob-4",
    chapterId: "pde",
    subTopic: "wave-equation",
    subTopicLabel: "معادله موج ۱ بعدی و دالامبر",
    title: "حل معادله موج روی خط نامتناهی با روش دالامبر",
    difficulty: "easy",
    source: "پایان‌ترم ریاضی مهندسی دانشگاه تهران - دانشکده فنی (بهمن ۱۳۹۹)",
    sourceCategory: "university_exam",
    statement: "معادله موج در ریسمان نامتناهی $u_{tt} = 4 u_{xx}$ ($-\\infty < x < \\infty, t > 0$) با جابجایی اولیه $f(x) = \\frac{1}{1 + x^2}$ و سرعت اولیه صفر $g(x) = 0$ مفروض است. مقدار $u(2, 1)$ را به دست آورید.",
    hint: "فرمول دالامبر برای سرعت اولیه صفر به‌صورت $u(x,t) = \\frac{1}{2} [f(x - ct) + f(x + ct)]$ است که سرعت انتشار موج $c = \\sqrt{4} = 2$ می‌باشد.",
    examTrap: "دقت در محاسبه علامت‌های داخل تابع جابجایی و اشتباه نکردن سرعت انتشار $c=2$ با ضریب $4$.",
    steps: [
      {
        title: "بیان فرمول دالامبر برای ریسمان نامتناهی",
        text: "فرمول عمومی دالامبر با سرعت انتشار $c = 2$:",
        math: [
          "u(x,t) = \\frac{1}{2} [f(x - ct) + f(x + ct)] + \\frac{1}{2c} \\int_{x - ct}^{x + ct} g(s) ds"
        ]
      },
      {
        title: "ساده‌سازی با توجه به سرعت اولیه صفر",
        text: "چون $g(s) = 0$ است، جمله انتگرالی حذف می‌شود:",
        math: [
          "u(x,t) = \\frac{1}{2} [f(x - 2t) + f(x + 2t)]",
          "u(x,t) = \\frac{1}{2} \\left( \\frac{1}{1 + (x - 2t)^2} + \\frac{1}{1 + (x + 2t)^2} \\right)"
        ]
      },
      {
        title: "محاسبه مقدار در نقطه x = 2 و زمان t = 1",
        text: "با جاگذاری مقادیر در رابطه دالامبر:",
        math: [
          "x - 2t = 2 - 2(1) = 0",
          "x + 2t = 2 + 2(1) = 4",
          "u(2, 1) = \\frac{1}{2} \\left( \\frac{1}{1 + 0^2} + \\frac{1}{1 + 4^2} \\right) = \\frac{1}{2} \\left( 1 + \\frac{1}{17} \\right) = \\frac{1}{2} \\left( \\frac{18}{17} \\right) = \\frac{9}{17}"
        ]
      }
    ],
    finalAnswer: [
      "u(2, 1) = \\frac{9}{17}"
    ],
    keyTakeaway: "فرمول دالامبر نشان می‌دهد موج اولیه به دو موج پیش‌رونده به راست و چپ با دامنه نصف تقسیم شده و با سرعت ثابت $c$ حرکت می‌کنند."
  },
  {
    id: "pde-prob-5",
    chapterId: "pde",
    subTopic: "heat-equation",
    subTopicLabel: "معادله حرارت میله متناهی/نامتناهی",
    title: "معادله رسانش حرارت در میله با انتهای عایق (شرایط مرزی نویمان)",
    difficulty: "medium",
    source: "کنکور کارشناسی ارشد مهندسی مکانیک ۱۴۰۰",
    sourceCategory: "konkur_arshad",
    statement: "معادله انتقال حرارت $u_t = u_{xx}$ را در میله‌ای به طول $L = \\pi$ با دو انتهای کاملاً عایق‌بندی شده و توزیع اولیه $u(x,0) = x$ حل کنید:\n$$\\begin{cases} u_x(0,t) = u_x(\\pi,t) = 0 \\\\ u(x,0) = x \\quad (0 < x < \\pi) \\end{cases}$$",
    hint: "عایق بودن انتهاها به این معنی است که شار حرارتی صفر است ($u_x = 0$)، بنابراین پایه‌های مکانی توابع کسینوسی $\\cos(nx)$ با ضریب ثابت میانگین $a_0/2$ خواهند بود.",
    examTrap: "اشتباه در استفاده از بسط سینوسی به جای بسط کسینوسی و فراموش کردن جمله پایدار $a_0/2$ که همان میانگین دمای میله در زمان بی‌نهایت است.",
    steps: [
      {
        title: "تعیین مقادیر و توابع ویژه برای شرایط مرزی نویمان",
        text: "با جداسازی متغیرها $u(x,t) = X(x)T(t)$، مسئله اشتورم-لیوویل برای $X$ به‌صورت زیر است:",
        math: [
          "X'' + \\lambda^2 X = 0, \\quad X'(0) = X'(\\pi) = 0",
          "X_n(x) = \\cos(nx), \\quad \\lambda_n = n \\quad (n = 0, 1, 2, \\dots)"
        ]
      },
      {
        title: "فرم جواب عمومی معادله حرارت با شرایط نویمان",
        text: "چون $c=1$، حل زمانی به‌صورت $T_n(t) = e^{-n^2 t}$ است:",
        math: [
          "u(x,t) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty a_n \\cos(nx) e^{-n^2 t}"
        ]
      },
      {
        title: "محاسبه ضرایب با بسط نیم‌دامنه کسینوسی f(x) = x",
        text: "ضرایب بسط کسینوسی تابع $x$ در بازه $[0, \\pi]$ قبلاً محاسبه شده است:",
        math: [
          "a_0 = \\frac{2}{\\pi} \\int_0^\\pi x dx = \\pi \\implies \\frac{a_0}{2} = \\frac{\\pi}{2}",
          "a_n = \\frac{2}{\\pi} \\int_0^\\pi x \\cos(nx) dx = \\frac{2}{\\pi n^2} ((-1)^n - 1)",
          "a_{2k} = 0, \\quad a_{2k+1} = -\\frac{4}{\\pi (2k+1)^2}"
        ]
      },
      {
        title: "نوشتن پاسخ نهایی و تحلیل رفتار در بی نهایت",
        text: "با جایگذاری ضرایب:",
        math: [
          "u(x,t) = \\frac{\\pi}{2} - \\frac{4}{\\pi} \\sum_{k=0}^\\infty \\frac{1}{(2k+1)^2} \\cos((2k+1)x) e^{-(2k+1)^2 t}"
        ],
        note: "وقتی t به سمت بی‌نهایت میل کند، تمام جملات نمایی میرا شده و دمای تمام نقاط میله به دمای میانگین اولیه π/2 می‌رسد."
      }
    ],
    finalAnswer: [
      "u(x,t) = \\frac{\\pi}{2} - \\frac{4}{\\pi} \\sum_{k=0}^{\\infty} \\frac{\\cos((2k+1)x)}{(2k+1)^2} e^{-(2k+1)^2 t}",
      "\\lim_{t \\to \\infty} u(x,t) = \\frac{\\pi}{2}"
    ],
    keyTakeaway: "در شرایط مرزی عایق، هیچ حرارتی از سیستم خارج نمی‌شود؛ بنابراین انرژی کل و دمای میانگین میله ثابت باقی می‌ماند و حالت دائم برابر با میانگین توزیع اولیه است."
  },
  {
    id: "pde-prob-6",
    chapterId: "pde",
    subTopic: "wave-equation",
    subTopicLabel: "معادله موج ۱ بعدی و دالامبر",
    title: "معادله موج با سرعت اولیه ناصفر و جابجایی اولیه صفر",
    difficulty: "medium",
    source: "پایان‌ترم ریاضی مهندسی دانشگاه صنعتی امیرکبیر - پلی‌تکنیک تهران (دی ۱۳۹۹)",
    sourceCategory: "university_exam",
    statement: "تار مرتعشی به طول $L = 1$ با دو انتهای ثابت در حالت تعادل قرار دارد ($u(x,0) = 0$). در لحظه $t = 0$ ضربه‌ای با سرعت اولیه یکنواخت $u_t(x,0) = v_0$ به تار وارد می‌شود. پاسخ ارتعاشی $u(x,t)$ را با فرض $c = 1$ بیابید.",
    hint: "چون $u(x,0) = 0$، تمام $A_n = 0$ خواهند بود و ضرایب $B_n$ از بسط سینوسی سرعت اولیه $g(x) = v_0$ به دست می‌آیند: $B_n = \\frac{2}{n\\pi c} \\int_0^L g(x) \\sin(\\frac{n\\pi x}{L}) dx$.",
    examTrap: "تقسیم نکردن بر فرکانس طبیعی $\\frac{n\\pi c}{L}$ در محاسبه ضریب $B_n$؛ مشتق زمانی سینوس باعث تولید این ضریب در مخرج می‌شود.",
    steps: [
      {
        title: "ساختار جواب عمومی موج با جابجایی اولیه صفر",
        text: "با $L = 1$ و $c = 1$ و شرط $A_n = 0$:",
        math: [
          "u(x,t) = \\sum_{n=1}^\\infty B_n \\sin(n\\pi t) \\sin(n\\pi x)"
        ]
      },
      {
        title: "مشتق زمانی و تطبیق با سرعت اولیه",
        text: "مشتق نسبت به $t$ در لحظه صفر:",
        math: [
          "u_t(x,t) = \\sum_{n=1}^\\infty n\\pi B_n \\cos(n\\pi t) \\sin(n\\pi x)",
          "u_t(x,0) = \\sum_{n=1}^\\infty (n\\pi B_n) \\sin(n\\pi x) = v_0"
        ]
      },
      {
        title: "محاسبه ضرایب فوریه سرعت اولیه",
        text: "ضریب $(n\\pi B_n)$ ضریب بسط سینوسی تابع ثابت $v_0$ است:",
        math: [
          "n\\pi B_n = 2 \\int_0^1 v_0 \\sin(n\\pi x) dx = 2v_0 \\left[ -\\frac{\\cos(n\\pi x)}{n\\pi} \\right]_0^1 = \\frac{2v_0}{n\\pi} (1 - (-1)^n)",
          "B_n = \\frac{2v_0}{(n\\pi)^2} (1 - (-1)^n)"
        ],
        note: "برای n زوج: Bn = 0. برای n فرد (n = 2k+1): Bn = 4v0 / ((2k+1)² π²)."
      },
      {
        title: "نوشتن پاسخ نهایی",
        text: "با جاگذاری ضرایب مدهای فرد:",
        math: [
          "u(x,t) = \\frac{4v_0}{\\pi^2} \\sum_{k=0}^\\infty \\frac{1}{(2k+1)^2} \\sin((2k+1)\\pi t) \\sin((2k+1)\\pi x)"
        ]
      }
    ],
    finalAnswer: [
      "u(x,t) = \\frac{4v_0}{\\pi^2} \\sum_{k=0}^{\\infty} \\frac{\\sin((2k+1)\\pi t) \\sin((2k+1)\\pi x)}{(2k+1)^2}"
    ],
    keyTakeaway: "پاسخ به ضربه سرعت اولیه دارای مدهای با دامنه متناسب با $1/n^2$ است؛ بنابراین نسبت به ضربه جابجایی همگرایی سریع‌تر و نرم‌تری دارد."
  },
  {
    id: "pde-prob-7",
    chapterId: "pde",
    subTopic: "laplace-equation",
    subTopicLabel: "معادله لاپلاس دکارتی و قطبی",
    title: "توزیع پتانسیل در صفحه مستطیلی با شرایط مرزی دیریکله (معادله لاپلاس)",
    difficulty: "medium",
    source: "کتاب ریاضیات مهندسی دکتر عبدالله شیدفر - فصل چهارم",
    sourceCategory: "textbook",
    statement: "معادله پتانسیل پایدار $\\nabla^2 u = u_{xx} + u_{yy} = 0$ را در صفحه مستطیلی $0 < x < a, 0 < y < b$ با شرایط مرزی زیر حل کنید:\n$$u(0,y) = 0, \\quad u(a,y) = 0, \\quad u(x,0) = 0, \\quad u(x,b) = V_0$$",
    hint: "سه ضلع دارای شرط مرزی صفر هستند. در راستای $x$ دو سر صفر است، بنابراین پایه‌های $x$ سینوسی ($\\{ \\sin(\\frac{n\\pi x}{a}) \\}$) و پایه‌های $y$ سینوس هذلولوی ($\\{ \\sinh(\\frac{n\\pi y}{a}) \\}$) خواهند بود تا در $y=0$ صفر شوند.",
    examTrap: "استفاده اشتباه از $\\cosh$ به جای $\\sinh$ برای راستای $y$؛ دقت کنید $\\sinh(0) = 0$ است اما $\\cosh(0) = 1$.",
    steps: [
      {
        title: "جداسازی متغیرها و انتخاب علامت ثابت جداسازی",
        text: "با فرض $u(x,y) = X(x)Y(y)$:",
        math: [
          "\\frac{X''}{X} = -\\frac{Y''}{Y} = -\\lambda^2",
          "X'' + \\lambda^2 X = 0, \\quad X(0) = X(a) = 0 \\implies X_n(x) = \\sin\\left(\\frac{n\\pi x}{a}\\right), \\quad \\lambda_n = \\frac{n\\pi}{a}"
        ]
      },
      {
        title: "حل معادله برای راستای y با شرط صفر در کف",
        text: "معادله $Y$ به‌صورت $Y'' - \\lambda_n^2 Y = 0$ است:",
        math: [
          "Y(y) = C_1 \\cosh(\\lambda_n y) + C_2 \\sinh(\\lambda_n y)",
          "Y(0) = 0 \\implies C_1 = 0 \\implies Y_n(y) = \\sinh\\left(\\frac{n\\pi y}{a}\\right)"
        ]
      },
      {
        title: "ترکیب خطی و اعمال شرط مرزی در y = b",
        text: "جواب کل حاصل برهم‌نهی مدهای مجاز است:",
        math: [
          "u(x,y) = \\sum_{n=1}^\\infty A_n \\sin\\left(\\frac{n\\pi x}{a}\\right) \\sinh\\left(\\frac{n\\pi y}{a}\\right)",
          "u(x,b) = \\sum_{n=1}^\\infty \\left( A_n \\sinh\\left(\\frac{n\\pi b}{a}\\right) \\right) \\sin\\left(\\frac{n\\pi x}{a}\\right) = V_0"
        ]
      },
      {
        title: "محاسبه ضریب An با بسط فوریه سینوسی تابع ثابت",
        text: "ضریب درون پرانتز برابر ضریب بسط سینوسی $V_0$ است:",
        math: [
          "A_n \\sinh\\left(\\frac{n\\pi b}{a}\\right) = \\frac{2}{a} \\int_0^a V_0 \\sin\\left(\\frac{n\\pi x}{a}\\right) dx = \\frac{2V_0}{n\\pi} (1 - (-1)^n)",
          "A_{2k+1} = \\frac{4V_0}{(2k+1)\\pi \\sinh\\left(\\frac{(2k+1)\\pi b}{a}\\right)}"
        ]
      }
    ],
    finalAnswer: [
      "u(x,y) = \\frac{4V_0}{\\pi} \\sum_{k=0}^{\\infty} \\frac{\\sin\\left(\\frac{(2k+1)\\pi x}{a}\\right) \\sinh\\left(\\frac{(2k+1)\\pi y}{a}\\right)}{(2k+1) \\sinh\\left(\\frac{(2k+1)\\pi b}{a}\\right)}"
    ],
    keyTakeaway: "در مسائل دو بعدی لاپلاس، جهتی که دارای دو شرط مرزی همگن (صفر) است پایه‌های مثلثاتی ($\\{ \\sin, \\cos \\}$) می‌گیرد و جهت دیگر پایه‌های هذلولوی ($\\{ \\sinh, \\cosh \\}$)."
  },
  {
    id: "pde-prob-8",
    chapterId: "pde",
    subTopic: "heat-equation",
    subTopicLabel: "معادله حرارت میله متناهی/نامتناهی",
    title: "حل معادله انتقال حرارت با شرایط مرزی ناهمگن (تفکیک پایا و گذرا)",
    difficulty: "medium",
    source: "کنکور کارشناسی ارشد مهندسی برق ۱۳۹۹",
    sourceCategory: "konkur_arshad",
    statement: "معادله حرارت $u_t = u_{xx}$ را در میله‌ای به طول $L = 1$ با شرایط دمای دو انتهای ثابت ناصفر و دمای اولیه صفر حل کنید:\n$$u(0,t) = 10, \\quad u(1,t) = 30, \\quad u(x,0) = 0$$",
    hint: "پاسخ را به دو بخش پایا و گذرا تفکیک کنید: $u(x,t) = v(x) + w(x,t)$ که در آن $v(x)$ خط مستقیمی است که شرایط مرزی ناهمگن را ارضا می‌کند و $w(x,t)$ یک مسئله با شرایط مرزی همگن است.",
    examTrap: "تغییر شرط اولیه برای بخش گذرا؛ شرط اولیه بخش گذرا $w(x,0) = u(x,0) - v(x) = -v(x)$ است و نباید صفر در نظر گرفته شود.",
    steps: [
      {
        title: "تعیین پاسخ پایا (Steady-state Solution)",
        text: "در حالت پایا ($t \\to \\infty$)، مشتق زمانی صفر است: $v''(x) = 0$:",
        math: [
          "v(x) = C_1 x + C_2",
          "v(0) = 10 \\implies C_2 = 10",
          "v(1) = 30 \\implies C_1(1) + 10 = 30 \\implies C_1 = 20",
          "v(x) = 20x + 10"
        ]
      },
      {
        title: "تشکیل معادله برای بخش گذرا (Transient Solution)",
        text: "با فرض $u(x,t) = v(x) + w(x,t)$، بخش $w$ دارای شرایط مرزی صفر خواهد بود:",
        math: [
          "w_t = w_{xx}, \\quad w(0,t) = 0, \\quad w(1,t) = 0",
          "w(x,0) = u(x,0) - v(x) = 0 - (20x + 10) = -(20x + 10)"
        ]
      },
      {
        title: "محاسبه ضرایب بخش گذرا با بسط فوریه سینوسی",
        text: "پاسخ $w(x,t)$ به‌صورت سری سینوسی است:",
        math: [
          "w(x,t) = \\sum_{n=1}^\\infty b_n \\sin(n\\pi x) e^{-n^2 \\pi^2 t}",
          "b_n = 2 \\int_0^1 -(20x + 10) \\sin(n\\pi x) dx = -40 \\int_0^1 x \\sin(n\\pi x) dx - 20 \\int_0^1 \\sin(n\\pi x) dx",
          "b_n = -40 \\left[ -\\frac{\\cos(n\\pi)}{n\\pi} \\right] - 20 \\left[ \\frac{1 - \\cos(n\\pi)}{n\\pi} \\right] = \\frac{40(-1)^n - 20 + 20(-1)^n}{n\\pi} = \\frac{60(-1)^n - 20}{n\\pi} - \\frac{20(1 - (-1)^n)}{n\\pi}"
        ],
        note: "با انتگرال‌گیری جزء به جزء دقیق: bn = (20 / (nπ)) * [3(-1)^n - 1] برای مقادیر مختلف n."
      },
      {
        title: "ترکیب دو بخش برای جواب کل",
        text: "پاسخ نهایی برابر مجموع حالت پایا و حالت گذرا است:",
        math: [
          "u(x,t) = (20x + 10) + \\sum_{n=1}^\\infty b_n \\sin(n\\pi x) e^{-n^2 \\pi^2 t}"
        ]
      }
    ],
    finalAnswer: [
      "u(x,t) = 20x + 10 + \\sum_{n=1}^{\\infty} b_n \\sin(n\\pi x) e^{-n^2 \\pi^2 t}",
      "b_n = \\frac{2}{n\\pi} \\left( 10(-1)^n - 30 \\right) = -\\frac{20}{n\\pi} (3 - (-1)^n)"
    ],
    keyTakeaway: "روش تفکیک به جواب پایا و گذرا قوی‌ترین ابزار برای حل معادلات دیفرانسیل جزئی با شرایط مرزی ناهمگن مستقل از زمان است."
  },
  {
    id: "pde-prob-9",
    chapterId: "pde",
    subTopic: "laplace-equation",
    subTopicLabel: "معادله لاپلاس دکارتی و قطبی",
    title: "معادله لاپلاس در مختصات قطبی درون دیسک دایره‌ای",
    difficulty: "medium",
    source: "کتاب ریاضی مهندسی دکتر مسعود آقاسی - جلد دوم",
    sourceCategory: "textbook",
    statement: "معادله پتانسیل لاپلاس $\\nabla^2 u = u_{rr} + \\frac{1}{r} u_r + \\frac{1}{r^2} u_{\\theta\\theta} = 0$ را درون دیسک دایره‌ای به شعاع $R$ با شرط مرزی پتانسیل $u(R, \\theta) = \\sin^2(\\theta)$ حل کنید.",
    hint: "جواب عمومی درون دیسک فاقد جملات لگاریتمی $\\ln(r)$ و توان‌های منفی $r^{-n}$ است (به دلیل کرانداری در مبدأ $r=0$). از اتحاد مثلثاتی $\\sin^2(\\theta) = \\frac{1 - \\cos(2\\theta)}{2}$ استفاده کنید.",
    examTrap: "نیازی به انتگرال‌گیری فوریه نیست! با تبدیل توان دوم سینوس به کسینوس با بسامد ۲، ضرایب با یک هم‌ارزی ساده استخراج می‌شوند.",
    steps: [
      {
        title: "فرم جواب عمومی لاپلاس درون دایره",
        text: "به دلیل شرط کرانداری پتانسیل در مرکز دیسک ($r \\to 0$):",
        math: [
          "u(r, \\theta) = a_0 + \\sum_{n=1}^\\infty r^n (a_n \\cos(n\\theta) + b_n \\sin(n\\theta))"
        ]
      },
      {
        title: "بازنویسی شرط مرزی با اتحادهای مثلثاتی",
        text: "پتانسیل روی مرز $r = R$:",
        math: [
          "u(R, \\theta) = \\sin^2(\\theta) = \\frac{1}{2} - \\frac{1}{2} \\cos(2\\theta)"
        ]
      },
      {
        title: "تطبیق روی مرز و استخراج ضرایب",
        text: "با قرار دادن $r = R$ در رابطه عمومی:",
        math: [
          "a_0 + \\sum_{n=1}^\\infty R^n (a_n \\cos(n\\theta) + b_n \\sin(n\\theta)) = \\frac{1}{2} - \\frac{1}{2} \\cos(2\\theta)",
          "n = 0: \\quad a_0 = \\frac{1}{2}",
          "n = 2: \\quad R^2 a_2 = -\\frac{1}{2} \\implies a_2 = -\\frac{1}{2R^2}",
          "\\text{سایر ضرایب} = 0"
        ]
      },
      {
        title: "تشکیل تابع پتانسیل نهایی",
        text: "با جاگذاری ضرایب ناصفر:",
        math: [
          "u(r, \\theta) = \\frac{1}{2} - \\frac{1}{2} \\left(\\frac{r}{R}\\right)^2 \\cos(2\\theta)"
        ]
      }
    ],
    finalAnswer: [
      "u(r, \\theta) = \\frac{1}{2} - \\frac{1}{2} \\left(\\frac{r}{R}\\right)^2 \\cos(2\\theta)"
    ],
    keyTakeaway: "قضیه مقدار میانگین گاوس بیان می‌کند که پتانسیل در مرکز دیسک ($r=0$) برابر میانگین پتانسیل روی مرز دایره است: $u(0,\\theta) = 1/2$."
  },
  {
    id: "pde-prob-10",
    chapterId: "pde",
    subTopic: "pde-classification",
    subTopicLabel: "دسته‌بندی و فرم کانونیکال",
    title: "تبدیل معادله هذلولوی مرتبه دوم به فرم کانونیکال با خطوط مشخصه",
    difficulty: "medium",
    source: "پایان‌ترم ریاضی مهندسی دانشگاه علم و صنعت ایران (دی ۱۴۰۱)",
    sourceCategory: "university_exam",
    statement: "معادله دیفرانسیل جزئی $u_{xx} - 4u_{xy} + 3u_{yy} = 0$ را با یافتن خطوط مشخصه (Characteristic Curves) به فرم کانونیکال استاندارد تبدیل کرده و جواب عمومی آن را بیابید.",
    hint: "معادله مشخصه به‌صورت $\\frac{dy}{dx} = \\frac{B \\pm \\sqrt{B^2 - 4AC}}{2A}$ است. با حل دو معادله دیفرانسیل خطوط مشخصه $\\xi$ و $\\eta$ به دست می‌آیند و معادله به فرم $u_{\\xi\\eta} = 0$ درمی‌آید.",
    examTrap: "دقت در علامت شیب خطوط مشخصه؛ تغییر متغیر باید متغیرهای جدید $\\xi(x,y)$ و $\\eta(x,y)$ را به عنوان ثابت‌های انتگرال‌گیری خطوط مشخصه تعریف کند.",
    steps: [
      {
        title: "تعیین نوع معادله و ریشه‌های مشخصه",
        text: "ضرایب عبارتند از $A = 1, B = -4, C = 3$:",
        math: [
          "\\Delta = B^2 - 4AC = (-4)^2 - 4(1)(3) = 16 - 12 = 4 > 0 \\implies \\text{هذلولوی}",
          "\\frac{dy}{dx} = \\frac{B \\pm \\sqrt{\\Delta}}{2A} = \\frac{-4 \\pm 2}{2} = -2 \\pm 1",
          "\\lambda_1 = -1, \\quad \\lambda_2 = -3"
        ]
      },
      {
        title: "یافتن معادلات خطوط مشخصه",
        text: "با انتگرال‌گیری از شیب‌ها:",
        math: [
          "\\frac{dy}{dx} = -1 \\implies y + x = C_1 \\implies \\xi = y + x",
          "\\frac{dy}{dx} = -3 \\implies y + 3x = C_2 \\implies \\eta = y + 3x"
        ]
      },
      {
        title: "تبدیل مشتقات به متغیرهای جدید",
        text: "طبق قاعده زنجیره‌ای چندمتغیره، فرم کانونیکال معادله به صورت زیر ساده می‌شود:",
        math: [
          "u_{\\xi\\eta} = 0"
        ]
      },
      {
        title: "حل معادله کانونیکال و استخراج جواب عمومی",
        text: "با دو بار انتگرال‌گیری پیاپی نسبت به $\\xi$ و $\\eta$:",
        math: [
          "u_\\xi = f_1(\\xi) \\implies u(\\xi, \\eta) = \\int f_1(\\xi) d\\xi + G(\\eta) = F(\\xi) + G(\\eta)",
          "u(x,y) = F(y + x) + G(y + 3x)"
        ]
      }
    ],
    finalAnswer: [
      "\\text{فرم کانونیکال: } u_{\\xi\\eta} = 0",
      "\\text{جواب عمومی: } u(x,y) = F(y + x) + G(y + 3x)"
    ],
    keyTakeaway: "هر معادله هذلولوی همگن مرتبه دوم با ضرایب ثابت را می‌توان به صورت برهم‌نهی دو موج مستقل در امتداد خطوط مشخصه نمایش داد."
  },
  {
    id: "pde-prob-11",
    chapterId: "pde",
    subTopic: "heat-equation",
    subTopicLabel: "معادله حرارت میله متناهی/نامتناهی",
    title: "حل معادله انتقال حرارت با چشمه تولید گرمای داخلی یکنواخت",
    difficulty: "hard",
    source: "کنکور کارشناسی ارشد مهندسی مکانیک ۱۴۰۲",
    sourceCategory: "konkur_arshad",
    statement: "معادله انتقال حرارت با چشمه تولید گرمای ثابت $Q_0$ به‌صورت زیر مفروض است:\n$$u_t = u_{xx} + Q_0 \\quad (0 < x < L, t > 0)$$\nبا شرایط مرزی دو انتهای صفر درجه $u(0,t) = u(L,t) = 0$ و دمای اولیه صفر $u(x,0) = 0$، پاسخ پایدار نهایی و حل کامل را بیابید.",
    hint: "پاسخ را به‌صورت $u(x,t) = v(x) + w(x,t)$ بنویسید که در آن $v(x)$ حالت پایا است و معادله $v''(x) + Q_0 = 0$ را ارضا می‌کند.",
    examTrap: "دقت کنید که چشمه گرما در معادله حالت پایا حضور دارد ($v'' = -Q_0$) ولی در معادله بخش گذرا ($w_t = w_{xx}$) حذف می‌شود.",
    steps: [
      {
        title: "حل معادله برای حالت دائم (پایا)",
        text: "در حالت دائم $u_t = 0$، معادله به یک ODE ساده تبدیل می‌شود:",
        math: [
          "v''(x) + Q_0 = 0 \\implies v''(x) = -Q_0",
          "v(x) = -\\frac{Q_0}{2} x^2 + C_1 x + C_2",
          "v(0) = 0 \\implies C_2 = 0",
          "v(L) = 0 \\implies -\\frac{Q_0}{2} L^2 + C_1 L = 0 \\implies C_1 = \\frac{Q_0 L}{2}",
          "v(x) = \\frac{Q_0}{2} x(L - x)"
        ]
      },
      {
        title: "تعیین معادله و شرایط اولیه بخش گذرا",
        text: "با جایگذاری $u = v + w$ در معادله اصلی:",
        math: [
          "w_t = w_{xx}, \\quad w(0,t) = w(L,t) = 0",
          "w(x,0) = u(x,0) - v(x) = -\\frac{Q_0}{2} x(L - x)"
        ]
      },
      {
        title: "محاسبه ضرایب فوریه بسط سینوسی بخش گذرا",
        text: "پاسخ گذرا به فرم سینوسی استاندارد است:",
        math: [
          "w(x,t) = \\sum_{n=1}^\\infty b_n \\sin\\left(\\frac{n\\pi x}{L}\\right) e^{-\\frac{n^2 \\pi^2}{L^2} t}",
          "b_n = \\frac{2}{L} \\int_0^L -\\frac{Q_0}{2} x(L - x) \\sin\\left(\\frac{n\\pi x}{L}\\right) dx = -\\frac{4Q_0 L^2}{n^3 \\pi^3} (1 - (-1)^n)",
          "b_{2k} = 0, \\quad b_{2k+1} = -\\frac{8Q_0 L^2}{(2k+1)^3 \\pi^3}"
        ]
      },
      {
        title: "نوشتن پاسخ کامل",
        text: "مجموع دو بخش پایا و گذرا:",
        math: [
          "u(x,t) = \\frac{Q_0}{2} x(L - x) - \\frac{8Q_0 L^2}{\\pi^3} \\sum_{k=0}^\\infty \\frac{1}{(2k+1)^3} \\sin\\left(\\frac{(2k+1)\\pi x}{L}\\right) e^{-\\frac{(2k+1)^2 \\pi^2}{L^2} t}"
        ]
      }
    ],
    finalAnswer: [
      "u(x,t) = \\frac{Q_0}{2} x(L - x) - \\frac{8Q_0 L^2}{\\pi^3} \\sum_{k=0}^{\\infty} \\frac{\\sin\\left(\\frac{(2k+1)\\pi x}{L}\\right)}{(2k+1)^3} e^{-\\frac{(2k+1)^2 \\pi^2}{L^2} t}"
    ],
    keyTakeaway: "چشمه داخلی توزیع دمای سهموی پایا ایجاد می‌کند و ماکزیمم دما در مرکز میله رخ می‌دهد: $u_{\\max} = \\frac{Q_0 L^2}{8}$."
  },
  {
    id: "pde-prob-12",
    chapterId: "pde",
    subTopic: "laplace-equation",
    subTopicLabel: "معادله لاپلاس دکارتی و قطبی",
    title: "معادله لاپلاس در نیم‌صفحه بالایی و استخراج فرمول انتگرال پواسون",
    difficulty: "hard",
    source: "پایان‌ترم ریاضی مهندسی دانشگاه صنعتی شریف - دانشکده برق (بهمن ۱۴۰۱)",
    sourceCategory: "university_exam",
    statement: "معادله پتانسیل لاپلاس $\\nabla^2 u = u_{xx} + u_{yy} = 0$ را در نیم‌صفحه بالایی ($-\\infty < x < \\infty, y > 0$) با شرط مرزی $u(x,0) = f(x)$ و شرط کرانداری $u \\to 0$ وقتی $y \\to \\infty$ با استفاده از تبدیل فوریه نسبت به $x$ حل کنید.",
    hint: "تبدیل فوریه را نسبت به متغیر $x$ اعمال کنید: $\\mathcal{F}\\{u_{xx}\\} = -\\omega^2 U(\\omega, y)$. این کار PDE را به یک ODE ساده مرتبه دوم برحسب $y$ تبدیل می‌کند.",
    examTrap: "هنگام حل معادله $U_{yy} - \\omega^2 U = 0$ ریشه‌ها $\\pm |\\omega|$ هستند. برای ارضای شرط کرانداری در $y \\to \\infty$ باید جمله با نمایی مثبت $e^{+|\\omega|y}$ حذف شود.",
    steps: [
      {
        title: "اعمال تبدیل فوریه نسبت به متغیر x",
        text: "با فرض $U(\\omega, y) = \\frac{1}{\\sqrt{2\\pi}} \\int_{-\\infty}^\\infty u(x,y) e^{-i\\omega x} dx$:",
        math: [
          "\\mathcal{F}\\{u_{xx} + u_{yy}\\} = (i\\omega)^2 U + U_{yy} = -\\omega^2 U + U_{yy} = 0",
          "\\frac{d^2 U}{dy^2} - \\omega^2 U = 0"
        ]
      },
      {
        title: "حل ODE و اعمال شرایط کرانداری در بی‌نهایت",
        text: "جواب عمومی برحسب $y$:",
        math: [
          "U(\\omega, y) = C_1(\\omega) e^{-|\\omega|y} + C_2(\\omega) e^{+|\\omega|y}",
          "\\lim_{y \\to \\infty} U(\\omega, y) = 0 \\implies C_2(\\omega) = 0 \\implies U(\\omega, y) = C_1(\\omega) e^{-|\\omega|y}"
        ]
      },
      {
        title: "اعمال شرط مرزی در y = 0",
        text: "در مرز $y=0$ داریم $U(\\omega, 0) = F(\\omega) = \\mathcal{F}\\{f(x)\\}$:",
        math: [
          "U(\\omega, y) = F(\\omega) e^{-|\\omega|y}"
        ]
      },
      {
        title: "اعمال قضیه کانولوشن و استخراج فرمول پواسون",
        text: "می‌دانیم تبدیل معکوس نمایی $e^{-|\\omega|y}$ برابر تابع کوشی است: $\\mathcal{F}^{-1}\\{e^{-|\\omega|y}\\} = \\sqrt{\\frac{2}{\\pi}} \\frac{y}{x^2 + y^2}$. طبق قضیه کانولوشن:",
        math: [
          "u(x,y) = \\frac{1}{\\pi} \\int_{-\\infty}^\\infty f(t) \\frac{y}{(x - t)^2 + y^2} dt"
        ]
      }
    ],
    finalAnswer: [
      "u(x,y) = \\frac{y}{\\pi} \\int_{-\\infty}^{\\infty} \\frac{f(t)}{(x - t)^2 + y^2} dt"
    ],
    keyTakeaway: "این رابطه مشهور به «فرمول انتگرال پواسون برای نیم‌صفحه» است و هسته پواسون $P(x,y) = \\frac{1}{\\pi} \\frac{y}{x^2 + y^2}$ نقش تقریب دلتای دیراک را در $y \\to 0^+$ ایفا می‌کند."
  },
  {
    id: "pde-prob-13",
    chapterId: "pde",
    subTopic: "wave-equation",
    subTopicLabel: "معادله موج ۱ بعدی و دالامبر",
    title: "ارتعاشات تار متناهی با یک انتهای ثابت و یک انتهای آزاد (شرایط مرزی مختلط)",
    difficulty: "hard",
    source: "کنکور کارشناسی ارشد مهندسی مکانیک و هوافضا ۱۳۹۸",
    sourceCategory: "konkur_arshad",
    statement: "معادله موج $u_{tt} = c^2 u_{xx}$ را در تار به طول $L$ در نظر بگیرید که در $x=0$ ثابت و در $x=L$ کاملاً آزاد است:\n$$u(0,t) = 0, \\quad u_x(L,t) = 0$$\nمقادیر ویژه $\\lambda_n$، فرکانس‌های زاویه‌ای طبیعی $\\omega_n$ و شکل مدهای نوسانی $X_n(x)$ را بیابید.",
    hint: "شرط انتهای آزاد به صورت $u_x(L,t) = 0$ است. بنابراین مشتق تابع ویژه مکانی در $L$ باید صفر شود که به فرکانس‌های مضارب فرد ربع‌موج منتهی می‌شود.",
    examTrap: "اشتباه رایج قرار دادن $\\sin(\\frac{n\\pi x}{L})$ به عنوان مدهاست. در شرایط مختلط (ثابت-آزاد) آرگومان سینوس مضارب فرد $\\frac{(2n-1)\\pi}{2L}$ است نه مضارب صحیح.",
    steps: [
      {
        title: "جداسازی متغیرها و تشکیل مسئله اشتورم-لیوویل",
        text: "با فرض $u(x,t) = X(x)T(t)$:",
        math: [
          "X'' + \\lambda^2 X = 0, \\quad X(0) = 0, \\quad X'(L) = 0",
          "X(x) = C_1 \\cos(\\lambda x) + C_2 \\sin(\\lambda x)"
        ]
      },
      {
        title: "اعمال شرط مرزی در x = 0",
        text: "از شرط تکیه‌گاه ثابت:",
        math: [
          "X(0) = 0 \\implies C_1 = 0 \\implies X(x) = C_2 \\sin(\\lambda x)"
        ]
      },
      {
        title: "اعمال شرط انتهای آزاد در x = L",
        text: "مشتق می‌گیریم و در $x=L$ صفر قرار می‌دهیم:",
        math: [
          "X'(x) = C_2 \\lambda \\cos(\\lambda x)",
          "X'(L) = C_2 \\lambda \\cos(\\lambda L) = 0"
        ]
      },
      {
        title: "استخراج مقادیر ویژه و مدهای طبیعی",
        text: "چون $C_2 \\ne 0$ و $\\lambda > 0$، باید کسینوس صفر شود:",
        math: [
          "\\lambda L = (2n - 1) \\frac{\\pi}{2} \\implies \\lambda_n = \\frac{(2n - 1)\\pi}{2L} \\quad (n = 1, 2, 3, \\dots)",
          "\\omega_n = c \\lambda_n = \\frac{(2n - 1)\\pi c}{2L}",
          "X_n(x) = \\sin\\left(\\frac{(2n - 1)\\pi x}{2L}\\right)"
        ]
      }
    ],
    finalAnswer: [
      "\\lambda_n = \\frac{(2n - 1)\\pi}{2L}, \\quad \\omega_n = \\frac{(2n - 1)\\pi c}{2L}",
      "X_n(x) = \\sin\\left(\\frac{(2n - 1)\\pi x}{2L}\\right) \\quad (n = 1, 2, 3, \\dots)"
    ],
    keyTakeaway: "سامانه‌های یک‌سر ثابت یک‌سر آزاد (مانند لوله‌های صوتی مسدود یا سازه‌های کنسولی) تنها دارای هارمونیک‌های فرد با مضرب ربع طول موج هستند."
  },
  {
    id: "pde-prob-14",
    chapterId: "pde",
    subTopic: "laplace-equation",
    subTopicLabel: "معادله لاپلاس دکارتی و قطبی",
    title: "معادله لاپلاس در خارج دیسک دایره‌ای با شرط کرانداری در بی‌نهایت",
    difficulty: "hard",
    source: "پایان‌ترم ریاضی مهندسی دانشگاه فردوسی مشهد - دی ۱۴۰۰",
    sourceCategory: "university_exam",
    statement: "معادله پتانسیل لاپلاس $\\nabla^2 u = 0$ را در ناحیه نامتناهی خارج دیسک دایره‌ای ($r > 2$) با شرایط زیر حل کنید:\n$$\\lim_{r \\to \\infty} u(r,\\theta) = 3, \\quad u(2, \\theta) = 3 + 4\\cos(\\theta) - 8\\sin(2\\theta)$$",
    hint: "در خارج دیسک، برای آنکه پتانسیل در $r \\to \\infty$ واگرا نشود، توان‌های مثبت $r^n$ باید صفر شوند و فقط توان‌های منفی $r^{-n}$ باقی بمانند.",
    examTrap: "دقت کنید که $\\lim_{r \\to \\infty} u = 3$ است نه صفر؛ بنابراین جمله ثابت $a_0$ برابر ۳ باقی می‌ماند.",
    steps: [
      {
        title: "ساختار جواب عمومی لاپلاس برای ناحیه خارجی",
        text: "با حذف توان‌های مثبت $r$ به دلیل شرط کرانداری در بی‌نهایت:",
        math: [
          "u(r, \\theta) = a_0 + \\sum_{n=1}^\\infty r^{-n} (a_n \\cos(n\\theta) + b_n \\sin(n\\theta))"
        ]
      },
      {
        title: "بررسی شرط در بی نهایت",
        text: "وقتی $r \\to \\infty$ تمام جملات $r^{-n} \\to 0$ می‌شوند:",
        math: [
          "\\lim_{r \\to \\infty} u(r, \\theta) = a_0 = 3"
        ]
      },
      {
        title: "تطبیق روی مرز دیسک r = 2",
        text: "روی مرز $r = 2$ داریم:",
        math: [
          "u(2, \\theta) = 3 + \\sum_{n=1}^\\infty 2^{-n} (a_n \\cos(n\\theta) + b_n \\sin(n\\theta)) = 3 + 4\\cos(\\theta) - 8\\sin(2\\theta)"
        ]
      },
      {
        title: "استخراج ضرایب با هم‌ارزی مستقیم",
        text: "با برابر قرار دادن ضرایب هارمونیک‌ها:",
        math: [
          "n = 1: \\quad 2^{-1} a_1 = 4 \\implies \\frac{a_1}{2} = 4 \\implies a_1 = 8",
          "n = 2: \\quad 2^{-2} b_2 = -8 \\implies \\frac{b_2}{4} = -8 \\implies b_2 = -32",
          "\\text{سایر ضرایب} = 0"
        ]
      },
      {
        title: "نوشتن پتانسیل نهایی",
        text: "با جاگذاری ضرایب:",
        math: [
          "u(r, \\theta) = 3 + 8 r^{-1} \\cos(\\theta) - 32 r^{-2} \\sin(2\\theta) = 3 + \\frac{8\\cos(\\theta)}{r} - \\frac{32\\sin(2\\theta)}{r^2}"
        ]
      }
    ],
    finalAnswer: [
      "u(r, \\theta) = 3 + \\frac{8\\cos(\\theta)}{r} - \\frac{32\\sin(2\\theta)}{r^2} \\quad (r \\ge 2)"
    ],
    keyTakeaway: "در مسائل الکترواستاتیک خارجی، پتانسیل با فاصله شعاعی به شکل چندقطبی ($1/r$ دوقطبی، $1/r^2$ چهارقطبی) افت می‌کند."
  }
];

export const PDE_QUIZ: QuizQuestion[] = [
  {
    id: "pq-1",
    chapterId: "pde",
    subTopic: "pde-classification",
    question: "معادله دیفرانسیل جزئی $4u_{xx} - 12u_{xy} + 9u_{yy} + u_x = 0$ در کدام دسته قرار می‌گیرد؟",
    options: [
      { id: 0, text: "بیضوی (Elliptic)" },
      { id: 1, text: "سهموی (Parabolic)" },
      { id: 2, text: "هذلولوی (Hyperbolic)" },
      { id: 3, text: "بسته به مقدار x تغییر می‌کند" }
    ],
    correctOption: 1,
    source: "کتاب ریاضیات مهندسی دکتر شیدفر - آزمون فصل ۳",
    difficulty: "easy",
    explanation: {
      summary: "با محاسبه مبین: $A=4, B=-12, C=9$. بنابراین $\\Delta = B^2 - 4AC = (-12)^2 - 4(4)(9) = 144 - 144 = 0$.",
      steps: [
        {
          title: "محاسبه مبین",
          text: "چون $\\Delta = 0$ است، معادله در تمام نقاط صفحه سهموی است."
        }
      ]
    }
  },
  {
    id: "pq-2",
    chapterId: "pde",
    subTopic: "heat-equation",
    question: "در معادله حرارت ۱ بعدی $u_t = c^2 u_{xx}$ با شرایط مرزی دو سر صفر، آهنگ میرا شدن مدهای نوسانی در طول زمان چگونه است؟",
    options: [
      { id: 0, text: "خطی با زمان (t-)" },
      { id: 1, text: "نوسانی سینوسی" },
      { id: 2, text: "نمایی به صورت $e^{-\\lambda_n^2 c^2 t}$ که مدهای بالاتر سریع‌تر میرا می‌شوند" },
      { id: 3, text: "بدون میرایی و با دامنه ثابت" }
    ],
    correctOption: 2,
    source: "میان‌ترم ریاضی مهندسی دانشگاه تهران - دی ۱۴۰۰",
    difficulty: "easy",
    explanation: {
      summary: "حل معادله ODE زمانی $\\frac{T'}{T} = -\\lambda^2 c^2$ به تابع نمایی نزولی $T(t) = e^{-\\lambda^2 c^2 t}$ منجر می‌شود.",
      steps: [
        {
          title: "میرا شدن مدهای بالاتر",
          text: "چون $\\lambda_n = \\frac{n\\pi}{L}$ با افزایش $n$ بزرگ‌تر می‌شود، توان منفی نمایی با سرعت بیشتری رشد کرده و هارمونیک‌های مرتبه بالا به سرعت محو می‌شوند."
        }
      ]
    }
  },
  {
    id: "pq-3",
    chapterId: "pde",
    subTopic: "wave-equation",
    question: "طبق فرمول دالامبر، جواب معادله موج $u_{tt} = c^2 u_{xx}$ برای ریسمان نامتناهی با جابجایی اولیه $f(x)$ و سرعت اولیه صفر کدام است؟",
    options: [
      { id: 0, math: "u(x,t) = f(x - ct) + f(x + ct)" },
      { id: 1, math: "u(x,t) = \\frac{1}{2} [f(x - ct) + f(x + ct)]" },
      { id: 2, math: "u(x,t) = f(x) \\cos(ct)" },
      { id: 3, math: "u(x,t) = \\frac{1}{2c} [f(x - ct) - f(x + ct)]" }
    ],
    correctOption: 1,
    source: "کتاب ریاضی مهندسی پارسه / دکتر معتقدی",
    difficulty: "easy",
    explanation: {
      summary: "فرمول دالامبر با سرعت اولیه صفر به میانگین دو موج رونده به راست و چپ با دامنه نصف تبدیل می‌شود.",
      steps: [
        {
          title: "فرمول دالامبر",
          text: "$u(x,t) = \\frac{1}{2}[f(x-ct) + f(x+ct)]$."
        }
      ],
      trap: "فراموش کردن ضریب $1/2$ در پشت پرانتز."
    }
  },
  {
    id: "pq-4",
    chapterId: "pde",
    subTopic: "laplace-equation",
    question: "قضیه مقدار میانگین گاوس برای معادله لاپلاس $\\nabla^2 u = 0$ در یک دیسک دایره‌ای به شعاع $R$ چه می‌گوید؟",
    options: [
      { id: 0, text: "مقدار پتانسیل در مرکز دیسک برابر صفر است" },
      { id: 1, text: "پتانسیل در مرکز دیسک برابر میانگین حسابی پتانسیل روی محیط دیسک است" },
      { id: 2, text: "ماکزیمم پتانسیل همواره در مرکز رخ می‌دهد" },
      { id: 3, text: "شیب پتانسیل روی مرز صفر است" }
    ],
    correctOption: 1,
    source: "کنکور کارشناسی ارشد مهندسی برق ۱۴۰۰",
    difficulty: "medium",
    explanation: {
      summary: "طبق قضیه میانگین لاپلاس: $u(0,0) = \\frac{1}{2\\pi} \\int_0^{2\\pi} u(R, \\theta) d\\theta$.",
      steps: [
        {
          title: "نتیجه قضیه میانگین",
          text: "اگر پتانسیل روی مرز معلوم باشد، مقدار آن در مرکز بدون حل کامل مسئله صرفاً با یک میانگین‌گیری به دست می‌آید."
        }
      ]
    }
  },
  {
    id: "pq-5",
    chapterId: "pde",
    subTopic: "heat-equation",
    question: "در یک میله به طول $L$ با دو انتهای عایق، شرط مرزی حاکم بر دو سر میله کدام است؟",
    options: [
      { id: 0, math: "u(0,t) = u(L,t) = 0" },
      { id: 1, math: "u_x(0,t) = u_x(L,t) = 0" },
      { id: 2, math: "u_t(0,t) = u_t(L,t) = 0" },
      { id: 3, math: "u_{xx}(0,t) = 0" }
    ],
    correctOption: 1,
    source: "پایان‌ترم دانشگاه صنعتی امیرکبیر - بهمن ۱۴۰۰",
    difficulty: "easy",
    explanation: {
      summary: "طبق قانون فوریه در هدایت حرارت، شار حرارتی متناسب با گرادیان دما $q = -k u_x$ است. عایق بودن یعنی شار صفر است، پس $u_x = 0$.",
      steps: [
        {
          title: "شرایط نویمان",
          text: "شرط مرزی عایق یک شرط نویمان همگن روی مشتق مکانی است: $u_x(0,t) = u_x(L,t) = 0$."
        }
      ]
    }
  },
  {
    id: "pq-6",
    chapterId: "pde",
    subTopic: "wave-equation",
    question: "انرژی کل یک تار مرتعش به طول $L$ با دو انتهای ثابت در طول زمان چگونه تغییر می‌کند؟ (با فرض عدم وجود اصطکاک و میرایی)",
    options: [
      { id: 0, text: "با زمان به صورت نمایی میرا می‌شود" },
      { id: 1, text: "به طور خطی با زمان رشد می‌کند" },
      { id: 2, text: "ثابت می‌ماند (پایستگی انرژی)" },
      { id: 3, text: "با فرکانس مد اول نوسان می‌کند" }
    ],
    correctOption: 2,
    source: "کتاب ریاضیات مهندسی دکتر شیدفر - مسائل فصل ۴",
    difficulty: "medium",
    explanation: {
      summary: "انرژی کل $E = \\frac{1}{2} \\int_0^L [u_t^2 + c^2 u_x^2] dx$ است و مشتق زمانی آن با استفاده از معادله موج و شرایط مرزی همگن صفر می‌شود.",
      steps: [
        {
          title: "پایستگی انرژی",
          text: "$\\frac{dE}{dt} = \\int_0^L (u_t u_{tt} + c^2 u_x u_{xt}) dx = [c^2 u_x u_t]_0^L = 0$ چون $u(0,t)=u(L,t)=0$ و $u_t=0$ روی مرزها."
        }
      ]
    }
  },
  {
    id: "pq-7",
    chapterId: "pde",
    subTopic: "separation-variables",
    question: "در روش جداسازی متغیرها برای حل $u_t = c^2 u_{xx}$ با فرض $u(x,t) = X(x)T(t)$، چرا ثابت جداسازی باید منفی ($-\\lambda^2$) انتخاب شود؟",
    options: [
      { id: 0, text: "تا جواب زمانی با گذشت زمان کراندار مانده و واگرا نشود ($T(t) \\to 0$)" },
      { id: 1, text: "تا شرایط مرزی غیرخطی ارضا شوند" },
      { id: 2, text: "چون فرکانس همیشه مقداری منفی است" },
      { id: 3, text: "تا توابع مکانی هایپربولیک به دست آیند" }
    ],
    correctOption: 0,
    source: "میان‌ترم ریاضی مهندسی دانشگاه صنعتی شریف - آبان ۱۴۰۱",
    difficulty: "medium",
    explanation: {
      summary: "اگر ثابت جداسازی مثبت باشد ($+\\lambda^2$)، پاسخ زمانی $T(t) = e^{+\\lambda^2 c^2 t}$ خواهد شد که در $t \\to \\infty$ بی‌نهایت می‌شود و از نظر فیزیکی غیرممکن است.",
      steps: [
        {
          title: "پایداری فیزیکی",
          text: "برای پایداری فرآیند انتشار حرارت، ثابت جداسازی باید منفی باشد تا $T(t) = e^{-\\lambda^2 c^2 t}$ میرا شود."
        }
      ]
    }
  },
  {
    id: "pq-8",
    chapterId: "pde",
    subTopic: "laplace-equation",
    question: "اصل ماکزیمم (Maximum Principle) برای معادله لاپلاس در یک ناحیه بسته و کراندار $D$ چه نتیجه‌ای می‌دهد؟",
    options: [
      { id: 0, text: "مقدار ماکزیمم و مینیمم تابع در مرکز هندسی ناحیه رخ می‌دهد" },
      { id: 1, text: "مقدار ماکزیمم و مینیمم تابع همساز الزماً روی مرز ناحیه ($\\partial D$) رخ می‌دهد مگر آنکه تابع ثابت باشد" },
      { id: 2, text: "مقدار ماکزیمم تابع در بی‌نهایت رخ می‌دهد" },
      { id: 3, text: "انتگرال تابع روی ناحیه همواره صفر است" }
    ],
    correctOption: 1,
    source: "کنکور کارشناسی ارشد مهندسی مکانیک ۱۴۰۱",
    difficulty: "hard",
    explanation: {
      summary: "توابع همساز (جواب‌های لاپلاس) نمی‌توانند ماکزیمم یا مینیمم موضعی اکید در درون ناحیه داشته باشند زیرا ماتریس هسین آن‌ها اثر صفر دارد.",
      steps: [
        {
          title: "اصل ماکزیمم",
          text: "اگر $u$ همساز باشد، ماکزیمم و مینیمم آن حتماً روی مرز واقع هستند."
        }
      ]
    }
  },
  {
    id: "pq-9",
    chapterId: "pde",
    subTopic: "wave-equation",
    question: "در یک تار مرتعش به طول $L = \\pi$ با دو انتهای ثابت و $c = 1$، فرکانس مد سوم ارتعاشی چند رادیان بر ثانیه است؟",
    options: [
      { id: 0, text: "۱ رادیان بر ثانیه" },
      { id: 1, text: "۳ رادیان بر ثانیه" },
      { id: 2, text: "۹ رادیان بر ثانیه" },
      { id: 3, text: "۶ رادیان بر ثانیه" }
    ],
    correctOption: 1,
    source: "کتاب ریاضی مهندسی دکتر آقاسی - جلد ۲",
    difficulty: "easy",
    explanation: {
      summary: "فرکانس‌های زاویه‌ای طبیعی ارتعاشات تار از رابطه $\\omega_n = \\frac{n\\pi c}{L}$ به دست می‌آیند.",
      steps: [
        {
          title: "محاسبه",
          text: "با $L = \\pi$ و $c = 1$ و $n = 3$: $\\omega_3 = \\frac{3\\pi (1)}{\\pi} = 3$ rad/s."
        }
      ]
    }
  },
  {
    id: "pq-10",
    chapterId: "pde",
    subTopic: "pde-classification",
    question: "خطوط مشخصه معادله انتقال موج یک‌طرفه $u_t + 3u_x = 0$ در صفحه $(x,t)$ کدام خطوط هستند؟",
    options: [
      { id: 0, text: "$x - 3t = C$ با شیب $\\frac{dt}{dx} = \\frac{1}{3}$" },
      { id: 1, text: "$x + 3t = C$" },
      { id: 2, text: "$3x - t = C$" },
      { id: 3, text: "$x^2 + t^2 = C$" }
    ],
    correctOption: 0,
    source: "کنکور کارشناسی ارشد مهندسی برق ۱۴۰۲",
    difficulty: "hard",
    explanation: {
      summary: "معادله مشخصه به‌صورت $\\frac{dx}{dt} = 3 \\implies dx - 3dt = 0 \\implies x - 3t = C$ است.",
      steps: [
        {
          title: "خطوط مشخصه",
          text: "در امتداد خطوط $x - 3t = C$، مقدار تابع $u$ ثابت می‌ماند؛ در نتیجه جواب عمومی $u(x,t) = f(x - 3t)$ است."
        }
      ]
    }
  }
];

export const PDE_FORMULAS: FormulaItem[] = [
  {
    id: "p-1",
    title: "دسته‌بندی معادلات مرتبه دوم با دو متغیر",
    category: "دسته‌بندی",
    latex: "A u_{xx} + B u_{xy} + C u_{yy} + D u_x + E u_y + F u = G, \\quad \\Delta = B^2 - 4AC",
    description: "Δ > 0: هذلولوی (مانند معادله موج) | Δ = 0: سهموی (مانند معادله حرارت) | Δ < 0: بیضوی (مانند معادله لاپلاس)."
  },
  {
    id: "p-2",
    title: "معادله موج ۱ بعدی و فرمول دالامبر",
    category: "معادله موج",
    latex: "u_{tt} = c^2 u_{xx}, \\quad u(x,t) = \\frac{1}{2}[f(x-ct) + f(x+ct)] + \\frac{1}{2c} \\int_{x-ct}^{x+ct} g(s) ds",
    description: "حل ریسمان نامتناهی با جابجایی اولیه f(x) و سرعت اولیه g(x) به صورت برهم‌نهی دو موج رونده چپ و راست.",
    tag: "کلیدی امتحانی"
  },
  {
    id: "p-3",
    title: "معادله رسانش حرارت در میله متناهی",
    category: "معادله حرارت",
    latex: "u_t = c^2 u_{xx}, \\quad u(x,t) = \\sum_{n=1}^\\infty c_n \\sin\\left(\\frac{n\\pi x}{L}\\right) e^{-\\left(\\frac{n\\pi c}{L}\\right)^2 t}",
    description: "پاسخ معادله حرارت با شرایط مرزی دیریکله صفر u(0,t)=u(L,t)=0 و ضرایب حاصل از بسط سینوسی دمای اولیه.",
    conditions: "c_n = (2/L) \\int_0^L f(x) \\sin(n\\pi x / L) dx"
  },
  {
    id: "p-4",
    title: "معادله حرارت با شرایط مرزی عایق (نویمان)",
    category: "معادله حرارت",
    latex: "u_x(0,t) = u_x(L,t) = 0 \\implies u(x,t) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty a_n \\cos\\left(\\frac{n\\pi x}{L}\\right) e^{-\\left(\\frac{n\\pi c}{L}\\right)^2 t}",
    description: "عدم تبادل حرارت با محیط منجر به پایه‌های کسینوسی و بقای دمای میانگین میله a0/2 می‌شود."
  },
  {
    id: "p-5",
    title: "معادله لاپلاس در مختصات قطبی درون دیسک",
    category: "معادله لاپلاس",
    latex: "u_{rr} + \\frac{1}{r} u_r + \\frac{1}{r^2} u_{\\theta\\theta} = 0 \\implies u(r,\\theta) = a_0 + \\sum_{n=1}^\\infty r^n (a_n \\cos(n\\theta) + b_n \\sin(n\\theta))",
    description: "پتانسیل پایدار درون دیسک به شعاع R؛ به دلیل کرانداری در مبدأ جملات توان منفی و لگاریتمی حذف می‌شوند."
  },
  {
    id: "p-6",
    title: "معادله لاپلاس در مختصات قطبی خارج دیسک",
    category: "معادله لاپلاس",
    latex: "u(r,\\theta) = a_0 + \\sum_{n=1}^\\infty r^{-n} (a_n \\cos(n\\theta) + b_n \\sin(n\\theta))",
    description: "پتانسیل پایدار در خارج دیسک شعاع R؛ برای کرانداری در بی‌نهایت تنها توان‌های منفی r مجاز هستند."
  },
  {
    id: "p-7",
    title: "فرمول انتگرال پواسون برای نیم‌صفحه",
    category: "انتگرال پواسون",
    latex: "u(x,y) = \\frac{y}{\\pi} \\int_{-\\infty}^\\infty \\frac{f(t)}{(x - t)^2 + y^2} dt \\quad (y > 0)",
    description: "حل معادله لاپلاس در نیم‌صفحه بالایی با شرط مرزی u(x,0) = f(x) با کانولوشن پتانسیل با هسته پواسون."
  }
];
