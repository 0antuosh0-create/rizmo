import React from "react";
import {
  Sun,
  Moon,
  Search,
  Menu,
  BookOpenText,
  Table2,
  GraduationCap,
  Sigma,
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

const NAV_VIEWS: { id: View; label: string; icon: typeof BookOpenText }[] = [
  { id: "problems", label: "حل‌المسائل تشریحی", icon: BookOpenText },
  { id: "cheatsheet", label: "فرمول‌ها و شبیه‌ساز", icon: Table2 },
  { id: "exam", label: "آزمون خودسنجی", icon: GraduationCap },
];

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
    <header className="sticky top-0 z-40 w-full border-b border-line bg-card/90 dark:bg-card/80 backdrop-blur-md transition-colors shadow-xs">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6">
        {/* Right side: Mobile Menu Button + App Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onMenu}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-card hover:bg-card2 text-ink shadow-2xs transition-all active:scale-95 lg:hidden cursor-pointer"
            aria-label="فهرست و منو"
          >
            <Menu size={18} />
          </button>

          <button
            onClick={() => setView("problems")}
            className="flex items-center gap-2.5 text-start cursor-pointer hover:opacity-90 active:scale-[0.99] transition-all"
          >
            {/* Luminous High-Tech Sigma Logo Badge */}
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-teal-500/40 bg-gradient-to-br from-teal-500 via-emerald-500 to-teal-600 text-white shadow-[0_0_20px_rgba(45,212,191,0.35)]">
              <Sigma size={20} strokeWidth={2.8} />
              <div className="absolute -top-1 -end-1 h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            </div>

            <div className="min-w-0 leading-tight">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-ink tracking-tight">
                  ریاضی مهندسی
                </span>
                <span className="hidden sm:inline-flex rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-800 dark:text-teal-300 px-2.5 py-0.5 text-[10px] font-black shadow-2xs">
                  کارشناسی
                </span>
              </div>
              <p className="text-[10.5px] font-bold text-soft hidden xs:block">
                حل‌المسائل تشریحی، فرمول‌ها و خودآزمایی
              </p>
            </div>
          </button>
        </div>

        {/* Center: Futuristic Floating Segmented Dock */}
        <nav className="mx-auto hidden md:flex items-center gap-1 rounded-full border border-line bg-card2/90 dark:bg-card2/80 p-1 shadow-xs backdrop-blur-md">
          {NAV_VIEWS.map((v) => {
            const Icon = v.icon;
            const isActive = view === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-slate-950 font-black shadow-[0_0_15px_rgba(45,212,191,0.35)] scale-[1.02]"
                    : "text-soft hover:text-ink hover:bg-card/70"
                }`}
              >
                <Icon size={14} className={isActive ? "text-slate-950" : "text-soft"} />
                <span>{v.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Left side: Search, Cool Progress Badge, Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Cool Progress Metric Badge */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-xs font-black text-teal-800 dark:text-teal-300 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            <span className="tabular-nums font-mono">{fa(progressPct)}٪</span>
            <span className="text-[10.5px] text-soft font-bold hidden xl:inline">تکمیل</span>
          </div>

          {/* Sleek Floating Search Pill */}
          <button
            onClick={onSearch}
            className="hidden sm:flex items-center gap-2.5 rounded-full border border-line bg-card hover:bg-card2 px-3.5 py-1.5 text-xs font-bold text-ink shadow-2xs hover:border-teal-500/40 hover:shadow-xs transition-all cursor-pointer"
            title="جستجوی سریع (Ctrl + K)"
          >
            <Search size={14} className="text-teal-500" />
            <span className="text-soft">جستجو…</span>
            <kbd className="font-mono text-[10px] bg-card2 border border-line px-1.5 py-0.5 rounded-md text-faint font-bold">
              CTRL K
            </kbd>
          </button>

          <button
            onClick={onSearch}
            className="flex sm:hidden h-9 w-9 items-center justify-center rounded-full border border-line bg-card text-ink shadow-2xs transition-transform active:scale-95 cursor-pointer"
            aria-label="جستجو"
          >
            <Search size={16} />
          </button>

          {/* Sleek Theme Toggle Pill */}
          <button
            onClick={toggleDark}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card hover:bg-card2 text-ink shadow-2xs transition-all active:scale-95 cursor-pointer hover:border-amber-400/50"
            aria-label={dark ? "تغییر به تم روز" : "تغییر به تم شب"}
          >
            {dark ? (
              <Sun size={17} className="text-amber-400" />
            ) : (
              <Moon size={17} className="text-teal-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
