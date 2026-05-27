/* ============================================
   GreenBean Coffee — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initCookieBanner();
  initFooterAccordion();
  initScrollReveal();
  initFAQ();
});

/* --- Header Scroll Effect --- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const openBtn = document.querySelector('.mobile-menu-btn');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const nav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav-close button');
  if (!openBtn || !overlay || !nav) return;

  function openNav() {
    overlay.style.display = 'block';
    nav.style.display = 'block';
    requestAnimationFrame(() => {
      overlay.classList.add('active');
      nav.classList.add('active');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    overlay.classList.remove('active');
    nav.classList.remove('active');
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 400);
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  overlay.addEventListener('click', closeNav);
}

/* --- Cookie Banner --- */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  const agreeBtn = banner?.querySelector('.cookie-agree');
  const settingsBtn = banner?.querySelector('.cookie-settings');
  if (!banner) return;

  if (sessionStorage.getItem('cookieConsent')) {
    banner.classList.add('hidden');
    return;
  }

  agreeBtn?.addEventListener('click', () => {
    sessionStorage.setItem('cookieConsent', 'true');
    banner.classList.add('hidden');
  });

  settingsBtn?.addEventListener('click', () => {
    alert('Cookie settings would open here.');
  });
}

/* --- Footer Accordion (Mobile) --- */
function initFooterAccordion() {
  const buttons = document.querySelectorAll('.footer-accordion-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const links = btn.nextElementSibling;
      const isExpanded = btn.classList.contains('expanded');
      btn.classList.toggle('expanded');
      if (links) {
        links.classList.toggle('expanded');
      }
    });
  });
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* --- Tabs --- */
function initTabs(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const triggers = container.querySelectorAll('.tab-trigger');
  const contents = container.querySelectorAll('.tab-content');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const target = trigger.dataset.tab;
      triggers.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      trigger.classList.add('active');
      const targetContent = container.querySelector(`[data-tab-content="${target}"]`);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}

/* --- Carousel --- */
function initCarousel(wrapperSelector, slideSelector, opts = {}) {
  const wrapper = document.querySelector(wrapperSelector);
  if (!wrapper) return;

  const track = wrapper.querySelector('.carousel-track');
  const slides = wrapper.querySelectorAll(slideSelector);
  const prevBtn = wrapper.querySelector('.carousel-btn-prev');
  const nextBtn = wrapper.querySelector('.carousel-btn-next');

  if (!track || !slides.length) return;

  const scrollAmount = opts.scrollAmount || slides[0].offsetWidth + 16;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
}

/* --- FAQ Accordion --- */
function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isExpanded = q.classList.contains('expanded');
      q.classList.toggle('expanded');
      if (isExpanded) {
        answer.style.maxHeight = '0';
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* --- Store Locator --- */
function initStoreLocator() {
  const searchInput = document.querySelector('.store-search-input input');
  const suggestions = document.querySelector('.search-suggestions');
  const filterBtn = document.querySelector('.filter-btn');
  const filterPanel = document.querySelector('.filter-panel');
  const orderBtns = document.querySelectorAll('.order-toggle-btn');

  // Search suggestions
  if (searchInput && suggestions) {
    const sampleSuggestions = [
      'New York, NY',
      'Los Angeles, CA',
      'Chicago, IL',
      'San Francisco, CA',
      'Seattle, WA',
      'Portland, OR',
      'Austin, TX',
      'Denver, CO'
    ];

    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      if (val.length === 0) {
        suggestions.classList.remove('active');
        return;
      }

      const matches = sampleSuggestions.filter(s =>
        s.toLowerCase().includes(val)
      );

      if (matches.length === 0) {
        suggestions.classList.remove('active');
        return;
      }

      suggestions.innerHTML = matches.map(m => `
        <div class="search-suggestion">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          ${m}
        </div>
      `).join('');

      suggestions.classList.add('active');

      suggestions.querySelectorAll('.search-suggestion').forEach(s => {
        s.addEventListener('click', () => {
          searchInput.value = s.textContent.trim();
          suggestions.classList.remove('active');
        });
      });
    });

    searchInput.addEventListener('blur', () => {
      setTimeout(() => suggestions.classList.remove('active'), 200);
    });
  }

  // Filter panel toggle
  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterBtn.classList.toggle('active');
      filterPanel.classList.toggle('active');
    });
  }

  // Filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
    });
  });

  // Order type toggle
  orderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      orderBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* --- Menu Sidebar Mobile Accordion --- */
function initMenuSidebar() {
  const groups = document.querySelectorAll('.menu-sidebar-group');
  const isMobile = () => window.innerWidth <= 768;

  groups.forEach(group => {
    const heading = group.querySelector('h3');
    if (!heading) return;

    heading.addEventListener('click', () => {
      if (!isMobile()) return;
      const isExpanded = group.classList.contains('expanded');
      groups.forEach(g => g.classList.remove('expanded'));
      if (!isExpanded) {
        group.classList.add('expanded');
      }
    });
  });

  // Expand first group on mobile
  if (isMobile() && groups.length > 0) {
    groups[0].classList.add('expanded');
  }
}

/* --- Menu Category Navigation --- */
function initMenuNav() {
  const sidebarItems = document.querySelectorAll('.menu-sidebar-item');
  const sections = document.querySelectorAll('.menu-section');

  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const targetId = item.dataset.section;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Update active sidebar item on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        sidebarItems.forEach(i => {
          i.classList.toggle('active', i.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-100px 0px -60% 0px' });

  sections.forEach(section => observer.observe(section));
}
