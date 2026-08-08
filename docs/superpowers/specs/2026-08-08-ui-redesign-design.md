# SkyWork Borivali UI Redesign Design Spec ("Skyline Editorial")

**Date:** 2026-08-08
**Status:** Approved direction; pending final spec review
**Reference mockup:** `.superpowers/brainstorm/12554-1786170354/content/homepage-mockup-v14.html` (approved by Darshan through 14 iterations)

## Purpose

Full visual redesign of the SkyWork Borivali single-page site. Replace the current three-accent (blue/orange/purple) template look with a premium editorial design that leads with the site's strongest story: a calm workspace 15 floors above the city. Also sync outdated facts (pricing, policies) with the owner's current outreach copy.

## Scope decisions (all confirmed by Darshan)

| Decision | Choice |
|---|---|
| Depth | Full visual redesign (Approach 2, editorial restructure: keep anchors and Bootstrap machinery, redesign each section's internal layout) |
| Direction | Skyline Editorial: ink navy, porcelain background, logo-derived blue accent, serif display type |
| Typography | Gloock (headlines) + Schibsted Grotesk (everything else), via Google Fonts |
| Background | Cool Porcelain scheme (chosen over white/mist/warm-paper via live switcher) |
| Copy | Refresh voice (headlines, taglines, section intros); facts from owner's outreach message and session corrections. No em dashes anywhere in copy (owner preference); plain hyphens for ranges |
| Logo | Same mark, now the vector `img/skywork-logo-horizontal.svg` (supplied 2026-08-08; replaces the PNG in markup, PNG stays on disk). Displayed larger: 58px navbar / 48px footer, white via CSS filter on dark |
| Stack | No build step; Bootstrap 5 + jQuery + ES5 conventions per CLAUDE.md stay |

## Design system

### Color tokens (CSS custom properties in `style.css`)

```css
:root {
  --ink:   #101b30;  /* deep navy: text, dark sections, buttons */
  --paper: #f7f9fb;  /* porcelain page background */
  --card:  #ffffff;  /* card surfaces */
  --alt:   #eef2f6;  /* alternate section background (pricing, amenities) */
  --line:  #dfe5eb;  /* hairline borders */
  --sand:  #cfd9e4;  /* subtle cool accent for dividers/dots */
  --sky:   #1f5caa;  /* accent sampled from logo blue: links, overlines, tags */
  --muted: #5a6372;  /* secondary text */
  --gold:  #c8a24a;  /* review stars only */
}
```

Single accent color (`--sky`) sitewide. The orange/purple gradients, colored shadows, and `pulse` animation from the current CSS are removed entirely.

### Typography

- **Display:** Gloock (weight 400 only) for all `h1/h2` and price amounts. Hierarchy via size, not weight.
- **UI/body:** Schibsted Grotesk 400/500/600/700.
- Load both from Google Fonts via one `@import` in `style.css`, replacing Heebo/Raleway.
- Scale (desktop to 575px and below): h1 76px down to 40px; h2 44px down to 30px; body 17px; overlines 12px caps, 2.5px letter-spacing, `--sky`.
- Overline pattern: every section header = caps overline + Gloock heading.
- Punctuation rule for all copy: no em dashes; use commas, colons, or periods. Number ranges use plain hyphens (1-3 hrs). Middot separators in UI strips are fine.

### Components

- **Primary button:** ink rectangle, 3px radius, paper text, subtle hover darken, no translateY gimmicks. Ghost variant: underlined text link.
- **Cards:** white, 1px `--line` border, 10px radius, no drop shadows (hairlines carry the structure).
- **Icons:** keep Line Awesome, but small and outlined inside 42px circular `--sand` rings (amenities), replacing the 60px colored icon blocks.

## Section-by-section layout

Section order is unchanged: navbar, hero (with ticker), about, pricing, gallery, reviews, amenities, FAQ, referral, contact, footer. All existing anchor IDs (`#home #about #space #gallery #reviews #faq #contact`) are preserved so nav links and smooth scroll keep working.

1. **Navbar:** porcelain background, hairline bottom border; SVG logo at 58px; links right-aligned; "Call Us" as ink button (keeps `decryptPhone()`). Mobile: existing Bootstrap collapse behavior, restyled.
2. **Hero:** overline "15th Floor · Steps from Borivali Station"; h1 "Work above the city."; one-sentence sub; CTA pair (Book a Visit triggers phone; See Pricing ghost-links to #space); full-width photo (`img/main.jpg`, 16px radius, ~440px, object-fit cover). The six badge pills are removed.
3. **Amenity ticker:** slim hairline-bounded strip under hero photo: "Air Purified · Water Purified · Air Conditioned · Vegetarian-Only · High-Speed WiFi · 24/7 Security" in caps, muted.
4. **About:** two-column editorial grid. Left: overline + Gloock pull-quote ("Where you work matters. We built ours *fifteen floors up*." with accent em). Right: lede paragraph + two support paragraphs + fact row over a hairline. Cabins described here as part of the space (not priced). Fact row: 2 setups · 26 total seats · 18 open desks · 8 cabin seats (the 15th-floor fact stays in the hero overline).
5. **Pricing (`#space`):** `--alt` background; overline + "Pay for the time you need. Nothing more."; 3x2 card grid; Monthly card inverted in ink with "Best value" sky tag; "Pricing last updated August 8, 2026" + call link below. No emojis, no per-card photos, no inline styles.
6. **Gallery:** replace Bootstrap carousel with an editorial CSS grid: 4 columns, 170px auto-rows, `grid-auto-flow: dense`. Tile spans must fill every cell of the 3-row grid with no holes (12 cells: the floor plan as first wide tile with `object-fit: contain` on white + one tall tile + one wide tile + 5 singles + the "+ 9 more" ink tile; v14 mockup shows the working arrangement, including two setup-2 photos among the visible singles). Lightbox opens over all 17 items (floor plan first, then 16 photos) via **Magnific Popup** (already loaded, currently unused). Assets: `img/floor-plan.jpg` (from owner's WhatsApp image) and new setup-2 photos `img/slides/SKYWORK-14.jpg`, `SKYWORK-15.jpg`, `SKYWORK-16.jpg` joining SKYWORK-1 through 13. Carousel markup and indicators are deleted.
7. **Reviews:** keep the 3-row auto-scroll marquee mechanic and `reviews.json` loading; restyle cards: white, hairline border, gold star glyphs (replace emoji-star repeat with styled ★), name + customer-type in one quiet line. `reviews.json` refreshed 2026-08-08 with the 20 current Google reviews (7 new, 13 with updated stats and dates; quotes verbatim). `main.js` row split changes from 0-3 / 4-7 / 8+ to even thirds (7/7/6) so the marquee rows stay balanced at 20 reviews.
8. **Amenities (`#features`):** `--alt` background; two-column hairline-divided list (icon ring + title + one-liner). Content updated: WiFi mentions backup connections; air/water purifier item mentions the air-conditioned space; Kitchen Facilities mentions microwave and electric kettle for meals and hot drinks; new "Quiet by Design" item (silent working space, virtual meetings at your desk are fine, phone calls in the passage near the lift). Station Proximity item folds into copy elsewhere or stays as a seventh item if the grid needs balance; implementation picks the 6 best-balanced items.
9. **FAQ:** restyled hairline accordion (Bootstrap accordion machinery kept): no colored left borders, serif plus/minus indicator via CSS. Questions: pantry (keep); outside food (keep, veg-only strict); **"Can I take phone calls in the workspace?"** (new: quiet space, virtual meetings fine at the desk, voice calls in the passage near the lift); **"Is smoking or drinking allowed?"** (new: strictly neither, no smoking and no alcohol); parking (**answer: none at the workspace; public parking near Borivali railway station can be used; train remains easiest**); health and safety (keep). **Operating-hours question removed.** Accordion behavior: one answer open at a time with smooth collapse animation (Bootstrap accordion with `data-bs-parent`, as the current site already wires it).
10. **Referral:** the page's single dark band: ink background, Gloock "Bring a friend. Both save ₹500.", sub line, paper button. Benefit-item icon trio removed.
11. **Contact:** two columns. Left: uppercase-label rows (Location with full new address; Reach us: call + WhatsApp links). **No hours row.** Right: Google Maps iframe (existing embed src), muted with slight grayscale filter, 12px radius.
12. **Footer:** ink band: SVG logo (white via `filter: brightness(0) invert(1)`, 48px) left, "© 2024-2026 SkyWork Borivali. All Rights Reserved." right; stacks centered on mobile.
13. **Floating buttons:** WhatsApp stays green (recognition), fixed bottom-right on all viewports; mobile call button restyled to ink. Positions unchanged from current site.

## Content/fact changes (source of truth: owner's outreach message + session corrections, 2026-08-08)

- Pricing: Virtual Meeting Pass ₹350 (1-3 hrs) · **Half-Day Pass ₹450 (4-6 hrs, new)** · Full Day ₹600 · Weekly ₹2,500 · 15-Day ₹4,500 · Monthly ₹6,000 (featured).
- **Shared Cabin removed from pricing** (still described in About).
- **No on-site parking**; public parking near Borivali railway station is available for members to use (FAQ correction, replaces the two-wheeler answer).
- **Vegetarian-Only (strict)** wording kept everywhere.
- **No smoking and no alcohol** anywhere in the workspace (new FAQ).
- **Quiet workspace policy** (new): silent working space; virtual meetings at the desk are fine; phone calls happen in the passage near the lift.
- New amenity facts: air conditioning, WiFi backup connections, electric kettle (mention alongside microwave in amenities and the pantry FAQ answer).
- Fire safety (owner notice 2026-08-08): a 4 kg dry-chemical-powder fire extinguisher is installed in room 1503. On the site this surfaces as a brief mention in the health and safety FAQ answer and in the security amenity (renamed "Safety & Security"). The full internal notice, emergency numbers, and usage steps are not published.
- New gallery assets: floor plan (`img/floor-plan.jpg`) and three setup-2 photos (`img/slides/SKYWORK-14.jpg` through `SKYWORK-16.jpg`).
- **Two setups on the same floor**, same seating configuration each (confirmed): 26 seats total, 18 open desks, 8 cabin seats across two 4-seat cabins.
- Address adds: "Near Borivali Railway Station", "PBC Building Gate No. 2".
- **All operating-hours mentions removed** (the current meta description has none; keep it that way in the refreshed copy).
- Copyright: **© 2024-2026** (plain hyphen).
- Voice refresh: new headlines and taglines per mockup; About condensed to lede + 2 paragraphs; no em dashes in any copy.
- `<title>`/meta description: refresh to match new voice, keep SEO keywords (co-working Borivali, near station, health-conscious); no hours.

## Code architecture

| File | Change |
|---|---|
| `css/style.css` | Full rewrite: tokens, new component styles, section styles, responsive blocks. Dead styles removed (testimonial swiper, urgency-banner, social-proof, button2, old badge/amenity/referral-benefit styles). |
| `index.html` | Section markup restructured per above; all inline styles removed; carousel becomes gallery grid; unused `js/jquery.filterizr.min.js` and `js/swiper.min.js` + `css/swiper.min.css` references removed. |
| `js/main.js` | Remove dead Swiper init (no `.mySwiper` in DOM). Add Magnific Popup gallery init. Keep: smooth scroll, navbar collapse/scroll behaviors, reviews JSON loading (selectors preserved), `decryptPhone()`/`decryptEmail()`. ES5 + jQuery style per CLAUDE.md. |
| `reviews.json` | Refreshed with the 20 current Google reviews (schema unchanged; already committed). |
| Deleted files | None (unused libs stay on disk, just unreferenced, which keeps rollback trivial). |

Error handling: reviews `$.getJSON` gains a `.fail()` that hides the reviews section gracefully (currently silent empty rows). Image `alt` attributes preserved/updated.

## Responsive behavior

- Breakpoints follow existing Bootstrap tiers (991px, 767px, 575px).
- Hero h1 scales 76 to 56 to 40px; hero photo height 440 to 300 to 220px.
- About grid, pricing grid (3 to 2 to 1 columns), gallery grid (4 to 2 columns, tall/wide spans collapse), amenities (2 to 1 column), contact (2 to 1) all stack.
- Ticker wraps to two centered lines on mobile.
- Navbar: Bootstrap collapse; logo 44px on mobile.

## Testing & verification

Static site, so verification is visual + functional; no unit-test framework exists (and none is added):

1. Serve locally (`python3 -m http.server 8000`); verify against mockup v10 at 1440/1024/768/375 widths (Chrome DevTools emulation).
2. Functional checks: anchor nav + smooth scroll to every section; mobile hamburger opens/closes; gallery lightbox opens all 14 items; reviews rows populate and scroll; `decryptPhone` links fire `tel:`; WhatsApp button URL intact; FAQ accordions toggle.
3. Content checks: grep the built page for `hour`, old prices (`₹250`, `₹400`, `₹2,250`, `₹4,000`, `₹5,000`, `₹6,000/month/seat`), `parking`, emoji, and em dashes to confirm no stale facts or banned punctuation survive.
4. Console: zero JS errors on load.
5. Lighthouse pass (performance + accessibility): no regressions vs current site; images keep `loading="lazy"` where present.

## Rollback

Single revert of the implementation commit(s) restores the current design; no data or external state involved.

## Open items

None. All assets and facts are on disk and confirmed.

## Out of scope

- Image re-compression/optimization (existing assets reused as-is).
- New sections, forms, or backend anything.
- The Trello/CI workflow, favicon set, CNAME, or deployment config.
