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
  { label: string; bg: string; text: string; dot: string }
> = {
  easy: {
    label: "آسان و روان",
    bg: "bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300",
    text: "text-emerald-800 dark:text-emerald-300",
    dot: "bg-emerald-500",
  },
  medium: {
    label: "متوسط و کاربردی",
    bg: "bg-amber-500/15 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300",
    text: "text-amber-800 dark:text-amber-300",
    dot: "bg-amber-500",
  },
  hard: {
    label: "چالشی و عمیق",
    bg: "bg-rose-500/15 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300",
    text: "text-rose-800 dark:text-rose-300",
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
      className={`scroll-mt-header relative overflow-hidden rounded-2xl border-2 border-line bg-card transition-all duration-150 ${
        isSolved
          ? "shadow-sm border-emerald-600/70 dark:border-emerald-500/70"
          : "shadow-md hover:shadow-lg hover:-translate-x-0.5 hover:-translate-y-0.5"
      }`}
    >
      {/* Top Warm Ambient Strip */}
      <div
        className={`absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent ${
          isSolved
            ? "via-emerald-500"
            : "via-orange-500"
        } to-transparent opacity-90`}
      />

      {/* Card Header with Tactile Neo-Brutalist Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-line bg-card2/70 dark:bg-card2/50 px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty Badge with Solid Border and Tiny Shadow */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border-2 border-line px-3 py-0.5 text-xs font-black shadow-xs ${diff.bg}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
            {diff.label}
          </span>

          {/* Subtopic Badge */}
          <span className="inline-flex items-center gap-1 rounded-full border-2 border-line bg-card px-3 py-0.5 text-xs font-bold text-soft shadow-xs">
            {problem.subTopicLabel}
          </span>

          {/* Persian Source Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-line bg-card px-2.5 py-0.5 text-[11px] font-bold text-ink shadow-xs">
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

        {/* Tactile Action Buttons (Solve, Bookmark, Copy) */}
        <div className="flex items-center gap-1.5 ms-auto">
          <button
            onClick={() => onToggleSolved(problem.id)}
            className={`flex items-center gap-1.5 rounded-xl border-2 border-line px-3 py-1 text-xs font-black transition-all cursor-pointer shadow-xs active:translate-x-0.5 active:translate-y-0.5 ${
              isSolved
                ? "bg-emerald-600 text-white"
                : "bg-card text-soft hover:text-ink hover:bg-card2"
            }`}
            title={isSolved ? "علامت‌گذاری به عنوان حل‌نشده" : "علامت‌گذاری به عنوان حل‌شده"}
          >
            <CheckCircle size={13} />
            <span>{isSolved ? "حل شد" : "نشان حل"}</span>
          </button>

          <button
            onClick={() => onToggleBookmarked(problem.id)}
            className={`cursor-pointer rounded-xl border-2 border-line p-1.5 transition-all shadow-xs active:translate-x-0.5 active:translate-y-0.5 ${
              isBookmarked
                ? "bg-amber-400 text-black"
                : "bg-card text-soft hover:text-ink hover:bg-card2"
            }`}
            title={isBookmarked ? "حذف از نشان‌شده‌ها" : "افزودن به نشان‌شده‌ها"}
          >
            <Bookmark size={14} className={isBookmarked ? "fill-black" : ""} />
          </button>

          <button
            onClick={handleCopy}
            className="cursor-pointer rounded-xl border-2 border-line bg-card p-1.5 text-soft hover:text-ink hover:bg-card2 transition-all shadow-xs active:translate-x-0.5 active:translate-y-0.5"
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

        {/* High-Contrast Architectural Statement Canvas */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-line border-r-[6px] border-r-orange-500 bg-gradient-to-l from-orange-500/[0.06] via-card2/50 to-card2/20 dark:from-orange-950/25 dark:via-card2/60 dark:to-card2/30 p-4 sm:p-5 text-ink shadow-xs">
          <p className="whitespace-pre-line text-[14.5px] sm:text-[15px] font-bold leading-8">
            <T text={problem.statement} />
          </p>
          {problem.statementMath && (
            <div className="mt-3 rounded-xl border-2 border-line/60 bg-card/90 p-3 shadow-xs">
              <MathLines lines={problem.statementMath} />
            </div>
          )}
        </div>

        {/* Action Bar (Hint & Solution) */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Hint Toggle with Tactile Pop */}
          <button
            onClick={() => setShowHint(!showHint)}
            className={`cursor-pointer inline-flex items-center gap-1.5 rounded-xl border-2 border-line px-3.5 py-1.5 text-xs font-black transition-all shadow-xs active:translate-x-0.5 active:translate-y-0.5 ${
              showHint
                ? "bg-amber-400/25 text-amber-900 dark:text-amber-200"
                : "bg-card2 text-soft hover:text-ink hover:bg-card"
            }`}
          >
            <Lightbulb
              size={14}
              className={showHint ? "text-amber-600 dark:text-amber-400 fill-amber-400/20" : "text-amber-500"}
            />
            <span>{showHint ? "بستن راهنمایی" : "راهنمایی گام آغازین (Hint)"}</span>
          </button>

          {/* Solution Accordion Toggle (Bold Warm Sunset Gradient Button) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ms-auto cursor-pointer inline-flex items-center gap-2 rounded-xl border-2 border-line bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-4 py-2 text-xs sm:text-sm font-black shadow-sm transition-all active:translate-x-0.5 active:translate-y-0.5"
          >
            <ChevronDown
              size={15}
              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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
              transition={{ duration: 0.18 }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl border-2 border-dashed border-line bg-gradient-to-l from-amber-500/[0.1] to-card2/40 p-4 text-xs sm:text-[13px] leading-7 font-bold text-ink shadow-xs">
                <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-black mb-1">
                  <Lightbulb size={15} />
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
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden space-y-4 pt-2"
            >
              {/* Exam Trap Warning Callout (Hard Border + Pop Shadow) */}
              <div className="rounded-2xl border-2 border-line border-r-[6px] border-r-amber-500 bg-gradient-to-l from-amber-500/[0.14] via-amber-500/[0.05] to-card p-4 text-ink shadow-xs">
                <div className="flex items-center gap-2 font-black text-xs sm:text-sm mb-1 text-amber-900 dark:text-amber-300">
                  <AlertTriangle size={16} className="text-amber-500" />
                  <span>تله امتحانی! مواظب این اشتباه رایج باش:</span>
                </div>
                <p className="text-xs sm:text-[13px] leading-7 font-medium text-soft">
                  <T text={problem.examTrap} />
                </p>
              </div>

              {/* Numbered Steps Stepper with Tactile Tiles */}
              <div className="space-y-3">
                {problem.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border-2 border-line bg-card2/50 hover:bg-card2/70 transition-colors p-4 space-y-2.5 shadow-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-xl border-2 border-line bg-gradient-to-br from-amber-500 to-orange-500 text-white text-xs font-black shadow-xs">
                        {fa(idx + 1)}
                      </span>
                      <h4 className="text-sm font-black text-ink">
                        <T text={step.title} />
                      </h4>
                    </div>

                    {step.text && (
                      <p className="text-xs sm:text-[14px] leading-7 text-soft font-medium">
                        <T text={step.text} />
                      </p>
                    )}

                    {step.math && (
                      <div className="rounded-xl border-2 border-line/60 bg-card/90 p-2.5 shadow-xs">
                        <MathLines lines={step.math} />
                      </div>
                    )}

                    {step.note && (
                      <div className="rounded-xl border-2 border-dashed border-orange-500/40 bg-orange-500/[0.05] p-2.5 text-xs text-soft font-bold">
                        <T text={step.note} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Final Answer Block (Radiant Mint Garden Box with 2px Border) */}
              <div className="rounded-2xl border-2 border-line border-r-[6px] border-r-emerald-500 bg-gradient-to-l from-emerald-500/[0.14] via-teal-500/[0.05] to-card p-4 sm:p-5 text-ink shadow-sm">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-emerald-800 dark:text-emerald-300 mb-2">
                  <CheckCircle2 size={18} />
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
                <div className="rounded-xl border-2 border-line bg-card2/80 p-3.5 text-xs leading-6 text-soft font-medium shadow-xs">
                  <span className="font-black text-ink flex items-center gap-1.5 mb-1">
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
