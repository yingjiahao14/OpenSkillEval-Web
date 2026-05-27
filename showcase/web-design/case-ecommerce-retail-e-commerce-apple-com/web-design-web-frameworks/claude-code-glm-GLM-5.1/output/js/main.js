/* ========================================
   Orchard — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initEntertainmentTabs();
  initFooterAccordion();
  initMobileNav();
  initSectionNav();
});

/* --- Carousel --- */
function initCarousels() {
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const leftArrow = wrapper.querySelector('.carousel-arrow-left');
    const rightArrow = wrapper.querySelector('.carousel-arrow-right');
    if (!track || !leftArrow || !rightArrow) return;

    const scrollAmount = () => {
      const card = track.querySelector('.carousel-card, .help-card, .diff-card, .accessory-card, .audio-card, .model-card, .savings-card, .guide-card, .setup-card');
      return card ? card.offsetWidth + 12 : 300;
    };

    const updateArrows = () => {
      const { scrollLeft, scrollWidth, clientWidth } = track;
      leftArrow.classList.toggle('hidden', scrollLeft <= 5);
      rightArrow.classList.toggle('hidden', scrollLeft + clientWidth >= scrollWidth - 5);
    };

    leftArrow.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    rightArrow.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();

    // Re-check on resize
    window.addEventListener('resize', updateArrows);
  });
}

/* --- Entertainment Tabs --- */
function initEntertainmentTabs() {
  const tabContainer = document.querySelector('.entertainment-section');
  if (!tabContainer) return;

  const buttons = tabContainer.querySelectorAll('.tab-btn');
  const contents = tabContainer.querySelectorAll('.tab-content');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      buttons.forEach(b => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = tabContainer.querySelector(`.tab-content[data-tab="${target}"]`);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}

/* --- Footer Accordion --- */
function initFooterAccordion() {
  const isMobile = () => window.innerWidth <= 834;

  document.querySelectorAll('.footer-col h5').forEach(heading => {
    heading.addEventListener('click', () => {
      if (!isMobile()) return;
      const col = heading.closest('.footer-col');
      col.classList.toggle('open');
    });
  });
}

/* --- Mobile Nav --- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const icon = toggle.querySelector('i');
    if (links.classList.contains('open')) {
      icon.className = 'ri-close-line';
    } else {
      icon.className = 'ri-menu-line';
    }
  });

  // Close menu when clicking a link
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      const icon = toggle.querySelector('i');
      icon.className = 'ri-menu-line';
    });
  });
}

/* --- Sticky Section Navigation (Category Pages) --- */
function initSectionNav() {
  const nav = document.querySelector('.section-nav');
  if (!nav) return;

  const links = nav.querySelectorAll('a');
  const sections = [];

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) sections.push({ link, section });
    }
  });

  // Click handler for smooth scroll
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Scroll spy
  const onScroll = () => {
    const scrollY = window.scrollY + 120;
    let current = sections[0];

    sections.forEach(({ link, section }) => {
      if (section.offsetTop <= scrollY) {
        current = { link, section };
      }
    });

    links.forEach(l => l.classList.remove('active'));
    if (current) current.link.classList.add('active');
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
