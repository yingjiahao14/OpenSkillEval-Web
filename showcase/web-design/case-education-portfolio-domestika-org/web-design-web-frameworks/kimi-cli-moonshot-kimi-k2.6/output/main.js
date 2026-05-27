/* ========================================
   CreativeHub — Shared JavaScript
   ======================================== */

// Promo banner dismiss
function initPromoBanner() {
  const banner = document.getElementById('promo-banner');
  const closeBtn = document.getElementById('promo-close');
  if (!banner || !closeBtn) return;
  closeBtn.addEventListener('click', () => {
    banner.style.display = 'none';
  });
}

// Countdown timer
function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  let hours = 5, minutes = 42, seconds = 18;
  setInterval(() => {
    seconds--;
    if (seconds < 0) { seconds = 59; minutes--; }
    if (minutes < 0) { minutes = 59; hours--; }
    if (hours < 0) { hours = 23; }
    el.textContent = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
  }, 1000);
}

// Hero carousel
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  if (!slides.length) return;

  let current = 0;

  function showSlide(idx) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === idx);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
    current = idx;
  }

  if (prevBtn) prevBtn.addEventListener('click', () => {
    showSlide((current - 1 + slides.length) % slides.length);
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    showSlide((current + 1) % slides.length);
  });
  dots.forEach((d, i) => {
    d.addEventListener('click', () => showSlide(i));
  });

  // Auto-advance
  setInterval(() => {
    showSlide((current + 1) % slides.length);
  }, 6000);
}

// Course carousel scroll
function initCourseCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(wrapper => {
    const track = wrapper.querySelector('.course-carousel');
    const prev = wrapper.querySelector('.carousel-btn.prev');
    const next = wrapper.querySelector('.carousel-btn.next');
    if (!track) return;

    const scrollAmount = 300;
    if (prev) prev.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    if (next) next.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });
}

// Footer accordion (mobile)
function initFooterAccordion() {
  if (window.innerWidth > 768) return;
  document.querySelectorAll('.footer-col h4').forEach(title => {
    title.addEventListener('click', () => {
      title.parentElement.classList.toggle('open');
    });
  });
}

// Plus pricing toggle
function initPricingToggle() {
  const yearlyBtn = document.getElementById('tab-yearly');
  const monthlyBtn = document.getElementById('tab-monthly');
  const yearlyCard = document.getElementById('card-yearly');
  const monthlyCard = document.getElementById('card-monthly');
  if (!yearlyBtn || !monthlyBtn) return;

  yearlyBtn.addEventListener('click', () => {
    yearlyBtn.classList.add('active');
    monthlyBtn.classList.remove('active');
    if (yearlyCard) yearlyCard.style.display = 'block';
    if (monthlyCard) monthlyCard.style.display = 'block';
  });

  monthlyBtn.addEventListener('click', () => {
    monthlyBtn.classList.add('active');
    yearlyBtn.classList.remove('active');
    if (yearlyCard) yearlyCard.style.display = 'block';
    if (monthlyCard) monthlyCard.style.display = 'block';
  });
}

// FAQ accordion
function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// Password toggle
function initPasswordToggle() {
  const toggle = document.getElementById('password-toggle');
  const input = document.getElementById('password');
  if (!toggle || !input) return;
  toggle.addEventListener('click', () => {
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    toggle.querySelector('i').className = type === 'password' ? 'ri-eye-line' : 'ri-eye-off-line';
  });
}

// Courses sidebar filter
function initCourseFilter() {
  const links = document.querySelectorAll('.sidebar-list a');
  const cards = document.querySelectorAll('.course-card[data-category]');
  if (!links.length || !cards.length) return;

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const cat = link.dataset.filter;
      cards.forEach(card => {
        if (!cat || cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Projects sort/filter
function initProjectFilters() {
  const sortSelect = document.getElementById('project-sort');
  const timeSelect = document.getElementById('project-time');
  const fieldPills = document.querySelectorAll('.filter-pill[data-field]');
  const cards = document.querySelectorAll('.project-card');

  function applyFilters() {
    const sort = sortSelect ? sortSelect.value : 'featured';
    const time = timeSelect ? timeSelect.value : 'all';
    const activeField = document.querySelector('.filter-pill.active');
    const field = activeField ? activeField.dataset.field : 'all';

    const arr = Array.from(cards);
    arr.forEach(card => {
      let show = true;
      if (field !== 'all' && card.dataset.field !== field) show = false;
      if (time !== 'all' && card.dataset.time !== time) show = false;
      card.style.display = show ? '' : 'none';
    });

    // Simple sort by data attribute
    const grid = document.querySelector('.masonry-grid');
    if (!grid) return;
    const visible = arr.filter(c => c.style.display !== 'none');
    visible.sort((a, b) => {
      if (sort === 'most-liked') return parseInt(b.dataset.likes) - parseInt(a.dataset.likes);
      if (sort === 'most-viewed') return parseInt(b.dataset.views) - parseInt(a.dataset.views);
      if (sort === 'most-recent') return parseInt(b.dataset.timeOrder) - parseInt(a.dataset.timeOrder);
      return 0;
    });
    visible.forEach(c => grid.appendChild(c));
  }

  if (sortSelect) sortSelect.addEventListener('change', applyFilters);
  if (timeSelect) timeSelect.addEventListener('change', applyFilters);
  fieldPills.forEach(pill => {
    pill.addEventListener('click', () => {
      fieldPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      applyFilters();
    });
  });
}

// Mobile menu
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initPromoBanner();
  initCountdown();
  initHeroCarousel();
  initCourseCarousels();
  initFooterAccordion();
  initPricingToggle();
  initFaqAccordion();
  initPasswordToggle();
  initCourseFilter();
  initProjectFilters();
  initMobileMenu();
});
