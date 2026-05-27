// OpenLearnHub — Shared JavaScript

// ── Mobile Menu Toggle ──
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('is-open');
      const icon = hamburger.querySelector('i');
      if (mobileNav.classList.contains('is-open')) {
        icon.className = 'ri-close-line';
      } else {
        icon.className = 'ri-menu-line';
      }
    });
  }

  // ── Load More Articles (home page) ──
  const loadMoreBtn = document.querySelector('.btn-load-more');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      const hiddenCards = document.querySelectorAll('.article-card.is-hidden');
      let shown = 0;
      hiddenCards.forEach((card) => {
        if (shown < 3) {
          card.classList.remove('is-hidden');
          card.style.display = '';
          shown++;
        }
      });
      // Check if any hidden cards remain
      const remaining = document.querySelectorAll('.article-card.is-hidden');
      if (remaining.length === 0) {
        loadMoreBtn.style.display = 'none';
      }
    });
  }

  // ── Donation Amount Tabs ──
  const amountTabs = document.querySelectorAll('.amount-tab');
  const amountDesc = document.querySelector('.amount-desc');
  const donateSublabel = document.querySelector('.donate-sublabel');

  const descriptions = {
    5: 'Your $5 donation will provide 250 hours of learning to people around the world each month.',
    10: 'Your $10 donation will provide 500 hours of learning to people around the world each month.',
    20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
    40: 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.'
  };

  amountTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      amountTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const amount = tab.dataset.amount;
      if (amountDesc) {
        amountDesc.textContent = descriptions[amount] || descriptions[20];
      }
      if (donateSublabel) {
        donateSublabel.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
      }
    });
  });

  // ── FAQ Accordion ──
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach((i) => i.classList.remove('open'));
        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });
});
