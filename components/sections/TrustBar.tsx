import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';

const ITEMS = ['kosher', 'location', 'fresh'] as const;

export default function TrustBar() {
  const t = useTranslations('home.trust');

  return (
    <section className="border-y border-navy/10 bg-paper-soft">
      <div className="container-page">
        <dl className="grid divide-y divide-navy/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {ITEMS.map((key, i) => (
            <Reveal
              as="div"
              delay={i * 80}
              key={key}
              className="flex flex-col gap-1.5 py-7 sm:px-8 sm:py-9 sm:first:pl-0 sm:last:pr-0"
            >
              <dt className="eyebrow">{t(`${key}.label`)}</dt>
              <dd className="font-display text-xl tracking-tight text-navy sm:text-2xl">
                {t(`${key}.value`)}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
