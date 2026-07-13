'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from '@/lib/clsx';

/** Appears after scrolling; returns to top. Quiet, on-brand, keyboard-accessible. */
export default function ScrollTop() {
  const label = useTranslations('nav')('top');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        // Route through Lenis when it's driving the scroll, so the glide matches.
        if (window.__lenis) {
          window.__lenis.scrollTo(0);
          return;
        }
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'auto'
            : 'smooth',
        });
      }}
      className={clsx(
        'fixed bottom-5 end-5 z-40 flex h-11 w-11 items-center justify-center rounded-full',
        'bg-sea-deep text-cream shadow-lg transition-all duration-300 hover:bg-sea',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
