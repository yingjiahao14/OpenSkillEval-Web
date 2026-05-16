(function() {
  const initNav = () => {
    const mobileToggle = document.querySelector('[data-mobile-toggle]');
    const nav = document.querySelector('[data-main-nav]');
    const dropBtn = document.querySelector('[data-dropdown-btn]');
    const dropMenu = document.querySelector('[data-dropdown-menu]');

    if (mobileToggle && nav) {
      mobileToggle.addEventListener('click', () => nav.classList.toggle('open'));
    }

    if (dropBtn && dropMenu) {
      dropBtn.addEventListener('click', (event) => {
        event.preventDefault();
        dropMenu.classList.toggle('open');
      });
      document.addEventListener('click', (event) => {
        if (!dropBtn.contains(event.target) && !dropMenu.contains(event.target)) {
          dropMenu.classList.remove('open');
        }
      });
    }
  };

  const initTabs = () => {
    document.querySelectorAll('[data-tabs]').forEach((group) => {
      const buttons = group.querySelectorAll('[data-tab]');
      const panels = group.querySelectorAll('[data-panel]');
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const target = button.getAttribute('data-tab');
          buttons.forEach((b) => b.classList.remove('active'));
          panels.forEach((panel) => panel.classList.remove('active'));
          button.classList.add('active');
          const panel = group.querySelector(`[data-panel="${target}"]`);
          if (panel) panel.classList.add('active');
        });
      });
    });
  };

  const initAccordion = () => {
    document.querySelectorAll('[data-accordion]').forEach((accordion) => {
      const items = accordion.querySelectorAll('.accordion-item');
      items.forEach((item) => {
        const trigger = item.querySelector('.accordion-trigger');
        if (!trigger) return;
        trigger.addEventListener('click', () => {
          items.forEach((other) => {
            if (other !== item) other.classList.remove('open');
          });
          item.classList.toggle('open');
        });
      });
    });
  };

  const initCarousel = () => {
    document.querySelectorAll('[data-carousel]').forEach((carousel) => {
      const track = carousel.querySelector('.carousel-track');
      const dots = carousel.querySelectorAll('.dot');
      if (!track || !dots.length) return;
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          track.style.transform = `translateX(-${index * 100}%)`;
          dots.forEach((d) => d.classList.remove('active'));
          dot.classList.add('active');
        });
      });
    });
  };

  const initCookieBanner = () => {
    const banner = document.querySelector('[data-cookie-banner]');
    if (!banner) return;
    const accepted = localStorage.getItem('wellstream_cookie_pref');
    if (!accepted) banner.classList.add('show');
    banner.querySelectorAll('[data-cookie-action]').forEach((button) => {
      button.addEventListener('click', () => {
        localStorage.setItem('wellstream_cookie_pref', button.getAttribute('data-cookie-action'));
        banner.classList.remove('show');
      });
    });
  };

  const initForm = () => {
    const form = document.querySelector('[data-demo-form]');
    if (!form) return;
    const status = form.querySelector('.form-status');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;
      form.querySelectorAll('[data-required]').forEach((input) => {
        const error = form.querySelector(`[data-error-for="${input.name}"]`);
        if (!input.value.trim()) {
          valid = false;
          if (error) error.textContent = 'This field is required.';
        } else {
          if (error) error.textContent = '';
        }
      });

      const email = form.querySelector('input[name="email"]');
      if (email) {
        const emailError = form.querySelector('[data-error-for="email"]');
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        if (!emailOk) {
          valid = false;
          if (emailError) emailError.textContent = 'Enter a valid business email.';
        }
      }

      if (!valid) {
        status.textContent = 'Please fix the highlighted fields and resubmit.';
        status.style.color = '#ff9fb6';
        return;
      }

      status.textContent = 'Demo request submitted successfully. Our team will contact you shortly.';
      status.style.color = '#82f6df';
      form.reset();
    });
  };

  initNav();
  initTabs();
  initAccordion();
  initCarousel();
  initCookieBanner();
  initForm();
})();
