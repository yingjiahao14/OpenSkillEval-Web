const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setupNewsletter(scope = document) {
  scope.querySelectorAll('[data-newsletter-form]').forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const msg = form.querySelector('.form-msg');
    if (!input || !msg) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = input.value.trim();
      if (!emailRegex.test(email)) {
        msg.textContent = 'Please enter a valid email address.';
        msg.className = 'form-msg error';
        input.setAttribute('aria-invalid', 'true');
        return;
      }
      msg.textContent = 'Thanks — you are subscribed to RedRoom updates.';
      msg.className = 'form-msg success';
      input.setAttribute('aria-invalid', 'false');
      form.reset();
    });
  });
}

function setupCountrySelector() {
  const toggle = document.querySelector('[data-country-toggle]');
  const menu = document.querySelector('[data-country-menu]');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
  });

  menu.querySelectorAll('.country-item').forEach((item) => {
    item.addEventListener('click', () => {
      toggle.textContent = `Region: ${item.dataset.value}`;
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function setupCarousel() {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const prev = carousel.querySelector('[data-prev]');
  const next = carousel.querySelector('[data-next]');
  let index = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  const render = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  prev?.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
  });

  next?.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    render();
  });

  carousel.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });
  carousel.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const delta = touchStartX - touchEndX;
    if (Math.abs(delta) < 40) return;
    index = delta > 0 ? (index + 1) % slides.length : (index - 1 + slides.length) % slides.length;
    render();
  });
}

function setupWorkoutToggle() {
  const toggleWrap = document.querySelector('[data-workout-toggle]');
  if (!toggleWrap) return;

  const buttons = [...toggleWrap.querySelectorAll('[data-tab]')];
  const panels = [...document.querySelectorAll('[data-panel]')];

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.tab;
      buttons.forEach((btn) => btn.classList.remove('btn-primary'));
      buttons.forEach((btn) => btn.classList.add('btn-ghost'));
      button.classList.remove('btn-ghost');
      button.classList.add('btn-primary');

      panels.forEach((panel) => {
        panel.hidden = panel.dataset.panel !== target;
      });
    });
  });
}

function setupInstructorFilter() {
  const select = document.querySelector('[data-location-filter]');
  const cards = [...document.querySelectorAll('[data-location]')];
  if (!select || !cards.length) return;

  select.addEventListener('change', () => {
    const value = select.value;
    cards.forEach((card) => {
      const match = value === 'All Locations' || card.dataset.location === value;
      card.style.display = match ? 'block' : 'none';
    });
  });
}

function setupFaqAccordion() {
  const items = [...document.querySelectorAll('.faq-item')];
  if (!items.length) return;

  items.forEach((item) => {
    const button = item.querySelector('.faq-btn');
    if (!button) return;
    button.addEventListener('click', () => {
      items.forEach((other) => {
        if (other !== item) other.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });
}

setupNewsletter();
setupCountrySelector();
setupCarousel();
setupWorkoutToggle();
setupInstructorFilter();
setupFaqAccordion();
