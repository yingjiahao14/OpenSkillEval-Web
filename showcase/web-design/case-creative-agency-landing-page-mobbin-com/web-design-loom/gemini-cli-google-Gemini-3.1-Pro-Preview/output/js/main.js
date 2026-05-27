document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Stats Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasCounted = false;

  const animateNumbers = () => {
    statNumbers.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target').replace(/,/g, ''));
      const formatNumber = (num) => {
        return num.toLocaleString();
      };
      
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.innerText = formatNumber(target);
          clearInterval(timer);
        } else {
          stat.innerText = formatNumber(Math.floor(current));
        }
      }, stepTime);
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasCounted) {
        animateNumbers();
        hasCounted = true;
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // 2. Search Tabs Switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  const gridContents = document.querySelectorAll('.grid-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all tabs
      tabBtns.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      btn.classList.add('active');
      
      // We would update the grid content here. 
      // For this prototype, we'll just simulate a content change with a fade out/in effect
      const grid = document.querySelector('.grid-content');
      grid.style.opacity = '0';
      setTimeout(() => {
        grid.style.opacity = '1';
      }, 300);
    });
  });

  // 3. Search Filters Switching
  const filterPills = document.querySelectorAll('.filter-pill');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Remove active class from all pills
      filterPills.forEach(p => p.classList.remove('active'));
      // Add active class to clicked pill
      pill.classList.add('active');
      
      // Simulate content change
      const grid = document.querySelector('.grid-content');
      grid.style.opacity = '0';
      setTimeout(() => {
        grid.style.opacity = '1';
      }, 300);
    });
  });

  // 4. Flows Toggle
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const flowContents = document.querySelectorAll('.flow-content');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all toggles
      toggleBtns.forEach(t => t.classList.remove('active'));
      // Add active class to clicked toggle
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      
      // Update contents
      flowContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // Setup endless horizontal scrolling by cloning marquee elements
  const cloneMarquees = () => {
    const marquees = document.querySelectorAll('.marquee, .testimonial-row, .icon-row');
    marquees.forEach(marquee => {
      // Clone the contents to create a seamless loop
      const content = marquee.innerHTML;
      marquee.innerHTML = content + content;
    });
  };
  
  cloneMarquees();
});
