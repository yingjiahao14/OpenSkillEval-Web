(function () {
  function initDropdowns() {
    document.querySelectorAll('[data-dropdown]').forEach((dropdown) => {
      const toggle = dropdown.querySelector('[data-dropdown-toggle]');
      toggle?.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdown.classList.toggle('open');
      });
    });
    document.addEventListener('click', () => {
      document.querySelectorAll('[data-dropdown].open').forEach((d) => d.classList.remove('open'));
    });
  }

  function initTabs() {
    document.querySelectorAll('[data-tab-group]').forEach((group) => {
      const tabs = group.querySelectorAll('[role="tab"]');
      const panels = group.querySelectorAll('[role="tabpanel"]');

      tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          const target = tab.getAttribute('data-target');
          tabs.forEach((t) => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
          });
          panels.forEach((panel) => panel.classList.remove('active'));

          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
          group.querySelector(`#${target}`)?.classList.add('active');
        });
      });
    });
  }

  function initAccordion() {
    document.querySelectorAll('[data-accordion]').forEach((acc) => {
      const items = acc.querySelectorAll('.accordion-item');
      items.forEach((item) => {
        item.querySelector('.accordion-header')?.addEventListener('click', () => {
          items.forEach((other) => other.classList.remove('active'));
          item.classList.add('active');
        });
      });
    });
  }

  function initCarousel() {
    document.querySelectorAll('[data-carousel]').forEach((carousel) => {
      const slides = carousel.querySelector('.carousel-slides');
      const dots = carousel.querySelectorAll('.dot');
      if (!slides || dots.length === 0) return;

      function setSlide(index) {
        slides.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      }

      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => setSlide(index));
      });
      setSlide(0);
    });
  }

  function initCookieBanner() {
    const banner = document.querySelector('[data-cookie-banner]');
    if (!banner) return;

    const pref = localStorage.getItem('ws_cookie_pref');
    if (!pref) banner.classList.add('show');

    banner.querySelectorAll('[data-cookie-choice]').forEach((btn) => {
      btn.addEventListener('click', () => {
        localStorage.setItem('ws_cookie_pref', btn.getAttribute('data-cookie-choice'));
        banner.classList.remove('show');
      });
    });
  }

  function initDemoForm() {
    const form = document.querySelector('[data-demo-form]');
    if (!form) return;

    const fields = ['fullName', 'workEmail', 'company', 'role', 'country', 'interest'];
    const success = form.querySelector('[data-form-success]');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let ok = true;
      success.textContent = '';

      fields.forEach((name) => {
        const input = form.elements[name];
        const err = form.querySelector(`[data-error-for="${name}"]`);
        if (!input || !err) return;

        err.textContent = '';
        if (!input.value.trim()) {
          err.textContent = 'This field is required.';
          ok = false;
        }
      });

      const emailInput = form.elements.workEmail;
      if (emailInput && emailInput.value && !validateEmail(emailInput.value)) {
        const err = form.querySelector('[data-error-for="workEmail"]');
        if (err) err.textContent = 'Enter a valid email address.';
        ok = false;
      }

      if (ok) {
        success.textContent = 'Thank you. Your demo request has been submitted.';
        form.reset();
      }
    });
  }

  initDropdowns();
  initTabs();
  initAccordion();
  initCarousel();
  initCookieBanner();
  initDemoForm();
})();
