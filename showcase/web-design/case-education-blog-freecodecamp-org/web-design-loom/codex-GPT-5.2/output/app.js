const OpenLearnHub = (() => {
  const state = {
    homeRendered: 0,
  };

  const data = {
    bannerText: "Learn to code — free 3,000-hour curriculum",
    searchPlaceholder: "Search 12,000+ tutorials, articles, and books",
    latestTutorials: [
      {
        tag: "#AI",
        tagHref: "tag-ai.html",
        title: "Shadow AI Explained: Why Employees Are Using AI Behind Your Back",
        author: "Manish Shivanandhan",
        time: "15 hours ago",
      },
      {
        tag: "#web scraping",
        tagHref: "tag-web-scraping.html",
        title: "Traditional Scraping vs AI Scraping: A Practical Guide for Developers and Data Teams",
        author: "Joel Olawanle",
        time: "16 hours ago",
      },
      {
        tag: "#Databases",
        tagHref: "tag-ai.html",
        title: "How Database Indexes Work – A Practical Guide with PostgreSQL Examples",
        author: "iyiola",
        time: "20 hours ago",
      },
      {
        tag: "#elasticsearch",
        tagHref: "tag-ai.html",
        title: "How to Streamline Search in Web Applications with Elasticsearch",
        author: "Oluwatobi",
        time: "21 hours ago",
      },
      {
        tag: "#data-engineering",
        tagHref: "tag-ai.html",
        title: "How to Build an Open Source Data Lake for Batch Ingestion",
        author: "Puneet Singh",
        time: "a day ago",
      },
    ],
    moreTutorials: [
      {
        tag: "#Python",
        tagHref: "tag-web-scraping.html",
        title: "How to Turn Websites into LLM-Ready Data Using Firecrawl",
        author: "Manish Shivanandhan",
        time: "6 months ago",
      },
      {
        tag: "#JavaScript",
        tagHref: "tag-ai.html",
        title: "Async Iteration Patterns: From Promises to Streams",
        author: "Abiola Akinyemi",
        time: "2 days ago",
      },
      {
        tag: "#Web Development",
        tagHref: "tag-ai.html",
        title: "Build a Minimal Design System with CSS Variables",
        author: "Sofia Nguyen",
        time: "5 days ago",
      },
      {
        tag: "#React",
        tagHref: "tag-ai.html",
        title: "State Machines in React: A Practical Introduction",
        author: "Ruth Okafor",
        time: "a week ago",
      },
      {
        tag: "#General Programming",
        tagHref: "tag-ai.html",
        title: "A Developer’s Guide to Reading Technical Papers",
        author: "Evan Clarke",
        time: "2 weeks ago",
      },
      {
        tag: "#web scraping",
        tagHref: "tag-web-scraping.html",
        title: "Web Scraping with Google Sheets – How to Scrape Web Pages with Built-in Functions",
        author: "Eamonn Cottrell",
        time: "3 years ago",
      },
    ],
    tagPages: {
      ai: {
        tagName: "#AI",
        postCount: 212,
        articles: [
          {
            tag: "#AI",
            tagHref: "tag-ai.html",
            title: "Shadow AI Explained: Why Employees Are Using AI Behind Your Back",
            author: "Manish Shivanandhan",
            time: "12 hours ago",
          },
          {
            tag: "#AI",
            tagHref: "tag-ai.html",
            title: "The AI Governance Handbook: How to Build Responsible AI Systems That Actually Ship",
            author: "Rudrendu Paul",
            time: "3 days ago",
          },
          {
            tag: "#AI",
            tagHref: "tag-ai.html",
            title: "GPT-5.4 vs GLM-5: Is Open Source Finally Matching Proprietary AI?",
            author: "Oyedele Tioluwani",
            time: "4 days ago",
          },
          {
            tag: "#AI-automation",
            tagHref: "tag-ai.html",
            title: "How to Build a Secure AI PR Reviewer with Claude, GitHub Actions, and JavaScript",
            author: "Sumit Saha",
            time: "7 days ago",
          },
          {
            tag: "#AI",
            tagHref: "tag-ai.html",
            title: "How to Build Reliable AI Systems",
            author: "Jide Abdul-Qudus",
            time: "8 days ago",
          },
        ],
      },
      webScraping: {
        tagName: "#WEB SCRAPING",
        postCount: 33,
        articles: [
          {
            tag: "#web scraping",
            tagHref: "tag-web-scraping.html",
            title: "Traditional Scraping vs AI Scraping: A Practical Guide for Developers and Data Teams",
            author: "Joel Olawanle",
            time: "13 hours ago",
          },
          {
            tag: "#Python",
            tagHref: "tag-web-scraping.html",
            title: "How to Turn Websites into LLM-Ready Data Using Firecrawl",
            author: "Manish Shivanandhan",
            time: "6 months ago",
          },
          {
            tag: "#Python",
            tagHref: "tag-web-scraping.html",
            title: "How to Use Python to Build Your Own Web Scraper",
            author: "—",
            time: "2 years ago",
          },
          {
            tag: "#node js",
            tagHref: "tag-web-scraping.html",
            title: "How to Scrape Amazon Product Reviews Behind a Login",
            author: "—",
            time: "2 years ago",
          },
          {
            tag: "#google sheets",
            tagHref: "tag-web-scraping.html",
            title: "Web Scraping with Google Sheets – How to Scrape Web Pages with Built-in Functions",
            author: "Eamonn Cottrell",
            time: "3 years ago",
          },
        ],
      },
    },
    popularTags: [
      { name: "#General Programming", count: 2773 },
      { name: "#JavaScript", count: 2532 },
      { name: "#Web Development", count: 2035 },
      { name: "#Python", count: 1014 },
      { name: "#React", count: 970 },
      { name: "#tech", count: 2735 },
      { name: "#youtube", count: 953 },
      { name: "#startup", count: 715 },
      { name: "#software development", count: 673 },
      { name: "#Design", count: 577 },
      { name: "#Productivity", count: 544 },
      { name: "#Life lessons", count: 532 },
      { name: "#CSS", count: 491 },
      { name: "#self-improvement", count: 486 },
    ],
  };

  function el(sel, root = document) {
    return root.querySelector(sel);
  }

  function els(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  function safeId(str) {
    return String(str).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function createArticleCard(article) {
    const card = document.createElement("article");
    card.className = "card";

    const thumb = document.createElement("div");
    thumb.className = "thumb";
    thumb.setAttribute("aria-hidden", "true");
    card.appendChild(thumb);

    const body = document.createElement("div");
    body.className = "card-body";

    const tag = document.createElement("a");
    tag.className = "tag-chip";
    tag.href = article.tagHref || "#";
    tag.textContent = article.tag;
    body.appendChild(tag);

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = article.title;
    body.appendChild(title);

    const meta = document.createElement("div");
    meta.className = "meta";

    const author = document.createElement("div");
    author.className = "author";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.setAttribute("aria-hidden", "true");
    author.appendChild(avatar);

    const name = document.createElement("div");
    name.className = "author-name";
    name.textContent = article.author;
    author.appendChild(name);

    const time = document.createElement("div");
    time.className = "time";
    time.textContent = article.time;

    meta.appendChild(author);
    meta.appendChild(time);
    body.appendChild(meta);

    card.appendChild(body);
    return card;
  }

  function initMenuToggle() {
    const btn = el('[data-action="menu-toggle"]');
    const mobile = el("#mobileNav");
    if (!btn || !mobile) return;

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      mobile.hidden = expanded;
    });
  }

  function initBanner() {
    const banner = el("#globalBanner");
    if (!banner) return;
    const text = el("[data-banner-text]", banner);
    if (text) text.textContent = data.bannerText;
  }

  function initHomeGrid() {
    const grid = el("#homeGrid");
    if (!grid) return;

    const initial = data.latestTutorials;
    initial.forEach((a) => grid.appendChild(createArticleCard(a)));
    state.homeRendered = initial.length;

    const btn = el('[data-action="load-more"]');
    if (!btn) return;

    btn.addEventListener("click", () => {
      const chunk = data.moreTutorials;
      chunk.forEach((a) => grid.appendChild(createArticleCard(a)));
      state.homeRendered += chunk.length;
      btn.disabled = true;
      btn.textContent = "All articles loaded";
    });
  }

  function initTagPage() {
    const tagKey = document.body.getAttribute("data-tag-page");
    if (!tagKey) return;

    const config = data.tagPages[tagKey];
    if (!config) return;

    const tagName = el("[data-tag-name]");
    const tagCount = el("[data-tag-count]");
    if (tagName) tagName.textContent = config.tagName;
    if (tagCount) tagCount.textContent = `A collection of ${config.postCount} posts`;

    const pillRow = el("#popularTagsRow");
    if (pillRow) {
      data.popularTags.forEach((t) => {
        const pill = document.createElement("a");
        pill.className = "tag-pill";
        pill.href = t.name.toLowerCase().includes("python") ? "tag-web-scraping.html" : "tag-ai.html";
        pill.setAttribute("aria-label", `${t.name} (${t.count})`);
        pill.innerHTML = `${t.name} <span>${t.count.toLocaleString()}</span>`;
        pillRow.appendChild(pill);
      });
    }

    const grid = el("#tagGrid");
    if (grid) {
      config.articles.forEach((a) => grid.appendChild(createArticleCard(a)));
    }
  }

  function initDonateTabs() {
    const tabs = els('[data-action="donation-amount"]');
    const desc = el("#donationDesc");
    const sub = el("#donationSub");
    if (!tabs.length || !desc) return;

    function setAmount(amount) {
      tabs.forEach((t) => {
        const isSelected = Number(t.getAttribute("data-amount")) === amount;
        t.setAttribute("aria-selected", String(isSelected));
      });
      desc.textContent = `Your $${amount} donation will provide 1,000 hours of learning to people around the world each month.`;
      if (sub) sub.textContent = `Donating $${amount} / month: edit amount · Secure donation`;
    }

    tabs.forEach((t) => {
      t.addEventListener("click", () => setAmount(Number(t.getAttribute("data-amount"))));
    });

    setAmount(20);
  }

  function initAccordion() {
    const items = els(".acc-item");
    if (!items.length) return;
    items.forEach((item) => {
      const btn = el(".acc-btn", item);
      const panel = el(".acc-panel", item);
      if (!btn || !panel) return;

      btn.addEventListener("click", () => {
        const open = item.getAttribute("data-open") === "true";
        item.setAttribute("data-open", String(!open));
        btn.setAttribute("aria-expanded", String(!open));
        if (!open) {
          panel.style.maxHeight = `${panel.scrollHeight}px`;
        } else {
          panel.style.maxHeight = "0px";
        }
      });

      item.setAttribute("data-open", "false");
      btn.setAttribute("aria-expanded", "false");
      panel.style.maxHeight = "0px";
    });
  }

  function initSearchPlaceholder() {
    const input = el("#searchInput");
    if (input) input.placeholder = data.searchPlaceholder;
  }

  function initYear() {
    const y = el("[data-year]");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function init() {
    initMenuToggle();
    initBanner();
    initSearchPlaceholder();
    initHomeGrid();
    initTagPage();
    initDonateTabs();
    initAccordion();
    initYear();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", () => OpenLearnHub.init());

