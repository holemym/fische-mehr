'use client';

import { useMemo, useState, useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import { clsx } from '@/lib/clsx';

type Cat = 'fish' | 'spec';
type Tile = { img: string; cat: Cat };

// Row-span masonry tuning: rows are ROW_UNIT tall, GAP between items. Each tile
// spans however many rows its real (uncropped) height needs — computed on the
// client from the measured column width and the image's aspect ratio.
const ROW_UNIT = 8;
const GAP = 12;

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
  'shoot-tinned-fish': [1196, 1800],
  'shoot-seashells': [1800, 1196],
  'shoot-salmon-slices': [1800, 1196],
  'shoot-smoked-counter': [1800, 1196],
  'shoot-owner-fish-1': [1196, 1800],
  'shoot-owner-fish-2': [1196, 1800],
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
  // New owner photos (2000px portrait)
  'shoot-fish-selection': [1125, 2000],
  'shoot-whole-fish-ice': [1125, 2000],
  'shoot-white-fillets': [1125, 2000],
  'shoot-salmon-fresh': [1125, 2000],
  'shoot-smoked-whole': [1125, 2000],
  'shoot-platters': [1125, 2000],
  'shoot-platter-catering': [1500, 2000],
  'shoot-seabass': [1125, 2000],
  'shoot-fish-fresh-2': [1125, 2000],
  'shoot-smoked-fillets': [1125, 2000],
  'shoot-dorade': [1125, 2000],
  'shoot-live-carp': [941, 1672],
  'shoot-tuna': [1125, 2000],
};

// Picture-forward masonry. Real shop photos only — the generic placeholder
// images were removed (except the salmon/fish studio shots the owner wanted
// kept). Fish shots lead, specialties follow.
const TILES: Tile[] = [
  // Live & fresh fish
  { img: 'shoot-live-carp', cat: 'fish' },
  { img: 'shoot-whole-fish-ice', cat: 'fish' },
  { img: 'shoot-storefront', cat: 'fish' },
  { img: 'shoot-tuna', cat: 'fish' },
  { img: 'shoot-dorade', cat: 'fish' },
  { img: 'shoot-fish-ice', cat: 'fish' },
  { img: 'shoot-seabass', cat: 'fish' },
  { img: 'product-fresh', cat: 'fish' },
  { img: 'shoot-salmon-fresh', cat: 'fish' },
  { img: 'shoot-fresh-fish', cat: 'fish' },
  { img: 'shoot-fish-fresh-2', cat: 'fish' },
  { img: 'sortiment-fish', cat: 'fish' },
  { img: 'shoot-white-fillets', cat: 'fish' },
  { img: 'shoot-salmon-fillet', cat: 'fish' },
  { img: 'kosher', cat: 'fish' },
  { img: 'shoot-salmon-slices', cat: 'fish' },
  { img: 'shoot-owner-fish-1', cat: 'fish' },
  { img: 'shoot-smoked-fish-row', cat: 'fish' },
  { img: 'shoot-smoked-whole', cat: 'fish' },
  { img: 'shoot-smoked-counter', cat: 'fish' },
  { img: 'parrotfish', cat: 'fish' },
  { img: 'shoot-smoked-fillets', cat: 'fish' },
  { img: 'shoot-owner-fish-2', cat: 'fish' },
  { img: 'shoot-fish-selection', cat: 'fish' },
  { img: 'shoot-platter-catering', cat: 'fish' },
  { img: 'shoot-platters', cat: 'fish' },
  { img: 'hero', cat: 'fish' },
  { img: 'shoot-caviar-tins', cat: 'fish' },
  { img: 'shoot-seashells', cat: 'fish' },
  { img: 'shoot-tinned-fish', cat: 'fish' },
  { img: 'shoot-frozen-fish-1', cat: 'fish' },
  { img: 'shoot-frozen-fish-2', cat: 'fish' },
  // Specialties
  { img: 'shoot-honey-jar', cat: 'spec' },
  { img: 'shoot-condensed-milk', cat: 'spec' },
  { img: 'shoot-sweets-shelf', cat: 'spec' },
  { img: 'shoot-pickled-jars-1', cat: 'spec' },
  { img: 'shoot-pickled-jars-2', cat: 'spec' },
  { img: 'shoot-spirits-1', cat: 'spec' },
  { img: 'shoot-spirits-2', cat: 'spec' },
  { img: 'shoot-sunflower-seeds', cat: 'spec' },
  { img: 'shoot-grain-bags', cat: 'spec' },
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

  const gridRef = useRef<HTMLDivElement>(null);

  // Measure each tile's real height (from its column width + aspect ratio) and
  // set its grid-row span, so landscape shots can be wide (2 columns) while every
  // photo keeps its true aspect ratio — no cropping, no ragged gaps.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const layout = () => {
      const figures = grid.querySelectorAll<HTMLElement>('figure[data-aspect]');
      figures.forEach((fig) => {
        const aspect = parseFloat(fig.dataset.aspect || '1'); // width / height
        const width = fig.getBoundingClientRect().width;
        if (!width) return;
        const height = width / aspect;
        const span = Math.max(1, Math.round((height + GAP) / (ROW_UNIT + GAP)));
        fig.style.gridRowEnd = `span ${span}`;
      });
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(grid);
    window.addEventListener('resize', layout);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', layout);
    };
  }, [tiles]);

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
    'shoot-fish-selection': 'shootFishSelection',
    'shoot-whole-fish-ice': 'shootWholeFishIce',
    'shoot-white-fillets': 'shootWhiteFillets',
    'shoot-salmon-fresh': 'shootSalmonFresh',
    'shoot-smoked-whole': 'shootSmokedWhole',
    'shoot-platters': 'shootPlatters',
    'shoot-platter-catering': 'shootPlatterCatering',
    'shoot-seabass': 'shootSeabass',
    'shoot-fish-fresh-2': 'shootFishFresh2',
    'shoot-smoked-fillets': 'shootSmokedFillets',
    'shoot-dorade': 'shootDorade',
    'shoot-live-carp': 'shootLiveCarp',
    'shoot-tuna': 'shootTuna',
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

        {/* Row-span masonry — every tile keeps the photo's real aspect ratio
            (no forced crop); landscape shots span 2 columns so they read bigger. */}
        <div
          ref={gridRef}
          className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
          style={{ gridAutoRows: `${ROW_UNIT}px` }}
        >
          {tiles.map((tile, i) => {
            const [w, h] = DIMS[tile.img];
            const landscape = w > h;
            // Rough pre-hydration span estimate (refined client-side); avoids a
            // collapsed first paint before useLayoutEffect measures real widths.
            const estWidth = landscape ? 640 : 320;
            const estSpan = Math.max(
              1,
              Math.round((estWidth / (w / h) + GAP) / (ROW_UNIT + GAP)),
            );
            return (
              <figure
                key={`${tile.img}-${i}`}
                data-aspect={w / h}
                style={{ gridRowEnd: `span ${estSpan}` }}
                className={clsx(
                  'group relative block overflow-hidden rounded-sm bg-sea-deep/5',
                  landscape && 'col-span-2',
                )}
              >
                <Image
                  src={`/images/${tile.img}.webp`}
                  alt={alt(altKey[tile.img] ?? 'hero')}
                  width={w}
                  height={h}
                  sizes="(min-width:1024px) 480px, (min-width:768px) 340px, 100vw"
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

        {/* Caption */}
        <p className="mt-6 text-pretty text-sm leading-relaxed text-grey">
          {t('note')}
        </p>
      </div>
    </section>
  );
}
