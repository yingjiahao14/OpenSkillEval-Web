document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }

  // Featured Products Data
  const products = [
    {
      name: "Organic Maple Granola",
      desc: "Crunchy clusters with real maple syrup and toasted oats",
      price: "$3.99",
      img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Everything But The Bagel Seasoning",
      desc: "A savory blend of sesame, garlic, onion & poppy seeds",
      price: "$2.49",
      img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Dark Chocolate Peanut Butter Cups",
      desc: "Rich dark chocolate with creamy peanut butter filling",
      price: "$3.49",
      img: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Cauliflower Gnocchi",
      desc: "Light, pillowy gnocchi made with real cauliflower",
      price: "$2.99",
      img: "https://images.unsplash.com/photo-1608897013039-887f214b985c?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Mandarin Orange Chicken",
      desc: "Crispy chicken bites in a sweet & tangy mandarin sauce",
      price: "$4.99",
      img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Unexpected Cheddar Cheese",
      desc: "Aged cheddar with crystalline crunch and complex flavor",
      price: "$3.99",
      img: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Spicy Mango Lemonade",
      desc: "Tropical mango with a kick of chili and fresh lemon",
      price: "$2.79",
      img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Truffle Marcona Almonds",
      desc: "Roasted marcona almonds dusted with black truffle salt",
      price: "$4.49",
      img: "https://images.unsplash.com/photo-1536585149364-8ab3741bd8cd?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Render Products
  const track = document.getElementById('product-track');
  
  if (track) {
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-img">
          <img src="${product.img}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.desc}</p>
          <span class="product-price">${product.price}</span>
        </div>
      `;
      track.appendChild(card);
    });

    // Carousel Logic
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    let currentIndex = 0;
    
    const updateCarousel = () => {
      const cardWidth = track.querySelector('.product-card').offsetWidth;
      const gap = parseInt(window.getComputedStyle(track).gap) || 0;
      const moveAmount = cardWidth + gap;
      
      // Calculate max index based on visible items
      const visibleWidth = track.parentElement.offsetWidth;
      const visibleItems = Math.floor(visibleWidth / moveAmount);
      const maxIndex = Math.max(0, products.length - visibleItems);
      
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;
      
      track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
    };

    if (prevBtn && nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
      });

      prevBtn.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
      });
    }
    
    window.addEventListener('resize', updateCarousel);
  }

  // Store Locator Form
  const storeForm = document.getElementById('store-form');
  const locatorResults = document.getElementById('locator-results');
  
  const storeMockData = [
    { name: "Fresh Pantry — Lincoln Park", address: "2140 N. Halsted St, Chicago, IL 60614", hours: "8am – 9pm Daily", distance: "0.8 mi" },
    { name: "Fresh Pantry — Wicker Park", address: "1840 W. North Ave, Chicago, IL 60622", hours: "8am – 9pm Daily", distance: "1.4 mi" },
    { name: "Fresh Pantry — Lakeview", address: "3745 N. Lincoln Ave, Chicago, IL 60613", hours: "8am – 9pm Daily", distance: "2.1 mi" }
  ];

  if (storeForm && locatorResults) {
    storeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const zipInput = document.getElementById('zip-input').value;
      
      if (zipInput) {
        // Clear previous results
        locatorResults.innerHTML = '';
        
        // Populate mock data
        storeMockData.forEach(store => {
          const resultCard = document.createElement('div');
          resultCard.className = 'store-result-card';
          resultCard.innerHTML = `
            <div class="store-info">
              <h4>${store.name}</h4>
              <p>${store.address}</p>
              <p><strong>Hours:</strong> ${store.hours}</p>
            </div>
            <div class="store-distance">${store.distance}</div>
          `;
          locatorResults.appendChild(resultCard);
        });
        
        // Show results
        locatorResults.hidden = false;
      }
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMessage = document.getElementById('newsletter-message');
  
  if (newsletterForm && newsletterMessage) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('email-input').value;
      
      if (emailInput) {
        // Hide input group, show message
        newsletterForm.querySelector('.input-group').style.display = 'none';
        newsletterMessage.hidden = false;
      }
    });
  }
});
