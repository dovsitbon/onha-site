// Photos du site.
//   npm run media
//
// 1. Trie les visuels Instagram utilisables (assets/raw/) dans assets/<catégorie>/ avec des noms lisibles
//    (sans écraser un fichier déjà présent : vos propres photos restent prioritaires).
// 2. Prépare pour le web TOUTES les photos de assets/hero, plats, desserts, restaurant et galerie
//    dans public/media/<catégorie>/ (next/image sert ensuite AVIF/WebP à la bonne taille),
//    et note leurs dimensions dans data/media-sizes.json.
//
// Pour ajouter une photo prise au restaurant : déposez-la sous le nom attendu (voir assets/A-PHOTOGRAPHIER.md),
// par ex. assets/plats/bo-bun.jpg, puis relancez « npm run media » : l'illustration de remplacement disparaît d'elle-même.
//
// Écartées volontairement : 03 (carte : son contenu est repris en HTML dans data/carte.json, ses photos sont des
// images de banque), 04 (carte du café, reprise dans data/carte.json), 05 (fond de Noël vide), 06 (doublon du logo).
import { copyFile, mkdir, readdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const CATS = ["hero", "plats", "desserts", "restaurant", "galerie"];
const exists = (f) => access(f).then(() => true, () => false);

// [source dans assets/raw, catégorie, nom, recadrage éventuel]
const PICKS = [
  ["onha_01_DYoqI84oRkG.jpg", "hero", "banh-mi-poulet-sate"],
  // Couverture de reel : on coupe le haut, où est incrusté « On prend le temps »
  ["onha_02_DYm1pwWslad_video-cover.jpg", "restaurant", "cafe-phin-comptoir", { left: 0, top: 420, width: 640, height: 716 }],
];

for (const [file, cat, name, crop] of PICKS) {
  const out = path.join(ROOT, "assets", cat, `${name}.jpg`);
  await mkdir(path.dirname(out), { recursive: true });
  if (await exists(out)) continue;
  const src = path.join(ROOT, "assets/raw", file);
  if (crop) await sharp(src).extract(crop).jpeg({ quality: 95 }).toFile(out);
  else await copyFile(src, out);
}

const sizes = {};
for (const cat of CATS) {
  const dir = path.join(ROOT, "assets", cat);
  await mkdir(dir, { recursive: true });
  await mkdir(path.join(ROOT, "public/media", cat), { recursive: true });
  for (const f of (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp|heic)$/i.test(f))) {
    const name = f.replace(/\.\w+$/, "").toLowerCase();
    const max = cat === "hero" ? 2400 : 1600;
    const info = await sharp(path.join(dir, f))
      .rotate()
      .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(path.join(ROOT, "public/media", cat, `${name}.jpg`));
    sizes[`/media/${cat}/${name}.jpg`] = [info.width, info.height];
  }
}

// Image de partage (Open Graph) 1200 × 630 : le bánh mì à droite, le logo et la promesse à gauche
const hero = path.join(ROOT, "assets/hero/banh-mi-poulet-sate.jpg");
const photo = await sharp(hero).rotate().resize(640, 630, { fit: "cover", position: "left" }).toBuffer();
const logo = await sharp(path.join(ROOT, "public/logo.svg"), { density: 200 }).resize({ width: 380 }).png().toBuffer();
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="560" height="630">
  <text x="70" y="330" font-family="Arial, sans-serif" font-weight="700" font-size="34" fill="#1B1A17">Street-food vietnamienne</text>
  <text x="70" y="374" font-family="Arial, sans-serif" font-size="25" fill="#4F7A3A">Bánh mì · bò bún · bowls · desserts</text>
  <rect x="70" y="410" width="64" height="6" rx="3" fill="#F1D27A"/>
  <text x="70" y="462" font-family="Arial, sans-serif" font-size="21" fill="#1B1A17">11 rue Saint-Leu · Amiens</text>
  <text x="70" y="494" font-family="Arial, sans-serif" font-size="21" fill="#1B1A17">Sur place et à emporter</text>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#FBF6EC" } })
  .composite([
    { input: photo, left: 560, top: 0 },
    { input: logo, left: 70, top: 120 },
    { input: text, left: 0, top: 0 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));

await writeFile(path.join(ROOT, "data/media-sizes.json"), JSON.stringify(sizes, null, 1) + "\n");
console.log(`${Object.keys(sizes).length} photos prêtes`);
