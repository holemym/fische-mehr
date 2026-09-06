import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n.routing';
import { SITE } from '@/lib/site';

const PATHS = [
  '',
  '/sortiment',
  '/ueber-uns',
  '/kontakt',
  '/impressum',
  '/datenschutz',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PATHS) {
    // Every language variant of a page lists the full set of hreflang alternates,
    // including x-default → the default-locale (de) URL, matching the page-level
    // <link rel="alternate"> tags so Google sees a consistent language cluster.
    const languages: Record<string, string> = Object.fromEntries(
      locales.map((l) => [l, `${SITE.url}/${l}${path}`]),
    );
    languages['x-default'] = `${SITE.url}/${defaultLocale}${path}`;

    for (const locale of locales) {
      entries.push({
        url: `${SITE.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
