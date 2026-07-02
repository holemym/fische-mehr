import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/ui/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductGallery from '@/components/sections/ProductGallery';
import ProductCategories from '@/components/sections/ProductCategories';
import PlatterBuilder from '@/components/sections/PlatterBuilder';
import FreshFishNotifier from '@/components/sections/FreshFishNotifier';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const cat = await getTranslations({ locale, namespace: 'categories' });
  const extraKeywords = ['fish', 'dried', 'nuts', 'honey', 'spices', 'spirits'].map((k) =>
    cat(`${k}.title`),
  );
  return pageMetadata(locale, 'sortiment', '/sortiment', extraKeywords);
}

export default function SortimentPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('sortiment');
  const nav = useTranslations('nav');

  return (
    <>
      <Breadcrumbs
        locale={locale}
        trail={[{ name: nav('sortiment'), path: '/sortiment' }]}
      />
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        intro={t('hero.intro')}
      />

      <ProductGallery />
      <ProductCategories />
      <PlatterBuilder />
      <FreshFishNotifier />
    </>
  );
}
