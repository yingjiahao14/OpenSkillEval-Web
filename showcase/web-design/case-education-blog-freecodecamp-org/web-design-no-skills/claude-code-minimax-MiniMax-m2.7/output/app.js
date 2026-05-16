// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
}

// Donation amount tabs
const amountTabs = document.querySelectorAll('.amount-tab');
const donateDesc = document.querySelector('.donate-desc');

if (amountTabs.length > 0 && donateDesc) {
  const descriptions = {
    5: 'Your $5 donation will provide 250 hours of learning to people around the world each month.',
    10: 'Your $10 donation will provide 500 hours of learning to people around the world each month.',
    20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
    40: 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.'
  };

  amountTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      amountTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const amount = parseInt(tab.textContent.replace('$', ''));
      donateDesc.textContent = descriptions[amount] || descriptions[20];
    });
  });
}

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  if (question) {
    question.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!wasOpen) {
        item.classList.add('open');
      }
    });
  }
});

// Load more articles
const loadMoreBtn = document.querySelector('.load-more-btn');
const articleGrid = document.querySelector('.article-grid');

if (loadMoreBtn && articleGrid) {
  const additionalArticles = [
    {
      tag: 'web scraping',
      tagClass: 'tag-web',
      title: 'How to Build a Web Scraper with Python and BeautifulSoup',
      author: 'Sarah Chen',
      time: '2 days ago',
      initials: 'SC'
    },
    {
      tag: 'JavaScript',
      tagClass: 'tag-ai',
      title: 'Understanding Asynchronous JavaScript: A Complete Guide',
      author: 'Alex Rivera',
      time: '3 days ago',
      initials: 'AR'
    },
    {
      tag: 'Python',
      tagClass: 'tag-python',
      title: 'Getting Started with FastAPI for Python Web Development',
      author: 'Jordan Lee',
      time: '4 days ago',
      initials: 'JL'
    }
  ];

  loadMoreBtn.addEventListener('click', () => {
    additionalArticles.forEach(article => {
      const card = document.createElement('div');
      card.className = 'article-card';
      card.innerHTML = `
        <div class="article-body">
          <span class="article-tag ${article.tagClass}">${article.tag}</span>
          <h3 class="article-title"><a href="#">${article.title}</a></h3>
          <div class="article-meta">
            <div class="article-avatar">${article.initials}</div>
            <span class="article-author">${article.author}</span>
            <span class="article-time">${article.time}</span>
          </div>
        </div>
      `;
      articleGrid.appendChild(card);
    });
    loadMoreBtn.style.display = 'none';
  });
}