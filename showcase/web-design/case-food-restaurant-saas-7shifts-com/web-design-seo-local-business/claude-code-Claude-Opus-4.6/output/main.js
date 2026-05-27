/* ===== ShiftWise — Global JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Header scroll effect =====
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ===== Mobile navigation =====
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-overlay');

  function closeMobileNav() {
    hamburger?.classList.remove('active');
    mobileNav?.classList.remove('open');
    overlay?.classList.remove('visible');
    document.body.style.overflow = '';
  }

  function openMobileNav() {
    hamburger?.classList.add('active');
    mobileNav?.classList.add('open');
    overlay?.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  hamburger?.addEventListener('click', () => {
    if (mobileNav?.classList.contains('open')) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  overlay?.addEventListener('click', closeMobileNav);
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // ===== Testimonial Carousel =====
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let currentSlide = 0;

  function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  prevBtn?.addEventListener('click', () => showSlide(currentSlide - 1));
  nextBtn?.addEventListener('click', () => showSlide(currentSlide + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

  // Auto-advance every 6s
  if (slides.length > 1) {
    setInterval(() => showSlide(currentSlide + 1), 6000);
  }

  // ===== Pricing Toggle (Monthly / Annual) =====
  const toggle = document.querySelector('.toggle-switch');
  const monthlyLabel = document.querySelector('.label-monthly');
  const annualLabel = document.querySelector('.label-annual');
  const priceElements = document.querySelectorAll('[data-monthly]');

  function setPricing(annual) {
    if (annual) {
      toggle?.classList.add('active');
      monthlyLabel?.classList.remove('active');
      annualLabel?.classList.add('active');
    } else {
      toggle?.classList.remove('active');
      monthlyLabel?.classList.add('active');
      annualLabel?.classList.remove('active');
    }

    priceElements.forEach(el => {
      const monthly = el.getAttribute('data-monthly');
      const annualVal = el.getAttribute('data-annual');
      el.textContent = annual ? annualVal : monthly;
    });

    const periodEls = document.querySelectorAll('.price-period');
    periodEls.forEach(el => {
      el.textContent = annual ? '/mo (billed annually)' : '/mo';
    });
  }

  toggle?.addEventListener('click', () => {
    const isAnnual = !toggle.classList.contains('active');
    setPricing(isAnnual);
  });

  // ===== FAQ Accordion =====
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
        faq.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Open clicked (if it was closed)
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ===== Contact Form Validation =====
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.querySelector('.form-success');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'fullName', msg: 'Please enter your name' },
      { id: 'email', msg: 'Please enter a valid email' },
      { id: 'company', msg: 'Please enter your company name' },
      { id: 'message', msg: 'Please enter a message' }
    ];

    // Clear errors
    contactForm.querySelectorAll('.form-error').forEach(err => err.classList.remove('visible'));
    contactForm.querySelectorAll('input, textarea').forEach(inp => inp.classList.remove('error'));

    fields.forEach(({ id, msg }) => {
      const input = document.getElementById(id);
      const error = input?.parentElement.querySelector('.form-error');
      if (!input) return;

      let fieldValid = input.value.trim() !== '';

      if (id === 'email' && fieldValid) {
        fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      }

      if (!fieldValid) {
        valid = false;
        input.classList.add('error');
        if (error) {
          error.textContent = msg;
          error.classList.add('visible');
        }
      }
    });

    if (valid) {
      contactForm.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('visible');
    }
  });

  // ===== Animated Stats Counter =====
  const statValues = document.querySelectorAll('.stat-value[data-target]');

  function animateCountUp(el) {
    const target = el.getAttribute('data-target');
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const numericTarget = parseFloat(target);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * numericTarget;

      if (target.includes('.')) {
        el.textContent = prefix + current.toFixed(target.split('.')[1].length) + suffix;
      } else {
        el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  if (statValues.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCountUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statValues.forEach(el => observer.observe(el));
  }
});
