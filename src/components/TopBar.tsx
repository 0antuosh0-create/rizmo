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

// Circular mathematical progress ring (inspired by diffeq-notes)
function ProgressRing({ pct }: { pct: number }) {
  const r = 12;
  const c = 2 * Math.PI * r;
  return (
    <div
      className="relative flex items-center justify-center cursor-default select-none"
      title={`پیشرفت مطالعه: ${fa(pct)}٪`}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" className="-rotate-90">
        <circle
          cx="16"
          cy="16"
          r={r}
          fill="none"
          strokeWidth="3"
          className="stroke-card2 dark:stroke-card3"
        />
        <circle
          cx="16"
          cy="16"
          r={r}
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.min(100, Math.max(0, pct)) / 100)}
          className="stroke-accent transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-[8.5px] font-black text-ink tabular-nums">
        {fa(pct)}
      </span>
    </div>
  );
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
    <header className="sticky top-0 z-40 w-full border-b border-line bg-card/90 dark:bg-card/85 backdrop-blur-md transition-colors shadow-xs">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 md:px-6">
        {/* Right side: Mobile Menu Button + App Brand */}
        <div className="flex items-center gap-3">
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
            {/* Elegant Vector Sigma Badge */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-teal-500 via-emerald-500 to-teal-600 text-white shadow-[0_0_15px_rgba(15,118,110,0.25)] dark:shadow-[0_0_20px_rgba(45,212,191,0.3)]">
              <Sigma size={18} strokeWidth={2.6} />
            </div>
            <div className="min-w-0 leading-tight">
              <div className="flex items-center gap-2">
                <span className="text-[13.5px] sm:text-[14.5px] font-black text-ink tracking-tight">
                  ریاضی مهندسی
                </span>
                <span className="hidden sm:inline-flex rounded-md border border-line bg-amber-400/20 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 text-[9.5px] font-black shadow-2xs">
                  کارشناسی
                </span>
              </div>
              <p className="text-[10px] sm:text-[10.5px] font-bold text-faint truncate hidden xs:block">
                حل‌المسائل تشریحی، فرمول‌ها و خودآزمایی
              </p>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation Segmented Bar */}
        <nav className="mx-auto hidden md:flex items-center gap-1 rounded-2xl border border-line bg-card/90 dark:bg-card2/80 p-1 shadow-2xs">
          {NAV_VIEWS.map((v) => {
            const Icon = v.icon;
            const isActive = view === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-[12.5px] font-black transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "border border-teal-600/50 bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 text-white dark:text-slate-950 shadow-xs"
                    : "border border-transparent text-soft hover:bg-card2 hover:text-ink"
                }`}
              >
                <Icon size={14} />
                <span>{v.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Left side: Search, Progress Ring, Theme Toggle */}
        <div className="ms-auto flex items-center gap-2">
          {/* Quick Search Shortcut Button */}
          <button
            onClick={onSearch}
            className="hidden sm:flex items-center gap-2 rounded-xl border border-line bg-card hover:bg-card2 px-3 py-1.5 text-xs font-bold text-ink shadow-2xs hover:border-accent hover:shadow-xs transition-all cursor-pointer"
            title="جستجوی سریع (Ctrl + K)"
          >
            <Search size={14} className="text-soft" />
            <span className="text-soft">جستجو…</span>
            <kbd className="font-mono text-[10px] bg-card2 border border-line px-1.5 py-0.5 rounded text-faint font-bold">
              CTRL K
            </kbd>
          </button>

          <button
            onClick={onSearch}
            className="flex sm:hidden h-9 w-9 items-center justify-center rounded-xl border border-line bg-card text-ink shadow-2xs transition-transform active:scale-95 cursor-pointer"
            aria-label="جستجو"
          >
            <Search size={16} />
          </button>

          {/* Elegant Circular Progress Ring */}
          <div className="rounded-xl border border-line bg-card p-1 shadow-2xs">
            <ProgressRing pct={progressPct} />
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleDark}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-card hover:bg-card2 text-ink shadow-2xs transition-all active:scale-95 cursor-pointer"
            aria-label={dark ? "تغییر به تم روز" : "تغییر به تم شب"}
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
