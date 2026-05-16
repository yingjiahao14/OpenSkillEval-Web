const servicesTrigger = document.querySelector('[data-services-trigger]');
const megaMenu = document.querySelector('[data-mega-menu]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobilePanel = document.querySelector('[data-mobile-panel]');

function closeMega() {
  if (!servicesTrigger || !megaMenu) return;
  servicesTrigger.setAttribute('aria-expanded', 'false');
  megaMenu.classList.remove('open');
}

if (servicesTrigger && megaMenu) {
  servicesTrigger.addEventListener('click', (event) => {
    event.preventDefault();
    const isOpen = servicesTrigger.getAttribute('aria-expanded') === 'true';
    servicesTrigger.setAttribute('aria-expanded', String(!isOpen));
    megaMenu.classList.toggle('open', !isOpen);
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-item-services')) closeMega();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMega();
      if (mobilePanel?.classList.contains('open')) toggleMobile(false);
    }
  });
}

function toggleMobile(force) {
  if (!menuToggle || !mobilePanel) return;
  const open = force ?? !mobilePanel.classList.contains('open');
  mobilePanel.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
}

if (menuToggle && mobilePanel) {
  menuToggle.addEventListener('click', () => toggleMobile());
  mobilePanel.addEventListener('click', (event) => {
    if (event.target.matches('a')) toggleMobile(false);
  });
}

document.querySelectorAll('[data-accordion-trigger]').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!isOpen));
    panel?.classList.toggle('open', !isOpen);
  });
});

const tabButtons = document.querySelectorAll('[data-tab-target]');
const tabPanels = document.querySelectorAll('[data-tab-panel]');
tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.tabTarget;
    tabButtons.forEach((item) => item.setAttribute('aria-selected', String(item === button)));
    tabPanels.forEach((panel) => panel.classList.toggle('active', panel.dataset.tabPanel === target));
  });
});

const newsletterForm = document.querySelector('[data-newsletter-form]');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const note = newsletterForm.querySelector('[data-form-note]');
    if (note) note.textContent = 'Thank you. The subscription form would open in a production environment.';
  });
}

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = [...carousel.querySelectorAll('[data-carousel-slide]')];
  const prev = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  let index = 0;
  const update = () => {
    if (track) track.style.transform = `translateX(-${index * 100}%)`;
    carousel.setAttribute('aria-label', `Featured partners carousel, slide ${index + 1} of ${slides.length}`);
  };
  prev?.addEventListener('click', () => { index = (index - 1 + slides.length) % slides.length; update(); });
  next?.addEventListener('click', () => { index = (index + 1) % slides.length; update(); });
  update();
});
