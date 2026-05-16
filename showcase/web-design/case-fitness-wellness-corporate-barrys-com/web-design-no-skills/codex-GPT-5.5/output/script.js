document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const menuToggle = document.querySelector('.menu-toggle');
  if (nav && menuToggle) {
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
        message.textContent = 'Enter a valid email address to join the RedRoom list.';
        message.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        return;
      }
      input.setAttribute('aria-invalid', 'false');
      message.textContent = 'You are in. Watch your inbox for RedRoom updates and offers.';
      message.classList.add('success');
      form.reset();
    });
  });

  document.querySelectorAll('.country-toggle').forEach((button) => {
    const menu = button.nextElementSibling;
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.country-menu.open').forEach((openMenu) => openMenu.classList.remove('open'));
      document.querySelectorAll('.country-toggle[aria-expanded="true"]').forEach((openButton) => openButton.setAttribute('aria-expanded', 'false'));
      menu.classList.toggle('open', !expanded);
      button.setAttribute('aria-expanded', String(!expanded));
    });
  });

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dots = Array.from(document.querySelectorAll('[data-carousel-dot]'));
    let index = 0;
    let touchStart = 0;
    const goTo = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
    };
    carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => goTo(index - 1));
    carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => goTo(index + 1));
    dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => goTo(dotIndex)));
    carousel.addEventListener('touchstart', (event) => { touchStart = event.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', (event) => {
      const delta = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(delta) > 45) goTo(index + (delta < 0 ? 1 : -1));
    });
    setInterval(() => goTo(index + 1), 6500);
  }

  const toggleTabs = document.querySelectorAll('[data-workout-tab]');
  if (toggleTabs.length) {
    const panels = document.querySelectorAll('[data-workout-panel]');
    toggleTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.workoutTab;
        toggleTabs.forEach((button) => button.classList.toggle('active', button === tab));
        panels.forEach((panel) => panel.classList.toggle('active', panel.dataset.workoutPanel === target));
      });
    });
  }

  const locationFilter = document.querySelector('#locationFilter');
  if (locationFilter) {
    const cards = document.querySelectorAll('[data-location]');
    const count = document.querySelector('#filterCount');
    const applyFilter = () => {
      const value = locationFilter.value;
      let visible = 0;
      cards.forEach((card) => {
        const show = value === 'All Locations' || card.dataset.location === value;
        card.hidden = !show;
        if (show) visible += 1;
      });
      count.textContent = `${visible} instructor${visible === 1 ? '' : 's'} showing`;
    };
    locationFilter.addEventListener('change', applyFilter);
    applyFilter();
  }

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach((other) => {
        other.classList.remove('open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-question span:last-child').textContent = '+';
      });
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
        question.querySelector('span:last-child').textContent = '−';
      }
    });
  });
});
