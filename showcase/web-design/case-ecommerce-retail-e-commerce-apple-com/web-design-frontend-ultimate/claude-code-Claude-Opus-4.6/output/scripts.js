/* Orchard — Shared JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initEntertainmentTabs();
  initFooterAccordion();
  initMobileMenu();
  initSectionNav();
});

/* ========== CAROUSEL ========== */
function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('[data-prev]');
    const nextBtn = carousel.querySelector('[data-next]');

    if (!track) return;

    const scrollAmount = 300;

    function updateButtons() {
      if (prevBtn) prevBtn.disabled = track.scrollLeft <= 5;
      if (nextBtn) nextBtn.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 5;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }

    track.addEventListener('scroll', updateButtons);
    updateButtons();

    const observer = new ResizeObserver(updateButtons);
    observer.observe(track);
  });
}

/* ========== ENTERTAINMENT TABS ========== */
function initEntertainmentTabs() {
  const tabContainer = document.querySelector('.entertainment-tabs');
  if (!tabContainer) return;

  const tabs = tabContainer.querySelectorAll('.entertainment-tab');
  const contents = document.querySelectorAll('.entertainment-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(c => {
        c.classList.remove('active');
        if (c.dataset.content === target) {
          c.classList.add('active');
        }
      });
    });
  });
}

/* ========== FOOTER ACCORDION ========== */
function initFooterAccordion() {
  const isMobile = () => window.innerWidth <= 768;

  document.querySelectorAll('.footer-column h4').forEach(heading => {
    heading.addEventListener('click', () => {
      if (!isMobile()) return;

      const ul = heading.nextElementSibling;
      if (!ul) return;

      const isOpen = heading.classList.contains('open');

      document.querySelectorAll('.footer-column h4').forEach(h => {
        h.classList.remove('open');
        const list = h.nextElementSibling;
        if (list) list.classList.remove('open');
      });

      if (!isOpen) {
        heading.classList.add('open');
        ul.classList.add('open');
      }
    });
  });
}

/* ========== MOBILE MENU ========== */
function initMobileMenu() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ========== STICKY SECTION NAV ========== */
function initSectionNav() {
  const navLinks = document.querySelectorAll('.section-nav-link');
  if (navLinks.length === 0) return;

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        const navHeight = document.querySelector('.top-nav')?.offsetHeight || 52;
        const sectionNavHeight = document.querySelector('.section-nav')?.offsetHeight || 48;
        const offset = navHeight + sectionNavHeight + 16;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  const sections = [];
  navLinks.forEach(link => {
    const id = link.getAttribute('href').substring(1);
    const el = document.getElementById(id);
    if (el) sections.push({ id, el, link });
  });

  if (sections.length === 0) return;

  const updateActive = () => {
    const navHeight = (document.querySelector('.top-nav')?.offsetHeight || 52) +
                      (document.querySelector('.section-nav')?.offsetHeight || 48) + 32;

    let current = sections[0];
    for (const s of sections) {
      if (s.el.getBoundingClientRect().top <= navHeight) {
        current = s;
      }
    }

    navLinks.forEach(l => l.classList.remove('active'));
    current.link.classList.add('active');
  };

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}
