/* ===== Mobile Menu Toggle ===== */
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ===== Donation Amount Tabs ===== */
  const amountTabs = document.querySelectorAll('.amount-tab');
  const donationDesc = document.getElementById('donation-description');
  const donationSubLabel = document.getElementById('donation-sub-label');

  const donationTexts = {
    5: 'Your $5 donation will provide 250 hours of learning to people around the world each month.',
    10: 'Your $10 donation will provide 500 hours of learning to people around the world each month.',
    20: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
    40: 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.'
  };

  amountTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      amountTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var amount = parseInt(tab.dataset.amount);
      if (donationDesc) {
        donationDesc.textContent = donationTexts[amount] || donationTexts[20];
      }
      if (donationSubLabel) {
        donationSubLabel.innerHTML = 'Donating $' + amount + ' / month: <a href="#">edit amount</a> &middot; Secure donation';
      }
    });
  });

  /* ===== FAQ Accordion ===== */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        var wasOpen = item.classList.contains('open');
        faqItems.forEach(function (i) { i.classList.remove('open'); });
        if (!wasOpen) { item.classList.add('open'); }
      });
    }
  });

  /* ===== Load More Articles ===== */
  var loadMoreBtn = document.getElementById('load-more-btn');
  var hiddenCards = document.querySelectorAll('.article-card.hidden');

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      var shown = 0;
      hiddenCards.forEach(function (card) {
        if (card.classList.contains('hidden') && shown < 3) {
          card.classList.remove('hidden');
          card.style.display = '';
          shown++;
        }
      });
      hiddenCards = document.querySelectorAll('.article-card.hidden');
      if (hiddenCards.length === 0) {
        loadMoreBtn.style.display = 'none';
      }
    });
  }
});
