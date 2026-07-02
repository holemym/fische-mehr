import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';

export default function KosherBlock() {
  const t = useTranslations('home.kosher');
  const alt = useTranslations('alt')('kosher');

  return (
    <section className="relative isolate overflow-hidden bg-navy text-paper">
      {/* Subtle image accent on the right, behind a strong navy scrim */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-y-0 right-0 w-1/2 opacity-30">
          <Image
            src="/images/kosher.webp"
            alt=""
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy to-navy/60" />
      </div>

      <div className="container-page py-28 sm:py-36">
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-gold">{t('eyebrow')}</Eyebrow>
          <SectionTitle size="lg" className="mt-5 text-paper">
            {t('title')}
          </SectionTitle>
          <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-paper/85">
            {t('body')}
          </p>
        </Reveal>
      </div>
      {/* Visually-hidden alt context for the decorative image */}
      <span className="sr-only">{alt}</span>
    </section>
  );
}
