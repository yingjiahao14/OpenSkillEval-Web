(function () {
  const toggle = document.querySelector('[data-menu-toggle]');
  const overlay = document.querySelector('[data-mobile-overlay]');

  if (toggle && overlay) {
    const setOpen = (open) => {
      overlay.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    overlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });
  }

  const marqueeRows = document.querySelectorAll('[data-marquee-row]');
  marqueeRows.forEach((row) => {
    const track = row.querySelector('.marquee-track');
    if (!track) return;
    track.innerHTML += track.innerHTML;
  });
})();
