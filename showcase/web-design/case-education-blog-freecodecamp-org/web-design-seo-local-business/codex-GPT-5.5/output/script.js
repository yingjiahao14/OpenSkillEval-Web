const articles = [
  { tag: '#AI', cls: 'ai', title: 'Shadow AI Explained: Why Employees Are Using AI Behind Your Back', author: 'Manish Shivanandhan', time: '15 hours ago', icon: 'AI', c1: '#0a0a23', c2: '#6d28d9', href: 'tag-ai.html' },
  { tag: '#web scraping', cls: 'scraping', title: 'Traditional Scraping vs AI Scraping: A Practical Guide for Developers and Data Teams', author: 'Joel Olawanle', time: '16 hours ago', icon: '{}', c1: '#064e3b', c2: '#14b8a6', href: 'tag-web-scraping.html' },
  { tag: '#Databases', cls: 'db', title: 'How Database Indexes Work – A Practical Guide with PostgreSQL Examples', author: 'iyiola', time: '20 hours ago', icon: 'DB', c1: '#172554', c2: '#60a5fa', href: '#' },
  { tag: '#elasticsearch', cls: 'search-tag', title: 'How to Streamline Search in Web Applications with Elasticsearch', author: 'Oluwatobi', time: '21 hours ago', icon: '⌕', c1: '#7c2d12', c2: '#fb923c', href: '#' },
  { tag: '#data-engineering', cls: 'data', title: 'How to Build an Open Source Data Lake for Batch Ingestion', author: 'Puneet Singh', time: 'a day ago', icon: 'Δ', c1: '#14532d', c2: '#22c55e', href: '#' }
];
const moreArticles = [
  { tag: '#JavaScript', cls: '', title: 'How Closures Power Modern JavaScript Applications', author: 'Sara Patel', time: '2 days ago', icon: 'JS', c1: '#3f2b00', c2: '#feac32', href: '#' },
  { tag: '#Python', cls: 'db', title: 'Build a Clean Data Pipeline with Python Generators', author: 'Ibrahim Ade', time: '2 days ago', icon: 'PY', c1: '#1e3a8a', c2: '#93c5fd', href: '#' },
  { tag: '#React', cls: 'scraping', title: 'React Server Components Explained with Practical Examples', author: 'Maya Chen', time: '3 days ago', icon: '⚛', c1: '#0f172a', c2: '#38bdf8', href: '#' }
];
const donationCopy = {
  5: 'Your $5 donation will provide 250 hours of learning to people around the world each month.',
  10: 'Your $10 donation will provide 500 hours of learning to people around the world each month.',
  20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
  40: 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.'
};
function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase() || 'OL';
}
function articleCard(item) {
  return `<article class="article-card">
    <a href="${item.href}" class="thumb" style="--c1:${item.c1};--c2:${item.c2}" data-icon="${item.icon}" aria-label="Read ${item.title}"></a>
    <div class="card-body">
      <a class="tag ${item.cls}" href="${item.href}">${item.tag}</a>
      <h3><a href="${item.href}">${item.title}</a></h3>
      <div class="author"><span class="avatar">${initials(item.author)}</span><span>${item.author}</span><span class="meta-dot">${item.time}</span></div>
    </div>
  </article>`;
}
function setupMenus() {
  document.querySelectorAll('[data-menu-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      const nav = document.getElementById(button.getAttribute('aria-controls'));
      const open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });
}
function setupLoadMore() {
  const button = document.querySelector('[data-load-more]');
  const grid = document.querySelector('[data-article-grid]');
  if (!button || !grid) return;
  button.addEventListener('click', () => {
    grid.insertAdjacentHTML('beforeend', moreArticles.map(articleCard).join(''));
    button.textContent = 'More articles loaded';
    button.disabled = true;
  });
}
function setupDonation() {
  const tabs = document.querySelectorAll('[data-amount]');
  const desc = document.querySelector('[data-donation-desc]');
  const label = document.querySelector('[data-donation-label]');
  if (!tabs.length || !desc || !label) return;
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const amount = tab.dataset.amount;
    tabs.forEach(each => each.classList.toggle('active', each === tab));
    desc.textContent = donationCopy[amount];
    label.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
  }));
}
function setupFaq() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!button || !answer) return;
    button.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      answer.style.maxHeight = open ? `${answer.scrollHeight}px` : '0px';
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  setupMenus();
  setupLoadMore();
  setupDonation();
  setupFaq();
});
