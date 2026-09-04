# Genre Section Mapping

Map reference page sections → Halite `sectionKey` values. Only use keys from `registry.ts`.

## restaurant

| Reference pattern | sectionKey |
|-------------------|------------|
| Navbar / header | `nav` |
| Hero / banner | `hero` |
| Hours / address strip | `infoStrip` |
| Photo grid / carousel | `gallery` |
| About / story | `about` |
| Menu / food list | `menu` |
| Daily specials / promos | `specials` |
| Contact / map / form | `contact` |
| Footer | `footer` |

Default order: `nav`, `hero`, `infoStrip`, `gallery`, `about`, `menu`, `specials`, `contact`, `footer`

Omit `infoStrip` from `sections` if reference has no info strip; set `infoStrip.enabled: false` in site JSON.

## tattoo

| Reference pattern | sectionKey |
|-------------------|------------|
| Fixed logo / top bar | `header` |
| Hero + contact sidebar | `heroContact` |
| Section divider image | `dividerAftercare`, `dividerArtists`, `dividerGallery`, `dividerSpaces`, `dividerPress`, `dividerLocation`, `dividerStory`, `dividerFaq` |
| Aftercare content | `aftercare` |
| Artist roster | `artists` |
| Instagram / gallery grid | `gallery` |
| Studio / spaces | `spaces` |
| Press / reviews | `press` |
| Location / map | `location` |
| Story (often subpage) | `story` |
| FAQ | `faq` |
| Footer | `footer` |
| Cookie notice | `cookieBanner` |
| Booking form (subpage) | `booking` |
| Per-artist gallery (subpage) | `artistGallery` |
| Legal pages | `legalPage` |

Home page typically ends at `faq` + `footer` + `cookieBanner`. Subpages use `pages[]` in config — copy structure from `templates/tattoo/default/config.default.json` and adjust artist slugs/count to match reference roster size (use lorem artist names).

`assets` keys in site JSON: `logo`, `hero`, `grandStreet`, `foreverCare`, `location`, `artists`, `apparel`, `book` — map reference images to nearest slot.

## web-developer

| Reference pattern | sectionKey |
|-------------------|------------|
| Navbar | `nav` |
| Hero | `hero` |
| Logo strip / stats | `trustStrip` |
| Testimonials | `testimonials` |
| Services grid | `services` |
| Pain-point / comparison cards | `confrontation` |
| Process / methodology | `framework` |
| Founder bio | `founder` |
| Pricing tables | `pricing` |
| Portfolio / case studies | `portfolio` |
| Workflow steps | `workflow` |
| Differentiator cards | `differentiators` |
| Local business CTA | `localBusinessCta` |
| Contact CTA band | `contactCta` |
| Application / contact form | `applicationForm` |
| Page title band (inner pages) | `pageIntro` |
| Legal content | `legalPage` |
| Footer | `footer` |

Default home (from default config): `nav`, `hero`, `services`, `localBusinessCta`, `footer`

Multi-page sites use `pages[]` — mirror default `templates/web-developer/default/config.default.json` page IDs (`home`, `services`, `work`, `process`, `pricing`, `apply`) and assign sections per reference subpages.

`assets` keys: `logo`, `hero`, `getCampusGig`, `whatYourVibe` — map portfolio/hero images to these + `portfolio.projects[].image`.

## Image path convention

- Template assets live at `assets/images/` in the variant folder
- On seed, copied to project `public/`
- Reference in `site.default.json` as `images/{filename}` (e.g. `images/hero.jpg`)
- Tattoo default uses `/images/...` prefix — either works after seed; prefer `images/...` for new variants

## theme fields (all genres)

```json
{
  "fontDisplay": "Extracted heading font",
  "fontBody": "Extracted body font",
  "colorText": "#hex",
  "colorMuted": "#hex",
  "colorAccent": "#hex",
  "colorBackground": "#hex",
  "colorSurface": "#hex"
}
```

Extract from computed styles on `body`, `h1`, primary buttons, and section backgrounds.
