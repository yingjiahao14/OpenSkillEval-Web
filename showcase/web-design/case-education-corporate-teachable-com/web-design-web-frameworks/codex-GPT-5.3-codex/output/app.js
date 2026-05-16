document.querySelectorAll('.mock-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const wrap = tab.closest('[data-tab-wrap]');
    wrap.querySelectorAll('.mock-tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    const key = tab.dataset.tab;
    wrap.querySelectorAll('.view-panel').forEach((p) => p.classList.toggle('active', p.dataset.view === key));
  });
});

document.querySelectorAll('[data-why-tabs]').forEach((wrap) => {
  const tabs = wrap.querySelectorAll('.why-tab');
  const panels = wrap.querySelectorAll('.why-panel');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const panel = tab.dataset.panel;
      panels.forEach((p) => p.classList.toggle('active', p.dataset.panel === panel));
    });
  });
});

document.querySelectorAll('.faq').forEach((faq) => {
  faq.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      faq.querySelectorAll('.faq-item').forEach((item) => item.classList.remove('active'));
      btn.closest('.faq-item').classList.add('active');
    });
  });
});

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const items = Array.from(carousel.querySelectorAll('[data-item]'));
  let page = 0;
  const per = 3;
  const render = () => {
    items.forEach((item, i) => {
      const start = page * per;
      item.style.display = i >= start && i < start + per ? 'block' : 'none';
    });
  };
  carousel.querySelector('.carousel-prev')?.addEventListener('click', () => {
    page = page <= 0 ? Math.ceil(items.length / per) - 1 : page - 1;
    render();
  });
  carousel.querySelector('.carousel-next')?.addEventListener('click', () => {
    page = page >= Math.ceil(items.length / per) - 1 ? 0 : page + 1;
    render();
  });
  render();
});

document.querySelectorAll('[data-demo-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.demoToggle);
    target.classList.toggle('active');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
