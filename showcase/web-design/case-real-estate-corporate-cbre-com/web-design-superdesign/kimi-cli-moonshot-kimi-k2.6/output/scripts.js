/**
 * GlobalStone — Shared JavaScript
 * Navigation, tabs, carousel, scroll effects
 */

(function () {
  'use strict';

  /* ── Header scroll effect ── */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  /* ── Mega Menu ── */
  const servicesTrigger = document.querySelector('.nav-services-trigger');
  const megaMenu = document.querySelector('.mega-menu');

  if (servicesTrigger && megaMenu) {
    let timeoutId;

    const openMega = () => {
      clearTimeout(timeoutId);
      servicesTrigger.setAttribute('aria-expanded', 'true');
      megaMenu.classList.add('open');
    };

    const closeMega = () => {
      timeoutId = setTimeout(() => {
        servicesTrigger.setAttribute('aria-expanded', 'false');
        megaMenu.classList.remove('open');
      }, 150);
    };

    servicesTrigger.addEventListener('mouseenter', openMega);
    servicesTrigger.addEventListener('focus', openMega);
    megaMenu.addEventListener('mouseenter', () => clearTimeout(timeoutId));

    servicesTrigger.addEventListener('mouseleave', closeMega);
    megaMenu.addEventListener('mouseleave', closeMega);

    // Click toggle for accessibility
    servicesTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = megaMenu.classList.contains('open');
      if (isOpen) {
        closeMega();
      } else {
        openMega();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && megaMenu.classList.contains('open')) {
        closeMega();
        servicesTrigger.focus();
      }
    });
  }

  /* ── Mobile Navigation ── */
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Mobile Accordion ── */
  document.querySelectorAll('.mobile-accordion-header').forEach((header) => {
    header.addEventListener('click', () => {
      const panel = header.nextElementSibling;
      const isOpen = panel.classList.contains('open');

      // Close all others
      document.querySelectorAll('.mobile-accordion-panel').forEach((p) => {
        p.classList.remove('open');
        p.previousElementSibling.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        panel.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Vertical Tabs ── */
  document.querySelectorAll('.tabs-vertical').forEach((tabsContainer) => {
    const tabBtns = tabsContainer.querySelectorAll('.tab-btn');
    const tabPanels = tabsContainer.querySelectorAll('.tab-panel');

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        tabBtns.forEach((b) => b.classList.remove('active'));
        tabPanels.forEach((p) => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = tabsContainer.querySelector(`[data-panel="${targetId}"]`);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });
  });

  /* ── Carousel ── */
  document.querySelectorAll('.carousel').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dots = carousel.querySelectorAll('.carousel-dot');

    if (!track || slides.length === 0) return;

    let current = 0;

    const goTo = (index) => {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    };

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    // Auto-advance every 6s
    setInterval(() => goTo(current + 1), 6000);
  });

  /* ── Scroll reveal ── */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* ── Lucide icons ── */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
})();
