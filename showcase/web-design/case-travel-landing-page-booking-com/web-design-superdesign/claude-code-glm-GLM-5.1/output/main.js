/* ===== StayQuest Interactions ===== */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initCarousel();
  initAccordion();
  initSearchForms();
});

/* ===== Tab Switching ===== */
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
    const nav = tabGroup.querySelector('.tabs-nav');
    const panels = tabGroup.querySelectorAll('.tab-panel');
    if (!nav) return;

    nav.addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;
      const target = btn.dataset.tab;

      nav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(p => {
        p.classList.toggle('active', p.dataset.panel === target);
      });
    });
  });
}

/* ===== Carousel ===== */
function initCarousel() {
  document.querySelectorAll('[data-carousel]').forEach(wrapper => {
    const track = wrapper.querySelector('.property-scroll');
    const leftBtn = wrapper.querySelector('.carousel-arrow--left');
    const rightBtn = wrapper.querySelector('.carousel-arrow--right');
    if (!track) return;

    const scrollAmount = 280;

    if (leftBtn) {
      leftBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }

    if (rightBtn) {
      rightBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  });
}

/* ===== FAQ Accordion ===== */
function initAccordion() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      const parent = item.closest('.faq-list');

      if (parent) {
        parent.querySelectorAll('.faq-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            const otherAnswer = other.querySelector('.faq-answer');
            if (otherAnswer) otherAnswer.style.maxHeight = '0';
          }
        });
      }

      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ===== Search Form Handling ===== */
function initSearchForms() {
  document.querySelectorAll('.search-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const inputs = form.querySelectorAll('input[required], select[required]');
      let valid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.boxShadow = '0 0 0 2px var(--red)';
          setTimeout(() => { input.style.boxShadow = ''; }, 2000);
        }
      });

      if (valid) {
        const btn = form.querySelector('.search-btn');
        const original = btn.textContent;
        btn.textContent = 'Searching...';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 1500);
      }
    });
  });
}
