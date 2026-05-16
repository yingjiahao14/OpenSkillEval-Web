function initDropdowns(){
  document.querySelectorAll('.dropdown').forEach((d)=>{
    const b=d.querySelector('.drop-btn');
    b?.addEventListener('click',()=>d.classList.toggle('open'));
    document.addEventListener('click',(e)=>{ if(!d.contains(e.target)) d.classList.remove('open');});
  });
}
function initTabs(){
  document.querySelectorAll('[data-tabs]').forEach((root)=>{
    const buttons=[...root.querySelectorAll('[role="tab"]')];
    const panels=[...root.querySelectorAll('[role="tabpanel"]')];
    buttons.forEach((btn)=>btn.addEventListener('click',()=>{
      const id=btn.getAttribute('aria-controls');
      buttons.forEach((b)=>b.setAttribute('aria-selected',String(b===btn)));
      panels.forEach((p)=>p.classList.toggle('active',p.id===id));
    }));
  });
}
function initAccordion(){
  document.querySelectorAll('[data-accordion]').forEach((root)=>{
    const items=[...root.querySelectorAll('.accordion-item')];
    items.forEach((item)=>{
      item.querySelector('.accordion-trigger')?.addEventListener('click',()=>{
        items.forEach((x)=>x.classList.remove('open'));
        item.classList.add('open');
      });
    });
    items[0]?.classList.add('open');
  });
}
function initCarousel(){
  document.querySelectorAll('[data-carousel]').forEach((root)=>{
    const slides=[...root.querySelectorAll('.testimonial-slide')];
    const dots=[...root.querySelectorAll('.dot')];
    function show(i){
      slides.forEach((s,idx)=>s.style.display=idx===i?'grid':'none');
      dots.forEach((d,idx)=>d.classList.toggle('active',idx===i));
    }
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));
    show(0);
  });
}
function initCookieBanner(){
  const banner=document.getElementById('cookie-banner');
  if(!banner) return;
  const key='wellstream_cookie_pref';
  if(!localStorage.getItem(key)) banner.classList.add('show');
  banner.querySelectorAll('[data-cookie]').forEach((btn)=>btn.addEventListener('click',()=>{
    localStorage.setItem(key,btn.getAttribute('data-cookie'));
    banner.classList.remove('show');
  }));
}
function initDemoForm(){
  const form=document.getElementById('demo-form');
  if(!form) return;
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let ok=true;
    form.querySelectorAll('[data-required]').forEach((el)=>{
      const err=form.querySelector(`[data-error="${el.name}"]`);
      const valid=String(el.value||'').trim().length>0;
      if(err) err.classList.toggle('show',!valid);
      if(!valid) ok=false;
    });
    const email=form.querySelector('[name="email"]');
    const emailErr=form.querySelector('[data-error="email"]');
    if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { emailErr?.classList.add('show'); ok=false; }
    if(ok){
      form.reset();
      const msg=document.getElementById('form-success');
      if(msg){ msg.style.display='block'; msg.textContent='Thanks — your demo request has been submitted.'; }
    }
  });
}
document.addEventListener('DOMContentLoaded',()=>{
  initDropdowns(); initTabs(); initAccordion(); initCarousel(); initCookieBanner(); initDemoForm();
});
