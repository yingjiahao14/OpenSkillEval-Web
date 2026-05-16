/* ============================================
   GreenBean Coffee — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCookieBanner();
  initMobileNav();
  initFooterAccordion();
  initRedemptionTabs();
  initCarousels();
  initStoreLocator();
  initMenuSidebar();
  initFAQ();
});

/* --- Cookie Banner --- */
function initCookieBanner() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;
  const agreeBtn = banner.querySelector('.cookie-agree');
  if (agreeBtn) {
    agreeBtn.addEventListener('click', () => {
      banner.classList.add('hidden');
      localStorage.setItem('greenbean-cookies', 'agreed');
    });
  }
  if (localStorage.getItem('greenbean-cookies') === 'agreed') {
    banner.classList.add('hidden');
  }
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!toggle || !mobileNav) return;
  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    if (mobileNav.classList.contains('open')) {
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

/* --- Footer Accordion (Mobile) --- */
function initFooterAccordion() {
  const toggles = document.querySelectorAll('.footer-accordion-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      const col = toggle.closest('.footer-col');
      col.classList.toggle('open');
    });
  });
}

/* --- Rewards Redemption Tabs --- */
function initRedemptionTabs() {
  const tabs = document.querySelectorAll('.redemption-tab');
  const panels = document.querySelectorAll('.redemption-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panels.forEach(p => {
        p.classList.toggle('active', p.dataset.panel === target);
      });
    });
  });
}

/* --- Carousels --- */
function initCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    if (!track) return;

    const scrollAmount = 280;

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
  });
}

/* --- Store Locator --- */
function initStoreLocator() {
  const orderToggle = document.querySelector('.order-toggle');
  if (orderToggle) {
    const buttons = orderToggle.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  const filterBtn = document.querySelector('.filter-btn');
  const filterPanel = document.querySelector('.filter-panel');
  if (filterBtn && filterPanel) {
    filterBtn.addEventListener('click', () => {
      filterPanel.classList.toggle('open');
    });
  }

  const searchInput = document.querySelector('.search-input');
  const suggestions = document.querySelector('.search-suggestions');
  if (searchInput && suggestions) {
    const demoLocations = [
      'Seattle, WA', 'Portland, OR', 'San Francisco, CA', 'Los Angeles, CA',
      'New York, NY', 'Chicago, IL', 'Austin, TX', 'Denver, CO',
      'Boston, MA', 'Miami, FL'
    ];
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      if (val.length < 2) {
        suggestions.innerHTML = '';
        suggestions.style.display = 'none';
        return;
      }
      const matches = demoLocations.filter(loc => loc.toLowerCase().includes(val));
      if (matches.length) {
        suggestions.innerHTML = matches.map(m =>
          `<li><button type="button" class="suggestion-item">${m}</button></li>`
        ).join('');
        suggestions.style.display = 'block';
        suggestions.querySelectorAll('.suggestion-item').forEach(item => {
          item.addEventListener('click', () => {
            searchInput.value = item.textContent;
            suggestions.style.display = 'none';
          });
        });
      } else {
        suggestions.innerHTML = '';
        suggestions.style.display = 'none';
      }
    });
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.style.display = 'none';
      }
    });
  }
}

/* --- Menu Sidebar Active State --- */
function initMenuSidebar() {
  const sidebarLinks = document.querySelectorAll('.menu-sidebar a');
  if (!sidebarLinks.length) return;

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Simple scroll spy
  const sections = document.querySelectorAll('.menu-section');
  if (sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sidebarLinks.forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });
    sections.forEach(s => observer.observe(s));
  }
}

/* --- FAQ Accordion --- */
function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const expanded = q.getAttribute('aria-expanded') === 'true';
      // Close all
      questions.forEach(other => {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling?.classList.remove('open');
      });
      // Open clicked if it was closed
      if (!expanded) {
        q.setAttribute('aria-expanded', 'true');
        q.nextElementSibling?.classList.add('open');
      }
    });
  });
}
