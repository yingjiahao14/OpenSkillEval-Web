/* ============================================
   OpenLearnHub — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile Hamburger Menu --- */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });
    // Close mobile nav when a link is clicked
    var mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* --- Donation Amount Tabs --- */
  var amountBtns = document.querySelectorAll('.donation-amount-btn');
  var donationDesc = document.getElementById('donationDescription');
  if (amountBtns.length && donationDesc) {
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
        if (descriptions[amount]) {
          donationDesc.textContent = descriptions[amount];
        }
      });
    });
  }

  /* --- FAQ Accordion --- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        // Close all others
        faqItems.forEach(function (other) { other.classList.remove('open'); });
        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  /* --- Load More Articles --- */
  var loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      var hiddenCards = document.querySelectorAll('.article-card.hidden-card');
      var count = 0;
      hiddenCards.forEach(function (card) {
        if (count < 3) {
          card.classList.remove('hidden-card');
          count++;
        }
      });
      // Hide button if no more hidden cards
      var remaining = document.querySelectorAll('.article-card.hidden-card').length;
      if (remaining === 0) {
        loadMoreBtn.style.display = 'none';
      }
    });
  }

});
