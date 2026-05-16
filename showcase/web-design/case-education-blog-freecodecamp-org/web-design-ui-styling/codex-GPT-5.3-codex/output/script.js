const articleData = [
  { tag: '#AI', cls: 'tag-ai', title: 'Shadow AI Explained: Why Employees Are Using AI Behind Your Back', author: 'Manish Shivanandhan', time: '15 hours ago', link: 'tag-ai.html' },
  { tag: '#web scraping', cls: 'tag-scraping', title: 'Traditional Scraping vs AI Scraping: A Practical Guide for Developers and Data Teams', author: 'Joel Olawanle', time: '16 hours ago', link: 'tag-web-scraping.html' },
  { tag: '#Databases', cls: 'tag-db', title: 'How Database Indexes Work – A Practical Guide with PostgreSQL Examples', author: 'iyiola', time: '20 hours ago', link: '#' },
  { tag: '#elasticsearch', cls: 'tag-es', title: 'How to Streamline Search in Web Applications with Elasticsearch', author: 'Oluwatobi', time: '21 hours ago', link: '#' },
  { tag: '#data-engineering', cls: 'tag-de', title: 'How to Build an Open Source Data Lake for Batch Ingestion', author: 'Puneet Singh', time: 'a day ago', link: '#' },
  { tag: '#AI', cls: 'tag-ai', title: 'The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship', author: 'Anita Verma', time: '2 days ago', link: 'tag-ai.html' },
  { tag: '#web scraping', cls: 'tag-scraping', title: 'How to Turn Websites into LLM-Ready Data Using Firecrawl', author: 'Sahil K', time: '3 days ago', link: 'tag-web-scraping.html' },
  { tag: '#web scraping', cls: 'tag-scraping', title: 'How to Use Python to Build Your Own Web Scraper', author: 'Abubakar', time: '4 days ago', link: 'tag-web-scraping.html' },
  { tag: '#AI', cls: 'tag-ai', title: 'GPT-5.4 vs GLM-5: Is Open Source Finally Matching Proprietary AI?', author: 'Lena Park', time: '5 days ago', link: 'tag-ai.html' }
];

function setupMenu() {
  const btn = document.querySelector('[data-menu-btn]');
  const menu = document.querySelector('[data-mobile-nav]');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('open'));
}

function renderCard(item) {
  return `<article class="card"><div class="thumb"></div><div class="card-body"><a class="tag-pill ${item.cls}" href="${item.link}">${item.tag}</a><h3>${item.title}</h3><div class="article-meta"><div class="avatar"></div><span>${item.author}</span><span>· ${item.time}</span></div></div></article>`;
}

function setupLoadMore() {
  const grid = document.querySelector('[data-article-grid]');
  const btn = document.querySelector('[data-load-more]');
  if (!grid || !btn) return;
  let cursor = grid.children.length;
  btn.addEventListener('click', () => {
    const next = articleData.slice(cursor, cursor + 3);
    next.forEach(item => grid.insertAdjacentHTML('beforeend', renderCard(item)));
    cursor += next.length;
    if (cursor >= articleData.length) btn.disabled = true;
  });
}

function setupDonationTabs() {
  const tabs = document.querySelectorAll('[data-amount]');
  const text = document.querySelector('[data-donation-text]');
  if (!tabs.length || !text) return;
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const amount = tab.getAttribute('data-amount');
    const hoursMap = { '5': '250', '10': '500', '20': '1,000', '40': '2,000' };
    text.textContent = `Your $${amount} donation will provide ${hoursMap[amount]} hours of learning to people around the world each month.`;
    const sub = document.querySelector('[data-donation-sub]');
    if (sub) sub.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
  }));
}

function setupFaq() {
  document.querySelectorAll('[data-faq-item]').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q?.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      a.style.maxHeight = open ? a.scrollHeight + 'px' : '0px';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupMenu();
  setupLoadMore();
  setupDonationTabs();
  setupFaq();
});
