// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const mobileNav = document.getElementById('mobile-nav');

if (menuToggle && menuClose && mobileNav) {
    menuToggle.addEventListener('click', () => {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    menuClose.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    });
}

// Close mobile menu when a link is clicked
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Interactive toggle in Safety Section
const toggleTrack = document.querySelector('.toggle-track');
const toggleText = document.querySelector('.safety-card span');

if (toggleTrack && toggleText) {
    toggleTrack.addEventListener('click', () => {
        toggleTrack.classList.toggle('active');
        if (toggleTrack.classList.contains('active')) {
            toggleText.textContent = 'Content Filter Active';
        } else {
            toggleText.textContent = 'Content Filter Inactive';
        }
    });
}

// Enable dragging on news carousel for desktop
const carousel = document.getElementById('news-carousel');

if (carousel) {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        carousel.style.scrollSnapType = 'none'; // Disable snap during drag
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
        carousel.style.scrollSnapType = 'x mandatory';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
        carousel.style.scrollSnapType = 'x mandatory';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        carousel.scrollLeft = scrollLeft - walk;
    });
}
