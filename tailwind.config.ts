import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // — Royal-blue + cream system (matched to the shop's store/logo blue) —
        cream: '#f7f2e8', // warm off-white, primary bg
        'cream-soft': '#efe7d6',
        foam: '#e6eef8', // pale royal tint for alternating sections
        sea: '#08497e', // deep royal accent — icons, lines, button hover, links
        'sea-deep': '#0a5fa5', // the store's royal blue — dark sections / strong text
        'sea-ink': '#08243f', // near-black royal — body text
        'sea-light': '#6ba6d9', // light royal — highlights, the "&", accents on dark
        sand: '#c9a05f', // warm fine accent on royal blue
        coral: '#c25a3e', // demoted: rare warm accent only
        grey: '#79858b',
        'grey-dark': '#3a4751',

        // — Legacy aliases (so not-yet-migrated sections keep rendering) —
        navy: '#0a5fa5',
        'navy-soft': '#08497e',
        paper: '#f7f2e8',
        'paper-soft': '#efe7d6',
        gold: '#c9a05f',
      },
      fontFamily: {
        // Wired to next/font CSS variables (see app/[locale]/layout.tsx)
        display: ['var(--font-display)', 'var(--font-he-display)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'var(--font-he-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'var(--font-he-body)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        eyebrow: '0.16em',
        tight: '-0.02em',
        tighter: '-0.035em',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'reveal-up': {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scroll-cue': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(250%)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1.5deg)' },
        },
        // Y-only, no rotation — for large decorative watermarks bleeding off an
        // overflow-hidden edge, where rotation makes the bounding box swing wide
        // enough to visibly clip a corner.
        'float-drift': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'reveal-up': 'reveal-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scroll-cue': 'scroll-cue 1.8s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        marquee: 'marquee 32s linear infinite',
        'float-slow': 'float-slow 11s ease-in-out infinite',
        'float-drift': 'float-drift 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
