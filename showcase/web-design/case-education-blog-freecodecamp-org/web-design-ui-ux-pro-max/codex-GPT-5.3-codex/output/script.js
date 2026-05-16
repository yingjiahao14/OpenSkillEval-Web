const extraArticles = [
  {
    tagClass: 'ai',
    tag: 'AI',
    title: 'The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship',
    author: 'Maya Rodriguez',
    time: '5 hours ago'
  },
  {
    tagClass: 'scraping',
    tag: 'Web Scraping',
    title: 'How to Turn Websites into LLM-Ready Data Using Firecrawl',
    author: 'Noah Bennett',
    time: '8 hours ago'
  },
  {
    tagClass: 'scraping',
    tag: 'Web Scraping',
    title: 'How to Use Python to Build Your Own Web Scraper',
    author: 'Ava Thompson',
    time: '1 day ago'
  }
];

function initMobileMenu() {
  const btn = document.querySelector('[data-menu-btn]');
  const menu = document.querySelector('[data-mobile-nav]');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

function initLoadMore() {
  const btn = document.querySelector('[data-load-more]');
  const grid = document.querySelector('[data-article-grid]');
  if (!btn || !grid) return;
  btn.addEventListener('click', () => {
    extraArticles.forEach((article) => {
      const card = document.createElement('article');
      card.className = 'article-card';
      card.innerHTML = `
        <div class="thumb" role="img" aria-label="${article.title} thumbnail"></div>
        <div class="card-content">
          <span class="tag ${article.tagClass}">${article.tag}</span>
          <h3 class="article-title">${article.title}</h3>
          <div class="author-row">
            <div class="author">
              <div class="avatar" aria-hidden="true"></div>
              <span class="author-name">${article.author}</span>
            </div>
            <span class="time">${article.time}</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
    btn.disabled = true;
    btn.textContent = 'All Articles Loaded';
  }, { once: true });
}

function initDonationTabs() {
  const tabs = document.querySelectorAll('[data-amount]');
  const desc = document.querySelector('[data-donation-desc]');
  if (!tabs.length || !desc) return;
  const map = {
    5: '$5/month funds one tutorial update and keeps core lessons free.',
    10: '$10/month helps maintain curriculum reviews and accessibility improvements.',
    20: '$20/month directly supports new full-length coding course production.',
    40: '$40/month powers mentor moderation, forum infrastructure, and open resources at scale.'
  };
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const amount = tab.getAttribute('data-amount');
      desc.textContent = map[amount] || map[10];
    });
  });
}

function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;
  items.forEach((item) => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initLoadMore();
  initDonationTabs();
  initFaq();
});
