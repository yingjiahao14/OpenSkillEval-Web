const megaTrigger = document.querySelector('[data-mega-trigger]');
const megaMenu = document.querySelector('[data-mega-menu]');
if (megaTrigger && megaMenu) {
  let closeTimeout;
  const open = () => { clearTimeout(closeTimeout); megaMenu.classList.add('open'); };
  const close = () => { closeTimeout = setTimeout(() => megaMenu.classList.remove('open'), 100); };
  megaTrigger.addEventListener('mouseenter', open);
  megaTrigger.addEventListener('mouseleave', close);
  megaTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    megaMenu.classList.toggle('open');
  });
  megaMenu.addEventListener('mouseenter', open);
  megaMenu.addEventListener('mouseleave', close);
}

const mobileBtn = document.querySelector('[data-mobile-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');
if (mobileBtn && mobileNav) {
  mobileBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
}
document.querySelectorAll('.mobile-acc button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling;
    panel.classList.toggle('open');
  });
});

document.querySelectorAll('[data-tab]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');
    document.querySelectorAll('[data-tab]').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

const slides = document.querySelectorAll('.partner-slide');
let slideIndex = 0;
const showSlide = (i) => slides.forEach((s, idx) => s.style.display = idx === i ? 'block' : 'none');
if (slides.length) {
  showSlide(slideIndex);
  document.querySelector('[data-slide-next]')?.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  });
  document.querySelector('[data-slide-prev]')?.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
  });
}
