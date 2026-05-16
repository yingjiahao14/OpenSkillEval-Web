(function(){
  function initTabs(groupSelector){
    document.querySelectorAll(groupSelector).forEach(group=>{
      const buttons = group.querySelectorAll('[data-tab-target]');
      const panels = group.querySelectorAll('[data-tab-panel]');
      buttons.forEach(btn=>btn.addEventListener('click',()=>{
        const target = btn.getAttribute('data-tab-target');
        buttons.forEach(b=>b.classList.remove('active'));
        panels.forEach(p=>p.classList.remove('active'));
        btn.classList.add('active');
        const panel = group.querySelector(`[data-tab-panel="${target}"]`);
        if(panel) panel.classList.add('active');
      }));
    });
  }

  function initAccordion(){
    document.querySelectorAll('.accordion').forEach(acc=>{
      const items = acc.querySelectorAll('.accordion-item');
      items.forEach((item)=>{
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click',()=>{
          items.forEach(i=>i.classList.remove('active'));
          item.classList.add('active');
        });
      });
    });
  }

  function initCarousel(){
    document.querySelectorAll('[data-carousel]').forEach(root=>{
      const slides = Array.from(root.querySelectorAll('[data-slide]'));
      const dots = Array.from(root.querySelectorAll('.dot'));
      function show(index){
        slides.forEach((s,i)=>s.style.display = i===index ? 'block' : 'none');
        dots.forEach((d,i)=>d.classList.toggle('active', i===index));
      }
      dots.forEach((dot,i)=>dot.addEventListener('click',()=>show(i)));
      show(0);
    });
  }

  function initCookie(){
    const banner = document.getElementById('cookie-banner');
    if(!banner) return;
    const pref = localStorage.getItem('wellstream_cookie_pref');
    if(pref) banner.classList.add('hidden');
    banner.querySelectorAll('[data-cookie]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        localStorage.setItem('wellstream_cookie_pref', btn.getAttribute('data-cookie'));
        banner.classList.add('hidden');
      });
    });
  }

  function initDemoForm(){
    const form = document.getElementById('demo-form');
    if(!form) return;
    const required = ['fullName','workEmail','company','jobTitle','region'];
    const success = document.getElementById('form-success');
    form.addEventListener('submit', (event)=>{
      event.preventDefault();
      let valid = true;
      required.forEach(name=>{
        const field = form.elements[name];
        const error = document.getElementById(`error-${name}`);
        if(!field.value.trim()){
          error.textContent = 'This field is required.';
          valid = false;
        } else {
          error.textContent = '';
        }
      });
      const email = form.elements.workEmail.value.trim();
      const emailErr = document.getElementById('error-workEmail');
      if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        emailErr.textContent = 'Enter a valid business email address.';
        valid = false;
      }
      if(!valid){
        success.textContent = '';
        return;
      }
      success.textContent = 'Thanks — your demo request has been submitted.';
      form.reset();
    });
  }

  initTabs('[data-tabs]');
  initAccordion();
  initCarousel();
  initCookie();
  initDemoForm();
})();
