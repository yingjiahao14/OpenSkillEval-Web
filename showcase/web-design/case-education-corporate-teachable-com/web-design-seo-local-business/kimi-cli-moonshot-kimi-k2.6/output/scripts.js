/* ============================================
   LearnForge — Global Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeroTabs();
  initWhyChooseTabs();
  initTestimonialCarousels();
  initFaqAccordions();
  initScrollReveal();
  initProductDemoAccordion();
});

/* Mobile Navigation */
function initMobileNav() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const menu = document.querySelector('.nav-mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    if (menu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
}

/* Hero Tab Switcher */
function initHeroTabs() {
  const tabContainer = document.querySelector('.hero-tabs');
  if (!tabContainer) return;

  const tabs = tabContainer.querySelectorAll('.hero-tab');
  const panels = document.querySelectorAll('.hero-preview-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panels.forEach(p => {
        p.classList.toggle('active', p.dataset.panel === target);
      });
    });
  });
}

/* Why Choose Us Tabs */
function initWhyChooseTabs() {
  const containers = document.querySelectorAll('.tabs-nav');
  containers.forEach(nav => {
    const buttons = nav.querySelectorAll('.tab-btn');
    const panels = nav.closest('section')?.querySelectorAll('.tab-panel');
    if (!panels) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panels.forEach(p => {
          p.classList.toggle('active', p.dataset.panel === target);
        });
      });
    });
  });
}

/* Testimonial Carousels */
function initTestimonialCarousels() {
  document.querySelectorAll('.testimonials').forEach(carousel => {
    const track = carousel.querySelector('.testimonial-track');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dots = carousel.querySelectorAll('.carousel-dot');
    if (!track) return;

    const cardWidth = () => {
      const card = track.querySelector('.testimonial-card');
      return card ? card.offsetWidth + 24 : 400;
    };

    const scrollByCards = (direction) => {
      track.scrollBy({ left: direction * cardWidth(), behavior: 'smooth' });
    };

    if (prevBtn) prevBtn.addEventListener('click', () => scrollByCards(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollByCards(1));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        track.scrollTo({ left: i * cardWidth(), behavior: 'smooth' });
      });
    });

    const updateDots = () => {
      if (!dots.length) return;
      const idx = Math.round(track.scrollLeft / cardWidth());
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    };

    track.addEventListener('scroll', updateDots, { passive: true });
    updateDots();
  });
}

/* FAQ Accordions */
function initFaqAccordions() {
  document.querySelectorAll('.faq-list').forEach(list => {
    const items = list.querySelectorAll('.faq-item');
    items.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (!question) return;
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  });
}

/* Product Demo Accordion */
function initProductDemoAccordion() {
  const demoSection = document.querySelector('.product-demo');
  if (!demoSection) return;
  const toggle = demoSection.querySelector('.product-demo-toggle');
  const content = demoSection.querySelector('.product-demo-content');
  if (!toggle || !content) return;

  toggle.addEventListener('click', () => {
    const isOpen = demoSection.classList.toggle('open');
    content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0';
  });
}

/* Scroll Reveal */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

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
