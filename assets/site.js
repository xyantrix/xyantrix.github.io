/* Piyush Tomar portfolio. One script. Every module is isolated so one failure never breaks the page. */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  function safe(f) { try { f(); } catch (e) { if (window.console) console.warn(e); } }
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var raf = function (f) { return requestAnimationFrame(f); };

  try { history.scrollRestoration = 'manual'; } catch (e) {} scrollTo(0, 0);

  /* ---------- Palette dock ---------- */
  safe(function () {
    var bg = d.createElement('div'); bg.className = 'bgm'; bg.setAttribute('aria-hidden', 'true');
    bg.innerHTML = '<i></i><i></i><i></i><i class="pg"></i>'; d.body.insertBefore(bg, d.body.firstChild);
    var pals = [['orchid', '#ff8fd0,#b392ff'], ['aqua', '#7be8ff,#5aa7ff'], ['ember', '#ff9a6b,#ff5d7a'], ['cobalt', '#7ea6ff,#5b6dff'], ['iris', '#aab6ff,#8b7bff'], ['emerald', '#6ee7b7,#2dd4a0']];
    var w = d.createElement('div'); w.className = 'pal'; w.setAttribute('role', 'group'); w.setAttribute('aria-label', 'Colour palette');
    var sw = d.createElement('div'); sw.className = 'sw';
    pals.forEach(function (p) {
      var b = d.createElement('button'); b.type = 'button'; b.dataset.p = p[0]; b.title = p[0];
      b.setAttribute('aria-label', p[0] + ' palette'); b.style.setProperty('--g2', 'linear-gradient(135deg,' + p[1] + ')'); sw.appendChild(b);
    });
    var tg = d.createElement('button'); tg.type = 'button'; tg.className = 'tg2'; tg.setAttribute('aria-label', 'Change colour palette'); tg.setAttribute('aria-expanded', 'false');
    w.appendChild(sw); w.appendChild(tg); d.body.appendChild(w);
    function set(p, save) {
      root.setAttribute('data-pal', p);
      $$('.sw button', w).forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.p === p); });
      if (save) try { localStorage.setItem('pal2', p); } catch (e) {}
    }
    set(root.getAttribute('data-pal') || 'orchid', false);
    tg.addEventListener('click', function () { var o = !w.classList.contains('open'); w.classList.toggle('open', o); tg.setAttribute('aria-expanded', o); });
    sw.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) set(b.dataset.p, true); });
    d.addEventListener('click', function (e) { if (!w.contains(e.target)) { w.classList.remove('open'); tg.setAttribute('aria-expanded', 'false'); } });
    function sc() { d.body.classList.toggle('pal-on', scrollY > 420); }
    addEventListener('scroll', sc, { passive: true }); sc();
  });

  /* ---------- Hero text: split into letters ---------- */
  var chars = [];
  safe(function () {
    $$('.h1 .ln').forEach(function (ln, li) {
      ln.style.setProperty('--i', li);
      var s = $('.li', ln), t = s.textContent, g = ln.classList.contains('g'); s.textContent = ''; s.setAttribute('aria-hidden', 'true');
      t.split('').forEach(function (c, i) {
        var b = d.createElement('b'); b.className = 'ch'; b.style.fontWeight = 'inherit';
        b.textContent = c === ' ' ? '\u00a0' : c; if (g) b.style.setProperty('--k', (i / Math.max(1, t.length - 1)).toFixed(2));
        s.appendChild(b); chars.push(b);
      });
    });
  });

  /* ---------- Loader + start ---------- */
  var main = $('#main');
  function begin() { root.classList.add('ready'); if (main) main.classList.add('go'); }
  safe(function () {
    var ld = $('#loader'); if (!ld) { begin(); return; }
    var seen = false; try { seen = sessionStorage.getItem('ld') === '1'; } catch (e) {}
    var quick = reduce; if (quick) ld.classList.add('fast');
    var dur = quick ? 500 : 3000, t0 = performance.now(), num = $('#ldn'), bar = $('.ld-bar i', ld);
    (function tick(now) {
      var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 2.4);
      num.textContent = Math.round(e * 100); bar.style.width = (e * 100) + '%';
      if (p < 1) return raf(tick);
      setTimeout(function () {
        ld.classList.add('out'); begin();
        try { sessionStorage.setItem('ld', '1'); } catch (e) {}
        setTimeout(function () { ld.style.display = 'none'; }, 1200);
      }, 250);
    })(t0);
  });

  /* ---------- Section headings: word reveal ---------- */
  safe(function () {
    var io = 'IntersectionObserver' in window && new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('sp-in'); io.unobserve(x.target); } });
    }, { threshold: .25 });
    $$('h2:not(.cta-h)').forEach(function (h) {
      var t = h.textContent.trim(); h.setAttribute('aria-label', t); h.textContent = '';
      t.split(/\s+/).forEach(function (w, i) {
        var s = d.createElement('span'), n = d.createElement('i');
        s.className = 'wd'; s.setAttribute('aria-hidden', 'true'); n.style.setProperty('--i', i); n.textContent = w; s.appendChild(n);
        h.appendChild(s); h.appendChild(d.createTextNode(' '));
      });
      io ? io.observe(h) : h.classList.add('sp-in');
    });
  });

  /* ---------- Eyebrow label scramble ---------- */
  safe(function () {
    if (reduce || !('IntersectionObserver' in window)) return;
    var cs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', io = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (!x.isIntersecting) return; io.unobserve(x.target);
        var el = x.target, fin = el.dataset.t, t0 = performance.now();
        (function f(now) {
          var p = Math.min(1, (now - t0) / 700), k = Math.floor(p * fin.length), o = '';
          for (var i = 0; i < fin.length; i++) o += i < k || fin[i] === ' ' ? fin[i] : cs[Math.random() * cs.length | 0];
          el.textContent = o; if (p < 1) raf(f);
        })(t0);
      });
    }, { threshold: 1 });
    $$('.eyebrow span').forEach(function (e) { e.dataset.t = e.textContent.trim(); io.observe(e); });
  });

  /* ---------- Reveal on scroll (with staggering and a safety net) ---------- */
  safe(function () {
    $$('[data-stagger]').forEach(function (c) {
      var n = 0; Array.prototype.forEach.call(c.children, function (k) { if (k.classList.contains('rv')) k.style.setProperty('--d', (n++ * 90) + 'ms'); });
    });
    var els = $$('.rv');
    function show(e) { e.classList.add('in'); setTimeout(function () { e.classList.add('dn'); e.style.removeProperty('--d'); }, 1700); }
    if (!('IntersectionObserver' in window)) { els.forEach(show); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { show(x.target); io.unobserve(x.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: .06 });
    els.forEach(function (e) { io.observe(e); });
    setTimeout(function () { els.forEach(function (e) { if (!e.classList.contains('in') && e.getBoundingClientRect().top < innerHeight) show(e); }); }, 5000);
  });

  /* ---------- Count-up numbers (start when seen, always end on the exact value) ---------- */
  safe(function () {
    var els = $$('[data-count]');
    function run(el) {
      var to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
      if (reduce) { el.textContent = to + suf; return; }
      (function s(now) {
        var p = Math.min(1, (now - t0) / 1600), e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = Math.round(to * e) + suf; if (p < 1) raf(s);
      })(t0);
    }
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { io.unobserve(x.target); run(x.target); } });
    }, { threshold: .5 });
    els.forEach(function (e) { e.setAttribute('aria-label', e.textContent); io.observe(e); });
  });

  /* ---------- Nav: menu, active link, progress, scrolled state ---------- */
  safe(function () {
    var b = $('#burger'), s = $('#sheet');
    function set(o) {
      if (!b || !s) return;
      b.setAttribute('aria-expanded', o); b.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
      s.classList.toggle('open', o); d.body.classList.toggle('menu', o); d.body.style.overflow = o ? 'hidden' : '';
    }
    if (b && s) {
      b.addEventListener('click', function () { set(!s.classList.contains('open')); });
      $$('a', s).forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
      addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
      addEventListener('resize', function () { if (innerWidth > 900) set(false); });
    }
    var links = $$('.nl'), prog = $('.prog'), nav = $('.nav'), map = {}, tick = false;
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var ids = Object.keys(map);
    function upd() {
      tick = false; var a = '';
      ids.forEach(function (id) { var e = d.getElementById(id); if (e && e.getBoundingClientRect().top < innerHeight * .45) a = id; });
      var c = d.getElementById('contact'); if (c && c.getBoundingClientRect().top < innerHeight * .45) a = '';
      links.forEach(function (l) { l.classList.toggle('on', l === map[a]); });
      var m = root.scrollHeight - innerHeight;
      if (prog) prog.style.width = (m > 0 ? Math.min(100, scrollY / m * 100) : 0) + '%';
      if (nav) nav.classList.toggle('scrolled', scrollY > 24);
    }
    addEventListener('scroll', function () { if (!tick) { tick = true; raf(upd); } }, { passive: true }); upd();
    if (fine && !reduce) {
      var cs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      links.forEach(function (a) {
        var fin = a.textContent, busy = false;
        a.addEventListener('mouseenter', function () {
          if (busy) return; busy = true; var t0 = performance.now();
          (function f(now) {
            var p = Math.min(1, (now - t0) / 420), k = Math.floor(p * fin.length), o = '';
            for (var i = 0; i < fin.length; i++) o += i < k ? fin[i] : cs[Math.random() * cs.length | 0];
            a.textContent = o; if (p < 1) raf(f); else { a.textContent = fin; busy = false; }
          })(t0);
        });
      });
    }
  });

  /* ---------- Infinite, swipeable strips (never reach an end, resume after a swipe) ---------- */
  function strip(box, speed, boost) {
    var track = box.firstElementChild, set = track && track.firstElementChild; if (!set) return;
    if (reduce) { return; } /* reduced motion: stays a normal horizontally scrollable strip */
    box.classList.add('live');
    var w = 0, x = 0, vel = -speed, drag = false, lx = 0, lt = 0, vis = true, hov = false, last = performance.now(), sv = 0, ly = scrollY;
    function build() {
      $$('.dup', track).forEach(function (n) { n.remove(); });
      w = set.getBoundingClientRect().width; if (!w) return;
      var need = Math.ceil(box.clientWidth / w) + 1;
      for (var i = 0; i < need; i++) { var c = set.cloneNode(true); c.className += ' dup'; c.setAttribute('aria-hidden', 'true'); $$('img', c).forEach(function (m) { m.alt = ''; m.loading = 'eager'; }); track.appendChild(c); }
    }
    build(); addEventListener('resize', build); if (d.fonts && d.fonts.ready) d.fonts.ready.then(build);
    $$('img', set).forEach(function (m) { if (!m.complete) m.addEventListener('load', build); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }).observe(box);
    if (fine) { box.addEventListener('pointerenter', function () { hov = true; }); box.addEventListener('pointerleave', function () { hov = false; }); }
    box.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag = true; lx = e.clientX; lt = performance.now(); box.classList.add('drag'); try { box.setPointerCapture(e.pointerId); } catch (z) {}
    });
    box.addEventListener('pointermove', function (e) {
      if (!drag) return; var n = performance.now(), dx = e.clientX - lx, dt = Math.max(1, n - lt);
      x += dx; vel = vel * .6 + (dx / dt * 1000) * .4; lx = e.clientX; lt = n;
    });
    function up() { if (!drag) return; drag = false; box.classList.remove('drag'); }
    box.addEventListener('pointerup', up); box.addEventListener('pointercancel', up); box.addEventListener('lostpointercapture', up);
    box.addEventListener('wheel', function (e) { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { x -= e.deltaX; e.preventDefault(); } }, { passive: false });
    (function f(now) {
      raf(f); var dt = Math.min(.05, (now - last) / 1000); last = now;
      if (!vis || !w) return;
      var dy = scrollY - ly; ly = scrollY; sv += (Math.abs(dy) - sv) * .1;
      if (!drag) {
        var tgt = -speed * (hov ? .25 : 1) * (boost ? 1 + Math.min(sv * .08, 3) : 1);
        vel += (tgt - vel) * (1 - Math.exp(-dt * 2.4)); x += vel * dt;
      }
      while (x <= -w) x += w; while (x > 0) x -= w;
      track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
    })(last);
  }
  safe(function () { var m = $('.mq'); if (m) strip(m, 70, true); });
  safe(function () { var m = $('.lm'); if (m) strip(m, 46, false); });

  /* ---------- Pointer effects: spotlight, tilt, magnetic, hero glow, proximity letters ---------- */
  safe(function () {
    if (!fine) return;
    var pend = null, spotRaf = 0;
    d.addEventListener('pointermove', function (e) {
      pend = e; if (spotRaf) return;
      spotRaf = raf(function () {
        spotRaf = 0; var t = pend.target; if (!t || !t.closest) return;
        var c = t.closest('.spot');
        if (c) {
          var r = c.getBoundingClientRect(), x = pend.clientX - r.left, y = pend.clientY - r.top;
          c.style.setProperty('--mx', x + 'px'); c.style.setProperty('--my', y + 'px');
          if (c.hasAttribute('data-tilt') && !reduce && c.classList.contains('in'))
            c.style.transform = 'perspective(900px) rotateX(' + ((.5 - y / r.height) * 6) + 'deg) rotateY(' + ((x / r.width - .5) * 8) + 'deg)';
        }
      });
    }, { passive: true });
    $$('[data-tilt]').forEach(function (c) { c.addEventListener('pointerleave', function () { c.style.transform = ''; }); });
    if (!reduce) $$('.btn,.brand,.ib').forEach(function (b) {
      b.addEventListener('pointermove', function (e) { var r = b.getBoundingClientRect(); b.style.translate = ((e.clientX - r.left - r.width / 2) * .22) + 'px ' + ((e.clientY - r.top - r.height / 2) * .3) + 'px'; });
      b.addEventListener('pointerleave', function () { b.style.translate = ''; });
    });
    var hero = $('.hero'); if (!hero) return;
    var pt = null, r0 = 0, bg = $('.bgm .pg');
    function frame() {
      r0 = 0; if (!pt) return; var hr = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (pt.x - hr.left) + 'px'); hero.style.setProperty('--my', (pt.y - hr.top) + 'px');
      if (!reduce) chars.forEach(function (c) {
        var r = c.getBoundingClientRect(), dx = pt.x - (r.left + r.width / 2), dy = pt.y - (r.top + r.height / 2);
        var p = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 160); c.style.setProperty('--p', (p * p).toFixed(3));
      });
    }
    hero.addEventListener('pointermove', function (e) { pt = { x: e.clientX, y: e.clientY }; if (!r0) r0 = raf(frame); });
    hero.addEventListener('pointerleave', function () { pt = null; chars.forEach(function (c) { c.style.setProperty('--p', 0); }); });
    if (bg && !reduce) {
      var gx = innerWidth / 2, gy = innerHeight / 3, x = gx, y = gy; bg.parentNode.classList.add('pg-on');
      addEventListener('pointermove', function (e) { x = e.clientX - 260; y = e.clientY - 260; }, { passive: true });
      (function f() { gx += (x - gx) * .08; gy += (y - gy) * .08; bg.style.transform = 'translate(' + gx + 'px,' + gy + 'px)'; raf(f); })();
    }
  });

  /* ---------- Custom cursor + click spark ---------- */
  safe(function () {
    if (!fine || reduce) return;
    var c = d.createElement('div'); c.className = 'cur'; c.setAttribute('aria-hidden', 'true'); c.innerHTML = '<b></b><i></i>'; d.body.appendChild(c);
    var ring = c.firstChild, dot = c.lastChild, x = 0, y = 0, rx = 0, ry = 0; root.classList.add('lx-cur');
    addEventListener('pointermove', function (e) {
      x = e.clientX; y = e.clientY; c.classList.add('on');
      var t = e.target.closest ? e.target : e.target.parentNode;
      c.classList.toggle('hv', !!t.closest('a,button,summary,[role=button],.live'));
      c.classList.toggle('tx', !!t.closest('input,textarea'));
      var lab = t.closest('.bc') ? 'View' : ''; if (ring.textContent !== lab) ring.textContent = lab; c.classList.toggle('lb', !!lab);
    }, { passive: true });
    d.addEventListener('mouseleave', function () { c.classList.remove('on'); });
    (function loop() { rx += (x - rx) * .17; ry += (y - ry) * .17; ring.style.translate = rx + 'px ' + ry + 'px'; dot.style.translate = x + 'px ' + y + 'px'; raf(loop); })();
    addEventListener('pointerdown', function (e) {
      for (var i = 0; i < 8; i++) {
        var s = d.createElement('i'), a = i / 8 * 6.283, r = 22 + Math.random() * 14;
        s.className = 'spark'; s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px'; s.style.rotate = (a * 57.3 + 90) + 'deg';
        s.style.setProperty('--dx', Math.cos(a) * r + 'px'); s.style.setProperty('--dy', Math.sin(a) * r + 'px');
        d.body.appendChild(s); setTimeout(function (n) { n.remove(); }, 650, s);
      }
    });
  });

  /* ---------- Ledger: run once visible, scrub in with scroll ---------- */
  safe(function () {
    var l = $('.ledger'), st = $('.stage2'); if (!l) return;
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { l.classList.add('run'); io.disconnect(); } }, { threshold: .45 });
      io.observe(l);
    } else l.classList.add('run');
    if (reduce || !st) return;
    var t = false;
    function up() { t = false; var r = st.getBoundingClientRect(); st.style.setProperty('--p', Math.max(0, Math.min(1, (innerHeight - r.top) / (innerHeight * .7))).toFixed(3)); }
    st.style.setProperty('--p', 0);
    addEventListener('scroll', function () { if (!t) { t = true; raf(up); } }, { passive: true }); addEventListener('resize', up); up();
  });

  /* ---------- Local clock ---------- */
  safe(function () {
    var c = d.getElementById('clock'); if (!c) return;
    (function t() { c.textContent = new Intl.DateTimeFormat('en-IN', { timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(new Date()).toUpperCase() + ' IST · Local time'; setTimeout(t, 30000); })();
  });

  /* ---------- Footer wordmark: draw on view, glow follows pointer ---------- */
  safe(function () {
    var w = $('.wms'); if (w) {
      if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { w.classList.add('in'); io.disconnect(); } }, { threshold: .35 }); io.observe(w); } else w.classList.add('in');
      var g = $('#wrg'); w.addEventListener('pointermove', function (e) { var r = w.getBoundingClientRect(); g.setAttribute('cx', (e.clientX - r.left) / r.width * 1000); g.setAttribute('cy', (e.clientY - r.top) / r.height * 230); });
    }
    var y = $('#yr'); if (y) y.textContent = new Date().getFullYear();
  });

  /* ---------- Contact form: opens the visitor's email app with the message filled in ---------- */
  safe(function () {
    var f = $('#cf'), ok = $('#ok'); if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { return $('#' + id).value.trim(); };
      var name = v('cn'), email = v('ce'), msg = v('cm'), good = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !good || !msg) {
        ok.textContent = 'Add your name, a valid email and a message, then send again.'; ok.classList.add('show');
        (!name ? $('#cn') : !good ? $('#ce') : $('#cm')).focus(); return;
      }
      var subject = v('cs') || 'Portfolio enquiry';
      ok.textContent = 'Opening your email app with the message ready to send.'; ok.classList.add('show');
      location.href = 'mailto:piyushtomar1222@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + msg);
    });
  });

  /* ---------- Vault gate (client-side only: obscurity, not real authentication) ---------- */
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
})();
