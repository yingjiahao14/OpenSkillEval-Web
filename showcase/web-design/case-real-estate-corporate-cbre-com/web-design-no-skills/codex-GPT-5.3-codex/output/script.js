(function () {
  const servicesTriggers = document.querySelectorAll('[data-services-trigger]');
  const megaMenu = document.querySelector('[data-mega-menu]');
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  if (megaMenu && servicesTriggers.length) {
    const openMenu = () => megaMenu.classList.add('open');
    const closeMenu = () => megaMenu.classList.remove('open');

    servicesTriggers.forEach((trigger) => {
      trigger.addEventListener('mouseenter', openMenu);
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        megaMenu.classList.toggle('open');
      });
    });

    megaMenu.addEventListener('mouseenter', openMenu);
    megaMenu.addEventListener('mouseleave', closeMenu);
    document.addEventListener('click', (e) => {
      if (!megaMenu.contains(e.target) && ![...servicesTriggers].some((t) => t.contains(e.target))) {
        closeMenu();
      }
    });
  }

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  document.querySelectorAll('[data-accordion-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.getAttribute('aria-controls'));
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      target.classList.toggle('open');
    });
  });

  const tabButtons = document.querySelectorAll('[data-tab-btn]');
  const tabPanels = document.querySelectorAll('[data-tab-panel]');
  if (tabButtons.length && tabPanels.length) {
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab-btn');
        tabButtons.forEach((b) => b.classList.remove('active'));
        tabPanels.forEach((panel) => panel.classList.remove('active'));
        btn.classList.add('active');
        const nextPanel = document.querySelector('[data-tab-panel="' + target + '"]');
        if (nextPanel) nextPanel.classList.add('active');
      });
    });
  }

  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('[data-carousel-track]');
    const slides = carousel.querySelectorAll('[data-carousel-slide]');
    const prev = carousel.parentElement.querySelector('[data-carousel-prev]');
    const next = carousel.parentElement.querySelector('[data-carousel-next]');
    let index = 0;

    const render = () => {
      track.style.transform = 'translateX(-' + index * 100 + '%)';
    };

    if (prev) prev.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      render();
    });
    if (next) next.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      render();
    });
  });
})();
