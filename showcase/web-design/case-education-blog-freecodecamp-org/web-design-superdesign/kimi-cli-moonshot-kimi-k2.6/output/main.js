/* OpenLearnHub — Shared Scripts */

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
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        lucide.createIcons();
      }
    });
  }

  // Donation amount tabs
  const donationTabs = document.querySelectorAll('.donation-tab');
  const donationText = document.getElementById('donation-text');
  const donationSubLabel = document.getElementById('donation-sub-label');

  if (donationTabs.length && donationText) {
    donationTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        donationTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        const amount = tab.dataset.amount;
        const hours = parseInt(tab.dataset.hours, 10);
        donationText.textContent =
          'Your $' + amount + ' donation will provide ' + hours.toLocaleString() +
          ' hours of learning to people around the world each month.';
        if (donationSubLabel) {
          donationSubLabel.textContent = 'Donating $' + amount + ' / month: edit amount · Secure donation';
        }
      });
    });
  }

  // FAQ accordion
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Optional: close others
      // document.querySelectorAll('.accordion-item.open').forEach(function (openItem) {
      //   if (openItem !== item) openItem.classList.remove('open');
      // });

      item.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Load more articles
  const loadMoreBtn = document.getElementById('load-more-btn');
  const articleGrid = document.getElementById('article-grid');

  if (loadMoreBtn && articleGrid) {
    const extraArticles = [
      {
        tag: 'JavaScript',
        tagClass: 'tag-general',
        title: 'Understanding Closures in JavaScript: A Practical Guide',
        author: 'Sarah Chen',
        time: '2 days ago',
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=340&fit=crop'
      },
      {
        tag: 'Python',
        tagClass: 'tag-python',
        title: 'Building REST APIs with FastAPI: A Complete Tutorial',
        author: 'David Park',
        time: '3 days ago',
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=340&fit=crop'
      },
      {
        tag: 'React',
        tagClass: 'tag-general',
        title: 'React Server Components: What You Need to Know in 2024',
        author: 'Emily Roberts',
        time: '4 days ago',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop'
      },
      {
        tag: 'CSS',
        tagClass: 'tag-general',
        title: 'Modern CSS Layouts: Grid, Flexbox, and Container Queries',
        author: 'Alex Morgan',
        time: '5 days ago',
        image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=340&fit=crop'
      },
      {
        tag: 'TypeScript',
        tagClass: 'tag-general',
        title: 'Advanced TypeScript Patterns for Large Codebases',
        author: 'James Wilson',
        time: '6 days ago',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=340&fit=crop'
      },
      {
        tag: 'Docker',
        tagClass: 'tag-general',
        title: 'Docker for Developers: From Zero to Production',
        author: 'Maria Garcia',
        time: '1 week ago',
        image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&h=340&fit=crop'
      }
    ];

    let loadCount = 0;

    loadMoreBtn.addEventListener('click', function () {
      const fragment = document.createDocumentFragment();
      const batch = extraArticles.slice(loadCount * 3, loadCount * 3 + 3);

      if (batch.length === 0) {
        loadMoreBtn.textContent = 'No more articles';
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add('btn-ghost');
        loadMoreBtn.classList.remove('btn-primary');
        return;
      }

      batch.forEach(function (article, index) {
        const card = document.createElement('article');
        card.className = 'card animate-fade-in';
        card.style.animationDelay = (index * 80) + 'ms';
        card.innerHTML =
          '<img src="' + article.image + '" alt="" class="card-image" loading="lazy">' +
          '<div class="card-body">' +
            '<span class="tag ' + article.tagClass + '">#' + article.tag + '</span>' +
            '<h3 class="mt-3 font-bold leading-tight" style="font-size:1.0625rem;">' + article.title + '</h3>' +
            '<div class="article-meta">' +
              '<span class="avatar">' + article.author.split(' ').map(function (n) { return n[0]; }).join('') + '</span>' +
              '<span>' + article.author + '</span>' +
              '<span>·</span>' +
              '<span>' + article.time + '</span>' +
            '</div>' +
          '</div>';
        fragment.appendChild(card);
      });

      articleGrid.appendChild(fragment);
      loadCount++;

      if (loadCount * 3 >= extraArticles.length) {
        loadMoreBtn.textContent = 'No more articles';
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add('btn-ghost');
        loadMoreBtn.classList.remove('btn-primary');
      }
    });
  }

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
})();
