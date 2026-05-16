document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const buttons = group.querySelectorAll('[data-tab-target]');
    const panels = group.querySelectorAll('[data-tab-panel]');
    buttons.forEach(button => button.addEventListener('click', () => {
      const target = button.dataset.tabTarget;
      buttons.forEach(b => b.classList.toggle('active', b === button));
      panels.forEach(panel => panel.classList.toggle('active', panel.dataset.tabPanel === target));
    }));
  });

  document.querySelectorAll('[data-accordion]').forEach(acc => {
    acc.querySelectorAll('.faq-q').forEach(button => button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      acc.querySelectorAll('.faq-item').forEach(other => { if (other !== item) other.classList.remove('active'); });
      item.classList.toggle('active');
    }));
  });

  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const strip = carousel.querySelector('.testimonial-strip');
    const slides = carousel.querySelectorAll('.testimonial');
    const label = carousel.querySelector('[data-carousel-count]');
    let index = 0;
    const show = next => {
      index = (next + slides.length) % slides.length;
      strip.style.transform = `translateX(-${index * 100}%)`;
      if (label) label.textContent = `${index + 1} / ${slides.length}`;
    };
    carousel.querySelector('[data-prev]')?.addEventListener('click', () => show(index - 1));
    carousel.querySelector('[data-next]')?.addEventListener('click', () => show(index + 1));
    show(0);
  });

  document.querySelectorAll('[data-demo-toggle]').forEach(button => button.addEventListener('click', () => {
    const content = document.querySelector(button.dataset.demoToggle);
    content.classList.toggle('active');
    button.querySelector('span').textContent = content.classList.contains('active') ? '−' : '+';
  }));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
