// Affichette A5 imprimable (PDF) avec QR code vers le site, à poser sur le comptoir ou en vitrine.
//   npm run affichette   →   print/affichette-onha-a5.pdf (+ aperçu PNG)
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const site = JSON.parse(await readFile(path.join(ROOT, "data/site.json"), "utf8"));
const url = `${site.url}/fr`;

const hex = (h) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const CREAM = hex("#FBF6EC");
const INK = hex("#1B1A17");
const HERB = hex("#4F7A3A");
const RICE = hex("#F1D27A");
const MUTED = hex("#4F4B42");

const pdf = await PDFDocument.create();
pdf.setTitle("ONHA Vietnam Street-Food : affichette A5");
pdf.setAuthor("ONHA Vietnam Street-Food");
const W = 419.53;
const H = 595.28;
const page = pdf.addPage([W, H]);
const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
const sans = await pdf.embedFont(StandardFonts.Helvetica);

page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: CREAM });

// Photo du haut : le bánh mì, en bandeau
const photoH = 190;
const photo = await sharp(path.join(ROOT, "assets/hero/banh-mi-poulet-sate.jpg")).resize(1260, Math.round((1260 * photoH) / W), { fit: "cover", position: "centre" }).jpeg({ quality: 88 }).toBuffer();
page.drawImage(await pdf.embedJpg(photo), { x: 0, y: H - photoH, width: W, height: photoH });

// Badge rond (vrai logo vectorisé) qui chevauche la photo ; rasterisé car pdf-lib ignore la règle evenodd des tracés SVG
const badgeS = 96;
page.drawCircle({ x: W / 2, y: H - photoH, size: badgeS / 2 + 5, color: CREAM });
const badge = await sharp(path.join(ROOT, "public/logo-rond.svg"), { density: 300 }).resize(600).png().toBuffer();
page.drawImage(await pdf.embedPng(badge), { x: (W - badgeS) / 2, y: H - photoH - badgeS / 2, width: badgeS, height: badgeS });

const center = (text, font, size, y, color = INK) => page.drawText(text, { x: (W - font.widthOfTextAtSize(text, size)) / 2, y, size, font, color });

let y = H - photoH - badgeS / 2 - 34;
center("Commandez à emporter", bold, 22, y);
y -= 20;
center("en ligne, puis passez récupérer votre plat", sans, 12, y, MUTED);

// QR code dans une carte blanche
const qrS = 116;
y -= 24 + qrS;
page.drawRectangle({ x: (W - qrS) / 2 - 12, y: y - 12, width: qrS + 24, height: qrS + 24, color: rgb(1, 1, 1), borderColor: RICE, borderWidth: 3 });
const qrPng = await QRCode.toBuffer(url, { margin: 0, width: 600, color: { dark: "#1B1A17", light: "#FFFFFF" }, errorCorrectionLevel: "M" });
page.drawImage(await pdf.embedPng(qrPng), { x: (W - qrS) / 2, y, width: qrS, height: qrS });
y -= 32;
center(url.replace(/^https?:\/\//, ""), bold, 9.5, y, HERB);

// Bandeau vert : la carte courte
y -= 30;
page.drawRectangle({ x: 28, y: y - 40, width: W - 56, height: 52, color: HERB });
center("Bánh mì 6,70 €  ·  Bún 8,20 €  ·  Bò bún 9,30 €", bold, 10.5, y - 9, CREAM);
center("Options végé & végan  ·  Desserts du jour  ·  Café vietnamien", sans, 9, y - 26, CREAM);

// Pied : infos pratiques
y -= 66;
center(`${site.address.street}, ${site.address.postalCode} ${site.address.city}  ·  ${site.phone}`, bold, 9, y);
y -= 14;
center("Midi : lun. – sam., 11 h 30 – 13 h 30  ·  Soir : mar., jeu., ven., 18 h 30 – 20 h 30", sans, 8.5, y, MUTED);
y -= 13;
center("Instagram @onha_family  ·  Paiement au retrait : carte ou mobile", sans, 8.5, y, MUTED);

await mkdir(path.join(ROOT, "print"), { recursive: true });
const file = path.join(ROOT, "print/affichette-onha-a5.pdf");
await writeFile(file, await pdf.save());
console.log("affichette prête :", file, url);
