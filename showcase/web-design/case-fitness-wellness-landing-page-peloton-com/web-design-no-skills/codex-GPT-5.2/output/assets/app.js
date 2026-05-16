(function(){
  const qs=(s,el=document)=>el.querySelector(s);
  const qsa=(s,el=document)=>Array.from(el.querySelectorAll(s));

  function initMobileNav(){
    const toggle=qs('[data-mobile-toggle]');
    const panel=qs('[data-mobile-panel]');
    if(!toggle||!panel) return;
    toggle.addEventListener('click', ()=>{
      const open = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  function initTabs(){
    qsa('[data-tabs]').forEach((root)=>{
      const tabs=qsa('[role="tab"]', root);
      const panels=qsa('[role="tabpanel"]', root);

      function activate(id){
        tabs.forEach((t)=>{
          const on = t.getAttribute('aria-controls')===id;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
        });
        panels.forEach((p)=>{
          const on = p.id===id;
          p.hidden = !on;
        });
      }

      tabs.forEach((tab)=>{
        tab.addEventListener('click', ()=>activate(tab.getAttribute('aria-controls')));
        tab.addEventListener('keydown', (e)=>{
          const idx = tabs.indexOf(tab);
          if(e.key==='ArrowRight' || e.key==='ArrowLeft'){
            e.preventDefault();
            const dir = e.key==='ArrowRight' ? 1 : -1;
            const next = (idx + dir + tabs.length) % tabs.length;
            tabs[next].focus();
            activate(tabs[next].getAttribute('aria-controls'));
          }
        });
      });

      const selected=tabs.find(t=>t.getAttribute('aria-selected')==='true') || tabs[0];
      if(selected) activate(selected.getAttribute('aria-controls'));
    });
  }

  function initAccordion(){
    qsa('[data-accordion]').forEach((root)=>{
      const items=qsa('[data-acc]', root);
      function openItem(target){
        items.forEach((it)=>it.dataset.open = (it===target) ? 'true' : 'false');
      }
      items.forEach((it, i)=>{
        const btn=qs('button', it);
        if(!btn) return;
        btn.addEventListener('click', ()=>openItem(it));
        if(!it.dataset.open) it.dataset.open = i===0 ? 'true' : 'false';
      });
    });
  }

  function initCarousel(){
    qsa('[data-carousel]').forEach((root)=>{
      const track=qs('[data-track]', root);
      const dots=qsa('[data-dot]', root);
      if(!track || dots.length===0) return;
      let index = dots.findIndex(d=>d.getAttribute('aria-current')==='true');
      if(index<0) index=0;

      function go(i){
        index = (i + dots.length) % dots.length;
        track.style.transform = `translateX(${-index*100}%)`;
        dots.forEach((d, di)=>d.setAttribute('aria-current', String(di===index)));
      }

      dots.forEach((d, i)=>d.addEventListener('click', ()=>go(i)));
      go(index);
    });
  }

  function initCookieBanner(){
    const banner=qs('[data-cookie-banner]');
    if(!banner) return;

    const key='wellstream_cookie_pref';
    const existing = localStorage.getItem(key);
    if(!existing){
      banner.classList.add('show');
    }

    function setPref(v){
      localStorage.setItem(key, v);
      banner.classList.remove('show');
    }

    const accept=qs('[data-cookie-accept]', banner);
    const decline=qs('[data-cookie-decline]', banner);
    accept && accept.addEventListener('click', ()=>setPref('accept'));
    decline && decline.addEventListener('click', ()=>setPref('decline'));
  }

  function initUseCaseCards(){
    qsa('[data-usecase]').forEach((card)=>{
      card.addEventListener('click', ()=>{
        const target = card.getAttribute('data-target') || 'platform-overview.html#use-cases';
        window.location.href = target;
      });
    });
  }

  function initDemoForm(){
    const form=qs('[data-demo-form]');
    if(!form) return;
    const success=qs('[data-success]', form);

    const required=['firstName','lastName','email','company','jobTitle','country'];
    const emailRe=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setError(name, message){
      const field = qs(`[data-field="${name}"]`, form);
      if(!field) return;
      field.dataset.error = message ? 'true' : 'false';
      const msg = qs('.error', field);
      if(msg) msg.textContent = message || '';
    }

    function getVal(name){
      const input = qs(`[name="${name}"]`, form);
      return input ? String(input.value || '').trim() : '';
    }

    function validate(){
      let ok=true;
      required.forEach((n)=>{
        const v=getVal(n);
        if(!v){ ok=false; setError(n, 'This field is required.'); }
        else { setError(n, ''); }
      });
      const email=getVal('email');
      if(email && !emailRe.test(email)){
        ok=false; setError('email', 'Enter a valid email address.');
      }
      return ok;
    }

    qsa('input,select,textarea', form).forEach((el)=>{
      el.addEventListener('blur', ()=>validate());
      el.addEventListener('input', ()=>{
        const wrap = el.closest('[data-field]');
        if(wrap) wrap.dataset.error='false';
      });
    });

    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      if(!validate()) return;

      // No backend: simulate successful submission.
      const payload = Object.fromEntries(new FormData(form).entries());
      try{ sessionStorage.setItem('wellstream_demo_payload', JSON.stringify(payload)); }catch(_){ }
      form.reset();
      if(success){
        success.classList.add('show');
        success.focus && success.focus();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    initMobileNav();
    initTabs();
    initAccordion();
    initCarousel();
    initCookieBanner();
    initUseCaseCards();
    initDemoForm();
  });
})();

