document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initEntertainmentTabs();
  initFooterAccordions();
  initSectionNav();
});

function initCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = 320;

    function updateButtons() {
      prevBtn.disabled = track.scrollLeft <= 5;
      nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
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
  const tabContainer = document.querySelector('.ent-tabs');
  if (!tabContainer) return;

  tabContainer.querySelectorAll('.ent-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabContainer.querySelectorAll('.ent-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const section = tabContainer.closest('.section') || tabContainer.parentElement;
      section.querySelectorAll('.ent-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === target);
      });
    });
  });
}

function initFooterAccordions() {
  document.querySelectorAll('.accordion-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const links = toggle.nextElementSibling;
      const isOpen = links.classList.contains('open');

      document.querySelectorAll('.footer-links.open').forEach(el => el.classList.remove('open'));
      document.querySelectorAll('.accordion-toggle.open').forEach(el => el.classList.remove('open'));

      if (!isOpen) {
        links.classList.add('open');
        toggle.classList.add('open');
      }
    });
  });
}

function initSectionNav() {
  const nav = document.querySelector('.section-nav');
  if (!nav) return;

  const links = nav.querySelectorAll('a[href^="#"]');
  const navHeight = 44;
  const sectionNavHeight = nav.offsetHeight;
  const offset = navHeight + sectionNavHeight + 20;

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  const sections = Array.from(links).map(link => {
    const id = link.getAttribute('href').slice(1);
    return document.getElementById(id);
  }).filter(Boolean);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        let current = '';
        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= offset + 100) {
            current = section.id;
          }
        }
        links.forEach(link => {
          const href = link.getAttribute('href').slice(1);
          link.classList.toggle('active', href === current);
        });
        ticking = false;
      });
      ticking = true;
    }
  });
}
