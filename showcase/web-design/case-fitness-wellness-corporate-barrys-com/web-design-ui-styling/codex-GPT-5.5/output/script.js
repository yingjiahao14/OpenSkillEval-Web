document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  if (nav && navToggle) navToggle.addEventListener('click', () => nav.classList.toggle('open'));

  document.querySelectorAll('.newsletter-form').forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const message = form.querySelector('.form-message');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = input.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      message.className = 'form-message ' + (valid ? 'success' : 'error');
      message.textContent = valid ? 'You are in. Watch your inbox for RedRoom updates.' : 'Enter a valid email address to subscribe.';
      input.setAttribute('aria-invalid', String(!valid));
      if (valid) form.reset();
    });
  });

  document.querySelectorAll('.country-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const menu = button.nextElementSibling;
      const open = menu.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const dots = Array.from(carousel.querySelectorAll('.dot'));
    let index = 0;
    let startX = 0;
    const goTo = (next) => {
      index = (next + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
    };
    carousel.querySelector('[data-next]').addEventListener('click', () => goTo(index + 1));
    carousel.querySelector('[data-prev]').addEventListener('click', () => goTo(index - 1));
    dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => goTo(dotIndex)));
    carousel.addEventListener('touchstart', (event) => { startX = event.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', (event) => {
      const diff = startX - event.changedTouches[0].clientX;
      if (Math.abs(diff) > 45) goTo(index + (diff > 0 ? 1 : -1));
    });
  }

  const formatPanel = document.querySelector('[data-format-panel]');
  if (formatPanel) {
    const buttons = Array.from(formatPanel.querySelectorAll('.toggle-btn'));
    const title = formatPanel.querySelector('[data-format-title]');
    const body = formatPanel.querySelector('[data-format-body]');
    const visual = formatPanel.querySelector('[data-format-visual]');
    const copy = formatPanel.querySelector('.format-copy');
    const content = {
      floor: {
        title: 'Floor: Strength with purpose',
        body: 'Dumbbells, resistance bands, and bodyweight movements target specific muscle groups each day. Our instructors guide every rep to ensure proper form and maximum results.',
        visual: 'radial-gradient(circle at 30% 25%, #ff0000, #231010 42%, #080808)'
      },
      treadmill: {
        title: 'Treadmill: Speed meets control',
        body: 'From power walks to all-out sprints, the treadmill portion is designed to torch calories and build cardiovascular endurance. Every speed and incline is coach-led — all levels welcome.',
        visual: 'linear-gradient(130deg, #090909, #5b0000 52%, #ff0000)'
      }
    };
    buttons.forEach((button) => button.addEventListener('click', () => {
      const key = button.dataset.format;
      buttons.forEach((item) => item.classList.toggle('active', item === button));
      buttons.forEach((item) => item.setAttribute('aria-selected', String(item === button)));
      copy.classList.remove('show');
      setTimeout(() => {
        title.textContent = content[key].title;
        body.textContent = content[key].body;
        visual.style.setProperty('--visual', content[key].visual);
        copy.classList.add('show');
      }, 130);
    }));
  }

  const locationFilter = document.querySelector('[data-location-filter]');
  if (locationFilter) {
    const cards = Array.from(document.querySelectorAll('.instructor-card'));
    const count = document.querySelector('[data-filter-count]');
    const apply = () => {
      const selected = locationFilter.value;
      let visible = 0;
      cards.forEach((card) => {
        const show = selected === 'All Locations' || card.dataset.location === selected;
        card.classList.toggle('hidden', !show);
        if (show) visible += 1;
      });
      count.textContent = `${visible} coach${visible === 1 ? '' : 'es'} showing`;
    };
    locationFilter.addEventListener('change', apply);
    apply();
  }

  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((faq) => {
        faq.classList.remove('open');
        faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
