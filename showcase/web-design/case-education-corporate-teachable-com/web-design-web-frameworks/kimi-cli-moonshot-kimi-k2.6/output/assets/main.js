/**
 * LearnForge — Global JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroTabs();
  initWhyChooseTabs();
  initTestimonialCarousels();
  initFAQAccordions();
  initDemoAccordion();
  initScrollReveal();
});

/* ==========================================
   Mobile Navigation
   ========================================== */
function initMobileNav() {
  const btn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('active');
    if (navLinks) {
      navLinks.style.display = isOpen ? 'flex' : 'none';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '72px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.flexDirection = 'column';
      navLinks.style.background = 'rgba(255,255,255,0.98)';
      navLinks.style.padding = '24px';
      navLinks.style.backdropFilter = 'blur(12px)';
      navLinks.style.borderBottom = '1px solid var(--color-gray-200)';
      navLinks.style.gap = '16px';
      navLinks.style.zIndex = '99';
    }
    if (navCta) {
      navCta.style.display = isOpen ? 'flex' : 'none';
      navCta.style.position = 'absolute';
      navCta.style.top = 'calc(72px + ' + (navLinks ? navLinks.offsetHeight : 0) + 'px)';
      navCta.style.left = '0';
      navCta.style.right = '0';
      navCta.style.flexDirection = 'column';
      navCta.style.background = 'rgba(255,255,255,0.98)';
      navCta.style.padding = '0 24px 24px';
      navCta.style.gap = '12px';
      navCta.style.zIndex = '99';
    }
  });
}

/* ==========================================
   Hero Tabs (Home)
   ========================================== */
function initHeroTabs() {
  const container = document.querySelector('.hero-tabs');
  if (!container) return;

  const tabs = container.querySelectorAll('.hero-tab');
  const panels = document.querySelectorAll('.hero-preview-panel');

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      if (panels[idx]) panels[idx].classList.add('active');
    });
  });
}

/* ==========================================
   Why Choose Us Tabs (Home)
   ========================================== */
function initWhyChooseTabs() {
  const container = document.querySelector('.why-tabs');
  if (!container) return;

  const tabs = container.querySelectorAll('.why-tab');
  const panels = document.querySelectorAll('.why-panel');

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      if (panels[idx]) panels[idx].classList.add('active');
    });
  });
}

/* ==========================================
   Testimonial Carousels
   ========================================== */
function initTestimonialCarousels() {
  document.querySelectorAll('.testimonial-carousel').forEach(carousel => {
    const track = carousel.querySelector('.testimonial-track');
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const prevBtn = carousel.querySelector('.testimonial-prev');
    const nextBtn = carousel.querySelector('.testimonial-next');
    const dots = carousel.querySelectorAll('.testimonial-dot');
    if (!track || slides.length === 0) return;

    let current = 0;

    function goTo(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      current = index;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    // Auto-play
    let autoPlay = setInterval(() => goTo(current + 1), 6000);
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => goTo(current + 1), 6000);
    });
  });
}

/* ==========================================
   FAQ Accordions
   ========================================== */
function initFAQAccordions() {
  document.querySelectorAll('.faq-list').forEach(list => {
    const items = list.querySelectorAll('.faq-item');
    items.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all in this list
        items.forEach(i => i.classList.remove('active'));
        // Open clicked if it wasn't active
        if (!isActive) item.classList.add('active');
      });
    });
  });
}

/* ==========================================
   Product Demo Accordion (Online Courses)
   ========================================== */
function initDemoAccordion() {
  const header = document.querySelector('.demo-header');
  const content = document.querySelector('.demo-content');
  if (!header || !content) return;

  header.addEventListener('click', () => {
    const isActive = header.classList.contains('active');
    header.classList.toggle('active', !isActive);
    content.classList.toggle('active', !isActive);
  });
}

/* ==========================================
   Scroll Reveal
   ========================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}
