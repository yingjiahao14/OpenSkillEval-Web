/* GlobalStone — Shared JavaScript */
(function () {
  'use strict';

  /* ── Mega Menu ── */
  const servicesBtn = document.querySelector('[aria-controls="mega-services"]');
  const megaMenu    = document.getElementById('mega-services');

  if (servicesBtn && megaMenu) {
    function openMega() {
      megaMenu.classList.add('open');
      servicesBtn.setAttribute('aria-expanded', 'true');
    }
    function closeMega() {
      megaMenu.classList.remove('open');
      servicesBtn.setAttribute('aria-expanded', 'false');
    }

    const navItem = servicesBtn.closest('.has-mega');
    navItem.addEventListener('mouseenter', openMega);
    navItem.addEventListener('mouseleave', closeMega);
    servicesBtn.addEventListener('click', function () {
      const isOpen = megaMenu.classList.contains('open');
      isOpen ? closeMega() : openMega();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMega();
    });
    document.addEventListener('click', function (e) {
      if (!navItem.contains(e.target)) closeMega();
    });
  }

  /* ── Mobile Nav Toggle ── */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav    = document.getElementById('mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function () {
      mobileToggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
  }

  /* ── Mobile Accordion ── */
  document.querySelectorAll('.mobile-nav-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const accordion = btn.nextElementSibling;
      if (!accordion) return;
      const isOpen = accordion.classList.contains('open');
      document.querySelectorAll('.mobile-accordion.open').forEach(function (el) {
        el.classList.remove('open');
        el.previousElementSibling.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        accordion.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── What We Do Tabs ── */
  const tabs  = document.querySelectorAll('.wwd-tab');
  const panels = document.querySelectorAll('.wwd-panel');

  if (tabs.length) {
    function activateTab(tab) {
      const target = tab.dataset.tab;
      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById('panel-' + target);
      if (panel) panel.classList.add('active');
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { activateTab(tab); });
      tab.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateTab(tab); }
      });
    });
  }

  /* ── Featured Partners Carousel ── */
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    let current = 0;

    function goTo(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      carousel.querySelectorAll('.carousel-dot').forEach(function (dot, i) {
        dot.classList.toggle('active', i === current);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    const dotsContainer = carousel.querySelector('.carousel-dots');
    if (dotsContainer && slides.length) {
      slides.forEach(function (_, i) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsContainer.appendChild(dot);
      });
    }
  }

  /* ── Scroll: sticky header shadow ── */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 20px rgba(0,0,0,.25)'
        : 'none';
    }, { passive: true });
  }

})();
