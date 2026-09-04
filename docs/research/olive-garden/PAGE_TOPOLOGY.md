# Olive Garden — Page Topology

Reference: https://www.olivegarden.com/home (single home page)

## Section order (top → bottom)

| # | Visual section | Halite sectionKey | Notes |
|---|----------------|-------------------|-------|
| 1 | Terracotta alert strip | `alertBar` | Custom — promo message |
| 2 | Sticky header + nav | `nav` | Logo, links, location, cart |
| 3 | Video hero | `hero` | Autoplay video + script headline + pickup/delivery CTAs |
| 4 | eClub signup band | `eClub` | Custom — olive green form strip |
| 5 | Delivery promo banner | `promoBannerDelivery` | Custom — full-width image link |
| 6 | Seasonal promo banner | `promoBannerSeasonal` | Custom — full-width image |
| 7 | Specials carousel | `specialsCarousel` | Custom — slick-style horizontal slider |
| 8 | Menu highlights grid | `menuGrid` | Custom — asymmetric card grid |
| 9 | Quick action cards | `quickActions` | Custom — 4-up careers/catering/eclub/gift |
| 10 | Dark olive footer | `footer` | Multi-column links + social + app badges |

## Omitted from clone

- Cart empty popup modal
- Cookie consent banner (OneTrust)
- Login / account flows
- Location finder overlay
- Live ordering cart integration

## config.default.json sections

```
alertBar, nav, hero, eClub, promoBannerDelivery, promoBannerSeasonal, specialsCarousel, menuGrid, quickActions, footer
```
