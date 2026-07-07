import type { Metadata } from 'next';
import Image from 'next/image';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/ui/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import SectionNumber from '@/components/ui/SectionNumber';
import Reveal from '@/components/ui/Reveal';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return pageMetadata(locale, 'ueber', '/ueber-uns');
}

const VALUES = ['v1', 'v2', 'v3'] as const;

export default function UeberUnsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('ueber');
  const alt = useTranslations('alt');
  const nav = useTranslations('nav');

  return (
    <>
      <Breadcrumbs
        locale={locale}
        trail={[{ name: nav('ueberUns'), path: '/ueber-uns' }]}
      />
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} />

      {/* 01 · Story */}
      <section className="relative bg-cream py-24 sm:py-32">
        <div className="container-page grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16 lg:gap-24">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-cream-soft">
              <Image
                src="/images/shoot-storefront.webp"
                alt={alt('shootStorefront')}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="max-w-xl">
            <div className="flex items-center gap-3">
              <SectionNumber index={1} total={3} />
              <Eyebrow as="span">{t('story.eyebrow')}</Eyebrow>
            </div>
            <SectionTitle className="mt-4">{t('story.title')}</SectionTitle>
            <p className="mt-6 text-pretty leading-relaxed text-grey-dark">
              {t('story.body')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 02 · Origin — Central-Asian imports */}
      <section className="bg-cream py-24 sm:py-32">
        <div className="container-page grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <Reveal className="max-w-md">
            <div className="flex items-center gap-3">
              <SectionNumber index={2} total={3} />
              <Eyebrow as="span">{t('origin.eyebrow')}</Eyebrow>
            </div>
            <SectionTitle className="mt-4">{t('origin.title')}</SectionTitle>
            <p className="mt-6 text-pretty leading-relaxed text-grey-dark">
              {t('origin.body')}
            </p>
          </Reveal>
          <Reveal>
            <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-cream-soft">
              <Image
                src="/images/shoot-grain-bags.webp"
                alt={alt('shootGrainBags')}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 04 · Values */}
      <section className="relative isolate overflow-hidden border-t border-sea-deep/10 bg-foam py-24 sm:py-28">
        {/* Quiet atmosphere accent, mirrored to the left for variety against the
            categories section on Sortiment which uses the same pattern on the right. */}
        <div aria-hidden className="absolute inset-y-0 left-0 -z-10 hidden w-1/3 opacity-[0.14] lg:block">
          <Image src="/images/parrotfish.webp" alt="" fill sizes="33vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-foam via-foam/60 to-transparent" />
        </div>
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <div className="flex items-center gap-3">
              <SectionNumber index={3} total={3} />
              <Eyebrow as="span">{t('values.eyebrow')}</Eyebrow>
            </div>
            <SectionTitle className="mt-4">{t('values.title')}</SectionTitle>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-sea-deep/10 bg-sea-deep/10 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v} delay={i * 80} className="bg-cream p-8 sm:p-9">
                <p className="font-mono text-sm text-sea">0{i + 1}</p>
                <h3 className="mt-4 font-display text-2xl tracking-tight text-sea-deep">
                  {t(`values.${v}.title`)}
                </h3>
                <p className="mt-3 text-pretty leading-relaxed text-grey-dark">
                  {t(`values.${v}.body`)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
