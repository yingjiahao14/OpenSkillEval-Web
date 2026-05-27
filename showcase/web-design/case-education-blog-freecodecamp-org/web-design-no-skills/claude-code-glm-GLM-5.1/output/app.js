// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      mobileNav.classList.toggle('active');
    });
  }

  // ===== Donation Amount Tabs =====
  const amountTabs = document.querySelectorAll('.amount-tab');
  const donateDesc = document.querySelector('.donate-description');
  const donateSub = document.querySelector('.donate-sub');
  const descriptions = {
    5: 'Your $5 donation will help provide learning resources to people around the world each month.',
    10: 'Your $10 donation will provide 500 hours of learning to people around the world each month.',
    20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
    40: 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.'
  };

  amountTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      amountTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var amount = tab.getAttribute('data-amount');
      if (donateDesc) donateDesc.textContent = descriptions[amount] || descriptions[20];
      if (donateSub) donateSub.textContent = 'Donating $' + amount + ' / month: edit amount · Secure donation';
    });
  });

  // ===== FAQ Accordion =====
  var faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var answer = item.querySelector('.faq-answer');
      var isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        var openAnswer = openItem.querySelector('.faq-answer');
        if (openAnswer) openAnswer.style.maxHeight = null;
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ===== Load More Articles =====
  var loadMoreBtn = document.querySelector('.btn-load-more');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      var grid = document.querySelector('.article-grid');
      if (!grid) return;

      var moreArticles = [
        { tag: 'Python', title: 'Python Regular Expressions – How to Use Regex for Pattern Matching', author: 'Jessica Wilkins', time: '2 days ago', color: '#306998' },
        { tag: 'CSS', title: 'CSS Animations – A Complete Guide with Examples', author: 'Kolade Chris', time: '2 days ago', color: '#264de4' },
        { tag: 'React', title: 'How to Build a Custom Hook in React – A Step-by-Step Guide', author: 'Ihechikara Abba', time: '3 days ago', color: '#61dafb' }
      ];

      moreArticles.forEach(function (article) {
        var card = document.createElement('article');
        card.className = 'article-card';
        card.innerHTML =
          '<div class="card-thumb" style="background:' + article.color + '22">' +
            '<span class="card-tag">#' + article.tag + '</span>' +
          '</div>' +
          '<div class="card-body">' +
            '<h3 class="card-title">' + article.title + '</h3>' +
            '<div class="card-meta">' +
              '<div class="card-avatar"></div>' +
              '<span>' + article.author + '</span>' +
              '<span>·</span>' +
              '<span>' + article.time + '</span>' +
            '</div>' +
          '</div>';
        grid.appendChild(card);
      });

      loadMoreBtn.textContent = 'No More Articles';
      loadMoreBtn.disabled = true;
      loadMoreBtn.style.opacity = '0.5';
      loadMoreBtn.style.cursor = 'default';
    });
  }
});
