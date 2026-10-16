function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Vazirmatn", "system-ui", "-apple-system", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      colors: {
        paper: withOpacity("--bg-rgb"),
        card: withOpacity("--card-rgb"),
        card2: withOpacity("--card2-rgb"),
        card3: withOpacity("--card3-rgb"),
        ink: withOpacity("--ink-rgb"),
        soft: withOpacity("--soft-rgb"),
        faint: withOpacity("--faint-rgb"),
        line: withOpacity("--line-rgb"),
        "line-soft": "var(--line-soft)",
        accent: withOpacity("--accent-rgb"),
        "accent-hover": "var(--accent-hover)",
        "accent-ink": "var(--accent-ink)",
        gold: "var(--gold)",
        coral: "var(--coral)",
        mint: "var(--mint)",
      },
      boxShadow: {
        "xs": "var(--shadow-xs)",
        "sm": "var(--shadow-sm)",
        "md": "var(--shadow-md)",
        "lg": "var(--shadow-lg)",
        "xl": "var(--shadow-xl)",
        "warm": "0 10px 25px -4px rgba(234, 88, 12, 0.18), 0 4px 10px -2px rgba(234, 88, 12, 0.1)",
        "glow-orange": "0 0 25px -3px rgba(234, 88, 12, 0.4)",
        "glow-mint": "0 0 25px -3px rgba(16, 185, 129, 0.4)",
        "glow-amber": "0 0 25px -3px rgba(245, 158, 11, 0.4)",
      },
    },
  },
  plugins: [],
};
