import React from "react";
import {
  Layers,
  Flame,
  Compass,
  CheckCircle2,
  Bookmark,
  BookOpenText,
  Table2,
  GraduationCap,
  Sparkles,
  Award,
} from "lucide-react";
import { ChapterId } from "../types";
import { CHAPTERS, getProblemsByChapter } from "../data";
import { View } from "./TopBar";
import { fa } from "./Math";

interface SidebarProps {
  currentView: View;
  onViewChange: (v: View) => void;
  activeChapter: ChapterId;
  onSelectChapter: (id: ChapterId) => void;
  progress: Record<string, boolean>;
  bookmarks: Record<string, boolean>;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  activeChapter,
  onSelectChapter,
  progress,
  bookmarks,
  onCloseMobile,
}) => {
  return (
    <div className="flex h-full flex-col justify-between overflow-y-auto p-4 space-y-6">
      <div className="space-y-6">
        {/* Navigation Section */}
        <div className="space-y-1">
          <p className="px-2 text-[11px] font-bold text-faint uppercase tracking-wider mb-2">
            بخش‌های سامانه
          </p>

          <button
            onClick={() => {
              onViewChange("problems");
              onCloseMobile?.();
            }}
            className={`flex w-full items-center gap-2.5 rounded-xl border-2 px-3.5 py-2 text-xs font-black transition-all cursor-pointer ${
              currentView === "problems"
                ? "border-line bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 text-white dark:text-slate-950 shadow-xs"
                : "border-transparent text-soft hover:bg-card2 hover:text-ink"
            }`}
          >
            <BookOpenText size={16} />
            <span>بانک حل‌المسائل تشریحی</span>
          </button>

          <button
            onClick={() => {
              onViewChange("cheatsheet");
              onCloseMobile?.();
            }}
            className={`flex w-full items-center gap-2.5 rounded-xl border-2 px-3.5 py-2 text-xs font-black transition-all cursor-pointer ${
              currentView === "cheatsheet"
                ? "border-line bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 text-white dark:text-slate-950 shadow-xs"
                : "border-transparent text-soft hover:bg-card2 hover:text-ink"
            }`}
          >
            <Table2 size={16} />
            <span>فرمول‌نامه و شبیه‌سازها</span>
          </button>

          <button
            onClick={() => {
              onViewChange("exam");
              onCloseMobile?.();
            }}
            className={`flex w-full items-center gap-2.5 rounded-xl border-2 px-3.5 py-2 text-xs font-black transition-all cursor-pointer ${
              currentView === "exam"
                ? "border-line bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 text-white dark:text-slate-950 shadow-xs"
                : "border-transparent text-soft hover:bg-card2 hover:text-ink"
            }`}
          >
            <GraduationCap size={16} />
            <span>مرکز آزمون‌های تستی</span>
          </button>
        </div>

        {/* Chapters Curriculum */}
        <div className="space-y-2">
          <p className="px-2 text-[11px] font-bold text-faint uppercase tracking-wider">
            سرفصل‌های کارشناسی
          </p>

          <div className="space-y-2">
            {CHAPTERS.map((ch) => {
              const isActive = activeChapter === ch.id;
              const chapterProblems = getProblemsByChapter(ch.id);
              const solvedCount = chapterProblems.filter((p) => progress[p.id]).length;
              const pct = Math.round((solvedCount / chapterProblems.length) * 100);

              return (
                <div
                  key={ch.id}
                  className={`rounded-2xl border-2 transition-all overflow-hidden ${
                    isActive
                      ? "border-line bg-card shadow-xs"
                      : "border-line/70 bg-card/60 hover:bg-card hover:border-line"
                  }`}
                >
                  <button
                    onClick={() => {
                      onSelectChapter(ch.id);
                      if (currentView !== "problems") onViewChange("problems");
                      onCloseMobile?.();
                    }}
                    className="flex w-full items-center justify-between p-3 text-start cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border-2 border-line text-xs font-black shadow-xs ${
                          isActive
                            ? "bg-gradient-to-br from-teal-500 to-emerald-600 text-white"
                            : "bg-card2 text-ink"
                        }`}
                      >
                        {ch.id === "fourier" ? <Layers size={15} /> : ch.id === "pde" ? <Flame size={15} /> : <Compass size={15} />}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-ink truncate">
                          فصل {fa(ch.number)}: {ch.title}
                        </p>
                        <p className="text-[10.5px] text-faint truncate font-medium">
                          {fa(solvedCount)} از {fa(chapterProblems.length)} حل‌شده ({fa(pct)}٪)
                        </p>
                      </div>
                    </div>
                  </button>

                  {/* Subtopics list if active */}
                  {isActive && (
                    <div className="border-t-2 border-line bg-card2/50 px-3 py-2 space-y-1">
                      {ch.subTopics.slice(1).map((st) => (
                        <div
                          key={st.id}
                          className="flex items-center gap-1.5 text-[11px] text-soft font-bold py-0.5"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                          <span className="truncate">{st.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* References Card with Warm Friendly Tone */}
        <div className="rounded-2xl border-2 border-line bg-card2/60 p-3.5 space-y-2 text-[11px] shadow-xs">
          <div className="flex items-center gap-1.5 font-black text-ink">
            <Award size={14} className="text-amber-500" />
            <span>مراجع علمی و دانشگاهی:</span>
          </div>
          <ul className="text-soft leading-5 list-disc list-inside space-y-0.5 font-medium">
            <li>کتاب دکتر عبدالله شیدفر</li>
            <li>کتاب دکتر معتقدی و پارسه</li>
            <li>آزمون‌های شریف، تهران و امیرکبیر</li>
            <li>کنکور کارشناسی ارشد برق و مکانیک</li>
          </ul>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t-2 border-line text-[10.5px] text-faint text-center font-bold">
        ریاضی مهندسی دانشگاهی • مقطع کارشناسی
      </div>
    </div>
  );
};
