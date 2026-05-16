document.querySelectorAll('[data-tabs]').forEach((tabWrap) => {
  const buttons = tabWrap.querySelectorAll('[data-tab-btn]');
  const panels = tabWrap.querySelectorAll('[data-tab-panel]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab-btn');
      buttons.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = tabWrap.querySelector(`[data-tab-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });
});

document.querySelectorAll('.faq-item').forEach((item) => {
  const q = item.querySelector('.faq-question');
  q?.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

document.querySelectorAll('[data-carousel]').forEach((wrap) => {
  const slides = wrap.querySelectorAll('.testimonial');
  const prev = wrap.querySelector('[data-prev]');
  const next = wrap.querySelector('[data-next]');
  let idx = 0;
  const show = (i) => {
    slides.forEach((s) => s.classList.remove('active'));
    slides[i].classList.add('active');
  };
  prev?.addEventListener('click', () => {
    idx = (idx - 1 + slides.length) % slides.length;
    show(idx);
  });
  next?.addEventListener('click', () => {
    idx = (idx + 1) % slides.length;
    show(idx);
  });
  if (slides.length) show(0);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
