import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Sparkles, Layers } from "lucide-react";
import { fa } from "../Math";

type WaveType = "square" | "sawtooth" | "triangle";

export const FourierVisualizer: React.FC = () => {
  const [waveType, setWaveType] = useState<WaveType>("square");
  const [harmonics, setHarmonics] = useState<number>(5);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showGibbs, setShowGibbs] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;
      if (isPlaying) {
        timeRef.current += 0.015;
      }

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const centerY = height / 2;
      const scaleX = width / (4 * Math.PI);
      const amplitude = height * 0.32;

      // Draw grid
      ctx.strokeStyle = "rgba(100, 116, 139, 0.15)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      // Center horizontal axis
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Pi vertical markings
      for (let k = -2; k <= 2; k++) {
        const x = width / 2 + k * Math.PI * scaleX;
        ctx.beginPath();
        ctx.moveTo(x, 20);
        ctx.lineTo(x, height - 20);
        ctx.stroke();
      }

      // Draw Ideal Target Wave (Dashed)
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.45)";
      ctx.lineWidth = 1.75;
      ctx.beginPath();

      for (let px = 0; px < width; px++) {
        const x = (px - width / 2) / scaleX;
        let idealY = 0;
        const normX = ((x % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        if (waveType === "square") {
          idealY = normX < Math.PI ? 1 : -1;
        } else if (waveType === "sawtooth") {
          idealY = (normX / Math.PI) - 1;
        } else if (waveType === "triangle") {
          idealY = normX < Math.PI ? (2 * normX / Math.PI - 1) : (3 - 2 * normX / Math.PI);
        }

        const py = centerY - idealY * amplitude;
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Draw Fourier Approximation Sum (Luminous Mint-Teal line)
      ctx.setLineDash([]);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#2dd4bf"; // Luminous Mint Teal
      ctx.beginPath();

      for (let px = 0; px < width; px++) {
        const x = (px - width / 2) / scaleX - timeRef.current * 0.4;
        let sum = 0;

        for (let n = 1; n <= harmonics; n++) {
          if (waveType === "square") {
            const k = 2 * n - 1;
            sum += (4 / (k * Math.PI)) * Math.sin(k * x);
          } else if (waveType === "sawtooth") {
            sum += (2 / (n * Math.PI)) * Math.pow(-1, n + 1) * Math.sin(n * x);
          } else if (waveType === "triangle") {
            const k = 2 * n - 1;
            sum += (8 / (Math.PI * Math.PI * k * k)) * Math.pow(-1, (k - 1) / 2) * Math.sin(k * x);
          }
        }

        const py = centerY - sum * amplitude;
        if (px === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Gibbs Highlight at Discontinuity (for Square wave)
      if (waveType === "square" && showGibbs) {
        const discX = width / 2 + Math.PI * scaleX - ((timeRef.current * 0.4 * scaleX) % (2 * Math.PI * scaleX));
        if (discX > 0 && discX < width) {
          ctx.fillStyle = "#fbbf24"; // gold
          ctx.beginPath();
          ctx.arc(discX, centerY - amplitude * 1.0895, 4.5, 0, 2 * Math.PI);
          ctx.fill();

          ctx.fillStyle = "rgba(251, 191, 36, 0.95)";
          ctx.font = "bold 11px Vazirmatn, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("اورشوت گیبس (+۸.۹٪)", discX, centerY - amplitude * 1.0895 - 10);
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [waveType, harmonics, isPlaying, showGibbs]);

  const formulas: Record<WaveType, string> = {
    square: "S_N(x) = \\frac{4}{\\pi} \\sum_{k=1}^N \\frac{\\sin((2k-1)x)}{2k-1}",
    sawtooth: "S_N(x) = \\frac{2}{\\pi} \\sum_{n=1}^N \\frac{(-1)^{n+1}}{n} \\sin(nx)",
    triangle: "S_N(x) = \\frac{8}{\\pi^2} \\sum_{k=1}^N \\frac{(-1)^{k-1}}{(2k-1)^2} \\sin((2k-1)x)",
  };

  return (
    <div className="rounded-2xl border-2 border-line bg-card p-4 sm:p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-line pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border-2 border-line bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-xs">
            <Layers size={16} />
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-black text-ink">شبیه‌ساز ترکیب هارمونیک‌های سری فوریه</h3>
            <p className="text-xs text-soft font-bold">سنتز سیگنال‌های متناوب با افزایش جملات سینوسی</p>
          </div>
        </div>

        {/* Wave Selector with Tactile Buttons */}
        <div className="flex items-center gap-1 rounded-xl border-2 border-line bg-card2 p-1 shadow-xs">
          <button
            onClick={() => setWaveType("square")}
            className={`rounded-lg px-2.5 py-1 text-xs font-black transition-all cursor-pointer ${
              waveType === "square"
                ? "border-2 border-line bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-xs"
                : "border-2 border-transparent text-soft hover:text-ink"
            }`}
          >
            موج مربعی
          </button>
          <button
            onClick={() => setWaveType("sawtooth")}
            className={`rounded-lg px-2.5 py-1 text-xs font-black transition-all cursor-pointer ${
              waveType === "sawtooth"
                ? "border-2 border-line bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-xs"
                : "border-2 border-transparent text-soft hover:text-ink"
            }`}
          >
            دندان‌اره‌ای
          </button>
          <button
            onClick={() => setWaveType("triangle")}
            className={`rounded-lg px-2.5 py-1 text-xs font-black transition-all cursor-pointer ${
              waveType === "triangle"
                ? "border-2 border-line bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-xs"
                : "border-2 border-transparent text-soft hover:text-ink"
            }`}
          >
            مثلثی
          </button>
        </div>
      </div>

      {/* Canvas with Tactile 2px Border */}
      <div className="relative w-full overflow-hidden rounded-xl border-2 border-line bg-slate-950/90 aspect-[16/8] sm:aspect-[16/7]">
        <canvas
          ref={canvasRef}
          width={800}
          height={350}
          className="w-full h-full block"
        />

        {/* Floating Controls */}
        <div className="absolute top-3 end-3 flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-2 border-line bg-slate-900/90 text-white shadow-xs transition-transform active:translate-x-0.5 active:translate-y-0.5 hover:bg-slate-800"
            title={isPlaying ? "توقف حرکت موج" : "اجرای موج"}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          </button>
          <button
            onClick={() => {
              timeRef.current = 0;
            }}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-2 border-line bg-slate-900/90 text-white shadow-xs transition-transform active:translate-x-0.5 active:translate-y-0.5 hover:bg-slate-800"
            title="شروع مجدد فاز"
          >
            <RotateCcw size={13} />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-2 start-3 flex flex-wrap items-center gap-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] font-bold text-white">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-teal-400 inline-block" />
            تقریب با {fa(harmonics)} هارمونیک
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t border-dashed border-slate-400 inline-block" />
            سیگنال آرمانی
          </span>
        </div>
      </div>

      {/* Sliders and Gibbs Toggle */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-black text-ink">
            <span>تعداد هارمونیک‌ها (N):</span>
            <span className="tabular-nums text-teal-800 dark:text-teal-300 bg-teal-500/15 px-2.5 py-0.5 rounded-lg border-2 border-line font-black shadow-xs">
              {fa(harmonics)} جمله
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={harmonics}
            onChange={(e) => setHarmonics(Number(e.target.value))}
            className="w-full accent-teal-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-faint font-bold">
            <span>۱ (هارمونیک پایه)</span>
            <span>۱۰</span>
            <span>۲۰ (تقریب دقیق)</span>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-2">
          {waveType === "square" && (
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-ink select-none">
              <input
                type="checkbox"
                checked={showGibbs}
                onChange={(e) => setShowGibbs(e.target.checked)}
                className="rounded accent-teal-600 h-4 w-4"
              />
              <span className="inline-flex items-center gap-1 font-bold">
                <Sparkles size={13} className="text-amber-500" />
                نمایش نشانگر پرش گیبس (Gibbs Phenomenon)
              </span>
            </label>
          )}

          <div className="text-[11px] text-soft font-bold bg-card2 border-2 border-line px-3 py-1.5 rounded-xl w-full text-center sm:text-start shadow-xs" dir="ltr">
            <span className="font-mono text-teal-800 dark:text-teal-300 font-bold">{formulas[waveType]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
