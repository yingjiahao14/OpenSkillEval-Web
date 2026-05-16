document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  document.querySelectorAll('[data-tabs]').forEach((tabsRoot) => {
    const buttons = tabsRoot.querySelectorAll('[data-tab-target]');
    const panels = tabsRoot.querySelectorAll('[data-tab-panel]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.tabTarget;
        buttons.forEach((item) => item.classList.toggle('active', item === button));
        panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.tabPanel === target));
      });
    });
  });

  document.querySelectorAll('[data-accordion]').forEach((accordion) => {
    const items = accordion.querySelectorAll('.accordion-item');
    const setPanel = (item, open) => {
      const panel = item.querySelector('.accordion-panel');
      item.classList.toggle('active', open);
      panel.style.maxHeight = open ? `${panel.scrollHeight}px` : '0px';
    };
    items.forEach((item, index) => {
      const trigger = item.querySelector('.accordion-trigger');
      setPanel(item, index === 0);
      trigger.addEventListener('click', () => {
        const shouldOpen = !item.classList.contains('active');
        items.forEach((other) => setPanel(other, false));
        setPanel(item, shouldOpen);
      });
    });
  });

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const dots = carousel.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((item) => item.classList.toggle('active', item === dot));
      });
    });
  });

  document.querySelectorAll('.use-card').forEach((card) => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.use-card').forEach((item) => item.classList.remove('active'));
      card.classList.add('active');
      const title = card.querySelector('h3')?.textContent || 'Selected use case';
      const detail = document.querySelector('[data-use-case-detail]');
      if (detail) detail.textContent = `${title}: WellStream centralizes operational records, live field inputs, and executive reporting so teams act from the same trusted data.`;
    });
  });

  const demoForm = document.querySelector('[data-demo-form]');
  if (demoForm) {
    demoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;
      demoForm.querySelectorAll('[required]').forEach((field) => {
        const error = demoForm.querySelector(`[data-error-for="${field.name}"]`);
        const value = field.value.trim();
        let message = '';
        if (!value) message = 'This field is required.';
        if (!message && field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = 'Enter a valid business email.';
        if (error) error.textContent = message;
        field.setAttribute('aria-invalid', message ? 'true' : 'false');
        if (message) valid = false;
      });
      if (valid) {
        const message = demoForm.querySelector('.form-message');
        if (message) message.classList.add('show');
        demoForm.reset();
      }
    });
  }

  const cookieBanner = document.querySelector('[data-cookie-banner]');
  if (cookieBanner && !localStorage.getItem('wellstreamCookiePreference')) {
    cookieBanner.classList.add('show');
  }
  document.querySelectorAll('[data-cookie-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      localStorage.setItem('wellstreamCookiePreference', button.dataset.cookieChoice);
      cookieBanner?.classList.remove('show');
    });
  });
});
