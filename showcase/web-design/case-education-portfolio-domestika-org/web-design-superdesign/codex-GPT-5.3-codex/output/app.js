const footerAccordions = () => {
  document.querySelectorAll('.footer-toggle').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.footer-col').classList.toggle('open'));
  });
};

const setupCarousel = () => {
  document.querySelectorAll('[data-carousel]').forEach(wrap => {
    const track = wrap.querySelector('.carousel-track');
    const prev = wrap.querySelector('[data-prev]');
    const next = wrap.querySelector('[data-next]');
    if (!track || !prev || !next) return;
    const step = () => track.clientWidth * (window.innerWidth < 700 ? 1 : window.innerWidth < 980 ? 0.55 : 0.36);
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  });
};

const setupCourseFilters = () => {
  const container = document.querySelector('[data-course-grid]');
  if (!container) return;
  const cards = [...container.querySelectorAll('[data-category]')];
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const selected = btn.dataset.filter;
      cards.forEach(card => {
        card.style.display = (selected === 'all' || card.dataset.category === selected) ? '' : 'none';
      });
    });
  });
};

const setupPricingToggle = () => {
  const wrap = document.querySelector('[data-pricing]');
  if (!wrap) return;
  const yearlyBtn = wrap.querySelector('[data-plan="yearly"]');
  const monthlyBtn = wrap.querySelector('[data-plan="monthly"]');
  const monthPrice = wrap.querySelector('[data-month-price]');
  const totalPrice = wrap.querySelector('[data-total-price]');
  const badge = wrap.querySelector('[data-save-badge]');
  const credits = wrap.querySelector('[data-credits]');

  const apply = (plan) => {
    const yearly = plan === 'yearly';
    yearlyBtn.classList.toggle('active', yearly);
    monthlyBtn.classList.toggle('active', !yearly);
    monthPrice.textContent = yearly ? '$14.59/month' : '$33.90/month';
    totalPrice.textContent = yearly ? '$174.50 billed yearly' : '$33.90 billed monthly';
    badge.textContent = yearly ? 'SAVE 57%' : 'Flexible monthly';
    credits.textContent = yearly ? '12 Plus credits every year' : '1 Plus credit every month';
  };

  yearlyBtn.addEventListener('click', () => apply('yearly'));
  monthlyBtn.addEventListener('click', () => apply('monthly'));
};

const setupFaq = () => {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q')?.addEventListener('click', () => item.classList.toggle('open'));
  });
};

const setupProjects = () => {
  const gallery = document.querySelector('[data-projects]');
  if (!gallery) return;
  const sort = document.querySelector('[data-sort]');
  const time = document.querySelector('[data-time]');
  const field = document.querySelector('[data-field]');
  const items = [...gallery.querySelectorAll('.project')];

  const refresh = () => {
    let filtered = [...items];
    if (time.value !== 'all') filtered = filtered.filter(i => i.dataset.time === time.value);
    if (field.value !== 'all') filtered = filtered.filter(i => i.dataset.field === field.value);

    const sortKey = sort.value;
    filtered.sort((a,b)=> Number(b.dataset[sortKey]) - Number(a.dataset[sortKey]));

    items.forEach(el => el.style.display = 'none');
    filtered.forEach(el => { el.style.display='block'; gallery.appendChild(el); });
  };

  [sort, time, field].forEach(el => el?.addEventListener('change', refresh));
  refresh();
};

const setupLogin = () => {
  const form = document.querySelector('[data-login-form]');
  if (!form) return;
  const pass = form.querySelector('input[type="password"], input[data-password]');
  const toggle = form.querySelector('[data-toggle-pass]');
  const msg = form.querySelector('[data-msg]');

  toggle?.addEventListener('click', () => {
    const hidden = pass.type === 'password';
    pass.type = hidden ? 'text' : 'password';
    toggle.textContent = hidden ? 'Hide' : 'Show';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value.trim();
    const password = pass.value.trim();
    if (!email || !password || password.length < 6) {
      msg.textContent = 'Enter a valid email and password (6+ chars).';
      msg.style.color = 'crimson';
      return;
    }
    msg.textContent = 'Login submitted successfully.';
    msg.style.color = 'green';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  footerAccordions();
  setupCarousel();
  setupCourseFilters();
  setupPricingToggle();
  setupFaq();
  setupProjects();
  setupLogin();
});
