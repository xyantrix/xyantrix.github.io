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

  /* ---------- 3D GEOMETRIC EASTER EGGS ---------- */
  try{
    if(reduceMotion) throw new Error('reduced motion');

    var geoLayer = document.getElementById('geo3dLayer');
    var shapes = document.querySelectorAll('.geo3d');
    if(!geoLayer || !shapes.length) throw new Error('no shapes');

    var mouseX = 0, mouseY = 0, scrollY = 0;
    var tickingGeo = false;

    /* Parallax + rotation following mouse */
    if(window.matchMedia('(hover: hover) and (pointer: fine)').matches){
      window.addEventListener('mousemove', function(e){
        mouseX = (e.clientX / window.innerWidth - 0.5);
        mouseY = (e.clientY / window.innerHeight - 0.5);
        if(!tickingGeo){
          requestAnimationFrame(updateGeo);
          tickingGeo = true;
        }
      }, {passive:true});
    }

    window.addEventListener('scroll', function(){
      scrollY = window.scrollY;
      if(!tickingGeo){
        requestAnimationFrame(updateGeo);
        tickingGeo = true;
      }
    }, {passive:true});

    function updateGeo(){
      tickingGeo = false;
      shapes.forEach(function(shape, i){
        var depth = parseFloat(shape.getAttribute('data-depth')) || 0.1;
        var idx = i + 1;
        /* parallax offset based on mouse + scroll */
        var px = mouseX * 60 * depth * (idx % 2 ? 1 : -1);
        var py = mouseY * 40 * depth;
        var sy = scrollY * depth * 0.3;
        /* continuous rotation from mouse */
        var rx = mouseY * 25 * depth;
        var ry = mouseX * 35 * depth * (idx % 2 ? 1 : -1);
        shape.style.transform = 'translate(' + px + 'px,' + (py + sy) + 'px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotateZ(' + (idx * 7) + 'deg)';
      });
    }
    updateGeo();

    /* Easter egg: click a shape to make it spin */
    shapes.forEach(function(shape){
      shape.addEventListener('click', function(){
        if(shape.classList.contains('geo3d-spin')) return;
        shape.classList.add('geo3d-spin');
        setTimeout(function(){ shape.classList.remove('geo3d-spin'); }, 2000);
      });
    });

    /* Easter egg: Konami code reveals a burst of shapes */
    var konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    var konamiIdx = 0;
    document.addEventListener('keydown', function(e){
      var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if(key === konami[konamiIdx]){
        konamiIdx++;
        if(konamiIdx === konami.length){
          konamiIdx = 0;
          triggerBurst();
        }
      } else {
        konamiIdx = (key === konami[0]) ? 1 : 0;
      }
    });

    function triggerBurst(){
      shapes.forEach(function(shape, i){
        setTimeout(function(){
          shape.classList.add('geo3d-burst');
          setTimeout(function(){ shape.classList.remove('geo3d-burst'); }, 1500);
        }, i * 120);
      });
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
