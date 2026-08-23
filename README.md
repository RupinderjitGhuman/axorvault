# Axorvault Systems Inc. — Website

> **Cloud Architecture · Data Architecture · Cybersecurity Architecture · Data Governance · Public Sector Trusted**

This repository contains the official marketing website for **Axorvault Systems Inc.**, a static website built with plain HTML, CSS, and JavaScript — no frameworks, no build tools. It's fast, accessible, SEO-friendly, and easy to modify.

---

## Project Structure

```
axorvaultwebsite/
├── index.html            # Main landing page (single page, section-based)
├── 404.html              # Branded not-found page (served by GitHub Pages)
├── README.md             # This file — your learning guide
├── CNAME                 # Custom domain for GitHub Pages: axorvault.com
├── robots.txt            # Crawl rules + sitemap pointer
├── sitemap.xml           # Single-page sitemap
├── .well-known/
│   └── security.txt      # RFC 9116 vulnerability-disclosure contact
├── .github/
│   └── workflows/
│       └── static.yml    # GitHub Pages deploy workflow (SHA-pinned actions)
├── css/
│   └── styles.css        # All styles, organized with design tokens (CSS variables)
├── js/
│   └── main.js           # Interactivity: nav, animations, counters, form
└── assets/
    ├── favicon.svg              # Browser tab icon
    ├── axorvaultlogo.png        # Full logo lockup — used as the OG/Twitter share image
    └── axorvaultlogo-icon.png   # Emblem cropped from the lockup — used in the nav/footer
```

> There are **no dependencies** and **no build step**. You can open `index.html` directly in a browser.

---

## Quick Start

```bash
# Option 1: Open directly
open index.html            # macOS

# Option 2: Local dev server (recommended)
python3 -m http.server 8080
# then visit http://localhost:8080
```

---

## Design System

All design decisions live in CSS custom properties at the top of `css/styles.css` (the `:root` block). **Change these tokens first** before touching component styles.

### Color Palette

| Token          | Value     | Usage                                   |
|----------------|-----------|-----------------------------------------|
| `--navy-900`   | `#081120` | Deepest background (hero, dark sections) |
| `--navy-800`   | `#0d1b2e` | Dark section background                 |
| `--navy-700`   | `#14263d` | Cards on dark                           |
| `--azure-500`  | `#2f81f7` | Primary accent (buttons, links)         |
| `--azure-400`  | `#38bdf8` | Lighter accent (gradients, highlights)  |
| `--teal-400`   | `#2dd4bf` | Secondary accent (governance)           |
| `--gold-400`   | `#f5b84c` | Public sector / trust highlights        |
| `--slate-100`  | `#f4f7fb` | Light section background                |
| `--slate-600`  | `#5b6b7f` | Body text on light                      |

The palette encodes the brand story:
- **Navy** → depth, reliability, "vault"
- **Azure** → cloud
- **Cyan** → data architecture
- **Teal** → data governance
- **Red** → cybersecurity
- **Gold** → public sector trust

### Typography

- Font: **Inter** (Google Fonts) with system fallbacks
- Scale (all in `:root`): `--text-xs` → `--text-display` (fluid `clamp()` sizes)

### Logo & Brand Assets

The nav and footer brand mark is `assets/axorvaultlogo-icon.png` (the emblem cropped out of the full lockup, transparent background) paired with the live `Axorvault Systems` text — sized via `.brand__mark` / `.brand__name` in `styles.css`. The full lockup, `assets/axorvaultlogo.png` (icon + wordmark + tagline), is only used as the `og:image` / `twitter:image` in `index.html` — it was tested at nav size and the wordmark became illegible below ~100px tall, so don't swap it into the header directly. If you need a new crop (e.g. for a different section), the emblem's tight bounding box in the source PNG is roughly `x: 284–1338, y: 20–745`.

---

## How to Make Common Changes

### 1. Change the headline or any text
Open `index.html` and edit the text inside the relevant section. Every section is clearly commented:

```html
<!-- ══════════════ SECTION: HERO ══════════════ -->
```

### 2. Change colors
Edit the `:root` block in `css/styles.css`. Example — switch the accent from azure to violet:

```css
:root {
  --azure-500: #8b5cf6;  /* was #2f81f7 */
}
```

### 3. Add a service card
Copy an existing `<article class="service-card">` block in the **Services** section, then change the icon (color variants: `--azure`, `--cyan`, `--teal`, `--gold`, `--red`), title, and copy. The grid reflows automatically. To center a card in row 2 (like Public Sector), add the `service-card--center` class; the tablet breakpoint already un-centers it.

### 4. Add a new page
1. Copy `index.html` → `about.html`
2. Adjust the `<title>` and meta tags
3. Update the nav links in both files (search for `nav__links`)
4. Nav, footer, CSS and JS are all shared — no other work needed

### 5. Change the contact form behaviour
The form is front-end only and shows a success message in `js/main.js`. To make it real, pick one:
- **Formspree** (easiest): set the form's `action` to your Formspree URL + `method="post"`, then remove the `preventDefault` in JS
- **Azure Static Web Apps + API**: create a serverless function — fitting for a cloud company!
- **Microsoft Graph sendMail**: same technique the RBAC Logic App uses in this repo

### 6. Add images
Place files in `assets/` and reference them relatively:

```html
<img src="assets/team.jpg" alt="..." loading="lazy">
```

The site is mostly **inline SVG icons and CSS gradients**; the brand logo (`axorvaultlogo.png` / `axorvaultlogo-icon.png`) is the only raster image weight so far.

---

## Page Sections (top to bottom)

| #   | Section              | Purpose                                            |
|-----|----------------------|----------------------------------------------------|
| 1   | Header / Nav         | Sticky, translucent, hamburger on mobile           |
| 2   | Hero                 | Value proposition + stats (animated counters)      |
| 3   | Trust Bar            | Compliance certifications strip                    |
| 4   | Services             | 5 pillars: Cloud, Data, Cybersecurity, Governance, Public Sector |
| 5   | Why Axorvault        | Differentiators + abstract vault visual            |
| 6   | Security             | Dark section, compliance framework grid            |
| 7   | Process              | 4-step methodology timeline                        |
| 8   | Testimonials         | 3 social proofs                                    |
| 9   | CTA                  | Conversion banner                                  |
| 10  | Contact              | Form (front-end demo)                              |
| 11  | Footer               | Links, contact, legal                              |

---

## JavaScript Features (`js/main.js`)

| Feature             | How it works                                          |
|---------------------|-------------------------------------------------------|
| Mobile nav toggle   | Toggles `.nav--open`, sets `aria-expanded`           |
| Sticky header       | Adds `.nav--scrolled` after 40px scroll              |
| Scroll reveal       | `IntersectionObserver` adds `.reveal--visible`       |
| Stat counters       | Animate numbers when stats scroll into view          |
| Contact form        | Client-side validation + success message (no backend) |
| Footer year         | Auto-injected `getFullYear()`                        |

All animations respect `prefers-reduced-motion` for accessibility.

---

## Accessibility Checklist (done — keep it that way)

- [x] Semantic landmarks (`header`, `main`, `section`, `footer`)
- [x] Skip link to main content
- [x] `:focus-visible` styles on all interactive elements
- [x] ARIA on mobile menu toggle
- [x] Alt text on all images / `aria-hidden` where decorative
- [x] Colour contrast ≥ 4.5:1 for body text
- [x] `prefers-reduced-motion` fallbacks

---

## Security

- **CSP + Referrer-Policy** — set via `<meta>` tags in `index.html` and `404.html` (`script-src 'self'`, no inline/external scripts; `style-src` scoped to self + Google Fonts; `Referrer-Policy: strict-origin-when-cross-origin`).
- **`.well-known/security.txt`** ([RFC 9116](https://www.rfc-editor.org/rfc/rfc9116)) — tells researchers how to report a vulnerability. The contact address is still a placeholder (see below) — replace it before launch.
- **GitHub Actions pinned to commit SHAs**, not mutable version tags, in `.github/workflows/static.yml` — a supply-chain hardening step, low risk here since these are official `actions/*` workflows but cheap to do.
- **What's *not* fixable from this repo:** GitHub Pages cannot send custom HTTP response headers, so `Strict-Transport-Security`, `X-Frame-Options`/`frame-ancestors`, `X-Content-Type-Options`, and `Permissions-Policy` can't be set at all (the CSP `<meta>` tag covers script/style sources for the browser, but a header-based scanner will always report it "missing" since it's not a real header). GitHub Pages' CDN also sends `Access-Control-Allow-Origin: *` on every asset by default — low real risk here since the site is fully static with no auth/cookies, but it's a platform default, not something in this codebase.
- **To get real security headers:** put Cloudflare (free tier) in front of the custom domain, or migrate hosting to something that supports a headers config (Netlify/Cloudflare Pages `_headers` file, Vercel `vercel.json`).
- **TLS / HSTS / HTTP→HTTPS redirect** on `axorvault.com` depend on the GitHub Pages custom-domain cert being provisioned and **Settings → Pages → Enforce HTTPS** being checked — that's a one-time manual step once DNS points at GitHub Pages, not something committed in this repo.

---

## Deployment

The live site deploys via **GitHub Actions** (`.github/workflows/static.yml`) on every push to `main`, using the official `actions/upload-pages-artifact` + `actions/deploy-pages` flow — no separate build step needed.

### GitHub Pages (current)
1. Repo settings → Pages → Source → **GitHub Actions** (already wired up by the workflow file).
2. `CNAME` in the repo root points the custom domain to `axorvault.com` — point your DNS at GitHub Pages ([docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)), then wait for GitHub to provision the HTTPS cert.
3. Once the cert is issued, check **Enforce HTTPS** in the same settings page — this is what actually fixes the TLS/HSTS/redirect findings in a pentest scan (see Security above).

### Azure Static Web Apps
In the Azure portal: **Static Web Apps → New** → point at this repo, root = `/`. Also gives you real HTTP headers via `staticwebapp.config.json` if you want to fully close the header gaps above without adding Cloudflare.

### Netlify / Vercel
Drag-and-drop the folder, or connect the repo. No config needed for the site to work; add a `_headers` (Netlify) or `vercel.json` (Vercel) file if you want the security headers GitHub Pages can't provide.

---

## ⚠️ Before Going Live

These are content problems, not code bugs — fixing them means replacing invented copy with real information, which nobody but Axorvault can do:

- [ ] **Fabricated testimonials** — the three quotes in the Testimonials section are invented, attributed to specific-sounding roles ("Director of IT, Provincial Health Authority", etc.). Publishing invented quotes on a live company site is a false-advertising risk. Replace with real client testimonials (with permission) or remove the section.
- [ ] **Placeholder contact info** — `hello@axorvault.com`, `+1 (604) 555-0142`, and the Vancouver address are invented. Search `index.html` for `555-0142` and `hello@axorvault.com` (2 spots each) and replace with real details before launch.
- [ ] **`security@axorvault.com`** in `.well-known/security.txt` is the same kind of placeholder — point it at a real monitored inbox.
- [ ] **Non-functional contact form** — currently client-side only; it shows a success message but never sends anything anywhere (see "Change the contact form behaviour" above). Wire it to a real backend before launch, or visitors will believe they reached you and won't hear back.
- [ ] **Invented stats** — the hero's animated counters ("120+ cloud platforms", "40 agencies", "2PB+ data") are placeholder numbers, not real figures.

## Roadmap / Future Enhancements

- [ ] Wire the contact form to Azure Functions + Table storage
- [ ] Add a services detail page per pillar
- [ ] Case studies page (public sector examples)
- [ ] Blog / insights section (marketing + SEO)
- [ ] Multilingual (EN/FR) — useful for Canadian public sector
- [x] Add real logo — `assets/axorvaultlogo.png` / `axorvaultlogo-icon.png` now in place in the nav, footer, and social share image
- [ ] Add real client photography/logos to `assets/` (for the testimonials section, once it has real testimonials)
- [ ] Analytics (privacy-friendly, e.g., Matomo) — note this also needs a privacy policy page and a disclosure for the Google Fonts request, given the public-sector/privacy-governance positioning
- [ ] Front the custom domain with Cloudflare (or migrate hosts) to get real `Strict-Transport-Security` / `X-Frame-Options` / `X-Content-Type-Options` / `Permissions-Policy` headers — see Security above

---

## Learning Notes

This codebase is a great place to learn:

1. **Design tokens** — search `:root` in `styles.css`
2. **Modern CSS layout** — `grid`, `flex`, `clamp()` fluid typography
3. **Progressive enhancement** — JS *adds* behaviour; site works without it
4. **Performance** — mostly inline SVGs and CSS gradients; the two brand PNGs in `assets/` are the only raster image weight on the page
5. **Shared patterns** — the RBAC logic app in this repo uses similar "query → transform → notify" patterns; the site's contact form could extend that

See **⚠️ Before Going Live** above for the placeholder content (contact info, testimonials, stats) that still needs replacing.
