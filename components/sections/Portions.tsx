import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';

/**
 * "So sehen unsere Portionen aus" — a short vertical clip from the shop showing
 * how the fish is cut. Muted autoplay loop; poster covers first paint.
 */
export default function Portions() {
  const t = useTranslations('portions');

  return (
    <section className="bg-cream py-24 sm:py-28">
      <div className="container-page grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
        <Reveal className="order-2 max-w-md md:order-1">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <SectionTitle className="mt-4">{t('title')}</SectionTitle>
          <p className="mt-6 text-pretty leading-relaxed text-grey-dark">{t('body')}</p>
        </Reveal>

        <Reveal className="order-1 justify-self-center md:order-2">
          <div className="relative aspect-[9/16] w-full max-w-[330px] overflow-hidden rounded-sm bg-sea-deep/5 shadow-xl ring-1 ring-sea-deep/10">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/video/portions-poster.webp"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/video/portions.webm" type="video/webm" />
              <source src="/video/portions.mp4" type="video/mp4" />
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
