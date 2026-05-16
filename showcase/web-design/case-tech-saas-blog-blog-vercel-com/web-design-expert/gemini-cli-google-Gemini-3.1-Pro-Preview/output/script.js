const posts = [
  {
    title: "A new programming model for durable execution",
    category: "Engineering",
    date: "Apr 16",
    author: "Pranav Mehta",
    avatarColor: "bg-green",
    initials: "PM",
    excerpt: "The gap between prototypes and production-ready systems is huge. Code that's trivial to run locally falls apart the moment it needs to handle failures, restarts, and real traffic."
  },
  {
    title: "Agentic Infrastructure",
    category: "Engineering",
    date: "Apr 9",
    author: "Tom Reeves",
    avatarColor: "bg-blue",
    initials: "TR",
    excerpt: "Every generation of software eventually demands a new generation of infrastructure. First, we configured servers by hand. Next, the cloud turned infrastructure into APIs."
  },
  {
    title: "Zero Data Retention on AI Gateway",
    category: "Security",
    date: "Apr 6",
    author: "Jerlyn and Dan",
    avatarColor: "bg-purple",
    initials: "J&D",
    excerpt: "Building with multiple AI models means wrestling with fragmented data policies. With many different model providers, it becomes difficult to ensure zero data retention across the board."
  },
  {
    title: "Optimizing Sandbox snapshots",
    category: "Engineering",
    date: "Apr 2",
    author: "Tom, Rob, and 2 others",
    avatarColor: "bg-teal",
    initials: "T&R",
    excerpt: "When we recently shipped filesystem snapshots in Sandbox to let teams capture and restore a sandbox state instantly, we had to rethink our approach to memory management."
  },
  {
    title: "How a startup made a blog platform work for humans and AI alike",
    category: "Customers",
    date: "Apr 1",
    author: "Nic Vargas",
    avatarColor: "bg-orange",
    initials: "NV",
    excerpt: "A two-person, YC-backed startup that built an agentic CMS for businesses wanted to build a platform that could be edited by both human writers and autonomous AI agents."
  },
  {
    title: "Making build tool 96% faster with agents, sandboxes, and humans",
    category: "Engineering",
    date: "Mar 30",
    author: "Anthony Shew",
    avatarColor: "bg-blue",
    initials: "AS",
    excerpt: "Build tool is now 81–91% faster to compute the task graph in our repositories, scaling with repo size. We achieved this by combining sandboxing with AI-driven optimizations."
  },
  {
    title: "Unified reporting for all AI Gateway usage",
    category: "Changelog",
    date: "Mar 25",
    author: "Jerlyn and Dan",
    avatarColor: "bg-purple",
    initials: "J&D",
    excerpt: "If you're shipping AI features, you already have usage data. The problem is that it's across providers, keys, and environments. We're introducing unified reporting."
  },
  {
    title: "Agent responsibly",
    category: "Company News",
    date: "Mar 30",
    author: "Matthew Carr",
    avatarColor: "bg-orange",
    initials: "MC",
    excerpt: "Coding agents generate code at unprecedented speeds — but without rigorous judgment, they are a fast way to ship bad assumptions directly to production."
  },
  {
    title: "DeployCloud Community Meetup 2026",
    category: "Community",
    date: "Mar 15",
    author: "Sarah Jenkins",
    avatarColor: "bg-green",
    initials: "SJ",
    excerpt: "Join us for our first ever global community meetup. We'll be discussing the future of agentic infrastructure, serverless workflows, and how to build faster together."
  },
  {
    title: "Introducing v0 support for full-stack apps",
    category: "v0",
    date: "Mar 10",
    author: "Lee Robinson",
    avatarColor: "bg-teal",
    initials: "LR",
    excerpt: "Today we're expanding v0's capabilities from pure UI generation to full-stack application scaffolding, complete with database schemas and API routes."
  },
  {
    title: "DeployCloud named a Leader in Cloud Infrastructure",
    category: "Press",
    date: "Mar 1",
    author: "Press Team",
    avatarColor: "bg-blue",
    initials: "PT",
    excerpt: "We're thrilled to announce that DeployCloud has been recognized as a Leader in the 2026 Magic Quadrant for Cloud Infrastructure and Platform Services."
  },
  {
    title: "Understanding Bot Management strategies",
    category: "Security",
    date: "Feb 20",
    author: "Alex Rivera",
    avatarColor: "bg-purple",
    initials: "AR",
    excerpt: "As AI scrapers become more sophisticated, traditional rate limiting is no longer enough. Here's how our new Bot Management system categorizes and handles traffic."
  }
];

const INITIAL_POSTS_COUNT = 9;
const POSTS_PER_LOAD = 6;

let currentCategory = "All Posts";
let currentSearch = "";
let visibleCount = INITIAL_POSTS_COUNT;

// DOM Elements
const categoryFilters = document.getElementById('categoryFilters');
const filterBtns = document.querySelectorAll('.filter-pill');
const searchInput = document.getElementById('searchInput');
const newsGrid = document.getElementById('newsGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadMoreContainer = document.getElementById('loadMoreContainer');
const noResults = document.getElementById('noResults');
const featuredSection = document.getElementById('featuredSection');

function renderPosts() {
  // Filter posts
  const filtered = posts.filter(post => {
    const matchesCategory = currentCategory === "All Posts" || post.category === currentCategory;
    const searchLower = currentSearch.toLowerCase();
    const matchesSearch = currentSearch === "" || 
                          post.title.toLowerCase().includes(searchLower) || 
                          post.excerpt.toLowerCase().includes(searchLower) ||
                          post.author.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  // Hide/Show Featured Articles if not filtering by "All Posts" and no search
  if (currentCategory !== "All Posts" || currentSearch !== "") {
    featuredSection.classList.add('hidden');
  } else {
    featuredSection.classList.remove('hidden');
  }

  // Clear grid
  newsGrid.innerHTML = '';

  if (filtered.length === 0) {
    noResults.classList.remove('hidden');
    newsGrid.classList.add('hidden');
    loadMoreContainer.classList.add('hidden');
    return;
  }

  noResults.classList.add('hidden');
  newsGrid.classList.remove('hidden');

  // Render visible posts
  const visiblePosts = filtered.slice(0, visibleCount);
  
  visiblePosts.forEach(post => {
    const card = document.createElement('a');
    card.href = "#";
    card.className = 'post-card';
    card.innerHTML = `
      <div class="card-meta">
        <span class="tag">${post.category}</span>
        <span class="date">${post.date}</span>
      </div>
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <div class="card-author">
        <div class="avatar ${post.avatarColor}">${post.initials}</div>
        <span>${post.author}</span>
      </div>
    `;
    newsGrid.appendChild(card);
  });

  // Handle Load More button
  if (filtered.length > visibleCount) {
    loadMoreContainer.classList.remove('hidden');
  } else {
    loadMoreContainer.classList.add('hidden');
  }
}

// Event Listeners
filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Update active class
    filterBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');

    // Update state
    currentCategory = e.target.dataset.category;
    visibleCount = INITIAL_POSTS_COUNT; // Reset visible count
    
    renderPosts();
  });
});

searchInput.addEventListener('input', (e) => {
  currentSearch = e.target.value;
  visibleCount = INITIAL_POSTS_COUNT; // Reset visible count
  renderPosts();
});

loadMoreBtn.addEventListener('click', () => {
  visibleCount += POSTS_PER_LOAD;
  renderPosts();
});

// Initial render
renderPosts();
