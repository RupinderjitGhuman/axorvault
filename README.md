# Axorvault Systems Inc. — Website

> **Cloud Architecture · Data Architecture · Cybersecurity Architecture · Data Governance · Public Sector Trusted**

This repository contains the official marketing website for **Axorvault Systems Inc.**, a static website built with plain HTML, CSS, and JavaScript — no frameworks, no build tools. It's fast, accessible, SEO-friendly, and easy to modify.

---

## Project Structure

```
axorvaultwebsite/
├── index.html          # Main landing page (single page, section-based)
├── README.md           # This file — your learning guide
├── css/
│   └── styles.css      # All styles, organized with design tokens (CSS variables)
├── js/
│   └── main.js         # Interactivity: nav, animations, counters, form
└── assets/
    └── favicon.svg     # Browser tab icon
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

The site currently uses **inline SVG icons and CSS gradients** (zero image weight).

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

## Deployment

Since Axorvault is a cloud company, deploy where you work:

### Azure Static Web Apps (recommended)
In the Azure portal: **Static Web Apps → New** → point at this repo, root = `/`.

### GitHub Pages
Repo settings → Pages → Sources → `main` branch, `/` root.

### Netlify / Vercel
Drag-and-drop the folder, or connect the repo. No config needed (static site).

---

## Roadmap / Future Enhancements

- [ ] Wire the contact form to Azure Functions + Table storage
- [ ] Add a services detail page per pillar
- [ ] Case studies page (public sector examples)
- [ ] Blog / insights section (marketing + SEO)
- [ ] Multilingual (EN/FR) — useful for Canadian public sector
- [ ] Add real photography / client logos to `assets/`
- [ ] Analytics (privacy-friendly, e.g., Matomo)

---

## Learning Notes

This codebase is a great place to learn:

1. **Design tokens** — search `:root` in `styles.css`
2. **Modern CSS layout** — `grid`, `flex`, `clamp()` fluid typography
3. **Progressive enhancement** — JS *adds* behaviour; site works without it
4. **Performance** — no frameworks, inline SVGs, lazy loading
5. **Shared patterns** — the RBAC logic app in this repo uses similar "query → transform → notify" patterns; the site's contact form could extend that
6. **Placeholder data** — the phone (`555-0142`), email and address in the Contact/Footer sections are **invented placeholders**. Replace them in `index.html` (search for `555-0142` and `hello@axorvault.com`) — there are 2 spots each.
