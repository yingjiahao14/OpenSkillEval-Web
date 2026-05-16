/**
 * WellSource — Main JavaScript
 * Handles: mega-menu dropdowns, tabs, carousel, ticker, newsletter, mobile menu
 */

(function() {
  'use strict';

  // ============================================
  // MEGA-MENU DROPDOWNS
  // ============================================
  const navItems = document.querySelectorAll('.nav-item.has-dropdown');
  let activeDropdown = null;

  navItems.forEach(item => {
    const trigger = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.mega-dropdown');
    if (!trigger || !dropdown) return;

    // Click to toggle
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('active');

      // Close any open dropdown
      closeAllDropdowns();

      if (!isOpen) {
        dropdown.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        activeDropdown = dropdown;
      }
    });

    // Keyboard: Escape to close
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllDropdowns();
        trigger.focus();
      }
    });
  });

  function closeAllDropdowns() {
    document.querySelectorAll('.mega-dropdown.active').forEach(d => {
      d.classList.remove('active');
    });
    document.querySelectorAll('.nav-link[aria-expanded="true"]').forEach(t => {
      t.setAttribute('aria-expanded', 'false');
    });
    activeDropdown = null;
  }

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (activeDropdown && !activeDropdown.contains(e.target)) {
      closeAllDropdowns();
    }
  });

  // Close on resize to mobile
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      closeAllDropdowns();
    }
  });

  // ============================================
  // RECOMMENDED READS TABS
  // ============================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;

      // Deactivate all tabs
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => {
        p.classList.remove('active');
        p.hidden = true;
      });

      // Activate target tab
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.hidden = false;
      }
    });
  });

  // ============================================
  // HEALTH TOPICS CAROUSEL
  // ============================================
  const topicsScroll = document.getElementById('topics-scroll');
  const topicsPrev = document.getElementById('topics-prev');
  const topicsNext = document.getElementById('topics-next');

  if (topicsScroll && topicsPrev && topicsNext) {
    const scrollAmount = 160; // card width + gap

    topicsPrev.addEventListener('click', () => {
      topicsScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    topicsNext.addEventListener('click', () => {
      topicsScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Touch/swipe support
    let isDown = false;
    let startX;
    let scrollLeft;

    topicsScroll.addEventListener('mousedown', (e) => {
      isDown = true;
      topicsScroll.style.cursor = 'grabbing';
      startX = e.pageX - topicsScroll.offsetLeft;
      scrollLeft = topicsScroll.scrollLeft;
    });

    topicsScroll.addEventListener('mouseleave', () => {
      isDown = false;
      topicsScroll.style.cursor = 'grab';
    });

    topicsScroll.addEventListener('mouseup', () => {
      isDown = false;
      topicsScroll.style.cursor = 'grab';
    });

    topicsScroll.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - topicsScroll.offsetLeft;
      const walk = (x - startX) * 1.5;
      topicsScroll.scrollLeft = scrollLeft - walk;
    });

    topicsScroll.style.cursor = 'grab';
  }

  // ============================================
  // CREDIBILITY TICKER
  // ============================================
  const tickerTrack = document.getElementById('ticker-track');
  if (tickerTrack) {
    // Pause on hover for better readability
    const tickerWrap = tickerTrack.closest('.ticker-wrap');
    if (tickerWrap) {
      tickerWrap.addEventListener('mouseenter', () => {
        tickerTrack.style.animationPlayState = 'paused';
      });
      tickerWrap.addEventListener('mouseleave', () => {
        tickerTrack.style.animationPlayState = 'running';
      });
    }
  }

  // ============================================
  // NEWSLETTER FORM HANDLER
  // ============================================
  window.handleNewsletterSubmit = function(event) {
    event.preventDefault();
    const form = event.target;
    const input = form.querySelector('input[type="email"]');
    const email = input.value.trim();

    if (email) {
      // Show success feedback
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Subscribed!';
      btn.style.background = '#2E7D32';
      btn.style.borderColor = '#2E7D32';
      input.value = '';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 2500);
    }

    return false;
  };

  // ============================================
  // MOBILE MENU
  // ============================================
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isOpen);
      mainNav.classList.toggle('mobile-open');

      // Animate hamburger
      const spans = mobileToggle.querySelectorAll('span');
      if (!isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ============================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards for subtle reveal animation
  document.querySelectorAll('.article-card, .trust-card, .program-card, .video-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 400ms ease, transform 400ms ease';
    revealObserver.observe(el);
  });

  // Add revealed styles dynamically
  const revealStyle = document.createElement('style');
  revealStyle.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(revealStyle);

})();
