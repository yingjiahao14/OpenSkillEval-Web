function initHeroSwitch(){
  const wrap=document.querySelector('[data-hero-switch]');
  if(!wrap) return;
  const buttons=wrap.querySelectorAll('button[data-view]');
  const views=document.querySelectorAll('.hero-view');
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    buttons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const target=btn.dataset.view;
    views.forEach(v=>v.classList.toggle('active',v.dataset.view===target));
  }));
}
function initTabs(){
  document.querySelectorAll('[data-tabs]').forEach((tabsWrap)=>{
    const btns=tabsWrap.querySelectorAll('button[data-tab]');
    const panels=tabsWrap.parentElement.querySelectorAll('.tab-panel');
    btns.forEach(btn=>btn.addEventListener('click',()=>{
      btns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const target=btn.dataset.tab;
      panels.forEach(p=>p.classList.toggle('active',p.dataset.tab===target));
    }));
  });
}
function initFaq(){
  document.querySelectorAll('.faq-item').forEach(item=>{
    const q=item.querySelector('.faq-q');
    q.addEventListener('click',()=> item.classList.toggle('open'));
  });
}
function initCarousel(){
  document.querySelectorAll('.carousel').forEach(car=>{
    const slides=car.querySelector('.carousel-slides');
    if(!slides) return;
    const all=car.querySelectorAll('.slide');
    let i=0;
    const render=()=>slides.style.transform=`translateX(-${i*100}%)`;
    car.querySelector('.prev')?.addEventListener('click',()=>{ i=(i-1+all.length)%all.length; render(); });
    car.querySelector('.next')?.addEventListener('click',()=>{ i=(i+1)%all.length; render(); });
  });
}
function initReveal(){
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('show'); });
  },{threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}
document.addEventListener('DOMContentLoaded',()=>{
  initHeroSwitch(); initTabs(); initFaq(); initCarousel(); initReveal();
});
