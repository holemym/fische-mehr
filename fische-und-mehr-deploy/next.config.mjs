import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Optimize in production (Vercel handles sharp fast). Skip only in local dev,
    // where the on-machine optimizer is slow for the gallery.
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  // Baseline security headers. No CSP here on purpose: the site embeds an
  // OpenStreetMap iframe and POSTs to Formspree, and getting a CSP wrong (breaking
  // either) is worse than not having one — add + test it against the live Vercel
  // deployment once one exists, don't ship it untested.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
