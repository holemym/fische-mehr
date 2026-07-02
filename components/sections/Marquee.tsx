import { useTranslations } from 'next-intl';

const KEYS = ['fish', 'dried', 'nuts', 'honey', 'spices', 'spirits'] as const;

/**
 * Looping product ticker (STC-style). Built from the real category names, so it
 * doubles as a glance at the assortment. Seamless via a duplicated track; static
 * under prefers-reduced-motion.
 */
export default function Marquee() {
  const t = useTranslations('categories');
  const words = KEYS.map((k) => t(`${k}.title`));
  const track = [...words, ...words];

  return (
    <div className="overflow-hidden border-y border-sea-deep/15 bg-sea-deep py-4">
      <div className="flex w-max animate-marquee items-center motion-reduce:animate-none">
        {track.map((word, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-7 font-display text-xl lowercase tracking-tight text-cream sm:text-2xl">
              {word}
            </span>
            <span aria-hidden className="text-sand">
              ✶
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
