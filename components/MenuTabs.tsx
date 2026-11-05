"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/components/providers";
import { OrderLink } from "@/components/OrderLink";
import { Photo, type Tint } from "@/components/Photo";
import { Illus } from "@/components/Illus";
import { categories, GARNITURES, ITEMS, SAUCES, type CategoryId, type ItemId } from "@/lib/carte";
import { fill } from "@/lib/i18n";
import { price } from "@/lib/format";
import { firstImg } from "@/lib/media";

export const TAB_EVENT = "onha:tab";

const TINT: Record<string, Tint> = { baguette: "rice", bowl: "sage", nem: "rice", dessert: "chili", glass: "cream", phin: "cream", cup: "cream" };

/** Ouvre un onglet de la carte depuis une tuile, puis descend jusqu'à la carte. */
export function openTab(id: CategoryId) {
  window.dispatchEvent(new CustomEvent<CategoryId>(TAB_EVENT, { detail: id }));
  const el = document.getElementById("carte");
  if (!el) return false;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: "smooth" });
  return true;
}

function Price({ id }: { id: ItemId }) {
  const { lang, d } = useLocale();
  const it = ITEMS[id];
  if (it.variants) return <span>{it.variants.map((v) => price(v.price, lang)).join(" / ")}</span>;
  if (it.price === null) return <span className="text-sm font-bold text-muted">{d.carte.priceOnSite}</span>;
  return <span>{price(it.price, lang)}</span>;
}

function Tags({ id }: { id: ItemId }) {
  const { d } = useLocale();
  const it = ITEMS[id];
  if (!it.tags.length && !it.rotation) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {it.tags.map((t) => (
        <li key={t} className={`tag tag-${t}`}>
          {d.tags[t]}
        </li>
      ))}
      {it.rotation && <li className="tag bg-rice-soft text-ink">{d.carte.rotation}</li>}
    </ul>
  );
}

function Dish({ id, wide = false }: { id: ItemId; wide?: boolean }) {
  const { lang, d } = useLocale();
  const it = ITEMS[id];
  const p = d.products[id];
  const hasPhoto = !!firstImg(it.photo);
  const order = (
    <OrderLink href={`/${lang}#commander`} intent={{ item: id }} label={fill(d.carte.addLabel, { name: p.name })} className="btn-line !min-h-10 !px-4 !text-[0.9375rem]">
      {d.carte.add}
    </OrderLink>
  );
  const head = (
    <div className="flex items-baseline justify-between gap-4">
      <h3 className="display text-[1.5rem]">
        {p.name}
        {it.vn && it.vn !== p.name && (
          <span className="mt-1 block font-[family-name:var(--font-body)] text-[0.9375rem] font-bold tracking-normal text-herb-ink" lang="vi" translate="no">
            {it.vn}
          </span>
        )}
      </h3>
      <p className="display shrink-0 text-[1.25rem]">
        <Price id={id} />
      </p>
    </div>
  );

  if (hasPhoto)
    return (
      <li className={`card group flex flex-col bg-[#fffdf8] ring-2 ring-line ${wide ? "md:col-span-2 md:grid md:grid-cols-[1.3fr_1fr]" : "md:row-span-2"}`}>
        <Photo paths={it.photo} alt={p.name} illus={it.illus} sizes="(min-width: 768px) 56vw, 100vw" className={`aspect-[4/3] ${wide ? "md:aspect-[16/10]" : "md:aspect-auto md:min-h-72 md:flex-1"}`} />
        <div className={`p-5 md:p-6 ${wide ? "md:flex md:flex-col md:justify-center md:p-10" : ""}`}>
          {head}
          <p className="mt-2 leading-relaxed text-muted">{p.desc}</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <Tags id={id} />
            {order}
          </div>
        </div>
      </li>
    );

  return (
    <li className="card flex gap-4 bg-[#fffdf8] p-4 ring-2 ring-line md:p-5">
      <Photo paths={it.photo} alt="" illus={it.illus} tint={TINT[it.illus]} sizes="80px" className="h-20 w-20 shrink-0 rounded-[20px] md:h-24 md:w-24" illusClassName="h-14 w-14 md:h-16 md:w-16" />
      <div className="min-w-0 flex-1">
        {head}
        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{p.desc}</p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
          <Tags id={id} />
          <div className="mt-3">{order}</div>
        </div>
      </div>
    </li>
  );
}

/** La carte, en une seule page avec onglets (bánh mì, bún, bowls, végé, desserts, boissons). */
export function MenuTabs({ initial = "banh-mi" }: { initial?: CategoryId }) {
  const { d } = useLocale();
  const cats = categories();
  const [tab, setTab] = useState<CategoryId>(initial);
  const reduce = useReducedMotion();
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const on = (e: Event) => setTab((e as CustomEvent<CategoryId>).detail);
    window.addEventListener(TAB_EVENT, on);
    return () => window.removeEventListener(TAB_EVENT, on);
  }, []);

  const current = cats.find((c) => c.id === tab) ?? cats[0];
  const choices = current.items.some((id) => ITEMS[id].choices) && current.id !== "vege";

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!n) return;
    e.preventDefault();
    const j = (i + n + cats.length) % cats.length;
    setTab(cats[j].id);
    refs.current[j]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={d.carte.tabsLabel} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
        {cats.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${c.id}`}
            aria-selected={tab === c.id}
            aria-controls={`${uid}-panel`}
            tabIndex={tab === c.id ? 0 : -1}
            onClick={() => setTab(c.id)}
            onKeyDown={(e) => onKey(e, i)}
            className="chip relative shrink-0 !border-transparent !bg-transparent font-[family-name:var(--font-display)] !text-[1.0625rem] !font-semibold whitespace-nowrap aria-selected:!text-cream"
          >
            {tab === c.id && <motion.span layoutId={`${uid}-pill`} className="absolute inset-0 -z-0 rounded-full bg-herb" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 38 }} />}
            {tab !== c.id && <span className="absolute inset-0 rounded-full ring-2 ring-line ring-inset" aria-hidden="true" />}
            <span className="relative">{d.carte.tabs[c.id]}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${current.id}`} className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={current.id} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
            {choices && (
              <div className="card mb-6 grid gap-4 bg-rice-soft p-5 sm:grid-cols-2 md:p-6">
                <div>
                  <p className="eyebrow !text-ink">{d.carte.garnitureTitle}</p>
                  <p className="mt-1.5 font-bold">{GARNITURES.map((g) => d.carte.garnitures[g]).join(" · ")}</p>
                </div>
                <div>
                  <p className="eyebrow !text-ink">{d.carte.sauceTitle}</p>
                  <p className="mt-1.5 font-bold">{SAUCES.map((s) => d.carte.sauces[s]).join(" · ")}</p>
                </div>
              </div>
            )}
            {current.id === "vege" && (
              <div className="card mb-6 flex items-start gap-4 bg-herb-soft p-5 md:p-6">
                <Illus name="leaf" className="h-10 w-10 shrink-0 text-herb" />
                <p className="font-bold text-herb-ink">{d.carte.vegeIntro}</p>
              </div>
            )}
            <ul className="grid gap-4 md:grid-cols-2">
              {current.items.map((id) => (
                <Dish key={id} id={id} wide={current.items.length === 1} />
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-6 text-[0.9375rem] text-muted">{d.carte.allergens}</p>
    </div>
  );
}
