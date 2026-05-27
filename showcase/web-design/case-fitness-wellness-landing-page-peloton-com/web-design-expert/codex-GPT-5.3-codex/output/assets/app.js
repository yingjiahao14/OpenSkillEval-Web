(function () {
  const ready = (fn) => document.readyState !== 'loading' ? fn() : document.addEventListener('DOMContentLoaded', fn);

  ready(() => {
    setupNav();
    setupDropdown();
    setupTabs();
    setupAccordion();
    setupCarousel();
    setupCookieBanner();
    setupDemoForm();
  });

  function setupNav() {
    const toggle = document.querySelector('[data-mobile-toggle]');
    const nav = document.querySelector('[data-nav]');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  function setupDropdown() {
    const dd = document.querySelector('[data-dropdown]');
    if (!dd) return;
    const btn = dd.querySelector('[data-dropdown-toggle]');
    btn.addEventListener('click', () => dd.classList.toggle('open'));
    document.addEventListener('click', (event) => {
      if (!dd.contains(event.target)) dd.classList.remove('open');
    });
  }

  function setupTabs() {
    document.querySelectorAll('[data-tabs]').forEach((tabsRoot) => {
      const buttons = tabsRoot.querySelectorAll('[data-tab-target]');
      const panels = tabsRoot.querySelectorAll('[data-tab-panel]');
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const target = button.getAttribute('data-tab-target');
          buttons.forEach((b) => b.classList.toggle('active', b === button));
          panels.forEach((panel) => panel.classList.toggle('active', panel.getAttribute('data-tab-panel') === target));
        });
      });
    });
  }

  function setupAccordion() {
    document.querySelectorAll('[data-accordion]').forEach((acc) => {
      const buttons = acc.querySelectorAll('[data-acc-target]');
      const panels = acc.querySelectorAll('[data-acc-panel]');
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const target = button.getAttribute('data-acc-target');
          buttons.forEach((b) => b.setAttribute('aria-expanded', b === button ? 'true' : 'false'));
          panels.forEach((panel) => panel.classList.toggle('active', panel.getAttribute('data-acc-panel') === target));
        });
      });
    });
  }

  function setupCarousel() {
    document.querySelectorAll('[data-carousel]').forEach((carousel) => {
      const track = carousel.querySelector('[data-carousel-track]');
      const dots = carousel.querySelectorAll('[data-carousel-dot]');
      if (!track || !dots.length) return;
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          track.style.transform = `translateX(-${i * 100}%)`;
          dots.forEach((d) => d.classList.toggle('active', d === dot));
        });
      });
    });
  }

  function setupCookieBanner() {
    const banner = document.querySelector('[data-cookie-banner]');
    if (!banner) return;
    const saved = localStorage.getItem('ws_cookie_pref');
    if (!saved) banner.classList.add('show');
    banner.querySelectorAll('[data-cookie-choice]').forEach((btn) => {
      btn.addEventListener('click', () => {
        localStorage.setItem('ws_cookie_pref', btn.getAttribute('data-cookie-choice'));
        banner.classList.remove('show');
      });
    });
  }

  function setupDemoForm() {
    const form = document.querySelector('[data-demo-form]');
    if (!form) return;
    const success = form.querySelector('[data-form-success]');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;
      form.querySelectorAll('[data-required]').forEach((field) => {
        const error = form.querySelector(`[data-error-for="${field.name}"]`);
        if (!field.value.trim()) {
          valid = false;
          if (error) error.textContent = 'This field is required.';
        } else if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(field.value)) {
          valid = false;
          if (error) error.textContent = 'Enter a valid email address.';
        } else {
          if (error) error.textContent = '';
        }
      });
      if (!valid) {
        success.textContent = '';
        return;
      }
      success.textContent = 'Thanks — your demo request has been submitted.';
      form.reset();
    });
  }
})();
