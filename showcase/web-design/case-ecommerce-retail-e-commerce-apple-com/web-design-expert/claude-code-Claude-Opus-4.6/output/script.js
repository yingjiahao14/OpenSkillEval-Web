/* ============================================================
   ORCHARD — Shared JavaScript
   Carousels, Tabs, Accordion, Sticky Nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initEntertainmentTabs();
  initFooterAccordion();
  initSectionNav();
});

/* --- Carousel --- */
function initCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-arrow--prev');
    const nextBtn = carousel.querySelector('.carousel-arrow--next');
    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = () => {
      const card = track.querySelector('.product-card, .help-card, .diff-card, .guide-card, .save-card, .offer-card');
      if (!card) return 300;
      return card.offsetWidth + parseInt(getComputedStyle(track).gap || 16);
    };

    const updateArrows = () => {
      prevBtn.disabled = track.scrollLeft <= 2;
      nextBtn.disabled = track.scrollLeft + track.offsetWidth >= track.scrollWidth - 2;
    };

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();

    new ResizeObserver(updateArrows).observe(track);
  });
}

/* --- Entertainment Tabs --- */
function initEntertainmentTabs() {
  const tabs = document.querySelectorAll('.ent-tab');
  const panels = document.querySelectorAll('.ent-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
}

/* --- Footer Accordion (mobile) --- */
function initFooterAccordion() {
  document.querySelectorAll('.footer-col h4').forEach(heading => {
    heading.addEventListener('click', () => {
      if (window.innerWidth > 734) return;
      const col = heading.parentElement;
      col.classList.toggle('open');
    });
  });
}

/* --- Sticky Section Navigation --- */
function initSectionNav() {
  const nav = document.querySelector('.section-nav');
  if (!nav) return;

  const links = nav.querySelectorAll('a[href^="#"]');
  const sections = [];

  links.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if (section) sections.push({ link, section });
  });

  if (!sections.length) return;

  const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || 48) + nav.offsetHeight + 20;

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - offset + 10;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  const updateActive = () => {
    let current = sections[0];
    for (const s of sections) {
      if (s.section.getBoundingClientRect().top <= offset + 40) current = s;
    }
    links.forEach(l => l.classList.remove('active'));
    if (current) current.link.classList.add('active');
  };

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}
