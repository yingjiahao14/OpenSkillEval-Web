// StayQuest - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all interactive components
  initTabs();
  initCarousel();
  initFAQ();
  initSearchForms();
});

// Tab functionality
function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs');

  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.tab-btn');
    const parent = container.closest('.section') || container.parentElement;
    const contents = parent.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show corresponding content
        contents.forEach(content => {
          content.classList.remove('active');
          if (content.dataset.tab === target) {
            content.classList.add('active');
          }
        });
      });
    });
  });
}

// Carousel functionality
function initCarousel() {
  const carousels = document.querySelectorAll('.carousel-section');

  carousels.forEach(section => {
    const carousel = section.querySelector('.carousel');
    const prevBtn = section.querySelector('.carousel-nav.prev');
    const nextBtn = section.querySelector('.carousel-nav.next');

    if (!carousel || !prevBtn || !nextBtn) return;

    const scrollAmount = 300;

    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  });
}

// FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active');
    });
  });
}

// Search form validation
function initSearchForms() {
  const searchForms = document.querySelectorAll('.search-form');

  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const inputs = form.querySelectorAll('input[required], select[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#dc3545';
        } else {
          input.style.borderColor = '';
        }
      });

      if (isValid) {
        // Simulate search - show alert in demo
        const destination = form.querySelector('input[type="text"]')?.value || 'your destination';
        alert(`Searching for accommodations at ${destination}...`);
      }
    });
  });
}

// Placeholder images using picsum
function getPlaceholderImage(width, height, seed) {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

// Set placeholder images on cards
document.querySelectorAll('.card-image img, .dest-card .card-image img').forEach((img, index) => {
  if (!img.src || img.src.includes('picsum')) {
    const seed = img.closest('.card, .dest-card')?.querySelector('h3, h4')?.textContent?.replace(/\s+/g, '') || index;
    img.src = getPlaceholderImage(400, 300, seed);
  }
});
