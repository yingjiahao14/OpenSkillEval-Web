// ===== Orchard Shared JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initMobileNav();
  initFooterAccordion();
  initEntertainmentTabs();
  initSectionNav();
  initSmoothScroll();
});

// ===== Carousel Navigation =====
function initCarousels() {
  document.querySelectorAll('.carousel-container').forEach(container => {
    const carousel = container.querySelector('.carousel');
    const leftBtn = container.querySelector('.carousel-arrow-left');
    const rightBtn = container.querySelector('.carousel-arrow-right');
    if (!carousel) return;

    const updateArrows = () => {
      if (!leftBtn || !rightBtn) return;
      const tolerance = 4;
      leftBtn.disabled = carousel.scrollLeft <= tolerance;
      rightBtn.disabled = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - tolerance;
    };

    if (leftBtn) {
      leftBtn.addEventListener('click', () => {
        const card = carousel.querySelector('.carousel-card');
        if (!card) return;
        const scrollAmount = card.offsetWidth + 24; // card width + gap
        carousel.scrollBy({ left: -scrollAmount * 2, behavior: 'smooth' });
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener('click', () => {
        const card = carousel.querySelector('.carousel-card');
        if (!card) return;
        const scrollAmount = card.offsetWidth + 24;
        carousel.scrollBy({ left: scrollAmount * 2, behavior: 'smooth' });
      });
    }

    carousel.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    updateArrows();

    // Touch/swipe detection to update arrows
    carousel.addEventListener('touchend', () => {
      setTimeout(updateArrows, 50);
    });
  });
}

// ===== Mobile Navigation =====
function initMobileNav() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const menu = document.querySelector('.nav-mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    if (menu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu when clicking a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
}

// ===== Footer Accordion (Mobile) =====
function initFooterAccordion() {
  if (window.innerWidth > 768) return;

  document.querySelectorAll('.footer-col').forEach(col => {
    const toggle = col.querySelector('.footer-col-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const wasOpen = col.classList.contains('open');
      // Close all others
      document.querySelectorAll('.footer-col.open').forEach(c => c.classList.remove('open'));
      if (!wasOpen) col.classList.add('open');
    });
  });

  // Re-init on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth <= 768) {
        document.querySelectorAll('.footer-col').forEach(col => {
          if (!col.querySelector('.footer-col-toggle').hasAttribute('data-bound')) {
            initFooterAccordion();
          }
        });
      }
    }, 200);
  });
}

// ===== Entertainment Tabs =====
function initEntertainmentTabs() {
  const tabs = document.querySelectorAll('.entertainment-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('.entertainment-content').forEach(content => {
        content.classList.remove('active');
      });

      const targetContent = document.getElementById(target);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

// ===== Section Navigation (Category Pages) =====
function initSectionNav() {
  const navLinks = document.querySelectorAll('.section-nav-link');
  if (!navLinks.length) return;

  // Smooth scroll to section
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.dataset.target;
      const target = document.getElementById(targetId);
      if (target) {
        const navHeight = 48 + 48; // main nav + section nav
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Highlight active section on scroll
  const sections = [];
  navLinks.forEach(link => {
    const targetId = link.dataset.target;
    const target = document.getElementById(targetId);
    if (target) sections.push({ id: targetId, el: target, link });
  });

  if (!sections.length) return;

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const navHeight = 48 + 60;
      let current = sections[0];

      for (const section of sections) {
        const rect = section.el.getBoundingClientRect();
        if (rect.top <= navHeight + 100) {
          current = section;
        }
      }

      navLinks.forEach(link => link.classList.remove('active'));
      if (current) current.link.classList.add('active');
    }, 50);
  });
}

// ===== Smooth Scroll for anchor links =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = 60;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
