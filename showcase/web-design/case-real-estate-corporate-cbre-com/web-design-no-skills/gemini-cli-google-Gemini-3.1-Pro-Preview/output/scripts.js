document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('is-open');
      mobileToggle.textContent = mobileNav.classList.contains('is-open') ? 'Close' : 'Menu';
    });
  }

  // Mobile Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = content.classList.contains('is-open');
      
      // Close all other accordions (optional)
      document.querySelectorAll('.accordion-content').forEach(c => {
        c.classList.remove('is-open');
      });
      document.querySelectorAll('.accordion-header span').forEach(s => {
        s.textContent = '+';
      });

      if (!isOpen) {
        content.classList.add('is-open');
        header.querySelector('span').textContent = '-';
      }
    });
  });

  // What We Do Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      // Add active to clicked button
      button.classList.add('active');

      // Show corresponding pane
      const targetId = button.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // Invest Carousel (Mock basic state change for the requirement)
  const carouselControls = document.querySelectorAll('.carousel-control');
  if (carouselControls.length > 0) {
    carouselControls.forEach(control => {
      control.addEventListener('click', (e) => {
        e.preventDefault();
        // Just mock changing state
        console.log('Carousel interacted');
        const activeItem = document.querySelector('.carousel-item.active');
        if(activeItem) {
          activeItem.classList.remove('active');
          const next = activeItem.nextElementSibling || document.querySelector('.carousel-item');
          if(next) next.classList.add('active');
        }
      });
    });
  }
});
