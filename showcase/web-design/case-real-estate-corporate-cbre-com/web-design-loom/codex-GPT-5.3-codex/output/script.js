const body = document.body;
const mobileBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
if (mobileBtn && mobileNav) {
  mobileBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    mobileBtn.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('.mobile-accordion button').forEach(btn => {
  btn.addEventListener('click', () => {
    const wrap = btn.closest('.mobile-accordion');
    const open = wrap.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
});

const serviceItem = document.querySelector('.nav-item-services');
const serviceToggle = document.querySelector('.services-toggle');
if (serviceItem && serviceToggle) {
  serviceToggle.addEventListener('click', (e) => {
    e.preventDefault();
    serviceItem.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!serviceItem.contains(e.target)) serviceItem.classList.remove('open');
  });
}

document.querySelectorAll('[data-tab-target]').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.what-we-do');
    group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const target = document.querySelector(btn.dataset.tabTarget);
    if (target) target.classList.add('active');
  });
});

const track = document.querySelector('.carousel-track');
if (track) {
  const slides = [...track.children];
  let idx = 0;
  const update = () => track.style.transform = `translateX(-${idx * 100}%)`;
  document.querySelector('[data-carousel="prev"]')?.addEventListener('click', () => { idx = (idx - 1 + slides.length) % slides.length; update(); });
  document.querySelector('[data-carousel="next"]')?.addEventListener('click', () => { idx = (idx + 1) % slides.length; update(); });
}
