// OpenLearnHub - Global Interactions

(function () {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (mobileNav.classList.contains('open')) {
          icon.classList.remove('ri-menu-line');
          icon.classList.add('ri-close-line');
        } else {
          icon.classList.remove('ri-close-line');
          icon.classList.add('ri-menu-line');
        }
      }
    });
  }

  // Donation amount tabs
  const amountTabs = document.querySelectorAll('.amount-tab');
  const donationDesc = document.getElementById('donation-desc');
  const donationSub = document.getElementById('donation-sub');

  if (amountTabs.length && donationDesc) {
    const impactMap = {
      5: 'Your $5 donation will provide 250 hours of learning to people around the world each month.',
      10: 'Your $10 donation will provide 500 hours of learning to people around the world each month.',
      20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
      40: 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.',
    };

    amountTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        amountTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const amount = parseInt(tab.dataset.amount, 10);
        donationDesc.textContent = impactMap[amount] || impactMap[20];
        if (donationSub) {
          donationSub.innerHTML = `Donating $${amount} / month: <a href="#">edit amount</a> · Secure donation`;
        }
      });
    });
  }

  // FAQ accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-item').forEach((i) => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Load more articles
  const loadMoreBtn = document.getElementById('load-more');
  const articleGrid = document.getElementById('article-grid');

  if (loadMoreBtn && articleGrid) {
    const extraArticles = [
      {
        tag: '#JavaScript',
        title: 'Understanding Closures in JavaScript: A Complete Guide',
        author: 'Sarah Chen',
        time: '2 days ago',
        thumb: 'images/ai2.jpg',
        avatar: 'images/avatar3.jpg',
      },
      {
        tag: '#React',
        title: 'React Server Components: What You Need to Know in 2025',
        author: 'David Park',
        time: '3 days ago',
        thumb: 'images/ai3.jpg',
        avatar: 'images/avatar4.jpg',
      },
      {
        tag: '#Python',
        title: 'Python Asyncio Deep Dive: From Callbacks to Structured Concurrency',
        author: 'Aisha Patel',
        time: '4 days ago',
        thumb: 'images/ai4.jpg',
        avatar: 'images/avatar5.jpg',
      },
      {
        tag: '#CSS',
        title: 'Modern CSS Layouts: Grid, Flexbox, and Container Queries',
        author: 'Marcus Johnson',
        time: '5 days ago',
        thumb: 'images/ai5.jpg',
        avatar: 'images/avatar6.jpg',
      },
      {
        tag: '#TypeScript',
        title: 'Advanced TypeScript Patterns for Large Codebases',
        author: 'Emily Zhao',
        time: '6 days ago',
        thumb: 'images/scrape2.jpg',
        avatar: 'images/avatar7.jpg',
      },
      {
        tag: '#Node.js',
        title: 'Building Scalable APIs with Node.js and Express',
        author: 'James Wilson',
        time: '1 week ago',
        thumb: 'images/scrape3.jpg',
        avatar: 'images/avatar8.jpg',
      },
    ];

    loadMoreBtn.addEventListener('click', () => {
      extraArticles.forEach((article) => {
        const card = document.createElement('article');
        card.className = 'article-card';
        card.innerHTML = `
          <div class="thumb">
            <img src="${article.thumb}" alt="${article.title}" loading="lazy">
            <span class="tag-label">${article.tag}</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">${article.title}</h3>
            <div class="card-meta">
              <img src="${article.avatar}" alt="${article.author}">
              <span class="author-name">${article.author}</span>
              <span class="time">${article.time}</span>
            </div>
          </div>
        `;
        articleGrid.appendChild(card);
      });
      loadMoreBtn.style.display = 'none';
    });
  }
})();
