import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/ui/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import Reveal from '@/components/ui/Reveal';
import { Datenschutz } from '@/components/LegalContent';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return pageMetadata(locale, 'datenschutz', '/datenschutz');
}

export default function DatenschutzPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('footer');

  return (
    <>
      <Breadcrumbs locale={locale} trail={[{ name: t('datenschutz'), path: '/datenschutz' }]} />
      <PageHero eyebrow="fische & mehr" title={t('datenschutz')} />
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-page">
          <Reveal>
            <Datenschutz />
          </Reveal>
        </div>
      </section>
    </>
  );
}
