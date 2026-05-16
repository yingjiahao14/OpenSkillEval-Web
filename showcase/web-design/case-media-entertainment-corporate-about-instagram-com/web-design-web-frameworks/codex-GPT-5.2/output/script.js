(() => {
  const overlay = document.querySelector('[data-overlay]');
  const mobileSheet = document.querySelector('[data-mobile-sheet]');
  const menuBtn = document.querySelector('[data-menu-btn]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const navLinks = document.querySelectorAll('[data-mobile-link]');

  const setMenuOpen = (open) => {
    if (!overlay || !mobileSheet || !menuBtn) return;
    overlay.dataset.open = open ? 'true' : 'false';
    mobileSheet.dataset.open = open ? 'true' : 'false';
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.style.overflow = open ? 'hidden' : '';
  };

  const isMenuOpen = () => overlay?.dataset.open === 'true';

  menuBtn?.addEventListener('click', () => setMenuOpen(!isMenuOpen()));
  closeBtn?.addEventListener('click', () => setMenuOpen(false));
  overlay?.addEventListener('click', () => setMenuOpen(false));
  navLinks.forEach((el) => el.addEventListener('click', () => setMenuOpen(false)));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
  });

  // News carousel: optional buttons + keyboard support
  const viewport = document.querySelector('[data-carousel-viewport]');
  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');

  const scrollByCards = (dir) => {
    if (!viewport) return;
    const card = viewport.querySelector('[data-news-card]');
    const cardW = card ? card.getBoundingClientRect().width : 340;
    const gap = 14;
    viewport.scrollBy({ left: dir * (cardW + gap), behavior: 'smooth' });
  };

  prevBtn?.addEventListener('click', () => scrollByCards(-1));
  nextBtn?.addEventListener('click', () => scrollByCards(1));

  viewport?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByCards(1);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByCards(-1);
    }
  });
})();

