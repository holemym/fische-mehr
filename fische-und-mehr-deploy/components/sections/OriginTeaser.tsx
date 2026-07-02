import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/icons';

export default function OriginTeaser() {
  const t = useTranslations('home.origin');
  const alt = useTranslations('alt')('origin');

  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="container-page grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
        <Reveal className="max-w-md md:order-2">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <SectionTitle className="mt-4">{t('title')}</SectionTitle>
          <p className="mt-6 text-pretty leading-relaxed text-grey-dark">
            {t('body')}
          </p>
          <div className="mt-8">
            <ButtonLink href="/ueber-uns" variant="secondary">
              {t('cta')}
              <ArrowRight />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className="md:order-1">
          <div className="relative aspect-[4/5] overflow-hidden bg-paper-soft">
            <Image
              src="/images/origin.webp"
              alt={alt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
