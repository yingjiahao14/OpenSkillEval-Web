/* ============================================
   GlobalStone — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMegaMenu();
  initMobileNav();
  initWhatWeDoTabs();
  initCarousel();
  initNewsletterForm();
});

/* --- Header Scroll Effect --- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Mega Menu (Desktop) --- */
function initMegaMenu() {
  const megaItems = document.querySelectorAll('.nav-desktop__item--mega');

  megaItems.forEach(item => {
    const link = item.querySelector('.nav-desktop__link');
    const menu = item.querySelector('.mega-menu');

    if (!link || !menu) return;

    // Click toggle for keyboard/touch accessibility
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.classList.contains('open');

      // Close all others
      megaItems.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });

      item.classList.toggle('open', !isOpen);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!item.contains(e.target)) {
        item.classList.remove('open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        item.classList.remove('open');
      }
    });
  });
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const nav = document.querySelector('.nav-mobile');
  const hamburger = document.querySelector('.hamburger');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('active');
    nav.classList.toggle('active');
    if (hamburger) hamburger.classList.toggle('active');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Accordion sub-menus
  const accordionLinks = nav.querySelectorAll('.nav-mobile__link--accordion');

  accordionLinks.forEach(link => {
    link.addEventListener('click', () => {
      const submenu = link.nextElementSibling;
      const isOpen = link.classList.contains('open');

      // Close all other accordions
      accordionLinks.forEach(other => {
        if (other !== link) {
          other.classList.remove('open');
          const otherSub = other.nextElementSibling;
          if (otherSub) otherSub.classList.remove('active');
        }
      });

      link.classList.toggle('open', !isOpen);
      if (submenu) submenu.classList.toggle('active', !isOpen);
    });
  });
}

/* --- What We Do Tabs --- */
function initWhatWeDoTabs() {
  const section = document.querySelector('.what-we-do');
  if (!section) return;

  const tabs = section.querySelectorAll('.what-we-do__tab');
  const panels = section.querySelectorAll('.what-we-do__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update panels
      panels.forEach(p => {
        p.classList.toggle('active', p.dataset.panel === target);
      });
    });
  });
}

/* --- Carousel --- */
function initCarousel() {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel__track');
    const slides = carousel.querySelectorAll('.carousel__slide');
    const prevBtn = carousel.querySelector('.carousel__btn--prev');
    const nextBtn = carousel.querySelector('.carousel__btn--next');
    const dots = carousel.querySelectorAll('.carousel__dot');

    if (!track || slides.length === 0) return;

    let current = 0;
    const total = slides.length;

    function goTo(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;

      track.style.transform = `translateX(-${current * 100}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });
  });
}

/* --- Newsletter Form --- */
function initNewsletterForm() {
  const form = document.querySelector('.newsletter__form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.newsletter__input');
    const email = input ? input.value.trim() : '';

    if (email && email.includes('@')) {
      const btn = form.querySelector('.btn');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.background = '#2E7D32';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          input.value = '';
        }, 3000);
      }
    }
  });
}
