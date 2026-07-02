import { useTranslations } from 'next-intl';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';

type Item = { q: string; a: string };

export default function Faq() {
  const t = useTranslations('faq');
  const items = t.raw('items') as Item[];

  // FAQPage structured data — high-value for AI answer engines (Perplexity, Google
  // SGE, ChatGPT search) which lean heavily on FAQPage schema to surface direct
  // answers. Bracket-placeholder answers are skipped so we don't publish fake facts.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items
      .filter((item) => !item.a.includes('⟦'))
      .map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
  };

  return (
    <section className="border-t border-sea-deep/10 bg-cream py-20 sm:py-28">
      {faqJsonLd.mainEntity.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <div className="container-page grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal>
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <SectionTitle className="mt-4">{t('title')}</SectionTitle>
        </Reveal>

        <Reveal delay={80} as="div">
          <dl className="divide-y divide-sea-deep/12 border-y border-sea-deep/12">
            {items.map((item, i) => (
              <details key={i} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sea-deep marker:content-none">
                  <dt className="font-display text-lg lowercase tracking-tight sm:text-xl">
                    {item.q}
                  </dt>
                  <span
                    aria-hidden
                    className="relative h-4 w-4 shrink-0 text-sea transition-transform duration-300 group-open:rotate-45"
                  >
                    <span className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-current" />
                  </span>
                </summary>
                <dd className="max-w-prose pb-5 pr-8 text-pretty leading-relaxed text-grey-dark">
                  {item.a}
                </dd>
              </details>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
