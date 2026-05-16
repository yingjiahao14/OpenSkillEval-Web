/* ============================================
   OpenLearnHub — Global Scripts
   ============================================ */

(function () {
  'use strict';

  /* ---------- Mobile Menu Toggle ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ---------- Donation Amount Tabs ---------- */
  const amountTabs = document.querySelectorAll('.amount-tab');
  const donationDesc = document.getElementById('donation-desc');
  const donateBtn = document.getElementById('donate-btn');
  const donationSub = document.getElementById('donation-sub');

  const donationCopy = {
    5:  'Your <strong>$5</strong> donation will provide 250 hours of learning to people around the world each month.',
    10: 'Your <strong>$10</strong> donation will provide 500 hours of learning to people around the world each month.',
    20: 'Your <strong>$20</strong> donation will provide 1,000 hours of learning to people around the world each month.',
    40: 'Your <strong>$40</strong> donation will provide 2,000 hours of learning to people around the world each month.'
  };

  amountTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      amountTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const amount = tab.dataset.amount;
      if (donationDesc) donationDesc.innerHTML = donationCopy[amount];
      if (donateBtn) donateBtn.textContent = 'Donate $' + amount;
      if (donationSub) {
        donationSub.innerHTML = 'Donating <strong>$' + amount + ' / month</strong>: <a href="#">edit amount</a> · Secure donation';
      }
    });
  });

  /* ---------- FAQ Accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others (optional accordion behavior)
      faqItems.forEach(i => i.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ---------- Load More Articles ---------- */
  const loadMoreBtn = document.getElementById('load-more-btn');
  const articleGrid = document.getElementById('article-grid');

  const extraArticles = [
    {
      tag: '#javascript',
      title: 'Understanding Closures in JavaScript: A Deep Dive for Beginners',
      author: 'Sarah Chen',
      time: '2 days ago',
      gradient: 'linear-gradient(135deg, #fef3c7, #fde68a)'
    },
    {
      tag: '#react',
      title: 'React Server Components: What They Are and How to Use Them',
      author: 'David Park',
      time: '3 days ago',
      gradient: 'linear-gradient(135deg, #dbeafe, #bfdbfe)'
    },
    {
      tag: '#python',
      title: 'Python Decorators Explained with Real-World Examples',
      author: 'Aisha Patel',
      time: '4 days ago',
      gradient: 'linear-gradient(135deg, #d1fae5, #a7f3d0)'
    },
    {
      tag: '#css',
      title: 'Modern CSS Layouts: Grid vs Flexbox — When to Use Which',
      author: 'Lucas Müller',
      time: '5 days ago',
      gradient: 'linear-gradient(135deg, #fce7f3, #fbcfe8)'
    },
    {
      tag: '#databases',
      title: 'Redis Caching Strategies for High-Performance Applications',
      author: 'Emily Zhao',
      time: '6 days ago',
      gradient: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)'
    },
    {
      tag: '#devops',
      title: 'Getting Started with Docker Compose for Local Development',
      author: 'James O\'Brien',
      time: '1 week ago',
      gradient: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)'
    }
  ];

  if (loadMoreBtn && articleGrid) {
    loadMoreBtn.addEventListener('click', () => {
      extraArticles.forEach(art => {
        const card = document.createElement('article');
        card.className = 'article-card';
        card.innerHTML = `
          <div class="thumbnail" style="background: ${art.gradient}">
            <span class="tag-label">${art.tag}</span>
          </div>
          <div class="card-body">
            <h3 class="card-title">${art.title}</h3>
            <div class="card-meta">
              <div class="avatar">${art.author.split(' ').map(n => n[0]).join('')}</div>
              <span class="author-name">${art.author}</span>
              <span class="timestamp">· ${art.time}</span>
            </div>
          </div>
        `;
        articleGrid.appendChild(card);
      });

      loadMoreBtn.style.display = 'none';
    });
  }
})();
