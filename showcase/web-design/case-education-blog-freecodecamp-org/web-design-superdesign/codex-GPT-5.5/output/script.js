const articleImages = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80'
];

function initials(name) {
  if (!name || name === '—') return 'OL';
  return name.split(' ').filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase();
}

function tagClass(tag) {
  const normalized = tag.toLowerCase();
  if (normalized.includes('ai')) return 'ai';
  if (normalized.includes('scraping') || normalized.includes('python') || normalized.includes('node') || normalized.includes('google')) return 'scrape';
  if (normalized.includes('database') || normalized.includes('elastic')) return 'db';
  if (normalized.includes('data')) return 'data';
  return '';
}

function createArticleCard(article, index = 0) {
  const card = document.createElement('article');
  card.className = 'article-card fade-in';
  const tagHref = article.tag.toLowerCase().includes('scraping') ? 'tag-web-scraping.html' : article.tag.toLowerCase().includes('ai') ? 'tag-ai.html' : '#';
  card.innerHTML = `
    <a class="thumb" href="${tagHref}"><img src="${article.image || articleImages[index % articleImages.length]}" alt="Abstract thumbnail for ${article.title}" loading="lazy"></a>
    <div class="card-body">
      <a class="tag ${tagClass(article.tag)}" href="${tagHref}">${article.tag}</a>
      <h3>${article.title}</h3>
      <div class="meta"><span class="avatar">${initials(article.author)}</span><span>${article.author || 'OpenLearnHub'} · ${article.time}</span></div>
    </div>`;
  return card;
}

document.querySelectorAll('[data-menu-button]').forEach(button => {
  button.addEventListener('click', () => {
    const nav = document.querySelector('[data-mobile-nav]');
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
});

const loadMoreButton = document.querySelector('[data-load-more]');
if (loadMoreButton) {
  const moreArticles = [
    { tag: '#JavaScript', title: 'JavaScript Promises Explained Through Real World Examples', author: 'OpenLearnHub Staff', time: '2 days ago' },
    { tag: '#Python', title: 'Python Data Classes: A Practical Guide for Clean Models', author: 'Maya Chen', time: '2 days ago' },
    { tag: '#React', title: 'How to Think in Components When Building React Interfaces', author: 'Alex Morgan', time: '3 days ago' },
    { tag: '#CSS', title: 'Modern CSS Layout Patterns Every Developer Should Know', author: 'Nora Lee', time: '3 days ago' },
    { tag: '#Command Line', title: 'Command Line Workflows That Make You a Faster Developer', author: 'Sam Rivera', time: '4 days ago' },
    { tag: '#TypeScript', title: 'TypeScript Types for Safer API Responses', author: 'Priya Shah', time: '4 days ago' }
  ];
  let loaded = false;
  loadMoreButton.addEventListener('click', () => {
    if (loaded) return;
    const grid = document.querySelector('[data-article-grid]');
    moreArticles.forEach((article, index) => grid.appendChild(createArticleCard(article, index + 5)));
    loadMoreButton.textContent = 'All caught up';
    loadMoreButton.disabled = true;
    loaded = true;
  });
}

const donationDescriptions = {
  5: 'Your $5 donation keeps learning tools online for students taking their first coding steps.',
  10: 'Your $10 donation helps publish new tutorials and practice projects every month.',
  20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
  40: 'Your $40 donation helps translate curriculum and expand free certifications globally.'
};
document.querySelectorAll('[data-amount]').forEach(button => {
  button.addEventListener('click', () => {
    const amount = button.dataset.amount;
    document.querySelectorAll('[data-amount]').forEach(btn => btn.classList.toggle('active', btn === button));
    const text = document.querySelector('[data-donation-text]');
    const label = document.querySelector('[data-donation-label]');
    if (text) text.textContent = donationDescriptions[amount];
    if (label) label.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
  });
});

document.querySelectorAll('[data-faq-question]').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.closest('.faq-item');
    const open = item.classList.toggle('open');
    question.setAttribute('aria-expanded', String(open));
  });
});
