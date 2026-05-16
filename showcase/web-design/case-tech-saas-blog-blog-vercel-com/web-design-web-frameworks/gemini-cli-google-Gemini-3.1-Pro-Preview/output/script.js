document.addEventListener('DOMContentLoaded', () => {
  // Data
  const categories = [
    "All Posts", "Engineering", "Community", "Company News", 
    "Customers", "v0", "Security", "Changelog", "Press"
  ];

  const posts = [
    { id: 1, title: "A new programming model for durable execution", category: "Engineering", date: "Apr 16", author: "Pranav Mehta", excerpt: "The gap between prototypes and production-ready systems is huge. Code that's trivial to run locally falls apart the moment it needs to handle failures, restarts, and real traffic. Framework-defined infrastructure solved this for web applications. Workflows extends that model to long-running systems." },
    { id: 2, title: "Agentic Infrastructure", category: "Engineering", date: "Apr 9", author: "Tom Reeves", excerpt: "Every generation of software eventually demands a new generation of infrastructure. First, we configured servers by hand. Next, the cloud turned infrastructure into APIs. Then, a more important shift: infrastructure derived from the application itself. LLMs and coding agents are driving the next transition, and it's happening fast." },
    { id: 3, title: "Zero Data Retention on AI Gateway", category: "Security", date: "Apr 6", author: "Jerlyn and Dan", excerpt: "Building with multiple AI models means wrestling with fragmented data policies. With many different model providers, it..." },
    { id: 4, title: "Optimizing Sandbox snapshots", category: "Engineering", date: "Apr 2", author: "Tom, Rob, and 2 others", excerpt: "When we recently shipped filesystem snapshots in Sandbox to let teams capture and restore a sandbox..." },
    { id: 5, title: "How a startup made a blog platform work for humans and AI alike", category: "Customers", date: "Apr 1", author: "Nic Vargas", excerpt: "A two-person, YC-backed startup that built an agentic CMS for businesses..." },
    { id: 6, title: "Making build tool 96% faster with agents, sandboxes, and humans", category: "Engineering", date: "Mar 30", author: "Anthony Shew", excerpt: "Build tool is now 81–91% faster to compute the task graph in our repositories, scaling with repo size..." },
    { id: 7, title: "Unified reporting for all AI Gateway usage", category: "Company News", date: "Mar 25", author: "Jerlyn and Dan", excerpt: "If you're shipping AI features, you already have usage data. The problem is that it's across providers, keys, an..." },
    { id: 8, title: "Agent responsibly", category: "Community", date: "Mar 30", author: "Matthew Carr", excerpt: "The following is based on an internal talk given at DeployCloud. We're sharing it publicly because the problem it describes isn't unique to us, and the framework is useful for any team shipping with agents. Coding agents generate code at unprecedented speeds — but without rigorous judgment, they are a fast way to ship bad assumptions directly to production." },
  ];

  // State
  let activeCategory = "All Posts";
  let searchQuery = "";
  let visiblePostsCount = 6;

  // DOM Elements
  const filtersContainer = document.getElementById('category-filters');
  const postsGrid = document.getElementById('posts-grid');
  const searchInput = document.getElementById('search-input');
  const showMoreBtn = document.getElementById('show-more-btn');
  const noResultsMsg = document.getElementById('no-results');

  // Initialize
  function init() {
    renderFilters();
    renderPosts();
    setupEventListeners();
  }

  // Render Category Filters
  function renderFilters() {
    filtersContainer.innerHTML = categories.map(cat => `
      <button class="category-pill ${cat === activeCategory ? 'active' : ''}" data-category="${cat}">
        ${cat}
      </button>
    `).join('');
  }

  // Render Posts
  function renderPosts() {
    // Filter posts
    let filteredPosts = posts.filter(post => {
      const matchCategory = activeCategory === "All Posts" || post.category === activeCategory;
      const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    // Check no results
    if (filteredPosts.length === 0) {
      postsGrid.innerHTML = '';
      noResultsMsg.classList.remove('hidden');
      showMoreBtn.classList.add('hidden');
      return;
    }

    noResultsMsg.classList.add('hidden');

    // Slice for pagination
    const postsToShow = filteredPosts.slice(0, visiblePostsCount);

    // Render HTML
    postsGrid.innerHTML = postsToShow.map(post => `
      <a href="#" class="post-card">
        <div class="post-category">${post.category}</div>
        <h3 class="post-title">${post.title}</h3>
        <p class="post-excerpt">${post.excerpt}</p>
        <div class="post-meta">
          <span class="date">${post.date}</span>
          <span class="separator">·</span>
          <span class="author">${post.author}</span>
        </div>
      </a>
    `).join('');

    // Toggle Load More button
    if (filteredPosts.length > visiblePostsCount) {
      showMoreBtn.classList.remove('hidden');
    } else {
      showMoreBtn.classList.add('hidden');
    }
  }

  // Event Listeners
  function setupEventListeners() {
    // Category click
    filtersContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('category-pill')) {
        activeCategory = e.target.getAttribute('data-category');
        visiblePostsCount = 6; // Reset pagination
        renderFilters();
        renderPosts();
      }
    });

    // Search input
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      visiblePostsCount = 6; // Reset pagination
      renderPosts();
    });

    // Show more button
    showMoreBtn.addEventListener('click', () => {
      visiblePostsCount += 6;
      renderPosts();
    });

    // Mega menu toggles (for accessibility and touch devices)
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const expanded = this.getAttribute('aria-expanded') === 'true';
        
        // Close others
        navBtns.forEach(b => b.setAttribute('aria-expanded', 'false'));
        
        // Toggle current
        this.setAttribute('aria-expanded', !expanded);
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.has-dropdown')) {
        navBtns.forEach(b => b.setAttribute('aria-expanded', 'false'));
      }
    });
  }

  // Run
  init();
});