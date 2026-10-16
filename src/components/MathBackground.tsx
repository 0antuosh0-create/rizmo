import React from "react";

export const MathBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none opacity-70 dark:opacity-45"
    >
      {/* Engineering Dual-Layer Graph Grid & Mathematical Doodles */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          {/* Minor 24px grid */}
          <pattern
            id="graph-grid-minor"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              className="text-amber-800/10 dark:text-amber-400/08"
            />
          </pattern>

          {/* Major 96px grid with corner crosshairs */}
          <pattern
            id="graph-grid-major"
            width="96"
            height="96"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 96 0 L 0 0 0 96"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="text-amber-900/15 dark:text-amber-400/12"
            />
            {/* Small corner plus crosshairs */}
            <path
              d="M -4 0 L 4 0 M 0 -4 L 0 4"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-orange-600/30 dark:text-orange-400/25"
            />
          </pattern>
        </defs>

        {/* Base dual graph paper */}
        <rect width="100%" height="100%" fill="url(#graph-grid-minor)" />
        <rect width="100%" height="100%" fill="url(#graph-grid-major)" />

        {/* Whimsical Mathematical Doodles & Stamps in the Margins */}
        <g className="text-orange-600/20 dark:text-amber-400/15" fill="none" stroke="currentColor">
          {/* 1. Harmonious Sine Wave & Phasor Circle (Top Right margin) */}
          <g transform="translate(1100, 80)">
            <circle cx="60" cy="60" r="45" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="15" y1="60" x2="105" y2="60" strokeWidth="1" />
            <line x1="60" y1="15" x2="60" y2="105" strokeWidth="1" />
            <circle cx="92" cy="28" r="3.5" fill="currentColor" />
            {/* Projected wave */}
            <path
              d="M 105 28 Q 135 -15 165 28 T 225 28 T 285 28"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* 2. Integral & Differential Equations Motif (Left margin) */}
          <g transform="translate(40, 280)">
            {/* Elegant stylized integral symbol */}
            <path
              d="M 25 10 C 20 10 15 18 15 35 L 15 75 C 15 92 10 100 5 100 M 5 10 C 10 10 15 18 15 35"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Limits */}
            <circle cx="28" cy="12" r="2" fill="currentColor" />
            <circle cx="4" cy="98" r="2" fill="currentColor" />
            {/* Wave packet */}
            <path
              d="M 35 55 Q 50 30 65 55 T 95 55 T 125 55"
              strokeWidth="1.5"
              strokeDasharray="2 3"
            />
          </g>

          {/* 3. Geometric Right-Angle Triangle with Dot (Bottom Right margin) */}
          <g transform="translate(1080, 560)">
            <path d="M 10 90 L 110 90 L 110 20 Z" strokeWidth="1.5" strokeLinejoin="round" />
            {/* Right-angle square */}
            <path d="M 98 90 L 98 78 L 110 78" strokeWidth="1.2" />
            <circle cx="104" cy="84" r="1.5" fill="currentColor" />
            {/* Angle arc */}
            <path d="M 35 90 A 25 25 0 0 0 31 75" strokeWidth="1.2" strokeDasharray="2 2" />
          </g>

          {/* 4. Polar Coordinates Rose Petal Curve (Bottom Left margin) */}
          <g transform="translate(60, 680)">
            <circle cx="50" cy="50" r="35" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
            <circle cx="50" cy="50" r="20" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.4" />
            {/* 4-leaf rose curve */}
            <path
              d="M 50 50 C 65 20 80 50 50 50 C 80 65 50 80 50 50 C 35 80 20 50 50 50 C 20 35 50 20 50 50"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>

          {/* 5. Playful Sparkles & Starbursts scattered throughout */}
          <g transform="translate(180, 160)">
            <path d="M 0 -8 L 0 8 M -8 0 L 8 0" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g transform="translate(980, 380)">
            <path d="M 0 -10 L 0 10 M -10 0 L 10 0" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="0" cy="0" r="2.5" fill="currentColor" />
          </g>
          <g transform="translate(220, 890)">
            <path d="M 0 -7 L 0 7 M -7 0 L 7 0" strokeWidth="1.8" strokeLinecap="round" />
          </g>
          <g transform="translate(1180, 840)">
            <circle cx="0" cy="0" r="5" strokeWidth="1.5" strokeDasharray="2 2" />
          </g>
        </g>
      </svg>

      {/* Atmospheric Cozy Radial Lantern Glows behind the grid */}
      <div className="absolute -top-24 start-1/4 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-amber-500/20 via-orange-500/12 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -end-24 h-[30rem] w-[30rem] rounded-full bg-gradient-to-bl from-rose-500/12 via-amber-500/12 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 start-1/3 h-[34rem] w-[34rem] rounded-full bg-gradient-to-tr from-emerald-500/14 via-teal-500/08 to-transparent blur-3xl pointer-events-none" />
    </div>
  );
};
