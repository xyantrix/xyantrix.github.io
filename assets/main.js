(function(){
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches,$=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
function safe(f){try{f()}catch(e){}}
document.addEventListener('DOMContentLoaded',function(){
  var body=document.body,t=RM?0:1300;
  if(!RM){body.classList.add('loading');requestAnimationFrame(function(){var b=$('#loader .bar i');if(b)b.style.width='100%'})}
  setTimeout(function(){body.classList.remove('loading');$('.hero-copy').classList.add('hero-in')},t);
  safe(function(){$$('.mq .marquee-track,.mq .logo-marquee-track').forEach(function(tr){tr.innerHTML+=tr.innerHTML})});
  safe(function(){var p=$('#progress'),n=$('#nav'),tk=0;addEventListener('scroll',function(){if(tk)return;tk=1;requestAnimationFrame(function(){var d=document.documentElement;p.style.width=Math.min(100,scrollY/((d.scrollHeight-d.clientHeight)||1)*100)+'%';n.classList.toggle('scrolled',scrollY>20);tk=0})},{passive:true})});
  safe(function(){var b=$('#burger'),s=$('#sheet');function set(o){b.classList.toggle('open',o);s.classList.toggle('open',o);b.setAttribute('aria-expanded',o);body.style.overflow=o?'hidden':''}
    b.addEventListener('click',function(){set(!s.classList.contains('open'))});$$('a',s).forEach(function(a){a.addEventListener('click',function(){set(false)})});addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});addEventListener('resize',function(){if(innerWidth>=860)set(false)})});
  safe(function(){var ls=$$('.links a'),secs=ls.map(function(a){return $(a.getAttribute('href'))});
    if(!('IntersectionObserver' in window))return;var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)ls.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});secs.forEach(function(s){s&&io.observe(s)})});
  safe(function(){function mk(sel,cls,opt){var els=$$(sel);if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add(cls)});return}
      var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add(cls);io.unobserve(e.target)}})},opt);els.forEach(function(e){io.observe(e)})}
    $$('.reveal').forEach(function(el){var i=[].indexOf.call(el.parentNode.children,el);el.style.transitionDelay=Math.min(i,5)*70+'ms'});
    mk('.reveal','visible',{threshold:.08,rootMargin:'0px 0px -40px 0px'});mk('.sr','in',{threshold:.2})});
  safe(function(){var els=$$('[data-count]');function run(el){var T=+el.dataset.count,s=el.dataset.suffix||'',st=null;(function f(ts){st=st||ts;var p=Math.min(1,(ts-st)/1400);el.textContent=Math.round(T*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(f)})(performance.now())}
    if(!('IntersectionObserver' in window)||RM){els.forEach(function(e){e.textContent=e.dataset.count+(e.dataset.suffix||'')});return}
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);io.unobserve(e.target)}})},{threshold:.6});els.forEach(function(e){io.observe(e)})});
  safe(function(){var tabs=$$('.tab'),ps=$$('.panel');tabs.forEach(function(tb,i){tb.addEventListener('click',function(){tabs.forEach(function(x,j){x.setAttribute('aria-selected',i===j);ps[j].classList.toggle('on',i===j)})});
    tb.addEventListener('keydown',function(e){var n=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(n){var k=tabs[(i+n+tabs.length)%tabs.length];k.focus();k.click()}})})});
  safe(function(){$$('.fq button').forEach(function(b){b.addEventListener('click',function(){var it=b.parentNode,o=it.classList.contains('open');$$('.fq.open').forEach(function(x){x.classList.remove('open');$('button',x).setAttribute('aria-expanded','false')});if(!o){it.classList.add('open');b.setAttribute('aria-expanded','true')}})})});
  safe(function(){if(!matchMedia('(hover:hover) and (pointer:fine)').matches)return;$$('.card').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')})});
    $$('.btn').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.15)+'px,'+((e.clientY-r.top-r.height/2)*.25)+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})})});
  safe(function(){$('#cf').addEventListener('submit',function(e){e.preventDefault();var g=function(i){return $('#'+i).value.trim()},sub=g('cs')||'Portfolio enquiry';
    $('#ok').classList.add('show');location.href='mailto:piyushtomar1222@gmail.com?subject='+encodeURIComponent(sub)+'&body='+encodeURIComponent('Name: '+g('cn')+'\nEmail: '+g('ce')+'\n\n'+g('cm'))})});
});
})();
