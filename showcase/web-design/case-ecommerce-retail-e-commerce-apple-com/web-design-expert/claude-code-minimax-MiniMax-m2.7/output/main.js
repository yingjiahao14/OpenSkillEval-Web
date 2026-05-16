// Orchard E-Commerce JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initEntertainmentTabs();
  initFooterAccordion();
  initSectionNav();
});

// Carousel functionality
function initCarousels() {
  document.querySelectorAll('.carousel-container').forEach(container => {
    const track = container.querySelector('.carousel-track');
    const prevBtn = container.querySelector('.carousel-nav.prev');
    const nextBtn = container.querySelector('.carousel-nav.next');

    if (!track || !prevBtn || !nextBtn) return;

    const cardWidth = 296; // card width + gap
    const visibleCards = Math.floor(track.offsetWidth / cardWidth) || 3;
    const maxScroll = track.scrollWidth - track.offsetWidth;

    const updateButtons = () => {
      prevBtn.disabled = track.scrollLeft <= 0;
      nextBtn.disabled = track.scrollLeft >= maxScroll - 5;
    };

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateButtons);
    updateButtons();

    // Touch support
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => isDown = false);
    track.addEventListener('mouseup', () => isDown = false);

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX);
    });
  });
}

// Entertainment tabs
function initEntertainmentTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });
}

// Footer accordion for mobile
function initFooterAccordion() {
  document.querySelectorAll('.footer-accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('open');
    });
  });
}

// Section navigation smooth scroll
function initSectionNav() {
  document.querySelectorAll('.section-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);

      if (target) {
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const sectionNavHeight = document.querySelector('.section-nav')?.offsetHeight || 0;
        const offset = navHeight + sectionNavHeight + 20;

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Update active state
        document.querySelectorAll('.section-nav a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
}
