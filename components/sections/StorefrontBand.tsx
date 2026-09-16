import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { Pin, Phone, Mail } from '@/components/ui/icons';

/**
 * Closing band, set like the façade poster: pale water ground with its soft
 * ripple, navy type, and the shop itself only as a faint grey ghost on the right —
 * a watermark, never a photo. Contact data in full below a hairline.
 */
export default function StorefrontBand() {
  const t = useTranslations('home.closing');
  const c = useTranslations('config');
  const alt = useTranslations('alt');

  const item =
    'group flex min-w-0 items-start gap-3 font-display text-xl tracking-tight text-sea-deep transition-colors hover:text-sea';

  return (
    <section className="relative isolate overflow-hidden bg-foam py-24 sm:py-32">
      {/* Poster ripple, very soft */}
      <Image
        src="/images/water-texture-pale.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-20 object-cover opacity-40"
      />
      {/* The storefront as a ghost: greyscale, faint, held to the right half */}
      <div aria-hidden className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 lg:block">
        <Image
          src="/images/ang-storefront-corner.webp"
          alt={alt('angStorefrontCorner')}
          fill
          sizes="50vw"
          className="object-cover object-center opacity-[0.09] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foam via-foam/40 to-transparent" />
      </div>

      <div className="container-page">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <SectionTitle className="mt-4 text-sea-deep">{t('title')}</SectionTitle>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-grey-dark">{t('body')}</p>
          <p className="mt-5 font-display text-2xl tracking-tight text-sea-deep">{t('cta')}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 border-t border-sea-deep/15 pt-8 sm:grid-cols-3">
          <Reveal>
            <a href={SITE.phoneHref} className={item}>
              <Phone className="mt-1 shrink-0 text-sea" />
              <span className="min-w-0 break-words">{c('phone')}</span>
            </a>
          </Reveal>
          <Reveal delay={70}>
            <a href={`mailto:${SITE.email}`} className={item}>
              <Mail className="mt-1 shrink-0 text-sea" />
              <span className="min-w-0 break-words">{c('email')}</span>
            </a>
          </Reveal>
          <Reveal delay={140}>
            <a href={SITE.mapLink} target="_blank" rel="noopener noreferrer" className={item}>
              <Pin className="mt-1 shrink-0 text-sea" />
              <span className="min-w-0 break-words">{c('address')}</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
