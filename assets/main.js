/* ============================================================
   PIYUSH TOMAR — PORTFOLIO v3.0
   LaunchFolio-inspired interactions
   Theme system, scroll reveals, custom cursor, marquee, FAQ
   ============================================================ */

(function() {
  'use strict';

  /* ---------- THEME SYSTEM ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  /* ---------- LOADER ---------- */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('out'), 400);
    });
    setTimeout(() => loader.classList.add('out'), 3000);
  }

  /* ---------- NAV SCROLL STATE ---------- */
  const nav = document.getElementById('nav');
  if (nav) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('scrolled', window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- MOBILE MENU ---------- */
  const burger = document.getElementById('burger');
  const navMobile = document.getElementById('navMobile');

  if (burger && navMobile) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navMobile.classList.toggle('open');
      document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
    });

    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- SCROLL REVEAL ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    revealObserver.observe(el);
  });

  /* ---------- COUNT UP ---------- */
  function countUp(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

  /* ---------- CUSTOM CURSOR (dark mode only, desktop) ---------- */
  const isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
  if (!isTouch) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'custom-cursor-trail';
    document.body.appendChild(cursorTrail);

    let cx = 0, cy = 0, tx = 0, ty = 0, tx2 = 0, ty2 = 0;

    document.addEventListener('mousemove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });

    function updateCursor() {
      cx += (tx - cx) * 0.2;
      cy += (ty - cy) * 0.2;
      tx2 += (tx - tx2) * 0.1;
      ty2 += (ty - ty2) * 0.1;

      cursor.style.transform = 'translate(' + (cx - 4) + 'px,' + (cy - 4) + 'px)';
      cursorTrail.style.transform = 'translate(' + (tx2 - 16) + 'px,' + (ty2 - 16) + 'px)';

      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover effects
    const hoverTargets = document.querySelectorAll('a, button, .cap-card, .proj-card, .exp-card, .faq-q, .contact-link');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  /* ---------- CAP CARD SPOTLIGHT ---------- */
  document.querySelectorAll('.cap-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  /* ---------- FAQ ACCORDION ---------- */
  let openFaq = null;
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (openFaq && openFaq !== item) openFaq.classList.remove('open');
      item.classList.toggle('open');
      openFaq = item.classList.contains('open') ? item : null;
    });
  });

  /* ---------- CONTACT FORM ---------- */
  window.submitForm = function(e) {
    try {
      e.preventDefault();
      const name = document.getElementById('cfName').value.trim();
      const email = document.getElementById('cfEmail').value.trim();
      const msg = document.getElementById('cfMsg').value.trim();
      if (!name || !email || !msg) return false;

      const subject = document.getElementById('cfSubject').value.trim() || 'Portfolio enquiry';
      const body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + msg;

      document.getElementById('cfSuccess').classList.add('show');
      window.location.href = 'mailto:piyushtomar1222@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    } catch(err) {}
    return false;
  };

  /* ---------- MARQUEE SPEED ON SCROLL ---------- */
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    let lastScrollY = window.scrollY;
    let currentSpeed = 40;

    window.addEventListener('scroll', () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      const targetSpeed = Math.max(15, 40 - delta * 0.5);
      currentSpeed += (targetSpeed - currentSpeed) * 0.1;
      marqueeTrack.style.animationDuration = currentSpeed + 's';
      lastScrollY = window.scrollY;
    }, { passive: true });
  }

  /* ---------- PARALLAX ON HERO ORBS ---------- */
  const heroOrbs = document.querySelectorAll('.hero-grad-1, .hero-grad-2, .hero-grad-3');
  if (heroOrbs.length && !isTouch) {
    document.querySelector('.hero')?.addEventListener('mousemove', (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      heroOrbs.forEach((orb, i) => {
        const factor = (i + 1) * 6;
        orb.style.transform = 'translate(' + (x * factor) + 'px,' + (y * factor) + 'px)';
      });
    });
  }

  /* ---------- REDUCED MOTION ---------- */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.classList.add('revealed');
    });
  }

})();
