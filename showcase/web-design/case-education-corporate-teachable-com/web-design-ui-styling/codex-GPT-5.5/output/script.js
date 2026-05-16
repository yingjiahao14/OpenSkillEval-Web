document.addEventListener('DOMContentLoaded',()=>{
  const navToggle=document.querySelector('.mobile-toggle');
  const navLinks=document.querySelector('.nav-links');
  if(navToggle&&navLinks) navToggle.addEventListener('click',()=>navLinks.classList.toggle('open'));

  document.querySelectorAll('[data-tabs]').forEach(group=>{
    const buttons=group.querySelectorAll('[data-tab-target]');
    buttons.forEach(button=>button.addEventListener('click',()=>{
      const target=button.dataset.tabTarget;
      buttons.forEach(item=>item.classList.toggle('active',item===button));
      group.querySelectorAll('[data-tab-panel]').forEach(panel=>panel.classList.toggle('active',panel.dataset.tabPanel===target));
    }));
  });

  document.querySelectorAll('[data-faq]').forEach(faq=>{
    faq.querySelectorAll('.faq-q').forEach(button=>button.addEventListener('click',()=>{
      const item=button.closest('.faq-item');
      faq.querySelectorAll('.faq-item').forEach(other=>{if(other!==item) other.classList.remove('open')});
      item.classList.toggle('open');
    }));
  });

  document.querySelectorAll('[data-carousel]').forEach(carousel=>{
    const slides=[...carousel.querySelectorAll('.testimonial-slide')];
    let index=0;
    const show=next=>{index=(next+slides.length)%slides.length;slides.forEach((slide,i)=>slide.classList.toggle('active',i===index));};
    carousel.querySelector('[data-next]')?.addEventListener('click',()=>show(index+1));
    carousel.querySelector('[data-prev]')?.addEventListener('click',()=>show(index-1));
  });

  document.querySelectorAll('[data-demo-toggle]').forEach(button=>button.addEventListener('click',()=>{
    const content=document.querySelector(button.dataset.demoToggle);
    if(content) content.classList.toggle('open');
  }));

  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  }),{threshold:.14});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
});
