document.addEventListener('DOMContentLoaded', () => {

  // Cookie Banner
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner) {
    if (!localStorage.getItem('cookieConsent')) {
      cookieBanner.classList.add('show');
    }
    document.getElementById('cookie-accept')?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.classList.remove('show');
    });
    document.getElementById('cookie-decline')?.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'declined');
      cookieBanner.classList.remove('show');
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  // Industry Tabs (Home Page)
  const industryTabs = document.querySelectorAll('.industry-tab-btn');
  industryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      industryTabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.industry-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(`industry-${tab.dataset.tab}`);
      if (panel) panel.classList.add('active');
    });
  });

  // Security Tabs
  const securityTabs = document.querySelectorAll('.security-tab-btn');
  securityTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      securityTabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.security-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(`security-${tab.dataset.tab}`);
      if (panel) panel.classList.add('active');
    });
  });

  // Integration Tabs
  const integrationTabs = document.querySelectorAll('.integration-tab-btn');
  integrationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      integrationTabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.integration-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(`integration-${tab.dataset.tab}`);
      if (panel) panel.classList.add('active');
    });
  });

  // Accordion (Platform Overview)
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Testimonial Carousel
  const carouselTrack = document.getElementById('carousel-track');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  const totalSlides = carouselDots.length;

  if (carouselDots.length > 0) {
    carouselDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        if (carouselTrack) {
          carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        carouselDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });

    // Auto-advance every 5 seconds
    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      if (carouselTrack) {
        carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      }
      carouselDots.forEach(d => d.classList.remove('active'));
      carouselDots[currentSlide]?.classList.add('active');
    }, 5000);
  }

  // Company/Careers Tabs
  const companyTabs = document.querySelectorAll('.company-tab-btn');
  companyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      companyTabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.company-tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(`company-${tab.dataset.tab}`);
      if (panel) panel.classList.add('active');
    });
  });

  // Demo Form Validation & Submission
  const demoForm = document.getElementById('demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Required fields
      const requiredFields = ['firstName', 'lastName', 'email', 'company', 'jobTitle', 'country'];
      requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const group = field?.closest('.form-group');
        if (field && !field.value.trim()) {
          isValid = false;
          group?.classList.add('error');
        } else {
          group?.classList.remove('error');
        }
      });

      // Email validation
      const emailField = document.getElementById('email');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          isValid = false;
          emailField.closest('.form-group')?.classList.add('error');
        }
      }

      if (isValid) {
        demoForm.style.display = 'none';
        const successMsg = document.getElementById('form-success');
        if (successMsg) successMsg.classList.add('show');
      }
    });
  }

  // Animate stats on scroll
  const statCircles = document.querySelectorAll('.stat-circle');
  const observerOptions = { threshold: 0.5 };
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'scale(1)';
      }
    });
  }, observerOptions);
  statCircles.forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'scale(0.8)';
    stat.style.transition = 'all 0.5s ease';
    statsObserver.observe(stat);
  });

  // Animate timeline bars on scroll
  const timelineBars = document.querySelectorAll('.timeline-bar-fill');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
      }
    });
  }, { threshold: 0.5 });
  timelineBars.forEach(bar => {
    timelineObserver.observe(bar);
  });

});