/* ===== ORCHARD SHARED JS ===== */

// Carousel initialization
function initCarousel(wrapper) {
  const track = wrapper.querySelector('.carousel-track');
  const prevBtn = wrapper.querySelector('.carousel-btn-prev');
  const nextBtn = wrapper.querySelector('.carousel-btn-next');
  if (!track) return;

  function updateButtons() {
    if (!prevBtn || !nextBtn) return;
    prevBtn.classList.toggle('disabled', track.scrollLeft <= 4);
    nextBtn.classList.toggle('disabled', track.scrollLeft >= track.scrollWidth - track.clientWidth - 4);
  }

  function scrollBy(amount) {
    track.scrollBy({ left: amount, behavior: 'smooth' });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => scrollBy(-300));
  if (nextBtn) nextBtn.addEventListener('click', () => scrollBy(300));
  track.addEventListener('scroll', updateButtons, { passive: true });
  updateButtons();
}

// Initialize all carousels
document.querySelectorAll('.carousel-wrapper').forEach(initCarousel);

// Footer accordion (mobile)
document.querySelectorAll('.footer-col-title').forEach(title => {
  title.addEventListener('click', () => {
    const col = title.closest('.footer-col');
    if (window.innerWidth <= 768) {
      col.classList.toggle('open');
    }
  });
});

// Section nav smooth scroll
document.querySelectorAll('.section-nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const offset = 96; // nav + section nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Section nav active state on scroll
function updateSectionNav() {
  const links = document.querySelectorAll('.section-nav-link[href^="#"]');
  if (!links.length) return;
  const offset = 120;
  let current = null;
  links.forEach(link => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target && target.getBoundingClientRect().top - offset <= 0) {
      current = link;
    }
  });
  links.forEach(l => l.classList.remove('active'));
  if (current) current.classList.add('active');
  else links[0].classList.add('active');
}
if (document.querySelector('.section-nav')) {
  window.addEventListener('scroll', updateSectionNav, { passive: true });
  updateSectionNav();
}
