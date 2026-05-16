const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function qs(sel, el = document) {
  return el.querySelector(sel);
}

function qsa(sel, el = document) {
  return [...el.querySelectorAll(sel)];
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// -----------------------------
// Mega menu navigation
// -----------------------------

function initMegaMenu() {
  const items = qsa("[data-mega-item]");
  const triggers = qsa("[data-mega-trigger]");
  const navToggle = qs("[data-nav-toggle]");
  const navShell = qs("[data-nav-shell]");

  function closeAll(exceptItem = null) {
    for (const item of items) {
      if (exceptItem && item === exceptItem) continue;
      item.classList.remove("is-open");
      const btn = qs("[data-mega-trigger]", item);
      if (btn) btn.setAttribute("aria-expanded", "false");
    }
  }

  function toggleItem(item) {
    const isOpen = item.classList.contains("is-open");
    closeAll(item);
    item.classList.toggle("is-open", !isOpen);
    const btn = qs("[data-mega-trigger]", item);
    if (btn) btn.setAttribute("aria-expanded", String(!isOpen));
  }

  for (const btn of triggers) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const item = btn.closest("[data-mega-item]");
      if (!item) return;
      toggleItem(item);
    });
  }

  document.addEventListener("click", () => {
    closeAll();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAll();
      navToggle?.focus();
    }
  });

  // Mobile menu toggle
  if (navToggle && navShell) {
    navToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const next = !(navShell.classList.contains("is-open"));
      navShell.classList.toggle("is-open", next);
      navToggle.setAttribute("aria-expanded", String(next));
      if (!next) closeAll();
    });
  }

  // Keep clicks inside mega from closing it
  for (const item of items) {
    const mega = qs("[data-mega]", item);
    mega?.addEventListener("click", (e) => e.stopPropagation());
  }
}

// -----------------------------
// Trust stats ticker (continuous)
// -----------------------------

function initTicker() {
  const track = qs("[data-ticker-track]");
  const group = qs("[data-ticker-group]");
  if (!track || !group) return;

  // Duplicate content so we can loop seamlessly
  const clone = group.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  track.appendChild(clone);

  if (prefersReducedMotion.matches) {
    // Keep it static and readable
    return;
  }

  let offset = 0;
  let last = performance.now();
  let groupWidth = group.getBoundingClientRect().width;

  function measure() {
    groupWidth = group.getBoundingClientRect().width;
  }

  window.addEventListener("resize", () => {
    measure();
  });

  measure();

  function step(now) {
    const dt = now - last;
    last = now;
    const pxPerSecond = 60;
    offset += (pxPerSecond * dt) / 1000;
    if (offset >= groupWidth) {
      offset = offset - groupWidth;
    }
    track.style.transform = `translateX(${-offset}px)`;
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// -----------------------------
// Health topics carousel controls
// -----------------------------

function initCarousel() {
  const track = qs("[data-carousel-track]");
  const prev = qs("[data-carousel-prev]");
  const next = qs("[data-carousel-next]");
  if (!track || !prev || !next) return;

  function scrollByCards(dir) {
    const card = qs(".topic-card", track);
    const cardWidth = card ? card.getBoundingClientRect().width : 180;
    const gap = 12;
    const amount = (cardWidth + gap) * 2.2;
    track.scrollBy({ left: dir * amount, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
  }

  prev.addEventListener("click", () => scrollByCards(-1));
  next.addEventListener("click", () => scrollByCards(1));

  // Keyboard convenience when focused
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") scrollByCards(-1);
    if (e.key === "ArrowRight") scrollByCards(1);
  });
}

// -----------------------------
// Recommended reads tabs
// -----------------------------

const READS = {
  top: [
    {
      tag: "Nutrition",
      title: "16 Superfoods That Are Worthy of the Title",
      desc: "A balanced look at what the word 'superfood' can (and can't) tell you—plus the foods that earn a spot on your list.",
      alt: false,
    },
    {
      tag: "Weight Management",
      title: "Does Ozempic Cause Hair Loss?",
      desc: "What the evidence says, why it may happen, and how to support hair health if you're using GLP-1 medications.",
      alt: true,
    },
    {
      tag: "Mental Health",
      title: "Can Music Therapy Help with Depression?",
      desc: "How structured music therapy differs from playlists—and where it can fit into a comprehensive care plan.",
      alt: false,
    },
    {
      tag: "Fitness",
      title: "Day 12: Resistance Band Moves You Can Do in 10 Minutes",
      desc: "A simple mini-workout to build strength with minimal equipment.",
      alt: true,
    },
    {
      tag: "Wellness",
      title: "Why Am I Craving So Much Salt?",
      desc: "Common reasons you might crave salty foods—and when it's worth checking in with a clinician.",
      alt: false,
    },
    {
      tag: "Productivity",
      title: "These Are the 8 Best Calorie Counter Apps",
      desc: "Features to look for, what to skip, and how to pick an app that supports your goals without burnout.",
      alt: true,
    },
  ],
  fitness: [
    {
      tag: "Fitness",
      title: "Day 12: Resistance Band Moves You Can Do in 10 Minutes",
      desc: "A simple mini-workout to build strength with minimal equipment.",
      alt: false,
    },
    {
      tag: "Fitness",
      title: "These Are the 8 Best Calorie Counter Apps",
      desc: "Compare tracking styles and pick what fits your routine.",
      alt: true,
    },
    {
      tag: "Wellness",
      title: "Can You Run a Marathon … with POTS?",
      desc: "Training considerations, pacing tips, and why medical guidance matters.",
      alt: false,
    },
    {
      tag: "Nutrition",
      title: "16 Superfoods That Are Worthy of the Title",
      desc: "Evidence-based picks for everyday meals.",
      alt: true,
    },
    {
      tag: "Recovery",
      title: "7 Types of Exercises to Relieve Constipation",
      desc: "Gentle movement ideas to support digestion.",
      alt: false,
    },
    {
      tag: "Lifestyle",
      title: "Is Floor Sitting the New Standing? This Unique Desk Surprised Us",
      desc: "What to consider for comfort, posture, and back health.",
      alt: true,
    },
  ],
  mental: [
    {
      tag: "Mental Well-Being",
      title: "Can Music Therapy Help with Depression?",
      desc: "How structured therapy works and what to expect.",
      alt: false,
    },
    {
      tag: "Mental Well-Being",
      title: "Anxiety & Depression: Practical starting points",
      desc: "Small steps that can support daily coping—alongside professional care.",
      alt: true,
    },
    {
      tag: "Health News",
      title: "Prescription Drug Content on Social Media Often Misleading, Study Finds",
      desc: "How to evaluate claims online and spot missing safety info.",
      alt: false,
    },
    {
      tag: "Sleep Health",
      title: "A calmer bedtime routine (that actually sticks)",
      desc: "Three simple cues to help your brain wind down.",
      alt: true,
    },
    {
      tag: "Relationships",
      title: "Parenthood stress: what 'normal' can look like",
      desc: "Signs you're overloaded and how to ask for support.",
      alt: false,
    },
    {
      tag: "Wellness",
      title: "Why Am I Craving So Much Salt?",
      desc: "Cravings can be physical, emotional, or both.",
      alt: true,
    },
  ],
  reviews: [
    {
      tag: "Product Reviews",
      title: "These Are the 8 Best Calorie Counter Apps",
      desc: "A practical guide to features, pricing, and privacy.",
      alt: false,
    },
    {
      tag: "Product Reviews",
      title: "Is Floor Sitting the New Standing? This Unique Desk Surprised Us",
      desc: "Ergonomics, adjustability, and who it works best for.",
      alt: true,
    },
    {
      tag: "Product Reviews",
      title: "Beginner's Guide to Sensitive Skin",
      desc: "How to choose gentle cleansers and moisturizers.",
      alt: false,
    },
    {
      tag: "Weight Management",
      title: "Does Ozempic Cause Hair Loss?",
      desc: "What to know about side effects and nutrition.",
      alt: true,
    },
    {
      tag: "Tools",
      title: "Pill Identifier: how it works",
      desc: "A safer way to double-check medication details.",
      alt: false,
    },
    {
      tag: "Tools",
      title: "Drug Directory: A to Z",
      desc: "What to look for in a medication profile.",
      alt: true,
    },
  ],
  recipes: [
    {
      tag: "Recipes",
      title: "Recipe Hub: quick weeknight ideas",
      desc: "Simple meals built around fiber, protein, and flavor.",
      alt: false,
    },
    {
      tag: "Heart Health",
      title: "How to Make a Heart-Healthy Grocery List",
      desc: "A simple template to shop with confidence.",
      alt: true,
    },
    {
      tag: "Nutrition",
      title: "16 Superfoods That Are Worthy of the Title",
      desc: "Easy add-ins for breakfast, lunch, and snacks.",
      alt: false,
    },
    {
      tag: "Weight Management",
      title: "Macronutrient basics (without the overwhelm)",
      desc: "A gentle approach to building balanced plates.",
      alt: true,
    },
    {
      tag: "Recipes",
      title: "Meal planning for busy weeks",
      desc: "Small prep steps that reduce decision fatigue.",
      alt: false,
    },
    {
      tag: "Recipes",
      title: "Healthy snacks that travel well",
      desc: "Ideas that hold up in a bag (and taste good).",
      alt: true,
    },
  ],
  skin: [
    {
      tag: "Skin Care",
      title: "Beginner's Guide to Sensitive Skin",
      desc: "A calm, step-by-step routine for irritation-prone skin.",
      alt: false,
    },
    {
      tag: "Skin Care",
      title: "What Every Psoriasis Patient Needs to Know About Flares and Stress",
      desc: "Triggers, daily care, and when to see a dermatologist.",
      alt: true,
    },
    {
      tag: "Skin Care",
      title: "Eczema Solutions: Knowledge for Self-Care",
      desc: "Moisturizing strategies and itch relief tips.",
      alt: false,
    },
    {
      tag: "Wellness",
      title: "Always up to date: skincare myths to drop",
      desc: "How to spot trends that aren't backed by evidence.",
      alt: true,
    },
    {
      tag: "Lifestyle",
      title: "A gentle checklist for winter dryness",
      desc: "Small changes that help maintain moisture.",
      alt: false,
    },
    {
      tag: "Tools",
      title: "Drug Directory: topical basics",
      desc: "Understanding active ingredients in common topicals.",
      alt: true,
    },
  ],
};

function renderReads(key) {
  const grid = qs("[data-reads-grid]");
  if (!grid) return;
  const items = READS[key] || [];
  grid.innerHTML = items
    .map((item, idx) => {
      const mediaClass = item.alt || idx % 2 ? "article-media alt" : "article-media";
      return `
        <a class="article" href="./index.html">
          <div class="${mediaClass}" aria-hidden="true"></div>
          <div class="article-body">
            <span class="article-tag">${item.tag}</span>
            <h3 class="article-title">${item.title}</h3>
            <p class="article-sub">${item.desc}</p>
          </div>
        </a>
      `;
    })
    .join("");
}

function initTabs() {
  const tabs = qs("[data-tabs]");
  if (!tabs) return;
  const buttons = qsa("[data-tab]", tabs);

  function setActive(btn) {
    for (const b of buttons) {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", String(active));
      b.tabIndex = active ? 0 : -1;
    }
    renderReads(btn.dataset.tab);
  }

  for (const btn of buttons) {
    btn.addEventListener("click", () => setActive(btn));
    btn.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const idx = buttons.indexOf(btn);
      const nextIdx = clamp(idx + (e.key === "ArrowRight" ? 1 : -1), 0, buttons.length - 1);
      const target = buttons[nextIdx];
      target.focus();
      setActive(target);
    });
  }

  const initiallyActive = buttons.find((b) => b.classList.contains("is-active")) || buttons[0];
  setActive(initiallyActive);
}

// -----------------------------
// Newsletter submission (fake)
// -----------------------------

function initNewsletterForms() {
  const forms = [
    { form: qs("[data-newsletter-form]"), status: qs("[data-newsletter-status]") },
    { form: qs("[data-footer-form]"), status: qs("[data-footer-status]") },
  ].filter((x) => x.form);

  for (const { form, status } of forms) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = qs("input[type='email']", form);
      if (!input) return;
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
      const email = input.value.trim();
      status.textContent = "Joining…";
      form.querySelector("button[type='submit']")?.setAttribute("disabled", "true");

      window.setTimeout(() => {
        status.textContent = `You're in! Check your inbox: ${email}`;
        form.querySelector("button[type='submit']")?.removeAttribute("disabled");
        form.reset();
      }, 650);
    });
  }
}

// Boot
initMegaMenu();
initTicker();
initCarousel();
initTabs();
initNewsletterForms();

