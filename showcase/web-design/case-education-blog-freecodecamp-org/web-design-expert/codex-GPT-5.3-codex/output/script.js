const extraArticles = [
  {
    tag: 'AI',
    tagClass: 'ai',
    title: 'The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship',
    author: 'Maya Chen',
    avatar: 'MC',
    time: '2 days ago',
    thumb: 'linear-gradient(120deg,#3e2f84,#6d4ed8)'
  },
  {
    tag: 'Web Scraping',
    tagClass: 'scraping',
    title: 'How to Turn Websites into LLM-Ready Data Using Firecrawl',
    author: 'Luis Rivera',
    avatar: 'LR',
    time: '4 days ago',
    thumb: 'linear-gradient(120deg,#0f8f7a,#34c6ad)'
  },
  {
    tag: 'Python',
    tagClass: 'data',
    title: 'How to Use Python to Build Your Own Web Scraper',
    author: 'Rhea Patel',
    avatar: 'RP',
    time: '6 days ago',
    thumb: 'linear-gradient(120deg,#3f3f46,#70707a)'
  }
];

document.querySelectorAll('[data-menu-btn]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.menuBtn);
    target.classList.toggle('open');
  });
});

const loadMoreBtn = document.getElementById('load-more-btn');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    const grid = document.getElementById('home-article-grid');
    extraArticles.forEach((article) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="thumb" style="background:${article.thumb}"></div>
        <div class="card-content">
          <span class="tag ${article.tagClass}">${article.tag}</span>
          <h3>${article.title}</h3>
          <div class="author-row">
            <div class="avatar">${article.avatar}</div>
            <span>${article.author}</span>
            <span>•</span>
            <span>${article.time}</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = 'More Articles Loaded';
  }, { once: true });
}

const donationDescriptions = {
  5: 'Keeps one tutorial free and ad-light for thousands of learners each month.',
  10: 'Supports moderation, curriculum updates, and accessibility improvements.',
  20: 'Funds new interactive coding lessons and community mentorship support.',
  40: 'Helps launch complete certification pathways and maintain free infrastructure.'
};

const amountButtons = document.querySelectorAll('.amount-btn');
const donationText = document.getElementById('donation-description');
if (amountButtons.length && donationText) {
  amountButtons.forEach((button) => {
    button.addEventListener('click', () => {
      amountButtons.forEach((b) => b.classList.remove('active'));
      button.classList.add('active');
      donationText.textContent = donationDescriptions[button.dataset.amount];
    });
  });
}

document.querySelectorAll('.faq-q').forEach((question) => {
  question.addEventListener('click', () => {
    question.closest('.faq-item').classList.toggle('open');
  });
});
