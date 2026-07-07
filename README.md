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

### Live on Vercel — resolved production incidents
The site has since actually shipped and is live on Vercel across all 4 locales. Two real
incidents came up and were fixed; both are relevant if you ever re-import this project or debug
a similar deploy:

1. **404 NOT_FOUND** — the GitHub repo has this Next.js app nested one folder down from repo
   root. Vercel's **Root Directory** project setting must point at that subfolder. Also note:
   **redeploying an existing deployment does not pick up a changed Root Directory setting** — it
   required deleting and freshly re-importing the Vercel project after fixing the setting.
2. **500 MIDDLEWARE_INVOCATION_FAILED**, `ReferenceError: __dirname is not defined` — caused by
   `next-intl`'s `localeDetection: true` pulling in Next's bundled `ua-parser-js` (via
   `next/server`'s `userAgent()` helper), which references `__dirname` and isn't compatible with
   Vercel's Edge Runtime (known upstream issue, amannn/next-intl#603). Fixed by setting
   `localeDetection: false` in `middleware.ts` (safe here since `localePrefix: 'always'` means
   every route always carries an explicit locale — no auto-detection needed) and by keeping the
   pure locale constants in a separate `i18n.routing.ts` with no import of `next-intl/server`, so
   the Edge middleware bundle never pulls in the message-loading code chain.

If either of these recur after a fresh import, check Root Directory first, then confirm
`middleware.ts` still has `localeDetection: false`.

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

## Photos

`ProductGallery.tsx` now mixes two kinds of images: the original named-by-role placeholders
below (still used in hero/section spots sitewide), plus **24 real shop photos** shot on-site,
added additively as `shoot-*.webp` files (e.g. `shoot-fish-ice.webp`, `shoot-storefront.webp`,
`shoot-owner-fish-1.webp`) — the placeholders were kept, not replaced, per client direction ("I
want it to stay pretty"). Each `shoot-*` entry has a matching `alt.*` key in all 4 message files.
Two of the originally-considered shop photos were deliberately excluded: one showing raw
meat/halal product (out of scope for a kosher fish shop's imagery), and none were excluded for
showing staff — the two "owner" photos were confirmed fine to publish. A couple of price-tag
photos were cropped to remove visible prices before use (the shop's prices change, and the site
otherwise makes no online-price claims); one (`shoot-grain-bags.webp`) was approved for use with
prices visible since the tags couldn't be cropped out without losing the product. Two of the
original placeholder photos (`watch-on-fish.webp`, `parrotfish.webp`) are also now used as quiet,
low-opacity atmosphere accents behind section headers on the Sortiment categories block and the
Über-uns "Values" section (`ProductCategories.tsx`, `app/[locale]/ueber-uns/page.tsx`) — decorative
only, `aria-hidden`, not part of the gallery grid.

### Swapping the placeholder images

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
The real shop logo (blue badge with white fish + waves, "FISCHE & MEHR") is now used site-wide:
`public/images/logo-badge.webp` in the Header & Footer, and a full PNG icon set generated from it —
`public/favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`,
`android-chrome-192x192.png`, `android-chrome-512x512.png`, plus `public/logo.png` (512px, used as
the JSON-LD `logo`). Wired in `app/[locale]/layout.tsx` (`icons`) and `public/site.webmanifest`.
The decorative `<FishMark>` SVG (`components/ui/Logo.tsx`, `public/logo-mark.svg`) is still used for
ambient watermarks (`BrandBackdrop`, etc.). Source logo: `../extra photos from david/fische logo old.jpg`.

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

> Full, prioritised, client-facing version lives in **`CLIENT-QUESTIONS.md`** (repo root, in German).

### ✅ Provided / done (July 2026)
Address **Glockengasse 22, 1020 Wien** + geocoded `geo` coords · phone **0676 844293203** ·
email **angelina.refaelov@chello.at** · WhatsApp (same number) · hours **Mo–Fr 08:30–17:30, Sa/So
geschlossen** (display + `SITE.hours` JSON-LD) · real logo + full favicon/app-icon set (generated
from the shop's logo) · 11 new shop photos processed + distributed across the site · new
**"Lebende Fische"** section · fish + specialty product notes written · founder story drafted
(grounded, flagged for confirmation) · fake testimonials removed. **No `⟦⟧` placeholders remain**
in `lib/site.ts` or `messages/*.json`.

### ⏳ Still outstanding
- [ ] **Impressum legal data** — Firmenwortlaut/Inhaber:in, UID (ATU…), Firmenbuch — currently
      "(wird ergänzt)" in `components/LegalContent.tsx`. Legally required; cannot be fabricated.
- [ ] **Live-fish species list** — confirm/adjust `liveFish.species` (all 4 message files) + `sortiment.fish.note`
- [ ] **Kosher certification body** — copy currently says "koscher" without naming a certifier
- [ ] **Founder story** — confirm/expand `ueber.story.*` (a grounded draft is in place)
- [ ] **Confirm WhatsApp is active** on 0676 844293203 (WhatsApp buttons link to it)
- [ ] **Transit lines / parking** — `kontakt.transit.body`, `config.transit`
- [ ] **Google Business Profile review link** — `lib/site.ts` `googleReviewsLink`, once claimed
- [ ] **Real testimonials** — Reviews section was removed; re-add with real Google quotes if wanted
- [ ] **Instagram / social links** — `lib/site.ts` `instagram`
- [ ] **Production domain** — `lib/site.ts` `url` (currently `fische-mehr.vercel.app`)
- [ ] **Formspree form ID** — `NEXT_PUBLIC_FORMSPREE_ID` (Vercel env); forms don't send without it
- [ ] **Native EN / RU / HE review** — all three are solid machine drafts (`_meta` flag in each file)

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
  It was redesigned from a raw interactive iframe to a `pointer-events-none` iframe wrapped in a
  single link, with a brand-color CSS filter (`.map-tint` in `globals.css`) and a hover-reveal
  "open in Maps" CTA pill — the old floating corner pill and directly-scrollable/zoomable
  embedded map were both removed per client feedback ("i dont like it").
- **Hover states** are now consistent across interactive cards/sections (`WhyStack.tsx`,
  `ProductCategories.tsx` — lift + shadow, accent line, icon color shift) after an audit found
  several sections with no hover feedback at all.
- **Footer fish watermark** (`BrandBackdrop`, used in `Footer.tsx`, the Über-uns kosher block, and
  `FreshFishNotifier.tsx`) was resized from `h-80 w-80` down to `h-52`/`h-56` — the larger size
  clipped visibly against its `overflow-hidden` container. A second animation variant
  (`animate-float-drift`, Y-only, no rotation) was added in `tailwind.config.ts` for watermarks
  near a boundary, since the original `float-slow` rotates and can clip corners.
- **Structured opening hours are withheld** (see SEO section above) rather than fabricated.
