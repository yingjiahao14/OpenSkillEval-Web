const ARTICLES = [
  { title: "Shadow AI Explained: Why Employees Are Using AI Behind Your Back", tag: "AI", tagHref: "tag-ai.html", author: "Maya Chen", time: "2h ago", thumb: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=60" },
  { title: "Traditional Scraping vs AI Scraping: A Practical Guide for Developers and Data Teams", tag: "web scraping", tagHref: "tag-web-scraping.html", author: "Noah Patel", time: "4h ago", thumb: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=60" },
  { title: "How Database Indexes Work – A Practical Guide with PostgreSQL Examples", tag: "Databases", tagHref: "#", author: "Aria Johnson", time: "6h ago", thumb: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=60" },
  { title: "How to Streamline Search in Web Applications with Elasticsearch", tag: "Search", tagHref: "#", author: "Liam Torres", time: "9h ago", thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60" },
  { title: "How to Build an Open Source Data Lake for Batch Ingestion", tag: "Data Engineering", tagHref: "#", author: "Sana Malik", time: "12h ago", thumb: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=60" },
  { title: "The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship", tag: "AI", tagHref: "tag-ai.html", author: "Elena Ruiz", time: "1d ago", thumb: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=60" },
  { title: "GPT-5.4 vs GLM-5: Is Open Source Finally Matching Proprietary AI?", tag: "AI", tagHref: "tag-ai.html", author: "Jon Park", time: "2d ago", thumb: "https://images.unsplash.com/photo-1677442135136-760c813028c0?auto=format&fit=crop&w=1200&q=60" },
  { title: "How to Turn Websites into LLM-Ready Data Using Firecrawl", tag: "web scraping", tagHref: "tag-web-scraping.html", author: "Priya Das", time: "2d ago", thumb: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=60" },
  { title: "How to Use Python to Build Your Own Web Scraper", tag: "web scraping", tagHref: "tag-web-scraping.html", author: "Owen Lee", time: "3d ago", thumb: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=60" }
];

function initials(name) {
  return name.split(" ").map(part => part[0]).slice(0, 2).join("").toUpperCase();
}

function cardTemplate(item) {
  return `<article class="card">
    <img src="${item.thumb}" alt="${item.title}">
    <div class="card-body">
      <a class="tag" href="${item.tagHref}">#${item.tag}</a>
      <h3>${item.title}</h3>
      <div class="meta">
        <div class="author"><span class="avatar">${initials(item.author)}</span><span>${item.author}</span></div>
        <span>${item.time}</span>
      </div>
    </div>
  </article>`;
}

function setupMenu() {
  const button = document.querySelector("[data-menu-btn]");
  const menu = document.querySelector("[data-mobile-menu]");
  if (!button || !menu) return;
  button.addEventListener("click", () => menu.classList.toggle("show"));
}

function setupLoadMore() {
  const grid = document.querySelector("[data-home-grid]");
  const button = document.querySelector("[data-load-more]");
  if (!grid || !button) return;

  let shown = 5;
  grid.innerHTML = ARTICLES.slice(0, shown).map(cardTemplate).join("");

  button.addEventListener("click", () => {
    const next = ARTICLES.slice(shown, shown + 3);
    grid.insertAdjacentHTML("beforeend", next.map(cardTemplate).join(""));
    shown += next.length;
    if (shown >= ARTICLES.length) button.disabled = true;
  });
}

function setupDonationTabs() {
  const tabs = document.querySelectorAll("[data-amount]");
  const desc = document.querySelector("[data-donation-description]");
  if (!tabs.length || !desc) return;
  const copy = {
    5: "$5 helps us host tutorials and keep beginner resources online.",
    10: "$10 helps fund curriculum updates and code challenge maintenance.",
    20: "$20 supports accessibility reviews and translation of key lessons.",
    40: "$40 powers community moderation and new long-form course production."
  };
  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(item => item.classList.remove("active"));
    tab.classList.add("active");
    desc.textContent = copy[tab.dataset.amount];
  }));
}

function setupFaq() {
  document.querySelectorAll(".faq-item").forEach(item => {
    const btn = item.querySelector(".faq-q");
    if (!btn) return;
    btn.addEventListener("click", () => item.classList.toggle("open"));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  setupLoadMore();
  setupDonationTabs();
  setupFaq();
});
