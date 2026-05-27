/* ============================================
   CreativeHub — Global JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCountdownBanner();
  initCarousels();
  initScrollCarousels();
  initAccordions();
  initFooterAccordions();
  initPasswordToggle();
  initSidebarFilter();
  initProjectFilters();
  initPricingToggle();
  lucide.createIcons();
});

/* Mobile Navigation */
function initMobileNav() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    const icon = btn.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', nav.classList.contains('open') ? 'x' : 'menu');
      lucide.createIcons();
    }
  });
}

/* Countdown Banner */
function initCountdownBanner() {
  const banner = document.querySelector('.promo-banner');
  const closeBtn = document.querySelector('.promo-banner .close-btn');
  const timerEl = document.querySelector('.promo-banner .countdown');
  if (!banner || !timerEl) return;

  let hours = 23, minutes = 59, seconds = 45;
  const update = () => {
    seconds--;
    if (seconds < 0) { seconds = 59; minutes--; }
    if (minutes < 0) { minutes = 59; hours--; }
    if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
    timerEl.textContent = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
  };
  setInterval(update, 1000);

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }
}

/* Hero Carousel (slide-based) */
function initCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    if (!track || slides.length === 0) return;

    let current = 0;
    const total = slides.length;

    const goTo = (index) => {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    };

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

    // Auto-advance every 6s
    setInterval(() => goTo(current + 1), 6000);
  });
}

/* Horizontal Scroll Carousels */
function initScrollCarousels() {
  document.querySelectorAll('.scroll-carousel').forEach(wrapper => {
    const track = wrapper.querySelector('.scroll-track');
    const prevBtn = wrapper.querySelector('.scroll-btn.prev');
    const nextBtn = wrapper.querySelector('.scroll-btn.next');
    if (!track) return;

    const scrollAmount = 280;

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

/* FAQ / Generic Accordions */
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      // Close siblings if needed
      const parent = item.closest('.accordion');
      if (parent && parent.dataset.single) {
        parent.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      }
      item.classList.toggle('open', !isOpen);
    });
  });
}

/* Footer Mobile Accordions */
function initFooterAccordions() {
  document.querySelectorAll('.footer-accordion .footer-header').forEach(header => {
    header.addEventListener('click', () => {
      const section = header.closest('.footer-section');
      section.classList.toggle('open');
      const icon = header.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', section.classList.contains('open') ? 'chevron-up' : 'chevron-down');
        lucide.createIcons();
      }
    });
  });
}

/* Password Toggle */
function initPasswordToggle() {
  const toggle = document.querySelector('.toggle-password');
  const input = document.querySelector('input[type="password"]');
  if (!toggle || !input) return;
  toggle.addEventListener('click', () => {
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', type === 'password' ? 'eye' : 'eye-off');
      lucide.createIcons();
    }
  });
}

/* Sidebar Category Filter */
function initSidebarFilter() {
  const buttons = document.querySelectorAll('.sidebar button[data-filter]');
  const cards = document.querySelectorAll('.course-card[data-category]');
  if (buttons.length === 0 || cards.length === 0) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const cat = card.dataset.category;
        card.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
      });
    });
  });
}

/* Project Sort/Filter */
function initProjectFilters() {
  const sortSelect = document.getElementById('project-sort');
  const timeSelect = document.getElementById('project-time');
  const fieldSelect = document.getElementById('project-field');
  const grid = document.querySelector('.masonry-grid');
  if (!grid) return;

  const getSortValue = (card) => {
    const likes = parseInt(card.dataset.likes || '0');
    const views = parseInt(card.dataset.views || '0');
    const comments = parseInt(card.dataset.comments || '0');
    const date = parseInt(card.dataset.date || '0');
    return { likes, views, comments, date };
  };

  const apply = () => {
    const sort = sortSelect ? sortSelect.value : 'featured';
    const time = timeSelect ? timeSelect.value : 'all';
    const field = fieldSelect ? fieldSelect.value : 'all';

    let cards = Array.from(grid.querySelectorAll('.project-card'));

    // Filter by field
    if (field !== 'all') {
      cards = cards.filter(c => (c.dataset.field || '').includes(field));
    }

    // Sort
    cards.sort((a, b) => {
      const av = getSortValue(a);
      const bv = getSortValue(b);
      switch (sort) {
        case 'likes': return bv.likes - av.likes;
        case 'views': return bv.views - av.views;
        case 'comments': return bv.comments - av.comments;
        case 'recent': return bv.date - av.date;
        default: return 0;
      }
    });

    cards.forEach(c => grid.appendChild(c));
  };

  if (sortSelect) sortSelect.addEventListener('change', apply);
  if (timeSelect) timeSelect.addEventListener('change', apply);
  if (fieldSelect) fieldSelect.addEventListener('change', apply);
}

/* Plus Pricing Toggle */
function initPricingToggle() {
  const yearlyBtn = document.getElementById('tab-yearly');
  const monthlyBtn = document.getElementById('tab-monthly');
  const yearlyCard = document.getElementById('pricing-yearly');
  const monthlyCard = document.getElementById('pricing-monthly');
  if (!yearlyBtn || !monthlyBtn) return;

  const show = (plan) => {
    const isYearly = plan === 'yearly';
    yearlyBtn.classList.toggle('active', isYearly);
    monthlyBtn.classList.toggle('active', !isYearly);
    if (yearlyCard) yearlyCard.style.display = isYearly ? 'block' : 'none';
    if (monthlyCard) monthlyCard.style.display = isYearly ? 'none' : 'block';
  };

  yearlyBtn.addEventListener('click', () => show('yearly'));
  monthlyBtn.addEventListener('click', () => show('monthly'));
}
