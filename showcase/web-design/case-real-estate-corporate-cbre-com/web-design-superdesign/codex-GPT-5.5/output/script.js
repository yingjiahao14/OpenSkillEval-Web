(function () {
  const body = document.body;
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobilePanel = document.querySelector('.mobile-panel');
  const servicesTrigger = document.querySelector('[data-mega-trigger]');
  const navItem = document.querySelector('.nav-item.services');

  if (servicesTrigger && navItem) {
    servicesTrigger.addEventListener('click', function (event) {
      event.preventDefault();
      navItem.classList.toggle('open');
      servicesTrigger.setAttribute('aria-expanded', String(navItem.classList.contains('open')));
    });
    document.addEventListener('click', function (event) {
      if (!navItem.contains(event.target)) {
        navItem.classList.remove('open');
        servicesTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (mobileToggle && mobilePanel) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = mobilePanel.classList.toggle('active');
      body.classList.toggle('nav-open', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileToggle.textContent = isOpen ? '×' : '☰';
    });
  }

  document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const content = trigger.nextElementSibling;
      const isOpen = content.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(isOpen));
      trigger.querySelector('span').textContent = isOpen ? '−' : '+';
    });
  });

  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const target = button.dataset.tab;
      tabButtons.forEach(function (item) { item.classList.toggle('active', item === button); item.setAttribute('aria-selected', String(item === button)); });
      tabPanels.forEach(function (panel) { panel.classList.toggle('active', panel.id === target); });
    });
  });

  const newsletterForm = document.querySelector('.news-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const note = document.querySelector('.form-note');
      if (note) note.style.display = 'block';
    });
  }

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dots = Array.from(carousel.querySelectorAll('.dot'));
    let index = 0;
    function show(nextIndex) {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach(function (slide, slideIndex) { slide.classList.toggle('active', slideIndex === index); });
      dots.forEach(function (dot, dotIndex) { dot.classList.toggle('active', dotIndex === index); });
    }
    carousel.querySelector('[data-prev]').addEventListener('click', function () { show(index - 1); });
    carousel.querySelector('[data-next]').addEventListener('click', function () { show(index + 1); });
  }
})();
