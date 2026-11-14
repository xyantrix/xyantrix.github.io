/* React Bits-style components in vanilla JS: Particles, Scroll-velocity marquee, Scroll-reveal text,
   Shiny text, Decrypted hover text, Dock nav, Click spark, fit-to-width wordmark. */
(function () {
  'use strict';
  var d = document, fine = matchMedia('(pointer:fine)').matches, reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  function safe(f) { try { f(); } catch (e) {} }
  var css = function (n) { return getComputedStyle(d.documentElement).getPropertyValue(n).trim(); };

  /* Shiny text on status badge */
  safe(function () {
    var s = d.querySelector('.stat'); if (!s) return;
    Array.prototype.slice.call(s.childNodes).forEach(function (n) {
      if (n.nodeType === 3 && n.textContent.trim()) { var w = d.createElement('span'); w.className = 'shiny'; w.textContent = n.textContent; s.replaceChild(w, n); }
    });
  });

  /* Particles: drifting constellation that reacts to the cursor */
  safe(function () {
    var hero = d.querySelector('.hero'); if (!hero || reduce) return;
    var cv = d.createElement('canvas'); cv.className = 'pcv'; hero.insertBefore(cv, hero.firstChild);
    var x = cv.getContext('2d'), W, H, dpr = Math.min(devicePixelRatio || 1, 2), P = [], m = { x: -999, y: -999 }, on = true;
    function size() { W = hero.clientWidth; H = hero.clientHeight; cv.width = W * dpr; cv.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(90, W * H / 14000)); P = []; for (var i = 0; i < n; i++) P.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 }); }
    size(); addEventListener('resize', size);
    hero.addEventListener('pointermove', function (e) { var r = hero.getBoundingClientRect(); m.x = e.clientX - r.left; m.y = e.clientY - r.top; });
    hero.addEventListener('pointerleave', function () { m.x = m.y = -999; });
    new IntersectionObserver(function (e) { on = e[0].isIntersecting; }).observe(hero);
    (function f() {
      requestAnimationFrame(f); if (!on) return;
      var c = css('--acc') || '#aab6ff'; x.clearRect(0, 0, W, H); x.fillStyle = c; x.strokeStyle = c;
      for (var i = 0; i < P.length; i++) {
        var p = P[i], dx = p.x - m.x, dy = p.y - m.y, dd = dx * dx + dy * dy;
        if (dd < 22000) { p.vx += dx / 90000; p.vy += dy / 90000; }
        p.vx *= .995; p.vy *= .995; p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        x.globalAlpha = .55; x.beginPath(); x.arc(p.x, p.y, 1.2, 0, 6.283); x.fill();
        for (var j = i + 1; j < P.length; j++) {
          var q = P[j], ex = p.x - q.x, ey = p.y - q.y, e2 = ex * ex + ey * ey;
          if (e2 < 11000) { x.globalAlpha = (1 - e2 / 11000) * .22; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.stroke(); }
        }
        if (dd < 28000) { x.globalAlpha = (1 - dd / 28000) * .5; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(m.x, m.y); x.stroke(); }
      }
    })();
  });

  /* Scroll-velocity marquee */
  safe(function () {
    var t = d.querySelector('.mt'); if (!t || reduce) return;
    var pos = 0, last = scrollY, vel = 0, dir = 1, hov = false;
    t.parentNode.addEventListener('pointerenter', function () { hov = true; }); t.parentNode.addEventListener('pointerleave', function () { hov = false; });
    (function f() {
      requestAnimationFrame(f);
      var dy = scrollY - last; last = scrollY; vel += (dy - vel) * .1; if (Math.abs(dy) > 1) dir = dy > 0 ? 1 : -1;
      pos -= dir * (hov ? .25 : 1.1 + Math.abs(vel) * .35); var half = t.scrollWidth / 2 + 32;
      pos = ((pos % half) - half) % half; t.style.transform = 'translate3d(' + pos + 'px,0,0)';
    })();
  });

  /* Scroll-reveal text: words brighten as the paragraph scrolls through view */
  safe(function () {
    if (reduce) return;
    var els = $$('.big,.two p'); els.forEach(function (el) {
      var t = el.textContent.trim(); el.setAttribute('aria-label', t); el.textContent = '';
      t.split(/\s+/).forEach(function (w) { var s = d.createElement('span'); s.className = 'sw'; s.setAttribute('aria-hidden', 'true'); s.textContent = w + ' '; el.appendChild(s); });
    });
    function up() { els.forEach(function (el) {
      var r = el.getBoundingClientRect(), p = (innerHeight * .88 - r.top) / (innerHeight * .5 + r.height * .6), ws = el.children, n = ws.length;
      p = Math.max(0, Math.min(1, p)) * (n + 3);
      for (var i = 0; i < n; i++) ws[i].style.opacity = Math.max(.2, Math.min(1, p - i));
    }); }
    addEventListener('scroll', up, { passive: true }); addEventListener('resize', up); up();
  });

  /* Decrypted hover text on nav links + dock magnification */
  safe(function () {
    var ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $$('.pill .nl').forEach(function (a) {
      var fin = a.textContent, busy = false;
      a.addEventListener('mouseenter', function () {
        if (busy || reduce) return; busy = true; var t0 = performance.now();
        (function f(now) { var p = Math.min(1, (now - t0) / 450), k = Math.floor(p * fin.length), o = '';
          for (var i = 0; i < fin.length; i++) o += i < k ? fin[i] : ch[Math.random() * ch.length | 0];
          a.textContent = o; if (p < 1) requestAnimationFrame(f); else busy = false; })(t0);
      });
    });
    var pill = d.querySelector('.pill'); if (!pill || !fine || reduce) return;
    pill.addEventListener('pointermove', function (e) { $$('.nl,.btn,.ib', pill).forEach(function (a) {
      var r = a.getBoundingClientRect(), dist = Math.abs(e.clientX - (r.left + r.width / 2)); a.style.scale = 1 + .16 * Math.max(0, 1 - dist / 110); }); });
    pill.addEventListener('pointerleave', function () { $$('.nl,.btn,.ib', pill).forEach(function (a) { a.style.scale = ''; }); });
  });

  /* Click spark */
  safe(function () {
    if (reduce || !fine) return;
    addEventListener('pointerdown', function (e) {
      for (var i = 0; i < 8; i++) {
        var s = d.createElement('i'), a = i / 8 * 6.283, r = 22 + Math.random() * 14;
        s.className = 'spark'; s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
        s.style.rotate = (a * 57.3 + 90) + 'deg'; s.style.setProperty('--dx', Math.cos(a) * r + 'px'); s.style.setProperty('--dy', Math.sin(a) * r + 'px');
        d.body.appendChild(s); setTimeout(function (n) { n.remove(); }, 650, s);
      }
    });
  });

  /* Fit the footer wordmark to its container so it can never be clipped */
  safe(function () {
    var w = d.querySelector('.wm'); if (!w) return;
    function fit() { w.style.fontSize = '100px'; var avail = w.parentNode.clientWidth, need = w.scrollWidth;
      w.style.fontSize = Math.min(Math.floor(100 * avail / need * .98), 224) + 'px'; }
    fit(); addEventListener('resize', fit); if (d.fonts && d.fonts.ready) d.fonts.ready.then(fit);
  });
})();
