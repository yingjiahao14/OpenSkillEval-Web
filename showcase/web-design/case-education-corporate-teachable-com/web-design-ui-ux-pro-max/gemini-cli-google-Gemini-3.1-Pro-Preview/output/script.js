document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile Menu
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Horizontal Tabs (Hero section)
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Find parent context
      const wrapper = btn.closest('.tabs-wrapper');
      if (!wrapper) return;
      
      const target = btn.getAttribute('data-target');
      
      // Reset active states
      wrapper.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      wrapper.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      // Set active
      btn.classList.add('active');
      const content = wrapper.querySelector(target);
      if (content) content.classList.add('active');
    });
  });

  // Vertical Tabs (Why Choose Us)
  const vTabButtons = document.querySelectorAll('.v-tab-btn');
  vTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const wrapper = btn.closest('.vertical-tabs');
      if (!wrapper) return;
      
      const target = btn.getAttribute('data-target');
      
      // Reset active states
      wrapper.querySelectorAll('.v-tab-btn').forEach(b => b.classList.remove('active'));
      wrapper.querySelectorAll('.v-tab-content').forEach(c => c.classList.remove('active'));
      
      // Set active
      btn.classList.add('active');
      const content = wrapper.querySelector(target);
      if (content) content.classList.add('active');
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all others
      faqItems.forEach(faq => faq.classList.remove('active'));
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Carousels
  const carousels = document.querySelectorAll('.carousel-container');
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const btnPrev = carousel.querySelector('.carousel-prev');
    const btnNext = carousel.querySelector('.carousel-next');
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    
    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };
    
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateCarousel();
      });
    }
    
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
      });
    }
  });

  // Simple accordion for Courses Demo
  const demoToggle = document.querySelector('.demo-toggle');
  if (demoToggle) {
    demoToggle.addEventListener('click', () => {
      const content = document.querySelector('.demo-content');
      if (content) {
        content.classList.toggle('active');
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      }
    });
  }
});
