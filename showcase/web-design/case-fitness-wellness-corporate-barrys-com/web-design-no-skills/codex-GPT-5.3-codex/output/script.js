const initCarousel = () => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = [...carousel.querySelectorAll('.slide')];
  const prev = carousel.querySelector('[data-prev]');
  const next = carousel.querySelector('[data-next]');
  let index = 0;
  let startX = 0;

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  const goNext = () => {
    index = (index + 1) % slides.length;
    update();
  };

  const goPrev = () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  };

  next?.addEventListener('click', goNext);
  prev?.addEventListener('click', goPrev);

  carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) < 35) return;
    if (delta < 0) goNext(); else goPrev();
  });
};

const initWorkoutToggle = () => {
  const root = document.querySelector('[data-workout-toggle]');
  if (!root) return;

  const buttons = [...root.querySelectorAll('.toggle-btn')];
  const title = root.querySelector('[data-toggle-title]');
  const body = root.querySelector('[data-toggle-body]');

  const content = {
    floor: {
      title: 'Floor Focus',
      body: 'Dumbbells, resistance bands, and bodyweight movements target specific muscle groups each day. Our instructors guide every rep to ensure proper form and maximum results.'
    },
    treadmill: {
      title: 'Treadmill Focus',
      body: 'From power walks to all-out sprints, the treadmill portion is designed to torch calories and build cardiovascular endurance. Every speed and incline is coach-led — all levels welcome.'
    }
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.dataset.view;
      title.textContent = content[key].title;
      body.textContent = content[key].body;
    });
  });
};

const initInstructorFilter = () => {
  const filter = document.querySelector('[data-location-filter]');
  if (!filter) return;
  const cards = [...document.querySelectorAll('[data-location]')];

  filter.addEventListener('change', () => {
    const value = filter.value;
    cards.forEach((card) => {
      const show = value === 'All Locations' || card.dataset.location === value;
      card.style.display = show ? 'block' : 'none';
    });
  });
};

const initAccordion = () => {
  const items = [...document.querySelectorAll('.accordion-item')];
  if (!items.length) return;

  items.forEach((item) => {
    const button = item.querySelector('.accordion-header');
    button?.addEventListener('click', () => {
      items.forEach((other) => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });
};

const initNewsletter = () => {
  const forms = [...document.querySelectorAll('[data-newsletter-form]')];
  if (!forms.length) return;

  forms.forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const feedback = form.querySelector('.feedback');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = input.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

      if (!valid) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.className = 'feedback error';
        input.setAttribute('aria-invalid', 'true');
        return;
      }

      feedback.textContent = 'You are subscribed. Welcome to the RedRoom newsletter.';
      feedback.className = 'feedback success';
      input.setAttribute('aria-invalid', 'false');
      form.reset();
    });
  });
};

const initCountrySelector = () => {
  const btn = document.querySelector('[data-country-btn]');
  const list = document.querySelector('[data-country-list]');
  if (!btn || !list) return;

  btn.addEventListener('click', () => {
    list.classList.toggle('open');
  });

  list.querySelectorAll('button').forEach((option) => {
    option.addEventListener('click', () => {
      btn.textContent = option.textContent;
      list.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!list.contains(e.target) && !btn.contains(e.target)) {
      list.classList.remove('open');
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initWorkoutToggle();
  initInstructorFilter();
  initAccordion();
  initNewsletter();
  initCountrySelector();
});
