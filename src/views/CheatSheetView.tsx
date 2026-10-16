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
      <div className="relative overflow-hidden rounded-2xl border-2 border-line bg-card p-5 sm:p-6 shadow-sm">
        <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-teal-500 to-transparent" />

        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-line pb-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-line bg-gradient-to-br from-teal-500 via-emerald-500 to-teal-600 text-white shadow-xs font-black">
              <Table2 size={20} />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-ink tracking-tight">
                فرمول‌نامه سریع و اطلس قضایا (Cheat Sheet)
              </h1>
              <p className="text-xs sm:text-sm text-soft font-bold">
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
              className="w-full rounded-xl border-2 border-line bg-card2 py-2 ps-9 pe-3 text-xs font-bold text-ink placeholder:text-faint focus:outline-hidden focus:bg-card shadow-xs transition-all"
            />
          </div>
        </div>

        {/* Chapter Tabs with Tactile Neo-Brutalism */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {CHAPTERS.map((ch) => {
            const isActive = activeChapter === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChapter(ch.id)}
                className={`flex items-center gap-2.5 p-3.5 rounded-2xl border-2 border-line text-start transition-all cursor-pointer shadow-xs active:translate-x-0.5 active:translate-y-0.5 ${
                  isActive
                    ? "bg-card shadow-md -translate-x-0.5 -translate-y-0.5"
                    : "bg-card2 hover:bg-card text-soft hover:text-ink"
                }`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border-2 border-line text-xs font-black shadow-xs ${
                  isActive ? "bg-gradient-to-br from-teal-500 to-emerald-600 text-white" : "bg-card text-ink"
                }`}>
                  {ch.id === "fourier" ? <Layers size={15} /> : ch.id === "pde" ? <Flame size={15} /> : <Compass size={15} />}
                </span>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-black truncate">{ch.title}</p>
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

      {/* Formula Cards Grid with Tactile 2px Borders */}
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
              className="relative overflow-hidden rounded-2xl border-2 border-line bg-card p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3 hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-teal-500 to-transparent" />

              <div>
                <div className="flex items-center justify-between gap-2 border-b-2 border-line pb-2.5 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg border-2 border-line bg-card2 px-2.5 py-0.5 text-[11px] font-black text-teal-800 dark:text-teal-300 shadow-xs">
                      {f.category}
                    </span>
                    <h3 className="text-sm font-black text-ink">{f.title}</h3>
                  </div>

                  <button
                    onClick={() => handleCopy(f.id, f.latex)}
                    className="cursor-pointer inline-flex items-center gap-1 rounded-xl border-2 border-line bg-card2 px-2.5 py-1 text-[11px] font-bold text-soft hover:text-ink hover:bg-card shadow-xs transition-all active:translate-x-0.5 active:translate-y-0.5"
                    title="کپی فرمول به صورت کد LaTeX"
                  >
                    {copiedId === f.id ? (
                      <>
                        <Check size={12} className="text-emerald-500" />
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">کپی شد</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>LaTeX</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="rounded-xl bg-card2/60 border-2 border-line p-3 my-2 text-ink shadow-xs">
                  <MB tex={f.latex} />
                </div>

                <p className="text-xs sm:text-[13px] leading-6 text-soft font-medium">
                  <T text={f.description} />
                </p>
              </div>

              {f.conditions && (
                <div className="rounded-xl bg-teal-500/[0.08] p-2.5 text-[11px] leading-5 font-bold text-ink border-2 border-line shadow-xs">
                  <span className="text-teal-700 dark:text-teal-400 font-black block mb-0.5">شرایط کاربرد:</span>
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
