document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  if (mobileToggle && header) {
    mobileToggle.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('[data-newsletter]').forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const message = form.parentElement.querySelector('.form-message');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = input.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      message.className = 'form-message ' + (valid ? 'success' : 'error');
      message.textContent = valid ? 'You are in. Watch your inbox for RedRoom updates.' : 'Enter a valid email address to subscribe.';
      input.setAttribute('aria-invalid', String(!valid));
      if (valid) form.reset();
    });
  });

  document.querySelectorAll('.country-toggle').forEach((button) => {
    const menu = button.nextElementSibling;
    button.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
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
    const move = (direction) => {
      index = (index + direction + slides.length) % slides.length;
      render();
    };
    carousel.querySelector('.prev').addEventListener('click', () => move(-1));
    carousel.querySelector('.next').addEventListener('click', () => move(1));
    dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => { index = dotIndex; render(); }));
    track.addEventListener('pointerdown', (event) => { startX = event.clientX; });
    track.addEventListener('pointerup', (event) => {
      const delta = event.clientX - startX;
      if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1);
    });
    setInterval(() => move(1), 6500);
    render();
  }

  document.querySelectorAll('[data-workout-toggle]').forEach((shell) => {
    const buttons = [...shell.querySelectorAll('.toggle-btn')];
    const panels = [...shell.querySelectorAll('.toggle-panel')];
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.target;
        buttons.forEach((item) => {
          const active = item === button;
          item.classList.toggle('active', active);
          item.setAttribute('aria-selected', String(active));
        });
        panels.forEach((panel) => panel.classList.toggle('active', panel.id === target));
      });
    });
  });

  const locationFilter = document.querySelector('#locationFilter');
  if (locationFilter) {
    const cards = [...document.querySelectorAll('.instructor-card')];
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

  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const list = item.parentElement;
      const willOpen = !item.classList.contains('open');
      list.querySelectorAll('.faq-item').forEach((faq) => {
        faq.classList.remove('open');
        faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        faq.querySelector('.faq-question span:last-child').textContent = '+';
      });
      if (willOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
        button.querySelector('span:last-child').textContent = '−';
      }
    });
  });
});
