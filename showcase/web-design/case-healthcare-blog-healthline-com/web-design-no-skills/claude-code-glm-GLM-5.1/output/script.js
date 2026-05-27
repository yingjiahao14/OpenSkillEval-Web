document.addEventListener('DOMContentLoaded', () => {

  // ===== Mega Menu Dropdowns =====
  const navItems = document.querySelectorAll('.nav-item[data-dropdown]');
  let activeDropdown = null;

  navItems.forEach(item => {
    const btn = item.querySelector('.nav-link');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeDropdown === item) {
        closeDropdowns();
      } else {
        closeDropdowns();
        item.classList.add('active');
        activeDropdown = item;
      }
    });

    item.addEventListener('mouseenter', () => {
      if (activeDropdown && activeDropdown !== item) {
        closeDropdowns();
      }
      item.classList.add('active');
      activeDropdown = item;
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      closeDropdowns();
    }
  });

  function closeDropdowns() {
    navItems.forEach(i => i.classList.remove('active'));
    activeDropdown = null;
  }

  // ===== Mobile Menu =====
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    mainNav.classList.toggle('open');
  });

  // ===== Health Topics Carousel =====
  const carousel = document.getElementById('topicsCarousel');
  const prevBtn = document.getElementById('topicsPrev');
  const nextBtn = document.getElementById('topicsNext');

  if (carousel && prevBtn && nextBtn) {
    const scrollAmount = 200;

    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // ===== Recommended Reads Tabs =====
  const tabsContainer = document.getElementById('readsTabs');
  const readsGrid = document.getElementById('readsGrid');

  const articlesData = {
    'top-reads': [
      { title: '16 Superfoods That Are Worthy of the Title', tag: 'Nutrition', tagColor: '#27AE60', tagBg: '#E8F5E9', gradient: 'linear-gradient(135deg, #27AE60, #219A52)', readTime: '8 min read' },
      { title: 'Does Ozempic Cause Hair Loss?', tag: 'Health News', tagColor: '#02838D', tagBg: '#E8F6F7', gradient: 'linear-gradient(135deg, #02838D, #06A4B0)', readTime: '6 min read' },
      { title: 'Prescription Drug Content on Social Media Often Misleading, Study Finds', tag: 'Research', tagColor: '#8E44AD', tagBg: '#F3E5F5', gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)', readTime: '5 min read' },
      { title: 'Can Music Therapy Help with Depression?', tag: 'Mental Health', tagColor: '#3498DB', tagBg: '#D6EAF8', gradient: 'linear-gradient(135deg, #3498DB, #2980B9)', readTime: '7 min read' },
      { title: 'Why Am I Craving So Much Salt?', tag: 'Nutrition', tagColor: '#27AE60', tagBg: '#E8F5E9', gradient: 'linear-gradient(135deg, #E8915A, #D4763E)', readTime: '4 min read' },
      { title: 'These Are the 8 Best Calorie Counter Apps', tag: 'Product Reviews', tagColor: '#E67E22', tagBg: '#FFF3E0', gradient: 'linear-gradient(135deg, #F39C12, #E67E22)', readTime: '10 min read' }
    ],
    'fitness': [
      { title: 'Day 12: Resistance Band Moves You Can Do in 10 Minutes', tag: 'Fitness', tagColor: '#02838D', tagBg: '#E8F6F7', gradient: 'linear-gradient(135deg, #02838D, #06A4B0)', readTime: '6 min read' },
      { title: 'How to Start Running: A Complete Beginner\'s Guide', tag: 'Fitness', tagColor: '#02838D', tagBg: '#E8F6F7', gradient: 'linear-gradient(135deg, #4ECDC4, #2CB5AC)', readTime: '9 min read' },
      { title: 'Yoga for Back Pain: 10 Poses That Actually Work', tag: 'Fitness', tagColor: '#02838D', tagBg: '#E8F6F7', gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)', readTime: '7 min read' },
      { title: 'The Best Low-Impact Cardio Exercises for Joint Health', tag: 'Fitness', tagColor: '#02838D', tagBg: '#E8F6F7', gradient: 'linear-gradient(135deg, #27AE60, #219A52)', readTime: '5 min read' },
      { title: 'Walking 10,000 Steps: Is It Really Necessary?', tag: 'Fitness', tagColor: '#02838D', tagBg: '#E8F6F7', gradient: 'linear-gradient(135deg, #E8915A, #D4763E)', readTime: '6 min read' },
      { title: 'Strength Training for Women Over 40: What to Know', tag: 'Fitness', tagColor: '#02838D', tagBg: '#E8F6F7', gradient: 'linear-gradient(135deg, #3498DB, #2980B9)', readTime: '8 min read' }
    ],
    'mental-wellbeing': [
      { title: 'Can Music Therapy Help with Depression?', tag: 'Mental Health', tagColor: '#3498DB', tagBg: '#D6EAF8', gradient: 'linear-gradient(135deg, #3498DB, #2980B9)', readTime: '7 min read' },
      { title: 'How to Manage Anxiety in Social Situations', tag: 'Anxiety', tagColor: '#9B59B6', tagBg: '#F3E5F5', gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)', readTime: '6 min read' },
      { title: 'The Science Behind Gratitude Journaling', tag: 'Wellness', tagColor: '#02838D', tagBg: '#E8F6F7', gradient: 'linear-gradient(135deg, #02838D, #06A4B0)', readTime: '5 min read' },
      { title: 'Signs You Might Need to Talk to a Therapist', tag: 'Mental Health', tagColor: '#3498DB', tagBg: '#D6EAF8', gradient: 'linear-gradient(135deg, #E8915A, #D4763E)', readTime: '8 min read' },
      { title: 'Mindfulness Techniques for Better Sleep', tag: 'Sleep', tagColor: '#1ABC9C', tagBg: '#E8F8F5', gradient: 'linear-gradient(135deg, #1ABC9C, #16A085)', readTime: '6 min read' },
      { title: 'How Social Media Affects Your Mental Health', tag: 'Wellness', tagColor: '#02838D', tagBg: '#E8F6F7', gradient: 'linear-gradient(135deg, #27AE60, #219A52)', readTime: '7 min read' }
    ],
    'product-reviews': [
      { title: 'These Are the 8 Best Calorie Counter Apps', tag: 'Product Reviews', tagColor: '#E67E22', tagBg: '#FFF3E0', gradient: 'linear-gradient(135deg, #F39C12, #E67E22)', readTime: '10 min read' },
      { title: 'Is Floor Sitting the New Standing? This Unique Desk Surprised Us', tag: 'Products', tagColor: '#8E44AD', tagBg: '#F3E5F5', gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)', readTime: '7 min read' },
      { title: 'Best Fitness Trackers of 2026: Our Top Picks', tag: 'Product Reviews', tagColor: '#E67E22', tagBg: '#FFF3E0', gradient: 'linear-gradient(135deg, #02838D, #06A4B0)', readTime: '12 min read' },
      { title: 'We Tested 10 Meditation Apps — Here Are the Winners', tag: 'Product Reviews', tagColor: '#E67E22', tagBg: '#FFF3E0', gradient: 'linear-gradient(135deg, #27AE60, #219A52)', readTime: '9 min read' },
      { title: 'The Best Water Bottles for Staying Hydrated', tag: 'Products', tagColor: '#8E44AD', tagBg: '#F3E5F5', gradient: 'linear-gradient(135deg, #3498DB, #2980B9)', readTime: '6 min read' },
      { title: 'Noise-Cancelling Headphones for Meditation and Focus', tag: 'Product Reviews', tagColor: '#E67E22', tagBg: '#FFF3E0', gradient: 'linear-gradient(135deg, #E8915A, #D4763E)', readTime: '8 min read' }
    ],
    'recipes': [
      { title: '16 Superfoods That Are Worthy of the Title', tag: 'Nutrition', tagColor: '#27AE60', tagBg: '#E8F5E9', gradient: 'linear-gradient(135deg, #27AE60, #219A52)', readTime: '8 min read' },
      { title: 'Heart-Healthy Meal Prep: 5 Easy Recipes', tag: 'Recipes', tagColor: '#E67E22', tagBg: '#FFF3E0', gradient: 'linear-gradient(135deg, #F39C12, #E67E22)', readTime: '10 min read' },
      { title: 'Anti-Inflammatory Smoothie Recipes to Try', tag: 'Recipes', tagColor: '#E67E22', tagBg: '#FFF3E0', gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)', readTime: '5 min read' },
      { title: '7 High-Protein Breakfasts Under 300 Calories', tag: 'Recipes', tagColor: '#E67E22', tagBg: '#FFF3E0', gradient: 'linear-gradient(135deg, #02838D, #06A4B0)', readTime: '7 min read' },
      { title: 'Mediterranean Diet: A Week of Easy Dinners', tag: 'Recipes', tagColor: '#E67E22', tagBg: '#FFF3E0', gradient: 'linear-gradient(135deg, #4ECDC4, #2CB5AC)', readTime: '12 min read' },
      { title: 'Gut-Healthy Fermented Foods You Can Make at Home', tag: 'Nutrition', tagColor: '#27AE60', tagBg: '#E8F5E9', gradient: 'linear-gradient(135deg, #E8915A, #D4763E)', readTime: '9 min read' }
    ],
    'skin-care': [
      { title: 'Beginner\'s Guide to Sensitive Skin', tag: 'Skin Care', tagColor: '#E8915A', tagBg: '#FDE8E8', gradient: 'linear-gradient(135deg, #E8915A, #D4763E)', readTime: '8 min read' },
      { title: 'Eczema Solutions: Knowledge for Self-Care', tag: 'Skin Care', tagColor: '#E8915A', tagBg: '#FDE8E8', gradient: 'linear-gradient(135deg, #3498DB, #2980B9)', readTime: '7 min read' },
      { title: 'The Best Ingredients for Acne-Prone Skin', tag: 'Skin Care', tagColor: '#E8915A', tagBg: '#FDE8E8', gradient: 'linear-gradient(135deg, #27AE60, #219A52)', readTime: '6 min read' },
      { title: 'Sunscreen Guide: How to Choose the Right SPF', tag: 'Skin Care', tagColor: '#E8915A', tagBg: '#FDE8E8', gradient: 'linear-gradient(135deg, #F39C12, #E67E22)', readTime: '5 min read' },
      { title: 'Retinol vs. Vitamin C: Which Should You Use?', tag: 'Skin Care', tagColor: '#E8915A', tagBg: '#FDE8E8', gradient: 'linear-gradient(135deg, #9B59B6, #8E44AD)', readTime: '8 min read' },
      { title: 'How to Build a Minimalist Skincare Routine', tag: 'Skin Care', tagColor: '#E8915A', tagBg: '#FDE8E8', gradient: 'linear-gradient(135deg, #02838D, #06A4B0)', readTime: '6 min read' }
    ]
  };

  function renderArticles(tab) {
    const articles = articlesData[tab] || articlesData['top-reads'];
    readsGrid.innerHTML = articles.map(article => `
      <a href="#" class="reads-card">
        <div class="reads-card-img" style="background: ${article.gradient};"></div>
        <div class="reads-card-body">
          <span class="reads-card-tag" style="color: ${article.tagColor}; background: ${article.tagBg};">${article.tag}</span>
          <h3>${article.title}</h3>
          <span class="reads-meta">${article.readTime}</span>
        </div>
      </a>
    `).join('');
  }

  if (tabsContainer && readsGrid) {
    renderArticles('top-reads');

    tabsContainer.addEventListener('click', (e) => {
      const tab = e.target.closest('.reads-tab');
      if (!tab) return;

      tabsContainer.querySelectorAll('.reads-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tabId = tab.dataset.tab;
      renderArticles(tabId);
    });
  }

  // ===== Newsletter Signups =====
  function setupNewsletter(formId, btnClass) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (email && email.includes('@')) {
        form.classList.add('success');
        const msg = document.createElement('div');
        msg.className = 'success-message';
        msg.textContent = 'Thanks for subscribing!';
        form.style.position = 'relative';
        form.appendChild(msg);

        setTimeout(() => {
          form.classList.remove('success');
          msg.remove();
          emailInput.value = '';
        }, 3000);
      }
    });
  }

  setupNewsletter('newsletterForm');
  setupNewsletter('footerNewsletterForm');

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
