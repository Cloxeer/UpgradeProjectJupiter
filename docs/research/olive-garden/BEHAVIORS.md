# Olive Garden — Behaviors

## Sticky navigation

- Header (`#header`) stays fixed at top on scroll
- White background, shadow on scroll (implemented via `.og-header.is-scrolled` in scripts.js)
- Mobile: hamburger opens slide-in nav panel from left

## Video hero

- `<video autoplay muted loop playsinline>` with poster fallback image
- Decorative — no user controls
- Overlay content centered (mobile) / centered (desktop)
- Two stacked CTAs on mobile; inline on desktop

## Alert bar

- Full-width terracotta strip above header
- Centered single-line promo text
- No dismiss button on reference

## Specials carousel

- Horizontal track with prev/next arrow buttons
- ~4 cards visible on desktop, 1 on mobile
- Cards use CSS background-image with Learn More + Order Now CTAs
- Implemented in `scripts.js` as vanilla carousel (no Slick dependency)

## Menu highlight cards

- `smooth-zoom` hover scale on images
- Asymmetric grid: 2 large cards top row, 4 half cards bottom, 2 large cards final row
- Each card: script title + ORDER NOW pill

## Quick action cards

- 4-column grid desktop, 2×2 mobile
- Background images with gradient overlay
- Outlined or filled CTA buttons per card

## eClub form

- Static form layout (submit disabled in template — Halite Studio wires later)
- Email + zip inputs + SUBMIT pill button

## Footer

- Dark olive `#303E1E` background
- White uppercase script headings per column
- Social icons + app store badges
