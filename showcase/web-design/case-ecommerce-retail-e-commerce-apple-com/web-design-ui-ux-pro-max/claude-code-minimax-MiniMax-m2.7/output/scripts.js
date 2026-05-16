/* ========================================
   Orchard Store - Interactive Features
   ======================================== */

// Carousel Navigation
function initCarousel(carouselId) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const cards = carousel.querySelectorAll('.carousel-card');

  if (!track || cards.length === 0) return;

  const cardWidth = cards[0].offsetWidth + 16; // including gap

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
  });

  // Update button states
  const updateButtons = () => {
    if (prevBtn) {
      prevBtn.disabled = track.scrollLeft <= 0;
    }
    if (nextBtn) {
      nextBtn.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;
    }
  };

  track.addEventListener('scroll', updateButtons);
  updateButtons();
}

// Initialize all carousels on page
function initAllCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const id = carousel.id;
    if (id) initCarousel(id);
  });
}

// Tab Switching
function initTabs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const tabBtns = container.querySelectorAll('.tab-btn');
  const tabContents = container.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = container.querySelector(`#${targetId}`);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}

// Footer Accordion (Mobile)
function initFooterAccordion() {
  const accordionSections = document.querySelectorAll('.footer-accordion-section');

  accordionSections.forEach(section => {
    const title = section.querySelector('.footer-accordion-title');
    if (title) {
      title.addEventListener('click', () => {
        const wasOpen = section.classList.contains('open');
        // Close all
        accordionSections.forEach(s => s.classList.remove('open'));
        // Toggle current
        if (!wasOpen) {
          section.classList.add('open');
        }
      });
    }
  });
}

// Section Navigation (Sticky Nav)
function initSectionNav() {
  const sectionNav = document.querySelector('.section-nav');
  if (!sectionNav) return;

  const links = sectionNav.querySelectorAll('.section-nav-link');
  const sections = document.querySelectorAll('[data-section]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.dataset.target;
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const offset = 100; // Account for sticky nav
        const top = targetSection.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Highlight active section on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.dataset.section;
        links.forEach(link => {
          link.classList.toggle('active', link.dataset.target === id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
}

// Initialize all features on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initAllCarousels();
  initFooterAccordion();
  initSectionNav();

  // Initialize tab containers
  document.querySelectorAll('.tabs-container').forEach(container => {
    const id = container.id;
    if (id) initTabs(id);
  });
});

// Reinitialize carousels on window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    initAllCarousels();
  }, 250);
});
