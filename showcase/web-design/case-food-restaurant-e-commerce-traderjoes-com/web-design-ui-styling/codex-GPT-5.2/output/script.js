const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const $ = (sel, root = document) => root.querySelector(sel);

function clampZip(raw) {
  const digits = String(raw ?? "").replace(/\D/g, "");
  return digits.slice(0, 5);
}

function isValidZip(zip) {
  return /^\d{5}$/.test(zip);
}

function setupNavScroll() {
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function setupCarousel() {
  const track = $("[data-carousel-track]");
  const prev = $("[data-carousel-prev]");
  const next = $("[data-carousel-next]");
  const status = $("[data-carousel-status]");

  if (!track || !prev || !next) return;

  const getCardWidth = () => {
    const first = track.querySelector(".product-card");
    if (!first) return 260;
    const rect = first.getBoundingClientRect();
    const style = window.getComputedStyle(track);
    const gap = Number.parseFloat(style.columnGap || style.gap || "14") || 14;
    return rect.width + gap;
  };

  const updateButtons = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const x = Math.round(track.scrollLeft);
    prev.disabled = x <= 2;
    next.disabled = x >= maxScroll - 2;

    if (status) {
      const total = track.querySelectorAll(".product-card").length;
      const approxIndex = Math.min(
        total,
        Math.max(1, Math.round(track.scrollLeft / getCardWidth()) + 1),
      );
      status.textContent = `Showing item ${approxIndex} of ${total}`;
    }
  };

  const slide = (dir) => {
    const by = getCardWidth() * 2;
    track.scrollBy({ left: dir * by, behavior: "smooth" });
  };

  prev.addEventListener("click", () => slide(-1));
  next.addEventListener("click", () => slide(1));
  track.addEventListener("scroll", () => window.requestAnimationFrame(updateButtons));

  // Keyboard affordances
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      slide(-1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      slide(1);
    }
  });

  updateButtons();
  window.addEventListener("resize", updateButtons);
}

function setupStoreLocator() {
  const input = $("[data-zip-input]");
  const btn = $("[data-zip-search]");
  const panel = $("[data-store-results]");
  const msg = $("[data-store-message]");
  if (!input || !btn || !panel) return;

  const stores = [
    {
      name: "Fresh Pantry — Lincoln Park",
      address: "2140 N. Halsted St, Chicago, IL 60614",
      hours: "8am – 9pm Daily",
      distance: "0.8 mi",
    },
    {
      name: "Fresh Pantry — Wicker Park",
      address: "1840 W. North Ave, Chicago, IL 60622",
      hours: "8am – 9pm Daily",
      distance: "1.4 mi",
    },
    {
      name: "Fresh Pantry — Lakeview",
      address: "3745 N. Lincoln Ave, Chicago, IL 60613",
      hours: "8am – 9pm Daily",
      distance: "2.1 mi",
    },
  ];

  const render = () => {
    panel.innerHTML = stores
      .map(
        (s) => `
        <article class="store" role="listitem">
          <div>
            <h4 class="font-display">${s.name}</h4>
            <div class="store-meta">
              <div>${s.address}</div>
              <div class="store-badges">
                <span class="mini green">Hours: ${s.hours}</span>
                <span class="mini alt">${s.distance}</span>
              </div>
            </div>
          </div>
        </article>
      `,
      )
      .join("\n");
  };

  const runSearch = () => {
    const zip = clampZip(input.value);
    input.value = zip;

    if (!isValidZip(zip)) {
      if (msg) {
        msg.textContent = "Please enter a valid 5-digit zip code.";
        msg.style.color = "rgba(231,111,81,1)";
      }
      panel.innerHTML = "";
      input.focus();
      return;
    }

    if (msg) {
      msg.textContent = `Showing nearby stores for ${zip}`;
      msg.style.color = "rgba(14,27,20,.72)";
    }
    render();
  };

  input.addEventListener("input", () => {
    input.value = clampZip(input.value);
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runSearch();
    }
  });
  btn.addEventListener("click", runSearch);
}

function setupNewsletter() {
  const form = $("[data-newsletter-form]");
  const input = $("[data-newsletter-email]");
  const toast = $("[data-newsletter-toast]");
  if (!form || !input || !toast) return;

  const showToast = () => {
    toast.classList.add("show");
    toast.setAttribute("aria-hidden", "false");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = String(input.value || "").trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      input.focus();
      input.setCustomValidity("Please enter a valid email.");
      input.reportValidity();
      input.setCustomValidity("");
      return;
    }
    showToast();
    input.value = "";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavScroll();
  setupCarousel();
  setupStoreLocator();
  setupNewsletter();
});

