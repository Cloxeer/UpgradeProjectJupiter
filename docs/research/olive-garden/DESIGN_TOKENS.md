# Olive Garden — Design Tokens

Extracted from https://www.olivegarden.com/home at 1440px desktop viewport.

## Fonts

| Role | Reference family | Halite fallback |
|------|------------------|-----------------|
| Display / nav | Neulis Neue | Nunito Sans, system-ui |
| Script headlines | Neulis Cursive | Caveat, cursive |
| Body | Roboto | Roboto, Helvetica Neue, Arial |

Google Fonts import: Roboto (400, 600, 700), Nunito Sans (600, 700), Caveat (700).

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| colorAccent | `#B03D27` | Alert bar, terracotta promo strip |
| colorBackground | `#FFFFFF` | Page background, nav |
| colorSurface | `#FFEDD8` | CTA pill buttons |
| colorText | `#000000` | Body, nav links |
| colorMuted | `#303E1E` | Footer background |
| Olive band | `#A8AD00` | eClub signup section |
| Link accent | `#C16436` | Text links on banners |

## Typography scale

| Element | Desktop | Mobile |
|---------|---------|--------|
| Section H2 | 48px / 700 / Neulis Neue | 28px |
| Hero H1 (script) | 100px / 700 / Neulis Cursive | 40px |
| Nav links | 20px / 600 / uppercase | hidden (hamburger) |
| CTA buttons | 16–18px / 700 / uppercase | 14px |
| Footer H3 | 20px / 700 / Neulis Cursive / uppercase | same |
| Body | 16px / 400 / Roboto | 16px |

## Spacing rhythm

- Carousel section: `padding: 60px 84px 0 60px`, `margin-bottom: 64px`
- Menu highlights: `padding: 0 84px`, `margin: 40px 0 64px`
- Quick actions: `max-width: 1200px`, centered, `padding-bottom: 64px`
- eClub band: `padding: 24px 48px`
- Alert bar: `py-1` (~4px vertical)

## Breakpoints

- Mobile nav + stacked hero CTAs: ≤767px
- Desktop horizontal nav: ≥768px
- Full carousel arrows: ≥992px

## CTA button pattern

- Background: `#FFEDD8`
- Color: `#000000`
- Border-radius: `30px`
- Padding: `12px 20px` (hero: `12px 20px` at 18px)
- Hover: invert to black bg / cream text
