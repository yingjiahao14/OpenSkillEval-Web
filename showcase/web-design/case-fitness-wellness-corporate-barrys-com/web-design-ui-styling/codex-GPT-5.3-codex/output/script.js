(function () {
  const onReady = (fn) => {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  };

  onReady(() => {
    setupCarousel();
    setupWorkoutToggle();
    setupInstructorFilter();
    setupFaqAccordion();
    setupNewsletterForms();
    setupCountrySelector();
  });

  function setupCarousel() {
    const carousel = document.querySelector('[data-carousel]');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const prev = carousel.querySelector('[data-prev]');
    const next = carousel.querySelector('[data-next]');
    let index = 0;
    let startX = 0;

    const render = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
    };

    prev && prev.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      render();
    });

    next && next.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      render();
    });

    carousel.addEventListener('touchstart', (event) => {
      startX = event.changedTouches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (event) => {
      const endX = event.changedTouches[0].clientX;
      const delta = endX - startX;
      if (Math.abs(delta) < 40) return;
      if (delta < 0) index = (index + 1) % slides.length;
      else index = (index - 1 + slides.length) % slides.length;
      render();
    }, { passive: true });
  }

  function setupWorkoutToggle() {
    const wrap = document.querySelector('[data-workout-toggle]');
    if (!wrap) return;

    const buttons = wrap.querySelectorAll('.toggle-btn');
    const panels = wrap.querySelectorAll('.toggle-panel');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
        buttons.forEach((btn) => btn.classList.remove('active'));
        panels.forEach((panel) => panel.classList.remove('active'));
        button.classList.add('active');
        const panel = wrap.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  function setupInstructorFilter() {
    const select = document.querySelector('[data-location-filter]');
    if (!select) return;

    const cards = document.querySelectorAll('[data-location-card]');
    select.addEventListener('change', () => {
      const selected = select.value;
      cards.forEach((card) => {
        const location = card.getAttribute('data-location-card');
        const show = selected === 'All' || selected === location;
        card.style.display = show ? '' : 'none';
      });
    });
  }

  function setupFaqAccordion() {
    const accordion = document.querySelector('[data-faq]');
    if (!accordion) return;

    const items = accordion.querySelectorAll('.faq-item');
    items.forEach((item) => {
      const button = item.querySelector('.faq-btn');
      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach((i) => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  function setupNewsletterForms() {
    const forms = document.querySelectorAll('[data-newsletter-form]');
    forms.forEach((form) => {
      const input = form.querySelector('input[type="email"]');
      const feedback = form.querySelector('.feedback');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const value = (input.value || '').trim();
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        feedback.className = 'feedback';
        if (!ok) {
          feedback.classList.add('error');
          feedback.textContent = 'Please enter a valid email address.';
          input.setAttribute('aria-invalid', 'true');
          return;
        }

        feedback.classList.add('success');
        feedback.textContent = 'Thanks—your subscription is confirmed.';
        input.setAttribute('aria-invalid', 'false');
        form.reset();
      });
    });
  }

  function setupCountrySelector() {
    const button = document.querySelector('[data-country-btn]');
    const list = document.querySelector('[data-country-list]');
    if (!button || !list) return;

    button.addEventListener('click', () => list.classList.toggle('open'));
    list.querySelectorAll('button').forEach((countryBtn) => {
      countryBtn.addEventListener('click', () => {
        button.textContent = countryBtn.textContent;
        list.classList.remove('open');
      });
    });

    document.addEventListener('click', (event) => {
      if (!event.target.closest('.country-wrap')) list.classList.remove('open');
    });
  }
})();
