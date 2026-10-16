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
        violet: "var(--violet)",
      },
      boxShadow: {
        "xs": "var(--shadow-xs)",
        "sm": "var(--shadow-sm)",
        "md": "var(--shadow-md)",
        "lg": "var(--shadow-lg)",
        "xl": "var(--shadow-xl)",
        "glow": "0 0 25px -4px rgba(45, 212, 191, 0.35)",
        "glow-amber": "0 0 25px -4px rgba(251, 191, 36, 0.35)",
      },
    },
  },
  plugins: [],
};
