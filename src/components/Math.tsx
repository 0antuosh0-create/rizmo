import React, { useMemo } from "react";
import katex from "katex";

// Global LRU/Map cache for compiled KaTeX HTML strings
const mathCache = new Map<string, string>();

const KATEX_OPTIONS = {
  throwOnError: false,
  strict: "ignore" as const,
  trust: true,
  output: "html" as const,
};

function renderKatex(tex: string, displayMode: boolean): string {
  const cleanTex = tex.trim();
  const key = `${displayMode ? "D:" : "I:"}${cleanTex}`;
  const cached = mathCache.get(key);
  if (cached !== undefined) return cached;

  try {
    const html = katex.renderToString(cleanTex, {
      ...KATEX_OPTIONS,
      displayMode,
    });
    mathCache.set(key, html);
    return html;
  } catch {
    const fallback = `<span class="katex-error" style="color:#ef4444;direction:ltr;unicode-bidi:isolate">${cleanTex}</span>`;
    mathCache.set(key, fallback);
    return fallback;
  }
}

/** Inline math component with global cache and memoization */
export const M = React.memo(function M({
  tex,
  className = "",
}: {
  tex: string;
  className?: string;
}) {
  const html = useMemo(() => renderKatex(tex, false), [tex]);
  return (
    <span
      dir="ltr"
      className={`math-inline ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});

/** Block (display) math with global cache and memoization */
export const MB = React.memo(function MB({
  tex,
  className = "",
}: {
  tex: string;
  className?: string;
}) {
  const html = useMemo(() => renderKatex(tex, true), [tex]);
  return (
    <div
      dir="ltr"
      className={`math-block w-full min-w-0 max-w-full overflow-x-auto overflow-y-hidden py-1.5 scrollbar-thin ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Convert latin digits to Persian digits */
export function fa(input: string | number): string {
  const s = String(input);
  if (!/[0-9]/.test(s)) return s;
  return s.replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

/**
 * Persian text with embedded $$...$$ block and $...$ inline LaTeX formulas.
 * Efficiently tokenizes without corrupting LaTeX expressions.
 */
export const T = React.memo(function T({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  if (!text) return null;

  if (!text.includes("$")) {
    return <span className={className}>{fa(text)}</span>;
  }

  const tokens: React.ReactNode[] = [];
  // Match $$...$$ first, then $...$
  const regex = /\$\$([\s\S]+?)\$\$|\$([^\$]+?)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(
        <span key={`txt-${lastIndex}`}>
          {fa(text.slice(lastIndex, match.index))}
        </span>
      );
    }
    if (match[1] !== undefined) {
      // Display Math ($$...$$)
      tokens.push(<MB key={`mb-${match.index}`} tex={match[1]} />);
    } else if (match[2] !== undefined) {
      // Inline Math ($...$)
      tokens.push(<M key={`m-${match.index}`} tex={match[2]} />);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push(
      <span key={`txt-${lastIndex}`}>
        {fa(text.slice(lastIndex))}
      </span>
    );
  }

  return <span className={className}>{tokens}</span>;
});

/** A row of display-math lines, vertically stacked */
export const MathLines = React.memo(function MathLines({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-1.5 w-full min-w-0 max-w-full ${className}`}>
      {lines.map((l, i) => (
        <MB key={i} tex={l} />
      ))}
    </div>
  );
});
