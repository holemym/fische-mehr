'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import { clsx } from '@/lib/clsx';

type Cat = 'fish' | 'spec';
type Tile = { img: string; cat: Cat; span?: 'tall' | 'wide' };

// Picture-forward bento. Placeholder images (repeated) until the real shoot — the
// gallery note flags this. Order/selection are trivial to change later.
const TILES: Tile[] = [
  { img: 'product-fresh', cat: 'fish', span: 'tall' },
  { img: 'sortiment-fish', cat: 'fish' },
  { img: 'hero', cat: 'fish', span: 'wide' },
  { img: 'kosher', cat: 'fish', span: 'tall' },
  { img: 'parrotfish', cat: 'fish' },
  { img: 'sortiment-specialties', cat: 'spec' },
  { img: 'specialty-detail', cat: 'spec', span: 'tall' },
  { img: 'origin', cat: 'spec', span: 'tall' },
  { img: 'watch-on-fish', cat: 'fish' },
  { img: 'boats', cat: 'spec', span: 'wide' },
  { img: 'product-fresh', cat: 'fish' },
  { img: 'sortiment-specialties', cat: 'spec', span: 'tall' },
  { img: 'sortiment-fish', cat: 'fish', span: 'tall' },
  { img: 'specialty-detail', cat: 'spec' },
  { img: 'kosher', cat: 'fish' },
  { img: 'origin', cat: 'spec' },
  // Real shoot photos — additive, mixed in alongside the placeholders above.
  { img: 'shoot-fish-ice', cat: 'fish', span: 'wide' },
  { img: 'shoot-storefront', cat: 'fish', span: 'tall' },
  { img: 'shoot-fresh-fish', cat: 'fish' },
  { img: 'shoot-smoked-fish-row', cat: 'fish' },
  { img: 'shoot-honey-jar', cat: 'spec', span: 'tall' },
  { img: 'shoot-salmon-fillet', cat: 'fish' },
  { img: 'shoot-tinned-fish', cat: 'fish' },
  { img: 'shoot-seashells', cat: 'fish' },
  { img: 'shoot-salmon-slices', cat: 'fish', span: 'wide' },
  { img: 'shoot-smoked-counter', cat: 'fish', span: 'tall' },
  { img: 'shoot-owner-fish-1', cat: 'fish' },
  { img: 'shoot-owner-fish-2', cat: 'fish' },
  { img: 'shoot-frozen-fish-1', cat: 'fish' },
  { img: 'shoot-frozen-fish-2', cat: 'fish' },
  { img: 'shoot-caviar-tins', cat: 'fish', span: 'wide' },
  { img: 'shoot-condensed-milk', cat: 'spec' },
  { img: 'shoot-sweets-shelf', cat: 'spec', span: 'tall' },
  { img: 'shoot-pickled-jars-1', cat: 'spec' },
  { img: 'shoot-pickled-jars-2', cat: 'spec' },
  { img: 'shoot-spirits-1', cat: 'spec', span: 'tall' },
  { img: 'shoot-spirits-2', cat: 'spec' },
  { img: 'shoot-sunflower-seeds', cat: 'spec' },
  { img: 'shoot-dried-goods-shelf', cat: 'spec', span: 'wide' },
  { img: 'shoot-grain-bags', cat: 'spec', span: 'tall' },
];

const FILTERS: Array<{ key: 'all' | Cat }> = [
  { key: 'all' },
  { key: 'fish' },
  { key: 'spec' },
];

export default function ProductGallery() {
  const t = useTranslations('gallery');
  const alt = useTranslations('alt');
  const [filter, setFilter] = useState<'all' | Cat>('all');

  const tiles = useMemo(
    () => (filter === 'all' ? TILES : TILES.filter((x) => x.cat === filter)),
    [filter],
  );

  const altKey: Record<string, string> = {
    'product-fresh': 'productFresh',
    'sortiment-fish': 'sortimentFish',
    hero: 'hero',
    kosher: 'kosher',
    parrotfish: 'parrotfish',
    'sortiment-specialties': 'sortimentSpecialties',
    'specialty-detail': 'specialtyDetail',
    origin: 'origin',
    'watch-on-fish': 'hero',
    boats: 'boats',
    'shoot-fish-ice': 'shootFishIce',
    'shoot-storefront': 'shootStorefront',
    'shoot-fresh-fish': 'shootFreshFish',
    'shoot-smoked-fish-row': 'shootSmokedFishRow',
    'shoot-honey-jar': 'shootHoneyJar',
    'shoot-salmon-fillet': 'shootSalmonFillet',
    'shoot-tinned-fish': 'shootTinnedFish',
    'shoot-seashells': 'shootSeashells',
    'shoot-salmon-slices': 'shootSalmonSlices',
    'shoot-smoked-counter': 'shootSmokedCounter',
    'shoot-owner-fish-1': 'shootOwnerFish1',
    'shoot-owner-fish-2': 'shootOwnerFish2',
    'shoot-frozen-fish-1': 'shootFrozenFish1',
    'shoot-frozen-fish-2': 'shootFrozenFish2',
    'shoot-caviar-tins': 'shootCaviarTins',
    'shoot-condensed-milk': 'shootCondensedMilk',
    'shoot-sweets-shelf': 'shootSweetsShelf',
    'shoot-pickled-jars-1': 'shootPickledJars1',
    'shoot-pickled-jars-2': 'shootPickledJars2',
    'shoot-spirits-1': 'shootSpirits1',
    'shoot-spirits-2': 'shootSpirits2',
    'shoot-sunflower-seeds': 'shootSunflowerSeeds',
    'shoot-dried-goods-shelf': 'shootDriedGoodsShelf',
    'shoot-grain-bags': 'shootGrainBags',
  };

  return (
    <section className="relative bg-cream py-20 sm:py-28">
      <div className="container-page">
        {/* Header */}
        <div className="max-w-2xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <SectionTitle className="mt-4">{t('title')}</SectionTitle>
          <p className="mt-6 text-pretty leading-relaxed text-grey-dark">{t('intro')}</p>
        </div>

        {/* Filter / sort chips */}
        <div className="mt-9 flex flex-wrap items-center gap-2">
          {FILTERS.map(({ key }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                aria-pressed={active}
                className={clsx(
                  'cursor-pointer rounded-full px-5 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-200',
                  active
                    ? 'bg-sea-deep text-cream'
                    : 'border border-sea-deep/20 text-sea-deep hover:border-sea-deep/50',
                )}
              >
                {t(key)}
              </button>
            );
          })}
          <span className="ml-1 font-mono text-xs text-grey">
            {t('count', { count: tiles.length })}
          </span>
        </div>

        {/* Bento gallery */}
        <div className="mt-8 grid auto-rows-[160px] grid-cols-2 gap-2.5 sm:auto-rows-[200px] sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
          {tiles.map((tile, i) => (
            <figure
              key={`${tile.img}-${i}`}
              className={clsx(
                'group relative overflow-hidden rounded-sm bg-sea-deep/5',
                tile.span === 'tall' && 'row-span-2',
                tile.span === 'wide' && 'col-span-2',
              )}
            >
              <Image
                src={`/images/${tile.img}.webp`}
                alt={alt(altKey[tile.img] ?? 'hero')}
                fill
                sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                className="object-cover transition-transform duration-[600ms] ease-out-soft group-hover:scale-[1.05] motion-reduce:transform-none"
              />
              {/* Sea wash on hover + category tag */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-sea-deep/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <figcaption className="absolute bottom-2.5 left-2.5 z-10 translate-y-1 rounded-full bg-cream/85 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-sea-deep opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {t(tile.cat === 'fish' ? 'tagFish' : 'tagSpec')}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Placeholder note */}
        <p className="mt-6 inline-block rounded-sm border border-dashed border-coral/50 bg-coral/5 px-4 py-2.5 font-mono text-xs leading-relaxed text-grey-dark">
          {t('note')}
        </p>
      </div>
    </section>
  );
}
