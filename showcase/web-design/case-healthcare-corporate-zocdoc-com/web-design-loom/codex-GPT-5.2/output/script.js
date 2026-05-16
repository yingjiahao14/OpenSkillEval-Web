/* MedBook landing interactions (no build step). */

const SUGGESTIONS = [
  { type: "Specialty", value: "Primary Care" },
  { type: "Specialty", value: "Dentist" },
  { type: "Specialty", value: "Dermatologist" },
  { type: "Specialty", value: "Psychiatrist" },
  { type: "Specialty", value: "Eye Doctor" },
  { type: "Specialty", value: "Orthopedic Surgeon" },
  { type: "Condition", value: "Back pain" },
  { type: "Condition", value: "Acne" },
  { type: "Condition", value: "Anxiety" },
  { type: "Condition", value: "Seasonal allergies" },
  { type: "Doctor", value: "Dr. Sarah Chen" },
  { type: "Doctor", value: "Dr. Miguel Alvarez" },
  { type: "Doctor", value: "Dr. Priya Kapoor" },
];

function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function highlightMatch(text, query) {
  const safeText = escapeHtml(text);
  const q = query.trim();
  if (!q) return safeText;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return safeText;
  const before = escapeHtml(text.slice(0, idx));
  const match = escapeHtml(text.slice(idx, idx + q.length));
  const after = escapeHtml(text.slice(idx + q.length));
  return `${before}<mark>${match}</mark>${after}`;
}

function buildSearchUrl({ query, location, insurance, specialty }) {
  const url = new URL("search.html", window.location.href);
  if (specialty) url.searchParams.set("specialty", specialty);
  if (query) url.searchParams.set("q", query);
  if (location) url.searchParams.set("loc", location);
  if (insurance) url.searchParams.set("ins", insurance);
  return url.toString();
}

function initDrawer() {
  const btn = qs("#mobileMenuBtn");
  const drawer = qs("#mobile-drawer");
  if (!btn || !drawer) return;

  const closeTargets = qsa("[data-drawer-close]", drawer);
  const focusableSel =
    "a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex='-1'])";
  let lastFocused = null;

  function openDrawer() {
    lastFocused = document.activeElement;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";

    const first = drawer.querySelector(focusableSel);
    if (first) first.focus();
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  btn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  closeTargets.forEach((el) => el.addEventListener("click", closeDrawer));

  document.addEventListener("keydown", (e) => {
    if (!drawer.classList.contains("open")) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeDrawer();
      return;
    }
    if (e.key === "Tab") {
      const focusables = qsa(focusableSel, drawer);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

function initAutocomplete() {
  const input = qs("#query");
  const box = qs("#suggestions");
  if (!input || !box) return;

  let activeIndex = -1;
  let open = false;
  let currentItems = [];

  function setOpen(nextOpen) {
    open = nextOpen;
    box.classList.toggle("open", open);
    input.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function render(items, query) {
    currentItems = items;
    activeIndex = -1;
    if (!items.length) {
      box.innerHTML =
        '<div class="item" role="option" aria-selected="false" data-empty="true">' +
        '<div class="s-left"><span class="badge">Tip</span><span>No matches — try a specialty like “Dentist”</span></div>' +
        '<span class="kbd">Esc</span>' +
        "</div>";
      setOpen(true);
      return;
    }

    box.innerHTML = items
      .slice(0, 8)
      .map((item, idx) => {
        const valueHtml = highlightMatch(item.value, query);
        return `
          <div class="item" role="option" aria-selected="false" data-idx="${idx}">
            <div class="s-left">
              <span class="badge">${escapeHtml(item.type)}</span>
              <span>${valueHtml}</span>
            </div>
            <span class="kbd">Enter</span>
          </div>
        `;
      })
      .join("");

    setOpen(true);
  }

  function updateActive(nextIndex) {
    const max = Math.min(currentItems.length, 8) - 1;
    activeIndex = clamp(nextIndex, -1, max);
    qsa(".item", box).forEach((el) => el.setAttribute("aria-selected", "false"));
    if (activeIndex >= 0) {
      const el = box.querySelector(`.item[data-idx="${activeIndex}"]`);
      if (el) {
        el.setAttribute("aria-selected", "true");
        el.scrollIntoView({ block: "nearest" });
      }
    }
  }

  function pick(item) {
    input.value = item.value;
    setOpen(false);
    input.focus();
  }

  function searchItems(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const starts = [];
    const contains = [];
    for (const item of SUGGESTIONS) {
      const v = item.value.toLowerCase();
      if (v.startsWith(q)) starts.push(item);
      else if (v.includes(q)) contains.push(item);
    }
    return [...starts, ...contains];
  }

  input.addEventListener("input", () => {
    const items = searchItems(input.value);
    if (!input.value.trim()) {
      setOpen(false);
      return;
    }
    render(items, input.value);
  });

  input.addEventListener("focus", () => {
    const q = input.value.trim();
    if (!q) return;
    render(searchItems(q), q);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      updateActive(activeIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      updateActive(activeIndex - 1);
    } else if (e.key === "Enter") {
      const item = currentItems[activeIndex];
      if (item) {
        e.preventDefault();
        pick(item);
      }
    }
  });

  box.addEventListener("mousedown", (e) => {
    const itemEl = e.target.closest(".item");
    if (!itemEl || itemEl.dataset.empty === "true") return;
    const idx = Number(itemEl.dataset.idx);
    const item = currentItems[idx];
    if (item) pick(item);
  });

  document.addEventListener("click", (e) => {
    if (e.target === input || box.contains(e.target)) return;
    setOpen(false);
  });
}

function initGeolocation() {
  const btn = qs("#geoBtn");
  const loc = qs("#location");
  const hint = qs("#searchHint");
  if (!btn || !loc || !hint) return;

  const setHint = (msg) => {
    hint.textContent = msg;
  };

  btn.addEventListener("click", async () => {
    if (!navigator.geolocation) {
      setHint("Geolocation isn’t supported in this browser.");
      return;
    }
    setHint("Detecting your location…");
    btn.disabled = true;
    btn.style.opacity = "0.7";

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Best-effort reverse geocode (no API key); falls back gracefully.
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
          const res = await fetch(url, {
            headers: {
              "Accept": "application/json",
            },
          });
          const data = await res.json();
          const city =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            data?.address?.hamlet;
          const state = data?.address?.state;
          const zip = data?.address?.postcode;
          const pretty = [city, state].filter(Boolean).join(", ") || zip;
          if (pretty) {
            loc.value = pretty;
            setHint("Location added.");
          } else {
            setHint("Couldn’t resolve your location — try a city or zip.");
          }
        } catch {
          setHint("Couldn’t resolve your location — try a city or zip.");
        } finally {
          btn.disabled = false;
          btn.style.opacity = "";
        }
      },
      () => {
        setHint("Location permission denied — type your city or zip.");
        btn.disabled = false;
        btn.style.opacity = "";
      },
      { enableHighAccuracy: false, timeout: 6000, maximumAge: 60000 }
    );
  });
}

function initSearchForm() {
  const form = qs("#searchForm");
  const query = qs("#query");
  const location = qs("#location");
  const insurance = qs("#insurance");
  const hint = qs("#searchHint");
  if (!form || !query || !location || !insurance || !hint) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = query.value.trim();
    const loc = location.value.trim();
    const ins = insurance.value.trim();

    if (!q) {
      hint.textContent = "Start with a specialty, condition, or doctor name.";
      query.focus();
      return;
    }
    if (!loc) {
      hint.textContent = "Add a location to see providers near you.";
      location.focus();
      return;
    }

    hint.textContent = "Opening results…";
    window.location.href = buildSearchUrl({ query: q, location: loc, insurance: ins });
  });
}

function initSpecialtyCards() {
  const cards = qsa("#specialtyCards a[data-specialty]");
  if (!cards.length) return;
  cards.forEach((a) => {
    a.addEventListener("click", (e) => {
      // Keep link behavior, but ensure it resolves even if params missing.
      const specialty = a.dataset.specialty;
      if (!specialty) return;
      a.href = buildSearchUrl({ specialty });
    });
  });
}

initDrawer();
initAutocomplete();
initGeolocation();
initSearchForm();
initSpecialtyCards();

