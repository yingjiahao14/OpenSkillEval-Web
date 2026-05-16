document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle (Optional Enhancement) ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.style.display = isExpanded ? 'none' : 'block';
        });
    }

    // --- Product Carousel ---
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && prevBtn && nextBtn) {
        // Using scrollLeft instead of transform for a simpler, native-feeling scroll
        // Wait, track is currently set up with 'transition: transform' in CSS. 
        // We'll update the JS to use scroll container if we change CSS, but let's stick to CSS transforms for smooth sliding or just change container to overflow: auto.
        // Actually, using a simple index-based transform is easy:
        let currentScroll = 0;
        const cardWidth = 280 + 24; // Card width + gap (1.5rem = 24px)
        const visibleWidth = document.querySelector('.carousel-viewport').offsetWidth;
        const totalWidth = track.scrollWidth;

        const updateButtons = () => {
            prevBtn.disabled = currentScroll <= 0;
            // Allow scrolling until the last item is fully visible
            nextBtn.disabled = currentScroll >= (totalWidth - visibleWidth);
        };

        nextBtn.addEventListener('click', () => {
            currentScroll += cardWidth;
            if (currentScroll > totalWidth - visibleWidth) {
                currentScroll = totalWidth - visibleWidth;
            }
            track.style.transform = `translateX(-${currentScroll}px)`;
            updateButtons();
        });

        prevBtn.addEventListener('click', () => {
            currentScroll -= cardWidth;
            if (currentScroll < 0) {
                currentScroll = 0;
            }
            track.style.transform = `translateX(-${currentScroll}px)`;
            updateButtons();
        });

        // Handle resize
        window.addEventListener('resize', () => {
            currentScroll = 0;
            track.style.transform = `translateX(0px)`;
            updateButtons();
        });

        // Initialize
        updateButtons();
    }

    // --- Store Locator ---
    const storeForm = document.getElementById('store-search-form');
    const storeResults = document.getElementById('store-results');

    const storesData = [
        {
            name: 'Fresh Pantry — Lincoln Park',
            address: '2140 N. Halsted St, Chicago, IL 60614',
            hours: '8am – 9pm Daily',
            distance: '0.8 mi'
        },
        {
            name: 'Fresh Pantry — Wicker Park',
            address: '1840 W. North Ave, Chicago, IL 60622',
            hours: '8am – 9pm Daily',
            distance: '1.4 mi'
        },
        {
            name: 'Fresh Pantry — Lakeview',
            address: '3745 N. Lincoln Ave, Chicago, IL 60613',
            hours: '8am – 9pm Daily',
            distance: '2.1 mi'
        }
    ];

    if (storeForm && storeResults) {
        storeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const zipcodeInput = document.getElementById('zipcode');
            const zip = zipcodeInput.value.trim();
            
            if (zip) {
                // Simulate network delay
                storeResults.innerHTML = '<p>Searching for nearby stores...</p>';
                
                setTimeout(() => {
                    storeResults.innerHTML = ''; // clear loading
                    
                    storesData.forEach((store, index) => {
                        const delay = index * 100; // stagger animation
                        const card = document.createElement('div');
                        card.className = 'store-result-card';
                        card.style.animationDelay = `${delay}ms`;
                        
                        card.innerHTML = `
                            <div class="store-result-info">
                                <h3>${store.name}</h3>
                                <p>${store.address}</p>
                                <p><strong>Hours:</strong> ${store.hours}</p>
                            </div>
                            <div class="store-result-meta">
                                <span class="store-distance">${store.distance}</span>
                            </div>
                        `;
                        storeResults.appendChild(card);
                    });
                }, 500);
            }
        });
    }

    // --- Newsletter Signup ---
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');

    if (newsletterForm && newsletterMessage) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email');
            
            if (emailInput.value.trim() !== '') {
                // Hide input, show success message
                newsletterMessage.textContent = 'Thanks for subscribing! Check your inbox for a welcome treat.';
                newsletterMessage.hidden = false;
                
                // Clear input
                emailInput.value = '';
            }
        });
    }
});
