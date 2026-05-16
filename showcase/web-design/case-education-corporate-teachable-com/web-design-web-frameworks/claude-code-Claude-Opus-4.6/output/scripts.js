// ===== LearnForge Interactive Scripts =====

document.addEventListener('DOMContentLoaded', () => {
  // ===== Navbar Scroll =====
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ===== Mobile Menu =====
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ===== Hero Tabs (Home page) =====
  const heroTabs = document.querySelectorAll('.hero-tab');
  const heroPreviews = document.querySelectorAll('.hero-preview-content');
  heroTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      heroTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      heroPreviews.forEach(p => {
        p.classList.toggle('active', p.dataset.preview === target);
      });
    });
  });

  // ===== Why Choose Us Tabs =====
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tabContents.forEach(c => {
        c.classList.toggle('active', c.dataset.tab === target);
      });
    });
  });

  // ===== FAQ Accordion =====
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ===== Generic Accordion (e.g. product-demo) =====
  document.querySelectorAll('.accordion-item').forEach(item => {
    const btn = item.querySelector('.accordion-trigger');
    if (!btn) return;
    btn.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });

  // ===== Testimonials Carousel =====
  document.querySelectorAll('.testimonials-section').forEach(section => {
    const track = section.querySelector('.testimonials-track');
    const prev = section.querySelector('.carousel-prev');
    const next = section.querySelector('.carousel-next');
    if (!track) return;
    const scrollAmount = () => Math.min(track.clientWidth * 0.9, 400);
    if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
  });

  // ===== Scroll Animations =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
});
