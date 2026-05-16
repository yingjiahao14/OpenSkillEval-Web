/* Orchard — Shared Scripts */

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initEntertainmentTabs();
  initFooterAccordion();
  initSectionNav();
});

function initCarousels() {
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.carousel-btn.prev');
    const nextBtn = wrapper.querySelector('.carousel-btn.next');
    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = 340;

    function updateButtons() {
      prevBtn.disabled = track.scrollLeft <= 4;
      nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    }

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    track.addEventListener('scroll', updateButtons);
    updateButtons();
    setTimeout(updateButtons, 100);
  });
}

function initEntertainmentTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const el = document.getElementById(target);
      if (el) el.classList.add('active');
    });
  });
}

function initFooterAccordion() {
  if (window.innerWidth > 767) return;
  document.querySelectorAll('.footer-col h5').forEach(heading => {
    heading.addEventListener('click', () => {
      const list = heading.nextElementSibling;
      if (!list) return;
      const isOpen = heading.classList.contains('open');
      document.querySelectorAll('.footer-col h5.open').forEach(h => {
        h.classList.remove('open');
        if (h.nextElementSibling) h.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) {
        heading.classList.add('open');
        list.classList.add('open');
      }
    });
  });
}

function initSectionNav() {
  const nav = document.querySelector('.section-nav');
  if (!nav) return;
  nav.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const offset = 110;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      nav.querySelectorAll('a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });
  });

  const sections = nav.querySelectorAll('a[href^="#"]');
  if (sections.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          nav.querySelectorAll('a').forEach(a => a.classList.remove('active'));
          const link = nav.querySelector(`a[href="#${entry.target.id}"]`);
          if (link) link.classList.add('active');
        }
      });
    }, { rootMargin: '-120px 0px -60% 0px', threshold: 0 });

    sections.forEach(link => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) observer.observe(target);
    });
  }
}
