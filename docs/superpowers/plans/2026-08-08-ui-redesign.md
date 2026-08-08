# SkyWork Borivali UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the SkyWork Borivali single-page site to the approved "Skyline Editorial" design with full SEO/AEO/GEO optimization, per `docs/superpowers/specs/2026-08-08-ui-redesign-design.md`.

**Architecture:** Keep the existing static single-page architecture (Bootstrap 5 + jQuery, anchor navigation, no build step). Rewrite `css/style.css` as a token-based design system, restructure each section's markup in `index.html`, clean dead code in `js/main.js`, and add structured data plus crawl files. The approved visual reference is `.superpowers/brainstorm/12554-1786170354/content/homepage-mockup-v20.html`.

**Tech Stack:** HTML5, CSS3 (custom properties), jQuery 3.x, Bootstrap 5 (navbar collapse + accordion only), Magnific Popup (gallery lightbox), Google Fonts (Gloock + Schibsted Grotesk).

## Global Constraints

- No build step. Files are served as-is; never edit `*.min.js` / `*.min.css`.
- JS style matches the existing `js/main.js` (IIFE, jQuery; the reviews loader already uses template literals, match the file's local conventions).
- No em dashes anywhere in copy, docs, or commit messages; number ranges use plain hyphens (1-3 hrs, 2024-2026). Customer review quotes stay verbatim even if they contain em dashes.
- No operating-hours mention anywhere: page copy, meta tags, or JSON-LD.
- Vegetarian-Only policy wording is strict, never softened.
- Single accent color `#1f5caa`; the old orange/purple/sky-blue palette must not survive anywhere.
- Fonts: Gloock (weight 400 only) for display, Schibsted Grotesk 400/500/600/700 for everything else, loaded via one `@import` with `display=swap`.
- Anchor IDs preserved exactly: `#home #about #space #gallery #reviews #features #faq #referral #contact`.
- Logo: `img/skywork-logo-horizontal.svg`, never modified; white in footer via `filter: brightness(0) invert(1)`.
- Canonical domain `https://www.skywork.in/` (matches CNAME `www.skywork.in`).
- Pricing facts: ₹350 (1-3 hrs) · ₹450 (4-6 hrs) · ₹600/day · ₹2,500/week · ₹4,500/15 days · ₹6,000/month featured. No Shared Cabin plan. Timestamp "Pricing last updated August 8, 2026".
- Verification is command-based (grep, python) plus a browser check per section at `http://localhost:8000` (run `python3 -m http.server 8000` from the repo root in the background once).

---

### Task 1: Head rewrite, robots.txt, sitemap.xml

**Files:**
- Modify: `index.html:1-23` (the `<head>` block)
- Create: `robots.txt`
- Create: `sitemap.xml`

**Interfaces:**
- Produces: `<head>` links only `css/bootstrap.min.css`, `css/line-awesome.min.css`, `css/magnific-popup.css`, `css/style.css` (swiper.min.css removed). Later tasks rely on this exact stylesheet list.

- [ ] **Step 1: Create branch**

```bash
git checkout -b ui-redesign
```

- [ ] **Step 2: Replace the `<head>` contents**

Replace everything between `<head>` and `</head>` in `index.html` with:

```html
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkyWork Borivali | Coworking Space on the 15th Floor Near Borivali Station</title>
    <meta name="description" content="SkyWork Borivali is a calm, health-first coworking space on the 15th floor, steps from Borivali station. Purified air and water, high-speed WiFi with backup connections, and flexible plans from ₹350.">
    <meta name="keywords" content="coworking space Borivali, workspace near Borivali station, health-conscious workspace, affordable coworking Mumbai, flexible workspace, air purified office, daily pass workspace, 15th floor workspace, SkyWork Borivali">
    <link rel="canonical" href="https://www.skywork.in/">
    <meta name="theme-color" content="#101b30">

    <meta property="og:type" content="business.business">
    <meta property="og:site_name" content="SkyWork Borivali">
    <meta property="og:title" content="SkyWork Borivali | Work above the city.">
    <meta property="og:description" content="A calm, health-first coworking space with panoramic views of Mumbai: purified air, purified water, and room to think. Steps from Borivali station.">
    <meta property="og:url" content="https://www.skywork.in/">
    <meta property="og:image" content="https://www.skywork.in/img/main.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="SkyWork Borivali | Work above the city.">
    <meta name="twitter:description" content="A calm, health-first coworking space with panoramic views of Mumbai, steps from Borivali station.">
    <meta name="twitter:image" content="https://www.skywork.in/img/main.jpg">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/line-awesome.min.css">
    <link rel="stylesheet" href="css/magnific-popup.css">
    <link rel="stylesheet" href="css/style.css">

    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="SkyWork" />
    <link rel="manifest" href="/site.webmanifest" />
```

- [ ] **Step 3: Create `robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://www.skywork.in/sitemap.xml
```

- [ ] **Step 4: Create `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.skywork.in/</loc>
    <lastmod>2026-08-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 5: Verify**

```bash
grep -c 'swiper.min.css' index.html          # expect 0
grep -c 'canonical' index.html               # expect 1
grep -ci 'hour' index.html                   # must not increase vs before this task: the new head adds no hours mention
xmllint --nonet --noout sitemap.xml && echo "sitemap ok"   # --nonet blocks external entity fetches
```

- [ ] **Step 6: Commit**

```bash
git add index.html robots.txt sitemap.xml
git commit -m "feat: SEO head, canonical, social tags, robots and sitemap"
```

---

### Task 2: Rewrite css/style.css as the Skyline Editorial design system

**Files:**
- Modify: `css/style.css` (full replacement)

**Interfaces:**
- Produces (later tasks' markup consumes these classes): `.button`, `.button-ghost`, `.overline`, `.navbar`, `.navbar-fixed`, `.intro`, `.intro-photo`, `.ticker`, `.about`, `.about-grid`, `.pull`, `.lede`, `.facts`, `.space`, `.price-grid`, `.price-card`, `.price-card.featured`, `.tag`, `.updated`, `.gallery`, `.gallery-grid`, `.g`, `.g.tall`, `.g.wide`, `.g.plan`, `.g.more`, `.reviews`, `.reviews-row`, `.reviews-track`, `.review-card`, `.review-header`, `.name-stars`, `.stars`, `.customer-type`, `.features`, `.amen-grid`, `.amen`, `.faq`, `.referral`, `.contact`, `.c-item`, `.map-wrap`, `.whatsapp-button`, `.mobile-call-button`.

- [ ] **Step 1: Replace the entire file with:**

```css
/* ------------------------------
  Fonts and tokens
---------------------------------*/
@import url("https://fonts.googleapis.com/css2?family=Gloock&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap");

:root {
  --ink: #101b30;
  --sky: #1f5caa;
  --muted: #5a6372;
  --paper: #f7f9fb;
  --card: #ffffff;
  --alt: #eef2f6;
  --line: #dfe5eb;
  --sand: #cfd9e4;
  --gold: #c8a24a;
}

/* ------------------------------
  Base
---------------------------------*/
body {
  margin: 0;
  padding: 0;
  font-size: 17px;
  font-family: "Schibsted Grotesk", sans-serif;
  background: var(--paper);
  color: var(--ink);
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Gloock", serif;
  font-weight: 400;
  padding: 0;
  margin: 0;
  color: var(--ink);
}

h1 { font-size: 72px; line-height: 1.05; letter-spacing: -0.5px; margin-bottom: 24px; }
h2 { font-size: 44px; line-height: 1.1; margin-bottom: 16px; }
h3 { font-size: 28px; }
h5 { font-family: "Schibsted Grotesk", sans-serif; font-weight: 600; font-size: 17px; }

p { margin: 5px 0 15px; font-size: 16.5px; line-height: 1.65; color: var(--muted); }

a { text-decoration: none; color: var(--sky); }
a:hover { color: var(--ink); }
a:focus-visible, button:focus-visible { outline: 2px solid var(--sky); outline-offset: 3px; }

ul { padding: 0; margin: 0; }
ul li { list-style: none; }
img { max-width: 100%; }

section { padding: 90px 0; }

.overline {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--sky);
  margin-bottom: 18px;
}

/* ------------------------------
  Buttons
---------------------------------*/
.button {
  display: inline-block;
  padding: 14px 32px;
  background: var(--ink);
  color: var(--paper);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  border-radius: 3px;
  border: 0;
  transition: background 0.25s ease;
}
.button:hover { background: #1c2c4e; color: var(--paper); }

.button-ghost {
  display: inline-block;
  color: var(--ink);
  font-size: 14px;
  font-weight: 600;
  padding: 14px 6px;
  border-bottom: 1px solid var(--ink);
}
.button-ghost:hover { color: var(--sky); border-color: var(--sky); }

/* ------------------------------
  Navbar
---------------------------------*/
.navbar {
  top: 0;
  padding: 16px 0;
  position: fixed;
  width: 100%;
  z-index: 99;
  background: var(--paper);
  border-bottom: 1px solid var(--line);
}
.navbar .navbar-brand img { height: 52px; width: auto; }
.navbar .navbar-toggler { padding: 0; border: 0; }
.navbar .navbar-toggler i { font-size: 30px; color: var(--ink); }
.navbar .navbar-toggler:focus { box-shadow: none; }
.navbar .navbar-nav li { padding: 0 12px; }
.navbar .navbar-nav li a { color: var(--ink); font-weight: 500; font-size: 15px; }
.navbar .navbar-nav li a:hover { color: var(--sky); }
.navbar .button-navbar { margin-left: auto; }
.navbar .button-navbar li { display: inline-block; }
.navbar .button-navbar .button { padding: 10px 22px; font-size: 13px; }
.navbar-fixed { box-shadow: 0 2px 14px rgba(16, 27, 48, 0.07); }

/* ------------------------------
  Hero (intro)
---------------------------------*/
.intro { padding-top: 180px; padding-bottom: 0; }
.intro .sub { font-size: 19px; margin: 26px 0 34px; max-width: 560px; color: var(--muted); }
.intro .cta-row { display: flex; gap: 26px; align-items: center; margin-bottom: 64px; flex-wrap: wrap; }
.intro-photo { border-radius: 16px; overflow: hidden; height: 440px; background: var(--sand); }
.intro-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }

.ticker { border-bottom: 1px solid var(--line); padding: 22px 0; }
.ticker ul { display: flex; flex-wrap: wrap; gap: 10px 0; justify-content: center; }
.ticker li {
  font-size: 12.5px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--muted);
}
.ticker li + li::before { content: "\00b7"; color: var(--sand); margin: 0 13px; }

/* ------------------------------
  About
---------------------------------*/
.about { background: var(--paper); }
.about-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 70px; align-items: start; }
.pull { font-family: "Gloock", serif; font-size: 30px; line-height: 1.3; color: var(--ink); }
.pull em { color: var(--sky); font-style: normal; }
.about .lede { font-size: 19px; color: var(--ink); margin-bottom: 18px; }
.facts { display: flex; gap: 40px; margin-top: 34px; padding-top: 26px; border-top: 1px solid var(--line); flex-wrap: wrap; }
.facts .f b { font-family: "Gloock", serif; font-weight: 400; font-size: 34px; display: block; color: var(--ink); }
.facts .f span { font-size: 13px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; }

/* ------------------------------
  Pricing (space)
---------------------------------*/
.space { background: var(--alt); }
.price-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 48px; }
.price-card { background: var(--card); border: 1px solid var(--line); border-radius: 10px; padding: 30px 28px; }
.price-card .name { font-size: 14px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
.price-card .amount { font-family: "Gloock", serif; font-size: 38px; color: var(--ink); }
.price-card .amount small { font-family: "Schibsted Grotesk", sans-serif; font-size: 14px; color: var(--muted); }
.price-card .note { font-size: 14.5px; color: var(--muted); margin: 10px 0 0; }
.price-card.featured { background: var(--ink); border-color: var(--ink); position: relative; }
.price-card.featured .amount { color: var(--paper); }
.price-card.featured .name, .price-card.featured .note { color: #b9c3d6; }
.price-card .tag {
  position: absolute; top: -12px; right: 20px;
  background: var(--sky); color: #fff;
  font-size: 11px; font-weight: 600; letter-spacing: 1px;
  padding: 4px 12px; border-radius: 20px;
}
.updated { font-size: 13px; color: var(--muted); margin-top: 26px; }

/* ------------------------------
  Gallery
---------------------------------*/
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 170px;
  grid-auto-flow: dense;
  gap: 14px;
  margin-top: 48px;
}
.gallery-grid .g { border-radius: 10px; overflow: hidden; background: var(--sand); display: block; }
.gallery-grid .g img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.25s ease; }
.gallery-grid .g:hover img { transform: scale(1.03); }
.g.tall { grid-row: span 2; }
.g.wide { grid-column: span 2; }
.g.plan img { object-fit: contain; background: #fff; }
.g.more {
  display: flex; align-items: center; justify-content: center;
  background: var(--ink); color: var(--paper);
  font-family: "Gloock", serif; font-size: 20px;
}
.g.more:hover { color: var(--paper); }
.g-hidden { display: none; }

/* ------------------------------
  Reviews
---------------------------------*/
.reviews { padding: 90px 0; background: var(--paper); overflow: hidden; }
.reviews h2 { margin-bottom: 15px; }
.reviews .section-sub { margin-bottom: 50px; }

.reviews-row { margin-bottom: 30px; position: relative; overflow: hidden; width: 100%; }
.reviews-track { display: flex; gap: 25px; will-change: transform; }
.reviews-row[data-direction="left"] .reviews-track { animation: scrollLeftSeamless 40s linear infinite; }
.reviews-row[data-direction="right"] .reviews-track { animation: scrollRightSeamless 40s linear infinite; }

.review-card {
  flex-shrink: 0;
  width: 480px;
  min-height: 140px;
  background: var(--card);
  border-radius: 10px;
  padding: 22px;
  border: 1px solid var(--line);
  display: flex;
  flex-direction: column;
}
.review-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.name-stars { display: flex; align-items: center; gap: 10px; flex-grow: 1; }
.review-header h5 { font-size: 15px; font-weight: 600; color: var(--ink); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }
.review-header .stars { font-size: 12px; letter-spacing: 2px; color: var(--gold); white-space: nowrap; }
.customer-type {
  font-size: 10px; font-weight: 600; color: var(--sky);
  background: var(--alt); padding: 3px 8px; border-radius: 4px;
  white-space: nowrap; flex-shrink: 0;
}
.review-card p { font-size: 13px; line-height: 1.5; color: var(--muted); margin: 0; flex-grow: 1; }

@keyframes scrollLeftSeamless {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100% - 25px)); }
}
@keyframes scrollRightSeamless {
  0% { transform: translateX(calc(-100% - 25px)); }
  100% { transform: translateX(0); }
}

/* ------------------------------
  Amenities (features)
---------------------------------*/
.features { background: var(--alt); }
.amen-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 60px; margin-top: 40px; }
.amen { display: flex; gap: 18px; padding: 24px 0; border-bottom: 1px solid var(--line); }
.amen .dot {
  width: 42px; height: 42px; flex: none;
  border: 1px solid var(--sand); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--sky); font-size: 20px;
}
.amen .dot i { font-size: 20px; }
.amen h5 { margin-bottom: 4px; }
.amen p { font-size: 14.5px; margin: 0; }

/* ------------------------------
  FAQ
---------------------------------*/
.faq { background: var(--paper); }
.faq .accordion { margin-top: 30px; }
.faq .accordion-item { border: 0; border-bottom: 1px solid var(--line); border-radius: 0 !important; background: transparent; }
.faq .accordion-button {
  font-size: 17px; font-weight: 600; color: var(--ink);
  background: transparent; padding: 22px 0; box-shadow: none;
  font-family: "Schibsted Grotesk", sans-serif;
}
.faq .accordion-button::after {
  background-image: none;
  content: "+";
  font-family: "Gloock", serif;
  font-size: 22px;
  color: var(--sky);
  width: auto; height: auto; line-height: 1;
  transform: none; transition: none;
  margin-left: auto;
}
.faq .accordion-button:not(.collapsed)::after { content: "\2013"; }
.faq .accordion-button:focus { box-shadow: none; }
.faq .accordion-body { padding: 0 0 22px; color: var(--muted); font-size: 15px; line-height: 1.6; max-width: 640px; }

/* ------------------------------
  Referral
---------------------------------*/
.referral { background: var(--ink); text-align: center; }
.referral h2 { color: var(--paper); font-size: 48px; }
.referral .overline { color: #7db4dc; }
.referral p { margin: 18px auto 34px; color: #b9c3d6; max-width: 560px; }
.referral .button { background: var(--paper); color: var(--ink); }
.referral .button:hover { background: #e8edf3; color: var(--ink); }

/* ------------------------------
  Contact
---------------------------------*/
.contact { background: var(--paper); }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 48px; align-items: start; }
.c-item { padding: 20px 0; border-bottom: 1px solid var(--line); }
.c-item h5 { font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }
.c-item p { margin: 0; color: var(--ink); font-size: 15.5px; }
.c-item a { font-weight: 600; }
.map-wrap { border-radius: 12px; overflow: hidden; border: 1px solid var(--line); }
.map-wrap iframe { width: 100%; display: block; filter: grayscale(0.15); }

/* ------------------------------
  Footer
---------------------------------*/
footer { padding: 44px 0; font-size: 14px; background: var(--ink); color: #b9c3d6; }
footer .footer-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
footer img { height: 46px; width: auto; filter: brightness(0) invert(1); }

/* ------------------------------
  Floating buttons
---------------------------------*/
.whatsapp-button {
  position: fixed; bottom: 20px; right: 20px; z-index: 98;
  background: #10b981; color: #fff;
  width: 60px; height: 60px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 18px rgba(16, 185, 129, 0.4);
  transition: transform 0.25s ease;
}
.whatsapp-button i { font-size: 32px; line-height: 1; }
.whatsapp-button:hover { color: #fff; transform: scale(1.08); }

.mobile-call-button { display: none; }

/* ------------------------------
  Motion preferences
---------------------------------*/
@media (prefers-reduced-motion: reduce) {
  .reviews-track { animation: none !important; }
  .gallery-grid .g img { transition: none; }
}

/* ------------------------------
  Responsive
---------------------------------*/
@media (max-width: 991px) {
  h1 { font-size: 54px; }
  h2 { font-size: 36px; }
  section { padding: 70px 0; }

  .navbar { padding: 12px 0; }
  .navbar .navbar-brand img { height: 44px; }
  .navbar .navbar-collapse { background: var(--paper); padding: 10px 0; }
  .navbar .button-navbar { display: none; }

  .mobile-call-button {
    display: flex; align-items: center; justify-content: center;
    position: fixed; bottom: 20px; right: 20px; z-index: 99;
    background: var(--ink); color: var(--paper);
    width: 60px; height: 60px; border-radius: 50%;
    box-shadow: 0 6px 20px rgba(16, 27, 48, 0.35);
  }
  .mobile-call-button i { font-size: 24px; }
  .whatsapp-button { bottom: 95px; }

  .intro { padding-top: 140px; }
  .intro-photo { height: 300px; }
  .about-grid { grid-template-columns: 1fr; gap: 30px; }
  .price-grid { grid-template-columns: repeat(2, 1fr); }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 150px; }
  .amen-grid { grid-template-columns: 1fr; gap: 0; }
  .contact-grid { grid-template-columns: 1fr; gap: 30px; }
  .map-wrap iframe { height: 360px; }
}

@media (max-width: 575px) {
  .container { padding: 0 25px; }
  h1 { font-size: 40px; }
  h2 { font-size: 30px; }
  section { padding: 60px 0; }

  .intro { padding-top: 120px; }
  .intro .cta-row { gap: 16px; }
  .intro .cta-row .button { width: 100%; text-align: center; }
  .intro-photo { height: 220px; }

  .price-grid { grid-template-columns: 1fr; }
  .review-card { width: 340px; min-height: 120px; padding: 16px; }
  .review-header h5 { font-size: 13px; max-width: 150px; }
  .review-card p { font-size: 12px; }

  .facts { gap: 24px; }
  .facts .f b { font-size: 28px; }

  footer .footer-row { justify-content: center; text-align: center; }

  .whatsapp-button { width: 55px; height: 55px; bottom: 90px; right: 15px; }
  .mobile-call-button { width: 55px; height: 55px; bottom: 15px; right: 15px; }
}
```

- [ ] **Step 2: Verify no old palette survives**

```bash
grep -c 'f97316\|8b5cf6\|0ea5e9\|Raleway\|Heebo' css/style.css   # expect 0
grep -c 'Gloock' css/style.css                                   # expect >= 5
```

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: rewrite stylesheet as Skyline Editorial design system"
```

---

### Task 3: Navbar, hero, ticker markup

**Files:**
- Modify: `index.html` (navbar block and intro section; wrap page content in `<main>`)

**Interfaces:**
- Consumes: classes from Task 2.
- Produces: `<header id="navbar" class="navbar navbar-expand-lg">`, `<main>` opens after the header (closed in Task 8 before the footer). `decryptPhone()` remains the phone CTA everywhere.

- [ ] **Step 1: Replace the navbar block (`<!-- navbar -->` comment through `<!-- end navbar -->`) with:**

```html
    <!-- navbar -->
    <header id="navbar" class="navbar navbar-expand-lg">
        <div class="container">
            <a href="#home" class="navbar-brand"><img src="img/skywork-logo-horizontal.svg" alt="SkyWork Borivali logo"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="la la-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#home">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="#space">Pricing</a></li>
                    <li class="nav-item"><a class="nav-link" href="#gallery">Gallery</a></li>
                    <li class="nav-item"><a class="nav-link" href="#reviews">Reviews</a></li>
                    <li class="nav-item"><a class="nav-link" href="#faq">FAQ</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                </ul>
            </div>

            <ul class="button-navbar">
                <li><a href="#" onclick="decryptPhone(); return false;" class="button"><i class="la la-phone"></i> Call Us</a></li>
            </ul>
        </div>
    </header>
    <!-- end navbar -->

    <main>
```

- [ ] **Step 2: Replace the intro section (`<!-- intro -->` through `<!-- end intro -->`) with:**

```html
    <!-- intro -->
    <section id="home" class="intro">
        <div class="container">
            <span class="overline">15th Floor &middot; Steps from Borivali Station</span>
            <h1>Work above<br>the city.</h1>
            <p class="sub">A calm, health-first coworking space with panoramic views of Mumbai: purified air, purified water, and room to think.</p>
            <div class="cta-row">
                <a href="#" onclick="decryptPhone(); return false;" class="button">Book a Visit</a>
                <a href="#space" class="button-ghost">See Pricing &rarr;</a>
            </div>
            <div class="intro-photo">
                <img src="img/main.jpg" alt="SkyWork Borivali coworking space on the 15th floor">
            </div>
        </div>
    </section>

    <div class="ticker" aria-label="Amenities">
        <div class="container">
            <ul>
                <li>Air Purified</li>
                <li>Water Purified</li>
                <li>Air Conditioned</li>
                <li>Vegetarian-Only</li>
                <li>High-Speed WiFi</li>
                <li>24/7 Security</li>
            </ul>
        </div>
    </div>
    <!-- end intro -->
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:8000`. Expected: porcelain navbar with SVG logo and ink Call Us button; hero overline, Gloock headline, two CTAs, full-width photo, ticker strip. Hamburger works below 992px. No console errors.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: editorial navbar, hero and amenity ticker"
```

---

### Task 4: About and pricing sections

**Files:**
- Modify: `index.html` (about and space sections)

**Interfaces:**
- Consumes: `.about-grid`, `.pull`, `.lede`, `.facts`, `.price-grid`, `.price-card` from Task 2.

- [ ] **Step 1: Replace the about section with:**

```html
    <!-- about -->
    <section id="about" class="about">
        <div class="container">
            <div class="about-grid">
                <div>
                    <span class="overline">About SkyWork</span>
                    <p class="pull">Where you work matters. We built ours <em>fifteen floors up</em>.</p>
                </div>
                <div>
                    <p class="lede">SkyWork Borivali is a premium yet accessible workspace for Mumbai's professionals, steps from Borivali station, with panoramic city views.</p>
                    <p>Two identical setups on the same floor with twenty-six seats in all: eighteen dedicated desks across the open collaborative areas, and two four-seat private cabins for focused work and client calls.</p>
                    <p>We care about your health as much as your productivity: purified air and water, a microwave and kettle for homemade meals, and deliberately no pantry. Step out, take a real break, come back sharper.</p>
                    <div class="facts">
                        <div class="f"><b>2</b><span>Setups</span></div>
                        <div class="f"><b>26</b><span>Total seats</span></div>
                        <div class="f"><b>18</b><span>Open desks</span></div>
                        <div class="f"><b>8</b><span>Cabin seats</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- end about -->
```

- [ ] **Step 2: Replace the space section with:**

```html
    <!-- space -->
    <section id="space" class="space">
        <div class="container">
            <span class="overline">Plans &amp; Pricing</span>
            <h2>Pay for the time you need.<br>Nothing more.</h2>
            <div class="price-grid">
                <div class="price-card">
                    <div class="name">Virtual Meeting Pass</div>
                    <div class="amount">&#8377;350 <small>/ 1-3 hrs</small></div>
                    <p class="note">For occasional meetings, or a first taste of the space.</p>
                </div>
                <div class="price-card">
                    <div class="name">Half-Day Pass</div>
                    <div class="amount">&#8377;450 <small>/ 4-6 hrs</small></div>
                    <p class="note">A focused half day: settle in, get it done.</p>
                </div>
                <div class="price-card">
                    <div class="name">Full Day Pass</div>
                    <div class="amount">&#8377;600 <small>/ day</small></div>
                    <p class="note">A full working day, no strings attached.</p>
                </div>
                <div class="price-card">
                    <div class="name">Weekly</div>
                    <div class="amount">&#8377;2,500 <small>/ week</small></div>
                    <p class="note">Ideal for short projects and sprints.</p>
                </div>
                <div class="price-card">
                    <div class="name">15-Day</div>
                    <div class="amount">&#8377;4,500 <small>/ 15 days</small></div>
                    <p class="note">Extended projects, maximum flexibility.</p>
                </div>
                <div class="price-card featured">
                    <span class="tag">Best value</span>
                    <div class="name">Monthly</div>
                    <div class="amount">&#8377;6,000 <small>/ month</small></div>
                    <p class="note">Complete access to the open workspace.</p>
                </div>
            </div>
            <p class="updated">Pricing last updated August 8, 2026 &middot; <a href="#" onclick="decryptPhone(); return false;">Call us to book &rarr;</a></p>
        </div>
    </section>
    <!-- end space -->
```

- [ ] **Step 3: Verify**

```bash
grep -c '₹250\|₹400\|₹2,250\|₹4,000\|₹5,000\|6,000/month/seat\|💼\|🗓️\|📆\|📅\|🚪' index.html   # expect 0
sed -n '/<!-- space -->/,/<!-- end space -->/p' index.html | grep -c 'style="'   # expect 0: no inline styles in the pricing section
```

Browser: about grid reads correctly, pricing shows 6 cards with Monthly inverted in ink and "Best value" tag.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: editorial about section and rebuilt pricing grid"
```

---

### Task 5: Gallery grid with Magnific lightbox, script cleanup

**Files:**
- Modify: `index.html` (gallery section; script tags at the bottom)
- Modify: `js/main.js` (remove Swiper init, add Magnific init)

**Interfaces:**
- Consumes: `.gallery-grid`, `.g`, `.g-hidden` from Task 2.
- Produces: `.gallery-grid` anchors that `$('.gallery-grid').magnificPopup({delegate: 'a', ...})` binds to.

- [ ] **Step 1: Replace the gallery section with:**

```html
    <!-- gallery -->
    <section id="gallery" class="gallery">
        <div class="container">
            <span class="overline">The Space</span>
            <h2>Have a look around.</h2>
            <div class="gallery-grid">
                <a class="g wide plan" href="img/floor-plan.jpg" title="Floor plan"><img src="img/floor-plan.jpg" alt="SkyWork Borivali floor plan showing two workspace setups, kitchen, washroom and storage room"></a>
                <a class="g tall" href="img/slides/SKYWORK-9.jpg" title="15th floor view"><img src="img/slides/SKYWORK-9.jpg" alt="Panoramic city view from SkyWork's 15th floor window" loading="lazy"></a>
                <a class="g" href="img/slides/SKYWORK-14.jpg" title="Setup 2 open area"><img src="img/slides/SKYWORK-14.jpg" alt="Setup 2 open workspace with dedicated desks and air conditioning" loading="lazy"></a>
                <a class="g wide" href="img/slides/SKYWORK-6.jpg" title="Open work area"><img src="img/slides/SKYWORK-6.jpg" alt="Spacious open work area with dedicated desks" loading="lazy"></a>
                <a class="g" href="img/slides/SKYWORK-3.jpg" title="Shared desks"><img src="img/slides/SKYWORK-3.jpg" alt="Shared desk area with dual monitor setup" loading="lazy"></a>
                <a class="g" href="img/slides/SKYWORK-15.jpg" title="Setup 2"><img src="img/slides/SKYWORK-15.jpg" alt="Setup 2 desk area with wall-mounted desks" loading="lazy"></a>
                <a class="g" href="img/slides/SKYWORK-8.jpg" title="Private cabin"><img src="img/slides/SKYWORK-8.jpg" alt="Compact private cabin with dual monitors" loading="lazy"></a>
                <a class="g" href="img/slides/SKYWORK-12.jpg" title="Shared cabin"><img src="img/slides/SKYWORK-12.jpg" alt="Members working in the shared cabin" loading="lazy"></a>
                <a class="g more" href="img/slides/SKYWORK-1.jpg" title="Private cabin">+ 9 more</a>
                <a class="g-hidden" href="img/slides/SKYWORK-2.jpg" title="Open workspace">&nbsp;</a>
                <a class="g-hidden" href="img/slides/SKYWORK-4.jpg" title="Individual workstation">&nbsp;</a>
                <a class="g-hidden" href="img/slides/SKYWORK-5.jpg" title="Common area">&nbsp;</a>
                <a class="g-hidden" href="img/slides/SKYWORK-7.jpg" title="Workspace with whiteboard">&nbsp;</a>
                <a class="g-hidden" href="img/slides/SKYWORK-10.jpg" title="Corner view of Borivali">&nbsp;</a>
                <a class="g-hidden" href="img/slides/SKYWORK-11.jpg" title="Members in private cabin">&nbsp;</a>
                <a class="g-hidden" href="img/slides/SKYWORK-13.jpg" title="Dedicated desk">&nbsp;</a>
                <a class="g-hidden" href="img/slides/SKYWORK-16.jpg" title="Setup 2 cabin">&nbsp;</a>
            </div>
        </div>
    </section>
    <!-- end gallery -->
```

- [ ] **Step 2: In the scripts block at the bottom of `index.html`, delete these two lines:**

```html
    <script src="js/jquery.filterizr.min.js"></script>
    <script src="js/swiper.min.js"></script>
```

- [ ] **Step 3: In `js/main.js`, delete the whole `// swiper slider` block (the `$(document).ready` that constructs `new Swiper(".mySwiper", ...)`) and add in its place:**

```javascript
  // gallery lightbox
  $(document).ready(function () {
    $('.gallery-grid').magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: { enabled: true },
      image: { titleSrc: 'title' }
    });
  });
```

- [ ] **Step 4: Verify**

```bash
grep -c 'Swiper\|swiper' js/main.js index.html    # expect 0 in both
grep -c 'carousel' index.html                      # expect 0
grep -c 'g-hidden' index.html                      # expect 8
```

Browser: grid fills all 12 cells with no holes; clicking any tile opens the lightbox; arrows traverse all 17 items; "+ 9 more" opens the 9th item.

- [ ] **Step 5: Commit**

```bash
git add index.html js/main.js
git commit -m "feat: editorial gallery grid with Magnific lightbox, drop dead libs"
```

---

### Task 6: Reviews restyle and loader hardening

**Files:**
- Modify: `index.html` (reviews section header)
- Modify: `js/main.js` (reviews loader)

**Interfaces:**
- Consumes: `.reviews-row`, `.reviews-track`, `.review-card` styles from Task 2. `reviews.json` (already committed, 20 reviews).
- Produces: same DOM classes as today so CSS binds; rows split 7/7/6.

- [ ] **Step 1: Replace the reviews section header markup (keep the three `reviews-row` divs exactly as they are) so the section reads:**

```html
    <!-- reviews -->
    <section id="reviews" class="reviews">
        <div class="container">
            <div class="text-center">
                <span class="overline">Members</span>
                <h2>What our members say.</h2>
                <p class="section-sub">Real reviews from professionals, students, and businesses on Google.</p>
            </div>

            <!-- Row 1 - Scroll Left -->
            <div class="reviews-row" data-direction="left">
                <div class="reviews-track"></div>
            </div>

            <!-- Row 2 - Scroll Right -->
            <div class="reviews-row" data-direction="right">
                <div class="reviews-track"></div>
            </div>

            <!-- Row 3 - Scroll Left -->
            <div class="reviews-row" data-direction="left">
                <div class="reviews-track"></div>
            </div>
        </div>
    </section>
    <!-- end reviews -->
```

- [ ] **Step 2: In `js/main.js`, update the reviews loader:**

Replace:

```javascript
  $.getJSON('reviews.json', function (data) {
    const reviews = data.reviews;

    // Divide reviews into 3 rows
    const row1 = reviews.slice(0, 4);
    const row2 = reviews.slice(4, 8);
    const row3 = reviews.slice(8);
```

with:

```javascript
  $.getJSON('reviews.json', function (data) {
    const reviews = data.reviews;

    // Divide reviews into 3 balanced rows
    const third = Math.ceil(reviews.length / 3);
    const row1 = reviews.slice(0, third);
    const row2 = reviews.slice(third, third * 2);
    const row3 = reviews.slice(third * 2);
```

Replace the star line:

```javascript
      const stars = '⭐'.repeat(review.rating);
```

with:

```javascript
      const stars = '★'.repeat(review.rating);
```

And add a failure handler: change the closing of the `$.getJSON(...)` call from

```javascript
    initializeReviewsHover();
  });
```

to

```javascript
    initializeReviewsHover();
  }).fail(function () {
    $('#reviews').hide();
  });
```

- [ ] **Step 3: Verify**

Browser: three rows scroll (left, right, left), cards are white with hairline borders and gold ★ stars, 7/7/6 reviews per row (14/14/12 cards after duplication). Temporarily rename `reviews.json` and reload: section disappears, no console error; rename back.

- [ ] **Step 4: Commit**

```bash
git add index.html js/main.js
git commit -m "feat: restyled review marquee, balanced rows, graceful failure"
```

---

### Task 7: Amenities and FAQ sections

**Files:**
- Modify: `index.html` (features and faq sections)

**Interfaces:**
- Consumes: `.amen-grid`, `.faq` accordion styles from Task 2. Bootstrap's collapse JS (already loaded) powers one-at-a-time smooth animation via `data-bs-parent`.
- Produces: FAQ answer text consumed verbatim by Task 9's FAQPage JSON-LD.

- [ ] **Step 1: Replace the features section with:**

```html
    <!-- features -->
    <section id="features" class="features">
        <div class="container">
            <span class="overline">Amenities</span>
            <h2>The essentials, done well.</h2>
            <div class="amen-grid">
                <div class="amen"><div class="dot"><i class="la la-wifi"></i></div><div><h5>High-Speed WiFi</h5><p>Reliable bandwidth with backup connections, so calls and uploads never drop.</p></div></div>
                <div class="amen"><div class="dot"><i class="la la-chair"></i></div><div><h5>Ergonomic Seating</h5><p>Premium chairs built for full working days.</p></div></div>
                <div class="amen"><div class="dot"><i class="la la-wind"></i></div><div><h5>Purified Air &amp; Water</h5><p>Air purifiers and water purifiers throughout the air-conditioned space.</p></div></div>
                <div class="amen"><div class="dot"><i class="la la-utensils"></i></div><div><h5>Kitchen Facilities</h5><p>Microwave and electric kettle for homemade vegetarian meals and hot drinks.</p></div></div>
                <div class="amen"><div class="dot"><i class="la la-video"></i></div><div><h5>Safety &amp; Security</h5><p>24/7 camera coverage and a fire extinguisher on site, with clear emergency procedures.</p></div></div>
                <div class="amen"><div class="dot"><i class="la la-volume-off"></i></div><div><h5>Quiet by Design</h5><p>A silent working space. Virtual meetings at your desk are fine; take phone calls in the passage near the lift.</p></div></div>
            </div>
        </div>
    </section>
    <!-- end features -->
```

- [ ] **Step 2: Replace the faq section with (Bootstrap accordion, first item open):**

```html
    <!-- faq -->
    <section id="faq" class="faq">
        <div class="container">
            <div class="text-center">
                <span class="overline">FAQ</span>
                <h2>Questions, answered.</h2>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="accordion accordion-flush" id="faqAccordion">
                        <div class="accordion-item">
                            <h3 class="accordion-header" id="faqH1">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqC1" aria-expanded="true" aria-controls="faqC1">Do you have a pantry or cafeteria?</button>
                            </h3>
                            <div id="faqC1" class="accordion-collapse collapse show" aria-labelledby="faqH1" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">Deliberately, no. Long work hours need real breaks. Step out for chai at the cafes around the station, stretch, and come back sharper. We provide a microwave, an electric kettle, and purified water.</div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h3 class="accordion-header" id="faqH2">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqC2" aria-expanded="false" aria-controls="faqC2">Can I bring outside food?</button>
                            </h3>
                            <div id="faqC2" class="accordion-collapse collapse" aria-labelledby="faqH2" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">Yes, bring your homemade vegetarian meals. The microwave and kettle are there for you. Please note: we strictly maintain a vegetarian-only policy in the workspace.</div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h3 class="accordion-header" id="faqH3">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqC3" aria-expanded="false" aria-controls="faqC3">Can I take phone calls in the workspace?</button>
                            </h3>
                            <div id="faqC3" class="accordion-collapse collapse" aria-labelledby="faqH3" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">We keep the workspace silent. Virtual meetings with headphones at your desk are fine; for voice calls, please use the passage near the lift.</div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h3 class="accordion-header" id="faqH4">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqC4" aria-expanded="false" aria-controls="faqC4">Is smoking or drinking allowed?</button>
                            </h3>
                            <div id="faqC4" class="accordion-collapse collapse" aria-labelledby="faqH4" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">No. SkyWork is a strictly no-smoking, no-alcohol workspace.</div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h3 class="accordion-header" id="faqH5">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqC5" aria-expanded="false" aria-controls="faqC5">Is parking available?</button>
                            </h3>
                            <div id="faqC5" class="accordion-collapse collapse" aria-labelledby="faqH5" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">There is no parking at the workspace itself, but public parking near Borivali railway station is available and you can use that. Since we are steps from the station, the train remains the easiest way in.</div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h3 class="accordion-header" id="faqH6">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqC6" aria-expanded="false" aria-controls="faqC6">What health and safety measures do you have?</button>
                            </h3>
                            <div id="faqC6" class="accordion-collapse collapse" aria-labelledby="faqH6" data-bs-parent="#faqAccordion">
                                <div class="accordion-body">Air purifiers for clean air, water purifiers for safe hydration, 24/7 security cameras, ergonomic seating, and regular cleaning throughout the space. A fire extinguisher is installed on site with clear emergency procedures in place.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- end faq -->
```

- [ ] **Step 3: Verify**

```bash
grep -c 'operating hours' index.html         # expect 0
grep -c 'two-wheeler' index.html             # expect 0
grep -c 'data-bs-parent' index.html          # expect 6
```

Browser: opening one FAQ smoothly closes the previous (Bootstrap collapse animation); plus sign flips to a minus.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: hairline amenities list and restyled exclusive FAQ accordion"
```

---

### Task 8: Referral, contact, footer, floating buttons

**Files:**
- Modify: `index.html` (referral, contact, footer, floating buttons; close `<main>`)

**Interfaces:**
- Consumes: `.referral`, `.contact-grid`, `.map-wrap`, footer and floating button styles from Task 2.

- [ ] **Step 1: Replace the referral section with:**

```html
    <!-- referral -->
    <section id="referral" class="referral">
        <div class="container">
            <span class="overline">Referral</span>
            <h2>Bring a friend.<br>Both save &#8377;500.</h2>
            <p>Refer someone who books a monthly membership and you each get &#8377;500 off your next month.</p>
            <a href="#" onclick="decryptPhone(); return false;" class="button">Refer a Friend</a>
        </div>
    </section>
    <!-- end referral -->
```

- [ ] **Step 2: Replace the contact section with (keep the existing iframe `src` exactly as-is):**

```html
    <!-- contact -->
    <section id="contact" class="contact">
        <div class="container">
            <span class="overline">Contact</span>
            <h2>Come see the view.</h2>
            <div class="contact-grid">
                <div>
                    <div class="c-item">
                        <h5>Location</h5>
                        <p>1503, Om Siddhivinayak SRA CHS Ltd, Carter Road No. 1, Near Borivali Railway Station, Behind Kasturba Road Police Station, PBC Building Gate No. 2, Borivali East, Mumbai, Maharashtra 400066</p>
                    </div>
                    <div class="c-item">
                        <h5>Reach us</h5>
                        <p><a href="#" onclick="decryptPhone(); return false;"><i class="la la-phone"></i> Call Us Now</a> &nbsp;&middot;&nbsp; <a href="https://wa.me/919029208698?text=Hi%20SkyWork!%20I%27m%20interested%20in%20learning%20more%20about%20your%20co-working%20space." target="_blank" rel="noopener"><i class="la la-whatsapp"></i> WhatsApp</a></p>
                    </div>
                </div>
                <div class="map-wrap">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241108.4612841752!2d72.7837910753737!3d19.2248934770853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b10e9f07abbd%3A0x2ac21ac3db80c1ea!2sSkyWork%20Coworking%20-%20Borivali!5e0!3m2!1sen!2sin!4v1741605481182!5m2!1sen!2sin" title="SkyWork Borivali on Google Maps" height="460" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    </section>
    <!-- end contact -->

    </main>
```

- [ ] **Step 3: Replace the footer with:**

```html
    <!-- footer -->
    <footer>
        <div class="container">
            <div class="footer-row">
                <img src="img/skywork-logo-horizontal.svg" alt="SkyWork Borivali logo">
                <span>&copy; 2024-2026 SkyWork Borivali. All Rights Reserved</span>
            </div>
        </div>
    </footer>
    <!-- end footer -->
```

- [ ] **Step 4: Replace the two floating buttons at the bottom of `<body>` with:**

```html
    <!-- Mobile Call Button -->
    <a href="#" onclick="decryptPhone(); return false;" class="mobile-call-button" aria-label="Call SkyWork Borivali">
        <i class="la la-phone"></i>
    </a>

    <!-- WhatsApp Button (Desktop & Mobile) -->
    <a href="https://wa.me/919029208698?text=Hi%20SkyWork!%20I%27m%20interested%20in%20learning%20more%20about%20your%20co-working%20space." target="_blank" rel="noopener" class="whatsapp-button" title="Chat on WhatsApp" aria-label="Chat on WhatsApp">
        <i class="la la-whatsapp"></i>
    </a>
```

- [ ] **Step 5: Verify**

```bash
grep -c '2024-2026' index.html               # expect 1
grep -c 'Working Hours\|9 AM\|9 PM\|Sunday' index.html   # expect 0
grep -c '</main>' index.html                 # expect 1
```

Browser: dark referral band, contact grid with muted map, ink footer with white logo, WhatsApp float on desktop, call float appears below 992px.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: referral band, contact grid, ink footer, floating buttons"
```

---

### Task 9: JSON-LD structured data

**Files:**
- Modify: `index.html` (add one script block before `</head>`)

**Interfaces:**
- Consumes: FAQ answer text from Task 7 (must match verbatim), pricing and address facts from Tasks 4 and 8.

- [ ] **Step 1: Add before `</head>`:**

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": "https://www.skywork.in/#business",
          "name": "SkyWork Borivali",
          "description": "Health-first coworking space on the 15th floor near Borivali railway station in Mumbai, with purified air and water, high-speed WiFi with backup connections, and flexible plans.",
          "url": "https://www.skywork.in/",
          "telephone": "+919029208698",
          "image": "https://www.skywork.in/img/main.jpg",
          "logo": "https://www.skywork.in/img/skywork-logo-horizontal.svg",
          "priceRange": "₹350-₹6,000",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1503, Om Siddhivinayak SRA CHS Ltd, Carter Road No. 1, Behind Kasturba Road Police Station, PBC Building Gate No. 2",
            "addressLocality": "Borivali East, Mumbai",
            "addressRegion": "Maharashtra",
            "postalCode": "400066",
            "addressCountry": "IN"
          },
          "hasMap": "https://maps.app.goo.gl/p5FEZYJgniyvwe6m9",
          "amenityFeature": [
            { "@type": "LocationFeatureSpecification", "name": "Air purifier", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Water purifier", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Air conditioning", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "High-speed WiFi with backup connections", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "24/7 security cameras", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Fire extinguisher on site", "value": true }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.skywork.in/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Do you have a pantry or cafeteria?",
              "acceptedAnswer": { "@type": "Answer", "text": "Deliberately, no. Long work hours need real breaks. Step out for chai at the cafes around the station, stretch, and come back sharper. We provide a microwave, an electric kettle, and purified water." }
            },
            {
              "@type": "Question",
              "name": "Can I bring outside food?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes, bring your homemade vegetarian meals. The microwave and kettle are there for you. Please note: we strictly maintain a vegetarian-only policy in the workspace." }
            },
            {
              "@type": "Question",
              "name": "Can I take phone calls in the workspace?",
              "acceptedAnswer": { "@type": "Answer", "text": "We keep the workspace silent. Virtual meetings with headphones at your desk are fine; for voice calls, please use the passage near the lift." }
            },
            {
              "@type": "Question",
              "name": "Is smoking or drinking allowed?",
              "acceptedAnswer": { "@type": "Answer", "text": "No. SkyWork is a strictly no-smoking, no-alcohol workspace." }
            },
            {
              "@type": "Question",
              "name": "Is parking available?",
              "acceptedAnswer": { "@type": "Answer", "text": "There is no parking at the workspace itself, but public parking near Borivali railway station is available and you can use that. Since we are steps from the station, the train remains the easiest way in." }
            },
            {
              "@type": "Question",
              "name": "What health and safety measures do you have?",
              "acceptedAnswer": { "@type": "Answer", "text": "Air purifiers for clean air, water purifiers for safe hydration, 24/7 security cameras, ergonomic seating, and regular cleaning throughout the space. A fire extinguisher is installed on site with clear emergency procedures in place." }
            }
          ]
        }
      ]
    }
    </script>
```

- [ ] **Step 2: Verify the JSON parses and has no hours**

```bash
python3 - <<'PY'
import json, re
html = open('index.html').read()
block = re.search(r'<script type="application/ld\+json">\s*(\{.*?\})\s*</script>', html, re.S).group(1)
data = json.loads(block)
assert 'openingHours' not in block and 'opening_hours' not in block
faq = [n for n in data['@graph'] if n['@type'] == 'FAQPage'][0]
assert len(faq['mainEntity']) == 6
print('JSON-LD ok:', [n['@type'] for n in data['@graph']])
PY
```

Expected: `JSON-LD ok: ['LocalBusiness', 'FAQPage']`

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: LocalBusiness and FAQPage structured data"
```

---

### Task 10: Verification sweep, CLAUDE.md sync, merge

**Files:**
- Modify: `CLAUDE.md` (project instructions sync)

- [ ] **Step 1: Full-content grep sweep**

```bash
grep -n -i 'hour' index.html                       # only 'Long work hours need real breaks' in FAQ may appear
grep -n '₹250\|₹400\|₹2,250\|₹4,000\|₹5,000' index.html    # expect nothing
grep -n '—' index.html css/style.css js/main.js    # expect nothing
grep -n 'f97316\|8b5cf6\|0ea5e9' index.html css/style.css  # expect nothing
grep -c 'alt="' index.html                          # every <img> has alt; count matches img count
python3 -m json.tool reviews.json > /dev/null && echo reviews-ok
```

- [ ] **Step 2: Browser pass**

At 1440, 1024, 768, and 375 widths: navbar collapse, smooth anchor scroll to every section, gallery lightbox over 17 items, FAQ one-at-a-time animation, review marquee three rows, phone links fire `tel:`, WhatsApp URL intact, zero console errors. Compare against mockup v20 side by side.

- [ ] **Step 3: Update CLAUDE.md**

In `CLAUDE.md` (repo root): under Technology Stack remove Swiper.js and Filterizr lines and add "Magnific Popup (gallery lightbox)" and "Google Fonts: Gloock + Schibsted Grotesk". Replace the "Modifying Gallery Images" section text with: "Update the `.gallery-grid` anchors in index.html. Visible tiles are `.g` anchors; extra lightbox-only images use `.g-hidden`. Keep the grid filling all 12 cells and update the '+ N more' count." Replace the reviews row note "(0-3, 4-7, 8+)" with "(three balanced thirds via Math.ceil(reviews.length / 3))". Update "Updating Pricing" to reference the `.price-grid` cards and the `.updated` timestamp line. Remove line-number references that no longer hold (address, hours; hours no longer exist on the site).

- [ ] **Step 4: Commit and merge**

```bash
git add CLAUDE.md
git commit -m "docs: sync CLAUDE.md with redesigned architecture"
git checkout main
git merge ui-redesign --no-ff -m "feat: Skyline Editorial redesign with SEO, AEO and GEO"
```

Do not push; the owner deploys via their existing GitHub Pages flow after review.
