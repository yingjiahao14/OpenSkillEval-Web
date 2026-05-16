document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (mobileNav.classList.contains('active')) {
          icon.className = 'ri-close-line';
        } else {
          icon.className = 'ri-menu-3-line';
        }
      }
    });
  }

  // Mobile Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('i');
      
      content.classList.toggle('active');
      
      if (icon) {
        if (content.classList.contains('active')) {
          icon.className = 'ri-subtract-line';
        } else {
          icon.className = 'ri-add-line';
        }
      }
    });
  });

  // What We Do Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabBtns.length > 0 && tabContents.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  }

  // Carousel
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  
  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    const slides = Array.from(track.children);
    
    function updateCarousel() {
      const slideWidth = slides[0].getBoundingClientRect().width;
      const gap = parseFloat(window.getComputedStyle(track).gap) || 32; // 2rem
      track.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;
    }

    nextBtn.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
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

    window.addEventListener('resize', updateCarousel);
  }
});