document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-carousel]').forEach((wrap) => {
    const track = wrap.querySelector('.carousel');
    wrap.querySelectorAll('[data-dir]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const first = track.querySelector('.card, .product-icon');
        const amount = first ? first.getBoundingClientRect().width + 20 : 340;
        track.scrollBy({ left: btn.dataset.dir === 'next' ? amount : -amount, behavior: 'smooth' });
      });
    });
  });

  document.querySelectorAll('[data-tabs]').forEach((tabs) => {
    const buttons = tabs.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll(`[data-tabset="${tabs.dataset.tabs}"]`);
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((b) => b.setAttribute('aria-selected', String(b === button)));
        panels.forEach((panel) => panel.classList.toggle('active', panel.id === button.getAttribute('aria-controls')));
      });
    });
  });

  document.querySelectorAll('.foot-section button').forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.closest('.foot-section');
      const open = section.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });
});
