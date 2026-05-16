(function(){
  const setupTabs = () => {
    document.querySelectorAll('[data-tabs]').forEach(group => {
      const buttons = group.querySelectorAll('[data-tab-btn]');
      const panels = group.querySelectorAll('[data-tab-panel]');
      buttons.forEach(btn => btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-tab-btn');
        buttons.forEach(b => b.classList.toggle('active', b === btn));
        panels.forEach(p => p.classList.toggle('active', p.getAttribute('data-tab-panel') === key));
      }));
    });
  };

  const setupAccordion = () => {
    const items = document.querySelectorAll('.accordion-item');
    items.forEach(item => {
      const btn = item.querySelector('.acc-btn');
      if (!btn) return;
      btn.addEventListener('click', () => {
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  };

  const setupCarousel = () => {
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
      const track = carousel.querySelector('.carousel-track');
      const dots = carousel.querySelectorAll('.dot');
      let index = 0;
      const render = () => {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
      };
      dots.forEach((dot, i) => dot.addEventListener('click', () => { index = i; render(); }));
      render();
    });
  };

  const setupCookieBanner = () => {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    const key = 'wellstream-cookie-consent';
    const saved = localStorage.getItem(key);
    if (!saved) banner.classList.add('show');
    banner.querySelectorAll('[data-consent]').forEach(btn => {
      btn.addEventListener('click', () => {
        localStorage.setItem(key, btn.getAttribute('data-consent'));
        banner.classList.remove('show');
      });
    });
  };

  const setupDemoForm = () => {
    const form = document.getElementById('demo-form');
    if (!form) return;
    const fields = ['firstName','lastName','email','company','role','assetType'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      fields.forEach(id => {
        const input = form.querySelector(`[name="${id}"]`);
        const err = form.querySelector(`[data-err="${id}"]`);
        if (!input.value.trim()) { err.textContent = 'Required field.'; ok = false; }
        else err.textContent = '';
      });
      const email = form.querySelector('[name="email"]');
      const emailErr = form.querySelector('[data-err="email"]');
      if (email.value && !emailRegex.test(email.value)) { emailErr.textContent = 'Enter a valid email.'; ok = false; }
      if (!ok) return;
      form.reset();
      const msg = form.querySelector('.success-msg');
      msg.textContent = 'Demo request submitted successfully. Our team will contact you shortly.';
      setTimeout(() => msg.textContent = '', 5000);
    });
  };

  setupTabs();
  setupAccordion();
  setupCarousel();
  setupCookieBanner();
  setupDemoForm();
})();
