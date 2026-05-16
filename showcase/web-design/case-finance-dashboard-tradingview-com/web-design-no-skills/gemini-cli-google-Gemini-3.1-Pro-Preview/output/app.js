document.addEventListener('DOMContentLoaded', () => {

  // Simple Tab System
  const setupTabs = (tabGroupSelector, contentGroupSelector) => {
    const tabs = document.querySelectorAll(tabGroupSelector);
    if (!tabs.length) return;
    
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        // Prevent default if it's an anchor
        if(e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
          e.preventDefault();
        }
        
        // Remove active class from all tabs in this group
        const group = tab.parentElement;
        group.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Handle content switching if content target is specified
        const targetId = tab.dataset.target;
        if (targetId) {
          const contentItems = document.querySelectorAll(contentGroupSelector);
          contentItems.forEach(item => item.classList.remove('active'));
          
          const targetEl = document.getElementById(targetId);
          if (targetEl) targetEl.classList.add('active');
        }
      });
    });
  };

  // Setup multiple tab groups
  setupTabs('.home-market-tabs .tab', '.home-market-content');
  setupTabs('.home-ideas-tabs .tab', '.home-ideas-content');
  setupTabs('.home-indicators-tabs .tab', '.home-indicators-content');
  setupTabs('.chart-detail-tabs .tab', '.chart-detail-content');
  setupTabs('.ideas-filter-tabs .tab', '.ideas-feed-content');
  setupTabs('.markets-asset-tabs .tab', '.markets-asset-content');
  setupTabs('.markets-stock-gainers-tabs .tab', '.markets-stock-gainers-content');
  setupTabs('.brokers-category-tabs .tab', '.brokers-category-content');
  setupTabs('.brokers-rating-tabs .tab', '.brokers-rating-content');

  // Chart Timeframe & Type Toggles
  const setupToggles = (selector) => {
    const btns = document.querySelectorAll(selector);
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.parentElement.querySelectorAll(selector).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  };
  setupToggles('.chart-btn');

  // Watchlist Accordion
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        header.querySelector('.icon').textContent = '▼';
      } else {
        content.classList.add('hidden');
        header.querySelector('.icon').textContent = '▶';
      }
    });
  });

  // Ideas Video Toggle
  const videoToggle = document.getElementById('video-toggle');
  if (videoToggle) {
    videoToggle.addEventListener('change', (e) => {
      const feedItems = document.querySelectorAll('.idea-card');
      if (e.target.checked) {
        feedItems.forEach(item => {
          if (!item.dataset.hasVideo) item.style.display = 'none';
        });
      } else {
        feedItems.forEach(item => {
          item.style.display = 'flex';
        });
      }
    });
  }
  
  // Navigation for market asset tabs that scroll to sections
  const assetTabs = document.querySelectorAll('.scroll-tab');
  assetTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = tab.dataset.scrollTarget;
      if(targetId) {
        const el = document.getElementById(targetId);
        if(el) {
          el.scrollIntoView({ behavior: 'smooth' });
          assetTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
        }
      }
    });
  });
});
