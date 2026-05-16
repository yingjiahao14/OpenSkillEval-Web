const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

qsa('.nav-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const header = button.closest('.site-header');
    const isOpen = header.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

qsa('.newsletter-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = qs('input[type="email"]', form);
    const message = qs('.form-message', form);
    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    message.className = 'form-message';
    if (!valid) {
      message.textContent = 'Enter a valid email address to join the RedRoom list.';
      message.classList.add('error');
      input.setAttribute('aria-invalid', 'true');
      return;
    }
    input.setAttribute('aria-invalid', 'false');
    message.textContent = 'You’re in. Watch your inbox for workouts, drops, and offers.';
    message.classList.add('success');
    form.reset();
  });
});

qsa('.country-select').forEach((select) => {
  const button = qs('.country-button', select);
  button.addEventListener('click', () => {
    const open = select.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (event) => {
    if (!select.contains(event.target)) {
      select.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    }
  });
});

const carousel = qs('[data-carousel]');
if (carousel) {
  const track = qs('.carousel-track', carousel);
  const slides = qsa('.slide', carousel);
  const dots = qsa('.dot', carousel);
  let index = 0;
  let startX = 0;

  const updateCarousel = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
  };

  const move = (direction) => {
    index = (index + direction + slides.length) % slides.length;
    updateCarousel();
  };

  qs('.carousel-btn.prev', carousel).addEventListener('click', () => move(-1));
  qs('.carousel-btn.next', carousel).addEventListener('click', () => move(1));
  dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => {
    index = dotIndex;
    updateCarousel();
  }));
  carousel.addEventListener('touchstart', (event) => { startX = event.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', (event) => {
    const delta = event.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 45) move(delta > 0 ? -1 : 1);
  });
  setInterval(() => move(1), 7000);
}

const workoutToggle = qs('[data-workout-toggle]');
if (workoutToggle) {
  const panel = qs('.toggle-panel', workoutToggle);
  const data = {
    floor: {
      title: 'Floor: Strength with intent',
      body: 'Dumbbells, resistance bands, and bodyweight movements target specific muscle groups each day. Our instructors guide every rep to ensure proper form and maximum results.',
      stat: '25 MIN'
    },
    treadmill: {
      title: 'Treadmill: Speed meets stamina',
      body: 'From power walks to all-out sprints, the treadmill portion is designed to torch calories and build cardiovascular endurance. Every speed and incline is coach-led — all levels welcome.',
      stat: 'ALL OUT'
    }
  };
  qsa('[data-toggle-option]', workoutToggle).forEach((button) => {
    button.addEventListener('click', () => {
      const option = button.dataset.toggleOption;
      qsa('[data-toggle-option]', workoutToggle).forEach((item) => item.classList.toggle('active', item === button));
      panel.classList.add('switching');
      setTimeout(() => {
        panel.innerHTML = `<div class="kicker-stat">${data[option].stat}</div><h3>${data[option].title}</h3><p>${data[option].body}</p>`;
        panel.classList.remove('switching');
      }, 180);
    });
  });
}

const instructorFilter = qs('[data-instructor-filter]');
if (instructorFilter) {
  const cards = qsa('.instructor-card');
  const count = qs('[data-filter-count]');
  instructorFilter.addEventListener('change', () => {
    const location = instructorFilter.value;
    let visible = 0;
    cards.forEach((card) => {
      const show = location === 'All Locations' || card.dataset.location === location;
      card.classList.toggle('hidden', !show);
      if (show) visible += 1;
    });
    count.textContent = `${visible} instructor${visible === 1 ? '' : 's'} showing`;
  });
}

qsa('.faq-list').forEach((list) => {
  qsa('.faq-question', list).forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isActive = item.classList.contains('active');
      qsa('.faq-item', list).forEach((faq) => {
        faq.classList.remove('active');
        qs('.faq-question', faq).setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
