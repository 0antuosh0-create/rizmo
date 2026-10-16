import React from "react";

export const MathBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none opacity-60 dark:opacity-40"
    >
      {/* Whimsical warm background SVG with organic curves & mathematical doodles */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          {/* Warm playful dot grid */}
          <pattern
            id="cozy-dots"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="20"
              cy="20"
              r="1.2"
              fill="currentColor"
              className="text-amber-600/15 dark:text-amber-400/10"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cozy-dots)" />

        {/* Playful background doodles: soft floating sine waves and geometric contours */}
        <g className="text-orange-500/10 dark:text-amber-400/08" stroke="currentColor" strokeWidth="1.5" fill="none">
          {/* Cozy sine wave top left */}
          <path d="M -50 140 Q 50 60 150 140 T 350 140 T 550 140 T 750 140" />
          <path d="M -50 180 Q 50 100 150 180 T 350 180 T 550 180 T 750 180" strokeDasharray="4 6" opacity="0.6" />

          {/* Concentric polar circles top right */}
          <circle cx="92%" cy="180" r="80" strokeDasharray="3 5" />
          <circle cx="92%" cy="180" r="140" strokeDasharray="5 7" opacity="0.5" />

          {/* Delicate starburst accents */}
          <path d="M 12% 520 L 12% 540 M 11% 530 L 13% 530" strokeWidth="2" strokeLinecap="round" />
          <path d="M 88% 720 L 88% 740 M 87% 730 L 89% 730" strokeWidth="2" strokeLinecap="round" />
          <circle cx="15%" cy="850" r="45" strokeDasharray="2 4" />
        </g>
      </svg>

      {/* Atmospheric Cozy Radial Lantern Glows */}
      <div className="absolute -top-32 start-1/4 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -end-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-bl from-rose-500/10 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 start-1/3 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-emerald-500/10 via-teal-500/08 to-transparent blur-3xl pointer-events-none" />
    </div>
  );
};
