document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.mobile-toggle');
  if (toggle && nav) toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('[data-tab-group]').forEach(group => {
    const buttons = group.querySelectorAll('[data-tab-target]');
    const panels = group.querySelectorAll('[data-tab-panel]');
    buttons.forEach(button => button.addEventListener('click', () => {
      const target = button.dataset.tabTarget;
      buttons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      panels.forEach(panel => panel.classList.toggle('active', panel.dataset.tabPanel === target));
    }));
  });

  document.querySelectorAll('.faq').forEach(faq => {
    faq.querySelectorAll('.faq-q').forEach(button => button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const wasActive = item.classList.contains('active');
      faq.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!wasActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    }));
  });

  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.testimonial-track');
    const cards = carousel.querySelectorAll('.testimonial');
    let index = 0;
    const move = direction => {
      if (!cards.length) return;
      index = (index + direction + cards.length) % cards.length;
      track.scrollTo({ left: cards[index].offsetLeft - track.offsetLeft, behavior: 'smooth' });
    };
    carousel.querySelector('[data-carousel="prev"]')?.addEventListener('click', () => move(-1));
    carousel.querySelector('[data-carousel="next"]')?.addEventListener('click', () => move(1));
  });

  document.querySelectorAll('.demo-toggle').forEach(button => button.addEventListener('click', () => {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    const open = panel.classList.toggle('active');
    button.setAttribute('aria-expanded', String(open));
  }));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
});
