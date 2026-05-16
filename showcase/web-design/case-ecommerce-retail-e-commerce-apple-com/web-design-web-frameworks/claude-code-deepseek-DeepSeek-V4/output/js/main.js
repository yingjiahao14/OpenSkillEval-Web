/* ===== CAROUSEL ===== */
function initCarousel(trackSelector, prevSelector, nextSelector) {
  const track = document.querySelector(trackSelector);
  const prevBtn = document.querySelector(prevSelector);
  const nextBtn = document.querySelector(nextSelector);
  if (!track || !prevBtn || !nextBtn) return;

  function updateButtons() {
    const tolerance = 4;
    prevBtn.disabled = track.scrollLeft <= tolerance;
    nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - tolerance;
  }

  function scrollBy(direction) {
    const card = track.querySelector('.carousel-card, .help-card, .diff-card, .savings-card, .guide-card, .brand-collab-card, .accessory-card');
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 20;
    const scrollAmount = (cardWidth + gap) * (direction === 'next' ? 1 : -1);
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  prevBtn.addEventListener('click', () => scrollBy('prev'));
  nextBtn.addEventListener('click', () => scrollBy('next'));
  track.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);
  updateButtons();
}

/* ===== ENTERTAINMENT TABS ===== */
function initEntertainmentTabs() {
  const tabs = document.querySelectorAll('.ent-tab');
  const contents = document.querySelectorAll('.ent-content');
  if (!tabs.length || !contents.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });
}

/* ===== FOOTER ACCORDION (MOBILE) ===== */
function initFooterAccordion() {
  const titles = document.querySelectorAll('.footer-col-title');
  if (!titles.length) return;

  function handleAccordion() {
    const isMobile = window.innerWidth <= 768;
    titles.forEach(title => {
      const links = title.nextElementSibling;
      if (!links) return;

      if (isMobile) {
        links.classList.add('footer-collapsible');
        links.style.display = links.classList.contains('open') ? 'block' : 'none';
        title.onclick = function () {
          const isOpen = links.classList.contains('open');
          document.querySelectorAll('.footer-collapsible').forEach(l => {
            l.classList.remove('open');
            l.style.display = 'none';
          });
          document.querySelectorAll('.footer-col-title').forEach(t => t.classList.remove('open'));
          if (!isOpen) {
            links.classList.add('open');
            links.style.display = 'block';
            title.classList.add('open');
          }
        };
      } else {
        links.style.display = '';
        title.onclick = null;
      }
    });
  }

  handleAccordion();
  window.addEventListener('resize', handleAccordion);
}

/* ===== SECTION NAVIGATION (CATEGORY PAGES) ===== */
function initSectionNav() {
  const navLinks = document.querySelectorAll('.section-nav-inner a[data-scroll-to]');
  if (!navLinks.length) return;

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.dataset.scrollTo;
      const target = document.getElementById(targetId);
      if (target) {
        const navHeight = 44 + 44; // main nav + sticky section nav
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Highlight active section on scroll
  function updateActiveLink() {
    const sections = [];
    navLinks.forEach(link => {
      const id = link.dataset.scrollTo;
      const el = document.getElementById(id);
      if (el) sections.push({ id, el, link });
    });

    if (!sections.length) return;

    const navHeight = 44 + 44 + 20;
    let active = sections[0];

    for (const section of sections) {
      const rect = section.el.getBoundingClientRect();
      if (rect.top <= navHeight) {
        active = section;
      }
    }

    navLinks.forEach(l => l.classList.remove('active'));
    active.link.classList.add('active');
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
}

/* ===== MOBILE NAV MENU ===== */
function initMobileNav() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const menu = document.querySelector('.nav-mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.className = menu.classList.contains('open') ? 'ri-close-line' : 'ri-menu-line';
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      const icon = toggle.querySelector('i');
      if (icon) icon.className = 'ri-menu-line';
    });
  });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initEntertainmentTabs();
  initFooterAccordion();
  initSectionNav();

  // Store page carousels
  initCarousel('#latest-carousel', '#latest-prev', '#latest-next');
  initCarousel('#help-carousel', '#help-prev', '#help-next');
  initCarousel('#diff-carousel', '#diff-prev', '#diff-next');
  initCarousel('#accessories-carousel', '#accessories-prev', '#accessories-next');
  initCarousel('#audio-carousel', '#audio-prev', '#audio-next');
  initCarousel('#savings-carousel', '#savings-prev', '#savings-next');

  // Category page carousels
  initCarousel('#laptops-models-carousel', '#laptops-models-prev', '#laptops-models-next');
  initCarousel('#tablets-models-carousel', '#tablets-models-prev', '#tablets-models-next');
  initCarousel('#laptops-guides-carousel', '#laptops-guides-prev', '#laptops-guides-next');
  initCarousel('#tablets-guides-carousel', '#tablets-guides-prev', '#tablets-guides-next');
  initCarousel('#laptops-save-carousel', '#laptops-save-prev', '#laptops-save-next');
  initCarousel('#tablets-save-carousel', '#tablets-save-prev', '#tablets-save-next');
  initCarousel('#laptops-diff-carousel', '#laptops-diff-prev', '#laptops-diff-next');
  initCarousel('#tablets-diff-carousel', '#tablets-diff-prev', '#tablets-diff-next');
  initCarousel('#laptops-accessories-carousel', '#laptops-accessories-prev', '#laptops-accessories-next');
  initCarousel('#tablets-accessories-carousel', '#tablets-accessories-prev', '#tablets-accessories-next');
  initCarousel('#laptops-stores-carousel', '#laptops-stores-prev', '#laptops-stores-next');
  initCarousel('#tablets-stores-carousel', '#tablets-stores-prev', '#tablets-stores-next');

  // Homepage entertainment carousels
  initCarousel('#ent-streaming-track', '#ent-streaming-prev', '#ent-streaming-next');
  initCarousel('#ent-fitness-track', '#ent-fitness-prev', '#ent-fitness-next');
  initCarousel('#ent-gaming-track', '#ent-gaming-prev', '#ent-gaming-next');
  initCarousel('#ent-music-track', '#ent-music-prev', '#ent-music-next');

  // Product icon bar carousel
  initCarousel('#product-icon-track', '#product-icon-prev', '#product-icon-next');
});
