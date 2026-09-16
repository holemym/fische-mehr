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
  const nav = useTranslations('nav');

  return (
    <>
      <Breadcrumbs
        locale={locale}
        trail={[{ name: nav('ueberUns'), path: '/ueber-uns' }]}
      />
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} />

      {/* Values */}
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
              <SectionNumber index={1} total={1} />
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
