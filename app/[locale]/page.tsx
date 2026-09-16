import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import Marquee from '@/components/sections/Marquee';
import LiveFish from '@/components/sections/LiveFish';
import Portions from '@/components/sections/Portions';
import ProductGallery from '@/components/sections/ProductGallery';
import ProductCategories from '@/components/sections/ProductCategories';
import Product from '@/components/sections/Product';
import StorefrontBand from '@/components/sections/StorefrontBand';
import FindUs from '@/components/sections/FindUs';
import FreshFishNotifier from '@/components/sections/FreshFishNotifier';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return pageMetadata(locale, 'home', '/');
}

// Section order follows the client's copy, block by block (round 1, 2026-09-16).
export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <JsonLd locale={locale} />
      <Hero />
      <TrustBar />
      {/* Lebendiger Karpfen – Šaran */}
      <LiveFish />
      <Marquee />
      {/* Frischer & tiefgekühlter Fisch */}
      <Product ns="home.product" image="/images/ang-fresh-counter.webp" altKey="angFreshCounter" />
      {/* Frisch für Sie vorbereitet (portions video) */}
      <Portions />
      {/* Geräucherte Fischspezialitäten — the platter, shown, no configurator */}
      <Product ns="home.smoked" image="/images/shoot-platters.webp" altKey="shootPlatters" flip tone="foam" />
      {/* Lachskaviar */}
      <Product ns="home.caviar" image="/images/ang-lachskaviar.webp" altKey="angLachskaviar" />
      <ProductGallery />
      {/* Russische & osteuropäische Delikatessen */}
      <ProductCategories />
      {/* Closing band: poster blue, storefront watermark, contact data */}
      <StorefrontBand />
      <FindUs />
      <FreshFishNotifier />
    </>
  );
}
