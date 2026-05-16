/* ── Carousel logic ── */
function initCarousel(sectionEl) {
  const track = sectionEl.querySelector('.carousel-track');
  const prevBtn = sectionEl.querySelector('.carousel-btn.prev');
  const nextBtn = sectionEl.querySelector('.carousel-btn.next');
  if (!track) return;

  let currentIndex = 0;
  const gap = 14;

  function getCardWidth() {
    const card = track.children[0];
    return card ? card.offsetWidth + gap : 234;
  }

  function getVisibleCount() {
    const wrap = sectionEl.querySelector('.carousel-track-wrap');
    return Math.floor((wrap.offsetWidth - 104) / getCardWidth());
  }

  function totalCards() {
    return track.children.length;
  }

  function update() {
    const cardW = getCardWidth();
    track.style.transform = `translateX(-${currentIndex * cardW}px)`;
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex >= totalCards() - getVisibleCount();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) { currentIndex--; update(); }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const max = totalCards() - getVisibleCount();
      if (currentIndex < max) { currentIndex++; update(); }
    });
  }

  update();
  window.addEventListener('resize', () => {
    if (currentIndex > totalCards() - getVisibleCount()) {
      currentIndex = Math.max(0, totalCards() - getVisibleCount());
    }
    update();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel-section').forEach(initCarousel);

  /* ── Footer accordion on mobile ── */
  if (window.innerWidth <= 900) {
    document.querySelectorAll('.footer-col-title').forEach(title => {
      title.addEventListener('click', function () {
        const ul = this.nextElementSibling;
        if (!ul) return;
        this.classList.toggle('open');
        ul.classList.toggle('open');
      });
    });
  }

  /* ── Sticky section nav active state ── */
  const sectionNavLinks = document.querySelectorAll('.section-nav-link[data-target]');
  if (sectionNavLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sectionNavLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.target === id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sectionNavLinks.forEach(link => {
      const target = document.getElementById(link.dataset.target);
      if (target) observer.observe(target);
    });

    sectionNavLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(link.dataset.target);
        if (target) {
          const offset = 48 + 43; // global-nav + section-nav heights
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }
});
