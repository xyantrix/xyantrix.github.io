/* LUXE layer: custom cursor, magnetic buttons, spotlight + tilt, word reveals, text scramble, parallax. */
(function () {
  'use strict';
  var d = document, root = d.documentElement, fine = matchMedia('(pointer:fine)').matches, reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  function safe(f) { try { f(); } catch (e) {} }

  /* Word-by-word masked reveal on section headings */
  safe(function () {
    var hs = $$('h2:not(.cta-h)'), io = 'IntersectionObserver' in window && new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('sp-in'); io.unobserve(x.target); } });
    }, { threshold: .3 });
    hs.forEach(function (h) {
      var t = h.textContent.trim(); h.setAttribute('aria-label', t); h.textContent = '';
      t.split(/\s+/).forEach(function (w, i) {
        var s = d.createElement('span'), n = d.createElement('i');
        s.className = 'wd'; s.setAttribute('aria-hidden', 'true'); n.style.setProperty('--i', i); n.textContent = w;
        s.appendChild(n); h.appendChild(s); h.appendChild(d.createTextNode(' '));
      });
      io ? io.observe(h) : h.classList.add('sp-in');
    });
  });

  /* Text scramble on eyebrow labels as they scroll in */
  safe(function () {
    if (reduce || !('IntersectionObserver' in window)) return;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+', io = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (!x.isIntersecting) return; io.unobserve(x.target);
        var el = x.target, fin = el.dataset.t, t0 = performance.now();
        (function f(now) {
          var p = Math.min(1, (now - t0) / 900), k = Math.floor(p * fin.length), o = '';
          for (var i = 0; i < fin.length; i++) o += i < k || fin[i] === ' ' ? fin[i] : chars[Math.random() * chars.length | 0];
          el.textContent = o; if (p < 1) requestAnimationFrame(f);
        })(t0);
      });
    }, { threshold: 1 });
    $$('.eyebrow').forEach(function (e) { e.dataset.t = e.textContent.trim(); io.observe(e); });
  });

  /* Spotlight glow + 3D tilt on cards */
  safe(function () {
    if (!fine) return;
    $$('.bc,.sc,.job,.fg,.ledger,.ps,.t,.r,.cm').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        c.style.setProperty('--mx', x + 'px'); c.style.setProperty('--my', y + 'px');
        if (c.classList.contains('bc') && !reduce && c.classList.contains('in'))
          c.style.transform = 'perspective(900px) rotateX(' + ((.5 - y / r.height) * 7) + 'deg) rotateY(' + ((x / r.width - .5) * 9) + 'deg) translateZ(0)';
      });
      c.addEventListener('pointerleave', function () { c.style.transform = ''; });
    });
  });

  /* Magnetic buttons */
  safe(function () {
    if (!fine || reduce) return;
    $$('.btn,.brand,.ib').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.translate = ((e.clientX - r.left - r.width / 2) * .28) + 'px ' + ((e.clientY - r.top - r.height / 2) * .38) + 'px';
      });
      b.addEventListener('pointerleave', function () { b.style.translate = ''; });
    });
  });

  /* Hero mouse parallax + scroll parallax */
  safe(function () {
    var hero = d.querySelector('.hero'); if (!hero || reduce) return;
    if (fine) addEventListener('pointermove', function (e) {
      hero.style.setProperty('--px', (e.clientX / innerWidth - .5).toFixed(3));
      hero.style.setProperty('--py', (e.clientY / innerHeight - .5).toFixed(3));
    });
    addEventListener('scroll', function () { hero.style.setProperty('--sy', Math.min(scrollY, 900) * .18); }, { passive: true });
  });

  /* Custom cursor: dot + trailing ring, grows over links, labels project cards */
  safe(function () {
    if (!fine || reduce) return;
    var c = d.createElement('div'); c.className = 'cur'; c.innerHTML = '<b></b><i></i>'; d.body.appendChild(c);
    var ring = c.firstChild, dot = c.lastChild, x = 0, y = 0, rx = 0, ry = 0;
    root.classList.add('lx-cur');
    addEventListener('pointermove', function (e) {
      x = e.clientX; y = e.clientY; c.classList.add('on');
      var t = e.target.closest ? e.target : e.target.parentNode, hit = t.closest('a,button,summary,.bc,.sc,[role=button]'), inp = t.closest('input,textarea');
      c.classList.toggle('hv', !!hit); c.classList.toggle('tx', !!inp);
      var lab = t.closest('.bc') ? 'View' : '', cur = ring.textContent;
      if (lab !== cur) ring.textContent = lab; c.classList.toggle('lb', !!lab);
    });
    d.addEventListener('mouseleave', function () { c.classList.remove('on'); });
    (function loop() {
      rx += (x - rx) * .16; ry += (y - ry) * .16;
      ring.style.translate = rx + 'px ' + ry + 'px'; dot.style.translate = x + 'px ' + y + 'px';
      requestAnimationFrame(loop);
    })();
  });
})();
