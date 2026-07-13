'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { clsx } from '@/lib/clsx';

/**
 * A `fill` image that drifts slightly slower than the page as it scrolls, for a
 * gentle sense of depth. The image lives in a container that is overscanned
 * vertically (via CSS, so it's identical on the server and after hydration —
 * no size jump on load) and only ever *translates* within that overscan; it is
 * never scaled, and the drift is clamped so an edge can never show.
 * The parent must be positioned + `overflow-hidden`. Disabled under reduced motion.
 */
export default function ParallaxImage({
  src,
  alt,
  priority = false,
  sizes = '100vw',
  strength = 0.08,
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  /** Fraction of the element's height the image may drift (0–0.15 is subtle). */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

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
      // -1 (element below viewport) → +1 (element above viewport), clamped.
      const raw = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const rel = Math.max(-1, Math.min(1, raw));
      // Drift stays within the overscan, so no edge is ever exposed.
      const shift = (-rel * strength * rect.height).toFixed(1);
      el.style.transform = `translate3d(0, ${shift}px, 0)`;
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

  const overscan = `${(strength * 100).toFixed(2)}%`;

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-x-0 will-change-transform"
      style={{ top: `-${overscan}`, bottom: `-${overscan}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={clsx(className)}
      />
    </div>
  );
}
