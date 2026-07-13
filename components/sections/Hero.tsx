import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import ParallaxImage from '@/components/ui/ParallaxImage';
import Wave from '@/components/ui/Wave';
import { ArrowRight } from '@/components/ui/icons';

export default function Hero() {
  const t = useTranslations('home.hero');
  const alt = useTranslations('alt')('shootLiveCarp');

  return (
    <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden bg-sea-deep">
      {/* Live fish (carp in the tank) — the shop's signature. Gentle parallax
          drift on scroll for depth (disabled under reduced motion). */}
      <ParallaxImage
        src="/images/shoot-live-carp.webp"
        alt={alt}
        priority
        sizes="100vw"
        strength={0.1}
        className="object-cover object-center"
      />
      {/* Lighter tint so the live fish reads clearly; keep the bottom darker
          for legible text, let the top breathe. */}
      <div aria-hidden className="absolute inset-0 bg-sea-deep/25 mix-blend-multiply" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-sea-deep/95 via-sea-deep/45 to-sea-deep/15"
      />
      {/* Curtain that lifts off the photo on first load (fades dark → clear). */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 animate-curtain-lift bg-sea-deep motion-reduce:hidden"
      />

      {/* Content — enters in a soft, staggered rise on load. */}
      <div className="container-page relative z-20 w-full pb-28 pt-32 sm:pb-32">
        <div className="max-w-3xl">
          <Eyebrow className="animate-rise-in text-sand [animation-delay:200ms] motion-reduce:animate-none">
            {t('eyebrow')}
          </Eyebrow>
          <SectionTitle
            as="h1"
            size="xl"
            className="mt-5 animate-rise-in text-cream [animation-delay:320ms] motion-reduce:animate-none"
          >
            {t('title')}
          </SectionTitle>
          <div className="mt-6 max-w-xl animate-rise-in space-y-3 text-pretty text-base leading-relaxed text-cream/85 [animation-delay:460ms] motion-reduce:animate-none sm:text-lg">
            {t('subtitle')
              .split('\n\n')
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-3 animate-rise-in [animation-delay:600ms] motion-reduce:animate-none">
            <Link
              href="/sortiment"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-cream px-7 font-mono text-[0.8rem] uppercase tracking-[0.12em] text-sea-deep transition-colors duration-200 hover:bg-cream-soft hover:text-sea-deep"
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
        className="absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 animate-rise-in flex-col items-center gap-2 [animation-delay:950ms] motion-reduce:animate-none sm:flex"
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
