document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  document.querySelector('.menu-toggle')?.addEventListener('click', () => nav?.classList.toggle('open'));

  document.querySelectorAll('[data-newsletter]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const msg = form.parentElement.querySelector('.form-msg');
      const value = input.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      msg.className = 'form-msg ' + (valid ? 'success' : 'error');
      msg.textContent = valid ? 'You’re in. Watch your inbox for RedRoom updates.' : 'Enter a valid email address to subscribe.';
      if (valid) form.reset();
    });
  });

  document.querySelectorAll('.country').forEach((country) => {
    country.querySelector('button')?.addEventListener('click', () => country.classList.toggle('open'));
  });

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.track');
    const slides = [...carousel.querySelectorAll('.slide')];
    const dots = carousel.querySelector('.dots');
    let index = 0;
    let startX = 0;
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => go(i));
      dots.appendChild(dot);
    });
    const render = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.querySelectorAll('button').forEach((dot, i) => dot.classList.toggle('active-dot', i === index));
    };
    const go = (next) => { index = (next + slides.length) % slides.length; render(); };
    carousel.querySelector('.car-prev')?.addEventListener('click', () => go(index - 1));
    carousel.querySelector('.car-next')?.addEventListener('click', () => go(index + 1));
    carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) go(index + (diff > 0 ? 1 : -1));
    });
    setInterval(() => go(index + 1), 6500);
    render();
  }

  const toggle = document.querySelector('[data-workout-toggle]');
  if (toggle) {
    const title = document.querySelector('[data-toggle-title]');
    const body = document.querySelector('[data-toggle-body]');
    const meta = document.querySelector('[data-toggle-meta]');
    const content = {
      floor: {
        title: 'Floor: Strength Under Red Light',
        body: 'Dumbbells, resistance bands, and bodyweight movements target specific muscle groups each day. Our instructors guide every rep to ensure proper form and maximum results.',
        meta: 'Build lean muscle · Control tempo · Coach-led form'
      },
      treadmill: {
        title: 'Treadmill: Sprints, Climbs, Endurance',
        body: 'From power walks to all-out sprints, the treadmill portion is designed to torch calories and build cardiovascular endurance. Every speed and incline is coach-led — all levels welcome.',
        meta: 'Intervals · Incline pushes · All-out finishes'
      }
    };
    toggle.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        toggle.querySelectorAll('button').forEach((btn) => btn.classList.remove('selected'));
        button.classList.add('selected');
        const selected = content[button.dataset.mode];
        title.textContent = selected.title;
        body.textContent = selected.body;
        meta.textContent = selected.meta;
      });
    });
  }

  const instructorFilter = document.querySelector('[data-location-filter]');
  if (instructorFilter) {
    const cards = [...document.querySelectorAll('[data-location]')];
    const count = document.querySelector('[data-filter-count]');
    const apply = () => {
      const location = instructorFilter.value;
      let visible = 0;
      cards.forEach((card) => {
        const show = location === 'All Locations' || card.dataset.location === location;
        card.hidden = !show;
        if (show) visible += 1;
      });
      count.textContent = `${visible} instructor${visible === 1 ? '' : 's'} showing`;
    };
    instructorFilter.addEventListener('change', apply);
    apply();
  }

  document.querySelectorAll('.faq-q').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((faq) => faq.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
});
