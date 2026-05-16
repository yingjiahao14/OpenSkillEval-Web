document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', toggleMobileMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', toggleMobileMenu);

    // 2. Donate Modal Toggle
    const donateTriggers = document.querySelectorAll('.donate-btn-trigger');
    const donateModal = document.getElementById('donate-modal');
    const modalCloseTriggers = document.querySelectorAll('.modal-close-trigger');

    function openModal() {
        donateModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        donateModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    donateTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    modalCloseTriggers.forEach(trigger => {
        trigger.addEventListener('click', closeModal);
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && donateModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Handle Custom Amount Input in Modal
    const amountRadios = document.querySelectorAll('input[name="amount"]');
    const customAmountInput = document.querySelector('.custom-amount input');

    customAmountInput.addEventListener('focus', () => {
        // Deselect preset amounts
        amountRadios.forEach(radio => {
            radio.checked = false;
        });
    });

    amountRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            customAmountInput.value = '';
        });
    });

    // 3. Program Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // Close all accordions first (optional, but good for UX)
            document.querySelectorAll('.accordion-header').forEach(h => {
                if (h !== header) {
                    h.setAttribute('aria-expanded', 'false');
                    h.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current accordion
            if (isExpanded) {
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            } else {
                header.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 4. News Carousel
    const track = document.getElementById('news-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        function updateCarousel() {
            const cards = Array.from(track.children);
            if (cards.length === 0) return;
            
            // Calculate width of one card + gap
            const gap = parseInt(window.getComputedStyle(track).gap) || 0;
            const cardWidth = cards[0].offsetWidth;
            const moveAmount = cardWidth + gap;
            
            // Determine how many items are visible
            const containerWidth = track.parentElement.offsetWidth;
            const itemsVisible = Math.max(1, Math.floor((containerWidth + gap) / moveAmount));
            const maxIndex = Math.max(0, cards.length - itemsVisible);
            
            // Constrain index
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;
            
            track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
            
            // Disable/Enable buttons
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
            
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextBtn.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
        }

        nextBtn.addEventListener('click', () => {
            const cards = Array.from(track.children);
            const gap = parseInt(window.getComputedStyle(track).gap) || 0;
            const containerWidth = track.parentElement.offsetWidth;
            const moveAmount = cards[0].offsetWidth + gap;
            const itemsVisible = Math.max(1, Math.floor((containerWidth + gap) / moveAmount));
            const maxIndex = Math.max(0, cards.length - itemsVisible);
            
            if (currentIndex < maxIndex) {
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

        // Initialize and handle window resize
        updateCarousel();
        window.addEventListener('resize', updateCarousel);
    }
});