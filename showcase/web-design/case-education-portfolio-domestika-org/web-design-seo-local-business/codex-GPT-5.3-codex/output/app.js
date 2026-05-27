const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

function setupCarousel(id) {
  const root = document.getElementById(id);
  if (!root) return;
  const track = $('.carousel-track', root);
  const prev = $('.carousel-btn.prev', root);
  const next = $('.carousel-btn.next', root);
  const step = () => Math.max(280, track.clientWidth * 0.85);
  prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
}
['hero-carousel', 'course-carousel', 'plus-catalog-carousel', 'plus-credits-carousel'].forEach(setupCarousel);

$$('.filter-item[data-category]').forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    $$('.filter-item[data-category]').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    $$('.course-card[data-category]').forEach((card) => {
      const show = category === 'all' || card.dataset.category === category;
      card.style.display = show ? 'block' : 'none';
    });
  });
});

const billingToggle = $('#billing-toggle');
if (billingToggle) {
  const yearlyBtn = $('[data-plan="yearly"]', billingToggle);
  const monthlyBtn = $('[data-plan="monthly"]', billingToggle);
  const yearlyPanel = $('#yearly-plan');
  const monthlyPanel = $('#monthly-plan');
  const activate = (plan) => {
    const yearly = plan === 'yearly';
    yearlyBtn.classList.toggle('active', yearly);
    monthlyBtn.classList.toggle('active', !yearly);
    yearlyPanel.style.display = yearly ? 'block' : 'none';
    monthlyPanel.style.display = yearly ? 'none' : 'block';
  };
  yearlyBtn.addEventListener('click', () => activate('yearly'));
  monthlyBtn.addEventListener('click', () => activate('monthly'));
}

$$('.faq-item').forEach((item) => {
  $('.faq-q', item)?.addEventListener('click', () => item.classList.toggle('open'));
});

const sortSelect = $('#project-sort');
const timeFilter = $('#project-time');
const fieldFilter = $('#project-field');
const masonry = $('#projects-grid');
if (sortSelect && masonry) {
  const cards = () => $$('.project-card', masonry);
  function applyProjectFilters() {
    const sortBy = sortSelect.value;
    const time = timeFilter?.value || 'all';
    const field = fieldFilter?.value || 'all';
    let items = cards();
    items.forEach((item) => {
      const matchTime = time === 'all' || item.dataset.time === time;
      const matchField = field === 'all' || item.dataset.field === field;
      item.style.display = matchTime && matchField ? 'block' : 'none';
    });
    items = items.filter((i) => i.style.display !== 'none');
    items.sort((a, b) => Number(b.dataset[sortBy]) - Number(a.dataset[sortBy]));
    items.forEach((item) => masonry.appendChild(item));
  }
  [sortSelect, timeFilter, fieldFilter].forEach((el) => el?.addEventListener('change', applyProjectFilters));
}

const loginForm = $('#login-form');
if (loginForm) {
  const email = $('#email');
  const password = $('#password');
  const status = $('#login-status');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!email.value.trim() || !password.value.trim()) {
      status.textContent = 'Please enter both email and password.';
      status.style.color = 'var(--danger)';
      return;
    }
    status.textContent = 'Credentials submitted successfully.';
    status.style.color = 'var(--accent)';
  });
  $('#toggle-password')?.addEventListener('click', () => {
    const show = password.type === 'password';
    password.type = show ? 'text' : 'password';
    $('#toggle-password').textContent = show ? 'Hide' : 'Show';
  });
}

$$('.footer-col').forEach((col) => {
  $('.footer-toggle', col)?.addEventListener('click', () => col.classList.toggle('open'));
});
