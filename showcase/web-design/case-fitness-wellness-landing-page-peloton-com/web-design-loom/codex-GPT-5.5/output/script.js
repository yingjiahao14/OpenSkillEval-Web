(function () {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const mobileToggle = $('.mobile-toggle');
  const navLinks = $('#nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  $$('.tabs[data-tabs]').forEach((tabGroup) => {
    const group = tabGroup.dataset.tabs;
    const buttons = $$(`.tab-button[data-tab-target][data-tab-group="${group}"]`);
    const panels = $$(`.tab-panel[data-tab-panel][data-tab-group="${group}"]`);
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((item) => item.setAttribute('aria-selected', 'false'));
        panels.forEach((panel) => panel.classList.remove('active'));
        button.setAttribute('aria-selected', 'true');
        const panel = $(`#${button.dataset.tabTarget}`);
        if (panel) panel.classList.add('active');
      });
    });
  });

  $$('.accordion').forEach((accordion) => {
    $$('.accordion-trigger', accordion).forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const panel = $(`#${trigger.getAttribute('aria-controls')}`);
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        $$('.accordion-trigger', accordion).forEach((item) => item.setAttribute('aria-expanded', 'false'));
        $$('.accordion-panel', accordion).forEach((item) => item.classList.remove('open'));
        if (!isOpen && panel) {
          trigger.setAttribute('aria-expanded', 'true');
          panel.classList.add('open');
        }
      });
    });
  });

  const carousel = $('.carousel');
  if (carousel) {
    const track = $('.carousel-track', carousel);
    const dots = $$('.dot', carousel);
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((item) => item.setAttribute('aria-current', 'false'));
        dot.setAttribute('aria-current', 'true');
      });
    });
  }

  const cookieBanner = $('#cookie-banner');
  if (cookieBanner && !localStorage.getItem('wellstream-cookie-preference')) {
    cookieBanner.classList.add('show');
  }
  $$('[data-cookie-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      localStorage.setItem('wellstream-cookie-preference', button.dataset.cookieChoice);
      if (cookieBanner) cookieBanner.classList.remove('show');
    });
  });

  const demoForm = $('#demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;
      $$('[data-required]', demoForm).forEach((field) => {
        const wrapper = field.closest('.field');
        const isEmail = field.type === 'email';
        const emailValid = !isEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        const fieldValid = field.value.trim().length > 0 && emailValid;
        wrapper.classList.toggle('invalid', !fieldValid);
        if (!fieldValid) valid = false;
      });
      const success = $('#form-success');
      if (valid && success) {
        demoForm.reset();
        success.classList.add('show');
        success.setAttribute('role', 'status');
        success.focus?.();
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach((item) => observer.observe(item));
})();
