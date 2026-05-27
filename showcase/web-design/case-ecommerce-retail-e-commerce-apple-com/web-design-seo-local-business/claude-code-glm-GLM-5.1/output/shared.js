/* ===== Orchard Shared JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
  initEntertainmentTabs();
  initFooterAccordion();
  initSectionNav();
});

/* ===== Carousel ===== */
function initCarousels() {
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    if (!track) return;

    const prevBtn = wrapper.querySelector('.carousel-btn.prev');
    const nextBtn = wrapper.querySelector('.carousel-btn.next');
    const container = wrapper.querySelector('.carousel-track-container');

    if (!prevBtn || !nextBtn || !container) return;

    const cardWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--carousel-card-width')) || 280;
    const gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--carousel-gap')) || 16;
    const scrollAmount = cardWidth + gap;

    let currentOffset = 0;

    function getMaxOffset() {
      const trackWidth = track.scrollWidth;
      const containerWidth = container.clientWidth;
      return Math.max(0, trackWidth - containerWidth);
    }

    function updateButtons() {
      prevBtn.disabled = currentOffset <= 0;
      nextBtn.disabled = currentOffset >= getMaxOffset();
    }

    function slide(direction) {
      const max = getMaxOffset();
      if (direction === 'next') {
        currentOffset = Math.min(currentOffset + scrollAmount, max);
      } else {
        currentOffset = Math.max(currentOffset - scrollAmount, 0);
      }
      track.style.transform = `translateX(-${currentOffset}px)`;
      updateButtons();
    }

    prevBtn.addEventListener('click', () => slide('prev'));
    nextBtn.addEventListener('click', () => slide('next'));
    updateButtons();

    // Recalculate on resize
    window.addEventListener('resize', () => {
      if (currentOffset > getMaxOffset()) {
        currentOffset = getMaxOffset();
        track.style.transform = `translateX(-${currentOffset}px)`;
      }
      updateButtons();
    });
  });
}

/* ===== Entertainment Tabs ===== */
function initEntertainmentTabs() {
  const tabContainer = document.querySelector('.ent-tabs');
  if (!tabContainer) return;

  const tabs = tabContainer.querySelectorAll('.ent-tab');
  const contents = document.querySelectorAll('.ent-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(c => {
        c.classList.toggle('active', c.dataset.tab === target);
      });
    });
  });
}

/* ===== Footer Accordion (Mobile) ===== */
function initFooterAccordion() {
  let isMobile = window.innerWidth <= 768;
  let listenersAttached = false;

  function attachListeners() {
    if (listenersAttached) return;
    document.querySelectorAll('.footer-col h4').forEach(header => {
      header.addEventListener('click', () => {
        if (window.innerWidth > 768) return;
        header.parentElement.classList.toggle('open');
      });
    });
    listenersAttached = true;
  }

  if (isMobile) attachListeners();

  window.addEventListener('resize', () => {
    const nowMobile = window.innerWidth <= 768;
    if (nowMobile && !listenersAttached) attachListeners();
    if (!nowMobile) {
      document.querySelectorAll('.footer-col').forEach(col => {
        col.classList.remove('open');
      });
    }
    isMobile = nowMobile;
  });
}

/* ===== Section Navigation (Category Pages) ===== */
function initSectionNav() {
  const nav = document.querySelector('.section-nav');
  if (!nav) return;

  const links = nav.querySelectorAll('a');
  const navWrapper = document.querySelector('.section-nav-wrapper');
  const navHeight = navWrapper ? navWrapper.offsetHeight : 52;
  const topNavHeight = 44;
  const offset = topNavHeight + navHeight;

  // Smooth scroll on click
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Active state on scroll
  const sections = [];
  links.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) sections.push({ el, link });
  });

  function updateActive() {
    const scrollY = window.scrollY + offset + 20;
    let current = sections[0];
    sections.forEach(s => {
      if (s.el.offsetTop <= scrollY) current = s;
    });
    links.forEach(l => l.classList.remove('active'));
    if (current) current.link.classList.add('active');
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}
