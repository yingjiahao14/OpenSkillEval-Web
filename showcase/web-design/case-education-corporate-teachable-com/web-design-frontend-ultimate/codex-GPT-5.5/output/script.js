document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.querySelector('.nav');
  document.querySelector('.menu-btn')?.addEventListener('click',()=>nav?.classList.toggle('open'));
  document.querySelectorAll('[data-hero-tab]').forEach(btn=>btn.addEventListener('click',()=>{
    const target=btn.dataset.heroTab;
    document.querySelectorAll('[data-hero-tab]').forEach(b=>b.classList.toggle('active',b===btn));
    document.querySelectorAll('[data-preview]').forEach(p=>p.classList.toggle('active',p.dataset.preview===target));
  }));
  document.querySelectorAll('[data-feature-tab]').forEach(btn=>btn.addEventListener('click',()=>{
    const group=btn.closest('.feature-tabs'); const target=btn.dataset.featureTab;
    group.querySelectorAll('[data-feature-tab]').forEach(b=>b.classList.toggle('active',b===btn));
    group.querySelectorAll('[data-feature-panel]').forEach(p=>p.classList.toggle('active',p.dataset.featurePanel===target));
  }));
  document.querySelectorAll('.faq').forEach(faq=>{
    faq.querySelectorAll('.faq-q').forEach(q=>q.addEventListener('click',()=>{
      const item=q.closest('.faq-item');
      faq.querySelectorAll('.faq-item').forEach(i=>{if(i!==item)i.classList.remove('active')});
      item.classList.toggle('active');
    }));
  });
  document.querySelectorAll('.demo-toggle .demo-head').forEach(head=>head.addEventListener('click',()=>head.closest('.demo-toggle').classList.toggle('active')));
  document.querySelectorAll('.carousel').forEach(carousel=>{
    const track=carousel.querySelector('.testimonial-track'); const cards=[...carousel.querySelectorAll('.testimonial')]; let index=0;
    const update=()=>{const step=cards[0]?.getBoundingClientRect().width+18||0; const per=innerWidth<650?1:innerWidth<990?2:3; index=Math.max(0,Math.min(index,cards.length-per)); track.style.transform=`translateX(${-index*step}px)`};
    carousel.querySelector('[data-next]')?.addEventListener('click',()=>{index++;update()});
    carousel.querySelector('[data-prev]')?.addEventListener('click',()=>{index--;update()}); addEventListener('resize',update); update();
  });
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
});
