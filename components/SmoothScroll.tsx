'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Smooth momentum scrolling (Lenis). Eases wheel/trackpad scrolling with a
 * light glide while keeping the native scrollbar, real scroll position (so
 * position:sticky, the scroll-progress bar and parallax all keep working) and
 * native touch on mobile. Completely disabled under prefers-reduced-motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp: 0.09, // smaller = more glide
      wheelMultiplier: 1,
      smoothWheel: true,
      // touch stays native — mobile scrolling already feels right
    });
    window.__lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
