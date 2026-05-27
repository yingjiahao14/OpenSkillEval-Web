const $ = (q, root=document) => root.querySelector(q);
const $$ = (q, root=document) => [...root.querySelectorAll(q)];

$$('[data-carousel]').forEach(carousel => {
  const track = $('.carousel-track', carousel);
  const prev = $('[data-prev]', carousel);
  const next = $('[data-next]', carousel);
  const step = () => track.clientWidth * (window.innerWidth < 720 ? 0.92 : 0.34);
  prev?.addEventListener('click', () => track.scrollBy({left: -step(), behavior: 'smooth'}));
  next?.addEventListener('click', () => track.scrollBy({left: step(), behavior: 'smooth'}));
});

const plusToggle = $('#plus-toggle');
if (plusToggle) {
  const yearlyBtn = $('[data-plan="yearly"]', plusToggle);
  const monthlyBtn = $('[data-plan="monthly"]', plusToggle);
  const yearly = $('#plan-yearly');
  const monthly = $('#plan-monthly');
  const setPlan = (type) => {
    const isYearly = type === 'yearly';
    yearly.style.display = isYearly ? 'block' : 'none';
    monthly.style.display = isYearly ? 'none' : 'block';
    yearlyBtn.classList.toggle('active', isYearly);
    monthlyBtn.classList.toggle('active', !isYearly);
  };
  yearlyBtn.addEventListener('click', () => setPlan('yearly'));
  monthlyBtn.addEventListener('click', () => setPlan('monthly'));
}

$$('.accordion-item .accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => btn.parentElement.classList.toggle('open'));
});

const courseFilters = $$('.filter-item[data-category]');
if (courseFilters.length) {
  courseFilters.forEach(btn => btn.addEventListener('click', () => {
    courseFilters.forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.category;
    $$('.course-card').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.category === cat) ? 'block' : 'none';
    });
  }));
}

const projectsWrap = $('#projects-list');
if (projectsWrap) {
  const all = [...$$('.project', projectsWrap)];
  const sort = $('#sort-projects');
  const time = $('#filter-time');
  const field = $('#filter-field');
  const render = () => {
    let items = [...all];
    if (time.value !== 'all') items = items.filter(p => p.dataset.time === time.value);
    if (field.value !== 'all') items = items.filter(p => p.dataset.field === field.value);
    items.sort((a,b) => {
      if (sort.value === 'liked') return Number(b.dataset.likes)-Number(a.dataset.likes);
      if (sort.value === 'comments') return Number(b.dataset.comments)-Number(a.dataset.comments);
      if (sort.value === 'views') return Number(b.dataset.views)-Number(a.dataset.views);
      return Number(b.dataset.featured)-Number(a.dataset.featured);
    });
    projectsWrap.innerHTML = '';
    items.forEach(i => projectsWrap.appendChild(i));
  };
  [sort,time,field].forEach(el => el.addEventListener('change', render));
  render();
}

const loginForm = $('#login-form');
if (loginForm) {
  const email = $('#email');
  const pwd = $('#password');
  const msg = $('#login-msg');
  $('#toggle-password').addEventListener('click', () => {
    pwd.type = pwd.type === 'password' ? 'text' : 'password';
  });
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!email.value.trim() || !pwd.value.trim() || !email.value.includes('@')) {
      msg.textContent = 'Please enter a valid email and password.';
      msg.style.color = '#ff8ba2';
      return;
    }
    msg.textContent = 'Login submitted successfully.';
    msg.style.color = '#7bffd3';
  });
}

$$('.footer .mobile-acc').forEach(btn => {
  btn.addEventListener('click', () => btn.closest('.col').classList.toggle('open'));
});
