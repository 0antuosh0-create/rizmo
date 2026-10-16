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
  Flame,
  Coffee,
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
    <header className="sticky top-0 z-40 w-full border-b border-line bg-card/90 dark:bg-card/85 backdrop-blur-md transition-colors shadow-xs">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 gap-3">
        {/* Right side: Mobile Menu Button + App Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenu}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-card hover:bg-card2 text-ink shadow-xs transition-transform active:scale-95 lg:hidden cursor-pointer"
            aria-label="فهرست و منو"
          >
            <Menu size={18} />
          </button>

          <div className="flex items-center gap-2.5">
            {/* Friendly Warm Sunset Logo */}
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white shadow-sm shadow-orange-500/25 ring-2 ring-orange-500/20">
              <Sparkles size={20} strokeWidth={2.4} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-ink tracking-tight">
                  ریاضی مهندسی
                </span>
                <span className="hidden sm:inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 px-2.5 py-0.5 text-[10.5px] font-black">
                  کارشناسی
                </span>
              </div>
              <p className="text-[11px] font-medium text-soft hidden xs:flex items-center gap-1">
                <span>حل‌المسائل تشریحی، فرمول‌ها و خودآزمایی</span>
              </p>
            </div>
          </div>
        </div>

        {/* Center: Desktop Navigation Pills with Warm Cheerful Glow */}
        <nav className="hidden md:flex items-center gap-1.5 rounded-2xl border border-line bg-card2/80 p-1 shadow-xs">
          <button
            onClick={() => setView("problems")}
            className={`flex items-center gap-2 rounded-xl px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              view === "problems"
                ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-sm shadow-orange-500/25 font-black"
                : "text-soft hover:text-ink hover:bg-card"
            }`}
          >
            <BookOpenText size={15} />
            <span>حل‌المسائل تشریحی</span>
          </button>

          <button
            onClick={() => setView("cheatsheet")}
            className={`flex items-center gap-2 rounded-xl px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              view === "cheatsheet"
                ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-sm shadow-orange-500/25 font-black"
                : "text-soft hover:text-ink hover:bg-card"
            }`}
          >
            <Table2 size={15} />
            <span>فرمول‌ها و شبیه‌ساز</span>
          </button>

          <button
            onClick={() => setView("exam")}
            className={`flex items-center gap-2 rounded-xl px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              view === "exam"
                ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-sm shadow-orange-500/25 font-black"
                : "text-soft hover:text-ink hover:bg-card"
            }`}
          >
            <GraduationCap size={15} />
            <span>آزمون خودسنجی</span>
          </button>
        </nav>

        {/* Left side: Search, Theme Toggle, Overall Progress */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Cheerful Progress Chip */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{fa(progressPct)}٪ حل‌شده</span>
          </div>

          {/* Quick Search Shortcut Button */}
          <button
            onClick={onSearch}
            className="flex h-9 items-center gap-2 rounded-xl border border-line bg-card hover:bg-card2 hover:border-orange-500/40 px-2.5 sm:px-3 text-xs font-medium text-soft hover:text-ink shadow-xs transition-all active:scale-95 cursor-pointer"
            title="جستجوی سریع (Ctrl + K)"
          >
            <Search size={14} className="text-faint" />
            <span className="hidden sm:inline">جستجو...</span>
            <kbd className="hidden md:inline font-mono text-[10px] bg-card2 border border-line px-1.5 py-0.5 rounded text-faint">
              Ctrl K
            </kbd>
          </button>

          {/* Dark / Light Mode Toggle with Warm Sunset / Moon Tone */}
          <button
            onClick={toggleDark}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-card hover:bg-card2 text-ink shadow-xs transition-transform active:scale-90 cursor-pointer"
            aria-label={dark ? "تغییر به تم روز (روشن)" : "تغییر به تم شب (کافه تاریک)"}
          >
            {dark ? (
              <Sun size={17} className="text-amber-400" />
            ) : (
              <Moon size={17} className="text-orange-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
