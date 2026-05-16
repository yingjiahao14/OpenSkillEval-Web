// StayQuest — Global Interactions

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initCarousels();
  initFAQ();
});

/* Tabs */
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.tab-btn');
    const panels = tabGroup.parentElement?.querySelectorAll('.tab-panel');
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

/* Carousels */
function initCarousels() {
  document.querySelectorAll('.carousel-wrap').forEach(wrap => {
    const carousel = wrap.querySelector('.carousel');
    const prev = wrap.querySelector('.carousel-btn.prev');
    const next = wrap.querySelector('.carousel-btn.next');
    if (!carousel) return;

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

/* FAQ Accordion */
function initFAQ() {
  document.querySelectorAll('.faq-list').forEach(list => {
    const items = list.querySelectorAll('.faq-item');
    items.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  });
}
