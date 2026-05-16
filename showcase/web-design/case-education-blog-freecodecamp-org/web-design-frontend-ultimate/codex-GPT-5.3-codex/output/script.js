const EXTRA_HOME_ARTICLES = [
  {
    tag: 'AI', tagClass: 'ai', title: 'The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship', author: 'Nia Brooks', time: '3 days ago'
  },
  {
    tag: 'Web Scraping', tagClass: 'scraping', title: 'How to Turn Websites into LLM-Ready Data Using Firecrawl', author: 'Evan Scott', time: '4 days ago'
  },
  {
    tag: 'Python', tagClass: 'db', title: 'How to Use Python to Build Your Own Web Scraper', author: 'Ari Khan', time: '6 days ago'
  }
];

function wireMobileMenu() {
  const btn = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('open'));
}

function wireLoadMore() {
  const button = document.querySelector('[data-load-more]');
  const grid = document.querySelector('[data-home-grid]');
  if (!button || !grid) return;
  let loaded = false;
  button.addEventListener('click', () => {
    if (loaded) return;
    EXTRA_HOME_ARTICLES.forEach((article) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="thumb"></div>
        <div class="card-body">
          <span class="tag ${article.tagClass}">${article.tag}</span>
          <h3>${article.title}</h3>
          <div class="author-row">
            <span class="avatar"></span>
            <span>${article.author}</span>
            <span>• ${article.time}</span>
          </div>
        </div>`;
      grid.appendChild(card);
    });
    loaded = true;
    button.textContent = 'All articles loaded';
    button.disabled = true;
    button.style.opacity = '0.7';
  });
}

function wireDonationTabs() {
  const tabs = document.querySelectorAll('[data-amount]');
  const target = document.querySelector('[data-amount-description]');
  if (!tabs.length || !target) return;
  const descriptions = {
    '5': '$5 helps cover bandwidth costs so tutorials stay fast and free.',
    '10': '$10 funds curriculum maintenance and keeps certifications up to date.',
    '20': '$20 supports new beginner-friendly lessons for global learners.',
    '40': '$40 helps sustain full course production and moderation efforts.'
  };
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const amount = tab.getAttribute('data-amount');
      target.textContent = descriptions[amount] || '';
    });
  });
}

function wireFaqAccordion() {
  document.querySelectorAll('[data-faq-q]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      if (!item) return;
      item.classList.toggle('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  wireMobileMenu();
  wireLoadMore();
  wireDonationTabs();
  wireFaqAccordion();
});
