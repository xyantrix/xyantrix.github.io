/* ============================================================
   PIYUSH TOMAR — LUXURY GOLD EDITION
   Interactive dot grid + aurora system. Every feature isolated
   in try/catch. Canvas runs ONLY in hero section via IntersectionObserver.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function(){

  /* ---------- LOADER ---------- */
  (function loader(){
    var loaderEl = document.getElementById('loader');
    if(!loaderEl) return;
    var finished = false;
    function finish(){
      if(finished) return;
      finished = true;
      loaderEl.classList.add('out');
      setTimeout(function(){ loaderEl.style.display = 'none'; }, 800);
    }
    setTimeout(finish, 2800);
    setTimeout(finish, 4500);
  })();

  /* ---------- HERO CANVAS: DOT GRID + AURORA ---------- */
  try{
    var canvas = document.getElementById('heroCanvas');
    var heroEl = document.querySelector('.hero');
    if(!canvas || !canvas.getContext || !heroEl) return;

    var ctx = canvas.getContext('2d');
    var w, h, dots = [];
    var mouse = { x: -9999, y: -9999, active: false };
    var spacing = 32;
    var heroActive = true;
    var t = 0;

    // Aurora layers
    var auroraLayers = [
      { color: 'rgba(212,175,55,', opacity: 0.06, speed: 0.3, radius: 0.7, xOff: 0, yOff: 0 },
      { color: 'rgba(255,215,0,', opacity: 0.04, speed: 0.2, radius: 0.6, xOff: 2, yOff: 1 },
      { color: 'rgba(247,231,206,', opacity: 0.05, speed: 0.25, radius: 0.5, xOff: 1, yOff: 2 },
      { color: 'rgba(205,127,50,', opacity: 0.03, speed: 0.15, radius: 0.8, xOff: 3, yOff: 0.5 }
    ];

    function buildGrid(){
      w = canvas.width = heroEl.offsetWidth;
      h = canvas.height = heroEl.offsetHeight;
      dots = [];
      var cols = Math.ceil(w / spacing) + 2;
      var rows = Math.ceil(h / spacing) + 2;
      for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
          dots.push({
            x: i * spacing - spacing,
            y: j * spacing - spacing,
            ox: i * spacing - spacing,
            oy: j * spacing - spacing,
            size: 1.2,
            targetSize: 1.2,
            brightness: 0.15,
            targetBrightness: 0.15,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    }

    buildGrid();
    window.addEventListener('resize', buildGrid);

    heroEl.addEventListener('mousemove', function(e){
      var rect = heroEl.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });

    heroEl.addEventListener('mouseleave', function(){
      mouse.active = false;
    });

    // Pause when hero not visible
    if('IntersectionObserver' in window){
      var heroObs = new IntersectionObserver(function(entries){
        heroActive = entries[0].isIntersecting;
      }, { threshold: 0.01 });
      heroObs.observe(heroEl);
    }

    function drawAurora(){
      for(var i = 0; i < auroraLayers.length; i++){
        var layer = auroraLayers[i];
        var ax = w * (0.5 + 0.25 * Math.sin(t * layer.speed + layer.xOff));
        var ay = h * (0.4 + 0.2 * Math.cos(t * layer.speed * 0.7 + layer.yOff));
        var r = Math.max(w, h) * layer.radius;
        var grad = ctx.createRadialGradient(ax, ay, 0, ax, ay, r);
        grad.addColorStop(0, layer.color + layer.opacity + ')');
        grad.addColorStop(0.5, layer.color + (layer.opacity * 0.5) + ')');
        grad.addColorStop(1, layer.color + '0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
    }

    function drawDots(){
      var radius = 180;
      var baseColor = { r: 220, g: 220, b: 220 };
      var goldColor = { r: 212, g: 175, b: 55 };
      var brightGold = { r: 255, g: 215, b: 0 };

      for(var i = 0; i < dots.length; i++){
        var d = dots[i];
        var dx = mouse.active ? d.ox - mouse.x : 9999;
        var dy = mouse.active ? d.oy - mouse.y : 9999;
        var dist = Math.sqrt(dx * dx + dy * dy);

        // Idle ambient motion
        var idleX = Math.sin(t * 0.8 + d.phase) * 0.5;
        var idleY = Math.cos(t * 0.6 + d.phase * 1.3) * 0.5;

        if(dist < radius){
          var pull = (1 - dist / radius);
          var ease = 0.15;
          d.x += (d.ox - dx * pull * 0.35 + idleX - d.x) * ease;
          d.y += (d.oy - dy * pull * 0.35 + idleY - d.y) * ease;
          d.targetSize = 1.2 + pull * 3.5;
          d.targetBrightness = 0.15 + pull * 0.85;
        } else {
          d.x += (d.ox + idleX - d.x) * 0.08;
          d.y += (d.oy + idleY - d.y) * 0.08;
          d.targetSize = 1.2;
          d.targetBrightness = 0.15;
        }

        d.size += (d.targetSize - d.size) * 0.12;
        d.brightness += (d.targetBrightness - d.brightness) * 0.1;

        var alpha = d.brightness;
        var size = d.size;

        // Color interpolation
        var cr, cg, cb;
        if(d.brightness > 0.5){
          var mix = (d.brightness - 0.5) * 2;
          cr = Math.round(goldColor.r + (brightGold.r - goldColor.r) * mix);
          cg = Math.round(goldColor.g + (brightGold.g - goldColor.g) * mix);
          cb = Math.round(goldColor.b + (brightGold.b - goldColor.b) * mix);
        } else {
          var mix = d.brightness * 2;
          cr = Math.round(baseColor.r + (goldColor.r - baseColor.r) * mix);
          cg = Math.round(baseColor.g + (goldColor.g - baseColor.g) * mix);
          cb = Math.round(baseColor.b + (goldColor.b - baseColor.b) * mix);
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + cr + ',' + cg + ',' + cb + ',' + alpha + ')';
        ctx.fill();

        // Glow for bright dots
        if(d.brightness > 0.6 && size > 2){
          ctx.beginPath();
          ctx.arc(d.x, d.y, size * 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + cr + ',' + cg + ',' + cb + ',' + (alpha * 0.15) + ')';
          ctx.fill();
        }
      }
    }

    function draw(){
      requestAnimationFrame(draw);
      if(!heroActive) return;
      t += 0.004;
      ctx.clearRect(0, 0, w, h);
      drawAurora();
      drawDots();
    }

    requestAnimationFrame(draw);

  } catch(err){ console.log('Hero canvas error:', err); }

  /* ---------- NAV SCROLL STATE ---------- */
  try{
    var nav = document.getElementById('nav');
    if(nav){
      window.addEventListener('scroll', function(){
        nav.classList.toggle('scrolled', window.scrollY > 40);
      }, { passive: true });
    }
  } catch(err){}

  /* ---------- MOBILE MENU ---------- */
  try{
    var burger = document.getElementById('burger');
    var mobile = document.getElementById('navMobile');
    if(burger && mobile){
      burger.addEventListener('click', function(){
        mobile.classList.toggle('open');
        burger.classList.toggle('open');
      });
      mobile.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){
          mobile.classList.remove('open');
          burger.classList.remove('open');
        });
      });
    }
  } catch(err){}

  /* ---------- REVEAL ON SCROLL ---------- */
  try{
    var reveals = document.querySelectorAll('.reveal');
    if('IntersectionObserver' in window){
      var revObs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            e.target.classList.add('visible');
            revObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
      reveals.forEach(function(el){ revObs.observe(el); });
    } else {
      reveals.forEach(function(el){ el.classList.add('visible'); });
    }
  } catch(err){
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('visible'); });
  }

  /* ---------- COUNT UP ---------- */
  try{
    function animCount(el){
      var target = parseInt(el.dataset.count, 10) || 0;
      var suffix = el.dataset.suffix || '';
      var dur = 2000;
      var start = null;
      function frame(ts){
        if(!start) start = ts;
        var tt = Math.min(1, (ts - start) / dur);
        var eased = 1 - Math.pow(1 - tt, 4);
        el.textContent = Math.round(target * eased) + suffix;
        if(tt < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    var stats = document.querySelectorAll('.stat-value');
    if('IntersectionObserver' in window){
      var cntObs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){ animCount(e.target); cntObs.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      stats.forEach(function(el){ cntObs.observe(el); });
    } else {
      stats.forEach(animCount);
    }
  } catch(err){}

  /* ---------- FAQ ACCORDION ---------- */
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
  } catch(err){}

  /* ---------- MAGNETIC BUTTONS ---------- */
  try{
    document.querySelectorAll('.magnetic').forEach(function(btn){
      btn.addEventListener('mousemove', function(e){
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.12) + 'px,' + (y * 0.12) + 'px)';
      });
      btn.addEventListener('mouseleave', function(){
        btn.style.transform = '';
      });
    });
  } catch(err){}

  /* ---------- CUSTOM CURSOR ---------- */
  try{
    var cursor = document.getElementById('cursor');
    var glow = document.getElementById('cursor-glow');
    if(cursor && glow && window.matchMedia('(hover: hover) and (pointer: fine)').matches){
      var cx = 0, cy = 0, tx = 0, ty = 0, gx = 0, gy = 0;
      window.addEventListener('mousemove', function(e){
        tx = e.clientX;
        ty = e.clientY;
      });
      function updateCursor(){
        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        gx += (tx - gx) * 0.1;
        gy += (ty - gy) * 0.1;
        cursor.style.transform = 'translate(' + (cx - 4) + 'px,' + (cy - 4) + 'px)';
        glow.style.transform = 'translate(' + (gx - 20) + 'px,' + (gy - 20) + 'px)';
        requestAnimationFrame(updateCursor);
      }
      updateCursor();
    }
  } catch(err){}

  /* ---------- SMOOTH SCROLL ---------- */
  try{
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var href = this.getAttribute('href');
        if(href.length < 2) return;
        var t = document.querySelector(href);
        if(t){
          e.preventDefault();
          t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  } catch(err){}

  /* ---------- SPOTLIGHT CARDS ---------- */
  try{
    document.querySelectorAll('.spot').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });
    });
  } catch(err){}

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
