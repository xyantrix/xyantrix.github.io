# Piyush Tomar — Portfolio Website

Static HTML/CSS/JS portfolio for Piyush Tomar, a Finance & Accounting
Specialist. No build step, no framework, no dependencies — drag the
folder into a GitHub repo, enable Pages, done. Also works by
double-clicking `index.html` directly.

## Design concept

A premium, dark-luxury SaaS look — deep navy (`#050816`) grounds a
violet-to-cyan accent system (`#7C3AED` → `#06B6D4`, amber `#F59E0B`
used sparingly), with glassmorphism cards, an animated silk-ribbon
canvas behind an interactive dot grid, and a subtle noise overlay to
keep flat gradients from banding. Space Grotesk carries the display
type (headlines, eyebrows, numerals) with a geometric, fintech-grade
character; Inter handles body copy and UI. Full light/dark theming
is preserved — dark is the default experience, with a refined violet-
tinted light mode as the alternate.

The hero pairs the mouse-reactive dot grid with two flowing gradient
"silk" ribbons drawn on canvas — an ambient, premium signature rather
than static gradient orbs. A single glass-framed portrait card
replaces the previous circular-avatar-plus-banner layout (no more
duplicate photo). The small rotated "Approved" stamp built from the
dragon-seal logo returns as a nod to sign-off culture.

Cards use a soft mouse-tracked spotlight on hover, sections reveal on
scroll, buttons have subtle magnetic pull and gradient glow, and every
interactive piece degrades gracefully (motion is skipped for
`prefers-reduced-motion`, and touch devices skip hover-only effects).
The Projects section is a bento-style showcase (one featured card,
two supporting cards) instead of a carousel. The full-screen loader
shows a genuine progress percentage before revealing the page, the
mobile nav is now a full-screen animated overlay, and the navbar
tracks the active section as you scroll.

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
- **Fonts** — Space Grotesk (display) and Inter (body), loaded from
  Google Fonts in the `<head>` of both `index.html` and
  `contact-vault.html`.
- **Theme** — the toggle in the navbar flips `data-theme` on `<html>`
  and remembers the choice in `localStorage` under `pt-theme`;
  first-time visitors see dark mode by default.
- **Silk canvas** — the flowing background ribbons live in the "SILK
  WAVE CANVAS" block of `assets/main.js`; the `ribbons` array controls
  count, amplitude, speed, and color per ribbon.
- **Stamp** — `.stamp` in `assets/style.css`, near the hero styles.
  Rotation, size, and dash pattern are all in that one rule block.
- **Hidden contact page password** — edit `VALID_USER` / `VALID_PASS`
  in `contact-vault.html`. Client-side only, treat as obscurity not
  real auth.

## Hosting

Push this folder to a GitHub repo, enable **Settings → Pages**,
source = root of `main` branch. No build command needed.
