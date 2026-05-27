/* ===== RedRoom Fitness — Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCarousel();
  initToggle();
  initInstructorFilter();
  initFAQ();
  initNewsletter();
  initFooterCountry();
});

/* ===== Mobile Nav ===== */
function initNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

/* ===== Carousel ===== */
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const slides = track.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const nextBtn = document.querySelector('.carousel-btn-next');
  const dotsContainer = document.querySelector('.carousel-dots');
  let current = 0;
  const total = slides.length;

  // Create dots
  if (dotsContainer) {
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goTo(index) {
    current = ((index % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Swipe support
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
    }
  }, { passive: true });

  // Auto-advance
  let autoTimer = setInterval(() => goTo(current + 1), 5000);
  const wrapper = document.querySelector('.carousel-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => clearInterval(autoTimer));
    wrapper.addEventListener('mouseleave', () => {
      autoTimer = setInterval(() => goTo(current + 1), 5000);
    });
  }
}

/* ===== Floor / Treadmill Toggle ===== */
function initToggle() {
  const btns = document.querySelectorAll('.toggle-btn');
  const contents = document.querySelectorAll('.toggle-content');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;

      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      contents.forEach(c => {
        c.classList.toggle('active', c.id === target);
      });
    });
  });
}

/* ===== Instructor Filter ===== */
function initInstructorFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.instructor-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const location = btn.dataset.location;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        if (location === 'all' || card.dataset.location === location) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ===== FAQ Accordion ===== */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-answer');
        a.style.maxHeight = null;
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ===== Newsletter ===== */
function initNewsletter() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    const input = form.querySelector('input[type="email"]');
    const msgEl = form.parentElement.querySelector('.newsletter-msg');
    if (!input || !msgEl) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = input.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      input.classList.remove('error', 'success');
      msgEl.classList.remove('error-msg', 'success-msg');

      if (!email) {
        input.classList.add('error');
        msgEl.textContent = 'Please enter your email address.';
        msgEl.classList.add('error-msg');
      } else if (!valid) {
        input.classList.add('error');
        msgEl.textContent = 'Please enter a valid email address.';
        msgEl.classList.add('error-msg');
      } else {
        input.classList.add('success');
        msgEl.textContent = 'You\'re in! Welcome to the RedRoom community.';
        msgEl.classList.add('success-msg');
        input.value = '';
      }
    });
  });
}

/* ===== Footer Country Selector ===== */
function initFooterCountry() {
  const btn = document.querySelector('.footer-country-btn');
  const dropdown = document.querySelector('.footer-country-dropdown');
  if (!btn || !dropdown) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    dropdown.classList.remove('open');
  });

  dropdown.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      btn.querySelector('span').textContent = link.textContent;
      dropdown.classList.remove('open');
    });
  });
}
