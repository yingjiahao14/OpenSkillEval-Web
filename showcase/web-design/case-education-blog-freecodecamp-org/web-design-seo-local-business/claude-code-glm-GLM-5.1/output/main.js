// === Mobile Menu Toggle ===
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const expanded = mobileNav.classList.contains('active');
    hamburger.setAttribute('aria-expanded', expanded);
  });
}

// === Donation Amount Tabs ===
function initDonationTabs() {
  const tabs = document.querySelectorAll('.amount-tab');
  const descEl = document.querySelector('.donation-desc');
  const sublabelEl = document.querySelector('.donation-sublabel');
  if (!tabs.length || !descEl) return;

  const descriptions = {
    5: 'Your $5 donation will provide 250 hours of learning to people around the world each month.',
    10: 'Your $10 donation will provide 500 hours of learning to people around the world each month.',
    20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
    40: 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.'
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const amount = parseInt(tab.dataset.amount, 10);
      descEl.textContent = descriptions[amount] || descriptions[20];
      if (sublabelEl) {
        sublabelEl.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
      }
    });
  });
}

// === FAQ Accordion ===
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// === Load More Articles ===
function initLoadMore() {
  const btn = document.querySelector('.btn-load-more');
  const grid = document.querySelector('.article-grid');
  if (!btn || !grid) return;

  const moreArticles = [
    { tag: 'CSS', tagLink: '#', title: 'CSS Grid vs Flexbox: When to Use Which Layout Method', author: 'Jessica Wilkins', time: 'a day ago', color: '#1a6b3c' },
    { tag: 'Python', tagLink: '#', title: 'Python List Comprehensions: A Complete Guide with Examples', author: 'Bala Priya C', time: '2 days ago', color: '#306998' },
    { tag: 'React', tagLink: '#', title: 'How to Build a Custom React Hook for Data Fetching', author: 'Zouyeami Mendez', time: '2 days ago', color: '#61dafb' },
    { tag: 'JavaScript', tagLink: '#', title: 'Understanding Closures in JavaScript: A Deep Dive', author: 'Kolade Chris', time: '3 days ago', color: '#f7df1e' }
  ];

  btn.addEventListener('click', () => {
    moreArticles.forEach(article => {
      const card = document.createElement('article');
      card.className = 'article-card';
      card.innerHTML = `
        <div class="card-thumb" style="background:linear-gradient(135deg, ${article.color}22, ${article.color}44)">
          <div class="thumb-placeholder">▶</div>
          <a href="${article.tagLink}" class="tag-label" style="background:${article.color};color:#fff">#${article.tag}</a>
        </div>
        <div class="card-body">
          <h3><a href="#">${article.title}</a></h3>
          <div class="card-meta">
            <div class="author-avatar">${article.author.charAt(0)}</div>
            <span>${article.author}</span>
            <span>·</span>
            <span>${article.time}</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
    btn.style.display = 'none';
  });
}

// Init all on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initDonationTabs();
  initFaqAccordion();
  initLoadMore();
});
