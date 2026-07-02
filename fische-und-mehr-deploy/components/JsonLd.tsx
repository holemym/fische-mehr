import { getTranslations } from 'next-intl/server';
import { SITE } from '@/lib/site';
import { locales } from '@/i18n.routing';

/**
 * LocalBusiness structured data for the home page. Placeholders are OMITTED rather
 * than faked — e.g. opening hours are only emitted once SITE.hours is filled in
 * (see lib/site.ts), since publishing fabricated hours could mislead customers via
 * Google/Maps "open now" signals.
 */
export default async function JsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'categories' });

  const realPhone = !SITE.phone.includes('⟦') ? SITE.phone : undefined;
  const realEmail = !SITE.email.includes('⟦') ? SITE.email : undefined;
  const realStreet = !SITE.streetAddress.includes('⟦') ? SITE.streetAddress : undefined;
  const realReviewLink = !SITE.googleReviewsLink.includes('PLACEHOLDER')
    ? SITE.googleReviewsLink
    : undefined;

  const sameAs = [SITE.instagram, realReviewLink].filter(Boolean) as string[];

  const categoryKeys = ['fish', 'dried', 'nuts', 'honey', 'spices', 'spirits'] as const;

  const data = {
    '@context': 'https://schema.org',
    '@type': ['Store', 'LocalBusiness'],
    '@id': `${SITE.url}/#store`,
    name: SITE.name,
    description:
      'Frischer Fisch und Spezialitäten aus Usbekistan und der Region — Trockenfrüchte, Nüsse, Naturhonig, Gewürze und mehr, in Wien 1020.',
    image: `${SITE.url}/images/og-image.webp`,
    logo: `${SITE.url}/logo-full.svg`,
    url: `${SITE.url}/${locale}`,
    ...(realPhone ? { telephone: realPhone } : {}),
    ...(realEmail ? { email: realEmail } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    knowsLanguage: locales,
    address: {
      '@type': 'PostalAddress',
      ...(realStreet ? { streetAddress: realStreet } : {}),
      addressLocality: SITE.city,
      postalCode: SITE.postalCode,
      addressCountry: SITE.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat, // ⟦TODO: confirm exact coords⟧
      longitude: SITE.geo.lng,
    },
    // Only published once real hours are confirmed — see lib/site.ts SITE.hours.
    ...(SITE.hours.length
      ? {
          openingHoursSpecification: SITE.hours.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            ...h,
          })),
        }
      : {}),
    areaServed: 'Wien',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t('title').replace('\n', ' '),
      itemListElement: categoryKeys.map((key) => ({
        '@type': 'OfferCatalog',
        name: t(`${key}.title`),
        description: t(`${key}.body`),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, trusted content — safe to inject.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
