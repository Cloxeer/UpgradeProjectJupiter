# Bang Bang Forever — Behaviors

**Extracted via cursor-ide-browser MCP, 2026-07-01**

## Scroll-Driven

### Parallax background crossfade
- **Trigger:** `IntersectionObserver` on each section in the right content column
- **Before:** Previous section background at opacity 1
- **After:** Active section background at opacity 1, others opacity 0
- **Transition:** `opacity 700ms ease-in-out`
- **Implementation:** Fixed left panel; only one background visible at a time

### Parallax nav active dot
- **Trigger:** Same intersection observer as backgrounds
- **Before:** Hollow white dot, label hidden
- **After:** Filled white dot (scale 1.25), label visible at opacity 100%
- **Hover:** Label fades in, dot scales 1.1

## Click-Driven

### Parallax nav buttons
- **Trigger:** Click dot/button in `#parallax-nav`
- **Action:** `scrollIntoView({ behavior: 'smooth', block: 'start' })` to target section

### FAQ accordion
- **Trigger:** Click question heading
- **Action:** Expand/collapse answer panel
- **Default:** All collapsed on load

### Apparel carousel
- **Trigger:** Click product thumbnail buttons (OFFSET HOODIE variants)
- **Action:** Switch displayed apparel image

### Cookie banner CLOSE
- **Trigger:** Click CLOSE
- **Action:** Dismiss banner (persisted in localStorage on clone)

## Static / Link Navigation

- MAKE AN APPOINTMENT → `/contact`
- SHOP NOW / SHOP APPAREL → external shop links
- VIEW GALLERY → artist gallery pages (external)
- Footer legal links → `/accessibility`, `/privacy-policy`, `/terms-of-service`
- Email/phone → `mailto:` / `tel:` / SMS links

## Responsive (observed at 1440px desktop)

- Left parallax panel: 50vw fixed
- Content column: 50vw, scrollable
- Artist grid: 4 columns at desktop
- Parallax nav: visible `lg+` only

## Smooth Scroll

- Original uses native/Squarespace scroll; clone uses `scroll-smooth` on `html` + programmatic smooth scroll for nav clicks

## Not Cloned (out of scope)

- Vimeo/YouTube background video players (fallback GIF/image used)
- Squarespace cart / announcement bar
- Accessibility widget overlay (third-party)
