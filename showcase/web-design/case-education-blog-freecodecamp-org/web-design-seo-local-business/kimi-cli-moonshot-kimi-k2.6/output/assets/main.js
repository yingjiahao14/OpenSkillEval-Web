/* OpenLearnHub - Main JavaScript */

(function () {
  'use strict';

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Donation amount tabs
  const amountTabs = document.querySelectorAll('.amount-tab');
  const donationDesc = document.getElementById('donation-description');
  const donationSub = document.getElementById('donation-sub');

  if (amountTabs.length) {
    const descriptions = {
      '5': 'Your $5 donation will provide 250 hours of learning to people around the world each month.',
      '10': 'Your $10 donation will provide 500 hours of learning to people around the world each month.',
      '20': 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
      '40': 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.'
    };

    amountTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        amountTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        const amount = tab.dataset.amount;
        if (donationDesc && descriptions[amount]) {
          donationDesc.textContent = descriptions[amount];
        }
        if (donationSub) {
          donationSub.innerHTML = 'Donating $' + amount + ' / month: <a href="#">edit amount</a> · Secure donation';
        }
      });
    });
  }

  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');
        // Optional: close others
        // faqItems.forEach(function (i) { i.classList.remove('open'); });
        item.classList.toggle('open', !isOpen);
      });
    }
  });

  // Load more articles
  const loadMoreBtn = document.getElementById('load-more-btn');
  const articleGrid = document.getElementById('article-grid');

  if (loadMoreBtn && articleGrid) {
    const extraArticles = [
      {
        tag: 'Python',
        tagClass: 'tag-python',
        title: 'How to Build a REST API with Flask and SQLAlchemy',
        author: 'Sarah Chen',
        time: '2 days ago',
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=340&fit=crop'
      },
      {
        tag: 'JavaScript',
        tagClass: 'tag-javascript',
        title: 'Understanding Async/Await in Modern JavaScript',
        author: 'David Park',
        time: '3 days ago',
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=340&fit=crop'
      },
      {
        tag: 'React',
        tagClass: 'tag-react',
        title: 'Building Custom Hooks for Data Fetching in React 18',
        author: 'Aisha Patel',
        time: '4 days ago',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop'
      },
      {
        tag: 'CSS',
        tagClass: 'tag-css',
        title: 'Modern CSS Layouts: Grid vs Flexbox — When to Use Which',
        author: 'Lucas Meyer',
        time: '5 days ago',
        image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=340&fit=crop'
      },
      {
        tag: 'Web Development',
        tagClass: 'tag-web-development',
        title: 'A Complete Guide to Web Accessibility for Developers',
        author: 'Emma Wilson',
        time: '6 days ago',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=340&fit=crop'
      },
      {
        tag: 'General Programming',
        tagClass: 'tag-general-programming',
        title: 'Clean Code Principles Every Developer Should Know',
        author: 'Robert Lin',
        time: '1 week ago',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop'
      }
    ];

    loadMoreBtn.addEventListener('click', function () {
      extraArticles.forEach(function (article) {
        const card = document.createElement('article');
        card.className = 'article-card';
        card.innerHTML =
          '<div class="card-image-wrap">' +
            '<img src="' + article.image + '" alt="" class="card-image" loading="lazy">' +
          '</div>' +
          '<div class="card-content">' +
            '<span class="tag ' + article.tagClass + '">' + article.tag + '</span>' +
            '<h3><a href="#">' + article.title + '</a></h3>' +
            '<div class="card-meta">' +
              '<img src="https://ui-avatars.com/api/?name=' + encodeURIComponent(article.author) + '&background=0a0a23&color=fff&size=64" alt="" class="avatar">' +
              '<span class="author-name">' + article.author + '</span>' +
              '<span>·</span>' +
              '<span>' + article.time + '</span>' +
            '</div>' +
          '</div>';
        articleGrid.appendChild(card);
      });
      loadMoreBtn.style.display = 'none';
    });
  }
})();
