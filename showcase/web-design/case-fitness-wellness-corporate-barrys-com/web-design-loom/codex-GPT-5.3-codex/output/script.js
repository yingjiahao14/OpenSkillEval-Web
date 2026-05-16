const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
  const input = form.querySelector('input[type="email"]');
  const feedback = form.querySelector('.feedback');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!emailRegex.test(value)) {
      feedback.textContent = 'Please enter a valid email address.';
      feedback.className = 'feedback error';
      input.setAttribute('aria-invalid', 'true');
      return;
    }
    feedback.textContent = 'Thanks! You are subscribed to RedRoom updates.';
    feedback.className = 'feedback success';
    input.setAttribute('aria-invalid', 'false');
    form.reset();
  });
});

const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const track = carousel.querySelector('.carousel-track');
  const slides = [...carousel.querySelectorAll('.slide')];
  let index = 0;
  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };
  carousel.querySelector('.prev')?.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  });
  carousel.querySelector('.next')?.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    update();
  });
  let startX = 0;
  let deltaX = 0;
  track.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchmove', (event) => {
    deltaX = event.touches[0].clientX - startX;
  }, { passive: true });
  track.addEventListener('touchend', () => {
    if (Math.abs(deltaX) > 40) {
      index = deltaX > 0 ? (index - 1 + slides.length) % slides.length : (index + 1) % slides.length;
      update();
    }
    deltaX = 0;
  });
}

const workoutToggle = document.querySelector('[data-workout-toggle]');
if (workoutToggle) {
  const buttons = [...workoutToggle.querySelectorAll('.toggle-btn')];
  const panelTitle = document.querySelector('[data-toggle-title]');
  const panelCopy = document.querySelector('[data-toggle-copy]');
  const panelList = document.querySelector('[data-toggle-list]');
  const content = {
    floor: {
      title: 'Floor Focus: Strength + Stability',
      copy: 'The floor block combines dumbbell strength, core stability, and explosive intervals to build functional power and total-body endurance.',
      bullets: ['Upper/lower body supersets', 'Core-centric movement sequences', 'Scaled options for all levels']
    },
    tread: {
      title: 'Treadmill Focus: Speed + Endurance',
      copy: 'Intervals on the treadmill cycle through push pace, all-out efforts, and recovery to improve VO2 max and calorie burn.',
      bullets: ['Progressive pace coaching', 'Heart-rate aligned intervals', 'Performance tracking every class']
    }
  };

  const render = (key) => {
    const selected = content[key];
    panelTitle.textContent = selected.title;
    panelCopy.textContent = selected.copy;
    panelList.innerHTML = selected.bullets.map((item) => `<li>${item}</li>`).join('');
    buttons.forEach((btn) => {
      const active = btn.dataset.target === key;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => render(btn.dataset.target));
  });
}

const locationFilter = document.querySelector('[data-location-filter]');
if (locationFilter) {
  const cards = [...document.querySelectorAll('[data-location]')];
  locationFilter.addEventListener('change', () => {
    const selected = locationFilter.value;
    cards.forEach((card) => {
      const match = selected === 'all' || card.dataset.location === selected;
      card.style.display = match ? 'block' : 'none';
    });
  });
}

const accordion = document.querySelector('[data-accordion]');
if (accordion) {
  const items = [...accordion.querySelectorAll('.accordion-item')];
  items.forEach((item) => {
    const button = item.querySelector('.accordion-btn');
    button.addEventListener('click', () => {
      const willOpen = !item.classList.contains('open');
      items.forEach((i) => i.classList.remove('open'));
      if (willOpen) item.classList.add('open');
    });
  });
}

const countryBtn = document.querySelector('[data-country-button]');
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
  document.addEventListener('click', (event) => {
    if (!countryMenu.contains(event.target) && event.target !== countryBtn) {
      countryMenu.classList.remove('open');
    }
  });
}
