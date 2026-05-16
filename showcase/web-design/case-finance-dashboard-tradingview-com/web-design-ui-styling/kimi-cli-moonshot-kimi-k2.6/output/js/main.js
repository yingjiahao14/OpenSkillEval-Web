// ChartPulse Main JavaScript

// Tab switching utility
function initTabs(containerSelector, tabSelector, panelSelector, callback) {
  const containers = document.querySelectorAll(containerSelector);
  containers.forEach(container => {
    const tabs = container.querySelectorAll(tabSelector);
    const panels = container.querySelectorAll(panelSelector);
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        panels.forEach(p => {
          if (p.dataset.panel === target) {
            p.classList.remove('hidden');
          } else {
            p.classList.add('hidden');
          }
        });
        
        if (callback) callback(target, tab);
      });
    });
  });
}

// Accordion utility
function initAccordions(selector) {
  const accordions = document.querySelectorAll(selector);
  accordions.forEach(acc => {
    const header = acc.querySelector('.accordion-header');
    const body = acc.querySelector('.accordion-body');
    const icon = acc.querySelector('.accordion-icon');
    
    if (header && body) {
      header.addEventListener('click', () => {
        const isOpen = !body.classList.contains('hidden');
        if (isOpen) {
          body.classList.add('hidden');
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          body.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });
}

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
}

// Generate sparkline SVG
function generateSparkline(data, width, height, color) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  return `<svg class="sparkline" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
    <polyline fill="none" stroke="${color}" stroke-width="1.5" points="${points}"/>
  </svg>`;
}

// Generate random sparkline data
function randomSparklineData(length = 20) {
  const data = [];
  let val = 50;
  for (let i = 0; i < length; i++) {
    val += (Math.random() - 0.5) * 10;
    val = Math.max(10, Math.min(90, val));
    data.push(val);
  }
  return data;
}

// Initialize sparklines on page
function initSparklines() {
  document.querySelectorAll('[data-sparkline]').forEach(el => {
    const isPositive = el.dataset.sparkline === 'up';
    const color = isPositive ? 'var(--accent-green)' : 'var(--accent-red)';
    const data = randomSparklineData();
    el.innerHTML = generateSparkline(data, 80, 28, color);
  });
}

// Highlight active nav link
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initSparklines();
  initMobileMenu();
  highlightActiveNav();
});
