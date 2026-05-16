document.addEventListener('DOMContentLoaded', () => {
  const megaWrap = document.querySelector('.mega-wrap');
  const servicesButton = document.querySelector('.services-trigger');
  if (megaWrap && servicesButton) {
    servicesButton.addEventListener('click', (event) => {
      event.preventDefault();
      megaWrap.classList.toggle('open');
      servicesButton.setAttribute('aria-expanded', megaWrap.classList.contains('open'));
    });
    document.addEventListener('click', (event) => {
      if (!megaWrap.contains(event.target)) {
        megaWrap.classList.remove('open');
        servicesButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobilePanel = document.querySelector('.mobile-panel');
  if (mobileToggle && mobilePanel) {
    mobileToggle.addEventListener('click', () => {
      mobilePanel.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', mobilePanel.classList.contains('open'));
    });
  }

  document.querySelectorAll('.accordion-button').forEach((button) => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const isOpen = content.classList.toggle('open');
      button.setAttribute('aria-expanded', isOpen);
      button.querySelector('span').textContent = isOpen ? '−' : '+';
    });
  });

  const tabButtons = document.querySelectorAll('[data-tab]');
  const tabPanels = document.querySelectorAll('[data-panel]');
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.tab;
      tabButtons.forEach((item) => item.classList.toggle('active', item === button));
      tabPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === target));
    });
  });

  const form = document.querySelector('.subscribe-form');
  const note = document.querySelector('.subscribe-note');
  if (form && note) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      note.classList.add('show');
    });
  }

  document.querySelectorAll('.carousel').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const prev = carousel.querySelector('[data-carousel="prev"]');
    const next = carousel.querySelector('[data-carousel="next"]');
    const dots = Array.from(carousel.querySelectorAll('.dot'));
    let current = 0;
    const render = () => {
      track.style.transform = `translateX(${-current * 100}%)`;
      dots.forEach((dot, index) => dot.classList.toggle('active', index === current));
    };
    if (prev && next && slides.length) {
      prev.addEventListener('click', () => { current = (current - 1 + slides.length) % slides.length; render(); });
      next.addEventListener('click', () => { current = (current + 1) % slides.length; render(); });
      render();
    }
  });
});
