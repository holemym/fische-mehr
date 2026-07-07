'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';

const CARDS = ['c1', 'c2', 'c3'] as const;

// cream #f7f2e8 → sea-deep #0a3354
const FROM = [247, 242, 232];
const TO = [10, 51, 84];
const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

/**
 * Clean stacking cards. Each card is sticky, so they stack as you scroll, and the
 * section background deepens cream → sea with scroll progress. Honors reduced-motion
 * (static cream background, cards simply stack).
 */
export default function WhyStack() {
  const t = useTranslations('why');
  const ref = useRef<HTMLElement>(null);
  const [bg, setBg] = useState(`rgb(${FROM.join(',')})`);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh - rect.top) / (rect.height + vh * 0.4)));
        const c = [0, 1, 2].map((i) => lerp(FROM[i], TO[i], p));
        setBg(`rgb(${c.join(',')})`);
        setDark(p > 0.55);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      style={{ backgroundColor: bg }}
      className="transition-colors duration-300"
    >
      <div className="container-page py-24 sm:py-32">
        <div className="max-w-2xl">
          <Eyebrow className={dark ? 'text-sea-light' : undefined}>{t('eyebrow')}</Eyebrow>
          <SectionTitle
            className={clsxColor(dark)}
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
              <article className="group relative overflow-hidden rounded-lg border border-sea-deep/10 bg-cream p-8 shadow-[0_18px_50px_-30px_rgba(6,35,57,0.55)] transition-[transform,box-shadow] duration-300 ease-out-soft hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgba(6,35,57,0.65)] sm:p-10">
                {/* Original logo badge as a subtle branded watermark (multiply). */}
                <Image
                  src="/images/logo-badge.webp"
                  alt=""
                  aria-hidden
                  width={160}
                  height={160}
                  className="pointer-events-none absolute -right-7 -top-9 h-40 w-40 rounded-lg opacity-[0.10] mix-blend-multiply transition-opacity duration-300 group-hover:opacity-[0.18]"
                />
                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-10">
                  <span className="font-display text-5xl font-normal leading-none text-sea-light transition-colors duration-300 group-hover:text-sea">
                    0{i + 1}
                  </span>
                  <div className="max-w-xl">
                    <h3 className="font-display text-3xl lowercase tracking-tight text-sea-deep">
                      {t(`${k}.title`)}
                    </h3>
                    <p className="mt-3 text-pretty leading-relaxed text-grey-dark">
                      {t(`${k}.body`)}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function clsxColor(dark: boolean) {
  return `mt-4 transition-colors duration-300 ${dark ? 'text-cream' : 'text-sea-deep'}`;
}
