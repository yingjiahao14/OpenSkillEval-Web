document.addEventListener('DOMContentLoaded', () => {
  // Tabs functionality
  const setupTabs = (tabsHeaderSelector, tabsPaneSelector) => {
    const tabs = document.querySelectorAll(tabsHeaderSelector + ' .tab-btn');
    const panes = document.querySelectorAll(tabsPaneSelector);
    
    if (!tabs.length || !panes.length) return;

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and panes
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding pane
        tab.classList.add('active');
        if (panes[index]) {
          panes[index].classList.add('active');
        }
      });
    });
  };

  // Setup specific tabs
  setupTabs('.trip-planner-tabs', '.trip-planner-pane');
  setupTabs('.popular-links-tabs', '.popular-links-pane');
  setupTabs('.car-rental-dest-tabs', '.car-rental-dest-pane');
  setupTabs('.attractions-region-tabs', '.attractions-region-pane');
  setupTabs('.attractions-things-tabs', '.attractions-things-pane');

  // Carousel functionality
  const carousels = document.querySelectorAll('.carousel-wrapper');
  carousels.forEach(wrapper => {
    const carousel = wrapper.querySelector('.carousel');
    const prevBtn = wrapper.querySelector('.carousel-btn.prev');
    const nextBtn = wrapper.querySelector('.carousel-btn.next');

    if (!carousel || !prevBtn || !nextBtn) return;

    const scrollAmount = 280; // approximate width of card + gap

    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });

  // Accordion functionality
  const accordions = document.querySelectorAll('.accordion-item');
  accordions.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      // Close other accordions
      accordions.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      // Toggle current accordion
      item.classList.toggle('active');
    });
  });
});
