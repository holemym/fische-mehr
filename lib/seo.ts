import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, defaultLocale } from '@/i18n.routing';
import { SITE } from '@/lib/site';

/** Full OG/og:locale codes (Facebook/LinkedIn expect region-qualified locale tags). */
const OG_LOCALE: Record<string, string> = {
  de: 'de_AT',
  en: 'en_US',
  ru: 'ru_RU',
  he: 'he_IL',
};

/** hreflang alternates (de/en/ru/he + x-default) for a given route path. */
export function buildAlternates(locale: string, path: string): Metadata['alternates'] {
  const clean = path === '/' ? '' : path;
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${SITE.url}/${loc}${clean}`;
  }
  languages['x-default'] = `${SITE.url}/${defaultLocale}${clean}`;
  return {
    canonical: `${SITE.url}/${locale}${clean}`,
    languages,
  };
}

type Ns = 'home' | 'sortiment' | 'ueber' | 'kontakt' | 'impressum' | 'datenschutz';

/** Site-wide keywords that apply to every page, in every locale (transliterated core terms). */
const BASE_KEYWORDS = [
  'Fische & mehr',
  'Fisch Wien',
  'koscherer Fisch',
  'fresh fish Vienna',
  'kosher fish Vienna',
  'кошерная рыба Вена',
  '1020 Wien',
  'Usbekistan Spezialitäten',
  'Trockenfrüchte Wien',
  'Naturhonig',
];

/** Build full per-page metadata (title, description, hreflang, OG, Twitter, keywords). */
export async function pageMetadata(
  locale: string,
  ns: Ns,
  path: string,
  extraKeywords: string[] = [],
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `meta.${ns}` });
  const title = t('title');
  const description = t('description');
  const ogImage = `${SITE.url}/images/og-image.webp`;
  const ogLocale = OG_LOCALE[locale] ?? locale;
  const alternateLocales = locales
    .filter((l) => l !== locale)
    .map((l) => OG_LOCALE[l] ?? l);

  return {
    title,
    description,
    keywords: [...BASE_KEYWORDS, ...extraKeywords],
    alternates: buildAlternates(locale, path),
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: ogLocale,
      alternateLocale: alternateLocales,
      title,
      description,
      url: `${SITE.url}/${locale}${path === '/' ? '' : path}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
