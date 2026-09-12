# Sourdough Sophia — Fidelity Corrections (round 2)

All values below are from `getComputedStyle()` on the live site at 1280px and 375px.

## 1. Header / navigation

### Structure
Three layers, not one:
1. **Flow header** (`.header .relative`, height **257px** desktop): big centred logo **160×146**, `padding-top: 17px`.
2. **Inline nav** (`.header .relative .nav`, height **77px**, `padding: 0 30px 30px`, at y=180): horizontal links, **desktop only** (`display:none` at 375px).
3. **Fixed bar** (`.bar.fixed`, `padding: 17px 30px`, `z-index: 100`): hamburger left, logo centre, user+cart right.
4. **Side drawer** (`.nav.side-nav`).

### Scroll behaviour (was missing entirely)
| scrollY | classes | effect |
|---|---|---|
| 0 | `header sticky sticky-on-mobile` | bar transparent, inline nav `opacity:1` |
| >0 (≈20) | `+ scrolled` | inline nav `opacity:0` |
| ≥~50–60 | `+ solid` | bar `position:fixed; top:0`, `background:#fff`, height **125.25px**, logo shrinks **160×146 → 100×91** |

- Bar transition: `background-color 0.35s cubic-bezier(0.46, 0.01, 0.32, 1)`
- Bar logo transition: `width 0.35s cubic-bezier(0.46, 0.01, 0.32, 1)`
- Inline nav transition: `opacity 0.35s cubic-bezier(0.46, 0.01, 0.32, 1)`
- Header transition: `transform 0.45s cubic-bezier(0.46, 0.01, 0.32, 1)`

### Inline nav links — WAS WRONG (used Cabin 18px title-case)
- `Fraunces, serif` · **17px** · **weight 700** · `line-height: 19px` · **`letter-spacing: 1px`** · **`text-transform: lowercase`** · `padding: 10px` · `color:#403D3D`
- Renders as: `story  order +  learn +  invest  careers  contact` (no "Sign In" inline)

### Icons — WAS WRONG (~20px)
- Hamburger / user / cart all **30px × 30px**, `color:#403D3D`
- User icon `display:none` at 375px (cart only)
- Logo stays **160×146 at mobile too** (was shrunk to 110px)

### Side drawer (`.nav.side-nav`) — WAS WRONG (used a stacked white panel)
- `position: fixed; left: -300px; width: 300px; height: 100vh; padding: 30px`
- `background: #AE7E79` (dusty rose) · `z-index: 400` · `overflow-y: auto`
- Open state: `transform: translateX(300px)`, transition `transform 0.45s cubic-bezier(0.46, 0.01, 0.32, 1)`
- **`.main` also gets `transform: translateX(300px)`** with the same transition — the page is pushed right
- Links: `Fraunces` **34px** · weight 400 · **white** · `padding: 10px 0` · title-case · `Order`/`Learn` carry a `+`
- Close ✕: 28px white, `position:absolute; top:17px; left:30px`
- Body toggles class `browsing`

## 2. Colour / layout corrections

- **Content sits on a cream panel**: `.background` = **#FAF0EC**, inset 30px (1205px wide at 1280). Page behind is white. (was: all white)
- **Footer is DARK** (this is the "gray" area flagged):
  - `.top.blocks-4` → **#303030**, `padding: 30px` (desktop) / `60px 30px` (mobile)
  - `.bottom` → **#262626**, `padding: 15px 30px`, `color:#A9A8A8`, `display:flex`
- Newsletter band `.newsletter.with-padding` → **#FAF0EC**, `padding:30px`, `margin:0 30px`

## 3. Typography corrections

| Element | Was | Correct |
|---|---|---|
| Tagline | Cabin 18px | **blockquote — Fraunces 28px / lh 38px / weight 300**, `::before content:"—"`; mobile **22px / lh 32px** |
| Newsletter heading | 40px ✓ | Fraunces 40px w400 ✓ |
| Newsletter body | Cabin 18px | **Fraunces 20px / lh 28px** |
| Newsletter input | — | Fraunces 16px, white, **no border**, `padding:16px 15px 15px` |
| Newsletter button | rounded | Fraunces 18px w700, `#403D3D` bg, **`border-radius:0`**, `padding:14px 20px`, **lowercase** |
| Hero heading | 38/65px | **65px / lh 66px** desktop · **45px / lh 50px** mobile |
| Hero button | rounded | 18px w700, **3px solid #fff**, **`border-radius:0`**, `padding:10px`, **lowercase** |
| Card caption | white overlay on gradient | **below the image**, Fraunces **20px weight 300**, `#403D3D`, centred (mobile 18px) |
| Footer h3 | 22px white-ish | Fraunces **15px w300**, **`#AE7E79`**, `margin-bottom:15px` |
| Footer links/text | 16px | Fraunces **15px w300**, **`#CDCCCC`**, `lh 24px` |
| Footer button | "Subscribe" solid | text **"join"**, Fraunces 17px, `#AE7E79`, **2px solid #AE7E79**, transparent, lowercase, radius 0 |
| Footer social icons | 24px | **34px**, `#CDCCCC` |

## 4. Cards section

- Desktop: 3 × **360×513** (image **360×480** = 3:4, caption below)
- Mobile: **2 per row, 3rd centred** — `col col-1` `inline-block` width 165 (`padding:15px`), card 135×236, image 135×180
- Wrapper `.row.cols.layout-3` padding 7.5px; section `.text-columns-with-images` padding 30px (15px mobile)

## 5. Hero / featured

- Slideshow **1205×550** desktop (`margin: 0 30px`); **345×550** mobile (`margin: 0 15px`)
- Featured image **1205×803**
