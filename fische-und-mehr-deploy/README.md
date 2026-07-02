# Fische & mehr — Website

Marketing site for **Fische & mehr**, a small neighbourhood fishmonger and import shop at the
corner of Novaragasse / Glockengasse, 1020 Vienna (near Taborstraße). Sells fresh fish plus
imports from Uzbekistan and the region: dried fruit, nuts, natural honey, spices, spirits. Not
e-commerce — no cart, no online prices; fish is daily produce.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · next-intl (4 languages) ·
`next/image` · `next/font`.

**Languages:** German (default/source of truth), English, Russian, **Hebrew** (full RTL support —
`dir="rtl"`, Hebrew-capable fonts, mirrored icons/logical CSS positioning).

---

## Quickstart

```bash
npm install
cp .env.example .env.local   # then paste your Formspree ID
npm run dev                  # http://localhost:3000  → redirects to /de
npm run build && npm start   # production
```

Routes: `/de`, `/en`, `/ru`, `/he` and `/{locale}/sortiment`, `/{locale}/ueber-uns`,
`/{locale}/kontakt`, `/{locale}/impressum`, `/{locale}/datenschutz`.
Route segments stay German across all locales by design; only the content translates.

---

## Deploy to Vercel

1. Push this folder to a Git repo (see below).
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo. Framework
   preset **Next.js** is auto-detected; no build settings to change.
3. Add the environment variable **`NEXT_PUBLIC_FORMSPREE_ID`** (Project → Settings → Environment
   Variables) — the contact form, fish-platter order form, and fresh-fish notifier all POST to
   `formspree.io/f/<ID>`.
4. Deploy. Set the production domain in Vercel, then update `SITE.url` in `lib/site.ts`.

**Push to Git:**
```bash
git init && git add . && git commit -m "Fische & mehr website"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
`node_modules`, `.next`, and `.env*` are gitignored — `git add .` is safe. `.env.example` is
committed on purpose. The machine-specific `dev.cmd` / `start.cmd` helpers are gitignored too.

> Images: optimized automatically in production (Vercel), served unoptimized only in local dev
> for speed (`next.config.mjs`, gated on `NODE_ENV`).

### Deployment rehearsal (done)
Before shipping this build, it was extracted from a clean zip into an empty folder and run
through `npm ci` → `npm run build` → `npm start` exactly as Vercel would — confirming the package
is complete and boots correctly with no missing files. Security headers
(`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`,
`Strict-Transport-Security`) were added in `next.config.mjs` and verified present on the
response. **No CSP header** is set on purpose — the site embeds an OpenStreetMap iframe and POSTs
to Formspree, and shipping an untested CSP risks silently breaking one of them; add + test a CSP
against the live Vercel URL once one exists.

### Known dependency advisories (accepted, not blocking)
`npm audit` flags Next.js 14.2.35 (1 high) and next-intl 3.26.5 (2 moderate) — **both packages
are already on the newest patch release within their current major version**; the fixes only
exist in breaking major-version jumps (Next 16, next-intl 4.x, which changes the routing API
this app uses in `navigation.ts`/`i18n.ts`). Upgrading blind right before launch, untested, was
judged riskier than the actual exposure: this is a mostly-static marketing site with no
user-controlled image `remotePatterns`, no CSP nonces, no WebSocket usage, and very little
dynamic server-side request handling — the attack surface most of these advisories target.
**Recommended follow-up** (not urgent, do it as its own tested task): upgrade to next-intl 4.x
and Next.js 15/16 together, since next-intl 4 targets newer Next versions; expect to rewrite the
navigation helpers.

---

## Editing content

All user-facing text lives in **`messages/de.json`** (source of truth), with `en.json`, `ru.json`
and `he.json` as translations. Keys are identical across all four files. No text is hardcoded in
components — everything flows through next-intl.

### The ⟦bracket⟧ placeholder convention
Values wrapped in `⟦…⟧` are **facts the shop owner must confirm**. They render visibly (and, in
body copy, inside a dashed coral "Note" box) so they're impossible to miss. Search the repo for
`⟦` to find every one. Do **not** replace them with invented data — fill in real facts only.

Non-text constants (phone, WhatsApp number, geo, domain, Formspree ID, Google review link) live in
**`lib/site.ts`**. Structured (JSON-LD) opening hours are a *separate* field there (`SITE.hours`,
currently empty) — see the comment in that file before filling it in.

### "Heute frisch" strip
`messages/*.json` → `todayFresh.items` is a plain string array meant for the shop owner (or
whoever maintains the site) to hand-edit occasionally and redeploy — no CMS, no backend.

---

## Swapping the placeholder images

Photos are in **`public/images/`**, named by **role**. To swap, drop the real shoot photo in
with the **same filename** — nothing else changes. Aspect ratios used by the layout:

| file | role | rendered aspect |
|------|------|-----------------|
| `hero.webp` | home hero (and video poster fallback) | full-bleed |
| `product-fresh.webp` | product section | 2:3 portrait |
| `sortiment-fish.webp` | fish category | 3:2 |
| `sortiment-specialties.webp` | specialties category (⚠ still a fish placeholder) | 3:2 |
| `origin.webp` | herkunft / home origin | 4:5 |
| `kosher.webp` | kosher block accent | cover |
| `boats.webp` | über-uns atmosphere | 4:5 |
| `specialty-detail.webp` | über-uns origin accent | 3:2 |
| `og-image.webp` | social share | 1200×630 |

Alt text comes from the `alt.*` keys in the message files (translate when you swap photos —
these matter for accessibility AND for image search/AI-SEO).

### Hero video (progressive enhancement)
The home hero layers `hero-loop.webm` / `hero-loop.mp4` over the static `hero.webp`
(`muted autoplay loop playsInline`, poster `hero-poster.webp`). Only loads when motion is
allowed (`prefers-reduced-motion: reduce` shows the static image), falls back on error, never
blocks first paint. A **custom branded loop** rendered with Remotion lives in
`../hero-remotion/` — see its README to re-render.

### Logo & favicon
Real logo assets: `public/logo-mark.svg` (fish mark, used inline as `<FishMark>` in
`components/ui/Logo.tsx`), `public/logo-full.svg` (full lockup, used in JSON-LD `logo`),
`public/wave.svg`. Favicon (`public/favicon.svg`) uses the real fish mark on a sea-deep
background. No PNG icon set (apple-touch-icon, android-chrome sizes) exists yet — see TODO list.

---

## Interactive features

- **Fish-platter builder** (`components/sections/PlatterBuilder.tsx`, on the Sortiment page) —
  pick occasion, party size, and items; composes a readable summary and e-mails it to the shop
  via Formspree as a non-binding pre-order. No online payment.
- **Fresh-fish e-mail notifier** (`FreshFishNotifier.tsx`) — email signup via Formspree.
- **Contact form** (`ContactForm.tsx`) — same Formspree pattern, client validation, inline
  errors, focus-management on error.

All three POST to the same `NEXT_PUBLIC_FORMSPREE_ID` endpoint with a `form` field so
submissions can be told apart in the Formspree inbox.

---

## SEO & AI-SEO

- **hreflang** (de/en/ru/he + x-default) on every page, proper OG locale codes (`de_AT`,
  `en_US`, `ru_RU`, `he_IL`) with `alternateLocale`.
- **LocalBusiness JSON-LD** (`components/JsonLd.tsx`, home page) — includes `hasOfferCatalog`
  (the 6 real product categories), `knowsLanguage`, `logo`. **Opening hours are intentionally
  omitted from structured data until `SITE.hours` in `lib/site.ts` is filled in** — publishing
  fabricated hours could mislead customers via Google/Maps "open now" signals. Same logic gates
  phone/email/street address and `sameAs` (Instagram, Google reviews).
- **FAQPage JSON-LD** — co-located in `Faq.tsx`, built from `faq.items`; placeholder-bracket
  answers are automatically excluded so no fake facts get published.
- **BreadcrumbList JSON-LD** — `components/Breadcrumbs.tsx`, added to every sub-page (structured
  data only, no visible UI change — the header nav already gives visual wayfinding).
- **`/llms.txt`** (`public/llms.txt`) — plain-text site summary for AI answer engines
  (ChatGPT/Perplexity/Google SGE-style crawlers), per the emerging llms.txt convention.
- **`robots.ts`** explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, anthropic-ai, CCBot) in addition to the wildcard rule.
- **`sitemap.ts`** — all locale × page combinations, all 4 languages.
- Per-page `keywords` meta (`lib/seo.ts`), `formatDetection: { telephone: false }` so the
  placeholder phone text never gets auto-linked as a real number.

---

## Hebrew / RTL support

Hebrew is a full 4th locale, not a stub: `dir="rtl"` on `<html>`, Hebrew-capable fonts (Frank
Ruhl Libre for display, Heebo for body — appended to the Latin/Cyrillic font stacks so glyphs
fall through correctly), logical CSS positioning (`start-`/`end-` instead of hardcoded
`left-`/`right-` on the nav underline, scroll-to-top button, map CTA pill), and the `ArrowRight`
icon auto-mirrors under `dir="rtl"` (`rtl:-scale-x-100` baked into the icon component, no
per-usage changes needed). All 228 message keys are translated (only `brand.name` intentionally
stays as the Latin brand name in every locale).

**Known RTL limitation:** decorative background elements (`BrandBackdrop` fish/wave watermarks,
`Marquee` scroll direction) were left as-is — they're non-critical ambient decoration, not
reading-direction-sensitive content, and mirroring them wasn't worth the complexity budget.

---

## i18n / translation status

- **DE** — complete, source of truth.
- **EN**, **RU**, **HE** — full **machine drafts**, flagged `"_meta": "DRAFT …"` at the top of
  each file. Get all three natively reviewed before launch — RU and HE are real trust-languages
  for this audience, not afterthoughts.

---

## TODO facts the shop owner still needs to provide

- [ ] **Exact house number** — `config.address` (all 4 message files) + `lib/site.ts` `streetAddress`
- [ ] **Geo coordinates** — `lib/site.ts` `geo` (currently an approximation of the street corner)
- [ ] **Kosher certification body** — `home.trust.kosher.value`, `home.kosher.body`, `ueber.kosher.body`, `faq.items`
- [ ] **Exact opening hours** — the free-text `config.hoursWeekday/Friday/Weekend` in messages, AND separately `SITE.hours` in `lib/site.ts` for structured data (see comment there)
- [ ] **Fish species list** — `sortiment.fish.note`
- [ ] **Specialty products list** — `sortiment.spec.note`
- [ ] **Real founder story** — `ueber.story.title` + `ueber.story.body`
- [ ] **Transit / parking info** — `kontakt.transit.body`
- [ ] **Shop phone, e-mail, WhatsApp number** — all currently ⟦placeholders⟧ in `lib/site.ts` and messages (deliberately stripped of any personal contact info)
- [ ] **Production domain** — `lib/site.ts` `url`
- [ ] **Google Business Profile review link** — `lib/site.ts` `googleReviewsLink`, once claimed
- [ ] **Real testimonials** — `reviews.items` are placeholder quotes, clearly marked
- [ ] **Instagram / social links** — `lib/site.ts` `instagram`
- [ ] **Specialties photo + real shoot photos** — replace `public/images/*` (keep filenames)
- [ ] **Impressum / Datenschutz specifics** — company name, UID, Firmenbuch (see `⟦…⟧` in `components/LegalContent.tsx`); have a lawyer review before launch
- [ ] **Formspree form ID** — `.env.local`
- [ ] **PNG icon set** — apple-touch-icon.png (180×180), favicon PNGs, android-chrome sizes — generate from `public/logo-mark.svg` (e.g. via realfavicongenerator.net); no local rasterizer (`sharp`) was available in this environment
- [ ] **Native EN / RU / HE review** — all three are machine drafts (`_meta` flag in each file)

---

## Design system

`design-system/fische-und-mehr/MASTER.md` documents the design direction. **Note:** the palette
described there (navy/paper/coral) was superseded mid-project by client direction — the live
palette is **cream + sea blue** (`cream`, `sea`, `sea-deep`, `sea-light`, `sand`, `foam`; coral
demoted to a rare accent). Tokens live in `tailwind.config.ts`; legacy `navy`/`paper`/`gold`
class names are aliased to the new palette so nothing broke mid-migration, but new code should
use the sea/cream names directly.

## Notes / judgment calls
- **Font:** Lora (not the originally-specced Fraunces) — client redirect.
- **Kosher messaging** is deliberately quiet — one mention in the trust bar, one section on
  Über-uns — per client direction, not emphasized on the hero.
- **Map** on Kontakt/home is a live OpenStreetMap embed (no API key needed), not a placeholder.
- **Structured opening hours are withheld** (see SEO section above) rather than fabricated.
