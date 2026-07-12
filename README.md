# Piyush Tomar — Portfolio Website (Luxury Gold Edition)

A single-page portfolio site for Piyush Tomar, a Finance & Accounting
Specialist. Built as static HTML/CSS/JS — no build tooling, no
framework, no dependencies. Open `index.html` and it works, whether
that's by double-clicking the file or serving it from GitHub Pages.

---

## 1. Project overview

One long scrolling page (`index.html`) plus a hidden, password-gated
contact page (`contact-vault.html`) that is never linked from the
public site.

**Design concept — "Luxury Gold Edition":** a black-and-gold
identity built around a single signature moment — the hero. It
combines an interactive, mouse-reactive dot grid with a slow-moving
gold aurora (soft blurred light blobs) and a fine noise texture
underneath, then fades the whole effect out into a clean, minimal
rest-of-page as you scroll. Every card in the site borrows the same
language: dark glass, gold hairline borders, and a gold glow that
appears on hover.

**A deliberate scope note:** the brief asked for a testimonials
section. Since this is a personal portfolio and there are no real
client testimonials to draw from, that section was intentionally
left out rather than filled with invented quotes — a "Capabilities"
showcase was built in its place, using Piyush's actual skills, in
the same masonry-card layout the brief described.

---

## 2. Tech stack

| Layer      | Choice                                             |
|------------|-------------------------------------------------------|
| Markup     | Plain HTML5                                            |
| Styling    | Plain CSS3 (custom properties, grid, flexbox, masks, backdrop-filter) |
| Behaviour  | Plain vanilla JavaScript (no framework, no bundler)    |
| Fonts      | Google Fonts — Manrope, Inter, IBM Plex Mono           |
| Hero canvas| 2D Canvas API (no library)                             |

**On animation libraries:** the brief mentioned Framer Motion / GSAP.
This build intentionally skips them — the site has no build step by
design (it needs to run by just opening the HTML file, including
from a local folder with no server), and adding a bundled animation
library would break that. Every effect the brief asked for (scroll
reveal, fade, hover micro-interactions, the interactive dot grid) is
implemented with `IntersectionObserver`, `requestAnimationFrame`,
and CSS transitions instead — same visual result, zero dependencies.
If you later move this into a React/Vite project, swapping the
reveal logic for Framer Motion's `whileInView` is a straightforward
1:1 replacement.

---

## 3. Installation

Nothing to install. Clone or download the folder and open
`index.html`.

```bash
git clone <your-repo-url>
cd <your-repo-folder>
open index.html      # macOS
start index.html      # Windows
xdg-open index.html   # Linux
```

To serve it locally instead (useful if you're editing and want a
normal HTTP context):

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then visit `http://localhost:8000`.

---

## 4. Development setup

No package manager, no install step. Edit `index.html`,
`assets/style.css`, or `assets/main.js` directly and refresh the
browser.

Every interactive feature in `main.js` is wrapped in its own
`try/catch`, and initialized independently — a bug in one feature
(say, the carousel) cannot take down another (say, the nav or the
contact form). Keep this pattern if you add new features.

---

## 5. Build process

There isn't one, by design. The files in this folder **are** the
production files.

- **GitHub Pages**: push the folder to a repo, enable Pages on the
  `main` branch, root directory.
- **Netlify / Vercel**: drag-and-drop the folder, or connect the repo
  with no build command and publish directory `/`.

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
    ├── style.css          # All styling, organized in labeled sections
    └── main.js            # All behaviour, organized in labeled sections
```

---

## 7. Customization guide

**Text content:** everything lives in plain HTML in `index.html` —
find the section comment (`<!-- HERO -->`, `<!-- CAPABILITIES -->`,
etc.) and edit directly.

**Colours:** every colour is a CSS custom property at the top of
`assets/style.css`:

```css
:root{
  --gold: #D4AF37;
  --gold-bright: #FFD700;
  --champagne: #F7E7CE;
  --bronze: #CD7F32;
  --void: #050505;   /* background */
  --text: #F7F3E9;   /* primary text */
  ...
}
```

Change these and the whole site — gradients, buttons, glow effects,
borders — updates, since nothing hardcodes a colour outside this
block.

**Logo:** `dragon-seal.svg`, applied as a CSS `mask-image`, which is
why it can pick up the gold gradient rather than being a flat PNG.
To swap logos, replace the SVG with any single-shape icon (solid
black/white — the mask only reads the alpha channel).

**Hero dot grid:** in `assets/main.js`, under
`HERO INTERACTIVE GOLD DOT GRID`:
- `spacing` — distance between dots (px)
- `radius` — how far the cursor's influence reaches (px)
- the `rgba(255,215,0, …)` values control dot and glow colour

**Hero aurora:** in `assets/style.css`, under `#heroAurora` — three
`.blob` elements with independent size/position/opacity/animation.
Add, remove, or recolour blobs freely; each one is self-contained.

**Loader timing:** in `assets/main.js`, the `loader` function has
two `setTimeout` calls — the normal exit time, and a hard-fallback
safety net. The breathing/fade cycle itself is the
`@keyframes loaderBreathe` block in `assets/style.css`.

**Capabilities grid sizing:** `.cap-grid` in `assets/style.css` is a
3-column CSS Grid; `.cap-card.large` spans two rows to create the
masonry effect. Move the `.large` class to any card to change which
one is featured.

**Projects carousel:** duplicate or delete a `.proj-card` block
inside `.carousel-track` in `index.html`. The JS reads slide count
dynamically — nothing else needs to change.

**Hidden contact page password:** edit `VALID_USER` / `VALID_PASS`
in `contact-vault.html`. This is a client-side soft gate, not real
authentication — treat it as light obscurity, not security.

---

## 8. Design system documentation

### Colour tokens (`assets/style.css`, `:root`)

| Token         | Value                    | Use                                 |
|---------------|---------------------------|---------------------------------------|
| `--void`      | `#050505`                 | Page background                       |
| `--text`      | `#F7F3E9`                 | Primary text                          |
| `--text-dim`  | `#A69C87`                 | Secondary text / descriptions         |
| `--text-faint`| `#5E5747`                 | Tertiary text / meta labels           |
| `--gold`      | `#D4AF37`                 | Primary accent                        |
| `--gold-bright`| `#FFD700`                | Bright accent, glow highlights        |
| `--champagne` | `#F7E7CE`                 | Gradient endpoint, soft highlight     |
| `--bronze`    | `#CD7F32`                 | Secondary accent (projects, variety)  |
| `--grad`      | gold → bright gold → champagne | Buttons, headings, progress states |
| `--border`    | `rgba(212,175,55,.14)`    | Card/section hairlines                |
| `--surface`   | `rgba(212,175,55,.045)`   | Glass card backgrounds                |

### Typography

| Role             | Font           | Notes                                   |
|------------------|----------------|---------------------------------------------|
| Display/headings | Manrope        | Bold (700–800), used for all `<h1>`–`<h3>`  |
| Body text        | Inter          | Light weight (300) for paragraphs           |
| Labels/data      | IBM Plex Mono  | Eyebrows, tags, dates, metadata             |

*(Geist/Satoshi from the original brief aren't distributed via
Google Fonts, so Manrope was used as the closest equivalent —
geometric, high-contrast, premium feel. Swap the `<link>` in
`index.html`'s `<head>` and the `--serif` variable if you have a
licensed copy of Geist or Satoshi.)*

### Spacing & layout

- Content max-width: `1180px` (`.wrap`)
- Section vertical padding: `120px` (desktop)
- Card border-radius: `20–24px`
- Floating navbar: `64px` tall, `18px` from the top, rounded pill

### Components

- **Glass spotlight cards** (`.spot`): backdrop-blur + translucent
  gold-tinted background, with a radial gold glow that follows the
  cursor via CSS custom properties (`--mx`, `--my`).
- **Floating navbar**: detached from the viewport edges, rounded
  pill shape, glassmorphism (`backdrop-filter: blur`), gold border
  that intensifies once the page is scrolled.
- **Capabilities masonry**: 3-column grid where one card spans two
  rows, avoiding a repetitive same-size grid.
- **Marquee**: pure CSS animation, infinite loop, pauses on hover,
  content duplicated once in the HTML for a seamless loop.
- **Carousel**: draggable/swipeable via Pointer Events, arrow
  buttons, dot indicators. 1 slide on mobile, 2 on desktop.
- **CTA banner**: a large centered glass panel with its own soft
  gold glow, used to punctuate the page before the contact section.

---

## 9. Animation overview

| Animation              | Where                          | How                                                          |
|--------------------------|----------------------------------|------------------------------------------------------------------|
| Loader fade/hold/fade    | `#loader .loader-mark`           | CSS `@keyframes loaderBreathe` — opacity + glow pulse, looping    |
| Hero dot grid             | `#heroField` canvas              | `requestAnimationFrame` loop; dots displace toward the cursor within a radius, drift back when idle |
| Hero aurora               | `#heroAurora .blob`              | CSS `@keyframes auroraDrift` — slow translate + scale, staggered per blob |
| Hero fade-to-plain        | `#heroField`, `#heroAurora`      | CSS `mask-image` gradient — both layers fade to transparent before the hero ends, so the effect dissolves rather than cutting off |
| Scroll reveals            | any `.reveal` element            | `IntersectionObserver` adds `.visible`, CSS transitions the rest |
| Stat counters              | `.stat-value`                    | `IntersectionObserver` + `requestAnimationFrame` count-up with easing |
| Magnetic buttons           | `.magnetic`                      | `mousemove` offsets the element slightly toward the cursor        |
| Custom cursor               | `#cursor`, `#cursorTrail`        | Two elements lerp toward the real cursor at different speeds (desktop/pointer devices only) |
| Glass spotlight cards        | `.spot`                          | Radial gradient positioned via CSS vars updated on `mousemove`   |
| Marquee                      | `.marquee-track`                 | CSS `@keyframes marquee`, `translateX` loop                      |
| Floating navbar glow          | `#nav.scrolled .nav-inner`      | Border colour + box-shadow transition on scroll                  |

**Reliability note:** every animated feature is initialized inside
its own `try/catch` in `main.js`, and the loader has a hard fallback
timer. If any single feature fails for any reason, it fails silently
and the rest of the page keeps working.

`prefers-reduced-motion` is respected globally — if a visitor has
that OS setting on, all animation/transition durations collapse to
near-zero automatically.

---

## 10. Performance notes

- The hero canvas is paused via `IntersectionObserver` the moment
  the hero scrolls out of view, so it costs nothing once you're
  further down the page.
- Canvas rendering accounts for device pixel ratio (capped at 2x)
  for crisp dots without over-rendering on very high-DPI screens.
- No external JS libraries are loaded — the entire behaviour layer
  is one small, dependency-free file.
- Images are limited to the one profile photo; everything else
  (logo, icons, gradients, glow) is CSS or inline SVG, so there's
  very little to download.

---

## 11. Notes on the hidden contact page

`contact-vault.html` is not linked anywhere in `index.html` — it's a
soft-gated page for sharing direct contact info selectively. It uses
a simple client-side email/password check, which is **not secure**
in any real sense (viewing page source reveals the credentials);
treat it as an obscurity layer, not a login system.

---

## 12. Browser support

Built with standard, widely-supported web APIs: CSS custom
properties, CSS Grid/Flexbox, `backdrop-filter`, `IntersectionObserver`,
Canvas 2D, Pointer Events, and CSS masks. Works in all current
versions of Chrome, Edge, Firefox, and Safari. No polyfills included
or required for those.
