document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabGroups = document.querySelectorAll('.feature-tabs');
  tabGroups.forEach(group => {
    const tabs = group.querySelectorAll('.feature-tab');
    const contents = group.nextElementSibling.querySelectorAll('.feature-content');
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        contents[index].classList.add('active');
      });
    });
  });

  // Home Hero Tabs (Creator vs Student)
  const viewTabs = document.querySelectorAll('.view-tab');
  const mockupImage = document.getElementById('hero-mockup-img');
  
  if (viewTabs.length > 0 && mockupImage) {
    viewTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        viewTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        if (tab.dataset.view === 'creator') {
          mockupImage.src = 'https://placehold.co/800x600/000000/FFFFFF?text=Creator+Admin+Dashboard';
        } else {
          mockupImage.src = 'https://placehold.co/800x600/4F46E5/FFFFFF?text=Student+Learning+Experience';
        }
      });
    });
  }

  // FAQ Accordion
  const faqs = document.querySelectorAll('.faq-item');
  faqs.forEach(faq => {
    const question = faq.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = faq.classList.contains('active');
      
      // Close all other FAQs
      faqs.forEach(f => f.classList.remove('active'));
      
      if (!isActive) {
        faq.classList.add('active');
      }
    });
  });

  // Product Demo Accordion (Courses)
  const demoHeader = document.querySelector('.demo-header');
  if (demoHeader) {
    demoHeader.addEventListener('click', () => {
      const content = demoHeader.nextElementSibling;
      const icon = demoHeader.querySelector('i');
      content.classList.toggle('active');
      if (content.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
      } else {
        icon.style.transform = 'rotate(0deg)';
      }
    });
  }

  // Carousels
  const carousels = document.querySelectorAll('.testimonials-carousel');
  carousels.forEach(carousel => {
    const inner = carousel.querySelector('.carousel-inner');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const cards = carousel.querySelectorAll('.testimonial-card');
    
    if (!inner || !prevBtn || !nextBtn || cards.length === 0) return;
    
    let currentIndex = 0;
    
    function updateCarousel() {
      inner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
      updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    });
  });
});
