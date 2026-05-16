// StayQuest - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initCarousels();
  initFAQ();
  initSearchForms();
});

// Tabs
function initTabs() {
  document.querySelectorAll('.tabs-nav').forEach(nav => {
    const buttons = nav.querySelectorAll('.tab-btn');
    const panels = nav.closest('.tabs-container')?.querySelectorAll('.tab-panel');
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

// Carousels
function initCarousels() {
  document.querySelectorAll('.carousel-wrap').forEach(wrap => {
    const carousel = wrap.querySelector('.carousel');
    const prev = wrap.querySelector('.carousel-arrow.prev');
    const next = wrap.querySelector('.carousel-arrow.next');
    if (!carousel) return;

    const scrollAmount = 320;
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
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all siblings in same FAQ container
      const container = item.closest('.faq-list');
      if (container) {
        container.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      }
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// Search Forms (basic validation)
function initSearchForms() {
  document.querySelectorAll('.search-form form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const destination = form.querySelector('[name="destination"]')?.value.trim();
      if (!destination) {
        alert('Please enter a destination');
        return;
      }
      // Simulate search
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Searching...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        alert(`Searching for stays in ${destination}...`);
      }, 800);
    });
  });
}
