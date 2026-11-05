"use client";

import { useLocale } from "@/components/providers";
import { openTab } from "@/components/MenuTabs";
import { Photo, type Tint } from "@/components/Photo";
import type { IllusName } from "@/components/Illus";
import type { CategoryId } from "@/lib/carte";

type Tile = { id: Exclude<CategoryId, "boissons">; paths: string[]; illus: IllusName; tint: Tint };

// Une tuile par catégorie, nom en capitales. La photo remplace l'illustration dès qu'elle existe
// (assets/plats/tuile-<catégorie>.jpg, ou la photo du plat principal).
const TILES: Tile[] = [
  { id: "banh-mi", paths: ["/media/plats/tuile-banh-mi.jpg", "/media/plats/banh-mi.jpg", "/media/hero/banh-mi-poulet-sate.jpg"], illus: "baguette", tint: "rice" },
  { id: "bun", paths: ["/media/plats/tuile-bun.jpg", "/media/plats/bo-bun.jpg", "/media/plats/bun-thit.jpg"], illus: "bowl", tint: "rice" },
  { id: "bowls", paths: ["/media/plats/tuile-bowls.jpg", "/media/plats/tofu-bowl.jpg"], illus: "bowl", tint: "herb" },
  { id: "vege", paths: ["/media/plats/tuile-vege.jpg", "/media/plats/bo-bun-vegan.jpg"], illus: "leaf", tint: "sage" },
  { id: "desserts", paths: ["/media/desserts/tuile-desserts.jpg", "/media/desserts/dessert-du-jour.jpg", "/media/desserts/perles-tapioca.jpg"], illus: "dessert", tint: "chili" },
];

export function Tiles() {
  const { lang, d } = useLocale();
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
      {TILES.map((t, i) => (
        <li key={t.id} className={i === 0 ? "col-span-2 md:col-span-1" : ""}>
          <a
            href={`/${lang}#carte`}
            onClick={(e) => {
              if (openTab(t.id)) e.preventDefault();
            }}
            className="group card relative block aspect-[4/3] md:aspect-[3/4]"
          >
            <Photo paths={t.paths} alt="" illus={t.illus} tint={t.tint} sizes="(min-width: 768px) 19vw, 50vw" className="absolute inset-0 h-full w-full" illusClassName="h-[46%] w-[46%] -translate-y-4 transition-transform duration-300 group-hover:-translate-y-6 group-hover:rotate-[-6deg]" />
            <span className="absolute inset-x-3 bottom-3 flex min-h-11 items-center justify-center rounded-full bg-cream px-3 text-center font-[family-name:var(--font-display)] text-[0.9375rem] font-semibold tracking-[0.06em] text-ink uppercase md:text-base">
              {d.tiles.items[t.id]}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
