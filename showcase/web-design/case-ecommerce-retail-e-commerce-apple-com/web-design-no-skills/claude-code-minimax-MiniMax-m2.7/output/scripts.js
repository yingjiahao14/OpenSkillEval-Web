/* === Orchard JavaScript === */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize carousels
  initCarousels();

  // Initialize entertainment tabs
  initEntertainmentTabs();

  // Initialize footer accordion
  initFooterAccordion();

  // Initialize section navigation
  initSectionNav();
});

/* === Carousel Functionality === */
function initCarousels() {
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.carousel-nav.prev');
    const nextBtn = wrapper.querySelector('.carousel-nav.next');

    if (!track || !prevBtn || !nextBtn) return;

    const updateNavState = () => {
      prevBtn.classList.toggle('disabled', track.scrollLeft <= 0);
      nextBtn.classList.toggle('disabled', track.scrollLeft >= track.scrollWidth - track.clientWidth - 1);
    };

    prevBtn.addEventListener('click', () => {
      const scrollAmount = track.clientWidth * 0.75;
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      const scrollAmount = track.clientWidth * 0.75;
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateNavState);
    updateNavState();
  });
}

/* === Entertainment Tabs === */
function initEntertainmentTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* === Footer Accordion (Mobile) === */
function initFooterAccordion() {
  const footerSections = document.querySelectorAll('.footer-section');

  footerSections.forEach(section => {
    const toggle = section.querySelector('.mobile-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const isExpanded = section.classList.contains('expanded');

      // Close all other sections
      footerSections.forEach(s => s.classList.remove('expanded'));

      // Toggle current section
      if (!isExpanded) {
        section.classList.add('expanded');
      }
    });
  });
}

/* === Section Navigation (Smooth Scroll) === */
function initSectionNav() {
  const sectionNavLinks = document.querySelectorAll('.section-nav a');

  sectionNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const navHeight = document.querySelector('.nav')?.offsetHeight || 44;
        const sectionNavHeight = document.querySelector('.section-nav')?.offsetHeight || 0;
        const offsetTop = targetSection.offsetTop - navHeight - sectionNavHeight - 20;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Update active state
        sectionNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // Update active state on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('[id]');
    const navHeight = document.querySelector('.nav')?.offsetHeight || 44;
    const sectionNavHeight = document.querySelector('.section-nav')?.offsetHeight || 0;

    let currentSection = null;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= navHeight + sectionNavHeight + 100) {
        currentSection = section.id;
      }
    });

    if (currentSection) {
      sectionNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${currentSection}`);
      });
    }
  });
}

/* === Product Icon Bar Navigation === */
function initProductBar() {
  const productLinks = document.querySelectorAll('.category-item[data-href]');

  productLinks.forEach(link => {
    link.addEventListener('click', () => {
      const href = link.dataset.href;
      if (href) {
        window.location.href = href;
      }
    });
  });
}