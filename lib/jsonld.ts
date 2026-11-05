import site from "@/data/site.json";
import { getDict, locales, type Locale } from "@/lib/i18n";
import { weekHours } from "@/lib/hours";
import { categories, ITEMS } from "@/lib/carte";
import { pagePath, type PageId } from "@/lib/pages";

const BUSINESS = `${site.url}/#restaurant`;
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function menu(lang: Locale) {
  const d = getDict(lang);
  return {
    "@type": "Menu",
    "@id": `${site.url}${pagePath("carte", lang)}#menu`,
    name: d.pages.carte.title,
    inLanguage: lang,
    hasMenuSection: categories()
      .filter((c) => c.id !== "vege")
      .map((c) => ({
        "@type": "MenuSection",
        name: d.carte.tabs[c.id],
        hasMenuItem: c.items.map((id) => {
          const it = ITEMS[id];
          const diet = it.tags.includes("vegan") ? ["https://schema.org/VeganDiet"] : it.tags.includes("vegetarian") ? ["https://schema.org/VegetarianDiet"] : [];
          return {
            "@type": "MenuItem",
            name: d.products[id].name,
            description: d.products[id].desc,
            ...(diet.length ? { suitableForDiet: diet } : {}),
            ...(it.price !== null ? { offers: { "@type": "Offer", price: it.price.toFixed(2), priceCurrency: "EUR" } } : {}),
          };
        }),
      })),
  };
}

function business(lang: Locale) {
  const d = getDict(lang);
  return {
    "@type": "Restaurant",
    "@id": BUSINESS,
    name: site.fullName,
    alternateName: ["ONHA", "Onha Vietnam Street Food", "ONHA Amiens"],
    description: d.meta.description,
    url: `${site.url}/${lang}`,
    image: [`${site.url}/og.jpg`, `${site.url}/media/hero/banh-mi-poulet-sate.jpg`],
    logo: `${site.url}/logo-rond.svg`,
    telephone: site.phoneIntl,
    email: site.email,
    priceRange: "€",
    servesCuisine: ["Vietnamienne", "Vietnamese", "Street food", "Bánh mì", "Bò bún"],
    address: { "@type": "PostalAddress", streetAddress: site.address.street, postalCode: site.address.postalCode, addressLocality: site.address.city, addressRegion: site.address.region, addressCountry: site.address.country },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    openingHoursSpecification: weekHours().flatMap((slots, i) => slots.map(([opens, closes]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${DAYS[i]}`, opens, closes }))),
    // Note Google relevée à la main (date dans data/site.json → rating.checked) : à mettre à jour de temps en temps
    aggregateRating: { "@type": "AggregateRating", ratingValue: site.rating.value, reviewCount: site.rating.count, bestRating: 5, worstRating: 1, dateModified: site.rating.checked },
    sameAs: [site.instagram, site.facebook],
    acceptsReservations: false,
    paymentAccepted: "Carte bancaire, paiement mobile",
    currenciesAccepted: "EUR",
    knowsLanguage: ["fr", "en", "vi"],
    hasMenu: { "@id": `${site.url}${pagePath("carte", lang)}#menu` },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: lang === "fr" ? "Options végétariennes et véganes" : "Vegetarian and vegan options", value: true },
      { "@type": "LocationFeatureSpecification", name: lang === "fr" ? "Vente à emporter" : "Takeaway", value: true },
      { "@type": "LocationFeatureSpecification", name: lang === "fr" ? "Repas sur place" : "Dine-in", value: true },
    ],
    potentialAction: { "@type": "OrderAction", target: `${site.url}/${lang}#commander`, deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModePickUp" },
  };
}

/** Données structurées de l'accueil : Restaurant (horaires, note Google, menu, végé), FAQ. */
export function homeJsonLd(lang: Locale) {
  const d = getDict(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.fullName, inLanguage: [...locales], publisher: { "@id": BUSINESS } },
      business(lang),
      menu(lang),
      { "@type": "FAQPage", mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
}

/** Données structurées d'une page secondaire : la carte (Menu) ou les mentions légales, plus fil d'Ariane. */
export function pageJsonLd(lang: Locale, id: PageId) {
  const d = getDict(lang);
  const url = `${site.url}${pagePath(id, lang)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      business(lang),
      ...(id === "carte" ? [menu(lang)] : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}/${lang}` },
          { "@type": "ListItem", position: 2, name: d.pages[id].title, item: url },
        ],
      },
    ],
  };
}
