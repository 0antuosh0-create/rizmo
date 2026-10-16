import React, { useState } from "react";
import {
  GraduationCap,
  Layers,
  Flame,
  Compass,
  Hourglass,
  Calculator,
  Target,
  ListChecks,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { ChapterId } from "../types";
import { CHAPTERS, getQuizByChapter } from "../data";
import { ChapterQuiz } from "../components/ChapterQuiz";
import { fa } from "../components/Math";

const examTips = [
  {
    icon: Hourglass,
    title: "مدیریت زمان در آزمون ریاضی مهندسی",
    text: "در مسائل بسط فوریه، ابتدا تقارن تابع (زوج، فرد، یا نیم‌موج) را چک کنید تا نیمی از انتگرال‌ها مستقیماً صفر شوند و زمان ارزشمند آزمون تلف نشود.",
  },
  {
    icon: Calculator,
    title: "محاسبه انتگرال حقیقی با روش مانده‌ها",
    text: "در کسرها دقت کنید فقط قطب‌هایی که درون کانتور بسته واقع هستند (مثلاً در نیم‌صفحه بالایی Im(z)>0 یا درون دایره واحد |z|<1) در محاسبه مجموع مانده‌ها وارد شوند.",
  },
  {
    icon: Target,
    title: "تشخیص فوری نوع PDE با مبین B² - 4AC",
    text: "ضریب B همیشه ضریب جمله مشتق آمیخته u_xy است. اگر این جمله در معادله وجود نداشته باشد، B=0 است. برای معادلات هذلولوی حتماً Δ > 0 است.",
  },
  {
    icon: ListChecks,
    title: "شرایط مرزی در معادله حرارت و موج",
    text: "شرایط مرزی دو سر صفر (دیریکله) به بسط سینوسی، و شرایط مرزی انتهای عایق یا آزاد (نویمان) به بسط کسینوسی به همراه جمله ثابت a0/2 منجر می‌شوند.",
  },
];

export const ExamView: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<ChapterId>("fourier");

  const chapterInfo = CHAPTERS.find((c) => c.id === selectedChapter) || CHAPTERS[0];
  const questions = getQuizByChapter(selectedChapter);

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner with Warm Personality */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-card p-5 sm:p-6 shadow-sm">
        <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white shadow-xs font-black">
              <GraduationCap size={20} />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight">
                مرکز آزمون‌های خودسنجی تستی و کنکور
              </h1>
              <p className="text-xs sm:text-sm text-soft font-medium">
                ۳۰ تست تحلیلی و محاسباتی با منابع دقیق کنکور ارشد برق، مکانیک و آزمون‌های دانشگاه‌های برتر
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-bold text-orange-600 dark:text-orange-300 shadow-xs">
            <Sparkles size={14} />
            <span>۱۰ تست در هر فصل با تحلیل تشریحی</span>
          </div>
        </div>

        {/* Chapter Selection for Exam with Warm Glow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CHAPTERS.map((ch) => {
            const isSelected = selectedChapter === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setSelectedChapter(ch.id)}
                className={`p-3.5 rounded-2xl border text-start transition-all cursor-pointer ${
                  isSelected
                    ? "border-orange-500/50 bg-gradient-to-br from-amber-500/15 via-orange-500/05 to-transparent text-orange-600 dark:text-orange-300 font-bold shadow-xs scale-[1.01]"
                    : "border-line bg-card2 hover:bg-card text-soft hover:text-ink"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-lg border text-xs font-bold ${
                    isSelected ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white border-orange-500 shadow-xs" : "bg-card border-line text-ink"
                  }`}>
                    {ch.id === "fourier" ? <Layers size={13} /> : ch.id === "pde" ? <Flame size={13} /> : <Compass size={13} />}
                  </span>
                  <span className="text-xs font-bold">آزمون فصل {fa(ch.number)}</span>
                </div>
                <h3 className="text-sm font-black text-ink">{ch.title}</h3>
              </button>
            );
          })}
        </div>
      </div>

      {/* Exam Strategy Tips with Warm Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {examTips.map((tip, idx) => {
          const Icon = tip.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-line bg-card p-4 shadow-xs space-y-1.5 hover:border-orange-500/30 transition-colors"
            >
              <div className="flex items-center gap-2 text-ink">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Icon size={14} />
                </span>
                <h4 className="text-xs sm:text-sm font-bold">{tip.title}</h4>
              </div>
              <p className="text-xs leading-6 text-soft font-medium">{tip.text}</p>
            </div>
          );
        })}
      </div>

      {/* Active Chapter Quiz */}
      <ChapterQuiz
        key={selectedChapter}
        chapterId={selectedChapter}
        chapterTitle={chapterInfo.title}
        questions={questions}
      />
    </div>
  );
};
