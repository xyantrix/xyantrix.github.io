# Piyush Tomar — Portfolio Website

Static HTML/CSS/JS portfolio for Piyush Tomar, a Finance & Accounting
Executive. No build step, no framework, no dependencies — drag the
folder into a GitHub repo, enable Pages, done. Also works by
double-clicking `index.html` directly.

## Design concept — "The Private Ledger"

A vault-and-ledger aesthetic built specifically for a finance
professional, not a generic dark-mode template. The ground is a
near-black ink (`#0A0B0A`); type is a warm ivory. One sharp accent —
a ledger-green emerald (`#19BD82`) — carries every CTA, link and
highlight. A muted brass (`#BE9A5C`) plays a strictly secondary role:
hairlines, numerals, tags — the metal fittings on a vault, never the
headline color.

**Type.** Fraunces (an expressive serif with real character) carries
headlines and numerals; Manrope is the quiet, confident body voice;
IBM Plex Mono plays the "ledger register" — section labels, dates,
tags, stamped-looking micro-copy.

**Signature element.** A brass-and-emerald *seal medallion* —
built from the dragon-seal mark, a slow-turning tick dial, and a
circular line of certifying micro-copy — opens the site as a stamp
impression in the loader, then anchors the hero as a quiet,
parallax-drifting emblem. It's the one deliberately bold move; every
other surface stays disciplined around it.

**Motion.** Page-load seal-stamp sequence, blur+fade word-by-word
headline reveals, staggered scroll reveals throughout, an animated
gradient on key headline words, mouse-tracked spotlight on cards,
magnetic buttons, a cursor-parallax hero medallion, and an infinite
trust marquee. Everything respects `prefers-reduced-motion`, and
hover-only effects are skipped on touch devices.

No invented testimonials or client logos — this is a personal
portfolio, so the "Credentials" section proves credibility with real
numbers (invoices/month, systems, experience), real IBM SkillBuild
certifications, and real education instead.

## Folder structure

```
.
├── index.html            # Main site
├── contact-vault.html    # Hidden, password-gated contact page (unlinked)
├── dragon-seal.svg       # Logo mark, applied via CSS mask
├── Website_logo.png      # Favicon source
├── README.md
└── assets/
    ├── style.css          # Full design system — tokens at the top of :root
    └── main.js            # All behaviour, each feature in its own try/catch
```

## Customization

- **Colors** — every color is a CSS variable at the top of
  `assets/style.css` (`:root`). Change the tokens and the whole
  site — including the vault page — updates. The one rule to keep:
  `--emerald` stays the *only* saturated accent; `--brass` stays
  secondary/structural.
- **Fonts** — Fraunces (display), Manrope (body), IBM Plex Mono
  (labels/data), loaded from Google Fonts in the `<head>` of both
  `index.html` and `contact-vault.html`.
- **Seal medallion** — `.seal-medallion` and its children in
  `assets/style.css`, near the hero styles. The ring text is set in
  the inline SVG in `index.html` (`<textPath>`).
- **Hidden contact page password** — edit `VALID_USER` / `VALID_PASS`
  in `contact-vault.html`. Client-side only, treat as obscurity not
  real auth.

## Hosting

Push this folder to a GitHub repo, enable **Settings → Pages**,
source = root of `main` branch. No build command needed.
