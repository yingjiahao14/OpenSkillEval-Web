const thumbForTag = (tag) => {
  const clean = tag.toLowerCase();
  if (clean.includes('web scraping')) return 'assets/thumb-scraping.svg';
  if (clean.includes('database')) return 'assets/thumb-db.svg';
  if (clean.includes('elastic')) return 'assets/thumb-search.svg';
  if (clean.includes('data')) return 'assets/thumb-data.svg';
  return 'assets/thumb-ai.svg';
};

const tagClass = (tag) => {
  const clean = tag.toLowerCase();
  if (clean.includes('web scraping')) return 'scrape';
  if (clean.includes('database')) return 'db';
  if (clean.includes('elastic')) return 'search';
  if (clean.includes('data')) return 'data';
  if (clean.includes('ai')) return 'ai';
  return '';
};

const initials = (name) => {
  if (!name || name === '—') return 'OL';
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
};

function articleCard(article) {
  const tagHref = article.tag.toLowerCase().includes('web scraping') ? 'tag-web-scraping.html' : article.tag.toLowerCase().includes('ai') ? 'tag-ai.html' : '#articles';
  return `
    <article class="article-card">
      <a href="#" aria-label="Read ${article.title}"><img src="${thumbForTag(article.tag)}" alt="Abstract thumbnail for ${article.tag} tutorial"></a>
      <div class="article-card-body">
        <a class="tag ${tagClass(article.tag)}" href="${tagHref}">${article.tag}</a>
        <h3><a href="#">${article.title}</a></h3>
        <div class="author-row">
          <span class="avatar" aria-hidden="true">${initials(article.author)}</span>
          <span>${article.author || 'OpenLearnHub Editors'}</span>
          <span class="dot">•</span>
          <time>${article.time}</time>
        </div>
      </div>
    </article>`;
}

function setupMenuToggles() {
  document.querySelectorAll('.menu-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const nav = document.getElementById(button.getAttribute('aria-controls'));
      const open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    });
  });
}

function setupLoadMore() {
  const grid = document.querySelector('[data-home-grid]');
  const button = document.querySelector('[data-load-more]');
  if (!grid || !button) return;
  const articles = [
    { tag: '#JavaScript', title: 'JavaScript Modules Explained for Practical Front-End Projects', author: 'OpenLearnHub Editors', time: '2 days ago' },
    { tag: '#Python', title: 'How to Structure Python Projects for Data Workflows', author: 'Amina Cole', time: '3 days ago' },
    { tag: '#React', title: 'State Management Patterns Every React Developer Should Know', author: 'Nora Blake', time: '4 days ago' },
    { tag: '#CSS', title: 'Modern CSS Layout Techniques for Clean Responsive Interfaces', author: 'Leo Martin', time: '5 days ago' },
    { tag: '#AI', title: 'Prompt Engineering Patterns for Reliable Developer Tools', author: 'Riya Patel', time: '6 days ago' },
    { tag: '#node js', title: 'Build a Minimal API Gateway with Node.js and Express', author: 'Sam Okafor', time: '1 week ago' }
  ];
  let index = 0;
  button.addEventListener('click', () => {
    const next = articles.slice(index, index + 3);
    grid.insertAdjacentHTML('beforeend', next.map(articleCard).join(''));
    index += next.length;
    if (index >= articles.length) {
      button.textContent = 'All Articles Loaded';
      button.disabled = true;
      button.style.opacity = '.65';
      button.style.cursor = 'not-allowed';
    }
  });
}

function setupDonationTabs() {
  const tabs = document.querySelectorAll('[data-amount]');
  const desc = document.querySelector('[data-donation-desc]');
  const sub = document.querySelector('[data-donation-sub]');
  if (!tabs.length || !desc) return;
  const copy = {
    5: 'Your $5 donation keeps lessons online and helps new learners practice coding for free each month.',
    10: 'Your $10 donation funds accessible tutorials, community support, and translation work for global learners.',
    20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
    40: 'Your $40 donation accelerates new curricula, free books, and open source education tools for thousands of learners.'
  };
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const amount = tab.dataset.amount;
      desc.textContent = copy[amount];
      if (sub) sub.innerHTML = `Donating $${amount} / month: <a href="#amounts">edit amount</a> · Secure donation`;
    });
  });
}

function setupFaqAccordion() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      question.setAttribute('aria-expanded', String(isOpen));
      answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : '0px';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupMenuToggles();
  setupLoadMore();
  setupDonationTabs();
  setupFaqAccordion();
});
