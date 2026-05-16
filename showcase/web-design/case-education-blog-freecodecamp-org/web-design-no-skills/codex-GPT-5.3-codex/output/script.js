(function () {
  const menuBtn = document.querySelector('[data-menu-btn]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      const open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  const articleGrid = document.querySelector('[data-article-grid]');
  const loadMoreBtn = document.querySelector('[data-load-more]');
  const moreArticles = [
    { tag: '#AI', cls: 'tag-ai', title: 'The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship', author: 'Amina Okafor', time: '2 days ago' },
    { tag: '#web scraping', cls: 'tag-scrape', title: 'How to Turn Websites into LLM-Ready Data Using Firecrawl', author: 'Kelechi Udo', time: '3 days ago' },
    { tag: '#web scraping', cls: 'tag-scrape', title: 'How to Use Python to Build Your Own Web Scraper', author: 'Marta Ruiz', time: '4 days ago' },
    { tag: '#AI', cls: 'tag-ai', title: 'GPT-5.4 vs GLM-5: Is Open Source Finally Matching Proprietary AI?', author: 'Devon Harper', time: '5 days ago' }
  ];

  function cardTemplate(item) {
    return '<article class="card">' +
      '<img class="thumb" src="https://picsum.photos/seed/' + encodeURIComponent(item.title.slice(0, 18)) + '/640/360" alt="Article thumbnail">' +
      '<div class="card-content">' +
      '<a href="' + (item.tag.toLowerCase().includes('web scraping') ? 'tag-web-scraping.html' : (item.tag === '#AI' ? 'tag-ai.html' : '#')) + '"><span class="tag ' + item.cls + '">' + item.tag + '</span></a>' +
      '<h3 class="card-title">' + item.title + '</h3>' +
      '<div class="author-row"><img class="avatar" src="https://i.pravatar.cc/64?u=' + encodeURIComponent(item.author) + '" alt="Author avatar"><span>' + item.author + ' · ' + item.time + '</span></div>' +
      '</div></article>';
  }

  if (articleGrid && loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      articleGrid.insertAdjacentHTML('beforeend', moreArticles.map(cardTemplate).join(''));
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = 'All Articles Loaded';
    });
  }

  const donationTabs = document.querySelectorAll('[data-amount]');
  const donationText = document.querySelector('[data-donation-text]');
  if (donationTabs.length && donationText) {
    donationTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        donationTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        const amount = tab.getAttribute('data-amount');
        donationText.textContent = 'Your $' + amount + ' donation will provide 1,000 hours of learning to people around the world each month.';
        const sub = document.querySelector('[data-donation-sub]');
        if (sub) sub.textContent = 'Donating $' + amount + ' / month: edit amount · Secure donation';
      });
    });
  }

  const faqBtns = document.querySelectorAll('[data-faq-btn]');
  faqBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.parentElement.classList.toggle('open');
    });
  });
})();
