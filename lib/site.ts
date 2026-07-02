/**
 * Non-translatable site constants used inside components/SEO.
 * User-facing TEXT lives in messages/*.json (config.* namespace).
 *
 * Real shop details provided by the owner (Glockengasse 22, 1020 Wien).
 */

export const SITE = {
  name: 'Fische & mehr',
  url: 'https://fische-mehr.vercel.app', // TODO: swap for a custom domain once registered
  // Contact — real shop details
  phone: '0676 844293203',
  phoneHref: 'tel:+43676844293203',
  whatsapp: '43676844293203', // same mobile number; confirm WhatsApp is active on it
  email: 'angelina.refaelov@chello.at',
  // Location — Glockengasse 22, 1020 Wien (Leopoldstadt, near Taborstraße)
  streetAddress: 'Glockengasse 22',
  postalCode: '1020',
  city: 'Wien',
  country: 'AT',
  // Geocoded coordinates of Glockengasse 22, 1020 Wien
  geo: { lat: 48.2192807, lng: 16.3826428 },
  transitStation: 'Taborstraße',
  // Forms
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? 'YOUR_FORMSPREE_ID',
  // OpenStreetMap embed centred on Glockengasse 22 (no API key needed)
  mapEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=16.3776%2C48.2168%2C16.3876%2C48.2218&layer=mapnik&marker=48.2192807%2C16.3826428',
  mapLink:
    'https://www.openstreetmap.org/?mlat=48.2192807&mlon=16.3826428#map=18/48.2192807/16.3826428',
  // Turn-by-turn directions (opens the visitor's maps app)
  directionsLink:
    'https://www.google.com/maps/dir/?api=1&destination=Glockengasse+22,+1020+Wien',
  // TODO: replace with the real Google Business Profile review link once claimed
  googleReviewsLink: 'https://www.google.com/maps/search/?api=1&query=Glockengasse+22+1020+Wien+Fische+mehr',
  // TODO: social links once the shop has them
  instagram: '',
  // Structured opening hours for JSON-LD. Mon–Fri 08:30–17:30, Sat & Sun closed.
  hours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '17:30',
    },
  ] as Array<{ dayOfWeek: string[]; opens: string; closes: string }>,
} as const;

/** Build a wa.me deep link, or null if no WhatsApp number is configured yet. */
export function whatsappHref(prefilledText: string): string | null {
  if (!SITE.whatsapp) return null;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(prefilledText)}`;
}

export const hasWhatsApp = Boolean(SITE.whatsapp);
