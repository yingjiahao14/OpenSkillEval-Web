/* ─── Promo Banner Countdown ─── */
function initCountdown() {
  const banner = document.getElementById('promo-banner');
  if (!banner) return;
  const closeBtn = banner.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => banner.classList.add('hidden'));
  }
  const endTime = Date.now() + 3 * 3600000 + 47 * 60000 + 22000;
  function update() {
    const diff = Math.max(0, endTime - Date.now());
    const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    const el = banner.querySelector('.countdown');
    if (el) el.innerHTML = `<span>${h}</span><span>${m}</span><span>${s}</span>`;
    if (diff > 0) requestAnimationFrame(update);
  }
  update();
}

/* ─── Carousel ─── */
function initCarousel(wrapperId) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;
  const track = wrapper.querySelector('.carousel-track');
  const prevBtn = wrapper.querySelector('.carousel-btn.prev');
  const nextBtn = wrapper.querySelector('.carousel-btn.next');
  const dotsContainer = wrapper.querySelector('.carousel-dots');
  const slides = track.children;
  let current = 0;
  const total = slides.length;

  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    track.style.transform = `translateX(-${current * 100}%)`;
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === total - 1;
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }
  }

  if (dotsContainer) {
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  goTo(0);
}

/* ─── Scroll Carousel (horizontal card scroll) ─── */
function initScrollCarousel(wrapperId) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;
  const track = wrapper.querySelector('.scroll-track');
  const prevBtn = wrapper.querySelector('.carousel-btn.prev');
  const nextBtn = wrapper.querySelector('.carousel-btn.next');
  let offset = 0;

  function getMaxOffset() {
    return Math.max(0, track.scrollWidth - wrapper.querySelector('.carousel-wrapper').clientWidth);
  }

  function scrollTo(dir) {
    const step = 300;
    offset = Math.max(0, Math.min(offset + dir * step, getMaxOffset()));
    track.style.transform = `translateX(-${offset}px)`;
    if (prevBtn) prevBtn.disabled = offset <= 0;
    if (nextBtn) nextBtn.disabled = offset >= getMaxOffset();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => scrollTo(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => scrollTo(1));
  if (prevBtn) prevBtn.disabled = true;
}

/* ─── FAQ Accordion ─── */
function initFaqAccordion() {
  document.querySelectorAll('.faq-item .faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

/* ─── Footer Accordion (mobile) ─── */
function initFooterAccordion() {
  document.querySelectorAll('.footer-col h4').forEach(h4 => {
    h4.addEventListener('click', () => {
      if (window.innerWidth > 768) return;
      const col = h4.closest('.footer-col');
      col.classList.toggle('open');
    });
  });
}

/* ─── Pricing Toggle ─── */
function initPricingToggle() {
  const yearlyBtn = document.getElementById('toggle-yearly');
  const monthlyBtn = document.getElementById('toggle-monthly');
  const yearlyCard = document.getElementById('pricing-yearly');
  const monthlyCard = document.getElementById('pricing-monthly');
  if (!yearlyBtn || !monthlyBtn) return;

  function show(plan) {
    if (plan === 'yearly') {
      yearlyBtn.classList.add('active');
      monthlyBtn.classList.remove('active');
      if (yearlyCard) yearlyCard.style.display = 'block';
      if (monthlyCard) monthlyCard.style.display = 'none';
    } else {
      monthlyBtn.classList.add('active');
      yearlyBtn.classList.remove('active');
      if (yearlyCard) yearlyCard.style.display = 'none';
      if (monthlyCard) monthlyCard.style.display = 'block';
    }
  }

  yearlyBtn.addEventListener('click', () => show('yearly'));
  monthlyBtn.addEventListener('click', () => show('monthly'));
  show('yearly');
}

/* ─── Sidebar Filter ─── */
function initSidebarFilter() {
  const links = document.querySelectorAll('.sidebar a[data-category]');
  const cards = document.querySelectorAll('.course-card[data-category]');
  const sectionTitle = document.getElementById('courses-section-title');
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const cat = link.dataset.category;
      if (sectionTitle) sectionTitle.textContent = cat === 'all' ? 'All Courses' : link.textContent;
      cards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ─── Project Sort/Filter ─── */
function initProjectFilters() {
  const sortSelect = document.getElementById('project-sort');
  const timeSelect = document.getElementById('project-time');
  const fieldSelect = document.getElementById('project-field');
  const grid = document.getElementById('masonry-grid');
  if (!sortSelect || !grid) return;

  function sortProjects() {
    const items = Array.from(grid.querySelectorAll('.masonry-item'));
    const sortBy = sortSelect.value;
    items.sort((a, b) => {
      const aVal = parseInt(a.dataset[sortBy]) || 0;
      const bVal = parseInt(b.dataset[sortBy]) || 0;
      return bVal - aVal;
    });
    items.forEach(item => grid.appendChild(item));
  }

  sortSelect.addEventListener('change', sortProjects);
  if (timeSelect) timeSelect.addEventListener('change', () => {});
  if (fieldSelect) fieldSelect.addEventListener('change', () => {
    const field = fieldSelect.value;
    grid.querySelectorAll('.masonry-item').forEach(item => {
      if (!field || item.dataset.field === field || field === 'all') {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

/* ─── Password Toggle ─── */
function initPasswordToggle() {
  document.querySelectorAll('.toggle-pw').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
      } else {
        input.type = 'password';
        btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
      }
    });
  });
}

/* ─── Init All ─── */
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initFaqAccordion();
  initFooterAccordion();
  initPricingToggle();
  initSidebarFilter();
  initProjectFilters();
  initPasswordToggle();

  if (document.getElementById('hero-carousel')) initCarousel('hero-carousel');
  if (document.getElementById('course-carousel')) initScrollCarousel('course-carousel');
  if (document.getElementById('plus-catalog-carousel')) initScrollCarousel('plus-catalog-carousel');
  if (document.getElementById('plus-credits-carousel')) initScrollCarousel('plus-credits-carousel');
});
