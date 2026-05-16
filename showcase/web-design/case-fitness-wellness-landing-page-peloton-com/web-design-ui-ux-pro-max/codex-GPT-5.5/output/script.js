document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const mainNav = document.querySelector('[data-main-nav]');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.querySelectorAll('[data-tabs]').forEach((tabsRoot) => {
    const buttons = Array.from(tabsRoot.querySelectorAll('[role="tab"]'));
    const panels = Array.from(tabsRoot.querySelectorAll('[role="tabpanel"]'));

    const activateTab = (button) => {
      buttons.forEach((tab) => {
        const selected = tab === button;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });

      panels.forEach((panel) => {
        panel.classList.toggle('active', panel.id === button.getAttribute('aria-controls'));
      });
    };

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => activateTab(button));
      button.addEventListener('keydown', (event) => {
        const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
        if (!keys.includes(event.key)) return;
        event.preventDefault();

        let nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % buttons.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + buttons.length) % buttons.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = buttons.length - 1;
        buttons[nextIndex].focus();
        activateTab(buttons[nextIndex]);
      });
    });
  });

  document.querySelectorAll('[data-accordion]').forEach((accordion) => {
    const items = Array.from(accordion.querySelectorAll('.accordion-item'));
    items.forEach((item) => {
      const trigger = item.querySelector('.accordion-trigger');
      if (!trigger) return;
      trigger.addEventListener('click', () => {
        items.forEach((candidate) => {
          const isActive = candidate === item && !candidate.classList.contains('active');
          candidate.classList.toggle('active', isActive);
          const candidateTrigger = candidate.querySelector('.accordion-trigger');
          if (candidateTrigger) candidateTrigger.setAttribute('aria-expanded', String(isActive));
        });
      });
    });
  });

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.testimonial-track');
    const dots = Array.from(carousel.querySelectorAll('.dot'));
    if (!track || dots.length === 0) return;

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((candidate, dotIndex) => {
          const active = dotIndex === index;
          candidate.classList.toggle('active', active);
          candidate.setAttribute('aria-selected', String(active));
        });
      });
    });
  });

  const cookieBanner = document.querySelector('[data-cookie-banner]');
  if (cookieBanner) {
    const storedPreference = localStorage.getItem('wellstreamCookiePreference');
    if (storedPreference) cookieBanner.classList.add('hidden');

    cookieBanner.querySelectorAll('[data-cookie-choice]').forEach((button) => {
      button.addEventListener('click', () => {
        localStorage.setItem('wellstreamCookiePreference', button.dataset.cookieChoice || 'dismissed');
        cookieBanner.classList.add('hidden');
      });
    });
  }

  const demoForm = document.querySelector('[data-demo-form]');
  if (demoForm) {
    const success = document.querySelector('[data-form-success]');

    const setError = (field, message) => {
      const error = demoForm.querySelector(`[data-error-for="${field.id}"]`);
      if (error) error.textContent = message;
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
    };

    const validateField = (field) => {
      const value = field.value.trim();
      let message = '';

      if (field.hasAttribute('required') && !value) {
        message = 'This field is required.';
      } else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = 'Enter a valid business email.';
      } else if (field.type === 'tel' && value && !/^[+\d().\-\s]{7,}$/.test(value)) {
        message = 'Enter a valid phone number.';
      }

      setError(field, message);
      return !message;
    };

    demoForm.querySelectorAll('input, select, textarea').forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') validateField(field);
      });
    });

    demoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const fields = Array.from(demoForm.querySelectorAll('input, select, textarea'));
      const valid = fields.every(validateField);

      if (!valid) {
        const firstInvalid = demoForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        if (success) success.classList.remove('active');
        return;
      }

      if (success) success.classList.add('active');
      demoForm.reset();
      fields.forEach((field) => setError(field, ''));
    });
  }
});
