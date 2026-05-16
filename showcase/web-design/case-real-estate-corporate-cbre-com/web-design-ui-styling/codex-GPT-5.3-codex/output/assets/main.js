(function () {
  const serviceItem = document.querySelector('.nav-item-services');
  const serviceTrigger = document.querySelector('.nav-trigger');
  if (serviceItem && serviceTrigger) {
    const closeMega = () => serviceItem.classList.remove('open');
    serviceTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      serviceItem.classList.toggle('open');
    });
    serviceItem.addEventListener('mouseenter', () => {
      if (window.innerWidth > 980) serviceItem.classList.add('open');
    });
    serviceItem.addEventListener('mouseleave', () => {
      if (window.innerWidth > 980) closeMega();
    });
    document.addEventListener('click', (e) => {
      if (!serviceItem.contains(e.target)) closeMega();
    });
  }

  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => mobileNav.classList.toggle('open'));
  }

  document.querySelectorAll('.mobile-acc-btn').forEach((btn) => {
    btn.addEventListener('click', () => btn.parentElement.classList.toggle('open'));
  });

  const tabButtons = document.querySelectorAll('[data-tab-btn]');
  const tabPanels = document.querySelectorAll('[data-tab-panel]');
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-tab-btn');
      tabButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      tabPanels.forEach((panel) => panel.classList.toggle('active', panel.getAttribute('data-tab-panel') === id));
    });
  });

  const track = document.querySelector('.carousel-track');
  if (track) {
    let idx = 0;
    const slides = Array.from(track.children);
    const prev = document.querySelector('[data-carousel="prev"]');
    const next = document.querySelector('[data-carousel="next"]');
    const move = () => { track.style.transform = `translateX(-${idx * 100}%)`; };
    prev && prev.addEventListener('click', () => { idx = (idx - 1 + slides.length) % slides.length; move(); });
    next && next.addEventListener('click', () => { idx = (idx + 1) % slides.length; move(); });
  }
})();
