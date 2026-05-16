(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.getAttribute('href') === path) link.classList.add('active');
  });

  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    let idx = 0;
    let startX = null;

    function render() {
      track.style.transform = `translateX(-${idx * 100}%)`;
    }

    carousel.querySelector('[data-prev]')?.addEventListener('click', () => {
      idx = (idx - 1 + slides.length) % slides.length;
      render();
    });
    carousel.querySelector('[data-next]')?.addEventListener('click', () => {
      idx = (idx + 1) % slides.length;
      render();
    });

    carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 40) {
        idx = delta > 0 ? (idx - 1 + slides.length) % slides.length : (idx + 1) % slides.length;
        render();
      }
      startX = null;
    }, { passive: true });
  }

  const toggle = document.querySelector('[data-workout-toggle]');
  if (toggle) {
    const buttons = Array.from(toggle.querySelectorAll('.toggle-btn'));
    const floor = document.querySelector('[data-panel="floor"]');
    const tread = document.querySelector('[data-panel="treadmill"]');

    const setView = (view) => {
      buttons.forEach((b) => b.classList.toggle('active', b.dataset.view === view));
      floor.hidden = view !== 'floor';
      tread.hidden = view !== 'treadmill';
    };

    buttons.forEach((b) => {
      b.addEventListener('click', () => setView(b.dataset.view));
    });
  }

  const locationFilter = document.querySelector('[data-location-filter]');
  if (locationFilter) {
    const cards = Array.from(document.querySelectorAll('.instructor-card'));
    locationFilter.addEventListener('change', () => {
      const value = locationFilter.value;
      cards.forEach((card) => {
        const match = value === 'all' || card.dataset.location === value;
        card.style.display = match ? '' : 'none';
      });
    });
  }

  const faq = document.querySelector('[data-faq]');
  if (faq) {
    const items = Array.from(faq.querySelectorAll('.faq-item'));
    items.forEach((item) => {
      item.querySelector('.faq-btn')?.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach((x) => x.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  function wireNewsletter(form) {
    if (!form) return;
    const input = form.querySelector('input[type="email"]');
    const msg = form.querySelector('.form-msg');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      input.classList.toggle('input-error', !ok);
      msg.className = `form-msg ${ok ? 'success' : 'error'}`;
      msg.textContent = ok ? 'Thanks! You are subscribed and trial details are on the way.' : 'Please enter a valid email address.';
      if (ok) form.reset();
    });
  }

  document.querySelectorAll('[data-newsletter]').forEach(wireNewsletter);

  const countryBtn = document.querySelector('[data-country-btn]');
  const countrySelect = document.querySelector('[data-country-select]');
  if (countryBtn && countrySelect) {
    countryBtn.addEventListener('click', () => {
      const hidden = countrySelect.hidden;
      countrySelect.hidden = !hidden;
      countryBtn.setAttribute('aria-expanded', String(hidden));
    });
  }
})();
