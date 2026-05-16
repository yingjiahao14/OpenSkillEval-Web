(function () {
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const prev = carousel.querySelector('[data-prev]');
    const next = carousel.querySelector('[data-next]');
    let index = 0;
    let startX = 0;

    function render() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    function go(step) {
      index = (index + step + slides.length) % slides.length;
      render();
    }

    prev && prev.addEventListener('click', () => go(-1));
    next && next.addEventListener('click', () => go(1));

    carousel.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (Math.abs(diff) > 35) go(diff > 0 ? -1 : 1);
    });
  }

  const toggleRoot = document.querySelector('[data-workout-toggle]');
  if (toggleRoot) {
    const buttons = toggleRoot.querySelectorAll('[data-target]');
    const panels = document.querySelectorAll('[data-panel]');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        panels.forEach((panel) => {
          panel.classList.toggle('active', panel.getAttribute('data-panel') === target);
        });
      });
    });
  }

  const locationSelect = document.querySelector('[data-location-filter]');
  const instructors = document.querySelectorAll('.instructor[data-location]');
  if (locationSelect && instructors.length) {
    locationSelect.addEventListener('change', () => {
      const value = locationSelect.value;
      instructors.forEach((card) => {
        const show = value === 'all' || card.getAttribute('data-location') === value;
        card.style.display = show ? '' : 'none';
      });
    });
  }

  const faqButtons = document.querySelectorAll('.faq-q');
  if (faqButtons.length) {
    faqButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        document.querySelectorAll('.faq-item').forEach((faq) => {
          if (faq !== item) faq.classList.remove('open');
        });
        item.classList.toggle('open');
      });
    });
  }

  const form = document.querySelector('[data-newsletter-form]');
  if (form) {
    const emailInput = form.querySelector('input[type="email"]');
    const feedback = form.querySelector('[data-feedback]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      feedback.className = 'feedback';
      if (!valid) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.classList.add('error');
        return;
      }
      feedback.textContent = 'Thanks! You are subscribed for updates and offers.';
      feedback.classList.add('success');
      form.reset();
    });
  }

  const countryBtn = document.querySelector('[data-country-toggle]');
  const countryMenu = document.querySelector('[data-country-menu]');
  if (countryBtn && countryMenu) {
    countryBtn.addEventListener('click', () => {
      countryMenu.classList.toggle('open');
    });
    countryMenu.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        countryBtn.textContent = `Region: ${btn.textContent}`;
        countryMenu.classList.remove('open');
      });
    });
    document.addEventListener('click', (e) => {
      if (!countryMenu.contains(e.target) && !countryBtn.contains(e.target)) {
        countryMenu.classList.remove('open');
      }
    });
  }
})();
