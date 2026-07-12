/* ============================================================
   PIYUSH TOMAR — LUXURY GOLD EDITION
   Every feature is isolated in its own try/catch so nothing can
   take the rest of the page down. The interactive dot grid and
   aurora both live only inside the hero and are masked to fade
   out at the bottom of the section — never full-page.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function(){

  /* ---------- LOADER: fade in / hold / fade out, then gone ---------- */
  (function loader(){
    var loaderEl = document.getElementById('loader');
    if(!loaderEl) return;
    var finished = false;
    function finish(){
      if(finished) return;
      finished = true;
      loaderEl.classList.add('out');
      setTimeout(function(){ loaderEl.style.display = 'none'; }, 650);
    }
    // One full breathing cycle (2.2s) plus a little air, then a hard
    // fallback in case anything upstream ever stalls.
    setTimeout(finish, 2600);
    setTimeout(finish, 5000);
  })();

  /* ---------- HERO SILK FLOW (soft flowing gold ribbons) ---------- */
  try{
    var silkCanvas = document.getElementById('heroSilk');
    var silkHero = document.querySelector('.hero');
    if(silkCanvas && silkCanvas.getContext && silkHero){
      var sctx = silkCanvas.getContext('2d');
      var sw, sh, silkActive = true;
      var sdpr = Math.min(window.devicePixelRatio || 1, 2);

      function resizeSilk(){
        sw = silkHero.offsetWidth;
        sh = silkHero.offsetHeight;
        silkCanvas.width = sw * sdpr;
        silkCanvas.height = sh * sdpr;
        silkCanvas.style.width = sw + 'px';
        silkCanvas.style.height = sh + 'px';
        sctx.setTransform(sdpr, 0, 0, sdpr, 0, 0);
      }
      resizeSilk();
      window.addEventListener('resize', resizeSilk);

      if('IntersectionObserver' in window){
        var silkObs = new IntersectionObserver(function(entries){
          silkActive = entries[0].isIntersecting;
        }, {threshold:0.01});
        silkObs.observe(silkHero);
      }

      // A handful of layered sine ribbons, each with its own speed,
      // amplitude and vertical band — reads as soft flowing silk.
      var ribbons = [
        { yFrac:0.30, amp:34, freq:1.6, speed:0.16, width:2.2, alpha:0.22, hue:'212,175,55' },
        { yFrac:0.42, amp:46, freq:1.1, speed:-0.12, width:1.6, alpha:0.16, hue:'255,215,0' },
        { yFrac:0.55, amp:28, freq:2.0, speed:0.10, width:1.8, alpha:0.14, hue:'247,231,206' },
        { yFrac:0.66, amp:50, freq:0.85, speed:-0.08, width:1.4, alpha:0.10, hue:'212,175,55' }
      ];

      var st = 0;
      function drawSilk(){
        requestAnimationFrame(drawSilk);
        if(!silkActive) return;
        st += 0.006;
        sctx.clearRect(0,0,sw,sh);
        for(var r=0;r<ribbons.length;r++){
          var rb = ribbons[r];
          var baseY = sh * rb.yFrac;
          sctx.beginPath();
          for(var x=0;x<=sw;x+=8){
            var y = baseY + Math.sin((x*0.0022*rb.freq) + st*rb.speed*10) * rb.amp
                          + Math.sin((x*0.0009*rb.freq) - st*rb.speed*6) * rb.amp*0.4;
            if(x===0) sctx.moveTo(x,y); else sctx.lineTo(x,y);
          }
          sctx.strokeStyle = 'rgba(' + rb.hue + ',' + rb.alpha + ')';
          sctx.lineWidth = rb.width;
          sctx.shadowColor = 'rgba(' + rb.hue + ',0.5)';
          sctx.shadowBlur = 14;
          sctx.stroke();
          sctx.shadowBlur = 0;
        }
      }
      requestAnimationFrame(drawSilk);
    }
  } catch(err){}

  /* ---------- HERO INTERACTIVE GOLD DOT GRID ---------- */
  try{
    var canvas = document.getElementById('heroField');
    var heroEl = document.querySelector('.hero');
    if(canvas && canvas.getContext && heroEl){
      var ctx = canvas.getContext('2d');
      var w, h, dots = [];
      var mouse = {x:-9999, y:-9999, active:false};
      var spacing = 32;
      var heroActive = true;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);

      function buildGrid(){
        w = heroEl.offsetWidth;
        h = heroEl.offsetHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        dots = [];
        var cols = Math.ceil(w / spacing) + 1;
        var rows = Math.ceil(h / spacing) + 1;
        for(var i=0;i<cols;i++){
          for(var j=0;j<rows;j++){
            dots.push({ x:i*spacing, y:j*spacing, ox:i*spacing, oy:j*spacing });
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
      heroEl.addEventListener('mouseleave', function(){ mouse.active = false; });

      if('IntersectionObserver' in window){
        var heroObs = new IntersectionObserver(function(entries){
          heroActive = entries[0].isIntersecting;
        }, {threshold:0.01});
        heroObs.observe(heroEl);
      }

      var t = 0;
      var radius = 160;
      function draw(){
        requestAnimationFrame(draw);
        if(!heroActive) return;
        t += 0.006;
        ctx.clearRect(0,0,w,h);

        if(mouse.active){
          var glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 260);
          glow.addColorStop(0, 'rgba(255,215,0,0.14)');
          glow.addColorStop(1, 'rgba(255,215,0,0)');
          ctx.fillStyle = glow;
          ctx.fillRect(0,0,w,h);
        }

        for(var i=0;i<dots.length;i++){
          var d = dots[i];
          var dx = mouse.active ? d.ox - mouse.x : 9999;
          var dy = mouse.active ? d.oy - mouse.y : 9999;
          var dist = Math.sqrt(dx*dx + dy*dy);
          var idle = 0.28 + 0.1*Math.sin(t*1.2 + d.ox*0.02 + d.oy*0.02);

          if(dist < radius){
            var pull = (1 - dist/radius);
            d.x = d.ox - dx*pull*0.26;
            d.y = d.oy - dy*pull*0.26;
            var size = 1 + pull*2.2;
            ctx.beginPath();
            ctx.arc(d.x, d.y, size, 0, Math.PI*2);
            ctx.fillStyle = 'rgba(255,215,0,' + (0.3 + pull*0.6) + ')';
            ctx.fill();
          } else {
            d.x += (d.ox - d.x) * 0.12;
            d.y += (d.oy - d.y) * 0.12;
            ctx.beginPath();
            ctx.arc(d.x, d.y, 1, 0, Math.PI*2);
            ctx.fillStyle = 'rgba(212,175,55,' + (idle*0.55) + ')';
            ctx.fill();
          }
        }
      }
      requestAnimationFrame(draw);
    }
  } catch(err){}

  /* ---------- NAV SCROLL STATE ---------- */
  try{
    var nav = document.getElementById('nav');
    if(nav){
      window.addEventListener('scroll', function(){
        nav.classList.toggle('scrolled', window.scrollY > 20);
      }, {passive:true});
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
          if(e.isIntersecting){ e.target.classList.add('visible'); revObs.unobserve(e.target); }
        });
      }, {threshold:0.08, rootMargin:'0px 0px -40px 0px'});
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
      var dur = 1600, start = null;
      function frame(ts){
        if(!start) start = ts;
        var tt = Math.min(1, (ts-start)/dur);
        var eased = 1 - Math.pow(1-tt, 3);
        el.textContent = Math.round(target*eased) + suffix;
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
      }, {threshold:0.5});
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
        var x = e.clientX - rect.left - rect.width/2;
        var y = e.clientY - rect.top - rect.height/2;
        btn.style.transform = 'translate(' + (x*0.15) + 'px,' + (y*0.15) + 'px)';
      });
      btn.addEventListener('mouseleave', function(){ btn.style.transform = ''; });
    });
  } catch(err){}

  /* ---------- CUSTOM CURSOR ---------- */
  try{
    var cursor = document.getElementById('cursor');
    var trail = document.getElementById('cursorTrail');
    if(cursor && trail && window.matchMedia('(hover: hover) and (pointer: fine)').matches){
      var cx=0, cy=0, tx=0, ty=0, tx2=0, ty2=0;
      window.addEventListener('mousemove', function(e){ tx = e.clientX; ty = e.clientY; });
      function updateCursor(){
        cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
        tx2 += (tx - tx2) * 0.08; ty2 += (ty - ty2) * 0.08;
        cursor.style.transform = 'translate(' + (cx-4) + 'px,' + (cy-4) + 'px)';
        trail.style.transform = 'translate(' + (tx2-16) + 'px,' + (ty2-16) + 'px)';
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
        if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth', block:'start'}); }
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

  /* ---------- CAROUSEL ---------- */
  try{
    function initCarousel(root){
      var track = root.querySelector('.carousel-track');
      if(!track) return;
      var slides = Array.prototype.slice.call(track.children);
      var dotsWrap = root.querySelector('.carousel-dots');
      var prevBtn = root.querySelector('.carousel-arrow.prev');
      var nextBtn = root.querySelector('.carousel-arrow.next');
      var perView = window.innerWidth <= 768 ? 1 : 2;
      var index = 0;

      slides.forEach(function(_, i){
        if(i % perView === 0){
          var dot = document.createElement('span');
          dot.className = 'carousel-dot';
          dot.addEventListener('click', function(){ goTo(i); });
          dotsWrap.appendChild(dot);
        }
      });

      function maxIndex(){ return Math.max(0, slides.length - perView); }
      function update(){
        var slideWidth = slides[0].getBoundingClientRect().width + 20;
        track.style.transform = 'translateX(-' + (index * slideWidth) + 'px)';
        var dots = Array.prototype.slice.call(dotsWrap.children);
        dots.forEach(function(d,i){ d.classList.toggle('active', i === Math.floor(index/perView)); });
      }
      function goTo(i){ index = Math.max(0, Math.min(maxIndex(), i)); update(); }
      if(prevBtn) prevBtn.addEventListener('click', function(){ goTo(index - perView); });
      if(nextBtn) nextBtn.addEventListener('click', function(){ goTo(index + perView); });

      var startX = 0, startIndex = 0, dragging = false, delta = 0;
      function slideWidthPx(){ return slides[0].getBoundingClientRect().width + 20; }
      track.addEventListener('pointerdown', function(e){
        dragging = true; startX = e.clientX; startIndex = index;
        try{ track.setPointerCapture(e.pointerId); }catch(_e){}
      });
      track.addEventListener('pointermove', function(e){
        if(!dragging) return;
        delta = e.clientX - startX;
        track.style.transition = 'none';
        track.style.transform = 'translateX(' + (-(startIndex*slideWidthPx()) + delta) + 'px)';
      });
      function endDrag(){
        if(!dragging) return;
        dragging = false;
        track.style.transition = '';
        var sw = slideWidthPx();
        if(Math.abs(delta) > sw*0.2){
          goTo(startIndex + (delta < 0 ? perView : -perView));
        } else {
          update();
        }
        delta = 0;
      }
      track.addEventListener('pointerup', endDrag);
      track.addEventListener('pointerleave', endDrag);

      window.addEventListener('resize', function(){
        perView = window.innerWidth <= 768 ? 1 : 2;
        index = Math.min(index, maxIndex());
        update();
      });

      update();
    }
    document.querySelectorAll('.carousel').forEach(initCarousel);
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
