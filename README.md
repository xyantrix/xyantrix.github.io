# Piyush Tomar — Portfolio Website ("The Ledger" edition)

Static HTML/CSS/JS portfolio for Piyush Tomar, a Finance & Accounting
Specialist. No build step, no framework, no dependencies — drag the
folder into a GitHub repo, enable Pages, done. Also works by
double-clicking `index.html` directly.

## Design concept

A finance-native visual language instead of a generic tech-agency
look: deep navy-charcoal ground, a single emerald "balanced" accent,
IBM Plex Mono for data/labels, Space Grotesk for headlines. The
signature moment is the hero's **three-way match** — a live-look
ledger card (PO / GRN / Invoice all reconciled to "Balanced") next to
a canvas network of drifting, connecting nodes, echoing reconciliation
itself. Cards throughout use hairline dividers and flat "ledger row"
styling rather than heavy shadows, and section eyebrows use `/ 01`
style numbering only where the content really is a sequence
(Experience, Skills) — not decoratively.

No invented testimonials or client logos — this is a personal
portfolio, so the "Capabilities" and "Projects" sections use Piyush's
real skills and real work instead.

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
  `assets/style.css` (`--void`, `--ledger`, `--text`, etc). Change
  there and the whole site updates.
- **Hero network** — `assets/main.js`, under `HERO CANVAS`: `count`
  (node density), `linkDist` (how close nodes need to be to connect).
- **Hidden contact page password** — edit `VALID_USER` / `VALID_PASS`
  in `contact-vault.html`. Client-side only, treat as obscurity not
  real auth.

## Hosting

Push this folder to a GitHub repo, enable **Settings → Pages**,
source = root of `main` branch. No build command needed.
