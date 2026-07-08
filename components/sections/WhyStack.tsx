'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { clsx } from '@/lib/clsx';

const CARDS = ['c1', 'c2', 'c3'] as const;

// Section background: warm cream → deep royal night. This is a one-shot,
// eased transition (not a per-frame scroll scrub), triggered when the section
// scrolls through the middle of the viewport.
const LIGHT = '#f7f2e8'; // cream
const DARK = '#08243f'; // sea-ink — rich royal night

/**
 * Stacking "why us" cards. The cards are sticky, so they pin and stack as you
 * scroll through — a scroll feel distinct from the rest of the page. As the
 * section passes through the viewport its background eases from cream into a
 * deep royal night (triggered once, softly eased — no muddy mid-scroll frames).
 * Honors reduced motion: static cream background, cards simply stack.
 */
export default function WhyStack() {
  const t = useTranslations('why');
  const ref = useRef<HTMLElement>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Fires when the section crosses the central band of the viewport, so the
    // colour flip happens "as you scroll through it" and reverts on the way back.
    const io = new IntersectionObserver(
      ([entry]) => setDark(entry.isIntersecting),
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{ backgroundColor: dark ? DARK : LIGHT }}
      className="transition-[background-color] duration-[900ms] ease-out-soft motion-reduce:transition-none"
    >
      <div className="container-page py-24 sm:py-32">
        <div className="max-w-2xl">
          <Eyebrow className={dark ? 'text-sea-light' : undefined}>{t('eyebrow')}</Eyebrow>
          <SectionTitle
            className={clsx(
              'mt-4 transition-colors duration-[900ms] ease-out-soft',
              dark ? 'text-cream' : 'text-sea-deep',
            )}
          >
            {t('title')}
          </SectionTitle>
        </div>

        <div className="mt-12 space-y-5">
          {CARDS.map((k, i) => (
            <div
              key={k}
              className="sticky"
              style={{ top: `calc(var(--header-h) + ${1 + i * 1.1}rem)` }}
            >
              <Reveal delay={i * 90}>
                <article className="group relative overflow-hidden rounded-lg border border-sea-deep/10 bg-cream p-8 shadow-[0_18px_50px_-30px_rgba(6,35,57,0.55)] transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgba(6,35,57,0.65)] sm:p-10">
                  {/* The shop's original logo badge, at full opacity, on the right. */}
                  <Image
                    src="/images/logo-badge.webp"
                    alt=""
                    aria-hidden
                    width={160}
                    height={160}
                    className="pointer-events-none absolute end-6 top-1/2 h-20 w-20 -translate-y-1/2 rounded-md sm:h-24 sm:w-24"
                  />
                  <div className="relative flex flex-col gap-5 pe-24 sm:flex-row sm:items-start sm:gap-10 sm:pe-28">
                    <span className="font-display text-5xl font-normal leading-none text-sea-light transition-colors duration-300 group-hover:text-sea">
                      0{i + 1}
                    </span>
                    <div className="max-w-xl">
                      <h3 className="font-display text-3xl tracking-tight text-sea-deep">
                        {t(`${k}.title`)}
                      </h3>
                      <p className="mt-3 text-pretty leading-relaxed text-grey-dark">
                        {t(`${k}.body`)}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
