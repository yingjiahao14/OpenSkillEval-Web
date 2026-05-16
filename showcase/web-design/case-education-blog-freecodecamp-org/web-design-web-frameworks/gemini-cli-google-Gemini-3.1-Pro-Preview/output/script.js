document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Load More Articles
  const loadMoreBtn = document.getElementById('load-more-btn');
  const articleGrid = document.querySelector('.article-grid');

  if (loadMoreBtn && articleGrid) {
    loadMoreBtn.addEventListener('click', () => {
      // Simulate loading more articles
      const newArticles = [
        {
          tag: '#react',
          title: 'Understanding React Server Components in 2024',
          author: 'Sarah Drasner',
          time: '2 days ago'
        },
        {
          tag: '#python',
          title: 'Automating Boring Stuff with Python and AI',
          author: 'Al Sweigart',
          time: '3 days ago'
        },
        {
          tag: '#css',
          title: 'Mastering CSS Grid and Subgrid: A Comprehensive Guide',
          author: 'Rachel Andrew',
          time: '4 days ago'
        }
      ];

      newArticles.forEach(article => {
        const articleHTML = `
          <div class="article-card">
            <div class="card-img" style="background-image: url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400');"></div>
            <div class="card-content">
              <span class="tag-label">${article.tag}</span>
              <h3 class="card-title"><a href="#">${article.title}</a></h3>
              <div class="author-info">
                <div class="avatar">${article.author.charAt(0)}</div>
                <div class="author-meta">
                  <span class="author-name">${article.author}</span>
                  <span class="post-time">${article.time}</span>
                </div>
              </div>
            </div>
          </div>
        `;
        articleGrid.insertAdjacentHTML('beforeend', articleHTML);
      });
      
      // Remove button after one click for demo purposes
      loadMoreBtn.style.display = 'none';
    });
  }

  // Donation Amount Tabs
  const amountTabs = document.querySelectorAll('.amount-tab');
  const dynamicText = document.querySelector('.donation-dynamic-text');

  if (amountTabs.length > 0 && dynamicText) {
    amountTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        amountTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const amount = tab.getAttribute('data-amount');
        const hours = amount * 50; // $20 = 1000 hours, so 50 hours per dollar
        dynamicText.textContent = `Your $${amount} donation will provide ${hours.toLocaleString()} hours of learning to people around the world each month.`;
      });
    });
  }

  // FAQ Accordion
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  if (accordionTriggers.length > 0) {
    accordionTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const content = trigger.nextElementSibling;
        const icon = trigger.querySelector('i');
        
        // Toggle active class on content
        content.classList.toggle('active');
        
        // Toggle icon
        if (content.classList.contains('active')) {
          icon.classList.remove('ri-add-line');
          icon.classList.add('ri-subtract-line');
        } else {
          icon.classList.remove('ri-subtract-line');
          icon.classList.add('ri-add-line');
        }
      });
    });
  }
});