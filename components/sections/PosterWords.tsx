'use client';

import Image from 'next/image';
import { useEffect, useRef, type MutableRefObject } from 'react';

type Tier = 'b' | 's' | 'l';
type W = readonly [text: string, lang: string, tier: Tier];

// "Frische Fische" from the façade poster — top block / bottom block. Order is set
// by hand to a strict big · light · small rhythm so no two big words touch, the
// loop seam included. Georgian, Armenian (garbled prints) and Mongolian (cut off)
// use the correct native spelling; Persian in its own script.
const TOP: readonly W[] = [
  ['Frische Fische', 'de', 'b'],
  ['Fresh Fish', 'en', 'l'],
  ['Peixe fresco', 'pt', 's'],
  ['דגים טריים', 'he', 'b'],
  ['Poissons frais', 'fr', 'l'],
  ['Φρέσκα ψάρια', 'el', 's'],
  ['Свежая рыба', 'ru', 'b'],
  ['新鲜鱼', 'zh-Hans', 'l'],
  ['ปลาสด', 'th', 's'],
  ['Sveža riba', 'sl', 'b'],
  ['ახალი თევზი', 'ka', 'l'],
  ['Pescado fresco', 'es', 's'],
  ['Жаңа балық', 'kk', 'b'],
  ['Taze balık', 'tr', 'l'],
  ['Шинэхэн загас', 'mn', 's'],
  ['Cá tươi', 'vi', 'b'],
  ['Pesce fresco', 'it', 's'],
];
const BOTTOM: readonly W[] = [
  ['ताज़ा मछली', 'hi', 's'],
  ['Yangi baliq', 'uz', 'b'],
  ['新鮮な魚', 'ja', 'l'],
  ['Fersk fisk', 'no', 's'],
  ['Tuore kala', 'fi', 'b'],
  ['Friss halak', 'hu', 'l'],
  ['Čerstvé ryby', 'cs', 's'],
  ['Świeże ryby', 'pl', 'b'],
  ['Թարմ ձկներ', 'hy', 'l'],
  ['ماهی تازه', 'fa', 's'],
  ['Ikan segar', 'id', 'b'],
  ['Verse vis', 'nl', 'l'],
  ['Pește proaspăt', 'ro', 's'],
  ['Svježa riba', 'hr', 'b'],
  ['Пресни риби', 'bg', 'l'],
];

// Three tiers with small, fluid jumps — a field of words, not a headline and noise.
const TIER: Record<Tier, string> = {
  b: 'text-[clamp(1.5rem,1rem+1.6vw,2.5rem)] font-medium text-sea-deep',
  s: 'text-[clamp(1rem,0.85rem+0.5vw,1.3rem)] font-medium text-sea-deep/75',
  l: 'text-[clamp(1.25rem,0.9rem+1vw,1.9rem)] font-normal text-sea/70',
};

// Motion tuning (px/s at a 1440 px wide viewport; scaled down on smaller screens).
const BASE = [-24, 17] as const; // top drifts left, bottom right — two depths
const HOVER = 0.15; // speed factor while hovered (mouse) or held (touch)
const EASE = 0.45; // s — time constant for every speed change
const SCROLL_REF = 1400; // px/s of page scroll that earns the full boost
const SCROLL_BOOST = 1.2; // max extra speed from scrolling → up to ×2.2
const ROW2_START = 0.5; // bottom row starts half a copy in, so the rows never align

function Row({
  words,
  trackRef,
  startPct,
}: {
  words: readonly W[];
  trackRef: MutableRefObject<HTMLDivElement | null>;
  startPct: number;
}) {
  return (
    <div
      ref={trackRef}
      className="flex w-max items-center will-change-transform"
      // Server render starts where the loop will start: no jump on hydration.
      style={{ transform: `translate3d(${startPct}%,0,0)` }}
    >
      {[...words, ...words].map(([text, lang, tier], i) => (
        <span
          key={i}
          lang={lang}
          dir="auto"
          className={`whitespace-nowrap px-[clamp(1.1rem,2.2vw,2.4rem)] font-sans leading-[1.3] tracking-tight transition-colors duration-300 hover:text-sea-deep ${TIER[tier]}`}
        >
          {text}
        </span>
      ))}
    </div>
  );
}

/**
 * The façade poster as a band: "Frische Fische" in every language on the poster,
 * on its pale water ground. Two rows drift in opposite directions at different
 * speeds; hovering (or holding on touch) glides them almost to a stop, page scroll
 * nudges them faster. One rAF loop, only while on screen; static under reduced motion.
 */
export default function PosterWords() {
  const section = useRef<HTMLElement | null>(null);
  const top = useRef<HTMLDivElement | null>(null);
  const bottom = useRef<HTMLDivElement | null>(null);
  const hover = useRef(false);
  const hold = useRef(false);

  useEffect(() => {
    const el = section.current;
    const tracks = [top.current, bottom.current];
    if (!el || !tracks[0] || !tracks[1]) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const widths = [0, 0]; // width of ONE copy of each row
    const offsets = [0, 0];
    let scale = 1;
    let started = false;

    // Purpose: keep the wrap point exact as fonts load and the viewport changes.
    const measure = () => {
      tracks.forEach((t, i) => {
        widths[i] = t!.scrollWidth / 2;
      });
      if (!started) offsets[1] = -widths[1] * ROW2_START;
      scale = Math.min(Math.max(window.innerWidth / 1440, 0.7), 1);
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    const ro = new ResizeObserver(measure);
    tracks.forEach((t) => ro.observe(t!));

    let raf = 0;
    let last = 0;
    let lastY = 0;
    let scrollV = 0; // smoothed |scroll velocity|, px/s
    let factor = 1; // current speed factor (hover × scroll), eased

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Scroll coupling: smoothed, capped, decays back to calm.
      const y = window.scrollY;
      const inst = dt > 0 ? Math.abs(y - lastY) / dt : 0;
      lastY = y;
      scrollV += (inst - scrollV) * (1 - Math.exp(-dt / 0.25));
      const boost = 1 + Math.min(scrollV / SCROLL_REF, 1) * SCROLL_BOOST;

      const target = (hover.current || hold.current ? HOVER : 1) * boost;
      factor += (target - factor) * (1 - Math.exp(-dt / EASE));

      for (let i = 0; i < 2; i++) {
        const w = widths[i];
        if (!w) continue;
        let o = offsets[i] + BASE[i] * scale * factor * dt;
        if (o <= -w) o += w;
        if (o > 0) o -= w;
        offsets[i] = o;
        tracks[i]!.style.transform = `translate3d(${o.toFixed(2)}px,0,0)`;
      }
      started = true;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf || document.hidden) return;
      last = performance.now();
      lastY = window.scrollY;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    let inView = false;
    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        if (inView) start();
        else stop();
      },
      { rootMargin: '120px 0px' },
    );
    io.observe(el);
    const onVis = () => (document.hidden || !inView ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <section
      ref={section}
      aria-hidden
      data-marquee
      dir="ltr"
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') hover.current = true;
      }}
      onPointerLeave={() => {
        hover.current = false;
        hold.current = false;
      }}
      onPointerDown={(e) => {
        if (e.pointerType !== 'mouse') hold.current = true;
      }}
      onPointerUp={() => (hold.current = false)}
      onPointerCancel={() => (hold.current = false)}
      className="relative isolate select-none overflow-hidden bg-foam py-[clamp(1.75rem,3.4vw,3.25rem)]"
    >
      <Image
        src="/images/water-texture-pale.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-50"
      />
      {/* mask-image clips like overflow:hidden — the padding keeps every glyph's ink inside it */}
      <div
        className="py-2"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent)',
        }}
      >
        <Row words={TOP} trackRef={top} startPct={0} />
        <div className="mt-[clamp(0.25rem,0.9vw,0.9rem)]">
          <Row words={BOTTOM} trackRef={bottom} startPct={-(ROW2_START * 50)} />
        </div>
      </div>
    </section>
  );
}
