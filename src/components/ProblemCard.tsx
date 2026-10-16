import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Bookmark,
  CheckCircle,
  Lightbulb,
  AlertTriangle,
  Award,
  BookOpen,
  Copy,
  Check,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  BookmarkCheck,
  Flame,
} from "lucide-react";
import { SolvedProblem, Difficulty } from "../types";
import { T, MB, MathLines, fa } from "./Math";

interface ProblemCardProps {
  problem: SolvedProblem;
  isSolved: boolean;
  isBookmarked: boolean;
  onToggleSolved: (id: string) => void;
  onToggleBookmarked: (id: string) => void;
  defaultOpen?: boolean;
}

const difficultyConfig: Record<
  Difficulty,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  easy: {
    label: "آسان و روان",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-500/30 dark:border-emerald-500/40",
    dot: "bg-emerald-500",
  },
  medium: {
    label: "متوسط و کاربردی",
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
    text: "text-amber-800 dark:text-amber-300",
    border: "border-amber-500/30 dark:border-amber-500/40",
    dot: "bg-amber-500",
  },
  hard: {
    label: "چالشی و عمیق",
    bg: "bg-rose-500/10 dark:bg-rose-500/15",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-500/30 dark:border-rose-500/40",
    dot: "bg-rose-500",
  },
};

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  isSolved,
  isBookmarked,
  onToggleSolved,
  onToggleBookmarked,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [showHint, setShowHint] = useState(false);
  const [copied, setCopied] = useState(false);

  const diff = difficultyConfig[problem.difficulty];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(problem.statement);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      id={problem.id}
      className={`scroll-mt-header relative overflow-hidden rounded-2xl border bg-card transition-all duration-300 ${
        isSolved
          ? "border-emerald-500/40 shadow-sm"
          : "border-line hover:border-orange-500/40 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Top Warm Ambient Glow Line */}
      <div
        className={`absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent ${
          isSolved
            ? "via-emerald-500/70"
            : "via-orange-500/60 dark:via-orange-400/50"
        } to-transparent opacity-90`}
      />

      {/* Card Header with Badges & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-card2/60 dark:bg-card2/40 px-4 py-3 sm:px-5 backdrop-blur-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty Badge with playful dot */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold ${diff.bg} ${diff.text} ${diff.border}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
            {diff.label}
          </span>

          {/* Subtopic Badge */}
          <span className="inline-flex items-center gap-1 rounded-full border border-line bg-card/90 px-2.5 py-0.5 text-xs font-medium text-soft shadow-xs">
            {problem.subTopicLabel}
          </span>

          {/* Persian Source Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-card/90 px-2.5 py-0.5 text-[11px] font-semibold text-ink shadow-xs">
            {problem.sourceCategory === "konkur_arshad" ? (
              <GraduationCap size={13} className="text-orange-500" />
            ) : problem.sourceCategory === "university_exam" ? (
              <Award size={13} className="text-amber-500" />
            ) : (
              <BookOpen size={13} className="text-emerald-500" />
            )}
            <span className="truncate max-w-[260px] sm:max-w-[400px]" title={problem.source}>
              {problem.source}
            </span>
          </span>
        </div>

        {/* Action Buttons (Solve, Bookmark, Copy) */}
        <div className="flex items-center gap-1.5 ms-auto">
          <button
            onClick={() => onToggleSolved(problem.id)}
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
              isSolved
                ? "bg-emerald-600 text-white shadow-xs"
                : "border border-line bg-card text-soft hover:text-ink hover:bg-card2"
            }`}
            title={isSolved ? "علامت‌گذاری به عنوان حل‌نشده" : "علامت‌گذاری به عنوان حل‌شده"}
          >
            <CheckCircle size={13} />
            <span>{isSolved ? "حل شد" : "نشان حل"}</span>
          </button>

          <button
            onClick={() => onToggleBookmarked(problem.id)}
            className={`cursor-pointer rounded-xl p-1.5 transition-all ${
              isBookmarked
                ? "bg-amber-400 text-black shadow-xs"
                : "border border-line bg-card text-soft hover:text-ink hover:bg-card2"
            }`}
            title={isBookmarked ? "حذف از نشان‌شده‌ها" : "افزودن به نشان‌شده‌ها"}
          >
            <Bookmark size={14} className={isBookmarked ? "fill-black" : ""} />
          </button>

          <button
            onClick={handleCopy}
            className="cursor-pointer rounded-xl border border-line bg-card p-1.5 text-soft hover:text-ink hover:bg-card2 transition-all"
            title="کپی صورت مسئله"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Problem Content Area */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Problem Title */}
        <h3 className="text-base sm:text-lg font-black text-ink leading-7 tracking-tight">
          <T text={problem.title} />
        </h3>

        {/* High-Contrast Warm Problem Statement Canvas */}
        <div className="relative overflow-hidden rounded-2xl border border-line border-r-4 border-r-orange-500 bg-gradient-to-l from-orange-500/[0.05] via-card2/50 to-card2/20 dark:from-orange-950/20 dark:via-card2/60 dark:to-card2/30 p-4 sm:p-5 text-ink shadow-xs">
          <p className="whitespace-pre-line text-[14.5px] sm:text-[15px] font-medium leading-8">
            <T text={problem.statement} />
          </p>
          {problem.statementMath && (
            <div className="mt-3 rounded-xl bg-card/85 border border-line p-3 shadow-xs">
              <MathLines lines={problem.statementMath} />
            </div>
          )}
        </div>

        {/* Action Bar (Hint & Solution) */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Hint Toggle with Warm Amber Glow */}
          <button
            onClick={() => setShowHint(!showHint)}
            className={`cursor-pointer inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
              showHint
                ? "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300 shadow-xs"
                : "border-line bg-card2/70 text-soft hover:text-ink hover:border-orange-500/40"
            }`}
          >
            <Lightbulb
              size={14}
              className={showHint ? "text-amber-500 fill-amber-500/20" : "text-amber-500"}
            />
            <span>{showHint ? "بستن راهنمایی" : "راهنمایی گام آغازین (Hint)"}</span>
          </button>

          {/* Solution Accordion Toggle (Warm Sunset Gradient Pill) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ms-auto cursor-pointer inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-4 py-2 text-xs sm:text-sm font-black shadow-sm shadow-orange-500/25 transition-all active:scale-95"
          >
            <ChevronDown
              size={15}
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
            <span>{isOpen ? "بستن پاسخ تشریحی" : "مشاهده پاسخ تشریحی گام‌به‌گام"}</span>
          </button>
        </div>

        {/* Hint Box (Collapsible) */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="rounded-xl border border-dashed border-amber-500/40 bg-gradient-to-l from-amber-500/[0.08] to-transparent p-4 text-xs sm:text-[13px] leading-7 font-medium text-ink">
                <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300 font-bold mb-1">
                  <Lightbulb size={14} />
                  <span>ایده اولیه و فرمول راهگشا:</span>
                </div>
                <T text={problem.hint} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step-by-Step Solution (Accordion) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden space-y-4 pt-2"
            >
              {/* Exam Trap Warning Callout */}
              <div className="rounded-xl border border-amber-500/35 border-r-4 border-r-amber-500 bg-gradient-to-l from-amber-500/[0.09] via-amber-500/[0.03] to-transparent p-4 text-ink shadow-xs">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm mb-1 text-amber-800 dark:text-amber-300">
                  <AlertTriangle size={15} className="text-amber-500" />
                  <span>تله امتحانی! مواظب این اشتباه رایج باش:</span>
                </div>
                <p className="text-xs sm:text-[13px] leading-7 font-medium text-soft">
                  <T text={problem.examTrap} />
                </p>
              </div>

              {/* Numbered Steps Stepper with Warm Cheerful Badges */}
              <div className="space-y-3">
                {problem.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-line bg-card2/40 hover:bg-card2/60 transition-colors p-4 space-y-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white text-xs font-black shadow-xs">
                        {fa(idx + 1)}
                      </span>
                      <h4 className="text-sm font-bold text-ink">
                        <T text={step.title} />
                      </h4>
                    </div>

                    {step.text && (
                      <p className="text-xs sm:text-[14px] leading-7 text-soft font-medium">
                        <T text={step.text} />
                      </p>
                    )}

                    {step.math && (
                      <div className="rounded-xl bg-card/85 border border-line p-2.5 shadow-xs">
                        <MathLines lines={step.math} />
                      </div>
                    )}

                    {step.note && (
                      <div className="rounded-lg border border-dashed border-orange-500/30 bg-orange-500/[0.04] p-2.5 text-xs text-soft font-medium">
                        <T text={step.note} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Final Answer Block (Radiant Mint & Teal Garden Box) */}
              <div className="rounded-xl border border-emerald-500/40 border-r-4 border-r-emerald-500 bg-gradient-to-l from-emerald-500/[0.12] via-teal-500/[0.05] to-transparent p-4 sm:p-5 text-ink shadow-sm">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 mb-2">
                  <CheckCircle2 size={17} />
                  <span>پاسخ نهایی مسئله (به همین تمیزی!):</span>
                </div>
                <div className="space-y-2">
                  {problem.finalAnswer.map((ans, i) => (
                    <MB key={i} tex={ans} />
                  ))}
                </div>
              </div>

              {/* Key Takeaway */}
              {problem.keyTakeaway && (
                <div className="rounded-xl border border-line bg-card2/80 p-3.5 text-xs leading-6 text-soft font-medium">
                  <span className="font-bold text-ink flex items-center gap-1.5 mb-1">
                    <BookmarkCheck size={14} className="text-orange-500" />
                    جمع‌بندی تحلیلی و امتحانی:
                  </span>
                  <T text={problem.keyTakeaway} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
};
