import carte from "@/data/carte.json";
import type { Dict } from "@/lib/i18n";

export type Tag = "vegan" | "vegetarian" | "vegeOption" | "spicy";
export type Illus = "baguette" | "bowl" | "nem" | "dessert" | "glass" | "phin" | "cup";
export type Item = {
  vn: string | null;
  price: number | null;
  variants?: { id: "m" | "l"; price: number }[];
  choices: boolean;
  tags: Tag[];
  photo: string[];
  illus: Illus;
  rotation?: boolean;
};
export type ItemId = keyof typeof carte.items;
export type CategoryId = "banh-mi" | "bun" | "bowls" | "vege" | "desserts" | "boissons";
export type GarnitureId = keyof Dict["carte"]["garnitures"];
export type SauceId = keyof Dict["carte"]["sauces"];

export const ITEMS = carte.items as unknown as Record<ItemId, Item>;
export const ITEM_IDS = Object.keys(ITEMS) as ItemId[];
export const GARNITURES = carte.garnitures.map((g) => g.id) as GarnitureId[];
export const SAUCES = carte.sauces.map((s) => s.id) as SauceId[];
export const isItem = (v: unknown): v is ItemId => typeof v === "string" && v in ITEMS;

const VEG = new Set<Tag>(["vegan", "vegetarian", "vegeOption"]);

/** Onglets de la carte : les catégories de data/carte.json, plus « Végé & végan » calculé d'après les pastilles. */
export function categories(): { id: CategoryId; items: ItemId[] }[] {
  const base = carte.categories as { id: CategoryId; items: ItemId[] }[];
  const food = base.filter((c) => c.id !== "boissons").flatMap((c) => c.items);
  const vege = food.filter((id) => ITEMS[id].tags.some((t) => VEG.has(t)));
  const out = [...base];
  out.splice(3, 0, { id: "vege", items: vege });
  return out;
}

/** Prix d'une ligne (taille comprise) ; null si le prix n'est pas encore connu. */
export function unitPrice(id: ItemId, variant?: string) {
  const it = ITEMS[id];
  return it.variants?.find((v) => v.id === variant)?.price ?? it.price;
}

export const checked = carte.checked;
