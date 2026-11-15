# Piyush Tomar — Portfolio

Static HTML/CSS/JS. No build step, no dependencies. Upload the contents of this
folder to the root of your GitHub Pages repo (`xyantrix.github.io`).

```
index.html            Main site
contact-vault.html    Unlinked, password-gated contact page
Website_logo.png      Favicon
assets/style.css      Design tokens at the top of :root, then components
assets/main.js        Loader, theme, reveals, nav, contact form, vault gate
assets/dragon-seal.svg  Original logo (also inlined in the HTML as a reusable symbol)
assets/*.png          ERP logos
```

- Colours / spacing: tokens at the top of `assets/style.css`.
- Section spacing: `--sec` in `:root`.
- Loader colours: `.ld` rules and the `linearGradient#lg` in `index.html`.
- Vault password: `VALID_USER` / `VALID_PASS` in `assets/main.js` (readable by anyone, so obscurity only).
- Portrait loads from the original image URL, with a "PT" block as fallback.
  For reliability save it as `assets/portrait.jpg` and update the `src`.

- Logo: the dragon seal is inlined once as `<symbol id="seal">` at the top of each page and reused by the loader, nav, hero watermark and vault. Gradient colours come from `--acc`, `--acc2`, `--acc3` in `:root`.

## Revamp
`assets/luxe.css` + `assets/luxe.js` add the platinum & iris palette, serif display type, custom cursor, magnetic buttons, spotlight/tilt cards, word-by-word heading reveals, label scramble and hero parallax. Palette tokens are at the top of `luxe.css`. Delete both files (and their two tags in `index.html`) to revert.
`assets/revamp.css` + `revamp.js` add the bento About, stacking experience cards, visual project cards, live clock and CTA.
`assets/v3.css` adds the agency-style flow: centered hero with the intact crest logo, Results, Services list and Approach comparison.
`assets/anim.css` + `anim.js`: four colour palettes (switcher at the bottom of the page; default set in the inline script in `index.html`), animated mesh background, staggered blur-rise reveals, scroll-scrubbed hero card, pointer glow.
Hero constellation/dots and background grid were removed; the loader and section-change background blur follow the active palette (`anim.css`/`anim.js`).
