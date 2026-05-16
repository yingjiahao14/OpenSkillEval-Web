document.addEventListener('DOMContentLoaded', () => {
  // Tabs logic
  const tabGroups = document.querySelectorAll('.tabs-nav');
  tabGroups.forEach(group => {
    const tabs = group.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        // Prevent default if it's an anchor (though they are buttons)
        e.preventDefault();
        
        // Remove active class from all tabs in this group
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Find corresponding content
        const targetId = tab.getAttribute('data-tab-target');
        const container = group.parentElement; // Assuming container wraps nav and contents
        const contents = container.querySelectorAll('.tab-content');
        
        contents.forEach(content => {
          content.classList.remove('active');
          if (content.id === targetId) {
            content.classList.add('active');
          }
        });
      });
    });
  });

  // Carousel logic
  const carousels = document.querySelectorAll('.carousel-wrapper');
  carousels.forEach(wrapper => {
    const carousel = wrapper.querySelector('.carousel');
    const prevBtn = wrapper.querySelector('.carousel-btn.prev');
    const nextBtn = wrapper.querySelector('.carousel-btn.next');
    
    if (carousel && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
  });

  // Accordion logic
  const accordions = document.querySelectorAll('.accordion');
  accordions.forEach(accordion => {
    const items = accordion.querySelectorAll('.accordion-item');
    items.forEach(item => {
      const header = item.querySelector('.accordion-header');
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        items.forEach(i => {
          i.classList.remove('active');
          i.querySelector('.accordion-content').style.maxHeight = null;
        });
        
        // If not active, open it
        if (!isActive) {
          item.classList.add('active');
          const content = item.querySelector('.accordion-content');
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  });

  // Prevent form submission for search buttons
  const searchButtons = document.querySelectorAll('.search-box .btn');
  searchButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Mock search action
      const btnText = btn.textContent;
      btn.textContent = 'Searching...';
      setTimeout(() => {
        btn.textContent = btnText;
      }, 800);
    });
  });

  // Radio button interactions for Packages
  const packageRadios = document.querySelectorAll('input[name="package-type"]');
  if (packageRadios.length > 0) {
    packageRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        // Just for visual effect in mockup
        console.log('Selected package:', e.target.value);
      });
    });
  }
});
