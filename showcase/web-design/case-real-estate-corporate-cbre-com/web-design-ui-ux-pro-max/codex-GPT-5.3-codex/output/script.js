(function () {
  const servicesMenu = document.querySelector('[data-services-menu]');
  const servicesTrigger = document.querySelector('[data-services-trigger]');
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  if (servicesMenu && servicesTrigger) {
    const toggleMenu = () => servicesMenu.classList.toggle('open');
    servicesTrigger.addEventListener('click', function (event) {
      event.preventDefault();
      toggleMenu();
    });

    document.addEventListener('click', function (event) {
      if (!servicesMenu.contains(event.target)) {
        servicesMenu.classList.remove('open');
      }
    });
  }

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', mobileNav.classList.contains('open'));
    });
  }

  document.querySelectorAll('[data-mobile-accordion]').forEach(function (button) {
    button.addEventListener('click', function () {
      const item = button.closest('.mobile-accordion-item');
      item.classList.toggle('open');
      button.setAttribute('aria-expanded', item.classList.contains('open'));
    });
  });

  const tabButtons = document.querySelectorAll('[data-tab-button]');
  const tabPanels = document.querySelectorAll('[data-tab-panel]');
  if (tabButtons.length && tabPanels.length) {
    tabButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const target = button.getAttribute('data-target');
        tabButtons.forEach(function (tab) {
          tab.classList.remove('active');
          tab.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(function (panel) {
          panel.classList.remove('active');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        const activePanel = document.querySelector('[data-tab-panel="' + target + '"]');
        if (activePanel) activePanel.classList.add('active');
      });
    });
  }

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    let index = 0;

    const render = function () {
      track.style.transform = 'translateX(-' + index * 100 + '%)';
    };

    if (prev) {
      prev.addEventListener('click', function () {
        index = (index - 1 + slides.length) % slides.length;
        render();
      });
    }

    if (next) {
      next.addEventListener('click', function () {
        index = (index + 1) % slides.length;
        render();
      });
    }
  }
})();
