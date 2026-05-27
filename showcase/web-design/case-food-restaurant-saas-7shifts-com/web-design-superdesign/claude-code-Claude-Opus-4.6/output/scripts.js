/* ShiftWise — Global Scripts */

document.addEventListener('DOMContentLoaded', () => {
  // ─── Header scroll effect ───
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // ─── Mobile nav ───
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Testimonial carousel ───
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  if (track) {
    let current = 0;
    const cards = track.querySelectorAll('.testimonial-card');
    const total = cards.length;

    function goTo(idx) {
      current = ((idx % total) + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

    setInterval(() => goTo(current + 1), 6000);
  }

  // ─── Pricing toggle ───
  const toggle = document.querySelector('.toggle-switch');
  const monthlyLabel = document.querySelector('.billing-monthly');
  const annualLabel = document.querySelector('.billing-annual');
  if (toggle) {
    let isAnnual = false;
    toggle.addEventListener('click', () => {
      isAnnual = !isAnnual;
      toggle.classList.toggle('active', isAnnual);
      if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
      if (annualLabel) annualLabel.classList.toggle('active', isAnnual);

      document.querySelectorAll('[data-monthly]').forEach(el => {
        el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
      });

      document.querySelectorAll('[data-period-monthly]').forEach(el => {
        el.textContent = isAnnual ? el.dataset.periodAnnual : el.dataset.periodMonthly;
      });
    });
  }

  // ─── FAQ accordion ───
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ─── Contact form validation ───
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      contactForm.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('has-error');
      });

      const name = contactForm.querySelector('#fullName');
      const email = contactForm.querySelector('#email');
      const company = contactForm.querySelector('#company');
      const message = contactForm.querySelector('#message');

      if (name && !name.value.trim()) {
        name.closest('.form-group').classList.add('has-error');
        name.classList.add('error');
        valid = false;
      } else if (name) {
        name.classList.remove('error');
      }

      if (email && (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))) {
        email.closest('.form-group').classList.add('has-error');
        email.classList.add('error');
        valid = false;
      } else if (email) {
        email.classList.remove('error');
      }

      if (company && !company.value.trim()) {
        company.closest('.form-group').classList.add('has-error');
        company.classList.add('error');
        valid = false;
      } else if (company) {
        company.classList.remove('error');
      }

      if (message && !message.value.trim()) {
        message.closest('.form-group').classList.add('has-error');
        message.classList.add('error');
        valid = false;
      } else if (message) {
        message.classList.remove('error');
      }

      if (valid) {
        contactForm.style.display = 'none';
        document.querySelector('.form-success').classList.add('show');
      }
    });
  }

  // ─── Scroll animations ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ─── Animated counters ───
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.dataset.target;
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const numericTarget = parseFloat(target.replace(/,/g, ''));
        const hasComma = target.includes(',');
        const duration = 2000;
        const start = performance.now();

        function animate(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          let current = Math.floor(eased * numericTarget);
          if (hasComma) current = current.toLocaleString();
          el.textContent = prefix + current + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
});
