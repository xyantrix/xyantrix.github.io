/* ============================================================
   PIYUSH TOMAR — AUREUM EDITION
   Every feature is isolated in its own try/catch. The loader uses
   only an inline SVG path (already in the DOM) — nothing is ever
   loaded from an external image file, so there is no risk of the
   canvas-tainting issue that broke earlier versions under file://.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function(){

  /* ---------- LOADER: SVG line-draw ---------- */
  (function loader(){
    var loaderEl = document.getElementById('loader');
    if(!loaderEl) return;
    var finished = false;

    function finish(){
      if(finished) return;
      finished = true;
      loaderEl.classList.add('out');
      setTimeout(function(){ loaderEl.style.display = 'none'; }, 750);
    }

    var hardFallback = setTimeout(finish, 4200);

    try{
      var progressEl = document.getElementById('loaderProgress');
      var svg = document.getElementById('loaderSvg');
      var path = document.getElementById('loaderPath');
      var fillPath = document.getElementById('loaderFill');
      var lockup = document.getElementById('loaderLockup');

      function setProgress(pct){ if(progressEl) progressEl.style.width = pct + '%'; }

      if(!path || !path.getTotalLength){ throw new Error('no path'); }

      var len = path.getTotalLength();
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
      // force layout before transition
      path.getBoundingClientRect();
      path.style.transition = 'stroke-dashoffset 1500ms cubic-bezier(0.65,0,0.35,1)';

      var t0 = null;
      function trackProgress(ts){
        if(!t0) t0 = ts;
        var t = Math.min(1, (ts - t0) / 1500);
        setProgress(t * 55);
        if(t < 1) requestAnimationFrame(trackProgress);
      }
      requestAnimationFrame(function(){
        path.style.strokeDashoffset = '0';
        requestAnimationFrame(trackProgress);
      });

      setTimeout(function(){
        if(fillPath) fillPath.classList.add('show');
        if(svg) svg.classList.add('hide-stroke');
        setProgress(80);
        setTimeout(function(){
          if(lockup) lockup.classList.add('show');
          setProgress(100);
          setTimeout(finish, 850);
        }, 500);
      }, 1550);

    } catch(err){
      clearTimeout(hardFallback);
      finish();
    }
  })();

  /* ---------- CONSTELLATION FIELD (original, self-generated only) ---------- */
  try{
    var canvas = document.getElementById('constellation');
    if(canvas && canvas.getContext){
      var ctx = canvas.getContext('2d');
      var w, h, nodes = [];
      var mouse = {x:-1000, y:-1000};

      function resize(){
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener('resize', resize);
      window.addEventListener('mousemove', function(e){ mouse.x = e.clientX; mouse.y = e.clientY; }, {passive:true});

      var count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 22000));
      var palette = ['214,173,104', '107,124,184', '243,239,230'];
      for(var i=0;i<count;i++){
        nodes.push({
          x: Math.random()*w, y: Math.random()*h,
          vx: (Math.random()-0.5)*0.18, vy: (Math.random()-0.5)*0.18,
          r: 1 + Math.random()*1.4,
          color: palette[i % palette.length]
        });
      }

      function step(){
        ctx.clearRect(0,0,w,h);
        for(var i=0;i<nodes.length;i++){
          var n = nodes[i];
          n.x += n.vx; n.y += n.vy;
          if(n.x < 0 || n.x > w) n.vx *= -1;
          if(n.y < 0 || n.y > h) n.vy *= -1;

          var dxm = n.x - mouse.x, dym = n.y - mouse.y;
          var dm = Math.sqrt(dxm*dxm + dym*dym);
          if(dm < 140){
            n.x += (dxm/dm) * 0.6;
            n.y += (dym/dm) * 0.6;
          }

          for(var j=i+1;j<nodes.length;j++){
            var o = nodes[j];
            var dx = n.x - o.x, dy = n.y - o.y;
            var d = Math.sqrt(dx*dx + dy*dy);
            if(d < 150){
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(o.x, o.y);
              ctx.strokeStyle = 'rgba(' + n.color + ',' + (0.12 * (1 - d/150)) + ')';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
        for(var k=0;k<nodes.length;k++){
          var p = nodes[k];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
          ctx.fillStyle = 'rgba(' + p.color + ',0.55)';
          ctx.fill();
        }
        requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  } catch(err){}

  /* ---------- POINTER SPOTLIGHT ---------- */
  try{
    var glow = document.getElementById('glow');
    if(glow){
      window.addEventListener('mousemove', function(e){
        glow.style.setProperty('--gx', e.clientX + 'px');
        glow.style.setProperty('--gy', e.clientY + 'px');
      }, {passive:true});
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
        var t = Math.min(1, (ts-start)/dur);
        var eased = 1 - Math.pow(1-t, 3);
        el.textContent = Math.round(target*eased) + suffix;
        if(t < 1) requestAnimationFrame(frame);
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

  /* ---------- ORBIT PANEL NODE PLACEMENT ---------- */
  try{
    document.querySelectorAll('.orbit-node').forEach(function(node){
      var angle = parseFloat(node.dataset.angle || '0');
      var radius = node.dataset.radius || '50%';
      node.style.left = '50%';
      node.style.top = '50%';
      node.style.transform =
        'translate(-50%,-50%) rotate(' + angle + 'deg) translate(' + radius + ') rotate(' + (-angle) + 'deg)';
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
