document.addEventListener('DOMContentLoaded', () => {
  // Mega Menu Interactions
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    // Only handle click for touch devices, otherwise hover is handled by CSS
    item.addEventListener('click', (e) => {
      const megaMenu = item.querySelector('.mega-menu');
      if (megaMenu) {
        // Toggle the active class
        const isActive = megaMenu.classList.contains('active');
        
        // Close all other mega menus
        document.querySelectorAll('.mega-menu').forEach(menu => {
          menu.classList.remove('active');
        });
        
        if (!isActive) {
          megaMenu.classList.add('active');
        }
      }
    });
  });

  // Close mega menu on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.mega-menu').forEach(menu => {
        menu.classList.remove('active');
      });
    }
  });

  // Recommended Reads Tabs
  const tabs = document.querySelectorAll('.tab');
  const articleGrid = document.querySelector('.article-grid');
  
  // Articles data (mock)
  const articlesData = {
    'Top Reads': [
      { title: '16 Superfoods That Are Worthy of the Title' },
      { title: 'Does Ozempic Cause Hair Loss?' },
      { title: 'Can Music Therapy Help with Depression?' },
      { title: 'These Are the 8 Best Calorie Counter Apps' }
    ],
    'Fitness': [
      { title: '10 Beginner Exercises for a Full Body Workout' },
      { title: 'How Often Should You Really Work Out?' },
      { title: 'The Best Post-Workout Recovery Foods' },
      { title: 'Yoga for Flexibility: 5 Poses to Try' }
    ],
    'Mental Well-Being': [
      { title: 'Can Music Therapy Help with Depression?' },
      { title: 'Understanding Burnout and How to Recover' },
      { title: '5 Daily Habits for Better Mental Health' },
      { title: 'The Connection Between Gut Health and Mood' }
    ],
    'Product Reviews': [
      { title: 'These Are the 8 Best Calorie Counter Apps' },
      { title: 'We Tested the Top 5 Sleep Trackers' },
      { title: 'Best Ergonomic Office Chairs for Back Pain' },
      { title: 'Are Weighted Blankets Worth It?' }
    ],
    'Recipes': [
      { title: '16 Superfoods That Are Worthy of the Title' },
      { title: 'Quick & Healthy Mediterranean Bowls' },
      { title: 'High-Protein Breakfast Ideas to Fuel Your Day' },
      { title: 'Gut-Friendly Fermented Foods to Try' }
    ],
    'Skin Care': [
      { title: 'The Ultimate Guide to Vitamin C Serums' },
      { title: 'How to Build a Minimalist Skincare Routine' },
      { title: 'Does Drinking More Water Actually Hydrate Skin?' },
      { title: 'Sunscreen 101: Mineral vs. Chemical' }
    ]
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Get category
      const category = tab.textContent;
      const categoryArticles = articlesData[category] || articlesData['Top Reads'];
      
      // Update article grid
      articleGrid.innerHTML = '';
      categoryArticles.forEach(article => {
        const articleHtml = `
          <div class="article-card">
            <div class="article-img"></div>
            <div class="article-content">
              <h4 class="article-title">${article.title}</h4>
            </div>
          </div>
        `;
        articleGrid.insertAdjacentHTML('beforeend', articleHtml);
      });
    });
  });

  // Health Topics Carousel
  const track = document.querySelector('.topics-track');
  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');

  if (track && btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
      track.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    btnNext.addEventListener('click', () => {
      track.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }

  // Newsletter Submission (Visual feedback)
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      
      if (input.value) {
        const originalText = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.backgroundColor = '#4CAF50';
        input.value = '';
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
        }, 3000);
      }
    });
  });
});
