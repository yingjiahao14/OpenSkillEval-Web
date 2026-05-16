document.addEventListener('DOMContentLoaded', () => {

  // ── ACCORDION ──
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const accordion = item.closest('.accordion');
      const content = item.querySelector('.accordion-content');
      const inner = content.querySelector('.accordion-content-inner');
      const isActive = item.classList.contains('active');

      accordion.querySelectorAll('.accordion-item').forEach(other => {
        other.classList.remove('active');
        other.querySelector('.accordion-content').style.maxHeight = '0';
      });

      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });

  // open first accordion by default
  document.querySelectorAll('.accordion').forEach(acc => {
    const first = acc.querySelector('.accordion-item');
    if (first) {
      first.classList.add('active');
      const c = first.querySelector('.accordion-content');
      const inner = c.querySelector('.accordion-content-inner');
      c.style.maxHeight = inner.scrollHeight + 'px';
    }
  });

  // ── TABS ──
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabGroup = btn.closest('.tabs-wrapper') || btn.closest('.cli-right') || btn.parentElement.parentElement;
      const tabId = btn.dataset.tab;

      tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabGroup.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      const target = tabGroup.querySelector(`[data-panel="${tabId}"]`);
      if (target) target.classList.add('active');
    });
  });

  // ── SIDEBAR TOGGLE ──
  document.querySelectorAll('.sidebar-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const sidebar = btn.closest('.docs-layout').querySelector('.sidebar');
      sidebar.classList.toggle('collapsed');
      const icon = btn.querySelector('svg');
      if (sidebar.classList.contains('collapsed')) {
        btn.style.left = '0';
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
      } else {
        btn.style.left = '';
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
      }
    });
  });

  // ── MOBILE NAV ──
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.topnav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const isOpen = navLinks.classList.contains('mobile-open');
      hamburger.innerHTML = isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });
  }

  // ── SCROLL REVEAL ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
