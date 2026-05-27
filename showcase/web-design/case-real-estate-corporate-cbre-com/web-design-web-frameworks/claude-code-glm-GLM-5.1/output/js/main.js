/* ============================================
   GlobalStone — Interactive Components
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initMegaMenu();
  initWhatWeDoTabs();
  initCarousel();
  initNewsletterForm();
});

/* --- Mobile Navigation --- */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Accordion items
  const accordionItems = mobileNav.querySelectorAll('.mobile-nav__item--accordion');
  accordionItems.forEach(item => {
    const link = item.querySelector('.mobile-nav__link');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Close other accordions
      accordionItems.forEach(other => {
        if (other !== item) other.classList.remove('accordion-open');
      });
      item.classList.toggle('accordion-open');
    });
  });

  // Close mobile nav on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      toggle.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* --- Mega Menu --- */
function initMegaMenu() {
  const megaItems = document.querySelectorAll('.main-nav__item--mega');

  megaItems.forEach(item => {
    const link = item.querySelector('.main-nav__link');
    const mega = item.querySelector('.mega-menu');

    // Desktop: hover behavior
    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        closeAllMegaMenus();
        item.classList.add('mega-open');
      }
    });

    item.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        item.classList.remove('mega-open');
      }
    });

    // Click toggle (works for both desktop and touch)
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.classList.contains('mega-open')) {
        item.classList.remove('mega-open');
      } else {
        closeAllMegaMenus();
        item.classList.add('mega-open');
      }
    });
  });

  // Close mega menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav__item--mega')) {
      closeAllMegaMenus();
    }
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllMegaMenus();
    }
  });
}

function closeAllMegaMenus() {
  document.querySelectorAll('.main-nav__item--mega').forEach(item => {
    item.classList.remove('mega-open');
  });
}

/* --- What We Do Tabs --- */
function initWhatWeDoTabs() {
  const tabContainer = document.querySelector('.what-we-do');
  if (!tabContainer) return;

  const tabs = tabContainer.querySelectorAll('.what-we-do__tab');
  const panels = tabContainer.querySelectorAll('.what-we-do__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = tabContainer.querySelector(`[data-panel="${target}"]`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });
}

/* --- Carousel --- */
function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel__track');
  const slides = carousel.querySelectorAll('.carousel__slide');
  const prevBtn = carousel.querySelector('.carousel__btn--prev');
  const nextBtn = carousel.querySelector('.carousel__btn--next');
  const dots = carousel.querySelectorAll('.carousel__dot');

  let currentIndex = 0;
  const totalSlides = slides.length;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('carousel__dot--active', i === currentIndex);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Auto-advance
  let interval = setInterval(() => goToSlide(currentIndex + 1), 6000);

  carousel.addEventListener('mouseenter', () => clearInterval(interval));
  carousel.addEventListener('mouseleave', () => {
    interval = setInterval(() => goToSlide(currentIndex + 1), 6000);
  });
}

/* --- Newsletter Form --- */
function initNewsletterForm() {
  const form = document.querySelector('.newsletter__form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter__input');
    if (input && input.value.trim()) {
      const btn = form.querySelector('.btn');
      const originalText = btn.textContent;
      btn.textContent = 'Thank you!';
      input.value = '';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 3000);
    }
  });
}

/* --- Header Scroll Effect --- */
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (!header) return;
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)';
  } else {
    header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
  }

  lastScroll = currentScroll;
}, { passive: true });
