/* PIYUSH TOMAR — GOTHIC LUXURY — style.js */

/* ---------- Interactive Dot Field ---------- */
function DotField(canvas, svg) {
  this.canvas = canvas;
  this.svg = svg;
  this.ctx = canvas.getContext('2d', { alpha: true });
  this.dots = [];
  this.mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
  this.size = { w: 0, h: 0 };
  this.glowOpacity = 0;
  this.engagement = 0;
  this.frameCount = 0;
  this.rafId = null;

  this.config = {
    dotRadius: 1.5,
    dotSpacing: 14,
    cursorRadius: 500,
    bulgeStrength: 67,
    glowRadius: 160,
    sparkle: true,
    waveAmplitude: 2,
    gradientFrom: 'rgba(197, 41, 58, 0.35)',
    gradientTo: 'rgba(199, 154, 87, 0.25)',
    glowColor: '#1A0810'
  };

  this.glowEl = null;
  this.init();
}

DotField.prototype.init = function() {
  var self = this;

  this.resize();

  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() { self.resize(); }, 100);
  });

  window.addEventListener('mousemove', function(e) {
    self.mouse.x = e.clientX;
    self.mouse.y = e.clientY;
  }, { passive: true });

  var speedInterval = setInterval(function() { self.updateMouseSpeed(); }, 20);

  this.animate();
};

DotField.prototype.resize = function() {
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = window.innerWidth;
  var h = window.innerHeight;
  this.canvas.width = w * dpr;
  this.canvas.height = h * dpr;
  this.canvas.style.width = w + 'px';
  this.canvas.style.height = h + 'px';
  this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  this.size.w = w;
  this.size.h = h;
  this.buildDots(w, h);
  this.buildGlow();
};

DotField.prototype.buildDots = function(w, h) {
  var p = this.config;
  var step = p.dotRadius + p.dotSpacing;
  var cols = Math.floor(w / step);
  var rows = Math.floor(h / step);
  var padX = (w % step) / 2;
  var padY = (h % step) / 2;
  this.dots = [];
  for (var row = 0; row < rows; row++) {
    for (var col = 0; col < cols; col++) {
      var ax = padX + col * step + step / 2;
      var ay = padY + row * step + step / 2;
      this.dots.push({ ax: ax, ay: ay, sx: ax, sy: ay, x: ax, y: ay });
    }
  }
};

DotField.prototype.buildGlow = function() {
  if (!this.svg) return;
  var p = this.config;
  var ns = 'http://www.w3.org/2000/svg';
  this.svg.setAttribute('viewBox', '0 0 ' + this.size.w + ' ' + this.size.h);

  this.svg.innerHTML = '';
  var defs = document.createElementNS(ns, 'defs');
  var gid = 'dot-field-glow';
  var grad = document.createElementNS(ns, 'radialGradient');
  grad.setAttribute('id', gid);
  grad.setAttribute('cx', '50%');
  grad.setAttribute('cy', '50%');
  grad.setAttribute('r', '50%');
  var stop1 = document.createElementNS(ns, 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', p.glowColor);
  stop1.setAttribute('stop-opacity', '0.6');
  var stop2 = document.createElementNS(ns, 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', p.glowColor);
  stop2.setAttribute('stop-opacity', '0');
  grad.appendChild(stop1);
  grad.appendChild(stop2);
  defs.appendChild(grad);
  this.svg.appendChild(defs);

  var glow = document.createElementNS(ns, 'circle');
  glow.setAttribute('r', p.glowRadius);
  glow.setAttribute('fill', 'url(#' + gid + ')');
  glow.style.opacity = '0';
  glow.style.transition = 'opacity 0.3s';
  this.svg.appendChild(glow);
  this.glowEl = glow;
};

DotField.prototype.updateMouseSpeed = function() {
  var m = this.mouse;
  var dx = m.prevX - m.x;
  var dy = m.prevY - m.y;
  var dist = Math.sqrt(dx * dx + dy * dy);
  m.speed += (dist - m.speed) * 0.5;
  if (m.speed < 0.001) m.speed = 0;
  m.prevX = m.x;
  m.prevY = m.y;
};

DotField.prototype.animate = function() {
  this.frameCount++;
  var ctx = this.ctx;
  var dots = this.dots;
  var m = this.mouse;
  var w = this.size.w;
  var h = this.size.h;
  var p = this.config;
  var len = dots.length;
  var t = this.frameCount * 0.02;
  var TWO_PI = Math.PI * 2;

  var targetEng = Math.min(m.speed / 5, 1);
  this.engagement += (targetEng - this.engagement) * 0.06;
  if (this.engagement < 0.001) this.engagement = 0;
  var eng = this.engagement;

  this.glowOpacity += (eng - this.glowOpacity) * 0.08;
  if (this.glowEl) {
    this.glowEl.setAttribute('cx', m.x);
    this.glowEl.setAttribute('cy', m.y);
    this.glowEl.style.opacity = this.glowOpacity;
  }

  ctx.clearRect(0, 0, w, h);

  var grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, p.gradientFrom);
  grad.addColorStop(1, p.gradientTo);
  ctx.fillStyle = grad;

  var cr = p.cursorRadius;
  var crSq = cr * cr;
  var rad = p.dotRadius / 2;

  ctx.beginPath();
  for (var i = 0; i < len; i++) {
    var d = dots[i];
    var dx = m.x - d.ax;
    var dy = m.y - d.ay;
    var distSq = dx * dx + dy * dy;

    if (distSq < crSq && eng > 0.01) {
      var dist = Math.sqrt(distSq);
      var tt = 1 - dist / cr;
      var push = tt * tt * p.bulgeStrength * eng;
      var angle = Math.atan2(dy, dx);
      d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
      d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
    } else {
      d.sx += (d.ax - d.sx) * 0.1;
      d.sy += (d.ay - d.sy) * 0.1;
    }

    var drawX = d.sx;
    var drawY = d.sy;

    if (p.waveAmplitude > 0) {
      drawY += Math.sin(d.ax * 0.03 + t) * p.waveAmplitude;
      drawX += Math.cos(d.ay * 0.03 + t * 0.7) * p.waveAmplitude * 0.5;
    }

    if (p.sparkle) {
      var hash = ((i * 2654435761) ^ (this.frameCount >> 3)) >>> 0;
      if ((hash % 100) < 3) {
        ctx.moveTo(drawX + rad * 1.8, drawY);
        ctx.arc(drawX, drawY, rad * 1.8, 0, TWO_PI);
      } else {
        ctx.moveTo(drawX + rad, drawY);
        ctx.arc(drawX, drawY, rad, 0, TWO_PI);
      }
    } else {
      ctx.moveTo(drawX + rad, drawY);
      ctx.arc(drawX, drawY, rad, 0, TWO_PI);
    }
  }
  ctx.fill();

  var self = this;
  this.rafId = requestAnimationFrame(function() { self.animate(); });
};

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', function() {
  // Loader
  var loader = document.getElementById('pageLoader');
  var bar = document.getElementById('loaderBar');
  var startTime = Date.now();
  var minLoad = 2200;
  var progress = 0;

  function tickLoader() {
    progress += Math.random() * 15;
    if (progress > 100) progress = 100;
    bar.style.width = progress + '%';
    if (progress < 100) {
      setTimeout(tickLoader, 200 + Math.random() * 300);
    }
  }
  tickLoader();

  function finish() {
    var elapsed = Date.now() - startTime;
    var remaining = Math.max(0, minLoad - elapsed);
    setTimeout(function() {
      loader.classList.add('done');
      setTimeout(function() {
        loader.style.display = 'none';
        var canvas = document.getElementById('dotFieldCanvas');
        var svg = document.getElementById('dotFieldGlow');
        if (canvas) new DotField(canvas, svg);
      }, 700);
    }, remaining);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(finish);
  } else {
    window.addEventListener('load', finish);
  }

  // Scroll progress line
  var scrollLine = document.getElementById('scrollLine');
  window.addEventListener('scroll', function() {
    var st = document.documentElement.scrollTop;
    var sh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var pct = sh > 0 ? st / sh : 0;
    if (scrollLine) scrollLine.style.transform = 'scaleX(' + pct + ')';
  }, { passive: true });

  // Nav scroll
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Mobile menu
  var toggle = document.getElementById('navToggle');
  var drawer = document.getElementById('navDrawer');
  toggle.addEventListener('click', function() {
    drawer.classList.toggle('open');
    toggle.classList.toggle('open');
  });
  drawer.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      drawer.classList.remove('open');
      toggle.classList.remove('open');
    });
  });

  // Reveal on scroll
  var revObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(function(el) {
    revObs.observe(el);
  });

  // Count up
  var cntObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        animCount(e.target);
        cntObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.metric-num, .card-num').forEach(function(el) {
    cntObs.observe(el);
  });

  function animCount(el) {
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    var dur = 1800;
    var start = null;
    function frame(ts) {
      if (!start) start = ts;
      var t = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - t, 4);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // FAQ
  var openFaq = null;
  document.querySelectorAll('.faq-q').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.faq-item');
      if (openFaq && openFaq !== item) openFaq.classList.remove('open');
      item.classList.toggle('open');
      openFaq = item.classList.contains('open') ? item : null;
    });
  });

  // Magnetic buttons
  document.querySelectorAll('.magnetic').forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.18) + 'px, ' + (y * 0.18) + 'px)';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.transform = '';
    });
  });

  // Custom cursor
  var cursor = document.getElementById('cursor');
  var ring = document.getElementById('cursorRing');
  var cx = 0, cy = 0, tx = 0, ty = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', function(e) {
    tx = e.clientX;
    ty = e.clientY;
  });
  function updateCursor() {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    rx += (tx - rx) * 0.1;
    ry += (ty - ry) * 0.1;
    cursor.style.transform = 'translate(' + (cx - 4) + 'px, ' + (cy - 4) + 'px)';
    ring.style.transform = 'translate(' + (rx - 16) + 'px, ' + (ry - 16) + 'px)';
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var t = document.querySelector(this.getAttribute('href'));
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Parallax orbs
  window.addEventListener('scroll', function() {
    var sy = window.scrollY;
    document.querySelectorAll('.ambient-orb').forEach(function(orb, i) {
      var speed = 0.02 + i * 0.01;
      orb.style.transform = 'translateY(' + (sy * speed) + 'px)';
    });
  }, { passive: true });
});

/* ---------- Form ---------- */
function submitForm(e) {
  e.preventDefault();
  var name = document.getElementById('cfName').value.trim();
  var email = document.getElementById('cfEmail').value.trim();
  var msg = document.getElementById('cfMsg').value.trim();
  if (!name || !email || !msg) return false;
  var subject = document.getElementById('cfSubject').value.trim() || 'Portfolio enquiry';
  var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + msg;
  document.getElementById('cfSuccess').classList.add('show');
  window.location.href = 'mailto:piyushtomar1222@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  return false;
}
