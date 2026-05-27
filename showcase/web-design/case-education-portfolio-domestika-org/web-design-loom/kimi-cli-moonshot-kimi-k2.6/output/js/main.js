/**
 * CreativeHub — Main JavaScript
 */

// ============================================
// Utility Functions
// ============================================

function $(selector, context = document) {
  return context.querySelector(selector);
}

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

function debounce(fn, delay = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ============================================
// Promo Banner Countdown & Dismiss
// ============================================

function initPromoBanner() {
  const banner = $('.promo-banner');
  if (!banner) return;

  const closeBtn = banner.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      banner.style.display = 'none';
      localStorage.setItem('promoBannerDismissed', 'true');
    });
  }

  if (localStorage.getItem('promoBannerDismissed') === 'true') {
    banner.style.display = 'none';
  }

  // Countdown timer
  const countdownEl = banner.querySelector('.countdown');
  if (countdownEl) {
    let totalSeconds = 23 * 3600 + 47 * 60 + 12; // 23:47:12
    function updateCountdown() {
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      countdownEl.innerHTML = `
        <span>${String(h).padStart(2, '0')}</span>:
        <span>${String(m).padStart(2, '0')}</span>:
        <span>${String(s).padStart(2, '0')}</span>
      `;
      if (totalSeconds > 0) totalSeconds--;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
}

// ============================================
// Hero Carousel
// ============================================

function initHeroCarousel() {
  const carousel = $('.hero-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.hero-carousel-track');
  const slides = $$('.hero-slide', track);
  const dots = $$('.hero-carousel-dot');
  const prevBtn = $('.hero-carousel-arrow.prev');
  const nextBtn = $('.hero-carousel-arrow.next');
  if (!slides.length) return;

  let current = 0;
  const total = slides.length;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Auto-advance
  setInterval(() => goTo(current + 1), 6000);
}

// ============================================
// Course Carousels (horizontal scroll)
// ============================================

function initCourseCarousels() {
  $$('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.carousel-arrow.prev');
    const nextBtn = wrapper.querySelector('.carousel-arrow.next');
    if (!track) return;

    const scrollAmount = 320;

    function updateArrows() {
      if (prevBtn) {
        prevBtn.classList.toggle('hidden', track.scrollLeft <= 10);
      }
      if (nextBtn) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        nextBtn.classList.toggle('hidden', track.scrollLeft >= maxScroll - 10);
      }
    }

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

    track.addEventListener('scroll', debounce(updateArrows, 100));
    updateArrows();
  });
}

// ============================================
// Footer Accordion (Mobile)
// ============================================

function initFooterAccordion() {
  if (window.innerWidth > 640) return;

  $$('.footer-column').forEach(col => {
    const heading = col.querySelector('h4');
    if (!heading) return;

    heading.addEventListener('click', () => {
      const isOpen = col.classList.contains('open');
      // Close all
      $$('.footer-column').forEach(c => c.classList.remove('open'));
      // Toggle current
      if (!isOpen) col.classList.add('open');
    });
  });
}

// ============================================
// Plus Pricing Toggle
// ============================================

function initPricingToggle() {
  const tabs = $$('.pricing-tab');
  if (!tabs.length) return;

  const yearlyCard = $('.pricing-card.yearly');
  const monthlyCard = $('.pricing-card.monthly');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const plan = tab.dataset.plan;
      if (yearlyCard) yearlyCard.style.display = plan === 'yearly' ? 'block' : 'none';
      if (monthlyCard) monthlyCard.style.display = plan === 'monthly' ? 'block' : 'none';
    });
  });
}

// ============================================
// FAQ Accordion
// ============================================

function initFaqAccordion() {
  $$('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      $$('.faq-item').forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ============================================
// Courses Sidebar Filtering
// ============================================

function initCoursesFilter() {
  const sidebarBtns = $$('.sidebar-section button');
  if (!sidebarBtns.length) return;

  sidebarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from siblings
      const section = btn.closest('.sidebar-section');
      section.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter || btn.textContent.trim();
      filterCourses(filter);
    });
  });
}

function filterCourses(filter) {
  const courses = $$('.course-card');
  courses.forEach(card => {
    const category = card.dataset.category || '';
    if (filter === 'All' || category.includes(filter) || filter === 'All courses') {
      card.style.display = '';
      card.classList.add('animate-fade-in');
    } else {
      card.style.display = 'none';
    }
  });
}

// ============================================
// Projects Sort/Filter
// ============================================

function initProjectsFilter() {
  const sortBtn = $('#sortDropdownBtn');
  const sortMenu = $('#sortDropdownMenu');
  if (sortBtn && sortMenu) {
    sortBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sortMenu.classList.toggle('open');
    });

    sortMenu.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const sort = btn.dataset.sort;
        sortProjects(sort);
        sortBtn.querySelector('span').textContent = btn.textContent;
        sortMenu.classList.remove('open');
      });
    });

    document.addEventListener('click', () => sortMenu.classList.remove('open'));
  }
}

function sortProjects(sortType) {
  const grid = $('.masonry-grid');
  if (!grid) return;

  const items = $$('.masonry-item', grid);
  const sorted = [...items].sort((a, b) => {
    switch (sortType) {
      case 'likes':
        return parseInt(b.dataset.likes || 0) - parseInt(a.dataset.likes || 0);
      case 'views':
        return parseInt(b.dataset.views || 0) - parseInt(a.dataset.views || 0);
      case 'recent':
        return (b.dataset.date || '') > (a.dataset.date || '') ? 1 : -1;
      default:
        return 0;
    }
  });

  sorted.forEach(item => grid.appendChild(item));
}

// ============================================
// Login Password Toggle
// ============================================

function initPasswordToggle() {
  const toggle = $('.password-toggle');
  if (!toggle) return;

  const input = toggle.previousElementSibling;
  toggle.addEventListener('click', () => {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    toggle.innerHTML = isPassword
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
  });
}

// ============================================
// Mobile Menu
// ============================================

function initMobileMenu() {
  const btn = $('.mobile-menu-btn');
  const nav = $('.main-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('mobile-open');
    const isOpen = nav.classList.contains('mobile-open');
    btn.setAttribute('aria-expanded', isOpen);
  });
}

// ============================================
// Initialize All
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initPromoBanner();
  initHeroCarousel();
  initCourseCarousels();
  initFooterAccordion();
  initPricingToggle();
  initFaqAccordion();
  initCoursesFilter();
  initProjectsFilter();
  initPasswordToggle();
  initMobileMenu();
});
