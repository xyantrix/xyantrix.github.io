/* ANIM: palette switcher, mesh background, pointer glow, staggered reveals, scroll-scrubbed hero card, per-palette hues */
(function () {
  'use strict'; var d = document, root = d.documentElement, reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var $$ = function (s) { return Array.prototype.slice.call(d.querySelectorAll(s)); };
  function safe(f) { try { f(); } catch (e) {} }
  safe(function () { var b = d.createElement('div'); b.className = 'bgm'; b.setAttribute('aria-hidden', 'true'); b.innerHTML = '<i></i><i></i><i></i><i class="pg"></i>'; d.body.insertBefore(b, d.body.firstChild); });
  function hues() { var hb = +getComputedStyle(root).getPropertyValue('--hb') || 160;
    $$('.vis').forEach(function (v, i) { v.style.setProperty('--h', hb + [0, 38, -42, 70][i % 4]); });
    $$('.r').forEach(function (r, i) { r.style.setProperty('--h', hb + [0, 30, -34][i % 3]); }); }
  /* palette switcher */
  safe(function () {
    var pals = [['emerald', '#6ee7b7,#2dd4a0'], ['ember', '#ff9a6b,#ff5d5d'], ['cobalt', '#7ea6ff,#5b6dff'], ['iris', '#aab6ff,#8b7bff']], w = d.createElement('div');
    w.className = 'pal'; w.setAttribute('role', 'group'); w.setAttribute('aria-label', 'Colour palette'); w.innerHTML = '<span>Palette</span>';
    pals.forEach(function (p) { var b = d.createElement('button'); b.type = 'button'; b.title = p[0]; b.setAttribute('aria-label', p[0] + ' palette'); b.dataset.p = p[0]; b.style.setProperty('--g', 'linear-gradient(135deg,' + p[1] + ')'); w.appendChild(b); });
    d.body.appendChild(w);
    function set(p, save) { root.setAttribute('data-pal', p); $$('.pal button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.p === p); });
      if (save) try { localStorage.setItem('pal', p); } catch (e) {} setTimeout(hues, 30); }
    w.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) set(b.dataset.p, true); });
    set(root.getAttribute('data-pal') || 'emerald', false);
    $$('[data-theme-toggle]').forEach(function (t) { t.addEventListener('click', function () { setTimeout(hues, 60); }); });
  });
  /* staggered reveal delays (cleared after reveal so hovers stay snappy) */
  safe(function () {
    $$('.bn,.rs,.svl,.bento,.pr,.cmp,.sk,.xp>div:last-child').forEach(function (c) {
      Array.prototype.forEach.call(c.children, function (k, i) { if (k.classList.contains('rv')) k.style.setProperty('--d', i * 90 + 'ms'); }); });
    $$('.rv').forEach(function (e) { new MutationObserver(function (m, o) { if (e.classList.contains('in')) { o.disconnect(); setTimeout(function () { e.classList.add('dn'); }, 1500); } }).observe(e, { attributes: true, attributeFilter: ['class'] }); });
  });
  /* scroll-linked: mesh parallax + scrubbed hero card */
  safe(function () {
    if (reduce) return; var sc = $$('.stage2'); sc.forEach(function (e) { e.dataset.scrub = 1; });
    function up() { root.style.setProperty('--sy2', scrollY);
      sc.forEach(function (e) { var r = e.getBoundingClientRect(), p = Math.max(0, Math.min(1, (innerHeight - r.top) / (innerHeight * .75))); e.style.setProperty('--p', p.toFixed(3)); }); }
    addEventListener('scroll', up, { passive: true }); addEventListener('resize', up); up();
  });
  /* pointer-following glow */
  safe(function () {
    if (reduce || !matchMedia('(pointer:fine)').matches) return; var g = d.querySelector('.pg'), x = innerWidth / 2, y = innerHeight / 3, gx = x, gy = y;
    addEventListener('pointermove', function (e) { x = e.clientX; y = e.clientY; });
    (function f() { gx += (x - gx) * .08; gy += (y - gy) * .08; g.style.transform = 'translate(' + gx + 'px,' + gy + 'px)'; requestAnimationFrame(f); })();
  });
  /* background blur that builds as you scroll across a section boundary */
  safe(function () {
    var secs = $$('main > section'), bg = d.querySelector('.bgm'); if (!bg || reduce) return;
    function f() { var mid = innerHeight * .5, best = 1e9; secs.forEach(function (s) { best = Math.min(best, Math.abs(s.getBoundingClientRect().top - mid)); });
      var k = Math.max(0, 1 - best / (innerHeight * .3)); bg.style.setProperty('--bb', (k * 20).toFixed(1) + 'px'); bg.style.setProperty('--bk', k.toFixed(3)); }
    addEventListener('scroll', f, { passive: true }); addEventListener('resize', f); f();
  });
  addEventListener('scroll', function () { root.classList.toggle('pal-on', scrollY > 420); }, { passive: true });
  setTimeout(hues, 50); addEventListener('load', hues);
})();
