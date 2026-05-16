/* ============================================================
   OpenLearnHub — Shared Scripts
   ============================================================ */

(function () {
  'use strict';

  // --- Mobile Menu Toggle ---
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Donation Amount Tabs ---
  var amountBtns = document.querySelectorAll('.amount-btn');
  var donateDesc = document.getElementById('donate-description');

  if (amountBtns.length && donateDesc) {
    var messages = {};
    amountBtns.forEach(function (btn) {
      messages[btn.getAttribute('data-amount')] = btn.getAttribute('data-desc');
    });

    amountBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        amountBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var amt = btn.getAttribute('data-amount');
        donateDesc.textContent = messages[amt];

        var subLabel = document.getElementById('donate-sub-label');
        if (subLabel) {
          subLabel.innerHTML =
            'Donating <strong>$' + amt + ' / month</strong> &middot; <a href="#">edit amount</a> &middot; Secure donation';
        }
      });
    });
  }

  // --- FAQ Accordion ---
  var faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      if (!item) return;

      var isOpen = item.classList.contains('open');

      if (isOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });

  // --- Load More Articles ---
  var loadMoreBtn = document.getElementById('load-more-btn');
  var articleGrid = document.getElementById('article-grid');

  if (loadMoreBtn && articleGrid) {
    var moreArticles = [
      {
        tag: 'JavaScript',
        tagClass: 'tag-javascript',
        title: 'How to Build a Real-Time Chat App with Node.js and Socket.io',
        author: 'Jessica Wilkins',
        initials: 'JW',
        avatarClass: 'avatar-6',
        time: '2 days ago',
        colors: ['#F59E0B', '#D97706']
      },
      {
        tag: 'Python',
        tagClass: 'tag-python',
        title: 'Python Web Scraping with BeautifulSoup: A Complete Beginner\'s Guide',
        author: 'Beau Carnes',
        initials: 'BC',
        avatarClass: 'avatar-7',
        time: '3 days ago',
        colors: ['#6366F1', '#4F46E5']
      },
      {
        tag: 'General Programming',
        tagClass: 'tag-general',
        title: 'Understanding Big O Notation: A Practical Guide for Developers',
        author: 'Megan Kaczanowski',
        initials: 'MK',
        avatarClass: 'avatar-1',
        time: '4 days ago',
        colors: ['#64748B', '#475569']
      },
      {
        tag: 'React',
        tagClass: 'tag-ai',
        title: 'React Server Components: The Future of React Development',
        author: 'Dionysia Lemonaki',
        initials: 'DL',
        avatarClass: 'avatar-2',
        time: '5 days ago',
        colors: ['#8B5CF6', '#7C3AED']
      },
      {
        tag: 'CSS',
        tagClass: 'tag-databases',
        title: 'Modern CSS Layout Techniques: Grid, Flexbox, and Container Queries',
        author: 'Kolade Chris',
        initials: 'KC',
        avatarClass: 'avatar-3',
        time: '6 days ago',
        colors: ['#3B82F6', '#2563EB']
      },
      {
        tag: 'Web Development',
        tagClass: 'tag-web-scraping',
        title: 'Full-Stack Web Development Roadmap for 2026',
        author: 'Quincy Larson',
        initials: 'QL',
        avatarClass: 'avatar-4',
        time: '1 week ago',
        colors: ['#10B981', '#059669']
      }
    ];

    var loaded = false;

    loadMoreBtn.addEventListener('click', function () {
      if (loaded) return;
      loaded = true;

      moreArticles.forEach(function (article) {
        var card = createArticleCard(article);
        articleGrid.appendChild(card);
      });

      loadMoreBtn.textContent = 'No More Articles';
      loadMoreBtn.disabled = true;
      loadMoreBtn.classList.add('btn-disabled');
    });
  }

  function createArticleCard(article) {
    var card = document.createElement('article');
    card.className = 'article-card';

    var id = 'lm' + moreArticles.indexOf(article);
    var svgNs = 'http://www.w3.org/2000/svg';
    var thumbSvg = '<svg xmlns="' + svgNs + '" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">' +
      '<defs><linearGradient id="' + id + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" style="stop-color:' + article.colors[0] + ';stop-opacity:1"/>' +
      '<stop offset="100%" style="stop-color:' + article.colors[1] + ';stop-opacity:1"/>' +
      '</linearGradient></defs>' +
      '<rect width="400" height="225" fill="url(#' + id + ')"/>' +
      '<circle cx="340" cy="180" r="80" fill="rgba(255,255,255,0.1)"/>' +
      '<circle cx="60" cy="45" r="45" fill="rgba(255,255,255,0.08)"/>' +
      '</svg>';

    card.innerHTML =
      '<div class="card-thumb">' + thumbSvg + '</div>' +
      '<div class="card-body">' +
        '<span class="card-tag ' + article.tagClass + '">#' + article.tag.toLowerCase() + '</span>' +
        '<h3 class="card-title"><a href="#">' + article.title + '</a></h3>' +
        '<div class="card-meta">' +
          '<div class="author-avatar ' + article.avatarClass + '">' + article.initials + '</div>' +
          '<span class="card-author">' + article.author + '</span>' +
          '<span class="card-time">' + article.time + '</span>' +
        '</div>' +
      '</div>';

    return card;
  }
})();
