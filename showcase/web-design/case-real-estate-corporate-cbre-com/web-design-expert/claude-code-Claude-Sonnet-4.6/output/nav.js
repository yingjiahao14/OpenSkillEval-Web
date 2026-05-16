/* ==========================================================
   GLOBALSTONE — NAVIGATION & INTERACTIVITY
   ========================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupHeader();
    setupMegaMenu();
    setupMobileNav();
    setupTabs();
    setupCarousels();
    setupAnnouncementBanner();
    setActiveNavLink();
  }

  /* ----------------------------------------------------------
     Header — scroll shadow
  ---------------------------------------------------------- */
  function setupHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------
     Mega Menu
  ---------------------------------------------------------- */
  function setupMegaMenu() {
    const items = document.querySelectorAll('.nav-item.has-dropdown');
    let closeTimer;

    items.forEach(item => {
      const menu = item.querySelector('.mega-menu');
      if (!menu) return;

      const open = () => {
        clearTimeout(closeTimer);
        // Close any other open menus first
        items.forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            other.querySelector('.mega-menu')?.classList.remove('open');
          }
        });
        item.classList.add('open');
        menu.classList.add('open');
      };

      const close = () => {
        closeTimer = setTimeout(() => {
          item.classList.remove('open');
          menu.classList.remove('open');
        }, 120);
      };

      item.addEventListener('mouseenter', open);
      item.addEventListener('mouseleave', close);
      menu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
      menu.addEventListener('mouseleave', close);

      // Click toggle for touch / keyboard
      const link = item.querySelector('.nav-link');
      if (link) {
        link.addEventListener('click', e => {
          const isOpen = item.classList.contains('open');
          // If it has a real href (non-#), allow navigation when already open
          const href = link.getAttribute('href');
          if (href && href !== '#' && isOpen) return;
          e.preventDefault();
          isOpen ? close() : open();
        });
      }
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('.nav-item.has-dropdown')) {
        items.forEach(item => {
          item.classList.remove('open');
          item.querySelector('.mega-menu')?.classList.remove('open');
        });
      }
    });

    // ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        items.forEach(item => {
          item.classList.remove('open');
          item.querySelector('.mega-menu')?.classList.remove('open');
        });
      }
    });
  }

  /* ----------------------------------------------------------
     Mobile Nav
  ---------------------------------------------------------- */
  function setupMobileNav() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const overlay = document.querySelector('.mobile-nav-overlay');
    if (!toggle || !overlay) return;

    toggle.addEventListener('click', () => {
      const isOpen = overlay.classList.contains('open');
      toggle.classList.toggle('open', !isOpen);
      overlay.classList.toggle('open', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    // Mobile accordion
    const accordionItems = overlay.querySelectorAll('.mobile-nav-item.has-sub');
    accordionItems.forEach(item => {
      const icon = item.querySelector('.mobile-accordion-icon');
      if (!icon) return;
      icon.addEventListener('click', () => {
        // Close siblings
        accordionItems.forEach(other => {
          if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open');
      });
    });

    // Close on overlay link click
    overlay.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----------------------------------------------------------
     Vertical Tabs (What We Do)
  ---------------------------------------------------------- */
  function setupTabs() {
    document.querySelectorAll('[data-tabs]').forEach(container => {
      const buttons = container.querySelectorAll('.tab-btn');
      const panels  = container.querySelectorAll('.tab-panel');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.tab;
          buttons.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          panels.forEach(p => p.classList.remove('active'));
          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
          const panel = container.querySelector('#' + target);
          if (panel) panel.classList.add('active');
        });
      });
    });
  }

  /* ----------------------------------------------------------
     Carousel
  ---------------------------------------------------------- */
  function setupCarousels() {
    document.querySelectorAll('.carousel').forEach(carousel => {
      const track  = carousel.querySelector('.carousel-track');
      const slides = carousel.querySelectorAll('.carousel-slide');
      const prev   = carousel.querySelector('.carousel-btn-prev');
      const next   = carousel.querySelector('.carousel-btn-next');
      const dots   = carousel.querySelectorAll('.carousel-dot');
      if (!track || slides.length === 0) return;

      let current = 0;
      let autoplayTimer;

      const goTo = idx => {
        current = ((idx % slides.length) + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        // Update aria
        slides.forEach((s, i) => {
          s.setAttribute('aria-hidden', String(i !== current));
        });
      };

      const startAutoplay = () => {
        stopAutoplay();
        autoplayTimer = setInterval(() => goTo(current + 1), 5000);
      };
      const stopAutoplay = () => clearInterval(autoplayTimer);

      prev?.addEventListener('click', () => { goTo(current - 1); startAutoplay(); });
      next?.addEventListener('click', () => { goTo(current + 1); startAutoplay(); });
      dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); startAutoplay(); }));

      // Touch swipe
      let touchStartX = 0;
      carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
      carousel.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
        startAutoplay();
      }, { passive: true });

      goTo(0);
      if (slides.length > 1) startAutoplay();

      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
    });
  }

  /* ----------------------------------------------------------
     Announcement Banner — dismiss
  ---------------------------------------------------------- */
  function setupAnnouncementBanner() {
    const btn = document.querySelector('.announcement-close');
    if (!btn) return;
    btn.addEventListener('click', () => {
      btn.closest('.announcement-banner')?.remove();
    });
  }

  /* ----------------------------------------------------------
     Active Nav Link — highlight current page
  ---------------------------------------------------------- */
  function setActiveNavLink() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mega-menu-links a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href !== '#' && path === href.split('/').pop()) {
        link.classList.add('active');
        // Also mark parent nav item
        link.closest('.nav-item')?.querySelector('.nav-link')?.classList.add('active');
      }
    });
  }

})();
