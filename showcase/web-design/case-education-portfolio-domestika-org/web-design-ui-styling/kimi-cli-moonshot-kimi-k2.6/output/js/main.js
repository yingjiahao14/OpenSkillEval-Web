/**
 * CreativeHub — Main JavaScript
 * Carousels, accordions, mobile menu, countdown, filters
 */

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-btn');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    const icon = toggle.querySelector('svg');
    if (menu.classList.contains('open')) {
      icon.innerHTML = '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>';
    } else {
      icon.innerHTML = '<path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/>';
    }
  });
}

// ============================================
// Promo Banner Countdown & Dismiss
// ============================================
function initPromoBanner() {
  const banner = document.querySelector('.promo-banner');
  if (!banner) return;

  const countdownEl = banner.querySelector('.countdown');
  const closeBtn = banner.querySelector('.close-btn');

  // Set countdown to ~23 hours from now
  let remaining = 23 * 3600 + 59 * 60 + 59;

  function formatTime(sec) {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  if (countdownEl) {
    countdownEl.textContent = formatTime(remaining);
    setInterval(() => {
      remaining = Math.max(0, remaining - 1);
      countdownEl.textContent = formatTime(remaining);
    }, 1000);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }
}

// ============================================
// Hero Carousel (slide-based)
// ============================================
function initHeroCarousel() {
  const container = document.querySelector('.hero-carousel');
  if (!container) return;

  const track = container.querySelector('.carousel-track');
  const slides = container.querySelectorAll('.carousel-slide');
  const dots = container.querySelectorAll('.carousel-dot');
  const prevBtn = container.querySelector('.carousel-arrow.prev');
  const nextBtn = container.querySelector('.carousel-arrow.next');

  let current = 0;
  const total = slides.length;

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // Auto-advance
  setInterval(() => goTo(current + 1), 6000);
}

// ============================================
// Scroll Carousel (course cards)
// ============================================
function initScrollCarousels() {
  document.querySelectorAll('.scroll-carousel').forEach(carousel => {
    const track = carousel.querySelector('.scroll-carousel-track');
    const prevBtn = carousel.querySelector('.scroll-carousel-arrow.prev');
    const nextBtn = carousel.querySelector('.scroll-carousel-arrow.next');
    if (!track) return;

    const scrollAmount = 300;

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  });
}

// ============================================
// Accordion
// ============================================
function initAccordions() {
  document.querySelectorAll('.accordion-item').forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close siblings if in a group
      const parent = item.closest('.accordion-group');
      if (parent) {
        parent.querySelectorAll('.accordion-item').forEach(sib => sib.classList.remove('open'));
      }
      item.classList.toggle('open', !isOpen);
    });
  });
}

// ============================================
// Footer Mobile Accordion
// ============================================
function initFooterAccordion() {
  const isMobile = () => window.innerWidth < 768;

  document.querySelectorAll('.footer-column').forEach(col => {
    const trigger = col.querySelector('.footer-accordion-trigger');
    if (!trigger) return;

    // Set initial state
    if (isMobile()) {
      col.classList.add('collapsed');
    }

    trigger.addEventListener('click', () => {
      if (!isMobile()) return;
      col.classList.toggle('collapsed');
    });
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('.footer-column').forEach(col => {
      if (!isMobile()) {
        col.classList.remove('collapsed');
      }
    });
  });
}

// ============================================
// Pricing Toggle
// ============================================
function initPricingToggle() {
  const toggle = document.querySelector('.pricing-toggle');
  if (!toggle) return;

  const buttons = toggle.querySelectorAll('button');
  const yearlyContent = document.querySelectorAll('.pricing-yearly');
  const monthlyContent = document.querySelectorAll('.pricing-monthly');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.dataset.plan;
      buttons.forEach(b => b.classList.toggle('active', b === btn));

      yearlyContent.forEach(el => el.classList.toggle('hidden', plan !== 'yearly'));
      monthlyContent.forEach(el => el.classList.toggle('hidden', plan !== 'monthly'));
    });
  });
}

// ============================================
// Course Sidebar Filter
// ============================================
function initCourseFilters() {
  const sidebar = document.querySelector('.courses-sidebar');
  if (!sidebar) return;

  const links = sidebar.querySelectorAll('.sidebar-link');
  const courses = document.querySelectorAll('.course-card-item');

  links.forEach(link => {
    link.addEventListener('click', () => {
      const filter = link.dataset.filter || 'all';

      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      courses.forEach(course => {
        const category = course.dataset.category || '';
        if (filter === 'all' || category === filter) {
          course.style.display = '';
        } else {
          course.style.display = 'none';
        }
      });
    });
  });
}

// ============================================
// Projects Sort & Filter
// ============================================
function initProjectFilters() {
  const sortSelect = document.querySelector('#project-sort');
  const timeSelect = document.querySelector('#project-time');
  const fieldTags = document.querySelectorAll('.filter-tag[data-field]');
  const items = document.querySelectorAll('.masonry-item');

  function applyFilters() {
    const sort = sortSelect ? sortSelect.value : 'featured';
    const time = timeSelect ? timeSelect.value : 'all';
    const activeField = document.querySelector('.filter-tag[data-field].active');
    const field = activeField ? activeField.dataset.field : 'all';

    // Filter
    items.forEach(item => {
      const itemField = item.dataset.field || '';
      const itemTime = item.dataset.time || 'all';

      const fieldMatch = field === 'all' || itemField === field;
      const timeMatch = time === 'all' || itemTime === time;

      item.style.display = fieldMatch && timeMatch ? '' : 'none';
    });

    // Sort (simple DOM reorder)
    const grid = document.querySelector('.masonry-grid');
    if (!grid) return;

    const visible = Array.from(items).filter(item => item.style.display !== 'none');
    visible.sort((a, b) => {
      if (sort === 'most-liked') return parseInt(b.dataset.likes || 0) - parseInt(a.dataset.likes || 0);
      if (sort === 'most-viewed') return parseInt(b.dataset.views || 0) - parseInt(a.dataset.views || 0);
      if (sort === 'most-recent') return (b.dataset.date || '').localeCompare(a.dataset.date || '');
      return 0;
    });

    visible.forEach(item => grid.appendChild(item));
  }

  if (sortSelect) sortSelect.addEventListener('change', applyFilters);
  if (timeSelect) timeSelect.addEventListener('change', applyFilters);

  fieldTags.forEach(tag => {
    tag.addEventListener('click', () => {
      fieldTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      applyFilters();
    });
  });
}

// ============================================
// Password Toggle
// ============================================
function initPasswordToggle() {
  const toggle = document.querySelector('.password-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const input = document.querySelector(toggle.dataset.target);
    if (!input) return;

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';

    const icon = toggle.querySelector('svg');
    if (isPassword) {
      icon.innerHTML = '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>';
    } else {
      icon.innerHTML = '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7c.78 0 1.53-.09 2.24-.26"/><path d="M2 2l20 20"/>';
    }
  });
}

// ============================================
// Initialize All
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initPromoBanner();
  initHeroCarousel();
  initScrollCarousels();
  initAccordions();
  initFooterAccordion();
  initPricingToggle();
  initCourseFilters();
  initProjectFilters();
  initPasswordToggle();
});
