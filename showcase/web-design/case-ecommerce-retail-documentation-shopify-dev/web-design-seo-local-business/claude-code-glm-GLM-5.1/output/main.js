/* ============================================
   CommerceForge Dev Docs — Interactions
   Accordion · Tabs · Sidebar · Mobile Nav
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Accordion (CLI Setup) --- */
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const body = item.querySelector('.accordion-body');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      accordionItems.forEach(other => {
        other.classList.remove('active');
        const otherBody = other.querySelector('.accordion-body');
        otherBody.style.maxHeight = null;
      });

      // Open clicked (if wasn't already open)
      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // Open first accordion by default
  if (accordionItems.length > 0) {
    const firstBody = accordionItems[0].querySelector('.accordion-body');
    accordionItems[0].classList.add('active');
    firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
  }


  /* --- Package Manager Tabs --- */
  document.querySelectorAll('.tab-group').forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const panels = group.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;

        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPanel = group.querySelector(`[data-panel="${target}"]`);
        if (targetPanel) targetPanel.classList.add('active');
      });
    });
  });


  /* --- Sidebar Collapse --- */
  const sidebarToggles = document.querySelectorAll('.sidebar-toggle');

  sidebarToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      if (!sidebar) return;

      sidebar.classList.toggle('collapsed');

      const isCollapsed = sidebar.classList.contains('collapsed');
      btn.innerHTML = isCollapsed
        ? `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4l4 4-4 4"/></svg> Show nav`
        : `<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 4l-4 4 4 4"/></svg> Collapse`;
    });
  });


  /* --- Mobile Nav Toggle --- */
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }


  /* --- Copy Code --- */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeBlock = btn.closest('.code-block');
      const code = codeBlock.querySelector('code')
        ? codeBlock.querySelector('code').textContent
        : codeBlock.textContent.replace(btn.textContent, '').trim();

      navigator.clipboard.writeText(code).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = original; }, 1500);
      });
    });
  });


  /* --- Active Nav Link --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
