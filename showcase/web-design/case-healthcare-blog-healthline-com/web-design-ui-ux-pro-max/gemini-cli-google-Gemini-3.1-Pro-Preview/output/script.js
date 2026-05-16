document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.getElementById('nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('active');
        });
    }

    // 2. Dropdown Menus
    const dropdownLinks = document.querySelectorAll('.has-dropdown > .nav-link');

    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = link.parentElement;
            const dropdown = parent.querySelector('.dropdown-menu');
            const isExpanded = link.getAttribute('aria-expanded') === 'true';

            // Close all others
            document.querySelectorAll('.has-dropdown').forEach(item => {
                if (item !== parent) {
                    item.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
                    const menu = item.querySelector('.dropdown-menu');
                    if (menu) menu.classList.remove('active');
                }
            });

            // Toggle current
            link.setAttribute('aria-expanded', !isExpanded);
            if (dropdown) {
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-dropdown')) {
            document.querySelectorAll('.has-dropdown').forEach(item => {
                item.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
                const menu = item.querySelector('.dropdown-menu');
                if (menu) menu.classList.remove('active');
            });
        }
    });

    // 3. Recommended Reads Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const articles = document.querySelectorAll('.article-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all tabs
            tabBtns.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            
            // Set active to clicked tab
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const category = btn.getAttribute('data-category');

            // Show/hide articles
            articles.forEach(article => {
                if (article.getAttribute('data-category') === category) {
                    article.classList.remove('hidden');
                } else {
                    article.classList.add('hidden');
                }
            });
        });
    });

    // 4. Health Topics Carousel
    const track = document.getElementById('topics-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (track && prevBtn && nextBtn) {
        const scrollAmount = 300; // Approx card width + gap

        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // 5. Newsletter Forms
    const handleNewsletterSubmit = (formId, feedbackId) => {
        const form = document.getElementById(formId);
        const feedback = document.getElementById(feedbackId);

        if (form && feedback) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = form.querySelector('input[type="email"]');
                if (emailInput.value) {
                    feedback.textContent = 'Thanks for subscribing! Check your inbox to confirm.';
                    feedback.style.color = 'var(--accent)';
                    feedback.style.marginTop = 'var(--spacing-2)';
                    emailInput.value = ''; // clear input
                }
            });
        }
    };

    handleNewsletterSubmit('newsletter-form-main', 'feedback-main');
    handleNewsletterSubmit('newsletter-form-footer', 'feedback-footer');
});
