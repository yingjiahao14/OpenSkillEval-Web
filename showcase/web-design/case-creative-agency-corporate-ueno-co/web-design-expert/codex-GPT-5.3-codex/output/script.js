(function () {
  const menuButton = document.querySelector('[data-menu-open]');
  const menuClose = document.querySelector('[data-menu-close]');
  const overlay = document.querySelector('[data-overlay]');

  if (menuButton && menuClose && overlay) {
    menuButton.addEventListener('click', function () {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    menuClose.addEventListener('click', function () {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  const marqueeRows = document.querySelectorAll('[data-marquee]');
  marqueeRows.forEach(function (row) {
    const direction = row.dataset.direction === 'right' ? 1 : -1;
    const speed = Number(row.dataset.speed || 0.45);
    const base = row.innerHTML;
    row.innerHTML = base + base;
    let x = 0;
    let width = row.scrollWidth / 2;

    function animate() {
      x += direction * speed;
      if (direction < 0 && Math.abs(x) >= width) x = 0;
      if (direction > 0 && x >= 0) x = -width;
      row.style.transform = 'translate3d(' + x + 'px,0,0)';
      requestAnimationFrame(animate);
    }

    const resize = function () { width = row.scrollWidth / 2; };
    window.addEventListener('resize', resize);
    if (direction > 0) x = -width;
    animate();
  });
})();
