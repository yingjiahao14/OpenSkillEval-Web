const currentPage = document.body.dataset.page || '';

// Shared active nav state
for (const nav of document.querySelectorAll('.nav-links a')) {
  if (nav.dataset.page === currentPage) nav.classList.add('active');
}

// Home carousel with swipe
(function initCarousel() {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const slides = [...carousel.querySelectorAll('.slide')];
  const prev = carousel.querySelector('[data-prev]');
  const next = carousel.querySelector('[data-next]');
  let index = 0;

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }
  function go(step) {
    index = (index + step + slides.length) % slides.length;
    render();
  }

  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));

  let startX = 0;
  let deltaX = 0;
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    deltaX = 0;
  }, { passive: true });

  carousel.addEventListener('touchmove', (e) => {
    deltaX = e.touches[0].clientX - startX;
  }, { passive: true });

  carousel.addEventListener('touchend', () => {
    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) go(-1);
      else go(1);
    }
  });
})();

// Workout Floor/Tread toggle
(function initWorkoutToggle() {
  const wrap = document.querySelector('[data-workout-toggle]');
  if (!wrap) return;
  const buttons = [...wrap.querySelectorAll('.toggle-btn')];
  const panels = [...document.querySelectorAll('[data-workout-panel]')];

  function show(mode) {
    buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
    panels.forEach(panel => panel.hidden = panel.dataset.workoutPanel !== mode);
  }

  buttons.forEach(btn => btn.addEventListener('click', () => show(btn.dataset.mode)));
  show('floor');
})();

// Instructor location filter
(function initInstructorFilter() {
  const select = document.querySelector('[data-location-filter]');
  if (!select) return;
  const cards = [...document.querySelectorAll('[data-location]')];

  function filter() {
    const selected = select.value;
    cards.forEach(card => {
      const show = selected === 'All' || card.dataset.location === selected;
      card.style.display = show ? '' : 'none';
    });
  }
  select.addEventListener('change', filter);
  filter();
})();

// FAQ accordion single-open
(function initFaqAccordion() {
  const faq = document.querySelector('[data-faq]');
  if (!faq) return;
  const items = [...faq.querySelectorAll('.faq-item')];
  items.forEach((item) => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const willOpen = !item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (willOpen) item.classList.add('open');
    });
  });
})();

// Newsletter validation with inline feedback
(function initNewsletter() {
  const forms = [...document.querySelectorAll('[data-newsletter]')];
  if (!forms.length) return;

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  forms.forEach(form => {
    const email = form.querySelector('input[type="email"]');
    const feedback = form.querySelector('.inline-feedback');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = email.value.trim();
      if (!validEmail(val)) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.className = 'inline-feedback error';
        email.setAttribute('aria-invalid', 'true');
      } else {
        feedback.textContent = 'Success! You are subscribed for updates and offers.';
        feedback.className = 'inline-feedback success';
        email.removeAttribute('aria-invalid');
        form.reset();
      }
    });
  });
})();

// Footer country selector toggle
(function initCountryToggle() {
  const btn = document.querySelector('[data-country-toggle]');
  const panel = document.querySelector('[data-country-panel]');
  if (!btn || !panel) return;
  btn.addEventListener('click', () => {
    const open = panel.hidden;
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  });
})();
