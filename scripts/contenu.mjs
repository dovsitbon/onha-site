// Génère CONTENU.md : tous les textes du site en français et en anglais, et la carte, pour validation par ONHA.
//   npm run contenu
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = async (f) => JSON.parse(await readFile(path.join(ROOT, f), "utf8"));
const fr = await read("locales/fr.json");
const en = await read("locales/en.json");
const carte = await read("data/carte.json");
const site = await read("data/site.json");
const horaires = await read("data/horaires.json");
const menu = await read("data/menu-du-jour.json");

const euro = (n) => (n === null ? "**à confirmer**" : `${n.toFixed(2).replace(".", ",")} €`);
const SKIP = new Set(["alt", "products", "pages", "meta", "carte", "tags", "variants"]);
const out = [];
const p = (s = "") => out.push(s);

p("# ONHA – Vietnam Street-Food : contenu du site (à valider)");
p();
p("Généré depuis `locales/fr.json`, `locales/en.json` et `data/*.json`. Pour modifier un texte, modifiez ces fichiers puis relancez `npm run contenu`.");
p();
p("## À faire valider en priorité");
p();
p("- **« Ở nhà » = « à la maison »** : c'est le fil conducteur du bloc « Notre histoire ». Est-ce bien l'origine du nom ?");
p("- **L'histoire** : rédigée à partir de ce qu'on sait (deux frères, cuisine de famille, « fait maison & en famille » dans la bio Instagram, « On prend le temps » dans un reel). Prénoms, origine de la famille, date d'ouverture à ajouter.");
p("- **Les prix** : relevés sur leur carte publiée (bánh mì 6,70 €, bún thịt 8,20 €, bò bún 9,30 €, boisson 2 €, dessert 3,50 €) et sur la carte « ONHA Café » (cafés). Prix manquants : bò bún végan, tofu bowl, nems aux légumes.");
p("- **La carte café** (cà phê đen, sữa, trứng, filtres) : vient d'une carte « ONHA Café ». Est-elle servie rue Saint-Leu ?");
p("- **La formule du midi** : aucun prix connu. Le site affiche « plat + boisson 2 € + dessert 3,50 € » tant que `data/menu-du-jour.json → formula.price` est vide.");
p(`- **Les horaires** (bio Instagram) : à confirmer, d'autres sites indiquent 14 h le midi. La note Google affichée : ${String(site.rating.value).replace(".", ",")}/5 sur ${site.rating.count} avis, relevée le ${site.rating.checked}.`);
p("- **Les allergènes** et ce qui est réellement végan (sauces, nems, desserts).");
p();

p("## Référencement (balises title / description)");
p();
for (const [lang, d] of [["FR", fr], ["EN", en]]) {
  p(`**${lang}** · ${d.meta.title}`);
  p();
  p(`> ${d.meta.description}`);
  p();
}

p("## Horaires (data/horaires.json)");
p();
const days = fr.infos.days;
for (let i = 1; i <= 7; i++) {
  const s = horaires.week[String(i)];
  p(`- ${days[i - 1]} : ${s.length ? s.map(([a, b]) => `${a} – ${b}`).join(", ") : "fermé"}`);
}
p();

p("## La carte et les prix (data/carte.json)");
p();
p(`Relevés le ${carte.checked}.`);
p();
p(`- Garnitures : ${carte.garnitures.map((g) => `${fr.carte.garnitures[g.id]} / ${en.carte.garnitures[g.id]}`).join(" · ")}`);
p(`- Sauces : ${carte.sauces.map((s) => `${fr.carte.sauces[s.id]} / ${en.carte.sauces[s.id]}`).join(" · ")}`);
p();
for (const c of carte.categories) {
  p(`### ${fr.carte.tabs[c.id]} / ${en.carte.tabs[c.id]}`);
  p();
  p("| Plat (FR) | Dish (EN) | Nom vietnamien | Prix | Pastilles | Description FR | Description EN |");
  p("|---|---|---|---|---|---|---|");
  for (const id of c.items) {
    const it = carte.items[id];
    const prix = it.variants ? it.variants.map((v) => `${fr.variants[v.id]} ${euro(v.price)}`).join(", ") : euro(it.price);
    p(`| ${fr.products[id].name} | ${en.products[id].name} | ${it.vn ?? ""} | ${prix} | ${it.tags.map((t) => fr.tags[t]).join(", ")} | ${fr.products[id].desc} | ${en.products[id].desc} |`);
  }
  p();
}

p("## Menu du jour (data/menu-du-jour.json)");
p();
p(`- Formule : ${menu.formula.fr} (prix : ${euro(menu.formula.price)})`);
p(`- Texte affiché quand le plat du jour n'est pas saisi : ${menu.fallback.fr}`);
p();

const walk = (a, b, prefix) => {
  for (const k of Object.keys(a)) {
    const key = prefix ? `${prefix}.${k}` : k;
    const va = a[k];
    const vb = b?.[k];
    if (typeof va === "string") {
      p(`- \`${key}\``);
      p(`  - FR : ${va.replace(/\n/g, " ↵ ")}`);
      p(`  - EN : ${(vb ?? "").replace(/\n/g, " ↵ ")}`);
    } else if (Array.isArray(va)) {
      va.forEach((x, i) => (typeof x === "string" ? (p(`- \`${key}[${i}]\``), p(`  - FR : ${x}`), p(`  - EN : ${vb?.[i] ?? ""}`)) : walk(x, vb?.[i], `${key}[${i}]`)));
    } else if (va && typeof va === "object") walk(va, vb, key);
  }
};

p("## Textes du site");
p();
for (const section of Object.keys(fr)) {
  if (SKIP.has(section)) continue;
  p(`### ${section}`);
  p();
  walk(fr[section], en[section], section);
  p();
}
p("### carte (textes autour de la carte)");
p();
walk(fr.carte, en.carte, "carte");
p();

p("## Pages");
p();
for (const id of Object.keys(fr.pages)) {
  p(`### ${fr.pages[id].title} / ${en.pages[id].title}`);
  p();
  walk(fr.pages[id], en.pages[id], `pages.${id}`);
  p();
}

p("## Textes alternatifs des photos (accessibilité, Google Images)");
p();
walk(fr.alt, en.alt, "alt");
p();

await writeFile(path.join(ROOT, "CONTENU.md"), out.join("\n"));
console.log("CONTENU.md écrit");
