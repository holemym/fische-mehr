/**
 * Non-translatable site constants used inside components/SEO.
 * User-facing TEXT lives in messages/*.json (config.* namespace).
 *
 * ⟦…⟧ marks facts to confirm. The shop's own phone/email/WhatsApp are NOT David's —
 * they are placeholders until the shop provides its own contact details.
 */

export const SITE = {
  name: 'Fische & mehr',
  url: 'https://fische-und-mehr.at', // ⟦TODO: confirm production domain⟧
  // Contact — placeholders (shop to provide its own; do NOT use a personal number)
  phone: '⟦Telefonnummer⟧',
  phoneHref: '#kontakt',
  whatsapp: '', // ⟦TODO: shop WhatsApp number (digits only, e.g. 4367612345678)⟧
  email: '⟦shop@…⟧', // ⟦TODO: shop email⟧
  // Location — real: corner of Novaragasse / Glockengasse, 1020 Wien (by Taborstraße)
  streetAddress: 'Novaragasse / Glockengasse', // ⟦TODO: confirm house number⟧
  postalCode: '1020',
  city: 'Wien',
  country: 'AT',
  // Approx. coordinates of the Novaragasse/Glockengasse corner, 1020 Wien
  geo: { lat: 48.2178, lng: 16.3845 },
  transitStation: 'Taborstraße',
  // Forms
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? 'YOUR_FORMSPREE_ID',
  // OpenStreetMap embed centred on the corner (no API key needed)
  mapEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=16.3795%2C48.2153%2C16.3895%2C48.2203&layer=mapnik&marker=48.2178%2C16.3845',
  mapLink: 'https://www.openstreetmap.org/?mlat=48.2178&mlon=16.3845#map=18/48.2178/16.3845',
  // Turn-by-turn directions (opens the visitor's maps app)
  directionsLink: 'https://www.google.com/maps/dir/?api=1&destination=48.2178,16.3845',
  // ⟦TODO: replace with the real Google Business Profile review link once claimed⟧
  googleReviewsLink: 'https://www.google.com/maps/place/?q=place_id:PLACEHOLDER',
  // ⟦TODO: social links once the shop has them⟧
  instagram: '',
  // Structured hours for JSON-LD ONLY (separate from the free-text display strings in
  // messages/*.json config.hoursWeekday/Friday/Weekend). Left empty until the shop
  // confirms real hours — publishing fabricated hours in structured data could mislead
  // customers via Google/Maps ("open now" when the shop is actually closed). Fill in
  // like this once confirmed, then JsonLd.tsx will pick it up automatically:
  //   hours: [
  //     { dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday'], opens: '09:00', closes: '18:00' },
  //     { dayOfWeek: ['Friday'], opens: '08:00', closes: '14:00' },
  //   ],
  hours: [] as Array<{ dayOfWeek: string[]; opens: string; closes: string }>,
} as const;

/** Build a wa.me deep link, or null if no WhatsApp number is configured yet. */
export function whatsappHref(prefilledText: string): string | null {
  if (!SITE.whatsapp) return null;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(prefilledText)}`;
}

export const hasWhatsApp = Boolean(SITE.whatsapp);
