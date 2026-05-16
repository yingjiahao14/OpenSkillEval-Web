(function () {
  const menuBtn = document.querySelector('[data-menu-button]');
  const overlay = document.querySelector('[data-mobile-overlay]');

  if (menuBtn && overlay) {
    menuBtn.addEventListener('click', function () {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!expanded));
      overlay.classList.toggle('open', !expanded);
      document.body.style.overflow = expanded ? '' : 'hidden';
    });
  }

  const tracks = document.querySelectorAll('.marquee-track');
  tracks.forEach(function (track) {
    const html = track.innerHTML;
    track.innerHTML = html + html;
  });
})();
