document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.replace('ri-menu-line', 'ri-close-line');
        } else {
            icon.classList.replace('ri-close-line', 'ri-menu-line');
        }
    });

    // 2. Featured Products Carousel
    const products = [
        {
            name: "Organic Maple Granola",
            desc: "Crunchy clusters with real maple syrup and toasted oats",
            price: "$3.99",
            icon: "ri-seedling-line"
        },
        {
            name: "Everything But The Bagel Seasoning",
            desc: "A savory blend of sesame, garlic, onion & poppy seeds",
            price: "$2.49",
            icon: "ri-restaurant-line"
        },
        {
            name: "Dark Chocolate Peanut Butter Cups",
            desc: "Rich dark chocolate with creamy peanut butter filling",
            price: "$3.49",
            icon: "ri-cake-3-line"
        },
        {
            name: "Cauliflower Gnocchi",
            desc: "Light, pillowy gnocchi made with real cauliflower",
            price: "$2.99",
            icon: "ri-leaf-line"
        },
        {
            name: "Mandarin Orange Chicken",
            desc: "Crispy chicken bites in a sweet & tangy mandarin sauce",
            price: "$4.99",
            icon: "ri-fire-line"
        },
        {
            name: "Unexpected Cheddar Cheese",
            desc: "Aged cheddar with crystalline crunch and complex flavor",
            price: "$3.99",
            icon: "ri-fridge-line"
        },
        {
            name: "Spicy Mango Lemonade",
            desc: "Tropical mango with a kick of chili and fresh lemon",
            price: "$2.79",
            icon: "ri-goblet-line"
        },
        {
            name: "Truffle Marcona Almonds",
            desc: "Roasted marcona almonds dusted with black truffle salt",
            price: "$4.49",
            icon: "ri-vip-diamond-line"
        }
    ];

    const track = document.getElementById('product-track');
    
    // Populate track
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image"><i class="${product.icon}"></i></div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <div class="product-price">${product.price}</div>
        `;
        track.appendChild(card);
    });

    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    let currentPosition = 0;
    const cardWidth = 280 + 24; // width + gap
    
    nextBtn.addEventListener('click', () => {
        const maxScroll = (products.length * cardWidth) - track.parentElement.clientWidth;
        if (currentPosition < maxScroll) {
            currentPosition += cardWidth;
            if (currentPosition > maxScroll) currentPosition = maxScroll;
            track.style.transform = `translateX(-${currentPosition}px)`;
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPosition > 0) {
            currentPosition -= cardWidth;
            if (currentPosition < 0) currentPosition = 0;
            track.style.transform = `translateX(-${currentPosition}px)`;
        }
    });

    // 3. Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email-input').value;
        if (email) {
            newsletterForm.classList.add('hidden');
            newsletterMessage.classList.remove('hidden');
        }
    });
});

// 4. Store Locator Search (Global scope to be called from HTML inline event)
function searchStores() {
    const zip = document.getElementById('zip-input').value;
    const resultsContainer = document.getElementById('store-results');
    
    if (!zip) return;

    const stores = [
        {
            name: "Fresh Pantry — Lincoln Park",
            address: "2140 N. Halsted St, Chicago, IL 60614",
            hours: "8am – 9pm Daily",
            distance: "0.8 mi"
        },
        {
            name: "Fresh Pantry — Wicker Park",
            address: "1840 W. North Ave, Chicago, IL 60622",
            hours: "8am – 9pm Daily",
            distance: "1.4 mi"
        },
        {
            name: "Fresh Pantry — Lakeview",
            address: "3745 N. Lincoln Ave, Chicago, IL 60613",
            hours: "8am – 9pm Daily",
            distance: "2.1 mi"
        }
    ];

    resultsContainer.innerHTML = '';
    
    stores.forEach(store => {
        const div = document.createElement('div');
        div.className = 'store-result-item';
        div.innerHTML = `
            <h4>${store.name}</h4>
            <p>${store.address}</p>
            <p>${store.hours}</p>
            <p class="distance">${store.distance}</p>
        `;
        resultsContainer.appendChild(div);
    });

    resultsContainer.classList.remove('hidden');
}
