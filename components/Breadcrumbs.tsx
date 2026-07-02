import { SITE } from '@/lib/site';

/**
 * BreadcrumbList structured data (JSON-LD only, no visible UI — the header nav
 * already gives visual wayfinding). Helps search/AI engines understand site
 * hierarchy and can surface breadcrumb trails in results.
 */
export default function Breadcrumbs({
  locale,
  trail,
}: {
  locale: string;
  /** Path segments after the locale root, e.g. [{ name: 'Sortiment', path: '/sortiment' }] */
  trail: { name: string; path: string }[];
}) {
  const items = [
    { name: SITE.name, path: '' },
    ...trail,
  ].map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE.url}/${locale}${item.path}`,
  }));

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
