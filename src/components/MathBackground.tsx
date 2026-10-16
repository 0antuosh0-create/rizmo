import React, { useEffect, useRef } from "react";
import { M } from "./Math";

interface FloatingEquation {
  id: string;
  latex: string;
  title: string;
  side: "left" | "right";
  topPercent: number;
  delay: string;
  duration: string;
}

const EQUATIONS: FloatingEquation[] = [
  {
    id: "eq-1",
    latex: "\\nabla^2 u = 0",
    title: "معادله لاپلاس",
    side: "left",
    topPercent: 22,
    delay: "0s",
    duration: "11s",
  },
  {
    id: "eq-2",
    latex: "\\oint_C f(z) dz = 2\\pi i \\sum \\text{Res}",
    title: "قضیه مانده‌ها",
    side: "right",
    topPercent: 18,
    delay: "2s",
    duration: "13s",
  },
  {
    id: "eq-3",
    latex: "u_{tt} = c^2 u_{xx}",
    title: "معادله موج ۱ بعدی",
    side: "right",
    topPercent: 48,
    delay: "1.5s",
    duration: "15s",
  },
  {
    id: "eq-4",
    latex: "u_x = v_y, \\quad u_y = -v_x",
    title: "معادلات کوشی-ریمان",
    side: "left",
    topPercent: 54,
    delay: "3s",
    duration: "12s",
  },
  {
    id: "eq-5",
    latex: "\\int_{-\\infty}^\\infty e^{-x^2} dx = \\sqrt{\\pi}",
    title: "انتگرال گاوسی",
    side: "right",
    topPercent: 78,
    delay: "4s",
    duration: "14s",
  },
  {
    id: "eq-6",
    latex: "\\sum_{n=1}^\\infty \\frac{1}{n^2} = \\frac{\\pi^2}{6}",
    title: "مسئله بازل (اویلر)",
    side: "left",
    topPercent: 82,
    delay: "2.5s",
    duration: "16s",
  },
];

export const MathBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
  });

  // High-performance direct DOM mouse tracking (Zero React re-renders!)
  useEffect(() => {
    let animId: number;
    let isActive = true;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const updateSpotlight = () => {
      if (!isActive) return;
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.1;
      m.y += (m.targetY - m.y) * 0.1;

      if (spotlightRef.current && m.x > -500) {
        spotlightRef.current.style.background = `radial-gradient(550px circle at ${m.x}px ${m.y}px, rgba(45, 212, 191, 0.12), transparent 75%)`;
      }
      animId = requestAnimationFrame(updateSpotlight);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    animId = requestAnimationFrame(updateSpotlight);

    return () => {
      isActive = false;
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Living Ambient Harmonic Wave Simulation (Low CPU, 60fps, paused when hidden)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let running = true;
    let lastTime = performance.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Pause when tab is inactive to preserve battery and CPU
    const onVisibilityChange = () => {
      running = !document.hidden;
      if (running) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const render = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      t += dt * 0.75;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains("dark");
      const mouse = mouseRef.current;

      // 3 Harmonic wave streams (Fourier modes)
      const ribbons = [
        {
          color: isDark ? "rgba(45, 212, 191, 0.14)" : "rgba(15, 118, 110, 0.09)",
          baseY: h * 0.28,
          amplitude: 34,
          freq: 0.0022,
          speed: 1,
          dash: [6, 8],
        },
        {
          color: isDark ? "rgba(251, 191, 36, 0.11)" : "rgba(217, 119, 6, 0.07)",
          baseY: h * 0.58,
          amplitude: 42,
          freq: 0.0017,
          speed: 0.75,
          dash: [],
        },
        {
          color: isDark ? "rgba(244, 63, 94, 0.09)" : "rgba(225, 29, 72, 0.05)",
          baseY: h * 0.88,
          amplitude: 36,
          freq: 0.002,
          speed: 1.1,
          dash: [4, 6],
        },
      ];

      for (const r of ribbons) {
        ctx.beginPath();
        ctx.setLineDash(r.dash);
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 1.75;

        for (let x = 0; x <= w; x += 18) {
          const yOffset =
            Math.sin(x * r.freq + t * r.speed) * r.amplitude +
            Math.cos(x * r.freq * 2 - t * 0.5) * (r.amplitude * 0.35);

          // Subtle cursor interaction: waves pluck gently when mouse is near
          const distToMouse = Math.hypot(x - mouse.x, r.baseY + yOffset - mouse.y);
          const cursorForce = Math.max(0, 1 - distToMouse / 220);
          const bend = Math.sin(t * 3 + x * 0.02) * cursorForce * 30;

          const y = r.baseY + yOffset + bend;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Faint particle constellation along wave nodal points
      for (let i = 0; i < 14; i++) {
        const px = ((i * 160 + t * 24) % (w + 100)) - 50;
        const py = h * 0.3 + Math.sin(px * 0.003 + t) * 60 + Math.cos(i + t * 0.5) * 40;

        ctx.fillStyle = isDark
          ? i % 2 === 0
            ? "rgba(45, 212, 191, 0.25)"
            : "rgba(251, 191, 36, 0.2)"
          : i % 2 === 0
          ? "rgba(15, 118, 110, 0.15)"
          : "rgba(217, 119, 6, 0.12)";

        ctx.beginPath();
        ctx.arc(px, py, (i % 3) + 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, []); // Empty dependency array: starts ONCE! Zero overhead!

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* 1. Ambient Interactive Mouse Spotlight (Direct DOM, zero React re-renders) */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 transition-opacity duration-300 opacity-60 dark:opacity-35 pointer-events-none"
      />

      {/* 2. Living Wave Harmonic Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none opacity-85 dark:opacity-75"
      />

      {/* 3. Floating KaTeX Equation Stamps in the True Outer Margins (Wide screens only) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden 2xl:block">
        {EQUATIONS.map((eq) => (
          <div
            key={eq.id}
            className={`absolute rounded-2xl border border-line bg-card/75 dark:bg-card/65 backdrop-blur-md px-3.5 py-2 shadow-xs transition-transform duration-1000 ease-out ${
              eq.side === "left" ? "start-5" : "end-5"
            }`}
            style={{
              top: `${eq.topPercent}%`,
              animation: `float-gentle ${eq.duration} ease-in-out infinite alternate`,
              animationDelay: eq.delay,
            }}
          >
            <div className="text-teal-900 dark:text-teal-300 font-bold text-center">
              <M tex={eq.latex} />
            </div>
            <span className="block text-[10px] font-black text-faint text-center mt-1">
              {eq.title}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float-gentle {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(0.8deg);
          }
          100% {
            transform: translateY(4px) rotate(-0.8deg);
          }
        }
      `}</style>
    </div>
  );
};
