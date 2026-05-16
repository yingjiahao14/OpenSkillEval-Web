
const extraArticles = [
  { tag: '#JavaScript', title: 'How to Structure Modern JavaScript Projects Without Losing Momentum', author: 'OpenLearnHub Staff', time: '2 days ago', tone: 'code', tagClass: 'blue' },
  { tag: '#Python', title: 'Python Automation Patterns Every Data Team Should Know', author: 'Amina Yusuf', time: '3 days ago', tone: 'data', tagClass: 'blue' },
  { tag: '#React', title: 'Build Accessible React Components with Practical Design Constraints', author: 'Chris Mendez', time: '4 days ago', tone: 'searchy', tagClass: '' }
];

function initials(name) {
  if (!name || name === '—') return 'OL';
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase();
}

function articleCard(article) {
  const href = article.tag.toLowerCase().includes('scraping') ? 'tag-web-scraping.html' : article.tag.toLowerCase().includes('ai') ? 'tag-ai.html' : '#';
  return `
    <article class="article-card">
      <a class="thumb ${article.tone || ''}" href="${href}" aria-label="Read ${article.title}"></a>
      <div class="card-body">
        <a class="tag ${article.tagClass || ''}" href="${href}">${article.tag}</a>
        <h3><a href="${href}">${article.title}</a></h3>
        <div class="meta"><span class="avatar">${initials(article.author)}</span><span>${article.author || 'OpenLearnHub'} · ${article.time}</span></div>
      </div>
    </article>`;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-menu-toggle]').forEach(button => {
    button.addEventListener('click', () => {
      const nav = document.querySelector('[data-mobile-nav]');
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      nav?.classList.toggle('open');
    });
  });

  const loadMore = document.querySelector('[data-load-more]');
  const grid = document.querySelector('[data-article-grid]');
  if (loadMore && grid) {
    loadMore.addEventListener('click', () => {
      grid.insertAdjacentHTML('beforeend', extraArticles.map(articleCard).join(''));
      loadMore.textContent = 'More articles loaded';
      loadMore.disabled = true;
      loadMore.style.opacity = '.72';
    });
  }

  const amountButtons = document.querySelectorAll('[data-amount]');
  const description = document.querySelector('[data-donation-description]');
  const subLabel = document.querySelector('[data-donation-sub]');
  const hourMap = { 5: '250', 10: '500', 20: '1,000', 40: '2,000' };
  amountButtons.forEach(button => {
    button.addEventListener('click', () => {
      const amount = button.dataset.amount;
      amountButtons.forEach(item => item.classList.toggle('active', item === button));
      amountButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      if (description) description.textContent = `Your $${amount} donation will provide ${hourMap[amount]} hours of learning to people around the world each month.`;
      if (subLabel) subLabel.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
    });
  });

  document.querySelectorAll('[data-faq-question]').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isOpen = item?.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });
});
