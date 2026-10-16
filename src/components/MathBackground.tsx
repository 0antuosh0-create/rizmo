import React from "react";

export const MathBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none opacity-80 dark:opacity-60"
    >
      {/* Whimsical Engineering Mathematical Stamps in the Margins */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <g className="text-teal-700/25 dark:text-teal-400/20" fill="none" stroke="currentColor">
          {/* 1. Harmonious Sine Wave & Phasor Circle (Top Right margin) */}
          <g transform="translate(1080, 75)">
            <circle cx="50" cy="50" r="38" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="12" y1="50" x2="88" y2="50" strokeWidth="1" />
            <line x1="50" y1="12" x2="50" y2="88" strokeWidth="1" />
            <circle cx="78" cy="24" r="3" fill="currentColor" />
            {/* Projected wave */}
            <path
              d="M 88 24 Q 115 -10 142 24 T 196 24 T 250 24"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </g>

          {/* 2. Integral Symbol with Limits (Left margin) */}
          <g transform="translate(45, 260)">
            <path
              d="M 22 10 C 18 10 14 16 14 30 L 14 65 C 14 80 10 88 6 88 M 6 10 C 10 10 14 16 14 30"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="24" cy="11" r="2" fill="currentColor" />
            <circle cx="5" cy="87" r="2" fill="currentColor" />
            {/* Wave packet */}
            <path
              d="M 28 48 Q 42 28 56 48 T 84 48 T 112 48"
              strokeWidth="1.25"
              strokeDasharray="2 3"
            />
          </g>

          {/* 3. Geometric Right-Angle Triangle (Bottom Right margin) */}
          <g transform="translate(1100, 580)">
            <path d="M 10 80 L 95 80 L 95 20 Z" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M 85 80 L 85 70 L 95 70" strokeWidth="1.2" />
            <circle cx="90" cy="75" r="1.5" fill="currentColor" />
            <path d="M 32 80 A 22 22 0 0 0 28 67" strokeWidth="1.2" strokeDasharray="2 2" />
          </g>

          {/* 4. Polar Coordinates Rose Curve (Bottom Left margin) */}
          <g transform="translate(55, 720)">
            <circle cx="45" cy="45" r="30" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
            <path
              d="M 45 45 C 58 18 72 45 45 45 C 72 58 45 72 45 45 C 32 72 18 45 45 45 C 18 32 45 18 45 45"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>

          {/* 5. Sparkles and mathematical constellation accents */}
          <g transform="translate(200, 140)">
            <path d="M 0 -7 L 0 7 M -7 0 L 7 0" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g transform="translate(960, 360)" className="text-amber-500/30 dark:text-amber-400/25">
            <path d="M 0 -8 L 0 8 M -8 0 L 8 0" strokeWidth="2" strokeLinecap="round" />
            <circle cx="0" cy="0" r="2" fill="currentColor" />
          </g>
          <g transform="translate(180, 890)" className="text-amber-500/30 dark:text-amber-400/25">
            <path d="M 0 -6 L 0 6 M -6 0 L 6 0" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
};
