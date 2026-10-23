(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(pointer: fine)').matches;
  function safe(fn) { try { fn(); } catch (e) { /* one effect failing never breaks the site */ } }

  /* Start: reveals the hero once the loader is gone */
  function start() {
    if (root.classList.contains('ready')) return;
    root.classList.add('ready');
    setTimeout(function () { var l = $('#loader'); if (l) l.remove(); }, 1300);
  }

  /* Loader: counts 0 to 100, then the curtain lifts */
  safe(function () {
    var l = $('#loader');
    if (!l) { start(); return; }
    var n = $('.ld-num', l), bar = $('.ld-bar i', l), t0 = performance.now(), dur = reduce ? 150 : 1600;
    function tick(t) {
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      n.textContent = Math.round(e * 100);
      bar.style.transform = 'scaleX(' + e + ')';
      if (p < 1) requestAnimationFrame(tick);
      else { l.classList.add('done'); setTimeout(start, 250); }
    }
    requestAnimationFrame(tick);
    setTimeout(function () { l.classList.add('done'); start(); }, 4500);
  });

  /* Marquee: duplicate the track for a seamless loop */
  safe(function () {
    var tr = $('.marquee-track');
    if (tr) { tr.innerHTML += tr.innerHTML; }
  });

  /* Scroll reveal with per-group stagger */
  safe(function () {
    var sel = '.sec-label,.sec h2,.about-lead,.about-cols p,.dl>div,.portrait,.job,.cell,.tool,.faq details,.contact>*,.fig,.tools-note,.marquee,.cred-col,.fbase,.fcol';
    var els = $$(sel);
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        io.unobserve(el);
        el.classList.add('in');
        /* hand control back to normal hover transitions once the reveal is done */
        setTimeout(function () { el.removeAttribute('data-rv'); el.classList.remove('in'); el.style.removeProperty('--d'); }, 1700);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) {
      var i = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.setAttribute('data-rv', '');
      el.style.setProperty('--d', Math.min(i, 6) * 80 + 'ms');
      io.observe(el);
    });
  });

  /* Count-up numbers */
  safe(function () {
    $$('.fig b').forEach(function (b) {
      var m = b.textContent.match(/^(\d+)(.*)$/);
      if (!m || !('IntersectionObserver' in window)) return;
      var end = +m[1], suf = m[2];
      b.textContent = '0' + suf;
      var io = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        var t0 = performance.now();
        (function f(t) {
          var p = Math.min(1, (t - t0) / 1800), e = 1 - Math.pow(1 - p, 4);
          b.textContent = Math.round(end * e) + suf;
          if (p < 1) requestAnimationFrame(f);
        })(t0);
      }, { threshold: 0.6 });
      io.observe(b);
    });
  });

  /* Scroll progress bar, header state, aurora parallax */
  safe(function () {
    var bar = d.createElement('div'); bar.className = 'prog'; d.body.appendChild(bar);
    var top = $('#top-bar'), au = $('.aurora'), ticking = false;
    function upd() {
      var h = root.scrollHeight - innerHeight, y = scrollY;
      bar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
      if (top) top.classList.toggle('sc', y > 24);
      if (au && !reduce && y < innerHeight * 1.5) au.style.transform = 'translate3d(0,' + (y * 0.25) + 'px,0)';
      ticking = false;
    }
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  });

  /* Card spotlight + cursor glow + magnetic buttons (mouse devices only) */
  safe(function () {
    if (!fine || reduce) return;
    var g = d.createElement('div'); g.className = 'cglow'; d.body.appendChild(g);
    var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    function loop() {
      cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14;
      g.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
      raf = (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5) ? requestAnimationFrame(loop) : 0;
    }
    d.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY; g.classList.add('on');
      if (!raf) raf = requestAnimationFrame(loop);
      var c = e.target.closest && e.target.closest('.cell,.job');
      if (c) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        c.style.setProperty('--my', (e.clientY - r.top) + 'px');
      }
    }, { passive: true });
    d.addEventListener('pointerleave', function () { g.classList.remove('on'); });

    $$('.btn,.top-cta').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.22) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.35) + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  });
})();
