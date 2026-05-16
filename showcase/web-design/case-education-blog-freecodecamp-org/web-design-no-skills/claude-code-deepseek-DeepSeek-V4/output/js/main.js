/* ===== OpenLearnHub — Shared JavaScript ===== */

document.addEventListener('DOMContentLoaded', function () {

  /* ----- Mobile hamburger menu ----- */
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isActive = hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    var navLinks = mobileNav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----- Donation amount tabs ----- */
  var amountTabs = document.querySelectorAll('.amount-tab');
  var donateDescription = document.querySelector('.donate-description');
  if (amountTabs.length && donateDescription) {
    var descriptions = {
      '5': 'Your $5 donation will provide 250 hours of learning to people around the world each month.',
      '10': 'Your $10 donation will provide 500 hours of learning to people around the world each month.',
      '20': 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
      '40': 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.'
    };
    amountTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        amountTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var amount = tab.getAttribute('data-amount');
        donateDescription.textContent = descriptions[amount] || '';
      });
    });
  }

  /* ----- FAQ accordion ----- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(function (i) { i.classList.remove('open'); });
        // Toggle clicked
        if (!isOpen) { item.classList.add('open'); }
      });
    }
  });

  /* ----- Load more articles (home page) ----- */
  var loadMoreBtn = document.getElementById('load-more-btn');
  var articleGrid = document.getElementById('article-grid');
  if (loadMoreBtn && articleGrid) {
    var extraArticles = [
      {
        tag: 'JavaScript', tagClass: 'tag-javascript',
        title: 'Understanding Closures in JavaScript: A Deep Dive',
        author: 'Beau Carnes', initials: 'BC', time: '2 days ago',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
      },
      {
        tag: 'Python', tagClass: 'tag-python',
        title: 'Python Decorators Explained: From Basics to Advanced Patterns',
        author: 'Jessica Wilkins', initials: 'JW', time: '3 days ago',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)'
      },
      {
        tag: 'CSS', tagClass: 'tag-css',
        title: 'CSS Grid vs Flexbox: When to Use Which for Modern Layouts',
        author: 'Kolade Chris', initials: 'KC', time: '4 days ago',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)'
      },
      {
        tag: 'React', tagClass: 'tag-react',
        title: 'React Server Components: A Complete Guide for 2026',
        author: 'Ihechikara Abba', initials: 'IA', time: '5 days ago',
        gradient: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)'
      },
      {
        tag: 'Node.js', tagClass: 'tag-node',
        title: 'Building a REST API with Express and TypeScript',
        author: 'Dionysia Lemonaki', initials: 'DL', time: '6 days ago',
        gradient: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)'
      }
    ];

    var loaded = false;
    loadMoreBtn.addEventListener('click', function () {
      if (loaded) return;
      loaded = true;
      extraArticles.forEach(function (article) {
        var card = createArticleCard(article);
        articleGrid.appendChild(card);
      });
      loadMoreBtn.textContent = 'All articles loaded';
      loadMoreBtn.style.opacity = '0.6';
      loadMoreBtn.style.pointerEvents = 'none';
    });
  }

  function createArticleCard(article) {
    var card = document.createElement('article');
    card.className = 'article-card';

    var thumb = document.createElement('div');
    thumb.className = 'article-card-thumb';
    thumb.style.background = article.gradient;
    thumb.innerHTML = '<svg viewBox="0 0 64 64" fill="white"><rect x="8" y="12" width="48" height="40" rx="3" fill="white" opacity="0.2"/><rect x="18" y="20" width="28" height="3" rx="1" fill="white" opacity="0.5"/><rect x="18" y="28" width="20" height="3" rx="1" fill="white" opacity="0.5"/><rect x="18" y="36" width="24" height="3" rx="1" fill="white" opacity="0.5"/><circle cx="46" cy="46" r="10" fill="white" opacity="0.15"/></svg>';

    var body = document.createElement('div');
    body.className = 'article-card-body';

    var tag = document.createElement('span');
    tag.className = 'tag ' + article.tagClass;
    tag.textContent = '#' + article.tag;

    var title = document.createElement('h3');
    var titleLink = document.createElement('a');
    titleLink.href = '#';
    titleLink.textContent = article.title;
    title.appendChild(titleLink);

    var author = document.createElement('div');
    author.className = 'author';
    var avatar = document.createElement('div');
    avatar.className = 'author-avatar';
    avatar.textContent = article.initials;
    var nameSpan = document.createElement('span');
    nameSpan.className = 'author-name';
    nameSpan.textContent = article.author;
    var timeSpan = document.createElement('span');
    timeSpan.textContent = ' · ' + article.time;
    author.appendChild(avatar);
    author.appendChild(nameSpan);
    author.appendChild(timeSpan);

    body.appendChild(tag);
    body.appendChild(title);
    body.appendChild(author);
    card.appendChild(thumb);
    card.appendChild(body);
    return card;
  }
});
