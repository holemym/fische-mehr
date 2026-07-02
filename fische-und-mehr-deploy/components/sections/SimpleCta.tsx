import { useTranslations } from 'next-intl';
import { SITE } from '@/lib/site';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { ButtonAnchor } from '@/components/ui/Button';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Phone } from '@/components/ui/icons';

/** Reused bottom-of-page CTA for sub-pages. Reads title/body from the given namespace. */
export default function SimpleCta({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const cta = useTranslations('cta');

  return (
    <section className="border-t border-navy/10 bg-paper-soft">
      <div className="container-page py-24 text-center sm:py-28">
        <Reveal className="mx-auto max-w-2xl">
          <SectionTitle size="md">{t('title')}</SectionTitle>
          <p className="mx-auto mt-5 max-w-md text-pretty leading-relaxed text-grey-dark">
            {t('body')}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonAnchor href={SITE.phoneHref} size="lg">
              <Phone />
              {cta('call')}
            </ButtonAnchor>
            <WhatsAppButton variant="secondary" size="lg" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
