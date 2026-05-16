// RedRoom Fitness — Interactive JavaScript

document.addEventListener('DOMContentLoaded', () => {

  // ===== MOBILE MENU =====
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
  }

  // ===== LIFESTYLE CAROUSEL (HOME) =====
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');
  const carouselDots = document.getElementById('carouselDots');

  if (carouselTrack) {
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      carouselDots.appendChild(dot);
    }

    function goToSlide(index) {
      currentSlide = index;
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    carouselPrev?.addEventListener('click', () => {
      goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    });

    carouselNext?.addEventListener('click', () => {
      goToSlide((currentSlide + 1) % totalSlides);
    });

    // Touch/swipe support
    let touchStartX = 0;
    carouselTrack.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goToSlide((currentSlide + 1) % totalSlides);
        else goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
      }
    });

    // Auto-advance every 5s
    setInterval(() => {
      goToSlide((currentSlide + 1) % totalSlides);
    }, 5000);
  }

  // ===== FLOOR/TREADMILL TOGGLE (THE WORKOUT) =====
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const toggleContents = document.querySelectorAll('.toggle-content');

  if (toggleBtns.length) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;

        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        toggleContents.forEach(content => {
          content.classList.toggle('active', content.dataset.content === target);
        });
      });
    });
  }

  // ===== INSTRUCTOR LOCATION FILTER =====
  const locationFilter = document.getElementById('locationFilter');
  const instructorCards = document.querySelectorAll('.instructor-card');

  if (locationFilter) {
    locationFilter.addEventListener('change', () => {
      const location = locationFilter.value;

      instructorCards.forEach(card => {
        const cardLocation = card.dataset.location;
        if (location === 'all' || cardLocation === location) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // ===== FAQ ACCORDION (SINGLE-OPEN) =====
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question?.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all
        faqItems.forEach(i => i.classList.remove('open'));

        // Toggle current (open if it was closed)
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    });
  }

  // ===== NEWSLETTER FORM VALIDATION =====
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterMsg = document.getElementById('newsletterMsg');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();

      const email = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        newsletterEmail.classList.add('error');
        newsletterMsg.textContent = 'Please enter a valid email address.';
        newsletterMsg.className = 'newsletter-msg error';
        return;
      }

      newsletterEmail.classList.remove('error');
      newsletterMsg.textContent = 'Thanks for subscribing! Check your inbox for a confirmation.';
      newsletterMsg.className = 'newsletter-msg success';
      newsletterEmail.value = '';
    });

    newsletterEmail.addEventListener('input', () => {
      newsletterEmail.classList.remove('error');
      newsletterMsg.textContent = '';
    });
  }

  // ===== COUNTRY SELECTOR =====
  const countrySelect = document.getElementById('countrySelect');
  if (countrySelect) {
    countrySelect.addEventListener('change', () => {
      // Could redirect to region-specific URL
      console.log('Selected country:', countrySelect.value);
    });
  }

});