import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, BookOpenText, Table2, GraduationCap } from "lucide-react";
import { TopBar, View } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { CommandSearch } from "./components/CommandSearch";
import { MathBackground } from "./components/MathBackground";
import { ProblemsView } from "./views/ProblemsView";
import { CheatSheetView } from "./views/CheatSheetView";
import { ExamView } from "./views/ExamView";
import { ChapterId } from "./types";
import { ALL_PROBLEMS } from "./data";

const PROGRESS_KEY = "rizmo-math-progress-v1";
const BOOKMARK_KEY = "rizmo-math-bookmarks-v1";
const THEME_KEY = "rizmo-math-theme-v1";

function useProgress() {
  const [map, setMap] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
    } catch {
      return {};
    }
  });

  const toggle = useCallback((id: string) => {
    setMap((m) => {
      const next = { ...m, [id]: !m[id] };
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  return [map, toggle] as const;
}

function useBookmarks() {
  const [map, setMap] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "{}");
    } catch {
      return {};
    }
  });

  const toggle = useCallback((id: string) => {
    setMap((m) => {
      const next = { ...m, [id]: !m[id] };
      try {
        localStorage.setItem(BOOKMARK_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  return [map, toggle] as const;
}

function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === null) return true;
      return saved === "dark";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  return [dark, () => setDark((d) => !d)] as const;
}

export default function App() {
  const [view, setView] = useState<View>("problems");
  const [activeChapter, setActiveChapter] = useState<ChapterId>("fourier");
  const [progress, toggleProgress] = useProgress();
  const [bookmarks, toggleBookmark] = useBookmarks();
  const [dark, toggleDark] = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Keyboard shortcuts for search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSetView = useCallback((v: View) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleNavigateToProblem = useCallback(
    (chapterId: ChapterId, problemId: string) => {
      setActiveChapter(chapterId);
      setView("problems");
      setTimeout(() => {
        const el = document.getElementById(problemId);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    },
    []
  );

  const totalSolved = useMemo(
    () => ALL_PROBLEMS.filter((p) => progress[p.id]).length,
    [progress]
  );
  const totalPercentage = Math.round((totalSolved / ALL_PROBLEMS.length) * 100);

  return (
    <div className="min-h-screen w-full max-w-full relative bg-paper text-ink font-sans selection:bg-orange-500 selection:text-white">
      <MathBackground />

      <TopBar
        view={view}
        setView={handleSetView}
        dark={dark}
        toggleDark={toggleDark}
        onSearch={() => setSearchOpen(true)}
        onMenu={() => setMobileNavOpen(true)}
        progressPct={totalPercentage}
      />

      <div className="mx-auto flex max-w-[1440px] w-full min-w-0 items-start">
        {/* Desktop Sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[280px] shrink-0 border-e border-line bg-card/85 dark:bg-card/75 backdrop-blur-md lg:block self-start overflow-hidden shadow-xs z-30">
          <Sidebar
            currentView={view}
            onViewChange={handleSetView}
            activeChapter={activeChapter}
            onSelectChapter={setActiveChapter}
            progress={progress}
            bookmarks={bookmarks}
          />
        </aside>

        {/* Main Content Area */}
        <main className="min-w-0 flex-1 w-full max-w-full px-4 sm:px-6 md:px-8 pt-6 pb-24 md:pb-12 z-10">
          {view === "problems" && (
            <ProblemsView
              progress={progress}
              bookmarks={bookmarks}
              onToggleProgress={toggleProgress}
              onToggleBookmark={toggleBookmark}
              activeChapter={activeChapter}
              onSelectChapter={setActiveChapter}
            />
          )}

          {view === "cheatsheet" && <CheatSheetView />}

          {view === "exam" && <ExamView />}
        </main>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden"
            onClick={() => setMobileNavOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.22 }}
              className="absolute inset-y-0 start-0 w-[85vw] max-w-[320px] bg-card border-s border-line shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
              dir="rtl"
            >
              <div className="flex items-center justify-between border-b border-line bg-card2 px-4 py-3">
                <span className="text-sm font-bold text-ink">سرفصل‌ها و ناوبری</span>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-xl border border-line bg-card p-1.5 text-ink shadow-xs cursor-pointer"
                  aria-label="بستن"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-hidden">
                <Sidebar
                  currentView={view}
                  onViewChange={handleSetView}
                  activeChapter={activeChapter}
                  onSelectChapter={setActiveChapter}
                  progress={progress}
                  bookmarks={bookmarks}
                  onCloseMobile={() => setMobileNavOpen(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Command Search (Ctrl + K) */}
      <CommandSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigateToProblem={handleNavigateToProblem}
        onNavigateToView={(v, ch) => {
          if (ch) setActiveChapter(ch);
          handleSetView(v);
        }}
      />

      {/* Mobile Bottom Thumb Ergonomic Dock with Warm Sunset Gradient */}
      <nav
        aria-label="ناوبری سریع موبایل"
        className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-around border-t border-line bg-card/95 px-2 py-2 backdrop-blur-md md:hidden shadow-sm"
      >
        <button
          onClick={() => handleSetView("problems")}
          className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-all cursor-pointer ${
            view === "problems"
              ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-black shadow-xs"
              : "text-soft hover:text-ink font-medium"
          }`}
        >
          <BookOpenText size={17} />
          <span className="text-[10px]">حل‌المسائل</span>
        </button>

        <button
          onClick={() => handleSetView("cheatsheet")}
          className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-all cursor-pointer ${
            view === "cheatsheet"
              ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-black shadow-xs"
              : "text-soft hover:text-ink font-medium"
          }`}
        >
          <Table2 size={17} />
          <span className="text-[10px]">فرمول‌ها</span>
        </button>

        <button
          onClick={() => handleSetView("exam")}
          className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-all cursor-pointer ${
            view === "exam"
              ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-black shadow-xs"
              : "text-soft hover:text-ink font-medium"
          }`}
        >
          <GraduationCap size={17} />
          <span className="text-[10px]">آزمون</span>
        </button>
      </nav>
    </div>
  );
}
