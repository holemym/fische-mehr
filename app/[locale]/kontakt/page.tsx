import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { pageMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';
import PageHero from '@/components/ui/PageHero';
import Breadcrumbs from '@/components/Breadcrumbs';
import Reveal from '@/components/ui/Reveal';
import FindUs from '@/components/sections/FindUs';
import Faq from '@/components/sections/Faq';
import ContactForm from '@/components/ContactForm';
import { Phone, Mail } from '@/components/ui/icons';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return pageMetadata(locale, 'kontakt', '/kontakt');
}

export default function KontaktPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('kontakt');
  const c = useTranslations('config');
  const nav = useTranslations('nav');

  return (
    <>
      <Breadcrumbs locale={locale} trail={[{ name: nav('kontakt'), path: '/kontakt' }]} />
      <PageHero eyebrow={t('hero.eyebrow')} title={t('hero.title')} />

      {/* Map + address + hours + transit */}
      <FindUs />

      {/* Direct contact + message form */}
      <section className="border-t border-sea-deep/10 bg-foam py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal className="space-y-8">
            <div>
              <div className="flex items-center gap-2.5">
                <Phone className="text-sea" />
                <h2 className="eyebrow">{t('phone.title')}</h2>
              </div>
              <a
                href={SITE.phoneHref}
                className="mt-2 inline-block font-mono text-sea-deep transition-colors hover:text-sea"
              >
                {c('phone')}
              </a>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <Mail className="text-sea" />
                <h2 className="eyebrow">{t('email.title')}</h2>
              </div>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-2 inline-block break-all font-mono text-sea-deep transition-colors hover:text-sea"
              >
                {c('email')}
              </a>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-grey-dark">
              {t('hours.note')}
            </p>
          </Reveal>

          {/* Message form */}
          <Reveal delay={80}>
            <div className="rounded-sm border border-sea-deep/10 bg-cream p-6 sm:p-8">
              <h2 className="font-display text-3xl tracking-tight text-sea-deep">
                {t('form.title')}
              </h2>
              <p className="mt-2 text-sm text-grey">
                <span className="text-sea" aria-hidden>
                  *
                </span>{' '}
                {t('form.requiredMark')}
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq />
    </>
  );
}
