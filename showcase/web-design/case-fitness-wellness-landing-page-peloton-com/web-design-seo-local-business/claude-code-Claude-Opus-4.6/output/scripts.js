/* WellStream Platform — Global Scripts */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Nav Toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    // Mobile dropdown toggle
    document.querySelectorAll('.nav-dropdown').forEach(dd => {
      dd.querySelector('.nav-drop-label').addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dd.classList.toggle('open');
        }
      });
    });
  }

  // ---- Tab System ----
  document.querySelectorAll('.tabs-container').forEach(container => {
    const btns = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = container.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });

  // ---- Accordion ----
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const wasActive = item.classList.contains('active');
      item.closest('.accordion').querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  // ---- Testimonial Carousel ----
  const track = document.querySelector('.testimonial-track');
  const dots = document.querySelectorAll('.carousel-dot');
  if (track && dots.length) {
    let current = 0;
    const total = dots.length;
    function goTo(i) {
      current = i;
      track.style.transform = `translateX(-${i * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    }
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    setInterval(() => goTo((current + 1) % total), 6000);
  }

  // ---- Stat Ring Animation ----
  const rings = document.querySelectorAll('.ring-fill');
  if (rings.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.strokeDashoffset = entry.target.dataset.offset;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    rings.forEach(r => observer.observe(r));
  }

  // ---- Timeline Bar Animation ----
  document.querySelectorAll('.bar-fill').forEach(bar => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          bar.style.width = bar.dataset.width;
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(bar);
  });

  // ---- Demo Form Validation ----
  const form = document.getElementById('demo-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          group.classList.add('invalid');
          valid = false;
        } else {
          group.classList.remove('invalid');
        }
      });
      const email = form.querySelector('[type="email"]');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.closest('.form-group').classList.add('invalid');
        valid = false;
      }
      if (valid) {
        form.style.display = 'none';
        document.querySelector('.form-success').style.display = 'block';
      }
    });
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.closest('.form-group').classList.remove('invalid');
      });
    });
  }

  // ---- Cookie Banner ----
  const banner = document.querySelector('.cookie-banner');
  if (banner && !localStorage.getItem('ws-cookie-consent')) {
    setTimeout(() => banner.classList.add('visible'), 1000);
    banner.querySelectorAll('[data-cookie]').forEach(btn => {
      btn.addEventListener('click', () => {
        localStorage.setItem('ws-cookie-consent', btn.dataset.cookie);
        banner.classList.remove('visible');
      });
    });
  }
});
