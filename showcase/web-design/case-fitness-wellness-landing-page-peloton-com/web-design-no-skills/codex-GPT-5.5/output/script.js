document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdown = document.querySelector('.dropdown');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener('click', () => dropdown.classList.toggle('open'));
  }

  document.querySelectorAll('[data-tabs]').forEach((tabGroup) => {
    const buttons = tabGroup.querySelectorAll('[data-tab-target]');
    const scope = tabGroup.dataset.tabs;
    const panels = document.querySelectorAll(`[data-tab-panel][data-tab-scope="${scope}"]`);

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.tabTarget;
        buttons.forEach((item) => item.classList.toggle('active', item === button));
        panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.tabPanel === target));
      });
    });
  });

  const useCaseDetail = document.querySelector('[data-use-case-detail]');
  document.querySelectorAll('[data-use-case]').forEach((card) => {
    card.addEventListener('click', () => {
      if (!useCaseDetail) return;
      useCaseDetail.querySelector('h3').textContent = card.querySelector('h3').textContent;
      useCaseDetail.querySelector('p').textContent = card.dataset.useCase;
      useCaseDetail.classList.add('show');
      useCaseDetail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });

  document.querySelectorAll('.accordion').forEach((accordion) => {
    accordion.querySelectorAll('.accordion-item').forEach((item, index) => {
      const trigger = item.querySelector('.accordion-trigger');
      if (index === 0) item.classList.add('active');
      trigger.addEventListener('click', () => {
        accordion.querySelectorAll('.accordion-item').forEach((other) => {
          other.classList.toggle('active', other === item && !item.classList.contains('active'));
        });
      });
    });
  });

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const dots = carousel.querySelectorAll('.dot-btn');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((item) => item.classList.toggle('active', item === dot));
      });
    });
  });

  const demoForm = document.querySelector('[data-demo-form]');
  if (demoForm) {
    demoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;
      demoForm.querySelectorAll('[required]').forEach((field) => {
        const error = field.closest('.field').querySelector('.error');
        const isEmail = field.type === 'email';
        const emailValid = !isEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        const fieldValid = field.value.trim() !== '' && emailValid;
        if (!fieldValid) valid = false;
        field.setAttribute('aria-invalid', String(!fieldValid));
        if (error) error.textContent = fieldValid ? '' : isEmail ? 'Enter a valid business email.' : 'This field is required.';
      });
      const success = demoForm.querySelector('.success');
      if (valid && success) {
        success.style.display = 'block';
        success.textContent = 'Thank you. Your demo request has been received and our team will follow up shortly.';
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
