/**
 * Orchard — Shared JavaScript
 * Carousels, Tabs, Accordions, Section Nav
 */

(function() {
  'use strict';

  // ============================================
  // Carousel System
  // ============================================

  function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(function(container) {
      const scrollEl = container.querySelector('[data-carousel-scroll]');
      const prevBtn = container.querySelector('[data-carousel-prev]');
      const nextBtn = container.querySelector('[data-carousel-next]');
      if (!scrollEl) return;

      const scrollAmount = 340;

      function updateButtons() {
        if (prevBtn) {
          prevBtn.disabled = scrollEl.scrollLeft <= 1;
        }
        if (nextBtn) {
          nextBtn.disabled = scrollEl.scrollLeft + scrollEl.clientWidth >= scrollEl.scrollWidth - 1;
        }
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function() {
          scrollEl.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function() {
          scrollEl.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
      }

      scrollEl.addEventListener('scroll', updateButtons, { passive: true });
      window.addEventListener('resize', updateButtons, { passive: true });

      // Initial state
      setTimeout(updateButtons, 100);
    });
  }

  // ============================================
  // Entertainment Tabs
  // ============================================

  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function(tabsContainer) {
      const tabs = tabsContainer.querySelectorAll('[data-tab]');
      const panels = document.querySelectorAll('[data-tab-panel]');

      tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
          const target = tab.getAttribute('data-tab');

          tabs.forEach(function(t) { t.classList.remove('active'); });
          tab.classList.add('active');

          panels.forEach(function(panel) {
            if (panel.getAttribute('data-tab-panel') === target) {
              panel.classList.add('active');
            } else {
              panel.classList.remove('active');
            }
          });
        });
      });
    });
  }

  // ============================================
  // Footer Accordion (Mobile)
  // ============================================

  function initFooterAccordion() {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;

    // Only on mobile
    function setupAccordion() {
      const isMobile = window.innerWidth <= 768;
      const cols = footer.querySelectorAll('.footer-col');

      cols.forEach(function(col) {
        const title = col.querySelector('.footer-col-title');
        const ul = col.querySelector('ul');
        if (!title || !ul) return;

        let toggle = col.querySelector('.footer-accordion-toggle');

        if (isMobile) {
          if (!toggle) {
            toggle = document.createElement('button');
            toggle.className = 'footer-accordion-toggle';
            toggle.textContent = title.textContent;
            col.insertBefore(toggle, ul);

            toggle.addEventListener('click', function() {
              toggle.classList.toggle('active');
              ul.classList.toggle('open');
              if (ul.classList.contains('open')) {
                ul.style.maxHeight = ul.scrollHeight + 'px';
              } else {
                ul.style.maxHeight = '0';
              }
            });
          }
          // Set initial closed state
          ul.style.maxHeight = '0';
          ul.style.overflow = 'hidden';
          ul.style.transition = 'max-height 0.3s ease';
          if (toggle.classList.contains('active')) {
            toggle.classList.remove('active');
          }
        } else {
          if (toggle) toggle.remove();
          ul.style.maxHeight = '';
          ul.style.overflow = '';
          ul.style.transition = '';
          ul.classList.remove('open');
        }
      });
    }

    setupAccordion();
    window.addEventListener('resize', setupAccordion, { passive: true });
  }

  // ============================================
  // Section Navigation (Sticky tabs)
  // ============================================

  function initSectionNav() {
    const sectionNav = document.querySelector('[data-section-nav]');
    if (!sectionNav) return;

    const links = sectionNav.querySelectorAll('a[href^="#"]');
    const sections = [];

    links.forEach(function(link) {
      const id = link.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      if (section) sections.push({ link: link, section: section });
    });

    function onScroll() {
      const scrollPos = window.scrollY + 100;
      let active = null;

      sections.forEach(function(item) {
        const top = item.section.offsetTop;
        if (scrollPos >= top) active = item;
      });

      links.forEach(function(l) { l.classList.remove('active'); });
      if (active) active.link.classList.add('active');
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Smooth scroll on click
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const id = link.getAttribute('href').slice(1);
        const section = document.getElementById(id);
        if (section) {
          const offset = section.offsetTop - 100;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    });
  }

  // ============================================
  // Mobile Nav Toggle
  // ============================================

  function initMobileNav() {
    const toggle = document.querySelector('[data-mobile-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    if (!toggle || !mobileMenu) return;

    toggle.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // ============================================
  // Initialize Everything
  // ============================================

  function init() {
    initCarousels();
    initTabs();
    initFooterAccordion();
    initSectionNav();
    initMobileNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
