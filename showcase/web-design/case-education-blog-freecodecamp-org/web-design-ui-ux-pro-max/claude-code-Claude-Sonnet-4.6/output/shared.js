/* shared.js — OpenLearnHub */

// ── Hamburger menu toggle ──
(function () {
  const btn = document.querySelector('.hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      btn.focus();
    }
  });
})();

// ── FAQ Accordion ──
(function () {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  });
})();

// ── Donation amount tabs ──
(function () {
  const amounts = {
    5:  'Your $5 donation will provide 250 hours of learning to people around the world each month.',
    10: 'Your $10 donation will provide 500 hours of learning to people around the world each month.',
    20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
    40: 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.',
  };
  const tabs = document.querySelectorAll('.donation-tab');
  const desc = document.getElementById('donation-desc');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-pressed', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-pressed', 'true');
      const val = parseInt(tab.dataset.amount, 10);
      if (desc) desc.textContent = amounts[val] || '';
      // Update sub-label
      const sub = document.getElementById('donation-sublabel');
      if (sub) sub.textContent = `Donating $${val} / month: edit amount · Secure donation`;
    });
  });
})();
