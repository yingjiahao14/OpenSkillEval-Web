document.addEventListener('DOMContentLoaded', () => {
  // Tabs functionality
  const initTabs = (containerSelector) => {
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach(container => {
      const btns = container.querySelectorAll('.tab-btn');
      const contents = container.querySelectorAll('.tab-content');
      
      btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const target = btn.dataset.target;
          
          btns.forEach(b => b.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));
          
          btn.classList.add('active');
          const targetContent = container.querySelector(target);
          if (targetContent) targetContent.classList.add('active');
        });
      });
    });
  };
  
  initTabs('.tabs-container');

  // Carousel functionality
  const carousels = document.querySelectorAll('.carousel-wrapper');
  carousels.forEach(wrapper => {
    const carousel = wrapper.querySelector('.carousel');
    const prevBtn = wrapper.querySelector('.prev');
    const nextBtn = wrapper.querySelector('.next');
    
    if (carousel && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
  });

  // Accordion functionality
  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(acc => {
    const items = acc.querySelectorAll('.accordion-item');
    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all
        items.forEach(i => i.classList.remove('active'));
        // Open clicked if it wasn't active
        if (!isActive) item.classList.add('active');
      });
    });
  });

  // Forms basic submission handling
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulating search visually
      const btn = form.querySelector('.search-btn');
      if (btn) {
        const originalText = btn.innerText;
        btn.innerText = 'Searching...';
        setTimeout(() => {
          btn.innerText = originalText;
        }, 1000);
      }
    });
  });
});