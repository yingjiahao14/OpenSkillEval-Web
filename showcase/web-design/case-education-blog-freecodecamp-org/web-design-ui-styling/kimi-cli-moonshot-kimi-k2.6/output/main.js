// OpenLearnHub - Global JavaScript

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
});

// Donation amount tabs
function initDonationTabs() {
  const tabs = document.querySelectorAll('.donation-tab');
  const description = document.getElementById('donation-description');
  const sublabel = document.getElementById('donation-sublabel');

  if (!tabs.length || !description || !sublabel) return;

  const amounts = {
    5: {
      text: 'Your $5 donation will provide 250 hours of learning to people around the world each month.',
      label: 'Donating $5 / month: edit amount · Secure donation'
    },
    10: {
      text: 'Your $10 donation will provide 500 hours of learning to people around the world each month.',
      label: 'Donating $10 / month: edit amount · Secure donation'
    },
    20: {
      text: 'Your $20 donation will provide 1,000 hours of learning to people around the world each month.',
      label: 'Donating $20 / month: edit amount · Secure donation'
    },
    40: {
      text: 'Your $40 donation will provide 2,000 hours of learning to people around the world each month.',
      label: 'Donating $40 / month: edit amount · Secure donation'
    }
  };

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      const amount = parseInt(tab.dataset.amount, 10);
      const info = amounts[amount];
      if (info) {
        description.textContent = info.text;
        sublabel.textContent = info.label;
      }
    });
  });
}

// FAQ Accordion
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      // Optional: close others
      // items.forEach(function (i) { i.classList.remove('open'); });
      item.classList.toggle('open', !isOpen);
    });
  });
}

// Load More Articles
function initLoadMore() {
  const btn = document.getElementById('load-more-btn');
  const grid = document.getElementById('article-grid');
  if (!btn || !grid) return;

  const extraArticles = [
    {
      tag: 'JavaScript',
      tagClass: 'tag-javascript',
      title: 'Understanding JavaScript Closures: A Complete Guide for Beginners',
      author: 'Sarah Chen',
      time: '2 days ago',
      thumb: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=340&fit=crop'
    },
    {
      tag: 'Python',
      tagClass: 'tag-python',
      title: 'Python Data Structures: Lists, Dictionaries, and Beyond',
      author: 'David Park',
      time: '3 days ago',
      thumb: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=340&fit=crop'
    },
    {
      tag: 'React',
      tagClass: 'tag-react',
      title: 'Building Accessible React Components from Scratch',
      author: 'Emily Rodriguez',
      time: '4 days ago',
      thumb: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop'
    },
    {
      tag: 'CSS',
      tagClass: 'tag-css',
      title: 'Modern CSS Layouts: Grid and Flexbox Mastery',
      author: 'Alex Turner',
      time: '5 days ago',
      thumb: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=340&fit=crop'
    },
    {
      tag: 'Web Development',
      tagClass: 'tag-web-development',
      title: 'Full-Stack Deployment Strategies for Small Teams',
      author: 'Jordan Lee',
      time: '6 days ago',
      thumb: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=340&fit=crop'
    },
    {
      tag: 'General Programming',
      tagClass: 'tag-general-programming',
      title: 'Clean Code Principles Every Developer Should Know',
      author: 'Morgan Blake',
      time: '1 week ago',
      thumb: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=340&fit=crop'
    }
  ];

  let loaded = false;

  btn.addEventListener('click', function () {
    if (loaded) return;
    loaded = true;
    btn.textContent = 'Loading...';

    // Simulate async load
    setTimeout(function () {
      extraArticles.forEach(function (article) {
        const card = document.createElement('article');
        card.className = 'article-card';
        card.innerHTML =
          '<img class="thumbnail" src="' + article.thumb + '" alt="" loading="lazy">' +
          '<div class="card-body">' +
            '<a href="#" class="tag ' + article.tagClass + '">' + article.tag + '</a>' +
            '<a href="#" class="card-title">' + article.title + '</a>' +
            '<div class="card-meta">' +
              '<img class="author-avatar" src="https://ui-avatars.com/api/?name=' + encodeURIComponent(article.author) + '&background=random&size=56" alt="">' +
              '<span class="author-name">' + article.author + '</span>' +
              '<span class="timestamp">' + article.time + '</span>' +
            '</div>' +
          '</div>';
        grid.appendChild(card);
      });

      btn.textContent = 'Load More Articles';
      btn.disabled = true;
      btn.style.opacity = '0.6';
      btn.style.cursor = 'not-allowed';
    }, 400);
  });
}

// Initialize all on DOM ready
document.addEventListener('DOMContentLoaded', function () {
  initDonationTabs();
  initFaqAccordion();
  initLoadMore();
});
