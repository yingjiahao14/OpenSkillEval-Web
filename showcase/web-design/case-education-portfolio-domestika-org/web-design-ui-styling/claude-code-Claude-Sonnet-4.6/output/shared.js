// Promo banner countdown
(function() {
  const banner = document.getElementById('promoBanner');
  const closeBtn = document.getElementById('promoClose');
  const countEl = document.getElementById('countdown');
  if (!banner) return;

  let secs = 23 * 3600 + 47 * 60 + 12;
  function tick() {
    if (secs <= 0) { clearInterval(timer); return; }
    secs--;
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (countEl) countEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  const timer = setInterval(tick, 1000);

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      banner.classList.add('hidden');
    });
  }
})();

// Footer accordion (mobile)
function toggleFooter(header) {
  if (window.innerWidth > 768) return;
  const ul = header.nextElementSibling;
  const toggle = header.querySelector('.footer-toggle');
  const isOpen = ul.classList.contains('open');
  ul.classList.toggle('open', !isOpen);
  if (toggle) toggle.textContent = isOpen ? '+' : '−';
}
