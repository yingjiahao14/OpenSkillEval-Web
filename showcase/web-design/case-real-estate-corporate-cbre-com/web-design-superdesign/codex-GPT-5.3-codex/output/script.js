function initHeader() {
  const servicesTrigger = document.querySelector('[data-services-trigger]');
  const megaMenu = document.querySelector('[data-mega-menu]');
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');

  if (servicesTrigger && megaMenu) {
    const open = () => megaMenu.classList.add('open');
    const close = () => megaMenu.classList.remove('open');

    servicesTrigger.addEventListener('mouseenter', open);
    servicesTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      megaMenu.classList.toggle('open');
    });

    megaMenu.addEventListener('mouseenter', open);
    megaMenu.addEventListener('mouseleave', close);
    servicesTrigger.closest('.site-header')?.addEventListener('mouseleave', close);

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  if (mobileToggle && mobilePanel) {
    mobileToggle.addEventListener('click', () => mobilePanel.classList.toggle('open'));
  }

  document.querySelectorAll('[data-accordion-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.getAttribute('aria-controls'));
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      target.classList.toggle('open');
    });
  });
}

function initTabs() {
  const tabBtns = document.querySelectorAll('[data-tab-btn]');
  const panels = document.querySelectorAll('[data-tab-panel]');
  if (!tabBtns.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.tabBtn;
      tabBtns.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`[data-tab-panel="${id}"]`)?.classList.add('active');
    });
  });
}

function initCarousel() {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;
  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.slide');
  const prev = carousel.querySelector('[data-prev]');
  const next = carousel.querySelector('[data-next]');
  let index = 0;

  function render() { track.style.transform = `translateX(-${index * 100}%)`; }
  prev?.addEventListener('click', () => { index = (index - 1 + slides.length) % slides.length; render(); });
  next?.addEventListener('click', () => { index = (index + 1) % slides.length; render(); });
}

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initTabs();
  initCarousel();
});
