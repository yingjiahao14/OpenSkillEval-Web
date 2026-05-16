/* ============================================
   Orchard — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initTabs();
  initFooterAccordion();
});

/* ---------- Carousels ---------- */
function initCarousels() {
  document.querySelectorAll('.carousel-section').forEach(section => {
    const track = section.querySelector('.carousel-track');
    const prevBtn = section.querySelector('.carousel-btn.prev');
    const nextBtn = section.querySelector('.carousel-btn.next');
    if (!track || !prevBtn || !nextBtn) return;

    const cardWidth = track.querySelector('.carousel-card')?.offsetWidth || 320;
    const gap = 16;
    const scrollAmount = cardWidth + gap;

    function updateButtons() {
      prevBtn.disabled = track.scrollLeft <= 1;
      nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    }

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateButtons, { passive: true });
    updateButtons();
  });
}

/* ---------- Entertainment Tabs ---------- */
function initTabs() {
  const tabNavs = document.querySelectorAll('.tab-nav');
  tabNavs.forEach(nav => {
    const buttons = nav.querySelectorAll('.tab-btn');
    const panels = nav.parentElement.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panels.forEach(p => {
          p.classList.toggle('active', p.dataset.panel === target);
        });
      });
    });
  });
}

/* ---------- Footer Accordion ---------- */
function initFooterAccordion() {
  const isMobile = () => window.innerWidth <= 768;

  document.querySelectorAll('.footer-column').forEach(col => {
    const heading = col.querySelector('h4');
    if (!heading) return;

    heading.addEventListener('click', () => {
      if (!isMobile()) return;
      col.classList.toggle('open');
    });
  });
}
