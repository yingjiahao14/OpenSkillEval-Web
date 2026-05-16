(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ----- Mega menu -----
  const backdrop = $("#backdrop");
  const mega = $("#mega");
  const megaTitle = $("#megaTitle");
  const megaDesc = $("#megaDesc");
  const megaGrid = $("#megaGrid");
  const navButtons = $$("[data-mega]");

  const megaData = {
    conditions: {
      title: "Health Conditions",
      desc: "Explore medically reviewed condition guides and next steps.",
      items: [
        "Breast Cancer",
        "Chronic Kidney Disease",
        "COPD",
        "Digestive Health",
        "Eye Health",
        "Heart Health",
        "Menopause",
        "Mental Health",
        "Migraine",
        "Multiple Sclerosis",
        "Parkinson's Disease",
        "Psoriasis",
        "Rheumatoid Arthritis",
        "Sleep Health",
        "Type 2 Diabetes",
        "Weight Management",
      ],
    },
    wellness: {
      title: "Wellness",
      desc: "Daily habits, evidence-backed guidance, and product recommendations.",
      items: [
        "CBD",
        "Fitness",
        "Healthy Aging",
        "Hearing",
        "Mental Well-Being",
        "Nutrition",
        "Parenthood",
        "Recipes",
        "Sexual Health",
        "Skin Care",
        "Sleep Health",
        "Vitamins and Supplements",
        "Women's Wellness",
        "Product Reviews",
        "Featured Programs",
      ],
    },
    tools: {
      title: "Tools",
      desc: "Quick calculators and search tools to support decisions.",
      items: [
        "Pill Identifier",
        "FindCare",
        "Drugs A-Z",
        "Medicare Plans by State",
        "Lessons",
        "Newsletters",
        "Lifestyle Quizzes",
      ],
    },
    featured: {
      title: "Featured",
      desc: "Fresh reporting, editors' picks, and video series.",
      items: ["Health News", "Top Reads", "Video Series"],
    },
    connect: {
      title: "Connect",
      desc: "Join community conversations and follow along.",
      items: ["Bezzy Communities", "Facebook", "X", "Pinterest", "Instagram", "YouTube"],
    },
  };

  function iconFor(label) {
    // Tiny, deterministic icon glyph based on label.
    const code = label
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .split("")
      .reduce((a, c) => a + c.charCodeAt(0), 0);
    const glyphs = ["✚", "⌁", "◔", "◎", "⟐", "↟", "⤿", "∿", "◟", "◉"];
    return glyphs[code % glyphs.length];
  }

  function setMegaContent(key) {
    const data = megaData[key];
    if (!data) return;
    megaTitle.textContent = data.title;
    megaDesc.textContent = data.desc;
    megaGrid.innerHTML = data.items
      .map(
        (name) => `
        <a class="mega-item" href="#" role="menuitem">
          <div class="icon" aria-hidden="true">${iconFor(name)}</div>
          <div>
            <strong>${name}</strong>
            <span>Browse guides and articles</span>
          </div>
        </a>`
      )
      .join(" ");
  }

  function openMega(btn) {
    const key = btn.getAttribute("data-mega");
    setMegaContent(key);
    navButtons.forEach((b) => b.setAttribute("aria-expanded", b === btn ? "true" : "false"));
    mega.dataset.open = "true";
    backdrop.dataset.open = "true";
  }

  function closeMega() {
    navButtons.forEach((b) => b.setAttribute("aria-expanded", "false"));
    mega.dataset.open = "false";
    backdrop.dataset.open = "false";
  }

  navButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      if (isOpen) closeMega();
      else openMega(btn);
    });
  });

  backdrop?.addEventListener("click", closeMega);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMega();
  });
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    const insideMega = !!target.closest("#mega");
    const insideNav = !!target.closest(".nav");
    if (!insideMega && !insideNav) closeMega();
  });

  // ----- Ticker duplication for seamless scroll -----
  const marquee = $("#tickerMarquee");
  if (marquee) {
    // Duplicate the stats for the second half of the animation.
    marquee.innerHTML = marquee.innerHTML + marquee.innerHTML;
  }

  // ----- Recommended reads tabs -----
  const tablist = $("#readsTabs");
  const readsGrid = $("#readsGrid");

  const reads = {
    "Top Reads": [
      "16 Superfoods That Are Worthy of the Title",
      "Does Ozempic Cause Hair Loss?",
      "Prescription Drug Content on Social Media Often Misleading, Study Finds",
      "Can Music Therapy Help with Depression?",
      "Why Am I Craving So Much Salt?",
      "These Are the 8 Best Calorie Counter Apps",
    ],
    Fitness: [
      "Day 12: Resistance Band Moves You Can Do in 10 Minutes",
      "How to Make a Heart-Healthy Grocery List",
      "Is Floor Sitting the New Standing? This Unique Desk Surprised Us",
      "Beginner's Guide: Building Strength Safely",
      "Walking Workouts That Fit Any Schedule",
      "Stretching for Stiff Hips and Back",
    ],
    "Mental Well-Being": [
      "Can Music Therapy Help with Depression?",
      "Anxiety vs. Stress: What's the Difference?",
      "Small Habits That Support Better Sleep",
      "Mindfulness for Busy People",
      "How to Talk to Someone About Burnout",
      "What to Know About Mood Tracking Apps",
    ],
    "Product Reviews": [
      "These Are the 8 Best Calorie Counter Apps",
      "Is Floor Sitting the New Standing? This Unique Desk Surprised Us",
      "Best Resistance Bands for Beginners",
      "Top-rated Sleep Masks for Side Sleepers",
      "Vitamins and Supplements: What Matters",
      "Fitness Trackers That Get the Basics Right",
    ],
    Recipes: [
      "High-Protein Breakfasts You Can Prep",
      "A Heart-Healthy Grocery List, Simplified",
      "Fiber-forward Snacks That Actually Taste Good",
      "Quick Weeknight Salads for Spring",
      "Lower-Sodium Pantry Staples",
      "Easy Smoothies for Post-Workout Recovery",
    ],
    "Skin Care": [
      "Beginner's Guide to Sensitive Skin",
      "What Every Psoriasis Patient Needs to Know About Flares and Stress",
      "Eczema Solutions: Knowledge for Self-Care",
      "How to Build a Simple Routine",
      "Sunscreen Myths, Explained",
      "Dry Skin: Ingredients That Help",
    ],
  };

  function readingTime(title) {
    // A small heuristic for variety.
    const base = Math.max(4, Math.min(10, Math.ceil(title.length / 14)));
    return `${base} min read`;
  }

  function renderReads(category) {
    const titles = reads[category] || reads["Top Reads"];
    readsGrid.innerHTML = titles
      .slice(0, 6)
      .map(
        (t) => `
        <a class="card article" href="#" aria-label="Read: ${t}">
          <div class="thumb" aria-hidden="true"></div>
          <div class="pad">
            <div class="meta">
              <span class="kicker"><span class="line"></span>${category}</span>
              <span class="reading">${readingTime(t)}</span>
            </div>
            <h4>${t}</h4>
            <p>Medically reviewed insights, clearly explained.</p>
          </div>
        </a>`
      )
      .join(" ");
  }

  function setActiveTab(button) {
    const buttons = $$("button[role='tab']", tablist);
    buttons.forEach((b) => b.setAttribute("aria-selected", b === button ? "true" : "false"));
    renderReads(button.dataset.category);
  }

  if (tablist && readsGrid) {
    tablist.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const btn = target.closest("button[role='tab']");
      if (!btn) return;
      setActiveTab(btn);
    });

    tablist.addEventListener("keydown", (e) => {
      const buttons = $$("button[role='tab']", tablist);
      const current = buttons.findIndex((b) => b.getAttribute("aria-selected") === "true");
      if (current < 0) return;
      let next = current;
      if (e.key === "ArrowRight") next = (current + 1) % buttons.length;
      if (e.key === "ArrowLeft") next = (current - 1 + buttons.length) % buttons.length;
      if (next !== current) {
        e.preventDefault();
        buttons[next].focus();
        setActiveTab(buttons[next]);
      }
    });

    // Initial render
    const initial = $("button[role='tab'][aria-selected='true']", tablist);
    renderReads(initial?.dataset.category || "Top Reads");
  }

  // ----- Topics carousel buttons -----
  const track = $("#topicsTrack");
  $("#topicsPrev")?.addEventListener("click", () => {
    if (!track) return;
    track.scrollBy({ left: -420, behavior: "smooth" });
  });
  $("#topicsNext")?.addEventListener("click", () => {
    if (!track) return;
    track.scrollBy({ left: 420, behavior: "smooth" });
  });

  // ----- Newsletter submission (client-side demo) -----
  function hookNewsletter(formSel, inputSel, msgSel) {
    const form = $(formSel);
    const input = $(inputSel);
    const msg = $(msgSel);
    if (!form || !input || !msg) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = String(input.value || "").trim();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      msg.hidden = false;
      msg.textContent = ok
        ? `Thanks — you're in! We'll send updates to ${email}.`
        : "Please enter a valid email address.";
      msg.style.color = ok ? "#0b3940" : "#8a2e2e";
      if (ok) {
        form.reset();
      }
    });
  }
  hookNewsletter("#newsletterForm", "#newsletterEmail", "#newsletterMsg");
  hookNewsletter("#footerForm", "#footerEmail", "#footerMsg");

  // ----- Search UX (Cmd/Ctrl+K) -----
  const searchInput = $("#siteSearch");
  document.addEventListener("keydown", (e) => {
    const isK = e.key.toLowerCase() === "k";
    if (isK && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      searchInput?.focus();
    }
  });
})();

