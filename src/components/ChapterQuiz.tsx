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
    if (scorePercent >= 60) {
      confetti({
        particleCount: 85,
        spread: 75,
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
      {/* Quiz Header Banner with Tactile 2px Border */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-line bg-card p-5 sm:p-6 shadow-sm">
        <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-line pb-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-line bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white shadow-xs font-black">
              <Award size={20} />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-ink tracking-tight">
                آزمون خودسنجی تستی: {chapterTitle}
              </h2>
              <p className="text-xs text-soft font-bold">
                ۱۰ تست محاسباتی با منابع مستند دانشگاه‌های برتر و کنکور کارشناسی ارشد
              </p>
            </div>
          </div>

          {/* Action Bar (Timer, Reset, Submit Button in Header) */}
          <div className="flex flex-wrap items-center gap-2.5 ms-auto">
            <div className="flex items-center gap-2 rounded-xl border-2 border-line bg-card2 px-3 py-1.5 shadow-xs">
              <Clock size={15} className={isTimerRunning && !isSubmitted ? "text-orange-500 animate-pulse" : "text-faint"} />
              <span className="font-sans text-xs font-black text-ink tabular-nums">
                {formatTimer(timerSeconds)}
              </span>
            </div>

            <button
              onClick={handleReset}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border-2 border-line bg-card hover:bg-card2 px-3.5 py-1.5 text-xs font-black text-soft hover:text-ink shadow-xs transition-all active:translate-x-0.5 active:translate-y-0.5"
              title="شروع مجدد آزمون"
            >
              <RotateCcw size={13} />
              <span>ریست</span>
            </button>

            {!isSubmitted && (
              <button
                onClick={handleSubmit}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border-2 border-line bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-1.5 text-xs font-black shadow-xs transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <SendHorizontal size={14} />
                <span>ثبت آزمون</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Banner when Submitted */}
        {isSubmitted && (
          <div className="rounded-2xl border-2 border-line bg-gradient-to-br from-card2 via-card2/80 to-card p-5 mb-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-line text-white font-black text-lg shadow-sm ${
                    scorePercent >= 70
                      ? "bg-gradient-to-br from-emerald-500 to-teal-600"
                      : scorePercent >= 40
                      ? "bg-gradient-to-br from-amber-500 to-orange-500"
                      : "bg-gradient-to-br from-rose-500 to-pink-600"
                  }`}
                >
                  {fa(scorePercent)}٪
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-ink">
                    کارنامه نهایی: {fa(scoreOutOf20.toFixed(1))} از ۲۰
                  </h3>
                  <p className="text-xs text-soft font-bold mt-0.5">
                    پاسخ‌های صحیح: {fa(correctCount)} از {fa(questions.length)} سوال
                  </p>
                </div>
              </div>

              <div className="text-xs font-bold">
                {scorePercent >= 80 ? (
                  <span className="text-emerald-800 dark:text-emerald-300 font-black inline-flex items-center gap-1.5 bg-emerald-500/15 px-3 py-1.5 rounded-xl border-2 border-line shadow-xs">
                    <Sparkles size={15} />
                    فوق‌العاده بود! تسلط کامل بر مفاهیم و فرمول‌های این فصل.
                  </span>
                ) : scorePercent >= 50 ? (
                  <span className="text-amber-900 dark:text-amber-200 font-bold inline-flex items-center gap-1 bg-amber-500/15 px-3 py-1.5 rounded-xl border-2 border-line shadow-xs">
                    آفرین! حل‌های تشریحی زیر رو بررسی کن تا تله‌های تستی کامل برات جا بیفته.
                  </span>
                ) : (
                  <span className="text-rose-900 dark:text-rose-200 font-bold inline-flex items-center gap-1 bg-rose-500/15 px-3 py-1.5 rounded-xl border-2 border-line shadow-xs">
                    اشکالی نداره! فرمول‌های تقلب‌نامه رو یک‌بار مرور کن و دوباره بزن.
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
          <div className="h-3 rounded-full bg-card2 border-2 border-line overflow-hidden shadow-xs">
            <div
              className="h-full bg-gradient-to-l from-amber-400 via-orange-500 to-emerald-400 transition-all duration-300"
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
              className={`rounded-2xl border-2 border-line bg-card p-4 sm:p-5 shadow-xs transition-all ${
                isSubmitted
                  ? isCorrect
                    ? "bg-emerald-500/[0.04]"
                    : "bg-rose-500/[0.04]"
                  : "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sm"
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-line pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg border-2 border-line bg-amber-400/25 text-orange-900 dark:text-orange-200 text-xs font-black shadow-xs">
                    {fa(qIndex + 1)}
                  </span>
                  <span className="text-xs font-black text-ink">تست شماره {fa(qIndex + 1)}</span>
                </div>

                {/* Source Badge */}
                <span className="inline-flex items-center gap-1 rounded-xl border-2 border-line bg-card2 px-2.5 py-0.5 text-[11px] font-bold text-soft shadow-xs">
                  <Award size={12} className="text-orange-500" />
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

              {/* 4 Options with Tactile Neo-Brutalist Feel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isThisCorrect = q.correctOption === optIdx;

                  let optStyle = "border-2 border-line bg-card2/40 hover:bg-card2 text-ink shadow-xs";
                  if (showAnswer) {
                    if (isThisCorrect) {
                      optStyle = "border-2 border-line bg-emerald-500/20 text-emerald-950 dark:text-emerald-200 font-black shadow-sm";
                    } else if (isSelected && !isThisCorrect) {
                      optStyle = "border-2 border-line bg-rose-500/20 text-rose-950 dark:text-rose-200 font-bold shadow-xs";
                    }
                  } else if (isSelected) {
                    optStyle = "border-2 border-line bg-amber-400/30 text-orange-950 dark:text-orange-200 font-black shadow-sm -translate-x-0.5 -translate-y-0.5";
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl text-start transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5 ${optStyle}`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 border-line bg-card text-xs font-black shadow-xs">
                        {fa(optIdx + 1)}
                      </span>
                      <div className="text-xs sm:text-[13px] leading-6 flex-1 min-w-0">
                        {opt.text && <T text={opt.text} />}
                        {opt.math && <M tex={opt.math} />}
                      </div>
                      {showAnswer && isThisCorrect && (
                        <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {showAnswer && isSelected && !isThisCorrect && (
                        <XCircle size={16} className="text-rose-600 dark:text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Toggle Explanation Button (if submitted) */}
              {isSubmitted && (
                <div className="border-t-2 border-line pt-3 mt-3">
                  <button
                    onClick={() => toggleExplanation(q.id)}
                    className="flex items-center gap-1.5 text-xs font-black text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
                  >
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${expandedExplanations[q.id] ? "rotate-180" : ""}`}
                    />
                    <span>{expandedExplanations[q.id] ? "بستن تحلیل تست" : "مشاهده تحلیل و گام‌های حل تشریحی"}</span>
                  </button>

                  {/* Expanded Explanation */}
                  {expandedExplanations[q.id] && (
                    <div className="mt-3 space-y-3 rounded-2xl border-2 border-line bg-card2/60 p-4 text-xs sm:text-[13px] leading-7 shadow-xs">
                      <div className="font-bold text-ink">
                        <span className="font-black text-orange-600 dark:text-orange-400 flex items-center gap-1 mb-1">
                          <Lightbulb size={14} />
                          ایده و تحلیل مفهومی تست:
                        </span>
                        <T text={q.explanation.summary} />
                      </div>

                      {q.explanation.steps.map((st, i) => (
                        <div key={i} className="rounded-xl bg-card p-3 border-2 border-line space-y-1 shadow-xs">
                          <p className="font-black text-ink">{st.title}</p>
                          {st.text && <p className="text-soft font-medium"><T text={st.text} /></p>}
                          {st.math && <MathLines lines={st.math} />}
                        </div>
                      ))}

                      {q.explanation.trap && (
                        <div className="flex items-start gap-2 rounded-xl bg-amber-500/15 p-3 text-ink border-2 border-line shadow-xs">
                          <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-1" />
                          <div>
                            <span className="font-black block text-amber-900 dark:text-amber-300">دام تستی:</span>
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

      {/* Friendly Natural Completion Card with Solid Border */}
      {!isSubmitted && (
        <div className="rounded-2xl border-2 border-line bg-card p-6 sm:p-7 shadow-sm text-center space-y-3.5 mt-6">
          <div className="flex items-center justify-center gap-2 text-ink font-black text-sm">
            <CheckCircle2 size={18} className="text-orange-500" />
            <span>خسته نباشی! پایان سوالات آزمون این فصل</span>
          </div>

          <p className="text-xs sm:text-[13px] text-soft font-medium max-w-md mx-auto leading-6">
            شما به {fa(answeredCount)} سوال از {fa(questions.length)} سوال پاسخ داده‌اید. برای ثبت نهایی و مشاهده درصد و کارنامه روی دکمه زیر کلیک کنید.
          </p>

          <button
            onClick={handleSubmit}
            className="cursor-pointer inline-flex items-center gap-2 rounded-xl border-2 border-line bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-3 text-sm font-black shadow-xs transition-all active:translate-x-0.5 active:translate-y-0.5"
          >
            <SendHorizontal size={16} />
            <span>ثبت نهایی و مشاهده کارنامه آزمون ({fa(answeredCount)} از ۱۰)</span>
          </button>
        </div>
      )}
    </div>
  );
};
