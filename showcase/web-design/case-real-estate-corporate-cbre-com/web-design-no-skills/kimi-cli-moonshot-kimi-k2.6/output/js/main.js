/* ========================================
   GlobalStone — Main JavaScript
   ======================================== */

(function() {
  'use strict';

  /* ---------- Header scroll shadow ---------- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    });
  }

  /* ---------- Mobile menu toggle ---------- */
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      const isOpen = mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open');
      mobileMenuBtn.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
  }

  /* ---------- Mobile accordion ---------- */
  const accordionHeaders = document.querySelectorAll('.mobile-accordion-header');
  accordionHeaders.forEach(function(header) {
    header.addEventListener('click', function() {
      const body = header.nextElementSibling;
      const isOpen = body.classList.contains('open');

      // Close all others
      accordionHeaders.forEach(function(h) {
        h.classList.remove('active');
        h.nextElementSibling.classList.remove('open');
      });

      if (!isOpen) {
        header.classList.add('active');
        body.classList.add('open');
      }
    });
  });

  /* ---------- Mega menu hover/click ---------- */
  const megaMenuWrapper = document.querySelector('.mega-menu-wrapper');
  if (megaMenuWrapper) {
    let timeout;

    function openMegaMenu() {
      clearTimeout(timeout);
      megaMenuWrapper.classList.add('open');
    }

    function closeMegaMenu() {
      timeout = setTimeout(function() {
        megaMenuWrapper.classList.remove('open');
      }, 150);
    }

    megaMenuWrapper.addEventListener('mouseenter', openMegaMenu);
    megaMenuWrapper.addEventListener('mouseleave', closeMegaMenu);

    const trigger = megaMenuWrapper.querySelector('.mega-menu-trigger');
    if (trigger) {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        megaMenuWrapper.classList.toggle('open');
      });
    }

    const menu = megaMenuWrapper.querySelector('.mega-menu');
    if (menu) {
      menu.addEventListener('mouseenter', openMegaMenu);
      menu.addEventListener('mouseleave', closeMegaMenu);
    }
  }

  /* ---------- What We Do Tabs ---------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      tabPanels.forEach(function(p) { p.classList.remove('active'); });

      btn.classList.add('active');
      const panel = document.getElementById('tab-panel-' + target);
      if (panel) {
        panel.classList.add('active');
      }
    });
  });

  /* ---------- Carousel ---------- */
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(function(carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dots = carousel.querySelectorAll('.carousel-dot');

    if (!track || slides.length === 0) return;

    let current = 0;

    function goTo(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';

      dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === current);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() { goTo(current - 1); });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function() { goTo(current + 1); });
    }

    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() { goTo(i); });
    });
  });

  /* ---------- Close mobile nav on resize to desktop ---------- */
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024 && mobileNav && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      mobileMenuBtn.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

})();
