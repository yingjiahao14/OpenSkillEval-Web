const state = {
  specializationIndex: 0,
  courseIndex: 0,
  plusTopIndex: 0,
  plusBottomIndex: 0,
  billing: 'yearly',
  courseCategory: 'all',
  projectFilter: 'all',
  projectSort: 'likes'
};

function setupCarousel(rootId, options = {}) {
  const root = document.getElementById(rootId);
  if (!root) return;
  const track = root.querySelector('.carousel-track');
  const items = root.querySelectorAll('.carousel-item');
  const prev = root.querySelector('[data-dir="prev"]');
  const next = root.querySelector('[data-dir="next"]');
  let index = 0;
  let visible = options.visible || 1;

  const updateVisible = () => {
    if (window.innerWidth <= 760) visible = 1;
    else if (window.innerWidth <= 1024) visible = options.visibleTablet || visible;
    else visible = options.visible || 1;
  };

  const render = () => {
    updateVisible();
    const maxIndex = Math.max(0, items.length - visible);
    if (index > maxIndex) index = maxIndex;
    const pct = (100 / visible) * index;
    track.style.transform = `translateX(-${pct}%)`;
  };

  prev?.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    render();
  });
  next?.addEventListener('click', () => {
    const maxIndex = Math.max(0, items.length - visible);
    index = Math.min(maxIndex, index + 1);
    render();
  });

  window.addEventListener('resize', render);
  render();
}

function setupBillingToggle() {
  const toggle = document.getElementById('billing-toggle');
  if (!toggle) return;
  const yearlyBtn = toggle.querySelector('[data-billing="yearly"]');
  const monthlyBtn = toggle.querySelector('[data-billing="monthly"]');
  const monthlyEls = document.querySelectorAll('[data-show="monthly"]');
  const yearlyEls = document.querySelectorAll('[data-show="yearly"]');

  const render = () => {
    const yearly = state.billing === 'yearly';
    yearlyBtn.classList.toggle('active', yearly);
    monthlyBtn.classList.toggle('active', !yearly);
    yearlyEls.forEach((node) => node.classList.toggle('hidden', !yearly));
    monthlyEls.forEach((node) => node.classList.toggle('hidden', yearly));
  };

  yearlyBtn.addEventListener('click', () => { state.billing = 'yearly'; render(); });
  monthlyBtn.addEventListener('click', () => { state.billing = 'monthly'; render(); });
  render();
}

function setupFaq() {
  document.querySelectorAll('.faq-q').forEach((btn) => {
    btn.addEventListener('click', () => btn.parentElement.classList.toggle('open'));
  });
}

function setupCourseFiltering() {
  const wrap = document.getElementById('course-filtering');
  if (!wrap) return;
  const buttons = wrap.querySelectorAll('.filter-btn[data-category]');
  const cards = document.querySelectorAll('.course-listing [data-category]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      buttons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      cards.forEach((card) => {
        const shouldShow = category === 'all' || card.dataset.category === category;
        card.classList.toggle('hidden', !shouldShow);
      });
    });
  });
}

function setupProjects() {
  const gallery = document.getElementById('projects-gallery');
  if (!gallery) return;
  const cards = Array.from(gallery.querySelectorAll('.project'));
  const filterBtns = document.querySelectorAll('[data-project-filter]');
  const sortBtns = document.querySelectorAll('[data-project-sort]');

  const render = () => {
    cards.forEach((card) => {
      const match = state.projectFilter === 'all' || card.dataset.tag.includes(state.projectFilter);
      card.classList.toggle('hidden', !match);
    });
    const visibleCards = cards.filter((card) => !card.classList.contains('hidden'));
    visibleCards.sort((a, b) => Number(b.dataset[state.projectSort]) - Number(a.dataset[state.projectSort]));
    visibleCards.forEach((card) => gallery.appendChild(card));
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.projectFilter = btn.dataset.projectFilter;
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    });
  });

  sortBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.projectSort = btn.dataset.projectSort;
      sortBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    });
  });

  render();
}

function setupPasswordToggle() {
  const input = document.getElementById('password');
  const toggle = document.getElementById('password-toggle');
  if (!input || !toggle) return;
  toggle.addEventListener('click', () => {
    const hidden = input.type === 'password';
    input.type = hidden ? 'text' : 'password';
    toggle.textContent = hidden ? '🙈' : '👁';
  });
}

function setupFooterAccordions() {
  const cols = document.querySelectorAll('.footer-col');
  cols.forEach((col) => {
    const btn = col.querySelector('.footer-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => col.classList.toggle('open'));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupCarousel('specialization-carousel', { visible: 1, visibleTablet: 1 });
  setupCarousel('course-carousel', { visible: 3, visibleTablet: 2 });
  setupCarousel('plus-courses-carousel', { visible: 3, visibleTablet: 2 });
  setupCarousel('plus-projects-carousel', { visible: 3, visibleTablet: 2 });
  setupBillingToggle();
  setupFaq();
  setupCourseFiltering();
  setupProjects();
  setupPasswordToggle();
  setupFooterAccordions();
});
