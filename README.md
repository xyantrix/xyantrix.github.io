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
