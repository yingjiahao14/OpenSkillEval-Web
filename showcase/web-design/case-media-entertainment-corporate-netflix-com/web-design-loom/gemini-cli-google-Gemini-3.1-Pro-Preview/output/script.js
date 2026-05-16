document.addEventListener('DOMContentLoaded', () => {
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-question');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const answer = this.nextElementSibling;
            
            // Close all items
            document.querySelectorAll('.faq-question').forEach(q => {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.classList.remove('open');
            });
            
            // If it wasn't expanded before, open it now
            if (!isExpanded) {
                this.setAttribute('aria-expanded', 'true');
                answer.classList.add('open');
            }
        });
    });

    // Trending Carousel
    const carousel = document.getElementById('trending-carousel');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    
    if (carousel && prevBtn && nextBtn) {
        // Scroll amount is roughly viewport width minus padding
        const scrollAmount = window.innerWidth > 900 ? window.innerWidth * 0.8 : window.innerWidth * 0.9;
        
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    // Forms handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic validation check - just console log for this prototype
            console.log('Form submitted');
            
            // If it's a login form, redirect to home as dummy action
            if (form.id === 'login-form') {
                window.location.href = 'index.html';
            }
        });
    });

    // Login page get help toggle
    const helpToggle = document.getElementById('help-toggle');
    const helpContent = document.getElementById('help-content');
    
    if (helpToggle && helpContent) {
        helpToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (isExpanded) {
                helpContent.classList.remove('open');
            } else {
                helpContent.classList.add('open');
            }
        });
    }
});