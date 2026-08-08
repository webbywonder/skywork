# SkyWork Borivali — UI Redesign Design Spec ("Skyline Editorial")

**Date:** 2026-08-08
**Status:** Approved direction; pending final spec review
**Reference mockup:** `.superpowers/brainstorm/12554-1786170354/content/homepage-mockup-v7.html` (approved by Darshan through 7 iterations)

## Purpose

Full visual redesign of the SkyWork Borivali single-page site. Replace the current three-accent (blue/orange/purple) template look with a premium editorial design that leads with the site's strongest story: a calm workspace 15 floors above the city. Also sync outdated facts (pricing, policies) with the owner's current outreach copy.

## Scope decisions (all confirmed by Darshan)

| Decision | Choice |
|---|---|
| Depth | Full visual redesign (Approach 2: editorial restructure — keep anchors/Bootstrap machinery, redesign each section's internal layout) |
| Direction | Skyline Editorial — ink navy, porcelain background, logo-derived blue accent, serif display type |
| Typography | Gloock (headlines) + Schibsted Grotesk (everything else), via Google Fonts |
| Background | Cool Porcelain scheme (chosen over white/mist/warm-paper via live switcher) |
| Copy | Refresh voice (headlines, taglines, section intros); facts from owner's outreach message |
| Logo | Same mark, now the vector `img/skywork-logo-horizontal.svg` (supplied 2026-08-08; replaces the PNG in markup — PNG stays on disk). Displayed larger: 58px navbar / 48px footer, white via CSS filter on dark |
| Stack | No build step; Bootstrap 5 + jQuery + ES5 conventions per CLAUDE.md stay |

## Design system

### Color tokens (CSS custom properties in `style.css`)

```css
:root {
  --ink:   #101b30;  /* deep navy — text, dark sections, buttons */
  --paper: #f7f9fb;  /* porcelain page background */
  --card:  #ffffff;  /* card surfaces */
  --alt:   #eef2f6;  /* alternate section background (pricing, amenities) */
  --line:  #dfe5eb;  /* hairline borders */
  --sand:  #cfd9e4;  /* subtle cool accent for dividers/dots */
  --sky:   #1f5caa;  /* accent — sampled from logo blue; links, overlines, tags */
  --muted: #5a6372;  /* secondary text */
  --gold:  #c8a24a;  /* review stars only */
}
```

Single accent color (`--sky`) sitewide. The orange/purple gradients, colored shadows, and `pulse` animation from the current CSS are removed entirely.

### Typography

- **Display:** Gloock (weight 400 only) — all `h1/h2` and price amounts. Hierarchy via size, not weight.
- **UI/body:** Schibsted Grotesk 400/500/600/700.
- Load both from Google Fonts via one `@import` in `style.css`, replacing Heebo/Raleway.
- Scale (desktop → ≤575px): h1 76px → 40px; h2 44px → 30px; body 17px; overlines 12px caps, 2.5px letter-spacing, `--sky`.
- Overline pattern: every section header = caps overline + Gloock heading.

### Components

- **Primary button:** ink rectangle, 3px radius, paper text, subtle hover darken + no translateY gimmicks. Ghost variant: underlined text link.
- **Cards:** white, 1px `--line` border, 10px radius, no drop shadows (hairlines carry the structure).
- **Icons:** keep Line Awesome, but small and outlined inside 42px circular `--sand` rings (amenities) — no more 60px colored icon blocks.

## Section-by-section layout

Section order is unchanged: navbar → hero → (ticker) → about → pricing → gallery → reviews → amenities → FAQ → referral → contact → footer. All existing anchor IDs (`#home #about #space #gallery #reviews #faq #contact`) are preserved so nav links and smooth scroll keep working.

1. **Navbar** — porcelain background, hairline bottom border; logo 58px; links right-aligned; "Call Us" as ink button (keeps `decryptPhone()`). Mobile: existing Bootstrap collapse behavior, restyled.
2. **Hero** — overline "15th Floor · Steps from Borivali Station"; h1 "Work above the city."; one-sentence sub; CTA pair (Book a Visit → phone; See Pricing → #space ghost); full-width photo (`img/main.jpg`, 16px radius, ~440px, object-fit cover). The six badge pills are removed.
3. **Amenity ticker** — slim hairline-bounded strip under hero photo: "Air Purified · Water Purified · Air Conditioned · Vegetarian-Only · High-Speed WiFi · 24/7 Security" in caps, muted.
4. **About** — two-column editorial grid: left = overline + Gloock pull-quote ("Where you work matters. We built ours *fifteen floors up*." with accent em); right = lede paragraph + two support paragraphs + fact row (13 seats / 9 open desks / 4 cabin seats / 15th floor) over a hairline. Cabin described here as part of the space (not priced).
5. **Pricing (`#space`)** — `--alt` background; overline + "Pay for the time you need. Nothing more."; 3×2 card grid; Monthly card inverted in ink with "Best value" sky tag; "Pricing last updated August 8, 2026" + call link below. No emojis, no per-card photos, no inline styles.
6. **Gallery** — replace Bootstrap carousel with an editorial CSS grid (4 columns, 170px rows; one tall span-2, two wide span-2 tiles): the floor plan as the first (wide) tile + 6 curated photos + a "+ 7 more" ink tile. Clicking any tile opens **Magnific Popup** gallery lightbox over all 14 items (floor plan first, then the 13 photos; library already loaded, currently unused). Floor-plan asset: supplied by owner 2026-08-08, to be saved as `img/floor-plan.<ext>` (file pending — see open items). Carousel markup and indicators are deleted.
7. **Reviews** — keep the 3-row auto-scroll marquee mechanic and `reviews.json` loading verbatim; restyle cards: white, hairline border, gold ★ stars (replace ⭐ emoji repeat with styled ★), name + customer-type in one quiet line.
8. **Amenities (`#features`)** — `--alt` background; two-column hairline-divided list (icon ring + title + one-liner). Content updated: WiFi mentions backup connections; air/water purifier item mentions air-conditioned space.
9. **FAQ** — restyled hairline accordion (Bootstrap accordion machinery kept): no colored left borders, serif +/– indicator via CSS. Questions: pantry (keep), outside food (keep, veg-only strict), parking (**answer: no parking available; train/transit recommended**), **new: "Is smoking allowed?" → strictly no-smoking workspace**, health & safety (keep). **Operating-hours question removed.**
10. **Referral** — the page's single dark band: ink background, Gloock "Bring a friend. Both save ₹500.", sub line, paper button. Benefit-item icon trio removed.
11. **Contact** — two columns: left = uppercase-label rows (Location with full new address; Reach us: call + WhatsApp links). **No hours row.** Right = Google Maps iframe (existing embed src), muted with slight grayscale filter, 12px radius.
12. **Footer** — ink band: logo (white via `filter: brightness(0) invert(1)`, 48px) left, "© 2024–2026 SkyWork Borivali. All Rights Reserved." right; stacks centered on mobile.
13. **Floating buttons** — WhatsApp stays green (recognition); mobile call button restyled to ink. Positions unchanged.

## Content/fact changes (source of truth: owner's outreach message, 2026-08-08 + confirmations)

- Pricing: Virtual Meeting Pass ₹350 (1–3 hrs) · **Half-Day Pass ₹450 (4–6 hrs, new)** · Full Day ₹600 · Weekly ₹2,500 · 15-Day ₹4,500 · Monthly ₹6,000 (featured).
- **Shared Cabin removed from pricing** (still described in About).
- **No parking at all** (FAQ correction — replaces two-wheeler answer).
- **Vegetarian-Only (strict)** wording kept everywhere.
- New amenity facts: air conditioning, WiFi backup connections, no smoking.
- Address adds: "Near Borivali Railway Station", "PBC Building Gate No. 2".
- **All operating-hours mentions removed** (the current meta description has none; keep it that way in the refreshed copy).
- Copyright: **© 2024–2026**.
- Voice refresh: new headlines/taglines per mockup; body copy condensed from 4 About paragraphs to lede + 2.
- `<title>`/meta description: refresh to match new voice, keep SEO keywords (co-working Borivali, near station, health-conscious); remove hours if mentioned.

## Code architecture

| File | Change |
|---|---|
| `css/style.css` | Full rewrite: tokens, new component styles, section styles, responsive blocks. Dead styles removed (testimonial swiper, urgency-banner, social-proof, button2, old badge/amenity/referral-benefit styles). |
| `index.html` | Section markup restructured per above; all inline styles removed; carousel → gallery grid; unused `<script src="js/jquery.filterizr.min.js">` and `js/swiper.min.js` + `css/swiper.min.css` references removed. |
| `js/main.js` | Remove dead Swiper init (no `.mySwiper` in DOM). Add Magnific Popup gallery init. Keep: smooth scroll, navbar collapse/scroll behaviors, reviews JSON loading (selectors preserved), `decryptPhone()`/`decryptEmail()`. ES5 + jQuery style per CLAUDE.md. |
| `reviews.json` | Unchanged. |
| Deleted files | None (unused libs stay on disk, just unreferenced — keeps rollback trivial). |

Error handling: reviews `$.getJSON` gains a `.fail()` that hides the reviews section gracefully (currently silent empty rows). Image `alt` attributes preserved/updated.

## Responsive behavior

- Breakpoints follow existing Bootstrap tiers (991px, 767px, 575px).
- Hero h1 scales 76→56→40px; hero photo height 440→300→220px.
- About grid, pricing grid (3→2→1 columns), gallery grid (4→2 columns, tall/wide spans collapse), amenities (2→1 column), contact (2→1) all stack.
- Ticker wraps to two centered lines on mobile.
- Navbar: Bootstrap collapse; logo 44px on mobile.

## Testing & verification

Static site — verification is visual + functional, no unit-test framework exists (and none is added):

1. Serve locally (`python3 -m http.server 8000`); verify against mockup v7 at 1440/1024/768/375 widths (Chrome DevTools emulation).
2. Functional checks: anchor nav + smooth scroll to every section; mobile hamburger opens/closes; gallery lightbox opens all 13 images; reviews rows populate and scroll; `decryptPhone` links fire `tel:`; WhatsApp button URL intact; FAQ accordions toggle.
3. Content checks: grep the built page for `"hour"`, old prices (`₹250`, `₹400`, `₹2,250`, `₹4,000`, `₹5,000`, `₹6,000/month/seat`), `parking`, and emoji to confirm no stale facts survive.
4. Console: zero JS errors on load.
5. Lighthouse pass (performance + accessibility) — no regressions vs current site; images keep `loading="lazy"` where present.

## Rollback

Single revert of the implementation commit(s) restores the current design; no data or external state involved.

## Open items

- Floor-plan image file: shown by owner in session (two AC rooms, washroom, kitchen, storage, door labels, compass) but not yet on disk — owner to provide the exported image; save as `img/floor-plan.<ext>`. Implementation of the gallery's first tile depends on it.

## Out of scope

- Image re-compression/optimization (existing assets reused as-is).
- New sections, forms, or backend anything.
- The Trello/CI workflow, favicon set, CNAME, or deployment config.
