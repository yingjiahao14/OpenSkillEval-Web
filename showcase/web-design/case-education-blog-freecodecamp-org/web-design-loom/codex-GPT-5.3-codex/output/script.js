const menuButton = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
}

const articles = [
  {
    tag: 'AI',
    tagColor: '#ffe1ad',
    title: 'Shadow AI Explained: Why Employees Are Using AI Behind Your Back',
    author: 'Priya Das',
    time: '2h ago',
    img: 'https://picsum.photos/seed/olh-ai-1/800/450',
    avatar: 'https://i.pravatar.cc/80?img=32'
  },
  {
    tag: 'Web Scraping',
    tagColor: '#d9ecff',
    title: 'Traditional Scraping vs AI Scraping: A Practical Guide for Developers and Data Teams',
    author: 'Jamal Ortega',
    time: '5h ago',
    img: 'https://picsum.photos/seed/olh-scrape-1/800/450',
    avatar: 'https://i.pravatar.cc/80?img=14'
  },
  {
    tag: 'Databases',
    tagColor: '#e8f8d8',
    title: 'How Database Indexes Work – A Practical Guide with PostgreSQL Examples',
    author: 'Nina Patel',
    time: '8h ago',
    img: 'https://picsum.photos/seed/olh-db-1/800/450',
    avatar: 'https://i.pravatar.cc/80?img=47'
  },
  {
    tag: 'Search',
    tagColor: '#e8e5ff',
    title: 'How to Streamline Search in Web Applications with Elasticsearch',
    author: 'Leo Martin',
    time: '1d ago',
    img: 'https://picsum.photos/seed/olh-search-1/800/450',
    avatar: 'https://i.pravatar.cc/80?img=56'
  },
  {
    tag: 'Data Engineering',
    tagColor: '#ffe6d5',
    title: 'How to Build an Open Source Data Lake for Batch Ingestion',
    author: 'Anika Rahman',
    time: '2d ago',
    img: 'https://picsum.photos/seed/olh-lake-1/800/450',
    avatar: 'https://i.pravatar.cc/80?img=21'
  },
  {
    tag: 'AI',
    tagColor: '#ffe1ad',
    title: 'The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship',
    author: 'Marco Lin',
    time: '3d ago',
    img: 'https://picsum.photos/seed/olh-ai-2/800/450',
    avatar: 'https://i.pravatar.cc/80?img=41'
  },
  {
    tag: 'AI',
    tagColor: '#ffe1ad',
    title: 'GPT-5.4 vs GLM-5: Is Open Source Finally Matching Proprietary AI?',
    author: 'Sonia Reed',
    time: '4d ago',
    img: 'https://picsum.photos/seed/olh-ai-3/800/450',
    avatar: 'https://i.pravatar.cc/80?img=6'
  },
  {
    tag: 'Web Scraping',
    tagColor: '#d9ecff',
    title: 'How to Turn Websites into LLM-Ready Data Using Firecrawl',
    author: 'Alex Boyd',
    time: '4d ago',
    img: 'https://picsum.photos/seed/olh-scrape-2/800/450',
    avatar: 'https://i.pravatar.cc/80?img=39'
  },
  {
    tag: 'Web Scraping',
    tagColor: '#d9ecff',
    title: 'How to Use Python to Build Your Own Web Scraper',
    author: 'Kira Nwosu',
    time: '5d ago',
    img: 'https://picsum.photos/seed/olh-scrape-3/800/450',
    avatar: 'https://i.pravatar.cc/80?img=23'
  }
];

const homeGrid = document.querySelector('[data-article-grid]');
const loadMoreBtn = document.querySelector('[data-load-more]');
if (homeGrid && loadMoreBtn) {
  let rendered = 6;
  const renderCard = (article) => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <img class="thumb" src="${article.img}" alt="${article.title}">
      <div class="card-body">
        <span class="tag" style="background:${article.tagColor}">${article.tag}</span>
        <h3>${article.title}</h3>
        <div class="meta">
          <div class="author">
            <img class="avatar" src="${article.avatar}" alt="${article.author}">
            <span>${article.author}</span>
          </div>
          <span>${article.time}</span>
        </div>
      </div>`;
    return el;
  };

  const appendChunk = () => {
    const next = articles.slice(rendered, rendered + 3);
    next.forEach((a) => homeGrid.appendChild(renderCard(a)));
    rendered += next.length;
    if (rendered >= articles.length) {
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = 'All Articles Loaded';
      loadMoreBtn.classList.add('secondary');
    }
  };

  loadMoreBtn.addEventListener('click', appendChunk);
}

const donationTabs = document.querySelectorAll('[data-amount]');
const donationDesc = document.querySelector('[data-donation-description]');
const donationCopy = {
  5: 'Your $5 monthly gift helps fund free beginner-friendly lessons and keeps our tutorials accessible worldwide.',
  10: 'Your $10 monthly gift supports curriculum updates, editor review cycles, and better learning pathways.',
  20: 'Your $20 monthly gift powers new certification projects and hands-on coding practice resources.',
  40: 'Your $40 monthly gift sustains open education infrastructure for thousands of learners every day.'
};
if (donationTabs.length && donationDesc) {
  donationTabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      donationTabs.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const amount = btn.getAttribute('data-amount');
      donationDesc.textContent = donationCopy[amount] || '';
    });
  });
}

document.querySelectorAll('[data-faq-item]').forEach((item) => {
  const trigger = item.querySelector('[data-faq-trigger]');
  if (!trigger) return;
  trigger.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});
