import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRight, Clock, Pin } from '@/components/ui/icons';

export default function LocationHours() {
  const t = useTranslations('home.location');
  const c = useTranslations('config');

  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <SectionTitle className="mt-4">{t('title')}</SectionTitle>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-navy/10 bg-navy/10 sm:grid-cols-2">
          {/* Hours */}
          <Reveal className="bg-paper p-8 sm:p-10">
            <div className="flex items-center gap-2.5 text-navy">
              <Clock className="text-coral" />
              <h3 className="eyebrow">{t('hoursTitle')}</h3>
            </div>
            <dl className="mt-5 space-y-2.5 font-mono text-sm text-grey-dark">
              <p>{c('hoursWeekday')}</p>
              <p className="text-navy">{c('hoursFriday')}</p>
              <p>{c('hoursWeekend')}</p>
            </dl>
          </Reveal>

          {/* Address */}
          <Reveal delay={80} className="bg-paper p-8 sm:p-10">
            <div className="flex items-center gap-2.5 text-navy">
              <Pin className="text-coral" />
              <h3 className="eyebrow">{t('addrTitle')}</h3>
            </div>
            <p className="mt-5 font-display text-xl tracking-tight text-navy">
              {c('address')}
            </p>
            <div className="mt-7">
              <ButtonLink href="/kontakt" variant="secondary">
                {t('cta')}
                <ArrowRight />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
