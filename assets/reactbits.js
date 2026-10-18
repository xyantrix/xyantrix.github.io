/* React Bits components — dependency-free vanilla ports.
   Aurora · DotGrid · SplitText · ShinyText · DecryptedText · ClickSpark · TiltCard · ScrollVelocity */
(function(){
'use strict';
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var FINE=matchMedia('(hover: hover) and (pointer: fine)').matches;
function safe(f){try{f();}catch(e){}}
function ready(f){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',f):f();}

/* ---- Aurora (WebGL) ---- */
function aurora(){
  var c=document.getElementById('aurora'); if(!c||RM) return;
  var gl=c.getContext('webgl',{premultipliedAlpha:true,alpha:true,antialias:false}); if(!gl) return;
  var vs='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
  var fs='#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform vec2 r;uniform float t;'+
  'void main(){vec2 p=gl_FragCoord.xy/r;float a=0.;vec3 col=vec3(0.);'+
  'for(int i=0;i<3;i++){float k=float(i);'+
  'float h=.74+.07*sin(p.x*(2.+k)+t*(.18+.07*k)+k*2.1)+.04*sin(p.x*6.-t*.35+k);'+
  'float d=p.y-h;float g=exp(-d*d*(40.-k*8.))*(d>0.?.55:1.);'+
  'vec3 cc=mix(vec3(.43,.48,1.),vec3(.2,.85,.95),.5+.5*sin(p.x*3.+k*1.7+t*.12));'+
  'col+=cc*g;a+=g;}'+
  'a=clamp(a*.5,0.,1.)*smoothstep(0.,.3,p.y);float n=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)/255.;gl_FragColor=vec4(col*a*.35+n*a,a*.4);}';
  function sh(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return gl.getShaderParameter(s,gl.COMPILE_STATUS)?s:null;}
  var v=sh(gl.VERTEX_SHADER,vs),f=sh(gl.FRAGMENT_SHADER,fs); if(!v||!f) return;
  var pr=gl.createProgram();gl.attachShader(pr,v);gl.attachShader(pr,f);gl.linkProgram(pr);
  if(!gl.getProgramParameter(pr,gl.LINK_STATUS)) return;
  gl.useProgram(pr);
  var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  var loc=gl.getAttribLocation(pr,'a');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  var ur=gl.getUniformLocation(pr,'r'),ut=gl.getUniformLocation(pr,'t');
  function size(){var s=.5,w=Math.max(2,(c.clientWidth||innerWidth)*s|0),h=Math.max(2,(c.clientHeight||innerHeight)*s|0);c.width=w;c.height=h;gl.viewport(0,0,w,h);gl.uniform2f(ur,w,h);}
  size();addEventListener('resize',size);
  var vis=true,last=0,t0=performance.now(),fade=1;
  function onScroll(){fade=1;c.style.setProperty('--fade',fade.toFixed(3));if(fade>.02&&!document.hidden&&!vis){vis=true;loop(performance.now());}}
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  document.addEventListener('visibilitychange',function(){vis=!document.hidden;if(vis)loop(performance.now());});
  var hero=document.querySelector('.hero');
  if('IntersectionObserver' in window&&hero) new IntersectionObserver(function(e){var was=vis;vis=(e[0].isIntersecting||fade>.02)&&!document.hidden;if(vis&&!was)loop(performance.now());},{threshold:0}).observe(hero);
  function loop(now){
    if(!vis||fade<=.02){if(fade<=.02)vis=false;return;}
    if(now-last>33){last=now;gl.uniform1f(ut,(now-t0)/1000);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,3);}
    requestAnimationFrame(loop);
  }
  c.classList.add('on');loop(t0);
}

/* ---- DotGrid (interactive, sleeps when idle) ---- */
function dotGrid(){
  var c=document.getElementById('dotCanvas'); if(!c||RM) return;
  var x=c.getContext('2d'),dpr=Math.min(devicePixelRatio||1,2),W=0,H=0,S=36,R=160;
  var mx=-9999,my=-9999,tx=-9999,ty=-9999,run=false,dots=[];
  function size(){W=c.clientWidth||innerWidth;H=c.clientHeight||innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);
    dots=[];var ox=(W%S)/2,oy=(H%S)/2;for(var j=-1;j<=H/S+1;j++)for(var i=-1;i<=W/S+1;i++)dots.push([i*S+ox,j*S+oy]);draw();}
  function draw(){
    x.clearRect(0,0,W,H);x.fillStyle='rgba(236,238,246,.07)';x.beginPath();
    var near=[],n=dots.length,d;
    for(var k=0;k<n;k++){var p=dots[k],dx=p[0]-mx,dy=p[1]-my;d=dx*dx+dy*dy;
      if(d<R*R)near.push([p[0],p[1],Math.sqrt(d),dx,dy]);else{x.moveTo(p[0]+1.1,p[1]);x.arc(p[0],p[1],1.1,0,6.283);}}
    x.fill();
    for(var m=0;m<near.length;m++){var q=near[m],f=Math.pow(1-q[2]/R,2),px=q[0],py=q[1];
      if(q[2]>.01){px+=q[3]/q[2]*f*14;py+=q[4]/q[2]*f*14;}
      x.fillStyle='rgba(124,137,255,'+(.08+f*.8)+')';x.beginPath();x.arc(px,py,1.1+f*2.4,0,6.283);x.fill();}
  }
  function tick(){mx+=(tx-mx)*.14;my+=(ty-my)*.14;draw();
    if(Math.abs(tx-mx)>.4||Math.abs(ty-my)>.4)requestAnimationFrame(tick);else run=false;}
  function wake(){if(!run){run=true;requestAnimationFrame(tick);}}
  size();var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(size,120);});
  if(FINE){addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;var px=e.clientX-r.left,py=e.clientY-r.top;if(mx<-999){mx=px;my=py;}tx=px;ty=py;wake();},{passive:true});
    document.addEventListener('mouseleave',function(){tx=ty=-9999;mx=my=-9999;draw();});}
}

/* ---- SplitText ---- */
function splitText(el){
  if(!el||RM) return;var i=0;
  (function walk(node){
    Array.prototype.slice.call(node.childNodes).forEach(function(n){
      if(n.nodeType===3){
        var frag=document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function(w){
          if(!w) return;
          if(/^\s+$/.test(w)){frag.appendChild(document.createTextNode(' '));return;}
          var word=document.createElement('span');word.className='sw';
          for(var k=0;k<w.length;k++){var ch=document.createElement('span');ch.className='sc';ch.textContent=w[k];ch.style.setProperty('--i',i++);word.appendChild(ch);}
          frag.appendChild(word);
        });
        n.parentNode.replaceChild(frag,n);
      } else if(n.nodeType===1&&n.tagName!=='BR') walk(n);
    });
  })(el);
  el.setAttribute('aria-label',el.textContent.replace(/\s+/g,' ').trim());
  el.classList.add('split');
}

/* ---- DecryptedText ---- */
var GL='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&$@';
function decrypt(el,dur){
  if(RM||!el) return;var txt=el.dataset.orig||(el.dataset.orig=el.textContent);
  clearInterval(el._d);dur=dur||700;var s=performance.now();
  el._d=setInterval(function(){
    var p=Math.min(1,(performance.now()-s)/dur),keep=Math.floor(txt.length*p),o='';
    for(var i=0;i<txt.length;i++){var c=txt[i];o+=(i<keep||c===' ')?c:GL[Math.random()*GL.length|0];}
    el.textContent=o;if(p>=1){clearInterval(el._d);el.textContent=txt;}
  },40);
}

/* ---- ClickSpark ---- */
function clickSpark(){
  if(RM) return;var box=document.createElement('div');box.className='spark-box';box.setAttribute('aria-hidden','true');document.body.appendChild(box);
  addEventListener('pointerdown',function(e){
    if(e.target.closest&&e.target.closest('input,textarea,select'))return;
    for(var i=0;i<8;i++){var s=document.createElement('i');s.className='spark';
      s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';s.style.setProperty('--a',(i*45+Math.random()*12)+'deg');
      s.addEventListener('animationend',function(){this.remove();});box.appendChild(s);}
  },{passive:true});
}

/* ---- TiltCard ---- */
function tilt(){
  if(!FINE||RM) return;
  document.querySelectorAll('.proj,.cap,.step,.stat').forEach(function(el){
    var raf=0;
    el.addEventListener('pointermove',function(e){
      if(!el.classList.contains('visible'))return;
      var r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
      cancelAnimationFrame(raf);raf=requestAnimationFrame(function(){el.style.transform='perspective(900px) rotateX('+(-py*5)+'deg) rotateY('+(px*6)+'deg) translateY(-2px)';});
    });
    el.addEventListener('pointerleave',function(){cancelAnimationFrame(raf);el.style.transform='';});
  });
}

/* ---- ScrollVelocity (marquees speed up as you scroll) ---- */
function scrollVelocity(){
  if(RM) return;
  var tracks=document.querySelectorAll('.marquee-track,.logo-marquee-track'),lastY=scrollY,v=0,run=false;
  function anims(){var a=[];tracks.forEach(function(t){if(t.getAnimations)t.getAnimations().forEach(function(x){a.push(x);});});return a;}
  function step(){
    v*=.9;var rate=1+Math.min(7,Math.abs(v)*.25);
    anims().forEach(function(a){a.playbackRate=rate;});
    if(Math.abs(v)>.05)requestAnimationFrame(step);else{run=false;anims().forEach(function(a){a.playbackRate=1;});}
  }
  addEventListener('scroll',function(){v=scrollY-lastY;lastY=scrollY;if(!run){run=true;requestAnimationFrame(step);}},{passive:true});
}

ready(function(){
  safe(aurora);safe(dotGrid);safe(clickSpark);safe(tilt);safe(scrollVelocity);
  safe(function(){splitText(document.querySelector('.hero h1'));});
  safe(function(){
    var rows=document.querySelectorAll('.mock-vendor');
    if(!rows.length||!('IntersectionObserver' in window)) return;
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){io.unobserve(e.target);setTimeout(function(){decrypt(e.target,800);},(RM?0:2600));}});},{threshold:.4});
    rows.forEach(function(r){io.observe(r);});
    document.querySelectorAll('.cr-v,.af-value').forEach(function(el){el.addEventListener('mouseenter',function(){decrypt(el,500);});});
  });
});
})();
