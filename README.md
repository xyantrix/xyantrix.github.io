# Piyush Tomar — Portfolio Website

Static HTML/CSS/JS portfolio for Piyush Tomar, a Finance & Accounting
Specialist. No build step, no framework, no dependencies — drag the
folder into a GitHub repo, enable Pages, done. Also works by
double-clicking `index.html` directly.

## Design concept

Warm and editorial rather than a tech-dashboard look: a deep
espresso-charcoal ground (not pure black), one terracotta accent, a
serif with real character (Fraunces) for headlines paired with Inter
for body text. Mono is used sparingly, just for dates, tags, and
labels. The hero leads with a photo and a confident headline under a
soft warm glow — the one signature flourish is a small rotated
"Approved" stamp near the CTA, built from the dragon-seal logo, a
quiet nod to sign-off culture rather than a literal chart or diagram.

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
    ├── style.css          # Full design system — tokens at the top of :root
    └── main.js            # All behaviour, each feature in its own try/catch
```

## Customization

- **Colors** — every color is a CSS variable at the top of
  `assets/style.css` (`--void`, `--terracotta`, `--amber`, `--text`,
  etc). Change there and the whole site updates.
- **Stamp** — `.stamp` in `assets/style.css`, near the hero styles.
  Rotation, size, and dash pattern are all in that one rule block.
- **Hidden contact page password** — edit `VALID_USER` / `VALID_PASS`
  in `contact-vault.html`. Client-side only, treat as obscurity not
  real auth.

## Hosting

Push this folder to a GitHub repo, enable **Settings → Pages**,
source = root of `main` branch. No build command needed.
