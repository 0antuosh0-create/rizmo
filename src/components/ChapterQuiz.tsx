import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  HelpCircle,
  Clock,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  ChevronDown,
  Lightbulb,
  Check,
  SendHorizontal,
} from "lucide-react";
import { QuizQuestion, ChapterId } from "../types";
import { T, M, MB, MathLines, fa } from "./Math";

interface ChapterQuizProps {
  chapterId: ChapterId;
  chapterTitle: string;
  questions: QuizQuestion[];
}

export const ChapterQuiz: React.FC<ChapterQuizProps> = ({
  chapterId,
  chapterTitle,
  questions,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [expandedExplanations, setExpandedExplanations] = useState<Record<string, boolean>>({});
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Reset state on chapter switch
  useEffect(() => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setExpandedExplanations({});
    setTimerSeconds(0);
    setIsTimerRunning(true);
  }, [chapterId]);

  // Timer
  useEffect(() => {
    let interval: number | undefined;
    if (isTimerRunning && !isSubmitted) {
      interval = window.setInterval(() => {
        setTimerSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning, isSubmitted]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${fa(String(m).padStart(2, "0"))}:${fa(String(s).padStart(2, "0"))}`;
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const toggleExplanation = (questionId: string) => {
    setExpandedExplanations((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Score calculation
  const correctCount = questions.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctOption ? acc + 1 : acc;
  }, 0);

  const scoreOutOf20 = (correctCount / questions.length) * 20;
  const scorePercent = Math.round((correctCount / questions.length) * 100);

  const handleSubmit = () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);
    // Expand all explanations
    const allExp: Record<string, boolean> = {};
    for (const q of questions) {
      allExp[q.id] = true;
    }
    setExpandedExplanations(allExp);

    // Trigger confetti if high score
    if (scorePercent >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    // Scroll smoothly to results
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setExpandedExplanations({});
    setTimerSeconds(0);
    setIsTimerRunning(true);
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="space-y-6">
      {/* Quiz Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-card p-5 sm:p-6 shadow-sm">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xs font-bold">
              <Award size={20} />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-ink tracking-tight">
                آزمون خودسنجی تستی: {chapterTitle}
              </h2>
              <p className="text-xs text-soft font-medium">
                ۱۰ تست محاسباتی با منابع مستند دانشگاه‌های برتر و کنکور کارشناسی ارشد
              </p>
            </div>
          </div>

          {/* Action Bar (Timer, Reset, Submit Button in Header) */}
          <div className="flex flex-wrap items-center gap-2.5 ms-auto">
            <div className="flex items-center gap-2 rounded-xl border border-line bg-card2 px-3 py-1.5 shadow-xs">
              <Clock size={15} className={isTimerRunning && !isSubmitted ? "text-violet-500 animate-pulse" : "text-faint"} />
              <span className="font-sans text-xs font-bold text-ink tabular-nums">
                {formatTimer(timerSeconds)}
              </span>
            </div>

            <button
              onClick={handleReset}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-line bg-card hover:bg-card2 px-3 py-1.5 text-xs font-bold text-soft hover:text-ink shadow-xs transition-all active:scale-95"
              title="شروع مجدد آزمون"
            >
              <RotateCcw size={13} />
              <span>ریست</span>
            </button>

            {!isSubmitted && (
              <button
                onClick={handleSubmit}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-1.5 text-xs font-bold shadow-xs transition-all active:scale-95"
              >
                <SendHorizontal size={14} />
                <span>ثبت آزمون</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Banner when Submitted */}
        {isSubmitted && (
          <div className="rounded-xl border border-line bg-card2/80 p-4 mb-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-white font-bold text-base shadow-xs ${
                    scorePercent >= 70 ? "bg-emerald-600" : scorePercent >= 40 ? "bg-amber-600" : "bg-rose-600"
                  }`}
                >
                  {fa(scorePercent)}٪
                </span>
                <div>
                  <h3 className="text-base font-black text-ink">
                    نمره نهایی: {fa(scoreOutOf20.toFixed(1))} از ۲۰
                  </h3>
                  <p className="text-xs text-soft font-bold">
                    پاسخ‌های صحیح: {fa(correctCount)} از {fa(questions.length)} سوال
                  </p>
                </div>
              </div>

              <div className="text-xs font-bold">
                {scorePercent >= 80 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-1">
                    <Sparkles size={14} />
                    عالی! تسلط کامل بر مباحث و محاسبات این فصل.
                  </span>
                ) : scorePercent >= 50 ? (
                  <span className="text-amber-600 dark:text-amber-400 font-bold">
                    خوب است! حل‌های تشریحی زیر را برای تحلیل اشتباهات مرور کنید.
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 font-bold">
                    نیاز به تمرین بیشتر و مرور فرمول‌های کلیدی فصل.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Answered Progress Indicator */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-soft">
            <span>تعداد سوالات پاسخ‌داده‌شده:</span>
            <span>
              {fa(answeredCount)} از {fa(questions.length)} سوال
            </span>
          </div>
          <div className="h-2 rounded-full bg-card2 border border-line overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-violet-600 to-emerald-400 transition-all duration-300"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q, qIndex) => {
          const selectedOption = selectedAnswers[q.id];
          const isCorrect = selectedOption === q.correctOption;
          const showAnswer = isSubmitted;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border bg-card p-4 sm:p-5 shadow-xs transition-all ${
                isSubmitted
                  ? isCorrect
                    ? "border-emerald-500/60 bg-emerald-500/[0.03]"
                    : "border-rose-500/60 bg-rose-500/[0.03]"
                  : "border-line hover:border-violet-500/30"
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/25 text-violet-600 dark:text-violet-300 text-xs font-bold">
                    {fa(qIndex + 1)}
                  </span>
                  <span className="text-xs font-bold text-ink">تست شماره {fa(qIndex + 1)}</span>
                </div>

                {/* Source Badge */}
                <span className="inline-flex items-center gap-1 rounded-lg border border-line bg-card2 px-2.5 py-0.5 text-[11px] font-medium text-soft">
                  <Award size={12} className="text-violet-500" />
                  <span>{q.source}</span>
                </span>
              </div>

              {/* Question Body */}
              <div className="mb-4 text-[14.5px] font-bold text-ink leading-8">
                <p>
                  <T text={q.question} />
                </p>
                {q.questionMath && <MathLines lines={q.questionMath} className="mt-2" />}
              </div>

              {/* 4 Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isThisCorrect = q.correctOption === optIdx;

                  let optStyle = "border-line bg-card2/40 hover:bg-card2 hover:border-violet-500/40 text-ink";
                  if (showAnswer) {
                    if (isThisCorrect) {
                      optStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 font-bold shadow-xs";
                    } else if (isSelected && !isThisCorrect) {
                      optStyle = "border-rose-500 bg-rose-500/15 text-rose-800 dark:text-rose-200 font-medium";
                    }
                  } else if (isSelected) {
                    optStyle = "border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-300 font-bold shadow-xs ring-1 ring-violet-500/30";
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-start transition-all cursor-pointer ${optStyle}`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-line bg-card text-xs font-bold">
                        {fa(optIdx + 1)}
                      </span>
                      <div className="text-xs sm:text-[13px] leading-6 flex-1 min-w-0">
                        {opt.text && <T text={opt.text} />}
                        {opt.math && <M tex={opt.math} />}
                      </div>
                      {showAnswer && isThisCorrect && (
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      )}
                      {showAnswer && isSelected && !isThisCorrect && (
                        <XCircle size={16} className="text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Toggle Explanation Button (if submitted) */}
              {isSubmitted && (
                <div className="border-t border-line pt-3 mt-3">
                  <button
                    onClick={() => toggleExplanation(q.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline cursor-pointer"
                  >
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${expandedExplanations[q.id] ? "rotate-180" : ""}`}
                    />
                    <span>{expandedExplanations[q.id] ? "بستن تحلیل تست" : "مشاهده تحلیل و گام‌های حل تشریحی"}</span>
                  </button>

                  {/* Expanded Explanation */}
                  {expandedExplanations[q.id] && (
                    <div className="mt-3 space-y-3 rounded-xl border border-line bg-card2/60 p-3.5 sm:p-4 text-xs sm:text-[13px] leading-7">
                      <div className="font-bold text-ink">
                        <span className="font-bold text-violet-600 dark:text-violet-400 flex items-center gap-1 mb-1">
                          <Lightbulb size={14} />
                          ایده و تحلیل مفهومی تست:
                        </span>
                        <T text={q.explanation.summary} />
                      </div>

                      {q.explanation.steps.map((st, i) => (
                        <div key={i} className="rounded-lg bg-card p-3 border border-line space-y-1">
                          <p className="font-bold text-ink">{st.title}</p>
                          {st.text && <p className="text-soft font-medium"><T text={st.text} /></p>}
                          {st.math && <MathLines lines={st.math} />}
                        </div>
                      ))}

                      {q.explanation.trap && (
                        <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 p-2.5 text-ink border border-amber-500/30">
                          <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-1" />
                          <div>
                            <span className="font-bold block text-amber-700 dark:text-amber-300">دام تستی:</span>
                            <span className="font-medium text-soft">{q.explanation.trap}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Natural Bottom Completion Card */}
      {!isSubmitted && (
        <div className="rounded-2xl border border-line bg-card p-6 shadow-sm text-center space-y-3 mt-6">
          <div className="flex items-center justify-center gap-2 text-ink font-bold text-sm">
            <CheckCircle2 size={18} className="text-violet-500" />
            <span>پایان سوالات آزمون این فصل</span>
          </div>

          <p className="text-xs text-soft font-medium">
            شما به {fa(answeredCount)} سوال از {fa(questions.length)} سوال پاسخ داده‌اید. برای ثبت نهایی و مشاهده درصد و کارنامه روی دکمه زیر کلیک کنید.
          </p>

          <button
            onClick={handleSubmit}
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-7 py-3 text-sm font-bold shadow-sm transition-all active:scale-95"
          >
            <SendHorizontal size={16} />
            <span>ثبت نهایی و مشاهده کارنامه آزمون ({fa(answeredCount)} از ۱۰)</span>
          </button>
        </div>
      )}
    </div>
  );
};
