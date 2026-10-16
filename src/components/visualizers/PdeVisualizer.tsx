import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Flame, Activity } from "lucide-react";
import { fa } from "../Math";

type PdeMode = "heat" | "wave";
type BoundaryType = "dirichlet" | "neumann";

export const PdeVisualizer: React.FC = () => {
  const [mode, setMode] = useState<PdeMode>("heat");
  const [boundary, setBoundary] = useState<BoundaryType>("dirichlet");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
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
        timeRef.current += 0.016 * speed;
      }

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const margin = 45;
      const plotWidth = width - 2 * margin;
      const plotHeight = height - 2 * margin;
      const centerY = height - margin;

      // Draw Axes and Rod representation
      ctx.strokeStyle = "rgba(100, 116, 139, 0.25)";
      ctx.lineWidth = 1.25;

      // Base Rod line
      ctx.beginPath();
      ctx.moveTo(margin, centerY);
      ctx.lineTo(margin + plotWidth, centerY);
      ctx.stroke();

      // End boundaries indicators
      ctx.lineWidth = 3;
      ctx.strokeStyle = boundary === "dirichlet" ? "#2dd4bf" : "#fbbf24";

      // Left boundary (x = 0)
      ctx.beginPath();
      ctx.moveTo(margin, centerY - plotHeight * 0.9);
      ctx.lineTo(margin, centerY + 10);
      ctx.stroke();

      // Right boundary (x = L)
      ctx.beginPath();
      ctx.moveTo(margin + plotWidth, centerY - plotHeight * 0.9);
      ctx.lineTo(margin + plotWidth, centerY + 10);
      ctx.stroke();

      // Labels
      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 11px Vazirmatn, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("x = 0", margin, centerY + 22);
      ctx.fillText("x = L", margin + plotWidth, centerY + 22);

      const t = timeRef.current;
      const numPoints = 120;
      const points: Array<{ x: number; y: number }> = [];

      for (let i = 0; i <= numPoints; i++) {
        const xNorm = i / numPoints; // 0 to 1
        const xReal = margin + xNorm * plotWidth;
        let u = 0;

        if (mode === "heat") {
          // Heat Equation Simulation (Diffusion over time)
          if (boundary === "dirichlet") {
            const alpha = 0.08;
            for (let n = 1; n <= 7; n += 2) {
              const decay = Math.exp(-Math.pow(n * Math.PI, 2) * alpha * (t % 8));
              u += (4 / (n * Math.PI)) * Math.sin(n * Math.PI * xNorm) * decay;
            }
          } else {
            const alpha = 0.08;
            const decay = Math.exp(-Math.pow(Math.PI, 2) * alpha * (t % 8));
            u = 0.5 + 0.4 * Math.cos(Math.PI * xNorm) * decay;
          }
        } else {
          // Wave Equation (Oscillating string: standing wave)
          const c = 2.5;
          if (boundary === "dirichlet") {
            u = 0.6 * Math.sin(Math.PI * xNorm) * Math.cos(Math.PI * c * t) +
                0.25 * Math.sin(2 * Math.PI * xNorm) * Math.cos(2 * Math.PI * c * t) +
                0.15 * Math.sin(3 * Math.PI * xNorm) * Math.cos(3 * Math.PI * c * t);
          } else {
            u = 0.7 * Math.sin(0.5 * Math.PI * xNorm) * Math.cos(0.5 * Math.PI * c * t);
          }
        }

        const yReal = centerY - (u * (plotHeight * 0.75));
        points.push({ x: xReal, y: yReal });
      }

      // Draw Gradient fill under the curve
      const grad = ctx.createLinearGradient(0, centerY - plotHeight, 0, centerY);
      if (mode === "heat") {
        grad.addColorStop(0, "rgba(245, 158, 11, 0.45)");
        grad.addColorStop(1, "rgba(245, 158, 11, 0.01)");
      } else {
        grad.addColorStop(0, "rgba(45, 212, 191, 0.45)");
        grad.addColorStop(1, "rgba(45, 212, 191, 0.01)");
      }

      ctx.beginPath();
      ctx.moveTo(points[0].x, centerY);
      for (const p of points) {
        ctx.lineTo(p.x, p.y);
      }
      ctx.lineTo(points[points.length - 1].x, centerY);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Draw Curve Stroke
      ctx.beginPath();
      ctx.strokeStyle = mode === "heat" ? "#f59e0b" : "#2dd4bf";
      ctx.lineWidth = 2.5;
      for (let i = 0; i < points.length; i++) {
        if (i === 0) ctx.moveTo(points[i].x, points[i].y);
        else ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();

      // Time indicator
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px Vazirmatn, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`زمان شبیه‌سازی: t = ${(mode === "heat" ? (t % 8) : t).toFixed(2)}s`, margin + 10, margin - 15);

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [mode, boundary, isPlaying, speed]);

  return (
    <div className="rounded-2xl border-2 border-line bg-card p-4 sm:p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-line pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border-2 border-line bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xs">
            {mode === "heat" ? <Flame size={16} /> : <Activity size={16} />}
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-black text-ink">شبیه‌ساز معادلات دیفرانسیل جزئی (حرارت و موج)</h3>
            <p className="text-xs text-soft font-bold">مشاهده تغییرات مکانی-زمانی دما و نوسانات تار در شرایط مرزی مختلف</p>
          </div>
        </div>

        {/* Mode Switcher with Tactile Buttons */}
        <div className="flex items-center gap-1 rounded-xl border-2 border-line bg-card2 p-1 shadow-xs">
          <button
            onClick={() => {
              setMode("heat");
              timeRef.current = 0;
            }}
            className={`rounded-lg px-2.5 py-1 text-xs font-black transition-all cursor-pointer ${
              mode === "heat"
                ? "border-2 border-line bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs"
                : "border-2 border-transparent text-soft hover:text-ink"
            }`}
          >
            معادله حرارت (پخش)
          </button>
          <button
            onClick={() => {
              setMode("wave");
              timeRef.current = 0;
            }}
            className={`rounded-lg px-2.5 py-1 text-xs font-black transition-all cursor-pointer ${
              mode === "wave"
                ? "border-2 border-line bg-gradient-to-r from-teal-600 to-emerald-600 dark:from-teal-400 dark:to-emerald-400 text-white dark:text-slate-950 shadow-xs"
                : "border-2 border-transparent text-soft hover:text-ink"
            }`}
          >
            معادله موج (ارتعاش تار)
          </button>
        </div>
      </div>

      {/* Canvas */}
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
            title={isPlaying ? "توقف شبیه‌سازی" : "ادامه شبیه‌سازی"}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          </button>
          <button
            onClick={() => {
              timeRef.current = 0;
            }}
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-2 border-line bg-slate-900/90 text-white shadow-xs transition-transform active:translate-x-0.5 active:translate-y-0.5 hover:bg-slate-800"
            title="ریست زمان به صفر"
          >
            <RotateCcw size={13} />
          </button>
        </div>

        {/* Boundary Condition Tags */}
        <div className="absolute top-3 start-3 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] font-bold text-white">
          <span>شرط مرزی:</span>
          <button
            onClick={() => {
              setBoundary(boundary === "dirichlet" ? "neumann" : "dirichlet");
              timeRef.current = 0;
            }}
            className="cursor-pointer text-teal-400 underline hover:text-teal-300 font-black"
          >
            {boundary === "dirichlet" ? "دیریکله (دو انتهای صفر)" : "نویمان (انتهای عایق/آزاد)"}
          </button>
        </div>
      </div>

      {/* Controls Footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3 text-xs font-bold text-soft">
          <span>سرعت شبیه‌سازی:</span>
          <div className="flex items-center gap-1">
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`rounded-lg px-2.5 py-0.5 text-xs font-black transition-all cursor-pointer border-2 border-line shadow-xs active:translate-x-0.5 active:translate-y-0.5 ${
                  speed === s
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    : "bg-card2 hover:bg-card"
                }`}
              >
                {fa(s)}x
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-soft font-medium">
          {mode === "heat"
            ? "در معادله حرارت، با گذشت زمان نمایی e^{-(nπ/L)² c² t} مدهای هارمونیک را به تدریج خاموش می‌کند تا میله به تعادل برسد."
            : "در معادله موج، انرژی مدها تلف نمی‌شود و ترکیب پایه‌های سینوسی و کسینوسی حرکت نامحدود متناوب را می‌سازد."}
        </p>
      </div>
    </div>
  );
};
