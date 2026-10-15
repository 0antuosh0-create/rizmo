import React, { useState, useEffect, useRef } from "react";
import { Search, X, BookOpen, Table2, GraduationCap, ArrowRight } from "lucide-react";
import { ALL_PROBLEMS, ALL_FORMULAS, ALL_QUIZZES } from "../data";
import { ChapterId } from "../types";
import { View } from "./TopBar";
import { fa } from "./Math";

interface CommandSearchProps {
  open: boolean;
  onClose: () => void;
  onNavigateToProblem: (chapterId: ChapterId, problemId: string) => void;
  onNavigateToView: (view: View, chapterId?: ChapterId) => void;
}

export const CommandSearch: React.FC<CommandSearchProps> = ({
  open,
  onClose,
  onNavigateToProblem,
  onNavigateToView,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  if (!open) return null;

  const q = query.trim().toLowerCase();

  const matchedProblems = ALL_PROBLEMS.filter((p) => {
    if (!q) return false;
    return (
      p.title.toLowerCase().includes(q) ||
      p.source.toLowerCase().includes(q) ||
      p.subTopicLabel.toLowerCase().includes(q) ||
      p.statement.toLowerCase().includes(q)
    );
  }).slice(0, 6);

  const matchedFormulas = ALL_FORMULAS.filter((f) => {
    if (!q) return false;
    return (
      f.title.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q)
    );
  }).slice(0, 4);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-16 sm:pt-24 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-line bg-card2/80 px-4 py-3">
          <Search size={18} className="text-accent" />
          <input
            ref={inputRef}
            type="text"
            placeholder="جستجو در تمام مسائل تشریحی، فرمول‌ها، مراجع و مباحث..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm font-bold text-ink placeholder:text-faint focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-soft hover:bg-card hover:text-ink cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!q && (
            <div className="text-center py-8 text-faint space-y-2">
              <Search size={32} className="mx-auto text-line" />
              <p className="text-xs font-bold">عبارت مورد نظر خود را تایپ کنید (مثلاً: فوریه، لاپلاس، دالامبر، شیدفر...)</p>
            </div>
          )}

          {/* Matched Problems */}
          {matchedProblems.length > 0 && (
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-faint flex items-center gap-1.5">
                <BookOpen size={13} className="text-accent" />
                مسائل تشریحی حل‌شده ({fa(matchedProblems.length)})
              </p>
              <div className="space-y-1.5">
                {matchedProblems.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onNavigateToProblem(p.chapterId, p.id);
                      onClose();
                    }}
                    className="flex w-full items-center justify-between rounded-xl border border-line bg-card2/50 p-2.5 text-start hover:bg-card hover:border-accent transition-all cursor-pointer"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-bold text-ink truncate">{p.title}</p>
                      <p className="text-[11px] text-soft truncate mt-0.5 font-medium">{p.source}</p>
                    </div>
                    <span className="ms-2 shrink-0 rounded-md bg-card px-2 py-0.5 text-[10px] font-bold text-accent border border-line">
                      {p.subTopicLabel}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Formulas */}
          {matchedFormulas.length > 0 && (
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-faint flex items-center gap-1.5">
                <Table2 size={13} className="text-amber-500" />
                فرمول‌ها و قضایای کلیدی ({fa(matchedFormulas.length)})
              </p>
              <div className="space-y-1.5">
                {matchedFormulas.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      onNavigateToView("cheatsheet");
                      onClose();
                    }}
                    className="flex w-full items-center justify-between rounded-xl border border-line bg-card2/50 p-2.5 text-start hover:bg-card hover:border-amber-500 transition-all cursor-pointer"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-bold text-ink truncate">{f.title}</p>
                      <p className="text-[11px] text-soft truncate mt-0.5 font-medium">{f.description}</p>
                    </div>
                    <span className="ms-2 shrink-0 rounded-md bg-card px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-line">
                      {f.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && matchedProblems.length === 0 && matchedFormulas.length === 0 && (
            <div className="text-center py-6 text-soft text-xs font-bold">
              موردی مطابق با «{q}» یافت نشد.
            </div>
          )}
        </div>

        {/* Modal Footer Key Hints */}
        <div className="flex items-center justify-between border-t border-line bg-card2/80 px-4 py-2.5 text-[11px] text-faint">
          <span>کلید ESC برای بستن</span>
          <span>سامانه حل‌المسائل ریاضی مهندسی</span>
        </div>
      </div>
    </div>
  );
};
