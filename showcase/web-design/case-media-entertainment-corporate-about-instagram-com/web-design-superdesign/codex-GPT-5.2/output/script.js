(() => {
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const openBtn = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');
  const mobileLinks = document.querySelectorAll('[data-mobile-link]');

  const setMenuOpen = (open) => {
    if (!mobileMenu) return;
    mobileMenu.dataset.open = open ? 'true' : 'false';
    document.body.style.overflow = open ? 'hidden' : '';
    openBtn?.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) {
      closeBtn?.focus();
    } else {
      openBtn?.focus();
    }
  };

  openBtn?.addEventListener('click', () => setMenuOpen(true));
  closeBtn?.addEventListener('click', () => setMenuOpen(false));
  mobileMenu?.addEventListener('click', (e) => {
    if (e.target === mobileMenu) setMenuOpen(false);
  });
  mobileLinks.forEach((a) => a.addEventListener('click', () => setMenuOpen(false)));
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
  });

  // News carousel controls + keyboard support
  const carousel = document.querySelector('[data-carousel]');
  const prev = document.querySelector('[data-carousel-prev]');
  const next = document.querySelector('[data-carousel-next]');

  const scrollByCard = (dir) => {
    if (!carousel) return;
    const firstCard = carousel.querySelector('[data-news-card]');
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 320;
    carousel.scrollBy({ left: dir * (cardWidth + 14), behavior: 'smooth' });
  };

  prev?.addEventListener('click', () => scrollByCard(-1));
  next?.addEventListener('click', () => scrollByCard(1));

  carousel?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollByCard(1);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollByCard(-1);
    }
  });

  // Icons
  if (window.lucide?.createIcons) {
    window.lucide.createIcons();
  }
})();

