const STORE_RESULTS = [
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

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.querySelector(".nav-panel");
  if (!toggle || !panel) return;

  function setOpen(isOpen) {
    panel.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  panel.addEventListener("click", (e) => {
    const target = e.target;
    if (target instanceof HTMLAnchorElement) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

function initCarousel() {
  const track = document.querySelector("[data-carousel-track]");
  const prev = document.querySelector("[data-carousel-prev]");
  const next = document.querySelector("[data-carousel-next]");
  if (!track || !prev || !next) return;

  function getStep() {
    const firstCard = track.querySelector(".product-card");
    if (!(firstCard instanceof HTMLElement)) return 320;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 16;
    return Math.round(cardWidth + gap);
  }

  function scrollByDir(direction) {
    const step = getStep();
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  prev.addEventListener("click", () => scrollByDir(-1));
  next.addEventListener("click", () => scrollByDir(1));

  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") scrollByDir(-1);
    if (e.key === "ArrowRight") scrollByDir(1);
  });
}

function initStoreLocator() {
  const form = document.querySelector("[data-store-form]");
  const tbody = document.querySelector("[data-store-results]");
  const meta = document.querySelector("[data-store-meta]");

  if (!(form instanceof HTMLFormElement) || !(tbody instanceof HTMLElement) || !(meta instanceof HTMLElement)) return;

  function render(rows, label) {
    tbody.innerHTML = rows
      .map(
        (r) =>
          `<tr>
            <td><strong>${r.name}</strong></td>
            <td>${r.address}</td>
            <td>${r.hours}</td>
            <td><strong>${r.distance}</strong></td>
          </tr>`,
      )
      .join("");
    meta.textContent = label;
  }

  function normalizeZip(raw) {
    return String(raw || "")
      .trim()
      .replace(/[^0-9-]/g, "")
      .slice(0, 10);
  }

  function isValidZip(value) {
    return /^\d{5}(-\d{4})?$/.test(value);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const zip = normalizeZip(data.get("zip"));

    if (!zip) {
      render([], "Please enter a zip code.");
      return;
    }

    if (!isValidZip(zip)) {
      render([], "That zip code doesn't look right — try 5 digits (e.g., 60614).");
      return;
    }

    const isChicago = zip.startsWith("606");
    const results = isChicago ? STORE_RESULTS : STORE_RESULTS.map((r, idx) => ({
      ...r,
      distance: `${clamp(1.2 + idx * 0.9, 0.6, 9.9).toFixed(1)} mi`,
    }));

    render(results, `Showing stores near ${zip}.`);
  });
}

function initNewsletter() {
  const form = document.querySelector("[data-newsletter-form]");
  const message = document.querySelector("[data-newsletter-message]");
  if (!(form instanceof HTMLFormElement) || !(message instanceof HTMLElement)) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    if (!email) return;
    message.textContent = "Thanks for subscribing! Check your inbox for a welcome treat.";
    form.reset();
  });
}

initMobileNav();
initCarousel();
initStoreLocator();
initNewsletter();

