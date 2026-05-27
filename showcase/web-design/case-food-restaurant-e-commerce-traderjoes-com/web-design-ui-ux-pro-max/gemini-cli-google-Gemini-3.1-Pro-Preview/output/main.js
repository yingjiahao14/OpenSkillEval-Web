document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            nav.style.display = 'block';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.backgroundColor = 'var(--bg-light)';
            nav.style.padding = '1rem';
            nav.style.boxShadow = 'var(--shadow-md)';
            
            const navList = nav.querySelector('.nav-list');
            navList.style.flexDirection = 'column';
            navList.style.gap = '1rem';
        } else {
            nav.style.display = '';
        }
    });

    // 2. Featured Products Carousel
    const products = [
        { name: "Organic Maple Granola", desc: "Crunchy clusters with real maple syrup and toasted oats", price: "$3.99" },
        { name: "Everything But The Bagel Seasoning", desc: "A savory blend of sesame, garlic, onion & poppy seeds", price: "$2.49" },
        { name: "Dark Chocolate Peanut Butter Cups", desc: "Rich dark chocolate with creamy peanut butter filling", price: "$3.49" },
        { name: "Cauliflower Gnocchi", desc: "Light, pillowy gnocchi made with real cauliflower", price: "$2.99" },
        { name: "Mandarin Orange Chicken", desc: "Crispy chicken bites in a sweet & tangy mandarin sauce", price: "$4.99" },
        { name: "Unexpected Cheddar Cheese", desc: "Aged cheddar with crystalline crunch and complex flavor", price: "$3.99" },
        { name: "Spicy Mango Lemonade", desc: "Tropical mango with a kick of chili and fresh lemon", price: "$2.79" },
        { name: "Truffle Marcona Almonds", desc: "Roasted marcona almonds dusted with black truffle salt", price: "$4.49" }
    ];

    const carouselTrack = document.getElementById('productCarousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    // Populate carousel
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <div class="product-price">${product.price}</div>
            </div>
        `;
        carouselTrack.appendChild(card);
    });

    // Carousel logic
    let currentTranslate = 0;
    const getCardWidth = () => {
        const card = carouselTrack.querySelector('.product-card');
        return card.offsetWidth + 24; // 24px is the gap (1.5rem)
    };

    const updateCarousel = () => {
        const containerWidth = carouselTrack.parentElement.offsetWidth;
        const totalWidth = carouselTrack.scrollWidth;
        const maxTranslate = Math.min(0, containerWidth - totalWidth);

        // Bound currentTranslate
        if (currentTranslate > 0) currentTranslate = 0;
        if (currentTranslate < maxTranslate) currentTranslate = maxTranslate;

        carouselTrack.style.transform = `translateX(${currentTranslate}px)`;

        // Update buttons
        prevBtn.disabled = currentTranslate >= 0;
        // Adding a small epsilon (1px) for floating point rounding issues
        nextBtn.disabled = currentTranslate <= maxTranslate + 1;
    };

    prevBtn.addEventListener('click', () => {
        currentTranslate += getCardWidth() * 2;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentTranslate -= getCardWidth() * 2;
        updateCarousel();
    });

    // Initialize on load and resize
    updateCarousel();
    window.addEventListener('resize', updateCarousel);


    // 3. Store Locator
    const stores = [
        { name: "Fresh Pantry — Lincoln Park", address: "2140 N. Halsted St, Chicago, IL 60614", hours: "8am – 9pm Daily", distance: "0.8 mi" },
        { name: "Fresh Pantry — Wicker Park", address: "1840 W. North Ave, Chicago, IL 60622", hours: "8am – 9pm Daily", distance: "1.4 mi" },
        { name: "Fresh Pantry — Lakeview", address: "3745 N. Lincoln Ave, Chicago, IL 60613", hours: "8am – 9pm Daily", distance: "2.1 mi" }
    ];

    const locatorForm = document.getElementById('locatorForm');
    const locatorResults = document.getElementById('locatorResults');

    locatorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const zip = document.getElementById('zipCode').value;
        
        // Show loading state briefly
        locatorResults.innerHTML = '<p class="text-center" style="color: var(--text-muted)">Searching...</p>';
        
        setTimeout(() => {
            locatorResults.innerHTML = '';
            stores.forEach(store => {
                const storeEl = document.createElement('div');
                storeEl.className = 'store-card';
                storeEl.innerHTML = `
                    <div class="store-info">
                        <h4>${store.name}</h4>
                        <p>${store.address}</p>
                        <p>${store.hours}</p>
                    </div>
                    <div class="store-distance">${store.distance}</div>
                `;
                locatorResults.appendChild(storeEl);
            });
        }, 600); // Simulate network request
    });


    // 4. Newsletter Signup
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMessage = document.getElementById('newsletterMessage');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('emailInput').value;
        
        if (email) {
            newsletterForm.style.display = 'none';
            newsletterMessage.classList.remove('hidden');
        }
    });
});