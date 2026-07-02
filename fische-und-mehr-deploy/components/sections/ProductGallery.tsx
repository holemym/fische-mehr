'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import { clsx } from '@/lib/clsx';

type Cat = 'fish' | 'spec';
type Tile = { img: string; cat: Cat };

// Real pixel dimensions of every gallery source image, so each tile renders at
// its true aspect ratio (masonry layout below) instead of being force-cropped
// into a fixed grid cell.
const DIMS: Record<string, [number, number]> = {
  'product-fresh': [1200, 1800],
  'sortiment-fish': [1800, 1200],
  hero: [1800, 1199],
  kosher: [1200, 1800],
  parrotfish: [1800, 1350],
  'sortiment-specialties': [1800, 1352],
  'specialty-detail': [1200, 1800],
  origin: [1200, 1800],
  'watch-on-fish': [1349, 1800],
  boats: [1196, 1800],
  'shoot-fish-ice': [1800, 1196],
  'shoot-storefront': [1800, 1196],
  'shoot-fresh-fish': [1800, 1196],
  'shoot-smoked-fish-row': [1800, 1196],
  'shoot-honey-jar': [1800, 1196],
  'shoot-salmon-fillet': [1800, 1196],
  'shoot-tinned-fish': [1800, 1196],
  'shoot-seashells': [1800, 1196],
  'shoot-salmon-slices': [1800, 1196],
  'shoot-smoked-counter': [1800, 1196],
  'shoot-owner-fish-1': [1800, 1196],
  'shoot-owner-fish-2': [1800, 1196],
  'shoot-frozen-fish-1': [1800, 1196],
  'shoot-frozen-fish-2': [1800, 1196],
  'shoot-caviar-tins': [1800, 1196],
  'shoot-condensed-milk': [1800, 1196],
  'shoot-sweets-shelf': [1800, 1196],
  'shoot-pickled-jars-1': [1800, 1196],
  'shoot-pickled-jars-2': [1800, 1196],
  'shoot-spirits-1': [1800, 1196],
  'shoot-spirits-2': [1800, 1196],
  'shoot-sunflower-seeds': [1800, 1196],
  'shoot-dried-goods-shelf': [1800, 323],
  'shoot-grain-bags': [1800, 1196],
};

// Picture-forward masonry. Real shoot photos are interleaved with the
// placeholder images (not dumped at the end) so they're visible throughout
// the gallery, not just once you scroll past everything else.
const TILES: Tile[] = [
  { img: 'shoot-fish-ice', cat: 'fish' },
  { img: 'shoot-storefront', cat: 'fish' },
  { img: 'product-fresh', cat: 'fish' },
  { img: 'shoot-fresh-fish', cat: 'fish' },
  { img: 'sortiment-fish', cat: 'fish' },
  { img: 'shoot-smoked-fish-row', cat: 'fish' },
  { img: 'shoot-honey-jar', cat: 'spec' },
  { img: 'hero', cat: 'fish' },
  { img: 'shoot-salmon-fillet', cat: 'fish' },
  { img: 'kosher', cat: 'fish' },
  { img: 'shoot-tinned-fish', cat: 'fish' },
  { img: 'shoot-seashells', cat: 'fish' },
  { img: 'parrotfish', cat: 'fish' },
  { img: 'shoot-salmon-slices', cat: 'fish' },
  { img: 'sortiment-specialties', cat: 'spec' },
  { img: 'shoot-smoked-counter', cat: 'fish' },
  { img: 'shoot-owner-fish-1', cat: 'fish' },
  { img: 'specialty-detail', cat: 'spec' },
  { img: 'shoot-owner-fish-2', cat: 'fish' },
  { img: 'origin', cat: 'spec' },
  { img: 'shoot-frozen-fish-1', cat: 'fish' },
  { img: 'shoot-frozen-fish-2', cat: 'fish' },
  { img: 'watch-on-fish', cat: 'fish' },
  { img: 'shoot-caviar-tins', cat: 'fish' },
  { img: 'boats', cat: 'spec' },
  { img: 'shoot-condensed-milk', cat: 'spec' },
  { img: 'shoot-sweets-shelf', cat: 'spec' },
  { img: 'product-fresh', cat: 'fish' },
  { img: 'shoot-pickled-jars-1', cat: 'spec' },
  { img: 'sortiment-specialties', cat: 'spec' },
  { img: 'shoot-pickled-jars-2', cat: 'spec' },
  { img: 'shoot-spirits-1', cat: 'spec' },
  { img: 'sortiment-fish', cat: 'fish' },
  { img: 'shoot-spirits-2', cat: 'spec' },
  { img: 'specialty-detail', cat: 'spec' },
  { img: 'shoot-sunflower-seeds', cat: 'spec' },
  { img: 'shoot-dried-goods-shelf', cat: 'spec' },
  { img: 'kosher', cat: 'fish' },
  { img: 'shoot-grain-bags', cat: 'spec' },
  { img: 'origin', cat: 'spec' },
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

        {/* Masonry gallery — each tile keeps the photo's real aspect ratio
            (no forced crop into a fixed cell), so tall and wide shots both
            show their full frame. */}
        <div className="mt-8 columns-2 gap-2.5 sm:gap-3 md:columns-3 lg:columns-4">
          {tiles.map((tile, i) => {
            const [w, h] = DIMS[tile.img];
            return (
              <figure
                key={`${tile.img}-${i}`}
                className="group relative mb-2.5 block break-inside-avoid overflow-hidden rounded-sm bg-sea-deep/5 sm:mb-3"
              >
                <Image
                  src={`/images/${tile.img}.webp`}
                  alt={alt(altKey[tile.img] ?? 'hero')}
                  width={w}
                  height={h}
                  sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                  className="block h-auto w-full transition-transform duration-[600ms] ease-out-soft group-hover:scale-[1.05] motion-reduce:transform-none"
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
            );
          })}
        </div>

        {/* Placeholder note */}
        <p className="mt-6 inline-block rounded-sm border border-dashed border-coral/50 bg-coral/5 px-4 py-2.5 font-mono text-xs leading-relaxed text-grey-dark">
          {t('note')}
        </p>
      </div>
    </section>
  );
}
