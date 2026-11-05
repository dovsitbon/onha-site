import type { Illus as IllusKind } from "@/lib/carte";

// Petites illustrations au trait, dessinées pour ONHA. Elles tiennent la place des photos de plats
// tant que le restaurant n'en a pas fourni (voir assets/A-PHOTOGRAPHIER.md), et décorent la page.
// viewBox 0 0 120 120, trait = currentColor.

export type IllusName = IllusKind | "leaf" | "counter" | "room" | "facade" | "brothers";

const P: Record<IllusName, string[]> = {
  baguette: [
    "M14 74C14 60 30 52 60 50S106 54 106 64 92 82 60 84 14 86 14 74Z",
    "M34 60 42 70M52 56 60 67M70 55 78 66M88 57 94 66",
    "M24 76C40 80 80 79 100 70",
    "M30 52C26 42 34 36 40 44M44 50C46 38 56 38 54 48M66 48C70 38 80 42 74 50",
  ],
  bowl: [
    "M16 58H104C104 82 86 98 60 98S16 82 16 58Z",
    "M44 98 46 106H74L76 98",
    "M28 58C32 50 38 50 42 58 46 50 52 50 56 58 60 50 66 50 70 58 74 50 80 50 84 58 88 50 94 50 96 58",
    "M70 40C70 30 80 26 86 30 84 38 76 42 70 40ZM70 40 82 32",
    "M84 22 112 8M90 26 116 16",
  ],
  nem: [
    "M18 70 64 46C70 43 78 46 80 52S78 64 72 67L26 90C20 93 13 90 11 84S12 73 18 70Z",
    "M40 84 86 60C92 57 100 60 102 66S100 78 94 81L48 104",
    "M28 74 32 84M40 68 44 78M52 62 56 72",
    "M92 30C92 20 102 16 108 20 106 28 98 32 92 30ZM92 30 104 22",
  ],
  dessert: [
    "M30 36H90L82 102H38Z",
    "M33 58H87M36 80H84",
    "M46 70a3 3 0 1 0 0.1 0M60 72a3 3 0 1 0 0.1 0M74 69a3 3 0 1 0 0.1 0M52 91a3 3 0 1 0 0.1 0M68 92a3 3 0 1 0 0.1 0",
    "M60 36C58 26 66 20 74 22 72 30 66 36 60 36Z",
  ],
  glass: ["M36 30H84L78 104H42Z", "M38 52H82", "M66 30 78 8H90", "M48 66a4 4 0 1 0 0.1 0M64 78a4 4 0 1 0 0.1 0M54 90a4 4 0 1 0 0.1 0"],
  phin: ["M38 34H82V52H38Z", "M28 52H92", "M42 52 46 106H74L78 52", "M60 58V66", "M47 88H73", "M50 34V26H70V34"],
  cup: ["M26 56H86V72C86 90 74 100 56 100S26 90 26 72Z", "M86 62C100 62 100 82 84 82", "M18 104H94", "M46 44C42 36 50 32 46 24M62 44C58 36 66 32 62 24"],
  leaf: ["M20 100C20 50 50 22 100 20 98 70 70 100 20 100Z", "M20 100 76 44M40 80 40 62M54 66 56 50M60 70 76 70M44 84 62 84"],
  counter: ["M10 70H110V104H10Z", "M10 78H110", "M24 70V40H44V70M76 70V48C76 40 96 40 96 48V70", "M30 20H90V34H30Z", "M38 27H82"],
  room: ["M14 104V40L60 16 106 40V104", "M34 104V72H56V104", "M68 64H92V84H68Z", "M80 64V84M68 74H92"],
  facade: ["M16 104V34H104V104", "M10 34H110L104 20H16Z", "M30 104V58H54V104", "M66 58H92V84H66Z", "M36 48H84"],
  brothers: ["M40 46a12 12 0 1 0 0.1 0M80 46a12 12 0 1 0 0.1 0", "M18 104C18 80 28 64 40 64S62 80 62 104", "M58 104C58 80 68 64 80 64S102 80 102 104"],
};

export function Illus({ name, className = "h-24 w-24", strokeWidth = 3 }: { name: IllusName; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/** Feuille d'herbe fraîche, en décor (trois tombent dans le bol de l'ouverture). */
export const LEAF = "M0 0C-2 -9 4 -16 12 -16 11 -7 6 -1 0 0ZM0 0 9 -11";
