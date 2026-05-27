document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. Stats Counter Animation ---
  const statsSection = document.getElementById('stats-section');
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const animateNumbers = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const duration = 2000; // ms
      const frameRate = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameRate);
      let currentFrame = 0;

      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

      const updateCounter = () => {
        currentFrame++;
        const progress = currentFrame / totalFrames;
        const currentNum = Math.round(target * easeOutQuart(progress));
        
        stat.textContent = formatNumber(currentNum);

        if (currentFrame < totalFrames) {
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = formatNumber(target);
        }
      };

      updateCounter();
    });
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animateNumbers();
        animated = true;
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // --- 2. Search Tabs Toggle ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all tabs
      tabBtns.forEach(b => b.classList.remove('active'));
      // Add active to clicked tab
      btn.classList.add('active');
      
      // In a real app, this would also filter the results grid
      const grid = document.getElementById('search-results-grid');
      grid.style.opacity = '0.5';
      setTimeout(() => { grid.style.opacity = '1'; }, 200);
    });
  });

  // --- 3. Search Filters Toggle ---
  const filterPills = document.querySelectorAll('.pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Remove active from all pills
      filterPills.forEach(p => p.classList.remove('active'));
      // Add active to clicked pill
      pill.classList.add('active');

      // Simulate loading state
      const grid = document.getElementById('search-results-grid');
      grid.style.opacity = '0.5';
      setTimeout(() => { grid.style.opacity = '1'; }, 200);
    });
  });

  // --- 4. Flows Toggle ---
  const flowToggles = document.querySelectorAll('.toggle-btn');
  const flowContents = document.querySelectorAll('.flow-content');

  flowToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const mode = toggle.getAttribute('data-flow-mode');
      
      // Update toggle buttons
      flowToggles.forEach(t => t.classList.remove('active'));
      toggle.classList.add('active');

      // Update content view
      flowContents.forEach(content => {
        content.classList.remove('active');
        if (content.classList.contains(`${mode}-mode`)) {
          content.classList.add('active');
        }
      });
    });
  });

});
