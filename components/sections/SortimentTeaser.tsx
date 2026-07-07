import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/icons';

const CARDS = [
  { key: 'fish', img: '/images/sortiment-fish.webp', alt: 'sortimentFish' },
  { key: 'spec', img: '/images/sortiment-specialties.webp', alt: 'sortimentSpecialties' },
] as const;

export default function SortimentTeaser() {
  const t = useTranslations('home.sortiment');
  const alt = useTranslations('alt');

  return (
    <section className="bg-paper-soft py-24 sm:py-32">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <SectionTitle className="mt-4">{t('title')}</SectionTitle>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {CARDS.map(({ key, img, alt: altKey }, i) => (
            <Reveal as="article" delay={i * 90} key={key} className="group">
              <Link href="/sortiment" className="block">
                <div className="relative aspect-[3/2] overflow-hidden bg-navy/5">
                  <Image
                    src={img}
                    alt={alt(altKey)}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03] motion-reduce:transform-none"
                  />
                </div>
                <h3 className="mt-6 font-display text-3xl tracking-tight text-navy">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-3 max-w-md text-pretty leading-relaxed text-grey-dark">
                  {t(`${key}.body`)}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <ButtonLink href="/sortiment" variant="secondary" size="lg">
            {t('cta')}
            <ArrowRight />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
