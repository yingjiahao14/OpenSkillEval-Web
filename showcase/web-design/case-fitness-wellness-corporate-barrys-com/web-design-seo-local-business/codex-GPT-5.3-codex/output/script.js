(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    let index = 0;
    const update = () => { track.style.transform = `translateX(-${index * 100}%)`; };
    carousel.querySelector('.next')?.addEventListener('click', () => { index = (index + 1) % slides.length; update(); });
    carousel.querySelector('.prev')?.addEventListener('click', () => { index = (index - 1 + slides.length) % slides.length; update(); });

    let startX = 0;
    carousel.addEventListener('touchstart', (event) => { startX = event.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', (event) => {
      const dx = event.changedTouches[0].clientX - startX;
      if (dx > 50) { index = (index - 1 + slides.length) % slides.length; update(); }
      if (dx < -50) { index = (index + 1) % slides.length; update(); }
    }, { passive: true });
  }

  const floorTread = document.querySelector('[data-toggle-workout]');
  if (floorTread) {
    const buttons = floorTread.querySelectorAll('.toggle-btn');
    const panels = floorTread.querySelectorAll('.toggle-panel');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.target;
        buttons.forEach((item) => item.classList.remove('active'));
        panels.forEach((panel) => panel.hidden = panel.dataset.panel !== key);
        btn.classList.add('active');
      });
    });
  }

  const locationFilter = document.querySelector('[data-location-filter]');
  if (locationFilter) {
    const cards = document.querySelectorAll('.instructor-card');
    locationFilter.addEventListener('change', () => {
      const value = locationFilter.value;
      cards.forEach((card) => {
        const match = value === 'All' || card.dataset.location === value;
        card.style.display = match ? '' : 'none';
      });
    });
  }

  const accordion = document.querySelector('[data-accordion]');
  if (accordion) {
    const items = accordion.querySelectorAll('.accordion-item');
    items.forEach((item) => {
      item.querySelector('.accordion-btn')?.addEventListener('click', () => {
        items.forEach((other) => { if (other !== item) other.classList.remove('open'); });
        item.classList.toggle('open');
      });
    });
  }

  const newsletterForm = document.querySelector('[data-newsletter-form]');
  if (newsletterForm) {
    const input = newsletterForm.querySelector('input[type="email"]');
    const msg = newsletterForm.querySelector('.inline-msg');
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = input.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!valid) {
        msg.textContent = 'Please enter a valid email address.';
        msg.className = 'inline-msg error';
        input.setAttribute('aria-invalid', 'true');
        return;
      }
      msg.textContent = 'Thanks — you are now subscribed to RedRoom updates.';
      msg.className = 'inline-msg success';
      input.removeAttribute('aria-invalid');
      newsletterForm.reset();
    });
  }

  const countryWrap = document.querySelector('.country-wrap');
  if (countryWrap) {
    const btn = countryWrap.querySelector('.country-btn');
    const list = countryWrap.querySelector('.country-list');
    btn?.addEventListener('click', () => countryWrap.classList.toggle('open'));
    list?.querySelectorAll('button').forEach((option) => {
      option.addEventListener('click', () => {
        btn.textContent = option.textContent;
        countryWrap.classList.remove('open');
      });
    });
    document.addEventListener('click', (event) => {
      if (!countryWrap.contains(event.target)) countryWrap.classList.remove('open');
    });
  }
})();
