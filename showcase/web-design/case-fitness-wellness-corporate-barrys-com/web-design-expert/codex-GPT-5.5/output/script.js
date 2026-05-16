document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  document.querySelectorAll('.newsletter-form').forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const message = form.querySelector('.form-message');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = input.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      message.classList.remove('success', 'error');
      if (!valid) {
        message.textContent = 'Enter a valid email address to join the list.';
        message.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        return;
      }
      input.setAttribute('aria-invalid', 'false');
      message.textContent = 'You are in. Watch your inbox for RedRoom updates.';
      message.classList.add('success');
      form.reset();
    });
  });

  document.querySelectorAll('.country-toggle').forEach((button) => {
    button.addEventListener('click', () => button.closest('.country').classList.toggle('open'));
  });

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = [...carousel.querySelectorAll('.slide')];
    const dots = [...carousel.querySelectorAll('.dot')];
    let index = 0;
    let startX = 0;
    const render = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
    };
    const go = (direction) => {
      index = (index + direction + slides.length) % slides.length;
      render();
    };
    carousel.querySelector('.next').addEventListener('click', () => go(1));
    carousel.querySelector('.prev').addEventListener('click', () => go(-1));
    dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => { index = dotIndex; render(); }));
    track.addEventListener('pointerdown', (event) => { startX = event.clientX; });
    track.addEventListener('pointerup', (event) => {
      const delta = event.clientX - startX;
      if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1);
    });
    setInterval(() => go(1), 6500);
    render();
  }

  const toggleContent = document.querySelector('[data-workout-content]');
  if (toggleContent) {
    const data = {
      floor: {
        kicker: 'Strength block',
        title: 'Command every rep on the floor.',
        body: 'Dumbbells, resistance bands, and bodyweight movements target specific muscle groups each day. Our instructors guide every rep to ensure proper form and maximum results.',
        stat: '25 min focused strength intervals'
      },
      treadmill: {
        kicker: 'Run block',
        title: 'Own the tread, from walk to sprint.',
        body: 'From power walks to all-out sprints, the treadmill portion is designed to torch calories and build cardiovascular endurance. Every speed and incline is coach-led — all levels welcome.',
        stat: 'Coach-led speed + incline work'
      }
    };
    document.querySelectorAll('[data-workout-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const mode = button.dataset.workoutToggle;
        document.querySelectorAll('[data-workout-toggle]').forEach((btn) => btn.classList.toggle('active', btn === button));
        toggleContent.classList.add('switching');
        setTimeout(() => {
          toggleContent.innerHTML = `<span class="eyebrow">${data[mode].kicker}</span><h3>${data[mode].title}</h3><p>${data[mode].body}</p><p class="badge">${data[mode].stat}</p>`;
          toggleContent.classList.remove('switching');
        }, 180);
      });
    });
  }

  const locationFilter = document.querySelector('#locationFilter');
  if (locationFilter) {
    const cards = [...document.querySelectorAll('.instructor')];
    const count = document.querySelector('#filterCount');
    const applyFilter = () => {
      const selected = locationFilter.value;
      let visible = 0;
      cards.forEach((card) => {
        const show = selected === 'All Locations' || card.dataset.location === selected;
        card.classList.toggle('hidden', !show);
        if (show) visible += 1;
      });
      count.textContent = `${visible} instructor${visible === 1 ? '' : 's'} showing`;
    };
    locationFilter.addEventListener('change', applyFilter);
    applyFilter();
  }

  document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const shouldOpen = !item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((faqItem) => faqItem.classList.remove('open'));
      if (shouldOpen) item.classList.add('open');
    });
  });
});
