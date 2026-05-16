const allArticles = [
  {
    title: "Shadow AI Explained: Why Employees Are Using AI Behind Your Back",
    tag: "AI",
    tagClass: "tag-ai",
    author: "Lina Brooks",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    time: "3 hours ago",
    thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=520&fit=crop"
  },
  {
    title: "Traditional Scraping vs AI Scraping: A Practical Guide for Developers and Data Teams",
    tag: "Web Scraping",
    tagClass: "tag-scrape",
    author: "Marco Lee",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    time: "6 hours ago",
    thumb: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=520&fit=crop"
  },
  {
    title: "How Database Indexes Work – A Practical Guide with PostgreSQL Examples",
    tag: "Databases",
    tagClass: "tag-db",
    author: "Ava Patel",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
    time: "1 day ago",
    thumb: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=900&h=520&fit=crop"
  },
  {
    title: "How to Streamline Search in Web Applications with Elasticsearch",
    tag: "Search",
    tagClass: "tag-search",
    author: "Noah Chen",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
    time: "2 days ago",
    thumb: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=520&fit=crop"
  },
  {
    title: "How to Build an Open Source Data Lake for Batch Ingestion",
    tag: "Data Engineering",
    tagClass: "tag-data",
    author: "Priya Raman",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=faces",
    time: "3 days ago",
    thumb: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=900&h=520&fit=crop"
  },
  {
    title: "The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship",
    tag: "AI",
    tagClass: "tag-ai",
    author: "Jules Rivera",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&crop=faces",
    time: "4 days ago",
    thumb: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=900&h=520&fit=crop"
  },
  {
    title: "GPT-5.4 vs GLM-5: Is Open Source Finally Matching Proprietary AI?",
    tag: "AI",
    tagClass: "tag-ai",
    author: "Devin Hall",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    time: "5 days ago",
    thumb: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&h=520&fit=crop"
  },
  {
    title: "How to Turn Websites into LLM-Ready Data Using Firecrawl",
    tag: "Web Scraping",
    tagClass: "tag-scrape",
    author: "Iris Gomez",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
    time: "6 days ago",
    thumb: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=520&fit=crop"
  },
  {
    title: "How to Use Python to Build Your Own Web Scraper",
    tag: "Web Scraping",
    tagClass: "tag-scrape",
    author: "Rahul Singh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    time: "1 week ago",
    thumb: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&h=520&fit=crop"
  }
];

function setupMobileMenu() {
  const btn = document.querySelector('[data-menu-btn]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', menu.classList.contains('open') ? 'true' : 'false');
  });
}

function cardTemplate(article) {
  const tagLink = article.tag === 'AI' ? 'tag-ai.html' : article.tag === 'Web Scraping' ? 'tag-web-scraping.html' : null;
  const tagHtml = tagLink
    ? `<a href="${tagLink}" class="tag ${article.tagClass}">#${article.tag}</a>`
    : `<span class="tag ${article.tagClass}">#${article.tag}</span>`;

  return `
    <article class="card">
      <img class="card-thumb" src="${article.thumb}" alt="${article.title}">
      <div class="card-body">
        ${tagHtml}
        <h3 class="card-title">${article.title}</h3>
        <div class="meta">
          <img src="${article.avatar}" alt="${article.author}">
          <span>${article.author} · ${article.time}</span>
        </div>
      </div>
    </article>
  `;
}

function setupHomeArticles() {
  const grid = document.querySelector('[data-articles-grid]');
  const btn = document.querySelector('[data-load-more]');
  if (!grid || !btn) return;

  let shown = 5;
  const render = () => {
    grid.innerHTML = allArticles.slice(0, shown).map(cardTemplate).join('');
    if (shown >= allArticles.length) {
      btn.style.display = 'none';
    }
  };

  btn.addEventListener('click', () => {
    shown = Math.min(shown + 3, allArticles.length);
    render();
  });

  render();
}

function setupDonationTabs() {
  const wrap = document.querySelector('[data-amount-tabs]');
  const text = document.querySelector('[data-amount-text]');
  if (!wrap || !text) return;

  const map = {
    5: '$5/month helps host one more beginner-friendly tutorial page without ads.',
    10: '$10/month helps us maintain curriculum updates and accessibility reviews.',
    20: '$20/month helps fund new full-length video courses and coding exercises.',
    40: '$40/month helps scale nonprofit infrastructure for millions of learners.'
  };

  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-amount]');
    if (!btn) return;
    wrap.querySelectorAll('button[data-amount]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const amount = btn.getAttribute('data-amount');
    text.textContent = map[amount];
  });
}

function setupFaq() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    q?.addEventListener('click', () => item.classList.toggle('open'));
  });
}

function renderFilteredArticles(tag, selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const filtered = allArticles.filter((a) => a.tag === tag);
  el.innerHTML = filtered.map(cardTemplate).join('');
}

setupMobileMenu();
setupHomeArticles();
setupDonationTabs();
setupFaq();
renderFilteredArticles('AI', '[data-tag-ai-grid]');
renderFilteredArticles('Web Scraping', '[data-tag-scraping-grid]');
