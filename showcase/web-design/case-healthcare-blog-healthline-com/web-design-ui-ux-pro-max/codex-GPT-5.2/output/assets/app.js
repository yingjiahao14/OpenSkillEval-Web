const RECOMMENDED_DATA = {
  top: [
    {
      title: "16 Superfoods That Are Worthy of the Title",
      tag: "Nutrition",
      meta: ["Medically reviewed", "8 min read"],
      href: "#",
    },
    {
      title: "Does Ozempic Cause Hair Loss?",
      tag: "Weight management",
      meta: ["Expert Q&A", "6 min read"],
      href: "#",
    },
    {
      title: "Prescription Drug Content on Social Media Often Misleading, Study Finds",
      tag: "Health news",
      meta: ["Reporting", "5 min read"],
      href: "#",
    },
    {
      title: "Can Music Therapy Help with Depression?",
      tag: "Mental well-being",
      meta: ["Evidence check", "7 min read"],
      href: "#",
    },
    {
      title: "Why Am I Craving So Much Salt?",
      tag: "Nutrition",
      meta: ["Explainer", "6 min read"],
      href: "#",
    },
    {
      title: "These Are the 8 Best Calorie Counter Apps",
      tag: "Product reviews",
      meta: ["Tested picks", "9 min read"],
      href: "#",
    },
  ],
  fitness: [
    {
      title: "Day 12: Resistance Band Moves You Can Do in 10 Minutes",
      tag: "Fitness",
      meta: ["Beginner", "10 min"],
      href: "#",
    },
    {
      title: "How to Build a Weekly Strength Routine That Sticks",
      tag: "Fitness",
      meta: ["Trainer-approved", "8 min read"],
      href: "#",
    },
    {
      title: "Walking Workouts: A Low-Impact Way to Boost Cardio",
      tag: "Fitness",
      meta: ["Low impact", "6 min read"],
      href: "#",
    },
    {
      title: "Mobility Basics: 5 Moves for Stiffer Days",
      tag: "Fitness",
      meta: ["Stretching", "5 min read"],
      href: "#",
    },
    {
      title: "What to Eat Before and After Workouts",
      tag: "Nutrition",
      meta: ["Dietitian tips", "7 min read"],
      href: "#",
    },
    {
      title: "How to Start Running (Without Overdoing It)",
      tag: "Fitness",
      meta: ["Beginner", "8 min read"],
      href: "#",
    },
  ],
  mental: [
    {
      title: "Can Music Therapy Help with Depression?",
      tag: "Mental well-being",
      meta: ["Evidence check", "7 min read"],
      href: "#",
    },
    {
      title: "Anxiety 101: What It Feels Like and What Helps",
      tag: "Mental health",
      meta: ["Compassionate guide", "8 min read"],
      href: "#",
    },
    {
      title: "Sleep and Stress: The Two-Way Street",
      tag: "Sleep health",
      meta: ["Medically reviewed", "6 min read"],
      href: "#",
    },
    {
      title: "Grounding Exercises You Can Do Anywhere",
      tag: "Mental well-being",
      meta: ["Quick tools", "5 min read"],
      href: "#",
    },
    {
      title: "How to Talk to Your Doctor About Burnout",
      tag: "Care navigation",
      meta: ["Checklist", "6 min read"],
      href: "#",
    },
    {
      title: "What 'Self-Compassion' Actually Means",
      tag: "Mental well-being",
      meta: ["Expert tips", "7 min read"],
      href: "#",
    },
  ],
  products: [
    {
      title: "These Are the 8 Best Calorie Counter Apps",
      tag: "Product reviews",
      meta: ["Tested picks", "9 min read"],
      href: "#",
    },
    {
      title: "Is Floor Sitting the New Standing? This Unique Desk Surprised Us",
      tag: "Products",
      meta: ["Hands-on", "6 min read"],
      href: "#",
    },
    {
      title: "The Best Resistance Bands for Beginners",
      tag: "Fitness gear",
      meta: ["Editor tested", "8 min read"],
      href: "#",
    },
    {
      title: "Vitamin D Supplements: How to Choose",
      tag: "Supplements",
      meta: ["Pharmacist tips", "7 min read"],
      href: "#",
    },
    {
      title: "Best Pill Organizers for Busy Weeks",
      tag: "Tools",
      meta: ["Buyer guide", "5 min read"],
      href: "#",
    },
    {
      title: "Air Purifiers for Spring Allergy Season",
      tag: "Home health",
      meta: ["Reviewed", "7 min read"],
      href: "#",
    },
  ],
  recipes: [
    {
      title: "Quick Weeknight Salmon Bowls",
      tag: "Recipes",
      meta: ["30 minutes", "High protein"],
      href: "#",
    },
    {
      title: "Heart-Healthy Grocery List Staples",
      tag: "Heart health",
      meta: ["Dietitian tips", "6 min read"],
      href: "#",
    },
    {
      title: "High-Fiber Breakfasts That Keep You Full",
      tag: "Digestive health",
      meta: ["Fiber", "5 min read"],
      href: "#",
    },
    {
      title: "Mediterranean Snack Plate Ideas",
      tag: "Recipes",
      meta: ["No cook", "4 min read"],
      href: "#",
    },
    {
      title: "Meal Prep 101: A Simple Sunday Plan",
      tag: "Nutrition",
      meta: ["Beginner", "8 min read"],
      href: "#",
    },
    {
      title: "Protein-Packed Vegetarian Lunches",
      tag: "Recipes",
      meta: ["Vegetarian", "7 min read"],
      href: "#",
    },
  ],
  skin: [
    {
      title: "Beginner's Guide to Sensitive Skin",
      tag: "Skin care",
      meta: ["Derm-informed", "8 min read"],
      href: "#",
    },
    {
      title: "Eczema Solutions: Knowledge for Self-Care",
      tag: "Skin care",
      meta: ["Practical tips", "7 min read"],
      href: "#",
    },
    {
      title: "How to Build a Simple Night Routine",
      tag: "Skin care",
      meta: ["Routine", "6 min read"],
      href: "#",
    },
    {
      title: "Moisturizers: Ingredients That Matter",
      tag: "Skin care",
      meta: ["Ingredient guide", "7 min read"],
      href: "#",
    },
    {
      title: "Sun Protection Myths, Explained",
      tag: "Skin care",
      meta: ["Medically reviewed", "6 min read"],
      href: "#",
    },
    {
      title: "When to See a Dermatologist",
      tag: "Care navigation",
      meta: ["Checklist", "5 min read"],
      href: "#",
    },
  ],
};

function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function closeAllMegas({ except } = {}) {
  qsa("[data-mega]").forEach((item) => {
    if (except && item === except) return;
    item.classList.remove("is-open");
    const trigger = qs("[data-mega-trigger]", item);
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  });
}

function renderCards(key) {
  const mount = qs("[data-cards]");
  if (!mount) return;
  mount.setAttribute("aria-busy", "true");

  const items = RECOMMENDED_DATA[key] ?? RECOMMENDED_DATA.top;
  const html = items
    .map(
      (item) => `
        <a class="card" href="${item.href}">
          <span class="tag tag--muted">${item.tag}</span>
          <p class="card-title">${item.title}</p>
          <p class="card-sub">A trusted guide with practical next steps.</p>
          <div class="card-meta">
            ${item.meta.map((m) => `<span class="meta">${m}</span>`).join("")}
          </div>
        </a>
      `,
    )
    .join("");

  // micro-delay for snappy perceived transition
  window.requestAnimationFrame(() => {
    mount.innerHTML = html;
    mount.setAttribute("aria-busy", "false");
  });
}

function initTabs() {
  const tabs = qs("[data-tabs]");
  if (!tabs) return;
  const buttons = qsa("[data-tab]", tabs);
  const setActive = (btn) => {
    buttons.forEach((b) => {
      const active = b === btn;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-selected", active ? "true" : "false");
    });
    renderCards(btn.dataset.tab);
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => setActive(btn));
    btn.addEventListener("keydown", (e) => {
      const idx = buttons.indexOf(btn);
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = buttons[(idx + 1) % buttons.length];
        next.focus();
        setActive(next);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = buttons[(idx - 1 + buttons.length) % buttons.length];
        prev.focus();
        setActive(prev);
      }
    });
  });

  renderCards("top");
}

function initNewsletterForms() {
  qsa("[data-newsletter-form]").forEach((form) => {
    const status = qs("[data-newsletter-status]", form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const email = String(fd.get("email") || "").trim();
      if (!email) {
        if (status) status.textContent = "Please enter a valid email.";
        return;
      }
      if (status) status.textContent = "Thanks — you're subscribed.";
      form.reset();
    });
  });
}

function initCarousel() {
  const track = qs("[data-carousel-track]");
  if (!track) return;
  const prev = qs("[data-carousel-prev]");
  const next = qs("[data-carousel-next]");

  const step = () => {
    const first = qs(".topic", track);
    if (!first) return 260;
    const rect = first.getBoundingClientRect();
    return Math.max(220, Math.round(rect.width + 14));
  };

  prev?.addEventListener("click", () => {
    track.scrollBy({ left: -step(), behavior: "smooth" });
  });
  next?.addEventListener("click", () => {
    track.scrollBy({ left: step(), behavior: "smooth" });
  });
}

function initMegaMenu() {
  const backdrop = qs("[data-backdrop]");
  const triggers = qsa("[data-mega-trigger]");
  const closeBackdrop = () => {
    if (!backdrop) return;
    backdrop.hidden = true;
  };
  const openBackdrop = () => {
    if (!backdrop) return;
    backdrop.hidden = false;
  };

  triggers.forEach((trigger) => {
    const item = trigger.closest("[data-mega]");
    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      if (isOpen) {
        closeAllMegas();
        closeBackdrop();
        return;
      }
      closeAllMegas({ except: item });
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      openBackdrop();
    });
  });

  qsa("[data-close-mega]").forEach((link) => {
    link.addEventListener("click", () => {
      closeAllMegas();
      closeBackdrop();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeAllMegas();
    closeBackdrop();
    qs("[data-nav-toggle]")?.setAttribute("aria-expanded", "false");
    qs("[data-nav-panel]")?.classList.remove("is-open");
  });

  backdrop?.addEventListener("click", () => {
    closeAllMegas();
    closeBackdrop();
    qs("[data-nav-toggle]")?.setAttribute("aria-expanded", "false");
    qs("[data-nav-panel]")?.classList.remove("is-open");
  });

  document.addEventListener("click", (e) => {
    const inside = e.target.closest("[data-mega]");
    const trigger = e.target.closest("[data-mega-trigger]");
    if (inside || trigger) return;
    closeAllMegas();
    closeBackdrop();
  });
}

function initMobileNav() {
  const toggle = qs("[data-nav-toggle]");
  const panel = qs("[data-nav-panel]");
  const backdrop = qs("[data-backdrop]");
  if (!toggle || !panel) return;

  toggle.addEventListener("click", () => {
    const open = panel.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (backdrop) backdrop.hidden = !open;
    if (!open) closeAllMegas();
  });
}

function initTickerClone() {
  const group = qs("[data-ticker-group]");
  const cloneTarget = group?.nextElementSibling;
  if (!group || !cloneTarget) return;
  cloneTarget.innerHTML = group.innerHTML;
}

function initYear() {
  const el = qs("[data-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

initTickerClone();
initMegaMenu();
initMobileNav();
initTabs();
initCarousel();
initNewsletterForms();
initYear();

