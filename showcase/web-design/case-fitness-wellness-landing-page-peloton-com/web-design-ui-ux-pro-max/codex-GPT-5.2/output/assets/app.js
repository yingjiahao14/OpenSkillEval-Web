(function(){
  const qs = (sel, root=document) => root.querySelector(sel);
  const qsa = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  function setupMobileMenu(){
    const btn = qs('[data-mobile-toggle]');
    const menu = qs('[data-mobile-menu]');
    if(!btn || !menu) return;
    const setOpen = (open) => {
      menu.dataset.open = open ? 'true' : 'false';
      btn.setAttribute('aria-expanded', String(open));
    };
    btn.addEventListener('click', () => {
      const open = menu.dataset.open === 'true';
      setOpen(!open);
    });
    // Close on link click
    qsa('a', menu).forEach(a => a.addEventListener('click', ()=> setOpen(false)));
  }

  function setupTabs(){
    qsa('[data-tabs]').forEach(group => {
      const tabs = qsa('[role="tab"]', group);
      const panels = qsa('[role="tabpanel"]', group);
      if(!tabs.length || !panels.length) return;

      const activate = (tab) => {
        const targetId = tab.getAttribute('aria-controls');
        tabs.forEach(t => {
          const selected = t === tab;
          t.setAttribute('aria-selected', selected ? 'true' : 'false');
          t.tabIndex = selected ? 0 : -1;
        });
        panels.forEach(p => {
          p.hidden = p.id !== targetId;
        });
        const wrap = qs('.crossfade', group);
        if(wrap){
          // trigger reflow to restart animation
          wrap.classList.remove('crossfade');
          void wrap.offsetWidth;
          wrap.classList.add('crossfade');
        }
      };

      tabs.forEach(tab => {
        tab.addEventListener('click', () => activate(tab));
        tab.addEventListener('keydown', (e) => {
          const idx = tabs.indexOf(tab);
          if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
            e.preventDefault();
            const dir = e.key === 'ArrowRight' ? 1 : -1;
            const next = (idx + dir + tabs.length) % tabs.length;
            tabs[next].focus();
            activate(tabs[next]);
          }
          if(e.key === 'Home'){ e.preventDefault(); tabs[0].focus(); activate(tabs[0]); }
          if(e.key === 'End'){ e.preventDefault(); tabs[tabs.length-1].focus(); activate(tabs[tabs.length-1]); }
        });
      });

      // initial selection
      const pre = tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
      activate(pre);
    });
  }

  function setupAccordion(){
    qsa('[data-accordion]').forEach(acc => {
      const items = qsa('[data-acc-item]', acc);
      const openOnly = (itemToOpen) => {
        items.forEach(item => {
          const btn = qs('button', item);
          const shouldOpen = item === itemToOpen;
          item.dataset.open = shouldOpen ? 'true' : 'false';
          if(btn) btn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
        });
      };
      items.forEach(item => {
        const btn = qs('[data-acc-btn]', item);
        if(!btn) return;
        btn.addEventListener('click', () => {
          const isOpen = item.dataset.open === 'true';
          openOnly(isOpen ? null : item);
        });
      });
      // open first by default
      if(items[0]) openOnly(items[0]);
    });
  }

  function setupCarousel(){
    qsa('[data-carousel]').forEach(car => {
      const track = qs('[data-carousel-track]', car);
      const slides = qsa('[data-slide]', car);
      const dots = qsa('[data-dot]', car);
      if(!track || slides.length === 0 || dots.length === 0) return;

      let index = 0;
      const setIndex = (i) => {
        index = Math.max(0, Math.min(slides.length - 1, i));
        track.style.transform = `translateX(${-100 * index}%)`;
        dots.forEach((d, di) => d.setAttribute('aria-selected', di === index ? 'true' : 'false'));
      };
      dots.forEach((dot, i) => dot.addEventListener('click', () => setIndex(i)));
      setIndex(0);
    });
  }

  function setupCookieBanner(){
    const banner = qs('[data-cookie]');
    if(!banner) return;
    const key = 'wellstream_cookie_pref';
    const pref = localStorage.getItem(key);
    if(!pref){
      banner.dataset.show = 'true';
    }
    const setPref = (v) => {
      localStorage.setItem(key, v);
      banner.dataset.show = 'false';
    };
    const accept = qs('[data-cookie-accept]', banner);
    const decline = qs('[data-cookie-decline]', banner);
    if(accept) accept.addEventListener('click', () => setPref('accepted'));
    if(decline) decline.addEventListener('click', () => setPref('declined'));
  }

  function setupDemoForm(){
    const form = qs('[data-demo-form]');
    if(!form) return;

    const validators = {
      required: (v) => v.trim().length > 0,
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      phone: (v) => v.trim().length === 0 || /^[+()\-\s\d]{7,}$/.test(v.trim())
    };

    function setError(fieldEl, msg){
      const wrap = fieldEl.closest('[data-field]');
      if(!wrap) return;
      wrap.dataset.error = 'true';
      const err = qs('[data-error]', wrap);
      if(err) err.textContent = msg;
    }
    function clearError(fieldEl){
      const wrap = fieldEl.closest('[data-field]');
      if(!wrap) return;
      wrap.dataset.error = 'false';
    }

    function validate(){
      let ok = true;
      qsa('input, select, textarea', form).forEach(el => {
        const name = el.name || '';
        const isRequired = el.hasAttribute('required');
        const type = (el.getAttribute('type') || '').toLowerCase();

        clearError(el);

        if(isRequired && !validators.required(el.value)){
          setError(el, 'This field is required.');
          ok = false; return;
        }
        if(type === 'email' && el.value.trim() && !validators.email(el.value)){
          setError(el, 'Enter a valid email address.');
          ok = false; return;
        }
        if(name.toLowerCase().includes('phone') && el.value.trim() && !validators.phone(el.value)){
          setError(el, 'Enter a valid phone number.');
          ok = false; return;
        }
      });
      return ok;
    }

    qsa('input, select, textarea', form).forEach(el => {
      el.addEventListener('blur', () => validate());
      el.addEventListener('input', () => clearError(el));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = validate();
      const msg = qs('[data-form-message]');
      if(!ok){
        if(msg){
          msg.textContent = 'Please fix the highlighted fields and try again.';
          msg.style.color = 'rgba(255,107,107,.95)';
        }
        const firstBad = qs('[data-field][data-error="true"] .input, [data-field][data-error="true"] select, [data-field][data-error="true"] textarea');
        if(firstBad) firstBad.focus();
        return;
      }

      // No backend: simulate successful submission.
      const btn = qs('button[type="submit"]', form);
      if(btn){
        btn.disabled = true;
        btn.textContent = 'Submitting…';
      }
      setTimeout(() => {
        if(msg){
          msg.textContent = 'Thanks — we received your request. A WellStream specialist will reach out shortly.';
          msg.style.color = 'rgba(108,194,74,.95)';
        }
        form.reset();
        if(btn){
          btn.disabled = false;
          btn.textContent = 'Submit';
        }
      }, 650);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupTabs();
    setupAccordion();
    setupCarousel();
    setupCookieBanner();
    setupDemoForm();
  });
})();
