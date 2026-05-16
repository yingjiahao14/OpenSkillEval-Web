const setupActiveNav = () => {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === page) link.classList.add('active');
  });
};

const setupCountrySelector = () => {
  document.querySelectorAll('[data-country]').forEach((wrap) => {
    const toggle = wrap.querySelector('[data-country-toggle]');
    const menu = wrap.querySelector('[data-country-menu]');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });

    menu.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        toggle.textContent = `Region: ${btn.textContent}`;
        menu.classList.remove('open');
      });
    });

    document.addEventListener('click', (event) => {
      if (!wrap.contains(event.target)) menu.classList.remove('open');
    });
  });
};

const setupNewsletterForms = () => {
  document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
    const input = form.querySelector('input[type="email"]');
    const msg = form.querySelector('.inline-msg');
    if (!input || !msg) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = input.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      msg.className = 'inline-msg';
      if (!value) {
        msg.textContent = 'Please enter an email address.';
        msg.classList.add('error');
        return;
      }

      if (!valid) {
        msg.textContent = 'Please enter a valid email (example@domain.com).';
        msg.classList.add('error');
        return;
      }

      msg.textContent = 'You are in. Check your inbox for your free trial details.';
      msg.classList.add('success');
      input.value = '';
    });
  });
};

const setupCarousel = () => {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = [...carousel.querySelectorAll('.slide')];
  const prev = carousel.querySelector('[data-prev]');
  const next = carousel.querySelector('[data-next]');
  let index = 0;
  let startX = 0;

  const render = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  const goNext = () => {
    index = (index + 1) % slides.length;
    render();
  };

  const goPrev = () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
  };

  prev?.addEventListener('click', goPrev);
  next?.addEventListener('click', goNext);

  carousel.addEventListener('touchstart', (event) => {
    startX = event.changedTouches[0].screenX;
  });

  carousel.addEventListener('touchend', (event) => {
    const endX = event.changedTouches[0].screenX;
    const delta = endX - startX;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) goNext();
    else goPrev();
  });
};

const setupWorkoutToggle = () => {
  const wrap = document.querySelector('[data-workout-toggle]');
  if (!wrap) return;

  const buttons = [...wrap.querySelectorAll('[data-toggle-btn]')];
  const panels = [...wrap.querySelectorAll('[data-toggle-panel]')];

  const show = (target) => {
    buttons.forEach((button) => {
      button.classList.toggle('active', button.dataset.toggleBtn === target);
    });
    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.togglePanel === target);
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => show(button.dataset.toggleBtn));
  });
};

const setupInstructorFilter = () => {
  const select = document.querySelector('[data-location-filter]');
  if (!select) return;

  const cards = [...document.querySelectorAll('[data-location]')];
  select.addEventListener('change', () => {
    const value = select.value;
    cards.forEach((card) => {
      const shouldShow = value === 'All' || card.dataset.location === value;
      card.style.display = shouldShow ? '' : 'none';
    });
  });
};

const setupFaqAccordion = () => {
  const items = [...document.querySelectorAll('.faq-item')];
  if (!items.length) return;

  items.forEach((item) => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!button || !answer) return;

    button.addEventListener('click', () => {
      const open = item.classList.contains('open');
      items.forEach((other) => {
        other.classList.remove('open');
        const otherAnswer = other.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!open) {
        item.classList.add('open');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
};

setupActiveNav();
setupCountrySelector();
setupNewsletterForms();
setupCarousel();
setupWorkoutToggle();
setupInstructorFilter();
setupFaqAccordion();
