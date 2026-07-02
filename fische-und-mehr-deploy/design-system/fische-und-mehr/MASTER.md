# Design System — Fische & mehr (MASTER / Source of Truth)

> Authored from `02_BUILD-TASK_claude-code.md` + `01_STRATEGIE`. The ui-ux-pro-max
> auto-recommendation (Liquid Glass / pink / Inter-only) is **rejected** — the brand
> system below is non-negotiable per spec ("do not introduce new colors, fonts, or a
> different visual direction"). What we keep from ui-ux-pro-max is its UX rule set:
> accessibility (contrast 4.5:1, focus rings, alt text), motion (150–300ms, one motion
> per section, prefers-reduced-motion), forms (visible labels, inline validation,
> aria-live errors), performance (next/image, CLS, lazy below-fold).

## Aesthetic
Swiss-editorial documentation crossed with a fish market's honesty. The product
photography is the hero; the chrome is quiet. NOT a restaurant template, NOT an AI
default (no warm generic serif body, no centered-everything, no stock-gradient hero).

## Color tokens
| Role | Hex | Tailwind |
|------|-----|----------|
| navy (primary text / dark sections) | `#0d1f2d` | `navy` |
| navy-soft (secondary dark) | `#1a3144` | `navy-soft` |
| paper (background, off-white) | `#f5f1e8` | `paper` |
| paper-soft (section change) | `#ebe5d6` | `paper-soft` |
| coral (CTA / single accent ONLY) | `#c25a3e` | `coral` |
| gold (fine accents on dark) | `#b8945a` | `gold` |
| grey (secondary text) | `#8a8780` | `grey` |
| grey-dark (small body on paper) | `#4a4843` | `grey-dark` |

**Rule:** coral only for actions and single accents — never body text. Navy/paper dominant.
Contrast: small body text uses navy/grey-dark on paper (AA). Coral on paper only for large text/CTAs.

## Typography
- **Display/headings:** Fraunces (variable, opsz + soft/wonky lightly). Weight 300–500. Tight tracking. **lowercase** as a deliberate device.
- **Body:** Inter 400/500.
- **Mono accent (eyebrows, labels, numbers, prices):** Spline Sans Mono / JetBrains Mono.
- **Eyebrow:** mono, uppercase, letter-spacing ~0.16em, coral, ~8.5px.
- Generous whitespace. Large type. Editorial, not cramped.

## Motion
- Subtle scroll-reveal (fade + slight translate-y) on major sections / big images. One motion per section, max.
- Gentle parallax permitted on hero / large product images.
- MUST respect `prefers-reduced-motion: reduce` → disable all transforms/animation.
- IntersectionObserver-based `Reveal` wrapper (no heavy animation lib needed).

## Components (ui/)
- `Eyebrow` (mono, uppercase, coral, tracked)
- `SectionTitle` (Fraunces, lowercase, large, supports `\n` line breaks)
- `Reveal` (scroll-in wrapper, respects reduced-motion)
- `Button` (primary = coral, secondary = outline-navy)

## Pre-delivery checklist (from ui-ux-pro-max)
- [ ] No emojis as icons (SVG only)
- [ ] cursor-pointer on clickable elements
- [ ] Hover states 150–300ms
- [ ] Light text contrast ≥ 4.5:1 (small body navy/grey-dark on paper)
- [ ] Visible focus states for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375 / 768 / 1024 / 1440
- [ ] next/image width/height, alt from messages, lazy except hero (no CLS)
