// Orchard — Shared JavaScript

// Carousel navigation
function initCarousels() {
  document.querySelectorAll('.carousel-stage').forEach(stage => {
    const track = stage.querySelector('.carousel-track');
    const prevBtn = stage.querySelector('.carousel-prev');
    const nextBtn = stage.querySelector('.carousel-next');
    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = () => {
      const card = track.querySelector('.carousel-card, .help-card, .diff-card, .guide-card, .cat-product-card, .ent-card, .special-store-card');
      if (!card) return 300;
      const cardWidth = card.offsetWidth;
      const gap = parseInt(getComputedStyle(track).gap) || 20;
      return cardWidth + gap;
    };

    function updateButtons() {
      const tolerance = 4;
      prevBtn.disabled = track.scrollLeft <= tolerance;
      nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - tolerance;
    }

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateButtons, { passive: true });
    updateButtons();

    // Update on resize
    window.addEventListener('resize', updateButtons, { passive: true });
  });
}

// Standalone horizontal scrollers (no carousel wrapper)
function initScrollers() {
  document.querySelectorAll('[data-scroll="auto"]').forEach(track => {
    // These are just scrollable containers, no buttons needed
  });
}

// Entertainment tabs
function initTabs() {
  const tabsNav = document.querySelector('.tabs-nav');
  if (!tabsNav) return;

  const buttons = tabsNav.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(p => p.classList.remove('active'));
      const target = btn.dataset.tab;
      const panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });
}

// Footer accordion on mobile
function initFooterAccordion() {
  const isMobile = () => window.innerWidth <= 768;
  const footerHeaders = document.querySelectorAll('.footer-col h4');

  function setupAccordion() {
    footerHeaders.forEach(h => {
      if (isMobile()) {
        if (!h.hasListener) {
          h.addEventListener('click', function() {
            const ul = this.nextElementSibling;
            const isOpen = ul.classList.contains('open');
            // Close all
            footerHeaders.forEach(fh => {
              fh.classList.remove('open');
              fh.nextElementSibling?.classList.remove('open');
            });
            if (!isOpen) {
              this.classList.add('open');
              ul.classList.add('open');
            }
          });
          h.hasListener = true;
        }
      } else {
        // Ensure all are visible on desktop
        footerHeaders.forEach(fh => {
          fh.classList.remove('open');
          const ul = fh.nextElementSibling;
          if (ul) ul.classList.remove('open');
        });
      }
    });
  }

  setupAccordion();
  window.addEventListener('resize', setupAccordion);
}

// Mobile nav toggle
function initMobileNav() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
    });
  });
}

// Section nav smooth scroll & active state
function initSectionNav() {
  const nav = document.querySelector('.section-nav');
  if (!nav) return;

  const links = nav.querySelectorAll('.section-nav-link');

  links.forEach(link => {
    link.addEventListener('click', () => {
      const targetId = link.dataset.target;
      const target = document.getElementById(targetId);
      if (target) {
        const navHeight = 48 + (nav.offsetHeight || 44);
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Highlight active section on scroll
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveSectionNav(links);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

function updateActiveSectionNav(links) {
  const navHeight = 48 + 48; // top nav + section nav
  let currentId = null;

  links.forEach(link => {
    const targetId = link.dataset.target;
    const target = document.getElementById(targetId);
    if (target) {
      const rect = target.getBoundingClientRect();
      if (rect.top <= navHeight + 100) {
        currentId = targetId;
      }
    }
  });

  links.forEach(link => {
    link.classList.toggle('active', link.dataset.target === currentId);
  });
}

// Highlight current page in nav
function highlightCurrentNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && (href === 'index.html' || href === '/' || href === './'))) {
      a.classList.add('active');
    }
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initTabs();
  initFooterAccordion();
  initMobileNav();
  initSectionNav();
  highlightCurrentNav();
});
