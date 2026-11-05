"use client";

import { useEffect, useState } from "react";
import menu from "@/data/menu-du-jour.json";
import site from "@/data/site.json";
import { useLocale } from "@/components/providers";
import { OrderLink } from "@/components/OrderLink";
import { Illus } from "@/components/Illus";
import { InstagramIcon } from "@/components/icons";
import { fill } from "@/lib/i18n";
import { formatDay, isoDay, price } from "@/lib/format";
import { ITEMS } from "@/lib/carte";

type Day = { date: string; dish: { fr: string; en: string }; dessert?: { fr: string; en: string } };

/**
 * Le menu du jour (data/menu-du-jour.json) : l'entrée datée d'aujourd'hui, choisie côté navigateur
 * pour rester juste même si la page a été générée la veille. La formule du midi est toujours affichée.
 */
export function TodayMenu({ buildDay }: { buildDay: string }) {
  const { lang, d } = useLocale();
  const [today, setToday] = useState(buildDay);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- date du navigateur, connue seulement après hydratation
  useEffect(() => setToday(isoDay(new Date())), []);

  const entry = (menu.days as Day[]).find((x) => x.date === today);
  const formulaPrice = menu.formula.price as number | null;

  return (
    <div className="card grid bg-rice lg:grid-cols-[1.25fr_1fr]">
      <div className="relative p-6 md:p-10">
        <p className="eyebrow !text-ink" suppressHydrationWarning>
          {formatDay(today, lang)}
        </p>
        {entry ? (
          <dl className="mt-5 space-y-6">
            <div>
              <dt className="font-bold text-ink/75">{d.today.dish}</dt>
              <dd className="display mt-1 text-[1.75rem] md:text-[2.25rem]">{entry.dish[lang]}</dd>
            </div>
            {entry.dessert && (
              <div>
                <dt className="font-bold text-ink/75">{d.today.dessert}</dt>
                <dd className="display mt-1 text-[1.375rem] md:text-[1.625rem]">{entry.dessert[lang]}</dd>
              </div>
            )}
          </dl>
        ) : (
          <>
            <p className="display mt-4 text-[1.75rem] md:text-[2.25rem]">{d.today.noEntry}</p>
            <p className="mt-3 max-w-md text-[1.0625rem] leading-relaxed">{menu.fallback[lang]}</p>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn-line mt-6">
              <InstagramIcon className="h-5 w-5" />
              {d.today.follow}
            </a>
          </>
        )}
        <Illus name="bowl" className="pointer-events-none absolute end-6 top-6 hidden h-20 w-20 text-ink/15 md:block" />
      </div>
      <div className="m-3 rounded-[22px] bg-cream p-6 md:m-4 md:p-8">
        <p className="eyebrow">{d.today.formula}</p>
        <p className="display mt-3 text-[1.5rem]">{menu.formula[lang]}</p>
        <p className="mt-3 leading-relaxed text-muted">
          {formulaPrice !== null
            ? fill(d.today.formulaPrice, { price: price(formulaPrice, lang) })
            : fill(d.today.formulaDetail, { drink: price(ITEMS.boisson.price ?? 2, lang), dessert: price(ITEMS["dessert-du-jour"].price ?? 3.5, lang) })}
        </p>
        <ul className="mt-5 divide-y divide-line border-y border-line">
          {(["banh-mi", "bun-thit", "bo-bun"] as const).map((id) => (
            <li key={id} className="flex items-baseline justify-between py-2.5">
              <span className="font-bold">{d.products[id].name}</span>
              <span className="display text-[1.125rem]">{price(ITEMS[id].price ?? 0, lang)}</span>
            </li>
          ))}
        </ul>
        <OrderLink href={`/${lang}#commander`} className="btn mt-6 w-full">
          {d.nav.orderCta}
        </OrderLink>
      </div>
    </div>
  );
}
