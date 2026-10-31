(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  function safe(fn) { try { fn(); } catch (e) {} }
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Theme (remembered) */
  safe(function () {
    var saved = null; try { saved = localStorage.getItem('theme'); } catch (e) {}
    if (saved) root.setAttribute('data-theme', saved);
    $$('[data-theme-toggle]').forEach(function (b) {
      b.addEventListener('click', function () {
        var n = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', n);
        try { localStorage.setItem('theme', n); } catch (e) {}
      });
    });
  });

  /* Loader + hero start */
  var main = $('#main');
  function begin() {
    root.classList.add('ready');
    if (main) main.classList.add('go');
    setTimeout(figures, 400);
  }
  safe(function () {
    var ld = $('#loader');
    if (!ld) { begin(); return; }
    var seen = false; try { seen = sessionStorage.getItem('ld') === '1'; } catch (e) {}
    var dur = (seen || reduce) ? 500 : 3700, t0 = performance.now();
    var num = $('.n', ld), bar = $('.bar', ld);
    (function tick(now) {
      var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 2.2);
      num.textContent = Math.round(e * 100); bar.style.width = (e * 100) + '%';
      if (p < 1) return requestAnimationFrame(tick);
      setTimeout(function () {
        ld.classList.add('out'); begin();
        try { sessionStorage.setItem('ld', '1'); } catch (e) {}
        setTimeout(function () { ld.remove(); }, 1300);
      }, 250);
    })(t0);
  });

  /* Count-up figures */
  function figures() {
    safe(function () {
      $$('[data-count]').forEach(function (el) {
        var to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
        if (reduce) { el.textContent = to + suf; return; }
        (function s(now) {
          var p = Math.min(1, (now - t0) / 1500), e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(to * e) + suf;
          if (p < 1) requestAnimationFrame(s);
        })(t0);
      });
    });
  }

  /* Scroll reveal */
  safe(function () {
    var els = $$('.rv');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    els.forEach(function (e) { io.observe(e); });
  });

  /* Mobile menu */
  safe(function () {
    var b = $('#burger'), s = $('#sheet'); if (!b || !s) return;
    function set(o) {
      b.setAttribute('aria-expanded', o); b.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
      s.classList.toggle('open', o); d.body.style.overflow = o ? 'hidden' : '';
    }
    b.addEventListener('click', function () { set(!s.classList.contains('open')); });
    $$('a', s).forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    addEventListener('resize', function () { if (innerWidth > 900) set(false); });
  });

  /* Active nav + scroll progress */
  safe(function () {
    var links = $$('.nl'), prog = $('.prog'), map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var ids = Object.keys(map);
    function upd() {
      var a = '';
      ids.forEach(function (id) { var e = d.getElementById(id); if (e && e.getBoundingClientRect().top < innerHeight * .45) a = id; });
      var c = d.getElementById('contact'); if (c && c.getBoundingClientRect().top < innerHeight * .45) a = '';
      links.forEach(function (l) { l.classList.toggle('on', l === map[a]); });
      var m = root.scrollHeight - innerHeight;
      if (prog) prog.style.width = (m > 0 ? Math.min(100, scrollY / m * 100) : 0) + '%';
    }
    addEventListener('scroll', upd, { passive: true }); upd();
  });

  /* Contact form: opens the visitor's email app with the message filled in */
  safe(function () {
    var f = $('#cf'), ok = $('#ok'); if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { return $('#' + id).value.trim(); };
      var name = v('cn'), email = v('ce'), msg = v('cm');
      var good = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !good || !msg) {
        ok.textContent = 'Add your name, a valid email and a message, then send again.'; ok.classList.add('show');
        (!name ? $('#cn') : !good ? $('#ce') : $('#cm')).focus(); return;
      }
      var subject = v('cs') || 'Portfolio enquiry';
      ok.textContent = 'Opening your email app with the message ready to send.'; ok.classList.add('show');
      location.href = 'mailto:piyushtomar1222@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + msg);
    });
  });

  /* Vault gate (client-side only: obscurity, not real authentication) */
  safe(function () {
    var form = $('#gateForm'); if (!form) return;
    var VALID_USER = 'piyushtomar1222@gmail.com', VALID_PASS = 'PIYUSH11';
    var gate = $('#gate'), vault = $('#vaultContent'), err = $('#gateError');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var u = $('#gateUser').value.trim().toLowerCase(), p = $('#gatePass').value;
      if (u === VALID_USER && p === VALID_PASS) {
        gate.classList.add('hide'); vault.classList.add('show');
        var h = vault.querySelector('h1'); h.setAttribute('tabindex', '-1'); h.focus();
      } else { err.classList.remove('show'); void err.offsetWidth; err.classList.add('show'); }
    });
  });
  /* Pointer-reactive hero: spotlight, logo parallax, letter proximity, footer wordmark glow */
  safe(function () {
    if (reduce || !window.matchMedia('(hover:hover)').matches) return;
    var hero = $('.hero'), chars = $$('.ch'), wm = $('.wm'), raf = 0, pt = null;
    function frame() {
      raf = 0; if (!pt) return;
      var hr = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (pt.x - hr.left) + 'px'); hero.style.setProperty('--my', (pt.y - hr.top) + 'px');
      hero.style.setProperty('--px', ((pt.x / innerWidth) - .5).toFixed(3)); hero.style.setProperty('--py', ((pt.y / innerHeight) - .5).toFixed(3));
      chars.forEach(function (c) {
        var r = c.getBoundingClientRect(), dx = pt.x - (r.left + r.width / 2), dy = pt.y - (r.top + r.height / 2);
        var p = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 170); c.style.setProperty('--p', (p * p).toFixed(3));
      });
    }
    function reset() { pt = null; chars.forEach(function (c) { c.style.setProperty('--p', 0); }); hero.style.setProperty('--px', 0); hero.style.setProperty('--py', 0); }
    if (hero) {
      hero.addEventListener('pointermove', function (e) { pt = { x: e.clientX, y: e.clientY }; if (!raf) raf = requestAnimationFrame(frame); });
      hero.addEventListener('pointerleave', reset);
    }
    if (wm) {
      wm.addEventListener('pointermove', function (e) { var r = wm.getBoundingClientRect(); wm.style.setProperty('--mx', (e.clientX - r.left) + 'px'); wm.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
      wm.addEventListener('pointerleave', function () { wm.style.setProperty('--mx', '-40%'); });
    }
  });
})();
