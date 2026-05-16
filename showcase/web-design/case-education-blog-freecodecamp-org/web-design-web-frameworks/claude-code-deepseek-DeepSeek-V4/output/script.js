/* === OpenLearnHub — Shared Scripts === */

document.addEventListener('DOMContentLoaded', function () {

  /* ========== Mobile Hamburger Menu ========== */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  /* ========== Load More Articles ========== */
  const loadMoreBtn = document.querySelector('.btn-load-more');
  const articleGrid = document.querySelector('.article-grid');

  if (loadMoreBtn && articleGrid) {
    var loadCount = 0;
    var extraArticles = [
      {
        tag: '#React',
        title: 'React Server Components: A Comprehensive Guide for Full-Stack Developers',
        author: 'Joel Olawanle',
        time: '2 days ago',
        tagClass: 'tag-react',
        avatarClass: 'avatar-2'
      },
      {
        tag: '#JavaScript',
        title: 'Understanding Closures in JavaScript: From Beginner to Advanced Patterns',
        author: 'Manish Shivanandhan',
        time: '2 days ago',
        tagClass: 'tag-javascript',
        avatarClass: 'avatar-1'
      },
      {
        tag: '#Python',
        title: 'Building Scalable APIs with FastAPI: A Production-Ready Approach',
        author: 'iyiola',
        time: '3 days ago',
        tagClass: 'tag-python',
        avatarClass: 'avatar-3'
      },
      {
        tag: '#CSS',
        title: 'Modern CSS Layout Techniques: Grid, Flexbox, and Container Queries',
        author: 'Oluwatobi',
        time: '3 days ago',
        tagClass: 'tag-css',
        avatarClass: 'avatar-4'
      },
      {
        tag: '#tech',
        title: 'The Rise of Edge Computing: What Developers Need to Know in 2026',
        author: 'Puneet Singh',
        time: '4 days ago',
        tagClass: 'tag-tech',
        avatarClass: 'avatar-5'
      },
      {
        tag: '#Web Development',
        title: 'Full-Stack TypeScript: End-to-End Type Safety with tRPC and Prisma',
        author: 'Rudrendu Paul',
        time: '5 days ago',
        tagClass: 'tag-webdev',
        avatarClass: 'avatar-1'
      }
    ];

    loadMoreBtn.addEventListener('click', function () {
      if (loadCount >= extraArticles.length) {
        loadMoreBtn.textContent = 'No More Articles';
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = '0.5';
        return;
      }

      var batch = extraArticles.slice(loadCount, loadCount + 3);
      loadCount += 3;

      batch.forEach(function (article) {
        var card = document.createElement('article');
        card.className = 'article-card';
        card.innerHTML =
          '<div class="card-thumb">' +
            '<span class="thumb-icon">&lt;/&gt;</span>' +
          '</div>' +
          '<div class="card-body">' +
            '<span class="tag ' + article.tagClass + '">' + article.tag + '</span>' +
            '<h3 class="card-title-sm"><a href="#">' + article.title + '</a></h3>' +
            '<div class="card-meta">' +
              '<div class="author-avatar ' + article.avatarClass + '">' + article.author.charAt(0) + '</div>' +
              '<span class="author-name">' + article.author + '</span>' +
              '<span class="meta-sep">·</span>' +
              '<span>' + article.time + '</span>' +
            '</div>' +
          '</div>';
        articleGrid.appendChild(card);
      });

      if (loadCount >= extraArticles.length) {
        loadMoreBtn.textContent = 'No More Articles';
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.opacity = '0.5';
      }
    });
  }

  /* ========== Donation Amount Selector ========== */
  var amountBtns = document.querySelectorAll('.amount-btn');
  var donationDesc = document.querySelector('.donation-description');
  var donationSubLabel = document.querySelector('.donation-sub-label');

  if (amountBtns.length > 0 && donationDesc) {
    var descriptions = {
      '5': 'Your $5 donation will provide 250 hours of learning to people around the world each month.',
      '10': 'Your $10 donation will provide 500 hours of learning to people around the world each month.',
      '20': 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
      '40': 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.'
    };

    amountBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        amountBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var amount = btn.getAttribute('data-amount');
        donationDesc.textContent = descriptions[amount];

        if (donationSubLabel) {
          donationSubLabel.textContent = 'Donating $' + amount + ' / month: edit amount \u00b7 Secure donation';
        }
      });
    });

    // Set default active
    var defaultActive = document.querySelector('.amount-btn.active') || amountBtns[2];
    defaultActive.click();
  }

  /* ========== FAQ Accordion ========== */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        var wasOpen = item.classList.contains('open');

        // Close all
        faqItems.forEach(function (faq) { faq.classList.remove('open'); });

        // Toggle clicked
        if (!wasOpen) {
          item.classList.add('open');
        }
      });
    }
  });
});
