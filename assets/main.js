/* ============================================================
   PIYUSH TOMAR — PORTFOLIO
   Every feature isolated in its own try/catch. Pure vanilla JS,
   zero dependencies — runs from a double-clicked file or GitHub
   Pages. Reduced-motion visitors get instant, static equivalents.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function(){

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- LOADER — logo + language "Welcome" cycle ---------- */
  var loaderTotalMs = 2000;
  (function loader(){
    var loaderEl = document.getElementById('loader');
    var wordEl = document.getElementById('loaderWord');
    var langEl = document.getElementById('loaderLangName');
    if(!loaderEl) return;

    var WELCOMES = [
      ['English','Welcome'],['Spanish','Bienvenido'],['French','Bienvenue'],['German','Willkommen'],
      ['Italian','Benvenuto'],['Portuguese','Bem-vindo'],['Dutch','Welkom'],['Swedish','Välkommen'],
      ['Norwegian','Velkommen'],['Danish','Velkommen'],['Finnish','Tervetuloa'],['Icelandic','Velkomin'],
      ['Polish','Witamy'],['Czech','Vítejte'],['Slovak','Vitajte'],['Hungarian','Üdvözöljük'],
      ['Romanian','Bine ați venit'],['Bulgarian','Добре дошли'],['Greek','Καλώς ήρθατε'],['Russian','Добро пожаловать'],
      ['Ukrainian','Ласкаво просимо'],['Turkish','Hoş geldiniz'],['Arabic','أهلاً وسهلاً'],['Hebrew','ברוכים הבאים'],
      ['Persian','خوش آمدید'],['Urdu','خوش آمدید'],['Hindi','स्वागत है'],['Bengali','স্বাগতম'],
      ['Punjabi','ਜੀ ਆਇਆਂ ਨੂੰ'],['Gujarati','સ્વાગત છે'],['Marathi','स्वागत आहे'],['Tamil','வரவேற்கிறோம்'],
      ['Telugu','స్వాగతం'],['Kannada','ಸ್ವಾಗತ'],['Malayalam','സ്വാഗതം'],['Sinhala','ආයුබෝවන්'],
      ['Nepali','स्वागत छ'],['Thai','ยินดีต้อนรับ'],['Lao','ຍິນດີຕ້ອນຮັບ'],['Khmer','សូមស្វាគមន៍'],
      ['Vietnamese','Chào mừng'],['Indonesian','Selamat datang'],['Malay','Selamat datang'],['Filipino','Maligayang pagdating'],
      ['Japanese','ようこそ'],['Korean','환영합니다'],['Mandarin','欢迎'],['Cantonese','歡迎'],
      ['Mongolian','Тавтай морил'],['Kazakh','Қош келдіңіз'],['Uzbek','Xush kelibsiz'],['Georgian','კეთილი იყოს თქვენი მობრძანება'],
      ['Armenian','Բարի գալուստ'],['Azerbaijani','Xoş gəldiniz'],['Swahili','Karibu'],['Zulu','Wamukelekile'],
      ['Xhosa','Wamkelekile'],['Amharic','እንኳን ደህና መጡ'],['Somali','Soo dhawoow'],['Hausa','Barka da zuwa'],
      ['Yoruba','Kaabo'],['Igbo','Nnọọ'],['Afrikaans','Welkom'],['Croatian','Dobrodošli'],
      ['Serbian','Добродошли'],['Bosnian','Dobrodošli'],['Slovenian','Dobrodošli'],['Macedonian','Добредојдовте'],
      ['Albanian','Mirë se vini'],['Lithuanian','Sveiki atvykę'],['Latvian','Laipni lūdzam'],['Estonian','Tere tulemast'],
      ['Maltese','Merħba'],['Irish','Fáilte'],['Welsh','Croeso'],['Scots Gaelic','Fàilte'],
      ['Basque','Ongi etorri'],['Catalan','Benvingut'],['Galician','Benvido'],['Luxembourgish','Wëllkomm'],
      ['Yiddish','ברוכים הבאים'],['Esperanto','Bonvenon'],['Haitian Creole','Byenveni'],['Samoan','Talofa'],
      ['Maori','Nau mai'],['Hawaiian','E komo mai'],['Fijian','Ni sa bula'],['Tongan','Talitali fiefia'],
      ['Malagasy','Tongasoa'],['Burmese','ကြိုဆိုပါတယ်'],['Tibetan','བཀྲ་ཤིས་བདེ་ལེགས'],['Punjabi (Shahmukhi)','خوش آمدید'],
      ['Sindhi','ڀليڪار'],['Pashto','ښه راغلاست'],['Kurdish','Bi xêr hatî'],['Tatar','Рәхим итегез'],
      ['Chechen','Марша догIийла'],['Corsican','Benvenuti'],['Sardinian','Beni benius'],['Breton','Degemer mat'],
      ['Faroese','Vælkomin'],['Greenlandic','Tikilluarit'],['Quechua','Allin hamusqayki'],['Guarani','Tereg̃uahẽ porã'],
      ['Aymara','Aski jutawi'],['Zulu (formal)','Siyakwamukela'],['Chichewa','Takulandirani'],['Sesotho','Rea o amohela']
    ];

    if(reduceMotion){
      loaderEl.style.display = 'none';
      loaderTotalMs = 0;
      return;
    }

    document.body.classList.add('loading');

    var pool = WELCOMES.slice(1);
    for(var i = pool.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i+1));
      var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    var sequence = pool.slice(0, 21).concat([WELCOMES[0]]);
    var n = sequence.length;
    var duration = loaderTotalMs;

    requestAnimationFrame(function(){
      requestAnimationFrame(function(){ loaderEl.classList.add('progressing'); });
    });

    sequence.forEach(function(pair, k){
      var t = k / (n - 1);
      var eased = 1 - Math.pow(1 - t, 3);
      var at = Math.round(duration * eased);
      setTimeout(function(){
        wordEl.textContent = pair[1];
        langEl.textContent = pair[0];
        if(k === n - 1){
          wordEl.classList.add('final');
          loaderEl.classList.add('confirm');
        }
      }, at);
    });

    /* Smooth fade: loader fades out completely, then site fades in.
       No letterbox bars, no hard cut — just a clean dissolve. */
    setTimeout(function(){
      loaderEl.classList.add('out');
      document.body.classList.remove('loading');
      setTimeout(function(){ loaderEl.style.display = 'none'; }, 850);
    }, duration + 650);
  })();

  /* ---------- HERO MOCKUP RANDOMIZER — unique every visit ---------- */
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

  /* ---------- TEXT SPLIT ---------- */
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
    var heroDelay = reduceMotion ? 60 : (loaderTotalMs + 650);
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

  /* ---------- HERO MOCKUP ENTRANCE + PARALLAX ---------- */
  try{
    var mock = document.getElementById('heroMock');
    var heroSection = document.querySelector('.hero');
    if(mock){
      setTimeout(function(){ mock.classList.add('mock-in'); }, reduceMotion ? 60 : (loaderTotalMs + 880));
    }
    if(mock && heroSection && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion){
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

  /* ---------- AMBIENT ORB CANVAS — modern particle field ---------- */
  try{
    if(reduceMotion) throw new Error('reduced motion');

    var canvas = document.getElementById('orbCanvas');
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

    /* particle count scales with screen size */
    var particleCount = Math.min(55, Math.floor(cw * ch / 22000));
    var orbs = [];
    var accentRGB = [224, 85, 59];

    for(var i = 0; i < particleCount; i++){
      orbs.push({
        x: Math.random() * cw,
        y: Math.random() * ch,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.8 + 0.4,
        baseAlpha: Math.random() * 0.25 + 0.04,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.008 + 0.003,
        drift: Math.random() * 0.5 + 0.3
      });
    }

    /* mouse parallax */
    var mx = 0, my = 0, tmx = 0, tmy = 0;
    if(window.matchMedia('(hover: hover) and (pointer: fine)').matches){
      window.addEventListener('mousemove', function(e){
        tmx = (e.clientX / cw - 0.5);
        tmy = (e.clientY / ch - 0.5);
      }, {passive:true});
    }

    var t = 0;

    function renderOrbs(){
      t += 0.01;
      mx += (tmx - mx) * 0.04;
      my += (tmy - my) * 0.04;

      ctx.clearRect(0, 0, cw, ch);

      /* draw connecting lines between nearby particles */
      ctx.lineWidth = 0.5;
      for(var a = 0; a < orbs.length; a++){
        for(var b = a + 1; b < orbs.length; b++){
          var dx = orbs[a].x - orbs[b].x;
          var dy = orbs[a].y - orbs[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if(dist < 130){
            var alpha = (1 - dist / 130) * 0.06;
            ctx.strokeStyle = 'rgba(' + accentRGB[0] + ',' + accentRGB[1] + ',' + accentRGB[2] + ',' + alpha + ')';
            ctx.beginPath();
            ctx.moveTo(orbs[a].x, orbs[a].y);
            ctx.lineTo(orbs[b].x, orbs[b].y);
            ctx.stroke();
          }
        }
      }

      /* draw particles with soft glow */
      orbs.forEach(function(o){
        o.x += o.vx + mx * o.drift;
        o.y += o.vy + my * o.drift;
        o.pulsePhase += o.pulseSpeed;

        if(o.x < -20) o.x = cw + 20;
        if(o.x > cw + 20) o.x = -20;
        if(o.y < -20) o.y = ch + 20;
        if(o.y > ch + 20) o.y = -20;

        var pulse = (Math.sin(o.pulsePhase) + 1) * 0.5;
        var alpha = o.baseAlpha + pulse * 0.12;
        var radius = o.r + pulse * 0.6;

        /* glow halo */
        var grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, radius * 4);
        grad.addColorStop(0, 'rgba(' + accentRGB[0] + ',' + accentRGB[1] + ',' + accentRGB[2] + ',' + (alpha * 0.4) + ')');
        grad.addColorStop(1, 'rgba(' + accentRGB[0] + ',' + accentRGB[1] + ',' + accentRGB[2] + ',0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, radius * 4, 0, Math.PI * 2);
        ctx.fill();

        /* core dot */
        ctx.fillStyle = 'rgba(' + accentRGB[0] + ',' + accentRGB[1] + ',' + accentRGB[2] + ',' + alpha + ')';
        ctx.beginPath();
        ctx.arc(o.x, o.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(renderOrbs);
    }
    renderOrbs();

    /* Easter egg: Konami code triggers a particle burst */
    var konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    var konamiIdx = 0;
    document.addEventListener('keydown', function(e){
      var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if(key === konami[konamiIdx]){
        konamiIdx++;
        if(konamiIdx === konami.length){
          konamiIdx = 0;
          orbs.forEach(function(o){
            o.vx = (Math.random() - 0.5) * 4;
            o.vy = (Math.random() - 0.5) * 4;
            o.baseAlpha = 0.4;
            setTimeout(function(){ o.vx = (Math.random() - 0.5) * 0.18; o.vy = (Math.random() - 0.5) * 0.12; o.baseAlpha = Math.random() * 0.25 + 0.04; }, 2000);
          });
        }
      } else {
        konamiIdx = (key === konami[0]) ? 1 : 0;
      }
    });

    /* Easter egg: click anywhere on background to create a ripple burst */
    document.addEventListener('click', function(e){
      if(e.target.closest('a, button, input, textarea, .faq-q, .nav-burger, form')) return;
      orbs.forEach(function(o){
        var dx = o.x - e.clientX;
        var dy = o.y - e.clientY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < 200){
          var force = (1 - dist / 200) * 3;
          o.vx += (dx / dist) * force;
          o.vy += (dy / dist) * force;
          setTimeout(function(){ o.vx = (Math.random() - 0.5) * 0.18; o.vy = (Math.random() - 0.5) * 0.12; }, 1500);
        }
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
