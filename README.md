# Piyush Tomar — Portfolio Website

Static HTML/CSS/JS portfolio for Piyush Tomar, a Finance & Accounting
Specialist. No build step, no framework, no dependencies — drag the
folder into a GitHub repo, enable Pages, done. Also works by
double-clicking `index.html` directly.

## Design concept

A premium, Framer-style SaaS look inspired by product sites like
Launchfolio, with React Bits–style interactive touches. Krub carries
the display type (headlines, eyebrows, numerals) with real character;
Inter handles body copy and UI. The palette is a fresh indigo
(`#5B4FE8`) paired with a warm coral (`#FF6A4D`) accent, on a near-white
paper ground in light mode and a near-black ground in dark mode — full
light/dark theming with a floating pill navbar and a smooth toggle
that remembers the visitor's choice.

The hero pairs a mouse-reactive dot grid with soft gradient orbs
behind the headline — a quiet, ambient signature rather than a busy
one. The small rotated "Approved" stamp built from the dragon-seal
logo returns as a nod to sign-off culture. The old dashboard-style
stats grid has been replaced with a single clean, centered stat line
that sits quietly between sections instead of demanding attention.

Cards use a soft mouse-tracked spotlight on hover, sections reveal on
scroll, buttons have subtle magnetic pull, and every interactive
piece degrades gracefully (motion is skipped for
`prefers-reduced-motion`, and touch devices skip hover-only effects).

No invented testimonials or client logos — this is a personal
portfolio, so "Capabilities" and "Projects" use Piyush's real skills
and real work instead.

## Folder structure

```
.
├── index.html            # Main site
├── contact-vault.html    # Hidden, password-gated contact page (unlinked)
├── dragon-seal.svg       # Logo mark, applied via CSS mask
├── Website_logo.png      # Favicon source
├── README.md
└── assets/
    ├── style.css          # Full design system — tokens (light + dark) at the top of :root
    └── main.js            # All behaviour, each feature in its own try/catch
```

## Customization

- **Colors** — every color is a CSS variable at the top of
  `assets/style.css`, defined once for light mode (`:root`) and once
  for dark mode (`[data-theme="dark"]`). Change the tokens and the
  whole site — including the vault page — updates.
- **Fonts** — Krub (display) and Inter (body), loaded from Google
  Fonts in the `<head>` of both `index.html` and `contact-vault.html`.
- **Theme** — the toggle in the navbar flips `data-theme` on `<html>`
  and remembers the choice in `localStorage` under `pt-theme`; it
  otherwise falls back to the visitor's OS preference.
- **Stamp** — `.stamp` in `assets/style.css`, near the hero styles.
  Rotation, size, and dash pattern are all in that one rule block.
- **Hidden contact page password** — edit `VALID_USER` / `VALID_PASS`
  in `contact-vault.html`. Client-side only, treat as obscurity not
  real auth.

## Hosting

Push this folder to a GitHub repo, enable **Settings → Pages**,
source = root of `main` branch. No build command needed.
