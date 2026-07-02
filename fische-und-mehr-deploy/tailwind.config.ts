import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // — Sea-blue + cream system (refined toward the logo blue #042C5F) —
        cream: '#f7f2e8', // warm off-white, primary bg
        'cream-soft': '#efe7d6',
        foam: '#e4eef3', // pale sea tint for alternating sections
        sea: '#1c5f8c', // primary sea blue (cleaner, less teal)
        'sea-deep': '#0a3354', // deep sea-navy — dark sections / strong text
        'sea-ink': '#062339', // near-black ocean — body text
        'sea-light': '#74b4d6', // accents, foam highlights, lines
        sand: '#c9a05f', // warm fine accent on deep sea
        coral: '#c25a3e', // demoted: rare warm accent only
        grey: '#79858b',
        'grey-dark': '#3a4751',

        // — Legacy aliases (so not-yet-migrated sections keep rendering) —
        navy: '#0a3354',
        'navy-soft': '#1c5f8c',
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
