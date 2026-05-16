document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.mobile-nav-list a');

    // Open Menu
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close Menu
    menuClose.addEventListener('click', (e) => {
        e.preventDefault();
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close Menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});
