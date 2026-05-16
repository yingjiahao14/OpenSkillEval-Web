document.addEventListener('DOMContentLoaded', () => {
  // Generic Tab functionality
  const tabContainers = document.querySelectorAll('.tabs');
  
  tabContainers.forEach(container => {
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('tab')) {
        const targetId = e.target.getAttribute('data-target');
        const containerGroup = e.target.getAttribute('data-group');
        
        // Remove active class from all tabs in this container
        const tabs = container.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked tab
        e.target.classList.add('active');
        
        // Hide all content in this group
        if (containerGroup) {
          const contents = document.querySelectorAll(`.tab-content[data-group="${containerGroup}"]`);
          contents.forEach(content => content.classList.remove('active'));
          
          // Show target content
          const targetContent = document.getElementById(targetId);
          if (targetContent) {
            targetContent.classList.add('active');
          }
        }
      }
    });
  });

  // Watchlist Accordion toggle
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.toggle-icon');
      if (content.style.display === 'none') {
        content.style.display = 'block';
        if (icon) icon.textContent = '▼';
      } else {
        content.style.display = 'none';
        if (icon) icon.textContent = '▶';
      }
    });
  });

  // Generic Button Toggle (like video toggle)
  const toggleButtons = document.querySelectorAll('.btn-toggle');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      if (btn.classList.contains('active')) {
        btn.style.backgroundColor = 'var(--accent-blue)';
        btn.style.borderColor = 'var(--accent-blue)';
        btn.style.color = '#fff';
      } else {
        btn.style.backgroundColor = 'transparent';
        btn.style.borderColor = 'var(--border-color)';
        btn.style.color = 'var(--text-primary)';
      }
    });
  });
});
