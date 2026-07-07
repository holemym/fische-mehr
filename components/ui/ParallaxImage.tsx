'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { clsx } from '@/lib/clsx';

/**
 * A `fill` image that drifts slightly slower than the page as it scrolls, for a
 * gentle sense of depth. The parent must be positioned + `overflow-hidden`; the
 * image is scaled up a touch so the vertical drift never exposes an edge.
 * Fully disabled under prefers-reduced-motion (renders as a plain cover image).
 */
export default function ParallaxImage({
  src,
  alt,
  priority = false,
  sizes = '100vw',
  strength = 0.12,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  /** Fraction of the element's height the image may drift (0–0.2 is subtle). */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = parent.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.bottom < 0 || rect.top > vh) return; // off-screen: skip
      // -1 (element below viewport) → +1 (element above viewport)
      const rel = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const shift = (-rel * strength * rect.height).toFixed(1);
      el.style.transform = `translate3d(0, ${shift}px, 0) scale(${1 + strength * 2})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <Image
      ref={ref}
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={clsx('will-change-transform', className)}
    />
  );
}
