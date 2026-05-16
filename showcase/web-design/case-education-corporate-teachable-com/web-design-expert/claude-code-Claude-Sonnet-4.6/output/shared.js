// LearnForge Shared JavaScript

// =================== NAVBAR TOGGLE ===================
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

// =================== FAQ ACCORDION ===================
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
  // Toggle current
  if (!isOpen) item.classList.add('open');
}

// =================== CAROUSEL ===================
const carousels = {};

function initCarousel(trackId, dotsId, visibleCount) {
  const track = document.getElementById(trackId);
  const dotsContainer = document.getElementById(dotsId);
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const total = cards.length;
  const visible = window.innerWidth <= 768 ? 1 : (window.innerWidth <= 1024 ? 2 : visibleCount);
  const pages = Math.max(1, total - visible + 1);

  carousels[trackId] = { current: 0, total, visible, pages };

  // Build dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.onclick = () => goToSlide(trackId, dotsId, i);
      dotsContainer.appendChild(dot);
    }
  }
}

function goToSlide(trackId, dotsId, index) {
  const track = document.getElementById(trackId);
  const dotsContainer = document.getElementById(dotsId);
  if (!track) return;

  const state = carousels[trackId];
  if (!state) return;

  state.current = Math.max(0, Math.min(index, state.pages - 1));

  const cardWidth = track.querySelector('.testimonial-card').offsetWidth + 24; // 24 = gap
  track.style.transform = `translateX(-${state.current * cardWidth}px)`;

  if (dotsContainer) {
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === state.current);
    });
  }
}

function nextSlide(trackId) {
  const state = carousels[trackId];
  if (!state) return;
  const dotsId = trackId.replace('Track', 'Dots');
  goToSlide(trackId, dotsId, (state.current + 1) % state.pages);
}

function prevSlide(trackId) {
  const state = carousels[trackId];
  if (!state) return;
  const dotsId = trackId.replace('Track', 'Dots');
  goToSlide(trackId, dotsId, (state.current - 1 + state.pages) % state.pages);
}

// Recalculate on resize
window.addEventListener('resize', () => {
  Object.keys(carousels).forEach(trackId => {
    const state = carousels[trackId];
    const dotsId = trackId.replace('Track', 'Dots');
    initCarousel(trackId, dotsId, state.visible);
    goToSlide(trackId, dotsId, 0);
  });
});

// =================== SCROLL ANIMATIONS ===================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.feature-card, .product-card, .step-card, .testimonial-card, .pricing-card, .resource-card, .spotlight-card, .why-feature-item, .integration-item').forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(i % 4) * 0.07}s`;
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);

// =================== ACTIVE NAV LINK ===================
(function() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();
