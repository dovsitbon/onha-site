import type { Metadata } from "next";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import { fill, getDict, isLocale, locales, type Dict, type Locale } from "@/lib/i18n";
import { formatDay } from "@/lib/format";
import { checked } from "@/lib/carte";
import { PAGE_IDS, pageOfSlug, pagePath, SLUGS, type PageId } from "@/lib/pages";
import { pageJsonLd } from "@/lib/jsonld";
import { MenuTabs } from "@/components/MenuTabs";
import { OrderLink } from "@/components/OrderLink";
import { OpenStatus } from "@/components/OpenStatus";
import { HoursTable } from "@/components/HoursTable";
import { PhoneIcon } from "@/components/icons";

export function generateStaticParams() {
  return locales.flatMap((lang) => PAGE_IDS.map((id) => ({ lang, slug: SLUGS[id][lang] })));
}
export const dynamicParams = false;

function resolve(lang: string, slug: string): { lang: Locale; id: PageId } | null {
  if (!isLocale(lang)) return null;
  const id = pageOfSlug(slug, lang);
  return id ? { lang, id } : null;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const r = resolve(l, slug);
  if (!r) return {};
  const d = getDict(r.lang);
  const p = d.pages[r.id];
  const description = "metaDescription" in p ? p.metaDescription : d.meta.description;
  return {
    title: p.metaTitle,
    description,
    alternates: {
      canonical: pagePath(r.id, r.lang),
      languages: { ...Object.fromEntries(locales.map((x) => [x, pagePath(r.id, x)])), "x-default": pagePath(r.id, "fr") },
    },
    openGraph: { title: p.metaTitle, description, url: pagePath(r.id, r.lang), images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
    robots: r.id === "legal" ? { index: false, follow: true } : undefined,
  };
}

function Carte({ lang, d }: { lang: Locale; d: Dict }) {
  const p = d.pages.carte;
  return (
    <div className="px-4 pt-10 pb-20 md:px-8 md:pt-16 md:pb-28">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-8 px-1 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">{p.eyebrow}</p>
            <h1 className="display mt-3 text-[2.8rem] md:text-[4.2rem]">{p.title}</h1>
            <p className="lead mt-4 max-w-xl">{p.lead}</p>
          </div>
          <div className="card bg-cream-deep p-5 md:p-6">
            <HoursTable lang={lang} d={d} compact />
            <div className="mt-3 font-bold">
              <OpenStatus />
            </div>
          </div>
        </header>
        <div className="mt-10">
          <MenuTabs />
        </div>
        <p className="mt-3 text-sm text-muted">{fill(d.carte.checked, { date: formatDay(checked, lang, { day: "numeric", month: "long", year: "numeric" }) })}</p>
        <div className="card mt-12 flex flex-col items-start gap-5 bg-rice p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <p className="display text-[1.75rem]">{d.order.title}</p>
          <div className="flex flex-wrap gap-3">
            <OrderLink href={`/${lang}#commander`} className="btn">
              {d.nav.orderCta}
            </OrderLink>
            <a href={`tel:${site.phoneIntl}`} className="btn-line">
              <PhoneIcon className="h-5 w-5" />
              {d.order.callCta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Legal({ d }: { d: Dict }) {
  const p = d.pages.legal;
  const pending = <em className="text-muted">{p.toConfirm}</em>;
  const blocks: [string, React.ReactNode][] = [
    [p.editor, `${site.legal.company}, ${site.address.street}, ${site.address.postalCode} ${site.address.city} · ${site.phone} · ${site.email}`],
    [p.siret, site.legal.siret || pending],
    [p.director, site.legal.director || pending],
    [p.host, site.legal.host],
    [p.data, fill(p.dataText, { email: site.email })],
    [p.photos, p.photosText],
  ];
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="display text-[2.8rem] md:text-[3.6rem]">{p.title}</h1>
      {blocks.map(([title, body]) => (
        <section key={title} className="mt-9">
          <h2 className="eyebrow">{title}</h2>
          <p className="mt-2 leading-relaxed">{body}</p>
        </section>
      ))}
    </div>
  );
}

export default async function Page({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang: l, slug } = await params;
  const r = resolve(l, slug);
  if (!r) notFound();
  const d = getDict(r.lang);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd(r.lang, r.id)) }} />
      {r.id === "carte" && <Carte lang={r.lang} d={d} />}
      {r.id === "legal" && <Legal d={d} />}
    </>
  );
}
