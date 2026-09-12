# Bang Bang Forever — Page Topology

**Source:** https://www.bangbangforever.com/#bangbang  
**Platform:** Squarespace (parallax index template)

## Layout Model

- **Desktop:** 50/50 split — fixed left panel with full-bleed background media crossfading per section; right panel scrolls section content. Far-left vertical dot navigation (`#parallax-nav`) with section labels on hover.
- **Mobile:** Full-width stacked sections; parallax backgrounds hidden on small screens; content fills viewport width.

## Section Order (top → bottom)

| # | Anchor ID | Nav Label | Interaction |
|---|-----------|-----------|-------------|
| 1 | `bangbang` | BANG BANG NYC | Static hero + contact grid; background GIF/video |
| 2 | `new-page` | FOREVER CARE | Static; SHOP NOW CTA |
| 3 | `artists` | ARTISTS | Static grid; 31 artist cards with VIEW GALLERY links |
| 4 | `clothing` | BANG BANG APPAREL DROP 1 | Click-driven product carousel (4 apparel variants) |
| 5 | `spaces` | SPACE | Static; tagline + address |
| 6 | `press` | PRESS | Static quotes + external press link |
| 7 | `location-2` | LOCATION | Static address block |
| 8 | `book` | BANG BANG : MY LIFE IN INK | Static book description |
| 9 | `faq` | FAQ | Click-driven accordion (13 items) |

## Global Overlays

- **Header:** Fixed white logo (top center on hero, minimal)
- **Cookie banner:** Bottom bar with CLOSE button
- **Footer:** Location, hours, legal, contact, social — inside scroll content column

## Z-Index Layers

1. Parallax backgrounds (left, fixed, z-0)
2. Parallax nav dots (fixed left, z-40)
3. Header logo (fixed, z-30)
4. Scroll content (right column, z-10)
5. Cookie banner (fixed bottom, z-50)

## Fonts

- **Space Mono** (400, 700) — headings, nav, body
- **Droid Sans Mono** (400) — secondary mono (loaded on original; primary clone uses Space Mono)

## Colors

- Background: `#000000`
- Foreground: `#FFFFFF`
- No accent color — pure monochrome
