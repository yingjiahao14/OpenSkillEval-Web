document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Carousel Navigation
  const carousels = document.querySelectorAll('.carousel-wrapper');
  
  carousels.forEach(wrapper => {
    const carousel = wrapper.querySelector('.carousel');
    const prevBtn = wrapper.querySelector('.carousel-arrow.prev');
    const nextBtn = wrapper.querySelector('.carousel-arrow.next');
    
    if (carousel && prevBtn && nextBtn) {
      // Amount to scroll per click - typically width of one card + gap
      const scrollAmount = 340; 
      
      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
      
      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
      
      // Optional: hide/show arrows based on scroll position
      const handleScroll = () => {
        if (carousel.scrollLeft <= 0) {
          prevBtn.style.opacity = '0.5';
          prevBtn.style.pointerEvents = 'none';
        } else {
          prevBtn.style.opacity = '1';
          prevBtn.style.pointerEvents = 'auto';
        }
        
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10) {
          nextBtn.style.opacity = '0.5';
          nextBtn.style.pointerEvents = 'none';
        } else {
          nextBtn.style.opacity = '1';
          nextBtn.style.pointerEvents = 'auto';
        }
      };
      
      carousel.addEventListener('scroll', handleScroll);
      // init arrow state
      handleScroll();
    }
  });
  
  // 2. Entertainment Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active to clicked
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
  
  // 3. Footer Accordion (Mobile)
  const footerHeadings = document.querySelectorAll('.footer-col h3');
  
  footerHeadings.forEach(heading => {
    heading.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        const ul = heading.nextElementSibling;
        
        // Toggle current
        heading.classList.toggle('active');
        if (ul) ul.classList.toggle('active');
        
        // Optional: close others
        /*
        footerHeadings.forEach(otherHeading => {
          if (otherHeading !== heading) {
            otherHeading.classList.remove('active');
            if (otherHeading.nextElementSibling) {
              otherHeading.nextElementSibling.classList.remove('active');
            }
          }
        });
        */
      }
    });
  });
  
  // 4. Smooth scroll for category sticky nav
  const categoryLinks = document.querySelectorAll('.category-nav a');
  
  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Adjust for fixed header and sticky nav height
          const headerOffset = 48 + 60; // global nav (48) + category nav approx height
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
