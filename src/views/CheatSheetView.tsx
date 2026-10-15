import React, { useState } from "react";
import { Table2, Copy, Check, Search, Sparkles, Layers, Flame, Compass } from "lucide-react";
import { ChapterId } from "../types";
import { CHAPTERS, getFormulasByChapter } from "../data";
import { T, MB, fa } from "../components/Math";
import { FourierVisualizer } from "../components/visualizers/FourierVisualizer";
import { PdeVisualizer } from "../components/visualizers/PdeVisualizer";
import { ComplexVisualizer } from "../components/visualizers/ComplexVisualizer";

export const CheatSheetView: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<ChapterId>("fourier");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const formulas = getFormulasByChapter(activeChapter);

  const filteredFormulas = formulas.filter((f) => {
    if (!searchQuery) return true;
    return (
      f.title.includes(searchQuery) ||
      f.description.includes(searchQuery) ||
      f.category.includes(searchQuery)
    );
  });

  const handleCopy = async (id: string, latex: string) => {
    try {
      await navigator.clipboard.writeText(latex);
    } catch {}
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-card p-5 sm:p-6 shadow-sm">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xs font-bold">
              <Table2 size={20} />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight">
                فرمول‌نامه سریع و اطلس قضایا (Cheat Sheet)
              </h1>
              <p className="text-xs sm:text-sm text-soft font-medium">
                دسترسی فوری به فرمول‌های کلیدی، تعاریف و شبیه‌سازهای شهودی ریاضی مهندسی
              </p>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-faint" />
            <input
              type="text"
              placeholder="جستجو در فرمول‌ها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-line bg-card2 py-2 ps-9 pe-3 text-xs font-medium text-ink placeholder:text-faint focus:outline-hidden focus:border-violet-500 focus:bg-card transition-all"
            />
          </div>
        </div>

        {/* Chapter Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {CHAPTERS.map((ch) => {
            const isActive = activeChapter === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(ch.id)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-start transition-all cursor-pointer ${
                  isActive
                    ? "border-violet-500/50 bg-violet-500/10 text-violet-600 dark:text-violet-300 font-bold shadow-xs"
                    : "border-line bg-card2 hover:bg-card text-soft hover:text-ink"
                }`}
              >
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold ${
                  isActive ? "bg-violet-600 text-white border-violet-600 shadow-xs" : "bg-card border-line text-ink"
                }`}>
                  {ch.id === "fourier" ? <Layers size={14} /> : ch.id === "pde" ? <Flame size={14} /> : <Compass size={14} />}
                </span>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold truncate">{ch.title}</p>
                  <p className="text-[11px] text-faint truncate font-medium">{ch.englishTitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Visualizer for this Chapter */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-amber-500" />
          <h2 className="text-sm sm:text-base font-black text-ink">شبیه‌ساز تعاملی و شهود هندسی</h2>
        </div>
        {activeChapter === "fourier" && <FourierVisualizer />}
        {activeChapter === "pde" && <PdeVisualizer />}
        {activeChapter === "complex" && <ComplexVisualizer />}
      </section>

      {/* Formula Cards Grid */}
      <section className="space-y-4">
        <h2 className="text-sm sm:text-base font-black text-ink flex items-center justify-between">
          <span>فرمول‌های استاندارد آزمون:</span>
          <span className="text-xs text-soft font-bold">
            {fa(filteredFormulas.length)} فرمول دسته‌بندی‌شده
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFormulas.map((f) => (
            <div
              key={f.id}
              className="relative overflow-hidden rounded-2xl border border-line bg-card p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3 hover:border-violet-500/40 transition-colors"
            >
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

              <div>
                <div className="flex items-center justify-between gap-2 border-b border-line pb-2.5 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-300 px-2 py-0.5 text-[11px] font-bold border border-violet-500/25">
                      {f.category}
                    </span>
                    <h3 className="text-sm font-bold text-ink">{f.title}</h3>
                  </div>

                  <button
                    onClick={() => handleCopy(f.id, f.latex)}
                    className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-line bg-card2 px-2.5 py-1 text-[11px] font-medium text-soft hover:text-ink hover:bg-card transition-all"
                    title="کپی فرمول به صورت کد LaTeX"
                  >
                    {copiedId === f.id ? (
                      <>
                        <Check size={12} className="text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">کپی شد</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>LaTeX</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-xl bg-card2/50 border border-line p-3 my-2 text-ink">
                  <MB tex={f.latex} />
                </div>

                <p className="text-xs sm:text-[13px] leading-6 text-soft font-medium">
                  <T text={f.description} />
                </p>
              </div>

              {f.conditions && (
                <div className="rounded-lg bg-violet-500/[0.06] p-2.5 text-[11px] leading-5 font-medium text-ink border-s-4 border-s-violet-500">
                  <span className="text-violet-600 dark:text-violet-400 font-bold block mb-0.5">شرایط کاربرد:</span>
                  <T text={f.conditions} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
