const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function smoothScrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupNav() {
  // Smooth anchors
  qsa('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      smoothScrollToId(id);
      // Close mobile
      const mobile = qs("#mobileMenu");
      const btn = qs("#mobileMenuBtn");
      if (mobile && btn && !mobile.hasAttribute("hidden")) {
        mobile.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Mobile menu
  const mobileBtn = qs("#mobileMenuBtn");
  const mobileMenu = qs("#mobileMenu");
  if (mobileBtn && mobileMenu) {
    const toggle = () => {
      const open = mobileMenu.hasAttribute("hidden") ? false : true;
      if (open) {
        mobileMenu.setAttribute("hidden", "");
        mobileBtn.setAttribute("aria-expanded", "false");
      } else {
        mobileMenu.removeAttribute("hidden");
        mobileBtn.setAttribute("aria-expanded", "true");
      }
    };
    mobileBtn.addEventListener("click", toggle);
    document.addEventListener("click", (e) => {
      if (mobileMenu.hasAttribute("hidden")) return;
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (mobileMenu.contains(t) || mobileBtn.contains(t)) return;
      mobileMenu.setAttribute("hidden", "");
      mobileBtn.setAttribute("aria-expanded", "false");
    });
  }
}

function setupDropdown() {
  const btn = qs("#langBtn");
  const menu = qs("#langMenu");
  if (!btn || !menu) return;

  const close = () => {
    menu.setAttribute("hidden", "");
    btn.setAttribute("aria-expanded", "false");
  };

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const open = !menu.hasAttribute("hidden");
    if (open) close();
    else {
      menu.removeAttribute("hidden");
      btn.setAttribute("aria-expanded", "true");
    }
  });

  qsa("button[data-lang]", menu).forEach((item) => {
    item.addEventListener("click", () => {
      const label = item.getAttribute("data-label") || item.textContent?.trim() || "Global EN";
      qs("#langLabel").textContent = label;
      close();
    });
  });

  document.addEventListener("click", (e) => {
    if (menu.hasAttribute("hidden")) return;
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (menu.contains(t) || btn.contains(t)) return;
    close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    close();
  });
}

function setupHeroCarousel() {
  const root = qs("#heroCarousel");
  if (!root) return;
  const slides = qsa("[data-hero-slide]", root);
  const dots = qsa("[data-hero-dot]", root);
  const prev = qs("#heroPrev");
  const next = qs("#heroNext");
  if (!slides.length) return;

  let index = 0;
  let timer = null;
  const AUTOPLAY_MS = 6500;

  const setIndex = (i, { focusDot = false } = {}) => {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, si) => {
      const active = si === index;
      s.setAttribute("aria-hidden", active ? "false" : "true");
      s.toggleAttribute("hidden", !active);
    });
    dots.forEach((d, di) => {
      d.setAttribute("aria-current", di === index ? "true" : "false");
      if (focusDot && di === index) d.focus();
    });
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };
  const start = () => {
    stop();
    timer = window.setInterval(() => setIndex(index + 1), AUTOPLAY_MS);
  };

  dots.forEach((d, di) => {
    d.addEventListener("click", () => {
      setIndex(di);
      start();
    });
  });
  prev?.addEventListener("click", () => {
    setIndex(index - 1);
    start();
  });
  next?.addEventListener("click", () => {
    setIndex(index + 1);
    start();
  });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);

  setIndex(0);
  start();
}

function setupRailNav(viewport, prevBtn, nextBtn) {
  const el = typeof viewport === "string" ? qs(viewport) : viewport;
  const prev = typeof prevBtn === "string" ? qs(prevBtn) : prevBtn;
  const next = typeof nextBtn === "string" ? qs(nextBtn) : nextBtn;
  if (!el || !prev || !next) return;

  const step = () => Math.max(280, Math.round(el.clientWidth * 0.85));

  const scrollBy = (dx) => {
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  prev.addEventListener("click", () => scrollBy(-step()));
  next.addEventListener("click", () => scrollBy(step()));

  const sync = () => {
    const max = el.scrollWidth - el.clientWidth;
    const x = el.scrollLeft;
    prev.disabled = x <= 2;
    next.disabled = x >= max - 2;
  };

  el.addEventListener("scroll", () => {
    window.requestAnimationFrame(sync);
  });
  window.addEventListener("resize", sync);
  sync();
}

function setupTeamCarousel() {
  const tabs = qsa("[data-region-tab]");
  const viewport = qs("#teamViewport");
  if (!tabs.length || !viewport) return;

  const members = JSON.parse(viewport.getAttribute("data-members") || "[]");
  const byRegion = members.reduce((acc, m) => {
    acc[m.region] ||= [];
    acc[m.region].push(m);
    return acc;
  }, {});

  const cardHtml = (m) => {
    const safeOffice = (m.office || "").trim();
    const city = safeOffice.split(",")[0] || safeOffice;
    const email = `mailto:contact@leapstudio.example?subject=Contact%20Leap%20Studio%20${encodeURIComponent(city)}`;
    return `
      <article class="card" data-team-card>
        <div class="card__media" style="background-image:url('${m.photo}')" role="img" aria-label="Portrait of ${m.name}"></div>
        <div class="card__body">
          <h3 class="card__name">${m.name}</h3>
          <div class="card__meta">${m.title} · ${m.office}</div>
          <p class="quote">“${m.quote}”</p>
        </div>
        <div class="card__footer">
          <a class="btn btn--ghost" href="${email}" aria-label="Contact Leap Studio ${city}">
            <span>Contact Leap Studio ${city}</span>
            <span class="icon" data-lucide="arrow-up-right"></span>
          </a>
        </div>
      </article>
    `.trim();
  };

  const render = (region) => {
    const list = byRegion[region] || [];
    viewport.innerHTML = list.map(cardHtml).join("\n");
    viewport.scrollTo({ left: 0, behavior: "auto" });
    // Re-render icons inside injected content
    if (window.lucide?.createIcons) window.lucide.createIcons();
    const count = qs("#teamCount");
    if (count) count.textContent = `${list.length} people`;
  };

  const select = (region) => {
    tabs.forEach((t) => {
      const active = t.getAttribute("data-region-tab") === region;
      t.setAttribute("aria-selected", active ? "true" : "false");
    });
    render(region);
    const title = qs("#teamRegionLabel");
    if (title) title.textContent = region;
  };

  tabs.forEach((t) => {
    t.addEventListener("click", () => {
      const region = t.getAttribute("data-region-tab");
      if (!region) return;
      select(region);
    });
  });

  select(tabs[0].getAttribute("data-region-tab"));

  setupRailNav(viewport, "#teamPrev", "#teamNext");
}

function setupWorkCarousel() {
  setupRailNav("#workRail", "#workPrev", "#workNext");
}

function setupCookies() {
  const banner = qs("#cookieBanner");
  const modal = qs("#cookieModal");
  if (!banner || !modal) return;

  const key = "leapstudio_cookie_choice_v1";
  const existing = window.localStorage.getItem(key);
  if (existing) {
    banner.setAttribute("hidden", "");
  }

  const hideBanner = () => banner.setAttribute("hidden", "");
  const showModal = () => {
    modal.removeAttribute("hidden");
    qs("#cookieClose")?.focus();
  };
  const hideModal = () => modal.setAttribute("hidden", "");

  const save = (choice) => {
    window.localStorage.setItem(key, JSON.stringify({ choice, ts: Date.now() }));
  };

  qs("#cookieAccept")?.addEventListener("click", () => {
    save("accept_all");
    hideBanner();
  });
  qs("#cookieDecline")?.addEventListener("click", () => {
    save("decline_all");
    hideBanner();
  });
  qs("#cookieManage")?.addEventListener("click", () => {
    showModal();
  });

  qs("#cookieClose")?.addEventListener("click", () => hideModal());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) hideModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!modal.hasAttribute("hidden")) hideModal();
  });

  qs("#cookieSave")?.addEventListener("click", () => {
    const analytics = !!qs("#cookieAnalytics")?.checked;
    const marketing = !!qs("#cookieMarketing")?.checked;
    save({ analytics, marketing });
    hideModal();
    hideBanner();
  });
  qs("#cookieAcceptAllFromModal")?.addEventListener("click", () => {
    save("accept_all");
    hideModal();
    hideBanner();
  });
}

function init() {
  setupNav();
  setupDropdown();
  setupHeroCarousel();
  setupTeamCarousel();
  setupWorkCarousel();
  setupCookies();

  // Icons
  if (window.lucide?.createIcons) window.lucide.createIcons();
}

document.addEventListener("DOMContentLoaded", init);

