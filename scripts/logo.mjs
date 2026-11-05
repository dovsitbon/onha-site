// Vectorise le vrai logo d'ONHA (photo de profil Instagram : « onha » en lettres rondes, « Vietnam Street Food »
// en script, dans un cercle tracé au pinceau) :
//   public/logo-rond.svg      le badge complet (cercle + lettrage)
//   public/logo.svg           le lettrage seul, pour l'en-tête
//   app/icon.png, app/apple-icon.png  favicons
//   npm run logo
// Quand le restaurant fournira son fichier d'origine, il suffit de remplacer ces fichiers.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import potrace from "potrace";

const ROOT = path.resolve(import.meta.dirname, "..");
const src = path.join(ROOT, "assets/raw/onha_logo.jpg");

const trace = (buf) =>
  new Promise((ok, ko) => potrace.trace(buf, { threshold: 128, turdSize: 30, optTolerance: 0.4 }, (e, s) => (e ? ko(e) : ok(s.match(/ d="([^"]+)"/)[1]))));

async function bbox(buf) {
  const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
  let minX = info.width, minY = info.height, maxX = 0, maxY = 0;
  for (let y = 0; y < info.height; y++)
    for (let x = 0; x < info.width; x++)
      if (data[(y * info.width + x) * info.channels] < 128) {
        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      }
  const pad = 10;
  return `${minX - pad} ${minY - pad} ${maxX - minX + pad * 2} ${maxY - minY + pad * 2}`;
}

// 1. Badge rond : on blanchit tout ce qui est hors du disque (les coins noirs de la photo de profil)
const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080"><rect width="1080" height="1080" fill="#fff"/><circle cx="540" cy="540" r="528" fill="#000"/></svg>`);
// (sharp redimensionne avant de composer : on compose d'abord à 1080 px, puis on agrandit)
const masked = await sharp(src).composite([{ input: mask, blend: "lighten" }]).png().toBuffer();
const disc = await sharp(masked).grayscale().resize({ width: 2160 }).threshold(120).png().toBuffer();
const badge = { d: await trace(disc), viewBox: await bbox(disc) };

// 2. Lettrage seul (sans le cercle)
const word = await sharp(src).extract({ left: 150, top: 360, width: 800, height: 310 }).grayscale().resize({ width: 2400 }).threshold(120).png().toBuffer();
const mark = { d: await trace(word), viewBox: await bbox(word) };

const svg = (p, fill, label) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${p.viewBox}" role="img" aria-label="${label}"><path fill="${fill}" fill-rule="evenodd" d="${p.d}"/></svg>\n`;
const label = "ONHA Vietnam Street Food";
await writeFile(path.join(ROOT, "public/logo.svg"), svg(mark, "#1B1A17", label));
await writeFile(path.join(ROOT, "public/logo-rond.svg"), svg(badge, "#1B1A17", label));
// Favicons (PNG) tirés du badge rond, sur fond crème
for (const [file, size] of [["app/icon.png", 96], ["app/apple-icon.png", 180]]) {
  const m = Math.round(size / 20);
  const inner = await sharp(path.join(ROOT, "public/logo-rond.svg"), { density: 300 }).resize(size - m * 2, size - m * 2).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: "#FBF6EC" } }).composite([{ input: inner, left: m, top: m }]).png().toFile(path.join(ROOT, file));
}
console.log("logo vectorisé", mark.viewBox, badge.viewBox);
