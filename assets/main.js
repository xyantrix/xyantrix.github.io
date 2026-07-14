/* ============================================================
   PIYUSH TOMAR — PORTFOLIO
   Every feature isolated in its own try/catch, so a failure in
   one never takes another down. Zero external dependencies —
   pure vanilla JS, runs from a double-clicked file or GitHub Pages.
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
      setTimeout(function(){ loaderEl.style.display = 'none'; }, 650);
    }
    setTimeout(finish, 1200);
    setTimeout(finish, 3500);
  })();

  /* ---------- THEME TOGGLE ---------- */
  try{
    var root = document.documentElement;
    var toggle = document.getElementById('themeToggle');
    if(toggle){
      toggle.addEventListener('click', function(){
        var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try{ localStorage.setItem('pt-theme', next); } catch(_e){}
      });
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

  /* ---------- TEXT SPLIT (word-by-word curtain reveal, Launchfolio-style) ---------- */
  try{
    var wordCounter = 0;
    function splitWords(node){
      Array.prototype.slice.call(node.childNodes).forEach(function(child){
        if(child.nodeType === 3){
          var parts = child.textContent.split(/(\s+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function(part){
            if(part === '') return;
            if(/^\s+$/.test(part)){ frag.appendChild(document.createTextNode(part)); return; }
            var outer = document.createElement('span');
            outer.className = 'word';
            var inner = document.createElement('span');
            inner.className = 'word-inner';
            inner.textContent = part;
            inner.style.transitionDelay = (Math.min(wordCounter, 14) * 45) + 'ms';
            wordCounter++;
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          node.replaceChild(frag, child);
        } else if(child.nodeType === 1 && child.tagName !== 'BR'){
          splitWords(child);
        }
      });
    }
    document.querySelectorAll('.hero-title, .section-title').forEach(function(el){
      wordCounter = 0;
      splitWords(el);
      el.classList.add('split-ready');
    });
  } catch(err){}

  /* ---------- HERO ENTRANCE SEQUENCE ---------- */
  try{
    var heroCopy = document.querySelector('.hero-copy');
    var heroTitle = document.querySelector('.hero-title');
    setTimeout(function(){
      if(heroTitle) heroTitle.classList.add('visible');
      if(heroCopy) heroCopy.classList.add('hero-in');
    }, 1250);
  } catch(err){}

  /* ---------- REVEAL ON SCROLL ---------- */
  try{
    var reveals = document.querySelectorAll('.reveal');
    if('IntersectionObserver' in window){
      var revObs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            e.target.classList.add('visible');
            e.target.querySelectorAll('.split-ready').forEach(function(sp){ sp.classList.add('visible'); });
            revObs.unobserve(e.target);
          }
        });
      }, {threshold:0.08, rootMargin:'0px 0px -40px 0px'});
      reveals.forEach(function(el){ revObs.observe(el); });
    } else {
      reveals.forEach(function(el){
        el.classList.add('visible');
        el.querySelectorAll('.split-ready').forEach(function(sp){ sp.classList.add('visible'); });
      });
    }
  } catch(err){
    document.querySelectorAll('.reveal').forEach(function(el){
      el.classList.add('visible');
      el.querySelectorAll('.split-ready').forEach(function(sp){ sp.classList.add('visible'); });
    });
  }

  /* ---------- COUNT UP ---------- */
  try{
    function animCount(el){
      var target = parseInt(el.dataset.count, 10) || 0;
      var suffix = el.dataset.suffix || '';
      var dur = 1400, start = null;
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
    if(window.matchMedia('(hover: hover) and (pointer: fine)').matches){
      document.querySelectorAll('.magnetic').forEach(function(btn){
        btn.addEventListener('mousemove', function(e){
          var rect = btn.getBoundingClientRect();
          var x = e.clientX - rect.left - rect.width/2;
          var y = e.clientY - rect.top - rect.height/2;
          btn.style.transform = 'translate(' + (x*0.15) + 'px,' + (y*0.15) + 'px)';
        });
        btn.addEventListener('mouseleave', function(){ btn.style.transform = ''; });
      });
    }
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

  /* ---------- SPOTLIGHT (mouse-reactive glow on cards) ---------- */
  try{
    document.querySelectorAll('.spot').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });
    });
  } catch(err){}

  /* ---------- INTERACTIVE DOT GRID (hero background) ---------- */
  try{
    var canvas = document.getElementById('dotGrid');
    if(canvas && canvas.getContext){
      var ctx = canvas.getContext('2d');
      var hero = canvas.closest('.hero');
      var mouse = {x:-9999, y:-9999};
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var gap = 26, dots = [];
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      function getColor(){
        var dark = document.documentElement.getAttribute('data-theme') === 'dark';
        return dark ? 'rgba(245,244,248,ALPHA)' : 'rgba(19,19,25,ALPHA)';
      }

      function resize(){
        var rect = hero.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.setTransform(dpr,0,0,dpr,0,0);
        dots = [];
        for(var x = gap/2; x < rect.width; x += gap){
          for(var y = gap/2; y < rect.height; y += gap){
            dots.push({x:x, y:y, baseR:1.1});
          }
        }
      }

      function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        var color = getColor();
        for(var i=0;i<dots.length;i++){
          var d = dots[i];
          var dx = mouse.x - d.x, dy = mouse.y - d.y;
          var dist = Math.sqrt(dx*dx + dy*dy);
          var influence = Math.max(0, 1 - dist/160);
          var r = d.baseR + influence*2.2;
          var alpha = 0.10 + influence*0.35;
          ctx.beginPath();
          ctx.fillStyle = color.replace('ALPHA', alpha.toFixed(3));
          ctx.arc(d.x, d.y, r, 0, Math.PI*2);
          ctx.fill();
        }
        if(!reduceMotion) requestAnimationFrame(draw);
      }

      resize();
      window.addEventListener('resize', resize);
      hero.addEventListener('mousemove', function(e){
        var rect = hero.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });
      hero.addEventListener('mouseleave', function(){ mouse.x = -9999; mouse.y = -9999; });

      if(reduceMotion){ draw(); } else { requestAnimationFrame(draw); }

      /* redraw once on theme change so dot color updates immediately */
      var themeBtn = document.getElementById('themeToggle');
      if(themeBtn) themeBtn.addEventListener('click', function(){ if(reduceMotion) draw(); });
    }
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
      var perView = window.innerWidth <= 980 ? 1 : 2;
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
        perView = window.innerWidth <= 980 ? 1 : 2;
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
