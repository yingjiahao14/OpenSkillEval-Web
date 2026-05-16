// Hamburger menu toggle (shared across all pages)
(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', function () {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
})();

// Donation amount tabs
(function () {
  const tabs = document.querySelectorAll('.amount-btn');
  const desc = document.querySelector('.donation-desc');
  if (!tabs.length || !desc) return;

  const messages = {
    '5': 'Your $5 donation will provide 250 hours of learning to people around the world each month.',
    '10': 'Your $10 donation will provide 500 hours of learning to people around the world each month.',
    '20': 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
    '40': 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.'
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      const amount = tab.dataset.amount;
      if (messages[amount]) desc.textContent = messages[amount];
    });
  });
})();

// FAQ accordion
(function () {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(function (i) { i.classList.remove('open'); });
      // Toggle clicked
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// Load more articles
(function () {
  const btn = document.getElementById('load-more-btn');
  const grid = document.getElementById('articles-grid');
  if (!btn || !grid) return;

  const moreArticles = [
    {
      thumb: 'thumb-python', tag: '#Python', tagClass: 'tag-python',
      title: 'How to Build a REST API with FastAPI and PostgreSQL',
      author: 'Sarah Chen', initials: 'SC', time: '2 days ago'
    },
    {
      thumb: 'thumb-js', tag: '#JavaScript', tagClass: 'tag-js',
      title: 'Understanding Async/Await in JavaScript: A Complete Guide',
      author: 'Marcus Johnson', initials: 'MJ', time: '2 days ago'
    },
    {
      thumb: 'thumb-react', tag: '#React', tagClass: 'tag-react',
      title: 'Building a Full-Stack App with React and Node.js',
      author: 'Priya Patel', initials: 'PP', time: '3 days ago'
    },
    {
      thumb: 'thumb-css', tag: '#CSS', tagClass: 'tag-css',
      title: 'CSS Grid vs Flexbox: When to Use Each Layout Method',
      author: 'Alex Rivera', initials: 'AR', time: '3 days ago'
    },
    {
      thumb: 'thumb-data-eng', tag: '#data-engineering', tagClass: 'tag-data-eng',
      title: 'Introduction to Apache Kafka for Data Engineers',
      author: 'Wei Zhang', initials: 'WZ', time: '4 days ago'
    },
    {
      thumb: 'thumb-nodejs', tag: '#node.js', tagClass: 'tag-nodejs',
      title: 'Building Scalable Microservices with Node.js and Docker',
      author: 'Daniel Okafor', initials: 'DO', time: '5 days ago'
    }
  ];

  btn.addEventListener('click', function () {
    btn.disabled = true;
    btn.textContent = 'Loading…';

    setTimeout(function () {
      moreArticles.forEach(function (a) {
        const card = document.createElement('a');
        card.href = '#';
        card.className = 'article-card';
        card.innerHTML =
          '<div class="card-thumb">' +
            '<div class="thumb ' + a.thumb + '">' +
              '<div class="thumb-inner"><div class="thumb-pattern">' +
                '<span></span><span></span><span></span><span></span><span></span><span></span>' +
              '</div></div>' +
            '</div>' +
            '<span class="tag ' + a.tagClass + '">' + a.tag + '</span>' +
          '</div>' +
          '<div class="card-body">' +
            '<div class="card-title">' + a.title + '</div>' +
            '<div class="card-meta">' +
              '<div class="author-avatar">' + a.initials + '</div>' +
              '<div>' +
                '<div class="card-author-name">' + a.author + '</div>' +
                '<div class="card-time">' + a.time + '</div>' +
              '</div>' +
            '</div>' +
          '</div>';
        grid.appendChild(card);
      });
      btn.textContent = 'No More Articles';
      btn.style.opacity = '0.5';
      btn.style.cursor = 'default';
    }, 600);
  });
})();
