import React from "react";

export const MathBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none opacity-40 dark:opacity-20"
    >
      {/* Subtle architectural grid pattern */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="math-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
              className="text-line-soft/60"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#math-grid)" />
      </svg>

      {/* Atmospheric radial gradient orbs */}
      <div className="absolute -top-32 start-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -end-32 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 start-1/3 h-96 w-96 rounded-full bg-amber-500/08 blur-3xl pointer-events-none" />
    </div>
  );
};
