const storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  },
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function createCarousel({
  root,
  track,
  slides,
  prevButton,
  nextButton,
  dotsRoot,
  statusEl,
  autoplayMs = 6500,
}) {
  let index = 0;
  let timer = null;
  let isInteracting = false;

  const dots = [];
  function setStatus() {
    if (!statusEl) return;
    statusEl.textContent = `Slide ${index + 1} of ${slides.length}`;
  }

  function sync() {
    const x = -index * root.clientWidth;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
    dots.forEach((d, i) => d.setAttribute("data-active", String(i === index)));
    setStatus();
    if (prevButton) prevButton.disabled = slides.length <= 1;
    if (nextButton) nextButton.disabled = slides.length <= 1;
  }

  function go(nextIndex) {
    index = clamp(nextIndex, 0, slides.length - 1);
    sync();
  }

  function next() {
    go((index + 1) % slides.length);
  }

  function prev() {
    go((index - 1 + slides.length) % slides.length);
  }

  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  function start() {
    stop();
    if (!autoplayMs || slides.length <= 1) return;
    timer = window.setInterval(() => {
      if (isInteracting) return;
      next();
    }, autoplayMs);
  }

  if (prevButton) prevButton.addEventListener("click", () => (stop(), prev(), start()));
  if (nextButton) nextButton.addEventListener("click", () => (stop(), next(), start()));

  if (dotsRoot) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.setAttribute("data-active", "false");
      dot.addEventListener("click", () => {
        stop();
        go(i);
        start();
      });
      dotsRoot.appendChild(dot);
      dots.push(dot);
    });
  }

  let startX = 0;
  let dx = 0;
  function onPointerDown(e) {
    isInteracting = true;
    stop();
    startX = e.clientX;
    dx = 0;
    root.setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e) {
    if (!isInteracting) return;
    dx = e.clientX - startX;
  }
  function onPointerUp() {
    if (!isInteracting) return;
    const threshold = Math.min(80, root.clientWidth * 0.12);
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    isInteracting = false;
    start();
  }

  root.addEventListener("pointerdown", onPointerDown);
  root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("pointerup", onPointerUp);
  root.addEventListener("pointercancel", onPointerUp);

  root.addEventListener("mouseenter", () => {
    isInteracting = true;
    stop();
  });
  root.addEventListener("mouseleave", () => {
    isInteracting = false;
    start();
  });

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      stop();
      prev();
      start();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      stop();
      next();
      start();
    }
  });

  window.addEventListener("resize", sync);
  sync();
  start();

  return { go, next, prev, stop, start };
}

function initHeaderElevation() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.setAttribute("data-elevated", window.scrollY > 6 ? "true" : "false");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initNav() {
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.querySelector(".nav-panel");
  if (!nav || !toggle || !panel) return;

  function close() {
    nav.setAttribute("data-open", "false");
    toggle.setAttribute("aria-expanded", "false");
  }

  function open() {
    nav.setAttribute("data-open", "true");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.getAttribute("data-open") === "true";
    if (isOpen) close();
    else open();
  });

  panel.addEventListener("click", (e) => {
    if (e.target.closest("a")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target)) close();
  });
}

function initLanguageDropdown() {
  const root = document.querySelector("[data-lang]");
  if (!root) return;
  const button = root.querySelector(".lang-button");
  const list = root.querySelector(".lang-list");
  const label = root.querySelector(".lang-label");
  const options = Array.from(list.querySelectorAll("[role='option']"));

  function setOpen(open) {
    root.setAttribute("data-open", open ? "true" : "false");
    button.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) list.focus();
  }

  function select(value) {
    label.textContent = value;
    options.forEach((opt) => opt.setAttribute("aria-selected", String(opt.dataset.value === value)));
    storage.set("leap.lang", value);
  }

  const saved = storage.get("leap.lang", "Global EN");
  select(saved);

  button.addEventListener("click", () => {
    const open = root.getAttribute("data-open") === "true";
    setOpen(!open);
  });

  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      select(opt.dataset.value);
      setOpen(false);
    });
  });

  list.addEventListener("keydown", (e) => {
    const open = root.getAttribute("data-open") === "true";
    if (!open) return;

    const currentIndex = options.findIndex((o) => o.getAttribute("aria-selected") === "true");
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      button.focus();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = clamp(currentIndex + 1, 0, options.length - 1);
      options[nextIndex].scrollIntoView({ block: "nearest" });
      options[nextIndex].click();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIndex = clamp(currentIndex - 1, 0, options.length - 1);
      options[nextIndex].scrollIntoView({ block: "nearest" });
      options[nextIndex].click();
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      options[currentIndex]?.click();
    }
  });

  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) setOpen(false);
  });
}

function initHeroCarousel() {
  const carousel = document.querySelector("[data-hero-carousel]");
  if (!carousel) return;
  const viewport = carousel.querySelector(".carousel-viewport");
  const track = carousel.querySelector("[data-carousel-track]");
  const slides = Array.from(carousel.querySelectorAll("[data-hero-slide]"));
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dotsRoot = carousel.querySelector("[data-carousel-dots]");
  const statusEl = carousel.querySelector("[data-carousel-status]");

  viewport.tabIndex = 0;
  createCarousel({
    root: viewport,
    track,
    slides,
    prevButton,
    nextButton,
    dotsRoot,
    statusEl,
    autoplayMs: 6800,
  });
}

function initWorkRail() {
  const rail = document.querySelector("[data-work-rail]");
  if (!rail) return;
  const prev = document.querySelector("[data-work-prev]");
  const next = document.querySelector("[data-work-next]");

  function scrollByCards(direction) {
    const card = rail.querySelector(".project-card");
    const w = card ? card.getBoundingClientRect().width : 360;
    rail.scrollBy({ left: direction * (w + 14), behavior: "smooth" });
  }

  prev?.addEventListener("click", () => scrollByCards(-1));
  next?.addEventListener("click", () => scrollByCards(1));

  rail.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCards(-1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCards(1);
    }
  });
}

function initTeamCarousel() {
  const tabsRoot = document.querySelector("[data-team-tabs]");
  const track = document.querySelector("[data-team-track]");
  const regionLabel = document.querySelector("[data-team-region-label]");
  const prev = document.querySelector("[data-team-prev]");
  const next = document.querySelector("[data-team-next]");
  if (!tabsRoot || !track || !regionLabel) return;

  const team = [
    {
      name: "Denice Alvarez",
      title: "Office Manager",
      office: "New York",
      region: "North America",
      quote:
        "As the Office Manager, I engage with teams from every discipline, and have learned so much through my day-to-day interactions with my fellow leapers.",
      img: "./assets/team-denice.ppm",
    },
    {
      name: "Marco Bellini",
      title: "Design Director",
      office: "San Francisco",
      region: "North America",
      quote:
        "Every day we are delighted by the immense beauty that nature holds. When engaged in the act of creation, it is our responsibility to channel that delight into the things we make.",
      img: "./assets/team-marco.ppm",
    },
    {
      name: "Priya Mehta",
      title: "Studio Head",
      office: "Bangalore",
      region: "Asia",
      quote:
        "We bring your brand vision to life, with transformative ideas and impactful marketing campaigns fueled by creativity and enthusiasm.",
      img: "./assets/team-priya.ppm",
    },
    {
      name: "Thierry Lam",
      title: "Design Lead",
      office: "Singapore",
      region: "Asia",
      quote:
        "Good design is multifaceted. It impacts functionality, aesthetics, strategy, environment, business and so much more. Great design is seamless.",
      img: "./assets/team-thierry.ppm",
    },
    {
      name: "Gavin Hartley",
      title: "Managing Director",
      office: "London",
      region: "Europe",
      quote:
        "It's my job to make sure we innovate and push the boundaries when collaborating with brands to create inspiring customer experiences that deliver great business results.",
      img: "./assets/team-gavin.ppm",
    },
    {
      name: "Francesca Terzi",
      title: "Design Director",
      office: "Munich",
      region: "Europe",
      quote:
        "At Leap Studio, I am constantly amazed by the talent I am surrounded with. We love to dream big and bring those dreams to life.",
      img: "./assets/team-francesca.ppm",
    },
    {
      name: "Jacintha Soo Ho",
      title: "Senior Manager, CX Transformation",
      office: "Melbourne",
      region: "Oceania",
      quote:
        "I love helping clients see beyond their assumptions and showing them opportunities they haven't thought of before.",
      img: "./assets/team-jacintha.ppm",
    },
  ];

  function render(region) {
    regionLabel.textContent = region;
    track.innerHTML = "";

    const filtered = team.filter((t) => t.region === region);

    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "team-card";
      empty.innerHTML = `
        <div class="team-body">
          <h3 class="team-name">No team members</h3>
          <p class="team-quote">We’re expanding this region soon.</p>
        </div>
      `;
      track.appendChild(empty);
      return;
    }

    filtered.forEach((t) => {
      const card = document.createElement("article");
      card.className = "team-card";
      card.innerHTML = `
        <div class="team-photo" style="--img: url('${t.img}')"></div>
        <div class="team-body">
          <div>
            <h3 class="team-name">${t.name}</h3>
            <div class="team-meta">${t.title} · ${t.office}</div>
          </div>
          <p class="team-quote">“${t.quote}”</p>
          <div class="team-actions">
            <div class="team-location">${t.office}</div>
            <a class="button ghost" href="#contact" aria-label="Contact Leap Studio ${t.office}">Contact</a>
          </div>
        </div>
      `;
      track.appendChild(card);
    });

    track.scrollTo({ left: 0, behavior: "smooth" });
  }

  function setSelectedTab(region) {
    tabsRoot.querySelectorAll("[role='tab']").forEach((tab) => {
      tab.setAttribute("aria-selected", String(tab.dataset.region === region));
    });
  }

  function scrollByCard(direction) {
    const first = track.querySelector(".team-card");
    const w = first ? first.getBoundingClientRect().width : 300;
    track.scrollBy({ left: direction * (w + 14), behavior: "smooth" });
  }

  tabsRoot.addEventListener("click", (e) => {
    const button = e.target.closest("[role='tab']");
    if (!button) return;
    const region = button.dataset.region;
    setSelectedTab(region);
    render(region);
    storage.set("leap.region", region);
  });

  tabsRoot.addEventListener("keydown", (e) => {
    const tabs = Array.from(tabsRoot.querySelectorAll("[role='tab']"));
    const selectedIndex = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (selectedIndex + 1) % tabs.length;
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const nextIndex = (selectedIndex - 1 + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    }
  });

  prev?.addEventListener("click", () => scrollByCard(-1));
  next?.addEventListener("click", () => scrollByCard(1));

  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCard(-1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCard(1);
    }
  });

  // drag-to-scroll (mobile-friendly)
  let isDown = false;
  let startX = 0;
  let startLeft = 0;
  track.addEventListener("pointerdown", (e) => {
    isDown = true;
    startX = e.clientX;
    startLeft = track.scrollLeft;
    track.setPointerCapture?.(e.pointerId);
  });
  track.addEventListener("pointermove", (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    track.scrollLeft = startLeft - dx;
  });
  track.addEventListener("pointerup", () => (isDown = false));
  track.addEventListener("pointercancel", () => (isDown = false));

  const initial = storage.get("leap.region", "North America");
  setSelectedTab(initial);
  render(initial);
}

function initCookieConsent() {
  const root = document.querySelector("[data-cookie]");
  if (!root) return;
  const modal = root.querySelector("[data-cookie-modal]");
  const acceptButtons = root.querySelectorAll("[data-cookie-accept]");
  const decline = root.querySelector("[data-cookie-decline]");
  const manage = root.querySelector("[data-cookie-manage]");
  const close = root.querySelector("[data-cookie-close]");
  const save = root.querySelector("[data-cookie-save]");
  const openSettings = document.querySelector("[data-cookie-settings]");

  function showBanner() {
    root.hidden = false;
    modal.hidden = true;
    root.querySelector(".cookie-card")?.focus?.();
  }

  function hideAll() {
    root.hidden = true;
    modal.hidden = true;
  }

  function openModal() {
    root.hidden = false;
    modal.hidden = false;
    modal.querySelector(".cookie-modal-card")?.focus?.();
  }

  function acceptAll() {
    storage.set("leap.cookies", {
      consent: "accepted",
      analytics: true,
      marketing: true,
      at: Date.now(),
    });
    hideAll();
  }

  function declineAll() {
    storage.set("leap.cookies", {
      consent: "declined",
      analytics: false,
      marketing: false,
      at: Date.now(),
    });
    hideAll();
  }

  const existing = storage.get("leap.cookies", null);
  if (!existing) {
    showBanner();
  }

  acceptButtons.forEach((btn) => btn.addEventListener("click", acceptAll));
  decline?.addEventListener("click", declineAll);
  manage?.addEventListener("click", openModal);
  close?.addEventListener("click", () => (modal.hidden = true));

  save?.addEventListener("click", () => {
    const analytics = root.querySelector("[data-cookie-analytics]")?.checked ?? false;
    const marketing = root.querySelector("[data-cookie-marketing]")?.checked ?? false;
    storage.set("leap.cookies", {
      consent: "custom",
      analytics,
      marketing,
      at: Date.now(),
    });
    hideAll();
  });

  openSettings?.addEventListener("click", openModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !root.hidden) {
      modal.hidden = true;
    }
  });
}

function initSmoothAnchors() {
  document.querySelectorAll("a[href^='#']").forEach((a) => {
    a.addEventListener("click", () => {
      // close nav on anchor tap handled in initNav
    });
  });
}

initHeaderElevation();
initNav();
initLanguageDropdown();
initHeroCarousel();
initTeamCarousel();
initWorkRail();
initCookieConsent();
initSmoothAnchors();
