const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
    });
  });
}

const marqueeRows = document.querySelectorAll('[data-marquee]');

marqueeRows.forEach((row) => {
  const speed = Number(row.dataset.speed || 45);
  const direction = row.dataset.direction === 'left' ? -1 : 1;
  const items = row.dataset.items ? row.dataset.items.split('|') : [];

  const content = [...items, ...items].map((item) => `<span>${item}</span>`).join('');
  row.innerHTML = content;

  let x = 0;
  let raf = null;
  let last = performance.now();
  let width = row.scrollWidth / 2;

  const recalc = () => { width = row.scrollWidth / 2; };
  window.addEventListener('resize', recalc);

  const tick = (now) => {
    const dt = (now - last) / 1000;
    last = now;
    x += direction * speed * dt;

    if (direction < 0 && Math.abs(x) >= width) x = 0;
    if (direction > 0 && x >= 0) x = -width;

    row.style.transform = `translate3d(${x}px,0,0)`;
    raf = requestAnimationFrame(tick);
  };

  x = direction < 0 ? 0 : -width;
  raf = requestAnimationFrame(tick);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else {
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
  });
});
