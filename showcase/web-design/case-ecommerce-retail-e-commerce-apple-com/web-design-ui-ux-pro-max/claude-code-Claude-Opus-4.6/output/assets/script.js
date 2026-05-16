// Carousel: scroll by card width
function initCarousels() {
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.carousel-prev');
    const nextBtn = wrapper.querySelector('.carousel-next');
    if (!track || !prevBtn || !nextBtn) return;

    const getScrollAmount = () => {
      const firstCard = track.firstElementChild;
      if (!firstCard) return 320;
      const style = window.getComputedStyle(track);
      const gap = parseInt(style.gap) || 20;
      return firstCard.getBoundingClientRect().width + gap;
    };

    const updateButtons = () => {
      prevBtn.disabled = track.scrollLeft <= 4;
      nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();
  });
}

// Entertainment tabs
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(container => {
    const tabs = container.querySelectorAll('.ent-tab');
    const panels = container.querySelectorAll('.ent-panel');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.toggle('active', t === tab));
        panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
      });
    });
  });
}

// Footer accordion (mobile)
function initFooterAccordion() {
  document.querySelectorAll('.footer-col h5').forEach(header => {
    header.addEventListener('click', () => {
      if (window.innerWidth > 768) return;
      header.parentElement.classList.toggle('open');
    });
  });
}

// Nav hamburger toggle
function initNavToggle() {
  const btn = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
}

// Sticky section nav active state
function initSectionNav() {
  const nav = document.querySelector('.section-nav');
  if (!nav) return;
  const links = nav.querySelectorAll('a[href^="#"]');
  if (!links.length) return;

  const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-100px 0px -60% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initTabs();
  initFooterAccordion();
  initNavToggle();
  initSectionNav();
});
