// WellStream Platform — Shared JavaScript

// Nav scroll effect
window.addEventListener('scroll', function() {
  const nav = document.getElementById('mainNav');
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
});

// Mobile nav toggle
function toggleMobileNav() {
  const links = document.getElementById('navLinks');
  const btn = document.getElementById('navToggle');
  if (!links) return;
  links.classList.toggle('open');
  const spans = btn.querySelectorAll('span');
  if (links.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
}

// Dropdown toggle
function toggleDropdown(btn) {
  // On mobile, toggle the dropdown
  if (window.innerWidth <= 768) {
    const menu = btn.nextElementSibling;
    menu.style.display = menu.style.display === 'block' ? '' : 'block';
  }
}

// Tab switching
function switchTab(group, id, btn) {
  // Deactivate all buttons in bar
  const bar = btn.closest('.tab-bar') || btn.parentElement;
  bar.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Hide all panels for this group
  document.querySelectorAll(`[id^="` + group + `-"]`).forEach(panel => {
    panel.classList.remove('active');
  });

  // Show target panel
  const target = document.getElementById(group + '-' + id);
  if (target) target.classList.add('active');
}

// Accordion
function initAccordions() {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', function() {
      const item = this.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-trigger').classList.remove('open');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        this.classList.add('open');
      }
    });
  });

  // Open first by default
  const first = document.querySelector('.accordion-item');
  if (first) {
    first.classList.add('open');
    const trigger = first.querySelector('.accordion-trigger');
    if (trigger) trigger.classList.add('open');
  }
}

// Testimonial carousel
function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!slides.length) return;

  let current = 0;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  // Auto-advance
  setInterval(() => goTo((current + 1) % slides.length), 5000);
}

// Form validation
function initDemoForm() {
  const form = document.getElementById('demoForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      const err = field.parentElement.querySelector('.field-error');
      if (!field.value.trim()) {
        field.classList.add('invalid');
        if (err) err.style.display = 'block';
        valid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        field.classList.add('invalid');
        if (err) { err.textContent = 'Please enter a valid email address.'; err.style.display = 'block'; }
        valid = false;
      } else {
        field.classList.remove('invalid');
        if (err) err.style.display = 'none';
      }
    });

    if (valid) {
      form.innerHTML = `
        <div style="text-align:center;padding:60px 20px;">
          <div style="font-size:48px;margin-bottom:20px;">✓</div>
          <h3 style="font-size:24px;font-weight:800;color:#fff;margin-bottom:12px;">Demo Request Submitted!</h3>
          <p style="color:#94a3b8;font-size:15px;line-height:1.7;">Thank you for your interest in WellStream. A member of our team will reach out within one business day to schedule your personalized demo.</p>
        </div>`;
    }
  });

  // Live validation clear
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', function() {
      this.classList.remove('invalid');
      const err = this.parentElement.querySelector('.field-error');
      if (err) err.style.display = 'none';
    });
  });
}

// Stats counter animation
function animateCounters() {
  const observers = document.querySelectorAll('[data-counter]');
  if (!observers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const isFloat = target % 1 !== 0;
        const duration = 1500;
        const step = 16;
        const steps = duration / step;
        let current = 0;
        const increment = target / steps;

        const timer = setInterval(() => {
          current = Math.min(current + increment, target);
          el.textContent = isFloat
            ? current.toFixed(0) + suffix
            : Math.round(current) + suffix;
          if (current >= target) clearInterval(timer);
        }, step);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  observers.forEach(el => observer.observe(el));
}

// Scroll reveal
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  initAccordions();
  initCarousel();
  initDemoForm();
  animateCounters();
  initScrollReveal();
});
