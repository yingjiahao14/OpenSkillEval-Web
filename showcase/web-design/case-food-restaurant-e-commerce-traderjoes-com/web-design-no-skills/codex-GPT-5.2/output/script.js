const PRODUCT_ITEMS = [
  {
    name: "Organic Maple Granola",
    desc: "Crunchy clusters with real maple syrup and toasted oats",
    price: "$3.99",
    tag: "Staff Pick",
    img:
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=1200&q=80",
    alt: "Bowl of granola with fruit",
  },
  {
    name: "Everything But The Bagel Seasoning",
    desc: "A savory blend of sesame, garlic, onion & poppy seeds",
    price: "$2.49",
    tag: "Pantry Hero",
    img:
      "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=1200&q=80",
    alt: "Spices and seasonings in small jars",
  },
  {
    name: "Dark Chocolate Peanut Butter Cups",
    desc: "Rich dark chocolate with creamy peanut butter filling",
    price: "$3.49",
    tag: "Sweet",
    img:
      "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=1200&q=80",
    alt: "Chocolate pieces on a wooden board",
  },
  {
    name: "Cauliflower Gnocchi",
    desc: "Light, pillowy gnocchi made with real cauliflower",
    price: "$2.99",
    tag: "Freezer Find",
    img:
      "https://images.unsplash.com/photo-1604909053048-1f8a3b8de2a7?auto=format&fit=crop&w=1200&q=80",
    alt: "Gnocchi in a pan",
  },
  {
    name: "Mandarin Orange Chicken",
    desc: "Crispy chicken bites in a sweet & tangy mandarin sauce",
    price: "$4.99",
    tag: "Dinner",
    img:
      "https://images.unsplash.com/photo-1604908177453-3b2f827f7a43?auto=format&fit=crop&w=1200&q=80",
    alt: "Orange chicken in a bowl",
  },
  {
    name: "Unexpected Cheddar Cheese",
    desc: "Aged cheddar with crystalline crunch and complex flavor",
    price: "$3.99",
    tag: "Cheese",
    img:
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=1200&q=80",
    alt: "Cheddar cheese wedge",
  },
  {
    name: "Spicy Mango Lemonade",
    desc: "Tropical mango with a kick of chili and fresh lemon",
    price: "$2.79",
    tag: "Sip",
    img:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1200&q=80",
    alt: "Iced lemonade drink",
  },
  {
    name: "Truffle Marcona Almonds",
    desc: "Roasted marcona almonds dusted with black truffle salt",
    price: "$4.49",
    tag: "Snack",
    img:
      "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?auto=format&fit=crop&w=1200&q=80",
    alt: "Bowl of roasted almonds",
  },
];

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

function $(sel, root = document) {
  return root.querySelector(sel);
}

function createProductCard(item) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.innerHTML = `
    <div class="product-media">
      <img loading="lazy" src="${item.img}" alt="${item.alt}">
      <div class="badge">${item.tag}</div>
    </div>
    <div class="product-body">
      <h3 class="product-name">${item.name}</h3>
      <p class="product-desc">${item.desc}</p>
      <div class="product-row">
        <span class="price">${item.price}</span>
        <span class="mini"><span class="spark"></span>Bright pick</span>
      </div>
    </div>
  `.trim();
  return card;
}

function initCarousel() {
  const track = $("#productTrack");
  const prev = $("#productPrev");
  const next = $("#productNext");
  if (!track || !prev || !next) return;

  for (const item of PRODUCT_ITEMS) track.appendChild(createProductCard(item));

  const getStep = () => {
    const firstCard = track.querySelector(".product-card");
    if (!firstCard) return 260;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "14") || 14;
    return firstCard.getBoundingClientRect().width + gap;
  };

  const updateButtons = () => {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= maxScrollLeft - 2;
  };

  const scrollByCards = (dir) => {
    track.scrollBy({ left: dir * getStep() * 2, behavior: "smooth" });
  };

  prev.addEventListener("click", () => scrollByCards(-1));
  next.addEventListener("click", () => scrollByCards(1));
  track.addEventListener("scroll", () => requestAnimationFrame(updateButtons), {
    passive: true,
  });
  window.addEventListener("resize", () => updateButtons());

  updateButtons();
}

function validZip(raw) {
  const cleaned = String(raw || "").trim();
  return /^\d{5}(-\d{4})?$/.test(cleaned);
}

function renderStores(results) {
  const container = $("#storeResults");
  if (!container) return;
  container.innerHTML = "";

  for (const store of results) {
    const el = document.createElement("div");
    el.className = "store";
    el.innerHTML = `
      <div>
        <h4>${store.name}</h4>
        <p>${store.address}</p>
      </div>
      <div>
        <div class="pill"><span class="spark"></span>Hours</div>
        <p>${store.hours}</p>
      </div>
      <div>
        <div class="pill"><span class="spark"></span>Distance</div>
        <p>${store.distance}</p>
      </div>
      <div>
        <a class="btn btn-soft" href="#" aria-label="Get directions">Directions</a>
      </div>
    `.trim();
    container.appendChild(el);
  }
}

function setStoreMessage(message, isError = false) {
  const node = $("#storeMessage");
  if (!node) return;
  node.textContent = message;
  node.classList.toggle("error", isError);
}

function initStoreLocator() {
  const input = $("#zipInput");
  const btn = $("#zipSearch");
  if (!input || !btn) return;

  const run = () => {
    const zip = input.value.trim();
    if (!validZip(zip)) {
      setStoreMessage("Please enter a valid ZIP code (e.g., 60614).", true);
      $("#storeResults").innerHTML = "";
      return;
    }
    setStoreMessage(`Showing stores near ${zip}.`);
    renderStores(STORE_RESULTS);
  };

  btn.addEventListener("click", run);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") run();
  });
}

function initNewsletter() {
  const input = $("#emailInput");
  const btn = $("#emailSubscribe");
  const toast = $("#newsletterToast");
  if (!input || !btn || !toast) return;

  const validEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || "").trim());

  const run = () => {
    const email = input.value.trim();
    if (!validEmail(email)) {
      toast.textContent = "Please enter a valid email address.";
      toast.classList.add("show");
      return;
    }
    toast.textContent =
      "Thanks for subscribing! Check your inbox for a welcome treat.";
    toast.classList.add("show");
    input.value = "";
  };

  btn.addEventListener("click", run);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") run();
  });
}

function initSmoothAnchors() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSmoothAnchors();
  initCarousel();
  initStoreLocator();
  initNewsletter();
});

