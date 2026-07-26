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

**Structure**: announcement pill → hero with a glass "product"
mockup panel → layered trust marquee (two text rows, opposite
directions) → About → Experience → Projects → Capabilities (6-card
grid with a soft gradient glow behind it) → a numbered 3-step "How I
work" process → a comparison table → a scrolling logo marquee of the
real ERP/tools logos → big centered stat row + certifications/
education → FAQ → closing CTA → Contact → a full multi-column
footer.

**The loader** fades the logo in large, then "Welcome" cycles
rapidly through a randomized draw from 100 languages — a different
sequence every visit — decelerating into English "Welcome" with a
small confirm-pulse on the logo before the site reveals. The language
name sits underneath the word throughout, including at rest.
Respects `prefers-reduced-motion` (skips straight to the site).

**Custom cursor**: two gradient blobs (a small solid dot + a soft
blurred trail) move together with slightly different easing, using
`mix-blend-mode: screen` so they glow against the dark background.
Both grow on hover over any interactive element. Automatically
disabled on touch devices.

No invented testimonials or client logos — this is a personal
portfolio, so the "Credentials" section proves credibility with real
numbers (invoices/month, systems, experience), real IBM SkillBuild
certifications, and real education instead. The ERP/tools logos in
the marquee are the real software Piyush works in daily, used only
to indicate proficiency (not an endorsement claim).

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
    ├── main.js            # All behaviour, each feature in its own try/catch
    ├── oracle-fusion.png  # Oracle Cloud ERP logo
    ├── netsuite.png       # Oracle NetSuite logo
    ├── navision.png       # Microsoft Dynamics 365 logo
    ├── tally.png          # Tally Prime logo
    └── zohobooks.png      # Zoho Books logo
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
- **Logo size** — `.nav-mark`, `.foot-mark`, and `.loader-mark` /
  `.loader-mark-wrap` in `assets/style.css`.
- **Tools logo marquee** — `.logo-marquee-track` in `index.html`;
  add or swap logo files in `assets/` and reference them the same
  way. The list is duplicated once in the markup for a seamless
  infinite loop — keep both copies in sync if you edit it.
- **Hidden contact page password** — edit `VALID_USER` / `VALID_PASS`
  in `contact-vault.html`. Client-side only, treat as obscurity not
  real auth.

## Hosting

Push this folder to a GitHub repo, enable **Settings → Pages**,
source = root of `main` branch. No build command needed.
