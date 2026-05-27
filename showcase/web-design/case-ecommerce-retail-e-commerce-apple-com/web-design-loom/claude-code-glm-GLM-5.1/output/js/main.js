/* ===== CAROUSEL LOGIC ===== */
function initCarousels() {
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const leftBtn = wrapper.querySelector('.carousel-arrow.left');
    const rightBtn = wrapper.querySelector('.carousel-arrow.right');
    if (!track) return;

    const scrollAmount = 300;

    function updateArrows() {
      if (leftBtn) leftBtn.disabled = track.scrollLeft <= 5;
      if (rightBtn) rightBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
    }

    if (leftBtn) leftBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    if (rightBtn) rightBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateArrows);
    updateArrows();
  });
}

/* ===== ENTERTAINMENT TABS ===== */
function initTabs() {
  document.querySelectorAll('.tab-nav').forEach(nav => {
    const buttons = nav.querySelectorAll('.tab-btn');
    const section = nav.closest('.entertainment-section') || nav.parentElement;
    const panels = section.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        const panel = section.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

/* ===== STICKY SECTION NAV ===== */
function initStickyNav() {
  const nav = document.querySelector('.sticky-section-nav');
  if (!nav) return;
  const links = nav.querySelectorAll('a');
  const sections = [];

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) sections.push({ link, el });
    }
  });

  function updateActive() {
    const scrollY = window.scrollY + 120;
    let current = sections[0];
    sections.forEach(s => {
      if (s.el.offsetTop <= scrollY) current = s;
    });
    links.forEach(l => l.classList.remove('active'));
    if (current) current.link.classList.add('active');
  }

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}

/* ===== FOOTER ACCORDION ===== */
function initFooterAccordion() {
  if (window.innerWidth > 734) return;
  document.querySelectorAll('.footer-nav-col h4').forEach(header => {
    header.addEventListener('click', () => {
      const col = header.parentElement;
      col.classList.toggle('open');
    });
  });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initTabs();
  initStickyNav();
  initFooterAccordion();
});
