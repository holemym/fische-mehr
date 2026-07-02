import Eyebrow from '@/components/ui/Eyebrow';
import SectionTitle from '@/components/ui/SectionTitle';

/** Quiet editorial header for sub-pages (paper bg, left-aligned, generous space). */
export default function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-sea-deep/10 bg-cream">
      <div className="container-page pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <SectionTitle as="h1" size="xl" className="mt-5">
            {title}
          </SectionTitle>
          {intro && (
            <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-grey-dark">
              {intro}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
