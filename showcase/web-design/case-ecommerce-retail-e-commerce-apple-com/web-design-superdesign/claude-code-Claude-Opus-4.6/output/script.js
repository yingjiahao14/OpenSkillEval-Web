/* Orchard — Shared JavaScript */
document.addEventListener('DOMContentLoaded', () => {

  // ─── Carousel System ───
  document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.carousel-arrow--prev');
    const nextBtn = wrapper.querySelector('.carousel-arrow--next');
    if (!track || !prevBtn || !nextBtn) return;

    let pos = 0;

    function getScrollAmount() {
      const card = track.children[0];
      if (!card) return 300;
      const style = getComputedStyle(track);
      const gap = parseFloat(style.gap) || 20;
      return card.offsetWidth + gap;
    }

    function getMaxScroll() {
      const containerWidth = wrapper.querySelector('.carousel-track-container').offsetWidth;
      return Math.max(0, track.scrollWidth - containerWidth);
    }

    function update() {
      track.style.transform = `translateX(${-pos}px)`;
      prevBtn.disabled = pos <= 0;
      nextBtn.disabled = pos >= getMaxScroll();
    }

    prevBtn.addEventListener('click', () => {
      pos = Math.max(0, pos - getScrollAmount());
      update();
    });

    nextBtn.addEventListener('click', () => {
      pos = Math.min(getMaxScroll(), pos + getScrollAmount());
      update();
    });

    update();
    window.addEventListener('resize', () => { pos = Math.min(pos, getMaxScroll()); update(); });
  });

  // ─── Entertainment Tabs ───
  document.querySelectorAll('.ent-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      const container = tab.closest('.section') || document;

      container.querySelectorAll('.ent-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      container.querySelectorAll('.ent-panel').forEach(p => p.classList.remove('active'));
      const panel = container.querySelector(`[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  // ─── Section Nav (Category Pages) ───
  document.querySelectorAll('.section-nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        const navHeight = (document.querySelector('.top-nav')?.offsetHeight || 0) +
                          (document.querySelector('.section-nav')?.offsetHeight || 0);
        const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }

      document.querySelectorAll('.section-nav__link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Highlight active section on scroll
  const sectionNavLinks = document.querySelectorAll('.section-nav__link');
  if (sectionNavLinks.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sectionNavLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sectionNavLinks.forEach(link => {
      const target = document.getElementById(link.getAttribute('href').slice(1));
      if (target) observer.observe(target);
    });
  }

  // ─── Footer Accordion (Mobile) ───
  document.querySelectorAll('.footer-col h4').forEach(heading => {
    heading.addEventListener('click', () => {
      if (window.innerWidth > 768) return;
      heading.parentElement.classList.toggle('is-open');
    });
  });

  // ─── Mobile Nav Toggle ───
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileClose = document.querySelector('.mobile-nav__close');

  function openMobileNav() {
    mobileNav?.classList.add('is-open');
    mobileOverlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    mobileNav?.classList.remove('is-open');
    mobileOverlay?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openMobileNav);
  mobileClose?.addEventListener('click', closeMobileNav);
  mobileOverlay?.addEventListener('click', closeMobileNav);
});
