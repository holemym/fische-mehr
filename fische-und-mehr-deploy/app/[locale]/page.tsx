import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Hero from '@/components/sections/Hero';
import TodayFresh from '@/components/sections/TodayFresh';
import TrustBar from '@/components/sections/TrustBar';
import Marquee from '@/components/sections/Marquee';
import ProductGallery from '@/components/sections/ProductGallery';
import ProductCategories from '@/components/sections/ProductCategories';
import Product from '@/components/sections/Product';
import WhyStack from '@/components/sections/WhyStack';
import OriginTeaser from '@/components/sections/OriginTeaser';
import Reviews from '@/components/sections/Reviews';
import FindUs from '@/components/sections/FindUs';
import FreshFishNotifier from '@/components/sections/FreshFishNotifier';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return pageMetadata(locale, 'home', '/');
}

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
      <TodayFresh />
      <TrustBar />
      <Marquee />
      <ProductGallery />
      <ProductCategories />
      <Product />
      <WhyStack />
      <OriginTeaser />
      <Reviews />
      <FindUs />
      <FreshFishNotifier />
    </>
  );
}
