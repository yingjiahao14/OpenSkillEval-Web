document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Home Hero Tab Switcher
    const heroTabs = document.querySelectorAll('.hero-tab-btn');
    const heroViews = document.querySelectorAll('.hero-view');
    if (heroTabs.length > 0) {
        heroTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                heroTabs.forEach(t => t.classList.remove('active'));
                heroViews.forEach(v => v.classList.remove('active'));
                tab.classList.add('active');
                const target = document.querySelector(`.hero-view.${tab.dataset.target}`);
                if (target) target.classList.add('active');
            });
        });
    }

    // Feature Tabs
    const featureTabs = document.querySelectorAll('.feature-tab');
    const featurePanes = document.querySelectorAll('.feature-pane');
    if (featureTabs.length > 0) {
        featureTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                featureTabs.forEach(t => t.classList.remove('active'));
                featurePanes.forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                const pane = document.getElementById(tab.dataset.target);
                if (pane) pane.classList.add('active');
            });
        });
    }

    // Testimonial Carousels
    const carousels = document.querySelectorAll('.carousel-wrapper');
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentIndex = 0;
        
        if (!track || !prevBtn || !nextBtn) return;
        
        function updateCarousel() {
            // Get item width dynamically + gap
            const itemStyle = window.getComputedStyle(items[0]);
            const gap = parseFloat(window.getComputedStyle(track).gap) || 32;
            const width = items[0].offsetWidth + gap;
            track.style.transform = `translateX(-${currentIndex * width}px)`;
        }
        
        nextBtn.addEventListener('click', () => {
            if (currentIndex < items.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        window.addEventListener('resize', () => {
            currentIndex = 0;
            updateCarousel();
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.maxHeight = null;
            });
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });
            
            // Open clicked if it wasn't active
            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Product Demo Accordion
    const demoToggles = document.querySelectorAll('.demo-toggle');
    demoToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const target = document.getElementById(toggle.dataset.target);
            const isActive = toggle.classList.contains('active');
            
            if (!isActive) {
                toggle.classList.add('active');
                target.style.maxHeight = target.scrollHeight + 'px';
            } else {
                toggle.classList.remove('active');
                target.style.maxHeight = null;
            }
        });
    });
});
