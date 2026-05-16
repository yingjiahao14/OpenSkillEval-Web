document.querySelectorAll('.tab-switch').forEach((wrap)=>{
  const buttons=[...wrap.querySelectorAll('button')];
  const target=wrap.dataset.target;
  const panes=[...document.querySelectorAll(`[data-group="${target}"]`)];
  buttons.forEach(btn=>btn.addEventListener('click',()=>{
    buttons.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    panes.forEach(p=>p.hidden=p.dataset.view!==btn.dataset.view);
  }));
});

document.querySelectorAll('.tabs').forEach((tabs)=>{
  const btns=[...tabs.querySelectorAll('button')];
  const key=tabs.dataset.tabs;
  const panels=[...document.querySelectorAll(`.tab-panel[data-tabs="${key}"]`)];
  btns.forEach(btn=>btn.addEventListener('click',()=>{
    btns.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    panels.forEach(p=>p.classList.toggle('active', p.dataset.panel===btn.dataset.panel));
  }));
});

document.querySelectorAll('[data-carousel]').forEach((c)=>{
  const slides=[...c.querySelectorAll('.testimonial')];
  let idx=0;
  const show=(i)=>slides.forEach((s,n)=>s.classList.toggle('active',n===i));
  c.querySelector('[data-prev]')?.addEventListener('click',()=>{idx=(idx-1+slides.length)%slides.length;show(idx);});
  c.querySelector('[data-next]')?.addEventListener('click',()=>{idx=(idx+1)%slides.length;show(idx);});
});

document.querySelectorAll('.faq-question').forEach((q)=>{
  q.addEventListener('click',()=> q.closest('.faq-item').classList.toggle('open'));
});

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
