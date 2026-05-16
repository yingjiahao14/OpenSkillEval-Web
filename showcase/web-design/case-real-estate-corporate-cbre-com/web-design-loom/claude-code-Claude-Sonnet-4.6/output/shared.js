/* ===== GLOBALSTONE SHARED JS ===== */

// Header scroll effect
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// Mega menu toggle
const servicesTrigger = document.getElementById('services-trigger');
const megaMenu = document.getElementById('mega-menu');
const navItem = servicesTrigger?.closest('.nav-item');

if (servicesTrigger && megaMenu) {
  let menuTimeout;

  function openMenu() {
    clearTimeout(menuTimeout);
    megaMenu.classList.add('open');
    navItem.classList.add('open');
    servicesTrigger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    menuTimeout = setTimeout(() => {
      megaMenu.classList.remove('open');
      navItem.classList.remove('open');
      servicesTrigger.setAttribute('aria-expanded', 'false');
    }, 120);
  }

  // Click toggle
  servicesTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (megaMenu.classList.contains('open')) {
      closeMenu();
      clearTimeout(menuTimeout);
      megaMenu.classList.remove('open');
      navItem.classList.remove('open');
      servicesTrigger.setAttribute('aria-expanded', 'false');
    } else {
      openMenu();
    }
  });

  // Hover
  navItem.addEventListener('mouseenter', openMenu);
  navItem.addEventListener('mouseleave', closeMenu);
  megaMenu.addEventListener('mouseenter', () => clearTimeout(menuTimeout));
  megaMenu.addEventListener('mouseleave', closeMenu);

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navItem.contains(e.target)) {
      megaMenu.classList.remove('open');
      navItem.classList.remove('open');
      servicesTrigger.setAttribute('aria-expanded', 'false');
    }
  });

  // Keyboard escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && megaMenu.classList.contains('open')) {
      megaMenu.classList.remove('open');
      navItem.classList.remove('open');
      servicesTrigger.setAttribute('aria-expanded', 'false');
      servicesTrigger.focus();
    }
  });
}

// Mobile hamburger + menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  });
}

// Mobile accordion
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.mobile-nav-item');
    const panel = item.querySelector('.accordion-panel');
    const isOpen = item.classList.toggle('open');
    trigger.setAttribute('aria-expanded', isOpen);
    panel.classList.toggle('open', isOpen);
    panel.setAttribute('aria-hidden', !isOpen);
  });
});

// Carousel
document.querySelectorAll('.carousel-container').forEach(container => {
  const track = container.querySelector('.carousel-track');
  const slides = container.querySelectorAll('.carousel-slide');
  const prevBtn = container.querySelector('.carousel-prev');
  const nextBtn = container.querySelector('.carousel-next');
  if (!track || slides.length === 0) return;

  let current = 0;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
});
