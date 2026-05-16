document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('.pill');
  const articles = document.querySelectorAll('.latest-grid .article-card');
  const searchInput = document.getElementById('search-input');
  const noResults = document.getElementById('no-results');
  const loadMoreBtn = document.getElementById('load-more-btn');
  
  let currentCategory = 'All Posts';
  let searchQuery = '';
  
  // Initialize to show only 6 initially in the grid (but some are hidden by JS)
  // We'll manage visible items with a max count
  let visibleCount = 6;
  
  function updateGrid() {
    let visibleTotal = 0;
    let matchCount = 0;
    
    articles.forEach((article, index) => {
      const category = article.getAttribute('data-category');
      const title = article.getAttribute('data-title').toLowerCase();
      const content = article.innerText.toLowerCase();
      
      const matchesCategory = currentCategory === 'All Posts' || category === currentCategory;
      const matchesSearch = searchQuery === '' || title.includes(searchQuery) || content.includes(searchQuery);
      
      if (matchesCategory && matchesSearch) {
        matchCount++;
        if (matchCount <= visibleCount) {
          article.style.display = 'flex';
          visibleTotal++;
        } else {
          article.style.display = 'none';
        }
      } else {
        article.style.display = 'none';
      }
    });
    
    if (matchCount === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
    
    if (matchCount > visibleCount) {
      loadMoreBtn.style.display = 'inline-block';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }
  
  // Category Filtering
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category');
      visibleCount = 6; // Reset visible count on filter change
      updateGrid();
    });
  });
  
  // Search Filtering
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    visibleCount = 6; // Reset visible count on search change
    updateGrid();
  });
  
  // Load More
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += 6; // Show 6 more
      updateGrid();
    });
  }
  
  // Initial render
  updateGrid();
});
