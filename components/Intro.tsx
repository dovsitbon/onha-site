"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { LEAF } from "@/components/Illus";
import { Logo } from "@/components/Logo";

const KEY = "onha-intro";
const at = (d: number, t?: number) => ({ "--d": `${d}s`, ...(t ? { "--t": `${t}s` } : {}) }) as CSSProperties;

const LEAVES = [
  { x: 78, y: 80, r: -28, r0: -80, d: 0.42 },
  { x: 102, y: 76, r: 6, r0: 50, d: 0.5 },
  { x: 124, y: 81, r: 34, r0: -40, d: 0.58 },
];

/**
 * Ouverture (1,2 s, une fois par session), tout en CSS (globals.css) : un bol se dessine au trait,
 * une paire de baguettes s'y pose, trois feuilles d'herbes tombent dedans, « onha » apparaît, fondu sur le hero.
 * Bouton « Passer » ; ignorée si l'utilisateur préfère réduire les animations.
 */
export function Intro({ skipLabel }: { skipLabel: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      document.documentElement.classList.add("intro-seen");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  const p = { pathLength: 1, className: "intro-draw" };
  return (
    <div className="intro-curtain flex flex-col items-center justify-center text-ink">
      <svg viewBox="0 0 200 160" className="h-36 w-auto md:h-44" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path {...p} d="M30 84H170C170 120 140 144 100 144S30 120 30 84Z" style={at(0, 0.36)} />
        <path {...p} d="M80 144 83 154H117L120 144" style={at(0.2, 0.14)} />
        <g className="intro-sticks">
          <path d="M92 74 184 30" />
          <path d="M100 80 190 44" />
        </g>
        {LEAVES.map((l) => (
          <g key={l.x} transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}>
            <path d={LEAF} className="intro-leaf" fill="#4F7A3A" stroke="#375A27" strokeWidth={2} style={{ ...at(l.d), "--r0": `${l.r0}deg` } as CSSProperties} />
          </g>
        ))}
      </svg>
      <div className="intro-word mt-6" aria-hidden="true">
        <Logo className="w-40 md:w-48" />
      </div>
      <button
        type="button"
        onClick={() => {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          document.documentElement.classList.add("intro-seen");
          setGone(true);
        }}
        className="absolute end-4 bottom-4 min-h-11 rounded-full px-4 font-bold text-muted transition-colors hover:text-ink"
      >
        {skipLabel}
      </button>
    </div>
  );
}
