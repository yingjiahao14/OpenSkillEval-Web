/**
 * RedRoom Fitness — Main JavaScript
 * Handles: mobile nav, carousel, toggles, filters, accordion, newsletter, country selector
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCarousels();
  initToggles();
  initInstructorFilters();
  initAccordions();
  initNewsletterForms();
  initCountrySelectors();
});

/* ── Mobile Navigation ── */
function initMobileNav() {
  const btn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.mobile-nav');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Carousel ── */
function initCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-nav.prev');
    const nextBtn = carousel.querySelector('.carousel-nav.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    if (!track || slides.length === 0) return;

    let current = 0;
    const total = slides.length;

    // Build dots
    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    }

    const dots = carousel.querySelectorAll('.carousel-dot');

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Touch/swipe support
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', e => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        goTo(current + (diff > 0 ? 1 : -1));
      }
      isDragging = false;
    }, { passive: true });

    // Auto-advance every 6s
    setInterval(() => goTo(current + 1), 6000);
  });
}

/* ── Toggle Panels ── */
function initToggles() {
  document.querySelectorAll('.toggle-group').forEach(group => {
    const buttons = group.querySelectorAll('.toggle-btn');
    const panels = group.closest('section, .container, [data-toggle-root]')
      ?.querySelectorAll('.toggle-panel');
    if (!panels || panels.length === 0) return;

    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panels.forEach((p, i) => p.classList.toggle('active', i === idx));
      });
    });
  });
}

/* ── Instructor Location Filter ── */
function initInstructorFilters() {
  const filterBar = document.querySelector('.filter-bar[data-filter="instructors"]');
  const grid = document.querySelector('.instructor-grid[data-grid="instructors"]');
  if (!filterBar || !grid) return;

  const pills = filterBar.querySelectorAll('.filter-pill');
  const cards = grid.querySelectorAll('.instructor-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const location = pill.dataset.location;

      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      cards.forEach(card => {
        const cardLocation = card.dataset.location;
        const show = location === 'all' || cardLocation === location;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.animation = 'fadeIn 300ms ease';
        }
      });
    });
  });
}

/* ── Accordion (single-open) ── */
function initAccordions() {
  document.querySelectorAll('.accordion').forEach(accordion => {
    const items = accordion.querySelectorAll('.accordion-item');

    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      if (!header) return;

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all in this accordion
        items.forEach(i => i.classList.remove('open'));

        // Open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  });
}

/* ── Newsletter Form ── */
function initNewsletterForms() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const messageEl = form.querySelector('.form-message') || form.nextElementSibling;
      const email = input?.value.trim() || '';

      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValid) {
        if (messageEl) {
          messageEl.textContent = 'Please enter a valid email address.';
          messageEl.className = 'form-message error';
        }
        input?.focus();
        return;
      }

      if (messageEl) {
        messageEl.textContent = 'You\'re in! Check your inbox for a welcome message.';
        messageEl.className = 'form-message success';
      }
      if (input) input.value = '';
    });
  });
}

/* ── Country Selector ── */
function initCountrySelectors() {
  document.querySelectorAll('.country-select').forEach(wrapper => {
    const btn = wrapper.querySelector('.country-select-btn');
    const dropdown = wrapper.querySelector('.country-dropdown');
    const options = wrapper.querySelectorAll('.country-dropdown button');
    if (!btn || !dropdown) return;

    btn.addEventListener('click', e => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const flag = opt.dataset.flag;
        const label = opt.textContent;
        btn.querySelector('.country-label').textContent = label;
        dropdown.classList.remove('open');
      });
    });

    document.addEventListener('click', e => {
      if (!wrapper.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  });
}
