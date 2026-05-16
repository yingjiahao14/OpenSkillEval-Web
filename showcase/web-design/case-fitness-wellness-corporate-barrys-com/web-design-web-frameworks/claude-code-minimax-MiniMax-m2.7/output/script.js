// RedRoom Fitness - Shared JavaScript

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create dots
    if (dotsContainer) {
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goToSlide(index) {
      currentIndex = index;
      if (currentIndex < 0) currentIndex = totalSlides - 1;
      if (currentIndex >= totalSlides) currentIndex = 0;

      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      const dots = dotsContainer?.querySelectorAll('.carousel-dot');
      dots?.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));

    // Touch support
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToSlide(currentIndex + 1);
        else goToSlide(currentIndex - 1);
      }
    });
  });

  // Toggle functionality (Floor/Treadmill)
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      const parent = btn.closest('.toggle-container');

      parent.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      parent.nextElementSibling.querySelectorAll('.toggle-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(target)?.classList.add('active');
    });
  });

  // FAQ Accordion - Single open behavior
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('open');
      });

      // Toggle current item
      item.classList.toggle('open', !isOpen);
    });
  });

  // Newsletter form validation
  const newsletterForm = document.querySelector('.newsletter-form');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');
    const messageEl = newsletterForm.parentElement.querySelector('.newsletter-message');
    const email = input.value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input.classList.add('error');
      if (messageEl) {
        messageEl.textContent = 'Please enter a valid email address.';
        messageEl.className = 'newsletter-message error';
      }
      return;
    }

    input.classList.remove('error');
    if (messageEl) {
      messageEl.textContent = 'Thanks for subscribing! Check your inbox for confirmation.';
      messageEl.className = 'newsletter-message success';
    }
    input.value = '';
  });

  // Instructor location filter
  const locationFilter = document.getElementById('location-filter');
  const instructorGrid = document.querySelector('.instructor-grid');
  const instructorCards = instructorGrid?.querySelectorAll('.instructor-card');

  locationFilter?.addEventListener('change', (e) => {
    const selectedLocation = e.target.value;

    instructorCards.forEach(card => {
      const cardLocation = card.dataset.location;
      if (selectedLocation === 'all' || cardLocation === selectedLocation) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // Country selector dropdown
  const countryBtn = document.querySelector('.country-selector button');
  const countryDropdown = document.querySelector('.country-dropdown');

  countryBtn?.addEventListener('click', () => {
    countryDropdown?.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.country-selector')) {
      countryDropdown?.classList.remove('show');
    }
  });
});

// Auto-slide for carousel (optional)
function initAutoSlide(carousel, interval = 5000) {
  setInterval(() => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const currentTransform = track.style.transform || 'translateX(0)';
    const currentIndex = parseInt(currentTransform.replace('translateX(-', '').replace('%)', '')) / 100;
    const nextIndex = (currentIndex + 1) % slides.length;

    const nextBtn = carousel.querySelector('.carousel-next');
    nextBtn?.click();
  }, interval);
}

// Initialize auto-slide for all carousels
document.querySelectorAll('.carousel').forEach(carousel => {
  initAutoSlide(carousel, 6000);
});