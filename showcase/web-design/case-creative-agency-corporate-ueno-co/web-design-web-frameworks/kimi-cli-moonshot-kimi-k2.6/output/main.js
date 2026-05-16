/* ========================================
   Volta Studio — Global Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initMarquee();
});

/* Mobile Menu Toggle */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const overlay = document.querySelector('.mobile-overlay');
  if (!toggle || !overlay) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
  });

  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* Marquee — duplicate track content for seamless loop */
function initMarquee() {
  document.querySelectorAll('.marquee-row').forEach(row => {
    const track = row.querySelector('.marquee-track');
    if (!track) return;
    // Clone the track content once to create seamless loop
    track.innerHTML += track.innerHTML;
  });
}
