# Piyush Tomar — Portfolio

Static HTML/CSS/JS. No build step, no dependencies. Upload the contents of this
folder to the root of your GitHub Pages repo (`xyantrix.github.io`) and replace the old files.
The old layered files (style, luxe, revamp, v3, anim, bits, main .css/.js) are gone; delete them from the repo.

```
index.html            Main site
contact-vault.html    Unlinked, password-gated contact page
favicon.png / Website_logo.png   Favicon (padded so round tab icons never crop it)
assets/site.css       All styles. Colour palettes + tokens at the very top
assets/site.js        Loader, palette dock, animations, strips, nav, form, vault gate
assets/*.png          ERP logos
```

- Dark only (light mode removed).
- Default colour: `data-pal` fallback `orchid` in the inline script in `index.html`. Six palettes are defined at the top of `site.css`; visitors switch them with the dock at bottom-right.
- Logo: the crest path is defined once in `index.html` (`#p1`–`#p4`) and reused by the loader, nav, hero and vault. Gradient colours come from `--a1/--a2/--a3`.
- Strips (top marquee and ERP logos) loop forever, can be dragged or swiped, and resume on their own. With reduced-motion they become plain scrollable strips.
- Numbers count up when they scroll into view and always end on the exact value.
- Vault password: `VALID_USER` / `VALID_PASS` in `assets/site.js` (readable by anyone, so obscurity only).
- Portrait loads from the original image URL with a "PT" fallback. For reliability save it as `assets/portrait.jpg` and update the `src`.
