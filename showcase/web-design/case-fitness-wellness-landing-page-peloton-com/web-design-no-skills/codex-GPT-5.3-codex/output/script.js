(function(){
  const initTabs = () => {
    document.querySelectorAll('[data-tabs]').forEach(group => {
      const buttons = group.querySelectorAll('[data-tab-target]');
      const panels = group.querySelectorAll('[data-tab-panel]');
      buttons.forEach(btn => btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab-target');
        buttons.forEach(b => b.classList.toggle('active', b === btn));
        panels.forEach(p => p.classList.toggle('active', p.getAttribute('data-tab-panel') === target));
      }));
    });
  };

  const initAccordion = () => {
    document.querySelectorAll('[data-accordion]').forEach(acc => {
      const items = acc.querySelectorAll('.accordion-item');
      items.forEach(item => {
        item.querySelector('.accordion-head').addEventListener('click', () => {
          items.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
        });
      });
    });
  };

  const initCarousel = () => {
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
      const slides = carousel.querySelectorAll('[data-slide]');
      const dots = carousel.querySelectorAll('.dot');
      const show = idx => {
        slides.forEach((s,i)=> s.style.display = i===idx ? 'block':'none');
        dots.forEach((d,i)=> d.classList.toggle('active', i===idx));
      };
      dots.forEach((dot,i)=> dot.addEventListener('click', ()=>show(i)));
      show(0);
    });
  };

  const initCookieBanner = () => {
    const banner = document.querySelector('[data-cookie-banner]');
    if (!banner) return;
    const pref = localStorage.getItem('wellstream_cookie_pref');
    if (pref) { banner.remove(); return; }
    banner.querySelectorAll('[data-cookie]').forEach(btn => btn.addEventListener('click', () => {
      localStorage.setItem('wellstream_cookie_pref', btn.getAttribute('data-cookie'));
      banner.remove();
    }));
  };

  const initUseCaseCards = () => {
    document.querySelectorAll('[data-usecase]').forEach(card => {
      card.addEventListener('click', () => {
        const t = card.getAttribute('data-usecase');
        const d = card.getAttribute('data-detail');
        alert(t + "\n\n" + d);
      });
    });
  };

  const initDemoForm = () => {
    const form = document.querySelector('#demo-form');
    if (!form) return;
    const required = ['firstName','lastName','email','company','role','interest'];
    const validate = () => {
      let ok = true;
      required.forEach(name => {
        const field = form.elements[name];
        const err = form.querySelector(`[data-error="${name}"]`);
        let msg = '';
        if (!field.value.trim()) msg = 'This field is required.';
        if (name === 'email' && field.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) msg = 'Please enter a valid email.';
        err.textContent = msg;
        if (msg) ok = false;
      });
      return ok;
    };
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validate()) return;
      const status = form.querySelector('#form-status');
      status.textContent = 'Demo request submitted successfully. Our team will contact you shortly.';
      form.reset();
    });
  };

  initTabs();
  initAccordion();
  initCarousel();
  initCookieBanner();
  initUseCaseCards();
  initDemoForm();
})();
