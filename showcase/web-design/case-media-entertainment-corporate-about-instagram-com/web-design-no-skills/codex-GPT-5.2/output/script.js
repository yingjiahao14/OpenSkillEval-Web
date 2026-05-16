function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function setupMobileMenu() {
  const overlay = document.querySelector('[data-menu]');
  const openButton = document.querySelector('[data-menu-button]');
  const closeButton = document.querySelector('[data-menu-close]');
  const menuLinks = Array.from(document.querySelectorAll('[data-menu-link]'));
  if (!overlay || !openButton || !closeButton) return;

  let lastActiveElement = null;

  function setOpen(nextOpen) {
    overlay.dataset.open = String(nextOpen);
    overlay.setAttribute('aria-hidden', String(!nextOpen));
    openButton.setAttribute('aria-expanded', String(nextOpen));

    document.documentElement.style.overflow = nextOpen ? 'hidden' : '';
    document.body.style.overflow = nextOpen ? 'hidden' : '';

    if (nextOpen) {
      lastActiveElement = document.activeElement;
      closeButton.focus();
    } else {
      if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
        lastActiveElement.focus();
      }
      lastActiveElement = null;
    }
  }

  function isOpen() {
    return overlay.dataset.open === 'true';
  }

  openButton.addEventListener('click', () => setOpen(!isOpen()));
  closeButton.addEventListener('click', () => setOpen(false));
  menuLinks.forEach((link) => link.addEventListener('click', () => setOpen(false)));

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) setOpen(false);
  });
}

function setupNewsCarousel() {
  const viewport = document.querySelector('[data-carousel-viewport]');
  const prev = document.querySelector('[data-carousel-prev]');
  const next = document.querySelector('[data-carousel-next]');
  if (!viewport) return;

  function getScrollStep() {
    const card = viewport.querySelector('.news-card');
    if (!card) return 320;
    const style = window.getComputedStyle(viewport);
    const gap = parseFloat(style.columnGap || style.gap || '14') || 14;
    return card.getBoundingClientRect().width + gap;
  }

  function scrollByStep(direction) {
    viewport.scrollBy({ left: getScrollStep() * direction, behavior: 'smooth' });
  }

  prev?.addEventListener('click', () => scrollByStep(-1));
  next?.addEventListener('click', () => scrollByStep(1));

  // Drag-to-scroll (desktop), without breaking native scroll/swipe.
  let isPointerDown = false;
  let startX = 0;
  let startScrollLeft = 0;
  let hasDragged = false;

  viewport.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') return;
    isPointerDown = true;
    hasDragged = false;
    startX = event.clientX;
    startScrollLeft = viewport.scrollLeft;
    viewport.setPointerCapture(event.pointerId);
    viewport.style.cursor = 'grabbing';
  });

  viewport.addEventListener('pointermove', (event) => {
    if (!isPointerDown) return;
    const dx = event.clientX - startX;
    if (Math.abs(dx) > 3) hasDragged = true;
    viewport.scrollLeft = startScrollLeft - dx;
  });

  function endPointer(event) {
    if (!isPointerDown) return;
    isPointerDown = false;
    viewport.releasePointerCapture(event.pointerId);
    viewport.style.cursor = '';

    // Snap gently to nearest card edge.
    const step = getScrollStep();
    const nearest = Math.round(viewport.scrollLeft / step) * step;
    const target = clamp(nearest, 0, viewport.scrollWidth - viewport.clientWidth);
    viewport.scrollTo({ left: target, behavior: 'smooth' });
  }

  viewport.addEventListener('pointerup', endPointer);
  viewport.addEventListener('pointercancel', endPointer);

  // Prevent accidental text selection / click during drag.
  viewport.addEventListener('click', (event) => {
    if (!hasDragged) return;
    event.preventDefault();
    event.stopPropagation();
    hasDragged = false;
  });
}

setupMobileMenu();
setupNewsCarousel();

