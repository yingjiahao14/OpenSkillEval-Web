const initTabs = () => {
  document.querySelectorAll('[data-tabs]').forEach((tabsWrap) => {
    const buttons = tabsWrap.querySelectorAll('[data-tab-target]');
    const panels = tabsWrap.querySelectorAll('[data-tab-panel]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.tabTarget;
        buttons.forEach((b) => b.classList.remove('active'));
        panels.forEach((p) => p.classList.remove('active'));
        button.classList.add('active');
        tabsWrap.querySelector(`[data-tab-panel="${target}"]`)?.classList.add('active');
      });
    });
  });
};

const initAccordion = () => {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach((item) => {
    item.querySelector('.accordion-btn')?.addEventListener('click', () => {
      items.forEach((el) => el.classList.remove('active'));
      item.classList.add('active');
    });
  });
};

const initCarousel = () => {
  const slides = document.querySelectorAll('[data-testimonial]');
  const dots = document.querySelectorAll('.dot');
  if (!slides.length || !dots.length) return;
  const activate = (idx) => {
    slides.forEach((s) => s.classList.remove('active'));
    dots.forEach((d) => d.classList.remove('active'));
    slides[idx].classList.add('active');
    dots[idx].classList.add('active');
  };
  dots.forEach((dot, idx) => dot.addEventListener('click', () => activate(idx)));
};

const initCookieBanner = () => {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  const existing = localStorage.getItem('wellstream-cookie-consent');
  if (!existing) banner.style.display = 'flex';
  document.getElementById('acceptCookies')?.addEventListener('click', () => {
    localStorage.setItem('wellstream-cookie-consent', 'accepted');
    banner.style.display = 'none';
  });
  document.getElementById('declineCookies')?.addEventListener('click', () => {
    localStorage.setItem('wellstream-cookie-consent', 'declined');
    banner.style.display = 'none';
  });
};

const initUseCaseCards = () => {
  document.querySelectorAll('.use-case-card').forEach((card) => {
    card.addEventListener('click', () => {
      window.location.href = 'platform-overview.html#use-cases';
    });
  });
};

const initDemoForm = () => {
  const form = document.getElementById('demoForm');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;
    ['fullName','workEmail','company','role','industry'].forEach((name) => {
      const field = form.elements[name];
      const err = document.getElementById(`${name}Error`);
      if (!field.value.trim()) {
        valid = false;
        if (err) err.textContent = 'This field is required';
      } else {
        if (name === 'workEmail' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
          valid = false;
          if (err) err.textContent = 'Enter a valid email';
        } else if (err) {
          err.textContent = '';
        }
      }
    });
    const status = document.getElementById('formStatus');
    if (!valid) {
      status.textContent = 'Please fix validation errors before submitting.';
      status.className = 'error';
      return;
    }
    status.textContent = 'Thanks! Your demo request has been submitted.';
    status.className = 'success-msg';
    form.reset();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initAccordion();
  initCarousel();
  initCookieBanner();
  initUseCaseCards();
  initDemoForm();
});
