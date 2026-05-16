const allArticles = [
  { tag: 'ai', tagLabel: 'AI', title: 'Shadow AI Explained: Why Employees Are Using AI Behind Your Back', author: 'Taylor Kim', avatar: 'TK', time: '2 hours ago' },
  { tag: 'scraping', tagLabel: 'Web Scraping', title: 'Traditional Scraping vs AI Scraping: A Practical Guide for Developers and Data Teams', author: 'R. Patel', avatar: 'RP', time: '5 hours ago' },
  { tag: 'database', tagLabel: 'Databases', title: 'How Database Indexes Work – A Practical Guide with PostgreSQL Examples', author: 'Maya Chen', avatar: 'MC', time: '1 day ago' },
  { tag: 'search', tagLabel: 'Search', title: 'How to Streamline Search in Web Applications with Elasticsearch', author: 'Noah Rivera', avatar: 'NR', time: '2 days ago' },
  { tag: 'data', tagLabel: 'Data Engineering', title: 'How to Build an Open Source Data Lake for Batch Ingestion', author: 'Sara Idris', avatar: 'SI', time: '3 days ago' },
  { tag: 'ai', tagLabel: 'AI', title: 'The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship', author: 'Jordan Bell', avatar: 'JB', time: '4 days ago' },
  { tag: 'ai', tagLabel: 'AI', title: 'GPT-5.4 vs GLM-5: Is Open Source Finally Matching Proprietary AI?', author: 'Alex Montero', avatar: 'AM', time: '6 days ago' },
  { tag: 'scraping', tagLabel: 'Web Scraping', title: 'How to Turn Websites into LLM-Ready Data Using Firecrawl', author: 'Lina Gomez', avatar: 'LG', time: '1 week ago' },
  { tag: 'scraping', tagLabel: 'Web Scraping', title: 'How to Use Python to Build Your Own Web Scraper', author: 'Devon Lee', avatar: 'DL', time: '2 weeks ago' }
];

function articleCard(article) {
  return `
  <article class="card">
    <div class="card-media"></div>
    <div class="card-body">
      <span class="tag ${article.tag}">${article.tagLabel}</span>
      <h3>${article.title}</h3>
      <div class="meta">
        <span class="author"><span class="avatar">${article.avatar}</span>${article.author}</span>
        <span>${article.time}</span>
      </div>
    </div>
  </article>`;
}

document.querySelectorAll('[data-menu-btn]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.menuBtn);
    if (target) target.classList.toggle('open');
  });
});

const grid = document.getElementById('article-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
if (grid && loadMoreBtn) {
  let visible = 5;
  const render = () => {
    grid.innerHTML = allArticles.slice(0, visible).map(articleCard).join('');
    if (visible >= allArticles.length) loadMoreBtn.style.display = 'none';
  };
  render();
  loadMoreBtn.addEventListener('click', () => {
    visible += 2;
    render();
  });
}

const amountButtons = document.querySelectorAll('[data-amount]');
const donationDescription = document.getElementById('donation-description');
const donationMap = {
  5: 'Your $5/month helps keep one tutorial ad-free and accessible to global learners.',
  10: 'Your $10/month supports new beginner-friendly curriculum updates every month.',
  20: 'Your $20/month helps fund community moderation, course reviews, and forum support.',
  40: 'Your $40/month directly sustains large-scale free course production and platform infrastructure.'
};
if (amountButtons.length && donationDescription) {
  amountButtons.forEach((button) => {
    button.addEventListener('click', () => {
      amountButtons.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      donationDescription.textContent = donationMap[button.dataset.amount];
    });
  });
}

document.querySelectorAll('.faq-item').forEach((item) => {
  const trigger = item.querySelector('.faq-q');
  if (!trigger) return;
  trigger.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});
