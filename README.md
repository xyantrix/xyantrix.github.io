# Piyush Tomar — Portfolio Website

Static HTML/CSS/JS portfolio for Piyush Tomar, a Finance & Accounting
Executive. No build step, no framework, no dependencies — drag the
folder into a GitHub repo, enable Pages, done. Also works by
double-clicking `index.html` directly.

## Design concept

A dark, cinematic SaaS-style layout — near-black ground, a soft
indigo glow behind the hero, glass navigation, bold sans headlines,
and one sharp accent color (indigo-blue) carried through badges,
gradients and CTAs. Manrope carries every weight of type; IBM Plex
Mono plays a small supporting role in labels, tags and the loader.

**Structure** follows a cinematic-SaaS rhythm: announcement pill →
hero with a glass "product" mockup panel (a stylised AP queue, built
from real workflow details, not a stock screenshot) → layered
trust marquee (two rows, opposite directions) → About → Experience
→ Projects → Capabilities → a numbered 3-step "How I work" process
→ a comparison table ("the usual way" vs. how Piyush runs it) → a
tools grid → big centered stat row + certifications/education →
FAQ → closing CTA → Contact → a full multi-column footer.

**The loader** is the signature move: the logo fades in, then
"Welcome" cycles rapidly through a randomized draw from 100
languages — a different sequence every visit — decelerating into
English "Welcome" with a small confirm-pulse on the logo before the
site reveals. Respects `prefers-reduced-motion` (skips straight to
the site).

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
  site — including the vault page — updates. `--accent` stays the
  *only* saturated color in the system.
- **Fonts** — Manrope (everything) and IBM Plex Mono (labels/tags/
  loader), loaded from Google Fonts in the `<head>` of both
  `index.html` and `contact-vault.html`.
- **Loader languages** — the "Welcome" word list lives in
  `assets/main.js` inside the `WELCOMES` array. Add, remove, or
  reorder entries freely; English always resolves the sequence.
- **Hero mockup panel** — `.hero-mock` markup in `index.html`, styled
  in `assets/style.css` near the hero rules.
- **Hidden contact page password** — edit `VALID_USER` / `VALID_PASS`
  in `contact-vault.html`. Client-side only, treat as obscurity not
  real auth.

## Hosting

Push this folder to a GitHub repo, enable **Settings → Pages**,
source = root of `main` branch. No build command needed.
