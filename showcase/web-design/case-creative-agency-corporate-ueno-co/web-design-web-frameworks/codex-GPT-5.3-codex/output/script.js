(function () {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');

  if (toggle && menu) {
    const links = menu.querySelectorAll('a');

    const closeMenu = () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('is-open');
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    links.forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  const rows = Array.from(document.querySelectorAll('[data-marquee-row]'));
  if (!rows.length) return;

  const speedByRow = [0.45, -0.38, 0.33];

  rows.forEach((row) => {
    row.innerHTML = row.innerHTML + row.innerHTML;
  });

  const offsets = rows.map(() => 0);

  function tick() {
    rows.forEach((row, index) => {
      const width = row.scrollWidth / 2;
      offsets[index] = (offsets[index] + speedByRow[index % speedByRow.length]) % width;
      row.style.transform = `translate3d(${-offsets[index]}px,0,0)`;
    });
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
