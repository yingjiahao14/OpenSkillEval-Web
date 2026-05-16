// RedRoom Fitness — Global Scripts

document.addEventListener('DOMContentLoaded', function () {
  initMobileMenu();
  initCarousels();
  initAccordions();
  initToggles();
  initNewsletters();
  initInstructorFilters();
});

/* Mobile Menu */
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    menu.classList.toggle('open');
    const isOpen = menu.classList.contains('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* Carousels */
function initCarousels() {
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    if (!track || slides.length === 0) return;

    let current = 0;
    const total = slides.length;

    function goTo(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      updateDots();
    }

    function updateDots() {
      if (!dotsContainer) return;
      dotsContainer.querySelectorAll('.carousel-dot').forEach(function (dot, i) {
        dot.classList.toggle('active', i === current);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach(function (dot, i) {
        dot.addEventListener('click', function () { goTo(i); });
      });
    }

    // Touch / swipe support
    let startX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    carousel.addEventListener('touchmove', function () {
      // no-op, just for completeness
    }, { passive: true });

    carousel.addEventListener('touchend', function (e) {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        goTo(current + (diff > 0 ? 1 : -1));
      }
      isDragging = false;
    }, { passive: true });

    // Auto-advance every 6s
    setInterval(function () {
      goTo(current + 1);
    }, 6000);
  });
}

/* Accordions (single-open) */
function initAccordions() {
  document.querySelectorAll('.accordion').forEach(function (accordion) {
    const items = accordion.querySelectorAll('.accordion-item');

    items.forEach(function (item) {
      const header = item.querySelector('.accordion-header');
      if (!header) return;

      header.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');

        // Close all in this accordion
        items.forEach(function (other) {
          other.classList.remove('open');
          const otherHeader = other.querySelector('.accordion-header');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        });

        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });
}

/* Toggles (Floor/Treadmill) */
function initToggles() {
  document.querySelectorAll('.toggle-group').forEach(function (group) {
    const buttons = group.querySelectorAll('.toggle-btn');
    const targetName = group.dataset.target;
    if (!targetName) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = btn.dataset.toggle;

        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        document.querySelectorAll('[data-toggle-group="' + targetName + '"]').forEach(function (content) {
          content.classList.toggle('active', content.dataset.toggleId === target);
        });
      });
    });
  });
}

/* Newsletter Validation */
function initNewsletters() {
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const errorEl = form.querySelector('.error');
      const successEl = form.querySelector('.success');
      const email = input.value.trim();

      if (errorEl) errorEl.textContent = '';
      if (successEl) successEl.textContent = '';

      if (!email) {
        if (errorEl) errorEl.textContent = 'Please enter your email address.';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
        return;
      }

      if (successEl) {
        successEl.textContent = 'Thanks for subscribing! Check your inbox for confirmation.';
      }
      input.value = '';
    });
  });
}

/* Instructor Filters */
function initInstructorFilters() {
  const filterBar = document.querySelector('.filter-bar');
  const grid = document.querySelector('.instructor-grid');
  if (!filterBar || !grid) return;

  const buttons = filterBar.querySelectorAll('.filter-btn');
  const cards = grid.querySelectorAll('.instructor-card');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const location = btn.dataset.filter;

      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      cards.forEach(function (card) {
        const cardLocation = card.dataset.location;
        if (!location || location === 'all' || cardLocation === location) {
          card.style.display = '';
          // subtle animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          requestAnimationFrame(function () {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
