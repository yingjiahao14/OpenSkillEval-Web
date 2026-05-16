// --- Data ---
const featuredProducts = [
  {
    name: "Organic Maple Granola",
    desc: "Crunchy clusters with real maple syrup and toasted oats",
    price: "$3.99",
    color1: "#F4A261", color2: "#e76f51",
    icon: "ri-leaf-line"
  },
  {
    name: "Everything But The Bagel Seasoning",
    desc: "A savory blend of sesame, garlic, onion & poppy seeds",
    price: "$2.49",
    color1: "#2D6A4F", color2: "#1b4332",
    icon: "ri-seedling-line"
  },
  {
    name: "Dark Chocolate Peanut Butter Cups",
    desc: "Rich dark chocolate with creamy peanut butter filling",
    price: "$3.49",
    color1: "#5c3a21", color2: "#3b2210",
    icon: "ri-cup-line"
  },
  {
    name: "Cauliflower Gnocchi",
    desc: "Light, pillowy gnocchi made with real cauliflower",
    price: "$2.99",
    color1: "#a3b18a", color2: "#588157",
    icon: "ri-restaurant-line"
  },
  {
    name: "Mandarin Orange Chicken",
    desc: "Crispy chicken bites in a sweet & tangy mandarin sauce",
    price: "$4.99",
    color1: "#F4A261", color2: "#e9c46a",
    icon: "ri-fire-line"
  },
  {
    name: "Unexpected Cheddar Cheese",
    desc: "Aged cheddar with crystalline crunch and complex flavor",
    price: "$3.99",
    color1: "#e9c46a", color2: "#f4a261",
    icon: "ri-cheese-line"
  },
  {
    name: "Spicy Mango Lemonade",
    desc: "Tropical mango with a kick of chili and fresh lemon",
    price: "$2.79",
    color1: "#e9c46a", color2: "#e76f51",
    icon: "ri-drinks-line"
  },
  {
    name: "Truffle Marcona Almonds",
    desc: "Roasted marcona almonds dusted with black truffle salt",
    price: "$4.49",
    color1: "#bc6c25", color2: "#dda15e",
    icon: "ri-checkbox-blank-circle-line"
  }
];

const seasonalPicks = [
  {
    name: "Watermelon Mint Sparkling Water",
    desc: "Refreshing fizz with real watermelon essence and a hint of mint.",
    price: "$1.99",
    color1: "#ffb5a7", color2: "#fcd5ce",
    icon: "ri-drop-line"
  },
  {
    name: "Grilled Peach & Burrata Salad Kit",
    desc: "Everything you need for a summer salad in one box.",
    price: "$5.49",
    color1: "#ffddd2", color2: "#e29578",
    icon: "ri-leaf-line"
  },
  {
    name: "Coconut Cold Brew Concentrate",
    desc: "Smooth, creamy cold brew with natural coconut flavor.",
    price: "$6.99",
    color1: "#d4a373", color2: "#faedcd",
    icon: "ri-cup-line"
  },
  {
    name: "Mango Sticky Rice Spring Rolls",
    desc: "A sweet twist on a classic, ready in minutes.",
    price: "$3.99",
    color1: "#fefae0", color2: "#e9c46a",
    icon: "ri-restaurant-line"
  }
];

const categories = [
  { name: "Snacks & Sweets", color: "#F4A261", icon: "ri-cake-3-line" },
  { name: "Fresh Produce", color: "#2D6A4F", icon: "ri-leaf-line" },
  { name: "Frozen Favorites", color: "#8ecae6", icon: "ri-snowy-line" },
  { name: "Beverages", color: "#219ebc", icon: "ri-drinks-2-line" },
  { name: "Dairy & Cheese", color: "#e9c46a", icon: "ri-cheese-line" }
];

const stores = [
  { name: "Fresh Pantry — Lincoln Park", address: "2140 N. Halsted St, Chicago, IL 60614", hours: "8am – 9pm Daily", distance: "0.8 mi" },
  { name: "Fresh Pantry — Wicker Park", address: "1840 W. North Ave, Chicago, IL 60622", hours: "8am – 9pm Daily", distance: "1.4 mi" },
  { name: "Fresh Pantry — Lakeview", address: "3745 N. Lincoln Ave, Chicago, IL 60613", hours: "8am – 9pm Daily", distance: "2.1 mi" }
];

// --- Helper for generating SVG placeholders ---
function generateSVGPlaceholder(title, color1, color2, icon, isSquare = true) {
  const vb = isSquare ? "0 0 300 300" : "0 0 400 300";
  const id = Math.random().toString(36).substr(2, 9);
  return `
    <svg viewBox="${vb}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color1}" />
          <stop offset="100%" stop-color="${color2}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad-${id})" />
      <g transform="translate(${isSquare ? 150 : 200}, ${isSquare ? 150 : 150})" opacity="0.2">
        <circle r="50" fill="white" />
      </g>
    </svg>
  `;
}

// --- DOM Rendering ---
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Render Featured Products
  const productTrack = document.getElementById('product-track');
  featuredProducts.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image-box">
        ${generateSVGPlaceholder(prod.name, prod.color1, prod.color2, prod.icon, true)}
      </div>
      <h3 class="product-name">${prod.name}</h3>
      <p class="product-desc">${prod.desc}</p>
      <div class="product-footer">
        <span class="product-price">${prod.price}</span>
        <button class="add-to-cart" aria-label="Add to cart"><i class="ri-add-line"></i></button>
      </div>
    `;
    productTrack.appendChild(card);
  });

  // Carousel Interaction
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let currentScroll = 0;
  
  const scrollAmount = 300; // rough width + gap
  
  nextBtn.addEventListener('click', () => {
    const maxScroll = productTrack.scrollWidth - productTrack.clientWidth;
    currentScroll = Math.min(currentScroll + scrollAmount, maxScroll);
    productTrack.style.transform = `translateX(-\${currentScroll}px)`;
  });
  
  prevBtn.addEventListener('click', () => {
    currentScroll = Math.max(currentScroll - scrollAmount, 0);
    productTrack.style.transform = `translateX(-\${currentScroll}px)`;
  });

  // 2. Render Seasonal Picks
  const seasonalGrid = document.getElementById('seasonal-grid');
  seasonalPicks.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'seasonal-card';
    card.innerHTML = `
      <div class="product-image-box">
        ${generateSVGPlaceholder(prod.name, prod.color1, prod.color2, prod.icon, false)}
      </div>
      <div class="seasonal-info">
        <h3 class="product-name">${prod.name}</h3>
        <p class="product-desc">${prod.desc}</p>
        <div class="product-footer">
          <span class="product-price">${prod.price}</span>
          <button class="btn btn-secondary" style="padding: 0.5rem 1rem;">Add to Cart</button>
        </div>
      </div>
    `;
    seasonalGrid.appendChild(card);
  });

  // 3. Render Categories
  const categoriesGrid = document.getElementById('categories-grid');
  categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card';
    // Use slightly darker variant for gradient end
    card.innerHTML = `
      ${generateSVGPlaceholder(cat.name, cat.color, '#2D6A4F', cat.icon, true)}
      <div class="category-overlay">
        <h3 class="category-title">${cat.name}</h3>
      </div>
    `;
    categoriesGrid.appendChild(card);
  });

  // 4. Store Locator Interaction
  const locatorForm = document.getElementById('locator-form');
  const storeResults = document.getElementById('store-results');
  
  locatorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const zipcode = document.getElementById('zipcode-input').value;
    if (zipcode) {
      storeResults.innerHTML = '';
      stores.forEach(store => {
        const card = document.createElement('div');
        card.className = 'store-result-card';
        card.innerHTML = `
          <h4>${store.name}</h4>
          <p><i class="ri-map-pin-line"></i> ${store.address}</p>
          <p><i class="ri-time-line"></i> ${store.hours}</p>
          <span class="distance">${store.distance} away</span>
        `;
        storeResults.appendChild(card);
      });
    }
  });

  // 5. Newsletter Interaction
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMsg = document.getElementById('newsletter-message');
  
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email-input').value;
    if (email) {
      newsletterForm.style.display = 'none';
      newsletterMsg.style.display = 'block';
    }
  });
  
});