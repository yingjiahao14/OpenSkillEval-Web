/* ============================================
   CreativeHub — Shared Scripts
   ============================================ */

// Promo banner dismiss
(function () {
  const banner = document.querySelector('.promo-banner');
  if (!banner) return;
  const closeBtn = banner.querySelector('.close-banner');
  if (!closeBtn) return;
  closeBtn.addEventListener('click', () => {
    banner.style.display = 'none';
    localStorage.setItem('ch_banner_closed', '1');
  });
  if (localStorage.getItem('ch_banner_closed') === '1') {
    banner.style.display = 'none';
  }
})();

// Countdown timer
(function () {
  const el = document.querySelector('.countdown');
  if (!el) return;
  let h = 5, m = 42, s = 18;
  const pad = n => String(n).padStart(2, '0');
  setInterval(() => {
    if (s === 0) { if (m === 0) { if (h === 0) { h = 23; m = 59; s = 59; } else { h--; m = 59; s = 59; } } else { m--; s = 59; } } else { s--; }
    el.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  }, 1000);
})();

// Mobile footer accordion
(function () {
  const toggles = document.querySelectorAll('.footer-accordion-toggle');
  toggles.forEach(t => {
    t.addEventListener('click', () => {
      const col = t.nextElementSibling;
      const icon = t.querySelector('.acc-icon');
      const isOpen = col.classList.toggle('open');
      if (icon) icon.textContent = isOpen ? '−' : '+';
    });
  });
})();

// Generic carousel helper
function initCarousel(trackSelector, prevSelector, nextSelector) {
  const track = document.querySelector(trackSelector);
  if (!track) return;
  const prev = document.querySelector(prevSelector);
  const next = document.querySelector(nextSelector);
  const scrollAmount = 320;

  function updateArrows() {
    if (prev) prev.disabled = track.scrollLeft <= 1;
    if (next) next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  }

  if (prev) prev.addEventListener('click', () => { track.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); });
  if (next) next.addEventListener('click', () => { track.scrollBy({ left: scrollAmount, behavior: 'smooth' }); });
  track.addEventListener('scroll', updateArrows);
  updateArrows();
}

// Intersection reveal
(function () {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();
