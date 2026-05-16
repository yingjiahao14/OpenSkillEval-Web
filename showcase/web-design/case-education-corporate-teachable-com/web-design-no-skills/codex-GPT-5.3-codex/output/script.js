document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const wrap = btn.closest('[data-tab-wrap]');
    wrap.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const key = btn.dataset.tab;
    wrap.querySelectorAll('[data-tab-panel]').forEach(panel => {
      panel.style.display = panel.dataset.tabPanel === key ? 'block' : 'none';
    });
  });
});

document.querySelectorAll('.feature-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const wrap = btn.closest('[data-feature-wrap]');
    wrap.querySelectorAll('.feature-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const key = btn.dataset.feature;
    wrap.querySelectorAll('[data-feature-panel]').forEach(panel => {
      panel.style.display = panel.dataset.featurePanel === key ? 'block' : 'none';
    });
  });
});

document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const slides = [...carousel.querySelectorAll('.slide')];
  let i = 0;
  const show = idx => slides.forEach((s, n) => s.classList.toggle('active', idx === n));
  carousel.querySelector('.next').addEventListener('click', () => { i = (i + 1) % slides.length; show(i); });
  carousel.querySelector('.prev').addEventListener('click', () => { i = (i - 1 + slides.length) % slides.length; show(i); });
  show(0);
});

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
