import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import Note from '@/components/ui/Note';
import { ArrowRight } from '@/components/ui/icons';

type Item = { initials: string; name: string; quote: string };

/** STC-style testimonials: quote large, initials-in-circle avatar, name below. */
export default function Reviews() {
  const t = useTranslations('reviews');
  const items = t.raw('items') as Item[];

  return (
    <section className="bg-cream py-24 sm:py-28">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <SectionTitle className="mt-4">{t('title')}</SectionTitle>
          </div>
          <a
            href={SITE.googleReviewsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-sea transition-colors hover:text-sea-deep"
          >
            {t('googleCta')}
            <ArrowRight width={14} height={14} />
          </a>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {items.map((item, i) => (
            <Reveal key={item.initials} delay={i * 80} as="figure" className="flex flex-col">
              <blockquote className="flex-1 text-pretty font-display text-xl leading-snug text-sea-deep">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sea-deep font-mono text-xs uppercase tracking-wide text-cream">
                  {item.initials}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-grey-dark">
                  {item.name}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <Note className="mt-10 max-w-xl">{t('note')}</Note>
      </div>
    </section>
  );
}
