# Project Jupiter Together — Page Topology

Single-page WordPress/Elementor (Astra theme) site. Font: **Roboto**. Total height ~7846px @1280.

## Global
- **Header** (sticky, white bg, shrinks on scroll — `ast-sticky-main-shrink`): logo left, nav right (HOME, RESOURCES, CAREERS, VENDOR INTEREST, MEDIA GALLERY, ENGLISH▾). Initial height 121px.
- **Footer**: navy `#003047`, single centered line: "Website paid for by Oracle and STACK Infrastructure | Copyright © 2026 Project Jupiter Together".

## Sections (top → bottom)
1. **Hero** — bg image (hero.jpg) with navy overlay. H1 "PROJECT JUPITER" (60px/900 white), gold subhead (26px/600), then white "WHAT DOES PROJECT JUPITER MEAN FOR NEW MEXICO?" (26px/700) + bulleted list (teal dot bullets).
2. **CTA bar** — gold `#FDB715` full-width bar, centered white text "Click HERE To Show Your Support for Project Jupiter" (HERE links to #comments / support form).
3. **What Is** — centered heading w/ teal dividers.
4. **What Is body** — 4 paragraphs (14px body text #3C3C3C).
5. **Highlights heading**.
6. **Highlights grid** — 8 stat cards (icon in teal circle + big teal number 44px/900 + bold label). 4-col → 2 → 1.
7. **What It Means heading**.
8. **Will / Will Not** — two columns. WILL (green check icons) list; WILL NOT (red × icons) list.
9. **Updates heading** (navy section starts).
10. **Updates body** — navy bg. Lead sentence + Vimeo video (id 1188168622, autoplay/mute/loop).
11. **Progress bars** — navy. DEVELOPMENT 100%, CONSTRUCTION 30%, DELIVERY 0%.
12. **Impact heading** (light `#FAFAFA` section starts).
13. **Impact tabs** — 4 tabs: Economic Impact (table), Thousands of Jobs (table), Low Water Usage (table), Cleaner Energy (emissions table).
14. **Key Components heading**.
15. **Key Components tabs** — 4 tabs: Data Centers, Cooling Design, Microgrid, Water Stewardship (text panels).
16. **IRB heading** — "INDUSTRIAL REVENUE BONDS (IRB)".
17. **IRB subhead** — "No Financial Risk to County".
18. **IRB detail** — 6 labeled points (fade-in on scroll).
19. **Resources heading** (navy section).
20. **Resources cards** — 6 cards (Careers, Economic Impact, FAQs, Investing in Doña Ana's Future, Minimal Water Usage, Onsite Generation).
21. **Media & Press heading**.
22. **Media & Press cards** — 3 cards (Media Gallery, Vendor Inquiries, Press Inquiries).
23. **Support form** — Quorum campaign iframe (advocacy widget). Replace with styled placeholder form.
24. **Disclaimer** — navy footnotes (* and (1)-(4)).

## Interaction models
- Header: scroll-driven shrink (static clone acceptable; implement subtle shrink).
- Impact & Key Components: **click-driven tabs** (Elementor nested tabs).
- Progress bars: animate width on scroll into view.
- IRB detail: fadeIn on scroll.
- Everything else static.
