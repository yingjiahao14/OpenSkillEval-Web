/**
 * CreativeHub — Main JavaScript
 */

// ========================================
// Utility Functions
// ========================================
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

// ========================================
// Promo Banner
// ========================================
function initPromoBanner() {
  const banner = $('.promo-banner');
  const closeBtn = $('.promo-close');
  if (!banner || !closeBtn) return;

  closeBtn.addEventListener('click', () => {
    banner.classList.add('hidden');
  });

  // Countdown timer
  const countdownEl = $('.countdown');
  if (countdownEl) {
    let hours = 23, minutes = 59, seconds = 59;
    setInterval(() => {
      seconds--;
      if (seconds < 0) { seconds = 59; minutes--; }
      if (minutes < 0) { minutes = 59; hours--; }
      if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
      countdownEl.innerHTML = `
        <span>${String(hours).padStart(2, '0')}</span><span class="countdown-sep">:</span>
        <span>${String(minutes).padStart(2, '0')}</span><span class="countdown-sep">:</span>
        <span>${String(seconds).padStart(2, '0')}</span>
      `;
    }, 1000);
  }
}

// ========================================
// Hero Carousel
// ========================================
function initHeroCarousel() {
  const carousel = $('.hero-carousel');
  if (!carousel) return;

  const slides = $$('.hero-slide');
  const dots = $$('.carousel-dot');
  const prevBtn = $('.carousel-arrow--prev');
  const nextBtn = $('.carousel-arrow--next');
  if (!slides.length) return;

  let current = 0;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    current = index;
  }

  prevBtn?.addEventListener('click', () => {
    showSlide((current - 1 + slides.length) % slides.length);
  });

  nextBtn?.addEventListener('click', () => {
    showSlide((current + 1) % slides.length);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });

  // Auto-advance
  setInterval(() => {
    showSlide((current + 1) % slides.length);
  }, 6000);
}

// ========================================
// Horizontal Carousel Track
// ========================================
function initCarouselTracks() {
  $$('.carousel-track-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const prev = wrapper.querySelector('.carousel-arrow--prev');
    const next = wrapper.querySelector('.carousel-arrow--next');
    if (!track) return;

    const scrollAmount = 300;

    prev?.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    next?.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });
}

// ========================================
// Footer Accordion (Mobile)
// ========================================
function initFooterAccordion() {
  const isDesktop = window.matchMedia('(min-width: 1024px)');

  $$('.footer-group').forEach(group => {
    const heading = group.querySelector('.footer-heading');
    if (!heading) return;

    heading.addEventListener('click', () => {
      if (isDesktop.matches) return;
      group.classList.toggle('open');
    });
  });
}

// ========================================
// Courses Sidebar Filter
// ========================================
function initCoursesFilter() {
  const sidebarItems = $$('.sidebar-item');
  const courseCards = $$('.course-card[data-category]');
  if (!sidebarItems.length) return;

  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const category = item.dataset.category;
      courseCards.forEach(card => {
        const cardCat = card.dataset.category;
        if (!category || category === 'all' || cardCat === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ========================================
// Projects Filter & Sort
// ========================================
function initProjectsFilter() {
  const sortSelect = $('.filter-select--sort');
  const timePills = $$('.filter-pill--time');
  const fieldPills = $$('.filter-pill--field');
  const projectCards = $$('.project-card');
  if (!projectCards.length) return;

  function applyFilters() {
    const sort = sortSelect?.value || 'featured';
    const time = timePills.find(p => p.classList.contains('active'))?.dataset.time || 'all';
    const field = fieldPills.find(p => p.classList.contains('active'))?.dataset.field || 'all';

    let cards = [...projectCards];

    // Filter
    cards = cards.filter(card => {
      const cardTime = card.dataset.time;
      const cardField = card.dataset.field;
      return (time === 'all' || cardTime === time) && (field === 'all' || cardField === field);
    });

    // Sort
    cards.sort((a, b) => {
      if (sort === 'most-liked') return +b.dataset.likes - +a.dataset.likes;
      if (sort === 'most-viewed') return +b.dataset.views - +a.dataset.views;
      if (sort === 'most-recent') return +b.dataset.date - +a.dataset.date;
      return 0;
    });

    // Reorder DOM
    const grid = $('.masonry-grid');
    cards.forEach(card => grid.appendChild(card));

    // Hide/show
    projectCards.forEach(card => {
      card.style.display = cards.includes(card) ? '' : 'none';
    });
  }

  sortSelect?.addEventListener('change', applyFilters);

  timePills.forEach(pill => {
    pill.addEventListener('click', () => {
      timePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      applyFilters();
    });
  });

  fieldPills.forEach(pill => {
    pill.addEventListener('click', () => {
      fieldPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      applyFilters();
    });
  });
}

// ========================================
// Plus Pricing Toggle
// ========================================
function initPricingToggle() {
  const yearlyBtn = $('.pricing-toggle-btn--yearly');
  const monthlyBtn = $('.pricing-toggle-btn--monthly');
  const yearlyCard = $('.pricing-card--yearly');
  const monthlyCard = $('.pricing-card--monthly');
  if (!yearlyBtn || !monthlyBtn) return;

  function showYearly() {
    yearlyBtn.classList.add('active');
    monthlyBtn.classList.remove('active');
    yearlyCard?.classList.remove('hidden');
    monthlyCard?.classList.remove('hidden');
  }

  function showMonthly() {
    monthlyBtn.classList.add('active');
    yearlyBtn.classList.remove('active');
    yearlyCard?.classList.remove('hidden');
    monthlyCard?.classList.remove('hidden');
  }

  yearlyBtn.addEventListener('click', showYearly);
  monthlyBtn.addEventListener('click', showMonthly);
}

// ========================================
// FAQ Accordion
// ========================================
function initFaqAccordion() {
  $$('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      $$('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ========================================
// Login Form
// ========================================
function initLoginForm() {
  const form = $('.login-form');
  const passwordToggle = $('.password-toggle');
  const passwordInput = $('.password-input');

  passwordToggle?.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    passwordToggle.innerHTML = type === 'password'
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7c.78 0 1.53-.09 2.24-.26"/><path d="M2 2l20 20"/></svg>';
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]')?.value;
    const password = form.querySelector('input[type="password"], .password-input')?.value;
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    // Simulate login
    alert('Login submitted successfully!');
  });
}

// ========================================
// Mobile Menu
// ========================================
function initMobileMenu() {
  const btn = $('.mobile-menu-btn');
  const nav = $('.nav-desktop');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('mobile-open');
  });
}

// ========================================
// Initialize All
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initPromoBanner();
  initHeroCarousel();
  initCarouselTracks();
  initFooterAccordion();
  initCoursesFilter();
  initProjectsFilter();
  initPricingToggle();
  initFaqAccordion();
  initLoginForm();
  initMobileMenu();
});
