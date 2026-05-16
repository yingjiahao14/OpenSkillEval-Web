document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.mobile-toggle').forEach(btn => {
    btn.addEventListener('click', () => document.querySelector('.nav-links')?.classList.toggle('open'));
  });

  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const buttons = group.querySelectorAll('[data-tab-target]');
    const panels = group.querySelectorAll('[data-tab-panel]');
    buttons.forEach(button => button.addEventListener('click', () => {
      const target = button.dataset.tabTarget;
      buttons.forEach(item => item.classList.toggle('active', item === button));
      panels.forEach(panel => panel.classList.toggle('active', panel.dataset.tabPanel === target));
    }));
  });

  document.querySelectorAll('.faq').forEach(faq => {
    faq.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        faq.querySelectorAll('.faq-item').forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active');
      });
    });
  });

  document.querySelectorAll('.carousel').forEach(carousel => {
    const slides = [...carousel.querySelectorAll('.testimonial')];
    let index = slides.findIndex(slide => slide.classList.contains('active'));
    if (index < 0) index = 0;
    const show = next => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    };
    carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => show(index - 1));
    carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => show(index + 1));
  });

  document.querySelectorAll('.demo-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const content = document.querySelector(button.dataset.demoTarget);
      content?.classList.toggle('active');
      button.querySelector('span:last-child').textContent = content?.classList.contains('active') ? '−' : '+';
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
