import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { ButtonAnchor } from '@/components/ui/Button';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Phone } from '@/components/ui/icons';

export default function CtaFooter() {
  const t = useTranslations('home.cta');
  const tagline = useTranslations('brand')('tagline');

  return (
    <section className="bg-coral text-paper">
      <div className="container-page py-24 text-center sm:py-28">
        <Reveal className="mx-auto max-w-2xl">
          <Eyebrow className="text-paper/80">{tagline}</Eyebrow>
          <SectionTitle size="lg" className="mt-4 text-paper">
            {t('title')}
          </SectionTitle>
          <p className="mx-auto mt-6 max-w-md text-pretty text-lg leading-relaxed text-paper/90">
            {t('body')}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonAnchor
              href={SITE.phoneHref}
              size="lg"
              className="bg-paper text-navy hover:bg-navy hover:text-paper"
            >
              <Phone />
              {t('call')}
            </ButtonAnchor>
            <WhatsAppButton
              label={t('whatsapp')}
              variant="onDark"
              size="lg"
              className="border-paper/60 text-paper hover:bg-paper hover:text-coral"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
