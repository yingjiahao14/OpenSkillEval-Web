const articles = [
  { tag: '#AI', title: 'Shadow AI Explained: Why Employees Are Using AI Behind Your Back', author: 'Manish Shivanandhan', time: '15 hours ago', art: 'art-ai' },
  { tag: '#web scraping', title: 'Traditional Scraping vs AI Scraping: A Practical Guide for Developers and Data Teams', author: 'Joel Olawanle', time: '16 hours ago', art: 'art-scrape' },
  { tag: '#Databases', title: 'How Database Indexes Work – A Practical Guide with PostgreSQL Examples', author: 'iyiola', time: '20 hours ago', art: 'art-db' },
  { tag: '#elasticsearch', title: 'How to Streamline Search in Web Applications with Elasticsearch', author: 'Oluwatobi', time: '21 hours ago', art: 'art-search' },
  { tag: '#data-engineering', title: 'How to Build an Open Source Data Lake for Batch Ingestion', author: 'Puneet Singh', time: 'a day ago', art: 'art-data' }
];

const moreArticles = [
  { tag: '#JavaScript', title: 'Build Accessible Components Without Losing Developer Velocity', author: 'OpenLearnHub Staff', time: '2 days ago', art: 'art-code' },
  { tag: '#Python', title: 'Python Automation Patterns Every Data Team Should Know', author: 'Amina Bello', time: '3 days ago', art: 'art-data' },
  { tag: '#React', title: 'State Management for Editorial Web Apps: A Practical Tour', author: 'Lee Robinson', time: '4 days ago', art: 'art-search' }
];

function initials(name) {
  if (!name || name === '—') return 'OL';
  return name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase();
}

function articleCard(article) {
  const safeTitle = article.title.replace(/"/g, '&quot;');
  return `
    <article class="article-card reveal">
      <a href="#" aria-label="Read ${safeTitle}">
        <div class="article-art ${article.art || 'art-code'}"><span class="grid-lines"></span></div>
        <div class="card-body">
          <span class="tag">${article.tag}</span>
          <h3>${article.title}</h3>
          <div class="meta">
            <span class="avatar" aria-hidden="true">${initials(article.author)}</span>
            <span>${article.author || 'OpenLearnHub'}</span>
            <span class="meta-dot">${article.time}</span>
          </div>
        </div>
      </a>
    </article>`;
}

function setupMenus() {
  document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.getAttribute('aria-controls'));
      const isOpen = target.classList.toggle('is-open');
      button.classList.toggle('is-open', isOpen);
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });
}

function setupLoadMore() {
  const button = document.querySelector('[data-load-more]');
  const grid = document.querySelector('[data-article-grid]');
  if (!button || !grid) return;
  button.addEventListener('click', () => {
    grid.insertAdjacentHTML('beforeend', moreArticles.map(articleCard).join(''));
    button.textContent = 'More tutorials loaded';
    button.disabled = true;
  });
}

function setupDonations() {
  const tabs = document.querySelectorAll('[data-amount]');
  const description = document.querySelector('[data-donation-description]');
  const sublabel = document.querySelector('[data-donation-sub]');
  if (!tabs.length || !description || !sublabel) return;
  const messages = {
    5: 'Your $5 donation keeps lessons searchable, fast, and free for thousands of learners each month.',
    10: 'Your $10 donation helps publish practical tutorials and maintain learner support spaces each month.',
    20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
    40: 'Your $40 donation funds new curriculum, translations, and open source improvements each month.'
  };
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const amount = tab.dataset.amount;
      tabs.forEach(item => item.classList.toggle('is-active', item === tab));
      description.textContent = messages[amount];
      sublabel.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
    });
  });
}

function setupFaq() {
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const isOpen = item.classList.toggle('is-open');
      question.setAttribute('aria-expanded', String(isOpen));
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupMenus();
  setupLoadMore();
  setupDonations();
  setupFaq();
});
