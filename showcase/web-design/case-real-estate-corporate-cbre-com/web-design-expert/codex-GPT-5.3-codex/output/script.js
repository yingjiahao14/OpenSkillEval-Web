const servicesItem = document.querySelector('[data-services-item]');
const servicesToggle = document.querySelector('[data-services-toggle]');
if (servicesItem && servicesToggle) {
  const open = () => servicesItem.classList.add('open');
  const close = () => servicesItem.classList.remove('open');
  servicesToggle.addEventListener('click', (event) => {
    event.preventDefault();
    servicesItem.classList.toggle('open');
  });
  servicesItem.addEventListener('mouseenter', open);
  servicesItem.addEventListener('mouseleave', close);
  document.addEventListener('click', (event) => {
    if (!servicesItem.contains(event.target)) close();
  });
}

const mobileToggle = document.querySelector('[data-mobile-toggle]');
const mobilePanel = document.querySelector('[data-mobile-panel]');
if (mobileToggle && mobilePanel) {
  mobileToggle.addEventListener('click', () => {
    mobilePanel.classList.toggle('open');
  });
}

document.querySelectorAll('[data-accordion]').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = button.nextElementSibling;
    panel.classList.toggle('open');
  });
});

document.querySelectorAll('[data-tabs]').forEach((tabWrap) => {
  const buttons = tabWrap.querySelectorAll('[data-tab-btn]');
  const panels = tabWrap.querySelectorAll('[data-tab-panel]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.tabBtn;
      buttons.forEach((b) => b.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      tabWrap.querySelector(`[data-tab-panel="${id}"]`)?.classList.add('active');
    });
  });
});

const carousel = document.querySelector('[data-carousel]');
if (carousel) {
  const track = carousel.querySelector('[data-carousel-track]');
  const slides = carousel.querySelectorAll('.slide');
  let index = 0;
  const render = () => track.style.transform = `translateX(-${index * 100}%)`;
  carousel.querySelector('[data-prev]')?.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    render();
  });
  carousel.querySelector('[data-next]')?.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    render();
  });
}
