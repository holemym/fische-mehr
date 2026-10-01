import Image from 'next/image';

type W = readonly [text: string, lang: string, weight: 'b' | 's' | 'l'];

// "Frische Fische" exactly as on the façade poster, top block then bottom block.
// Two poster prints were garbled (Georgian, Armenian) and Mongolian was cut off;
// those use the correct native spelling. Persian in its own script.
const TOP: readonly W[] = [
  ['Frische Fische', 'de', 'b'],
  ['דגים טריים', 'he', 'b'],
  ['Свежая рыба', 'ru', 'b'],
  ['Fresh Fish', 'en', 'l'],
  ['Peixe fresco', 'pt', 's'],
  ['Φρέσκα ψάρια', 'el', 's'],
  ['Poissons frais', 'fr', 'l'],
  ['ปลาสด', 'th', 's'],
  ['Sveža riba', 'sl', 'b'],
  ['新鲜鱼', 'zh-Hans', 'l'],
  ['ახალი თევზი', 'ka', 'l'],
  ['Жаңа балық', 'kk', 'b'],
  ['Pescado fresco', 'es', 's'],
  ['Taze balık', 'tr', 'l'],
  ['Cá tươi', 'vi', 'b'],
  ['Pesce fresco', 'it', 'b'],
  ['Шинэхэн загас', 'mn', 's'],
];
const BOTTOM: readonly W[] = [
  ['ताज़ा मछली', 'hi', 's'],
  ['Friss halak', 'hu', 's'],
  ['Yangi baliq', 'uz', 'b'],
  ['Fersk fisk', 'no', 's'],
  ['Čerstvé ryby', 'cs', 's'],
  ['Tuore kala', 'fi', 'b'],
  ['ماهی تازه', 'fa', 's'],
  ['新鮮な魚', 'ja', 'l'],
  ['Świeże ryby', 'pl', 'b'],
  ['Թարմ ձկներ', 'hy', 'l'],
  ['Verse vis', 'nl', 's'],
  ['Ikan segar', 'id', 'b'],
  ['Pește proaspăt', 'ro', 's'],
  ['Svježa riba', 'hr', 's'],
  ['Пресни риби', 'bg', 's'],
];

const SIZE = {
  b: 'text-2xl font-medium text-sea-deep sm:text-4xl',
  s: 'text-base font-medium text-sea-deep/80 sm:text-xl',
  l: 'text-xl font-normal text-sea-deep/55 sm:text-3xl',
} as const;
// Small baseline offsets so the rows scatter like the poster instead of lining up.
const LIFT = ['', '-translate-y-1.5', 'translate-y-1', '-translate-y-0.5', 'translate-y-1.5'];

function Row({ words, anim }: { words: readonly W[]; anim: string }) {
  const track = [...words, ...words]; // duplicated for a seamless loop
  return (
    <div className={`flex w-max items-baseline motion-reduce:animate-none ${anim}`}>
      {track.map(([text, lang, weight], i) => (
        <span
          key={i}
          lang={lang}
          dir="auto"
          className={`whitespace-nowrap px-5 font-sans leading-tight tracking-tight sm:px-9 ${SIZE[weight]} ${LIFT[i % LIFT.length]}`}
        >
          {text}
        </span>
      ))}
    </div>
  );
}

/**
 * The façade poster as a band: "Frische Fische" in every language on the poster,
 * on its pale water ground. Two rows drift slowly in opposite directions (the
 * poster's top and bottom blocks). Decorative — static under reduced motion.
 */
export default function PosterWords() {
  return (
    <section aria-hidden dir="ltr" className="relative isolate overflow-hidden bg-foam py-10 sm:py-14">
      <Image
        src="/images/water-texture-pale.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-50"
      />
      <div
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)',
        }}
      >
        <Row words={TOP} anim="animate-poster-left" />
        <div className="mt-3 sm:mt-5">
          <Row words={BOTTOM} anim="animate-poster-right" />
        </div>
      </div>
    </section>
  );
}
