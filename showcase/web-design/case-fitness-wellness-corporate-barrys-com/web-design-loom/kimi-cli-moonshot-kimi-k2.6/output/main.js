/* ============================================
   RedRoom Fitness — Global Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCarousels();
  initToggles();
  initInstructorFilter();
  initFAQAccordion();
  initNewsletterForms();
  initCountrySelector();
});

/* Mobile Navigation */
function initMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

/* Carousels */
function initCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    let current = 0;
    const total = slides.length;

    // Create dots
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    }

    function goTo(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      track.style.transform = `translateX(-${current * 100}%)`;

      if (dotsContainer) {
        dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === current);
        });
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Touch / swipe support
    let startX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        goTo(current + (diff > 0 ? 1 : -1));
      }
      isDragging = false;
    }, { passive: true });
  });
}

/* Floor / Treadmill Toggle */
function initToggles() {
  document.querySelectorAll('.toggle-group').forEach(group => {
    const btns = group.querySelectorAll('.toggle-btn');
    const panels = document.querySelectorAll('.toggle-content');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        btns.forEach(b => b.classList.toggle('active', b === btn));
        panels.forEach(p => {
          if (p.dataset.id === target) {
            p.classList.add('active');
          } else if (panels.length === 2) {
            p.classList.remove('active');
          }
        });
      });
    });
  });
}

/* Instructor Location Filter */
function initInstructorFilter() {
  const filterBar = document.querySelector('.filter-bar');
  if (!filterBar) return;

  const pills = filterBar.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.instructor-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const location = pill.dataset.location;
      pills.forEach(p => p.classList.toggle('active', p === pill));

      cards.forEach(card => {
        const cardLoc = card.dataset.location;
        if (!location || location === 'all' || cardLoc === location) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* FAQ Accordion (single-open) */
function initFAQAccordion() {
  const faqList = document.querySelector('.faq-list');
  if (!faqList) return;

  const items = faqList.querySelectorAll('.faq-item');

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(i => i.classList.remove('open'));

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* Newsletter Forms */
function initNewsletterForms() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const message = form.parentElement.querySelector('.newsletter-message');
      const email = input.value.trim();

      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValid) {
        if (message) {
          message.textContent = 'Please enter a valid email address.';
          message.className = 'newsletter-message error';
        }
        input.style.borderColor = 'var(--red)';
        return;
      }

      input.style.borderColor = '';
      if (message) {
        message.textContent = 'You\'re in! Check your inbox for confirmation.';
        message.className = 'newsletter-message success';
      }
      input.value = '';
    });
  });
}

/* Country Selector */
function initCountrySelector() {
  document.querySelectorAll('.country-select').forEach(select => {
    const btn = select.querySelector('.country-select-btn');
    const dropdown = select.querySelector('.country-dropdown');
    const items = select.querySelectorAll('.country-dropdown li');

    if (!btn || !dropdown) return;

    btn.addEventListener('click', e => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    items.forEach(item => {
      item.addEventListener('click', () => {
        const label = select.querySelector('.country-label');
        if (label) label.textContent = item.textContent;
        dropdown.classList.remove('open');
      });
    });

    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
    });
  });
}
