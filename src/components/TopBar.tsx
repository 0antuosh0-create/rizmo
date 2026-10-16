import React from "react";
import {
  Sun,
  Moon,
  Search,
  Menu,
  BookOpenText,
  Table2,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { fa } from "./Math";

export type View = "problems" | "cheatsheet" | "exam";

interface TopBarProps {
  view: View;
  setView: (v: View) => void;
  dark: boolean;
  toggleDark: () => void;
  onSearch: () => void;
  onMenu: () => void;
  progressPct: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  view,
  setView,
  dark,
  toggleDark,
  onSearch,
  onMenu,
  progressPct,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-line bg-card/95 backdrop-blur-md transition-colors shadow-xs">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 gap-3">
        {/* Right side: Mobile Menu Button + App Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenu}
            className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-line bg-card hover:bg-card2 text-ink shadow-xs transition-transform active:translate-x-0.5 active:translate-y-0.5 lg:hidden cursor-pointer"
            aria-label="فهرست و منو"
          >
            <Menu size={18} />
          </button>

          <div className="flex items-center gap-2.5">
            {/* Luminous Mint-Teal Neo-Brutalist Logo */}
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-line bg-gradient-to-br from-teal-500 via-emerald-500 to-teal-600 text-white shadow-xs">
              <Sparkles size={20} strokeWidth={2.4} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-ink tracking-tight">
                  ریاضی مهندسی
                </span>
                <span className="hidden sm:inline-flex rounded-full border-2 border-line bg-amber-400/25 text-amber-900 dark:text-amber-200 px-2.5 py-0.2 text-[10.5px] font-black shadow-xs">
                  کارشناسی
                </span>
              </div>
              <p className="text-[11px] font-bold text-soft hidden xs:flex items-center gap-1">
                <span>حل‌المسائل تشریحی، فرمول‌ها و خودآزمایی</span>
              </p>
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation Pills with Tactile Neo-Brutalist Border */}
        <nav className="hidden md:flex items-center gap-1.5 rounded-2xl border-2 border-line bg-card2/80 p-1 shadow-xs">
          <button
            onClick={() => setView("problems")}
            className={`flex items-center gap-2 rounded-xl px-4 py-1.5 text-xs font-black transition-all cursor-pointer ${
              view === "problems"
                ? "border-2 border-line bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 text-white dark:text-slate-950 shadow-xs"
                : "border-2 border-transparent text-soft hover:text-ink hover:bg-card"
            }`}
          >
            <BookOpenText size={15} />
            <span>حل‌المسائل تشریحی</span>
          </button>

          <button
            onClick={() => setView("cheatsheet")}
            className={`flex items-center gap-2 rounded-xl px-4 py-1.5 text-xs font-black transition-all cursor-pointer ${
              view === "cheatsheet"
                ? "border-2 border-line bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 text-white dark:text-slate-950 shadow-xs"
                : "border-2 border-transparent text-soft hover:text-ink hover:bg-card"
            }`}
          >
            <Table2 size={15} />
            <span>فرمول‌ها و شبیه‌ساز</span>
          </button>

          <button
            onClick={() => setView("exam")}
            className={`flex items-center gap-2 rounded-xl px-4 py-1.5 text-xs font-black transition-all cursor-pointer ${
              view === "exam"
                ? "border-2 border-line bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 text-white dark:text-slate-950 shadow-xs"
                : "border-2 border-transparent text-soft hover:text-ink hover:bg-card"
            }`}
          >
            <GraduationCap size={15} />
            <span>آزمون خودسنجی</span>
          </button>
        </nav>

        {/* Left side: Search, Theme Toggle, Overall Progress */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Luminous Mint Progress Chip with Tactile Border */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-xl border-2 border-line bg-teal-500/15 text-teal-900 dark:text-teal-300 px-3 py-1 text-xs font-black shadow-xs">
            <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
            <span>{fa(progressPct)}٪ حل‌شده</span>
          </div>

          {/* Quick Search Shortcut Button */}
          <button
            onClick={onSearch}
            className="flex h-9 items-center gap-2 rounded-xl border-2 border-line bg-card hover:bg-card2 px-2.5 sm:px-3 text-xs font-bold text-soft hover:text-ink shadow-xs transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            title="جستجوی سریع (Ctrl + K)"
          >
            <Search size={14} className="text-faint" />
            <span className="hidden sm:inline">جستجو...</span>
            <kbd className="hidden md:inline font-mono text-[10px] bg-card2 border-2 border-line px-1.5 py-0.5 rounded-lg text-faint font-bold">
              Ctrl K
            </kbd>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDark}
            className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-line bg-card hover:bg-card2 text-ink shadow-xs transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            aria-label={dark ? "تغییر به تم روز (کاغذ گرم)" : "تغییر به تم شب (شارکول عمیق)"}
          >
            {dark ? (
              <Sun size={17} className="text-amber-400" />
            ) : (
              <Moon size={17} className="text-teal-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
