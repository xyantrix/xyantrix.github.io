/* ============================================================
   PIYUSH TOMAR — NOVA EDITION
   Every feature is isolated in its own try/catch so nothing can
   take the rest of the page down. The interactive dot grid lives
   entirely inside the hero canvas and is masked to fade out at
   the bottom of the section (see #heroField mask in CSS) — it
   never runs full-page.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function(){

  /* ---------- LOADER: logo breathing, nothing else ---------- */
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
    // Two breathing cycles (~3.2s), then a hard fallback just in case.
    setTimeout(finish, 3200);
    setTimeout(finish, 5000);
  })();

  /* ---------- HERO INTERACTIVE DOT GRID (React-Bits-style) ---------- */
  try{
    var canvas = document.getElementById('heroField');
    var heroEl = document.querySelector('.hero');
    if(canvas && canvas.getContext && heroEl){
      var ctx = canvas.getContext('2d');
      var w, h, dots = [];
      var mouse = {x:-9999, y:-9999, active:false};
      var spacing = 34;
      var heroActive = true;

      function buildGrid(){
        w = canvas.width = heroEl.offsetWidth;
        h = canvas.height = heroEl.offsetHeight;
        dots = [];
        var cols = Math.ceil(w / spacing) + 1;
        var rows = Math.ceil(h / spacing) + 1;
        for(var i=0;i<cols;i++){
          for(var j=0;j<rows;j++){
            dots.push({
              x: i*spacing, y: j*spacing,
              ox: i*spacing, oy: j*spacing,
              r: 1.1
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
      heroEl.addEventListener('mouseleave', function(){ mouse.active = false; });

      // Pause the animation once the hero has scrolled out of view —
      // saves cycles and matches "only in the hero" requirement.
      if('IntersectionObserver' in window){
        var heroObs = new IntersectionObserver(function(entries){
          heroActive = entries[0].isIntersecting;
        }, {threshold:0.01});
        heroObs.observe(heroEl);
      }

      var t = 0;
      function draw(){
        requestAnimationFrame(draw);
        if(!heroActive) return;
        t += 0.006;
        ctx.clearRect(0,0,w,h);

        // ambient animated gradient wash beneath the dots
        var gx = w * (0.5 + 0.18*Math.sin(t*0.7));
        var gy = h * (0.4 + 0.14*Math.cos(t*0.5));
        var g1 = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w,h)*0.6);
        g1.addColorStop(0, 'rgba(45,212,191,0.10)');
        g1.addColorStop(0.5, 'rgba(255,138,101,0.05)');
        g1.addColorStop(1, 'rgba(8,9,11,0)');
        ctx.fillStyle = g1;
        ctx.fillRect(0,0,w,h);

        if(mouse.active){
          var g2 = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 240);
          g2.addColorStop(0, 'rgba(45,212,191,0.16)');
          g2.addColorStop(1, 'rgba(45,212,191,0)');
          ctx.fillStyle = g2;
          ctx.fillRect(0,0,w,h);
        }

        var radius = 150;
        for(var i=0;i<dots.length;i++){
          var d = dots[i];
          var dx = mouse.active ? d.ox - mouse.x : 9999;
          var dy = mouse.active ? d.oy - mouse.y : 9999;
          var dist = Math.sqrt(dx*dx + dy*dy);
          var idle = 0.35 + 0.12*Math.sin(t*1.3 + d.ox*0.02 + d.oy*0.02);

          if(dist < radius){
            var pull = (1 - dist/radius);
            d.x = d.ox - dx*pull*0.28;
            d.y = d.oy - dy*pull*0.28;
            var size = 1.1 + pull*2.1;
            var mix = pull;
            var cr = Math.round(45 + (255-45)*mix*0.5);
            var cg = Math.round(212 + (138-212)*mix*0.5);
            var cb = Math.round(191 + (101-191)*mix*0.5);
            ctx.beginPath();
            ctx.arc(d.x, d.y, size, 0, Math.PI*2);
            ctx.fillStyle = 'rgba(' + cr + ',' + cg + ',' + cb + ',' + (0.35 + pull*0.55) + ')';
            ctx.fill();
          } else {
            d.x += (d.ox - d.x) * 0.12;
            d.y += (d.oy - d.y) * 0.12;
            ctx.beginPath();
            ctx.arc(d.x, d.y, 1.1, 0, Math.PI*2);
            ctx.fillStyle = 'rgba(240,240,236,' + (idle*0.4) + ')';
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
