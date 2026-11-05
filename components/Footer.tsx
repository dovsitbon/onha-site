import Link from "next/link";
import site from "@/data/site.json";
import { Badge } from "@/components/Logo";
import { HoursTable } from "@/components/HoursTable";
import { FacebookIcon, InstagramIcon, PhoneIcon } from "@/components/icons";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { pagePath } from "@/lib/pages";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <footer className="bg-ink pb-24 text-cream md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_1fr_1.2fr] md:px-10 md:py-20">
        <div>
          <span className="inline-block rounded-full bg-cream p-1.5">
            <Badge className="h-24 w-24" />
          </span>
          <p className="mt-5 max-w-xs leading-relaxed text-cream/80">{d.footer.tagline}</p>
          <div className="mt-5 flex items-center gap-1">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="-ms-3 flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream/10" aria-label={d.nav.instagram}>
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-cream/10" aria-label={d.nav.facebook}>
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="leading-relaxed">
          <p className="eyebrow mb-3 !text-rice">{d.infos.address}</p>
          <address className="text-lg not-italic">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <a href={`tel:${site.phoneIntl}`} className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-rice hover:underline">
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>
          <ul className="mt-6 space-y-1 text-cream/80">
            <li>
              <Link href={pagePath("carte", lang)} className="inline-flex min-h-9 items-center hover:text-cream hover:underline">
                {d.footer.menu}
              </Link>
            </li>
            <li>
              <Link href={pagePath("legal", lang)} className="inline-flex min-h-9 items-center hover:text-cream hover:underline">
                {d.footer.legal}
              </Link>
            </li>
          </ul>
        </div>
        <div className="[&_.text-muted]:text-cream/60 [&_tr]:border-cream/15">
          <p className="eyebrow mb-3 !text-rice">{d.infos.hours}</p>
          <HoursTable lang={lang} d={d} compact />
        </div>
      </div>
      <p className="border-t border-cream/15 px-6 py-6 text-center text-sm text-cream/70">{fill(d.footer.rights, { year: new Date().getFullYear() })}</p>
    </footer>
  );
}
