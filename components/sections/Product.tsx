import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { clsx } from '@/lib/clsx';

/**
 * Photo + copy split. Reused for the fresh/frozen fish, smoked fish and caviar
 * blocks — same skeleton on purpose (product pages repeat), alternating sides.
 * The body may hold two paragraphs separated by a blank line.
 */
export default function Product({
  ns = 'home.product',
  image = '/images/shoot-salmon-fresh.webp',
  altKey = 'shootSalmonFresh',
  flip = false,
  tone = 'paper',
}: {
  ns?: string;
  image?: string;
  altKey?: string;
  /** Put the photo on the right instead of the left. */
  flip?: boolean;
  tone?: 'paper' | 'foam';
}) {
  const t = useTranslations(ns);
  const alt = useTranslations('alt')(altKey);

  return (
    <section className={clsx('py-24 sm:py-32', tone === 'foam' ? 'bg-foam' : 'bg-paper')}>
      <div className="container-page grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
        <Reveal className={clsx('order-1', flip ? 'md:order-2' : 'md:order-none')}>
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-paper-soft">
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal className={clsx('max-w-md', flip && 'md:order-1')}>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <SectionTitle className="mt-4">{t('title')}</SectionTitle>
          <div className="mt-6 space-y-4 text-pretty leading-relaxed text-grey-dark">
            {t('body')
              .split('\n\n')
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
