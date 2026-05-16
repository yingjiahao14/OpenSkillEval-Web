document.addEventListener('DOMContentLoaded', () => {
  // Navigation Dropdowns
  const navItems = document.querySelectorAll('.has-dropdown');
  navItems.forEach(item => {
    const btn = item.querySelector('.nav-btn');
    
    // Hover interactions
    item.addEventListener('mouseenter', () => {
      item.classList.add('active');
      if(btn) btn.setAttribute('aria-expanded', 'true');
    });
    
    item.addEventListener('mouseleave', () => {
      item.classList.remove('active');
      if(btn) btn.setAttribute('aria-expanded', 'false');
    });
    
    // Click interactions for accessibility
    if(btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isActive = item.classList.contains('active');
        
        // Close other dropdowns
        navItems.forEach(other => {
          other.classList.remove('active');
          if(other.querySelector('.nav-btn')) other.querySelector('.nav-btn').setAttribute('aria-expanded', 'false');
        });
        
        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // Clicking outside closes dropdowns
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      navItems.forEach(item => {
        item.classList.remove('active');
        const btn = item.querySelector('.nav-btn');
        if(btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Filtering & Search
  const searchInput = document.getElementById('search-input');
  const categoryFilters = document.getElementById('category-filters');
  const pills = categoryFilters.querySelectorAll('.pill');
  const posts = Array.from(document.querySelectorAll('.post-card'));
  const noResults = document.getElementById('no-results');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const loadMoreContainer = document.querySelector('.load-more-container');
  
  let activeCategory = 'All Posts';
  let searchQuery = '';
  let postsToShow = 6; // Initial limit
  
  function updateGrid() {
    let matchCount = 0;
    let visibleCount = 0;
    
    posts.forEach(post => {
      const category = post.getAttribute('data-category');
      const title = post.getAttribute('data-title').toLowerCase();
      const excerpt = post.querySelector('.excerpt') ? post.querySelector('.excerpt').textContent.toLowerCase() : '';
      
      const matchCategory = activeCategory === 'All Posts' || category === activeCategory;
      const matchSearch = searchQuery === '' || title.includes(searchQuery) || excerpt.includes(searchQuery);
      
      if (matchCategory && matchSearch) {
        matchCount++;
        if (visibleCount < postsToShow) {
          post.classList.remove('hidden', 'hidden-post');
          visibleCount++;
        } else {
          post.classList.add('hidden-post');
          post.classList.remove('hidden');
        }
      } else {
        post.classList.add('hidden');
        post.classList.remove('hidden-post');
      }
    });
    
    // Toggle No Results message
    if (matchCount === 0) {
      noResults.classList.remove('hidden');
    } else {
      noResults.classList.add('hidden');
    }
    
    // Toggle Show More button visibility
    if (visibleCount >= matchCount) {
      if(loadMoreContainer) loadMoreContainer.classList.add('hidden');
    } else {
      if(loadMoreContainer) loadMoreContainer.classList.remove('hidden');
    }
  }
  
  // Event Listeners for Filters
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-filter');
      postsToShow = 6; // Reset pagination on filter change
      updateGrid();
    });
  });
  
  // Event Listener for Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      postsToShow = 6; // Reset pagination on search
      updateGrid();
    });
  }
  
  // Event Listener for Load More
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      postsToShow += 6; // Show 6 more posts
      updateGrid();
    });
  }
  
  // Initial render computation
  updateGrid();
});