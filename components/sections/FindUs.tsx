import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { Pin, Clock, ArrowRight } from '@/components/ui/icons';

export default function FindUs() {
  const t = useTranslations('findus');
  const c = useTranslations('config');

  return (
    <section className="bg-cream py-24 sm:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <Eyebrow>{t('eyebrow')}</Eyebrow>
            <SectionTitle className="mt-4">{t('title')}</SectionTitle>
          </Reveal>
          {/* Directions / navigation */}
          <Reveal delay={60}>
            <a
              href={SITE.directionsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-sea-deep px-6 font-mono text-xs uppercase tracking-[0.12em] text-cream transition-colors duration-200 hover:bg-sea"
            >
              <Pin />
              {t('directionsCta')}
            </a>
          </Reveal>
        </div>

        {/* Big full-width map — recolored to match the brand, single click-through
            to view the map (not a live pannable iframe fighting page scroll) */}
        <Reveal className="mt-10">
          <a
            href={SITE.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('mapAlt')}
            className="group relative block h-[420px] overflow-hidden rounded-sm border border-sea-deep/15 bg-foam sm:h-[520px] lg:h-[600px]"
          >
            <iframe
              src={SITE.mapEmbed}
              title={t('mapAlt')}
              loading="lazy"
              tabIndex={-1}
              referrerPolicy="no-referrer-when-downgrade"
              className="map-tint pointer-events-none absolute inset-0 h-full w-full scale-105 transition-transform duration-700 ease-out-soft group-hover:scale-110"
            />
            {/* Brand wash — pulls the raw OSM palette toward navy/cream */}
            <div className="pointer-events-none absolute inset-0 bg-sea-deep/15 mix-blend-multiply" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sea-deep/35 via-transparent to-sea-deep/10 transition-opacity duration-300 group-hover:opacity-70" />

            {/* Centered reveal-on-hover CTA */}
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="inline-flex translate-y-2 items-center gap-2 rounded-full bg-cream px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-sea-deep opacity-0 shadow-lg transition-all duration-300 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100">
                {t('mapCta')}
                <ArrowRight width={14} height={14} />
              </span>
            </span>
          </a>
        </Reveal>

        {/* Details row below the map */}
        <div className="mt-10 grid gap-8 border-t border-sea-deep/12 pt-10 sm:grid-cols-3">
          <Reveal>
            <div className="flex items-center gap-2.5">
              <Pin className="text-sea" />
              <h3 className="eyebrow">{t('addrTitle')}</h3>
            </div>
            <p className="mt-3 font-display text-xl lowercase tracking-tight text-sea-deep">
              {c('address')}
            </p>
          </Reveal>

          <Reveal delay={70}>
            <div className="flex items-center gap-2.5">
              <Clock className="text-sea" />
              <h3 className="eyebrow">{t('hoursTitle')}</h3>
            </div>
            <dl className="mt-3 space-y-1.5 font-mono text-sm text-grey-dark">
              <p>{c('hoursWeekday')}</p>
              <p className="text-sea-deep">{c('hoursFriday')}</p>
              <p>{c('hoursWeekend')}</p>
            </dl>
          </Reveal>

          <Reveal delay={140}>
            <h3 className="eyebrow">{t('transitTitle')}</h3>
            <p className="mt-3 font-mono text-sm text-grey-dark">{c('transit')}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
