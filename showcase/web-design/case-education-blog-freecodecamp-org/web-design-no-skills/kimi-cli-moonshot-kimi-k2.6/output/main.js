(function () {
  'use strict';

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const expanded = mobileNav.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Donation amount tabs
  const amountTabs = document.querySelectorAll('.amount-tab');
  const donationDesc = document.getElementById('donation-desc');
  const donateSub = document.getElementById('donate-sub');

  if (amountTabs.length && donationDesc) {
    const impacts = {
      5: 'Your $5 donation will provide 250 hours of learning to people around the world each month.',
      10: 'Your $10 donation will provide 500 hours of learning to people around the world each month.',
      20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
      40: 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.'
    };

    amountTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        amountTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const amount = parseInt(tab.dataset.amount, 10);
        donationDesc.innerHTML = impacts[amount] || '';
        if (donateSub) {
          donateSub.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
        }
      });
    });
  }

  // FAQ accordion
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

  // Load more articles
  const loadMoreBtn = document.getElementById('load-more-btn');
  const articleGrid = document.getElementById('article-grid');

  if (loadMoreBtn && articleGrid) {
    const extraArticles = [
      {
        tag: '#JavaScript',
        tagClass: 'tag-javascript',
        title: 'Understanding Closures in JavaScript: A Practical Guide',
        author: 'Sarah Chen',
        time: '2 days ago',
        thumb: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=340&fit=crop'
      },
      {
        tag: '#React',
        tagClass: 'tag-react',
        title: 'React Server Components: What You Need to Know in 2025',
        author: 'Michael Park',
        time: '3 days ago',
        thumb: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop'
      },
      {
        tag: '#Python',
        tagClass: 'tag-python',
        title: 'Async Python: Writing High-Performance I/O Bound Applications',
        author: 'Aisha Patel',
        time: '4 days ago',
        thumb: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=340&fit=crop'
      },
      {
        tag: '#CSS',
        tagClass: 'tag-css',
        title: 'Modern CSS Layouts: Grid, Flexbox, and Container Queries',
        author: 'Lucas Meyer',
        time: '5 days ago',
        thumb: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=340&fit=crop'
      },
      {
        tag: '#tech',
        tagClass: 'tag-tech',
        title: 'The State of Developer Tools in 2025',
        author: 'Emily Zhao',
        time: '6 days ago',
        thumb: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=340&fit=crop'
      },
      {
        tag: '#startup',
        tagClass: 'tag-startup',
        title: 'From Side Project to Startup: Lessons from Bootstrapped Founders',
        author: 'David Okafor',
        time: '1 week ago',
        thumb: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=340&fit=crop'
      }
    ];

    loadMoreBtn.addEventListener('click', () => {
      extraArticles.forEach(art => {
        const card = document.createElement('article');
        card.className = 'article-card';
        card.innerHTML = `
          <img class="thumb" src="${art.thumb}" alt="" loading="lazy">
          <div class="body">
            <span class="tag-label ${art.tagClass}">${art.tag}</span>
            <h3>${art.title}</h3>
            <div class="meta">
              <img class="avatar" src="https://ui-avatars.com/api/?name=${encodeURIComponent(art.author)}&background=random&size=64" alt="${art.author}">
              <span>${art.author}</span>
              <span>·</span>
              <span>${art.time}</span>
            </div>
          </div>
        `;
        articleGrid.appendChild(card);
      });
      loadMoreBtn.style.display = 'none';
    });
  }
})();
