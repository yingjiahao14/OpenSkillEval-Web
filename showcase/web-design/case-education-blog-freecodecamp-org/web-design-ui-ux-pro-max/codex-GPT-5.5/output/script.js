const additionalArticles = [
  {
    tag: '#AI',
    tagClass: 'blue',
    title: 'The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship',
    author: 'Rudrendu Paul',
    time: '3 days ago',
    theme: 'db'
  },
  {
    tag: '#Python',
    tagClass: 'green',
    title: 'How to Turn Websites into LLM-Ready Data Using Firecrawl',
    author: 'Manish Shivanandhan',
    time: '6 months ago',
    theme: 'scrape'
  },
  {
    tag: '#node js',
    tagClass: '',
    title: 'How to Scrape Amazon Product Reviews Behind a Login',
    author: 'OpenLearnHub Editors',
    time: '2 years ago',
    theme: 'searching'
  }
];

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((word) => word[0]).join('').toUpperCase() || 'OL';
}

function articleCard(article) {
  return `
    <article class="article-card">
      <div class="thumb ${article.theme || ''}" role="img" aria-label="Abstract coding tutorial thumbnail"></div>
      <div class="article-body">
        <a class="tag ${article.tagClass || ''}" href="${article.tag.toLowerCase().includes('scraping') ? 'tag-web-scraping.html' : article.tag.toLowerCase().includes('ai') ? 'tag-ai.html' : '#'}">${article.tag}</a>
        <h3 class="article-title">${article.title}</h3>
        <div class="meta"><span class="avatar">${initials(article.author)}</span><span>${article.author} · ${article.time}</span></div>
      </div>
    </article>`;
}

document.querySelectorAll('.menu-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const menu = document.querySelector(`#${button.getAttribute('aria-controls')}`);
    const isOpen = menu.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

const loadMore = document.querySelector('[data-load-more]');
if (loadMore) {
  loadMore.addEventListener('click', () => {
    const grid = document.querySelector('[data-article-grid]');
    grid.insertAdjacentHTML('beforeend', additionalArticles.map(articleCard).join(''));
    loadMore.textContent = 'More tutorials loaded';
    loadMore.disabled = true;
  });
}

const donationDescriptions = {
  5: 'Your $5 donation will keep bite-sized tutorials free for learners starting their first coding journey.',
  10: 'Your $10 donation will help translate lessons and keep community support available every month.',
  20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
  40: 'Your $40 donation will fund new curriculum, books, and accessible coding resources for global learners.'
};

document.querySelectorAll('[data-amount]').forEach((button) => {
  button.addEventListener('click', () => {
    const amount = button.dataset.amount;
    document.querySelectorAll('[data-amount]').forEach((tab) => tab.classList.toggle('active', tab === button));
    document.querySelectorAll('[data-amount]').forEach((tab) => tab.setAttribute('aria-selected', String(tab === button)));
    const description = document.querySelector('[data-donation-description]');
    const label = document.querySelector('[data-donation-label]');
    if (description) description.textContent = donationDescriptions[amount];
    if (label) label.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
  });
});

document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.toggle('open');
    question.setAttribute('aria-expanded', String(isOpen));
    answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : '0px';
  });
});
