import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Wave from '@/components/ui/Wave';
import { ArrowRight } from '@/components/ui/icons';

export default function Hero() {
  const t = useTranslations('home.hero');
  const alt = useTranslations('alt')('hero');

  return (
    <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden bg-sea-deep">
      {/* Salmon photo */}
      <Image
        src="/images/hero.webp"
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Sea duotone tint — pulls the photo into the cream/sea palette */}
      <div aria-hidden className="absolute inset-0 bg-sea-deep/55 mix-blend-multiply" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-sea-deep via-sea-deep/70 to-sea-deep/55"
      />

      {/* Content */}
      <div className="container-page relative z-20 w-full pb-28 pt-32 sm:pb-32">
        <div className="max-w-3xl">
          <Eyebrow className="text-sand">{t('eyebrow')}</Eyebrow>
          <SectionTitle as="h1" size="xl" className="mt-5 text-cream">
            {t('title')}
          </SectionTitle>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-cream/85 sm:text-lg">
            {t('subtitle')}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/sortiment"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-cream px-7 font-mono text-[0.8rem] uppercase tracking-[0.12em] text-sea-deep transition-colors duration-200 hover:bg-sea-light hover:text-sea-deep"
            >
              {t('ctaPrimary')}
              <ArrowRight />
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-cream/40 px-7 font-mono text-[0.8rem] uppercase tracking-[0.12em] text-cream transition-colors duration-200 hover:border-cream hover:bg-cream hover:text-sea-deep"
            >
              {t('ctaSecond')}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.3em] text-cream/55">
          scroll
        </span>
        <span className="h-10 w-px overflow-hidden bg-cream/25">
          <span className="block h-4 w-px animate-scroll-cue bg-sea-light motion-reduce:animate-none" />
        </span>
      </div>

      {/* Wave into the cream section below */}
      <Wave fill="fill-cream" position="bottom" />
    </section>
  );
}
