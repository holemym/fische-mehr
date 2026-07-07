import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import SectionNumber from '@/components/ui/SectionNumber';
import Reveal from '@/components/ui/Reveal';
import { FishMark } from '@/components/ui/Logo';

const ITEMS = ['fish', 'dried', 'nuts', 'honey', 'spices', 'spirits'] as const;

export default function ProductCategories() {
  const t = useTranslations('categories');

  return (
    <section className="relative isolate overflow-hidden bg-foam py-24 sm:py-28">
      {/* Quiet atmosphere accent — behind the header text only; the opaque cream
          cards below fully cover the rest, so the photo never competes for
          attention with the product copy. */}
      <div aria-hidden className="absolute inset-y-0 right-0 -z-10 hidden w-1/3 opacity-[0.14] lg:block">
        <Image src="/images/shoot-seabass.webp" alt="" fill sizes="33vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foam via-foam/60 to-transparent" />
      </div>

      <div className="container-page">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <SectionTitle className="mt-4">{t('title')}</SectionTitle>
          <p className="mt-6 text-pretty leading-relaxed text-grey-dark">{t('intro')}</p>
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-sea-deep/10 bg-sea-deep/10 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((key, i) => (
            <Reveal
              as="article"
              delay={(i % 3) * 70}
              key={key}
              className="group relative flex flex-col bg-cream p-7 transition-colors duration-300 hover:bg-foam sm:p-8"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-sea transition-transform duration-300 ease-out-soft group-hover:scale-x-100" />
              <div className="flex items-center justify-between">
                <SectionNumber index={i + 1} total={ITEMS.length} />
                <FishMark className="h-5 w-auto text-sea/25 transition-colors duration-300 group-hover:text-sea" />
              </div>
              <h3 className="mt-5 font-display text-2xl tracking-tight text-sea-deep">
                {t(`${key}.title`)}
              </h3>
              <p className="mt-2.5 text-pretty text-sm leading-relaxed text-grey-dark">
                {t(`${key}.body`)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
