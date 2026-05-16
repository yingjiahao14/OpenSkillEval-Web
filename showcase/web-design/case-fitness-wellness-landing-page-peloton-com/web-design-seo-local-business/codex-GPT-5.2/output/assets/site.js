(function(){
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root=document) => root.querySelector(sel);

  function setAriaExpanded(el, expanded){
    if (!el) return;
    el.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  // Dropdown (header)
  function initDropdowns(){
    $$('.dropdown').forEach(dd => {
      const btn = $('button', dd);
      if (!btn) return;
      const close = () => { dd.dataset.open = 'false'; setAriaExpanded(btn, false); };
      const open = () => { dd.dataset.open = 'true'; setAriaExpanded(btn, true); };
      dd.dataset.open = 'false';
      setAriaExpanded(btn, false);

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = dd.dataset.open === 'true';
        if (isOpen) close(); else open();
      });

      dd.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
      });

      document.addEventListener('click', (e) => {
        if (!dd.contains(e.target)) close();
      });
    });
  }

  // Mobile menu toggle
  function initMobileNav(){
    const nav = $('.nav');
    const btn = $('#mobileNavToggle');
    if (!nav || !btn) return;
    nav.dataset.mobileOpen = 'false';
    setAriaExpanded(btn, false);

    btn.addEventListener('click', () => {
      const next = nav.dataset.mobileOpen !== 'true';
      nav.dataset.mobileOpen = next ? 'true' : 'false';
      setAriaExpanded(btn, next);
    });
  }

  // Generic tabs
  function initTabs(){
    $$('.tabs[data-tabs]').forEach(tabs => {
      const group = tabs.dataset.tabs;
      const buttons = $$('.tab', tabs);
      const panels = $$(`[data-tabpanel][data-tabs="${CSS.escape(group)}"]`);
      if (buttons.length === 0 || panels.length === 0) return;

      function activate(id){
        buttons.forEach(b => {
          const on = b.dataset.tab === id;
          b.setAttribute('aria-selected', on ? 'true' : 'false');
          b.tabIndex = on ? 0 : -1;
        });
        panels.forEach(p => {
          const on = p.dataset.tabpanel === id;
          p.hidden = !on;
        });
      }

      // Default active
      const initial = buttons.find(b => b.getAttribute('aria-selected') === 'true')?.dataset.tab || buttons[0].dataset.tab;
      activate(initial);

      buttons.forEach(btn => {
        btn.addEventListener('click', () => activate(btn.dataset.tab));
        btn.addEventListener('keydown', (e) => {
          if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
          e.preventDefault();
          const idx = buttons.indexOf(btn);
          const next = e.key === 'ArrowRight' ? (idx + 1) % buttons.length : (idx - 1 + buttons.length) % buttons.length;
          buttons[next].focus();
          activate(buttons[next].dataset.tab);
        });
      });
    });
  }

  // Accordion
  function initAccordion(){
    $$('.accordion[data-accordion]').forEach(root => {
      const items = $$('.acc-item', root);
      if (items.length === 0) return;
      const defaultOpen = items[0];
      items.forEach((it, i) => {
        it.dataset.open = (it === defaultOpen) ? 'true' : 'false';
        const btn = $('.acc-btn', it);
        if (btn) setAriaExpanded(btn, it.dataset.open === 'true');
        if (btn) btn.addEventListener('click', () => {
          items.forEach(other => {
            const on = other === it ? (other.dataset.open !== 'true') : false;
            other.dataset.open = on ? 'true' : 'false';
            const ob = $('.acc-btn', other);
            if (ob) setAriaExpanded(ob, other.dataset.open === 'true');
          });
        });
      });
    });
  }

  // Carousel (dots)
  function initCarousel(){
    $$('.carousel[data-carousel]').forEach(root => {
      const slides = $$('.slide', root);
      const dots = $$('.dotbtn', root);
      if (slides.length <= 1 || dots.length === 0) return;

      let index = 0;
      function render(){
        slides.forEach((s) => {
          s.style.transform = `translateX(${-index * 100}%)`;
        });
        dots.forEach((d, i) => d.setAttribute('aria-current', i === index ? 'true' : 'false'));
      }
      render();
      dots.forEach((d, i) => d.addEventListener('click', () => { index = i; render(); }));
    });
  }

  // Demo form validation + fake submit
  function initDemoForm(){
    const form = $('#demoRequestForm');
    if (!form) return;
    const status = $('#formStatus');
    const required = ['firstName','lastName','email','company','jobTitle','country'];

    function setFieldValidity(name, ok, msg){
      const field = form.querySelector(`[data-field="${CSS.escape(name)}"]`);
      const err = field ? $('.error', field) : null;
      if (!field) return;
      field.dataset.invalid = ok ? 'false' : 'true';
      if (err && msg) err.textContent = msg;
    }

    function validate(){
      let ok = true;
      required.forEach(n => {
        const el = form.elements[n];
        const val = (el?.value || '').trim();
        if (!val){
          ok = false;
          setFieldValidity(n, false, 'Required');
        } else {
          setFieldValidity(n, true);
        }
      });

      const email = (form.elements.email?.value || '').trim();
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        ok = false;
        setFieldValidity('email', false, 'Enter a valid email');
      }
      return ok;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()){
        if (status){
          status.textContent = 'Please fix the highlighted fields.';
          status.style.color = 'rgba(255,93,122,.95)';
        }
        return;
      }
      const payload = Object.fromEntries(new FormData(form).entries());
      try{
        localStorage.setItem('wellstream_demo_request', JSON.stringify({payload, ts: Date.now()}));
      }catch(_){/* ignore */}
      if (status){
        status.textContent = 'Thanks — your demo request was sent. We’ll reach out shortly.';
        status.style.color = 'rgba(108,194,74,.95)';
      }
      form.reset();
    });
  }

  // Cookie banner (home only)
  function initCookieBanner(){
    const banner = $('#cookieBanner');
    if (!banner) return;
    const accept = $('#cookieAccept');
    const decline = $('#cookieDecline');
    const key = 'wellstream_cookie_pref';
    let pref = null;
    try{ pref = localStorage.getItem(key); }catch(_){ pref = null; }
    if (!pref){
      banner.style.display = 'block';
    }
    const hide = (val) => {
      try{ localStorage.setItem(key, val); }catch(_){/* ignore */}
      banner.style.display = 'none';
    };
    if (accept) accept.addEventListener('click', () => hide('accept'));
    if (decline) decline.addEventListener('click', () => hide('decline'));
  }

  // Active nav highlighting
  function markActiveNav(){
    const here = document.body?.dataset?.page || '';
    $$('[data-nav]').forEach(a => {
      if (a.dataset.nav === here) a.setAttribute('aria-current','page');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initDropdowns();
    initMobileNav();
    initTabs();
    initAccordion();
    initCarousel();
    initDemoForm();
    initCookieBanner();
    markActiveNav();
  });
})();

