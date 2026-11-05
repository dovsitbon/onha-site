import Image from "next/image";
import Link from "next/link";
import site from "@/data/site.json";
import { getDict, altOf, fill, isLocale, type Dict, type Locale } from "@/lib/i18n";
import { formatDay, isoDay } from "@/lib/format";
import { firstImg, img, imgsIn } from "@/lib/media";
import { pagePath } from "@/lib/pages";
import { homeJsonLd } from "@/lib/jsonld";
import { Reveal } from "@/components/Reveal";
import { OpenStatus } from "@/components/OpenStatus";
import { OrderLink } from "@/components/OrderLink";
import { Tiles } from "@/components/Tiles";
import { TodayMenu } from "@/components/TodayMenu";
import { MenuTabs } from "@/components/MenuTabs";
import { Gallery } from "@/components/Gallery";
import { OrderForm } from "@/components/OrderForm";
import { HoursTable } from "@/components/HoursTable";
import { Photo } from "@/components/Photo";
import { Badge } from "@/components/Logo";
import { InstagramIcon, PhoneIcon, PinIcon, PlusIcon, StarIcon } from "@/components/icons";

// Le menu du jour et le bandeau se recalculent aussi côté navigateur ; la page est régénérée chaque heure.
export const revalidate = 3600;

function Rating({ lang, d, className = "" }: { lang: Locale; d: Dict; className?: string }) {
  const value = new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-GB", { minimumFractionDigits: 1 }).format(site.rating.value);
  return (
    <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-6 items-center gap-2 font-bold hover:underline ${className}`} title={fill(d.hero.ratingNote, { date: formatDay(site.rating.checked, lang, { day: "numeric", month: "long", year: "numeric" }) })}>
      <span className="flex text-[#d9a521]" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} className="h-4 w-4" />
        ))}
      </span>
      <span>
        {fill(d.hero.rating, { value })} · {fill(d.hero.ratingCount, { count: site.rating.count })}
      </span>
    </a>
  );
}

function SectionHead({ eyebrow, title, intro, center = false }: { eyebrow: string; title: string; intro?: string; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display mt-3 text-[2.4rem] md:text-[3.5rem]">{title}</h2>
      {intro && <p className="lead mt-4">{intro}</p>}
    </Reveal>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const d = getDict(lang);
  const order = `/${lang}#commander`;
  const hero = firstImg(["/media/hero/hero.jpg", "/media/hero/banh-mi-poulet-sate.jpg"])!;
  const story = img("/media/restaurant/cafe-phin-comptoir.jpg");

  // Galerie : les photos de assets/galerie (à remplir), puis celles des plats, desserts et du restaurant
  const gallery = [...new Map([...imgsIn("galerie"), hero, ...imgsIn("plats"), ...imgsIn("desserts"), ...imgsIn("restaurant")].map((p) => [p.src, p])).values()].slice(0, 7).map((p) => ({ ...p, alt: altOf(d, p.src) }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(lang)) }} />

      {/* 1. Hero : un bánh mì en très gros plan, deux boutons, la note Google et le statut juste dessous */}
      <section className="relative md:h-[calc(100svh-7rem)] md:min-h-[620px] md:p-4">
        <div className="relative h-[52svh] overflow-hidden md:absolute md:inset-4 md:h-auto md:rounded-[36px]">
          <Image src={hero.src} alt={altOf(d, hero.src)} width={hero.width} height={hero.height} sizes="100vw" quality={80} priority fetchPriority="high" className="h-full w-full object-cover object-[62%_55%]" />
        </div>
        <div className="relative -mt-8 rounded-t-[32px] bg-cream px-5 pt-8 pb-10 md:absolute md:bottom-10 md:left-10 md:mt-0 md:max-w-[35rem] md:rounded-[32px] md:p-10 lg:max-w-[38rem]">
          <p className="eyebrow rise">{d.hero.eyebrow}</p>
          <h1 className="display rise mt-3 text-[2.6rem] md:text-[3.4rem] lg:text-[3.9rem]" style={{ animationDelay: "0.05s" }}>
            {d.hero.title}
          </h1>
          <p className="lead rise mt-4" style={{ animationDelay: "0.1s" }}>
            {d.hero.sub}
          </p>
          <div className="rise mt-7 flex flex-wrap gap-3" style={{ animationDelay: "0.15s" }}>
            <a href={`/${lang}#carte`} className="btn">
              {d.hero.ctaMenu}
            </a>
            <OrderLink href={order} className="btn-line">
              {d.hero.ctaOrder}
            </OrderLink>
          </div>
          <div className="rise mt-6 flex flex-col gap-2 text-[0.9375rem] sm:flex-row sm:flex-wrap sm:gap-x-6" style={{ animationDelay: "0.2s" }}>
            <Rating lang={lang} d={d} />
            <OpenStatus className="font-bold" />
          </div>
        </div>
      </section>

      {/* 2. Tuiles de catégories, en capitales */}
      <section aria-label={d.tiles.title} className="px-4 pt-10 md:px-8 md:pt-14">
        <h2 className="sr-only">{d.tiles.title}</h2>
        <div className="mx-auto max-w-7xl">
          <Tiles />
        </div>
      </section>

      {/* 3. Menu du jour + formule du midi (data/menu-du-jour.json) */}
      <section id="menu-du-jour" className="scroll-mt-20 px-4 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 px-1">
            <SectionHead eyebrow={d.today.eyebrow} title={d.today.title} />
          </div>
          <Reveal>
            <TodayMenu buildDay={isoDay(new Date())} />
          </Reveal>
        </div>
      </section>

      {/* 4. La carte, une seule page à onglets, prix en HTML */}
      <section id="carte" className="scroll-mt-20 px-4 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 px-1 md:flex-row md:items-end">
            <SectionHead eyebrow={d.carte.eyebrow} title={d.carte.title} intro={d.carte.intro} />
            <Link href={pagePath("carte", lang)} className="link-line shrink-0 self-start font-bold md:self-auto">
              {d.carte.seeFull}
            </Link>
          </div>
          <MenuTabs />
        </div>
      </section>

      {/* 5. Commande à emporter */}
      <section id="commander" className="scroll-mt-20 px-4 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[36px] bg-herb-soft p-4 py-10 md:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:p-14">
          <div className="px-2 md:px-0 lg:sticky lg:top-24 lg:self-start">
            <SectionHead eyebrow={d.order.eyebrow} title={d.order.title} intro={d.order.intro} />
            <Reveal delay={0.05} className="card mt-8 bg-cream p-6">
              <p className="display text-[1.5rem]">{d.order.callTitle}</p>
              <p className="mt-1 text-muted">{d.order.callText}</p>
              <a href={`tel:${site.phoneIntl}`} className="btn mt-5 w-full sm:w-auto">
                <PhoneIcon className="h-5 w-5" />
                {d.order.callCta}
              </a>
              <p className="mt-3 font-bold">{site.phone}</p>
              <div className="mt-4 text-[0.9375rem]">
                <OpenStatus />
              </div>
            </Reveal>
          </div>
          <OrderForm />
        </div>
      </section>

      {/* 6. Notre histoire */}
      <section id="histoire" className="scroll-mt-20 px-4 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="relative mx-auto w-full max-w-md">
            <Photo paths={["/media/restaurant/freres.jpg", story.src]} alt={altOf(d, story.src) || d.story.photoNote} illus="brothers" tint="herb" sizes="(min-width: 768px) 46vw, 100vw" className="card aspect-[4/5]" />
            <span className="absolute -end-2 -bottom-5 rotate-[-6deg] rounded-full bg-rice px-5 py-2.5 font-[family-name:var(--font-display)] text-lg font-semibold md:-end-5" lang="vi">
              Ở nhà
            </span>
          </Reveal>
          <div className="px-1">
            <SectionHead eyebrow={d.story.eyebrow} title={d.story.title} />
            <Reveal delay={0.05}>
              <p className="lead mt-5">{d.story.p1}</p>
              <p className="lead mt-4">{d.story.p2}</p>
              <p className="lead mt-4">{d.story.p3}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {d.story.facts.map((f) => (
                  <li key={f} className="rounded-full bg-cream-deep px-4 py-2 font-bold">
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. Galerie Instagram */}
      <section id="galerie" className="px-4 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 px-1 md:flex-row md:items-end">
            <SectionHead eyebrow={d.gallery.eyebrow} title={d.gallery.title} />
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn-line self-start md:self-auto">
              <InstagramIcon className="h-5 w-5" />
              {d.gallery.follow}
            </a>
          </div>
          <Gallery
            items={gallery}
            labels={{ close: d.gallery.close, prev: d.gallery.prev, next: d.gallery.next, counter: d.gallery.counter }}
            openLabel={d.gallery.open}
            cols={gallery.length + 1 <= 3 ? "md:grid-cols-3" : "md:grid-cols-4"}
            extra={
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="card flex aspect-square flex-col items-center justify-center gap-3 bg-rice p-4 text-center transition-colors hover:bg-rice-soft">
                <Badge className="h-20 w-20 md:h-24 md:w-24" />
                <span className="font-bold">{site.instagramHandle}</span>
              </a>
            }
          />
        </div>
      </section>

      {/* 8. Infos pratiques */}
      <section id="infos" className="scroll-mt-20 px-4 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 px-1">
            <SectionHead eyebrow={d.infos.eyebrow} title={d.infos.title} />
          </div>
          <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
            <Reveal className="card space-y-7 bg-cream-deep p-6 md:p-9">
              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <p className="eyebrow mb-2">{d.infos.address}</p>
                  <address className="text-lg font-bold not-italic">
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                  </address>
                </div>
                <div>
                  <p className="eyebrow mb-2">{d.infos.phone}</p>
                  <a href={`tel:${site.phoneIntl}`} className="link-line text-lg font-bold">
                    {site.phone}
                  </a>
                </div>
              </div>
              <div>
                <p className="eyebrow mb-2">{d.infos.hours}</p>
                <HoursTable lang={lang} d={d} />
                <div className="mt-3 font-bold">
                  <OpenStatus />
                </div>
              </div>
              <div>
                <p className="eyebrow mb-2">{d.infos.access}</p>
                <p className="leading-relaxed text-muted">{d.infos.accessText}</p>
                <p className="mt-3 font-bold">{d.infos.services}</p>
              </div>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-line">
                <PinIcon className="h-5 w-5" />
                {d.infos.route}
              </a>
            </Reveal>
            <Reveal delay={0.05} className="card flex min-h-96 flex-col bg-cream-deep">
              <Photo paths={["/media/restaurant/facade.jpg"]} alt="" illus="facade" tint="rice" sizes="(min-width: 1024px) 50vw, 100vw" className={firstImg(["/media/restaurant/facade.jpg"]) ? "aspect-[16/9]" : "hidden"} />
              <iframe title={d.infos.mapTitle} src={site.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="min-h-96 w-full flex-1 border-0" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="px-1">
            <SectionHead eyebrow={d.faq.eyebrow} title={d.faq.title} />
          </div>
          <Reveal delay={0.05}>
            <div className="space-y-3">
              {d.faq.items.map((f) => (
                <details key={f.q} className="group card bg-[#fffdf8] ring-2 ring-line open:ring-herb">
                  <summary className="flex min-h-16 items-center justify-between gap-6 px-5 py-4 font-[family-name:var(--font-display)] text-[1.1875rem] font-medium md:px-6">
                    {f.q}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rice">
                      <PlusIcon className="faq-plus h-4 w-4" />
                    </span>
                  </summary>
                  <p className="px-5 pb-6 leading-relaxed text-muted md:px-6">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
