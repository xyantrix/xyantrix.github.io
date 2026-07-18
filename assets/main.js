/* ============================================================
   PIYUSH TOMAR — PORTFOLIO
   Every feature isolated in its own try/catch, so a failure in
   one never takes another down. Zero external dependencies —
   pure vanilla JS, runs from a double-clicked file or GitHub Pages.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function(){

  /* ---------- LOADER (progress bar + logo reveal) ---------- */
  (function loader(){
    var loaderEl = document.getElementById('loader');
    var bar = document.getElementById('loaderBar');
    var pct = document.getElementById('loaderPct');
    if(!loaderEl) return;
    var finished = false;
    var progress = 0;
    var tick = setInterval(function(){
      progress += Math.random() * 18;
      if(progress > 92) progress = 92;
      if(bar) bar.style.width = progress + '%';
      if(pct) pct.textContent = Math.floor(progress) + '%';
    }, 140);
    function finish(){
      if(finished) return;
      finished = true;
      clearInterval(tick);
      if(bar) bar.style.width = '100%';
      if(pct) pct.textContent = '100%';
      setTimeout(function(){
        loaderEl.classList.add('out');
        setTimeout(function(){ loaderEl.style.display = 'none'; }, 700);
      }, 180);
    }
    setTimeout(finish, 1300);
    setTimeout(finish, 3200);
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

  /* ---------- SCROLL PROGRESS BAR ---------- */
  try{
    var progressBar = document.getElementById('scrollProgress');
    if(progressBar){
      window.addEventListener('scroll', function(){
        var h = document.documentElement;
        var scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
        progressBar.style.width = (scrolled || 0) + '%';
      }, {passive:true});
    }
  } catch(err){}

  /* ---------- NAV ACTIVE SECTION INDICATOR ---------- */
  try{
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    var sectionMap = [];
    navLinks.forEach(function(a){
      var id = a.getAttribute('href');
      var sec = id.length > 1 ? document.querySelector(id) : null;
      if(sec) sectionMap.push({link:a, sec:sec});
    });
    if(sectionMap.length && 'IntersectionObserver' in window){
      var navObs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          var match = sectionMap.find(function(m){ return m.sec === e.target; });
          if(!match) return;
          if(e.isIntersecting){
            navLinks.forEach(function(a){ a.classList.remove('active'); });
            match.link.classList.add('active');
          }
        });
      }, {rootMargin:'-45% 0px -45% 0px'});
      sectionMap.forEach(function(m){ navObs.observe(m.sec); });
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
        document.body.style.overflow = mobile.classList.contains('open') ? 'hidden' : '';
      });
      mobile.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){
          mobile.classList.remove('open');
          burger.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }
  } catch(err){}

  /* ---------- TEXT SPLIT (word-by-word curtain reveal) ---------- */
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
    var heroPhoto = document.querySelector('.hero-photo');
    setTimeout(function(){
      if(heroTitle) heroTitle.classList.add('visible');
      if(heroCopy) heroCopy.classList.add('hero-in');
      if(heroPhoto) heroPhoto.classList.add('visible');
    }, 1300);
  } catch(err){}

  /* ---------- STAGGERED REVEAL GROUPS ---------- */
  try{
    var parentCounts = new Map();
    document.querySelectorAll('.reveal').forEach(function(el){
      var parent = el.parentElement;
      if(!parent) return;
      var count = parentCounts.get(parent) || 0;
      if(count > 0){ el.style.transitionDelay = (Math.min(count, 6) * 0.09) + 's'; }
      parentCounts.set(parent, count + 1);
    });
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

  /* ---------- ABOUT PHOTO — CLICK-TRIGGERED GLOW ---------- */
  try{
    var aboutPhoto = document.querySelector('.about-photo');
    if(aboutPhoto){
      aboutPhoto.addEventListener('click', function(){
        aboutPhoto.classList.toggle('glow-active');
      });
    }
  } catch(err){}

  /* ---------- SILK WAVE CANVAS (hero background) ---------- */
  try{
    var silk = document.getElementById('silkCanvas');
    if(silk && silk.getContext){
      var sctx = silk.getContext('2d');
      var sHero = silk.closest('.hero');
      var sDpr = Math.min(window.devicePixelRatio || 1, 2);
      var sReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var t = 0;

      var ribbons = [
        {amp:46, freq:0.0032, speed:0.006, yRatio:0.30, width:2.4, colorA:'124,58,237', colorB:'6,182,212', alpha:0.5},
        {amp:60, freq:0.0021, speed:-0.004, yRatio:0.48, width:1.8, colorA:'6,182,212', colorB:'124,58,237', alpha:0.35},
        {amp:34, freq:0.0045, speed:0.008, yRatio:0.66, width:1.4, colorA:'167,139,250', colorB:'34,211,238', alpha:0.28}
      ];

      function sResize(){
        var rect = sHero.getBoundingClientRect();
        silk.width = rect.width * sDpr;
        silk.height = rect.height * sDpr;
        silk.style.width = rect.width + 'px';
        silk.style.height = rect.height + 'px';
        sctx.setTransform(sDpr,0,0,sDpr,0,0);
      }

      function sDraw(){
        var w = silk.width / sDpr, h = silk.height / sDpr;
        sctx.clearRect(0,0,w,h);
        ribbons.forEach(function(r){
          var baseY = h * r.yRatio;
          var grad = sctx.createLinearGradient(0,0,w,0);
          grad.addColorStop(0, 'rgba(' + r.colorA + ',0)');
          grad.addColorStop(0.5, 'rgba(' + r.colorA + ',' + r.alpha + ')');
          grad.addColorStop(1, 'rgba(' + r.colorB + ',0)');
          sctx.beginPath();
          sctx.moveTo(0, baseY);
          for(var x = 0; x <= w; x += 8){
            var y = baseY + Math.sin(x * r.freq + t * r.speed * 10) * r.amp
                            + Math.sin(x * r.freq * 2.3 + t * r.speed * 6) * (r.amp * 0.3);
            sctx.lineTo(x, y);
          }
          sctx.strokeStyle = grad;
          sctx.lineWidth = r.width;
          sctx.stroke();
        });
        t += 1;
        if(!sReduce) requestAnimationFrame(sDraw);
      }

      sResize();
      window.addEventListener('resize', sResize);
      if(sReduce){ sDraw(); } else { requestAnimationFrame(sDraw); }
    }
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
        return dark ? 'rgba(167,139,250,ALPHA)' : 'rgba(15,13,31,ALPHA)';
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
          var alpha = 0.09 + influence*0.4;
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

      var themeBtn = document.getElementById('themeToggle');
      if(themeBtn) themeBtn.addEventListener('click', function(){ if(reduceMotion) draw(); });
    }
  } catch(err){}

  /* ---------- CONTACT FORM VALIDATION STATES ---------- */
  try{
    document.querySelectorAll('.cf-field input, .cf-field textarea').forEach(function(field){
      field.addEventListener('blur', function(){
        var wrap = field.closest('.cf-field');
        if(field.hasAttribute('required') && !field.value.trim()){
          wrap.classList.add('invalid');
        } else {
          wrap.classList.remove('invalid');
        }
      });
      field.addEventListener('input', function(){
        field.closest('.cf-field').classList.remove('invalid');
      });
    });
  } catch(err){}

});

/* ---------- CONTACT FORM SUBMIT ---------- */
function submitForm(e){
  try{
    e.preventDefault();
    var name = document.getElementById('cfName').value.trim();
    var email = document.getElementById('cfEmail').value.trim();
    var msg = document.getElementById('cfMsg').value.trim();
    var ok = true;
    [['cfName',name],['cfEmail',email],['cfMsg',msg]].forEach(function(pair){
      var wrap = document.getElementById(pair[0]).closest('.cf-field');
      if(!pair[1]){ wrap.classList.add('invalid'); ok = false; }
      else wrap.classList.remove('invalid');
    });
    if(!ok) return false;
    var subject = document.getElementById('cfSubject').value.trim() || 'Portfolio enquiry';
    var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + msg;
    document.getElementById('cfSuccess').classList.add('show');
    window.location.href = 'mailto:piyushtomar1222@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  } catch(err){}
  return false;
}
