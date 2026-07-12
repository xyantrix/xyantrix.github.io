/* ============================================================
   PIYUSH TOMAR — LUXURY GOLD EDITION v2
   ReactBits-style dot grid + silk aurora on single canvas.
   Fixed cursor with proper lerp. All features isolated in try/catch.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function(){

  /* ---------- LOADER ---------- */
  (function(){
    var el = document.getElementById('loader');
    if(!el) return;
    var done = false;
    function finish(){ if(done) return; done = true; el.classList.add('out'); setTimeout(function(){ el.style.display = 'none'; }, 700); }
    setTimeout(finish, 2600);
    setTimeout(finish, 4200);
  })();

  /* ---------- HERO CANVAS: SILK AURORA + DOT GRID ---------- */
  try{
    var canvas = document.getElementById('heroCanvas');
    var hero = document.querySelector('.hero');
    if(!canvas || !canvas.getContext || !hero) throw 'no canvas';

    var ctx = canvas.getContext('2d');
    var w, h, dots = [];
    var mouse = { x: -9999, y: -9999, active: false };
    var spacing = 30;
    var heroActive = true;
    var t = 0;

    // Silk aurora config (ReactBits params)
    var silkScale = 0.4;
    var silkSpeed = 6;
    var silkRotation = 4.4;
    var silkNoise = 1.5;

    function resize(){
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = hero.offsetWidth * dpr;
      h = canvas.height = hero.offsetHeight * dpr;
      canvas.style.width = hero.offsetWidth + 'px';
      canvas.style.height = hero.offsetHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
    }

    function buildDots(){
      dots = [];
      var sw = hero.offsetWidth, sh = hero.offsetHeight;
      var cols = Math.ceil(sw / spacing) + 2;
      var rows = Math.ceil(sh / spacing) + 2;
      for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
          dots.push({
            bx: i * spacing - spacing * 0.5,
            by: j * spacing - spacing * 0.5,
            x: i * spacing - spacing * 0.5,
            y: j * spacing - spacing * 0.5,
            size: 1.3,
            ts: 1.3,
            alpha: 0.1,
            ta: 0.1,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    }

    resize();
    window.addEventListener('resize', resize);

    hero.addEventListener('mousemove', function(e){
      var rect = hero.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });
    hero.addEventListener('mouseleave', function(){ mouse.active = false; });

    if('IntersectionObserver' in window){
      new IntersectionObserver(function(entries){ heroActive = entries[0].isIntersecting; }, {threshold:0.01}).observe(hero);
    }

    // ---- SILK AURORA (ReactBits-style) ----
    function drawSilk(time){
      var now = time * 0.001;
      var speed = silkSpeed;
      var cosR = Math.cos(silkRotation);
      var sinR = Math.sin(silkRotation);

      ctx.save();
      ctx.translate(hero.offsetWidth / 2, hero.offsetHeight / 2);
      ctx.rotate(silkRotation);
      ctx.translate(-hero.offsetWidth / 2, -hero.offsetHeight / 2);

      // Layer 1: Large warm gold flow
      var cx1 = hero.offsetWidth * (0.5 + 0.3 * Math.sin(now * speed * 0.018));
      var cy1 = hero.offsetHeight * (0.4 + 0.2 * Math.cos(now * speed * 0.014));
      var g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, Math.max(hero.offsetWidth, hero.offsetHeight) * 0.65);
      g1.addColorStop(0, 'rgba(201, 162, 39, 0.065)');
      g1.addColorStop(0.5, 'rgba(184, 148, 31, 0.025)');
      g1.addColorStop(1, 'rgba(201, 162, 39, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(-hero.offsetWidth, -hero.offsetHeight, hero.offsetWidth * 3, hero.offsetHeight * 3);

      // Layer 2: Champagne flow
      var cx2 = hero.offsetWidth * (0.3 + 0.4 * Math.cos(now * speed * 0.016));
      var cy2 = hero.offsetHeight * (0.6 + 0.3 * Math.sin(now * speed * 0.02));
      var g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, Math.max(hero.offsetWidth, hero.offsetHeight) * 0.55);
      g2.addColorStop(0, 'rgba(232, 213, 163, 0.045)');
      g2.addColorStop(1, 'rgba(232, 213, 163, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(-hero.offsetWidth, -hero.offsetHeight, hero.offsetWidth * 3, hero.offsetHeight * 3);

      // Layer 3: Bronze accent
      var cx3 = hero.offsetWidth * (0.7 + 0.2 * Math.sin(now * speed * 0.022 + 2));
      var cy3 = hero.offsetHeight * (0.3 + 0.2 * Math.cos(now * speed * 0.017 + 1));
      var g3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, Math.max(hero.offsetWidth, hero.offsetHeight) * 0.45);
      g3.addColorStop(0, 'rgba(139, 105, 20, 0.055)');
      g3.addColorStop(1, 'rgba(139, 105, 20, 0)');
      ctx.fillStyle = g3;
      ctx.fillRect(-hero.offsetWidth, -hero.offsetHeight, hero.offsetWidth * 3, hero.offsetHeight * 3);

      // Flowing silk lines
      ctx.strokeStyle = 'rgba(201, 162, 39, 0.025)';
      ctx.lineWidth = 1.5;
      for(var i = -8; i < 18; i++){
        ctx.beginPath();
        var baseY = i * hero.offsetHeight / 12;
        for(var x = 0; x < hero.offsetWidth; x += 8){
          var y = baseY + Math.sin(x * 0.008 + now * speed * 0.012) * 40 + Math.sin(x * 0.003 + now * speed * 0.008) * 80;
          if(x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.restore();
    }

    // ---- DOT GRID (ReactBits-style) ----
    function drawDots(){
      var radius = 170;
      var mx = mouse.active ? mouse.x : -9999;
      var my = mouse.active ? mouse.y : -9999;

      for(var i = 0; i < dots.length; i++){
        var d = dots[i];
        var dx = d.bx - mx;
        var dy = d.by - my;
        var dist = Math.sqrt(dx * dx + dy * dy);

        // Idle drift
        var driftX = Math.sin(t * 0.5 + d.phase) * 0.3;
        var driftY = Math.cos(t * 0.4 + d.phase * 1.2) * 0.3;

        if(dist < radius && mouse.active){
          var force = 1 - dist / radius;
          var ease = 0.12;
          d.x += (d.bx - dx * force * 0.3 + driftX - d.x) * ease;
          d.y += (d.by - dy * force * 0.3 + driftY - d.y) * ease;
          d.ts = 1.3 + force * 3.8;
          d.ta = 0.08 + force * 0.82;
        } else {
          d.x += (d.bx + driftX - d.x) * 0.07;
          d.y += (d.by + driftY - d.y) * 0.07;
          d.ts = 1.3;
          d.ta = 0.08 + Math.sin(t * 0.8 + d.phase) * 0.04;
        }

        d.size += (d.ts - d.size) * 0.1;
        d.alpha += (d.ta - d.alpha) * 0.08;

        var a = d.alpha;
        var s = d.size;

        // Color: gray at rest → gold when active
        var r, g, b;
        if(a > 0.4){
          var mix = (a - 0.4) / 0.6;
          r = Math.round(180 + (201 - 180) * mix);
          g = Math.round(180 + (162 - 180) * mix);
          b = Math.round(180 + (39 - 180) * mix);
        } else {
          var mix = a / 0.4;
          r = Math.round(120 + (180 - 120) * mix);
          g = Math.round(120 + (180 - 120) * mix);
          b = Math.round(120 + (180 - 120) * mix);
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, s, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        ctx.fill();

        // Soft glow for bright dots
        if(a > 0.5 && s > 2.5){
          ctx.beginPath();
          ctx.arc(d.x, d.y, s * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (a * 0.1) + ')';
          ctx.fill();
        }
      }
    }

    function loop(time){
      requestAnimationFrame(loop);
      if(!heroActive) return;
      t = time * 0.001;
      ctx.clearRect(0, 0, hero.offsetWidth, hero.offsetHeight);
      drawSilk(time);
      drawDots();
    }
    requestAnimationFrame(loop);

  } catch(e){ console.log('Hero canvas:', e); }

  /* ---------- NAV SCROLL ---------- */
  try{
    var nav = document.getElementById('nav');
    if(nav) window.addEventListener('scroll', function(){ nav.classList.toggle('scrolled', window.scrollY > 40); }, {passive:true});
  } catch(e){}

  /* ---------- MOBILE MENU ---------- */
  try{
    var burger = document.getElementById('burger');
    var mobile = document.getElementById('navMobile');
    if(burger && mobile){
      burger.addEventListener('click', function(){ mobile.classList.toggle('open'); burger.classList.toggle('open'); });
      mobile.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ mobile.classList.remove('open'); burger.classList.remove('open'); }); });
    }
  } catch(e){}

  /* ---------- REVEAL ON SCROLL ---------- */
  try{
    var reveals = document.querySelectorAll('.reveal');
    if('IntersectionObserver' in window){
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
      }, {threshold:0.08, rootMargin:'0px 0px -50px 0px'});
      reveals.forEach(function(el){ obs.observe(el); });
    } else {
      reveals.forEach(function(el){ el.classList.add('visible'); });
    }
  } catch(e){ document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('visible'); }); }

  /* ---------- COUNT UP ---------- */
  try{
    function count(el){
      var target = parseInt(el.dataset.count, 10) || 0;
      var suffix = el.dataset.suffix || '';
      var dur = 2000, start = null;
      function frame(ts){
        if(!start) start = ts;
        var p = Math.min(1, (ts - start) / dur);
        var e = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(target * e) + suffix;
        if(p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    var stats = document.querySelectorAll('.stat-value');
    if('IntersectionObserver' in window){
      var so = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ count(e.target); so.unobserve(e.target); } });
      }, {threshold:0.5});
      stats.forEach(function(el){ so.observe(el); });
    } else { stats.forEach(count); }
  } catch(e){}

  /* ---------- FAQ ---------- */
  try{
    var openFaq = null;
    document.querySelectorAll('.faq-q').forEach(function(btn){
      btn.addEventListener('click', function(){
        var item = btn.closest('.faq-item');
        if(openFaq && openFaq !== item) openFaq.classList.remove('open');
        item.classList.toggle('open');
        openFaq = item.classList.contains('open') ? item : null;
      });
    });
  } catch(e){}

  /* ---------- MAGNETIC BUTTONS ---------- */
  try{
    document.querySelectorAll('.magnetic').forEach(function(btn){
      btn.addEventListener('mousemove', function(e){
        var rect = btn.getBoundingClientRect();
        btn.style.transform = 'translate(' + ((e.clientX - rect.left - rect.width/2) * 0.1) + 'px,' + ((e.clientY - rect.top - rect.height/2) * 0.1) + 'px)';
      });
      btn.addEventListener('mouseleave', function(){ btn.style.transform = ''; });
    });
  } catch(e){}

  /* ---------- CUSTOM CURSOR ---------- */
  try{
    var cursor = document.getElementById('cursor');
    var glow = document.getElementById('cursor-glow');
    if(!cursor || !glow) throw 'no cursor elements';
    if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches) throw 'touch device';

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var cx = mx, cy = my, gx = mx, gy = my;

    document.addEventListener('mousemove', function(e){ mx = e.clientX; my = e.clientY; });

    function updateCursor(){
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      gx += (mx - gx) * 0.09;
      gy += (my - gy) * 0.09;
      cursor.style.transform = 'translate3d(' + (cx - 3) + 'px,' + (cy - 3) + 'px,0)';
      glow.style.transform = 'translate3d(' + (gx - 18) + 'px,' + (gy - 18) + 'px,0)';
      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover states
    document.querySelectorAll('a, button, .magnetic, input, textarea').forEach(function(el){
      el.addEventListener('mouseenter', function(){ glow.classList.add('hover'); });
      el.addEventListener('mouseleave', function(){ glow.classList.remove('hover'); });
    });
  } catch(e){ console.log('Cursor:', e); }

  /* ---------- SMOOTH SCROLL ---------- */
  try{
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var href = this.getAttribute('href');
        if(href.length < 2) return;
        var t = document.querySelector(href);
        if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth', block:'start'}); }
      });
    });
  } catch(e){}

  /* ---------- SPOTLIGHT ---------- */
  try{
    document.querySelectorAll('.spot').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });
    });
  } catch(e){}

});

/* ---------- CONTACT FORM ---------- */
function submitForm(e){
  try{
    e.preventDefault();
    var name = document.getElementById('cfName').value.trim();
    var email = document.getElementById('cfEmail').value.trim();
    var msg = document.getElementById('cfMsg').value.trim();
    if(!name || !email || !msg) return false;
    var subject = document.getElementById('cfSubject').value.trim() || 'Portfolio enquiry';
    var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + msg;
    document.getElementById('cfSuccess').classList.add('show');
    window.location.href = 'mailto:piyushtomar1222@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  } catch(err){}
  return false;
}
