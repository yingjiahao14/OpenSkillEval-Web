/* ============================================================
   OpenLearnHub - Shared JavaScript
   ============================================================ */

(function () {
  'use strict';

  // --- Mobile Menu Toggle ---
  function initMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var mobileNav = document.getElementById('mobileNav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function () {
      var isActive = mobileNav.classList.contains('active');
      if (isActive) {
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        mobileNav.classList.add('active');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close on link click
    var links = mobileNav.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Load More Articles ---
  function initLoadMore() {
    var btn = document.getElementById('loadMoreBtn');
    var grid = document.getElementById('articlesGrid');
    var hiddenItems = document.querySelectorAll('.article-card-hidden');
    if (!btn || !grid || hiddenItems.length === 0) return;

    btn.addEventListener('click', function () {
      hiddenItems.forEach(function (card) {
        card.classList.remove('article-card-hidden');
        card.style.display = '';
      });
      btn.style.display = 'none';
    });
  }

  // --- Donation Amount Selector ---
  function initDonationAmounts() {
    var buttons = document.querySelectorAll('.donation-amount-btn');
    var description = document.getElementById('donationDescription');
    if (buttons.length === 0 || !description) return;

    var descriptions = {
      '5': 'Your $5 donation will provide 250 hours of learning to people around the world each month.',
      '10': 'Your $10 donation will provide 500 hours of learning to people around the world each month.',
      '20': 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
      '40': 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.'
    };

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var amount = btn.getAttribute('data-amount');
        if (descriptions[amount]) {
          description.textContent = descriptions[amount];
        }
        var subLabel = document.getElementById('donationSubLabel');
        if (subLabel) {
          subLabel.textContent = 'Donating $' + amount + ' / month \u00b7 edit amount \u00b7 Secure donation';
        }
      });
    });
  }

  // --- FAQ Accordion ---
  function initFaq() {
    var faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(function (item) {
      var question = item.querySelector('.faq-question');
      if (!question) return;

      question.addEventListener('click', function () {
        var isActive = item.classList.contains('active');
        // Close all
        faqItems.forEach(function (i) { i.classList.remove('active'); });
        // Open clicked (unless it was already open)
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // --- Init all on DOM ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initMobileMenu();
      initLoadMore();
      initDonationAmounts();
      initFaq();
    });
  } else {
    initMobileMenu();
    initLoadMore();
    initDonationAmounts();
    initFaq();
  }
})();
