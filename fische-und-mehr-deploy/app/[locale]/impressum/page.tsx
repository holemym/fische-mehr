import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/ui/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import Reveal from '@/components/ui/Reveal';
import { Impressum } from '@/components/LegalContent';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return pageMetadata(locale, 'impressum', '/impressum');
}

export default function ImpressumPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('footer');

  return (
    <>
      <Breadcrumbs locale={locale} trail={[{ name: t('impressum'), path: '/impressum' }]} />
      <PageHero eyebrow="fische & mehr" title={t('impressum')} />
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <Impressum />
          </Reveal>
        </div>
      </section>
    </>
  );
}
