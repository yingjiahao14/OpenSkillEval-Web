/* GlobalStone — Site JavaScript */

document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Accordion sections
    const accordionSections = document.querySelectorAll('.mobile-nav-section');
    accordionSections.forEach(function(section) {
      const btn = section.querySelector('button');
      if (btn) {
        btn.addEventListener('click', function() {
          accordionSections.forEach(function(s) {
            if (s !== section) s.classList.remove('active');
          });
          section.classList.toggle('active');
        });
      }
    });
  }

  // Mega menu toggle (click on desktop)
  const megaTrigger = document.querySelector('.mega-trigger');
  if (megaTrigger) {
    megaTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      this.classList.toggle('active');
    });

    // Close mega menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-item-has-mega')) {
        const active = document.querySelector('.mega-trigger.active');
        if (active) active.classList.remove('active');
      }
    });
  }

  // What We Do tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const target = this.dataset.tab;

      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      tabContents.forEach(function(c) { c.classList.remove('active'); });

      this.classList.add('active');
      const targetContent = document.getElementById('tab-' + target);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // Partners carousel
  const carousel = document.querySelector('.partners-carousel');
  if (carousel) {
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        carousel.scrollBy({ left: 320, behavior: 'smooth' });
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        carousel.scrollBy({ left: -320, behavior: 'smooth' });
      });
    }
  }

  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = this.querySelector('input');
      const button = this.querySelector('button');
      if (input.value) {
        button.textContent = 'Subscribed!';
        button.disabled = true;
        input.disabled = true;
        setTimeout(function() {
          button.textContent = 'Subscribe';
          button.disabled = false;
          input.disabled = false;
          input.value = '';
        }, 3000);
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});