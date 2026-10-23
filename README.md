# Piyush Tomar — Portfolio

Static HTML/CSS/JS. No build step, no framework, no dependencies. Push to a
GitHub repo, enable Pages, done. Also works by double-clicking `index.html`.

## Design: Swiss style

- **Grid** — a 12-column modular grid. Every section is a label column
  (columns 1–3) and a content column (4–12), separated by a heavy rule.
- **Type** — Archivo (a grotesque in the Akzidenz/Helvetica tradition) is the
  only typeface. Very large, tight headlines against small, quiet body text.
  Fallback stack: Helvetica Neue, Helvetica, Arial.
- **Colour** — black on white, grey for secondary text, and one red accent
  (`--red`) used only for markers, hover and focus. The ERP logos are
  greyscale; your portrait is the only colour image.
- **Motion** — one moment on load (headline settles, rule draws). Everything
  else responds to the visitor. Honors `prefers-reduced-motion`.

## Files

```
index.html          Main site
contact-vault.html  Unlinked, password-gated contact page (client-side only)
dragon-seal.svg     Logo mark (shown black via CSS filter)
Website_logo.png    Favicon / touch icon
assets/style.css    Whole design system, tokens at the top of :root
assets/main.js      Mobile menu, active nav, contact form
assets/*.png        ERP logos
```

## Editing

- **Colours / spacing / fonts** — tokens at the top of `assets/style.css`.
- **Photo** — the portrait loads from the URL in the About section of
  `index.html`. If it fails, a "PT" block shows instead. For reliability,
  save the photo as `assets/portrait.jpg` and point `src` at it.
- **Experience, projects, FAQ** — plain HTML in `index.html`. FAQ uses native
  `<details>`, so it needs no JavaScript.
- **Contact form** — opens the visitor's email app with the message filled in
  (`mailto:`). It does not send from the server.
- **Vault password** — `VALID_USER` / `VALID_PASS` in `contact-vault.html`.
  Anyone can read these in the page source, so treat it as obscurity, not
  security.
