/* ============================================================
   PIYUSH TOMAR — XYANTRIX RESUME
   Loader logo draw, blur-to-sharp reveals, magnetic 3D CTA,
   custom cursor, count-up stats, FAQ accordion, spotlight cards.
   Pure vanilla JS, zero dependencies.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function(){

  /* LOADER */
  (function loader(){
    var loaderEl = document.getElementById('loader');
    var pct = document.getElementById('loaderPct');
    if(!loaderEl) return;
    var finished = false, progress = 0;
    var tick = setInterval(function(){
      progress += Math.random() * 12;
      if(progress > 94) progress = 94;
      if(pct) pct.textContent = Math.floor(progress) + '%';
    }, 180);
    function finish(){
      if(finished) return;
      finished = true;
      clearInterval(tick);
      if(pct) pct.textContent = '100%';
      setTimeout(function(){
        loaderEl.classList.add('out');
        setTimeout(function(){ loaderEl.style.display = 'none'; }, 800);
        document.body.classList.add('loaded');
        triggerHero();
      }, 600);
    }
    setTimeout(finish, 3200);
    setTimeout(finish, 5000);
  })();

  function triggerHero(){
    var heroTitle = document.querySelector('.hero-title');
    if(heroTitle){
      requestAnimationFrame(function(){ heroTitle.classList.add('visible'); });
    }
  }

  /* NAV SCROLL STATE */
  try{
    var nav = document.getElementById('nav');
    if(nav){
      window.addEventListener('scroll', function(){
        nav.classList.toggle('scrolled', window.scrollY > 20);
      }, {passive:true});
    }
  } catch(err){}

  /* NAV ACTIVE SECTION */
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

  /* MOBILE MENU */
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

  /* STAGGERED REVEAL DELAYS */
  try{
    var parentCounts = new Map();
    document.querySelectorAll('.reveal-blur').forEach(function(el){
      var parent = el.parentElement;
      if(!parent) return;
      var count = parentCounts.get(parent) || 0;
      if(count > 0){ el.style.transitionDelay = (Math.min(count, 6) * 0.1) + 's'; }
      parentCounts.set(parent, count + 1);
    });
  } catch(err){}

  /* REVEAL ON SCROLL (blur-to-sharp) */
  try{
    var reveals = document.querySelectorAll('.reveal-blur');
    if('IntersectionObserver' in window){
      var revObs = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            e.target.classList.add('visible');
            revObs.unobserve(e.target);
          }
        });
      }, {threshold:0.08, rootMargin:'0px 0px -60px 0px'});
      reveals.forEach(function(el){ revObs.observe(el); });
    } else {
      reveals.forEach(function(el){ el.classList.add('visible'); });
    }
  } catch(err){
    document.querySelectorAll('.reveal-blur').forEach(function(el){ el.classList.add('visible'); });
  }

  /* COUNT UP STATS */
  try{
    function animCount(el){
      var target = parseInt(el.dataset.count, 10) || 0;
      var suffix = el.dataset.suffix || '';
      var dur = 1800, start = null;
      function frame(ts){
        if(!start) start = ts;
        var tt = Math.min(1, (ts-start)/dur);
        var eased = 1 - Math.pow(1-tt, 3);
        el.textContent = Math.round(target*eased) + suffix;
        if(tt < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    var stats = document.querySelectorAll('.hm-num');
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

  /* MAGNETIC BUTTONS */
  try{
    if(window.matchMedia('(hover: hover) and (pointer: fine)').matches){
      document.querySelectorAll('.magnetic').forEach(function(btn){
        btn.addEventListener('mousemove', function(e){
          var rect = btn.getBoundingClientRect();
          var x = e.clientX - rect.left - rect.width/2;
          var y = e.clientY - rect.top - rect.height/2;
          btn.style.transform = 'translate(' + (x*0.2) + 'px,' + (y*0.2) + 'px)';
        });
        btn.addEventListener('mouseleave', function(){ btn.style.transform = ''; });
      });
    }
  } catch(err){}

  /* CUSTOM CURSOR */
  try{
    var cursor = document.getElementById('cursor');
    var trail = document.getElementById('cursorTrail');
    if(cursor && trail && window.matchMedia('(hover: hover) and (pointer: fine)').matches){
      var cx=0, cy=0, tx=0, ty=0, tx2=0, ty2=0;
      window.addEventListener('mousemove', function(e){ tx = e.clientX; ty = e.clientY; });
      function updateCursor(){
        cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
        tx2 += (tx - tx2) * 0.08; ty2 += (ty - ty2) * 0.08;
        cursor.style.transform = 'translate(' + (cx-3) + 'px,' + (cy-3) + 'px)';
        trail.style.transform = 'translate(' + (tx2-18) + 'px,' + (ty2-18) + 'px)';
        requestAnimationFrame(updateCursor);
      }
      updateCursor();
      document.querySelectorAll('a, button, .magnetic, .cap-card, .proj-card, .faq-q').forEach(function(el){
        el.addEventListener('mouseenter', function(){ trail.classList.add('hover'); });
        el.addEventListener('mouseleave', function(){ trail.classList.remove('hover'); });
      });
    }
  } catch(err){}

  /* SMOOTH SCROLL */
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

  /* SPOTLIGHT CARDS */
  try{
    document.querySelectorAll('.spot').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });
    });
  } catch(err){}

  /* FAQ ACCORDION */
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

  /* CONTACT FORM VALIDATION */
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

/* CONTACT FORM SUBMIT */
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
