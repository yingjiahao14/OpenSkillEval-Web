document.addEventListener('DOMContentLoaded', () => {
  // Tabs functionality
  const tabContainers = document.querySelectorAll('.tabs');
  
  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        // Remove active class from all tabs in this container
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        const clickedTab = e.currentTarget;
        clickedTab.classList.add('active');
        
        // Check if there are corresponding content sections
        const targetId = clickedTab.getAttribute('data-target');
        if (targetId) {
          // Find the parent section or document to scope the content search
          const contentSections = document.querySelectorAll('.tab-content[data-group="' + clickedTab.getAttribute('data-group') + '"]');
          contentSections.forEach(content => {
            content.classList.remove('active');
            if (content.id === targetId) {
              content.classList.add('active');
            }
          });
        }
      });
    });
  });

  // Accordion functionality
  const accordions = document.querySelectorAll('.accordion-header');
  accordions.forEach(acc => {
    acc.addEventListener('click', () => {
      const content = acc.nextElementSibling;
      const icon = acc.querySelector('i.ri-arrow-down-s-line, i.ri-arrow-right-s-line');
      
      if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        if (icon) {
          icon.classList.remove('ri-arrow-down-s-line');
          icon.classList.add('ri-arrow-right-s-line');
        }
      } else {
        content.classList.add('expanded');
        if (icon) {
          icon.classList.remove('ri-arrow-right-s-line');
          icon.classList.add('ri-arrow-down-s-line');
        }
      }
    });
  });
  
  // Navigation active state
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});
