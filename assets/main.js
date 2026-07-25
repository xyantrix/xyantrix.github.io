/* ============================================================
   PIYUSH TOMAR — PORTFOLIO
   Every feature isolated in its own try/catch. Pure vanilla JS,
   zero dependencies — runs from a double-clicked file or GitHub
   Pages. Reduced-motion visitors get instant, static equivalents.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function(){

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- LOADER (brass/emerald seal-stamp) ---------- */
  (function loader(){
    var loaderEl = document.getElementById('loader');
    if(!loaderEl) return;
    if(reduceMotion){ loaderEl.style.display = 'none'; return; }
    document.body.classList.add('loading');
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){ loaderEl.classList.add('stamping'); });
    });
    setTimeout(function(){
      loaderEl.classList.add('out');
      document.body.classList.remove('loading');
      setTimeout(function(){ loaderEl.style.display = 'none'; }, 750);
    }, 1350);
  })();

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

  /* ---------- TEXT SPLIT (blur + fade word entrance) ---------- */
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
            inner.style.transitionDelay = (Math.min(wordCounter, 14) * 42) + 'ms';
            wordCounter++;
            outer.appendChild(inner);
            frag.appendChild(outer);
          });
          node.replaceChild(frag, child);
        } else if(child.nodeType === 1 && child.tagName !== 'BR' && !child.classList.contains('grad')){
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
    var heroDelay = reduceMotion ? 60 : 1450;
    setTimeout(function(){
      if(heroTitle) heroTitle.classList.add('visible');
      if(heroCopy) heroCopy.classList.add('hero-in');
    }, heroDelay);
  } catch(err){}

  /* ---------- STAGGERED REVEAL GROUPS ---------- */
  try{
    var parentCounts = new Map();
    document.querySelectorAll('.reveal').forEach(function(el){
      var parent = el.parentElement;
      if(!parent) return;
      var count = parentCounts.get(parent) || 0;
      if(count > 0){ el.style.transitionDelay = (Math.min(count, 6) * 0.08) + 's'; }
      parentCounts.set(parent, count + 1);
    });
  } catch(err){}

  /* ---------- REVEAL ON SCROLL ---------- */
  try{
    var reveals = document.querySelectorAll('.reveal');
    function markVisible(el){
      el.classList.add('visible');
      el.querySelectorAll('.split-ready').forEach(function(sp){ sp.classList.add('visible'); });
    }
    if('IntersectionObserver' in window){
      var revObs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){ markVisible(e.target); revObs.unobserve(e.target); }
        });
      }, {threshold:0.08, rootMargin:'0px 0px -40px 0px'});
      reveals.forEach(function(el){ revObs.observe(el); });
    } else {
      reveals.forEach(markVisible);
    }
  } catch(err){
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('visible'); });
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
          var cx = (e.clientX - rect.left) - rect.width/2, cy = (e.clientY - rect.top) - rect.height/2;
          btn.style.transform = 'translate(' + (cx*0.16) + 'px,' + (cy*0.28) + 'px)';
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
        cx += (tx - cx) * 0.16; cy += (ty - cy) * 0.16;
        tx2 += (tx - tx2) * 0.09; ty2 += (ty - ty2) * 0.09;
        cursor.style.transform = 'translate(' + (cx-3) + 'px,' + (cy-3) + 'px)';
        trail.style.transform = 'translate(' + (tx2-14) + 'px,' + (ty2-14) + 'px)';
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

  /* ---------- HERO PARALLAX (seal medallion drifts with cursor + scroll) ---------- */
  try{
    var visual = document.querySelector('.hero-visual');
    var heroSection = document.querySelector('.hero');
    if(visual && heroSection && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion){
      heroSection.addEventListener('mousemove', function(e){
        var rect = heroSection.getBoundingClientRect();
        var px = (e.clientX - rect.left)/rect.width - 0.5;
        var py = (e.clientY - rect.top)/rect.height - 0.5;
        visual.style.transform = 'translate(' + (px*18) + 'px,' + (py*18) + 'px)';
      });
      heroSection.addEventListener('mouseleave', function(){ visual.style.transform = ''; });
    }
    if(visual && !reduceMotion){
      window.addEventListener('scroll', function(){
        var y = window.scrollY;
        if(y < window.innerHeight){
          visual.style.opacity = String(Math.max(0, 1 - y/700));
        }
      }, {passive:true});
    }
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
