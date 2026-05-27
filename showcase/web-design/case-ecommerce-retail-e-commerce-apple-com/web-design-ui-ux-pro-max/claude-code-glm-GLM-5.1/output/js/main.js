/* ========================================
   Orchard — Shared JavaScript
   ======================================== */

(function () {
  'use strict';

  /* --- Carousel --- */
  document.querySelectorAll('.carousel-wrapper').forEach(initCarousel);

  function initCarousel(wrapper) {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.carousel-btn--prev');
    const nextBtn = wrapper.querySelector('.carousel-btn--next');
    if (!track) return;

    const scrollAmount = () => {
      const card = track.querySelector('.product-card, .info-card');
      if (card) return card.offsetWidth + 16; // card width + gap
      return 300;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
      });
    }

    // Show/hide arrows based on scroll position
    function updateArrows() {
      if (!prevBtn || !nextBtn) return;
      const sl = track.scrollLeft;
      const maxScroll = track.scrollWidth - track.clientWidth;
      prevBtn.style.opacity = sl > 10 ? '' : '0';
      nextBtn.style.opacity = sl < maxScroll - 10 ? '' : '0';
    }

    track.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();

    // Initial fade-in for arrows on hover
    wrapper.addEventListener('mouseenter', () => {
      prevBtn.style.opacity = track.scrollLeft > 10 ? '1' : '0';
      nextBtn.style.opacity = track.scrollLeft < track.scrollWidth - track.clientWidth - 10 ? '1' : '0';
    });
  }

  /* --- Entertainment Tabs --- */
  document.querySelectorAll('.entertainment-tabs').forEach(tabBar => {
    const tabs = tabBar.querySelectorAll('.entertainment-tab');
    const section = tabBar.closest('.entertainment-section');
    if (!section) return;
    const panels = section.querySelectorAll('.entertainment-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        panels.forEach(p => {
          p.classList.toggle('active', p.getAttribute('data-panel') === target);
        });
      });
    });
  });

  /* --- Footer Accordion (mobile) --- */
  document.querySelectorAll('.footer-accordion-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const col = toggle.closest('.footer-col');
      if (!col) return;
      col.classList.toggle('open');
    });
  });

  /* --- Sticky Section Nav: active state + smooth scroll --- */
  const sectionNav = document.querySelector('.section-nav-inner');
  if (sectionNav) {
    const navLinks = sectionNav.querySelectorAll('a');
    const sectionAnchors = [];

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) sectionAnchors.push({ link, target });
      }

      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
          const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 44;
          const secNavH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--section-nav-height')) || 52;
          const offset = navH + secNavH + 16;
          const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });

    // IntersectionObserver for active state
    if (sectionAnchors.length) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const match = sectionAnchors.find(s => s.target === entry.target);
            if (match) match.link.classList.add('active');
          }
        });
      }, {
        rootMargin: '-30% 0px -60% 0px'
      });

      sectionAnchors.forEach(s => observer.observe(s.target));
    }
  }

  /* --- Mobile Nav Toggle --- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-nav-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const expanded = mobileMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', expanded);
    });
  }

})();
