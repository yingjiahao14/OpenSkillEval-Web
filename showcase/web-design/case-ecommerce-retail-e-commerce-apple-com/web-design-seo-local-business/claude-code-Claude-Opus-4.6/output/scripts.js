/* Orchard — Interactions */
document.addEventListener('DOMContentLoaded', () => {

  /* Carousel scroll */
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const prev = wrapper.querySelector('.carousel-btn.prev');
    const next = wrapper.querySelector('.carousel-btn.next');
    if (!track || !prev || !next) return;

    const scrollAmount = 300;

    const updateButtons = () => {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    };

    prev.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateButtons);
    updateButtons();
    setTimeout(updateButtons, 100);
  });

  /* Entertainment tabs */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabGroup = btn.closest('.entertainment-section') || btn.closest('.tab-group');
      if (!tabGroup) return;
      tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      tabGroup.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = tabGroup.querySelector(`#${btn.dataset.tab}`);
      if (target) target.classList.add('active');
    });
  });

  /* Section nav smooth scroll + active highlight */
  document.querySelectorAll('.section-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelectorAll('.section-nav a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  /* Section nav scroll spy */
  const secNav = document.querySelector('.section-nav');
  if (secNav) {
    const links = secNav.querySelectorAll('a');
    const sections = [];
    links.forEach(link => {
      const id = link.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) sections.push({ el, link });
    });

    window.addEventListener('scroll', () => {
      const offset = 160;
      let current = sections[0];
      sections.forEach(s => {
        if (s.el.getBoundingClientRect().top <= offset) current = s;
      });
      links.forEach(l => l.classList.remove('active'));
      if (current) current.link.classList.add('active');
    });
  }

  /* Footer accordion (mobile) */
  document.querySelectorAll('.footer-col h4').forEach(heading => {
    heading.addEventListener('click', () => {
      const col = heading.parentElement;
      if (window.innerWidth <= 768) {
        col.classList.toggle('open');
      }
    });
  });

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.top-nav nav');
  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      toggle.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
    });
  }
});
