/* ============================================================
   PIYUSH TOMAR — PORTFOLIO
   reactbits.dev-inspired features:
   - Tech-text loader (code slot typing)
   - Target cursor (4-corner follow + lock)
   - Dot field background (dotted gradient with cursor bulge)
   - Scroll reveal text (unblur on scroll)
   Every feature isolated in its own try/catch. Pure vanilla JS,
   zero dependencies. Reduced-motion visitors get static equivalents.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function(){

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var loaderTotalMs = 2400;

  /* ---------- LOADER — tech-text code slot ---------- */
  (function loader(){
    var loaderEl = document.getElementById('loader');
    var codeEl = document.getElementById('loaderCode');
    var cursorEl = codeEl ? codeEl.querySelector('.loader-cursor-blink') : null;
    var barEl = document.getElementById('loaderBar');
    if(!loaderEl) return;

    if(reduceMotion){
      loaderEl.style.display = 'none';
      loaderTotalMs = 0;
      return;
    }

    var CODE_LINES = [
      '> initializing finance ops...',
      '> loading automation modules...',
      '> VBA macros ......... OK',
      '> Power BI dashboards . OK',
      '> Power Automate flows  OK',
      '> AI scripting ....... OK',
      '> ERP systems: Oracle, NetSuite, Navision, Tally',
      '> 3-way matching engine ready',
      '> GST/TDS compliance verified',
      '> system online.'
    ];

    var fullText = CODE_LINES.join('\n');
    var charIndex = 0;

    document.body.classList.add('loading');

    function typeNext(){
      if(charIndex >= fullText.length){
        return;
      }
      charIndex++;
      codeEl.textContent = fullText.substring(0, charIndex);
      if(cursorEl) codeEl.appendChild(cursorEl);
      codeEl.scrollTop = codeEl.scrollHeight;
      var ch = fullText[charIndex - 1];
      var delay = ch === '\n' ? 80 : (Math.random() * 22 + 12);
      setTimeout(typeNext, delay);
    }

    requestAnimationFrame(function(){
      requestAnimationFrame(function(){
        typeNext();
        if(barEl){
          barEl.style.transition = 'width ' + (loaderTotalMs - 400) + 'ms cubic-bezier(.32,.72,0,1)';
          barEl.style.width = '100%';
        }
      });
    });

    setTimeout(function(){
      loaderEl.classList.add('out');
      document.body.classList.remove('loading');
      setTimeout(function(){ loaderEl.style.display = 'none'; }, 800);
    }, loaderTotalMs + 300);
  })();

  /* ---------- HERO MOCKUP RANDOMIZER ---------- */
  (function randomizeMockup(){
    var VENDORS = [
      ['Bansal Freight Pvt Ltd','INV-88231','3-way match'],
      ['Orion Cloud Services','INV-88240','GST verified'],
      ['Reliable Packaging Co.','INV-88255','awaiting GRN'],
      ['Vertex Consulting LLP','INV-88261','TDS applied'],
      ['Mumbai Logistics Ltd','INV-88273','3-way match'],
      ['Sterling Components','INV-88288','GST verified'],
      ['Apex Trading Co.','INV-88294','awaiting GRN'],
      ['GreenLine Transport','INV-88301','TDS applied'],
      ['Nimbus Tech Solutions','INV-88315','3-way match'],
      ['Coromandel Supplies','INV-88322','GST verified'],
      ['Pioneer Freight Mgmt','INV-88338','awaiting GRN'],
      ['Quantum Packaging LLP','INV-88344','TDS applied'],
      ['Summit Industries','INV-88357','3-way match'],
      ['Verma Steel Works','INV-88360','GST verified'],
      ['Delta Marine Services','INV-88372','awaiting GRN']
    ];

    function randAmount(){
      var lakhs = Math.floor(Math.random() * 2) + 1;
      var thousands = Math.floor(Math.random() * 90) + 10;
      var hundreds = Math.floor(Math.random() * 100);
      return '\u20B9' + lakhs + ',' + thousands + ',' + hundreds.toString().padStart(2,'0');
    }

    function shuffle(arr){
      var a = arr.slice();
      for(var i = a.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * (i+1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }

    var picked = shuffle(VENDORS).slice(0, 4);
    var rows = document.querySelectorAll('.mock-row');
    rows.forEach(function(row, idx){
      if(idx >= picked.length) return;
      var v = picked[idx];
      var isPending = v[2].indexOf('awaiting') !== -1;
      var vendorEl = row.querySelector('.mock-vendor');
      var subEl = row.querySelector('.mock-sub');
      var amtEl = row.querySelector('.mock-amt');
      var statusEl = row.querySelector('.mock-status');
      if(vendorEl) vendorEl.textContent = v[0];
      if(subEl) subEl.textContent = v[1] + ' \u00B7 ' + v[2];
      if(amtEl) amtEl.textContent = randAmount();
      if(statusEl){
        statusEl.textContent = isPending ? 'Pending' : 'Matched';
        statusEl.className = 'mock-status ' + (isPending ? 'pending' : 'matched');
      }
    });

    var titleEl = document.getElementById('mockTitle');
    if(titleEl){
      var WEEKS = ['this week','last week','week 39','this cycle','current run','latest batch'];
      var pick = Math.floor(Math.random() * WEEKS.length);
      titleEl.textContent = 'ap-automation-run.xlsm \u2014 ' + WEEKS[pick];
    }

    var valEls = document.querySelectorAll('.mock-stat-val');
    if(valEls.length >= 2){
      valEls[0].textContent = Math.floor(Math.random() * 80) + 80;
      var pct = (96 + Math.random() * 3.8).toFixed(1);
      valEls[1].textContent = pct + '%';
    }

    var bars = document.querySelectorAll('.mock-bars span');
    bars.forEach(function(b){
      b.style.height = (Math.floor(Math.random() * 60) + 35) + '%';
    });
  })();

  /* ---------- SCROLL PROGRESS ---------- */
  try{
    var progressEl = document.getElementById('scrollProgress');
    if(progressEl){
      var ticking = false;
      function updateProgress(){
        var doc = document.documentElement;
        var scrollTop = window.scrollY || doc.scrollTop;
        var max = (doc.scrollHeight - doc.clientHeight) || 1;
        var pct = Math.min(100, Math.max(0, (scrollTop / max) * 100));
        progressEl.style.width = pct + '%';
        ticking = false;
      }
      window.addEventListener('scroll', function(){
        if(!ticking){ requestAnimationFrame(updateProgress); ticking = true; }
      }, {passive:true});
      updateProgress();
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

  /* ---------- SCROLL REVEAL TEXT (reactbits-style unblur) ---------- */
  try{
    var scrollReveals = document.querySelectorAll('.scroll-reveal');

    if(reduceMotion){
      scrollReveals.forEach(function(el){ el.classList.add('sr-in'); });
    } else {
      if('IntersectionObserver' in window){
        var srObs = new IntersectionObserver(function(entries){
          entries.forEach(function(e){
            if(e.isIntersecting){ e.target.classList.add('sr-in'); srObs.unobserve(e.target); }
          });
        }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
        scrollReveals.forEach(function(el){ srObs.observe(el); });
      } else {
        scrollReveals.forEach(function(el){ el.classList.add('sr-in'); });
      }
    }
  } catch(err){}

  /* ---------- HERO ENTRANCE SEQUENCE ---------- */
  try{
    var heroCopy = document.querySelector('.hero-copy');
    var heroDelay = reduceMotion ? 60 : (loaderTotalMs + 400);
    setTimeout(function(){
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
    if(hasFinePointer){
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
    if(hasFinePointer){
      document.querySelectorAll('.spot').forEach(function(card){
        card.addEventListener('mousemove', function(e){
          var rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
          card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
        });
      });
    }
  } catch(err){}

  /* ---------- HERO MOCKUP ENTRANCE + PARALLAX ---------- */
  try{
    var mock = document.getElementById('heroMock');
    var heroSection = document.querySelector('.hero');
    if(mock){
      setTimeout(function(){ mock.classList.add('mock-in'); }, reduceMotion ? 60 : (loaderTotalMs + 600));
    }
    if(mock && heroSection && hasFinePointer && !reduceMotion){
      heroSection.addEventListener('mousemove', function(e){
        if(!mock.classList.contains('mock-in')) return;
        var rect = heroSection.getBoundingClientRect();
        var px = (e.clientX - rect.left)/rect.width - 0.5;
        var py = (e.clientY - rect.top)/rect.height - 0.5;
        mock.style.transform = 'translate(' + (px*10) + 'px,' + (py*10) + 'px)';
      });
      heroSection.addEventListener('mouseleave', function(){ mock.style.transform = ''; });
    }
  } catch(err){}

  /* ---------- TARGET CURSOR (reactbits-style 4-corner follow) ---------- */
  try{
    if(!hasFinePointer || reduceMotion) throw new Error('skip');
    var cursor = document.getElementById('targetCursor');
    if(!cursor) throw new Error('no cursor');

    cursor.style.opacity = '0';
    var mouseX = 0, mouseY = 0;
    var curX = 0, curY = 0;
    var isActive = false;
    var isLocked = false;
    var lockRect = null;

    document.addEventListener('mousemove', function(e){
      mouseX = e.clientX;
      mouseY = e.clientY;
      if(!isActive){ curX = mouseX; curY = mouseY; isActive = true; cursor.style.opacity = '1'; }
    }, {passive:true});

    var lockTargets = document.querySelectorAll('a, button, input, textarea, .faq-q, .nav-burger, .proj-card, .cap-card, .cred-panel, .stat-chip');
    lockTargets.forEach(function(el){
      el.addEventListener('mouseenter', function(){
        lockRect = el.getBoundingClientRect();
        isLocked = true;
        cursor.classList.add('locked');
      });
      el.addEventListener('mouseleave', function(){
        isLocked = false;
        lockRect = null;
        cursor.classList.remove('locked');
      });
    });

    function animateCursor(){
      if(isLocked && lockRect){
        var cx = lockRect.left + lockRect.width / 2;
        var cy = lockRect.top + lockRect.height / 2;
        curX += (cx - curX) * 0.18;
        curY += (cy - curY) * 0.18;
        var w = lockRect.width + 16;
        var h = lockRect.height + 16;
        cursor.style.setProperty('--tw', w + 'px');
        cursor.style.setProperty('--th', h + 'px');
      } else {
        curX += (mouseX - curX) * 0.2;
        curY += (mouseY - curY) * 0.2;
        cursor.style.setProperty('--tw', '28px');
        cursor.style.setProperty('--th', '28px');
      }
      cursor.style.transform = 'translate(' + curX + 'px,' + curY + 'px) translate(-50%, -50%)';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener('mouseleave', function(){ cursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', function(){ cursor.style.opacity = '1'; });
  } catch(err){}

  /* ---------- DOT FIELD BACKGROUND (reactbits-style dotted gradient) ---------- */
  try{
    if(reduceMotion) throw new Error('reduced motion');

    var canvas = document.getElementById('dotCanvas');
    if(!canvas) throw new Error('no canvas');
    var ctx = canvas.getContext('2d');

    var cw = 0, ch = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    function resizeCanvas(){
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvas.style.width = cw + 'px';
      canvas.style.height = ch + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    /* dot grid configuration */
    var DOT_SPACING = 38;
    var DOT_RADIUS = 1.1;
    var BULGE_RADIUS = 160;
    var BULGE_STRENGTH = 1.8;
    var accentRGB = [224, 85, 59];

    var mouseX2 = -9999, mouseY2 = -9999;
    var tmx2 = -9999, tmy2 = -9999;

    if(hasFinePointer){
      window.addEventListener('mousemove', function(e){
        tmx2 = e.clientX;
        tmy2 = e.clientY;
      }, {passive:true});
      window.addEventListener('mouseleave', function(){
        tmx2 = -9999; tmy2 = -9999;
      }, {passive:true});
    }

    function renderDots(){
      mouseX2 += (tmx2 - mouseX2) * 0.1;
      mouseY2 += (tmy2 - mouseY2) * 0.1;

      ctx.clearRect(0, 0, cw, ch);

      var cols = Math.ceil(cw / DOT_SPACING) + 2;
      var rows = Math.ceil(ch / DOT_SPACING) + 2;
      var offsetX = (cw % DOT_SPACING) / 2;
      var offsetY = (ch % DOT_SPACING) / 2;

      for(var r = 0; r < rows; r++){
        for(var c = 0; c < cols; c++){
          var bx = c * DOT_SPACING + offsetX;
          var by = r * DOT_SPACING + offsetY;

          var dx = bx - mouseX2;
          var dy = by - mouseY2;
          var dist = Math.sqrt(dx * dx + dy * dy);

          var px = bx, py = by;
          var radius = DOT_RADIUS;
          var alpha = 0.06;
          var useAccent = false;

          if(dist < BULGE_RADIUS && dist > 0.01){
            var force = Math.pow(1 - dist / BULGE_RADIUS, 2);
            px = bx + (dx / dist) * force * BULGE_STRENGTH * 8;
            py = by + (dy / dist) * force * BULGE_STRENGTH * 8;
            radius = DOT_RADIUS + force * 2.2;
            alpha = 0.06 + force * 0.5;
            useAccent = true;
          }

          if(useAccent){
            var grad = ctx.createRadialGradient(px, py, 0, px, py, radius * 3);
            grad.addColorStop(0, 'rgba(' + accentRGB[0] + ',' + accentRGB[1] + ',' + accentRGB[2] + ',' + (alpha * 0.5) + ')');
            grad.addColorStop(1, 'rgba(' + accentRGB[0] + ',' + accentRGB[1] + ',' + accentRGB[2] + ',0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(px, py, radius * 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = 'rgba(' + accentRGB[0] + ',' + accentRGB[1] + ',' + accentRGB[2] + ',' + alpha + ')';
          } else {
            ctx.fillStyle = 'rgba(237,234,227,' + alpha + ')';
          }

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(renderDots);
    }
    renderDots();
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
