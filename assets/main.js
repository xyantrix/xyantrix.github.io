(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function safe(fn) { try { fn(); } catch (e) { /* one feature failing never breaks the rest */ } }

  /* Mobile menu */
  safe(function () {
    var b = $('#burger'), s = $('#sheet');
    function set(open) {
      b.classList.toggle('open', open);
      s.classList.toggle('open', open);
      b.setAttribute('aria-expanded', open);
      b.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    }
    b.addEventListener('click', function () { set(!s.classList.contains('open')); });
    $$('a', s).forEach(function (a) { a.addEventListener('click', function () { set(false); }); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    addEventListener('resize', function () { if (innerWidth > 820) set(false); });
  });

  /* Active section in the header nav */
  safe(function () {
    if (!('IntersectionObserver' in window)) return;
    var links = $$('.nav a');
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('on'); });
        if (map[e.target.id]) map[e.target.id].classList.add('on');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  });

  /* Contact form: opens the visitor's email app with the message filled in */
  safe(function () {
    var f = $('#cf'), ok = $('#ok');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { return $('#' + id).value.trim(); };
      var name = v('cn'), email = v('ce'), msg = v('cm');
      var email_ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !email_ok || !msg) {
        ok.textContent = 'Add your name, a valid email and a message, then send again.';
        ok.classList.add('show');
        (!name ? $('#cn') : !email_ok ? $('#ce') : $('#cm')).focus();
        return;
      }
      var subject = v('cs') || 'Portfolio enquiry';
      var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + msg;
      ok.textContent = 'Opening your email app with the message ready to send.';
      ok.classList.add('show');
      location.href = 'mailto:piyushtomar1222@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  });
})();
