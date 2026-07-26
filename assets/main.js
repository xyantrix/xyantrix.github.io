/* ============================================================
   PIYUSH TOMAR — PORTFOLIO
   Every feature isolated in its own try/catch. Pure vanilla JS,
   zero dependencies — runs from a double-clicked file or GitHub
   Pages. Reduced-motion visitors get instant, static equivalents.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function(){

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- LOADER — logo + 100-language "Welcome" cycle ---------- */
  var loaderTotalMs = 2000; /* language-cycle duration, used to time the hero reveal below */
  (function loader(){
    var loaderEl = document.getElementById('loader');
    var wordEl = document.getElementById('loaderWord');
    var langEl = document.getElementById('loaderLangName');
    if(!loaderEl) return;

    /* "Welcome" in 100 languages. English always lands last so the
       cycle resolves on the word every visitor will read instantly. */
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

    /* pick a fresh, randomized subset every load so it never repeats
       the same sequence twice — English "Welcome" always resolves it */
    var pool = WELCOMES.slice(1); // exclude English, added back at the end
    for(var i = pool.length - 1; i > 0; i--){
      var j = Math.floor(Math.random() * (i+1));
      var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    var sequence = pool.slice(0, 21).concat([WELCOMES[0]]); // 21 random + English
    var n = sequence.length;
    var duration = loaderTotalMs; // ms — matches heroDelay timing below

    requestAnimationFrame(function(){
      requestAnimationFrame(function(){ loaderEl.classList.add('progressing'); });
    });

    sequence.forEach(function(pair, k){
      var t = k / (n - 1);
      var eased = 1 - Math.pow(1 - t, 3); // ease-out cubic: fast start, slow finish
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

    setTimeout(function(){
      loaderEl.classList.add('out');
      document.body.classList.remove('loading');
      setTimeout(function(){ loaderEl.style.display = 'none'; }, 750);
    }, duration + 650);
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
    var heroDelay = reduceMotion ? 60 : (loaderTotalMs + 550);
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

  /* ---------- CUSTOM CURSOR — two gradient blobs moving together ---------- */
  try{
    var cursor = document.getElementById('cursor');
    var trail = document.getElementById('cursorTrail');
    if(cursor && trail && window.matchMedia('(hover: hover) and (pointer: fine)').matches){
      document.body.classList.add('cursor-ready');
      var cx=0, cy=0, tx=0, ty=0, tx2=0, ty2=0;
      window.addEventListener('mousemove', function(e){ tx = e.clientX; ty = e.clientY; });
      function updateCursor(){
        cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
        tx2 += (tx - tx2) * 0.1; ty2 += (ty - ty2) * 0.1;
        cursor.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
        trail.style.transform = 'translate(' + tx2 + 'px,' + ty2 + 'px)';
        requestAnimationFrame(updateCursor);
      }
      updateCursor();
      var hoverables = document.querySelectorAll('a, button, input, textarea, .magnetic, .spot, .faq-q, .logo-chip');
      hoverables.forEach(function(el){
        el.addEventListener('mouseenter', function(){ document.body.classList.add('cursor-hover'); });
        el.addEventListener('mouseleave', function(){ document.body.classList.remove('cursor-hover'); });
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
      setTimeout(function(){ mock.classList.add('mock-in'); }, reduceMotion ? 60 : (loaderTotalMs + 780));
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
