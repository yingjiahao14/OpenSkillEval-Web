/* ========================================
   ORCHARD — Shared JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  initCarousels();
  initTabs();
  initFooterAccordion();
  initSectionNav();
});

/* ========================================
   CAROUSELS
   ======================================== */

function initCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const viewport = carousel.querySelector('.carousel__viewport');
    const track = carousel.querySelector('.carousel__track');
    const prevBtn = carousel.querySelector('.carousel__arrow--prev');
    const nextBtn = carousel.querySelector('.carousel__arrow--next');

    if (!viewport || !track) return;

    // Calculate scroll amount
    const getCardWidth = () => {
      const card = track.querySelector('.carousel__card');
      if (card) {
        return card.offsetWidth + 16; // card width + gap
      }
      return 300;
    };

    const updateArrows = () => {
      if (!prevBtn || !nextBtn) return;

      const scrollLeft = viewport.scrollLeft;
      const maxScroll = track.scrollWidth - viewport.clientWidth - 10;

      prevBtn.classList.toggle('carousel__arrow--hidden', scrollLeft < 20);
      nextBtn.classList.toggle('carousel__arrow--hidden', scrollLeft >= maxScroll - 20);
    };

    // Arrow click handlers
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        viewport.scrollBy({ left: -getCardWidth() * 2, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        viewport.scrollBy({ left: getCardWidth() * 2, behavior: 'smooth' });
      });
    }

    // Update arrows on scroll
    viewport.addEventListener('scroll', updateArrows);
    updateArrows();

    // Handle resize
    window.addEventListener('resize', updateArrows);
  });
}

/* ========================================
   TABS (Entertainment)
   ======================================== */

function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabsContainer => {
    const buttons = tabsContainer.querySelectorAll('.tabs__btn');
    const panels = tabsContainer.querySelectorAll('.tabs__panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.tab;

        // Update buttons
        buttons.forEach(b => b.classList.remove('tabs__btn--active'));
        btn.classList.add('tabs__btn--active');

        // Update panels
        panels.forEach(panel => {
          panel.classList.toggle('tabs__panel--active', panel.id === targetId);
        });
      });
    });
  });
}

/* ========================================
   FOOTER ACCORDION (Mobile)
   ======================================== */

function initFooterAccordion() {
  document.querySelectorAll('.footer-accordion__header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.footer-accordion__icon');

      content.classList.toggle('footer-accordion__content--open');
      if (icon) {
        icon.classList.toggle('footer-accordion__icon--open');
      }
    });
  });
}

/* ========================================
   SECTION NAVIGATION (Smooth Scroll)
   ======================================== */

function initSectionNav() {
  document.querySelectorAll('.section-nav').forEach(nav => {
    const links = nav.querySelectorAll('.section-nav__link');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
            const sectionNavHeight = nav.offsetHeight;
            const offset = navHeight + sectionNavHeight + 20;

            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Highlight active section on scroll
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(link => {
            link.classList.toggle('section-nav__link--active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
  });
}

/* ========================================
   UTILITIES
   ======================================== */

function formatPrice(price) {
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
