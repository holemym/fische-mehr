import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { Pin, Phone, Mail } from '@/components/ui/icons';

/**
 * Closing band in the shop's own colours: the water-blue of the outdoor poster as
 * the ground, the storefront photo pale behind it like a watermark, and the
 * contact data in full — phone, e-mail, address — as the client asked.
 */
export default function StorefrontBand() {
  const t = useTranslations('home.closing');
  const c = useTranslations('config');
  const alt = useTranslations('alt');

  return (
    <section className="relative isolate overflow-hidden bg-sea-deep py-24 text-cream sm:py-32">
      {/* Water texture cut from the poster on the façade */}
      <Image
        src="/images/water-texture.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-60"
      />
      {/* The shop itself, pale — a watermark, not a photo */}
      <Image
        src="/images/ang-storefront-entrance.webp"
        alt={alt('angStorefrontEntrance')}
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-[0.16] mix-blend-luminosity"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-sea-deep/80 via-sea-deep/40 to-sea-deep/70" />

      <div className="container-page">
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-sand">{t('eyebrow')}</Eyebrow>
          <SectionTitle className="mt-4 text-cream">{t('title')}</SectionTitle>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-cream/85">{t('body')}</p>
          <p className="mt-4 font-display text-2xl tracking-tight text-cream">{t('cta')}</p>
        </Reveal>

        {/* Contact data in full */}
        <div className="mt-12 grid gap-6 border-t border-cream/20 pt-8 sm:grid-cols-3">
          <Reveal>
            <a href={SITE.phoneHref} className="group flex items-start gap-3">
              <Phone className="mt-1 shrink-0 text-sea-light" />
              <span className="min-w-0 break-words font-display text-xl tracking-tight text-cream transition-colors group-hover:text-sea-light">
                {c('phone')}
              </span>
            </a>
          </Reveal>
          <Reveal delay={70}>
            <a href={`mailto:${SITE.email}`} className="group flex items-start gap-3">
              <Mail className="mt-1 shrink-0 text-sea-light" />
              <span className="min-w-0 break-words font-display text-xl tracking-tight text-cream transition-colors group-hover:text-sea-light">
                {c('email')}
              </span>
            </a>
          </Reveal>
          <Reveal delay={140}>
            <a
              href={SITE.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3"
            >
              <Pin className="mt-1 shrink-0 text-sea-light" />
              <span className="min-w-0 break-words font-display text-xl tracking-tight text-cream transition-colors group-hover:text-sea-light">
                {c('address')}
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
