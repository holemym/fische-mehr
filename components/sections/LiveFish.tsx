import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { SITE } from '@/lib/site';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/ui/Reveal';
import { ArrowRight } from '@/components/ui/icons';

type Species = { name: string; desc: string };

/**
 * Live carp (Šaran) — the shop's signature. Set on the pale poster ground with
 * navy type (client round 1: no heavy dark blocks, "wie am Plakat").
 */
export default function LiveFish() {
  const t = useTranslations('liveFish');
  const alt = useTranslations('alt');
  const nav = useTranslations('nav');
  const species = t.raw('species') as Species[];

  return (
    <section className="relative isolate overflow-hidden bg-foam text-sea-ink">
      <div className="container-page py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* Photography — two live/fresh fish shots */}
          <Reveal className="order-1 lg:order-none">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-sm bg-sea-deep/10 sm:mt-12">
                <Image
                  src="/images/shoot-live-carp.webp"
                  alt={alt('shootLiveCarp')}
                  fill
                  sizes="(min-width:1024px) 22vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-sea-deep/10">
                <Image
                  src="/images/shoot-seabass.webp"
                  alt={alt('shootSeabass')}
                  fill
                  sizes="(min-width:1024px) 22vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <div>
            <Reveal className="max-w-xl">
              <Eyebrow>{t('eyebrow')}</Eyebrow>
              <SectionTitle size="lg" className="mt-5 text-sea-deep">
                {t('title')}
              </SectionTitle>
              <p className="mt-7 max-w-lg text-pretty text-lg leading-relaxed text-grey-dark">
                {t('body')}
              </p>
            </Reveal>

            {/* Species list */}
            <Reveal className="mt-12">
              <h3 className="eyebrow">{t('listTitle')}</h3>
              <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {species.map((s, i) => (
                  <li key={s.name} className="border-t border-sea-deep/15 pt-4">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-sea">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-xl tracking-tight text-sea-deep">
                        {s.name}
                      </span>
                    </div>
                    <p className="mt-1.5 text-pretty text-sm leading-relaxed text-grey-dark">
                      {s.desc}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-9 max-w-lg text-pretty text-sm leading-relaxed text-grey">
                {t('note')}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-sea-deep px-6 font-mono text-xs uppercase tracking-[0.12em] text-cream transition-colors duration-200 hover:bg-sea"
                >
                  {t('cta')}
                  <ArrowRight width={14} height={14} />
                </a>
                <Link
                  href="/sortiment"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-sea-deep/35 px-6 font-mono text-xs uppercase tracking-[0.12em] text-sea-deep transition-colors duration-200 hover:border-sea-deep hover:bg-sea-deep hover:text-cream"
                >
                  {nav('sortiment')}
                  <ArrowRight width={14} height={14} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
