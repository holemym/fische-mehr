import type { MetadataRoute } from 'next';
import { locales } from '@/i18n.routing';
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
    for (const locale of locales) {
      entries.push({
        url: `${SITE.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE.url}/${l}${path}`]),
          ),
        },
      });
    }
  }

  return entries;
}
