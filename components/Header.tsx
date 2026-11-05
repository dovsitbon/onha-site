"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import site from "@/data/site.json";
import { Logo } from "@/components/Logo";
import { LangSwitch } from "@/components/LangSwitch";
import { OrderLink } from "@/components/OrderLink";
import { CloseIcon, FacebookIcon, InstagramIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";

export function Header() {
  const { lang, d } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (menu) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = menu ? "hidden" : "";
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const home = `/${lang}`;
  const order = `${home}#commander`;
  const links = [
    { href: `${home}#carte`, label: d.nav.carte },
    { href: `${home}#menu-du-jour`, label: d.nav.today },
    { href: order, label: d.nav.order },
    { href: `${home}#histoire`, label: d.nav.story },
    { href: `${home}#infos`, label: d.nav.infos },
  ];
  const social = (
    <>
      <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream-deep" aria-label={d.nav.instagram}>
        <InstagramIcon className="h-5 w-5" />
      </a>
      <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-cream-deep" aria-label={d.nav.facebook}>
        <FacebookIcon className="h-5 w-5" />
      </a>
    </>
  );

  return (
    <>
      <header className={`sticky top-0 z-50 bg-cream/95 backdrop-blur-sm transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_0_var(--color-line)]" : ""}`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-10 focus:rounded-full focus:bg-cream focus:px-4 focus:py-2">
          {d.nav.skip}
        </a>
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 px-3 md:h-[4.5rem] md:px-6 xl:px-8">
          <div className="flex items-center">
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full xl:hidden" onClick={() => setMenu(true)} aria-label={d.nav.menu} aria-expanded={menu}>
              <MenuIcon className="h-6 w-6" />
            </button>
            <nav className="hidden items-center gap-1 xl:flex" aria-label={d.nav.menu}>
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-full px-3 py-2 font-[family-name:var(--font-display)] text-[1.0625rem] font-medium whitespace-nowrap transition-colors hover:bg-cream-deep">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link href={home} aria-label={d.nav.home} className="block py-1">
            <Logo className="w-[6.5rem] md:w-[7.5rem]" />
          </Link>

          <div className="flex items-center justify-end gap-1 lg:gap-2">
            <LangSwitch lang={lang} label={d.nav.lang} className="hidden lg:flex" />
            <div className="hidden items-center lg:flex">{social}</div>
            <a href={`tel:${site.phoneIntl}`} className="flex h-11 w-11 items-center justify-center rounded-full md:hidden" aria-label={`${d.nav.call} ${site.phone}`}>
              <PhoneIcon className="h-5 w-5" />
            </a>
            <OrderLink href={order} className="btn ms-2 hidden !min-h-11 !px-5 !text-base whitespace-nowrap md:inline-flex">
              {d.nav.orderCta}
            </OrderLink>
          </div>
        </div>
      </header>

      {menu && (
        <div className="fade-in fixed inset-0 z-[60] flex flex-col overscroll-contain bg-cream text-ink" role="dialog" aria-modal="true" aria-label={d.nav.menu}>
          <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-3 md:h-[4.5rem] md:px-6">
            <button type="button" className="flex h-11 w-11 items-center justify-center justify-self-start rounded-full" onClick={() => setMenu(false)} aria-label={d.nav.close}>
              <CloseIcon className="h-6 w-6" />
            </button>
            <Logo className="w-[6.5rem]" />
            <span />
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-3" aria-label={d.nav.menu}>
            {links.map((l, i) => (
              <div key={l.href} className="rise" style={{ animationDelay: `${0.04 * i}s` }}>
                <Link href={l.href} onClick={() => setMenu(false)} className="display block px-4 py-1 text-[2.25rem]">
                  {l.label}
                </Link>
              </div>
            ))}
            <OrderLink href={order} className="btn mt-6" onNavigate={() => setMenu(false)}>
              {d.nav.orderCta}
            </OrderLink>
            <a href={`tel:${site.phoneIntl}`} className="link-line mt-3 font-bold">
              {site.phone}
            </a>
          </nav>
          <div className="flex items-center justify-between border-t border-line px-4 py-2">
            <LangSwitch lang={lang} label={d.nav.lang} />
            <div className="flex items-center">{social}</div>
          </div>
        </div>
      )}
    </>
  );
}

/** Barre fixée en bas de l'écran sur mobile : « Commander à emporter » toujours à portée de pouce, et l'appel. */
export function MobileOrderBar() {
  const { lang, d } = useLocale();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-cream/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
      <OrderLink href={`/${lang}#commander`} className="btn flex-1 !px-3 !text-base whitespace-nowrap">
        {d.nav.orderCta}
      </OrderLink>
      <a href={`tel:${site.phoneIntl}`} className="btn-line !px-4 !text-base" aria-label={`${d.nav.call} ${site.phone}`}>
        <PhoneIcon className="h-5 w-5" />
        {d.nav.call}
      </a>
    </div>
  );
}
