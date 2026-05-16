// StayQuest Interactions

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initMobileMenu();
  initTabs();
  initCarousels();
  initFAQ();
});

// Mobile Menu
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.mobile-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    const icon = btn.querySelector('i');
    if (icon) {
      const isOpen = nav.classList.contains('open');
      icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
      lucide.createIcons();
    }
  });
}

// Tabs
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(container => {
    const buttons = container.querySelectorAll('[data-tab]');
    const panels = container.querySelectorAll('[data-panel]');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = container.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });
}

// Carousels
function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const prev = carousel.parentElement.querySelector('[data-carousel-prev]');
    const next = carousel.parentElement.querySelector('[data-carousel-next]');
    const scrollAmount = 300;
    
    if (prev) {
      prev.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }
    if (next) {
      next.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  });
}

// FAQ Accordion
function initFAQ() {
  document.querySelectorAll('[data-faq]').forEach(faq => {
    const items = faq.querySelectorAll('[data-faq-item]');
    
    items.forEach(item => {
      const question = item.querySelector('[data-faq-question]');
      if (!question) return;
      
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  });
}
