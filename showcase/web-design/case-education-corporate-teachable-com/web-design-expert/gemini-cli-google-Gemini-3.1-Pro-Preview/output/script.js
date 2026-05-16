document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      navLinks.style.padding = '2rem';
      navLinks.style.boxShadow = 'var(--shadow-md)';
    });
  }

  // Hero Tab Switching (Homepage)
  const heroTabBtns = document.querySelectorAll('.hero-tab-btn');
  const heroPreviews = document.querySelectorAll('.hero-preview');
  
  if (heroTabBtns.length > 0 && heroPreviews.length > 0) {
    heroTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        
        // Remove active class from all
        heroTabBtns.forEach(b => b.classList.remove('active'));
        heroPreviews.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked
        btn.classList.add('active');
        document.getElementById(targetId).classList.add('active');
      });
    });
  }

  // Why Choose Us Tabs
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabTriggers.length > 0 && tabPanels.length > 0) {
    tabTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.getAttribute('data-target');
        
        tabTriggers.forEach(t => t.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        trigger.classList.add('active');
        document.getElementById(targetId).classList.add('active');
      });
    });
  }

  // Accordions (FAQ & Demo)
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  if (accordionHeaders.length > 0) {
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Optional: close others
        const parent = item.closest('.accordion');
        if (parent) {
          parent.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
        }
        
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // Carousels (Testimonials)
  const carousels = document.querySelectorAll('.carousel');
  
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    
    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };
    
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
      updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    });
  });
});
