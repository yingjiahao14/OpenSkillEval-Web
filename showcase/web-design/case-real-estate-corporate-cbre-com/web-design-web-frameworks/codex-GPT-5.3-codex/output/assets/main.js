(function(){
  const servicesItem = document.querySelector('.nav-item-services');
  const servicesTrigger = document.querySelector('[data-services-trigger]');
  if (servicesItem && servicesTrigger) {
    const closeMenu = () => servicesItem.classList.remove('open');
    servicesTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      servicesItem.classList.toggle('open');
    });
    servicesItem.addEventListener('mouseenter', () => {
      if (window.innerWidth > 860) servicesItem.classList.add('open');
    });
    servicesItem.addEventListener('mouseleave', () => {
      if (window.innerWidth > 860) closeMenu();
    });
    document.addEventListener('click', (e) => {
      if (!servicesItem.contains(e.target)) closeMenu();
    });
  }

  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const expanded = mobileNav.style.display === 'block';
      mobileNav.style.display = expanded ? 'none' : 'block';
      mobileToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  document.querySelectorAll('.mobile-section button').forEach((btn) => {
    btn.addEventListener('click', () => btn.parentElement.classList.toggle('open'));
  });

  const tabButtons = document.querySelectorAll('[data-tab]');
  const tabPanels = document.querySelectorAll('[data-panel]');
  if (tabButtons.length && tabPanels.length) {
    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const key = button.dataset.tab;
        tabButtons.forEach((b) => b.classList.remove('active'));
        button.classList.add('active');
        tabPanels.forEach((panel) => {
          panel.hidden = panel.dataset.panel !== key;
        });
      });
    });
  }

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prev = carousel.querySelector('[data-prev]');
    const next = carousel.querySelector('[data-next]');
    let index = 0;
    const render = () => { track.style.transform = `translateX(-${index * 100}%)`; };
    prev?.addEventListener('click', () => { index = (index - 1 + slides.length) % slides.length; render(); });
    next?.addEventListener('click', () => { index = (index + 1) % slides.length; render(); });
  }
})();
