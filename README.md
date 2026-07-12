# Piyush Tomar — Portfolio Website (Nova Edition)

A single-page portfolio site for Piyush Tomar, a Finance & Accounting
Specialist. Built as static HTML/CSS/JS — no build tooling, no
framework, no dependencies. Open `index.html` and it works, whether
that's by double-clicking the file or serving it from GitHub Pages.

---

## 1. Project overview

The site is one long scrolling page (`index.html`) plus a hidden,
password-gated contact page (`contact-vault.html`) that is never
linked from the public site.

**Design concept — "Nova Edition":**
- The hero (first screen) has an interactive, mouse-reactive dotted
  grid with an animated gradient wash underneath it — this is the
  main visual focus of the page.
- As you scroll past the hero, that effect fades out (via a CSS mask
  on the canvas) into a plain, minimal background for the rest of
  the site. The interactive field never runs outside the hero.
- The loader is intentionally minimal: just the logo mark breathing
  (fading/scaling in and out) for a couple of cycles, then gone.
- Colour palette is teal (`#2DD4BF`) and coral (`#FF8A65`) on a
  near-black background, used as a gradient across headings, buttons,
  and accents.

---

## 2. Tech stack

| Layer      | Choice                                             |
|------------|-----------------------------------------------------|
| Markup     | Plain HTML5                                          |
| Styling    | Plain CSS3 (custom properties, grid, flexbox, masks) |
| Behaviour  | Plain vanilla JavaScript (no framework, no bundler)  |
| Fonts      | Google Fonts — Space Grotesk, Inter, IBM Plex Mono   |
| Hero canvas| 2D Canvas API (no library)                           |

There is deliberately no React/Vue/build step — it's meant to be
dropped straight into a static host (GitHub Pages, Netlify, etc.)
with zero setup.

---

## 3. Installation

There is nothing to install. Clone or download the folder and open
`index.html` in a browser.

```bash
git clone <your-repo-url>
cd <your-repo-folder>
open index.html      # macOS
start index.html      # Windows
xdg-open index.html   # Linux
```

If you'd rather serve it locally (recommended if you plan to edit
and want live reload via your own tooling), any static server works:

```bash
# Python
python3 -m http.server 8000

# Node (if you have it)
npx serve .
```

Then visit `http://localhost:8000`.

---

## 4. Development setup

No package manager, no `npm install`. To make changes:

1. Edit `index.html`, `assets/style.css`, or `assets/main.js` directly.
2. Refresh the browser — there's no compile step.
3. Keep an eye on the browser console for errors; every interactive
   feature in `main.js` is wrapped in its own `try/catch` so a bug in
   one feature (say, the carousel) can't take down the rest of the
   page (nav, cursor, forms, etc.).

If you want linting or formatting, any general-purpose HTML/CSS/JS
tool (Prettier, ESLint) will work fine against these files — nothing
here depends on a specific toolchain.

---

## 5. Build process

There isn't one — this is intentional. The files in this folder
**are** the production files. To deploy:

- **GitHub Pages**: push this folder to a repo and enable Pages on
  the `main` branch (root).
- **Netlify/Vercel**: drag-and-drop the folder, or connect the repo
  with no build command and publish directory set to `/`.

---

## 6. Folder structure

```
.
├── index.html            # Main site (single page, all sections)
├── contact-vault.html    # Hidden, password-gated contact page
├── dragon-seal.svg       # Logo artwork, used via CSS mask everywhere
├── Website_logo.png      # Favicon source
├── Untitled-2.png        # Secondary logo asset (unused by default)
├── README.md             # This file
└── assets/
    ├── style.css          # All styling (single file, organized in sections)
    └── main.js            # All behaviour (single file, organized in sections)
```

Everything is single-file per layer on purpose — easy to search, easy
to hand off, no import graph to trace.

---

## 7. Customization guide

**Change the text content:** everything is plain HTML in
`index.html` — search for the section you want (`<!-- HERO -->`,
`<!-- EXPERIENCE -->`, etc.) and edit directly.

**Change colours:** all colours are CSS custom properties at the top
of `assets/style.css`:

```css
:root{
  --teal: #2DD4BF;
  --coral: #FF8A65;
  --void: #08090B;   /* background */
  --text: #F1F1EC;   /* primary text */
  ...
}
```

Change these and the whole site (gradients, buttons, hover states,
accents) updates, since almost nothing hardcodes a colour outside
this block.

**Change the logo:** the logo is `dragon-seal.svg`, applied as a CSS
`mask-image` (not an `<img>`), which lets it inherit any gradient/
colour via `background`. To swap it, replace `dragon-seal.svg` with
your own single-colour SVG icon (any solid black/white shape works —
the mask only cares about the alpha channel).

**Change the hero dot grid:** in `assets/main.js`, look for the
`HERO INTERACTIVE DOT GRID` block. Key tunables:
- `spacing` — distance between dots (px)
- `radius` — how far the cursor's influence reaches (px)
- the two `createRadialGradient` calls control the ambient wash and
  the cursor glow colours.

**Change the loader timing:** in `assets/main.js`, the `loader`
function has two `setTimeout` calls — the first is the normal exit
time, the second is a hard-fallback safety net in case anything
above it fails. The breathing animation itself lives in
`assets/style.css` under `@keyframes breathe`.

**Add/remove Projects carousel slides:** duplicate or delete a
`.proj-card` block inside `.carousel-track` in `index.html`. The
carousel JS reads slide count dynamically — no other changes needed.

**Update the hidden contact page password:** in
`contact-vault.html`, edit the `VALID_USER` / `VALID_PASS` constants
near the bottom of the file. This is client-side only (not real
security — anyone viewing source can find it), it's a soft gate, not
a login system.

---

## 8. Design system documentation

### Colour tokens (`assets/style.css`, `:root`)

| Token           | Value                    | Use                                  |
|-----------------|---------------------------|---------------------------------------|
| `--void`        | `#08090B`                 | Page background                       |
| `--text`        | `#F1F1EC`                 | Primary text                          |
| `--text-dim`    | `#9C9C96`                 | Secondary text / descriptions         |
| `--text-faint`  | `#575752`                 | Tertiary text / meta labels           |
| `--teal`        | `#2DD4BF`                 | Primary accent                        |
| `--coral`       | `#FF8A65`                 | Secondary accent                      |
| `--grad`        | teal → coral gradient     | Buttons, headings, progress states    |
| `--border`      | `rgba(240,240,236,.09)`   | Card/section hairlines                |
| `--surface`     | `rgba(240,240,236,.045)`  | Card backgrounds                      |

### Typography

| Role          | Font           | Notes                                  |
|---------------|----------------|------------------------------------------|
| Display/headings | Space Grotesk | Geometric, used for all `<h1>`–`<h3>`    |
| Body text     | Inter          | Light weight (300) for paragraphs        |
| Labels/data   | IBM Plex Mono  | Used for eyebrows, tags, dates, metadata |

### Spacing & layout

- Content max-width: `1180px` (`.wrap`)
- Section vertical padding: `120px` (desktop)
- Card border-radius: `20px` (large cards), `100px` (pills/buttons)
- Grid gaps: `20px` (cards), `64px`+ (major layout columns)

### Components

- **Spotlight cards** (`.spot`): a radial gradient follows the
  cursor via CSS custom properties (`--mx`, `--my`) set in JS on
  `mousemove`.
- **Marquee** (`.marquee-track`): pure CSS animation, infinite loop,
  pauses on hover. Content is duplicated once in the HTML for a
  seamless loop.
- **Carousel** (`.carousel`): draggable/swipeable via Pointer Events,
  with arrow buttons and dot indicators. Responsive: 1 slide on
  mobile, 2 on desktop.

---

## 9. Animation overview

| Animation                | Where                        | How                                                        |
|---------------------------|-------------------------------|--------------------------------------------------------------|
| Loader breathing          | `#loader .loader-mark`        | CSS `@keyframes breathe` — scale + opacity pulse             |
| Hero dot grid              | `#heroField` canvas           | `requestAnimationFrame` loop; dots displace toward cursor within a radius, drift back when idle |
| Hero fade-to-plain         | `#heroField`                  | CSS `mask-image` gradient — bottom of the canvas fades to transparent, so it visually dissolves before the hero ends |
| Scroll reveals             | any `.reveal` element         | `IntersectionObserver` adds `.visible`, which CSS transitions in |
| Stat counters               | `.stat-value`                 | `IntersectionObserver` + `requestAnimationFrame` count-up with easing |
| Magnetic buttons           | `.magnetic`                   | `mousemove` offsets the element toward the cursor slightly    |
| Custom cursor               | `#cursor`, `#cursorTrail`     | Two elements lerp toward the real cursor position at different speeds, for a trailing effect (desktop/pointer devices only) |
| Spotlight cards             | `.spot`                       | Radial gradient positioned via CSS vars updated on `mousemove` |
| Marquee                     | `.marquee-track`               | CSS `@keyframes marquee`, `translateX` loop                   |

**Reliability note:** every animated feature above is initialized
inside its own `try/catch` block in `main.js`. If any single one
fails for any reason, it fails silently and the rest of the page
keeps working — nothing can cascade into a broken page.

`prefers-reduced-motion` is respected globally: if a visitor has
that OS setting on, all animation/transition durations collapse to
near-zero automatically.

---

## 10. Notes on the hidden contact page

`contact-vault.html` is not linked anywhere in `index.html` — it's a
soft-gated page for sharing direct contact info selectively (e.g. in
a resume footer or a specific application). It uses a simple
client-side email/password check. This is **not secure** in any real
sense (viewing page source reveals the credentials); treat it as an
obscurity layer, not a login system.

---

## 11. Browser support

Built with standard, widely-supported web APIs: CSS custom
properties, CSS Grid/Flexbox, `IntersectionObserver`, Canvas 2D,
Pointer Events, and CSS masks. Works in all current versions of
Chrome, Edge, Firefox, and Safari. No polyfills included or required
for those.
