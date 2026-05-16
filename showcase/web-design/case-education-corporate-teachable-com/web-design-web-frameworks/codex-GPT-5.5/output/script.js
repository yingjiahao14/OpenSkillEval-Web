document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.querySelector('.nav');
  document.querySelector('.mobile-toggle')?.addEventListener('click',()=>nav.classList.toggle('open'));
  document.querySelectorAll('[data-tabs]').forEach(group=>{
    const buttons=group.querySelectorAll('[data-tab-target]');
    buttons.forEach(btn=>btn.addEventListener('click',()=>{
      const target=btn.dataset.tabTarget;
      buttons.forEach(b=>b.classList.toggle('active',b===btn));
      document.querySelectorAll(`[data-tab-panel^="${group.dataset.tabs}:"]`).forEach(panel=>panel.classList.toggle('active',panel.dataset.tabPanel===`${group.dataset.tabs}:${target}`));
    }));
  });
  document.querySelectorAll('.faq').forEach(faq=>{
    faq.querySelectorAll('.faq-q').forEach(q=>q.addEventListener('click',()=>{
      const item=q.closest('.faq-item');
      faq.querySelectorAll('.faq-item').forEach(i=>{if(i!==item)i.classList.remove('active')});
      item.classList.toggle('active');
    }));
  });
  document.querySelectorAll('.demo-toggle').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.demo-box').classList.toggle('active')));
  document.querySelectorAll('.carousel').forEach(carousel=>{
    const slides=[...carousel.querySelectorAll('.testimonial')]; let index=0;
    const show=next=>{index=(next+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===index));};
    carousel.querySelector('[data-prev]')?.addEventListener('click',()=>show(index-1));
    carousel.querySelector('[data-next]')?.addEventListener('click',()=>show(index+1));
    if(slides.length) show(0);
  });
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
});
