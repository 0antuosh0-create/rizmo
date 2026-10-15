import React, { useState, useRef, useEffect, useMemo } from "react";
import { Compass, Circle, CheckCircle2, XCircle } from "lucide-react";
import { fa } from "../Math";

interface Pole {
  x: number;
  y: number;
  label: string;
  order: number;
  resReal: number;
  resImag: number;
  description: string;
}

interface ComplexPreset {
  id: string;
  name: string;
  latex: string;
  poles: Pole[];
}

const PRESETS: ComplexPreset[] = [
  {
    id: "p1",
    name: "دو قطب روی محور موهومی",
    latex: "f(z) = \\frac{1}{z^2 + 1} = \\frac{1}{(z - i)(z + i)}",
    poles: [
      { x: 0, y: 1, label: "+i", order: 1, resReal: 0, resImag: -0.5, description: "Res(f, +i) = -i/2" },
      { x: 0, y: -1, label: "-i", order: 1, resReal: 0, resImag: 0.5, description: "Res(f, -i) = +i/2" },
    ],
  },
  {
    id: "p2",
    name: "قطب ساده روی محور حقیقی",
    latex: "f(z) = \\frac{e^z}{z - 1.5}",
    poles: [
      { x: 1.5, y: 0, label: "1.5", order: 1, resReal: 4.48, resImag: 0, description: "Res(f, 1.5) = e^{1.5} ≈ 4.48" },
    ],
  },
  {
    id: "p3",
    name: "ترکیب قطب مرتبه ۲ و قطب ساده",
    latex: "f(z) = \\frac{z^2 + 1}{(z - 1)^2 (z + 2)}",
    poles: [
      { x: 1, y: 0, label: "+1 (مرتبه ۲)", order: 2, resReal: 0.444, resImag: 0, description: "Res(f, 1) = 4/9 ≈ 0.44" },
      { x: -2, y: 0, label: "-2 (ساده)", order: 1, resReal: 0.556, resImag: 0, description: "Res(f, -2) = 5/9 ≈ 0.56" },
    ],
  },
];

export const ComplexVisualizer: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("p1");
  const [contourRadius, setContourRadius] = useState<number>(1.8);
  const [contourCenterX, setContourCenterX] = useState<number>(0);
  const [contourCenterY, setContourCenterY] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activePreset = useMemo(
    () => PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0],
    [selectedPresetId]
  );

  // Determine which poles are inside the circular contour
  const polesStatus = useMemo(() => {
    return activePreset.poles.map((pole) => {
      const dist = Math.sqrt(
        Math.pow(pole.x - contourCenterX, 2) + Math.pow(pole.y - contourCenterY, 2)
      );
      const isInside = dist < contourRadius;
      return {
        ...pole,
        isInside,
        dist,
      };
    });
  }, [activePreset, contourCenterX, contourCenterY, contourRadius]);

  // Compute total enclosed residue
  const totalResidue = useMemo(() => {
    let rReal = 0;
    let rImag = 0;
    for (const p of polesStatus) {
      if (p.isInside) {
        rReal += p.resReal;
        rImag += p.resImag;
      }
    }
    return { real: rReal, imag: rImag };
  }, [polesStatus]);

  // 2*pi*i * (rReal + i rImag) = 2*pi*i*rReal - 2*pi*rImag
  const integralValue = useMemo(() => {
    const realPart = -2 * Math.PI * totalResidue.imag;
    const imagPart = 2 * Math.PI * totalResidue.real;
    return { real: realPart, imag: imagPart };
  }, [totalResidue]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const originX = width / 2;
    const originY = height / 2;
    const scale = width / 7;

    // Draw Grid
    ctx.strokeStyle = "rgba(100, 116, 139, 0.15)";
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]);

    for (let i = -3; i <= 3; i++) {
      if (i === 0) continue;
      // Verticals
      ctx.beginPath();
      ctx.moveTo(originX + i * scale, 0);
      ctx.lineTo(originX + i * scale, height);
      ctx.stroke();

      // Horizontals
      ctx.beginPath();
      ctx.moveTo(0, originY + i * scale);
      ctx.lineTo(width, originY + i * scale);
      ctx.stroke();
    }

    // Axes
    ctx.setLineDash([]);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.45)";
    ctx.lineWidth = 1.5;

    // Real Axis (X)
    ctx.beginPath();
    ctx.moveTo(20, originY);
    ctx.lineTo(width - 20, originY);
    ctx.stroke();

    // Imaginary Axis (Y)
    ctx.beginPath();
    ctx.moveTo(originX, height - 20);
    ctx.lineTo(originX, 20);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 11px Vazirmatn, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("Re(z)", width - 25, originY - 10);
    ctx.textAlign = "center";
    ctx.fillText("Im(z)", originX + 25, 25);

    // Draw Integration Contour (Circle C)
    const cX = originX + contourCenterX * scale;
    const cY = originY - contourCenterY * scale;
    const cR = contourRadius * scale;

    // Contour interior fill
    ctx.fillStyle = "rgba(139, 92, 246, 0.12)";
    ctx.beginPath();
    ctx.arc(cX, cY, cR, 0, 2 * Math.PI);
    ctx.fill();

    // Contour border
    ctx.strokeStyle = "#8b5cf6";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cX, cY, cR, 0, 2 * Math.PI);
    ctx.stroke();

    // Arrow indicator for counter-clockwise direction
    const arrowAngle = -Math.PI / 2;
    const ax = cX + cR * Math.cos(arrowAngle);
    const ay = cY + cR * Math.sin(arrowAngle);
    ctx.fillStyle = "#8b5cf6";
    ctx.beginPath();
    ctx.moveTo(ax - 5, ay - 5);
    ctx.lineTo(ax + 7, ay);
    ctx.lineTo(ax - 5, ay + 5);
    ctx.closePath();
    ctx.fill();

    // Draw Poles (Red X markers)
    for (const pole of polesStatus) {
      const px = originX + pole.x * scale;
      const py = originY - pole.y * scale;

      // Glow if inside
      if (pole.isInside) {
        ctx.fillStyle = "rgba(239, 68, 68, 0.2)";
        ctx.beginPath();
        ctx.arc(px, py, 16, 0, 2 * Math.PI);
        ctx.fill();
      }

      ctx.strokeStyle = pole.isInside ? "#ef4444" : "#94a3b8";
      ctx.lineWidth = 3;
      const size = 6.5;

      ctx.beginPath();
      ctx.moveTo(px - size, py - size);
      ctx.lineTo(px + size, py + size);
      ctx.moveTo(px + size, py - size);
      ctx.lineTo(px - size, py + size);
      ctx.stroke();

      // Label
      ctx.fillStyle = pole.isInside ? "#fca5a5" : "#64748b";
      ctx.font = "bold 11px Vazirmatn, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(pole.label, px, py - 12);
    }
  }, [activePreset, contourCenterX, contourCenterY, contourRadius, polesStatus]);

  const formatComplex = (r: number, i: number) => {
    const rClean = Math.abs(r) < 0.001 ? 0 : r;
    const iClean = Math.abs(i) < 0.001 ? 0 : i;
    if (rClean === 0 && iClean === 0) return "۰";
    if (rClean === 0) return `${fa(iClean.toFixed(2))} i`;
    if (iClean === 0) return `${fa(rClean.toFixed(2))}`;
    const sign = iClean >= 0 ? "+" : "-";
    return `${fa(rClean.toFixed(2))} ${sign} ${fa(Math.abs(iClean).toFixed(2))} i`;
  };

  return (
    <div className="rounded-2xl border border-line bg-card p-4 sm:p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-white shadow-xs">
            <Compass size={16} />
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-black text-ink">کاوشگر کانتور، تکینگی‌ها و قضیه مانده‌ها</h3>
            <p className="text-xs text-soft font-medium">مشاهده تغییرات انتگرال کانتوری کوشی با به دام افتادن قطب‌ها</p>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-1 rounded-xl border border-line bg-card2 p-1">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPresetId(p.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${
                selectedPresetId === p.id ? "bg-violet-600 text-white shadow-xs" : "text-soft hover:text-ink"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/* Canvas Area */}
        <div className="lg:col-span-2 relative w-full overflow-hidden rounded-xl border border-line bg-slate-950/90 aspect-[4/3] sm:aspect-[16/10]">
          <canvas
            ref={canvasRef}
            width={700}
            height={440}
            className="w-full h-full block"
          />

          <div className="absolute bottom-2 start-3 flex flex-wrap items-center gap-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] font-medium text-white">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-red-500 inline-block rounded-xs" />
              قطب‌های تابع (تکینگی‌ها)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full border-2 border-violet-400 inline-block" />
              مسیر کانتور بسته انتگرال (C)
            </span>
          </div>
        </div>

        {/* Control and Math Results Panel */}
        <div className="space-y-4">
          <div className="rounded-xl border border-line bg-card2/70 p-3.5 space-y-3">
            <h4 className="text-xs font-bold text-ink flex items-center justify-between">
              <span>تنظیم شعاع کانتور (R):</span>
              <span className="text-violet-600 dark:text-violet-300 tabular-nums font-bold">{fa(contourRadius.toFixed(1))}</span>
            </h4>
            <input
              type="range"
              min={0.5}
              max={3.0}
              step={0.1}
              value={contourRadius}
              onChange={(e) => setContourRadius(Number(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer"
            />

            <h4 className="text-xs font-bold text-ink flex items-center justify-between pt-1">
              <span>موقعیت مرکز کانتور (Re):</span>
              <span className="text-violet-600 dark:text-violet-300 tabular-nums font-bold">{fa(contourCenterX.toFixed(1))}</span>
            </h4>
            <input
              type="range"
              min={-2.0}
              max={2.0}
              step={0.1}
              value={contourCenterX}
              onChange={(e) => setContourCenterX(Number(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer"
            />
          </div>

          {/* Status of Poles */}
          <div className="rounded-xl border border-line bg-card2/70 p-3.5 space-y-2">
            <h4 className="text-xs font-bold text-ink">وضعیت قطب‌ها نسبت به کانتور:</h4>
            <div className="space-y-1.5 text-xs">
              {polesStatus.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-card border border-line">
                  <span className="font-bold flex items-center gap-1.5">
                    {p.isInside ? (
                      <CheckCircle2 size={13} className="text-emerald-500" />
                    ) : (
                      <XCircle size={13} className="text-faint" />
                    )}
                    قطب {p.label}
                  </span>
                  <span className={`text-[11px] font-bold ${p.isInside ? "text-emerald-600 dark:text-emerald-400" : "text-faint"}`}>
                    {p.isInside ? "محصور در کانتور" : "خارج کانتور"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Residue Formula Calculation */}
          <div className="rounded-xl border border-violet-500/25 bg-violet-500/10 p-3.5 space-y-2 text-ink">
            <p className="text-xs font-bold text-violet-600 dark:text-violet-300">نتیجه قضیه مانده‌ها:</p>
            <div className="text-[12px] font-mono leading-6 dir-ltr text-start space-y-1" dir="ltr">
              <p className="text-soft font-bold">
                ∮_C f(z) dz = 2πi · ∑ Res
              </p>
              <p className="text-ink font-bold text-sm">
                = {formatComplex(integralValue.real, integralValue.imag)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
